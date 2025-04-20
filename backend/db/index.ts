import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Pool } from 'pg';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

// สร้างการเชื่อมต่อกับฐานข้อมูล PostgreSQL ผ่าน Neon
// ใช้ connection string จาก environment variable
const sql = neon(process.env.DATABASE_URL!);

// สร้าง Drizzle ORM client สำหรับการ query ผ่าน Neon HTTP
// เพื่อให้สามารถใช้งาน type-safe queries ได้
export const db = drizzle(sql, { schema });

// สร้างการเชื่อมต่อผ่าน node-postgres สำหรับการ migrate
// ใช้เฉพาะในสคริปต์ migration เพื่อรองรับ Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // จำนวนการเชื่อมต่อสูงสุดใน pool
  idleTimeoutMillis: 30000, // เวลาที่การเชื่อมต่อไม่ได้ใช้งานก่อนปิด
  connectionTimeoutMillis: 2000, // เวลารอการเชื่อมต่อสูงสุด
});

// สร้าง Drizzle ORM client สำหรับ migration
export const dbMigrate = drizzlePg(pool, { schema });

// ฟังก์ชันสำหรับทดสอบการเชื่อมต่อกับฐานข้อมูล
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('การเชื่อมต่อฐานข้อมูลสำเร็จ:', result[0]);
    return true;
  } catch (error) {
    console.error('การเชื่อมต่อฐานข้อมูลล้มเหลว:', error);
    return false;
  }
}