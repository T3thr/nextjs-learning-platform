"use client";

import React from 'react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

interface LearningPathProps {
  modules?: {
    id: string;
    title: string;
    description: string;
    lessons: {
      id: string;
      title: string;
      slug: string;
      isCompleted?: boolean;
    }[];
  }[];
}

// คอมโพเนนต์สำหรับแสดงเส้นทางการเรียนรู้
export default function LearningPath({ modules = [] }: LearningPathProps) {
  // ใช้ context สำหรับตรวจสอบความคืบหน้าของผู้ใช้
  const { progress } = useProgress();
  
  // ถ้าไม่มีข้อมูล ให้ใช้ข้อมูลตัวอย่าง
  const learningModules = modules.length > 0 ? modules : [
    {
      id: '1',
      title: 'Next.js พื้นฐาน',
      description: 'เรียนรู้พื้นฐานของ Next.js และการใช้งาน App Router',
      lessons: [
        { id: '1', title: 'แนะนำ Next.js', slug: 'introduction-to-nextjs' },
        { id: '2', title: 'พื้นฐาน App Router', slug: 'app-router-basics' },
        { id: '3', title: 'การจัดการข้อมูลใน Next.js', slug: 'data-fetching' },
      ]
    },
    {
      id: '2',
      title: 'การพัฒนาแอปพลิเคชันระดับองค์กร',
      description: 'เรียนรู้การพัฒนาแอปพลิเคชัน Next.js ที่มีขนาดใหญ่และซับซ้อน',
      lessons: [
        { id: '4', title: 'สถาปัตยกรรมระดับองค์กร', slug: 'enterprise-architecture' },
        { id: '5', title: 'การจัดการสถานะขั้นสูง', slug: 'advanced-state-management' },
        { id: '6', title: 'การทดสอบแอปพลิเคชัน Next.js', slug: 'testing-nextjs-apps' },
      ]
    },
    {
      id: '3',
      title: 'รูปแบบขั้นสูงและการเพิ่มประสิทธิภาพ',
      description: 'เรียนรู้รูปแบบการพัฒนาขั้นสูงและเทคนิคการเพิ่มประสิทธิภาพ',
      lessons: [
        { id: '7', title: 'การเพิ่มประสิทธิภาพ Next.js', slug: 'nextjs-optimization' },
        { id: '8', title: 'Server Components และ Streaming', slug: 'server-components-streaming' },
        { id: '9', title: 'การใช้งาน Edge Runtime', slug: 'edge-runtime' },
      ]
    }
  ];

  // ตรวจสอบสถานะการเรียนของแต่ละบทเรียน
  const modulesWithProgress = learningModules.map(module => ({
    ...module,
    lessons: module.lessons.map(lesson => ({
      ...lesson,
      isCompleted: lesson.isCompleted !== undefined 
        ? lesson.isCompleted 
        : progress.completedLessons.includes(lesson.id)
    }))
  }));

  return (
    <div className="space-y-8">
      {modulesWithProgress.map((module, moduleIndex) => {
        // คำนวณความคืบหน้าของโมดูล
        const completedLessons = module.lessons.filter(lesson => lesson.isCompleted).length;
        const totalLessons = module.lessons.length;
        const moduleProgress = Math.round((completedLessons / totalLessons) * 100);
        
        return (
          <div key={module.id} className="bg-surface rounded-lg overflow-hidden border border-text-secondary/10">
            {/* ส่วนหัวของโมดูล */}
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{module.title}</h3>
                  <p className="text-text-secondary mt-1">{module.description}</p>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center">
                  <div className="text-sm text-text-secondary mr-3">
                    {completedLessons}/{totalLessons} บทเรียน
                  </div>
                  <div className="w-24 bg-background rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${moduleProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* รายการบทเรียนในโมดูล */}
              <div className="space-y-4 mt-6">
                {module.lessons.map((lesson, lessonIndex) => (
                  <Link 
                    key={lesson.id} 
                    href={`/lessons/${lesson.slug}`}
                    className="block"
                  >
                    <div className={`p-4 rounded-lg border ${
                      lesson.isCompleted 
                        ? 'border-success/30 bg-success/5' 
                        : 'border-text-secondary/10 hover:border-primary/30 hover:bg-primary/5'
                    } transition-colors`}>
                      <div className="flex items-center">
                        {/* ตัวเลขลำดับบทเรียน */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          lesson.isCompleted 
                            ? 'bg-success text-white' 
                            : 'bg-text-secondary/10 text-text-secondary'
                        }`}>
                          {moduleIndex + 1}.{lessonIndex + 1}
                        </div>
                        
                        {/* ชื่อบทเรียน */}
                        <div className="flex-grow">
                          <h4 className={`font-medium ${lesson.isCompleted ? 'text-success' : ''}`}>
                            {lesson.title}
                          </h4>
                        </div>
                        
                        {/* ไอคอนสถานะ */}
                        <div>
                          {lesson.isCompleted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-success">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-secondary">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
