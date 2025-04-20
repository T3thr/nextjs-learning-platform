import React from 'react';
import MarkdownContent from '@/components/MarkdownContent';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

// หน้าแสดงตัวอย่างการปรับแต่งรูปภาพใน Next.js
export default function ImageOptimizationExample() {
  // เนื้อหาตัวอย่างในรูปแบบ Markdown
  const exampleContent = `# การปรับแต่งรูปภาพใน Next.js

Next.js มีระบบการปรับแต่งรูปภาพ (Image Optimization) ที่ทรงพลังผ่านคอมโพเนนต์ \`Image\` ซึ่งช่วยปรับปรุงประสิทธิภาพของเว็บไซต์โดยอัตโนมัติ ในตัวอย่างนี้ เราจะแสดงวิธีการใช้งานคอมโพเนนต์ \`Image\` และเทคนิคการปรับแต่งรูปภาพต่างๆ ใน Next.js

## ประโยชน์ของการใช้คอมโพเนนต์ Image ใน Next.js

1. **การปรับขนาดอัตโนมัติ**: ปรับขนาดรูปภาพให้เหมาะสมกับอุปกรณ์ที่ใช้งาน
2. **การเพิ่มประสิทธิภาพรูปแบบไฟล์**: แปลงรูปภาพเป็นรูปแบบที่ทันสมัยเช่น WebP และ AVIF
3. **การโหลดแบบ Lazy**: โหลดรูปภาพเฉพาะเมื่อเลื่อนมาถึงตำแหน่งที่มองเห็น
4. **การป้องกัน Layout Shift**: ป้องกันการเลื่อนของเลย์เอาต์ด้วยการกำหนดขนาดล่วงหน้า
5. **การปรับแต่งคุณภาพ**: ควบคุมคุณภาพของรูปภาพเพื่อลดขนาดไฟล์`;

  // เนื้อหาเกี่ยวกับการใช้งานคอมโพเนนต์ Image พื้นฐาน
  const basicImageContent = `## การใช้งานคอมโพเนนต์ Image พื้นฐาน

คอมโพเนนต์ \`Image\` ใน Next.js เป็นส่วนขยายของแท็ก \`<img>\` ในHTML ที่มีการปรับแต่งเพิ่มเติมเพื่อเพิ่มประสิทธิภาพ:`;

  // โค้ดตัวอย่างสำหรับการใช้งานคอมโพเนนต์ Image พื้นฐาน
  const basicImageCode = `// components/BasicImage.tsx
import Image from 'next/image';

// คอมโพเนนต์แสดงรูปภาพพื้นฐาน
export default function BasicImage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">การใช้งานคอมโพเนนต์ Image พื้นฐาน</h2>
        
        {/* การใช้งานคอมโพเนนต์ Image พื้นฐาน */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <Image
            src="/images/example-image.jpg" // ที่อยู่ของรูปภาพ (ต้องอยู่ในโฟลเดอร์ public)
            alt="ตัวอย่างรูปภาพ" // คำอธิบายรูปภาพ (จำเป็นต้องระบุเพื่อความเข้าถึงได้)
            fill // ใช้เต็มพื้นที่ของ parent element
            className="object-cover" // ปรับขนาดรูปภาพให้ครอบคลุมพื้นที่
            priority // โหลดรูปภาพทันทีเมื่อหน้าเว็บโหลด (เหมาะสำหรับรูปภาพที่อยู่ส่วนบนของหน้าเว็บ)
          />
        </div>
        
        <p className="text-text-secondary mt-2">
          รูปภาพนี้ใช้คุณสมบัติ <code>fill</code> เพื่อเต็มพื้นที่ของ parent element และ <code>object-cover</code> เพื่อปรับขนาดรูปภาพให้ครอบคลุมพื้นที่
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">การกำหนดขนาดแบบชัดเจน</h3>
        
        {/* การกำหนดขนาดแบบชัดเจน */}
        <div>
          <Image
            src="/images/example-image-2.jpg"
            alt="ตัวอย่างรูปภาพที่กำหนดขนาดแบบชัดเจน"
            width={600} // กำหนดความกว้าง
            height={400} // กำหนดความสูง
            className="rounded-lg" // เพิ่ม border radius
          />
        </div>
        
        <p className="text-text-secondary mt-2">
          รูปภาพนี้ใช้การกำหนดขนาดแบบชัดเจนด้วย <code>width</code> และ <code>height</code>
        </p>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการปรับแต่งรูปภาพตามอุปกรณ์
  const responsiveImageContent = `## การปรับแต่งรูปภาพตามอุปกรณ์ (Responsive Images)

Next.js สามารถสร้างรูปภาพที่ปรับขนาดตามอุปกรณ์ได้โดยอัตโนมัติ ซึ่งช่วยให้รูปภาพแสดงผลได้อย่างเหมาะสมบนอุปกรณ์ที่มีขนาดหน้าจอแตกต่างกัน:`;

  // โค้ดตัวอย่างสำหรับการปรับแต่งรูปภาพตามอุปกรณ์
  const responsiveImageCode = `// components/ResponsiveImage.tsx
import Image from 'next/image';

// คอมโพเนนต์แสดงรูปภาพที่ปรับขนาดตามอุปกรณ์
export default function ResponsiveImage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">การปรับแต่งรูปภาพตามอุปกรณ์</h2>
        
        {/* การใช้งาน sizes เพื่อปรับขนาดตามอุปกรณ์ */}
        <div>
          <Image
            src="/images/responsive-image.jpg"
            alt="รูปภาพที่ปรับขนาดตามอุปกรณ์"
            width={1200}
            height={800}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            // sizes กำหนดขนาดของรูปภาพตามขนาดหน้าจอ:
            // - หน้าจอขนาดเล็กกว่า 640px: รูปภาพกว้าง 100% ของหน้าจอ
            // - หน้าจอขนาด 640px-1024px: รูปภาพกว้าง 50% ของหน้าจอ
            // - หน้าจอขนาดใหญ่กว่า 1024px: รูปภาพกว้าง 33% ของหน้าจอ
            className="w-full rounded-lg"
          />
        </div>
        
        <p className="text-text-secondary mt-2">
          รูปภาพนี้ใช้คุณสมบัติ <code>sizes</code> เพื่อปรับขนาดตามอุปกรณ์
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">การใช้งานกับ CSS Grid</h3>
        
        {/* การใช้งานกับ CSS Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={\`/images/grid-image-\${num}.jpg\`}
                alt={\`รูปภาพ Grid \${num}\`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        
        <p className="text-text-secondary mt-2">
          รูปภาพเหล่านี้ใช้ CSS Grid และคุณสมบัติ <code>fill</code> ร่วมกับ <code>sizes</code> เพื่อปรับขนาดตามอุปกรณ์
        </p>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการปรับแต่งคุณภาพและรูปแบบรูปภาพ
  const imageQualityContent = `## การปรับแต่งคุณภาพและรูปแบบรูปภาพ

Next.js สามารถปรับแต่งคุณภาพและรูปแบบของรูปภาพได้ ซึ่งช่วยลดขนาดไฟล์และเพิ่มความเร็วในการโหลดหน้าเว็บ:`;

  // โค้ดตัวอย่างสำหรับการปรับแต่งคุณภาพและรูปแบบรูปภาพ
  const imageQualityCode = `// components/ImageQuality.tsx
import Image from 'next/image';

// คอมโพเนนต์แสดงการปรับแต่งคุณภาพและรูปแบบรูปภาพ
export default function ImageQuality() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">การปรับแต่งคุณภาพรูปภาพ</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* รูปภาพคุณภาพต่ำ (25%) */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/quality-example.jpg"
                alt="รูปภาพคุณภาพต่ำ"
                fill
                quality={25} // กำหนดคุณภาพรูปภาพเป็น 25%
                className="object-cover"
              />
            </div>
            <p className="text-center mt-2">คุณภาพ 25%</p>
          </div>
          
          {/* รูปภาพคุณภาพปานกลาง (50%) */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/quality-example.jpg"
                alt="รูปภาพคุณภาพปานกลาง"
                fill
                quality={50} // กำหนดคุณภาพรูปภาพเป็น 50%
                className="object-cover"
              />
            </div>
            <p className="text-center mt-2">คุณภาพ 50%</p>
          </div>
          
          {/* รูปภาพคุณภาพสูง (75%) */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/quality-example.jpg"
                alt="รูปภาพคุณภาพสูง"
                fill
                quality={75} // กำหนดคุณภาพรูปภาพเป็น 75%
                className="object-cover"
              />
            </div>
            <p className="text-center mt-2">คุณภาพ 75%</p>
          </div>
        </div>
        
        <p className="text-text-secondary mt-2">
          คุณสามารถปรับแต่งคุณภาพของรูปภาพด้วยคุณสมบัติ <code>quality</code> (ค่าเริ่มต้นคือ 75)
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">การกำหนดรูปแบบรูปภาพ</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* รูปแบบ WebP */}
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/images/format-example.jpg"
                alt="รูปภาพรูปแบบ WebP"
                fill
                className="object-cover"
                placeholder="blur" // แสดงภาพเบลอขณะโหลด
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
            <p className="text-center mt-2">รูปแบบ WebP (ค่าเริ่มต้น)</p>
          </div>
          
          {/* รูปแบบ AVIF */}
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="/images/format-example.jpg"
                alt="รูปภาพรูปแบบ AVIF"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
            <p className="text-center mt-2">รูปแบบ AVIF (ต้องกำหนดใน next.config.js)</p>
          </div>
        </div>
        
        <p className="text-text-secondary mt-2">
          Next.js จะแปลงรูปภาพเป็นรูปแบบ WebP โดยค่าเริ่มต้น แต่คุณสามารถกำหนดรูปแบบอื่นๆ เช่น AVIF ได้ใน next.config.js
        </p>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Placeholder และ Blur
  const placeholderContent = `## การใช้งาน Placeholder และ Blur

Next.js มีฟีเจอร์ placeholder และ blur ที่ช่วยปรับปรุงประสบการณ์ผู้ใช้ในระหว่างที่รูปภาพกำลังโหลด:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Placeholder และ Blur
  const placeholderCode = `// components/ImagePlaceholder.tsx
import Image from 'next/image';

// คอมโพเนนต์แสดงการใช้งาน Placeholder และ Blur
export default function ImagePlaceholder() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">การใช้งาน Placeholder</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ไม่มี Placeholder */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/placeholder-example.jpg"
                alt="รูปภาพไม่มี Placeholder"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center mt-2">ไม่มี Placeholder</p>
          </div>
          
          {/* Placeholder แบบ Empty */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/placeholder-example.jpg"
                alt="รูปภาพมี Placeholder แบบ Empty"
                fill
                placeholder="empty" // แสดงพื้นที่ว่างขณะโหลด
                className="object-cover"
              />
            </div>
            <p className="text-center mt-2">Placeholder แบบ Empty</p>
          </div>
          
          {/* Placeholder แบบ Blur */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="/images/placeholder-example.jpg"
                alt="รูปภาพมี Placeholder แบบ Blur"
                fill
                placeholder="blur" // แสดงภาพเบลอขณะโหลด
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                className="object-cover"
              />
            </div>
            <p className="text-center mt-2">Placeholder แบบ Blur</p>
          </div>
        </div>
        
        <p className="text-text-secondary mt-2">
          คุณสามารถใช้คุณสมบัติ <code>placeholder</code> เพื่อกำหนดการแสดงผลในระหว่างที่รูปภาพกำลังโหลด
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">การสร้าง BlurDataURL</h3>
        
        <p className="mb-4">
          คุณสามารถสร้าง BlurDataURL ได้หลายวิธี:
        </p>
        
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>สำหรับรูปภาพแบบ Static Import:</strong> Next.js จะสร้าง BlurDataURL ให้โดยอัตโนมัติ
          </li>
          <li>
            <strong>สำหรับรูปภาพจากภายนอก:</strong> คุณต้องสร้าง BlurDataURL เอง หรือใช้ไลบรารีเช่น <code>plaiceholder</code>
          </li>
          <li>
            <strong>สำหรับรูปภาพจาก CMS:</strong> หลาย CMS มี API สำหรับสร้าง BlurDataURL หรือ Low-Quality Image Placeholder (LQIP)
          </li>
        </ol>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งานรูปภาพจากภายนอก
  const externalImageContent = `## การใช้งานรูปภาพจากภายนอก

Next.js สามารถปรับแต่งรูปภาพจากภายนอกได้ แต่ต้องกำหนดโดเมนที่อนุญาตใน next.config.js ก่อน:`;

  // โค้ดตัวอย่างสำหรับการกำหนดค่าใน next.config.js
  const nextConfigCode = `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // กำหนดโดเมนที่อนุญาตให้โหลดรูปภาพจากภายนอก
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
    ],
    // กำหนดรูปแบบรูปภาพที่ต้องการ
    formats: ['image/webp', 'image/avif'],
    // กำหนดขนาดรูปภาพที่ต้องการสร้างล่วงหน้า
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // กำหนดความกว้างของรูปภาพที่ต้องการสร้างล่วงหน้า
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;`;

  // โค้ดตัวอย่างสำหรับการใช้งานรูปภาพจากภายนอก
  const externalImageCode = `// components/ExternalImage.tsx
import Image from 'next/image';

// คอมโพเนนต์แสดงการใช้งานรูปภาพจากภายนอก
export default function ExternalImage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">การใช้งานรูปภาพจากภายนอก</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* รูปภาพจาก Unsplash */}
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1682687220063-4742bd7fd538"
                alt="รูปภาพจาก Unsplash"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center mt-2">รูปภาพจาก Unsplash</p>
          </div>
          
          {/* รูปภาพจาก Picsum */}
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src="https://picsum.photos/800/600"
                alt="รูปภาพจาก Picsum"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center mt-2">รูปภาพจาก Picsum</p>
          </div>
        </div>
        
        <p className="text-text-secondary mt-2">
          คุณสามารถใช้รูปภาพจากภายนอกได้ แต่ต้องกำหนดโดเมนที่อนุญาตใน next.config.js ก่อน
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">การใช้งานรูปภาพจาก CMS</h3>
        
        <div className="bg-surface-secondary p-4 rounded-lg">
          <pre className="text-sm overflow-x-auto">
{`// ตัวอย่างการใช้งานรูปภาพจาก CMS
import Image from 'next/image';

// ข้อมูลจาก CMS
const product = {
  name: 'สินค้าตัวอย่าง',
  image: {
    url: 'https://example.com/images/product.jpg',
    width: 800,
    height: 600,
    alt: 'สินค้าตัวอย่าง',
    blurDataURL: 'data:image/jpeg;base64,...',
  },
};

export default function ProductImage() {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden">
      <Image
        src={product.image.url}
        alt={product.image.alt}
        width={product.image.width}
        height={product.image.height}
        placeholder="blur"
        blurDataURL={product.image.blurDataURL}
        className="object-cover"
      />
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Static Import
  const staticImportContent = `## การใช้งาน Static Import

การใช้ Static Import ช่วยให้ Next.js สามารถปรับแต่งรูปภาพได้ดีขึ้น และสร้าง BlurDataURL ให้โดยอัตโนมัติ:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Static Import
  const staticImportCode = `// components/StaticImportImage.tsx
import Image from 'next/image';
// นำเข้ารูปภาพแบบ Static Import
import profilePic from '@/public/images/profile.jpg';
import bannerPic from '@/public/images/banner.jpg';
import galleryPic1 from '@/public/images/gallery-1.jpg';
import galleryPic2 from '@/public/images/gallery-2.jpg';
import galleryPic3 from '@/public/images/gallery-3.jpg';

// คอมโพเนนต์แสดงการใช้งาน Static Import
export default function StaticImportImage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">การใช้งาน Static Import</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* รูปภาพโปรไฟล์ */}
          <div>
            <div className="flex justify-center">
              <Image
                src={profilePic}
                alt="รูปภาพโปรไฟล์"
                placeholder="blur" // Next.js จะสร้าง BlurDataURL ให้โดยอัตโนมัติ
                className="rounded-full"
              />
            </div>
            <p className="text-center mt-2">รูปภาพโปรไฟล์</p>
          </div>
          
          {/* รูปภาพแบนเนอร์ */}
          <div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={bannerPic}
                alt="รูปภาพแบนเนอร์"
                placeholder="blur"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center mt-2">รูปภาพแบนเนอร์</p>
          </div>
        </div>
        
        <p className="text-text-secondary mt-2">
          การใช้ Static Import ช่วยให้ Next.js สามารถปรับแต่งรูปภาพได้ดีขึ้น และสร้าง BlurDataURL ให้โดยอัตโนมัติ
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">แกลเลอรีรูปภาพ</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* รูปภาพแกลเลอรี 1 */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={galleryPic1}
                alt="รูปภาพแกลเลอรี 1"
                placeholder="blur"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* รูปภาพแกลเลอรี 2 */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={galleryPic2}
                alt="รูปภาพแกลเลอรี 2"
                placeholder="blur"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* รูปภาพแกลเลอรี 3 */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={galleryPic3}
                alt="รูปภาพแกลเลอรี 3"
                placeholder="blur"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  // เนื้อหาเกี่ยวกับการใช้งาน Image ใน Server Components
  const serverComponentsContent = `## การใช้งาน Image ใน Server Components

ใน Next.js 13+ คอมโพเนนต์ \`Image\` สามารถใช้งานได้ทั้งใน Client Components และ Server Components:`;

  // โค้ดตัวอย่างสำหรับการใช้งาน Image ใน Server Components
  const serverComponentsCode = `// components/ServerComponentImage.tsx
import Image from 'next/image';
import { getPosts } from '@/lib/posts';

// คอมโพเนนต์แสดงการใช้งาน Image ใน Server Components
export default async function ServerComponentImage() {
  // โหลดข้อมูลโพสต์จาก API
  const posts = await getPosts();
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">การใช้งาน Image ใน Server Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.slice(0, 4).map((post) => (
            <div key={post.id} className="bg-surface-secondary p-4 rounded-lg">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-text-secondary">{post.excerpt}</p>
            </div>
          ))}
        </div>
        
        <p className="text-text-secondary mt-2">
          คอมโพเนนต์ Image สามารถใช้งานได้ทั้งใน Client Components และ Server Components
        </p>
      </div>
    </div>
  );
}

// lib/posts.ts
// ฟังก์ชันสำหรับการโหลดข้อมูลโพสต์
export async function getPosts() {
  // โหลดข้อมูลโพสต์จาก API
  const response = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 }, // ตั้งค่า revalidate ทุก 60 วินาที
  });
  
  // ถ้าการตอบกลับไม่สำเร็จ
  if (!response.ok) {
    throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
  }
  
  // แปลงข้อมูลการตอบกลับเป็น JSON
  return response.json();
}`;

  // เนื้อหาสรุป
  const summaryContent = `## สรุป

ในตัวอย่างนี้ เราได้เรียนรู้วิธีการปรับแต่งรูปภาพใน Next.js ดังนี้:

1. การใช้งานคอมโพเนนต์ Image พื้นฐาน
2. การปรับแต่งรูปภาพตามอุปกรณ์ (Responsive Images)
3. การปรับแต่งคุณภาพและรูปแบบรูปภาพ
4. การใช้งาน Placeholder และ Blur
5. การใช้งานรูปภาพจากภายนอก
6. การใช้งาน Static Import
7. การใช้งาน Image ใน Server Components

การปรับแต่งรูปภาพเป็นส่วนสำคัญในการพัฒนาเว็บไซต์ที่มีประสิทธิภาพ Next.js ช่วยให้การปรับแต่งรูปภาพเป็นเรื่องง่าย และช่วยปรับปรุงประสิทธิภาพของเว็บไซต์โดยอัตโนมัติ`;

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
            <h1 className="text-3xl font-bold mb-2">การปรับแต่งรูปภาพ</h1>
            <p className="text-text-secondary">ตัวอย่างการปรับแต่งรูปภาพใน Next.js ด้วยคอมโพเนนต์ Image</p>
          </div>
          
          <div className="flex items-center">
            <span className="badge bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs mr-2">
              ระดับพื้นฐาน
            </span>
            <span className="flex items-center text-text-secondary text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              15 นาที
            </span>
          </div>
        </div>
      </div>
      
      {/* เนื้อหาตัวอย่าง */}
      <div className="bg-surface p-8 rounded-lg">
        <MarkdownContent content={exampleContent} />
        <MarkdownContent content={basicImageContent} />
        <CodeBlock code={basicImageCode} language="typescript" fileName="components/BasicImage.tsx" />
        <MarkdownContent content={responsiveImageContent} />
        <CodeBlock code={responsiveImageCode} language="typescript" fileName="components/ResponsiveImage.tsx" />
        <MarkdownContent content={imageQualityContent} />
        <CodeBlock code={imageQualityCode} language="typescript" fileName="components/ImageQuality.tsx" />
        <MarkdownContent content={placeholderContent} />
        <CodeBlock code={placeholderCode} language="typescript" fileName="components/ImagePlaceholder.tsx" />
        <MarkdownContent content={externalImageContent} />
        <CodeBlock code={nextConfigCode} language="javascript" fileName="next.config.js" />
        <CodeBlock code={externalImageCode} language="typescript" fileName="components/ExternalImage.tsx" />
        <MarkdownContent content={staticImportContent} />
        <CodeBlock code={staticImportCode} language="typescript" fileName="components/StaticImportImage.tsx" />
        <MarkdownContent content={serverComponentsContent} />
        <CodeBlock code={serverComponentsCode} language="typescript" fileName="components/ServerComponentImage.tsx" />
        <MarkdownContent content={summaryContent} />
      </div>
    </div>
  );
}
