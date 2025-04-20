"use client";

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';

// คอมโพเนนต์ Header สำหรับแสดงส่วนหัวของเว็บไซต์
export default function Header() {
  // สถานะสำหรับเมนูบนมือถือ
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { session, signIn, signOut } = useAuth();

  // ฟังก์ชันสำหรับสลับสถานะเมนูบนมือถือ
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-surface shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* โลโก้และชื่อแพลตฟอร์ม */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary font-bold text-xl">Next.js Learning</span>
            </Link>
          </div>

          {/* เมนูสำหรับหน้าจอขนาดใหญ่ */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/lessons" className="text-text-secondary hover:text-primary transition-colors">
              บทเรียน
            </Link>
            <Link href="/exercises" className="text-text-secondary hover:text-primary transition-colors">
              แบบฝึกหัด
            </Link>
            <Link href="/guidelines" className="text-text-secondary hover:text-primary transition-colors">
              แนวทางปฏิบัติ
            </Link>
            <Link href="/examples" className="text-text-secondary hover:text-primary transition-colors">
              ตัวอย่าง
            </Link>
            <Link href="/dashboard" className="text-text-secondary hover:text-primary transition-colors">
              แดชบอร์ด
            </Link>
            <ThemeToggle />
            {session ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <User className="w-5 h-5 text-text-secondary" />
                  <span className="text-text-secondary">{session.user?.name}</span>
                </div>
                <button 
                  onClick={() => signOut()}
                  className="btn btn-primary"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <button 
                onClick={() => signIn()}
                className="btn btn-primary"
              >
                เข้าสู่ระบบ
              </button>
            )}
          </nav>

          {/* ปุ่มเมนูสำหรับมือถือ */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="ml-2 p-2 rounded-md text-text-secondary hover:text-primary focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="เปิดเมนู"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* เมนูสำหรับมือถือ */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-surface">
            <Link 
              href="/lessons" 
              className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-primary hover:bg-background"
              onClick={() => setMobileMenuOpen(false)}
            >
              บทเรียน
            </Link>
            <Link 
              href="/exercises" 
              className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-primary hover:bg-background"
              onClick={() => setMobileMenuOpen(false)}
            >
              แบบฝึกหัด
            </Link>
            <Link 
              href="/guidelines" 
              className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-primary hover:bg-background"
              onClick={() => setMobileMenuOpen(false)}
            >
              แนวทางปฏิบัติ
            </Link>
            <Link 
              href="/examples" 
              className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-primary hover:bg-background"
              onClick={() => setMobileMenuOpen(false)}
            >
              ตัวอย่าง
            </Link>
            <Link 
              href="/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-primary hover:bg-background"
              onClick={() => setMobileMenuOpen(false)}
            >
              แดชบอร์ด
            </Link>
            {session ? (
              <div className="px-3 py-2">
                <div className="flex items-center space-x-1 mb-2">
                  <User className="w-5 h-5 text-text-secondary" />
                  <span className="text-text-secondary">{session.user?.name}</span>
                </div>
                <button 
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn btn-primary"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  signIn();
                  setMobileMenuOpen(false);
                }}
                className="mt-2 w-full btn btn-primary"
              >
                เข้าสู่ระบบ
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}