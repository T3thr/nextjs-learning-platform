import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการใช้งาน Middleware ใน Next.js
export default function MiddlewareExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# Middleware ใน Next.js

Middleware เป็นฟีเจอร์ที่ทรงพลังของ Next.js ที่ช่วยให้คุณสามารถรันโค้ดก่อนที่คำขอจะถูกประมวลผลเสร็จสิ้น ซึ่งช่วยให้คุณสามารถปรับแต่งการตอบสนองตามเงื่อนไขต่างๆ ได้ เช่น การตรวจสอบการยืนยันตัวตน, การเปลี่ยนเส้นทาง, การเพิ่ม headers, หรือการปรับแต่งคำขอ ในตัวอย่างนี้ เราจะแสดงวิธีการใช้งาน Middleware ใน Next.js และการประยุกต์ใช้งานในสถานการณ์ต่างๆ

## ประโยชน์ของ Middleware

1. **การตรวจสอบการยืนยันตัวตน**: ตรวจสอบว่าผู้ใช้ได้เข้าสู่ระบบหรือไม่ก่อนที่จะเข้าถึงหน้าที่ต้องการการยืนยันตัวตน
2. **การเปลี่ยนเส้นทาง**: เปลี่ยนเส้นทางผู้ใช้ไปยังหน้าอื่นตามเงื่อนไขต่างๆ
3. **การเพิ่ม Headers**: เพิ่ม headers ในการตอบสนอง เช่น headers ความปลอดภัย
4. **การปรับแต่งคำขอ**: ปรับแต่งคำขอก่อนที่จะถูกส่งไปยังเซิร์ฟเวอร์
5. **การจัดการภาษา**: จัดการการแปลภาษาและการเปลี่ยนเส้นทางตามภาษาของผู้ใช้
6. **การทดสอบ A/B**: สุ่มเปลี่ยนเส้นทางผู้ใช้ไปยังเวอร์ชันต่างๆ ของหน้าเว็บ`;

  // เนื้อหาเกี่ยวกับพื้นฐานของ Middleware
  const middlewareBasicsContent = `## พื้นฐานของ Middleware

ใน Next.js คุณสามารถสร้าง Middleware ได้โดยการสร้างไฟล์ \`middleware.ts\` (หรือ \`middleware.js\`) ที่ root ของโปรเจค:`;

  // โค้ดตัวอย่างสำหรับ Middleware พื้นฐาน
  const basicMiddlewareCode = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ฟังก์ชัน middleware จะถูกเรียกใช้ก่อนที่คำขอจะถูกประมวลผลเสร็จสิ้น
export function middleware(request: NextRequest) {
  // ดึง URL ปัจจุบัน
  const currentUrl = request.nextUrl.clone();
  
  // ดึงเส้นทางปัจจุบัน
  const { pathname } = currentUrl;
  
  // สร้าง response ใหม่
  const response = NextResponse.next();
  
  // เพิ่ม header ในการตอบสนอง
  response.headers.set('x-middleware-cache', 'no-cache');
  
  // เพิ่ม header เพื่อบันทึกเวลาที่คำขอถูกประมวลผล
  response.headers.set('x-processed-time', new Date().toISOString());
  
  // ส่ง response กลับ
  return response;
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: '/:path*',
};`;

  // เนื้อหาเกี่ยวกับการเปลี่ยนเส้นทางใน Middleware
  const redirectContent = `## การเปลี่ยนเส้นทางใน Middleware

