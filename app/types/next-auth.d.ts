import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  // you only need extend the module provided by
  // next-auth
  interface Session {
    user: {
      id: string;
      role: string;
      address: string;
      phoneNumber: string;
      isVerified: boolean;
    } & DefaultSession["user"];
  }
}
