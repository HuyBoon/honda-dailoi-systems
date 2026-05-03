'use client';

import { useState, useEffect } from 'react';
import { ChevronsUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-24 lg:bottom-10 right-6 lg:right-10 z-[100]">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Cuộn lên đầu trang"
        className={`
          relative group flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 
          bg-black text-white rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] 
          transition-all duration-500 overflow-hidden
          hover:bg-[#CC0000] hover:scale-110 hover:shadow-[0_10px_20px_rgba(204,0,0,0.4)] active:scale-95
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}
        `}
      >
        <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full group-hover:animate-[spin_4s_linear_infinite]" />
        
        <ChevronsUp 
          size={24} 
          strokeWidth={3} 
          className="relative z-10 group-hover:-translate-y-1 transition-transform" 
        />
      </button>
    </div>
  );
}