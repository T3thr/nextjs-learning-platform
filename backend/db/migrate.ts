// backend/db/migrate.ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import path from 'path';

// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// สร้าง Drizzle client สำหรับ migration
const db = drizzle(pool);

// รัน migration
async function main() {
  console.log('เริ่มต้นการ migrate ฐานข้อมูล...');
  try {
    await migrate(db, {
      migrationsFolder: path.resolve(__dirname, './migrations'),
    });
    console.log('การ migrate เสร็จสิ้นสำเร็จ!');
    process.exit(0);
  } catch (error) {
    console.error('การ migrate ล้มเหลว:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();