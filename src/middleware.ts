import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("middleware execute");


  // 관리자만 접근 가능경로
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 로그인한 사용자만 접근 가능한 경로
  if (req.nextUrl.pathname.startsWith("/lotto")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/lotto/:path*"], 
};
