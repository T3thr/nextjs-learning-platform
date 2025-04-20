// app/layout.tsx
// ไฟล์นี้กำหนดเลย์เอาต์หลักของแอปพลิเคชัน
// This file defines the main layout of the application

import GlobalProvider from "@/context/GlobalProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FooterWrapper from "@/components/FooterWrapper";

// โหลดฟอนต์ Inter
// Load Inter font
const inter = Inter({ subsets: ["latin"] });

// กำหนดค่า metadata สำหรับ SEO
// Define metadata for SEO
export const metadata: Metadata = {
  title: {
    template: "%s | Next.js Learning Platform",
    default: "Next.js Learning Platform - เรียนรู้ Next.js แบบครบวงจร",
  },
  description: "แพลตฟอร์มการเรียนรู้ Next.js ที่ครอบคลุมทุกหัวข้อสำคัญ ตั้งแต่พื้นฐานไปจนถึงขั้นสูง พร้อมแบบฝึกหัดและตัวอย่างโค้ดที่ใช้งานได้จริง",
  keywords: ["Next.js", "React", "JavaScript", "TypeScript", "Web Development", "การเรียนรู้", "การพัฒนาเว็บ", "แบบฝึกหัด"],
  authors: [{ name: "Next.js Learning Platform Team" }],
  creator: "Next.js Learning Platform",
  publisher: "Next.js Learning Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Next.js Learning Platform - เรียนรู้ Next.js แบบครบวงจร",
    description: "แพลตฟอร์มการเรียนรู้ Next.js ที่ครอบคลุมทุกหัวข้อสำคัญ ตั้งแต่พื้นฐานไปจนถึงขั้นสูง พร้อมแบบฝึกหัดและตัวอย่างโค้ดที่ใช้งานได้จริง",
    url: "https://nextjs-learning-platform.example.com",
    siteName: "Next.js Learning Platform",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Learning Platform - เรียนรู้ Next.js แบบครบวงจร",
    description: "แพลตฟอร์มการเรียนรู้ Next.js ที่ครอบคลุมทุกหัวข้อสำคัญ ตั้งแต่พื้นฐานไปจนถึงขั้นสูง พร้อมแบบฝึกหัดและตัวอย่างโค้ดที่ใช้งานได้จริง",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * คอมโพเนนต์เลย์เอาต์หลักของแอปพลิเคชัน
 * Main layout component of the application
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        {/* เพิ่ม script สำหรับตั้งค่าธีมทันทีเพื่อป้องกันการกระพริบ */}
        {/* Add script to set theme immediately to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // ดึงธีมจาก localStorage หรือใช้การตั้งค่าระบบ
                  // Get theme from localStorage or use system preference
                  const savedTheme = localStorage.getItem('theme');
                  const isDarkMode = savedTheme === 'dark' || 
                    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  
                  // เพิ่ม class 'dark' ถ้าเป็นโหมดมืด
                  // Add 'dark' class if it's dark mode
                  if (isDarkMode) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  // กำหนดตัวแปร CSS สำหรับ toast
                  // Set CSS variables for toast
                  if (isDarkMode) {
                    document.documentElement.style.setProperty('--toast-bg', '#1f2937');
                    document.documentElement.style.setProperty('--toast-color', '#f3f4f6');
                    document.documentElement.style.setProperty('--toast-border', '#374151');
                  } else {
                    document.documentElement.style.setProperty('--toast-bg', '#ffffff');
                    document.documentElement.style.setProperty('--toast-color', '#1f2937');
                    document.documentElement.style.setProperty('--toast-border', '#e5e7eb');
                  }
                } catch (e) {
                  console.error('Error applying theme:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <GlobalProvider>
          {/* ใช้ ThemeProvider เพื่อจัดการธีมในระดับสูงสุด */}
          {/* Use ThemeProvider to manage theme at the top level */}
          <ThemeProvider>
            <main className="flex-grow">{children}</main>
            <FooterWrapper />
          </ThemeProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}