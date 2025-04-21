import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงรายละเอียดบทเรียนการจัดการข้อมูลใน Next.js
export default function DataFetchingPage() {
  // เนื้อหาบทเรียนในรูปแบบ Markdown
  const lessonContent = `# การจัดการข้อมูลใน Next.js

Next.js 13+ มาพร้อมกับวิธีการจัดการข้อมูลแบบใหม่ที่ใช้ประโยชน์จาก React Server Components ทำให้การดึงข้อมูลทำได้ง่ายและมีประสิทธิภาพมากขึ้น

## การดึงข้อมูลใน Server Components

ใน Server Components คุณสามารถใช้ async/await ในการดึงข้อมูลได้โดยตรง โดยไม่จำเป็นต้องใช้ useEffect หรือ useState เหมือนใน Client Components ทั่วไป ซึ่งทำให้โค้ดสั้นลงและอ่านง่ายขึ้น`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลใน Server Components
  const serverFetchingCode = `// app/users/page.tsx
// ไม่ต้องใส่ "use client" เพราะเป็น Server Component โดยค่าเริ่มต้น

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก API
async function getUsers() {
  // ใช้ fetch API ในการดึงข้อมูล (ทำงานบนเซิร์ฟเวอร์)
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  
  // ตรวจสอบสถานะการตอบกลับ
  if (!res.ok) {
    throw new Error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
  }
  
  return res.json();
}

// คอมโพเนนต์หน้าแสดงรายชื่อผู้ใช้
export default async function UsersPage() {
  // ดึงข้อมูลผู้ใช้โดยตรงในคอมโพเนนต์ (ไม่ต้องใช้ useEffect)
  const users = await getUsers();
  
  return (
    <div>
      <h1>รายชื่อผู้ใช้</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการดึงข้อมูลแบบขนาน
  const parallelFetchingContent = `## การดึงข้อมูลแบบขนาน

ใน Next.js คุณสามารถดึงข้อมูลหลายรายการพร้อมกันได้โดยใช้ Promise.all หรือ Promise.allSettled ซึ่งจะช่วยลดเวลาในการโหลดข้อมูล:`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลแบบขนาน
  const parallelFetchingCode = `// app/dashboard/page.tsx
async function getDashboardData() {
  // ดึงข้อมูลหลายรายการพร้อมกัน
  const [usersPromise, postsPromise, commentsPromise] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
    fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
    fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json())
  ]);
  
  return {
    users: usersPromise,
    posts: postsPromise,
    comments: commentsPromise
  };
}

