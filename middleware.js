import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow login and signup pages to be accessed without authentication
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/admin/signup")) {
    return NextResponse.next();
  }

  // Check for token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If token is missing, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
