import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

let role1: string;
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        role: {
          label: "Role",
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
          throw new Error("Error While fetching data from server");
        }
        if (password != user.password) throw new Error("Incorrect Password");
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, credentials }) {
      const typedCredentials = credentials as CredentialsType | undefined;
      if (typedCredentials != undefined) {
        const role = typedCredentials.role.toLowerCase();
        if (role == "user" || role == "admin") {
          return true;
        }
      }
      return false;
    },
    jwt({ token, user, session }) {
      const userInJWT = user as UserType;
      if (userInJWT) {
        return {
          ...token,
          id: userInJWT.id,
          name: userInJWT.fullName,
          address: userInJWT.city,
          role: role1,
          phoneNumber: userInJWT.phoneNumber,
          isVerified: userInJWT.isVerified,
        };
      }
      return token;
    },
    session({ session, token, user }) {
      if (session) {
        return {
          ...session,
          user: {
            ...session.user,
            address: token.address,
            id: token.id,
            role: token.role,
            phoneNumber: token.phoneNumber,
            isVerified: token.isVerified,
          },
        };
      }
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