export default async function DashboardPage() {
  // ดึงข้อมูลทั้งหมดสำหรับแดชบอร์ด
  const { users, posts, comments } = await getDashboardData();
  
  return (
    <div>
      <h1>แดชบอร์ด</h1>
      <div className="stats">
        <div>จำนวนผู้ใช้: {users.length}</div>
        <div>จำนวนโพสต์: {posts.length}</div>
        <div>จำนวนความคิดเห็น: {comments.length}</div>
      </div>
      
      {/* แสดงข้อมูลอื่นๆ */}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับ Static และ Dynamic Data Fetching
  const staticDynamicContent = `## Static vs Dynamic Data Fetching

Next.js มีตัวเลือกในการดึงข้อมูลแบบ Static (ข้อมูลถูกดึงตอนสร้างเว็บไซต์) และ Dynamic (ข้อมูลถูกดึงทุกครั้งที่มีการร้องขอ) ซึ่งคุณสามารถควบคุมได้ด้วย cache และ revalidate options:`;

  // โค้ดตัวอย่างสำหรับ Static และ Dynamic Data Fetching
  const staticDynamicCode = `// Static Data Fetching (ค่าเริ่มต้น)
// ข้อมูลจะถูกดึงตอนสร้างเว็บไซต์และถูกแคชไว้
async function getStaticData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'force-cache' // ค่าเริ่มต้น - ข้อมูลจะถูกแคชไว้
  });
  
  return res.json();
}

// Dynamic Data Fetching
// ข้อมูลจะถูกดึงใหม่ทุกครั้งที่มีการร้องขอ
async function getDynamicData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // ไม่แคชข้อมูล - ดึงข้อมูลใหม่ทุกครั้ง
  });
  
  return res.json();
}

// Incremental Static Regeneration (ISR)
// ข้อมูลจะถูกดึงใหม่ตามระยะเวลาที่กำหนด
async function getISRData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 } // ดึงข้อมูลใหม่ทุก 60 วินาที
  });
  
  return res.json();
}`;

  // เนื้อหาเกี่ยวกับการดึงข้อมูลใน Client Components
  const clientFetchingContent = `## การดึงข้อมูลใน Client Components

ถึงแม้ว่า Server Components จะเป็นวิธีที่แนะนำสำหรับการดึงข้อมูลใน Next.js 13+ แต่บางครั้งคุณอาจจำเป็นต้องดึงข้อมูลใน Client Components เช่น เมื่อต้องการดึงข้อมูลหลังจากการกระทำของผู้ใช้:`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลใน Client Components
  const clientFetchingCode = `// app/search/page.tsx
"use client"

import { useState, useEffect } from 'react';

// คอมโพเนนต์สำหรับค้นหาผู้ใช้
export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // ฟังก์ชันสำหรับค้นหาผู้ใช้
  const searchUsers = async () => {
    if (!query) return;
    
    setLoading(true);
    
    try {
      const res = await fetch(\`https://jsonplaceholder.typicode.com/users?q=\${query}\`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการค้นหา:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>ค้นหาผู้ใช้</h1>
      
      <div className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาผู้ใช้..."
        />
        <button onClick={searchUsers} disabled={loading}>
          {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
        </button>
      </div>
      
      {results.length > 0 && (
        <ul className="results">
          {results.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับ Route Handlers
  const routeHandlersContent = `## Route Handlers

Next.js 13+ มี Route Handlers ที่ช่วยให้คุณสามารถสร้าง API endpoints ได้ง่ายๆ ภายในแอปพลิเคชันของคุณ:`;

  // โค้ดตัวอย่างสำหรับ Route Handlers
  const routeHandlersCode = `// app/api/users/route.ts
import { NextResponse } from 'next/server';

// GET handler
export async function GET(request: Request) {
  // ดึงข้อมูลผู้ใช้จากฐานข้อมูลหรือ API ภายนอก
  const users = [
    { id: 1, name: 'สมชาย' },
    { id: 2, name: 'สมหญิง' },
    { id: 3, name: 'สมศักดิ์' }
  ];
  
  // ส่งข้อมูลกลับในรูปแบบ JSON
  return NextResponse.json(users);
}

// POST handler
export async function POST(request: Request) {
  // รับข้อมูลจาก request body
  const data = await request.json();
  
  // ตรวจสอบข้อมูล
  if (!data.name) {
    return NextResponse.json(
      { error: 'กรุณาระบุชื่อผู้ใช้' },
      { status: 400 }
    );
  }
  
  // สร้างผู้ใช้ใหม่ (จำลองการบันทึกลงฐานข้อมูล)
  const newUser = {
    id: Date.now(),
    name: data.name
  };
  
  // ส่งข้อมูลผู้ใช้ใหม่กลับไป
  return NextResponse.json(newUser, { status: 201 });
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในบทเรียนนี้ คุณได้เรียนรู้เกี่ยวกับ:

- การดึงข้อมูลใน Server Components ด้วย async/await
- การดึงข้อมูลแบบขนานเพื่อเพิ่มประสิทธิภาพ
- ความแตกต่างระหว่าง Static และ Dynamic Data Fetching
- การดึงข้อมูลใน Client Components
- การใช้งาน Route Handlers เพื่อสร้าง API endpoints

การจัดการข้อมูลใน Next.js 13+ ด้วย Server Components ช่วยให้การพัฒนาแอปพลิเคชันทำได้ง่ายขึ้น มีประสิทธิภาพมากขึ้น และมีโค้ดที่อ่านง่ายขึ้น

ในบทเรียนถัดไป เราจะเรียนรู้เกี่ยวกับสถาปัตยกรรมระดับองค์กรสำหรับแอปพลิเคชัน Next.js ขนาดใหญ่`;

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
            <h1 className="text-3xl font-bold mb-2">การจัดการข้อมูลใน Next.js</h1>
            <p className="text-text-secondary">เรียนรู้วิธีการดึงข้อมูลใน Next.js ด้วย Server Components</p>
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
      
      {/* เนื้อหาบทเรียน */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={lessonContent} lessonId="3" />
        <CodeBlock code={serverFetchingCode} language="typescript" fileName="app/users/page.tsx" />
        <MarkdownContent content={parallelFetchingContent} />
        <CodeBlock code={parallelFetchingCode} language="typescript" fileName="app/dashboard/page.tsx" />
        <MarkdownContent content={staticDynamicContent} />
        <CodeBlock code={staticDynamicCode} language="typescript" fileName="Data Fetching Options" />
        <MarkdownContent content={clientFetchingContent} />
        <CodeBlock code={clientFetchingCode} language="typescript" fileName="app/search/page.tsx" />
        <MarkdownContent content={routeHandlersContent} />
        <CodeBlock code={routeHandlersCode} language="typescript" fileName="app/api/users/route.ts" />
        <MarkdownContent content={summaryContent} />
        
        {/* ปุ่มนำทาง */}
        <div className="mt-12 pt-6 border-t border-text-secondary/10 flex justify-between">
          <Link href="/lessons/app-router-basics" className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            บทเรียนก่อนหน้า: พื้นฐาน App Router
          </Link>
          <Link href="/lessons/enterprise-architecture" className="btn btn-primary">
            บทเรียนถัดไป: สถาปัตยกรรมระดับองค์กร
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
          <Link href="/exercises/3" className="block hover:bg-background rounded-lg p-4 transition-colors">
            <h3 className="font-bold mb-1">สร้างหน้าแสดงข้อมูลจาก API</h3>
            <p className="text-text-secondary">ฝึกการดึงข้อมูลจาก API และแสดงผลใน Next.js</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
