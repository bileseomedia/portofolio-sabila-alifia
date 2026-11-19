import React from 'react';
import { Sparkles } from 'lucide-react';

export const Toast = ({ message, isDark }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-20 right-6 z-[90] px-5 py-3.5 rounded-2xl shadow-lg border flex items-center gap-3 transition-all duration-300 animate-reveal-up ${
        isDark
          ? 'bg-[#202F46] border-[#C5A56A] text-[#E1E5EB]'
          : 'bg-[#FFFCF8] border-[#CFE3F2] text-[#2C2520]'
      }`}
    >
      <Sparkles className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#C5A56A]' : 'text-[#5B7C99]'}`} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};
