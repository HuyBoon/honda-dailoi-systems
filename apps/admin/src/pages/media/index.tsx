import { useState, useMemo } from 'react';
import { 
  useGetFilesQuery, 
  useDeleteFileMutation 
} from '@/store/api/uploadApiSlice';
import { useGetPartsQuery } from '@/store/api/partApiSlice';
import { PageHeader } from '@/components/PageHeader';
import { 
  Image as ImageIcon, Trash2, Search, ExternalLink, 
  Info, AlertCircle, CheckCircle2, FileWarning
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


const API_BASE_URL = 'http://localhost:3000';

export const Media = () => {
  const { data: files, isLoading: isLoadingFiles, refetch } = useGetFilesQuery();
  const { data: partsData, isLoading: isLoadingParts } = useGetPartsQuery({ limit: 1000 }); // Get many parts for accurate usage check
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'used' | 'unused'>('all');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const usedImageUrls = useMemo(() => {
    if (!partsData?.items) return new Set<string>();
    return new Set(partsData.items.map(p => p.imageUrl).filter(Boolean));
  }, [partsData]);

  const filteredFiles = useMemo(() => {
    if (!files) return [];
    return files.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
      const isUsed = usedImageUrls.has(file.url);
      
      if (filter === 'used') return matchesSearch && isUsed;
      if (filter === 'unused') return matchesSearch && !isUsed;
      return matchesSearch;
    });
  }, [files, searchTerm, filter, usedImageUrls]);

  const handleDelete = async () => {
    if (!selectedFile) return;
    try {
      await deleteFile(selectedFile).unwrap();
      toast.success('Xóa hình ảnh thành công');
      setSelectedFile(null);
      refetch();
    } catch (err) {
      toast.error('Không thể xóa hình ảnh này');
    }
  };

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const stats = useMemo(() => {
    if (!files) return { total: 0, used: 0, unused: 0 };
    const total = files.length;
    const used = files.filter(f => usedImageUrls.has(f.url)).length;
    return { total, used, unused: total - used };
  }, [files, usedImageUrls]);

  if (isLoadingFiles || isLoadingParts) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-honda-red" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quản lý hình ảnh"
        subtitle="Quản lý và tối ưu hóa bộ nhớ hình ảnh phụ tùng"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <ImageIcon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tổng số ảnh</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Đang sử dụng</p>
            <p className="text-2xl font-bold text-gray-900">{stats.used}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Chưa sử dụng</p>
            <p className="text-2xl font-bold text-gray-900 text-amber-600">{stats.unused}</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Tìm kiếm theo tên file..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-honda-red/20 text-sm"
          />
        </div>
        <div className="flex bg-gray-50 p-1 rounded-lg w-full md:w-auto">
          {(['all', 'used', 'unused'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`
                flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all
                ${filter === t ? 'bg-white text-honda-red shadow-sm' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {t === 'all' ? 'Tất cả' : t === 'used' ? 'Đang dùng' : 'Chưa dùng'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredFiles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 flex flex-col items-center justify-center text-gray-400">
          <FileWarning size={48} className="mb-4 opacity-20" />
          <p>Không tìm thấy hình ảnh nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredFiles.map((file) => {
            const isUsed = usedImageUrls.has(file.url);
            return (
              <div 
                key={file.name}
                className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square bg-gray-50 relative overflow-hidden">
                  <img 
                    src={getImageUrl(file.url)} 
                    alt={file.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <a 
                      href={getImageUrl(file.url)} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <button 
                      onClick={() => setSelectedFile(file.url)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  {isUsed ? (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-green-500/90 text-white text-[10px] font-bold rounded-full backdrop-blur-sm">
                      ACTIVE
                    </div>
                  ) : (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500/90 text-white text-[10px] font-bold rounded-full backdrop-blur-sm">
                      ORPHAN
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-medium text-gray-900 truncate mb-1" title={file.name}>
                    {file.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-medium">{formatSize(file.size)}</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info size={12} className="text-gray-300" />
                      </TooltipTrigger>
                      <TooltipContent className="text-[10px]">
                        Ngày tạo: {new Date(file.createdAt).toLocaleDateString('vi-VN')}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa hình ảnh?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Hình ảnh sẽ bị xóa vĩnh viễn khỏi máy chủ.
              {selectedFile && usedImageUrls.has(selectedFile) && (
                <p className="mt-2 text-red-500 font-medium">
                  Cảnh báo: Hình ảnh này đang được sử dụng bởi một hoặc nhiều phụ tùng!
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 rounded-xl"
              disabled={isDeleting}
            >
              {isDeleting ? 'Đang xóa...' : 'Tiếp tục xóa'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
