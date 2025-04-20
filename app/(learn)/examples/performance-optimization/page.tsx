import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการใช้งาน Performance Optimization ใน Next.js
export default function PerformanceOptimizationExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# การปรับแต่งประสิทธิภาพ (Performance Optimization) ใน Next.js

การปรับแต่งประสิทธิภาพเป็นสิ่งสำคัญในการพัฒนาแอปพลิเคชัน Next.js ที่มีประสิทธิภาพสูง ในตัวอย่างนี้ เราจะเรียนรู้เทคนิคต่างๆ ในการปรับแต่งประสิทธิภาพของแอปพลิเคชัน Next.js

## ประเภทของการปรับแต่งประสิทธิภาพใน Next.js

1. **การปรับแต่งการโหลดหน้า**: การลดเวลาในการโหลดหน้าเว็บ
2. **การปรับแต่งการแสดงผล**: การปรับปรุงประสิทธิภาพในการแสดงผล
3. **การปรับแต่งการดึงข้อมูล**: การปรับปรุงประสิทธิภาพในการดึงข้อมูล
4. **การปรับแต่งขนาดของแอปพลิเคชัน**: การลดขนาดของแอปพลิเคชัน
5. **การปรับแต่งการทำงานของ JavaScript**: การปรับปรุงประสิทธิภาพในการทำงานของ JavaScript`;

  // เนื้อหาเกี่ยวกับการปรับแต่งการโหลดหน้า
  const pageLoadOptimizationContent = `## การปรับแต่งการโหลดหน้า

การปรับแต่งการโหลดหน้าเป็นสิ่งสำคัญในการปรับปรุงประสบการณ์ผู้ใช้ Next.js มีฟีเจอร์หลายอย่างที่ช่วยในการปรับแต่งการโหลดหน้า

### การใช้งาน Image Optimization`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Image Optimization
  const imageOptimizationCode = `// app/components/OptimizedImage.js
import Image from 'next/image';

// คอมโพเนนต์สำหรับแสดงรูปภาพที่ปรับแต่งประสิทธิภาพแล้ว
export default function OptimizedImage() {
  return (
    <div className="relative">
      {/* 
        การใช้งาน next/image ช่วยในการปรับแต่งประสิทธิภาพของรูปภาพดังนี้:
        1. การปรับขนาดรูปภาพอัตโนมัติ
        2. การบีบอัดรูปภาพ
        3. การโหลดรูปภาพแบบ lazy
        4. การป้องกัน layout shift
      */}
      <Image
        src="/images/hero.jpg"
        alt="Hero Image"
        width={1200}
        height={600}
        priority={true} // โหลดรูปภาพทันทีสำหรับรูปภาพที่อยู่ใน viewport แรก
        quality={80} // คุณภาพของรูปภาพ (0-100)
        placeholder="blur" // แสดง blur placeholder ระหว่างรอรูปภาพโหลด
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        className="rounded-lg" // สามารถใช้ className ได้เหมือน img ทั่วไป
      />
      
      {/* การใช้งาน fill prop สำหรับรูปภาพที่ต้องการให้เต็มพื้นที่ของ parent element */}
      <div className="relative w-full h-64 mt-8">
        <Image
          src="/images/background.jpg"
          alt="Background Image"
          fill={true} // รูปภาพจะเต็มพื้นที่ของ parent element
          style={{ objectFit: 'cover' }} // ปรับการแสดงผลของรูปภาพ
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // ช่วยในการเลือกขนาดรูปภาพที่เหมาะสม
          loading="lazy" // โหลดรูปภาพเมื่อใกล้ viewport
        />
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Font Optimization
  const fontOptimizationContent = `### การใช้งาน Font Optimization

Next.js มีระบบการปรับแต่งประสิทธิภาพของฟอนต์ที่ช่วยลดการกระพริบของข้อความและปรับปรุงประสิทธิภาพในการโหลดฟอนต์:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Font Optimization
  const fontOptimizationCode = `// app/layout.js
import { Inter, Kanit } from 'next/font/google';

// กำหนดค่าฟอนต์ Inter สำหรับภาษาอังกฤษ
const inter = Inter({
  subsets: ['latin'], // กำหนด subset ที่ต้องการ
  weight: ['400', '500', '700'], // กำหนดน้ำหนักฟอนต์ที่ต้องการ
  display: 'swap', // กำหนดวิธีการแสดงผลฟอนต์
  variable: '--font-inter', // กำหนดตัวแปร CSS สำหรับฟอนต์
});

// กำหนดค่าฟอนต์ Kanit สำหรับภาษาไทย
const kanit = Kanit({
  subsets: ['thai', 'latin'], // กำหนด subset ที่ต้องการ (รองรับทั้งภาษาไทยและอังกฤษ)
  weight: ['300', '400', '500', '700'], // กำหนดน้ำหนักฟอนต์ที่ต้องการ
  display: 'swap', // กำหนดวิธีการแสดงผลฟอนต์
  variable: '--font-kanit', // กำหนดตัวแปร CSS สำหรับฟอนต์
});

// คอมโพเนนต์ Layout
export default function RootLayout({ children }) {
  return (
    <html lang="th" className={\`\${inter.variable} \${kanit.variable}\`}>
      <body>
        {children}
      </body>
    </html>
  );
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Font Optimization ใน CSS
  const fontOptimizationCssCode = `/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-rgb: 10, 10, 10;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}

