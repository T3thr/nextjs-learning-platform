"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

// กำหนดประเภทข้อมูลสำหรับ context
interface AuthContextType {
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: (provider?: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// สร้าง context สำหรับการจัดการสถานะการยืนยันตัวตน
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// คอมโพเนนต์ Provider สำหรับให้คอมโพเนนต์ลูกเข้าถึงข้อมูลการยืนยันตัวตน
export function AuthProvider({ children }: { children: ReactNode }) {
  // ใช้ useSession hook จาก next-auth/react เพื่อเข้าถึงข้อมูลเซสชัน
  const { data: session, status } = useSession();

  // ฟังก์ชันสำหรับการเข้าสู่ระบบ
  const handleSignIn = async (provider?: string) => {
    await signIn(provider, { callbackUrl: '/' });
  };

  // ฟังก์ชันสำหรับการออกจากระบบ
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // ค่าที่จะส่งให้กับ context
  const value = {
    session,
    status,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook สำหรับการเข้าถึง AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
