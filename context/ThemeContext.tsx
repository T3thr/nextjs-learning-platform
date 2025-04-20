"use client";

// ไฟล์นี้จัดการ context สำหรับการสลับธีมของแอปพลิเคชัน
// This file manages the context for theme switching in the application

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// กำหนดประเภทข้อมูลสำหรับ context
// Define the type for the context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// สร้าง context สำหรับการจัดการธีม
// Create context for theme management
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// คอมโพเนนต์ Provider สำหรับให้คอมโพเนนต์ลูกเข้าถึงข้อมูลธีม
// Provider component to allow child components to access theme data
export function ThemeProvider({ children }: { children: ReactNode }) {
  // สถานะสำหรับเก็บธีมปัจจุบัน
  // State to store the current theme
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // ฟังก์ชันสำหรับสลับธีม
  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';

      // บันทึกค่าลงใน localStorage เพื่อให้ธีมคงอยู่เมื่อรีเฟรชหน้า
      // Save theme to localStorage to persist on page refresh
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        // อัปเดต class ของ document.documentElement
        // Update the class on document.documentElement
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      return newTheme;
    });
  };

  // ใช้ useEffect เพื่อซิงโครไนซ์ธีมเมื่อโหลดคอมโพเนนต์
  // Use useEffect to synchronize theme on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // ดึงธีมที่บันทึกไว้หรือใช้การตั้งค่าระบบ
      // Get saved theme or use system preference
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

      setTheme(initialTheme);
    }
  }, []);

  // ค่าที่จะส่งให้กับ context
  // Values to provide to the context
  const value = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Custom hook สำหรับการเข้าถึง ThemeContext
// Custom hook to access ThemeContext
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme ต้องถูกใช้งานภายใน ThemeProvider');
  }

  return context;
}