/* กำหนดฟอนต์สำหรับภาษาอังกฤษ */
.font-en {
  font-family: var(--font-inter);
}

/* กำหนดฟอนต์สำหรับภาษาไทย */
.font-th {
  font-family: var(--font-kanit);
}

/* หรือกำหนดฟอนต์สำหรับทั้งเว็บไซต์ */
body {
  font-family: var(--font-kanit), var(--font-inter), system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-kanit), var(--font-inter), system-ui, sans-serif;
  font-weight: 700;
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Script Optimization
  const scriptOptimizationContent = `### การใช้งาน Script Optimization

Next.js มีคอมโพเนนต์ \`next/script\` ที่ช่วยในการปรับแต่งประสิทธิภาพของสคริปต์:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Script Optimization
  const scriptOptimizationCode = `// app/layout.js
import Script from 'next/script';

// คอมโพเนนต์ Layout
export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        {children}
        
        {/* 
          การใช้งาน next/script ช่วยในการปรับแต่งประสิทธิภาพของสคริปต์ดังนี้:
          1. beforeInteractive: โหลดก่อนที่หน้าจะโต้ตอบได้ (เหมาะสำหรับสคริปต์ที่สำคัญมาก)
          2. afterInteractive (ค่าเริ่มต้น): โหลดหลังจากที่หน้าโต้ตอบได้แล้ว
          3. lazyOnload: โหลดหลังจากที่ทุกอย่างโหลดเสร็จแล้ว (เหมาะสำหรับสคริปต์ที่ไม่สำคัญ)
        */}
        
        {/* สคริปต์ที่สำคัญมาก (โหลดก่อนที่หน้าจะโต้ตอบได้) */}
        <Script
          src="https://example.com/important-script.js"
          strategy="beforeInteractive"
          id="important-script"
        />
        
        {/* สคริปต์ที่สำคัญ (โหลดหลังจากที่หน้าโต้ตอบได้แล้ว) */}
        <Script
          src="https://example.com/analytics.js"
          strategy="afterInteractive"
          id="analytics"
          onLoad={() => {
            console.log('Analytics script loaded');
            // เริ่มต้นการทำงานของ Analytics
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          }}
        />
        
        {/* สคริปต์ที่ไม่สำคัญ (โหลดหลังจากที่ทุกอย่างโหลดเสร็จแล้ว) */}
        <Script
          src="https://example.com/chat-widget.js"
          strategy="lazyOnload"
          id="chat-widget"
        />
        
        {/* สคริปต์ inline */}
        <Script id="show-banner" strategy="afterInteractive">
          {\`
            (function() {
              // โค้ด JavaScript ที่ต้องการรันหลังจากที่หน้าโต้ตอบได้แล้ว
              document.addEventListener('DOMContentLoaded', function() {
                const banner = document.getElementById('banner');
                if (banner) {
                  banner.style.display = 'block';
                }
              });
            })();
          \`}
        </Script>
      </body>
    </html>
  );
}`;

  // เนื้อหาเกี่ยวกับการปรับแต่งการแสดงผล
  const renderingOptimizationContent = `## การปรับแต่งการแสดงผล

การปรับแต่งการแสดงผลเป็นสิ่งสำคัญในการปรับปรุงประสิทธิภาพของแอปพลิเคชัน Next.js

### การใช้งาน React.memo`;

  // โค้ดตัวอย่างสำหรับการใช้งาน React.memo
  const reactMemoCode = `// app/components/ExpensiveComponent.js
'use client';

import { memo } from 'react';

// คอมโพเนนต์ที่มีการคำนวณที่ซับซ้อน
function ExpensiveComponent({ data, onItemClick }) {
  console.log('Rendering ExpensiveComponent');
  
  // จำลองการคำนวณที่ซับซ้อน
  const processedData = data.map(item => {
    // จำลองการประมวลผลข้อมูลที่ซับซ้อน
    let result = item;
    for (let i = 0; i < 1000; i++) {
      result = { ...result, value: (result.value * 1.01).toFixed(2) };
    }
    return result;
  });
  
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">ข้อมูลที่ประมวลผลแล้ว</h2>
      <ul className="space-y-2">
        {processedData.map(item => (
          <li
            key={item.id}
            className="p-2 bg-gray-100 dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => onItemClick(item)}
          >
            {item.name}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ใช้ React.memo เพื่อป้องกันการ render ที่ไม่จำเป็น
// คอมโพเนนต์จะ render ใหม่เฉพาะเมื่อ props เปลี่ยนแปลงเท่านั้น
export default memo(ExpensiveComponent);`;

  // โค้ดตัวอย่างสำหรับการใช้งาน React.memo กับฟังก์ชัน areEqual
  const reactMemoWithAreEqualCode = `// app/components/OptimizedList.js
'use client';

import { memo } from 'react';

// คอมโพเนนต์สำหรับแสดงรายการ
function OptimizedList({ items, onItemClick }) {
  console.log('Rendering OptimizedList');
  
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">รายการที่ปรับแต่งประสิทธิภาพแล้ว</h2>
      <ul className="space-y-2">
        {items.map(item => (
          <li
            key={item.id}
            className="p-2 bg-gray-100 dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => onItemClick(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ฟังก์ชันสำหรับเปรียบเทียบ props เก่าและใหม่
function areEqual(prevProps, nextProps) {
  // ตรวจสอบว่า items เปลี่ยนแปลงหรือไม่
  if (prevProps.items.length !== nextProps.items.length) {
    return false; // render ใหม่ถ้าจำนวน items เปลี่ยนแปลง
  }
  
  // ตรวจสอบว่ามี item ใดเปลี่ยนแปลงหรือไม่
  for (let i = 0; i < prevProps.items.length; i++) {
    if (
      prevProps.items[i].id !== nextProps.items[i].id ||
      prevProps.items[i].name !== nextProps.items[i].name
    ) {
      return false; // render ใหม่ถ้ามี item ที่เปลี่ยนแปลง
    }
  }
  
  // ตรวจสอบว่า onItemClick เปลี่ยนแปลงหรือไม่
  if (prevProps.onItemClick !== nextProps.onItemClick) {
    return false; // render ใหม่ถ้า onItemClick เปลี่ยนแปลง
  }
  
  return true; // ไม่ render ใหม่ถ้าไม่มีการเปลี่ยนแปลง
}

// ใช้ React.memo กับฟังก์ชัน areEqual
export default memo(OptimizedList, areEqual);`;

  // เนื้อหาเกี่ยวกับการใช้งาน useMemo และ useCallback
  const useMemoAndUseCallbackContent = `### การใช้งาน useMemo และ useCallback

\`useMemo\` และ \`useCallback\` เป็น hooks ที่ช่วยในการปรับแต่งประสิทธิภาพของแอปพลิเคชัน React:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน useMemo และ useCallback
  const useMemoAndUseCallbackCode = `// app/components/DataProcessor.js
'use client';

import { useState, useMemo, useCallback } from 'react';
import ExpensiveComponent from './ExpensiveComponent';

// คอมโพเนนต์สำหรับประมวลผลข้อมูล
export default function DataProcessor() {
  // สถานะสำหรับเก็บข้อมูล
  const [data, setData] = useState([
    { id: 1, name: 'รายการ 1', value: 100 },
    { id: 2, name: 'รายการ 2', value: 200 },
    { id: 3, name: 'รายการ 3', value: 300 },
  ]);
  
  // สถานะสำหรับเก็บรายการที่เลือก
  const [selectedItem, setSelectedItem] = useState(null);
  
  // สถานะสำหรับเก็บตัวกรอง
  const [filter, setFilter] = useState('');
  
  // ใช้ useMemo เพื่อคำนวณข้อมูลที่ผ่านการกรองแล้ว
  // ค่าจะถูกคำนวณใหม่เฉพาะเมื่อ data หรือ filter เปลี่ยนแปลงเท่านั้น
  const filteredData = useMemo(() => {
    console.log('Calculating filteredData');
    
    // ถ้าไม่มีตัวกรอง ให้ส่งข้อมูลทั้งหมดกลับไป
    if (!filter) {
      return data;
    }
    
    // กรองข้อมูลตามชื่อ
    return data.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);
  
  // ใช้ useCallback เพื่อสร้างฟังก์ชันที่ไม่เปลี่ยนแปลงในแต่ละการ render
  // ฟังก์ชันจะถูกสร้างใหม่เฉพาะเมื่อ dependencies เปลี่ยนแปลงเท่านั้น
  const handleItemClick = useCallback((item) => {
    console.log('Item clicked:', item);
    setSelectedItem(item);
  }, []);
  
  // ฟังก์ชันสำหรับเพิ่มรายการใหม่
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: \`รายการ \${data.length + 1}\`,
      value: Math.floor(Math.random() * 1000),
    };
    
    setData(prevData => [...prevData, newItem]);
  };
  
  // ฟังก์ชันสำหรับเปลี่ยนตัวกรอง
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="กรองตามชื่อ"
          className="px-3 py-2 border rounded-md flex-1"
        />
        <button
          onClick={handleAddItem}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          เพิ่มรายการ
        </button>
      </div>
      
      {/* ใช้ ExpensiveComponent ที่ปรับแต่งประสิทธิภาพแล้ว */}
      <ExpensiveComponent
        data={filteredData}
        onItemClick={handleItemClick}
      />
      
      {selectedItem && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">รายการที่เลือก</h3>
          <p>ID: {selectedItem.id}</p>
          <p>ชื่อ: {selectedItem.name}</p>
          <p>ค่า: {selectedItem.value}</p>
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการปรับแต่งการดึงข้อมูล
  const dataFetchingOptimizationContent = `## การปรับแต่งการดึงข้อมูล

การปรับแต่งการดึงข้อมูลเป็นสิ่งสำคัญในการปรับปรุงประสิทธิภาพของแอปพลิเคชัน Next.js

### การใช้งาน React Suspense และ Streaming`;

  // โค้ดตัวอย่างสำหรับการใช้งาน React Suspense และ Streaming
  const reactSuspenseAndStreamingCode = `// app/products/page.js
import { Suspense } from 'react';
import ProductList from '@/app/components/ProductList';
import ProductListSkeleton from '@/app/components/ProductListSkeleton';

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function getProducts() {
  // จำลองการดึงข้อมูลที่ใช้เวลานาน
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // จำลองข้อมูลสินค้า
  return [
    { id: 1, name: 'สินค้า 1', price: 100 },
    { id: 2, name: 'สินค้า 2', price: 200 },
    { id: 3, name: 'สินค้า 3', price: 300 },
  ];
}

// Server Component
export default async function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">สินค้าทั้งหมด</h1>
      
      {/* 
        การใช้งาน Suspense ช่วยในการแสดงผล loading state ระหว่างรอข้อมูล
        และช่วยในการ streaming HTML ไปยังเบราว์เซอร์
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">สินค้าแนะนำ</h2>
          <Suspense fallback={<ProductListSkeleton />}>
            {/* ProductList จะถูกแสดงผลเมื่อข้อมูลพร้อมใช้งาน */}
            <ProductList promise={getProducts()} />
          </Suspense>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">สินค้าขายดี</h2>
          <Suspense fallback={<ProductListSkeleton />}>
            {/* ProductList จะถูกแสดงผลเมื่อข้อมูลพร้อมใช้งาน */}
            <ProductList promise={getProducts()} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}`;

  // โค้ดตัวอย่างสำหรับ ProductList และ ProductListSkeleton
  const productListAndSkeletonCode = `// app/components/ProductList.js
// Server Component
export default async function ProductList({ promise }) {
  // รอข้อมูลจาก promise
  const products = await promise;
  
  return (
    <ul className="space-y-4">
      {products.map(product => (
        <li key={product.id} className="border p-4 rounded-lg">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-primary">{product.price} บาท</p>
        </li>
      ))}
    </ul>
  );
}

// app/components/ProductListSkeleton.js
export default function ProductListSkeleton() {
  // สร้าง skeleton สำหรับแสดงระหว่างรอข้อมูล
  return (
    <ul className="space-y-4">
      {[1, 2, 3].map(i => (
        <li key={i} className="border p-4 rounded-lg animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </li>
      ))}
    </ul>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Parallel Data Fetching
  const parallelDataFetchingContent = `### การใช้งาน Parallel Data Fetching

การดึงข้อมูลแบบขนานช่วยลดเวลาในการโหลดข้อมูล:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Parallel Data Fetching
  const parallelDataFetchingCode = `// app/dashboard/page.js
// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
async function getUser(userId) {
  // จำลองการดึงข้อมูลที่ใช้เวลานาน
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // จำลองข้อมูลผู้ใช้
  return {
    id: userId,
    name: 'ผู้ใช้ 1',
    email: 'user1@example.com',
  };
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function getProducts() {
  // จำลองการดึงข้อมูลที่ใช้เวลานาน
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // จำลองข้อมูลสินค้า
  return [
    { id: 1, name: 'สินค้า 1', price: 100 },
    { id: 2, name: 'สินค้า 2', price: 200 },
    { id: 3, name: 'สินค้า 3', price: 300 },
  ];
}

// ฟังก์ชันสำหรับดึงข้อมูลคำสั่งซื้อ
async function getOrders() {
  // จำลองการดึงข้อมูลที่ใช้เวลานาน
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // จำลองข้อมูลคำสั่งซื้อ
  return [
    { id: 1, productId: 1, quantity: 2, total: 200 },
    { id: 2, productId: 3, quantity: 1, total: 300 },
  ];
}

// Server Component
export default async function DashboardPage() {
  // ดึงข้อมูลแบบขนาน
  // ทั้ง 3 requests จะเริ่มต้นพร้อมกัน ไม่ต้องรอให้ request ก่อนหน้าเสร็จสิ้น
  const userPromise = getUser(1);
  const productsPromise = getProducts();
  const ordersPromise = getOrders();
  
  // รอให้ทุก promises เสร็จสิ้น
  const [user, products, orders] = await Promise.all([
    userPromise,
    productsPromise,
    ordersPromise,
  ]);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">แดชบอร์ด</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">ข้อมูลผู้ใช้</h2>
          <p>ชื่อ: {user.name}</p>
          <p>อีเมล: {user.email}</p>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">สินค้าล่าสุด</h2>
          <ul className="space-y-2">
            {products.slice(0, 3).map(product => (
              <li key={product.id}>
                {product.name}: {product.price} บาท
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">คำสั่งซื้อล่าสุด</h2>
          <ul className="space-y-2">
            {orders.map(order => (
              <li key={order.id}>
                คำสั่งซื้อ #{order.id}: {order.total} บาท
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Route Segment Config
  const routeSegmentConfigContent = `### การใช้งาน Route Segment Config

Next.js มี Route Segment Config ที่ช่วยในการปรับแต่งการดึงข้อมูล:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Route Segment Config
  const routeSegmentConfigCode = `// app/products/page.js
// กำหนดค่า Route Segment Config
export const revalidate = 3600; // revalidate ทุก 1 ชั่วโมง (3600 วินาที)

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function getProducts() {
  // ดึงข้อมูลจาก API
  const res = await fetch('https://api.example.com/products', {
    next: {
      revalidate: 3600, // revalidate ทุก 1 ชั่วโมง (3600 วินาที)
    },
  });
  
  // แปลงข้อมูลเป็น JSON
  return res.json();
}

// Server Component
export default async function ProductsPage() {
  // ดึงข้อมูลสินค้า
  const products = await getProducts();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">สินค้าทั้งหมด</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
            <p className="text-primary font-bold mt-2">{product.price} บาท</p>
          </div>
        ))}
      </div>
    </div>
  );
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Dynamic Route Segment Config
  const dynamicRouteSegmentConfigCode = `// app/products/[id]/page.js
// กำหนดค่า Route Segment Config แบบไดนามิก
export async function generateMetadata({ params }) {
  // ดึงข้อมูลสินค้าตาม ID
  const product = await getProduct(params.id);
  
  // สร้าง metadata จากข้อมูลสินค้า
  return {
    title: product.name,
    description: product.description,
  };
}

// ฟังก์ชันสำหรับสร้าง static params
export async function generateStaticParams() {
  // ดึงข้อมูลสินค้าทั้งหมด
  const products = await getProducts();
  
  // สร้าง params สำหรับแต่ละสินค้า
  return products.map(product => ({
    id: product.id.toString(),
  }));
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าทั้งหมด
async function getProducts() {
  // ดึงข้อมูลจาก API
  const res = await fetch('https://api.example.com/products');
  
  // แปลงข้อมูลเป็น JSON
  return res.json();
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าตาม ID
async function getProduct(id) {
  // ดึงข้อมูลจาก API
  const res = await fetch(\`https://api.example.com/products/\${id}\`, {
    next: {
      revalidate: 3600, // revalidate ทุก 1 ชั่วโมง (3600 วินาที)
    },
  });
  
  // แปลงข้อมูลเป็น JSON
  return res.json();
}

// Server Component
export default async function ProductPage({ params }) {
  // ดึงข้อมูลสินค้าตาม ID
  const product = await getProduct(params.id);
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
      <p className="text-2xl font-bold text-primary">{product.price} บาท</p>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการปรับแต่งขนาดของแอปพลิเคชัน
  const appSizeOptimizationContent = `## การปรับแต่งขนาดของแอปพลิเคชัน

การปรับแต่งขนาดของแอปพลิเคชันเป็นสิ่งสำคัญในการปรับปรุงประสิทธิภาพของแอปพลิเคชัน Next.js

### การใช้งาน Dynamic Imports`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Dynamic Imports
  const dynamicImportsCode = `// app/components/DynamicChart.js
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// นำเข้าคอมโพเนนต์แบบ dynamic
// คอมโพเนนต์จะถูกโหลดเฉพาะเมื่อต้องการใช้งานเท่านั้น
const Chart = dynamic(
  () => import('react-chartjs-2').then(mod => mod.Line),
  {
    loading: () => <p className="p-4 text-center">กำลังโหลดแผนภูมิ...</p>,
    ssr: false, // ไม่ต้องการ render บนเซิร์ฟเวอร์
  }
);

// คอมโพเนนต์สำหรับแสดงแผนภูมิ
export default function DynamicChart({ title }) {
  // สถานะสำหรับเก็บข้อมูลแผนภูมิ
  const [showChart, setShowChart] = useState(false);
  
  // ข้อมูลสำหรับแผนภูมิ
  const chartData = {
    labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน'],
    datasets: [
      {
        label: 'ยอดขาย',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      {!showChart ? (
        <button
          onClick={() => setShowChart(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          แสดงแผนภูมิ
        </button>
      ) : (
        <div className="h-64">
          <Chart data={chartData} />
        </div>
      )}
    </div>
  );
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Dynamic Imports กับ Page
  const dynamicImportsPageCode = `// app/dashboard/page.js
import dynamic from 'next/dynamic';

// นำเข้าคอมโพเนนต์แบบ dynamic
const DynamicChart = dynamic(
  () => import('@/app/components/DynamicChart'),
  {
    loading: () => <p className="p-4 text-center">กำลังโหลดคอมโพเนนต์...</p>,
  }
);

// Server Component
export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">แดชบอร์ด</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DynamicChart title="ยอดขายรายเดือน" />
        <DynamicChart title="ยอดขายรายสินค้า" />
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Tree Shaking
  const treeShakingContent = `### การใช้งาน Tree Shaking

Tree Shaking เป็นเทคนิคในการลบโค้ดที่ไม่ได้ใช้งานออกจากแอปพลิเคชัน:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Tree Shaking
  const treeShakingCode = `// app/utils/helpers.js
// ฟังก์ชันสำหรับแปลงราคาเป็นสกุลเงินไทย
export function formatPrice(price) {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(price);
}

// ฟังก์ชันสำหรับแปลงวันที่เป็นรูปแบบไทย
export function formatDate(date) {
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

// ฟังก์ชันสำหรับตรวจสอบว่าเป็นอีเมลที่ถูกต้องหรือไม่
export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

// ฟังก์ชันสำหรับตรวจสอบว่าเป็นเบอร์โทรศัพท์ที่ถูกต้องหรือไม่
export function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Tree Shaking ที่ดี
  const goodTreeShakingCode = `// app/components/ProductCard.js
// นำเข้าเฉพาะฟังก์ชันที่ต้องการใช้งาน
import { formatPrice } from '@/app/utils/helpers';

// คอมโพเนนต์สำหรับแสดงสินค้า
export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
      <p className="text-primary font-bold mt-2">{formatPrice(product.price)}</p>
    </div>
  );
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Tree Shaking ที่ไม่ดี
  const badTreeShakingCode = `// app/components/BadProductCard.js
// นำเข้าทั้งไฟล์ (ไม่ดี)
import * as helpers from '@/app/utils/helpers';

// คอมโพเนนต์สำหรับแสดงสินค้า
export default function BadProductCard({ product }) {
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
      <p className="text-primary font-bold mt-2">{helpers.formatPrice(product.price)}</p>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการปรับแต่งการทำงานของ JavaScript
  const javascriptOptimizationContent = `## การปรับแต่งการทำงานของ JavaScript

การปรับแต่งการทำงานของ JavaScript เป็นสิ่งสำคัญในการปรับปรุงประสิทธิภาพของแอปพลิเคชัน Next.js

### การใช้งาน Web Workers`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Web Workers
  const webWorkersCode = `// public/workers/calculation-worker.js
// Web Worker สำหรับการคำนวณที่ซับซ้อน

// รับข้อความจาก main thread
self.addEventListener('message', (event) => {
  // ข้อมูลที่ได้รับจาก main thread
  const { data, operation } = event.data;
  
  // ตรวจสอบ operation
  if (operation === 'calculate') {
    // ทำการคำนวณที่ซับซ้อน
    const result = performComplexCalculation(data);
    
    // ส่งผลลัพธ์กลับไปยัง main thread
    self.postMessage({ result });
  }
});

// ฟังก์ชันสำหรับการคำนวณที่ซับซ้อน
function performComplexCalculation(data) {
  // จำลองการคำนวณที่ซับซ้อนและใช้เวลานาน
  let result = 0;
  
  for (let i = 0; i < 10000000; i++) {
    result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
  }
  
  // ประมวลผลข้อมูล
  const processedData = data.map(item => {
    return {
      ...item,
      value: item.value * result,
      processed: true,
    };
  });
  
  return processedData;
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Web Workers ใน React Component
  const webWorkersReactCode = `// app/components/ComplexCalculation.js
'use client';

import { useState, useEffect } from 'react';

// คอมโพเนนต์สำหรับการคำนวณที่ซับซ้อน
export default function ComplexCalculation() {
  // สถานะสำหรับเก็บข้อมูล
  const [data, setData] = useState([
    { id: 1, name: 'รายการ 1', value: 100 },
    { id: 2, name: 'รายการ 2', value: 200 },
    { id: 3, name: 'รายการ 3', value: 300 },
  ]);
  
  // สถานะสำหรับเก็บผลลัพธ์
  const [result, setResult] = useState(null);
  
  // สถานะสำหรับเก็บสถานะการโหลด
  const [loading, setLoading] = useState(false);
  
  // สถานะสำหรับเก็บ worker
  const [worker, setWorker] = useState(null);
  
  // สร้าง worker เมื่อคอมโพเนนต์ถูกแสดงผล
  useEffect(() => {
    // สร้าง worker เฉพาะเมื่ออยู่ในเบราว์เซอร์เท่านั้น
    if (typeof window !== 'undefined') {
      // สร้าง worker
      const calculationWorker = new Worker('/workers/calculation-worker.js');
      
      // กำหนด event listener สำหรับรับข้อความจาก worker
      calculationWorker.addEventListener('message', (event) => {
        // ข้อมูลที่ได้รับจาก worker
        const { result } = event.data;
        
        // อัปเดตสถานะผลลัพธ์
        setResult(result);
        
        // อัปเดตสถานะการโหลด
        setLoading(false);
      });
      
      // เก็บ worker ในสถานะ
      setWorker(calculationWorker);
      
      // ทำความสะอาด worker เมื่อคอมโพเนนต์ถูกลบ
      return () => {
        calculationWorker.terminate();
      };
    }
  }, []);
  
  // ฟังก์ชันสำหรับเริ่มการคำนวณ
  const startCalculation = () => {
    // ตรวจสอบว่ามี worker หรือไม่
    if (worker) {
      // อัปเดตสถานะการโหลด
      setLoading(true);
      
      // ส่งข้อมูลไปยัง worker
      worker.postMessage({
        data,
        operation: 'calculate',
      });
    }
  };
  
  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">การคำนวณที่ซับซ้อน</h2>
      
      <button
        onClick={startCalculation}
        disabled={loading}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'กำลังคำนวณ...' : 'เริ่มการคำนวณ'}
      </button>
      
      {loading && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p>กำลังคำนวณ... (การคำนวณนี้จะใช้เวลาสักครู่)</p>
        </div>
      )}
      
      {result && !loading && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">ผลลัพธ์</h3>
          <ul className="space-y-2">
            {result.map(item => (
              <li key={item.id} className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                {item.name}: {item.value.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Virtualization
  const virtualizationContent = `### การใช้งาน Virtualization

Virtualization เป็นเทคนิคในการแสดงผลรายการที่มีจำนวนมากโดยแสดงผลเฉพาะรายการที่อยู่ใน viewport เท่านั้น:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Virtualization
  const virtualizationCode = `// app/components/VirtualizedList.js
'use client';

import { useRef, useState, useEffect } from 'react';

// คอมโพเนนต์สำหรับแสดงรายการแบบ virtualized
export default function VirtualizedList({ items, itemHeight = 50, visibleItems = 10 }) {
  // สถานะสำหรับเก็บตำแหน่งเริ่มต้น
  const [startIndex, setStartIndex] = useState(0);
  
  // ref สำหรับ container
  const containerRef = useRef(null);
  
  // คำนวณความสูงทั้งหมดของรายการ
  const totalHeight = items.length * itemHeight;
  
  // คำนวณรายการที่ต้องแสดงผล
  const endIndex = Math.min(startIndex + visibleItems, items.length);
  const visibleItemsData = items.slice(startIndex, endIndex);
  
  // คำนวณ offset ด้านบน
  const topOffset = startIndex * itemHeight;
  
  // ฟังก์ชันสำหรับจัดการการเลื่อน
  const handleScroll = () => {
    if (containerRef.current) {
      // คำนวณตำแหน่งเริ่มต้นใหม่
      const scrollTop = containerRef.current.scrollTop;
      const newStartIndex = Math.floor(scrollTop / itemHeight);
      
      // อัปเดตตำแหน่งเริ่มต้น
      setStartIndex(newStartIndex);
    }
  };
  
  // เพิ่ม event listener สำหรับการเลื่อน
  useEffect(() => {
    const container = containerRef.current;
    
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      // ทำความสะอาด event listener
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
  
  return (
    <div
      ref={containerRef}
      className="border rounded-lg overflow-auto"
      style={{ height: visibleItems * itemHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: topOffset, left: 0, right: 0 }}>
          {visibleItemsData.map((item, index) => (
            <div
              key={item.id}
              className="p-3 border-b last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-800"
              style={{ height: itemHeight }}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.name}</span>
                <span className="text-primary">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Virtualization กับ react-window
  const reactWindowCode = `// app/components/ReactWindowList.js
'use client';

import { FixedSizeList } from 'react-window';

// คอมโพเนนต์สำหรับแสดงรายการแบบ virtualized ด้วย react-window
export default function ReactWindowList({ items }) {
  // คอมโพเนนต์สำหรับแสดงรายการ
  const Row = ({ index, style }) => {
    const item = items[index];
    
    return (
      <div
        style={style}
        className="p-3 border-b last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <div className="flex justify-between items-center">
          <span className="font-medium">{item.name}</span>
          <span className="text-primary">{item.value}</span>
        </div>
      </div>
    );
  };
  
  return (
    <FixedSizeList
      height={400}
      width="100%"
      itemCount={items.length}
      itemSize={50}
      className="border rounded-lg"
    >
      {Row}
    </FixedSizeList>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้เทคนิคต่างๆ ในการปรับแต่งประสิทธิภาพของแอปพลิเคชัน Next.js ดังนี้:

1. การปรับแต่งการโหลดหน้า
   - การใช้งาน Image Optimization
   - การใช้งาน Font Optimization
   - การใช้งาน Script Optimization

2. การปรับแต่งการแสดงผล
   - การใช้งาน React.memo
   - การใช้งาน useMemo และ useCallback

3. การปรับแต่งการดึงข้อมูล
   - การใช้งาน React Suspense และ Streaming
   - การใช้งาน Parallel Data Fetching
   - การใช้งาน Route Segment Config

4. การปรับแต่งขนาดของแอปพลิเคชัน
   - การใช้งาน Dynamic Imports
   - การใช้งาน Tree Shaking

5. การปรับแต่งการทำงานของ JavaScript
   - การใช้งาน Web Workers
   - การใช้งาน Virtualization

การปรับแต่งประสิทธิภาพเป็นสิ่งสำคัญในการพัฒนาแอปพลิเคชัน Next.js ที่มีประสิทธิภาพสูง ซึ่งจะช่วยให้ผู้ใช้มีประสบการณ์ที่ดีในการใช้งานแอปพลิเคชันของคุณ`;

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
            <h1 className="text-3xl font-bold mb-2">การปรับแต่งประสิทธิภาพ (Performance Optimization)</h1>
            <p className="text-text-secondary">ตัวอย่างการปรับแต่งประสิทธิภาพใน Next.js</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs mr-2">
              ระดับสูง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              30 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาตัวอย่าง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={exampleContent} />
        <MarkdownContent content={pageLoadOptimizationContent} />
        <CodeBlock code={imageOptimizationCode} language="jsx" fileName="app/components/OptimizedImage.js" />
        <MarkdownContent content={fontOptimizationContent} />
        <CodeBlock code={fontOptimizationCode} language="jsx" fileName="app/layout.js" />
        <CodeBlock code={fontOptimizationCssCode} language="css" fileName="app/globals.css" />
        <MarkdownContent content={scriptOptimizationContent} />
        <CodeBlock code={scriptOptimizationCode} language="jsx" fileName="app/layout.js" />
        <MarkdownContent content={renderingOptimizationContent} />
        <CodeBlock code={reactMemoCode} language="jsx" fileName="app/components/ExpensiveComponent.js" />
        <CodeBlock code={reactMemoWithAreEqualCode} language="jsx" fileName="app/components/OptimizedList.js" />
        <MarkdownContent content={useMemoAndUseCallbackContent} />
        <CodeBlock code={useMemoAndUseCallbackCode} language="jsx" fileName="app/components/DataProcessor.js" />
        <MarkdownContent content={dataFetchingOptimizationContent} />
        <CodeBlock code={reactSuspenseAndStreamingCode} language="jsx" fileName="app/products/page.js" />
        <CodeBlock code={productListAndSkeletonCode} language="jsx" fileName="app/components/ProductList.js" />
        <MarkdownContent content={parallelDataFetchingContent} />
        <CodeBlock code={parallelDataFetchingCode} language="jsx" fileName="app/dashboard/page.js" />
        <MarkdownContent content={routeSegmentConfigContent} />
        <CodeBlock code={routeSegmentConfigCode} language="jsx" fileName="app/products/page.js" />
        <CodeBlock code={dynamicRouteSegmentConfigCode} language="jsx" fileName="app/products/[id]/page.js" />
        <MarkdownContent content={appSizeOptimizationContent} />
        <CodeBlock code={dynamicImportsCode} language="jsx" fileName="app/components/DynamicChart.js" />
        <CodeBlock code={dynamicImportsPageCode} language="jsx" fileName="app/dashboard/page.js" />
        <MarkdownContent content={treeShakingContent} />
        <CodeBlock code={treeShakingCode} language="jsx" fileName="app/utils/helpers.js" />
        <CodeBlock code={goodTreeShakingCode} language="jsx" fileName="app/components/ProductCard.js" />
        <CodeBlock code={badTreeShakingCode} language="jsx" fileName="app/components/BadProductCard.js" />
        <MarkdownContent content={javascriptOptimizationContent} />
        <CodeBlock code={webWorkersCode} language="javascript" fileName="public/workers/calculation-worker.js" />
        <CodeBlock code={webWorkersReactCode} language="jsx" fileName="app/components/ComplexCalculation.js" />
        <MarkdownContent content={virtualizationContent} />
        <CodeBlock code={virtualizationCode} language="jsx" fileName="app/components/VirtualizedList.js" />
        <CodeBlock code={reactWindowCode} language="jsx" fileName="app/components/ReactWindowList.js" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
