import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: any;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, searchParams, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page') params.append(key, value as string);
    });
    params.append('page', page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <PaginationLink 
        href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'}
        disabled={currentPage === 1}
        icon={<ChevronLeft size={20} />}
      />

      <div className="flex items-center gap-2 p-2 bg-white rounded-3xl border border-gray-100 shadow-sm">
        {generatePaginationItems(currentPage, totalPages).map((item, idx) => (
          item === '...' ? (
            <span key={`dots-${idx}`} className="px-4 text-gray-300 font-black">...</span>
          ) : (
            <Link
              key={`page-${item}`}
              href={createPageUrl(item as number)}
              className={`
                w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-all
                ${currentPage === item 
                  ? 'bg-[#CC0000] text-white shadow-xl shadow-red-500/20 scale-110' 
                  : 'text-gray-400 hover:bg-gray-50 hover:text-black'
                }
              `}
            >
              {item}
            </Link>
          )
        ))}
      </div>

      <PaginationLink 
        href={currentPage < totalPages ? createPageUrl(currentPage + 1) : '#'}
        disabled={currentPage === totalPages}
        icon={<ChevronRight size={20} />}
      />
    </div>
  );
}

function PaginationLink({ href, disabled, icon }: { href: string; disabled: boolean; icon: React.ReactNode }) {
  if (disabled) {
    return (
      <div className="w-14 h-14 bg-gray-50 text-gray-300 rounded-3xl flex items-center justify-center border border-gray-100 cursor-not-allowed">
        {icon}
      </div>
    );
  }
  return (
    <Link 
      href={href}
      className="w-14 h-14 bg-white text-gray-900 rounded-3xl flex items-center justify-center border border-gray-100 hover:border-[#CC0000] hover:text-[#CC0000] hover:scale-105 active:scale-95 transition-all shadow-sm"
    >
      {icon}
    </Link>
  );
}

function generatePaginationItems(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: (number | string)[] = [];
  items.push(1);

  if (current > 3) items.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  if (current < total - 2) items.push('...');

  items.push(total);

  return items;
}
