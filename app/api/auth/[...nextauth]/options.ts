import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";

const prisma = new PrismaClient();
export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Patient_Credentials",
      credentials: {
        fullName: {
          label: "username:",
          type: "text",
          placeholder: "Your cool username",
        },
        phoneNumber: {
          label: "phoneNumber:",
          type: "text",
          placeholder: "Your cool PhoneNumber",
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your cool Email",
        },
      },
      async authorize(credentials) {
        // this is where we need to retreive user data from database ie. username adn password stuff
        // for now dummy username is there
        let response = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
            phoneNumber: credentials?.phoneNumber,
          },
        });
        if (!response) {
          const newUser = await prisma.user.create({
            data: {
              fullName: credentials?.fullName || "Guest",
              email: credentials?.email || "Guest Email",
              phoneNumber: credentials?.phoneNumber || "Guest PhoneNumber",
            },
          });
          response = newUser;
        }
        if (
          credentials?.email === response.fullName &&
          credentials?.phoneNumber === response.phoneNumber
        ) {
          return response;
        } else return null;
      },
    }),
  ],
  //   pages: {
  //     signIn: "/patient-auth",
  //   },
  // We are not using our own pages right now as are using the ones provided by NextAuth
};
export { prisma };
