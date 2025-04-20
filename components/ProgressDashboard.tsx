"use client";

import React from 'react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';

// คอมโพเนนต์สำหรับแสดงแดชบอร์ดความคืบหน้าของผู้ใช้
export default function ProgressDashboard() {
  // ใช้ context สำหรับเข้าถึงข้อมูลความคืบหน้าของผู้ใช้
  const { progress, isLoading } = useProgress();
  const { theme } = useTheme();
  
  // คำนวณเปอร์เซ็นต์ความคืบหน้าสู่เลเวลถัดไป
  const nextLevelProgress = progress.points % 100;
  const nextLevelPercentage = Math.round(nextLevelProgress);
  
  // คำนวณจำนวนคะแนนที่ต้องการสำหรับเลเวลถัดไป
  const pointsToNextLevel = 100 - nextLevelProgress;

  return (
    <div className="bg-surface p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">ความคืบหน้าของคุณ</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* ระดับและคะแนน */}
          <div className="flex items-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center border-4 border-primary">
                <span className="text-3xl font-bold">{progress.level}</span>
              </div>
              <div className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                LV
              </div>
            </div>
            
            <div className="ml-6 flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-text-secondary">เลเวล {progress.level}</span>
                <span className="text-sm text-text-secondary">เลเวล {progress.level + 1}</span>
              </div>
              
              {/* แถบแสดงความคืบหน้าสู่เลเวลถัดไป */}
              <div className="h-3 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${nextLevelPercentage}%` }}
                ></div>
              </div>
              
              <div className="mt-1 text-sm text-text-secondary">
                อีก {pointsToNextLevel} คะแนนเพื่อเลื่อนเลเวล
              </div>
            </div>
          </div>
          
          {/* สถิติการเรียนรู้ */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-background p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">{progress.points}</div>
              <div className="text-sm text-text-secondary">คะแนนทั้งหมด</div>
            </div>
            
            <div className="bg-background p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">{progress.completedLessons.length}</div>
              <div className="text-sm text-text-secondary">บทเรียนที่เรียนจบ</div>
            </div>
            
            <div className="bg-background p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">{progress.completedExercises.length}</div>
              <div className="text-sm text-text-secondary">แบบฝึกหัดที่ทำเสร็จ</div>
            </div>
          </div>
          
          {/* ความสำเร็จและสถิติเพิ่มเติม */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 text-yellow-500 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">ความสำเร็จ</div>
                  <div className="font-bold">{progress.achievements.length} รายการ</div>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 text-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-text-secondary">เวลาเรียนทั้งหมด</div>
                  <div className="font-bold">12 ชั่วโมง</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
