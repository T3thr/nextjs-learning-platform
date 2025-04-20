import React from 'react';
import Link from 'next/link';

// หน้าแสดงรายการแนวทางการพัฒนา Next.js
export default function GuidelinesPage() {
  // รายการแนวทางการพัฒนา
  const guidelines = [
    {
      id: 'getting-started',
      title: 'เริ่มต้นใช้งาน Next.js',
      description: 'แนวทางการติดตั้งและเริ่มต้นโปรเจค Next.js สำหรับผู้เริ่มต้น',
      level: 'เริ่มต้น',
      duration: '15 นาที',
    },
    {
      id: 'project-structure',
      title: 'โครงสร้างโปรเจค Next.js',
      description: 'แนวทางการจัดโครงสร้างโปรเจค Next.js ตามมาตรฐานองค์กร',
      level: 'เริ่มต้น',
      duration: '20 นาที',
    },
    {
      id: 'routing-navigation',
      title: 'การจัดการเส้นทางและการนำทาง',
      description: 'แนวทางการใช้งาน App Router และการนำทางใน Next.js',
      level: 'เริ่มต้น',
      duration: '25 นาที',
    },
    {
      id: 'styling-ui',
      title: 'การจัดการ UI และ Styling',
      description: 'แนวทางการใช้งาน Tailwind CSS และการจัดการ UI ใน Next.js',
      level: 'เริ่มต้น',
      duration: '30 นาที',
    },
    {
      id: 'data-fetching',
      title: 'การดึงข้อมูลและการจัดการ API',
      description: 'แนวทางการดึงข้อมูลและการสร้าง API Routes ใน Next.js',
      level: 'กลาง',
      duration: '35 นาที',
    },
    {
      id: 'authentication',
      title: 'การยืนยันตัวตนด้วย NextAuth.js',
      description: 'แนวทางการใช้งาน NextAuth.js สำหรับการยืนยันตัวตนใน Next.js',
      level: 'กลาง',
      duration: '40 นาที',
    },
    {
      id: 'database-integration',
      title: 'การเชื่อมต่อฐานข้อมูลด้วย Drizzle ORM',
      description: 'แนวทางการใช้งาน Drizzle ORM สำหรับการเชื่อมต่อฐานข้อมูลใน Next.js',
      level: 'กลาง',
      duration: '45 นาที',
    },
    {
      id: 'deployment',
      title: 'การ Deploy แอปพลิเคชัน Next.js',
      description: 'แนวทางการ Deploy แอปพลิเคชัน Next.js ไปยัง Production',
      level: 'กลาง',
      duration: '30 นาที',
    },
  ];

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของหน้า */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">แนวทางการพัฒนา Next.js</h1>
        <p className="text-text-secondary">
          แนวทางการพัฒนาแอปพลิเคชัน Next.js ตามมาตรฐานองค์กร เพื่อช่วยให้นักพัฒนาสามารถเริ่มต้นและพัฒนาแอปพลิเคชันได้อย่างมีประสิทธิภาพ
        </p>
      </div>
      
      {/* รายการแนวทางการพัฒนา */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guidelines.map((guideline) => (
          <Link 
            key={guideline.id} 
            href={`/guidelines/${guideline.id}`}
            className="bg-surface hover:bg-surface/80 rounded-lg p-6 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-bold">{guideline.title}</h2>
              <div className="flex items-center">
                <span className={`badge ${
                  guideline.level === 'เริ่มต้น' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                } text-xs mr-2`}>
                  {guideline.level}
                </span>
                <span className="flex items-center text-text-secondary text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {guideline.duration}
                </span>
              </div>
            </div>
            <p className="text-text-secondary">{guideline.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
