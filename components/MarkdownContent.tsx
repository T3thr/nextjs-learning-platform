"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useProgress } from '@/context/ProgressContext';

interface MarkdownContentProps {
  content: string;
  lessonId?: string;
}

// คอมโพเนนต์สำหรับแสดงเนื้อหา Markdown พร้อมการจัดรูปแบบ
export default function MarkdownContent({ content, lessonId }: MarkdownContentProps) {
  // ใช้ context สำหรับตรวจสอบธีมปัจจุบัน
  const { theme } = useTheme();
  
  // ใช้ context สำหรับจัดการความคืบหน้าของผู้ใช้
  const { completeLesson } = useProgress();
  
  // ฟังก์ชันสำหรับบันทึกการเรียนบทเรียนเสร็จสิ้น
  const handleLessonComplete = () => {
    if (lessonId) {
      completeLesson(lessonId);
      alert('ยินดีด้วย! คุณได้เรียนบทเรียนนี้เสร็จสิ้นแล้ว');
    }
  };

  // แปลง Markdown เป็น HTML อย่างง่าย (ในโปรเจคจริงควรใช้ไลบรารีเช่น react-markdown)
  const renderMarkdown = () => {
    // แยกเนื้อหาเป็นบรรทัด
    const lines = content.split('\n');
    
    // แปลงแต่ละบรรทัดเป็น HTML
    return lines.map((line, index) => {
      // หัวข้อ h1
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
      }
      
      // หัวข้อ h2
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
      }
      
      // หัวข้อ h3
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-5 mb-2">{line.substring(4)}</h3>;
      }
      
      // รายการแบบมีลำดับ
      if (line.match(/^\d+\. /)) {
        const text = line.replace(/^\d+\. /, '');
        return <li key={index} className="ml-6 list-decimal mb-2">{text}</li>;
      }
      
      // รายการแบบไม่มีลำดับ
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 list-disc mb-2">{line.substring(2)}</li>;
      }
      
      // โค้ดบล็อก (อย่างง่าย)
      if (line.startsWith('```')) {
        return null; // จัดการในส่วนอื่น
      }
      
      // บรรทัดว่าง
      if (line.trim() === '') {
        return <div key={index} className="h-4"></div>;
      }
      
      // ข้อความทั่วไป
      return <p key={index} className="mb-4">{line}</p>;
    });
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      {renderMarkdown()}
      
      {/* ปุ่มบันทึกความคืบหน้า */}
      {lessonId && (
        <div className="mt-12 pt-6 border-t border-text-secondary/10">
          <button
            onClick={handleLessonComplete}
            className="btn btn-primary"
          >
            ฉันเรียนบทเรียนนี้เสร็จแล้ว
          </button>
        </div>
      )}
    </div>
  );
}
