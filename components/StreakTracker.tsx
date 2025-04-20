"use client";

import React, { useState, useEffect } from 'react';
import { useProgress } from '@/context/ProgressContext';
import Link from 'next/link';

interface StreakTrackerProps {
  userId?: string;
}

// คอมโพเนนต์สำหรับติดตามและแสดงสถิติการเรียนต่อเนื่อง
export default function StreakTracker({ userId }: StreakTrackerProps) {
  // สถานะสำหรับเก็บข้อมูลการเรียนต่อเนื่อง
  const [streak, setStreak] = useState({
    current: 0,
    longest: 0,
    lastActive: '',
    daysActive: [] as string[],
  });
  
  // ใช้ context สำหรับเข้าถึงข้อมูลความคืบหน้าของผู้ใช้
  const { progress } = useProgress();
  
  // คำนวณวันที่ปัจจุบัน
  const today = new Date().toISOString().split('T')[0];
  
  // ตรวจสอบและอัปเดตสถิติการเรียนต่อเนื่อง
  useEffect(() => {
    // จำลองการดึงข้อมูลจาก localStorage (ในโปรเจคจริงควรดึงจากฐานข้อมูล)
    const storedStreak = localStorage.getItem('learningStreak');
    let streakData = storedStreak ? JSON.parse(storedStreak) : {
      current: 0,
      longest: 0,
      lastActive: '',
      daysActive: [],
    };
    
    // ตรวจสอบว่าวันนี้มีการเรียนหรือไม่
    const hasActivityToday = progress.completedLessons.length > 0 || progress.completedExercises.length > 0;
    
    if (hasActivityToday && !streakData.daysActive.includes(today)) {
      // เพิ่มวันนี้ในรายการวันที่มีการเรียน
      streakData.daysActive.push(today);
      
      // ตรวจสอบว่าเป็นการเรียนต่อเนื่องหรือไม่
      if (streakData.lastActive) {
        const lastDate = new Date(streakData.lastActive);
        const currentDate = new Date(today);
        
        // คำนวณจำนวนวันระหว่างวันที่เรียนล่าสุดกับวันนี้
        const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          // เรียนต่อเนื่อง เพิ่ม streak
          streakData.current += 1;
        } else if (diffDays > 1) {
          // ไม่ได้เรียนต่อเนื่อง รีเซ็ต streak
          streakData.current = 1;
        }
      } else {
        // เริ่มนับ streak วันแรก
        streakData.current = 1;
      }
      
      // อัปเดตวันที่เรียนล่าสุด
      streakData.lastActive = today;
      
      // อัปเดต streak ที่ยาวที่สุด
      if (streakData.current > streakData.longest) {
        streakData.longest = streakData.current;
      }
      
      // บันทึกข้อมูลลง localStorage
      localStorage.setItem('learningStreak', JSON.stringify(streakData));
    }
    
    setStreak(streakData);
  }, [progress.completedLessons.length, progress.completedExercises.length, today]);

  return (
    <div className="bg-surface p-6 rounded-lg border border-text-secondary/10">
      <h3 className="font-bold text-lg mb-4">การเรียนต่อเนื่อง</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-background rounded-lg">
          <div className="text-3xl font-bold text-primary">{streak.current}</div>
          <div className="text-sm text-text-secondary">วันต่อเนื่อง</div>
        </div>
        
        <div className="text-center p-4 bg-background rounded-lg">
          <div className="text-3xl font-bold text-primary">{streak.longest}</div>
          <div className="text-sm text-text-secondary">สูงสุด</div>
        </div>
      </div>
      
      {/* แสดงแถบวันในสัปดาห์ */}
      <div className="mt-4">
        <div className="text-sm text-text-secondary mb-2">7 วันล่าสุด</div>
        <div className="flex justify-between">
          {Array.from({ length: 7 }).map((_, index) => {
            // คำนวณวันย้อนหลัง
            const date = new Date();
            date.setDate(date.getDate() - (6 - index));
            const dateStr = date.toISOString().split('T')[0];
            
            // ตรวจสอบว่ามีการเรียนในวันนั้นหรือไม่
            const isActive = streak.daysActive.includes(dateStr);
            
            // ชื่อวันในสัปดาห์ภาษาไทย
            const dayNames = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
            const dayName = dayNames[date.getDay()];
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-text-secondary mb-1">{dayName}</div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'bg-background border border-text-secondary/20'
                }`}>
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* ข้อความกระตุ้น */}
      <div className="mt-6 text-center">
        {streak.current > 0 ? (
          <p className="text-sm">
            เยี่ยมมาก! คุณเรียนต่อเนื่องมาแล้ว {streak.current} วัน 🔥
          </p>
        ) : (
          <p className="text-sm">
            เริ่มเรียนวันนี้เพื่อสร้างสถิติการเรียนต่อเนื่อง! 🚀
          </p>
        )}
      </div>
      
      {/* ปุ่มไปยังบทเรียน */}
      <div className="mt-4">
        <Link href="/lessons" className="block w-full text-center py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
          เรียนต่อ
        </Link>
      </div>
    </div>
  );
}
