"use client";

import React from 'react';
import Link from 'next/link';

interface AchievementCardProps {
  name: string;
  description: string;
  icon: string;
  isEarned: boolean;
  progress?: number;
  requiredPoints: number;
}

// คอมโพเนนต์สำหรับแสดงความสำเร็จ (Achievement) ในรูปแบบการ์ด
export default function AchievementCard({
  name,
  description,
  icon,
  isEarned,
  progress = 0,
  requiredPoints,
}: AchievementCardProps) {
  // คำนวณเปอร์เซ็นต์ความคืบหน้า
  const progressPercentage = Math.min(100, Math.round((progress / requiredPoints) * 100));

  return (
    <div className={`border rounded-lg overflow-hidden transition-all duration-300 ${
      isEarned 
        ? 'border-primary/50 bg-primary/5 dark:bg-primary/10' 
        : 'border-text-secondary/20 bg-surface'
    }`}>
      {/* ส่วนหัวของการ์ด */}
      <div className="p-4">
        <div className="flex items-center">
          {/* ไอคอนความสำเร็จ */}
          <div className={`text-3xl mr-3 ${isEarned ? 'opacity-100' : 'opacity-50'}`}>
            {icon}
          </div>
          
          {/* ชื่อและคำอธิบาย */}
          <div className="flex-grow">
            <h3 className={`font-bold ${isEarned ? 'text-primary' : ''}`}>{name}</h3>
            <p className="text-sm text-text-secondary">{description}</p>
          </div>
          
          {/* สถานะ */}
          {isEarned ? (
            <div className="ml-2 bg-success/20 text-success text-xs font-medium px-2.5 py-0.5 rounded-full">
              สำเร็จแล้ว
            </div>
          ) : (
            <div className="ml-2 bg-text-secondary/20 text-text-secondary text-xs font-medium px-2.5 py-0.5 rounded-full">
              ยังไม่สำเร็จ
            </div>
          )}
        </div>
      </div>
      
      {/* แสดงความคืบหน้า (กรณียังไม่สำเร็จ) */}
      {!isEarned && (
        <div className="px-4 pb-4">
          <div className="flex justify-between text-xs text-text-secondary mb-1">
            <span>{progress} / {requiredPoints} คะแนน</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
