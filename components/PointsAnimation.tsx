"use client";

import React, { useState, useEffect } from 'react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';

interface PointsAnimationProps {
  points: number;
  position?: { x: number; y: number };
  onComplete?: () => void;
}

// คอมโพเนนต์สำหรับแสดงแอนิเมชันคะแนนเมื่อผู้ใช้ได้รับคะแนน
export default function PointsAnimation({
  points,
  position = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  onComplete
}: PointsAnimationProps) {
  const [visible, setVisible] = useState(true);
  const [style, setStyle] = useState({
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: 1,
    transform: 'translateY(0) scale(1)'
  });
  
  // ใช้ context สำหรับตรวจสอบธีมปัจจุบัน
  const { theme } = useTheme();
  
  // เริ่มแอนิเมชัน
  useEffect(() => {
    // เริ่มแอนิเมชันหลังจากแสดงคอมโพเนนต์
    const animationTimeout = setTimeout(() => {
      setStyle({
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: 0,
        transform: 'translateY(-50px) scale(1.5)'
      });
      
      // ซ่อนคอมโพเนนต์หลังจากแอนิเมชันเสร็จสิ้น
      setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 1000);
    }, 100);
    
    return () => clearTimeout(animationTimeout);
  }, [position, onComplete]);

  if (!visible) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        ...style,
        transition: 'all 1s ease-out'
      }}
    >
      <div className="text-2xl font-bold text-primary">
        +{points} คะแนน
      </div>
    </div>
  );
}
