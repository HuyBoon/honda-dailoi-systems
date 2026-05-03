import { Info, Settings } from 'lucide-react';

interface PartSpecificationsProps {
  partNumber: string;
  vehicles: any[];
}

export default function PartSpecifications({ partNumber, vehicles }: PartSpecificationsProps) {
  return (
    <div className="space-y-10 pt-10 border-t border-gray-100">
      <div className="space-y-6">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#CC0000] rounded-full" />
          Thông số kỹ thuật
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
          <SpecItem label="Mã phụ tùng" value={partNumber} />
          <SpecItem label="Thương hiệu" value="Honda Genuine Parts" />
          <SpecItem label="Xuất xứ" value="Việt Nam / Thái Lan" />
          <SpecItem label="Bảo hành" value="6 Tháng chính hãng" />
          <SpecItem label="Đóng gói" value="Hộp / Túi nilon" />
          <SpecItem label="Tình trạng" value="Mới 100%" />
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-[#CC0000] rounded-full" />
          Dòng xe tương thích
        </h4>
        <div className="flex flex-wrap gap-2">
          {vehicles.map((v: any) => (
            <span key={v.id} className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-600 text-[10px] font-black rounded-xl uppercase tracking-widest hover:border-[#CC0000] hover:text-[#CC0000] transition-all cursor-default">
              {v.modelName} ({v.year})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-50 pb-3 group">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-bold text-gray-900 group-hover:text-[#CC0000] transition-colors">{value}</span>
    </div>
  );
}
