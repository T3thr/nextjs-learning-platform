"use client";

import React, { Suspense } from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการใช้งาน Error Handling ใน Next.js
function ErrorHandlingExampleContent() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# การจัดการข้อผิดพลาด (Error Handling) ใน Next.js

การจัดการข้อผิดพลาดเป็นส่วนสำคัญของการพัฒนาแอปพลิเคชัน Next.js ที่มีความทนทานต่อความผิดพลาด (resilient) ในตัวอย่างนี้ เราจะเรียนรู้วิธีการจัดการข้อผิดพลาดในส่วนต่างๆ ของแอปพลิเคชัน Next.js ทั้งในฝั่ง Client และ Server

## ประเภทของข้อผิดพลาดใน Next.js

1. **ข้อผิดพลาดในการแสดงผล (Rendering Errors)**: เกิดขึ้นเมื่อมีข้อผิดพลาดในระหว่างการแสดงผลคอมโพเนนต์
2. **ข้อผิดพลาดในการดึงข้อมูล (Data Fetching Errors)**: เกิดขึ้นเมื่อมีข้อผิดพลาดในระหว่างการดึงข้อมูล
3. **ข้อผิดพลาดในการนำทาง (Navigation Errors)**: เกิดขึ้นเมื่อมีข้อผิดพลาดในระหว่างการนำทาง
4. **ข้อผิดพลาดใน API Routes**: เกิดขึ้นเมื่อมีข้อผิดพลาดในระหว่างการประมวลผล API Routes`;

  // เนื้อหาเกี่ยวกับการจัดการข้อผิดพลาดในการแสดงผล
  const renderingErrorsContent = `## การจัดการข้อผิดพลาดในการแสดงผล

Next.js มีกลไกในการจัดการข้อผิดพลาดในการแสดงผลที่เรียกว่า Error Boundary ซึ่งเป็นคอมโพเนนต์ที่จับข้อผิดพลาดในการแสดงผลและแสดงผลข้อความข้อผิดพลาดแทน

### การใช้งาน error.js

ใน Next.js App Router คุณสามารถสร้างไฟล์ \`error.js\` เพื่อจัดการข้อผิดพลาดในการแสดงผลได้:`;

  // โค้ดตัวอย่างสำหรับ error.js
  const errorJsCode = `// app/error.js
'use client'; // ต้องเป็น Client Component

import { useEffect } from 'react';

// คอมโพเนนต์สำหรับจัดการข้อผิดพลาด
export default function Error({
  error, // ข้อผิดพลาดที่เกิดขึ้น
  reset, // ฟังก์ชันสำหรับลองใหม่
}) {
  // บันทึกข้อผิดพลาดไปยังบริการติดตามข้อผิดพลาด
  useEffect(() => {
    // บันทึกข้อผิดพลาดไปยัง console
    console.error('เกิดข้อผิดพลาด:', error);
    
    // บันทึกข้อผิดพลาดไปยังบริการติดตามข้อผิดพลาด (เช่น Sentry)
    // reportError(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">
          เกิดข้อผิดพลาดบางอย่าง!
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          ขออภัย เกิดข้อผิดพลาดขึ้นในระหว่างการแสดงผลหน้านี้
        </p>
        <button
          onClick={() => reset()} // ลองใหม่โดยการโหลดเซกเมนต์ใหม่
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          ลองใหม่
        </button>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการจัดการข้อผิดพลาดในการแสดงผลแบบเฉพาะเจาะจง
  const specificErrorsContent = `### การจัดการข้อผิดพลาดแบบเฉพาะเจาะจง

คุณสามารถสร้างไฟล์ \`error.js\` ในแต่ละเส้นทางเพื่อจัดการข้อผิดพลาดแบบเฉพาะเจาะจงได้:`;

  // โค้ดตัวอย่างสำหรับการจัดการข้อผิดพลาดแบบเฉพาะเจาะจง
  const specificErrorsCode = `// app/dashboard/error.js
'use client';

import { useEffect } from 'react';

// คอมโพเนนต์สำหรับจัดการข้อผิดพลาดในหน้า Dashboard
export default function DashboardError({
  error,
  reset,
}) {
  useEffect(() => {
    // บันทึกข้อผิดพลาดไปยัง console
    console.error('เกิดข้อผิดพลาดในหน้า Dashboard:', error);
  }, [error]);

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 mb-4">
        เกิดข้อผิดพลาดในหน้า Dashboard
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        ขออภัย เกิดข้อผิดพลาดขึ้นในระหว่างการโหลดข้อมูล Dashboard
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          ลองใหม่
        </button>
        <a
          href="/"
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded transition-colors"
        >
          กลับไปยังหน้าหลัก
        </a>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการจัดการข้อผิดพลาดในการดึงข้อมูล
  const dataFetchingErrorsContent = `## การจัดการข้อผิดพลาดในการดึงข้อมูล

