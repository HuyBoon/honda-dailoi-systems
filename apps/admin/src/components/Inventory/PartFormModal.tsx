import { useState, useEffect, useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { Loader2, Upload, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { useGetVehiclesQuery } from '../../store/api/vehicleApiSlice';
import { useUploadThumbnailMutation } from '../../store/api/uploadApiSlice';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ImageIcon } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000';

interface PartFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingPart: any;
  categories: any[];
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

export const PartFormModal = ({
  isOpen,
  onClose,
  editingPart,
  categories,
  onSubmit,
  isLoading
}: PartFormModalProps) => {
  const { data: vehicles } = useGetVehiclesQuery();
  const [uploadThumbnail, { isLoading: isUploading }] = useUploadThumbnailMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    partNumber: '',
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
    stockQuantity: 0,
    minStockLevel: 5,
    barcode: '',
    categoryId: '',
    vehicleIds: [] as string[]
  });

  useEffect(() => {
    if (editingPart) {
      setFormData({
        partNumber: editingPart.partNumber,
        name: editingPart.name,
        description: editingPart.description || '',
        imageUrl: editingPart.imageUrl || '',
        price: Number(editingPart.price),
        stockQuantity: editingPart.stockQuantity,
        minStockLevel: editingPart.minStockLevel,
        barcode: editingPart.barcode || '',
        categoryId: editingPart.categoryId,
        vehicleIds: editingPart.vehicles?.map((v: any) => v.id) || []
      });
    } else {
      setFormData({
        partNumber: '',
        name: '',
        description: '',
        imageUrl: '',
        price: 0,
        stockQuantity: 0,
        minStockLevel: 5,
        barcode: '',
        categoryId: categories?.[0]?.id || '',
        vehicleIds: []
      });
    }
  }, [editingPart, categories, isOpen]);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size < 2MB
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Kích thước ảnh phải nhỏ hơn 2MB');
      return;
    }

    try {
      const result = await uploadThumbnail(file).unwrap();
      setFormData({ ...formData, imageUrl: result.url });
      toast.success('Tải ảnh lên thành công');
    } catch (err) {
      toast.error('Không thể tải ảnh lên, vui lòng thử lại');
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, imageUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleVehicle = (id: string) => {
    setFormData(prev => {
      const isSelected = prev.vehicleIds.includes(id);
      if (isSelected) {
        return { ...prev, vehicleIds: prev.vehicleIds.filter(vId => vId !== id) };
      } else {
        return { ...prev, vehicleIds: [...prev.vehicleIds, id] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.partNumber || !formData.categoryId) {
      toast.error('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }
    await onSubmit(formData);
  };

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  const selectedCategoryName = categories?.find(c => c.id === formData.categoryId)?.name;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] rounded-2xl bg-white p-0 overflow-hidden border-none shadow-2xl flex flex-col max-h-[90vh]">
        <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
          <DialogHeader className="p-6 pb-2 shrink-0">
            <DialogTitle className="text-xl font-bold text-gray-900">
              {editingPart ? `Cập nhật: ${editingPart.name}` : 'Thêm phụ tùng mới'}
              {selectedCategoryName && (
                <span className="ml-2 text-sm font-normal text-gray-400">({selectedCategoryName})</span>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mã phụ tùng *</Label>
                  <Input 
                    placeholder="VD: 12345-ABC-000" 
                    value={formData.partNumber}
                    onChange={e => setFormData({...formData, partNumber: e.target.value})}
                    className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red font-mono h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Danh mục *</Label>
                  <Select 
                    value={formData.categoryId} 
                    onValueChange={val => setFormData({...formData, categoryId: val})}
                  >
                    <SelectTrigger className="rounded-lg border-gray-200 h-11 w-full">
                      <SelectValue placeholder="Chọn danh mục">
                        {selectedCategoryName}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-100">
                      {categories?.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hình ảnh phụ tùng</Label>
                <div className="flex gap-4">
                  <div className="w-28 h-28 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center bg-gray-50 shrink-0 overflow-hidden group relative transition-all hover:border-red-200 hover:bg-red-50">
                    {formData.imageUrl ? (
                      <>
                        <img src={getImageUrl(formData.imageUrl)} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={removeImage}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <ImageIcon className="text-gray-300" size={32} />
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden" 
                      accept="image/*"
                    />
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full h-11 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50 flex gap-2"
                    >
                      {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload size={16} />}
                      {formData.imageUrl ? 'Thay đổi ảnh' : 'Tải ảnh lên'}
                    </Button>
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                      <p className="text-[10px] text-blue-600 leading-relaxed">
                        <strong>Yêu cầu:</strong> Ảnh định dạng JPG, PNG hoặc WebP. Dung lượng tối đa 2MB. Ảnh sẽ được tự động tối ưu hóa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tên phụ tùng *</Label>
              <Input 
                placeholder="VD: Bugi NGK AirBlade" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Mô tả chi tiết</Label>
              <div className="ck-editor-wrapper prose-sm max-w-none">
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.description}
                  onChange={(_, editor) => {
                    const data = editor.getData();
                    setFormData({ ...formData, description: data });
                  }}
                  config={{
                    placeholder: 'Nhập mô tả chi tiết cho phụ tùng...',
                    toolbar: [
                      'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'
                    ]
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Đơn giá (VND)</Label>
                <Input 
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red font-bold h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Số lượng tồn</Label>
                <Input 
                  type="number"
                  value={formData.stockQuantity}
                  onChange={e => setFormData({...formData, stockQuantity: Number(e.target.value)})}
                  className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mức tồn kho tối thiểu</Label>
                <Input 
                  type="number"
                  value={formData.minStockLevel}
                  onChange={e => setFormData({...formData, minStockLevel: Number(e.target.value)})}
                  className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red h-11"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mã vạch (Barcode)</Label>
                <Input 
                  placeholder="Quét hoặc nhập mã vạch" 
                  value={formData.barcode}
                  onChange={e => setFormData({...formData, barcode: e.target.value})}
                  className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red h-11"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Dòng xe tương thích</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                {vehicles?.map((vehicle) => (
                  <label 
                    key={vehicle.id} 
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                      formData.vehicleIds.includes(vehicle.id) 
                      ? 'border-honda-red bg-red-50 text-honda-red shadow-sm ring-1 ring-honda-red/10' 
                      : 'border-gray-100 hover:border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={formData.vehicleIds.includes(vehicle.id)}
                      onChange={() => toggleVehicle(vehicle.id)}
                    />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold">{vehicle.modelName}</span>
                      <span className="text-[9px] opacity-70 italic">{vehicle.year} • {vehicle.engineSize || 'N/A'}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-row gap-3 shrink-0">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1 rounded-xl text-gray-600 hover:bg-gray-100 h-12 font-semibold transition-all">
              Hủy bỏ
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-honda-red hover:bg-red-700 text-white rounded-xl shadow-lg shadow-honda-red/20 h-12 font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98]">
              {isLoading ? <Loader2 className="animate-spin" /> : editingPart ? 'Cập nhật ngay' : 'Thêm vào kho'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
