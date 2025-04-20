import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการใช้งาน Server Components ใน Next.js
export default function ServerComponentsExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# Server Components ใน Next.js

Server Components เป็นฟีเจอร์สำคัญของ Next.js ที่ช่วยให้คุณสามารถเขียนโค้ด React ที่ทำงานบนเซิร์ฟเวอร์ได้ ซึ่งช่วยเพิ่มประสิทธิภาพและความเร็วของแอปพลิเคชัน ในตัวอย่างนี้ เราจะแสดงวิธีการใช้งาน Server Components ใน Next.js และการประยุกต์ใช้งานในสถานการณ์ต่างๆ

## ประโยชน์ของ Server Components

1. **ลดขนาดของ JavaScript ที่ส่งไปยังเบราว์เซอร์**: โค้ดที่ทำงานบนเซิร์ฟเวอร์จะไม่ถูกส่งไปยังเบราว์เซอร์
2. **เข้าถึงทรัพยากรบนเซิร์ฟเวอร์ได้โดยตรง**: เช่น ฐานข้อมูล, ไฟล์ระบบ, หรือ APIs ที่ต้องการความปลอดภัย
3. **การเรนเดอร์ที่เร็วขึ้น**: เนื่องจากการประมวลผลส่วนใหญ่เกิดขึ้นบนเซิร์ฟเวอร์
4. **การโหลดข้อมูลที่มีประสิทธิภาพ**: สามารถโหลดข้อมูลได้โดยตรงบนเซิร์ฟเวอร์โดยไม่ต้องผ่าน API endpoints
5. **SEO ที่ดีขึ้น**: เนื้อหาถูกเรนเดอร์บนเซิร์ฟเวอร์ ทำให้ search engines สามารถเข้าถึงได้ง่าย`;

  // เนื้อหาเกี่ยวกับพื้นฐานของ Server Components
  const serverComponentsBasicsContent = `## พื้นฐานของ Server Components

ใน Next.js 13+ ที่ใช้ App Router, ทุกคอมโพเนนต์จะเป็น Server Component โดยค่าเริ่มต้น เว้นแต่จะระบุว่าเป็น Client Component ด้วย 'use client' directive:`;

  // โค้ดตัวอย่างสำหรับ Server Component พื้นฐาน
  const basicServerComponentCode = `// app/server-component-example/page.tsx

// ไม่ต้องใส่ 'use client' เพราะเป็น Server Component โดยค่าเริ่มต้น
import React from 'react';

// ฟังก์ชันสำหรับดึงข้อมูลจาก API
async function fetchData() {
  // ในฟังก์ชันนี้เราสามารถใช้ async/await ได้โดยตรง
  // เพราะ Server Components รองรับ top-level await
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  
  // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
  if (!response.ok) {
    throw new Error('เกิดข้อผิดพลาดในการเรียกใช้ API');
  }
  
  // แปลงข้อมูลการตอบกลับเป็น JSON
  return response.json();
}

