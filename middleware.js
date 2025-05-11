import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");

  // ✅ Handle non-admin route redirection
  const REDIRECT = process.env.REDIRECT === "true";
  if (!isAdminRoute && REDIRECT) {
    const redirectUrl = new URL(`https://aktubrand.vercel.app${pathname}`);
    return NextResponse.redirect(redirectUrl, 301);
  }

  // ✅ Allow login/signup without token
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/admin/signup")) {
    return NextResponse.next();
  }

  // ✅ Auth check for admin routes
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // ✅ Match all routes now (not just /admin)
};
