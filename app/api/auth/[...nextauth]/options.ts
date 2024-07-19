import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";
export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username:",
          type: "text",
          placeholder: "Your cool username",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "Your cool password",
        },
      },
      async authorize(credentials) {
        // this is where we need to retreive user data from database ie. username adn password stuff
        // for now dummy username is there

        const user = { id: "42", name: "Jatin", password: "sjkbkfvbhbgv" };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else return null;
      },
    }),
  ],
  pages: {
    signIn: "/patient-auth",
  },
  // We are not using our own pages right now as are using the ones provided by NextAuth
};