คุณสามารถใช้ Middleware เพื่อเปลี่ยนเส้นทางผู้ใช้ไปยังหน้าอื่นตามเงื่อนไขต่างๆ ได้:`;

  // โค้ดตัวอย่างสำหรับการเปลี่ยนเส้นทางใน Middleware
  const redirectCode = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ฟังก์ชัน middleware
export function middleware(request: NextRequest) {
  // ดึง URL ปัจจุบัน
  const currentUrl = request.nextUrl.clone();
  
  // ดึงเส้นทางปัจจุบัน
  const { pathname } = currentUrl;
  
  // ถ้าผู้ใช้พยายามเข้าถึงหน้าเก่าที่ไม่ใช้งานแล้ว
  if (pathname === '/old-page') {
    // สร้าง URL ใหม่
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = '/new-page';
    
    // เปลี่ยนเส้นทางไปยังหน้าใหม่
    return NextResponse.redirect(newUrl);
  }
  
  // ถ้าผู้ใช้พยายามเข้าถึงหน้าที่ย้ายไปยัง subdomain อื่น
  if (pathname === '/blog') {
    // เปลี่ยนเส้นทางไปยัง subdomain
    return NextResponse.redirect(new URL('https://blog.example.com'));
  }
  
  // ถ้าผู้ใช้พยายามเข้าถึงหน้าที่ไม่มีอยู่
  if (pathname === '/not-found-page') {
    // เปลี่ยนเส้นทางไปยังหน้า 404
    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = '/404';
    
    // เปลี่ยนเส้นทางไปยังหน้า 404
    return NextResponse.rewrite(notFoundUrl);
  }
  
  // ถ้าไม่มีเงื่อนไขใดเป็นจริง ให้ดำเนินการต่อไป
  return NextResponse.next();
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ['/old-page', '/blog', '/not-found-page'],
};`;

  // เนื้อหาเกี่ยวกับการตรวจสอบการยืนยันตัวตนใน Middleware
  const authMiddlewareContent = `## การตรวจสอบการยืนยันตัวตนใน Middleware

คุณสามารถใช้ Middleware เพื่อตรวจสอบว่าผู้ใช้ได้เข้าสู่ระบบหรือไม่ก่อนที่จะเข้าถึงหน้าที่ต้องการการยืนยันตัวตน:`;

  // โค้ดตัวอย่างสำหรับการตรวจสอบการยืนยันตัวตนใน Middleware
  const authMiddlewareCode = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

// ฟังก์ชันสำหรับตรวจสอบ token
function verifyToken(token: string): boolean {
  try {
    // ตรวจสอบ token ด้วย jsonwebtoken
    verify(token, process.env.JWT_SECRET || 'secret');
    return true;
  } catch (error) {
    return false;
  }
}

