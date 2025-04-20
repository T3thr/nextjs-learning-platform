// drizzle.config.ts
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './backend/db/migrations', // โฟลเดอร์สำหรับเก็บไฟล์ migration
  schema: './backend/db/schema/*.ts', // รวมทุกไฟล์ schema ในโฟลเดอร์
  dialect: 'postgresql', // ใช้ PostgreSQL สำหรับ Neon
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Connection string จาก Neon
  },
  verbose: true, // แสดงรายละเอียดการทำงานของ Drizzle Kit
  strict: true, // บังคับให้ schema ตรงกับฐานข้อมูล
});