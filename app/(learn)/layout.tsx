"use client";

// ไฟล์นี้กำหนดเลย์เอาต์สำหรับส่วนการเรียนรู้ (lessons, exercises, guidelines, examples)
// This file defines the layout for the learning section (lessons, exercises, guidelines, examples)

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// คอมโพเนนต์ Layout สำหรับส่วนการเรียนรู้
// Layout component for the learning section
export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // สถานะสำหรับการแสดง/ซ่อน sidebar บนมือถือ
  // State for showing/hiding the sidebar on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficulty') || 'all';

  // ฟังก์ชันสำหรับสลับสถานะ sidebar
  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // ปิด sidebar เมื่อหน้าจอเปลี่ยนเป็นขนาดเดสก์ท็อป
  // Close sidebar when screen changes to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ฟังก์ชันกำหนดคลาสสำหรับลิงก์ที่เลือก
  // Function to determine class for selected link
  const getLinkClass = (value: string) => {
    return `block py-1 transition-colors ${
      difficulty === value
        ? 'text-primary font-semibold'
        : 'text-text-secondary hover:text-primary'
    }`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex flex-col md:flex-row">
        {/* ปุ่มเปิด sidebar สำหรับมือถือ */}
        {/* Button to open sidebar on mobile */}
        <button
          className="md:hidden fixed bottom-4 right-4 z-10 bg-primary text-white p-3 rounded-full shadow-lg"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
        >
          {sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
        
        {/* Sidebar */}
        <aside 
          className={`
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 transition-transform duration-300 ease-in-out
            fixed md:static top-0 left-0 h-full md:h-auto z-20 md:z-0
            w-64 bg-surface md:border-r border-text-secondary/10 overflow-y-auto
          `}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">การเรียนรู้</h2>
            
            {/* เมนูการเรียนรู้ */}
            {/* Learning menu */}
            <nav className="space-y-6">
              {/* บทเรียน */}
              {/* Lessons */}
              <div>
                <h3 className="text-lg font-semibold mb-2">บทเรียน</h3>
                <ul className="space-y-1 pl-2">
                  <li>
                    <Link 
                      href="/lessons" 
                      className={getLinkClass('all')}
                      onClick={() => setSidebarOpen(false)}
                    >
                      ทั้งหมด
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/lessons?difficulty=beginner" 
                      className={getLinkClass('beginner')}
                      onClick={() => setSidebarOpen(false)}
                    >
                      สำหรับผู้เริ่มต้น
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/lessons?difficulty=intermediate" 
                      className={getLinkClass('intermediate')}
                      onClick={() => setSidebarOpen(false)}
                    >
                      ระดับกลาง
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/lessons?difficulty=advanced" 
                      className={getLinkClass('advanced')}
                      onClick={() => setSidebarOpen(false)}
                    >
                      ระดับสูง
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* แบบฝึกหัด */}
              {/* Exercises */}
              <div>
                <h3 className="text-lg font-semibold mb-2">แบบฝึกหัด</h3>
                <ul className="space-y-1 pl-2">
                  <li>
                    <Link 
                      href="/exercises" 
                      className={getLinkClass('all')}
                      onClick={() => setSidebarOpen(false)}
                    >
                      ทั้งหมด
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/exercises?difficulty=beginner" 
                      className={getLinkClass('beginner')}
                      onClick={() => setSidebarOpen(false)}
                    >
                      สำหรับผู้เริ่มต้น
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/exercises?difficulty=intermediate" 
                      className={getLinkClass('intermediate')}
                      onClick={() => setSidebarOpen(false)}
                    >
                      ระดับกลาง
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/exercises?difficulty=advanced" 
                      className={getLinkClass('advanced')}
                      onClick={() => setSidebarOpen(false)}
                    >
                      ระดับสูง
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* แนวทางปฏิบัติ */}
              {/* Guidelines */}
              <div>
                <h3 className="text-lg font-semibold mb-2">แนวทางปฏิบัติ</h3>
                <ul className="space-y-1 pl-2">
                  <li>
                    <Link 
                      href="/guidelines" 
                      className="block py-1 text-text-secondary hover:text-primary transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      ทั้งหมด
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/guidelines/code-style" 
                      className="block py-1 text-text-secondary hover:text-primary transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      รูปแบบโค้ด
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/guidelines/performance" 
                      className="block py-1 text-text-secondary hover:text-primary transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      ประสิทธิภาพ
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/guidelines/security" 
                      className="block py-1 text-text-secondary hover:text-primary transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      ความปลอดภัย
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* ตัวอย่าง */}
              {/* Examples */}
              <div>
                <h3 className="text-lg font-semibold mb-2">ตัวอย่าง</h3>
                <ul className="space-y-1 pl-2">
                  <li>
                    <Link 
                      href="/examples" 
                      className="block py-1 text-text-secondary hover:text-primary transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      ทั้งหมด
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/examples?category=components" 
                      className="block py-1 text-text-secondary hover:text-primary transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      คอมโพเนนต์
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/examples?category=api" 
                      className="block py-1 text-text-secondary hover:text-primary transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      API
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/examples?category=full-stack" 
                      className="block py-1 text-text-secondary hover:text-primary transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      Full-Stack
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>
        
        {/* พื้นหลังทึบเมื่อเปิด sidebar บนมือถือ */}
        {/* Overlay when sidebar is open on mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        
        {/* เนื้อหาหลัก */}
        {/* Main content */}
        <main className="flex-grow p-4 md:p-8">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}