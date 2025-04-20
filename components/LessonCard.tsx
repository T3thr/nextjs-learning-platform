"use client";

// ไฟล์นี้เป็นคอมโพเนนต์สำหรับแสดงการ์ดบทเรียน
// This file is a component for displaying lesson cards

import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';

// อินเตอร์เฟสสำหรับ props ของการ์ดบทเรียน
// Interface for LessonCard props
interface LessonCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  category?: string;
}

// คอมโพเนนต์สำหรับแสดงการ์ดบทเรียน
// Component for displaying lesson cards
export default function LessonCard({
  id,
  slug,
  title,
  description,
  difficulty,
  estimatedMinutes,
  category,
}: LessonCardProps) {
  // ใช้ context สำหรับตรวจสอบความคืบหน้าของผู้ใช้
  // Use context to check user progress
  const { progress } = useProgress();
  
  // ตรวจสอบว่าบทเรียนนี้ถูกทำเสร็จแล้วหรือไม่
  // Check if the lesson is completed
  const isCompleted = progress.completedLessons.includes(id);
  
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
    <Link href={`/lessons/${slug}`} className="block">
      <div className="card hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* ส่วนหัวของการ์ด */}
        {/* Card header */}
        <div className="flex justify-between items-start mb-2">
          {/* แบดจ์ระดับความยาก */}
          {/* Difficulty badge */}
          <span className={`badge ${difficultyColor} text-xs`}>
            {difficultyText}
          </span>
          
          {/* ไอคอนสถานะการเรียน */}
          {/* Lesson status icon */}
          {isCompleted ? (
            <span className="text-success" title="เรียนเสร็จแล้ว">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          ) : (
            <span className="text-text-secondary" title="ยังไม่ได้เรียน">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          {/* เวลาที่ใช้ในการเรียน */}
          {/* Estimated time */}
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {estimatedMinutes} นาที
          </span>
          
          {/* หมวดหมู่ */}
          {/* Category */}
          {category && (
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
              </svg>
              {category}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}