import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

let role1: string;
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        role: {
          label: "role",
          type: "text",
          placeholder: "user or admin",
        },
        phoneNumber: {
          label: "Phone Number",
          type: "text",
          placeholder: "Your phone number",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        // console.log("Inside authorise function");
        if (
          !credentials?.role ||
          !credentials?.phoneNumber ||
          !credentials?.password
        ) {
          throw new Error("Complete data not provided");
        }
        const role = (credentials.role as string).toLowerCase();
        const { phoneNumber, password } = credentials as CredentialsType;
        role1 = role;
        const user: UserType =
          role === "admin"
            ? await prisma.healthConnect_Hospital.findFirst({
                where: { phoneNumber },
              })
            : await prisma.healthConnect_User.findFirst({
                where: { phoneNumber },
              });
        if (!user) {
          throw new Error("User not found");
        }
        if (password != user.password) throw new Error("Incorrect Password");
        // console.log("Just above user return statemetn");
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, profile, credentials }) {
      const typedCredentials = credentials as CredentialsType | undefined;
      if (typedCredentials != undefined) {
        const role = typedCredentials.role.toLowerCase();
        if (role == "user" || role == "admin") {
          return true;
        }
      }
      if (!profile?.email) {
        throw new Error("No Profile");
      }
      try {
        const dbUser = await prisma.healthConnect_User.upsert({
          where: {
            email: profile.email,
          },
          create: {
            email: profile.email,
            fullName: profile.name as string,
            city: "",
            phoneNumber: "",
            password: "",
          },
          update: {
            fullName: profile.name,
          },
        });
        user.id = dbUser.id;
        return true;
      } catch (e) {
        console.error("Just After Upsertt ", e);
      }
      return false;
    },
    async jwt({ token, user, session, account, profile, trigger }) {
      // console.log("Trigger:", trigger);
      // console.log("Session data:", session);
      // console.log("Current token:", token);
      if (trigger === "update" && session?.tempCity) {
        token.tempCity = session.tempCity;
        return token;
      }
      // console.log("Outside if in jwt ");
      let availableCities: Array<string>;
      try {
        const res = await prisma.healthConnect_Hospital.findMany({
          select: {
            city: true,
          },
          distinct: ["city"],
        });
        // console.log(res);
        availableCities = res.map((item) => item.city);
        // console.log(availableCities);
      } catch (error) {
        console.error("Fetch error:", error);
        availableCities = [];
      }
      if (profile && account?.provider === "google") {
        // const dbUser = await prisma.healthConnect_User.findUnique({
        //   where: {
        //     email: user.email as string,
        //   },
        // });
        // console.log("inside google provider token setting function ");
        return {
          ...token,
          id: user.id,
          name: user.name || profile.name,
          email: user.email,
          image: user.image,
          role: "user",
          isVerified: true,
          address: "",
          phoneNumber: "",
          cities: availableCities, // Set here
          tempCity: token.tempCity || "",
        };
      }
      const userInJWT = user as UserType;
      if (userInJWT) {
        // console.log("inside userinJWT token setting function ");
        return {
          ...token,
          id: userInJWT.id,
          name: userInJWT.fullName,
          address: userInJWT.city,
          role: role1,
          phoneNumber: userInJWT.phoneNumber,
          isVerified: userInJWT.isVerified,
          cities: availableCities,
          tempCity: token.tempCity || userInJWT.city,
        };
      }
      // console.log("token", token);
      return token;
    },
    async session({ session, token, user }) {
      if (session?.user) {
        return {
          ...session,
          user: {
            ...session.user,
            address: token.address,
            id: token.id,
            role: token.role,
            phoneNumber: token.phoneNumber,
            isVerified: token.isVerified,
            cities: token.cities,
            tempCity: token.tempCity || token.address,
          },
        };
      }
      // console.log("session", session);
      return session;
    },
  },
};
type UserType = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  city: string;
  isVerified: boolean;
} | null;
type CredentialsType = {
  role: "admin" | "user";
  password: string;
  phoneNumber: string;
};
