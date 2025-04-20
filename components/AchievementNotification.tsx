"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useProgress } from '@/context/ProgressContext';
import confetti from 'canvas-confetti';

interface AchievementNotificationProps {
  achievement: {
    id: string;
    name: string;
    description: string;
    icon: string;
    points: number;
  };
  onClose: () => void;
}

// คอมโพเนนต์สำหรับแสดงการแจ้งเตือนเมื่อได้รับความสำเร็จใหม่
export default function AchievementNotification({
  achievement,
  onClose
}: AchievementNotificationProps) {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  
  // แสดงการแจ้งเตือนด้วยเอฟเฟกต์เลื่อนเข้ามา
  useEffect(() => {
    // แสดงการแจ้งเตือนหลังจากโหลดคอมโพเนนต์
    setTimeout(() => {
      setIsVisible(true);
      
      // เล่นเอฟเฟกต์ confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 100);
    
    // ซ่อนการแจ้งเตือนหลังจาก 5 วินาที
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // รอให้เอฟเฟกต์เลื่อนออกเสร็จสิ้นก่อนปิด
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div 
        className={`bg-surface border border-primary/20 rounded-lg shadow-lg p-6 max-w-md transform transition-all duration-500 pointer-events-auto ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="flex items-center">
          <div className="text-5xl mr-4">{achievement.icon}</div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-primary">ความสำเร็จใหม่!</h3>
            <h4 className="font-semibold">{achievement.name}</h4>
            <p className="text-text-secondary text-sm">{achievement.description}</p>
            <div className="mt-2 text-success font-medium">+{achievement.points} คะแนน</div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button 
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 500);
            }}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            ยอดเยี่ยม!
          </button>
        </div>
      </div>
    </div>
  );
}
