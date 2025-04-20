import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการจัดการฟอร์มใน Next.js
export default function FormHandlingExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# การจัดการฟอร์มใน Next.js

การจัดการฟอร์มเป็นส่วนสำคัญของแอปพลิเคชันเว็บ ใน Next.js เราสามารถจัดการฟอร์มได้หลายวิธี ในตัวอย่างนี้ เราจะแสดงวิธีการจัดการฟอร์มใน Next.js ด้วย React Hook Form และ Zod

## วิธีการจัดการฟอร์มใน Next.js

1. การจัดการฟอร์มแบบพื้นฐานด้วย useState
2. การจัดการฟอร์มด้วย React Hook Form
3. การตรวจสอบข้อมูลด้วย Zod
4. การส่งข้อมูลฟอร์มไปยัง API
5. การจัดการข้อผิดพลาดและการแสดงผลลัพธ์`;

  // เนื้อหาเกี่ยวกับการจัดการฟอร์มแบบพื้นฐานด้วย useState
  const basicFormContent = `## การจัดการฟอร์มแบบพื้นฐานด้วย useState

เราสามารถจัดการฟอร์มแบบพื้นฐานได้ด้วย useState hook:`;

  // โค้ดตัวอย่างสำหรับการจัดการฟอร์มแบบพื้นฐานด้วย useState
  const basicFormCode = `// components/BasicForm.tsx
"use client"

import { useState, FormEvent } from 'react';

