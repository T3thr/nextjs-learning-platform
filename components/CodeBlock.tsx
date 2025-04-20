"use client";

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@/context/ThemeContext';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  fileName?: string;
  highlightLines?: number[];
}

// คอมโพเนนต์สำหรับแสดงโค้ดพร้อมการเน้นไวยากรณ์ (syntax highlighting)
export default function CodeBlock({
  code,
  language = 'typescript',
  showLineNumbers = true,
  fileName,
  highlightLines = [],
}: CodeBlockProps) {
  // ใช้ context สำหรับตรวจสอบธีมปัจจุบัน (มืด/สว่าง)
  const { theme } = useTheme();
  
  // สถานะสำหรับการคัดลอกโค้ด
  const [copied, setCopied] = useState(false);
  
  // ฟังก์ชันสำหรับคัดลอกโค้ดไปยังคลิปบอร์ด
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    
    // รีเซ็ตสถานะ "คัดลอกแล้ว" หลังจาก 2 วินาที
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-text-secondary/20">
      {/* ส่วนหัวของบล็อกโค้ด */}
      {fileName && (
        <div className="flex items-center justify-between px-4 py-2 bg-surface">
          <span className="text-sm font-mono">{fileName}</span>
          <button
            onClick={copyToClipboard}
            className="text-sm flex items-center text-text-secondary hover:text-primary transition-colors"
            aria-label={copied ? "คัดลอกแล้ว" : "คัดลอกโค้ด"}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                คัดลอกแล้ว
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
                คัดลอก
              </>
            )}
          </button>
        </div>
      )}
      
      {/* ส่วนแสดงโค้ด */}
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? vscDarkPlus : vs}
        showLineNumbers={showLineNumbers}
        wrapLines={true}
        lineProps={(lineNumber) => {
          const style: React.CSSProperties = { display: 'block' };
          if (highlightLines.includes(lineNumber)) {
            style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
            style.borderLeft = `3px solid ${theme === 'dark' ? '#3b82f6' : '#0070f3'}`;
            style.paddingLeft = '1rem';
          }
          return { style };
        }}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.9rem',
          borderRadius: 0,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
