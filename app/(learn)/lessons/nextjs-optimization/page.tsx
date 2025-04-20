import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงรายละเอียดบทเรียนการเพิ่มประสิทธิภาพ Next.js
export default function NextjsOptimizationPage() {
  // เนื้อหาบทเรียนในรูปแบบ Markdown
  const lessonContent = `# การเพิ่มประสิทธิภาพ Next.js

การเพิ่มประสิทธิภาพ (Optimization) เป็นสิ่งสำคัญสำหรับแอปพลิเคชัน Next.js โดยเฉพาะเมื่อแอปพลิเคชันมีขนาดใหญ่และมีผู้ใช้งานจำนวนมาก การเพิ่มประสิทธิภาพที่ดีจะช่วยให้แอปพลิเคชันโหลดเร็วขึ้น ตอบสนองได้ดีขึ้น และใช้ทรัพยากรน้อยลง

## การเพิ่มประสิทธิภาพรูปภาพด้วย Next.js Image

Next.js มีคอมโพเนนต์ \`Image\` ที่ช่วยเพิ่มประสิทธิภาพการแสดงรูปภาพโดยอัตโนมัติ ซึ่งมีคุณสมบัติดังนี้:

- การปรับขนาดรูปภาพอัตโนมัติ
- การแปลงรูปภาพเป็นรูปแบบที่มีประสิทธิภาพสูง (WebP, AVIF)
- การโหลดรูปภาพแบบ Lazy Loading
- การป้องกัน Cumulative Layout Shift (CLS)
- การปรับขนาดรูปภาพตามอุปกรณ์ (Responsive Images)`;

  // โค้ดตัวอย่างสำหรับ Next.js Image
  const imageOptimizationCode = `// components/OptimizedImage.tsx
import Image from 'next/image';

// คอมโพเนนต์รูปภาพที่มีการเพิ่มประสิทธิภาพ
export default function OptimizedImage() {
  return (
    <div className="relative">
      {/* รูปภาพแบบปกติ */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">รูปภาพแบบปกติ (ไม่มีการเพิ่มประสิทธิภาพ)</h2>
        <img
          src="/images/large-image.jpg"
          alt="รูปภาพขนาดใหญ่"
          width={800}
          height={600}
          className="rounded-lg"
        />
        <p className="text-text-secondary mt-2">
          รูปภาพแบบปกติจะโหลดไฟล์เต็มขนาดและอาจทำให้เว็บไซต์โหลดช้า
        </p>
      </div>

      {/* รูปภาพที่ใช้ Next.js Image */}
      <div>
        <h2 className="text-xl font-bold mb-2">รูปภาพที่ใช้ Next.js Image</h2>
        <Image
          src="/images/large-image.jpg"
          alt="รูปภาพขนาดใหญ่ที่มีการเพิ่มประสิทธิภาพ"
          width={800}
          height={600}
          quality={80}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          priority={true}
          className="rounded-lg"
        />
        <p className="text-text-secondary mt-2">
          Next.js Image จะปรับขนาดรูปภาพ แปลงรูปแบบไฟล์ และใช้ lazy loading โดยอัตโนมัติ
        </p>
      </div>
    </div>
  );
}

// การกำหนดค่า next.config.js สำหรับ Image Optimization
// next.config.js
module.exports = {
  images: {
    domains: ['example.com', 'cdn.example.com'], // โดเมนที่อนุญาตให้ใช้รูปภาพ
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // ขนาดอุปกรณ์สำหรับ responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // ขนาดรูปภาพสำหรับ srcset
    formats: ['image/webp', 'image/avif'], // รูปแบบไฟล์ที่ใช้
    minimumCacheTTL: 60, // เวลาขั้นต่ำในการแคชรูปภาพ (วินาที)
  },
};`;

  // เนื้อหาเกี่ยวกับ Code Splitting และ Dynamic Imports
  const codeSplittingContent = `## Code Splitting และ Dynamic Imports

Next.js มีการแบ่งโค้ดอัตโนมัติ (Automatic Code Splitting) ตามเส้นทาง (Routes) แต่คุณยังสามารถใช้ Dynamic Imports เพื่อแบ่งโค้ดเพิ่มเติมได้:`;

  // โค้ดตัวอย่างสำหรับ Dynamic Imports
  const dynamicImportsCode = `// components/DynamicComponent.tsx
"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';

// โหลดคอมโพเนนต์แบบ Dynamic
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>กำลังโหลด...</div>,
  ssr: false, // ไม่ต้องเรนเดอร์บนเซิร์ฟเวอร์
});

// โหลดไลบรารีแบบ Dynamic
const DynamicChart = dynamic(() => 
  import('react-chartjs-2').then((mod) => mod.Line)
);

export default function DynamicComponent() {
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);
  const [showChart, setShowChart] = useState(false);
  
  // ข้อมูลสำหรับกราฟ
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
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Dynamic Import สำหรับคอมโพเนนต์ขนาดใหญ่</h2>
        <button
          onClick={() => setShowHeavyComponent(!showHeavyComponent)}
          className="btn btn-primary mb-4"
        >
          {showHeavyComponent ? 'ซ่อนคอมโพเนนต์' : 'แสดงคอมโพเนนต์ขนาดใหญ่'}
        </button>
        
        {showHeavyComponent && <HeavyComponent />}
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Dynamic Import สำหรับไลบรารีภายนอก</h2>
        <button
          onClick={() => setShowChart(!showChart)}
          className="btn btn-primary mb-4"
        >
          {showChart ? 'ซ่อนกราฟ' : 'แสดงกราฟ'}
        </button>
        
        {showChart && (
          <div className="p-4 bg-background rounded-lg">
            <DynamicChart data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับ React Server Components
  const serverComponentsContent = `## การใช้ React Server Components อย่างมีประสิทธิภาพ

React Server Components ใน Next.js 13+ ช่วยเพิ่มประสิทธิภาพโดยการเรนเดอร์คอมโพเนนต์บนเซิร์ฟเวอร์ ซึ่งช่วยลดขนาด JavaScript ที่ส่งไปยังเบราว์เซอร์:`;

  // โค้ดตัวอย่างสำหรับ React Server Components
  const serverComponentsCode = `// app/products/page.tsx
// Server Component (ค่าเริ่มต้น)
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api';

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function fetchProducts() {
  // ดึงข้อมูลบนเซิร์ฟเวอร์ (ไม่ส่ง JavaScript ไปยังเบราว์เซอร์)
  const products = await getProducts();
  return products;
}

export default async function ProductsPage() {
  // ดึงข้อมูลบนเซิร์ฟเวอร์
  const products = await fetchProducts();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">สินค้าทั้งหมด</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// components/ProductCard.tsx
// Client Component (เฉพาะส่วนที่ต้องการ interactivity)
"use client"

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-surface rounded-lg overflow-hidden shadow-md">
      <div className="relative h-48">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-primary font-bold">{product.price} บาท</p>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-text-secondary hover:text-primary text-sm mt-2"
        >
          {isExpanded ? 'แสดงน้อยลง' : 'ดูรายละเอียดเพิ่มเติม'}
        </button>
        
        {isExpanded && (
          <p className="mt-2 text-text-secondary">{product.description}</p>
        )}
        
        <button className="btn btn-primary w-full mt-4">
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับ Caching และ Revalidation
  const cachingContent = `## Caching และ Revalidation

Next.js 13+ มีระบบแคชที่ทรงพลังซึ่งช่วยเพิ่มประสิทธิภาพการโหลดข้อมูล:`;

  // โค้ดตัวอย่างสำหรับ Caching และ Revalidation
  const cachingCode = `// lib/api.ts
// ฟังก์ชันสำหรับดึงข้อมูลสินค้าทั้งหมด
export async function getProducts() {
  // ดึงข้อมูลและแคชไว้ (ค่าเริ่มต้น)
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache', // แคชข้อมูลไว้ (Static Data Fetching)
  });
  
  if (!res.ok) {
    throw new Error('ไม่สามารถดึงข้อมูลสินค้าได้');
  }
  
  return res.json();
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าแบบ Dynamic
export async function getProductsDynamic() {
  // ดึงข้อมูลใหม่ทุกครั้ง
  const res = await fetch('https://api.example.com/products', {
    cache: 'no-store', // ไม่แคชข้อมูล (Dynamic Data Fetching)
  });
  
  if (!res.ok) {
    throw new Error('ไม่สามารถดึงข้อมูลสินค้าได้');
  }
  
  return res.json();
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าแบบ ISR
export async function getProductsISR() {
  // ดึงข้อมูลและแคชไว้ แต่จะดึงใหม่ทุก 60 วินาที
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 }, // Incremental Static Regeneration (ISR)
  });
  
  if (!res.ok) {
    throw new Error('ไม่สามารถดึงข้อมูลสินค้าได้');
  }
  
  return res.json();
}

// app/api/revalidate/route.ts
// API Route สำหรับ On-Demand Revalidation
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  // รับ secret token จาก request
  const token = request.nextUrl.searchParams.get('token');
  
  // ตรวจสอบ token
  if (token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  try {
    // รับข้อมูลจาก request body
    const body = await request.json();
    
    if (body.path) {
      // Revalidate ตาม path
      revalidatePath(body.path);
      return NextResponse.json({ revalidated: true, path: body.path });
    }
    
    if (body.tag) {
      // Revalidate ตาม tag
      revalidateTag(body.tag);
      return NextResponse.json({ revalidated: true, tag: body.tag });
    }
    
    return NextResponse.json(
      { error: 'No path or tag provided' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}`;

  // เนื้อหาเกี่ยวกับ Bundle Analyzer
  const bundleAnalyzerContent = `## การวิเคราะห์ Bundle Size ด้วย Bundle Analyzer

การวิเคราะห์ขนาดของ JavaScript bundle เป็นสิ่งสำคัญในการเพิ่มประสิทธิภาพแอปพลิเคชัน Next.js คุณสามารถใช้ \`@next/bundle-analyzer\` เพื่อวิเคราะห์ขนาด bundle:`;

  // โค้ดตัวอย่างสำหรับ Bundle Analyzer
  const bundleAnalyzerCode = `// ติดตั้ง @next/bundle-analyzer
// npm install --save-dev @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ค่าคอนฟิกอื่นๆ ของ Next.js
});

// วิธีการใช้งาน
// ANALYZE=true npm run build

// เทคนิคการลดขนาด bundle
// 1. ใช้ Dynamic Imports
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>กำลังโหลด...</div>,
  ssr: false,
});

// 2. ใช้ React.lazy สำหรับ Client Components
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// 3. ใช้ Tree Shaking โดยการ import เฉพาะส่วนที่ใช้
// แบบไม่ดี
import _ from 'lodash';
const result = _.cloneDeep(obj);

// แบบดี
import cloneDeep from 'lodash/cloneDeep';
const result = cloneDeep(obj);`;

  // เนื้อหาเกี่ยวกับ Web Vitals
  const webVitalsContent = `## การวัดและปรับปรุง Web Vitals

Web Vitals เป็นชุดเมตริกที่ Google ใช้วัดประสบการณ์ผู้ใช้ของเว็บไซต์ Next.js มีเครื่องมือสำหรับวัดและรายงาน Web Vitals:`;

  // โค้ดตัวอย่างสำหรับ Web Vitals
  const webVitalsCode = `// lib/web-vitals.ts
import { NextWebVitalsMetric } from 'next/app';

// ฟังก์ชันสำหรับส่งข้อมูล Web Vitals ไปยัง Analytics
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // ส่งข้อมูลไปยัง Analytics (เช่น Google Analytics)
  console.log(metric);
  
  // ตัวอย่างการส่งข้อมูลไปยัง Google Analytics
  const analyticsId = 'UA-XXXXX-Y'; // แทนที่ด้วย ID ของคุณ
  
  if (analyticsId && typeof window !== 'undefined') {
    // ส่งข้อมูลไปยัง Google Analytics
    window.gtag?.('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

// app/layout.tsx
import { reportWebVitals } from '@/lib/web-vitals';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  reportWebVitals(metric);
}

// เทคนิคการปรับปรุง Web Vitals
// 1. ปรับปรุง LCP (Largest Contentful Paint)
// - ใช้ Image component ของ Next.js
// - ใช้ priority={true} สำหรับรูปภาพที่สำคัญ
// - ใช้ preload สำหรับฟอนต์และทรัพยากรสำคัญ

// 2. ปรับปรุง FID (First Input Delay) และ INP (Interaction to Next Paint)
// - ลดขนาด JavaScript bundle
// - แบ่ง JavaScript bundle ด้วย Dynamic Imports
// - หลีกเลี่ยงการทำงานที่ใช้เวลานานใน main thread

// 3. ปรับปรุง CLS (Cumulative Layout Shift)
// - กำหนดขนาดรูปภาพล่วงหน้า
// - ใช้ placeholder สำหรับเนื้อหาที่โหลดช้า
// - หลีกเลี่ยงการเพิ่มเนื้อหาเหนือเนื้อหาที่มีอยู่แล้ว`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในบทเรียนนี้ คุณได้เรียนรู้เกี่ยวกับ:

- การเพิ่มประสิทธิภาพรูปภาพด้วย Next.js Image
- Code Splitting และ Dynamic Imports
- การใช้ React Server Components อย่างมีประสิทธิภาพ
- Caching และ Revalidation
- การวิเคราะห์ Bundle Size ด้วย Bundle Analyzer
- การวัดและปรับปรุง Web Vitals

การเพิ่มประสิทธิภาพเป็นกระบวนการต่อเนื่องที่ควรทำตลอดการพัฒนาแอปพลิเคชัน Next.js การใช้เทคนิคที่เหมาะสมจะช่วยให้แอปพลิเคชันของคุณโหลดเร็วขึ้น ตอบสนองได้ดีขึ้น และมอบประสบการณ์ที่ดีให้กับผู้ใช้

ขอแสดงความยินดี! คุณได้เรียนจบหลักสูตร Next.js สำหรับการพัฒนาแอปพลิเคชันระดับองค์กรแล้ว คุณสามารถนำความรู้ที่ได้ไปพัฒนาแอปพลิเคชัน Next.js ที่มีประสิทธิภาพสูงและขยายขนาดได้ง่าย`;

  return (
    <div className="container mx-auto py-8">
      {/* ส่วนหัวของบทเรียน */}
      <div className="mb-8">
        <div className="flex items-center text-text-secondary mb-4">
          <Link href="/lessons" className="flex items-center hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            กลับไปยังรายการบทเรียน
          </Link>
        </div>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">การเพิ่มประสิทธิภาพ Next.js</h1>
            <p className="text-text-secondary">เรียนรู้เทคนิคการเพิ่มประสิทธิภาพแอปพลิเคชัน Next.js</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs mr-2">
              ระดับสูง
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              40 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาบทเรียน */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={lessonContent} lessonId="6" />
        <CodeBlock code={imageOptimizationCode} language="typescript" fileName="components/OptimizedImage.tsx" />
        <MarkdownContent content={codeSplittingContent} />
        <CodeBlock code={dynamicImportsCode} language="typescript" fileName="components/DynamicComponent.tsx" />
        <MarkdownContent content={serverComponentsContent} />
        <CodeBlock code={serverComponentsCode} language="typescript" fileName="Server Components Example" />
        <MarkdownContent content={cachingContent} />
        <CodeBlock code={cachingCode} language="typescript" fileName="Caching and Revalidation" />
        <MarkdownContent content={bundleAnalyzerContent} />
        <CodeBlock code={bundleAnalyzerCode} language="typescript" fileName="Bundle Analyzer Setup" />
        <MarkdownContent content={webVitalsContent} />
        <CodeBlock code={webVitalsCode} language="typescript" fileName="Web Vitals Monitoring" />
        <MarkdownContent content={summaryContent} />
        
        {/* ปุ่มนำทาง */}
        <div className="mt-12 pt-6 border-t border-text-secondary/10 flex justify-between">
          <Link href="/lessons/advanced-state-management" className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            บทเรียนก่อนหน้า: การจัดการสถานะขั้นสูง
          </Link>
          <div></div> {/* ไม่มีบทเรียนถัดไป */}
        </div>
      </div>
      
      {/* แบบฝึกหัดที่เกี่ยวข้อง */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">แบบฝึกหัดที่เกี่ยวข้อง</h2>
        <div className="bg-surface p-6 rounded-lg">
          <Link href="/exercises/6" className="block hover:bg-background rounded-lg p-4 transition-colors">
            <h3 className="font-bold mb-1">เพิ่มประสิทธิภาพแอปพลิเคชัน Next.js</h3>
            <p className="text-text-secondary">ฝึกการใช้เทคนิคต่างๆ ในการเพิ่มประสิทธิภาพแอปพลิเคชัน Next.js</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
