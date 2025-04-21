import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงรายละเอียดบทเรียน App Router พื้นฐาน
export default function AppRouterBasicsPage() {
  // เนื้อหาบทเรียนในรูปแบบ Markdown
  const lessonContent = `# พื้นฐาน App Router

App Router เป็นระบบเส้นทางใหม่ใน Next.js 13+ ที่ใช้แนวคิดของ React Server Components และมีการจัดการเส้นทางแบบใหม่ที่อิงกับระบบไฟล์

## ข้อดีของ App Router

- รองรับ React Server Components
- การโหลดข้อมูลที่ง่ายขึ้นด้วย async/await
- การแบ่งโค้ดอัตโนมัติตามเส้นทาง
- การจัดการ layout ที่ซ้อนกันได้
- การจัดการ loading และ error states ในแต่ละเส้นทาง

## โครงสร้างไฟล์ของ App Router

App Router ใช้ไฟล์พิเศษหลายชนิดในการกำหนดพฤติกรรมของแต่ละเส้นทาง:`;

  // โค้ดตัวอย่างสำหรับโครงสร้างไฟล์
  const fileStructureCode = `app/                  # โฟลเดอร์หลักของ App Router
├── layout.tsx        # Layout หลักที่ใช้กับทุกหน้า
├── page.tsx          # หน้าแรก (/)
├── about/            # เส้นทาง /about
│   └── page.tsx      # หน้า About
├── blog/             # เส้นทาง /blog
│   ├── layout.tsx    # Layout สำหรับหน้า Blog ทั้งหมด
│   ├── page.tsx      # หน้ารายการบทความ (/blog)
│   └── [slug]/       # เส้นทางแบบไดนามิก /blog/:slug
│       └── page.tsx  # หน้ารายละเอียดบทความ`;

  // เนื้อหาเพิ่มเติม
  const additionalContent = `## Server Components vs Client Components

Next.js 13+ มาพร้อมกับ React Server Components ซึ่งเป็นคอมโพเนนต์ที่ทำงานบนเซิร์ฟเวอร์เท่านั้น โดยค่าเริ่มต้น คอมโพเนนต์ทั้งหมดใน App Router จะเป็น Server Components ยกเว้นจะระบุว่าเป็น Client Component ด้วย "use client" directive`;

  // โค้ดตัวอย่างสำหรับ Server Components และ Client Components
  const componentsCode = `// Server Component (ค่าเริ่มต้น)
// app/server-component.tsx
export default function ServerComponent() {
  return <h1>นี่คือ Server Component</h1>;
}

// Client Component
// app/client-component.tsx
"use client"

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>นี่คือ Client Component</h1>
      <button onClick={() => setCount(count + 1)}>
        คลิก {count} ครั้ง
      </button>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการสร้างเส้นทาง
  const routingContent = `## การสร้างเส้นทางพื้นฐาน

การสร้างเส้นทางใน App Router ทำได้โดยการสร้างโฟลเดอร์และไฟล์ \`page.tsx\` ตามโครงสร้างที่ต้องการ:`;

  // โค้ดตัวอย่างสำหรับการสร้างเส้นทาง
  const routingCode = `// app/page.tsx - เส้นทาง /
export default function HomePage() {
  return <h1>หน้าแรก</h1>;
}

// app/about/page.tsx - เส้นทาง /about
export default function AboutPage() {
  return <h1>เกี่ยวกับเรา</h1>;
}

// app/blog/page.tsx - เส้นทาง /blog
export default function BlogPage() {
  return <h1>บทความทั้งหมด</h1>;
}`;

  // เนื้อหาเกี่ยวกับเส้นทางแบบไดนามิก
  const dynamicRoutingContent = `## เส้นทางแบบไดนามิก

App Router รองรับเส้นทางแบบไดนามิกโดยใช้วงเล็บเหลี่ยม \`[param]\` ในชื่อโฟลเดอร์:`;

  // โค้ดตัวอย่างสำหรับเส้นทางแบบไดนามิก
  const dynamicRoutingCode = `// app/blog/[slug]/page.tsx - เส้นทาง /blog/:slug
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>บทความ: {params.slug}</h1>;
}

// app/products/[category]/[id]/page.tsx - เส้นทาง /products/:category/:id
export default function Product({ 
  params 
}: { 
  params: { category: string; id: string } 
}) {
  return (
    <div>
      <h1>สินค้า: {params.id}</h1>
      <p>หมวดหมู่: {params.category}</p>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับ Layout
  const layoutContent = `## การใช้งาน Layout

Layout ใน App Router ช่วยให้คุณสามารถแบ่งปัน UI ระหว่างหน้าต่างๆ ได้ โดย UI ที่อยู่ใน layout จะไม่ถูกเรนเดอร์ใหม่เมื่อผู้ใช้นำทางระหว่างหน้าที่ใช้ layout เดียวกัน:`;

  // โค้ดตัวอย่างสำหรับ Layout
  const layoutCode = `// app/layout.tsx - Layout หลักสำหรับทั้งแอปพลิเคชัน
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <header>
          <nav>
            {/* เมนูนำทาง */}
          </nav>
        </header>
        
        <main>{children}</main>
        
        <footer>
          {/* ส่วนท้ายเว็บไซต์ */}
        </footer>
      </body>
    </html>
  );
}

