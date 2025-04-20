"use client";

import React, { useState, useEffect } from 'react';
import { useProgress } from '@/context/ProgressContext';
import Link from 'next/link';

interface LearningPathProgressProps {
  moduleId: string;
  moduleName: string;
  totalLessons: number;
  completedLessons: number;
  nextLessonSlug?: string;
}

// คอมโพเนนต์สำหรับแสดงความคืบหน้าในเส้นทางการเรียนรู้แบบมีภาพประกอบ
export default function LearningPathProgress({
  moduleId,
  moduleName,
  totalLessons,
  completedLessons,
  nextLessonSlug
}: LearningPathProgressProps) {
  // คำนวณเปอร์เซ็นต์ความคืบหน้า
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
  
  // สถานะสำหรับแอนิเมชันความคืบหน้า
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  // สร้างแอนิเมชันความคืบหน้า
  useEffect(() => {
    // รีเซ็ตแอนิเมชันเมื่อค่าความคืบหน้าเปลี่ยน
    setAnimatedProgress(0);
    
    // เริ่มแอนิเมชัน
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  return (
    <div className="bg-surface rounded-lg overflow-hidden border border-text-secondary/10">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{moduleName}</h3>
          <div className="text-sm text-text-secondary">
            {completedLessons}/{totalLessons} บทเรียน
          </div>
        </div>
        
        {/* แถบแสดงความคืบหน้า */}
        <div className="relative h-4 bg-background rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-primary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${animatedProgress}%` }}
          ></div>
        </div>
        
        {/* ข้อความแสดงสถานะ */}
        <div className="mt-4 text-sm">
          {progressPercentage === 100 ? (
            <div className="text-success flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              เรียนครบทุกบทเรียนแล้ว
            </div>
          ) : nextLessonSlug ? (
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">
                เหลืออีก {totalLessons - completedLessons} บทเรียน
              </span>
              <Link 
                href={`/lessons/${nextLessonSlug}`}
                className="text-primary hover:underline flex items-center"
              >
                เรียนต่อ
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="text-text-secondary">
              เหลืออีก {totalLessons - completedLessons} บทเรียน
            </div>
          )}
        </div>
      </div>
      
      {/* ภาพประกอบแสดงความคืบหน้า */}
      <div className="px-6 pb-6">
        <div className="relative h-16 bg-background/50 rounded-lg overflow-hidden">
          {/* เส้นทางการเรียนรู้ */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-text-secondary/20 transform -translate-y-1/2"></div>
          
          {/* เส้นความคืบหน้า */}
          <div 
            className="absolute top-1/2 left-0 h-2 bg-primary transform -translate-y-1/2 transition-all duration-1000 ease-out"
            style={{ width: `${animatedProgress}%` }}
          ></div>
          
          {/* จุดแสดงบทเรียน */}
          {Array.from({ length: totalLessons }).map((_, index) => {
            const position = (index / (totalLessons - 1)) * 100;
            const isCompleted = index < completedLessons;
            
            return (
              <div 
                key={index}
                className={`absolute top-1/2 w-6 h-6 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  isCompleted 
                    ? 'bg-primary text-white' 
                    : 'bg-background border-2 border-text-secondary/30 text-text-secondary'
                }`}
                style={{ left: `${position}%` }}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
