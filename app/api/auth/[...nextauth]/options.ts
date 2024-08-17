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
      async authorize(credentials: any) {
        // after clicking the signin button this function gets in action
        // user return statements here leads to returning actual values
        // means returning null will leads to error throuwn on frontend
        // and returning any data will leads to get it saved int cookies
        // so that we can use it later
        // console.log("HERE 1 ");
        if (
          !credentials?.role ||
          !credentials?.phoneNumber ||
          !credentials?.password
        ) {
          return null;
        }

        const { role, phoneNumber, password } = credentials;
        // console.log("HERE 2 ");
        role1 = role;
        // console.log(role1);
        const user =
          role === "admin"
            ? await prisma.hospital.findFirst({ where: { phoneNumber } })
            : await prisma.user.findFirst({ where: { phoneNumber } });

        // console.log(user);
        // console.log("HERE 3 ");
        if (!user) {
          console.log("Inside (!user) condition ");
          return null;
        }
        // console.log(user);
        // let isPasswordValid;
        // console.log(user);
        if (password != user.password) return null;
        else return user;
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (role1 === "admin") {
        return `${baseUrl}/admin-dashboard`; // Redirect to admin dashboard
      } else {
        return `${baseUrl}/hospitals`; // Redirect to hospitals page
      }
    },
    jwt({ token, user }) {
      if (token && user) {
        token.role = role1;
        token.id = token.sub;
        token.id = user.id;
        token.name = user.fullName;
        token.email = user.email;
        token.phoneNumber = user.phoneNumber;
        token.city = user.city;
      }
      console.log(token.phoneNumber);
      console.log(token);
      console.log(user);
      return token;
    },
    session({ session, token, user }) {
      console.log(session);
      if (session && session.user) {
        session.user.name = token.name;
      }
      return session;
    },
  },
};
