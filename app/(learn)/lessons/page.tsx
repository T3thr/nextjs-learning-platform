// ไฟล์นี้เป็นหน้าสำหรับแสดงรายการบทเรียนทั้งหมด
// This file is the page for displaying all lessons

import LessonCard from '@/components/LessonCard';
import { Suspense } from 'react';

// อินเตอร์เฟสสำหรับข้อมูลบทเรียน
// Interface for lesson data
interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  category: string;
}

// ฟังก์ชันจำลองการดึงข้อมูลบทเรียน (ในโปรเจคจริงควรดึงจากฐานข้อมูล)
// Mock function to fetch lessons (in a real project, fetch from a database)
async function getLessons(): Promise<Lesson[]> {
  return [
    {
      id: '1',
      slug: 'introduction-to-nextjs',
      title: 'แนะนำ Next.js',
      description: 'ทำความรู้จักกับ Next.js และประโยชน์ของการใช้งาน',
      difficulty: 'beginner',
      estimatedMinutes: 15,
      category: 'Next.js พื้นฐาน',
    },
    {
      id: '2',
      slug: 'app-router-basics',
      title: 'พื้นฐาน App Router',
      description: 'เรียนรู้การใช้งาน App Router ใน Next.js 13+',
      difficulty: 'beginner',
      estimatedMinutes: 20,
      category: 'Next.js พื้นฐาน',
    },
    {
      id: '3',
      slug: 'data-fetching',
      title: 'การจัดการข้อมูลใน Next.js',
      description: 'เรียนรู้วิธีการดึงข้อมูลใน Next.js ด้วย Server Components',
      difficulty: 'beginner',
      estimatedMinutes: 25,
      category: 'Next.js พื้นฐาน',
    },
    {
      id: '4',
      slug: 'enterprise-architecture',
      title: 'สถาปัตยกรรมระดับองค์กร',
      description: 'เรียนรู้การออกแบบสถาปัตยกรรม Next.js สำหรับแอปพลิเคชันขนาดใหญ่',
      difficulty: 'intermediate',
      estimatedMinutes: 30,
      category: 'การพัฒนาแอปพลิเคชันระดับองค์กร',
    },
    {
      id: '5',
      slug: 'advanced-state-management',
      title: 'การจัดการสถานะขั้นสูง',
      description: 'เรียนรู้เทคนิคการจัดการสถานะขั้นสูงใน Next.js',
      difficulty: 'intermediate',
      estimatedMinutes: 35,
      category: 'การพัฒนาแอปพลิเคชันระดับองค์กร',
    },
    {
      id: '6',
      slug: 'nextjs-optimization',
      title: 'การเพิ่มประสิทธิภาพ Next.js',
      description: 'เรียนรู้เทคนิคการเพิ่มประสิทธิภาพแอปพลิเคชัน Next.js',
      difficulty: 'advanced',
      estimatedMinutes: 40,
      category: 'รูปแบบขั้นสูงและการเพิ่มประสิทธิภาพ',
    },
  ];
}

// หน้าแสดงรายการบทเรียนทั้งหมด
// Page to display all lessons
export default async function LessonsPage({
  searchParams,
}: {
  searchParams: { difficulty?: string };
}) {
  // ดึงข้อมูลบทเรียน
  // Fetch lesson data
  const lessons = await getLessons();
  
  // กรองบทเรียนตามระดับความยาก (ถ้ามีการระบุ)
  // Filter lessons by difficulty (if specified)
  const difficulty = searchParams.difficulty;
  const filteredLessons = difficulty && difficulty !== 'all'
    ? lessons.filter((lesson) => lesson.difficulty === difficulty)
    : lessons;

  // กำหนดคลาสสำหรับปุ่มกรองที่เลือก
  // Define class for selected filter button
  const getButtonClass = (value: string) => {
    return `btn btn-sm ${
      difficulty === value || (!difficulty && value === 'all')
        ? 'btn-primary'
        : 'btn-outline'
    }`;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">บทเรียน</h1>
        <p className="text-text-secondary">เรียนรู้ Next.js ตั้งแต่พื้นฐานจนถึงขั้นสูง</p>
      </div>

      {/* ตัวกรองบทเรียน */}
      {/* Lesson filters */}
      <div className="mb-8 p-4 bg-surface rounded-lg">
        <div className="flex flex-wrap gap-2">
          <a href="/lessons" className={getButtonClass('all')}>
            ทั้งหมด
          </a>
          <a href="/lessons?difficulty=beginner" className={getButtonClass('beginner')}>
            สำหรับผู้เริ่มต้น
          </a>
          <a href="/lessons?difficulty=intermediate" className={getButtonClass('intermediate')}>
            ระดับกลาง
          </a>
          <a href="/lessons?difficulty=advanced" className={getButtonClass('advanced')}>
            ระดับสูง
          </a>
        </div>
      </div>

      {/* รายการบทเรียน */}
      {/* List of lessons */}
      <Suspense fallback={<div>กำลังโหลด...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                slug={lesson.slug}
                title={lesson.title}
                description={lesson.description}
                difficulty={lesson.difficulty}
                estimatedMinutes={lesson.estimatedMinutes}
                category={lesson.category}
              />
            ))
          ) : (
            <p className="text-text-secondary">ไม่มีบทเรียนในระดับนี้</p>
          )}
        </div>
      </Suspense>
    </div>
  );
}