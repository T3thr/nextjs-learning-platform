import React from 'react';
import Link from 'next/link';

// หน้าแสดงรายการตัวอย่างการใช้งาน Next.js
export default function ExamplesPage() {
  // รายการตัวอย่างการใช้งาน Next.js
  const examples = [
    {
      id: 'authentication',
      title: 'การยืนยันตัวตนด้วย NextAuth.js',
      description: 'ตัวอย่างการใช้งาน NextAuth.js สำหรับการยืนยันตัวตนใน Next.js ด้วยหลากหลาย providers',
      level: 'กลาง',
      duration: '30 นาที',
    },
    {
      id: 'data-fetching',
      title: 'การดึงข้อมูลแบบต่างๆ',
      description: 'ตัวอย่างการดึงข้อมูลใน Next.js ทั้งแบบ Server Components, Client Components และ API Routes',
      level: 'กลาง',
      duration: '25 นาที',
    },
    {
      id: 'form-handling',
      title: 'การจัดการฟอร์ม',
      description: 'ตัวอย่างการจัดการฟอร์มใน Next.js ด้วย React Hook Form และ Zod',
      level: 'กลาง',
      duration: '20 นาที',
    },
    {
      id: 'infinite-scroll',
      title: 'Infinite Scroll',
      description: 'ตัวอย่างการทำ Infinite Scroll ใน Next.js ด้วย Intersection Observer API',
      level: 'สูง',
      duration: '35 นาที',
    },
    {
      id: 'image-optimization',
      title: 'การปรับแต่งรูปภาพ',
      description: 'ตัวอย่างการใช้งาน Next.js Image Component สำหรับการปรับแต่งรูปภาพ',
      level: 'ต้น',
      duration: '15 นาที',
    },
    {
      id: 'seo-optimization',
      title: 'การปรับแต่ง SEO',
      description: 'ตัวอย่างการปรับแต่ง SEO ใน Next.js ด้วย Metadata API',
      level: 'กลาง',
      duration: '20 นาที',
    },
    {
      id: 'dark-mode',
      title: 'การทำ Dark Mode',
      description: 'ตัวอย่างการทำ Dark Mode ใน Next.js ด้วย Tailwind CSS และ Context API',
      level: 'กลาง',
      duration: '25 นาที',
    },
    {
      id: 'internationalization',
      title: 'การทำหลายภาษา',
      description: 'ตัวอย่างการทำหลายภาษาใน Next.js ด้วย next-intl',
      level: 'สูง',
      duration: '30 นาที',
    },
  ];

  // ฟังก์ชันสำหรับแสดงระดับความยาก
  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'ต้น':
        return (
          <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {level}
          </span>
        );
      case 'กลาง':
        return (
          <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {level}
          </span>
        );
      case 'สูง':
        return (
          <span className="badge bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {level}
          </span>
        );
      default:
        return (
          <span className="badge bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            {level}
          </span>
        );
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของหน้า */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ตัวอย่างการใช้งาน Next.js</h1>
        <p className="text-text-secondary">
          ตัวอย่างการใช้งาน Next.js ในสถานการณ์ต่างๆ เพื่อให้คุณสามารถนำไปประยุกต์ใช้ในโปรเจคของคุณได้
        </p>
      </div>

      {/* รายการตัวอย่าง */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example) => (
          <Link
            key={example.id}
            href={`/examples/${example.id}`}
            className="block bg-surface hover:bg-surface-hover transition-colors rounded-lg overflow-hidden shadow-sm hover:shadow-md"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{example.title}</h2>
              <p className="text-text-secondary mb-4">{example.description}</p>
              <div className="flex items-center justify-between">
                <div>{getLevelBadge(example.level)}</div>
                <div className="flex items-center text-text-secondary text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {example.duration}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
