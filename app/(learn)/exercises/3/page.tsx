"use client";

import React, { Suspense } from 'react';
import CodeEditor from '@/components/CodeEditor';
import Link from 'next/link';

// หน้าแสดงรายละเอียดแบบฝึกหัดดึงข้อมูลด้วย Server Components
export default function DataFetchingExercisePage() {
  // ข้อมูลแบบฝึกหัด
  const exercise = {
    id: '3',
    title: 'ดึงข้อมูลด้วย Server Components',
    description: 'ฝึกการดึงข้อมูลจาก API ด้วย Server Components',
    difficulty: 'intermediate',
    points: 20,
    lessonId: '3',
    lessonTitle: 'การจัดการข้อมูลใน Next.js',
    instructions: `# ดึงข้อมูลด้วย Server Components

ในแบบฝึกหัดนี้ คุณจะได้ฝึกการดึงข้อมูลจาก API ด้วย Server Components ของ Next.js โดยใช้ความรู้ที่ได้เรียนมาจากบทเรียน "การจัดการข้อมูลใน Next.js"

## ขั้นตอน

1. สร้าง Server Component ที่ดึงข้อมูลผู้ใช้จาก API
2. แสดงรายการผู้ใช้ในรูปแบบการ์ด
3. จัดการกรณีที่การดึงข้อมูลล้มเหลว
4. เพิ่มการแสดงสถานะการโหลดข้อมูล

## เกณฑ์การให้คะแนน

- ดึงข้อมูลจาก API ด้วย fetch ใน Server Component ถูกต้อง (5 คะแนน)
- แสดงรายการผู้ใช้ในรูปแบบการ์ดที่มีการจัดวางที่ดี (5 คะแนน)
- จัดการกรณีที่การดึงข้อมูลล้มเหลวอย่างเหมาะสม (5 คะแนน)
- แสดงสถานะการโหลดข้อมูลด้วย Suspense (5 คะแนน)`,
    starterCode: `// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
async function getUsers() {
  // เขียนโค้ดดึงข้อมูลที่นี่
}

export default async function UsersPage() {
  // เขียนโค้ดของคุณที่นี่
}`,
    solutionCode: `import { Suspense } from 'react';

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
async function getUsers() {
  // ในแบบฝึกหัดนี้เราใช้ JSONPlaceholder API
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  
  // ตรวจสอบว่าการดึงข้อมูลสำเร็จหรือไม่
  if (!res.ok) {
    throw new Error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
  }
  
  return res.json();
}

// คอมโพเนนต์สำหรับแสดงรายการผู้ใช้
async function UsersList() {
  // ดึงข้อมูลผู้ใช้
  const users = await getUsers();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <div key={user.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-2">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">{user.email}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{user.company.name}</p>
        </div>
      ))}
    </div>
  );
}

// คอมโพเนนต์สำหรับแสดงสถานะการโหลด
function LoadingUsers() {
  return (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600 mb-2"></div>
      <p>กำลังโหลดข้อมูลผู้ใช้...</p>
    </div>
  );
}

// คอมโพเนนต์สำหรับแสดงข้อผิดพลาด
function ErrorDisplay({ error }) {
  return (
    <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-2">เกิดข้อผิดพลาด</h2>
      <p>{error.message}</p>
    </div>
  );
}

export default async function UsersPage() {
  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">รายชื่อผู้ใช้</h1>
      
      <Suspense fallback={<LoadingUsers />}>
        {/* ใช้ try-catch เพื่อจัดการข้อผิดพลาด */}
        {(() => {
          try {
            return <UsersList />;
          } catch (error) {
            return <ErrorDisplay error={error} />;
          }
        })()}
      </Suspense>
    </main>
  );
}`,
    testCases: `// ตรวจสอบว่ามีการใช้ fetch
expect(code).toContain("fetch");
// ตรวจสอบว่ามีการใช้ Suspense
expect(code).toContain("Suspense");
// ตรวจสอบว่ามีการจัดการข้อผิดพลาด
expect(code).toContain("throw new Error");`,
  };

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของแบบฝึกหัด */}
      <div className="mb-8">
        <div className="flex items-center text-text-secondary mb-4">
          <Link href="/exercises" className="flex items-center hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            กลับไปยังรายการแบบฝึกหัด
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{exercise.title}</h1>
            <p className="text-text-secondary">{exercise.description}</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs mr-2">
              ระดับกลาง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
              </svg>
              {exercise.points} คะแนน
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* คำอธิบายแบบฝึกหัด */}
        <div className="lg:col-span-1">
          <div className="bg-surface p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">คำอธิบาย</h2>
            <div className="prose dark:prose-invert">
              <p>{exercise.description}</p>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">บทเรียนที่เกี่ยวข้อง</h3>
              <Link href={`/lessons/${exercise.lessonId}`} className="text-primary hover:underline">
                {exercise.lessonTitle}
              </Link>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">คำแนะนำ</h3>
              <div className="text-sm">
                {exercise.instructions.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(2)}</h2>;
                  } else if (line.startsWith('## ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-3 mb-2">{line.substring(3)}</h3>;
                  } else if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4 list-disc">{line.substring(2)}</li>;
                  } else if (line.match(/^\d+\. /)) {
                    return <li key={index} className="ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
                  } else if (line.trim() === '') {
                    return <div key={index} className="h-2"></div>;
                  } else {
                    return <p key={index} className="mb-2">{line}</p>;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* โค้ดเอดิเตอร์ */}
        <div className="lg:col-span-2">
          <CodeEditor
            starterCode={exercise.starterCode}
            solutionCode={exercise.solutionCode}
            testCases={exercise.testCases}
            onSubmit={(code, isCorrect) => {
              if (isCorrect) {
                // ในโปรเจคจริงควรบันทึกความคืบหน้าลงฐานข้อมูล
                console.log('แบบฝึกหัดถูกต้อง!');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
