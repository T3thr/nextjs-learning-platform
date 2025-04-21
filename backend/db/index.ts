import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Pool } from 'pg';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

// ตรวจสอบให้แน่ใจว่ามี DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// สร้างการเชื่อมต่อกับฐานข้อมูล PostgreSQL ผ่าน Neon
const sql = neon(process.env.DATABASE_URL);

// สร้าง Drizzle ORM client สำหรับการ query
export const db = drizzle(sql, { schema });

// สร้างการเชื่อมต่อผ่าน node-postgres สำหรับการ migrate
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true, // จำเป็นสำหรับการเชื่อมต่อกับ Neon
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
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