'use client';

import { Package, Star } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PartImageGallery from '@/components/PartDetails/PartImageGallery';
import PartPricingCard from '@/components/PartDetails/PartPricingCard';
import PartSpecifications from '@/components/PartDetails/PartSpecifications';
import RelatedPartsSlider from '@/components/PartDetails/RelatedPartsSlider';

export default function PartDetailsClient({ part }: { part: any }) {
  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-32">
      <PageHeader 
        title={part.name}
        subtitle={part.category.name}
        breadcrumbs={[
          { label: 'Phụ tùng', href: '/parts' },
          { label: part.name }
        ]}
      />

      <div className="container mx-auto px-4 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-[4rem] p-8 md:p-16 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left: Image Gallery */}
            <div className="lg:col-span-6 xl:col-span-7">
              <PartImageGallery 
                imageUrl={part.imageUrl}
                name={part.name}
                stockQuantity={part.stockQuantity}
              />
            </div>

            {/* Right: Product Info & Pricing */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#CC0000] font-black uppercase tracking-[0.3em] text-[10px]">
                  <Package size={14} /> {part.category.name}
                </div>
                <h1 className="text-4xl xl:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
                  {part.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">4.8 (156 Reviews)</span>
                </div>
              </div>

              <PartPricingCard part={part} />

              <PartSpecifications 
                partNumber={part.partNumber}
                vehicles={part.vehicles}
              />
            </div>
          </div>
        </div>

        {/* Related Products Slider */}
        <RelatedPartsSlider 
          categoryId={part.categoryId}
          currentPartId={part.id}
        />
      </div>
    </div>
  );
}
