"use client";

/**
 * ไฟล์นี้สร้างคอมโพเนนต์ GlobalProvider ซึ่งรวม Provider ต่างๆ เข้าด้วยกัน
 * This file creates the GlobalProvider component which combines various providers
 * 
 * GlobalProvider ทำหน้าที่รวม context provider ต่างๆ เช่น ThemeProvider, AuthProvider และ GamificationProvider
 * GlobalProvider combines various context providers such as ThemeProvider, AuthProvider, and GamificationProvider
 */

import { ReactNode } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { SessionProvider } from "next-auth/react";

/**
 * ประเภทของคุณสมบัติสำหรับ GlobalProvider
 * Props type for GlobalProvider
 */
type GlobalProviderProps = {
  children: ReactNode;
};

/**
 * คอมโพเนนต์ GlobalProvider สำหรับรวม Provider ต่างๆ เข้าด้วยกัน
 * GlobalProvider component for combining various providers
 * 
 * @param children เนื้อหาที่จะแสดงภายใน Provider
 */
export default function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    // ThemeProvider จัดการธีมของแอปพลิเคชัน (โหมดสว่าง/มืด)
    // ThemeProvider manages the application theme (light/dark mode)
    <ThemeProvider>
      <SessionProvider>
      {/* AuthProvider จัดการสถานะการเข้าสู่ระบบและข้อมูลผู้ใช้ */}
      {/* AuthProvider manages login state and user data */}
      <AuthProvider>
        {/* GamificationProvider จัดการระบบเกมมิฟิเคชัน เช่น คะแนน, ความสำเร็จ */}
        {/* GamificationProvider manages the gamification system such as points, achievements */}
          {children}
      </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
