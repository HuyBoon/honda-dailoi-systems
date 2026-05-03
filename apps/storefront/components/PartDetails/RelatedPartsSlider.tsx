'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { getParts } from '@/lib/api';
import PartCard from '../PartCard';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface RelatedPartsSliderProps {
  categoryId: string;
  currentPartId: string;
}

export default function RelatedPartsSlider({ categoryId, currentPartId }: RelatedPartsSliderProps) {
  const [parts, setParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedParts = async () => {
      try {
        const data = await getParts({ categoryId, limit: 13 }); // Fetch one extra in case current is included
        const filtered = (data.items || []).filter((item: any) => item.id !== currentPartId).slice(0, 12);
        setParts(filtered);
      } catch (error) {
        console.error('Failed to fetch related parts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedParts();
  }, [categoryId, currentPartId]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-[#CC0000] rounded-full animate-spin" />
      </div>
    );
  }

  if (parts.length === 0) return null;

  return (
    <section className="py-24 border-t border-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-[2px] bg-[#CC0000]" />
            <span className="text-[10px] font-black text-[#CC0000] uppercase tracking-[0.3em]">Có thể bạn quan tâm</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
            Phụ tùng <span className="text-[#CC0000]">Liên quan.</span>
          </h2>
        </div>

        <div className="flex gap-2">
          <button className="swiper-prev w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all shadow-sm">
            <ChevronLeft size={20} />
          </button>
          <button className="swiper-next w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all shadow-sm">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative -mx-4 px-4 overflow-hidden">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1.5}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            prevEl: '.swiper-prev',
            nextEl: '.swiper-next',
          }}
          pagination={{ 
            clickable: true,
            el: '.swiper-pagination-custom',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="!pb-16"
        >
          {parts.map((part) => (
            <SwiperSlide key={part.id}>
              <PartCard 
                id={part.id}
                name={part.name}
                partNumber={part.partNumber}
                price={Number(part.price)}
                imageUrl={part.imageUrl}
                isNew={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="swiper-pagination-custom flex justify-center gap-2 mt-8" />
      </div>

      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #E5E7EB;
          opacity: 1;
          transition: all 0.3s;
          border-radius: 4px;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          width: 32px;
          background: #CC0000;
        }
      `}</style>
    </section>
  );
}
