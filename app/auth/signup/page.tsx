"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// หน้าสมัครสมาชิก
export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // จัดการการส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // ตรวจสอบรหัสผ่านตรงกัน
    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }
    
    setIsLoading(true);

    try {
      // ส่งข้อมูลไปยัง API เพื่อสร้างบัญชีผู้ใช้
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }

      // สมัครสมาชิกสำเร็จ นำทางไปยังหน้าเข้าสู่ระบบ
      router.push('/auth/signin?success=Account created successfully');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
      console.error('เกิดข้อผิดพลาดในการสมัครสมาชิก:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">สมัครสมาชิก</h1>
          <p className="mt-2 text-text-secondary">
            สร้างบัญชีผู้ใช้เพื่อเริ่มการเรียนรู้ Next.js
          </p>
        </div>

        {/* แสดงข้อความผิดพลาด */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">ชื่อ</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-text-secondary/30 placeholder-text-secondary/50 text-text-primary focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                placeholder="ชื่อ"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">อีเมล</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-text-secondary/30 placeholder-text-secondary/50 text-text-primary focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                placeholder="อีเมล"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">รหัสผ่าน</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-text-secondary/30 placeholder-text-secondary/50 text-text-primary focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                placeholder="รหัสผ่าน"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">ยืนยันรหัสผ่าน</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-text-secondary/30 placeholder-text-secondary/50 text-text-primary focus:outline-none focus:ring-primary focus:border-primary focus:z-10"
                placeholder="ยืนยันรหัสผ่าน"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-text-secondary">
            มีบัญชีอยู่แล้ว?{' '}
            <Link href="/auth/signin" className="text-primary hover:text-primary/80">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
