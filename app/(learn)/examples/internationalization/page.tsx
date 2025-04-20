import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการใช้งานการแปลภาษาใน Next.js
export default function InternationalizationExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# การแปลภาษาใน Next.js (Internationalization)

การแปลภาษา (Internationalization หรือ i18n) เป็นกระบวนการออกแบบและพัฒนาแอปพลิเคชันให้รองรับหลายภาษาและภูมิภาค ในตัวอย่างนี้ เราจะแสดงวิธีการใช้งานการแปลภาษาใน Next.js ด้วยวิธีการต่างๆ

## ประโยชน์ของการแปลภาษา

1. **เข้าถึงผู้ใช้ทั่วโลก**: ช่วยให้แอปพลิเคชันของคุณสามารถเข้าถึงผู้ใช้ที่พูดภาษาต่างๆ ทั่วโลก
2. **ปรับปรุงประสบการณ์ผู้ใช้**: ผู้ใช้สามารถใช้งานแอปพลิเคชันในภาษาที่ตนเองถนัด
3. **เพิ่มโอกาสทางธุรกิจ**: ขยายฐานลูกค้าไปยังตลาดต่างประเทศ
4. **ปฏิบัติตามข้อกำหนดทางกฎหมาย**: บางประเทศมีข้อกำหนดให้แอปพลิเคชันต้องรองรับภาษาท้องถิ่น
5. **เพิ่มความน่าเชื่อถือ**: แสดงให้เห็นถึงความเป็นมืออาชีพและความใส่ใจต่อผู้ใช้`;

  // เนื้อหาเกี่ยวกับวิธีการแปลภาษาใน Next.js
  const i18nApproachesContent = `## วิธีการแปลภาษาใน Next.js

Next.js มีวิธีการแปลภาษาหลายวิธี แต่ละวิธีมีข้อดีและข้อเสียแตกต่างกัน:

