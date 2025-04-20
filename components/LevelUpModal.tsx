"use client";

import React, { useState, useEffect } from 'react';
import { useProgress } from '@/context/ProgressContext';
import Link from 'next/link';

interface LevelUpModalProps {
  newLevel: number;
  onClose: () => void;
}

// คอมโพเนนต์สำหรับแสดงหน้าต่างเมื่อผู้ใช้เลื่อนระดับ
export default function LevelUpModal({
  newLevel,
  onClose
}: LevelUpModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  // แสดงหน้าต่างด้วยเอฟเฟกต์เลื่อนเข้ามา
  useEffect(() => {
    // แสดงหน้าต่างหลังจากโหลดคอมโพเนนต์
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  // จัดการการปิดหน้าต่าง
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); // รอให้เอฟเฟกต์เลื่อนออกเสร็จสิ้นก่อนปิด
  };

  // ข้อความแสดงความสามารถใหม่ตามระดับ
  const getNewAbilities = (level: number) => {
    switch (level) {
      case 2:
        return "คุณสามารถเข้าถึงแบบฝึกหัดระดับกลางได้แล้ว";
      case 3:
        return "คุณสามารถเข้าถึงบทเรียนเกี่ยวกับการพัฒนาแอปพลิเคชันระดับองค์กรได้แล้ว";
      case 4:
        return "คุณสามารถเข้าถึงแบบฝึกหัดระดับสูงได้แล้ว";
      case 5:
        return "คุณสามารถเข้าถึงบทเรียนขั้นสูงและการเพิ่มประสิทธิภาพได้แล้ว";
      default:
        return "คุณได้ปลดล็อกเนื้อหาและความสามารถใหม่";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div 
        className={`bg-surface border-4 border-primary rounded-lg shadow-2xl p-8 max-w-md transform transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-primary mb-2">เลเวลอัพ!</h2>
          <div className="flex justify-center items-center my-6">
            <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-4xl font-bold">
              {newLevel}
            </div>
          </div>
          <p className="text-xl mb-4">ยินดีด้วย! คุณได้เลื่อนระดับเป็นเลเวล {newLevel}</p>
          <p className="text-text-secondary mb-6">{getNewAbilities(newLevel)}</p>
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={handleClose}
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              เยี่ยมมาก!
            </button>
            
            <Link 
              href="/dashboard"
              className="px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
              onClick={handleClose}
            >
              ไปที่แดชบอร์ด
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