// ฟังก์ชัน middleware
export function middleware(request: NextRequest) {
  // ดึง URL ปัจจุบัน
  const currentUrl = request.nextUrl.clone();
  
  // ดึงเส้นทางปัจจุบัน
  const { pathname } = currentUrl;
  
  // ตรวจสอบว่าเป็นหน้าที่ต้องการการยืนยันตัวตนหรือไม่
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/profile') || 
                          pathname.startsWith('/admin');
  
  // ถ้าเป็นหน้าที่ต้องการการยืนยันตัวตน
  if (isProtectedRoute) {
    // ดึง token จาก cookie
    const token = request.cookies.get('token')?.value;
    
    // ถ้าไม่มี token หรือ token ไม่ถูกต้อง
    if (!token || !verifyToken(token)) {
      // สร้าง URL สำหรับหน้าเข้าสู่ระบบ
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/auth/signin';
      
      // เพิ่มพารามิเตอร์ callbackUrl เพื่อให้หลังจากเข้าสู่ระบบแล้วกลับไปยังหน้าที่ต้องการ
      loginUrl.searchParams.set('callbackUrl', encodeURI(currentUrl.pathname));
      
      // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // ถ้าผู้ใช้พยายามเข้าถึงหน้าเข้าสู่ระบบหรือลงทะเบียนในขณะที่เข้าสู่ระบบแล้ว
  if ((pathname === '/auth/signin' || pathname === '/auth/signup') && request.cookies.get('token')?.value) {
    // สร้าง URL สำหรับหน้า dashboard
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = '/dashboard';
    
    // เปลี่ยนเส้นทางไปยังหน้า dashboard
    return NextResponse.redirect(dashboardUrl);
  }
  
  // ถ้าไม่มีเงื่อนไขใดเป็นจริง ให้ดำเนินการต่อไป
  return NextResponse.next();
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/auth/signin',
    '/auth/signup',
  ],
};`;

  // เนื้อหาเกี่ยวกับการจัดการภาษาใน Middleware
  const i18nMiddlewareContent = `## การจัดการภาษาใน Middleware

คุณสามารถใช้ Middleware เพื่อจัดการการแปลภาษาและการเปลี่ยนเส้นทางตามภาษาของผู้ใช้:`;

  // โค้ดตัวอย่างสำหรับการจัดการภาษาใน Middleware
  const i18nMiddlewareCode = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

// รายการภาษาที่รองรับ
const locales = ['en', 'th', 'ja', 'ko'];

// ภาษาเริ่มต้น
const defaultLocale = 'en';

// ฟังก์ชันสำหรับดึงภาษาที่ต้องการจาก headers
function getLocale(request: NextRequest): string {
  // ดึง Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // สร้าง headers object สำหรับ Negotiator
  const headers = { 'accept-language': acceptLanguage };
  
  // ใช้ Negotiator เพื่อดึงรายการภาษาที่ต้องการ
  const languages = new Negotiator({ headers }).languages();
  
  // ใช้ intl-localematcher เพื่อเลือกภาษาที่เหมาะสมที่สุด
  return match(languages, locales, defaultLocale);
}

// ฟังก์ชัน middleware
export function middleware(request: NextRequest) {
  // ดึง URL ปัจจุบัน
  const currentUrl = request.nextUrl.clone();
  
  // ดึงเส้นทางปัจจุบัน
  const { pathname } = currentUrl;
  
  // ตรวจสอบว่าเส้นทางปัจจุบันมีภาษาหรือไม่
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(\`/\${locale}/\`) || pathname === \`/\${locale}\`
  );
  
  // ถ้าเส้นทางปัจจุบันไม่มีภาษา
  if (!pathnameHasLocale) {
    // ดึงภาษาจาก cookie
    const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
    
    // ถ้ามี cookie และภาษาใน cookie อยู่ในรายการภาษาที่รองรับ
    if (localeCookie && locales.includes(localeCookie)) {
      // สร้าง URL ใหม่ที่มีภาษาจาก cookie
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = \`/\${localeCookie}\${pathname === '/' ? '' : pathname}\`;
      
      // เปลี่ยนเส้นทางไปยัง URL ใหม่
      return NextResponse.redirect(newUrl);
    }
    
    // ถ้าไม่มี cookie หรือภาษาใน cookie ไม่อยู่ในรายการภาษาที่รองรับ
    // ดึงภาษาจาก Accept-Language header
    const locale = getLocale(request);
    
    // สร้าง URL ใหม่ที่มีภาษาจาก Accept-Language header
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = \`/\${locale}\${pathname === '/' ? '' : pathname}\`;
    
    // เปลี่ยนเส้นทางไปยัง URL ใหม่
    return NextResponse.redirect(newUrl);
  }
  
  // ถ้าเส้นทางปัจจุบันมีภาษาแล้ว ให้ดำเนินการต่อไป
  return NextResponse.next();
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: [
    // ตรงกับทุกเส้นทางยกเว้นเส้นทางที่เริ่มต้นด้วย /api, /_next, /static, /favicon.ico
    '/((?!api|_next|static|favicon.ico).*)',
  ],
};`;

  // เนื้อหาเกี่ยวกับการเพิ่ม Headers ใน Middleware
  const headersMiddlewareContent = `## การเพิ่ม Headers ใน Middleware

คุณสามารถใช้ Middleware เพื่อเพิ่ม headers ในการตอบสนอง เช่น headers ความปลอดภัย:`;

  // โค้ดตัวอย่างสำหรับการเพิ่ม Headers ใน Middleware
  const headersMiddlewareCode = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ฟังก์ชัน middleware
export function middleware(request: NextRequest) {
  // สร้าง response ใหม่
  const response = NextResponse.next();
  
  // เพิ่ม security headers
  
  // Content-Security-Policy: ป้องกันการโจมตีแบบ XSS
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: https://*; font-src 'self' data: https://cdn.jsdelivr.net; connect-src 'self' https://*;"
  );
  
  // X-XSS-Protection: ป้องกันการโจมตีแบบ XSS
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // X-Frame-Options: ป้องกันการโจมตีแบบ clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  // X-Content-Type-Options: ป้องกันการโจมตีแบบ MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Referrer-Policy: ควบคุมข้อมูล referrer ที่ส่งไปยังเว็บไซต์อื่น
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions-Policy: ควบคุมฟีเจอร์ของเบราว์เซอร์ที่เว็บไซต์สามารถใช้ได้
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  
  // Strict-Transport-Security: บังคับให้ใช้ HTTPS
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  
  // ส่ง response กลับ
  return response;
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: [
    // ตรงกับทุกเส้นทางยกเว้นเส้นทางที่เริ่มต้นด้วย /api, /_next, /static, /favicon.ico
    '/((?!api|_next|static|favicon.ico).*)',
  ],
};`;

  // เนื้อหาเกี่ยวกับการทดสอบ A/B ใน Middleware
  const abTestingContent = `## การทดสอบ A/B ใน Middleware

