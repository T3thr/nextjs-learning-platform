"use client";

import React, { Suspense } from 'react';
import CodeEditor from '@/components/CodeEditor';
import Link from 'next/link';

// หน้าแสดงรายละเอียดแบบฝึกหัดเพิ่มประสิทธิภาพการโหลดข้อมูล
export default function PerformanceOptimizationExercisePage() {
  // ข้อมูลแบบฝึกหัด
  const exercise = {
    id: '6',
    title: 'เพิ่มประสิทธิภาพการโหลดข้อมูล',
    description: 'ฝึกการใช้เทคนิคต่างๆ เพื่อเพิ่มประสิทธิภาพการโหลดข้อมูลใน Next.js',
    difficulty: 'advanced',
    points: 35,
    lessonId: '6',
    lessonTitle: 'การเพิ่มประสิทธิภาพ Next.js',
    instructions: `# เพิ่มประสิทธิภาพการโหลดข้อมูล

ในแบบฝึกหัดนี้ คุณจะได้ฝึกการใช้เทคนิคต่างๆ เพื่อเพิ่มประสิทธิภาพการโหลดข้อมูลใน Next.js โดยใช้ความรู้ที่ได้เรียนมาจากบทเรียน "การเพิ่มประสิทธิภาพ Next.js"

## ขั้นตอน

1. ใช้ Incremental Static Regeneration (ISR) เพื่อปรับปรุงข้อมูลแบบเรียลไทม์
2. ใช้ Streaming และ Suspense เพื่อแสดงข้อมูลแบบทยอยโหลด
3. ใช้ Parallel Data Fetching เพื่อโหลดข้อมูลพร้อมกัน
4. ใช้ React Cache และ Preloading เพื่อเพิ่มประสิทธิภาพการโหลดข้อมูล
5. ใช้ Route Groups เพื่อจัดการการโหลดข้อมูลในเส้นทางต่างๆ

## เกณฑ์การให้คะแนน

- ใช้ Incremental Static Regeneration (ISR) ถูกต้อง (7 คะแนน)
- ใช้ Streaming และ Suspense ถูกต้อง (7 คะแนน)
- ใช้ Parallel Data Fetching ถูกต้อง (7 คะแนน)
- ใช้ React Cache และ Preloading ถูกต้อง (7 คะแนน)
- ใช้ Route Groups ถูกต้อง (7 คะแนน)`,
    starterCode: `// หน้าแสดงรายละเอียดสินค้าที่ต้องการเพิ่มประสิทธิภาพ

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function getProduct(id) {
  const res = await fetch(\`https://api.example.com/products/\${id}\`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

// ฟังก์ชันสำหรับดึงข้อมูลรีวิว
async function getReviews(id) {
  const res = await fetch(\`https://api.example.com/products/\${id}/reviews\`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าที่เกี่ยวข้อง
async function getRelatedProducts(id) {
  const res = await fetch(\`https://api.example.com/products/\${id}/related\`);
  if (!res.ok) throw new Error('Failed to fetch related products');
  return res.json();
}

export default async function ProductPage({ params }) {
  const id = params.id;
  
  // ดึงข้อมูลสินค้า
  const product = await getProduct(id);
  
  // ดึงข้อมูลรีวิว
  const reviews = await getReviews(id);
  
  // ดึงข้อมูลสินค้าที่เกี่ยวข้อง
  const relatedProducts = await getRelatedProducts(id);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>฿{product.price}</p>
      
      <h2>รีวิวสินค้า</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>{review.text}</p>
            <p>คะแนน: {review.rating}/5</p>
          </li>
        ))}
      </ul>
      
      <h2>สินค้าที่เกี่ยวข้อง</h2>
      <ul>
        {relatedProducts.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>฿{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    solutionCode: `// หน้าแสดงรายละเอียดสินค้าที่มีการเพิ่มประสิทธิภาพ
import { Suspense } from 'react';
import { unstable_cache } from 'next/cache';

// ใช้ React Cache เพื่อแคชข้อมูลและป้องกันการดึงข้อมูลซ้ำ
const getProductCached = unstable_cache(
  async (id) => {
    const res = await fetch(\`https://api.example.com/products/\${id}\`, {
      next: { revalidate: 60 } // ใช้ ISR เพื่อปรับปรุงข้อมูลทุก 60 วินาที
    });
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },
  ['product'],
  { revalidate: 60 }
);

// ฟังก์ชันสำหรับดึงข้อมูลรีวิว
async function getReviews(id) {
  const res = await fetch(\`https://api.example.com/products/\${id}/reviews\`, {
    next: { revalidate: 30 } // ปรับปรุงข้อมูลรีวิวบ่อยกว่าข้อมูลสินค้า
  });
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าที่เกี่ยวข้อง
async function getRelatedProducts(id) {
  const res = await fetch(\`https://api.example.com/products/\${id}/related\`, {
    next: { revalidate: 120 } // ปรับปรุงข้อมูลสินค้าที่เกี่ยวข้องน้อยกว่า
  });
  if (!res.ok) throw new Error('Failed to fetch related products');
  return res.json();
}

// คอมโพเนนต์สำหรับแสดงข้อมูลรีวิว
async function ReviewsList({ id }) {
  // ดึงข้อมูลรีวิว
  const reviews = await getReviews(id);
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">รีวิวสินค้า</h2>
      {reviews.length === 0 ? (
        <p>ยังไม่มีรีวิวสำหรับสินค้านี้</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map(review => (
            <li key={review.id} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={i < review.rating ? "fill-current" : "stroke-current"} width="16" height="16" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">คะแนน: {review.rating}/5</span>
              </div>
              <p className="text-gray-700">{review.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// คอมโพเนนต์สำหรับแสดงสินค้าที่เกี่ยวข้อง
async function RelatedProducts({ id }) {
  // ดึงข้อมูลสินค้าที่เกี่ยวข้อง
  const relatedProducts = await getRelatedProducts(id);
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">สินค้าที่เกี่ยวข้อง</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {relatedProducts.map(product => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <p className="text-lg font-bold text-blue-600">฿{product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// คอมโพเนนต์สำหรับแสดงสถานะการโหลด
function LoadingComponent({ message }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></div>
      <p>{message}</p>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const id = params.id;
  
  // ใช้ Parallel Data Fetching เพื่อดึงข้อมูลพร้อมกัน
  const productPromise = getProductCached(id);
  
  // ดึงข้อมูลสินค้าก่อน
  const product = await productPromise;
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ข้อมูลสินค้าหลัก */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-2xl font-bold text-blue-600">฿{product.price.toLocaleString()}</p>
      </div>
      
      {/* ใช้ Suspense และ Streaming เพื่อแสดงข้อมูลแบบทยอยโหลด */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* รีวิวสินค้า */}
        <Suspense fallback={<LoadingComponent message="กำลังโหลดรีวิว..." />}>
          <ReviewsList id={id} />
        </Suspense>
        
        {/* สินค้าที่เกี่ยวข้อง */}
        <Suspense fallback={<LoadingComponent message="กำลังโหลดสินค้าที่เกี่ยวข้อง..." />}>
          <RelatedProducts id={id} />
        </Suspense>
      </div>
    </div>
  );
}

// ใช้ generateStaticParams เพื่อสร้างหน้าแบบ Static ล่วงหน้า
export async function generateStaticParams() {
  // ดึงรายการ ID ของสินค้ายอดนิยม
  const res = await fetch('https://api.example.com/products/popular');
  const products = await res.json();
  
  // สร้างพารามิเตอร์สำหรับสินค้ายอดนิยม
  return products.map(product => ({
    id: product.id.toString(),
  }));
}`,
    testCases: `// ตรวจสอบว่ามีการใช้ ISR
expect(code).toContain("revalidate");

// ตรวจสอบว่ามีการใช้ Suspense
expect(code).toContain("Suspense");

// ตรวจสอบว่ามีการใช้ Parallel Data Fetching
expect(code).toContain("productPromise");

// ตรวจสอบว่ามีการใช้ React Cache
expect(code).toContain("unstable_cache");

// ตรวจสอบว่ามีการใช้ generateStaticParams
expect(code).toContain("generateStaticParams");`,
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
            <span className="badge bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs mr-2">
              ระดับสูง
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
