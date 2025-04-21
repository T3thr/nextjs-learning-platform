"use client";

/**
 * ไฟล์นี้สร้างคอมโพเนนต์ GlobalProvider ซึ่งรวม Provider ต่างๆ เข้าด้วยกัน
 * This file creates the GlobalProvider component which combines various providers
 * 
 * GlobalProvider ทำหน้าที่รวม context provider ต่างๆ เช่น ThemeProvider, AuthProvider และ GamificationProvider
 * GlobalProvider combines various context providers such as ThemeProvider, AuthProvider, and GamificationProvider
 */

import { SessionProvider } from 'next-auth/react';
import { ProgressProvider } from './ProgressContext';
import { AuthProvider } from './AuthContext';
import { ReactNode, Suspense } from 'react';

// คอมโพเนนต์ GlobalProvider รวม providers ทั้งหมดเข้าด้วยกัน
// เพื่อให้สามารถเข้าถึงข้อมูลได้ทั่วทั้งแอปพลิเคชัน
export default function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    // SessionProvider จาก NextAuth.js ต้องอยู่ด้านนอกสุด
    <SessionProvider>
      {/* AuthProvider สำหรับจัดการสถานะการยืนยันตัวตน */}
      <AuthProvider>
        {/* ProgressProvider สำหรับจัดการความคืบหน้าของผู้ใช้ */}
        <ProgressProvider>
          {/* Wrapping children in Suspense for useSearchParams() */}
          <Suspense fallback={<div>กำลังโหลด...</div>}>
            {children}
          </Suspense>
        </ProgressProvider>
      </AuthProvider>
    </SessionProvider>
  );
}