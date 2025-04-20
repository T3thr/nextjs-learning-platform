import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// มิดเดิลแวร์สำหรับตรวจสอบการเข้าถึงหน้าการยืนยันตัวตน
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ข้ามมิดเดิลแวร์สำหรับเส้นทางที่ไม่ต้องการการยืนยันตัวตน
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/auth") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // ดึงข้อมูล token จาก JWT
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // ตรวจสอบว่าเข้าสู่ระบบหรือไม่
  const isLoggedIn = !!token;

  // ถ้าเป็นหน้าที่ต้องเข้าสู่ระบบและยังไม่ได้เข้าสู่ระบบ
  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // ถ้าเป็นหน้า admin และไม่ใช่ admin
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

// กำหนดเส้นทางที่มิดเดิลแวร์จะทำงาน
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};