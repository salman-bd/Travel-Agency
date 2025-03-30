import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Admin routes protection
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Protected routes for authenticated users
  if (
    request.nextUrl.pathname.startsWith("/bookings") ||
    (request.nextUrl.pathname.startsWith("/packages") && request.nextUrl.pathname.includes("/book"))
  ) {
    if (!token) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`, request.url),
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/bookings/:path*", "/packages/:path*/book"],
}