1. **การแปลภาษาด้วย URL Path**: ใช้ URL path เพื่อระบุภาษา เช่น \`/en/about\`, \`/th/about\`
2. **การแปลภาษาด้วย Domain**: ใช้โดเมนที่แตกต่างกันสำหรับแต่ละภาษา เช่น \`en.example.com\`, \`th.example.com\`
3. **การแปลภาษาด้วย Cookie หรือ LocalStorage**: เก็บการตั้งค่าภาษาไว้ใน cookie หรือ localStorage
4. **การแปลภาษาด้วยไลบรารีภายนอก**: ใช้ไลบรารีเช่น next-i18next, next-intl, react-intl เป็นต้น

ในตัวอย่างนี้ เราจะเน้นที่การแปลภาษาด้วย URL Path และการใช้ไลบรารีภายนอก`;

  // เนื้อหาเกี่ยวกับการแปลภาษาด้วย URL Path
  const i18nUrlPathContent = `## การแปลภาษาด้วย URL Path

การแปลภาษาด้วย URL Path เป็นวิธีที่ง่ายและเป็นที่นิยมใน Next.js โดยใช้ middleware เพื่อจัดการการเปลี่ยนเส้นทาง:`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า next.config.js
  const nextConfigCode = `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // กำหนดค่าสำหรับการแปลภาษา
  i18n: {
    // กำหนดภาษาที่รองรับ
    locales: ['en', 'th', 'ja', 'zh'],
    // กำหนดภาษาเริ่มต้น
    defaultLocale: 'en',
    // กำหนดให้ใช้ URL path สำหรับภาษาเริ่มต้น (ไม่แสดง /en/ ในเส้นทาง)
    localeDetection: true,
  },
};

module.exports = nextConfig;`;

  // โค้ดตัวอย่างสำหรับ middleware.ts
  const middlewareCode = `// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// กำหนดภาษาที่รองรับ
const locales = ['en', 'th', 'ja', 'zh'];
// กำหนดภาษาเริ่มต้น
const defaultLocale = 'en';

// ฟังก์ชันสำหรับตรวจสอบว่าเส้นทางควรถูกข้ามหรือไม่
function shouldSkipLocaleRedirect(pathname: string): boolean {
  // ข้ามเส้นทางที่ไม่ต้องการให้มีการเปลี่ยนเส้นทาง เช่น API routes, ไฟล์สถิต, ไอคอน, รูปภาพ
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  );
}

// ฟังก์ชัน middleware
export function middleware(request: NextRequest) {
  // ดึงเส้นทางจาก URL
  const pathname = request.nextUrl.pathname;
  
  // ถ้าเส้นทางควรถูกข้าม ให้ส่งคืนค่า undefined
  if (shouldSkipLocaleRedirect(pathname)) {
    return;
  }
  
  // ตรวจสอบว่ามีภาษาใน URL หรือไม่
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(\`/\${locale}/\`) || pathname === \`/\${locale}\`
  );
  
  // ถ้ามีภาษาใน URL แล้ว ไม่ต้องเปลี่ยนเส้นทาง
  if (pathnameHasLocale) {
    return;
  }
  
  // ดึงภาษาจาก cookie หรือ Accept-Language header
  let locale = defaultLocale;
  
  // ตรวจสอบ cookie
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && locales.includes(localeCookie)) {
    locale = localeCookie;
  } 
  // ถ้าไม่มี cookie ให้ตรวจสอบ Accept-Language header
  else {
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
      // แยก Accept-Language header และเลือกภาษาแรกที่รองรับ
      const acceptedLocales = acceptLanguage.split(',').map(item => {
        const [locale] = item.trim().split(';');
        return locale;
      });
      
      for (const acceptedLocale of acceptedLocales) {
        // ตรวจสอบว่ามีภาษาที่รองรับหรือไม่
        const matchedLocale = locales.find(locale => 
          acceptedLocale === locale || acceptedLocale.startsWith(\`\${locale}-\`)
        );
        
        if (matchedLocale) {
          locale = matchedLocale;
          break;
        }
      }
    }
  }
  
  // สร้าง URL ใหม่ที่มีภาษา
  const newUrl = new URL(\`/\${locale}\${pathname.startsWith('/') ? pathname : \`/\${pathname}\`}\`, request.url);
  // คัดลอก query parameters
  newUrl.search = request.nextUrl.search;
  
  // เปลี่ยนเส้นทางไปยัง URL ใหม่
  return NextResponse.redirect(newUrl);
}

// กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};`;

  // โค้ดตัวอย่างสำหรับการใช้งานภาษาใน Link
  const linkCode = `// components/LanguageLink.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// คอมโพเนนต์สำหรับลิงก์ที่รองรับการแปลภาษา
export default function LanguageLink({
  href,
  locale,
  children,
  ...props
}: {
  href: string;
  locale: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  // ดึงเส้นทางปัจจุบัน
  const pathname = usePathname();
  
  // แยกภาษาปัจจุบันออกจากเส้นทาง
  const segments = pathname.split('/');
  const currentLocale = segments[1];
  
  // สร้างเส้นทางใหม่โดยแทนที่ภาษา
  let newPath = href;
  if (href === '/') {
    newPath = \`/\${locale}\`;
  } else if (href.startsWith('/')) {
    newPath = \`/\${locale}\${href}\`;
  }
  
  return (
    <Link href={newPath} {...props}>
      {children}
    </Link>
  );
}`;

  // โค้ดตัวอย่างสำหรับการสร้างตัวเลือกภาษา
  const languageSwitcherCode = `// components/LanguageSwitcher.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { setCookie } from 'cookies-next';

// กำหนดภาษาที่รองรับ
const locales = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

// คอมโพเนนต์สำหรับสลับภาษา
export default function LanguageSwitcher() {
  // ดึงเส้นทางปัจจุบัน
  const pathname = usePathname();
  const router = useRouter();
  
  // แยกภาษาปัจจุบันออกจากเส้นทาง
  const segments = pathname.split('/');
  const currentLocale = segments[1];
  
  // สร้าง state สำหรับแสดง/ซ่อนเมนูภาษา
  const [isOpen, setIsOpen] = useState(false);
  
  // ฟังก์ชันสำหรับเปลี่ยนภาษา
  const changeLanguage = (locale: string) => {
    // บันทึกภาษาลงใน cookie
    setCookie('NEXT_LOCALE', locale, { maxAge: 60 * 60 * 24 * 365 }); // บันทึกเป็นเวลา 1 ปี
    
    // สร้างเส้นทางใหม่โดยแทนที่ภาษา
    const newPathname = pathname.replace(\`/\${currentLocale}\`, \`/\${locale}\`);
    
    // นำทางไปยังเส้นทางใหม่
    router.push(newPathname);
    
    // ซ่อนเมนูภาษา
    setIsOpen(false);
  };
  
  // หาข้อมูลภาษาปัจจุบัน
  const currentLocaleInfo = locales.find(locale => locale.code === currentLocale) || locales[0];
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-surface hover:bg-surface-secondary transition-colors"
        aria-label="เปลี่ยนภาษา"
      >
        <span className="text-lg">{currentLocaleInfo.flag}</span>
        <span>{currentLocaleInfo.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-40 bg-surface rounded-md shadow-lg overflow-hidden z-10">
          <div className="py-1">
            {locales.map(locale => (
              <button
                key={locale.code}
                onClick={() => changeLanguage(locale.code)}
                className={\`flex items-center w-full px-4 py-2 text-left hover:bg-surface-secondary transition-colors \${
                  locale.code === currentLocale ? 'bg-surface-secondary' : ''
                }\`}
              >
                <span className="text-lg mr-2">{locale.flag}</span>
                <span>{locale.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งานไฟล์แปลภาษา
  const translationFilesContent = `## การใช้งานไฟล์แปลภาษา

