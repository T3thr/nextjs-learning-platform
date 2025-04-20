// ไฟล์นี้เป็นหน้าสำหรับแสดงรายการแบบฝึกหัดทั้งหมด
// This file is the page for displaying all exercises

import ExerciseCard from '@/components/ExerciseCard';
import { Suspense } from 'react';

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

// ฟังก์ชันจำลองการดึงข้อมูลแบบฝึกหัด (ในโปรเจคจริงควรดึงจากฐานข้อมูล)
// Mock function to fetch exercises (in a real project, fetch from a database)
async function getExercises(): Promise<Exercise[]> {
  return [
    {
      id: '1',
      title: 'สร้างหน้าแรกด้วย Next.js',
      description: 'ฝึกสร้างหน้าแรกของเว็บไซต์ด้วย Next.js',
      difficulty: 'beginner',
      points: 10,
      lessonId: '1',
      lessonTitle: 'แนะนำ Next.js',
    },
    {
      id: '2',
      title: 'สร้างเส้นทางแบบไดนามิกด้วย App Router',
      description: 'ฝึกสร้างเส้นทางแบบไดนามิกด้วย App Router ของ Next.js',
      difficulty: 'beginner',
      points: 15,
      lessonId: '2',
      lessonTitle: 'พื้นฐาน App Router',
    },
    {
      id: '3',
      title: 'ดึงข้อมูลด้วย Server Components',
      description: 'ฝึกการดึงข้อมูลจาก API ด้วย Server Components',
      difficulty: 'intermediate',
      points: 20,
      lessonId: '3',
      lessonTitle: 'การจัดการข้อมูลใน Next.js',
    },
    {
      id: '4',
      title: 'สร้างฟอร์มด้วย Client Components',
      description: 'ฝึกการสร้างฟอร์มและจัดการสถานะด้วย Client Components',
      difficulty: 'intermediate',
      points: 25,
      lessonId: '3',
      lessonTitle: 'การจัดการข้อมูลใน Next.js',
    },
    {
      id: '5',
      title: 'สร้างโครงสร้างโปรเจคระดับองค์กร',
      description: 'ฝึกการจัดโครงสร้างโปรเจค Next.js สำหรับแอปพลิเคชันขนาดใหญ่',
      difficulty: 'advanced',
      points: 30,
      lessonId: '4',
      lessonTitle: 'สถาปัตยกรรมระดับองค์กร',
    },
    {
      id: '6',
      title: 'เพิ่มประสิทธิภาพการโหลดข้อมูล',
      description: 'ฝึกการใช้เทคนิคต่างๆ เพื่อเพิ่มประสิทธิภาพการโหลดข้อมูลใน Next.js',
      difficulty: 'advanced',
      points: 35,
      lessonId: '6',
      lessonTitle: 'การเพิ่มประสิทธิภาพ Next.js',
    },
  ];
}

// หน้าแสดงรายการแบบฝึกหัดทั้งหมด
// Page to display all exercises
export default async function ExercisesPage({
  searchParams,
}: {
  searchParams: { difficulty?: string };
}) {
  // ดึงข้อมูลแบบฝึกหัด
  // Fetch exercise data
  const exercises = await getExercises();
  
  // กรองแบบฝึกหัดตามระดับความยาก (ถ้ามีการระบุ)
  // Filter exercises by difficulty (if specified)
  const difficulty = searchParams.difficulty;
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