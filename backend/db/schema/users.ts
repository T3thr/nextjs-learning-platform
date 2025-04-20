import { pgTable, serial, text, timestamp, integer, boolean, primaryKey } from 'drizzle-orm/pg-core';
import { achievements } from './gamification';

// ตารางผู้ใช้งาน - เก็บข้อมูลผู้ใช้งานทั้งหมด
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password'), // เพิ่มฟิลด์รหัสผ่านสำหรับ CredentialsProvider
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  role: text('role', { enum: ['user', 'admin'] }).default('user').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// ตารางบัญชีผู้ใช้งาน - สำหรับ OAuth providers (NextAuth)
export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

// ตารางเซสชัน - จัดการเซสชันของผู้ใช้งาน (NextAuth)
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  sessionToken: text('session_token').notNull().unique(),
});

// ตารางโทเค็นยืนยัน - สำหรับการยืนยันอีเมล (NextAuth)
export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull().unique(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (table) => ({
  compoundKey: primaryKey({ columns: [table.identifier, table.token] }), // ใช้ primaryKey จาก drizzle-orm
}));

// ตารางคะแนนของผู้ใช้ - สำหรับระบบ gamification
export const userPoints = pgTable('user_points', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  points: integer('points').default(0).notNull(),
  level: integer('level').default(1).notNull(),
  lastUpdated: timestamp('last_updated', { mode: 'date' }).defaultNow().notNull(),
});

// ตารางความสำเร็จของผู้ใช้ - เก็บข้อมูลความสำเร็จที่ผู้ใช้ได้รับ
export const userAchievements = pgTable('user_achievements', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  achievementId: integer('achievement_id').notNull().references(() => achievements.id, { onDelete: 'restrict' }),
  earnedAt: timestamp('earned_at', { mode: 'date' }).defaultNow().notNull(),
});