import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      address: string;
      phoneNumber: string;
      isVerified: boolean;
      cities: Array<string>;
      tempCity: string;
    } & DefaultSession["user"];
  }
}
