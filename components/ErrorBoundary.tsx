"use client";

import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// คอมโพเนนต์ ErrorBoundary สำหรับจัดการข้อผิดพลาดในแอปพลิเคชัน
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // อัพเดท state เมื่อเกิดข้อผิดพลาด
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // ฟังก์ชันสำหรับบันทึกข้อผิดพลาด (สามารถเชื่อมต่อกับบริการบันทึกข้อผิดพลาดได้ที่นี่)
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary จับข้อผิดพลาดได้:', error, errorInfo);
    // สามารถส่งข้อผิดพลาดไปยังบริการติดตามข้อผิดพลาดเช่น Sentry, LogRocket ได้ที่นี่
  }

  render() {
    // หากเกิดข้อผิดพลาด แสดง fallback UI
    if (this.state.hasError) {
      // หากมี fallback prop ให้แสดง fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // UI เริ่มต้นเมื่อเกิดข้อผิดพลาด
      return (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
          <h2 className="font-bold text-lg mb-2">เกิดข้อผิดพลาด</h2>
          <p className="mb-2">ขออภัย เกิดข้อผิดพลาดในการโหลดเนื้อหา</p>
          {this.state.error && (
            <details className="mb-2">
              <summary className="cursor-pointer text-sm">รายละเอียดข้อผิดพลาด</summary>
              <pre className="text-xs mt-1 p-2 bg-red-100 rounded overflow-auto">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <button
            onClick={() => {
              // รีเซ็ตสถานะข้อผิดพลาด
              this.setState({ hasError: false, error: undefined });
            }}
            className="text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded transition-colors"
          >
            ลองอีกครั้ง
          </button>
        </div>
      );
    }

    // หากไม่มีข้อผิดพลาด แสดง children ตามปกติ
    return this.props.children;
  }
}