'use client';

interface PartImageGalleryProps {
  imageUrl?: string;
  name: string;
  stockQuantity: number;
}

export default function PartImageGallery({ imageUrl, name, stockQuantity }: PartImageGalleryProps) {
  const defaultImage = 'https://images.unsplash.com/photo-1581235720704-06d3acfcba80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-xl aspect-square relative group">
        <img 
          src={imageUrl || defaultImage} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-6 left-6 flex flex-col gap-3">
          <span className="px-4 py-1.5 bg-[#CC0000] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl shadow-red-500/20">Chính hãng</span>
          {stockQuantity < 10 && stockQuantity > 0 && (
            <span className="px-4 py-1.5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl shadow-amber-500/20">Sắp hết hàng</span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#CC0000] cursor-pointer transition-all bg-gray-50">
            <img 
              src={imageUrl || defaultImage} 
              alt={`${name} gallery ${i}`} 
              className="w-full h-full object-cover opacity-60 hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
