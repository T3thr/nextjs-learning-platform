import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงแนวทางการจัดการเส้นทางและการนำทางใน Next.js
export default function RoutingNavigationGuideline() {
  // เนื้อหาแนวทางในรูปแบบ Markdown
  const guidelineContent = `# การจัดการเส้นทางและการนำทาง

การจัดการเส้นทาง (Routing) และการนำทาง (Navigation) เป็นส่วนสำคัญของแอปพลิเคชัน Next.js ใน Next.js 13+ มีการแนะนำ App Router ซึ่งเป็นระบบเส้นทางใหม่ที่ใช้ React Server Components และมีความยืดหยุ่นมากขึ้น ในคู่มือนี้ เราจะแนะนำวิธีการใช้งาน App Router และการนำทางใน Next.js ตามมาตรฐานองค์กรของเรา

## โครงสร้างเส้นทางใน App Router

ใน App Router ของ Next.js เส้นทางจะถูกกำหนดโดยโครงสร้างโฟลเดอร์ภายใน \`app\` directory โดยแต่ละโฟลเดอร์จะแทนส่วนของ URL path:`;

  // โค้ดตัวอย่างสำหรับโครงสร้างเส้นทาง
  const routingStructureCode = `app/                  # Route: /
├── page.tsx           # หน้าแรก (/)
├── about/             # Route: /about
│   └── page.tsx       # หน้าเกี่ยวกับเรา (/about)
├── blog/              # Route: /blog
│   ├── page.tsx       # หน้ารายการบทความ (/blog)
│   └── [slug]/        # Dynamic route
│       └── page.tsx   # หน้ารายละเอียดบทความ (/blog/article-1)
└── dashboard/         # Route: /dashboard
    ├── page.tsx       # หน้าแดชบอร์ด (/dashboard)
    ├── settings/      # Route: /dashboard/settings
    │   └── page.tsx   # หน้าตั้งค่า (/dashboard/settings)
    └── analytics/     # Route: /dashboard/analytics
        └── page.tsx   # หน้าวิเคราะห์ข้อมูล (/dashboard/analytics)`;

  // เนื้อหาเกี่ยวกับไฟล์พิเศษใน App Router
  const specialFilesContent = `## ไฟล์พิเศษใน App Router

App Router มีไฟล์พิเศษหลายไฟล์ที่มีหน้าที่เฉพาะ:

- **page.tsx** - กำหนดหน้าที่จะแสดงและทำให้เส้นทางสามารถเข้าถึงได้
- **layout.tsx** - กำหนด UI ที่ใช้ร่วมกันระหว่างหน้าต่างๆ
- **loading.tsx** - แสดงสถานะโหลดขณะที่หน้ากำลังโหลด
- **error.tsx** - แสดงข้อผิดพลาดเมื่อเกิดข้อผิดพลาดในหน้า
- **not-found.tsx** - แสดงเมื่อไม่พบหน้าที่ต้องการ
- **route.ts** - กำหนด API endpoints (สำหรับ API Routes)

ตัวอย่างการใช้งานไฟล์พิเศษเหล่านี้:`;

  // โค้ดตัวอย่างสำหรับไฟล์พิเศษ
  const specialFilesCode = `// app/layout.tsx - Layout หลักของแอปพลิเคชัน
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <header>
          <nav>{/* เมนูนำทาง */}</nav>
        </header>
        <main>{children}</main>
        <footer>{/* ส่วนท้าย */}</footer>
      </body>
    </html>
  );
}

// app/loading.tsx - แสดงขณะที่หน้ากำลังโหลด
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

// app/error.tsx - แสดงเมื่อเกิดข้อผิดพลาด
"use client"

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // บันทึกข้อผิดพลาดไปยัง error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">เกิดข้อผิดพลาด</h2>
      <p className="text-text-secondary mb-4">ขออภัย เกิดข้อผิดพลาดบางอย่าง</p>
      <button
        onClick={reset}
        className="btn btn-primary"
      >
        ลองใหม่อีกครั้ง
      </button>
    </div>
  );
}

// app/not-found.tsx - แสดงเมื่อไม่พบหน้า
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">404 - ไม่พบหน้าที่ต้องการ</h2>
      <p className="text-text-secondary mb-4">ขออภัย เราไม่พบหน้าที่คุณกำลังมองหา</p>
      <Link href="/" className="btn btn-primary">
        กลับไปยังหน้าแรก
      </Link>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับ Route Groups
  const routeGroupsContent = `## Route Groups

Route Groups ช่วยให้คุณสามารถจัดกลุ่มเส้นทางโดยไม่ส่งผลต่อโครงสร้าง URL โดยใช้วงเล็บ \`()\` ในชื่อโฟลเดอร์:`;

  // โค้ดตัวอย่างสำหรับ Route Groups
  const routeGroupsCode = `app/
├── (marketing)/      # Route Group (ไม่ส่งผลต่อ URL)
│   ├── page.tsx      # หน้าแรก (/)
│   ├── about/        # /about
│   │   └── page.tsx
│   └── blog/         # /blog
│       └── page.tsx
├── (shop)/           # Route Group อีกกลุ่ม
│   ├── products/     # /products
│   │   └── page.tsx
│   └── cart/         # /cart
│       └── page.tsx
└── (auth)/           # Route Group สำหรับการยืนยันตัวตน
    ├── login/        # /login
    │   └── page.tsx
    └── register/     # /register
        └── page.tsx`;

  // เนื้อหาเกี่ยวกับ Dynamic Routes
  const dynamicRoutesContent = `## Dynamic Routes

Dynamic Routes ช่วยให้คุณสามารถสร้างเส้นทางที่มีพารามิเตอร์ได้ โดยใช้วงเล็บเหลี่ยม \`[]\` ในชื่อโฟลเดอร์:`;

  // โค้ดตัวอย่างสำหรับ Dynamic Routes
  const dynamicRoutesCode = `// app/blog/[slug]/page.tsx
export default function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>บทความ: {params.slug}</h1>
      {/* เนื้อหาบทความ */}
    </div>
  );
}

// app/products/[category]/[id]/page.tsx
export default function Product({
  params,
}: {
  params: { category: string; id: string };
}) {
  return (
    <div>
      <h1>สินค้า: {params.id}</h1>
      <p>หมวดหมู่: {params.category}</p>
      {/* รายละเอียดสินค้า */}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับ Catch-all Routes
  const catchAllRoutesContent = `## Catch-all Routes

Catch-all Routes ช่วยให้คุณสามารถจับทุกส่วนของเส้นทางที่เหลือได้ โดยใช้ \`[...slug]\` ในชื่อโฟลเดอร์:`;

  // โค้ดตัวอย่างสำหรับ Catch-all Routes
  const catchAllRoutesCode = `// app/docs/[...slug]/page.tsx
export default function Docs({
  params,
}: {
  params: { slug: string[] };
}) {
  // slug จะเป็น array เช่น ['getting-started', 'installation']
  // สำหรับ URL /docs/getting-started/installation
  return (
    <div>
      <h1>เอกสาร: {params.slug.join('/')}</h1>
      {/* เนื้อหาเอกสาร */}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับ Optional Catch-all Routes
  const optionalCatchAllRoutesContent = `## Optional Catch-all Routes

Optional Catch-all Routes คล้ายกับ Catch-all Routes แต่จะทำงานแม้ว่าจะไม่มีพารามิเตอร์ โดยใช้ \`[[...slug]]\` ในชื่อโฟลเดอร์:`;

  // โค้ดตัวอย่างสำหรับ Optional Catch-all Routes
  const optionalCatchAllRoutesCode = `// app/dashboard/[[...slug]]/page.tsx
export default function Dashboard({
  params,
}: {
  params: { slug?: string[] };
}) {
  // slug จะเป็น undefined สำหรับ /dashboard
  // slug จะเป็น ['settings'] สำหรับ /dashboard/settings
  // slug จะเป็น ['settings', 'profile'] สำหรับ /dashboard/settings/profile
  return (
    <div>
      <h1>แดชบอร์ด</h1>
      {params.slug ? (
        <p>หน้าย่อย: {params.slug.join('/')}</p>
      ) : (
        <p>หน้าแดชบอร์ดหลัก</p>
      )}
      {/* เนื้อหาแดชบอร์ด */}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการนำทางใน Next.js
  const navigationContent = `## การนำทางใน Next.js

Next.js มีหลายวิธีในการนำทางระหว่างหน้าต่างๆ:

### 1. การใช้ Link Component

\`Link\` component เป็นวิธีที่แนะนำสำหรับการนำทางระหว่างหน้าต่างๆ ใน Next.js:`;

  // โค้ดตัวอย่างสำหรับ Link Component
  const linkComponentCode = `// app/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4">
      <Link href="/" className="hover:text-primary">
        หน้าแรก
      </Link>
      <Link href="/about" className="hover:text-primary">
        เกี่ยวกับเรา
      </Link>
      <Link href="/blog" className="hover:text-primary">
        บทความ
      </Link>
      <Link href="/products" className="hover:text-primary">
        สินค้า
      </Link>
      <Link 
        href="/dashboard" 
        className="hover:text-primary"
        prefetch={false} // ไม่ต้อง prefetch หน้านี้
      >
        แดชบอร์ด
      </Link>
    </nav>
  );
}

// การใช้ Link กับ Dynamic Routes
<Link href={\`/blog/\${post.slug}\`}>
  อ่านบทความ
</Link>

// การใช้ Link กับ Object URL
<Link
  href={{
    pathname: '/blog/[slug]',
    query: { slug: post.slug },
  }}
>
  อ่านบทความ
</Link>`;

  // เนื้อหาเกี่ยวกับ useRouter
  const useRouterContent = `### 2. การใช้ useRouter Hook

\`useRouter\` hook ใช้สำหรับการนำทางแบบโปรแกรมเมติก (programmatic navigation) ใน Client Components:`;

  // โค้ดตัวอย่างสำหรับ useRouter
  const useRouterCode = `// app/components/LoginForm.tsx
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // ส่งข้อมูลไปยัง API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        // เมื่อเข้าสู่ระบบสำเร็จ นำทางไปยังแดชบอร์ด
        router.push('/dashboard');
      } else {
        // จัดการข้อผิดพลาด
        const data = await response.json();
        alert(data.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', error);
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-1">อีเมล</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1">รหัสผ่าน</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        เข้าสู่ระบบ
      </button>
      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push('/auth/register')}
          className="text-primary hover:underline"
        >
          ยังไม่มีบัญชี? ลงทะเบียน
        </button>
      </div>
    </form>
  );
}`;

  // เนื้อหาเกี่ยวกับ Middleware
  const middlewareContent = `## Middleware

Middleware ใน Next.js ช่วยให้คุณสามารถรันโค้ดก่อนที่จะเข้าถึงเส้นทาง ซึ่งเหมาะสำหรับการตรวจสอบการยืนยันตัวตน การเปลี่ยนเส้นทาง หรือการปรับแต่ง response:`;

  // โค้ดตัวอย่างสำหรับ Middleware
  const middlewareCode = `// middleware.ts (ในโฟลเดอร์ root ของโปรเจค)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ตรวจสอบว่ามี token ใน cookies หรือไม่
  const token = request.cookies.get('token')?.value;
  
  // ถ้าเข้าถึงหน้าที่ต้องการการยืนยันตัวตนแต่ไม่มี token
  if (
    request.nextUrl.pathname.startsWith('/dashboard') &&
    !token
  ) {
    // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // ถ้ามี token แล้วพยายามเข้าถึงหน้าเข้าสู่ระบบหรือลงทะเบียน
  if (
    (request.nextUrl.pathname.startsWith('/auth/login') ||
     request.nextUrl.pathname.startsWith('/auth/register')) &&
    token
  ) {
    // เปลี่ยนเส้นทางไปยังแดชบอร์ด
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // ถ้าไม่มีเงื่อนไขใดๆ ให้ดำเนินการต่อไป
  return NextResponse.next();
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/login',
    '/auth/register',
  ],
};`;

  // เนื้อหาสรุป
  const summaryContent = `## แนวทางปฏิบัติที่ดีในการจัดการเส้นทางและการนำทาง

1. **ใช้ App Router** - ใช้ App Router แทน Pages Router ในโปรเจคใหม่
2. **จัดโครงสร้างเส้นทางให้เป็นระเบียบ** - ใช้ Route Groups เพื่อจัดกลุ่มเส้นทางที่เกี่ยวข้องกัน
3. **ใช้ Link Component** - ใช้ \`Link\` component สำหรับการนำทางระหว่างหน้าต่างๆ
4. **ใช้ useRouter สำหรับการนำทางแบบโปรแกรมเมติก** - ใช้ \`useRouter\` hook เมื่อต้องการนำทางหลังจากการทำงานบางอย่าง
5. **ใช้ Middleware สำหรับการตรวจสอบการยืนยันตัวตน** - ใช้ Middleware เพื่อป้องกันเส้นทางที่ต้องการการยืนยันตัวตน
6. **ใช้ loading.tsx และ error.tsx** - ใช้ไฟล์พิเศษเพื่อจัดการสถานะโหลดและข้อผิดพลาด

## ขั้นตอนต่อไป

หลังจากที่คุณได้เรียนรู้เกี่ยวกับการจัดการเส้นทางและการนำทางใน Next.js แล้ว คุณสามารถศึกษาแนวทางต่อไปนี้:

1. [การจัดการ UI และ Styling](/guidelines/styling-ui) - เรียนรู้วิธีการใช้งาน Tailwind CSS และการสร้าง UI Components
2. [การดึงข้อมูลและการจัดการ API](/guidelines/data-fetching) - เรียนรู้วิธีการดึงข้อมูลและการสร้าง API Routes
3. [การยืนยันตัวตนด้วย NextAuth.js](/guidelines/authentication) - เรียนรู้วิธีการใช้งาน NextAuth.js สำหรับการยืนยันตัวตน`;

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของแนวทาง */}
      <div className="mb-8">
        <div className="flex items-center text-text-secondary mb-4">
          <Link href="/guidelines" className="flex items-center hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            กลับไปยังรายการแนวทาง
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">การจัดการเส้นทางและการนำทาง</h1>
            <p className="text-text-secondary">แนวทางการใช้งาน App Router และการนำทางใน Next.js</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs mr-2">
              เริ่มต้น
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              25 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาแนวทาง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={guidelineContent} />
        <CodeBlock code={routingStructureCode} language="plaintext" fileName="โครงสร้างเส้นทาง" />
        <MarkdownContent content={specialFilesContent} />
        <CodeBlock code={specialFilesCode} language="typescript" fileName="ไฟล์พิเศษใน App Router" />
        <MarkdownContent content={routeGroupsContent} />
        <CodeBlock code={routeGroupsCode} language="plaintext" fileName="Route Groups" />
        <MarkdownContent content={dynamicRoutesContent} />
        <CodeBlock code={dynamicRoutesCode} language="typescript" fileName="Dynamic Routes" />
        <MarkdownContent content={catchAllRoutesContent} />
        <CodeBlock code={catchAllRoutesCode} language="typescript" fileName="Catch-all Routes" />
        <MarkdownContent content={optionalCatchAllRoutesContent} />
        <CodeBlock code={optionalCatchAllRoutesCode} language="typescript" fileName="Optional Catch-all Routes" />
        <MarkdownContent content={navigationContent} />
        <CodeBlock code={linkComponentCode} language="typescript" fileName="Link Component" />
        <MarkdownContent content={useRouterContent} />
        <CodeBlock code={useRouterCode} language="typescript" fileName="useRouter Hook" />
        <MarkdownContent content={middlewareContent} />
        <CodeBlock code={middlewareCode} language="typescript" fileName="middleware.ts" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
