import { useState } from 'react';
import { useGetFilesQuery } from '@/store/api/uploadApiSlice';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Loader2, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const API_BASE_URL = 'http://localhost:3000';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentValue?: string;
}

export const MediaPickerModal = ({ 
  isOpen, 
  onClose, 
  onSelect, 
  currentValue 
}: MediaPickerModalProps) => {
  const { data: files, isLoading } = useGetFilesQuery();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = files?.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] rounded-2xl bg-white p-0 overflow-hidden border-none shadow-2xl flex flex-col max-h-[85vh]">
        <DialogHeader className="p-6 pb-2 shrink-0">
          <DialogTitle className="text-xl font-bold text-gray-900">Thư viện hình ảnh</DialogTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Tìm kiếm hình ảnh..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-honda-red/20 text-sm"
            />
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 pt-2 custom-scrollbar">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-honda-red" />
            </div>
          ) : !filteredFiles?.length ? (
            <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-3 border-2 border-dashed border-gray-100 rounded-xl">
              <ImageIcon size={48} className="opacity-20" />
              <p>Không tìm thấy hình ảnh nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredFiles.map((file) => {
                const isSelected = currentValue === file.url;
                return (
                  <button
                    key={file.name}
                    onClick={() => {
                      onSelect(file.url);
                      onClose();
                    }}
                    className={`
                      group relative aspect-square rounded-xl overflow-hidden border-2 transition-all
                      ${isSelected ? 'border-honda-red ring-2 ring-honda-red/10' : 'border-transparent hover:border-gray-200'}
                    `}
                  >
                    <img 
                      src={getImageUrl(file.url)} 
                      alt={file.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-white rounded-full p-0.5 text-honda-red shadow-lg">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black/50 text-white text-[10px] truncate opacity-0 group-hover:opacity-100 transition-opacity">
                      {file.name}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="rounded-xl">Hủy bỏ</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
