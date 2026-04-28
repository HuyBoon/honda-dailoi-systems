import type { ReactNode } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  actionButtonText?: string;
  onActionClick?: () => void;
  extraFilter?: ReactNode;
}

export const PageHeader = ({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm...",
  actionButtonText,
  onActionClick,
  extraFilter
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all duration-200">
      <div>
        <h1 className="text-2xl font-bold text-honda-red">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
        {onSearchChange && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder={searchPlaceholder} 
              className="pl-10 rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red transition-all" 
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
        
        {extraFilter}

        {actionButtonText && onActionClick && (
          <Button 
            onClick={onActionClick} 
            className="bg-honda-red hover:bg-red-700 text-white gap-2 h-10 rounded-lg px-4 shadow-sm shadow-honda-red/20 transition-all font-bold"
          >
            <Plus size={18} />
            {actionButtonText}
          </Button>
        )}
      </div>
    </div>
  );
};
