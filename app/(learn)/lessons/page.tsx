// ไฟล์นี้เป็นหน้าสำหรับแสดงรายการบทเรียนทั้งหมด
// This file is the page for displaying all lessons

import LessonCard from '@/components/LessonCard';
import { Suspense } from 'react';
import { db } from '@/backend/db';
import { lessons, categories } from '@/backend/db/schema';
import { eq } from 'drizzle-orm';

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

// ฟังก์ชันสำหรับดึงข้อมูลบทเรียนจากฐานข้อมูล
// Function to fetch lessons from the database
async function getLessons(): Promise<Lesson[]> {
  try {
    const lessonData = await db
      .select({
        id: lessons.id,
        slug: lessons.slug,
        title: lessons.title,
        description: lessons.description,
        difficulty: lessons.difficulty,
        estimatedMinutes: lessons.estimatedMinutes,
        category: categories.name,
      })
      .from(lessons)
      .leftJoin(categories, eq(lessons.categoryId, categories.id));

    // แปลงข้อมูลให้ตรงกับอินเตอร์เฟส
    return lessonData.map((lesson) => ({
      id: lesson.id.toString(),
      slug: lesson.slug,
      title: lesson.title,
      description: lesson.description,
      difficulty: lesson.difficulty as 'beginner' | 'intermediate' | 'advanced',
      estimatedMinutes: lesson.estimatedMinutes,
      category: lesson.category || 'ไม่มีหมวดหมู่',
    }));
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลบทเรียน:', error);
    return [];
  }
}

// หน้าแสดงรายการบทเรียนทั้งหมด
// Page to display all lessons
export default async function LessonsPage({
  searchParams,
}: {
  searchParams: Promise<{ difficulty?: string }>;
}) {
  // ดึงข้อมูลบทเรียน
  // Fetch lesson data
  const lessons = await getLessons();

  // กรองบทเรียนตามระดับความยาก (ถ้ามีการระบุ)
  // Filter lessons by difficulty (if specified)
  const { difficulty } = await searchParams;
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