// Server Component
export default async function ServerComponentExample() {
  // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูล
  // สังเกตว่าเราสามารถใช้ await ได้โดยตรงในคอมโพเนนต์
  const posts = await fetchData();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">บทความจาก API</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.slice(0, 9).map((post: any) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการดึงข้อมูลใน Server Components
  const dataFetchingContent = `## การดึงข้อมูลใน Server Components

หนึ่งในประโยชน์หลักของ Server Components คือความสามารถในการดึงข้อมูลได้โดยตรงในคอมโพเนนต์ โดยไม่ต้องใช้ hooks เช่น useEffect หรือ useState:`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลใน Server Components
  const dataFetchingCode = `// app/products/page.tsx

// ไม่ต้องใส่ 'use client' เพราะเป็น Server Component โดยค่าเริ่มต้น
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ประเภทข้อมูลสำหรับสินค้า
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function fetchProducts(): Promise<Product[]> {
  // ดึงข้อมูลจาก API
  const response = await fetch('https://fakestoreapi.com/products');
  
  // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
  if (!response.ok) {
    throw new Error('เกิดข้อผิดพลาดในการเรียกใช้ API');
  }
  
  // แปลงข้อมูลการตอบกลับเป็น JSON
  return response.json();
}

// Server Component
export default async function ProductsPage() {
  // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลสินค้า
  const products = await fetchProducts();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">สินค้าทั้งหมด</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden bg-surface">
            <div className="relative h-48 bg-white">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'contain', padding: '0.5rem' }}
              />
            </div>
            
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 line-clamp-1">{product.title}</h2>
              
              <p className="text-text-secondary mb-2 line-clamp-2">{product.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.price}</span>
                
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{product.rating.rate}</span>
                  <span className="text-text-secondary ml-1">({product.rating.count})</span>
                </div>
              </div>
              
              <Link
                href={\`/products/\${product.id}\`}
                className="mt-4 block w-full text-center py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity"
              >
                ดูรายละเอียด
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลสินค้าตาม ID
  const productDetailCode = `// app/products/[id]/page.tsx

// ไม่ต้องใส่ 'use client' เพราะเป็น Server Component โดยค่าเริ่มต้น
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ประเภทข้อมูลสำหรับสินค้า
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าตาม ID
async function fetchProduct(id: string): Promise<Product | null> {
  try {
    // ดึงข้อมูลจาก API
    const response = await fetch(\`https://fakestoreapi.com/products/\${id}\`);
    
    // ถ้าไม่พบสินค้า
    if (response.status === 404) {
      return null;
    }
    
    // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
    if (!response.ok) {
      throw new Error('เกิดข้อผิดพลาดในการเรียกใช้ API');
    }
    
    // แปลงข้อมูลการตอบกลับเป็น JSON
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าที่เกี่ยวข้อง
async function fetchRelatedProducts(category: string, currentId: number): Promise<Product[]> {
  try {
    // ดึงข้อมูลจาก API
    const response = await fetch(\`https://fakestoreapi.com/products/category/\${encodeURIComponent(category)}\`);
    
    // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
    if (!response.ok) {
      throw new Error('เกิดข้อผิดพลาดในการเรียกใช้ API');
    }
    
    // แปลงข้อมูลการตอบกลับเป็น JSON
    const products: Product[] = await response.json();
    
    // กรองสินค้าที่ไม่ใช่สินค้าปัจจุบัน
    return products.filter(product => product.id !== currentId).slice(0, 4);
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

// ประเภทข้อมูลสำหรับ props
interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

// Server Component
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลสินค้า
  const product = await fetchProduct(params.id);
  
  // ถ้าไม่พบสินค้า
  if (!product) {
    // ใช้ฟังก์ชัน notFound จาก Next.js เพื่อแสดงหน้า 404
    notFound();
  }
  
  // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลสินค้าที่เกี่ยวข้อง
  const relatedProducts = await fetchRelatedProducts(product.category, product.id);
  
  return (
    <div className="container mx-auto p-4">
      <Link
        href="/products"
        className="inline-flex items-center text-text-secondary hover:text-primary mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        กลับไปยังรายการสินค้า
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative h-80 md:h-96 bg-white rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'contain', padding: '1rem' }}
            priority
          />
        </div>
        
        <div>
          <span className="inline-block px-3 py-1 bg-surface-secondary text-text-secondary rounded-full text-sm mb-4">
            {product.category}
          </span>
          
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{product.rating.rate}</span>
            </div>
            <span className="text-text-secondary">{product.rating.count} รีวิว</span>
          </div>
          
          <p className="text-2xl font-bold mb-6">${product.price}</p>
          
          <p className="mb-6">{product.description}</p>
          
          <button className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">สินค้าที่เกี่ยวข้อง</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="border rounded-lg overflow-hidden bg-surface">
                <div className="relative h-48 bg-white">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: 'contain', padding: '0.5rem' }}
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-1">{relatedProduct.title}</h3>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">${relatedProduct.price}</span>
                    
                    <Link
                      href={\`/products/\${relatedProduct.id}\`}
                      className="text-primary hover:underline"
                    >
                      ดูรายละเอียด
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Server Components กับฐานข้อมูล
  const databaseContent = `## การใช้งาน Server Components กับฐานข้อมูล

Server Components สามารถเข้าถึงฐานข้อมูลได้โดยตรง โดยไม่ต้องผ่าน API endpoints:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Server Components กับฐานข้อมูล
  const databaseCode = `// app/users/page.tsx

// ไม่ต้องใส่ 'use client' เพราะเป็น Server Component โดยค่าเริ่มต้น
import React from 'react';
import Link from 'next/link';
import { db } from '@/backend/db';
import { users } from '@/backend/db/schema/users';

// Server Component
export default async function UsersPage() {
  // ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยตรง
  // สังเกตว่าเราสามารถเข้าถึงฐานข้อมูลได้โดยตรงใน Server Component
  const allUsers = await db.select().from(users);
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">ผู้ใช้ทั้งหมด</h1>
        
        <Link
          href="/users/new"
          className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity"
        >
          เพิ่มผู้ใช้ใหม่
        </Link>
      </div>
      
      <div className="bg-surface rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-secondary">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">ชื่อ</th>
              <th className="py-3 px-4 text-left">อีเมล</th>
              <th className="py-3 px-4 text-left">วันที่สร้าง</th>
              <th className="py-3 px-4 text-right">การกระทำ</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id} className="border-t border-surface-secondary">
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={\`/users/\${user.id}\`}
                    className="text-primary hover:underline mr-3"
                  >
                    ดูรายละเอียด
                  </Link>
                  <Link
                    href={\`/users/\${user.id}/edit\`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    แก้ไข
                  </Link>
                </td>
              </tr>
            ))}
            
            {allUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 px-4 text-center text-text-secondary">
                  ไม่พบผู้ใช้
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// app/users/[id]/page.tsx

// ไม่ต้องใส่ 'use client' เพราะเป็น Server Component โดยค่าเริ่มต้น
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/backend/db';
import { users } from '@/backend/db/schema/users';
import { eq } from 'drizzle-orm';

// ประเภทข้อมูลสำหรับ props
interface UserDetailPageProps {
  params: {
    id: string;
  };
}

// Server Component
export default async function UserDetailPage({ params }: UserDetailPageProps) {
  // แปลง ID จากสตริงเป็นตัวเลข
  const userId = parseInt(params.id);
  
  // ดึงข้อมูลผู้ใช้จากฐานข้อมูลโดยตรง
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  
  // ถ้าไม่พบผู้ใช้
  if (user.length === 0) {
    // ใช้ฟังก์ชัน notFound จาก Next.js เพื่อแสดงหน้า 404
    notFound();
  }
  
  // ดึงข้อมูลผู้ใช้
  const userData = user[0];
  
  return (
    <div className="container mx-auto p-4">
      <Link
        href="/users"
        className="inline-flex items-center text-text-secondary hover:text-primary mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        กลับไปยังรายการผู้ใช้
      </Link>
      
      <div className="bg-surface rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">ข้อมูลผู้ใช้</h1>
          
          <Link
            href={\`/users/\${userData.id}/edit\`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:opacity-90 transition-opacity"
          >
            แก้ไขข้อมูล
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">ข้อมูลทั่วไป</h2>
            
            <div className="bg-surface-secondary rounded-lg p-4">
              <div className="mb-4">
                <p className="text-text-secondary mb-1">ID</p>
                <p className="font-medium">{userData.id}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-text-secondary mb-1">ชื่อ</p>
                <p className="font-medium">{userData.name}</p>
              </div>
              
              <div>
                <p className="text-text-secondary mb-1">อีเมล</p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-2">ข้อมูลเพิ่มเติม</h2>
            
            <div className="bg-surface-secondary rounded-lg p-4">
              <div className="mb-4">
                <p className="text-text-secondary mb-1">วันที่สร้าง</p>
                <p className="font-medium">
                  {new Date(userData.createdAt).toLocaleString()}
                </p>
              </div>
              
              <div>
                <p className="text-text-secondary mb-1">สถานะ</p>
                <p className="inline-block px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm">
                  ใช้งาน
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Server Components กับ Client Components
  const mixingComponentsContent = `## การใช้งาน Server Components กับ Client Components

ในแอปพลิเคชันจริง คุณจะต้องใช้ทั้ง Server Components และ Client Components ร่วมกัน:`;

  // โค้ดตัวอย่างสำหรับ Client Component
  const clientComponentCode = `// components/AddToCartButton.tsx

// ระบุว่าเป็น Client Component ด้วย 'use client' directive
'use client';

import React, { useState } from 'react';

// ประเภทข้อมูลสำหรับ props
interface AddToCartButtonProps {
  productId: number;
  productName: string;
}

// Client Component
export default function AddToCartButton({ productId, productName }: AddToCartButtonProps) {
  // สร้าง state สำหรับเก็บจำนวนสินค้า
  const [quantity, setQuantity] = useState<number>(1);
  // สร้าง state สำหรับเก็บสถานะการเพิ่มสินค้าลงตะกร้า
  const [isAdding, setIsAdding] = useState<boolean>(false);
  // สร้าง state สำหรับเก็บข้อความแจ้งเตือน
  const [notification, setNotification] = useState<string | null>(null);

  // ฟังก์ชันสำหรับเพิ่มจำนวนสินค้า
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // ฟังก์ชันสำหรับลดจำนวนสินค้า
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // ฟังก์ชันสำหรับเพิ่มสินค้าลงตะกร้า
  const addToCart = async () => {
    try {
      // ตั้งค่าสถานะการเพิ่มสินค้าลงตะกร้าเป็น true
      setIsAdding(true);
      
      // จำลองการเรียกใช้ API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // แสดงข้อความแจ้งเตือน
      setNotification(\`เพิ่ม \${productName} จำนวน \${quantity} ชิ้นลงตะกร้าแล้ว\`);
      
      // ซ่อนข้อความแจ้งเตือนหลังจาก 3 วินาที
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      // ตั้งค่าสถานะการเพิ่มสินค้าลงตะกร้าเป็น false
      setIsAdding(false);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <button
          onClick={decreaseQuantity}
          className="w-10 h-10 flex items-center justify-center bg-surface-secondary rounded-l-md"
        >
          -
        </button>
        
        <div className="w-16 h-10 flex items-center justify-center border-t border-b border-surface-secondary">
          {quantity}
        </div>
        
        <button
          onClick={increaseQuantity}
          className="w-10 h-10 flex items-center justify-center bg-surface-secondary rounded-r-md"
        >
          +
        </button>
      </div>
      
      <button
        onClick={addToCart}
        disabled={isAdding}
        className="w-full px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {isAdding ? 'กำลังเพิ่ม...' : 'เพิ่มลงตะกร้า'}
      </button>
      
      {notification && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md">
          {notification}
        </div>
      )}
    </div>
  );
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Server Components กับ Client Components
  const mixingComponentsCode = `// app/products/[id]/page.tsx

// ไม่ต้องใส่ 'use client' เพราะเป็น Server Component โดยค่าเริ่มต้น
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

// ประเภทข้อมูลสำหรับสินค้า
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าตาม ID
async function fetchProduct(id: string): Promise<Product | null> {
  try {
    // ดึงข้อมูลจาก API
    const response = await fetch(\`https://fakestoreapi.com/products/\${id}\`);
    
    // ถ้าไม่พบสินค้า
    if (response.status === 404) {
      return null;
    }
    
    // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
    if (!response.ok) {
      throw new Error('เกิดข้อผิดพลาดในการเรียกใช้ API');
    }
    
    // แปลงข้อมูลการตอบกลับเป็น JSON
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// ประเภทข้อมูลสำหรับ props
interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

// Server Component
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลสินค้า
  const product = await fetchProduct(params.id);
  
  // ถ้าไม่พบสินค้า
  if (!product) {
    // ใช้ฟังก์ชัน notFound จาก Next.js เพื่อแสดงหน้า 404
    notFound();
  }
  
  return (
    <div className="container mx-auto p-4">
      <Link
        href="/products"
        className="inline-flex items-center text-text-secondary hover:text-primary mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        กลับไปยังรายการสินค้า
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-80 md:h-96 bg-white rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'contain', padding: '1rem' }}
            priority
          />
        </div>
        
        <div>
          <span className="inline-block px-3 py-1 bg-surface-secondary text-text-secondary rounded-full text-sm mb-4">
            {product.category}
          </span>
          
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{product.rating.rate}</span>
            </div>
            <span className="text-text-secondary">{product.rating.count} รีวิว</span>
          </div>
          
          <p className="text-2xl font-bold mb-6">${product.price}</p>
          
          <p className="mb-6">{product.description}</p>
          
          {/* ใช้ Client Component ใน Server Component */}
          <AddToCartButton productId={product.id} productName={product.title} />
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการส่งข้อมูลจาก Server Components ไปยัง Client Components
  const passingDataContent = `## การส่งข้อมูลจาก Server Components ไปยัง Client Components

คุณสามารถส่งข้อมูลจาก Server Components ไปยัง Client Components ผ่าน props ได้:`;

  // โค้ดตัวอย่างสำหรับการส่งข้อมูลจาก Server Components ไปยัง Client Components
  const passingDataCode = `// components/ProductReviews.tsx

// ระบุว่าเป็น Client Component ด้วย 'use client' directive
'use client';

import React, { useState } from 'react';

// ประเภทข้อมูลสำหรับรีวิว
interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

// ประเภทข้อมูลสำหรับ props
interface ProductReviewsProps {
  productId: number;
  initialReviews: Review[];
}

// Client Component
export default function ProductReviews({ productId, initialReviews }: ProductReviewsProps) {
  // สร้าง state สำหรับเก็บรีวิว
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  // สร้าง state สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    username: '',
    rating: 5,
    comment: '',
  });
  // สร้าง state สำหรับเก็บสถานะการส่งฟอร์ม
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // สร้าง state สำหรับเก็บข้อความแจ้งเตือน
  const [notification, setNotification] = useState<string | null>(null);

  // ฟังก์ชันสำหรับอัปเดตข้อมูลฟอร์ม
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  // ฟังก์ชันสำหรับส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
      if (!formData.username || !formData.comment) {
        setNotification('กรุณากรอกชื่อผู้ใช้และความคิดเห็น');
        
        // ซ่อนข้อความแจ้งเตือนหลังจาก 3 วินาที
        setTimeout(() => {
          setNotification(null);
        }, 3000);
        
        return;
      }
      
      // ตั้งค่าสถานะการส่งฟอร์มเป็น true
      setIsSubmitting(true);
      
      // จำลองการเรียกใช้ API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // สร้างรีวิวใหม่
      const newReview: Review = {
        id: Date.now(),
        username: formData.username,
        rating: formData.rating,
        comment: formData.comment,
        date: new Date().toISOString(),
      };
      
      // เพิ่มรีวิวใหม่ลงใน state
      setReviews(prev => [newReview, ...prev]);
      
      // รีเซ็ตฟอร์ม
      setFormData({
        username: '',
        rating: 5,
        comment: '',
      });
      
      // แสดงข้อความแจ้งเตือน
      setNotification('เพิ่มรีวิวสำเร็จ');
      
      // ซ่อนข้อความแจ้งเตือนหลังจาก 3 วินาที
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
      setNotification('เกิดข้อผิดพลาดในการเพิ่มรีวิว');
      
      // ซ่อนข้อความแจ้งเตือนหลังจาก 3 วินาที
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } finally {
      // ตั้งค่าสถานะการส่งฟอร์มเป็น false
      setIsSubmitting(false);
    }
  };

  // ฟังก์ชันสำหรับแสดงดาวตามคะแนน
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={index < rating ? 'text-yellow-500' : 'text-text-secondary'}>
        ★
      </span>
    ));
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">รีวิวสินค้า</h2>
      
      {/* ฟอร์มสำหรับเพิ่มรีวิว */}
      <div className="bg-surface rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">เพิ่มรีวิว</h3>
        
        {notification && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-md">
            {notification}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1">
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label htmlFor="rating" className="block mb-1">
              คะแนน
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={5}>5 ดาว</option>
              <option value={4}>4 ดาว</option>
              <option value={3}>3 ดาว</option>
              <option value={2}>2 ดาว</option>
              <option value={1}>1 ดาว</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="comment" className="block mb-1">
              ความคิดเห็น
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? 'กำลังส่ง...' : 'ส่งรีวิว'}
          </button>
        </form>
      </div>
      
      {/* รายการรีวิว */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-text-secondary">ยังไม่มีรีวิว</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="bg-surface rounded-lg p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-semibold">{review.username}</h4>
                <span className="text-text-secondary text-sm">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex mb-2">
                {renderStars(review.rating)}
              </div>
              
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// app/products/[id]/page.tsx

// ไม่ต้องใส่ 'use client' เพราะเป็น Server Component โดยค่าเริ่มต้น
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import ProductReviews from '@/components/ProductReviews';

// ประเภทข้อมูลสำหรับสินค้า
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// ประเภทข้อมูลสำหรับรีวิว
interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าตาม ID
async function fetchProduct(id: string): Promise<Product | null> {
  // ... โค้ดเหมือนเดิม ...
}

// ฟังก์ชันสำหรับดึงข้อมูลรีวิวตามสินค้า
async function fetchReviews(productId: number): Promise<Review[]> {
  try {
    // จำลองการเรียกใช้ API
    // ในสถานการณ์จริงควรเรียกใช้ API จริง
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // จำลองข้อมูลรีวิว
    const reviews: Review[] = [
      {
        id: 1,
        username: 'สมชาย ใจดี',
        rating: 5,
        comment: 'สินค้าคุณภาพดีมาก ส่งเร็ว แพ็คเกจดี',
        date: '2023-05-15T10:30:00Z',
      },
      {
        id: 2,
        username: 'สมหญิง รักเรียน',
        rating: 4,
        comment: 'สินค้าตรงตามที่โฆษณา แต่ส่งช้าไปนิด',
        date: '2023-04-20T14:15:00Z',
      },
      {
        id: 3,
        username: 'มานี มีนา',
        rating: 5,
        comment: 'ชอบมาก จะกลับมาซื้ออีกแน่นอน',
        date: '2023-03-10T09:45:00Z',
      },
    ];
    
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

// ประเภทข้อมูลสำหรับ props
interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

// Server Component
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลสินค้า
  const product = await fetchProduct(params.id);
  
  // ถ้าไม่พบสินค้า
  if (!product) {
    // ใช้ฟังก์ชัน notFound จาก Next.js เพื่อแสดงหน้า 404
    notFound();
  }
  
  // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลรีวิว
  const reviews = await fetchReviews(product.id);
  
  return (
    <div className="container mx-auto p-4">
      <Link
        href="/products"
        className="inline-flex items-center text-text-secondary hover:text-primary mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        กลับไปยังรายการสินค้า
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-80 md:h-96 bg-white rounded-lg">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'contain', padding: '1rem' }}
            priority
          />
        </div>
        
        <div>
          <span className="inline-block px-3 py-1 bg-surface-secondary text-text-secondary rounded-full text-sm mb-4">
            {product.category}
          </span>
          
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <span className="text-yellow-500 mr-1">★</span>
              <span>{product.rating.rate}</span>
            </div>
            <span className="text-text-secondary">{product.rating.count} รีวิว</span>
          </div>
          
          <p className="text-2xl font-bold mb-6">${product.price}</p>
          
          <p className="mb-6">{product.description}</p>
          
          {/* ใช้ Client Component ใน Server Component */}
          <AddToCartButton productId={product.id} productName={product.title} />
        </div>
      </div>
      
      {/* ส่งข้อมูลรีวิวจาก Server Component ไปยัง Client Component */}
      <ProductReviews productId={product.id} initialReviews={reviews} />
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Server Actions กับ Server Components
  const serverActionsContent = `## การใช้งาน Server Actions กับ Server Components

Server Actions เป็นฟีเจอร์ใหม่ใน Next.js ที่ช่วยให้คุณสามารถเขียนฟังก์ชันที่ทำงานบนเซิร์ฟเวอร์และเรียกใช้จาก Client Components ได้:`;

  // โค้ดตัวอย่างสำหรับ Server Action
  const serverActionCode = `// app/actions/products.ts

'use server';

import { revalidatePath } from 'next/cache';

// ประเภทข้อมูลสำหรับสินค้า
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// ประเภทข้อมูลสำหรับการสร้างสินค้า
interface CreateProductInput {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// ฟังก์ชันสำหรับสร้างสินค้าใหม่
export async function createProduct(input: CreateProductInput): Promise<Product> {
  try {
    // ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
    if (!input.title || !input.price || !input.description || !input.category) {
      throw new Error('ต้องระบุชื่อ, ราคา, คำอธิบาย, และหมวดหมู่');
    }
    
    // เรียกใช้ API เพื่อสร้างสินค้าใหม่
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    
    // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
    if (!response.ok) {
      throw new Error('เกิดข้อผิดพลาดในการสร้างสินค้า');
    }
    
    // แปลงข้อมูลการตอบกลับเป็น JSON
    const product = await response.json();
    
    // revalidate ข้อมูลสินค้า
    revalidatePath('/products');
    
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

// ประเภทข้อมูลสำหรับการอัปเดตสินค้า
interface UpdateProductInput {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
}

// ฟังก์ชันสำหรับอัปเดตสินค้า
export async function updateProduct(input: UpdateProductInput): Promise<Product> {
  try {
    // ตรวจสอบว่ามี ID หรือไม่
    if (!input.id) {
      throw new Error('ต้องระบุ ID');
    }
    
    // เรียกใช้ API เพื่ออัปเดตสินค้า
    const response = await fetch(\`https://fakestoreapi.com/products/\${input.id}\`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    
    // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
    if (!response.ok) {
      throw new Error('เกิดข้อผิดพลาดในการอัปเดตสินค้า');
    }
    
    // แปลงข้อมูลการตอบกลับเป็น JSON
    const product = await response.json();
    
    // revalidate ข้อมูลสินค้า
    revalidatePath('/products');
    revalidatePath(\`/products/\${input.id}\`);
    
    return product;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

// ฟังก์ชันสำหรับลบสินค้า
export async function deleteProduct(id: number): Promise<void> {
  try {
    // เรียกใช้ API เพื่อลบสินค้า
    const response = await fetch(\`https://fakestoreapi.com/products/\${id}\`, {
      method: 'DELETE',
    });
    
    // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
    if (!response.ok) {
      throw new Error('เกิดข้อผิดพลาดในการลบสินค้า');
    }
    
    // revalidate ข้อมูลสินค้า
    revalidatePath('/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Server Actions ใน Client Components
  const serverActionClientCode = `// components/ProductForm.tsx

'use client';

import React, { useState } from 'react';
import { createProduct, updateProduct } from '@/app/actions/products';

// ประเภทข้อมูลสำหรับสินค้า
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// ประเภทข้อมูลสำหรับ props
interface ProductFormProps {
  product?: Product;
  categories: string[];
  onSuccess?: () => void;
}

// Client Component
export default function ProductForm({ product, categories, onSuccess }: ProductFormProps) {
  // สร้าง state สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    title: product?.title || '',
    price: product?.price || 0,
    description: product?.description || '',
    category: product?.category || categories[0],
    image: product?.image || 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  });
  // สร้าง state สำหรับเก็บสถานะการส่งฟอร์ม
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // สร้าง state สำหรับเก็บข้อความแจ้งเตือน
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // ฟังก์ชันสำหรับอัปเดตข้อมูลฟอร์ม
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  // ฟังก์ชันสำหรับส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // ตั้งค่าสถานะการส่งฟอร์มเป็น true
      setIsSubmitting(true);
      
      if (product) {
        // อัปเดตสินค้า
        await updateProduct({
          id: product.id,
          ...formData,
        });
        
        // แสดงข้อความแจ้งเตือน
        setNotification({
          type: 'success',
          message: 'อัปเดตสินค้าสำเร็จ',
        });
      } else {
        // สร้างสินค้าใหม่
        await createProduct(formData);
        
        // รีเซ็ตฟอร์ม
        setFormData({
          title: '',
          price: 0,
          description: '',
          category: categories[0],
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        });
        
        // แสดงข้อความแจ้งเตือน
        setNotification({
          type: 'success',
          message: 'สร้างสินค้าสำเร็จ',
        });
      }
      
      // เรียกใช้ฟังก์ชัน onSuccess ถ้ามี
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // แสดงข้อความแจ้งเตือน
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ',
      });
    } finally {
      // ตั้งค่าสถานะการส่งฟอร์มเป็น false
      setIsSubmitting(false);
      
      // ซ่อนข้อความแจ้งเตือนหลังจาก 3 วินาที
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        {product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
      </h2>
      
      {/* แสดงข้อความแจ้งเตือน */}
      {notification && (
        <div
          className={\`mb-6 p-4 rounded-md \${
            notification.type === 'success'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }\`}
        >
          {notification.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            ชื่อสินค้า
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="price" className="block mb-1">
            ราคา
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min={0}
            step={0.01}
            className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block mb-1">
            หมวดหมู่
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="description" className="block mb-1">
            คำอธิบาย
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="image" className="block mb-1">
            URL รูปภาพ
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting
            ? 'กำลังดำเนินการ...'
            : product
            ? 'อัปเดตสินค้า'
            : 'เพิ่มสินค้า'}
        </button>
      </form>
    </div>
  );
}

// app/products/new/page.tsx

// ไม่ต้องใส่ 'use client' เพราะเป็น Server Component โดยค่าเริ่มต้น
import React from 'react';
import Link from 'next/link';
import ProductForm from '@/components/ProductForm';

// ฟังก์ชันสำหรับดึงข้อมูลหมวดหมู่
async function fetchCategories(): Promise<string[]> {
  try {
    // ดึงข้อมูลจาก API
    const response = await fetch('https://fakestoreapi.com/products/categories');
    
    // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
    if (!response.ok) {
      throw new Error('เกิดข้อผิดพลาดในการเรียกใช้ API');
    }
    
    // แปลงข้อมูลการตอบกลับเป็น JSON
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Server Component
export default async function NewProductPage() {
  // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลหมวดหมู่
  const categories = await fetchCategories();
  
  return (
    <div className="container mx-auto p-4">
      <Link
        href="/products"
        className="inline-flex items-center text-text-secondary hover:text-primary mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        กลับไปยังรายการสินค้า
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">เพิ่มสินค้าใหม่</h1>
      
      <ProductForm
        categories={categories}
        onSuccess={() => {
          // ไม่ต้องทำอะไรเพิ่มเติม เพราะ Server Action จะ revalidate ข้อมูลให้อัตโนมัติ
        }}
      />
    </div>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้วิธีการใช้งาน Server Components ใน Next.js ดังนี้:

1. พื้นฐานของ Server Components
2. การดึงข้อมูลใน Server Components
3. การใช้งาน Server Components กับฐานข้อมูล
4. การใช้งาน Server Components กับ Client Components
5. การส่งข้อมูลจาก Server Components ไปยัง Client Components
6. การใช้งาน Server Actions กับ Server Components

Server Components เป็นฟีเจอร์ที่ทรงพลังของ Next.js ที่ช่วยให้คุณสามารถเขียนโค้ด React ที่ทำงานบนเซิร์ฟเวอร์ได้ ซึ่งช่วยเพิ่มประสิทธิภาพและความเร็วของแอปพลิเคชัน`;

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
            <h1 className="text-3xl font-bold mb-2">Server Components</h1>
            <p className="text-text-secondary">ตัวอย่างการใช้งาน Server Components ใน Next.js</p>
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
        <MarkdownContent content={serverComponentsBasicsContent} />
        <CodeBlock code={basicServerComponentCode} language="typescript" fileName="app/server-component-example/page.tsx" />
        <MarkdownContent content={dataFetchingContent} />
        <CodeBlock code={dataFetchingCode} language="typescript" fileName="app/products/page.tsx" />
        <CodeBlock code={productDetailCode} language="typescript" fileName="app/products/[id]/page.tsx" />
        <MarkdownContent content={databaseContent} />
        <CodeBlock code={databaseCode} language="typescript" fileName="app/users/page.tsx" />
        <MarkdownContent content={mixingComponentsContent} />
        <CodeBlock code={clientComponentCode} language="typescript" fileName="components/AddToCartButton.tsx" />
        <CodeBlock code={mixingComponentsCode} language="typescript" fileName="app/products/[id]/page.tsx" />
        <MarkdownContent content={passingDataContent} />
        <CodeBlock code={passingDataCode} language="typescript" fileName="components/ProductReviews.tsx" />
        <MarkdownContent content={serverActionsContent} />
        <CodeBlock code={serverActionCode} language="typescript" fileName="app/actions/products.ts" />
        <CodeBlock code={serverActionClientCode} language="typescript" fileName="components/ProductForm.tsx" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
