"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

// กำหนดโครงสร้างข้อมูลความคืบหน้าของผู้ใช้
interface Progress {
  lessons: any;
  exercises: any;
  level: number;
  points: number;
  completedLessons: string[];
  completedExercises: string[];
  achievements: string[];
}

// กำหนดโครงสร้าง context สำหรับความคืบหน้า
interface ProgressContextType {
  progress: Progress;
  isLoading: boolean;
  error: string | null;
  completeLesson: (lessonId: string, points?: number) => Promise<void>;
  completeExercise: (exerciseId: string, points?: number) => Promise<void>;
  earnAchievement: (achievementId: string, points?: number) => Promise<void>;
  refreshProgress: () => Promise<void>;
}

// สร้าง context เริ่มต้น
const ProgressContext = createContext<ProgressContextType>({
  progress: {
    level: 1,
    points: 0,
    completedLessons: [],
    completedExercises: [],
    achievements: [],
    lessons: [],
    exercises: []
  },
  isLoading: false,
  error: null,
  completeLesson: async () => {},
  completeExercise: async () => {},
  earnAchievement: async () => {},
  refreshProgress: async () => {},
});

// สร้าง Provider สำหรับความคืบหน้า
export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<Progress>({
    level: 1,
    points: 0,
    completedLessons: [],
    completedExercises: [],
    achievements: [],
    lessons: [],
    exercises: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันสำหรับดึงข้อมูลความคืบหน้าของผู้ใช้
  const refreshProgress = async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/progress?userId=${session.user.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลความคืบหน้า');
      }

      setProgress(data.progress);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลความคืบหน้า:', error);
      setError('เกิดข้อผิดพลาดในการดึงข้อมูลความคืบหน้า');
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชันสำหรับอัปเดตความคืบหน้าของผู้ใช้
  const updateProgress = async (action: string, itemId: string, points?: number) => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/progress/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          action,
          itemId,
          points,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า');
      }

      setProgress(data.progress);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า:', error);
      setError('เกิดข้อผิดพลาดในการอัปเดตความคืบหน้า');
    } finally {
      setIsLoading(false);
    }
  };

  // ฟังก์ชันสำหรับบันทึกการเรียนบทเรียนเสร็จสิ้น
  const completeLesson = async (lessonId: string, points?: number) => {
    await updateProgress('completeLesson', lessonId, points);
  };

  // ฟังก์ชันสำหรับบันทึกการทำแบบฝึกหัดเสร็จสิ้น
  const completeExercise = async (exerciseId: string, points?: number) => {
    await updateProgress('completeExercise', exerciseId, points);
  };

  // ฟังก์ชันสำหรับบันทึกการได้รับความสำเร็จ
  const earnAchievement = async (achievementId: string, points?: number) => {
    await updateProgress('earnAchievement', achievementId, points);
  };

  // ดึงข้อมูลความคืบหน้าเมื่อเข้าสู่ระบบ
  useEffect(() => {
    if (session?.user?.id) {
      refreshProgress();
    }
  }, [session?.user?.id]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isLoading,
        error,
        completeLesson,
        completeExercise,
        earnAchievement,
        refreshProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

// Hook สำหรับใช้งาน context
export const useProgress = () => useContext(ProgressContext);
