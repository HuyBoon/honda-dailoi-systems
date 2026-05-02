import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const step = 2; // Shows 2 pages on each side of current page

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > step + 2) {
        pages.push('ellipsis-start');
      }

      const start = Math.max(2, currentPage - step);
      const end = Math.min(totalPages - 1, currentPage + step);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - (step + 1)) {
        pages.push('ellipsis-end');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm gap-4">
      <div className="flex-1">
        <p className="text-sm text-gray-500 font-medium">
          Hiển thị <span className="font-bold text-gray-900">{(currentPage - 1) * pageSize + 1}</span> đến{' '}
          <span className="font-bold text-gray-900">
            {Math.min(currentPage * pageSize, totalItems)}
          </span>{' '}
          trong tổng số <span className="font-bold text-gray-900">{totalItems}</span> kết quả
        </p>
      </div>

      <nav className="flex items-center gap-1" aria-label="Pagination">
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-xl border-gray-100 text-gray-500 hover:bg-black hover:text-white transition-all"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {pages.map((page, index) => {
            if (typeof page === 'string') {
              return (
                <div key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-400">
                  <MoreHorizontal size={16} />
                </div>
              );
            }

            const isActive = page === currentPage;

            return (
              <Button
                key={page}
                variant={isActive ? "default" : "outline"}
                className={`
                  w-10 h-10 rounded-xl font-bold text-sm transition-all
                  ${isActive 
                    ? 'bg-black border-black text-white shadow-lg shadow-black/20' 
                    : 'border-gray-100 text-gray-500 hover:border-black hover:text-black'
                  }
                `}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-xl border-gray-100 text-gray-500 hover:bg-black hover:text-white transition-all"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
};
