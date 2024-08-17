import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXT_AUTH_SECRET;
export async function middleware(req: NextRequest) {
  // const session = await getUser();
  const token = await getToken({ req, secret });
  console.log(`${JSON.stringify(token)} stringify k baad `);

  console.log(`${req.nextUrl.pathname} from middleware `);
  if (req.nextUrl.pathname.startsWith("/admin-dashboard")) {
    if (token.role != "admin") {
      return NextResponse.redirect(new URL("/admin-signup", req.url));
    }
  }
}

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
