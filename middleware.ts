// "use client";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
// import axios from "axios";
// import { useSession } from "next-auth/react";
import { options } from "./app/api/auth/[...nextauth]/options";
// import { usePathname } from "next/navigation";
const secret = process.env.NEXT_AUTH_SECRET;
export async function middleware(req: NextRequest) {
  const currentUrl = req.nextUrl.href;

  console.log("Current URL:", currentUrl);

  // You can also access other parts of the URL like pathname, search params, etc.
  const pathname = req.nextUrl.pathname;
  console.log("Here is the pathname from middleware ", pathname);
  const searchParams = req.nextUrl.searchParams;
  // const heads = headers();
  // const pathname = heads.get("next-url");
  // const pathname = usePathname();
  // console.log(pathname, "pathname hai bhai");
  // const sessionData = await getServerSession(options);
  // console.log(sessionData);
  const token = await getToken({ req, secret });
  console.log("token logging from middleware.ts", token);
  // const token1 = token?.exp;
  // console.log(token1);
  if (
    token != null &&
    token.role == "admin" &&
    (pathname == "/hospitals" || pathname == "/patient-dashboard")
  ) {
    return NextResponse.redirect(new URL("/admin-dashboard", req.url));
  }
  if (token === null)
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  // console.log(token);
  // console.log(`${token?.name} from middleware`);
  const date: any = Date.now();
  if (
    token &&
    typeof token.exp === "number" &&
    Date.now() >= token.exp * 1000
  ) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/admin-dashboard")) {
    if (token != null && token.role != "admin") {
      return NextResponse.redirect(new URL("/admin-signup", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/patient-dashboard", // Apply middleware only to admin-dashboard and protected routes
    "/admin-dashboard", // Apply middleware only to admin-dashboard and protected routes
    "/hospitals", // You can add more routes here as needed
  ],
};

// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// // This secret should be the same as NEXTAUTH_SECRET in your .env.local file
// const secret = process.env.NEXTAUTH_SECRET;

// export async function middleware(req: NextRequest) {
//   // Get token from NextAuth
//   const token = await getToken({ req, secret });

//   const { pathname } = req.nextUrl;

//   // If the user is authenticated, allow the request
//   if (token) {
//     return NextResponse.next();
//   }

//   // If the user is not authenticated, redirect them to the login page
//   if (!token && pathname !== "/auth/signin") {
//     const loginUrl = new URL("/auth/signin", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the following:
//      * 1. /api/auth (NextAuth endpoint)
//      * 2. /_next (static files)
//      * 3. /favicon.ico (favicon file)
//      */
//     "/((?!api/auth|_next|favicon.ico).*)",
//   ],
// };