เราสามารถสร้างไฟล์แปลภาษาสำหรับแต่ละภาษาเพื่อเก็บข้อความที่ต้องการแปล:`;

  // โค้ดตัวอย่างสำหรับไฟล์แปลภาษาอังกฤษ
  const enTranslationCode = `// locales/en.json
{
  "common": {
    "home": "Home",
    "about": "About",
    "contact": "Contact",
    "blog": "Blog",
    "products": "Products",
    "services": "Services",
    "login": "Login",
    "register": "Register",
    "logout": "Logout",
    "search": "Search",
    "language": "Language"
  },
  "home": {
    "title": "Welcome to our website",
    "subtitle": "Discover amazing products and services",
    "cta": "Get Started",
    "features": {
      "title": "Our Features",
      "feature1": {
        "title": "Easy to Use",
        "description": "Our platform is designed to be intuitive and user-friendly."
      },
      "feature2": {
        "title": "Fast and Reliable",
        "description": "Experience lightning-fast performance and reliable service."
      },
      "feature3": {
        "title": "Secure",
        "description": "Your data is protected with industry-standard security measures."
      }
    }
  },
  "about": {
    "title": "About Us",
    "description": "We are a team of passionate individuals dedicated to providing the best products and services.",
    "mission": "Our mission is to make technology accessible to everyone.",
    "vision": "Our vision is to become the leading provider of innovative solutions."
  },
  "contact": {
    "title": "Contact Us",
    "name": "Name",
    "email": "Email",
    "message": "Message",
    "submit": "Submit",
    "success": "Your message has been sent successfully.",
    "error": "An error occurred. Please try again."
  }
}`;

  // โค้ดตัวอย่างสำหรับไฟล์แปลภาษาไทย
  const thTranslationCode = `// locales/th.json
{
  "common": {
    "home": "หน้าแรก",
    "about": "เกี่ยวกับเรา",
    "contact": "ติดต่อเรา",
    "blog": "บล็อก",
    "products": "สินค้า",
    "services": "บริการ",
    "login": "เข้าสู่ระบบ",
    "register": "สมัครสมาชิก",
    "logout": "ออกจากระบบ",
    "search": "ค้นหา",
    "language": "ภาษา"
  },
  "home": {
    "title": "ยินดีต้อนรับสู่เว็บไซต์ของเรา",
    "subtitle": "ค้นพบสินค้าและบริการที่น่าทึ่ง",
    "cta": "เริ่มต้นใช้งาน",
    "features": {
      "title": "คุณสมบัติของเรา",
      "feature1": {
        "title": "ใช้งานง่าย",
        "description": "แพลตฟอร์มของเราออกแบบมาให้ใช้งานง่ายและเป็นมิตรกับผู้ใช้"
      },
      "feature2": {
        "title": "รวดเร็วและเชื่อถือได้",
        "description": "สัมผัสประสบการณ์การทำงานที่รวดเร็วและบริการที่เชื่อถือได้"
      },
      "feature3": {
        "title": "ปลอดภัย",
        "description": "ข้อมูลของคุณได้รับการปกป้องด้วยมาตรการรักษาความปลอดภัยระดับอุตสาหกรรม"
      }
    }
  },
  "about": {
    "title": "เกี่ยวกับเรา",
    "description": "เราเป็นทีมงานที่มีความหลงใหลในการให้บริการสินค้าและบริการที่ดีที่สุด",
    "mission": "พันธกิจของเราคือการทำให้เทคโนโลยีเข้าถึงได้สำหรับทุกคน",
    "vision": "วิสัยทัศน์ของเราคือการเป็นผู้นำในการให้บริการโซลูชันที่มีนวัตกรรม"
  },
  "contact": {
    "title": "ติดต่อเรา",
    "name": "ชื่อ",
    "email": "อีเมล",
    "message": "ข้อความ",
    "submit": "ส่ง",
    "success": "ข้อความของคุณถูกส่งเรียบร้อยแล้ว",
    "error": "เกิดข้อผิดพลาด โปรดลองอีกครั้ง"
  }
}`;

  // โค้ดตัวอย่างสำหรับการใช้งานไฟล์แปลภาษา
  const useTranslationCode = `// lib/i18n.ts
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// นำเข้าไฟล์แปลภาษา
import en from '@/locales/en.json';
import th from '@/locales/th.json';
import ja from '@/locales/ja.json';
import zh from '@/locales/zh.json';

