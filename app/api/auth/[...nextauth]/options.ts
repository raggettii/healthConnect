import { PrismaClient } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

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
        phoneNumber: {
          label: "phoneNumber:",
          type: "text",
          placeholder: "Your cool PhoneNumber",
        },
        password: {
          label: "Password",
          type: "string",
          placeholder: "Your cool Password",
        },
      },
      async authorize(credentials) {
        // this is where we need to retreive user data from database ie. username adn password stuff
        // for now dummy username is there
        let response = await prisma.user.findFirst({
          where: {
            phoneNumber: credentials?.phoneNumber,
          },
        });
        if (response) {
          alert("User not exist Try signUp");
        }
      },
    }),
  ],
  //   pages: {
  //     signIn: "/patient-auth",
  //   },
  // We are not using our own pages right now as are using the ones provided by NextAuth
};
export { prisma };
