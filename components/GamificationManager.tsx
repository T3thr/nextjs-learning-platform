"use client";

import React, { useState, useEffect } from 'react';
import { useProgress } from '@/context/ProgressContext';
import { useSession } from 'next-auth/react';
import AchievementNotification from '@/components/AchievementNotification';
import PointsAnimation from '@/components/PointsAnimation';
import LevelUpModal from '@/components/LevelUpModal';

// คอมโพเนนต์สำหรับจัดการการแสดงผลองค์ประกอบเกมมิฟิเคชัน
export default function GamificationManager() {
  // สถานะสำหรับการแสดงการแจ้งเตือนความสำเร็จ
  const [showAchievement, setShowAchievement] = useState<{
    id: string;
    name: string;
    description: string;
    icon: string;
    points: number;
  } | null>(null);
  
  // สถานะสำหรับการแสดงแอนิเมชันคะแนน
  const [showPoints, setShowPoints] = useState<{
    points: number;
    position: { x: number; y: number };
  } | null>(null);
  
  // สถานะสำหรับการแสดงหน้าต่างเลื่อนระดับ
  const [showLevelUp, setShowLevelUp] = useState<{
    newLevel: number;
  } | null>(null);
  
  // ใช้ context สำหรับเข้าถึงข้อมูลความคืบหน้าของผู้ใช้
  const { progress } = useProgress();
  
  // ใช้ session สำหรับตรวจสอบการเข้าสู่ระบบ
  const { data: session } = useSession();
  
  // ตรวจสอบการเปลี่ยนแปลงของคะแนนและระดับ
  const [prevPoints, setPrevPoints] = useState(0);
  const [prevLevel, setPrevLevel] = useState(1);
  
  // ตรวจสอบการเปลี่ยนแปลงของความคืบหน้า
  useEffect(() => {
    // ตรวจสอบเฉพาะเมื่อผู้ใช้เข้าสู่ระบบแล้ว
    if (!session?.user) return;
    
    // ตรวจสอบการเพิ่มขึ้นของคะแนน
    if (progress.points > prevPoints && prevPoints > 0) {
      // แสดงแอนิเมชันคะแนน
      setShowPoints({
        points: progress.points - prevPoints,
        position: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        }
      });
    }
    
    // ตรวจสอบการเลื่อนระดับ
    if (progress.level > prevLevel && prevLevel > 0) {
      // แสดงหน้าต่างเลื่อนระดับ
      setShowLevelUp({
        newLevel: progress.level
      });
    }
    
    // อัปเดตค่าก่อนหน้า
    setPrevPoints(progress.points);
    setPrevLevel(progress.level);
    
    // ตรวจสอบความสำเร็จใหม่ (จำลองข้อมูล)
    // ในโปรเจคจริงควรตรวจสอบจากฐานข้อมูล
    const checkNewAchievements = () => {
      // ตัวอย่างการตรวจสอบความสำเร็จ
      if (progress.completedLessons.length >= 3 && !progress.achievements.includes('lessons_3')) {
        // แสดงการแจ้งเตือนความสำเร็จ
        setShowAchievement({
          id: 'lessons_3',
          name: 'นักเรียนขยัน',
          description: 'เรียนบทเรียน 3 บทเสร็จสมบูรณ์',
          icon: '📚',
          points: 20
        });
      } else if (progress.completedExercises.length >= 3 && !progress.achievements.includes('exercises_3')) {
        // แสดงการแจ้งเตือนความสำเร็จ
        setShowAchievement({
          id: 'exercises_3',
          name: 'นักแก้ปัญหา',
          description: 'ทำแบบฝึกหัด 3 ข้อเสร็จสมบูรณ์',
          icon: '🧩',
          points: 25
        });
      }
    };
    
    checkNewAchievements();
  }, [progress, session, prevPoints, prevLevel]);

  return (
    <>
      {/* แสดงการแจ้งเตือนความสำเร็จ */}
      {showAchievement && (
        <AchievementNotification
          achievement={showAchievement}
          onClose={() => setShowAchievement(null)}
        />
      )}
      
      {/* แสดงแอนิเมชันคะแนน */}
      {showPoints && (
        <PointsAnimation
          points={showPoints.points}
          position={showPoints.position}
          onComplete={() => setShowPoints(null)}
        />
      )}
      
      {/* แสดงหน้าต่างเลื่อนระดับ */}
      {showLevelUp && (
        <LevelUpModal
          newLevel={showLevelUp.newLevel}
          onClose={() => setShowLevelUp(null)}
        />
      )}
    </>
  );
}