คุณสามารถใช้ Middleware เพื่อสุ่มเปลี่ยนเส้นทางผู้ใช้ไปยังเวอร์ชันต่างๆ ของหน้าเว็บ:`;

  // โค้ดตัวอย่างสำหรับการทดสอบ A/B ใน Middleware
  const abTestingCode = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ฟังก์ชัน middleware
export function middleware(request: NextRequest) {
  // ดึง URL ปัจจุบัน
  const currentUrl = request.nextUrl.clone();
  
  // ดึงเส้นทางปัจจุบัน
  const { pathname } = currentUrl;
  
  // ตรวจสอบว่าเป็นหน้าที่ต้องการทำการทดสอบ A/B หรือไม่
  if (pathname === '/') {
    // ดึง cookie ที่ระบุเวอร์ชันของการทดสอบ A/B
    const bucket = request.cookies.get('bucket')?.value;
    
    // ถ้ามี cookie
    if (bucket) {
      // สร้าง URL ใหม่ตาม bucket
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = bucket === 'a' ? '/variant-a' : '/variant-b';
      
      // เปลี่ยนเส้นทางไปยัง URL ใหม่
      return NextResponse.rewrite(newUrl);
    }
    
    // ถ้าไม่มี cookie
    // สุ่มเลือก bucket
    const bucket = Math.random() < 0.5 ? 'a' : 'b';
    
    // สร้าง URL ใหม่ตาม bucket
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = bucket === 'a' ? '/variant-a' : '/variant-b';
    
    // สร้าง response
    const response = NextResponse.rewrite(newUrl);
    
    // ตั้งค่า cookie เพื่อให้ผู้ใช้เห็นเวอร์ชันเดิมในการเข้าชมครั้งต่อไป
    response.cookies.set('bucket', bucket, {
      maxAge: 60 * 60 * 24 * 7, // 1 สัปดาห์
      path: '/',
    });
    
    // ส่ง response กลับ
    return response;
  }
  
  // ถ้าไม่ใช่หน้าที่ต้องการทำการทดสอบ A/B ให้ดำเนินการต่อไป
  return NextResponse.next();
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ['/'],
};`;

  // เนื้อหาเกี่ยวกับการใช้งาน Middleware กับ Edge Functions
  const edgeFunctionsContent = `## การใช้งาน Middleware กับ Edge Functions

Middleware ใน Next.js ทำงานบน Edge Runtime ซึ่งหมายความว่ามันทำงานใกล้กับผู้ใช้มากกว่าเซิร์ฟเวอร์ทั่วไป ทำให้มีความเร็วในการตอบสนองที่เร็วขึ้น:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Middleware กับ Edge Functions
  const edgeFunctionsCode = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ฟังก์ชัน middleware
export function middleware(request: NextRequest) {
  // ดึงข้อมูลจาก request
  const country = request.geo?.country || 'TH';
  const city = request.geo?.city || 'Bangkok';
  const region = request.geo?.region || 'Bangkok';
  const ip = request.ip || '127.0.0.1';
  const userAgent = request.headers.get('user-agent') || '';
  
  // สร้าง response ใหม่
  const response = NextResponse.next();
  
  // เพิ่ม headers ในการตอบสนอง
  response.headers.set('x-country', country);
  response.headers.set('x-city', city);
  response.headers.set('x-region', region);
  response.headers.set('x-ip', ip);
  
  // ตรวจสอบว่าเป็นอุปกรณ์มือถือหรือไม่
  const isMobile = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
  
  // ถ้าเป็นอุปกรณ์มือถือและเข้าชมหน้าหลัก
  if (isMobile && request.nextUrl.pathname === '/') {
    // สร้าง URL ใหม่สำหรับหน้ามือถือ
    const mobileUrl = request.nextUrl.clone();
    mobileUrl.pathname = '/mobile';
    
    // เปลี่ยนเส้นทางไปยังหน้ามือถือ
    return NextResponse.rewrite(mobileUrl);
  }
  
  // ถ้าผู้ใช้อยู่ในประเทศไทยและเข้าชมหน้าหลัก
  if (country === 'TH' && request.nextUrl.pathname === '/') {
    // สร้าง URL ใหม่สำหรับหน้าภาษาไทย
    const thaiUrl = request.nextUrl.clone();
    thaiUrl.pathname = '/th';
    
    // เปลี่ยนเส้นทางไปยังหน้าภาษาไทย
    return NextResponse.rewrite(thaiUrl);
  }
  
  // ส่ง response กลับ
  return response;
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ['/'],
};`;

  // เนื้อหาเกี่ยวกับการใช้งาน Middleware กับ NextAuth.js
  const nextAuthMiddlewareContent = `## การใช้งาน Middleware กับ NextAuth.js

คุณสามารถใช้ Middleware ที่มีอยู่แล้วใน NextAuth.js เพื่อป้องกันหน้าที่ต้องการการยืนยันตัวตน:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Middleware กับ NextAuth.js
  const nextAuthMiddlewareCode = `// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// ใช้ withAuth เพื่อป้องกันหน้าที่ต้องการการยืนยันตัวตน
