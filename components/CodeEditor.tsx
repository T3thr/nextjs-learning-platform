"use client";

import React, { useState } from 'react';
import { useProgress } from '@/context/ProgressContext';
import CodeBlock from './CodeBlock';

interface CodeEditorProps {
  starterCode: string;
  solutionCode: string;
  testCases?: string;
  onSubmit?: (code: string, isCorrect: boolean) => void;
}

// คอมโพเนนต์สำหรับแก้ไขโค้ดในแบบฝึกหัด
export default function CodeEditor({
  starterCode,
  solutionCode,
  testCases,
  onSubmit,
}: CodeEditorProps) {
  // สถานะสำหรับเก็บโค้ดที่ผู้ใช้กำลังแก้ไข
  const [code, setCode] = useState(starterCode);
  
  // สถานะสำหรับแสดงผลลัพธ์การทดสอบ
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  // สถานะสำหรับแสดงโค้ดเฉลย
  const [showSolution, setShowSolution] = useState(false);
  
  // สถานะสำหรับแสดงว่ากำลังทดสอบอยู่หรือไม่
  const [isRunning, setIsRunning] = useState(false);

  // ฟังก์ชันสำหรับรันโค้ดและทดสอบ
  const runCode = () => {
    setIsRunning(true);
    setTestResult(null);
    
    // จำลองการทดสอบโค้ด (ในสภาพแวดล้อมจริงควรใช้ API หรือ Web Worker)
    setTimeout(() => {
      try {
        // ตรวจสอบว่าโค้ดมีฟังก์ชันหรือคอมโพเนนต์ที่ต้องการหรือไม่
        const isCorrect = code.includes('return') && code.length > starterCode.length;
        
        if (isCorrect) {
          setTestResult({
            success: true,
            message: 'การทดสอบผ่านทั้งหมด! 🎉',
          });
          
          // เรียกใช้ callback ถ้ามี
          if (onSubmit) {
            onSubmit(code, true);
          }
        } else {
          setTestResult({
            success: false,
            message: 'การทดสอบล้มเหลว โปรดตรวจสอบโค้ดของคุณ',
          });
          
          if (onSubmit) {
            onSubmit(code, false);
          }
        }
      } catch (error) {
        setTestResult({
          success: false,
          message: `เกิดข้อผิดพลาด: ${error instanceof Error ? error.message : 'ไม่ทราบสาเหตุ'}`,
        });
      } finally {
        setIsRunning(false);
      }
    }, 1000);
  };

  return (
    <div className="border border-text-secondary/20 rounded-lg overflow-hidden">
      {/* แถบเครื่องมือ */}
      <div className="bg-surface p-2 flex justify-between items-center border-b border-text-secondary/20">
        <span className="font-mono text-sm">แก้ไขโค้ด</span>
        <div className="flex space-x-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="btn btn-primary btn-sm"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังทดสอบ...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
                รันโค้ด
              </>
            )}
          </button>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="btn btn-secondary btn-sm"
          >
            {showSolution ? 'ซ่อนเฉลย' : 'ดูเฉลย'}
          </button>
        </div>
      </div>
      
      {/* พื้นที่แก้ไขโค้ด */}
      <div className="p-4 bg-background">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 font-mono text-sm p-4 bg-surface border border-text-secondary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          spellCheck="false"
        />
      </div>
      
      {/* ผลลัพธ์การทดสอบ */}
      {testResult && (
        <div className={`p-4 ${testResult.success ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
          <h3 className={`font-bold ${testResult.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
            {testResult.success ? 'สำเร็จ!' : 'ล้มเหลว'}
          </h3>
          <p className={`mt-1 ${testResult.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {testResult.message}
          </p>
        </div>
      )}
      
      {/* แสดงเฉลย */}
      {showSolution && (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30">
          <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">เฉลย</h3>
          <CodeBlock
            code={solutionCode}
            language="typescript"
            fileName="solution.tsx"
          />
        </div>
      )}
    </div>
  );
}
