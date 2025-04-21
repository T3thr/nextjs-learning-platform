import { users, accounts, sessions, verificationTokens, userPoints, userAchievements, userStreaks } from './users';
import { categories, lessons, exercises, guidelines, examples, userProgress } from './content';
import { achievements, feedback } from './gamification';

// นำเข้าและส่งออกทุก schema เพื่อให้สามารถเข้าถึงได้จากที่เดียว
export {
  // User-related schemas
  users,
  accounts,
  sessions,
  verificationTokens,
  userPoints,
  userAchievements,
  userStreaks,
  
  // Content-related schemas
  categories,
  lessons,
  exercises,
  guidelines,
  examples,
  userProgress,
  
  // Gamification-related schemas
  achievements,
  feedback
};