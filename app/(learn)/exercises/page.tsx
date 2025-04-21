// ไฟล์นี้เป็นหน้าสำหรับแสดงรายการแบบฝึกหัดทั้งหมด
// This file is the page for displaying all exercises

import ExerciseCard from '@/components/ExerciseCard';
import { Suspense } from 'react';
import { db } from '@/backend/db';
import { exercises, lessons } from '@/backend/db/schema';
import { eq } from 'drizzle-orm';

// อินเตอร์เฟสสำหรับข้อมูลแบบฝึกหัด
// Interface for exercise data
interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  lessonId: string;
  lessonTitle: string;
}

// ฟังก์ชันสำหรับดึงข้อมูลแบบฝึกหัดจากฐานข้อมูล
// Function to fetch exercises from the database
async function getExercises(): Promise<Exercise[]> {
  try {
    const exerciseData = await db
      .select({
        id: exercises.id,
        title: exercises.title,
        description: exercises.description,
        difficulty: exercises.difficulty,
        points: exercises.points,
        lessonId: exercises.lessonId,
        lessonTitle: lessons.title,
      })
      .from(exercises)
      .leftJoin(lessons, eq(exercises.lessonId, lessons.id));

    // แปลงข้อมูลให้ตรงกับอินเตอร์เฟส
    return exerciseData.map((exercise) => ({
      id: exercise.id.toString(),
      title: exercise.title,
      description: exercise.description,
      difficulty: exercise.difficulty as 'beginner' | 'intermediate' | 'advanced',
      points: exercise.points,
      lessonId: exercise.lessonId?.toString() || '',
      lessonTitle: exercise.lessonTitle || 'ไม่มีบทเรียนที่เกี่ยวข้อง',
    }));
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลแบบฝึกหัด:', error);
    return [];
  }
}

// หน้าแสดงรายการแบบฝึกหัดทั้งหมด
// Page to display all exercises
export default async function ExercisesPage({
  searchParams,
}: {
  searchParams: Promise<{ difficulty?: string }>;
}) {
  // ดึงข้อมูลแบบฝึกหัด
  // Fetch exercise data
  const exercises = await getExercises();

  // กรองแบบฝึกหัดตามระดับความยาก (ถ้ามีการระบุ)
  // Filter exercises by difficulty (if specified)
  const { difficulty } = await searchParams;
  const filteredExercises = difficulty && difficulty !== 'all'
    ? exercises.filter((exercise) => exercise.difficulty === difficulty)
    : exercises;

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
        <h1 className="text-3xl font-bold mb-2">แบบฝึกหัด</h1>
        <p className="text-text-secondary">ฝึกทักษะการพัฒนา Next.js ด้วยแบบฝึกหัดที่หลากหลาย</p>
      </div>

      {/* ตัวกรองแบบฝึกหัด */}
      {/* Exercise filters */}
      <div className="mb-8 p-4 bg-surface rounded-lg">
        <div className="flex flex-wrap gap-2">
          <a href="/exercises" className={getButtonClass('all')}>
            ทั้งหมด
          </a>
          <a href="/exercises?difficulty=beginner" className={getButtonClass('beginner')}>
            สำหรับผู้เริ่มต้น
          </a>
          <a href="/exercises?difficulty=intermediate" className={getButtonClass('intermediate')}>
            ระดับกลาง
          </a>
          <a href="/exercises?difficulty=advanced" className={getButtonClass('advanced')}>
            ระดับสูง
          </a>
        </div>
      </div>

      {/* รายการแบบฝึกหัด */}
      {/* List of exercises */}
      <Suspense fallback={<div>กำลังโหลด...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                id={exercise.id}
                title={exercise.title}
                description={exercise.description}
                difficulty={exercise.difficulty}
                points={exercise.points}
                lessonId={exercise.lessonId}
                lessonTitle={exercise.lessonTitle}
              />
            ))
          ) : (
            <p className="text-text-secondary">ไม่มีแบบฝึกหัดในระดับนี้</p>
          )}
        </div>
      </Suspense>
    </div>
  );
}