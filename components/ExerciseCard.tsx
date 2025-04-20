"use client";

// ไฟล์นี้เป็นคอมโพเนนต์สำหรับแสดงการ์ดแบบฝึกหัด
// This file is a component for displaying exercise cards

import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';

// อินเตอร์เฟสสำหรับ props ของการ์ดแบบฝึกหัด
// Interface for ExerciseCard props
interface ExerciseCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  lessonId?: string;
  lessonTitle?: string;
}

// คอมโพเนนต์สำหรับแสดงการ์ดแบบฝึกหัด
// Component for displaying exercise cards
export default function ExerciseCard({
  id,
  title,
  description,
  difficulty,
  points,
  lessonId,
  lessonTitle,
}: ExerciseCardProps) {
  // ใช้ context สำหรับตรวจสอบความคืบหน้าของผู้ใช้
  // Use context to check user progress
  const { progress } = useProgress();
  
  // ตรวจสอบว่าแบบฝึกหัดนี้ถูกทำเสร็จแล้วหรือไม่
  // Check if the exercise is completed
  const isCompleted = progress.completedExercises.includes(id);
  
  // กำหนดสีของแบดจ์ตามระดับความยาก
  // Define badge color based on difficulty
  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }[difficulty];
  
  // แปลระดับความยากเป็นภาษาไทย
  // Translate difficulty level to Thai
  const difficultyText = {
    beginner: 'เริ่มต้น',
    intermediate: 'ปานกลาง',
    advanced: 'ขั้นสูง',
  }[difficulty];

  return (
    <Link href={`/exercises/${id}`} className="block">
      <div className="card hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* ส่วนหัวของการ์ด */}
        {/* Card header */}
        <div className="flex justify-between items-start mb-2">
          {/* แบดจ์ระดับความยาก */}
          {/* Difficulty badge */}
          <span className={`badge ${difficultyColor} text-xs`}>
            {difficultyText}
          </span>
          
          {/* ไอคอนสถานะการทำแบบฝึกหัด */}
          {/* Exercise status icon */}
          {isCompleted ? (
            <span className="text-success" title="ทำเสร็จแล้ว">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          ) : (
            <span className="text-text-secondary" title="ยังไม่ได้ทำ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
              </svg>
            </span>
          )}
        </div>
        
        {/* เนื้อหาของการ์ด */}
        {/* Card content */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-text-secondary mb-4 line-clamp-2">{description}</p>
        </div>
        
        {/* ส่วนท้ายของการ์ด */}
        {/* Card footer */}
        <div className="flex justify-between items-center text-sm text-text-secondary mt-auto pt-4 border-t border-text-secondary/10">
          {/* คะแนนที่จะได้รับ */}
          {/* Points to be earned */}
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            </svg>
            {points} คะแนน
          </span>
          
          {/* บทเรียนที่เกี่ยวข้อง */}
          {/* Related lesson */}
          {lessonId && lessonTitle && (
            <Link href={`/lessons/${lessonId}`} className="flex items-center hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              {lessonTitle}
            </Link>
          )}
        </div>
      </div>
    </Link>
  );
}