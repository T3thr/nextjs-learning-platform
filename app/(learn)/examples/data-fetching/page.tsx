import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการดึงข้อมูลแบบต่างๆ ใน Next.js
export default function DataFetchingExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# การดึงข้อมูลแบบต่างๆ ใน Next.js

Next.js มีวิธีการดึงข้อมูลหลายรูปแบบที่เหมาะสมกับสถานการณ์ต่างๆ ในตัวอย่างนี้ เราจะแสดงวิธีการดึงข้อมูลแบบต่างๆ ใน Next.js ที่ใช้ App Router

## ประเภทของการดึงข้อมูลใน Next.js

1. การดึงข้อมูลใน Server Components
2. การดึงข้อมูลใน Client Components
3. การดึงข้อมูลใน Route Handlers (API Routes)
4. การดึงข้อมูลแบบ Parallel และ Sequential
5. การดึงข้อมูลแบบ Streaming และ Suspense`;

  // เนื้อหาเกี่ยวกับการดึงข้อมูลใน Server Components
  const serverComponentsContent = `## การดึงข้อมูลใน Server Components

Server Components เป็นคุณสมบัติใหม่ใน Next.js ที่ช่วยให้เราสามารถดึงข้อมูลได้โดยตรงในคอมโพเนนต์โดยไม่ต้องใช้ useEffect หรือ getServerSideProps

### 1. การดึงข้อมูลแบบพื้นฐาน`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลแบบพื้นฐานใน Server Components
  const basicFetchCode = `// app/products/page.tsx
import Link from 'next/link';

// ประกาศฟังก์ชัน async component
// ใน Server Components เราสามารถใช้ async/await ได้โดยตรง
export default async function ProductsPage() {
  // ดึงข้อมูลจาก API
  // ฟังก์ชันนี้จะทำงานบน server เท่านั้น ไม่มีการส่ง fetch request จาก browser
  const response = await fetch('https://api.example.com/products');
  
  // ตรวจสอบสถานะการตอบกลับ
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  // แปลงข้อมูลเป็น JSON
  const products = await response.json();
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">สินค้าทั้งหมด</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={'/products/' + product.id}
            className="block bg-surface hover:bg-surface-hover transition-colors rounded-lg overflow-hidden shadow-sm hover:shadow-md"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-text-secondary mb-4">{product.description}</p>
              <p className="text-primary font-bold">{product.price} บาท</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้ fetch options
  const fetchOptionsContent = `### 2. การใช้ fetch options

Next.js ได้เพิ่มคุณสมบัติพิเศษให้กับฟังก์ชัน fetch เพื่อควบคุมการ caching และ revalidation:`;

  // โค้ดตัวอย่างสำหรับการใช้ fetch options
  const fetchOptionsCode = `// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';