// กำหนด type สำหรับข้อมูลฟอร์ม
interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function BasicForm() {
  // สร้าง state สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  
  // สร้าง state สำหรับเก็บสถานะการส่งฟอร์ม
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // สร้าง state สำหรับเก็บข้อความแสดงผลลัพธ์
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // ฟังก์ชันสำหรับการเปลี่ยนแปลงค่าในฟอร์ม
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // อัปเดต state ด้วยค่าใหม่
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // ฟังก์ชันสำหรับการส่งฟอร์ม
  const handleSubmit = async (e: FormEvent) => {
    // ป้องกันการรีเฟรชหน้าเว็บ
    e.preventDefault();
    
    // ตั้งค่าสถานะการส่งฟอร์ม
    setIsSubmitting(true);
    setResult(null);
    
    try {
      // ส่งข้อมูลไปยัง API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // แปลงข้อมูลการตอบกลับเป็น JSON
      const data = await response.json();
      
      // ตรวจสอบสถานะการตอบกลับ
      if (response.ok) {
        // ถ้าสำเร็จ ให้แสดงข้อความสำเร็จและรีเซ็ตฟอร์ม
        setResult({
          success: true,
          message: 'ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด',
        });
        
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        // ถ้าไม่สำเร็จ ให้แสดงข้อความผิดพลาด
        setResult({
          success: false,
          message: data.error || 'เกิดข้อผิดพลาดในการส่งข้อความ',
        });
      }
    } catch (error) {
      // ถ้าเกิดข้อผิดพลาด ให้แสดงข้อความผิดพลาด
      setResult({
        success: false,
        message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
      });
      
      console.error('Error submitting form:', error);
    } finally {
      // ตั้งค่าสถานะการส่งฟอร์มเป็น false
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">ติดต่อเรา</h2>
      
      {/* แสดงผลลัพธ์ */}
      {result && (
        <div
          className={\`p-4 mb-4 rounded-lg \${
            result.success
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
          }\`}
        >
          {result.message}
        </div>
      )}
      
      {/* ฟอร์ม */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            ชื่อ <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="input w-full"
            placeholder="กรุณากรอกชื่อของคุณ"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1">
            อีเมล <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input w-full"
            placeholder="example@email.com"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block mb-1">
            ข้อความ <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="input w-full h-32"
            placeholder="กรุณากรอกข้อความของคุณ"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อความ'}
        </button>
      </form>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการจัดการฟอร์มด้วย React Hook Form
  const reactHookFormContent = `## การจัดการฟอร์มด้วย React Hook Form

React Hook Form เป็นไลบรารีที่ช่วยให้การจัดการฟอร์มง่ายขึ้น มีประสิทธิภาพสูง และลดการ re-render

ติดตั้ง React Hook Form:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง React Hook Form
  const reactHookFormInstallCode = `npm install react-hook-form
# หรือ
bun add react-hook-form`;

  // โค้ดตัวอย่างสำหรับการใช้ React Hook Form
  const reactHookFormUsageCode = `// components/HookForm.tsx
"use client"

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

// กำหนด type สำหรับข้อมูลฟอร์ม
interface FormInputs {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  agreeToTerms: boolean;
}

export default function HookForm() {
  // สร้าง state สำหรับเก็บข้อความแสดงผลลัพธ์
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // ใช้ useForm hook จาก React Hook Form
  const {
    register,        // ฟังก์ชันสำหรับลงทะเบียน input
    handleSubmit,    // ฟังก์ชันสำหรับการส่งฟอร์ม
    formState: { errors, isSubmitting }, // สถานะของฟอร์ม
    reset,           // ฟังก์ชันสำหรับรีเซ็ตฟอร์ม
    watch,           // ฟังก์ชันสำหรับดูค่าปัจจุบันของฟอร์ม
  } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      agreeToTerms: false,
    },
  });
  
  // ฟังก์ชันสำหรับการส่งฟอร์ม
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setResult(null);
    
    try {
      // ส่งข้อมูลไปยัง API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      // แปลงข้อมูลการตอบกลับเป็น JSON
      const responseData = await response.json();
      
      // ตรวจสอบสถานะการตอบกลับ
      if (response.ok) {
        // ถ้าสำเร็จ ให้แสดงข้อความสำเร็จและรีเซ็ตฟอร์ม
        setResult({
          success: true,
          message: 'ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด',
        });
        
        reset();
      } else {
        // ถ้าไม่สำเร็จ ให้แสดงข้อความผิดพลาด
        setResult({
          success: false,
          message: responseData.error || 'เกิดข้อผิดพลาดในการส่งข้อความ',
        });
      }
    } catch (error) {
      // ถ้าเกิดข้อผิดพลาด ให้แสดงข้อความผิดพลาด
      setResult({
        success: false,
        message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
      });
      
      console.error('Error submitting form:', error);
    }
  };
  
  // ดูค่าปัจจุบันของ agreeToTerms
  const agreeToTerms = watch('agreeToTerms');
  
  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">ติดต่อเรา (React Hook Form)</h2>
      
      {/* แสดงผลลัพธ์ */}
      {result && (
        <div
          className={\`p-4 mb-4 rounded-lg \${
            result.success
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
          }\`}
        >
          {result.message}
        </div>
      )}
      
      {/* ฟอร์ม */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            ชื่อ <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            className={\`input w-full \${errors.name ? 'border-red-500' : ''}\`}
            placeholder="กรุณากรอกชื่อของคุณ"
            {...register('name', {
              required: 'กรุณากรอกชื่อ',
              minLength: {
                value: 2,
                message: 'ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร',
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1">
            อีเมล <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            className={\`input w-full \${errors.email ? 'border-red-500' : ''}\`}
            placeholder="example@email.com"
            {...register('email', {
              required: 'กรุณากรอกอีเมล',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'อีเมลไม่ถูกต้อง',
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block mb-1">
            เบอร์โทรศัพท์ <span className="text-text-secondary">(ไม่บังคับ)</span>
          </label>
          <input
            id="phone"
            className={\`input w-full \${errors.phone ? 'border-red-500' : ''}\`}
            placeholder="0812345678"
            {...register('phone', {
              pattern: {
                value: /^[0-9]{9,10}$/,
                message: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="subject" className="block mb-1">
            หัวข้อ <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            className={\`input w-full \${errors.subject ? 'border-red-500' : ''}\`}
            placeholder="กรุณากรอกหัวข้อ"
            {...register('subject', {
              required: 'กรุณากรอกหัวข้อ',
            })}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="message" className="block mb-1">
            ข้อความ <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            className={\`input w-full h-32 \${errors.message ? 'border-red-500' : ''}\`}
            placeholder="กรุณากรอกข้อความของคุณ"
            {...register('message', {
              required: 'กรุณากรอกข้อความ',
              minLength: {
                value: 10,
                message: 'ข้อความต้องมีความยาวอย่างน้อย 10 ตัวอักษร',
              },
            })}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        
        <div className="flex items-start">
          <input
            id="agreeToTerms"
            type="checkbox"
            className={\`mr-2 mt-1 \${errors.agreeToTerms ? 'border-red-500' : ''}\`}
            {...register('agreeToTerms', {
              required: 'กรุณายอมรับข้อกำหนดและเงื่อนไข',
            })}
          />
          <label htmlFor="agreeToTerms" className="text-sm">
            ฉันยอมรับ <a href="/terms" className="text-primary hover:underline">ข้อกำหนดและเงื่อนไข</a> <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting || !agreeToTerms}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อความ'}
        </button>
      </form>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการตรวจสอบข้อมูลด้วย Zod
  const zodContent = `## การตรวจสอบข้อมูลด้วย Zod

Zod เป็นไลบรารีสำหรับการตรวจสอบข้อมูล (validation) ที่มีประสิทธิภาพและใช้งานง่าย เราสามารถใช้ Zod ร่วมกับ React Hook Form ได้

ติดตั้ง Zod:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง Zod
  const zodInstallCode = `npm install zod @hookform/resolvers
# หรือ
bun add zod @hookform/resolvers`;

  // โค้ดตัวอย่างสำหรับการใช้ Zod
  const zodUsageCode = `// components/ZodForm.tsx
"use client"

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

// สร้าง schema สำหรับตรวจสอบข้อมูลด้วย Zod
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร' })
    .max(50, { message: 'ชื่อต้องมีความยาวไม่เกิน 50 ตัวอักษร' }),
  email: z
    .string()
    .email({ message: 'อีเมลไม่ถูกต้อง' }),
  phone: z
    .string()
    .regex(/^[0-9]{9,10}$/, { message: 'เบอร์โทรศัพท์ไม่ถูกต้อง' })
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .min(1, { message: 'กรุณากรอกหัวข้อ' })
    .max(100, { message: 'หัวข้อต้องมีความยาวไม่เกิน 100 ตัวอักษร' }),
  message: z
    .string()
    .min(10, { message: 'ข้อความต้องมีความยาวอย่างน้อย 10 ตัวอักษร' })
    .max(1000, { message: 'ข้อความต้องมีความยาวไม่เกิน 1000 ตัวอักษร' }),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, { message: 'กรุณายอมรับข้อกำหนดและเงื่อนไข' }),
});

// กำหนด type สำหรับข้อมูลฟอร์มจาก Zod schema
type FormInputs = z.infer<typeof formSchema>;

export default function ZodForm() {
  // สร้าง state สำหรับเก็บข้อความแสดงผลลัพธ์
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // ใช้ useForm hook จาก React Hook Form พร้อมกับ zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema), // ใช้ zodResolver เพื่อตรวจสอบข้อมูลด้วย Zod
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      agreeToTerms: false,
    },
  });
  
  // ฟังก์ชันสำหรับการส่งฟอร์ม
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setResult(null);
    
    try {
      // ส่งข้อมูลไปยัง API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      // แปลงข้อมูลการตอบกลับเป็น JSON
      const responseData = await response.json();
      
      // ตรวจสอบสถานะการตอบกลับ
      if (response.ok) {
        // ถ้าสำเร็จ ให้แสดงข้อความสำเร็จและรีเซ็ตฟอร์ม
        setResult({
          success: true,
          message: 'ส่งข้อความสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด',
        });
        
        reset();
      } else {
        // ถ้าไม่สำเร็จ ให้แสดงข้อความผิดพลาด
        setResult({
          success: false,
          message: responseData.error || 'เกิดข้อผิดพลาดในการส่งข้อความ',
        });
      }
    } catch (error) {
      // ถ้าเกิดข้อผิดพลาด ให้แสดงข้อความผิดพลาด
      setResult({
        success: false,
        message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
      });
      
      console.error('Error submitting form:', error);
    }
  };
  
  // ดูค่าปัจจุบันของ agreeToTerms
  const agreeToTerms = watch('agreeToTerms');
  
  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">ติดต่อเรา (Zod Validation)</h2>
      
      {/* แสดงผลลัพธ์ */}
      {result && (
        <div
          className={\`p-4 mb-4 rounded-lg \${
            result.success
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
          }\`}
        >
          {result.message}
        </div>
      )}
      
      {/* ฟอร์ม */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            ชื่อ <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            className={\`input w-full \${errors.name ? 'border-red-500' : ''}\`}
            placeholder="กรุณากรอกชื่อของคุณ"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1">
            อีเมล <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            className={\`input w-full \${errors.email ? 'border-red-500' : ''}\`}
            placeholder="example@email.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block mb-1">
            เบอร์โทรศัพท์ <span className="text-text-secondary">(ไม่บังคับ)</span>
          </label>
          <input
            id="phone"
            className={\`input w-full \${errors.phone ? 'border-red-500' : ''}\`}
            placeholder="0812345678"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="subject" className="block mb-1">
            หัวข้อ <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            className={\`input w-full \${errors.subject ? 'border-red-500' : ''}\`}
            placeholder="กรุณากรอกหัวข้อ"
            {...register('subject')}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="message" className="block mb-1">
            ข้อความ <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            className={\`input w-full h-32 \${errors.message ? 'border-red-500' : ''}\`}
            placeholder="กรุณากรอกข้อความของคุณ"
            {...register('message')}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>
        
        <div className="flex items-start">
          <input
            id="agreeToTerms"
            type="checkbox"
            className={\`mr-2 mt-1 \${errors.agreeToTerms ? 'border-red-500' : ''}\`}
            {...register('agreeToTerms')}
          />
          <label htmlFor="agreeToTerms" className="text-sm">
            ฉันยอมรับ <a href="/terms" className="text-primary hover:underline">ข้อกำหนดและเงื่อนไข</a> <span className="text-red-500">*</span>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting || !agreeToTerms}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อความ'}
        </button>
      </form>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการส่งข้อมูลฟอร์มไปยัง API
  const apiRouteContent = `## การส่งข้อมูลฟอร์มไปยัง API

เราสามารถสร้าง API Route ใน Next.js เพื่อรับข้อมูลฟอร์มและดำเนินการต่อ เช่น บันทึกลงฐานข้อมูล หรือส่งอีเมล:`;

  // โค้ดตัวอย่างสำหรับการสร้าง API Route
  const apiRouteCode = `// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { contacts } from '@/db/schema';
import { sendEmail } from '@/lib/email';

// สร้าง schema สำหรับตรวจสอบข้อมูลด้วย Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร' })
    .max(50, { message: 'ชื่อต้องมีความยาวไม่เกิน 50 ตัวอักษร' }),
  email: z
    .string()
    .email({ message: 'อีเมลไม่ถูกต้อง' }),
  phone: z
    .string()
    .regex(/^[0-9]{9,10}$/, { message: 'เบอร์โทรศัพท์ไม่ถูกต้อง' })
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .min(1, { message: 'กรุณากรอกหัวข้อ' })
    .max(100, { message: 'หัวข้อต้องมีความยาวไม่เกิน 100 ตัวอักษร' }),
  message: z
    .string()
    .min(10, { message: 'ข้อความต้องมีความยาวอย่างน้อย 10 ตัวอักษร' })
    .max(1000, { message: 'ข้อความต้องมีความยาวไม่เกิน 1000 ตัวอักษร' }),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, { message: 'กรุณายอมรับข้อกำหนดและเงื่อนไข' }),
});

// POST /api/contact
export async function POST(request: Request) {
  try {
    // รับข้อมูลจาก request
    const body = await request.json();
    
    // ตรวจสอบข้อมูลด้วย Zod
    const result = contactSchema.safeParse(body);
    
    // ถ้าข้อมูลไม่ถูกต้อง
    if (!result.success) {
      // ส่งข้อความผิดพลาดกลับไป
      return NextResponse.json(
        {
          error: 'ข้อมูลไม่ถูกต้อง',
          issues: result.error.issues,
        },
        { status: 400 }
      );
    }
    
    // ถ้าข้อมูลถูกต้อง
    const { name, email, phone, subject, message } = result.data;
    
    // บันทึกข้อมูลลงฐานข้อมูล
    const contact = await db.insert(contacts).values({
      name,
      email,
      phone: phone || null,
      subject,
      message,
      createdAt: new Date(),
    }).returning();
    
    // ส่งอีเมลแจ้งเตือน
    await sendEmail({
      to: 'admin@example.com',
      subject: \`[ติดต่อ] \${subject}\`,
      html: \`
        <h1>มีข้อความติดต่อใหม่</h1>
        <p><strong>ชื่อ:</strong> \${name}</p>
        <p><strong>อีเมล:</strong> \${email}</p>
        <p><strong>เบอร์โทรศัพท์:</strong> \${phone || '-'}</p>
        <p><strong>หัวข้อ:</strong> \${subject}</p>
        <p><strong>ข้อความ:</strong></p>
        <p>\${message}</p>
      \`,
    });
    
    // ส่งอีเมลตอบกลับอัตโนมัติ
    await sendEmail({
      to: email,
      subject: \`[ตอบกลับอัตโนมัติ] ได้รับข้อความของคุณแล้ว\`,
      html: \`
        <h1>ขอบคุณสำหรับข้อความของคุณ</h1>
        <p>เรียน \${name},</p>
        <p>ขอบคุณสำหรับข้อความของคุณ เราได้รับข้อความของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด</p>
        <p>ด้วยความเคารพ,<br>ทีมงานของเรา</p>
      \`,
    });
    
    // ส่งข้อมูลกลับไป
    return NextResponse.json({
      success: true,
      message: 'ส่งข้อความสำเร็จ',
      contact: contact[0],
    });
  } catch (error) {
    // ถ้าเกิดข้อผิดพลาด
    console.error('Error processing contact form:', error);
    
    // ส่งข้อความผิดพลาดกลับไป
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการประมวลผลข้อมูล' },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาเกี่ยวกับการสร้างฟอร์มที่ซับซ้อน
  const complexFormContent = `## การสร้างฟอร์มที่ซับซ้อน

ในบางกรณี เราอาจต้องการสร้างฟอร์มที่ซับซ้อน เช่น ฟอร์มที่มีหลายขั้นตอน (multi-step form) หรือฟอร์มที่มีฟิลด์แบบไดนามิก:`;

  // โค้ดตัวอย่างสำหรับการสร้างฟอร์มที่ซับซ้อน
  const complexFormCode = `// components/MultiStepForm.tsx
"use client"

import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

// สร้าง schema สำหรับตรวจสอบข้อมูลด้วย Zod
const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: 'ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร' }),
  lastName: z.string().min(2, { message: 'นามสกุลต้องมีความยาวอย่างน้อย 2 ตัวอักษร' }),
  email: z.string().email({ message: 'อีเมลไม่ถูกต้อง' }),
  phone: z.string().regex(/^[0-9]{9,10}$/, { message: 'เบอร์โทรศัพท์ไม่ถูกต้อง' }),
});

const addressSchema = z.object({
  street: z.string().min(1, { message: 'กรุณากรอกที่อยู่' }),
  city: z.string().min(1, { message: 'กรุณากรอกเมือง' }),
  state: z.string().min(1, { message: 'กรุณากรอกจังหวัด' }),
  zipCode: z.string().regex(/^[0-9]{5}$/, { message: 'รหัสไปรษณีย์ไม่ถูกต้อง' }),
});

const educationSchema = z.object({
  institution: z.string().min(1, { message: 'กรุณากรอกชื่อสถาบัน' }),
  degree: z.string().min(1, { message: 'กรุณากรอกวุฒิการศึกษา' }),
  fieldOfStudy: z.string().min(1, { message: 'กรุณากรอกสาขาวิชา' }),
  graduationYear: z.string().regex(/^[0-9]{4}$/, { message: 'ปีที่จบการศึกษาไม่ถูกต้อง' }),
});

const experienceSchema = z.object({
  company: z.string().min(1, { message: 'กรุณากรอกชื่อบริษัท' }),
  position: z.string().min(1, { message: 'กรุณากรอกตำแหน่ง' }),
  startDate: z.string().min(1, { message: 'กรุณากรอกวันที่เริ่มงาน' }),
  endDate: z.string().optional(),
  currentlyWorking: z.boolean().optional(),
  description: z.string().min(1, { message: 'กรุณากรอกรายละเอียดงาน' }),
});

const skillSchema = z.object({
  name: z.string().min(1, { message: 'กรุณากรอกชื่อทักษะ' }),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert'], {
    errorMap: () => ({ message: 'กรุณาเลือกระดับทักษะ' }),
  }),
});

const formSchema = z.object({
  personalInfo: personalInfoSchema,
  address: addressSchema,
  educations: z.array(educationSchema).min(1, { message: 'กรุณากรอกข้อมูลการศึกษาอย่างน้อย 1 รายการ' }),
  experiences: z.array(experienceSchema).min(1, { message: 'กรุณากรอกข้อมูลประสบการณ์ทำงานอย่างน้อย 1 รายการ' }),
  skills: z.array(skillSchema).min(1, { message: 'กรุณากรอกข้อมูลทักษะอย่างน้อย 1 รายการ' }),
  agreeToTerms: z.boolean().refine((val) => val === true, { message: 'กรุณายอมรับข้อกำหนดและเงื่อนไข' }),
});

// กำหนด type สำหรับข้อมูลฟอร์มจาก Zod schema
type FormInputs = z.infer<typeof formSchema>;

export default function MultiStepForm() {
  // สร้าง state สำหรับเก็บขั้นตอนปัจจุบัน
  const [step, setStep] = useState(1);
  
  // สร้าง state สำหรับเก็บข้อความแสดงผลลัพธ์
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // ใช้ useForm hook จาก React Hook Form พร้อมกับ zodResolver
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      educations: [
        {
          institution: '',
          degree: '',
          fieldOfStudy: '',
          graduationYear: '',
        },
      ],
      experiences: [
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          currentlyWorking: false,
          description: '',
        },
      ],
      skills: [
        {
          name: '',
          level: 'beginner',
        },
      ],
      agreeToTerms: false,
    },
  });
  
  // ใช้ useFieldArray hook สำหรับฟิลด์แบบอาร์เรย์
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'educations',
  });
  
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: 'experiences',
  });
  
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: 'skills',
  });
  
  // ฟังก์ชันสำหรับการไปยังขั้นตอนถัดไป
  const nextStep = async () => {
    let isValid = false;
    
    // ตรวจสอบข้อมูลตามขั้นตอนปัจจุบัน
    switch (step) {
      case 1:
        isValid = await trigger(['personalInfo', 'address']);
        break;
      case 2:
        isValid = await trigger('educations');
        break;
      case 3:
        isValid = await trigger('experiences');
        break;
      case 4:
        isValid = await trigger('skills');
        break;
      default:
        break;
    }
    
    // ถ้าข้อมูลถูกต้อง ให้ไปยังขั้นตอนถัดไป
    if (isValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };
  
  // ฟังก์ชันสำหรับการกลับไปยังขั้นตอนก่อนหน้า
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  
  // ฟังก์ชันสำหรับการส่งฟอร์ม
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setResult(null);
    
    try {
      // ส่งข้อมูลไปยัง API
      const response = await fetch('/api/job-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      // แปลงข้อมูลการตอบกลับเป็น JSON
      const responseData = await response.json();
      
      // ตรวจสอบสถานะการตอบกลับ
      if (response.ok) {
        // ถ้าสำเร็จ ให้แสดงข้อความสำเร็จ
        setResult({
          success: true,
          message: 'ส่งใบสมัครสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด',
        });
      } else {
        // ถ้าไม่สำเร็จ ให้แสดงข้อความผิดพลาด
        setResult({
          success: false,
          message: responseData.error || 'เกิดข้อผิดพลาดในการส่งใบสมัคร',
        });
      }
    } catch (error) {
      // ถ้าเกิดข้อผิดพลาด ให้แสดงข้อความผิดพลาด
      setResult({
        success: false,
        message: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์',
      });
      
      console.error('Error submitting form:', error);
    }
  };
  
  // ดูค่าปัจจุบันของ agreeToTerms
  const agreeToTerms = watch('agreeToTerms');
  
  // ดูค่าปัจจุบันของ currentlyWorking
  const experiences = watch('experiences');
  
  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">ใบสมัครงาน</h2>
      
      {/* แสดงผลลัพธ์ */}
      {result && (
        <div
          className={\`p-4 mb-4 rounded-lg \${
            result.success
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
          }\`}
        >
          {result.message}
        </div>
      )}
      
      {/* แสดงขั้นตอน */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div
              key={stepNumber}
              className={\`flex flex-col items-center \${
                stepNumber < step
                  ? 'text-primary'
                  : stepNumber === step
                  ? 'text-primary font-bold'
                  : 'text-text-secondary'
              }\`}
            >
              <div
                className={\`w-8 h-8 rounded-full flex items-center justify-center mb-1 \${
                  stepNumber < step
                    ? 'bg-primary text-white'
                    : stepNumber === step
                    ? 'border-2 border-primary'
                    : 'border-2 border-gray-300'
                }\`}
              >
                {stepNumber < step ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span className="text-xs">
                {stepNumber === 1
                  ? 'ข้อมูลส่วนตัว'
                  : stepNumber === 2
                  ? 'การศึกษา'
                  : stepNumber === 3
                  ? 'ประสบการณ์'
                  : stepNumber === 4
                  ? 'ทักษะ'
                  : 'ยืนยัน'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-primary transition-all"
            style={{ width: \`\${((step - 1) / 4) * 100}%\` }}
          ></div>
        </div>
      </div>
      
      {/* ฟอร์ม */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ขั้นตอนที่ 1: ข้อมูลส่วนตัว */}
        {step === 1 && (
          <>
            <h3 className="text-lg font-bold mb-2">ข้อมูลส่วนตัว</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-1">
                  ชื่อ <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  className={\`input w-full \${
                    errors.personalInfo?.firstName ? 'border-red-500' : ''
                  }\`}
                  placeholder="กรุณากรอกชื่อ"
                  {...register('personalInfo.firstName')}
                />
                {errors.personalInfo?.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personalInfo.firstName.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block mb-1">
                  นามสกุล <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  className={\`input w-full \${
                    errors.personalInfo?.lastName ? 'border-red-500' : ''
                  }\`}
                  placeholder="กรุณากรอกนามสกุล"
                  {...register('personalInfo.lastName')}
                />
                {errors.personalInfo?.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personalInfo.lastName.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block mb-1">
                  อีเมล <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  className={\`input w-full \${
                    errors.personalInfo?.email ? 'border-red-500' : ''
                  }\`}
                  placeholder="example@email.com"
                  {...register('personalInfo.email')}
                />
                {errors.personalInfo?.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personalInfo.email.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block mb-1">
                  เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  className={\`input w-full \${
                    errors.personalInfo?.phone ? 'border-red-500' : ''
                  }\`}
                  placeholder="0812345678"
                  {...register('personalInfo.phone')}
                />
                {errors.personalInfo?.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.personalInfo.phone.message}
                  </p>
                )}
              </div>
            </div>
            
            <h3 className="text-lg font-bold mb-2 mt-6">ที่อยู่</h3>
            
            <div>
              <label htmlFor="street" className="block mb-1">
                ที่อยู่ <span className="text-red-500">*</span>
              </label>
              <input
                id="street"
                className={\`input w-full \${
                  errors.address?.street ? 'border-red-500' : ''
                }\`}
                placeholder="กรุณากรอกที่อยู่"
                {...register('address.street')}
              />
              {errors.address?.street && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.street.message}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block mb-1">
                  เมือง/อำเภอ <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  className={\`input w-full \${
                    errors.address?.city ? 'border-red-500' : ''
                  }\`}
                  placeholder="กรุณากรอกเมือง/อำเภอ"
                  {...register('address.city')}
                />
                {errors.address?.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.city.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="state" className="block mb-1">
                  จังหวัด <span className="text-red-500">*</span>
                </label>
                <input
                  id="state"
                  className={\`input w-full \${
                    errors.address?.state ? 'border-red-500' : ''
                  }\`}
                  placeholder="กรุณากรอกจังหวัด"
                  {...register('address.state')}
                />
                {errors.address?.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.state.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block mb-1">
                  รหัสไปรษณีย์ <span className="text-red-500">*</span>
                </label>
                <input
                  id="zipCode"
                  className={\`input w-full \${
                    errors.address?.zipCode ? 'border-red-500' : ''
                  }\`}
                  placeholder="12345"
                  {...register('address.zipCode')}
                />
                {errors.address?.zipCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.zipCode.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
        
        {/* ขั้นตอนที่ 2: การศึกษา */}
        {step === 2 && (
          <>
            <h3 className="text-lg font-bold mb-2">การศึกษา</h3>
            
            {educationFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">การศึกษา #{index + 1}</h4>
                  {educationFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={\`institution-\${index}\`} className="block mb-1">
                      สถาบัน <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={\`institution-\${index}\`}
                      className={\`input w-full \${
                        errors.educations?.[index]?.institution ? 'border-red-500' : ''
                      }\`}
                      placeholder="กรุณากรอกชื่อสถาบัน"
                      {...register(\`educations.\${index}.institution\`)}
                    />
                    {errors.educations?.[index]?.institution && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.educations[index]?.institution?.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor={\`degree-\${index}\`} className="block mb-1">
                      วุฒิการศึกษา <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={\`degree-\${index}\`}
                      className={\`input w-full \${
                        errors.educations?.[index]?.degree ? 'border-red-500' : ''
                      }\`}
                      placeholder="กรุณากรอกวุฒิการศึกษา"
                      {...register(\`educations.\${index}.degree\`)}
                    />
                    {errors.educations?.[index]?.degree && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.educations[index]?.degree?.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor={\`fieldOfStudy-\${index}\`} className="block mb-1">
                      สาขาวิชา <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={\`fieldOfStudy-\${index}\`}
                      className={\`input w-full \${
                        errors.educations?.[index]?.fieldOfStudy ? 'border-red-500' : ''
                      }\`}
                      placeholder="กรุณากรอกสาขาวิชา"
                      {...register(\`educations.\${index}.fieldOfStudy\`)}
                    />
                    {errors.educations?.[index]?.fieldOfStudy && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.educations[index]?.fieldOfStudy?.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor={\`graduationYear-\${index}\`} className="block mb-1">
                      ปีที่จบการศึกษา <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={\`graduationYear-\${index}\`}
                      className={\`input w-full \${
                        errors.educations?.[index]?.graduationYear ? 'border-red-500' : ''
                      }\`}
                      placeholder="2565"
                      {...register(\`educations.\${index}.graduationYear\`)}
                    />
                    {errors.educations?.[index]?.graduationYear && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.educations[index]?.graduationYear?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() =>
                appendEducation({
                  institution: '',
                  degree: '',
                  fieldOfStudy: '',
                  graduationYear: '',
                })
              }
              className="btn btn-outline w-full"
            >
              + เพิ่มการศึกษา
            </button>
            
            {errors.educations && !Array.isArray(errors.educations) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.educations.message}
              </p>
            )}
          </>
        )}
        
        {/* ขั้นตอนที่ 3: ประสบการณ์ */}
        {step === 3 && (
          <>
            <h3 className="text-lg font-bold mb-2">ประสบการณ์ทำงาน</h3>
            
            {experienceFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">ประสบการณ์ #{index + 1}</h4>
                  {experienceFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={\`company-\${index}\`} className="block mb-1">
                      บริษัท <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={\`company-\${index}\`}
                      className={\`input w-full \${
                        errors.experiences?.[index]?.company ? 'border-red-500' : ''
                      }\`}
                      placeholder="กรุณากรอกชื่อบริษัท"
                      {...register(\`experiences.\${index}.company\`)}
                    />
                    {errors.experiences?.[index]?.company && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.experiences[index]?.company?.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor={\`position-\${index}\`} className="block mb-1">
                      ตำแหน่ง <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={\`position-\${index}\`}
                      className={\`input w-full \${
                        errors.experiences?.[index]?.position ? 'border-red-500' : ''
                      }\`}
                      placeholder="กรุณากรอกตำแหน่ง"
                      {...register(\`experiences.\${index}.position\`)}
                    />
                    {errors.experiences?.[index]?.position && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.experiences[index]?.position?.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor={\`startDate-\${index}\`} className="block mb-1">
                      วันที่เริ่มงาน <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={\`startDate-\${index}\`}
                      type="date"
                      className={\`input w-full \${
                        errors.experiences?.[index]?.startDate ? 'border-red-500' : ''
                      }\`}
                      {...register(\`experiences.\${index}.startDate\`)}
                    />
                    {errors.experiences?.[index]?.startDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.experiences[index]?.startDate?.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-1">
                      <label htmlFor={\`endDate-\${index}\`} className="block">
                        วันที่สิ้นสุด
                      </label>
                      <div className="ml-auto flex items-center">
                        <input
                          id={\`currentlyWorking-\${index}\`}
                          type="checkbox"
                          className="mr-2"
                          {...register(\`experiences.\${index}.currentlyWorking\`)}
                        />
                        <label htmlFor={\`currentlyWorking-\${index}\`} className="text-sm">
                          ทำงานอยู่ปัจจุบัน
                        </label>
                      </div>
                    </div>
                    <input
                      id={\`endDate-\${index}\`}
                      type="date"
                      className={\`input w-full \${
                        errors.experiences?.[index]?.endDate ? 'border-red-500' : ''
                      }\`}
                      disabled={experiences[index]?.currentlyWorking}
                      {...register(\`experiences.\${index}.endDate\`)}
                    />
                    {errors.experiences?.[index]?.endDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.experiences[index]?.endDate?.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor={\`description-\${index}\`} className="block mb-1">
                    รายละเอียดงาน <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id={\`description-\${index}\`}
                    className={\`input w-full h-24 \${
                      errors.experiences?.[index]?.description ? 'border-red-500' : ''
                    }\`}
                    placeholder="กรุณากรอกรายละเอียดงาน"
                    {...register(\`experiences.\${index}.description\`)}
                  />
                  {errors.experiences?.[index]?.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.experiences[index]?.description?.message}
                    </p>
                  )}
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() =>
                appendExperience({
                  company: '',
                  position: '',
                  startDate: '',
                  endDate: '',
                  currentlyWorking: false,
                  description: '',
                })
              }
              className="btn btn-outline w-full"
            >
              + เพิ่มประสบการณ์
            </button>
            
            {errors.experiences && !Array.isArray(errors.experiences) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experiences.message}
              </p>
            )}
          </>
        )}
        
        {/* ขั้นตอนที่ 4: ทักษะ */}
        {step === 4 && (
          <>
            <h3 className="text-lg font-bold mb-2">ทักษะ</h3>
            
            {skillFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">ทักษะ #{index + 1}</h4>
                  {skillFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={\`skillName-\${index}\`} className="block mb-1">
                      ชื่อทักษะ <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={\`skillName-\${index}\`}
                      className={\`input w-full \${
                        errors.skills?.[index]?.name ? 'border-red-500' : ''
                      }\`}
                      placeholder="กรุณากรอกชื่อทักษะ"
                      {...register(\`skills.\${index}.name\`)}
                    />
                    {errors.skills?.[index]?.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.skills[index]?.name?.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor={\`skillLevel-\${index}\`} className="block mb-1">
                      ระดับทักษะ <span className="text-red-500">*</span>
                    </label>
                    <select
                      id={\`skillLevel-\${index}\`}
                      className={\`input w-full \${
                        errors.skills?.[index]?.level ? 'border-red-500' : ''
                      }\`}
                      {...register(\`skills.\${index}.level\`)}
                    >
                      <option value="beginner">เริ่มต้น</option>
                      <option value="intermediate">ปานกลาง</option>
                      <option value="advanced">ขั้นสูง</option>
                      <option value="expert">เชี่ยวชาญ</option>
                    </select>
                    {errors.skills?.[index]?.level && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.skills[index]?.level?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() =>
                appendSkill({
                  name: '',
                  level: 'beginner',
                })
              }
              className="btn btn-outline w-full"
            >
              + เพิ่มทักษะ
            </button>
            
            {errors.skills && !Array.isArray(errors.skills) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.skills.message}
              </p>
            )}
          </>
        )}
        
        {/* ขั้นตอนที่ 5: ยืนยัน */}
        {step === 5 && (
          <>
            <h3 className="text-lg font-bold mb-2">ยืนยันข้อมูล</h3>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <h4 className="font-bold mb-2">ข้อมูลส่วนตัว</h4>
              <p>
                <strong>ชื่อ-นามสกุล:</strong> {watch('personalInfo.firstName')} {watch('personalInfo.lastName')}
              </p>
              <p>
                <strong>อีเมล:</strong> {watch('personalInfo.email')}
              </p>
              <p>
                <strong>เบอร์โทรศัพท์:</strong> {watch('personalInfo.phone')}
              </p>
              <p>
                <strong>ที่อยู่:</strong> {watch('address.street')}, {watch('address.city')}, {watch('address.state')} {watch('address.zipCode')}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <h4 className="font-bold mb-2">การศึกษา</h4>
              {watch('educations').map((education, index) => (
                <div key={index} className="mb-2 pb-2 border-b last:border-b-0">
                  <p>
                    <strong>{education.degree}</strong> สาขา {education.fieldOfStudy}
                  </p>
                  <p>
                    {education.institution}, จบการศึกษาปี {education.graduationYear}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <h4 className="font-bold mb-2">ประสบการณ์ทำงาน</h4>
              {watch('experiences').map((experience, index) => (
                <div key={index} className="mb-2 pb-2 border-b last:border-b-0">
                  <p>
                    <strong>{experience.position}</strong> ที่ {experience.company}
                  </p>
                  <p>
                    {new Date(experience.startDate).toLocaleDateString('th-TH')} - {experience.currentlyWorking ? 'ปัจจุบัน' : experience.endDate ? new Date(experience.endDate).toLocaleDateString('th-TH') : ''}
                  </p>
                  <p className="text-sm text-text-secondary">{experience.description}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <h4 className="font-bold mb-2">ทักษะ</h4>
              <div className="flex flex-wrap gap-2">
                {watch('skills').map((skill, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                  >
                    {skill.name} - {skill.level === 'beginner' ? 'เริ่มต้น' : skill.level === 'intermediate' ? 'ปานกลาง' : skill.level === 'advanced' ? 'ขั้นสูง' : 'เชี่ยวชาญ'}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-start mb-4">
              <input
                id="agreeToTerms"
                type="checkbox"
                className={\`mr-2 mt-1 \${errors.agreeToTerms ? 'border-red-500' : ''}\`}
                {...register('agreeToTerms')}
              />
              <label htmlFor="agreeToTerms" className="text-sm">
                ฉันยืนยันว่าข้อมูลทั้งหมดเป็นความจริงและยอมรับ <a href="/terms" className="text-primary hover:underline">ข้อกำหนดและเงื่อนไข</a> <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm mb-4">
                {errors.agreeToTerms.message}
              </p>
            )}
          </>
        )}
        
        {/* ปุ่มควบคุม */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="btn btn-outline"
            >
              ย้อนกลับ
            </button>
          )}
          
          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="btn btn-primary ml-auto"
            >
              ถัดไป
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !agreeToTerms}
              className="btn btn-primary ml-auto"
            >
              {isSubmitting ? 'กำลังส่ง...' : 'ส่งใบสมัคร'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้วิธีการจัดการฟอร์มใน Next.js ดังนี้:

1. การจัดการฟอร์มแบบพื้นฐานด้วย useState
2. การจัดการฟอร์มด้วย React Hook Form ซึ่งช่วยลดการ re-render และจัดการฟอร์มได้อย่างมีประสิทธิภาพ
3. การตรวจสอบข้อมูลด้วย Zod ซึ่งช่วยให้การตรวจสอบข้อมูลเป็นไปอย่างมีประสิทธิภาพและใช้งานง่าย
4. การส่งข้อมูลฟอร์มไปยัง API และการจัดการข้อผิดพลาด
5. การสร้างฟอร์มที่ซับซ้อน เช่น ฟอร์มที่มีหลายขั้นตอน (multi-step form) หรือฟอร์มที่มีฟิลด์แบบไดนามิก

การจัดการฟอร์มเป็นส่วนสำคัญของแอปพลิเคชันเว็บ และ Next.js มีเครื่องมือและไลบรารีที่ช่วยให้การจัดการฟอร์มเป็นไปอย่างมีประสิทธิภาพและใช้งานง่าย`;

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของตัวอย่าง */}
      <div className="mb-8">
        <div className="flex items-center text-text-secondary mb-4">
          <Link href="/examples" className="flex items-center hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            กลับไปยังรายการตัวอย่าง
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">การจัดการฟอร์ม</h1>
            <p className="text-text-secondary">ตัวอย่างการจัดการฟอร์มใน Next.js ด้วย React Hook Form และ Zod</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับกลาง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              20 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาตัวอย่าง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={exampleContent} />
        <MarkdownContent content={basicFormContent} />
        <CodeBlock code={basicFormCode} language="typescript" fileName="components/BasicForm.tsx" />
        <MarkdownContent content={reactHookFormContent} />
        <CodeBlock code={reactHookFormInstallCode} language="bash" fileName="การติดตั้ง React Hook Form" />
        <CodeBlock code={reactHookFormUsageCode} language="typescript" fileName="components/HookForm.tsx" />
        <MarkdownContent content={zodContent} />
        <CodeBlock code={zodInstallCode} language="bash" fileName="การติดตั้ง Zod" />
        <CodeBlock code={zodUsageCode} language="typescript" fileName="components/ZodForm.tsx" />
        <MarkdownContent content={apiRouteContent} />
        <CodeBlock code={apiRouteCode} language="typescript" fileName="app/api/contact/route.ts" />
        <MarkdownContent content={complexFormContent} />
        <CodeBlock code={complexFormCode} language="typescript" fileName="components/MultiStepForm.tsx" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
