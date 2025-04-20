import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงรายละเอียดบทเรียนสถาปัตยกรรมระดับองค์กร
export default function EnterpriseArchitecturePage() {
  // เนื้อหาบทเรียนในรูปแบบ Markdown
  const lessonContent = `# สถาปัตยกรรมระดับองค์กร

การพัฒนาแอปพลิเคชัน Next.js ขนาดใหญ่ระดับองค์กรต้องการการออกแบบสถาปัตยกรรมที่ดีเพื่อให้สามารถขยายขนาดได้ง่าย บำรุงรักษาได้ง่าย และมีประสิทธิภาพสูง

## หลักการออกแบบสถาปัตยกรรมระดับองค์กร

การออกแบบสถาปัตยกรรมระดับองค์กรควรคำนึงถึงหลักการต่อไปนี้:

- **การแบ่งแยกความรับผิดชอบ (Separation of Concerns)** - แยกโค้ดตามหน้าที่และความรับผิดชอบ
- **การทำให้โค้ดใช้ซ้ำได้ (Code Reusability)** - สร้างคอมโพเนนต์และโมดูลที่สามารถใช้ซ้ำได้
- **การทดสอบได้ (Testability)** - ออกแบบให้สามารถทดสอบได้ง่าย
- **การขยายขนาดได้ (Scalability)** - รองรับการเติบโตของแอปพลิเคชันและทีมพัฒนา
- **ความปลอดภัย (Security)** - ปกป้องข้อมูลและป้องกันการโจมตี`;

  // โค้ดตัวอย่างสำหรับโครงสร้างโปรเจคระดับองค์กร
  const projectStructureCode = `my-enterprise-app/
├── app/                    # App Router (Next.js 13+)
│   ├── (auth)/             # กลุ่มเส้นทางสำหรับการยืนยันตัวตน
│   │   ├── login/          # หน้าเข้าสู่ระบบ
│   │   ├── register/       # หน้าลงทะเบียน
│   │   └── layout.tsx      # Layout สำหรับส่วนยืนยันตัวตน
│   ├── (dashboard)/        # กลุ่มเส้นทางสำหรับแดชบอร์ด
│   │   ├── overview/       # หน้าภาพรวม
│   │   ├── analytics/      # หน้าวิเคราะห์ข้อมูล
│   │   └── layout.tsx      # Layout สำหรับส่วนแดชบอร์ด
│   ├── api/                # API Routes
│   │   ├── auth/           # API สำหรับการยืนยันตัวตน
│   │   └── data/           # API สำหรับข้อมูล
│   ├── layout.tsx          # Layout หลัก
│   └── page.tsx            # หน้าแรก
├── components/             # React Components
│   ├── ui/                 # UI Components (ปุ่ม, การ์ด, ฯลฯ)
│   ├── features/           # Feature Components (ตามฟีเจอร์)
│   ├── layouts/            # Layout Components
│   └── shared/             # Shared Components
├── lib/                    # Utility Functions และ Shared Logic
│   ├── api/                # API Clients
│   ├── hooks/              # Custom React Hooks
│   ├── utils/              # Utility Functions
│   └── constants/          # Constants และ Configuration
├── types/                  # TypeScript Type Definitions
├── styles/                 # Global Styles และ Theme
├── public/                 # Static Assets
├── tests/                  # Test Files
│   ├── unit/               # Unit Tests
│   ├── integration/        # Integration Tests
│   └── e2e/                # End-to-End Tests
├── next.config.js          # Next.js Configuration
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript Configuration`;

  // เนื้อหาเกี่ยวกับการแบ่งโค้ดตามฟีเจอร์
  const featureBasedContent = `## การแบ่งโค้ดตามฟีเจอร์ (Feature-based Code Organization)

การแบ่งโค้ดตามฟีเจอร์เป็นวิธีที่มีประสิทธิภาพในการจัดการโค้ดสำหรับแอปพลิเคชันขนาดใหญ่ แทนที่จะแบ่งตามประเภทไฟล์ (เช่น components, hooks, utils) เราจะแบ่งตามฟีเจอร์หรือโดเมนของแอปพลิเคชัน:`;

  // โค้ดตัวอย่างสำหรับการแบ่งโค้ดตามฟีเจอร์
  const featureBasedCode = `my-enterprise-app/
├── app/                    # App Router (Next.js 13+)
├── features/               # แบ่งตามฟีเจอร์หรือโดเมน
│   ├── authentication/     # ฟีเจอร์การยืนยันตัวตน
│   │   ├── components/     # คอมโพเนนต์เฉพาะของฟีเจอร์นี้
│   │   ├── hooks/          # Hooks เฉพาะของฟีเจอร์นี้
│   │   ├── utils/          # Utility Functions เฉพาะของฟีเจอร์นี้
│   │   ├── types/          # Type Definitions เฉพาะของฟีเจอร์นี้
│   │   └── api/            # API Clients เฉพาะของฟีเจอร์นี้
│   ├── dashboard/          # ฟีเจอร์แดชบอร์ด
│   │   ├── components/
│   │   ├── hooks/
│   │   └── ...
│   ├── user-management/    # ฟีเจอร์จัดการผู้ใช้
│   │   ├── components/
│   │   ├── hooks/
│   │   └── ...
│   └── ...
├── shared/                 # โค้ดที่ใช้ร่วมกันระหว่างฟีเจอร์
│   ├── components/         # คอมโพเนนต์ที่ใช้ร่วมกัน
│   ├── hooks/              # Hooks ที่ใช้ร่วมกัน
│   ├── utils/              # Utility Functions ที่ใช้ร่วมกัน
│   └── types/              # Type Definitions ที่ใช้ร่วมกัน
└── ...`;

  // เนื้อหาเกี่ยวกับสถาปัตยกรรมแบบ Clean Architecture
  const cleanArchitectureContent = `## Clean Architecture ใน Next.js

Clean Architecture เป็นแนวคิดที่ช่วยให้โค้ดมีความยืดหยุ่น ทดสอบได้ง่าย และไม่ขึ้นกับเฟรมเวิร์กหรือไลบรารีภายนอก โดยแบ่งโค้ดออกเป็นชั้น (layers) ต่างๆ:`;

  // โค้ดตัวอย่างสำหรับ Clean Architecture
  const cleanArchitectureCode = `// Domain Layer - Business Logic และ Entities
// features/products/domain/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

// Use Cases - Application Logic
// features/products/usecases/getProducts.ts
import { Product } from '../domain/product';
import { ProductRepository } from '../repositories/productRepository';

export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.getAll();
  }
}

// Repository Interface - Data Access Abstraction
// features/products/repositories/productRepository.ts
import { Product } from '../domain/product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
}

// Repository Implementation - Data Access Implementation
// features/products/infrastructure/apiProductRepository.ts
import { Product } from '../domain/product';
import { ProductRepository } from '../repositories/productRepository';

export class ApiProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const response = await fetch('/api/products');
    return response.json();
  }

  async getById(id: string): Promise<Product | null> {
    const response = await fetch(\`/api/products/\${id}\`);
    if (!response.ok) return null;
    return response.json();
  }

  // ... other methods
}

// UI Layer - React Components
// features/products/components/ProductList.tsx
"use client"

import { useEffect, useState } from 'react';
import { Product } from '../domain/product';
import { ApiProductRepository } from '../infrastructure/apiProductRepository';
import { GetProductsUseCase } from '../usecases/getProducts';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const repository = new ApiProductRepository();
      const useCase = new GetProductsUseCase(repository);
      
      try {
        const result = await useCase.execute();
        setProducts(result);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>กำลังโหลด...</div>;

  return (
    <div>
      <h1>รายการสินค้า</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price} บาท</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับ Dependency Injection
  const dependencyInjectionContent = `## Dependency Injection

Dependency Injection (DI) เป็นเทคนิคที่ช่วยให้โค้ดมีความยืดหยุ่น ทดสอบได้ง่าย และลดการพึ่งพากันระหว่างคลาส โดยการส่งผ่านการพึ่งพา (dependencies) จากภายนอกแทนที่จะสร้างขึ้นภายในคลาส:`;

  // โค้ดตัวอย่างสำหรับ Dependency Injection
  const dependencyInjectionCode = `// lib/di/container.ts
import { ProductRepository } from '@/features/products/repositories/productRepository';
import { ApiProductRepository } from '@/features/products/infrastructure/apiProductRepository';
import { GetProductsUseCase } from '@/features/products/usecases/getProducts';

// สร้าง container อย่างง่าย
class Container {
  private services: Record<string, any> = {};

  // ลงทะเบียน service
  register<T>(name: string, implementation: T): void {
    this.services[name] = implementation;
  }

  // ดึง service
  resolve<T>(name: string): T {
    if (!this.services[name]) {
      throw new Error(\`Service \${name} not registered\`);
    }
    return this.services[name] as T;
  }
}

// สร้าง container และลงทะเบียน services
export const container = new Container();

// ลงทะเบียน repositories
container.register<ProductRepository>(
  'ProductRepository',
  new ApiProductRepository()
);

// ลงทะเบียน use cases
container.register<GetProductsUseCase>(
  'GetProductsUseCase',
  new GetProductsUseCase(container.resolve<ProductRepository>('ProductRepository'))
);

// ใช้งาน container ใน component
// features/products/components/ProductList.tsx
"use client"

import { useEffect, useState } from 'react';
import { Product } from '../domain/product';
import { GetProductsUseCase } from '../usecases/getProducts';
import { container } from '@/lib/di/container';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      // ดึง use case จาก container
      const getProductsUseCase = container.resolve<GetProductsUseCase>('GetProductsUseCase');
      
      try {
        const result = await getProductsUseCase.execute();
        setProducts(result);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ... rest of the component
}`;

  // เนื้อหาเกี่ยวกับ Monorepo
  const monorepoContent = `## Monorepo สำหรับแอปพลิเคชันขนาดใหญ่

Monorepo เป็นแนวทางการจัดการโค้ดที่เก็บโปรเจคหลายโปรเจคไว้ในที่เดียวกัน ซึ่งเหมาะสำหรับแอปพลิเคชันขนาดใหญ่ที่มีหลายโมดูลหรือหลายแอปพลิเคชันที่เกี่ยวข้องกัน:`;

  // โค้ดตัวอย่างสำหรับ Monorepo
  const monorepoCode = `// package.json
{
  "name": "my-enterprise-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test"
  },
  "devDependencies": {
    "turbo": "^1.10.0"
  }
}

// โครงสร้างโฟลเดอร์
my-enterprise-monorepo/
├── apps/                   # แอปพลิเคชันต่างๆ
│   ├── web/                # เว็บแอปพลิเคชันหลัก (Next.js)
│   ├── admin/              # แอปพลิเคชันสำหรับผู้ดูแลระบบ (Next.js)
│   └── docs/               # เว็บไซต์เอกสาร (Next.js)
├── packages/               # แพ็คเกจที่ใช้ร่วมกัน
│   ├── ui/                 # UI Components ที่ใช้ร่วมกัน
│   ├── config/             # Configuration ที่ใช้ร่วมกัน
│   ├── tsconfig/           # TypeScript Configuration ที่ใช้ร่วมกัน
│   └── utils/              # Utility Functions ที่ใช้ร่วมกัน
├── package.json            # Root package.json
└── turbo.json              # Turborepo Configuration`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในบทเรียนนี้ คุณได้เรียนรู้เกี่ยวกับ:

- หลักการออกแบบสถาปัตยกรรมระดับองค์กร
- โครงสร้างโปรเจคที่เหมาะสมสำหรับแอปพลิเคชันขนาดใหญ่
- การแบ่งโค้ดตามฟีเจอร์ (Feature-based Code Organization)
- Clean Architecture ใน Next.js
- Dependency Injection
- Monorepo สำหรับแอปพลิเคชันขนาดใหญ่

การออกแบบสถาปัตยกรรมที่ดีจะช่วยให้แอปพลิเคชัน Next.js ของคุณสามารถขยายขนาดได้ง่าย บำรุงรักษาได้ง่าย และมีประสิทธิภาพสูง ซึ่งเป็นสิ่งสำคัญสำหรับการพัฒนาแอปพลิเคชันระดับองค์กร

ในบทเรียนถัดไป เราจะเรียนรู้เกี่ยวกับการจัดการสถานะขั้นสูงใน Next.js`;

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
            <h1 className="text-3xl font-bold mb-2">สถาปัตยกรรมระดับองค์กร</h1>
            <p className="text-text-secondary">เรียนรู้การออกแบบสถาปัตยกรรม Next.js สำหรับแอปพลิเคชันขนาดใหญ่</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs mr-2">
              ระดับกลาง
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
      
      {/* เนื้อหาบทเรียน */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={lessonContent} lessonId="4" />
        <CodeBlock code={projectStructureCode} language="plaintext" fileName="โครงสร้างโปรเจคระดับองค์กร" />
        <MarkdownContent content={featureBasedContent} />
        <CodeBlock code={featureBasedCode} language="plaintext" fileName="การแบ่งโค้ดตามฟีเจอร์" />
        <MarkdownContent content={cleanArchitectureContent} />
        <CodeBlock code={cleanArchitectureCode} language="typescript" fileName="Clean Architecture Example" />
        <MarkdownContent content={dependencyInjectionContent} />
        <CodeBlock code={dependencyInjectionCode} language="typescript" fileName="Dependency Injection Example" />
        <MarkdownContent content={monorepoContent} />
        <CodeBlock code={monorepoCode} language="json" fileName="Monorepo Setup" />
        <MarkdownContent content={summaryContent} />
        
        {/* ปุ่มนำทาง */}
        <div className="mt-12 pt-6 border-t border-text-secondary/10 flex justify-between">
          <Link href="/lessons/data-fetching" className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            บทเรียนก่อนหน้า: การจัดการข้อมูลใน Next.js
          </Link>
          <Link href="/lessons/advanced-state-management" className="btn btn-primary">
            บทเรียนถัดไป: การจัดการสถานะขั้นสูง
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* แบบฝึกหัดที่เกี่ยวข้อง */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">แบบฝึกหัดที่เกี่ยวข้อง</h2>
        <div className="bg-surface p-6 rounded-lg">
          <Link href="/exercises/4" className="block hover:bg-background rounded-lg p-4 transition-colors">
            <h3 className="font-bold mb-1">ออกแบบโครงสร้างโปรเจคระดับองค์กร</h3>
            <p className="text-text-secondary">ฝึกการออกแบบโครงสร้างโปรเจค Next.js สำหรับแอปพลิเคชันขนาดใหญ่</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
