"use client";

import React, { useState, useEffect } from 'react';
import { useProgress } from '@/context/ProgressContext';
import Link from 'next/link';

interface BadgeProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  isEarned: boolean;
  level?: number;
  onClick?: () => void;
}

// คอมโพเนนต์สำหรับแสดงเหรียญรางวัลหรือตราสัญลักษณ์ความสำเร็จ
export default function Badge({
  id,
  name,
  description,
  icon,
  isEarned,
  level,
  onClick
}: BadgeProps) {
  // สถานะสำหรับเอฟเฟกต์การเรืองแสง
  const [isGlowing, setIsGlowing] = useState(false);
  
  // สร้างเอฟเฟกต์การเรืองแสงสำหรับเหรียญที่ได้รับใหม่
  useEffect(() => {
    if (isEarned) {
      // เริ่มเอฟเฟกต์การเรืองแสง
      const interval = setInterval(() => {
        setIsGlowing(prev => !prev);
      }, 1500);
      
      // ล้างเอฟเฟกต์หลังจาก 10 วินาที
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setIsGlowing(false);
      }, 10000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isEarned]);

  return (
    <div 
      className={`relative flex flex-col items-center p-4 rounded-lg transition-all duration-300 cursor-pointer ${
        isEarned 
          ? 'bg-surface hover:bg-primary/5' 
          : 'bg-background/50 opacity-60 hover:opacity-80'
      }`}
      onClick={onClick}
    >
      {/* เหรียญหรือไอคอน */}
      <div 
        className={`text-5xl mb-2 transition-all duration-500 ${
          isGlowing && isEarned ? 'scale-110 text-primary' : ''
        }`}
      >
        {icon}
      </div>
      
      {/* ชื่อเหรียญ */}
      <h3 className={`text-center font-bold ${isEarned ? 'text-primary' : 'text-text-secondary'}`}>
        {name}
      </h3>
      
      {/* คำอธิบาย */}
      <p className="text-center text-xs text-text-secondary mt-1">
        {description}
      </p>
      
      {/* แสดงระดับที่ต้องการ (ถ้ามี) */}
      {level && !isEarned && (
        <div className="mt-2 text-xs bg-text-secondary/10 px-2 py-1 rounded-full">
          ต้องการเลเวล {level}
        </div>
      )}
      
      {/* เอฟเฟกต์การเรืองแสงรอบเหรียญ */}
      {isEarned && isGlowing && (
        <div className="absolute inset-0 rounded-lg bg-primary/20 animate-pulse -z-10"></div>
      )}
    </div>
  );
}
