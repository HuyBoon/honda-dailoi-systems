'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Package, ArrowRight, History, Loader2, SearchX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Handle keyboard shortcuts (Cmd+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : (inputRef.current?.focus());
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Debounced Search API call
  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const res = await fetch(`${API_URL}/parts?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults((data.items || []).slice(0, 5)); // Show top 5 results
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = (id: string, name: string) => {
    // Save to recent searches
    const updated = [name, ...recentSearches.filter(s => s !== name)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    
    router.push(`/parts/${id}`);
    onClose();
    setQuery('');
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:pt-40">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Search Input Area */}
            <div className="p-6 border-b border-gray-100">
              <div className="relative flex items-center">
                <Search className="absolute left-0 text-gray-400" size={24} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Nhập tên phụ tùng, mã số hoặc barcode..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 bg-transparent outline-none text-xl font-bold text-gray-900 placeholder:text-gray-300"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-0 p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={18} className="text-gray-400" />
                  </button>
                )}
                {isLoading && (
                  <Loader2 className="absolute right-10 animate-spin text-[#CC0000]" size={18} />
                )}
              </div>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar pb-6">
              {query.length < 2 ? (
                // Initial State: Recent Searches
                <div className="p-6">
                  {recentSearches.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <History size={14} /> Tìm kiếm gần đây
                        </h3>
                        <button onClick={clearRecent} className="text-[10px] font-black text-[#CC0000] uppercase tracking-widest hover:underline">
                          Xóa tất cả
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((s) => (
                          <button
                            key={s}
                            onClick={() => setQuery(s)}
                            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-bold text-gray-600 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-400">
                      <p className="text-sm font-bold uppercase tracking-widest">Bắt đầu tìm kiếm...</p>
                      <p className="text-xs mt-1">Tìm theo tên, mã phụ tùng hoặc đời xe</p>
                    </div>
                  )}
                </div>
              ) : (
                // Live Results
                <div className="p-2">
                  {results.length > 0 ? (
                    <div className="space-y-1">
                      <h3 className="px-4 pt-4 pb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Kết quả phù hợp ({results.length})
                      </h3>
                      {results.map((part) => (
                        <button
                          key={part.id}
                          onClick={() => handleResultClick(part.id, part.name)}
                          className="w-full group flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all text-left"
                        >
                          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform border border-gray-100">
                            {part.imageUrl ? (
                              <img src={part.imageUrl} alt={part.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="text-gray-300" size={20} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-gray-900 truncate uppercase tracking-tight">
                              {part.name}
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase truncate">
                              Mã: {part.partNumber} • {part.category?.name}
                            </p>
                          </div>
                          <ArrowRight className="text-gray-300 group-hover:text-[#CC0000] group-hover:translate-x-1 transition-all" size={18} />
                        </button>
                      ))}
                      <div className="p-4 pt-6 border-t border-gray-50">
                        <button 
                          onClick={() => {
                            router.push(`/parts?q=${query}`);
                            onClose();
                          }}
                          className="w-full py-4 bg-gray-50 hover:bg-black hover:text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all"
                        >
                          Xem tất cả kết quả
                        </button>
                      </div>
                    </div>
                  ) : !isLoading && (
                    <div className="text-center py-20 px-6">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <SearchX className="text-gray-300" size={32} />
                      </div>
                      <p className="text-sm font-black text-gray-900 uppercase">Không tìm thấy kết quả</p>
                      <p className="text-xs text-gray-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                        Hãy thử lại với từ khóa khác hoặc kiểm tra lại mã phụ tùng.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer / Shortcuts */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded-md">↵</kbd> Chọn</span>
                <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded-md">↑↓</kbd> Di chuyển</span>
              </div>
              <span className="flex items-center gap-1.5">Nhấn <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded-md">ESC</kbd> để đóng</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