// app/blog/layout.tsx - Layout สำหรับส่วน blog
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <aside>
        {/* เมนูด้านข้างสำหรับส่วน blog */}
      </aside>
      
      <div>{children}</div>
    </div>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในบทเรียนนี้ คุณได้เรียนรู้เกี่ยวกับ:

- App Router คืออะไรและข้อดีของการใช้งาน
- โครงสร้างไฟล์ของ App Router
- ความแตกต่างระหว่าง Server Components และ Client Components
- การสร้างเส้นทางพื้นฐานและเส้นทางแบบไดนามิก
- การใช้งาน Layout เพื่อแบ่งปัน UI ระหว่างหน้าต่างๆ

ในบทเรียนถัดไป เราจะเรียนรู้เกี่ยวกับการจัดการข้อมูลใน Next.js ด้วย Server Components`;

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของบทเรียน */}
      <div className="mb-8">
        <div className="flex items-center text-text-secondary mb-4">
          <Link href="/lessons" className="flex items-center hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            กลับไปยังรายการบทเรียน
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">พื้นฐาน App Router</h1>
            <p className="text-text-secondary">เรียนรู้การใช้งาน App Router ใน Next.js 13+</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs mr-2">
              เริ่มต้น
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
      
      {/* เนื้อหาบทเรียน */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={lessonContent} lessonId="2" />
        <CodeBlock code={fileStructureCode} language="plaintext" fileName="โครงสร้างไฟล์ App Router" />
        <MarkdownContent content={additionalContent} />
        <CodeBlock code={componentsCode} language="typescript" fileName="Server vs Client Components" />
        <MarkdownContent content={routingContent} />
        <CodeBlock code={routingCode} language="typescript" fileName="การสร้างเส้นทางพื้นฐาน" />
        <MarkdownContent content={dynamicRoutingContent} />
        <CodeBlock code={dynamicRoutingCode} language="typescript" fileName="เส้นทางแบบไดนามิก" />
        <MarkdownContent content={layoutContent} />
        <CodeBlock code={layoutCode} language="typescript" fileName="การใช้งาน Layout" />
        <MarkdownContent content={summaryContent} />
        
        {/* ปุ่มนำทาง */}
        <div className="mt-12 pt-6 border-t border-text-secondary/10 flex justify-between">
          <Link href="/lessons/introduction-to-nextjs" className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            บทเรียนก่อนหน้า: แนะนำ Next.js
          </Link>
          <Link href="/lessons/data-fetching" className="btn btn-primary">
            บทเรียนถัดไป: การจัดการข้อมูลใน Next.js
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* แบบฝึกหัดที่เกี่ยวข้อง */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">แบบฝึกหัดที่เกี่ยวข้อง</h2>
        <div className="bg-surface p-6 rounded-lg">
          <Link href="/exercises/2" className="block hover:bg-background rounded-lg p-4 transition-colors">
            <h3 className="font-bold mb-1">สร้างเส้นทางแบบไดนามิกด้วย App Router</h3>
            <p className="text-text-secondary">ฝึกสร้างเส้นทางแบบไดนามิกด้วย App Router ของ Next.js</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