การจัดการข้อผิดพลาดในการดึงข้อมูลเป็นสิ่งสำคัญในการพัฒนาแอปพลิเคชัน Next.js ที่มีความทนทานต่อความผิดพลาด

### การจัดการข้อผิดพลาดใน Server Components`;

  // โค้ดตัวอย่างสำหรับการจัดการข้อผิดพลาดในการดึงข้อมูลใน Server Components
  const serverComponentsErrorsCode = `// app/products/page.js
import { notFound } from 'next/navigation';

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function getProducts() {
  try {
    // ดึงข้อมูลจาก API
    const res = await fetch('https://api.example.com/products');
    
    // ตรวจสอบสถานะการตอบสนอง
    if (!res.ok) {
      // ถ้าสถานะไม่ใช่ 200-299 ให้โยนข้อผิดพลาด
      throw new Error('ไม่สามารถดึงข้อมูลสินค้าได้');
    }
    
    // แปลงข้อมูลเป็น JSON
    return res.json();
  } catch (error) {
    // บันทึกข้อผิดพลาดไปยัง console
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', error);
    
    // โยนข้อผิดพลาดเพื่อให้ error.js จัดการ
    throw error;
  }
}

// Server Component
export default async function ProductsPage() {
  // ดึงข้อมูลสินค้า
  const products = await getProducts();
  
  // ถ้าไม่มีสินค้า
  if (!products || products.length === 0) {
    // แสดงหน้า 404
    notFound();
  }
  
  return (
    <div>
      <h1>สินค้าทั้งหมด</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการจัดการข้อผิดพลาดใน Client Components
  const clientComponentsErrorsContent = `### การจัดการข้อผิดพลาดใน Client Components

ใน Client Components คุณสามารถใช้ try/catch หรือ Promise.catch() เพื่อจัดการข้อผิดพลาดในการดึงข้อมูลได้:`;

  // โค้ดตัวอย่างสำหรับการจัดการข้อผิดพลาดในการดึงข้อมูลใน Client Components
  const clientComponentsErrorsCode = `// app/components/ProductList.js
'use client';

import { useState, useEffect } from 'react';

