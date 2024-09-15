import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXT_AUTH_SECRET;
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const token = await getToken({ req, secret });
  if (
    token != null &&
    token.role == "admin" &&
    (pathname == "/hospitals" || pathname == "/patient-dashboard")
  ) {
    return NextResponse.redirect(new URL("/admin-dashboard", req.url));
  }
  if (token === null)
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));

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
  matcher: ["/patient-dashboard", "/admin-dashboard", "/hospitals"],
};
