import NextAuth from "next-auth";
import { authOptions } from "./options";

// สร้าง handler สำหรับ NextAuth.js
// ไฟล์นี้จะจัดการกับเส้นทาง API ทั้งหมดที่เกี่ยวข้องกับการยืนยันตัวตน
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
