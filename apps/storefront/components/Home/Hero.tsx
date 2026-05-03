'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const BANNERS = [
  {
    id: 1,
    title: 'Trải nghiệm',
    subtitle: 'Sự Khác Biệt.',
    tagline: 'Hệ thống phụ tùng chính hãng',
    image: '/heros.png',
    link: '/parts',
    cta: 'VIEW MORE'
  },
  {
    id: 2,
    title: 'Dịch vụ',
    subtitle: 'Chuyên Nghiệp.',
    tagline: 'Bảo trì & Sửa chữa tiêu chuẩn Honda',
    image: '/hero_service.png',
    link: '/about',
    cta: 'KHÁM PHÁ NGAY'
  },
  {
    id: 3,
    title: 'Thế giới',
    subtitle: 'Xe Honda.',
    tagline: 'Đa dạng dòng xe, ngập tràn ưu đãi',
    image: '/hero_showroom.png',
    link: '/vehicles',
    cta: 'TÌM HIỂU THÊM'
  }
];

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{
          prevEl: '.hero-prev',
          nextEl: '.hero-next',
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
        }}
        loop={true}
        className="h-full w-full"
      >
        {BANNERS.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-full w-full flex items-center justify-center">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div 
                  className="w-full h-full bg-cover bg-center scale-105" 
                  style={{ backgroundImage: `url(${banner.image})` }}
                />
              </div>

              {/* Centered Content */}
              <div className="container mx-auto px-6 relative z-20 text-center">
                <div className="max-w-4xl mx-auto space-y-6">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-white text-base lg:text-xl font-black uppercase tracking-[0.2em]"
                  >
                    {banner.tagline}
                  </motion.p>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-5xl lg:text-[6vw] font-black text-white tracking-tight leading-tight uppercase"
                  >
                    {banner.title} <br />
                    <span className="text-[#CC0000]">{banner.subtitle}</span>
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="pt-8"
                  >
                    <Link 
                      href={banner.link}
                      className="inline-flex h-14 px-12 bg-[#CC0000] text-white font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-red-700 hover:scale-105 active:scale-95 shadow-2xl shadow-red-500/30 items-center justify-center"
                    >
                      {banner.cta}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Cập nhật Pagination: Trải dài full width và căn giữa flex */}
        <div className="hero-pagination absolute bottom-10 left-0 w-full z-30 flex justify-center items-center gap-3" />
      </Swiper>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-4 lg:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between items-center z-30 pointer-events-none">
        <button className="hero-prev w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all pointer-events-auto group">
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button className="hero-next w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all pointer-events-auto group">
          <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <style jsx global>{`
        /* Sửa lại để ghi đè chuẩn hơn trên Swiper */
        .hero-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          margin: 0 !important;
          transition: all 0.3s ease;
          border-radius: 6px;
          cursor: pointer;
        }
        .hero-pagination .swiper-pagination-bullet-active {
          width: 40px;
          background: #CC0000;
        }
      `}</style>
    </section>
  );
}