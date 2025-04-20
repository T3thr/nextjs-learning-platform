# Database Schema Design

## Overview
This document details the database schema for the Next.js learning platform using Drizzle ORM with PostgreSQL. The schema is designed to support all platform features including user management, content organization, progress tracking, and gamification elements.

## Tables

### users
```typescript
// ผู้ใช้งานระบบ - เก็บข้อมูลผู้ใช้งานทั้งหมด
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  role: text('role', { enum: ['user', 'admin'] }).default('user').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});
```

### accounts
```typescript
// บัญชีผู้ใช้งานสำหรับ OAuth - เชื่อมต่อกับ NextAuth
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
```

### sessions
```typescript
// เซสชันของผู้ใช้งาน - จัดการโดย NextAuth
export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  sessionToken: text('session_token').notNull().unique(),
});
```

### verification_tokens
```typescript
// โทเค็นสำหรับยืนยันอีเมล
export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull().unique(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
}, (table) => {
  return {
    compoundKey: primaryKey({ columns: [table.identifier, table.token] }),
  };
});
```

### lessons
```typescript
// บทเรียน - เนื้อหาหลักของแพลตฟอร์ม
export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  difficulty: text('difficulty', { enum: ['beginner', 'intermediate', 'advanced'] }).notNull(),
  order: integer('order').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  estimatedMinutes: integer('estimated_minutes').notNull(),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});
```

### categories
```typescript
// หมวดหมู่ - จัดกลุ่มบทเรียนและเนื้อหา
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  order: integer('order').notNull(),
  parentId: integer('parent_id').references(() => categories.id),
});
```

### exercises
```typescript
// แบบฝึกหัด - สำหรับฝึกทักษะการเขียนโค้ด
export const exercises = pgTable('exercises', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  instructions: text('instructions').notNull(),
  starterCode: text('starter_code'),
  solutionCode: text('solution_code').notNull(),
  testCases: text('test_cases').notNull(),
  difficulty: text('difficulty', { enum: ['beginner', 'intermediate', 'advanced'] }).notNull(),
  lessonId: integer('lesson_id').references(() => lessons.id),
  points: integer('points').default(10).notNull(),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});
```

### guidelines
```typescript
// แนวทางปฏิบัติ - บทความแนะนำและแนวทางการพัฒนา
export const guidelines = pgTable('guidelines', {
  id: serial('id').primaryKey(),
  topic: text('topic').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});
```

### examples
```typescript
// ตัวอย่างโค้ด - ตัวอย่างการใช้งานจริง
export const examples = pgTable('examples', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  code: text('code').notNull(),
  explanation: text('explanation').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  published: boolean('published').default(false).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});
```

### user_progress
```typescript
// ความคืบหน้าของผู้ใช้ - ติดตามความก้าวหน้าในการเรียนรู้
export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: integer('lesson_id').references(() => lessons.id),
  exerciseId: integer('exercise_id').references(() => exercises.id),
  completed: boolean('completed').default(false).notNull(),
  score: integer('score'),
  completedAt: timestamp('completed_at', { mode: 'date' }),
  attempts: integer('attempts').default(0).notNull(),
  lastAttemptAt: timestamp('last_attempt_at', { mode: 'date' }),
});
```

### achievements
```typescript
// ความสำเร็จ - รางวัลและเหรียญตราสำหรับผู้ใช้
export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  requiredPoints: integer('required_points').notNull(),
  type: text('type', { enum: ['lesson', 'exercise', 'streak', 'special'] }).notNull(),
});
```

### user_achievements
```typescript
// ความสำเร็จของผู้ใช้ - เก็บข้อมูลความสำเร็จที่ผู้ใช้ได้รับ
export const userAchievements = pgTable('user_achievements', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  achievementId: integer('achievement_id').notNull().references(() => achievements.id),
  earnedAt: timestamp('earned_at', { mode: 'date' }).defaultNow().notNull(),
});
```

### user_points
```typescript
// คะแนนของผู้ใช้ - สำหรับระบบ gamification
export const userPoints = pgTable('user_points', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  points: integer('points').default(0).notNull(),
  level: integer('level').default(1).notNull(),
  lastUpdated: timestamp('last_updated', { mode: 'date' }).defaultNow().notNull(),
});
```

### feedback
```typescript
// ข้อเสนอแนะ - ความคิดเห็นของผู้ใช้ต่อเนื้อหา
export const feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  lessonId: integer('lesson_id').references(() => lessons.id),
  exerciseId: integer('exercise_id').references(() => exercises.id),
  guidelineId: integer('guideline_id').references(() => guidelines.id),
  exampleId: integer('example_id').references(() => examples.id),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});
```

## Relationships

### One-to-Many
- User → UserProgress (One user has many progress records)
- User → UserAchievements (One user has many achievements)
- Lesson → Exercises (One lesson has many exercises)
- Category → Lessons/Guidelines/Examples (One category has many content items)

### Many-to-Many
- Users ↔ Achievements (through UserAchievements)

## Indexes
- Email index on users table
- Slug indexes on lessons, categories
- Foreign key indexes on all relationship fields

## Constraints
- Unique constraints on email, slugs, and tokens
- Not null constraints on required fields
- Foreign key constraints with appropriate cascade actions

This schema design provides a solid foundation for the learning platform, supporting all required features while maintaining data integrity and performance.