// Client Component
export default function ProductList() {
  // สถานะสำหรับเก็บข้อมูลสินค้า
  const [products, setProducts] = useState([]);
  // สถานะสำหรับเก็บข้อผิดพลาด
  const [error, setError] = useState(null);
  // สถานะสำหรับเก็บสถานะการโหลด
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลสินค้าเมื่อคอมโพเนนต์ถูกแสดงผล
  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูลสินค้า
    async function fetchProducts() {
      try {
        // ตั้งค่าสถานะการโหลดเป็น true
        setLoading(true);
        // รีเซ็ตข้อผิดพลาด
        setError(null);
        
        // ดึงข้อมูลจาก API
        const res = await fetch('https://api.example.com/products');
        
        // ตรวจสอบสถานะการตอบสนอง
        if (!res.ok) {
          // ถ้าสถานะไม่ใช่ 200-299 ให้โยนข้อผิดพลาด
          throw new Error(\`ไม่สามารถดึงข้อมูลสินค้าได้: \${res.status}\`);
        }
        
        // แปลงข้อมูลเป็น JSON
        const data = await res.json();
        
        // อัปเดตสถานะสินค้า
        setProducts(data);
      } catch (error) {
        // บันทึกข้อผิดพลาดไปยัง console
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', error);
        
        // อัปเดตสถานะข้อผิดพลาด
        setError(error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า');
      } finally {
        // ตั้งค่าสถานะการโหลดเป็น false ไม่ว่าจะสำเร็จหรือไม่
        setLoading(false);
      }
    }

    // เรียกใช้ฟังก์ชันดึงข้อมูลสินค้า
    fetchProducts();
  }, []);

  // ถ้ากำลังโหลด
  if (loading) {
    return <div className="p-4">กำลังโหลดข้อมูลสินค้า...</div>;
  }

  // ถ้ามีข้อผิดพลาด
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
          เกิดข้อผิดพลาด
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          ลองใหม่
        </button>
      </div>
    );
  }

  // ถ้าไม่มีสินค้า
  if (!products || products.length === 0) {
    return <div className="p-4">ไม่พบสินค้า</div>;
  }

  // แสดงรายการสินค้า
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">สินค้าทั้งหมด</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
            <p className="text-primary font-bold mt-2">{product.price} บาท</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการจัดการข้อผิดพลาดใน React Query
  const reactQueryErrorsContent = `### การจัดการข้อผิดพลาดใน React Query

React Query เป็นไลบรารีที่ช่วยในการจัดการข้อมูลและแคชในแอปพลิเคชัน React ซึ่งมีกลไกในการจัดการข้อผิดพลาดที่ดี:`;

  // โค้ดตัวอย่างสำหรับการจัดการข้อผิดพลาดใน React Query
  const reactQueryErrorsCode = `// app/components/ProductListWithReactQuery.js
'use client';

import { useQuery } from '@tanstack/react-query';

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function fetchProducts() {
  const res = await fetch('https://api.example.com/products');
  
  // ตรวจสอบสถานะการตอบสนอง
  if (!res.ok) {
    // ถ้าสถานะไม่ใช่ 200-299 ให้โยนข้อผิดพลาด
    throw new Error(\`ไม่สามารถดึงข้อมูลสินค้าได้: \${res.status}\`);
  }
  
  // แปลงข้อมูลเป็น JSON
  return res.json();
}

// Client Component
export default function ProductListWithReactQuery() {
  // ใช้ useQuery เพื่อดึงข้อมูลสินค้า
  const {
    data: products,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // ถ้ากำลังโหลด
  if (isLoading) {
    return <div className="p-4">กำลังโหลดข้อมูลสินค้า...</div>;
  }

  // ถ้ามีข้อผิดพลาด
  if (isError) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
          เกิดข้อผิดพลาด
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า'}
        </p>
        <button
          onClick={() => refetch()}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          ลองใหม่
        </button>
      </div>
    );
  }

  // ถ้าไม่มีสินค้า
  if (!products || products.length === 0) {
    return <div className="p-4">ไม่พบสินค้า</div>;
  }

  // แสดงรายการสินค้า
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">สินค้าทั้งหมด</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
            <p className="text-primary font-bold mt-2">{product.price} บาท</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการจัดการข้อผิดพลาดใน SWR
  const swrErrorsContent = `### การจัดการข้อผิดพลาดใน SWR

SWR เป็นไลบรารีสำหรับการดึงข้อมูลที่พัฒนาโดยทีม Next.js ซึ่งมีกลไกในการจัดการข้อผิดพลาดที่ดี:`;

  // โค้ดตัวอย่างสำหรับการจัดการข้อผิดพลาดใน SWR
  const swrErrorsCode = `// app/components/ProductListWithSWR.js
'use client';

import useSWR from 'swr';

// ฟังก์ชันสำหรับดึงข้อมูล
const fetcher = async (url) => {
  const res = await fetch(url);
  
  // ตรวจสอบสถานะการตอบสนอง
  if (!res.ok) {
    // ถ้าสถานะไม่ใช่ 200-299 ให้โยนข้อผิดพลาด
    throw new Error(\`ไม่สามารถดึงข้อมูลสินค้าได้: \${res.status}\`);
  }
  
  // แปลงข้อมูลเป็น JSON
  return res.json();
};

// Client Component
export default function ProductListWithSWR() {
  // ใช้ useSWR เพื่อดึงข้อมูลสินค้า
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR('https://api.example.com/products', fetcher);

  // ถ้ากำลังโหลด
  if (isLoading) {
    return <div className="p-4">กำลังโหลดข้อมูลสินค้า...</div>;
  }

  // ถ้ามีข้อผิดพลาด
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
          เกิดข้อผิดพลาด
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า'}
        </p>
        <button
          onClick={() => mutate()} // ลองใหม่โดยการ revalidate
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          ลองใหม่
        </button>
      </div>
    );
  }

  // ถ้าไม่มีสินค้า
  if (!products || products.length === 0) {
    return <div className="p-4">ไม่พบสินค้า</div>;
  }

  // แสดงรายการสินค้า
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">สินค้าทั้งหมด</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
            <p className="text-primary font-bold mt-2">{product.price} บาท</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการจัดการข้อผิดพลาดใน API Routes
  const apiRoutesErrorsContent = `## การจัดการข้อผิดพลาดใน API Routes

การจัดการข้อผิดพลาดใน API Routes เป็นสิ่งสำคัญในการพัฒนา API ที่มีความทนทานต่อความผิดพลาด:`;

  // โค้ดตัวอย่างสำหรับการจัดการข้อผิดพลาดใน API Routes
  const apiRoutesErrorsCode = `// app/api/products/route.js
import { NextResponse } from 'next/server';

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function getProducts() {
  try {
    // ดึงข้อมูลจากฐานข้อมูล
    // ในตัวอย่างนี้เราจะจำลองการดึงข้อมูล
    // ในสถานการณ์จริงคุณอาจจะใช้ Prisma, Drizzle, หรือ ORM อื่นๆ
    
    // จำลองข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล
    // const randomError = Math.random() < 0.3;
    // if (randomError) {
    //   throw new Error('ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้');
    // }
    
    // จำลองข้อมูลสินค้า
    const products = [
      { id: 1, name: 'สินค้า 1', description: 'รายละเอียดสินค้า 1', price: 100 },
      { id: 2, name: 'สินค้า 2', description: 'รายละเอียดสินค้า 2', price: 200 },
      { id: 3, name: 'สินค้า 3', description: 'รายละเอียดสินค้า 3', price: 300 },
    ];
    
    return products;
  } catch (error) {
    // บันทึกข้อผิดพลาดไปยัง console
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', error);
    
    // โยนข้อผิดพลาดเพื่อให้ handler จัดการ
    throw error;
  }
}

// GET handler
export async function GET(request) {
  try {
    // ดึงข้อมูลสินค้า
    const products = await getProducts();
    
    // ส่งข้อมูลสินค้ากลับไป
    return NextResponse.json(products);
  } catch (error) {
    // บันทึกข้อผิดพลาดไปยัง console
    console.error('เกิดข้อผิดพลาดใน GET handler:', error);
    
    // ส่งข้อผิดพลาดกลับไป
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า', message: error.message },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request) {
  try {
    // แปลงข้อมูลจาก request เป็น JSON
    const data = await request.json();
    
    // ตรวจสอบข้อมูล
    if (!data.name || !data.price) {
      // ถ้าข้อมูลไม่ครบถ้วน ให้ส่งข้อผิดพลาดกลับไป
      return NextResponse.json(
        { error: 'ข้อมูลไม่ครบถ้วน', message: 'กรุณาระบุชื่อและราคาสินค้า' },
        { status: 400 }
      );
    }
    
    // ในสถานการณ์จริงคุณจะบันทึกข้อมูลลงในฐานข้อมูล
    // แต่ในตัวอย่างนี้เราจะจำลองการบันทึกข้อมูล
    
    // จำลองข้อมูลสินค้าที่บันทึกแล้ว
    const newProduct = {
      id: Date.now(),
      name: data.name,
      description: data.description || '',
      price: data.price,
    };
    
    // ส่งข้อมูลสินค้าที่บันทึกแล้วกลับไป
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    // บันทึกข้อผิดพลาดไปยัง console
    console.error('เกิดข้อผิดพลาดใน POST handler:', error);
    
    // ส่งข้อผิดพลาดกลับไป
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูลสินค้า', message: error.message },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาเกี่ยวกับการจัดการข้อผิดพลาดใน Server Actions
  const serverActionsErrorsContent = `## การจัดการข้อผิดพลาดใน Server Actions

Server Actions เป็นฟีเจอร์ใหม่ใน Next.js ที่ช่วยให้คุณสามารถเขียนฟังก์ชันที่ทำงานบนเซิร์ฟเวอร์และเรียกใช้จากไคลเอนต์ได้:`;

  // โค้ดตัวอย่างสำหรับการจัดการข้อผิดพลาดใน Server Actions
  const serverActionsErrorsCode = `// app/actions/product-actions.js
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// สร้าง schema สำหรับตรวจสอบข้อมูลสินค้า
const productSchema = z.object({
  name: z.string().min(1, { message: 'กรุณาระบุชื่อสินค้า' }),
  description: z.string().optional(),
  price: z.number().positive({ message: 'ราคาต้องเป็นจำนวนบวก' }),
});

// Server Action สำหรับสร้างสินค้าใหม่
export async function createProduct(prevState, formData) {
  try {
    // แปลงข้อมูลจาก FormData เป็น Object
    const rawData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
    };
    
    // ตรวจสอบข้อมูลด้วย Zod
    const validationResult = productSchema.safeParse(rawData);
    
    // ถ้าข้อมูลไม่ถูกต้อง
    if (!validationResult.success) {
      // ส่งข้อผิดพลาดกลับไป
      return {
        success: false,
        errors: validationResult.error.flatten().fieldErrors,
        message: 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง',
      };
    }
    
    // ข้อมูลที่ผ่านการตรวจสอบแล้ว
    const data = validationResult.data;
    
    // ในสถานการณ์จริงคุณจะบันทึกข้อมูลลงในฐานข้อมูล
    // แต่ในตัวอย่างนี้เราจะจำลองการบันทึกข้อมูล
    
    // จำลองข้อผิดพลาดในการบันทึกข้อมูล
    const randomError = Math.random() < 0.3;
    if (randomError) {
      throw new Error('ไม่สามารถบันทึกข้อมูลลงในฐานข้อมูลได้');
    }
    
    // จำลองการบันทึกข้อมูล
    console.log('บันทึกข้อมูลสินค้า:', data);
    
    // รีวาลิเดทหน้าสินค้า
    revalidatePath('/products');
    
    // เปลี่ยนเส้นทางไปยังหน้าสินค้า
    redirect('/products');
  } catch (error) {
    // บันทึกข้อผิดพลาดไปยัง console
    console.error('เกิดข้อผิดพลาดในการสร้างสินค้า:', error);
    
    // ส่งข้อผิดพลาดกลับไป
    return {
      success: false,
      message: \`เกิดข้อผิดพลาดในการสร้างสินค้า: \${error.message}\`,
    };
  }
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Server Actions ใน Client Component
  const serverActionsClientCode = `// app/components/ProductForm.js
'use client';

import { useFormState } from 'react-dom';
import { createProduct } from '@/app/actions/product-actions';

// Client Component
export default function ProductForm() {
  // ใช้ useFormState เพื่อจัดการสถานะฟอร์ม
  const [state, formAction] = useFormState(createProduct, {
    success: true,
    errors: {},
    message: '',
  });

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">เพิ่มสินค้าใหม่</h1>
      
      {/* แสดงข้อความข้อผิดพลาด */}
      {!state.success && (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4">
          <p className="text-red-700 dark:text-red-400">{state.message}</p>
        </div>
      )}
      
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            ชื่อสินค้า
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          {state.errors?.name && (
            <p className="text-red-600 text-sm mt-1">{state.errors.name[0]}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            รายละเอียดสินค้า
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            ราคา
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          {state.errors?.price && (
            <p className="text-red-600 text-sm mt-1">{state.errors.price[0]}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          บันทึกสินค้า
        </button>
      </form>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการจัดการข้อผิดพลาดในการนำทาง
  const navigationErrorsContent = `## การจัดการข้อผิดพลาดในการนำทาง

Next.js มีกลไกในการจัดการข้อผิดพลาดในการนำทาง เช่น หน้า 404 และ 500:

### การใช้งาน not-found.js

คุณสามารถสร้างไฟล์ \`not-found.js\` เพื่อจัดการกรณีที่ไม่พบหน้าที่ต้องการ:`;

  // โค้ดตัวอย่างสำหรับ not-found.js
  const notFoundJsCode = `// app/not-found.js
import Link from 'next/link';

// คอมโพเนนต์สำหรับหน้า 404
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">ไม่พบหน้าที่คุณต้องการ</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          ขออภัย เราไม่พบหน้าที่คุณกำลังมองหา หน้านี้อาจถูกย้ายหรือลบไปแล้ว
        </p>
        <Link
          href="/"
          className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-md transition-colors inline-block"
        >
          กลับไปยังหน้าหลัก
        </Link>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน notFound ใน Server Component
  const notFoundInServerComponentContent = `### การใช้งาน notFound ใน Server Component

คุณสามารถใช้ฟังก์ชัน \`notFound\` ใน Server Component เพื่อแสดงหน้า 404 ได้:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน notFound ใน Server Component
  const notFoundInServerComponentCode = `// app/products/[id]/page.js
import { notFound } from 'next/navigation';

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าตาม ID
async function getProductById(id) {
  try {
    // ดึงข้อมูลจาก API
    const res = await fetch(\`https://api.example.com/products/\${id}\`);
    
    // ตรวจสอบสถานะการตอบสนอง
    if (!res.ok) {
      // ถ้าสถานะเป็น 404 ให้ส่ง null กลับไป
      if (res.status === 404) {
        return null;
      }
      
      // ถ้าสถานะไม่ใช่ 200-299 และไม่ใช่ 404 ให้โยนข้อผิดพลาด
      throw new Error(\`ไม่สามารถดึงข้อมูลสินค้าได้: \${res.status}\`);
    }
    
    // แปลงข้อมูลเป็น JSON
    return res.json();
  } catch (error) {
    // บันทึกข้อผิดพลาดไปยัง console
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', error);
    
    // โยนข้อผิดพลาดเพื่อให้ error.js จัดการ
    throw error;
  }
}

// Server Component
export default async function ProductPage({ params }) {
  // ดึง ID จาก params
  const { id } = params;
  
  // ดึงข้อมูลสินค้าตาม ID
  const product = await getProductById(id);
  
  // ถ้าไม่พบสินค้า
  if (!product) {
    // แสดงหน้า 404
    notFound();
  }
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
      <p className="text-2xl font-bold text-primary">{product.price} บาท</p>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน global-error.js
  const globalErrorJsContent = `### การใช้งาน global-error.js

คุณสามารถสร้างไฟล์ \`global-error.js\` เพื่อจัดการข้อผิดพลาดระดับแอปพลิเคชันได้:`;

  // โค้ดตัวอย่างสำหรับ global-error.js
  const globalErrorJsCode = `// app/global-error.js
'use client';

import { useEffect } from 'react';

// คอมโพเนนต์สำหรับจัดการข้อผิดพลาดระดับแอปพลิเคชัน
export default function GlobalError({
  error,
  reset,
}) {
  // บันทึกข้อผิดพลาดไปยังบริการติดตามข้อผิดพลาด
  useEffect(() => {
    // บันทึกข้อผิดพลาดไปยัง console
    console.error('เกิดข้อผิดพลาดระดับแอปพลิเคชัน:', error);
    
    // บันทึกข้อผิดพลาดไปยังบริการติดตามข้อผิดพลาด (เช่น Sentry)
    // reportError(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-lg max-w-lg w-full text-center">
            <h1 className="text-3xl font-bold text-red-700 dark:text-red-400 mb-4">
              เกิดข้อผิดพลาดร้ายแรง!
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              ขออภัย เกิดข้อผิดพลาดร้ายแรงในแอปพลิเคชัน กรุณาลองใหม่อีกครั้ง
            </p>
            <button
              onClick={() => reset()} // ลองใหม่โดยการโหลดแอปพลิเคชันใหม่
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition-colors"
            >
              ลองใหม่
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Error Boundary ใน Client Component
  const errorBoundaryContent = `## การใช้งาน Error Boundary ใน Client Component

คุณสามารถสร้าง Error Boundary ของคุณเองใน Client Component ได้:`;

  // โค้ดตัวอย่างสำหรับ Error Boundary ใน Client Component
  const errorBoundaryCode = `// app/components/ErrorBoundary.js
'use client';

import { Component } from 'react';

// คอมโพเนนต์ Error Boundary
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    
    // สถานะสำหรับเก็บข้อผิดพลาด
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  // เมธอดที่จะถูกเรียกเมื่อมีข้อผิดพลาดในการแสดงผล
  static getDerivedStateFromError(error) {
    // อัปเดตสถานะเพื่อแสดงผล fallback UI
    return { hasError: true, error };
  }

  // เมธอดที่จะถูกเรียกเมื่อมีข้อผิดพลาดในการแสดงผล
  componentDidCatch(error, errorInfo) {
    // บันทึกข้อผิดพลาดไปยัง console
    console.error('เกิดข้อผิดพลาดใน Error Boundary:', error, errorInfo);
    
    // อัปเดตสถานะเพื่อเก็บข้อมูลข้อผิดพลาด
    this.setState({ errorInfo });
    
    // บันทึกข้อผิดพลาดไปยังบริการติดตามข้อผิดพลาด (เช่น Sentry)
    // reportError(error, errorInfo);
  }

  // เมธอดสำหรับรีเซ็ตสถานะข้อผิดพลาด
  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    // ถ้ามีข้อผิดพลาด
    if (this.state.hasError) {
      // แสดงผล fallback UI
      return (
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">
            เกิดข้อผิดพลาดบางอย่าง!
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            ขออภัย เกิดข้อผิดพลาดขึ้นในคอมโพเนนต์นี้
          </p>
          {this.state.error && (
            <div className="bg-red-100 dark:bg-red-900/40 p-4 rounded-lg mb-6 overflow-auto">
              <p className="font-mono text-sm">{this.state.error.toString()}</p>
            </div>
          )}
          <button
            onClick={this.resetError}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            ลองใหม่
          </button>
        </div>
      );
    }

    // ถ้าไม่มีข้อผิดพลาด ให้แสดงผลคอมโพเนนต์ลูกตามปกติ
    return this.props.children;
  }
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Error Boundary
  const errorBoundaryUsageCode = `// app/components/ProductSection.js
'use client';

import ErrorBoundary from './ErrorBoundary';
import ProductList from './ProductList';

// คอมโพเนนต์สำหรับแสดงส่วนสินค้า
export default function ProductSection() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">สินค้าทั้งหมด</h1>
      
      {/* ใช้ Error Boundary เพื่อจัดการข้อผิดพลาดใน ProductList */}
      <ErrorBoundary>
        <ProductList />
      </ErrorBoundary>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน try/catch ใน useEffect
  const tryInUseEffectContent = `## การใช้งาน try/catch ใน useEffect

คุณควรใช้ try/catch ใน useEffect เพื่อจัดการข้อผิดพลาดที่อาจเกิดขึ้นในระหว่างการทำงานของ side effect:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน try/catch ใน useEffect
  const tryInUseEffectCode = `// app/components/UserProfile.js
'use client';

import { useState, useEffect } from 'react';

// คอมโพเนนต์สำหรับแสดงโปรไฟล์ผู้ใช้
export default function UserProfile({ userId }) {
  // สถานะสำหรับเก็บข้อมูลผู้ใช้
  const [user, setUser] = useState(null);
  // สถานะสำหรับเก็บข้อผิดพลาด
  const [error, setError] = useState(null);
  // สถานะสำหรับเก็บสถานะการโหลด
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลผู้ใช้เมื่อคอมโพเนนต์ถูกแสดงผลหรือเมื่อ userId เปลี่ยนแปลง
  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
    async function fetchUser() {
      try {
        // ตั้งค่าสถานะการโหลดเป็น true
        setLoading(true);
        // รีเซ็ตข้อผิดพลาด
        setError(null);
        
        // ดึงข้อมูลจาก API
        const res = await fetch(\`https://api.example.com/users/\${userId}\`);
        
        // ตรวจสอบสถานะการตอบสนอง
        if (!res.ok) {
          // ถ้าสถานะไม่ใช่ 200-299 ให้โยนข้อผิดพลาด
          throw new Error(\`ไม่สามารถดึงข้อมูลผู้ใช้ได้: \${res.status}\`);
        }
        
        // แปลงข้อมูลเป็น JSON
        const data = await res.json();
        
        // อัปเดตสถานะผู้ใช้
        setUser(data);
      } catch (error) {
        // บันทึกข้อผิดพลาดไปยัง console
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
        
        // อัปเดตสถานะข้อผิดพลาด
        setError(error.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้');
      } finally {
        // ตั้งค่าสถานะการโหลดเป็น false ไม่ว่าจะสำเร็จหรือไม่
        setLoading(false);
      }
    }

    // เรียกใช้ฟังก์ชันดึงข้อมูลผู้ใช้
    fetchUser();
    
    // ฟังก์ชัน cleanup
    return () => {
      // ยกเลิกการดึงข้อมูลหรือทำความสะอาดอื่นๆ ตามต้องการ
    };
  }, [userId]);

  // ถ้ากำลังโหลด
  if (loading) {
    return <div className="p-4">กำลังโหลดข้อมูลผู้ใช้...</div>;
  }

  // ถ้ามีข้อผิดพลาด
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
          เกิดข้อผิดพลาด
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          ลองใหม่
        </button>
      </div>
    );
  }

  // ถ้าไม่มีผู้ใช้
  if (!user) {
    return <div className="p-4">ไม่พบข้อมูลผู้ใช้</div>;
  }

  // แสดงข้อมูลผู้ใช้
  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
          <span className="text-2xl font-bold text-primary">
            {user.name.charAt(0)}
          </span>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
      </div>
      <div className="border-t pt-4">
        <p className="mb-2">
          <span className="font-semibold">ชื่อผู้ใช้:</span> {user.username}
        </p>
        <p className="mb-2">
          <span className="font-semibold">เบอร์โทรศัพท์:</span> {user.phone}
        </p>
        <p className="mb-2">
          <span className="font-semibold">เว็บไซต์:</span> {user.website}
        </p>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Error Logging
  const errorLoggingContent = `## การใช้งาน Error Logging

การบันทึกข้อผิดพลาดเป็นสิ่งสำคัญในการติดตามและแก้ไขปัญหาในแอปพลิเคชัน คุณสามารถใช้บริการติดตามข้อผิดพลาด เช่น Sentry, LogRocket, หรือ Datadog:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Error Logging
  const errorLoggingCode = `// app/utils/error-logger.js
import * as Sentry from '@sentry/nextjs';

// ฟังก์ชันสำหรับบันทึกข้อผิดพลาด
export function logError(error, context = {}) {
  // บันทึกข้อผิดพลาดไปยัง console
  console.error('เกิดข้อผิดพลาด:', error, context);
  
  // บันทึกข้อผิดพลาดไปยัง Sentry
  Sentry.captureException(error, {
    extra: context,
  });
}

// ฟังก์ชันสำหรับบันทึกข้อมูล
export function logInfo(message, data = {}) {
  // บันทึกข้อมูลไปยัง console
  console.info(message, data);
  
  // บันทึกข้อมูลไปยัง Sentry
  Sentry.captureMessage(message, {
    level: 'info',
    extra: data,
  });
}

// ฟังก์ชันสำหรับบันทึกคำเตือน
export function logWarning(message, data = {}) {
  // บันทึกคำเตือนไปยัง console
  console.warn(message, data);
  
  // บันทึกคำเตือนไปยัง Sentry
  Sentry.captureMessage(message, {
    level: 'warning',
    extra: data,
  });
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Error Logging ใน API Route
  const errorLoggingInApiRouteCode = `// app/api/users/route.js
import { NextResponse } from 'next/server';
import { logError } from '@/app/utils/error-logger';

// GET handler
export async function GET(request) {
  try {
    // ดึงข้อมูลจากฐานข้อมูล
    // ในตัวอย่างนี้เราจะจำลองการดึงข้อมูล
    
    // จำลองข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล
    const randomError = Math.random() < 0.3;
    if (randomError) {
      throw new Error('ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้');
    }
    
    // จำลองข้อมูลผู้ใช้
    const users = [
      { id: 1, name: 'ผู้ใช้ 1', email: 'user1@example.com' },
      { id: 2, name: 'ผู้ใช้ 2', email: 'user2@example.com' },
      { id: 3, name: 'ผู้ใช้ 3', email: 'user3@example.com' },
    ];
    
    // ส่งข้อมูลผู้ใช้กลับไป
    return NextResponse.json(users);
  } catch (error) {
    // บันทึกข้อผิดพลาดไปยังบริการติดตามข้อผิดพลาด
    logError(error, {
      route: '/api/users',
      method: 'GET',
      url: request.url,
    });
    
    // ส่งข้อผิดพลาดกลับไป
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้', message: error.message },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้วิธีการจัดการข้อผิดพลาดใน Next.js ดังนี้:

1. การจัดการข้อผิดพลาดในการแสดงผล
   - การใช้งาน error.js
   - การจัดการข้อผิดพลาดแบบเฉพาะเจาะจง

2. การจัดการข้อผิดพลาดในการดึงข้อมูล
   - การจัดการข้อผิดพลาดใน Server Components
   - การจัดการข้อผิดพลาดใน Client Components
   - การจัดการข้อผิดพลาดใน React Query
   - การจัดการข้อผิดพลาดใน SWR

3. การจัดการข้อผิดพลาดใน API Routes
   - การจัดการข้อผิดพลาดใน GET และ POST handler

4. การจัดการข้อผิดพลาดใน Server Actions
   - การตรวจสอบข้อมูลด้วย Zod
   - การจัดการข้อผิดพลาดในฟอร์ม

5. การจัดการข้อผิดพลาดในการนำทาง
   - การใช้งาน not-found.js
   - การใช้งาน notFound ใน Server Component
   - การใช้งาน global-error.js

6. การใช้งาน Error Boundary ใน Client Component
   - การสร้าง Error Boundary ของคุณเอง
   - การใช้งาน Error Boundary

7. การใช้งาน try/catch ใน useEffect
   - การจัดการข้อผิดพลาดในระหว่างการทำงานของ side effect

8. การใช้งาน Error Logging
   - การบันทึกข้อผิดพลาดไปยังบริการติดตามข้อผิดพลาด
   - การใช้งาน Error Logging ใน API Route

การจัดการข้อผิดพลาดที่ดีช่วยให้แอปพลิเคชันของคุณมีความทนทานต่อความผิดพลาดและมอบประสบการณ์ผู้ใช้ที่ดีแม้ในสถานการณ์ที่ไม่คาดคิด`;

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
            <h1 className="text-3xl font-bold mb-2">การจัดการข้อผิดพลาด (Error Handling)</h1>
            <p className="text-text-secondary">ตัวอย่างการจัดการข้อผิดพลาดใน Next.js</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับกลาง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              25 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาตัวอย่าง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={exampleContent} />
        <MarkdownContent content={renderingErrorsContent} />
        <CodeBlock code={errorJsCode} language="jsx" fileName="app/error.js" />
        <MarkdownContent content={specificErrorsContent} />
        <CodeBlock code={specificErrorsCode} language="jsx" fileName="app/dashboard/error.js" />
        <MarkdownContent content={dataFetchingErrorsContent} />
        <CodeBlock code={serverComponentsErrorsCode} language="jsx" fileName="app/products/page.js" />
        <MarkdownContent content={clientComponentsErrorsContent} />
        <CodeBlock code={clientComponentsErrorsCode} language="jsx" fileName="app/components/ProductList.js" />
        <MarkdownContent content={reactQueryErrorsContent} />
        <CodeBlock code={reactQueryErrorsCode} language="jsx" fileName="app/components/ProductListWithReactQuery.js" />
        <MarkdownContent content={swrErrorsContent} />
        <CodeBlock code={swrErrorsCode} language="jsx" fileName="app/components/ProductListWithSWR.js" />
        <MarkdownContent content={apiRoutesErrorsContent} />
        <CodeBlock code={apiRoutesErrorsCode} language="jsx" fileName="app/api/products/route.js" />
        <MarkdownContent content={serverActionsErrorsContent} />
        <CodeBlock code={serverActionsErrorsCode} language="jsx" fileName="app/actions/product-actions.js" />
        <CodeBlock code={serverActionsClientCode} language="jsx" fileName="app/components/ProductForm.js" />
        <MarkdownContent content={navigationErrorsContent} />
        <CodeBlock code={notFoundJsCode} language="jsx" fileName="app/not-found.js" />
        <MarkdownContent content={notFoundInServerComponentContent} />
        <CodeBlock code={notFoundInServerComponentCode} language="jsx" fileName="app/products/[id]/page.js" />
        <MarkdownContent content={globalErrorJsContent} />
        <CodeBlock code={globalErrorJsCode} language="jsx" fileName="app/global-error.js" />
        <MarkdownContent content={errorBoundaryContent} />
        <CodeBlock code={errorBoundaryCode} language="jsx" fileName="app/components/ErrorBoundary.js" />
        <CodeBlock code={errorBoundaryUsageCode} language="jsx" fileName="app/components/ProductSection.js" />
        <MarkdownContent content={tryInUseEffectContent} />
        <CodeBlock code={tryInUseEffectCode} language="jsx" fileName="app/components/UserProfile.js" />
        <MarkdownContent content={errorLoggingContent} />
        <CodeBlock code={errorLoggingCode} language="jsx" fileName="app/utils/error-logger.js" />
        <CodeBlock code={errorLoggingInApiRouteCode} language="jsx" fileName="app/api/users/route.js" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}

export default function ErrorHandlingExample() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <ErrorHandlingExampleContent />
    </Suspense>
  );
}