// กำหนดประเภทของข้อความแปลภาษา
type NestedMessages = {
  [key: string]: string | NestedMessages;
};

// กำหนดประเภทของไฟล์แปลภาษา
type Messages = {
  [locale: string]: NestedMessages;
};

// กำหนดข้อความแปลภาษา
const messages: Messages = {
  en,
  th,
  ja,
  zh,
};

// ฟังก์ชันสำหรับดึงข้อความแปลภาษาจากคีย์
function getNestedMessage(obj: NestedMessages, path: string): string {
  const keys = path.split('.');
  let result: any = obj;
  
  for (const key of keys) {
    if (result[key] === undefined) {
      console.warn(\`Translation key "\${path}" not found\`);
      return path;
    }
    result = result[key];
  }
  
  if (typeof result !== 'string') {
    console.warn(\`Translation key "\${path}" is not a string\`);
    return path;
  }
  
  return result;
}

// Hook สำหรับใช้งานการแปลภาษา
export function useTranslation() {
  // ดึงเส้นทางปัจจุบัน
  const pathname = usePathname();
  
  // แยกภาษาปัจจุบันออกจากเส้นทาง
  const segments = pathname.split('/');
  const locale = segments[1] || 'en';
  
  // สร้างฟังก์ชัน t สำหรับแปลภาษา
  const t = useMemo(() => {
    return (key: string, params?: Record<string, string>) => {
      // ดึงข้อความแปลภาษา
      const message = getNestedMessage(messages[locale] || messages.en, key);
      
      // แทนที่พารามิเตอร์ในข้อความแปลภาษา
      if (params) {
        return Object.entries(params).reduce((acc, [key, value]) => {
          return acc.replace(new RegExp(\`{\${key}}\`, 'g'), value);
        }, message);
      }
      
      return message;
    };
  }, [locale]);
  
  return { t, locale };
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน useTranslation ในคอมโพเนนต์
  const useTranslationComponentCode = `// components/Header.tsx
'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

// คอมโพเนนต์ Header
export default function Header() {
  // ใช้ Hook useTranslation
  const { t, locale } = useTranslation();
  
  return (
    <header className="bg-surface shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href={\`/\${locale}\`} className="text-2xl font-bold">
            Next.js i18n
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href={\`/\${locale}\`} className="hover:text-primary transition-colors">
              {t('common.home')}
            </Link>
            <Link href={\`/\${locale}/about\`} className="hover:text-primary transition-colors">
              {t('common.about')}
            </Link>
            <Link href={\`/\${locale}/contact\`} className="hover:text-primary transition-colors">
              {t('common.contact')}
            </Link>
            <Link href={\`/\${locale}/blog\`} className="hover:text-primary transition-colors">
              {t('common.blog')}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            <Link
              href={\`/\${locale}/login\`}
              className="px-4 py-2 rounded-md bg-primary text-white hover:opacity-90 transition-opacity"
            >
              {t('common.login')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน next-intl
  const nextIntlContent = `## การใช้งาน next-intl

next-intl เป็นไลบรารีที่ช่วยให้การแปลภาษาใน Next.js เป็นเรื่องง่าย โดยรองรับทั้ง Client Components และ Server Components:`;

  // โค้ดตัวอย่างสำหรับการติดตั้ง next-intl
  const installNextIntlCode = `# ติดตั้ง next-intl
npm install next-intl

# หรือใช้ yarn
yarn add next-intl

# หรือใช้ bun
bun add next-intl`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า next-intl ใน next.config.js
  const nextIntlConfigCode = `// next.config.js
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withNextIntl(nextConfig);`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า i18n.ts
  const i18nConfigCode = `// i18n.ts
import { getRequestConfig } from 'next-intl/server';
 
export default getRequestConfig(async ({ locale }) => {
  // นำเข้าไฟล์แปลภาษาตามภาษาที่ต้องการ
  return {
    messages: (await import(\`./locales/\${locale}.json\`)).default
  };
});`;

  // โค้ดตัวอย่างสำหรับการตั้งค่า middleware.ts
  const nextIntlMiddlewareCode = `// middleware.ts
import createMiddleware from 'next-intl/middleware';
 
// กำหนดภาษาที่รองรับ
export default createMiddleware({
  // กำหนดภาษาที่รองรับ
  locales: ['en', 'th', 'ja', 'zh'],
  // กำหนดภาษาเริ่มต้น
  defaultLocale: 'en',
  // กำหนดให้ใช้ URL path สำหรับภาษาเริ่มต้น (ไม่แสดง /en/ ในเส้นทาง)
  localePrefix: 'as-needed'
});
 
export const config = {
  // กำหนดเส้นทางที่ต้องการให้ middleware ทำงาน
  matcher: ['/((?!api|_next|.*\\..*).*)']
};`;

  // โค้ดตัวอย่างสำหรับการใช้งาน next-intl ใน Server Component
  const nextIntlServerComponentCode = `// app/[locale]/page.tsx
import { useTranslations } from 'next-intl';
import Link from 'next/link';
 
// Server Component
export default function Home() {
  // ใช้ Hook useTranslations
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <p className="text-text-secondary mb-6">{t('subtitle')}</p>
      
      <Link
        href="/about"
        className="px-4 py-2 rounded-md bg-primary text-white hover:opacity-90 transition-opacity"
      >
        {t('cta')}
      </Link>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t('features.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{t('features.feature1.title')}</h3>
            <p className="text-text-secondary">{t('features.feature1.description')}</p>
          </div>
          
          <div className="bg-surface p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{t('features.feature2.title')}</h3>
            <p className="text-text-secondary">{t('features.feature2.description')}</p>
          </div>
          
          <div className="bg-surface p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{t('features.feature3.title')}</h3>
            <p className="text-text-secondary">{t('features.feature3.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน next-intl ใน Client Component
  const nextIntlClientComponentCode = `// components/ContactForm.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

// Client Component
export default function ContactForm() {
  // ใช้ Hook useTranslations
  const t = useTranslations('contact');
  
  // สร้าง state สำหรับฟอร์ม
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  // สร้าง state สำหรับสถานะการส่งฟอร์ม
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // ฟังก์ชันสำหรับอัปเดตข้อมูลฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // ฟังก์ชันสำหรับส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ตั้งค่าสถานะเป็น loading
    setStatus('loading');
    
    try {
      // ส่งข้อมูลฟอร์มไปยัง API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // ตรวจสอบสถานะการตอบกลับ
      if (response.ok) {
        // ตั้งค่าสถานะเป็น success
        setStatus('success');
        // รีเซ็ตข้อมูลฟอร์ม
        setFormData({ name: '', email: '', message: '' });
      } else {
        // ตั้งค่าสถานะเป็น error
        setStatus('error');
      }
    } catch (error) {
      // ตั้งค่าสถานะเป็น error
      setStatus('error');
    }
  };
  
  return (
    <div className="bg-surface p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">{t('title')}</h2>
      
      {status === 'success' && (
        <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 p-4 rounded-md mb-6">
          {t('success')}
        </div>
      )}
      
      {status === 'error' && (
        <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 p-4 rounded-md mb-6">
          {t('error')}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            {t('name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1">
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block mb-1">
            {t('message')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 rounded-md border border-surface-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 rounded-md bg-primary text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === 'loading' ? '...' : t('submit')}
        </button>
      </form>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Formatters
  const formattersContent = `## การใช้งาน Formatters

next-intl มี Formatters สำหรับจัดรูปแบบวันที่ เวลา จำนวน และอื่นๆ:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Formatters
  const formattersCode = `// components/ProductPrice.tsx
'use client';

import { useFormatter, useTranslations } from 'next-intl';

// คอมโพเนนต์สำหรับแสดงราคาสินค้า
export default function ProductPrice({ price, currency = 'THB' }: { price: number; currency?: string }) {
  // ใช้ Hook useFormatter
  const format = useFormatter();
  
  // จัดรูปแบบราคา
  const formattedPrice = format.number(price, {
    style: 'currency',
    currency,
  });
  
  return (
    <div className="text-xl font-bold">
      {formattedPrice}
    </div>
  );
}

// components/PublishedDate.tsx
'use client';

import { useFormatter } from 'next-intl';

// คอมโพเนนต์สำหรับแสดงวันที่เผยแพร่
export default function PublishedDate({ date }: { date: Date }) {
  // ใช้ Hook useFormatter
  const format = useFormatter();
  
  // จัดรูปแบบวันที่
  const formattedDate = format.dateTime(date, {
    dateStyle: 'long',
  });
  
  return (
    <div className="text-text-secondary">
      {formattedDate}
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Pluralization
  const pluralizationContent = `## การใช้งาน Pluralization

next-intl รองรับการใช้งาน Pluralization สำหรับข้อความที่ต้องการแสดงในรูปแบบเอกพจน์หรือพหูพจน์:`;

  // โค้ดตัวอย่างสำหรับไฟล์แปลภาษาที่มี Pluralization
  const pluralizationTranslationCode = `// locales/en.json
{
  "cart": {
    "items": {
      "one": "You have {count} item in your cart",
      "other": "You have {count} items in your cart"
    },
    "empty": "Your cart is empty"
  }
}

// locales/th.json
{
  "cart": {
    "items": {
      "other": "คุณมีสินค้า {count} ชิ้นในตะกร้า"
    },
    "empty": "ตะกร้าของคุณว่างเปล่า"
  }
}`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Pluralization
  const pluralizationComponentCode = `// components/CartSummary.tsx
'use client';

import { useTranslations } from 'next-intl';

// คอมโพเนนต์สำหรับแสดงสรุปตะกร้าสินค้า
export default function CartSummary({ itemCount }: { itemCount: number }) {
  // ใช้ Hook useTranslations
  const t = useTranslations('cart');
  
  return (
    <div className="bg-surface p-4 rounded-lg">
      {itemCount > 0 ? (
        <p>{t('items', { count: itemCount })}</p>
      ) : (
        <p>{t('empty')}</p>
      )}
    </div>
  );
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้วิธีการแปลภาษาใน Next.js ดังนี้:

1. การแปลภาษาด้วย URL Path
2. การใช้งานไฟล์แปลภาษา
3. การสร้างตัวเลือกภาษา
4. การใช้งาน next-intl
5. การใช้งาน Formatters
6. การใช้งาน Pluralization

การแปลภาษาเป็นส่วนสำคัญในการพัฒนาเว็บไซต์ที่เข้าถึงผู้ใช้ทั่วโลก Next.js มีเครื่องมือและไลบรารีที่ช่วยให้การแปลภาษาเป็นเรื่องง่าย`;

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
            <h1 className="text-3xl font-bold mb-2">การแปลภาษา (Internationalization)</h1>
            <p className="text-text-secondary">ตัวอย่างการแปลภาษาใน Next.js ด้วยวิธีการต่างๆ</p>
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
        <MarkdownContent content={i18nApproachesContent} />
        <MarkdownContent content={i18nUrlPathContent} />
        <CodeBlock code={nextConfigCode} language="javascript" fileName="next.config.js" />
        <CodeBlock code={middlewareCode} language="typescript" fileName="middleware.ts" />
        <CodeBlock code={linkCode} language="typescript" fileName="components/LanguageLink.tsx" />
        <CodeBlock code={languageSwitcherCode} language="typescript" fileName="components/LanguageSwitcher.tsx" />
        <MarkdownContent content={translationFilesContent} />
        <CodeBlock code={enTranslationCode} language="json" fileName="locales/en.json" />
        <CodeBlock code={thTranslationCode} language="json" fileName="locales/th.json" />
        <CodeBlock code={useTranslationCode} language="typescript" fileName="lib/i18n.ts" />
        <CodeBlock code={useTranslationComponentCode} language="typescript" fileName="components/Header.tsx" />
        <MarkdownContent content={nextIntlContent} />
        <CodeBlock code={installNextIntlCode} language="bash" fileName="Terminal" />
        <CodeBlock code={nextIntlConfigCode} language="javascript" fileName="next.config.js" />
        <CodeBlock code={i18nConfigCode} language="typescript" fileName="i18n.ts" />
        <CodeBlock code={nextIntlMiddlewareCode} language="typescript" fileName="middleware.ts" />
        <CodeBlock code={nextIntlServerComponentCode} language="typescript" fileName="app/[locale]/page.tsx" />
        <CodeBlock code={nextIntlClientComponentCode} language="typescript" fileName="components/ContactForm.tsx" />
        <MarkdownContent content={formattersContent} />
        <CodeBlock code={formattersCode} language="typescript" fileName="components/ProductPrice.tsx" />
        <MarkdownContent content={pluralizationContent} />
        <CodeBlock code={pluralizationTranslationCode} language="json" fileName="locales/en.json & locales/th.json" />
        <CodeBlock code={pluralizationComponentCode} language="typescript" fileName="components/CartSummary.tsx" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