// กำหนด params type
interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // ดึงข้อมูลสินค้าจาก API โดยใช้ fetch options
  const response = await fetch(
    \`https://api.example.com/products/\${params.id}\`,
    {
      // กำหนดให้ข้อมูลถูก cache ไว้
      // - 'force-cache' (ค่าเริ่มต้น): เก็บข้อมูลไว้ใน cache จนกว่าจะมีการ revalidate
      // - 'no-store': ไม่เก็บข้อมูลไว้ใน cache (เหมือน getServerSideProps)
      // - { next: { revalidate: 60 } }: เก็บข้อมูลไว้ใน cache และ revalidate ทุก 60 วินาที (เหมือน ISR)
      cache: 'no-store',
      
      // กำหนดเวลาในการ revalidate ข้อมูล (ในหน่วยวินาที)
      // next: { revalidate: 60 },
    }
  );
  
  // ตรวจสอบสถานะการตอบกลับ
  if (!response.ok) {
    // ถ้าสถานะเป็น 404 ให้แสดงหน้า not found
    if (response.status === 404) {
      notFound();
    }
    
    // ถ้าเป็นสถานะอื่นๆ ให้แสดงข้อผิดพลาด
    throw new Error('Failed to fetch product');
  }
  
  // แปลงข้อมูลเป็น JSON
  const product = await response.json();
  
  return (
    <div className="container mx-auto py-8">
      <div className="bg-surface p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-text-secondary mb-6">{product.description}</p>
        
        <div className="flex items-center justify-between mb-8">
          <p className="text-2xl text-primary font-bold">{product.price} บาท</p>
          <button className="btn btn-primary">เพิ่มลงตะกร้า</button>
        </div>
        
        <div className="prose max-w-none">
          <h2>รายละเอียดสินค้า</h2>
          <p>{product.details}</p>
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการดึงข้อมูลใน Client Components
  const clientComponentsContent = `## การดึงข้อมูลใน Client Components

ในบางกรณี เราอาจต้องการดึงข้อมูลใน Client Components เช่น เมื่อต้องการดึงข้อมูลหลังจากที่ผู้ใช้มีปฏิสัมพันธ์กับแอปพลิเคชัน

### 1. การใช้ useState และ useEffect`;

  // โค้ดตัวอย่างสำหรับการใช้ useState และ useEffect
  const useEffectCode = `// components/ProductSearch.tsx
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

// กำหนด type สำหรับสินค้า
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function ProductSearch() {
  // สร้าง state สำหรับเก็บคำค้นหา
  const [searchTerm, setSearchTerm] = useState('');
  
  // สร้าง state สำหรับเก็บผลลัพธ์การค้นหา
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  // สร้าง state สำหรับเก็บสถานะการโหลด
  const [isLoading, setIsLoading] = useState(false);
  
  // สร้าง state สำหรับเก็บข้อผิดพลาด
  const [error, setError] = useState<string | null>(null);
  
  // ใช้ useEffect เพื่อดึงข้อมูลเมื่อคำค้นหาเปลี่ยนแปลง
  useEffect(() => {
    // ถ้าคำค้นหาว่างเปล่า ให้ล้างผลลัพธ์การค้นหา
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    // สร้างฟังก์ชันสำหรับดึงข้อมูล
    const fetchProducts = async () => {
      // ตั้งค่าสถานะการโหลด
      setIsLoading(true);
      setError(null);
      
      try {
        // ดึงข้อมูลจาก API
        const response = await fetch(
          \`/api/products/search?q=\${encodeURIComponent(searchTerm)}\`
        );
        
        // ตรวจสอบสถานะการตอบกลับ
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        // แปลงข้อมูลเป็น JSON
        const data = await response.json();
        
        // อัปเดต state ด้วยผลลัพธ์การค้นหา
        setSearchResults(data);
      } catch (err) {
        // อัปเดต state ด้วยข้อผิดพลาด
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการค้นหา');
      } finally {
        // ตั้งค่าสถานะการโหลดเป็น false
        setIsLoading(false);
      }
    };
    
    // สร้าง timeout เพื่อหน่วงเวลาการค้นหา (debounce)
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500);
    
    // ล้าง timeout เมื่อ component unmount หรือเมื่อคำค้นหาเปลี่ยนแปลง
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);
  
  return (
    <div className="mb-8">
      <div className="mb-4">
        <label htmlFor="search" className="block mb-2 font-bold">
          ค้นหาสินค้า
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="พิมพ์คำค้นหา..."
          className="input w-full"
        />
      </div>
      
      {isLoading && (
        <div className="text-center py-4">
          <div className="spinner"></div>
          <p>กำลังค้นหา...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {!isLoading && !error && searchResults.length === 0 && searchTerm.trim() !== '' && (
        <p className="text-text-secondary py-4">
          ไม่พบสินค้าที่ตรงกับคำค้นหา "{searchTerm}"
        </p>
      )}
      
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              href={'/products/' + product.id}
              className="block bg-surface hover:bg-surface-hover transition-colors rounded-lg overflow-hidden shadow-sm hover:shadow-md p-4"
            >
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-text-secondary text-sm mb-2">
                {product.description}
              </p>
              <p className="text-primary">{product.price} บาท</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้ SWR
  const swrContent = `### 2. การใช้ SWR

SWR เป็นไลบรารีสำหรับการดึงข้อมูลที่พัฒนาโดยทีม Next.js ซึ่งมีคุณสมบัติที่ดีหลายอย่าง เช่น การ caching, การ revalidation, การดึงข้อมูลซ้ำเมื่อเปลี่ยนแท็บ, และอื่นๆ

ติดตั้ง SWR:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง SWR
  const swrInstallCode = `npm install swr
# หรือ
bun add swr`;

  // โค้ดตัวอย่างสำหรับการใช้ SWR
  const swrUsageCode = `// components/ProductList.tsx
"use client"

import useSWR from 'swr';
import Link from 'next/link';

// กำหนด type สำหรับสินค้า
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

// สร้างฟังก์ชัน fetcher สำหรับ SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return response.json();
};

export default function ProductList({ category }: { category: string }) {
  // ใช้ useSWR hook เพื่อดึงข้อมูล
  // - key: URL ที่ใช้ในการดึงข้อมูล (จะเปลี่ยนเมื่อ category เปลี่ยน)
  // - fetcher: ฟังก์ชันที่ใช้ในการดึงข้อมูล
  const { data, error, isLoading } = useSWR<Product[]>(
    \`/api/products?category=\${encodeURIComponent(category)}\`,
    fetcher
  );
  
  // ถ้ากำลังโหลดข้อมูล
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner"></div>
        <p>กำลังโหลดสินค้า...</p>
      </div>
    );
  }
  
  // ถ้ามีข้อผิดพลาด
  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">
        เกิดข้อผิดพลาดในการโหลดสินค้า: {error.message}
      </div>
    );
  }
  
  // ถ้าไม่มีข้อมูล
  if (!data || data.length === 0) {
    return (
      <p className="text-text-secondary py-4">
        ไม่พบสินค้าในหมวดหมู่ "{category}"
      </p>
    );
  }
  
  // ถ้ามีข้อมูล
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((product) => (
        <Link
          key={product.id}
          href={'/products/' + product.id}
          className="block bg-surface hover:bg-surface-hover transition-colors rounded-lg overflow-hidden shadow-sm hover:shadow-md"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-text-secondary mb-4">{product.description}</p>
            <p className="text-primary font-bold">{product.price} บาท</p>
          </div>
        </Link>
      ))}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้ React Query
  const reactQueryContent = `### 3. การใช้ React Query (TanStack Query)

React Query เป็นไลบรารีสำหรับการจัดการสถานะของข้อมูลที่ดึงมาจาก API ซึ่งมีคุณสมบัติที่ดีหลายอย่าง เช่น การ caching, การ refetching, การจัดการข้อผิดพลาด, และอื่นๆ

ติดตั้ง React Query:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง React Query
  const reactQueryInstallCode = `npm install @tanstack/react-query
# หรือ
bun add @tanstack/react-query`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า React Query Provider
  const reactQueryProviderCode = `// components/providers/QueryProvider.tsx
"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
  // สร้าง QueryClient instance ใน component เพื่อหลีกเลี่ยงปัญหา hydration
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // กำหนดค่าเริ่มต้นสำหรับ queries
        staleTime: 60 * 1000, // 1 นาที
        refetchOnWindowFocus: true,
        retry: 1,
      },
    },
  }));
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

// app/layout.tsx
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { QueryProvider } from '@/components/providers/QueryProvider';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}`;

  // โค้ดตัวอย่างสำหรับการใช้ React Query
  const reactQueryUsageCode = `// components/ProductFilter.tsx
"use client"

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';

// กำหนด type สำหรับสินค้า
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

// กำหนด type สำหรับตัวกรอง
interface Filters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';
}

// สร้างฟังก์ชันสำหรับดึงข้อมูลสินค้า
const fetchProducts = async (filters: Filters): Promise<Product[]> => {
  // สร้าง URL สำหรับการดึงข้อมูล
  const params = new URLSearchParams();
  
  // เพิ่ม filters ลงใน params
  if (filters.category) {
    params.append('category', filters.category);
  }
  
  if (filters.minPrice !== undefined) {
    params.append('minPrice', filters.minPrice.toString());
  }
  
  if (filters.maxPrice !== undefined) {
    params.append('maxPrice', filters.maxPrice.toString());
  }
  
  if (filters.sort) {
    params.append('sort', filters.sort);
  }
  
  // ดึงข้อมูลจาก API
  const response = await fetch(\`/api/products?\${params.toString()}\`);
  
  // ตรวจสอบสถานะการตอบกลับ
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  // แปลงข้อมูลเป็น JSON
  return response.json();
};

// สร้างฟังก์ชันสำหรับดึงข้อมูลหมวดหมู่
const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch('/api/categories');
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
};

// สร้างฟังก์ชันสำหรับเพิ่มสินค้าลงในตะกร้า
const addToCart = async (productId: string): Promise<void> => {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity: 1 }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add product to cart');
  }
  
  return response.json();
};

export default function ProductFilter() {
  // สร้าง state สำหรับเก็บตัวกรอง
  const [filters, setFilters] = useState<Filters>({});
  
  // ดึง QueryClient instance
  const queryClient = useQueryClient();
  
  // ใช้ useQuery hook เพื่อดึงข้อมูลสินค้า
  const {
    data: products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ['products', filters], // key จะเปลี่ยนเมื่อ filters เปลี่ยน
    queryFn: () => fetchProducts(filters),
  });
  
  // ใช้ useQuery hook เพื่อดึงข้อมูลหมวดหมู่
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  
  // ใช้ useMutation hook สำหรับการเพิ่มสินค้าลงในตะกร้า
  const addToCartMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // เมื่อเพิ่มสินค้าลงในตะกร้าสำเร็จ ให้ invalidate query 'cart'
      // เพื่อให้ข้อมูลตะกร้าถูกดึงใหม่
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
  
  // ฟังก์ชันสำหรับการเปลี่ยนแปลงตัวกรอง
  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };
  
  // ฟังก์ชันสำหรับการเพิ่มสินค้าลงในตะกร้า
  const handleAddToCart = (productId: string) => {
    addToCartMutation.mutate(productId);
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* ส่วนตัวกรอง */}
        <div className="bg-surface p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">ตัวกรอง</h2>
          
          {/* หมวดหมู่ */}
          <div className="mb-4">
            <h3 className="font-bold mb-2">หมวดหมู่</h3>
            
            {isLoadingCategories ? (
              <p>กำลังโหลด...</p>
            ) : categoriesError ? (
              <p className="text-red-500">เกิดข้อผิดพลาดในการโหลดหมวดหมู่</p>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="category-all"
                    name="category"
                    checked={!filters.category}
                    onChange={() => handleFilterChange({ category: undefined })}
                    className="mr-2"
                  />
                  <label htmlFor="category-all">ทั้งหมด</label>
                </div>
                
                {categories?.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={category}
                      name="category"
                      checked={filters.category === category}
                      onChange={() => handleFilterChange({ category })}
                      className="mr-2"
                    />
                    <label htmlFor={category}>{category}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* ช่วงราคา */}
          <div className="mb-4">
            <h3 className="font-bold mb-2">ช่วงราคา</h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="min-price" className="block text-sm mb-1">
                  ต่ำสุด
                </label>
                <input
                  type="number"
                  id="min-price"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleFilterChange({
                    minPrice: e.target.value ? Number(e.target.value) : undefined,
                  })}
                  className="input w-full"
                  min="0"
                />
              </div>
              
              <div>
                <label htmlFor="max-price" className="block text-sm mb-1">
                  สูงสุด
                </label>
                <input
                  type="number"
                  id="max-price"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange({
                    maxPrice: e.target.value ? Number(e.target.value) : undefined,
                  })}
                  className="input w-full"
                  min="0"
                />
              </div>
            </div>
          </div>
          
          {/* การเรียงลำดับ */}
          <div>
            <h3 className="font-bold mb-2">เรียงลำดับ</h3>
            
            <select
              value={filters.sort || ''}
              onChange={(e) => handleFilterChange({
                sort: e.target.value as Filters['sort'] || undefined,
              })}
              className="input w-full"
            >
              <option value="">เรียงตามค่าเริ่มต้น</option>
              <option value="price_asc">ราคา: ต่ำไปสูง</option>
              <option value="price_desc">ราคา: สูงไปต่ำ</option>
              <option value="name_asc">ชื่อ: A-Z</option>
              <option value="name_desc">ชื่อ: Z-A</option>
            </select>
          </div>
        </div>
        
        {/* ส่วนแสดงสินค้า */}
        <div className="md:col-span-3">
          {isLoadingProducts ? (
            <div className="text-center py-4">
              <div className="spinner"></div>
              <p>กำลังโหลดสินค้า...</p>
            </div>
          ) : productsError ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              เกิดข้อผิดพลาดในการโหลดสินค้า
            </div>
          ) : products?.length === 0 ? (
            <p className="text-text-secondary py-4">
              ไม่พบสินค้าที่ตรงกับตัวกรอง
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <div
                  key={product.id}
                  className="bg-surface rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                    <p className="text-text-secondary mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-primary font-bold">{product.price} บาท</p>
                      <div className="flex gap-2">
                        <Link
                          href={'/products/' + product.id}
                          className="btn btn-outline btn-sm"
                        >
                          ดูรายละเอียด
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          disabled={addToCartMutation.isPending}
                          className="btn btn-primary btn-sm"
                        >
                          {addToCartMutation.isPending &&
                           addToCartMutation.variables === product.id
                            ? 'กำลังเพิ่ม...'
                            : 'เพิ่มลงตะกร้า'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการดึงข้อมูลใน Route Handlers
  const routeHandlersContent = `## การดึงข้อมูลใน Route Handlers (API Routes)

Route Handlers เป็นวิธีการสร้าง API ใน Next.js ซึ่งเราสามารถใช้เพื่อดึงข้อมูลจากฐานข้อมูลหรือ API ภายนอก และส่งข้อมูลกลับไปยัง Client Components`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลใน Route Handlers
  const routeHandlersCode = `// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/db/schema';
import { eq, and, gte, lte, asc, desc } from 'drizzle-orm';

// GET /api/products
export async function GET(request: Request) {
  try {
    // รับพารามิเตอร์จาก URL
    const { searchParams } = new URL(request.url);
    
    // รับค่าพารามิเตอร์
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');
    
    // สร้าง query
    let query = db.select().from(products);
    
    // เพิ่มเงื่อนไขการกรอง
    const conditions = [];
    
    if (category) {
      conditions.push(eq(products.category, category));
    }
    
    if (minPrice) {
      conditions.push(gte(products.price, parseFloat(minPrice)));
    }
    
    if (maxPrice) {
      conditions.push(lte(products.price, parseFloat(maxPrice)));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    // เพิ่มการเรียงลำดับ
    if (sort) {
      switch (sort) {
        case 'price_asc':
          query = query.orderBy(asc(products.price));
          break;
        case 'price_desc':
          query = query.orderBy(desc(products.price));
          break;
        case 'name_asc':
          query = query.orderBy(asc(products.name));
          break;
        case 'name_desc':
          query = query.orderBy(desc(products.name));
          break;
      }
    }
    
    // ดำเนินการ query
    const result = await query;
    
    // ส่งข้อมูลกลับไป
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // ดึงข้อมูลสินค้าจาก ID
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, params.id))
      .limit(1);
    
    // ถ้าไม่พบสินค้า
    if (product.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // ส่งข้อมูลสินค้ากลับไป
    return NextResponse.json(product[0]);
  } catch (error) {
    console.error(\`Error fetching product \${params.id}:\`, error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// app/api/products/search/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/db/schema';
import { sql, ilike } from 'drizzle-orm';

// GET /api/products/search?q=keyword
export async function GET(request: Request) {
  try {
    // รับพารามิเตอร์จาก URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    // ถ้าไม่มีคำค้นหา
    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }
    
    // ค้นหาสินค้า
    const result = await db
      .select()
      .from(products)
      .where(
        sql\`to_tsvector('thai', \${products.name} || ' ' || \${products.description}) @@ plainto_tsquery('thai', \${query})\`
      )
      .limit(20);
    
    // ส่งผลลัพธ์กลับไป
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}`;

  // เนื้อหาเกี่ยวกับการดึงข้อมูลแบบ Parallel และ Sequential
  const parallelSequentialContent = `## การดึงข้อมูลแบบ Parallel และ Sequential

ใน Next.js เราสามารถดึงข้อมูลได้ทั้งแบบ Parallel (พร้อมกัน) และ Sequential (ตามลำดับ) ขึ้นอยู่กับความต้องการของแอปพลิเคชัน

### 1. การดึงข้อมูลแบบ Parallel`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลแบบ Parallel
  const parallelFetchCode = `// app/dashboard/page.tsx
import { Suspense } from 'react';
import ProductList from './ProductList';
import RecentOrders from './RecentOrders';
import PopularProducts from './PopularProducts';
import LoadingSpinner from '@/components/LoadingSpinner';

export default async function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">แดชบอร์ด</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ใช้ Suspense เพื่อแสดง fallback ขณะที่กำลังโหลดข้อมูล */}
        {/* แต่ละ component จะดึงข้อมูลพร้อมกัน (Parallel) */}
        <div>
          <h2 className="text-xl font-bold mb-4">สินค้าล่าสุด</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductList type="latest" />
          </Suspense>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">คำสั่งซื้อล่าสุด</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <RecentOrders />
          </Suspense>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-4">สินค้ายอดนิยม</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <PopularProducts />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// app/dashboard/ProductList.tsx
import Link from 'next/link';

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function getProducts(type: 'latest' | 'popular') {
  // ดึงข้อมูลจาก API
  const response = await fetch(
    \`https://api.example.com/products?type=\${type}\`,
    { cache: 'no-store' } // ไม่เก็บข้อมูลไว้ใน cache
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

export default async function ProductList({ type }: { type: 'latest' | 'popular' }) {
  // ดึงข้อมูลสินค้า
  const products = await getProducts(type);
  
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={'/products/' + product.id}
          className="block bg-surface hover:bg-surface-hover transition-colors rounded-lg overflow-hidden shadow-sm hover:shadow-md p-4"
        >
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-text-secondary text-sm mb-2">
            {product.description}
          </p>
          <p className="text-primary">{product.price} บาท</p>
        </Link>
      ))}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการดึงข้อมูลแบบ Sequential
  const sequentialFetchContent = `### 2. การดึงข้อมูลแบบ Sequential

ในบางกรณี เราอาจต้องการดึงข้อมูลตามลำดับ เช่น เมื่อการดึงข้อมูลครั้งที่สองต้องใช้ผลลัพธ์จากการดึงข้อมูลครั้งแรก:`;

  // โค้ดตัวอย่างสำหรับการดึงข้อมูลแบบ Sequential
  const sequentialFetchCode = `// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import RelatedProducts from './RelatedProducts';

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function getProduct(id: string) {
  const response = await fetch(\`https://api.example.com/products/\${id}\`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    
    throw new Error('Failed to fetch product');
  }
  
  return response.json();
}

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าที่เกี่ยวข้อง
async function getRelatedProducts(category: string, currentProductId: string) {
  const response = await fetch(
    \`https://api.example.com/products?category=\${category}&exclude=\${currentProductId}\`,
    { cache: 'no-store' }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch related products');
  }
  
  return response.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  // ดึงข้อมูลสินค้า
  const product = await getProduct(params.id);
  
  // ดึงข้อมูลสินค้าที่เกี่ยวข้องโดยใช้ข้อมูลจากสินค้าปัจจุบัน
  // การดึงข้อมูลนี้จะเกิดขึ้นหลังจากที่ดึงข้อมูลสินค้าเสร็จแล้ว (Sequential)
  const relatedProducts = await getRelatedProducts(product.category, params.id);
  
  return (
    <div className="container mx-auto py-8">
      <div className="bg-surface p-8 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-text-secondary mb-6">{product.description}</p>
        
        <div className="flex items-center justify-between mb-8">
          <p className="text-2xl text-primary font-bold">{product.price} บาท</p>
          <button className="btn btn-primary">เพิ่มลงตะกร้า</button>
        </div>
        
        <div className="prose max-w-none">
          <h2>รายละเอียดสินค้า</h2>
          <p>{product.details}</p>
        </div>
      </div>
      
      {/* แสดงสินค้าที่เกี่ยวข้อง */}
      <div>
        <h2 className="text-2xl font-bold mb-4">สินค้าที่เกี่ยวข้อง</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการดึงข้อมูลแบบ Streaming และ Suspense
  const streamingContent = `## การดึงข้อมูลแบบ Streaming และ Suspense

Next.js รองรับการดึงข้อมูลแบบ Streaming และ Suspense ซึ่งช่วยให้เราสามารถแสดงส่วนของหน้าที่พร้อมใช้งานได้ทันที โดยไม่ต้องรอให้ดึงข้อมูลทั้งหมดเสร็จสิ้น

### 1. การใช้ Suspense สำหรับการดึงข้อมูล`;

  // โค้ดตัวอย่างสำหรับการใช้ Suspense สำหรับการดึงข้อมูล
  const suspenseCode = `// app/products/page.tsx
import { Suspense } from 'react';
import ProductList from './ProductList';
import ProductFilter from './ProductFilter';
import LoadingProducts from './LoadingProducts';

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">สินค้าทั้งหมด</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* ส่วนตัวกรอง */}
        <div>
          <ProductFilter />
        </div>
        
        {/* ส่วนแสดงสินค้า */}
        <div className="md:col-span-3">
          {/* ใช้ Suspense เพื่อแสดง fallback ขณะที่กำลังโหลดข้อมูล */}
          <Suspense fallback={<LoadingProducts />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// app/products/ProductList.tsx
import Link from 'next/link';

// ฟังก์ชันสำหรับดึงข้อมูลสินค้า
async function getProducts() {
  // จำลองการดึงข้อมูลที่ใช้เวลานาน
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  const response = await fetch('https://api.example.com/products', {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}

export default async function ProductList() {
  // ดึงข้อมูลสินค้า
  const products = await getProducts();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={'/products/' + product.id}
          className="block bg-surface hover:bg-surface-hover transition-colors rounded-lg overflow-hidden shadow-sm hover:shadow-md"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-text-secondary mb-4">{product.description}</p>
            <p className="text-primary font-bold">{product.price} บาท</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

// app/products/LoadingProducts.tsx
export default function LoadingProducts() {
  // สร้าง skeleton UI สำหรับแสดงขณะที่กำลังโหลดข้อมูล
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-surface rounded-lg overflow-hidden shadow-sm p-6"
        >
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้ loading.tsx
  const loadingContent = `### 2. การใช้ loading.tsx

Next.js รองรับไฟล์ \`loading.tsx\` ซึ่งจะถูกแสดงขณะที่กำลังโหลดหน้า:`;

  // โค้ดตัวอย่างสำหรับการใช้ loading.tsx
  const loadingTsxCode = `// app/products/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* ส่วนตัวกรอง */}
        <div>
          <div className="bg-surface p-6 rounded-lg h-fit">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
            
            <div className="mb-4">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            
            <div>
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* ส่วนแสดงสินค้า */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-surface rounded-lg overflow-hidden shadow-sm p-6"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
                <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้ error.tsx
  const errorContent = `### 3. การใช้ error.tsx

Next.js รองรับไฟล์ \`error.tsx\` ซึ่งจะถูกแสดงเมื่อเกิดข้อผิดพลาดในการดึงข้อมูล:`;

  // โค้ดตัวอย่างสำหรับการใช้ error.tsx
  const errorTsxCode = `// app/products/error.tsx
"use client"

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // ใช้ useEffect เพื่อบันทึกข้อผิดพลาดลงใน log
  useEffect(() => {
    console.error('Products page error:', error);
  }, [error]);
  
  return (
    <div className="container mx-auto py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          เกิดข้อผิดพลาดในการโหลดข้อมูล
        </h2>
        <p className="text-red-600 mb-6">
          {error.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'}
        </p>
        <button
          onClick={reset}
          className="btn bg-red-600 hover:bg-red-700 text-white"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้ not-found.tsx
  const notFoundContent = `### 4. การใช้ not-found.tsx

Next.js รองรับไฟล์ \`not-found.tsx\` ซึ่งจะถูกแสดงเมื่อเรียกใช้ฟังก์ชัน \`notFound()\`:`;

  // โค้ดตัวอย่างสำหรับการใช้ not-found.tsx
  const notFoundTsxCode = `// app/products/[id]/not-found.tsx
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="container mx-auto py-8">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-yellow-700 mb-4">
          ไม่พบสินค้า
        </h2>
        <p className="text-yellow-600 mb-6">
          ขออภัย สินค้าที่คุณกำลังค้นหาไม่มีอยู่ในระบบ
        </p>
        <Link href="/products" className="btn bg-yellow-600 hover:bg-yellow-700 text-white">
          กลับไปยังหน้าสินค้าทั้งหมด
        </Link>
      </div>
    </div>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้วิธีการดึงข้อมูลแบบต่างๆ ใน Next.js ดังนี้:

1. การดึงข้อมูลใน Server Components ด้วย async/await และ fetch
2. การดึงข้อมูลใน Client Components ด้วย useState/useEffect, SWR, และ React Query
3. การดึงข้อมูลใน Route Handlers (API Routes)
4. การดึงข้อมูลแบบ Parallel และ Sequential
5. การดึงข้อมูลแบบ Streaming และ Suspense

Next.js มีวิธีการดึงข้อมูลหลายรูปแบบที่เหมาะสมกับสถานการณ์ต่างๆ ซึ่งช่วยให้เราสามารถสร้างแอปพลิเคชันที่มีประสิทธิภาพและตอบสนองได้อย่างรวดเร็ว`;

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
            <h1 className="text-3xl font-bold mb-2">การดึงข้อมูลแบบต่างๆ</h1>
            <p className="text-text-secondary">ตัวอย่างการดึงข้อมูลใน Next.js ทั้งแบบ Server Components, Client Components และ API Routes</p>
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
        <MarkdownContent content={serverComponentsContent} />
        <CodeBlock code={basicFetchCode} language="typescript" fileName="app/products/page.tsx" />
        <MarkdownContent content={fetchOptionsContent} />
        <CodeBlock code={fetchOptionsCode} language="typescript" fileName="app/products/[id]/page.tsx" />
        <MarkdownContent content={clientComponentsContent} />
        <CodeBlock code={useEffectCode} language="typescript" fileName="components/ProductSearch.tsx" />
        <MarkdownContent content={swrContent} />
        <CodeBlock code={swrInstallCode} language="bash" fileName="การติดตั้ง SWR" />
        <CodeBlock code={swrUsageCode} language="typescript" fileName="components/ProductList.tsx" />
        <MarkdownContent content={reactQueryContent} />
        <CodeBlock code={reactQueryInstallCode} language="bash" fileName="การติดตั้ง React Query" />
        <CodeBlock code={reactQueryProviderCode} language="typescript" fileName="components/providers/QueryProvider.tsx" />
        <CodeBlock code={reactQueryUsageCode} language="typescript" fileName="components/ProductFilter.tsx" />
        <MarkdownContent content={routeHandlersContent} />
        <CodeBlock code={routeHandlersCode} language="typescript" fileName="app/api/products/route.ts" />
        <MarkdownContent content={parallelSequentialContent} />
        <CodeBlock code={parallelFetchCode} language="typescript" fileName="app/dashboard/page.tsx" />
        <MarkdownContent content={sequentialFetchContent} />
        <CodeBlock code={sequentialFetchCode} language="typescript" fileName="app/products/[id]/page.tsx" />
        <MarkdownContent content={streamingContent} />
        <CodeBlock code={suspenseCode} language="typescript" fileName="app/products/page.tsx" />
        <MarkdownContent content={loadingContent} />
        <CodeBlock code={loadingTsxCode} language="typescript" fileName="app/products/loading.tsx" />
        <MarkdownContent content={errorContent} />
        <CodeBlock code={errorTsxCode} language="typescript" fileName="app/products/error.tsx" />
        <MarkdownContent content={notFoundContent} />
        <CodeBlock code={notFoundTsxCode} language="typescript" fileName="app/products/[id]/not-found.tsx" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