export default withAuth(
  // ฟังก์ชันที่จะทำงานหลังจากการตรวจสอบการยืนยันตัวตน
  function middleware(request) {
    // ดึงข้อมูลผู้ใช้จาก token
    const token = request.nextauth.token;
    
    // ถ้าผู้ใช้พยายามเข้าถึงหน้า admin แต่ไม่มีสิทธิ์
    if (
      request.nextUrl.pathname.startsWith('/admin') &&
      token?.role !== 'admin'
    ) {
      // สร้าง URL สำหรับหน้า unauthorized
      const unauthorizedUrl = new URL('/unauthorized', request.url);
      
      // เปลี่ยนเส้นทางไปยังหน้า unauthorized
      return NextResponse.redirect(unauthorizedUrl);
    }
    
    // ถ้าไม่มีเงื่อนไขใดเป็นจริง ให้ดำเนินการต่อไป
    return NextResponse.next();
  },
  {
    // ตัวเลือกสำหรับ withAuth
    callbacks: {
      // ฟังก์ชันที่ใช้ตรวจสอบว่าควรป้องกันหน้านี้หรือไม่
      authorized: ({ token }) => !!token,
    },
  }
);

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*'],
};`;

  // เนื้อหาเกี่ยวกับการใช้งาน Middleware กับ Rate Limiting
  const rateLimitingContent = `## การใช้งาน Middleware กับ Rate Limiting

