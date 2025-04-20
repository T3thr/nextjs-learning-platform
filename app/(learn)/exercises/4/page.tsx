'use client'
import React from 'react';
import CodeEditor from '@/components/CodeEditor';
import Link from 'next/link';

// หน้าแสดงรายละเอียดแบบฝึกหัดสร้างฟอร์มด้วย Client Components
export default function FormHandlingExercisePage() {
  // ข้อมูลแบบฝึกหัด
  const exercise = {
    id: '4',
    title: 'สร้างฟอร์มด้วย Client Components',
    description: 'ฝึกการสร้างฟอร์มและจัดการสถานะด้วย Client Components',
    difficulty: 'intermediate',
    points: 25,
    lessonId: '3',
    lessonTitle: 'การจัดการข้อมูลใน Next.js',
    instructions: `# สร้างฟอร์มด้วย Client Components

ในแบบฝึกหัดนี้ คุณจะได้ฝึกการสร้างฟอร์มและจัดการสถานะด้วย Client Components ของ Next.js โดยใช้ความรู้ที่ได้เรียนมาจากบทเรียน "การจัดการข้อมูลใน Next.js"

## ขั้นตอน

1. สร้าง Client Component ที่มีฟอร์มสำหรับลงทะเบียนผู้ใช้
2. จัดการสถานะของฟอร์มด้วย useState
3. ตรวจสอบความถูกต้องของข้อมูล (Validation)
4. แสดงข้อความแจ้งเตือนเมื่อกรอกข้อมูลไม่ถูกต้อง
5. จำลองการส่งข้อมูลไปยังเซิร์ฟเวอร์และแสดงสถานะการส่งข้อมูล

## เกณฑ์การให้คะแนน

- สร้างฟอร์มที่มีฟิลด์ครบถ้วน (5 คะแนน)
- จัดการสถานะของฟอร์มด้วย useState ถูกต้อง (5 คะแนน)
- ตรวจสอบความถูกต้องของข้อมูลและแสดงข้อความแจ้งเตือน (5 คะแนน)
- จำลองการส่งข้อมูลและแสดงสถานะการส่งข้อมูล (5 คะแนน)
- ใช้ Tailwind CSS ในการจัดสไตล์ฟอร์มให้สวยงาม (5 คะแนน)`,
    starterCode: `'use client';

import { useState } from 'react';

export default function RegistrationForm() {
  // เขียนโค้ดของคุณที่นี่
}`,
    solutionCode: `'use client';

import { useState } from 'react';

export default function RegistrationForm() {
  // สถานะสำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // สถานะสำหรับเก็บข้อผิดพลาด
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // สถานะการส่งข้อมูล
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของฟิลด์
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // ล้างข้อผิดพลาดเมื่อผู้ใช้เริ่มพิมพ์
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  // ฟังก์ชันสำหรับตรวจสอบความถูกต้องของข้อมูล
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // ตรวจสอบชื่อ
    if (!formData.name.trim()) {
      newErrors.name = 'กรุณากรอกชื่อ';
      isValid = false;
    }
    
    // ตรวจสอบอีเมล
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'กรุณากรอกอีเมล';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
      isValid = false;
    }
    
    // ตรวจสอบรหัสผ่าน
    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
      isValid = false;
    }
    
    // ตรวจสอบการยืนยันรหัสผ่าน
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ตรวจสอบความถูกต้องของข้อมูล
    if (!validateForm()) {
      return;
    }
    
    // แสดงสถานะกำลังส่งข้อมูล
    setIsSubmitting(true);
    
    // จำลองการส่งข้อมูลไปยังเซิร์ฟเวอร์
    try {
      // จำลองการส่งข้อมูลด้วยการหน่วงเวลา
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // สมมติว่าส่งข้อมูลสำเร็จ
      setSubmitSuccess(true);
      
      // รีเซ็ตฟอร์ม
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      // จัดการข้อผิดพลาด
      console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">ลงทะเบียนผู้ใช้ใหม่</h2>
      
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
          <p className="font-medium">ลงทะเบียนสำเร็จ!</p>
          <p className="text-sm">ขอบคุณสำหรับการลงทะเบียน</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* ฟิลด์ชื่อ */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            ชื่อ
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="กรอกชื่อของคุณ"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
          )}
        </div>
        
        {/* ฟิลด์อีเมล */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            อีเมล
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>
        
        {/* ฟิลด์รหัสผ่าน */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            รหัสผ่าน
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="รหัสผ่านอย่างน้อย 8 ตัวอักษร"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
          )}
        </div>
        
        {/* ฟิลด์ยืนยันรหัสผ่าน */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            ยืนยันรหัสผ่าน
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="กรอกรหัสผ่านอีกครั้ง"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
          )}
        </div>
        
        {/* ปุ่มส่งฟอร์ม */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังส่งข้อมูล...
            </span>
          ) : (
            'ลงทะเบียน'
          )}
        </button>
      </form>
    </div>
  );
}`,
    testCases: `// ตรวจสอบว่ามีการใช้ useState
expect(code).toContain("useState");
// ตรวจสอบว่ามีการตรวจสอบความถูกต้องของข้อมูล
expect(code).toContain("validateForm");
// ตรวจสอบว่ามีการจัดการการส่งฟอร์ม
expect(code).toContain("handleSubmit");`,
  };

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของแบบฝึกหัด */}
      <div className="mb-8">
        <div className="flex items-center text-text-secondary mb-4">
          <Link href="/exercises" className="flex items-center hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            กลับไปยังรายการแบบฝึกหัด
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{exercise.title}</h1>
            <p className="text-text-secondary">{exercise.description}</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs mr-2">
              ระดับกลาง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
              </svg>
              {exercise.points} คะแนน
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* คำอธิบายแบบฝึกหัด */}
        <div className="lg:col-span-1">
          <div className="bg-surface p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">คำอธิบาย</h2>
            <div className="prose dark:prose-invert">
              <p>{exercise.description}</p>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">บทเรียนที่เกี่ยวข้อง</h3>
              <Link href={`/lessons/${exercise.lessonId}`} className="text-primary hover:underline">
                {exercise.lessonTitle}
              </Link>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">คำแนะนำ</h3>
              <div className="text-sm">
                {exercise.instructions.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.substring(2)}</h2>;
                  } else if (line.startsWith('## ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-3 mb-2">{line.substring(3)}</h3>;
                  } else if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4 list-disc">{line.substring(2)}</li>;
                  } else if (line.match(/^\d+\. /)) {
                    return <li key={index} className="ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
                  } else if (line.trim() === '') {
                    return <div key={index} className="h-2"></div>;
                  } else {
                    return <p key={index} className="mb-2">{line}</p>;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* โค้ดเอดิเตอร์ */}
        <div className="lg:col-span-2">
          <CodeEditor
            starterCode={exercise.starterCode}
            solutionCode={exercise.solutionCode}
            testCases={exercise.testCases}
            onSubmit={(code, isCorrect) => {
              if (isCorrect) {
                // ในโปรเจคจริงควรบันทึกความคืบหน้าลงฐานข้อมูล
                console.log('แบบฝึกหัดถูกต้อง!');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
