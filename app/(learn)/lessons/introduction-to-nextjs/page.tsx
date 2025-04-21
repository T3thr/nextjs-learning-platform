import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงรายละเอียดบทเรียน Next.js พื้นฐาน
export default function IntroductionToNextjsPage() {
  // เนื้อหาบทเรียนในรูปแบบ Markdown
  const lessonContent = `# แนะนำ Next.js

Next.js เป็นเฟรมเวิร์กสำหรับ React ที่มีคุณสมบัติมากมาย เช่น การเรนเดอร์ฝั่งเซิร์ฟเวอร์ การสร้างเว็บไซต์แบบสถิต และอื่นๆ อีกมากมาย

## ประโยชน์ของ Next.js

- การเรนเดอร์ฝั่งเซิร์ฟเวอร์ (Server-side Rendering)
- การสร้างเว็บไซต์แบบสถิต (Static Site Generation)
- การแบ่งโค้ดอัตโนมัติ (Automatic Code Splitting)
- การจัดการเส้นทาง (File-system Routing)
- การโหลดข้อมูลแบบง่าย (Simplified Data Fetching)

## การติดตั้ง Next.js

การเริ่มต้นโปรเจค Next.js ใหม่สามารถทำได้ง่ายๆ ด้วยคำสั่งต่อไปนี้:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง Next.js
  const installationCode = `npx create-next-app@latest my-app
cd my-app
npm run dev`;

  // เนื้อหาเพิ่มเติม
  const additionalContent = `## โครงสร้างโปรเจค Next.js

เมื่อคุณสร้างโปรเจค Next.js ใหม่ คุณจะได้โครงสร้างไฟล์ดังนี้:`;

  // โค้ดตัวอย่างสำหรับโครงสร้างโปรเจค
  const projectStructureCode = `my-app/
├── app/                 # App Router (Next.js 13+)
│   ├── layout.tsx       # Layout หลัก
│   ├── page.tsx         # หน้าแรก
│   └── globals.css      # CSS ทั่วไป
├── public/              # ไฟล์สถิต (รูปภาพ, ฟอนต์, ฯลฯ)
├── components/          # React Components
├── next.config.js       # การตั้งค่า Next.js
├── package.json         # Dependencies
└── tsconfig.json        # การตั้งค่า TypeScript`;

  // เนื้อหาส่วนสุดท้าย
  const finalContent = `## การสร้างหน้าแรกใน Next.js

ใน Next.js หน้าแรกของเว็บไซต์จะอยู่ที่ \`app/page.tsx\` (สำหรับ App Router) หรือ \`pages/index.tsx\` (สำหรับ Pages Router)

ตัวอย่างหน้าแรกอย่างง่าย:`;

  // โค้ดตัวอย่างสำหรับหน้าแรก
  const homePageCode = `// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">ยินดีต้อนรับสู่ Next.js</h1>
      <p className="text-xl">เริ่มต้นสร้างแอปพลิเคชันของคุณได้เลย!</p>
    </main>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในบทเรียนนี้ คุณได้เรียนรู้เกี่ยวกับ:

- Next.js คืออะไรและประโยชน์ของการใช้งาน
- วิธีการติดตั้ง Next.js และเริ่มต้นโปรเจคใหม่
- โครงสร้างโปรเจค Next.js พื้นฐาน
- การสร้างหน้าแรกอย่างง่าย

ในบทเรียนถัดไป เราจะเรียนรู้เกี่ยวกับ App Router และวิธีการสร้างหน้าเว็บต่างๆ ใน Next.js`;

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
            <h1 className="text-3xl font-bold mb-2">แนะนำ Next.js</h1>
            <p className="text-text-secondary">ทำความรู้จักกับ Next.js และประโยชน์ของการใช้งาน</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs mr-2">
              เริ่มต้น
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              15 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาบทเรียน */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={lessonContent} lessonId="1" />
        <CodeBlock code={installationCode} language="bash" fileName="Terminal" />
        <MarkdownContent content={additionalContent} />
        <CodeBlock code={projectStructureCode} language="plaintext" fileName="โครงสร้างโปรเจค" />
        <MarkdownContent content={finalContent} />
        <CodeBlock code={homePageCode} language="typescript" fileName="app/page.tsx" />
        <MarkdownContent content={summaryContent} />
        
        {/* ปุ่มนำทาง */}
        <div className="mt-12 pt-6 border-t border-text-secondary/10 flex justify-between">
          <div></div> {/* ไม่มีบทเรียนก่อนหน้า */}
          <Link href="/lessons/app-router-basics" className="btn btn-primary">
            บทเรียนถัดไป: พื้นฐาน App Router
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
          <Link href="/exercises/1" className="block hover:bg-background rounded-lg p-4 transition-colors">
            <h3 className="font-bold mb-1">สร้างหน้าแรกด้วย Next.js</h3>
            <p className="text-text-secondary">ฝึกสร้างหน้าแรกของเว็บไซต์ด้วย Next.js</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