คุณสามารถใช้ Middleware เพื่อจำกัดจำนวนคำขอที่ผู้ใช้สามารถทำได้ในช่วงเวลาหนึ่ง:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Middleware กับ Rate Limiting
  const rateLimitingCode = `// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// แมปสำหรับเก็บข้อมูลการจำกัดจำนวนคำขอ
// ในสถานการณ์จริงควรใช้ Redis หรือฐานข้อมูลอื่นๆ
const rateLimit = new Map();

// จำนวนคำขอสูงสุดที่อนุญาตในช่วงเวลาหนึ่ง
const MAX_REQUESTS = 10;

// ช่วงเวลาสำหรับการจำกัดจำนวนคำขอ (1 นาที)
const WINDOW_SIZE = 60 * 1000;

// ฟังก์ชัน middleware
export function middleware(request: NextRequest) {
  // ดึง URL ปัจจุบัน
  const currentUrl = request.nextUrl.clone();
  
  // ดึงเส้นทางปัจจุบัน
  const { pathname } = currentUrl;
  
  // ตรวจสอบว่าเป็นเส้นทาง API หรือไม่
  if (pathname.startsWith('/api')) {
    // ดึง IP ของผู้ใช้
    const ip = request.ip || '127.0.0.1';
    
    // สร้างคีย์สำหรับแมป
    const key = \`\${ip}:\${pathname}\`;
    
    // ดึงข้อมูลการจำกัดจำนวนคำขอจากแมป
    const rateLimitData = rateLimit.get(key) || {
      count: 0,
      timestamp: Date.now(),
    };
    
    // ตรวจสอบว่าช่วงเวลาปัจจุบันยังอยู่ในช่วงเวลาเดิมหรือไม่
    const currentTime = Date.now();
    const timeElapsed = currentTime - rateLimitData.timestamp;
    
    // ถ้าช่วงเวลาปัจจุบันไม่อยู่ในช่วงเวลาเดิม
    if (timeElapsed > WINDOW_SIZE) {
      // รีเซ็ตข้อมูลการจำกัดจำนวนคำขอ
      rateLimitData.count = 1;
      rateLimitData.timestamp = currentTime;
    } else {
      // เพิ่มจำนวนคำขอ
      rateLimitData.count++;
    }
    
    // บันทึกข้อมูลการจำกัดจำนวนคำขอลงในแมป
    rateLimit.set(key, rateLimitData);
    
    // ตรวจสอบว่าจำนวนคำขอเกินกว่าที่กำหนดหรือไม่
    if (rateLimitData.count > MAX_REQUESTS) {
      // สร้าง response สำหรับข้อผิดพลาด 429 Too Many Requests
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          message: 'Rate limit exceeded',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((WINDOW_SIZE - timeElapsed) / 1000).toString(),
          },
        }
      );
    }
    
    // สร้าง response ใหม่
    const response = NextResponse.next();
    
    // เพิ่ม headers สำหรับการจำกัดจำนวนคำขอ
    response.headers.set('X-RateLimit-Limit', MAX_REQUESTS.toString());
    response.headers.set('X-RateLimit-Remaining', (MAX_REQUESTS - rateLimitData.count).toString());
    response.headers.set('X-RateLimit-Reset', (rateLimitData.timestamp + WINDOW_SIZE).toString());
    
    // ส่ง response กลับ
    return response;
  }
  
  // ถ้าไม่ใช่เส้นทาง API ให้ดำเนินการต่อไป
  return NextResponse.next();
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ['/api/:path*'],
};`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้วิธีการใช้งาน Middleware ใน Next.js ดังนี้:

1. พื้นฐานของ Middleware
2. การเปลี่ยนเส้นทางใน Middleware
3. การตรวจสอบการยืนยันตัวตนใน Middleware
4. การจัดการภาษาใน Middleware
5. การเพิ่ม Headers ใน Middleware
6. การทดสอบ A/B ใน Middleware
7. การใช้งาน Middleware กับ Edge Functions
8. การใช้งาน Middleware กับ NextAuth.js
9. การใช้งาน Middleware กับ Rate Limiting

Middleware เป็นฟีเจอร์ที่ทรงพลังของ Next.js ที่ช่วยให้คุณสามารถรันโค้ดก่อนที่คำขอจะถูกประมวลผลเสร็จสิ้น ซึ่งช่วยให้คุณสามารถปรับแต่งการตอบสนองตามเงื่อนไขต่างๆ ได้`;

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของตัวอย่าง */}
      <div className="mb-8">
        <div className="flex items-center text-text-secondary mb-4">
          <Link href="/examples" className="flex items-center hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            กลับไปยังรายการตัวอย่าง
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Middleware</h1>
            <p className="text-text-secondary">ตัวอย่างการใช้งาน Middleware ใน Next.js</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับกลาง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              20 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาตัวอย่าง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={exampleContent} />
        <MarkdownContent content={middlewareBasicsContent} />
        <CodeBlock code={basicMiddlewareCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={redirectContent} />
        <CodeBlock code={redirectCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={authMiddlewareContent} />
        <CodeBlock code={authMiddlewareCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={i18nMiddlewareContent} />
        <CodeBlock code={i18nMiddlewareCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={headersMiddlewareContent} />
        <CodeBlock code={headersMiddlewareCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={abTestingContent} />
        <CodeBlock code={abTestingCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={edgeFunctionsContent} />
        <CodeBlock code={edgeFunctionsCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={nextAuthMiddlewareContent} />
        <CodeBlock code={nextAuthMiddlewareCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={rateLimitingContent} />
        <CodeBlock code={rateLimitingCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
