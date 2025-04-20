import { db } from '@/backend/db';
import { users, categories, lessons, exercises, guidelines, examples, achievements } from '@/backend/db/schema';
import bcrypt from 'bcryptjs';

// สคริปต์สำหรับการเพิ่มข้อมูลเริ่มต้นลงในฐานข้อมูล
// ใช้สำหรับการทดสอบและการสาธิตแพลตฟอร์ม

async function main() {
  console.log('เริ่มต้นการเพิ่มข้อมูลลงในฐานข้อมูล...');

  try {
    // ล้างข้อมูลเก่าก่อนเพิ่มข้อมูลใหม่
    console.log('ล้างข้อมูลเก่า...');
    await db.delete(achievements);
    await db.delete(examples);
    await db.delete(guidelines);
    await db.delete(exercises);
    await db.delete(lessons);
    await db.delete(categories);
    await db.delete(users);

    // เพิ่มผู้ใช้เริ่มต้น
    console.log('เพิ่มข้อมูลผู้ใช้...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const insertedUsers = await db.insert(users).values([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      },
      {
        name: 'Test User',
        email: 'user@example.com',
        password: hashedPassword,
        role: 'user',
      },
    ]).returning({ id: users.id });

    const adminUserId = insertedUsers[0].id;
    const testUserId = insertedUsers[1].id;

    // เพิ่มหมวดหมู่
    console.log('เพิ่มข้อมูลหมวดหมู่...');
    const insertedCategories = await db.insert(categories).values([
      {
        name: 'Next.js พื้นฐาน',
        slug: 'nextjs-basics',
        description: 'เรียนรู้พื้นฐานของ Next.js และการใช้งาน App Router',
        order: 1,
        parentId: null,
      },
      {
        name: 'การพัฒนาแอปพลิเคชันระดับองค์กร',
        slug: 'enterprise-development',
        description: 'เรียนรู้การพัฒนาแอปพลิเคชัน Next.js ที่มีขนาดใหญ่และซับซ้อน',
        order: 2,
        parentId: null,
      },
      {
        name: 'รูปแบบขั้นสูงและการเพิ่มประสิทธิภาพ',
        slug: 'advanced-patterns',
        description: 'เรียนรู้รูปแบบการพัฒนาขั้นสูงและเทคนิคการเพิ่มประสิทธิภาพ',
        order: 3,
        parentId: null,
      },
    ]).returning({ id: categories.id });

    const nextjsBasicsId = insertedCategories[0].id;
    const enterpriseDevId = insertedCategories[1].id;
    const advancedPatternsId = insertedCategories[2].id;

    // เพิ่มบทเรียน
    console.log('เพิ่มข้อมูลบทเรียน...');
    const insertedLessons = await db.insert(lessons).values([
      {
        slug: 'introduction-to-nextjs',
        title: 'แนะนำ Next.js',
        description: 'ทำความรู้จักกับ Next.js และประโยชน์ของการใช้งาน',
        content: '# แนะนำ Next.js\n\nNext.js เป็นเฟรมเวิร์กสำหรับ React ที่มีคุณสมบัติมากมาย เช่น การเรนเดอร์ฝั่งเซิร์ฟเวอร์ การสร้างเว็บไซต์แบบสถิต และอื่นๆ อีกมากมาย\n\n## ประโยชน์ของ Next.js\n\n- การเรนเดอร์ฝั่งเซิร์ฟเวอร์ (Server-side Rendering)\n- การสร้างเว็บไซต์แบบสถิต (Static Site Generation)\n- การแบ่งโค้ดอัตโนมัติ (Automatic Code Splitting)\n- การจัดการเส้นทาง (File-system Routing)\n- การโหลดข้อมูลแบบง่าย (Simplified Data Fetching)\n\n## การติดตั้ง Next.js\n\n```bash\nnpx create-next-app@latest my-app\ncd my-app\nnpm run dev\n```',
        difficulty: 'beginner',
        order: 1,
        categoryId: nextjsBasicsId,
        estimatedMinutes: 15,
        published: true,
      },
      {
        slug: 'app-router-basics',
        title: 'พื้นฐาน App Router',
        description: 'เรียนรู้การใช้งาน App Router ใน Next.js 13+',
        content: '# พื้นฐาน App Router\n\nApp Router เป็นระบบเส้นทางใหม่ใน Next.js 13+ ที่ใช้แนวคิดของ React Server Components\n\n## โครงสร้างไฟล์\n\n- `app/page.tsx` - หน้าแรกของเว็บไซต์\n- `app/about/page.tsx` - หน้า About\n- `app/blog/[slug]/page.tsx` - หน้าบทความที่มีพารามิเตอร์ slug\n\n## Server Components vs Client Components\n\n```tsx\n// Server Component (ค่าเริ่มต้น)\nexport default function Page() {\n  return <h1>Hello, Next.js!</h1>\n}\n\n// Client Component\n"use client"\n\nexport default function Counter() {\n  const [count, setCount] = useState(0)\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  )\n}\n```',
        difficulty: 'beginner',
        order: 2,
        categoryId: nextjsBasicsId,
        estimatedMinutes: 20,
        published: true,
      },
      {
        slug: 'enterprise-architecture',
        title: 'สถาปัตยกรรมระดับองค์กร',
        description: 'เรียนรู้การออกแบบสถาปัตยกรรม Next.js สำหรับแอปพลิเคชันขนาดใหญ่',
        content: '# สถาปัตยกรรมระดับองค์กร\n\nการพัฒนาแอปพลิเคชัน Next.js ระดับองค์กรต้องการการออกแบบสถาปัตยกรรมที่ดี\n\n## การแบ่งโครงสร้างโปรเจค\n\n```\n(Project-Name)\n├── app/                          # Next.js App Router entry\n│   ├── layout.tsx                # Root layout\n│   ├── page.tsx                  # Root route\n│   └── api/                      # API routes\n├── components/                  # Shared UI components\n├── context/                     # Client-side context providers\n├── backend/\n│   ├── lib/                     # DB clients, reusable service logic\n│   ├── model/                   # Schema/model definitions\n│   └── hooks/                   # Server actions, data fetching\n├── scripts/                     # Database seeding, migration scripts\n└── middleware.ts               # Global middleware\n```\n\n## การจัดการสถานะ\n\n- Server state vs Client state\n- React Context API สำหรับสถานะทั่วไป\n- Server Actions สำหรับการกระทำที่ต้องการความปลอดภัย',
        difficulty: 'intermediate',
        order: 1,
        categoryId: enterpriseDevId,
        estimatedMinutes: 30,
        published: true,
      },
    ]).returning({ id: lessons.id });

    const introLessonId = insertedLessons[0].id;
    const appRouterLessonId = insertedLessons[1].id;

    // เพิ่มแบบฝึกหัด
    console.log('เพิ่มข้อมูลแบบฝึกหัด...');
    await db.insert(exercises).values([
      {
        title: 'สร้างหน้าแรกด้วย Next.js',
        description: 'ฝึกสร้างหน้าแรกของเว็บไซต์ด้วย Next.js',
        instructions: '# สร้างหน้าแรกด้วย Next.js\n\nในแบบฝึกหัดนี้ คุณจะได้สร้างหน้าแรกของเว็บไซต์ด้วย Next.js\n\n## ขั้นตอน\n\n1. สร้างไฟล์ `app/page.tsx`\n2. สร้างคอมโพเนนต์ `Page` ที่แสดงข้อความทักทาย\n3. เพิ่มสไตล์ด้วย Tailwind CSS',
        starterCode: 'export default function Page() {\n  // เขียนโค้ดของคุณที่นี่\n}',
        solutionCode: 'export default function Page() {\n  return (\n    <main className="min-h-screen flex flex-col items-center justify-center p-24">\n      <h1 className="text-4xl font-bold mb-4">ยินดีต้อนรับสู่เว็บไซต์ของฉัน</h1>\n      <p className="text-xl text-gray-600">สร้างด้วย Next.js และ Tailwind CSS</p>\n    </main>\n  );\n}',
        testCases: '// ตรวจสอบว่ามีองค์ประกอบ h1\nexpect(document.querySelector("h1")).not.toBeNull();\n// ตรวจสอบว่ามีองค์ประกอบ p\nexpect(document.querySelector("p")).not.toBeNull();',
        difficulty: 'beginner',
        lessonId: introLessonId,
        points: 10,
        published: true,
      },
      {
        title: 'สร้างเส้นทางแบบไดนามิกด้วย App Router',
        description: 'ฝึกสร้างเส้นทางแบบไดนามิกด้วย App Router ของ Next.js',
        instructions: '# สร้างเส้นทางแบบไดนามิกด้วย App Router\n\nในแบบฝึกหัดนี้ คุณจะได้สร้างเส้นทางแบบไดนามิกด้วย App Router ของ Next.js\n\n## ขั้นตอน\n\n1. สร้างไฟล์ `app/posts/[id]/page.tsx`\n2. รับค่าพารามิเตอร์ `id` จาก URL\n3. แสดงข้อมูลโพสต์ตาม `id` ที่ได้รับ',
        starterCode: 'export default function PostPage({ params }) {\n  // เขียนโค้ดของคุณที่นี่\n}',
        solutionCode: 'export default function PostPage({ params }: { params: { id: string } }) {\n  return (\n    <main className="max-w-4xl mx-auto py-8 px-4">\n      <h1 className="text-3xl font-bold mb-4">โพสต์ #{params.id}</h1>\n      <p className="text-gray-600 mb-4">นี่คือเนื้อหาของโพสต์ #{params.id}</p>\n      <a href="/posts" className="text-blue-500 hover:underline">กลับไปยังรายการโพสต์</a>\n    </main>\n  );\n}',
        testCases: '// ตรวจสอบว่ามีการใช้ params.id\nexpect(document.querySelector("h1").textContent).toContain("โพสต์ #123");\nexpect(document.querySelector("p").textContent).toContain("นี่คือเนื้อหาของโพสต์ #123");',
        difficulty: 'beginner',
        lessonId: appRouterLessonId,
        points: 15,
        published: true,
      },
    ]);

    // เพิ่มแนวทางปฏิบัติ
    console.log('เพิ่มข้อมูลแนวทางปฏิบัติ...');
    await db.insert(guidelines).values([
      {
        topic: 'code-style',
        title: 'แนวทางการเขียนโค้ด Next.js',
        content: '# แนวทางการเขียนโค้ด Next.js\n\n## การตั้งชื่อไฟล์\n\n- ใช้ kebab-case สำหรับไฟล์ (เช่น `login-form.tsx`)\n- ใช้ PascalCase สำหรับคอมโพเนนต์ (เช่น `UserCard.tsx`)\n\n## การจัดระเบียบโค้ด\n\n- แยกโลจิกที่ซับซ้อนออกเป็น hooks หรือ utilities\n- จำกัดขนาดไฟล์คอมโพเนนต์ไม่เกิน 150 บรรทัด\n- ใช้ `"use client"` เฉพาะเมื่อจำเป็น\n\n## การใช้ TypeScript\n\n- กำหนด type ให้กับ props ของคอมโพเนนต์เสมอ\n- ใช้ interface สำหรับโครงสร้างข้อมูลที่ซับซ้อน\n- หลีกเลี่ยงการใช้ `any` type',
        categoryId: nextjsBasicsId,
        published: true,
      },
      {
        topic: 'performance',
        title: 'การเพิ่มประสิทธิภาพ Next.js',
        content: '# การเพิ่มประสิทธิภาพ Next.js\n\n## การเรนเดอร์\n\n- ใช้ Server Components เมื่อไม่ต้องการ interactivity\n- ใช้ `next/image` สำหรับการแสดงรูปภาพ\n- ใช้ `React.memo` สำหรับคอมโพเนนต์ที่มีการเรนเดอร์ซ้ำบ่อย\n\n## การโหลดข้อมูล\n\n- ใช้ `fetch` ใน Server Components พร้อมกับ `cache: "force-cache"` สำหรับข้อมูลที่ไม่เปลี่ยนแปลงบ่อย\n- ใช้ `revalidatePath` หรือ `revalidateTag` สำหรับการอัปเดตข้อมูลแบบ on-demand\n\n## การแบ่งโค้ด\n\n- ใช้ dynamic imports สำหรับคอมโพเนนต์ขนาดใหญ่\n- ใช้ `next/dynamic` พร้อมกับ `loading` component',
        categoryId: advancedPatternsId,
        published: true,
      },
    ]);

    // เพิ่มตัวอย่างโค้ด
    console.log('เพิ่มข้อมูลตัวอย่างโค้ด...');
    await db.insert(examples).values([
      {
        title: 'การใช้งาน Server Components',
        description: 'ตัวอย่างการใช้งาน Server Components ใน Next.js',
        code: '// app/users/page.tsx\n\nasync function getUsers() {\n  const res = await fetch("https://jsonplaceholder.typicode.com/users");\n  if (!res.ok) throw new Error("Failed to fetch users");\n  return res.json();\n}\n\nexport default async function UsersPage() {\n  const users = await getUsers();\n  \n  return (\n    <div className="max-w-4xl mx-auto py-8">\n      <h1 className="text-3xl font-bold mb-6">รายชื่อผู้ใช้</h1>\n      <ul className="space-y-4">\n        {users.map((user) => (\n          <li key={user.id} className="p-4 border rounded-lg">\n            <h2 className="text-xl font-semibold">{user.name}</h2>\n            <p className="text-gray-600">{user.email}</p>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}',
        explanation: 'ตัวอย่างนี้แสดงการใช้งาน Server Components ใน Next.js เพื่อดึงข้อมูลผู้ใช้จาก API และแสดงผลบนหน้าเว็บ\n\n### ข้อสังเกต\n\n1. ไม่มีการใช้ `"use client"` เพราะเป็น Server Component\n2. สามารถใช้ `async/await` ได้โดยตรงในคอมโพเนนต์\n3. การดึงข้อมูลเกิดขึ้นที่เซิร์ฟเวอร์ ไม่ใช่ที่เบราว์เซอร์ของผู้ใช้\n4. ไม่จำเป็นต้องใช้ state หรือ useEffect สำหรับการดึงข้อมูล',
        categoryId: nextjsBasicsId,
        published: true,
      },
      {
        title: 'การใช้งาน Client Components',
        description: 'ตัวอย่างการใช้งาน Client Components ใน Next.js',
        code: '// components/Counter.tsx\n\n"use client"\n\nimport { useState } from "react";\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div className="p-6 border rounded-lg max-w-xs mx-auto">\n      <h2 className="text-2xl font-bold mb-4">ตัวนับ</h2>\n      <p className="text-4xl font-bold text-center mb-4">{count}</p>\n      <div className="flex justify-center space-x-4">\n        <button\n          onClick={() => setCount(count - 1)}\n          className="px-4 py-2 bg-red-500 text-white rounded-md"\n        >\n          ลด\n        </button>\n        <button\n          onClick={() => setCount(count + 1)}\n          className="px-4 py-2 bg-green-500 text-white rounded-md"\n        >\n          เพิ่ม\n        </button>\n      </div>\n    </div>\n  );\n}',
        explanation: 'ตัวอย่างนี้แสดงการใช้งาน Client Components ใน Next.js เพื่อสร้างตัวนับที่มีการโต้ตอบกับผู้ใช้\n\n### ข้อสังเกต\n\n1. มีการใช้ `"use client"` ที่ด้านบนของไฟล์เพื่อระบุว่าเป็น Client Component\n2. ใช้ `useState` hook เพื่อจัดการสถานะของตัวนับ\n3. มีการตอบสนองต่อการกดปุ่มของผู้ใช้ด้วย `onClick` event\n4. Client Component สามารถใช้ hooks ของ React และมีการโต้ตอบกับผู้ใช้ได้',
        categoryId: nextjsBasicsId,
        published: true,
      },
    ]);

    // เพิ่มความสำเร็จ
    console.log('เพิ่มข้อมูลความสำเร็จ...');
    await db.insert(achievements).values([
      {
        name: 'เริ่มต้นการเรียนรู้',
        description: 'เรียนบทเรียนแรกเสร็จสมบูรณ์',
        icon: '🚀',
        requiredPoints: 10,
        type: 'lesson',
      },
      {
        name: 'นักแก้ปัญหา',
        description: 'ทำแบบฝึกหัดเสร็จสมบูรณ์ 5 ข้อ',
        icon: '🧩',
        requiredPoints: 50,
        type: 'exercise',
      },
      {
        name: 'ผู้เชี่ยวชาญ Next.js',
        description: 'เรียนบทเรียนทั้งหมดในหมวดหมู่ Next.js พื้นฐาน',
        icon: '🏆',
        requiredPoints: 100,
        type: 'lesson',
      },
    ]);

    console.log('การเพิ่มข้อมูลลงในฐานข้อมูลเสร็จสิ้นสำเร็จ!');
  } catch (error) {
    console.error('การเพิ่มข้อมูลลงในฐานข้อมูลล้มเหลว:', error);
    process.exit(1);
  }
}

// รันฟังก์ชัน main
main();