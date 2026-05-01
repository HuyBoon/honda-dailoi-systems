export default function FeaturedProduct() {
  return (
    <section className="container mx-auto px-4 lg:px-8">
      <div className="bg-white rounded-[40px] p-12 border border-gray-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <span className="px-3 py-1 bg-red-100 text-[#CC0000] rounded-full text-[10px] font-black uppercase tracking-widest">Sản phẩm bán chạy</span>
            <h3 className="text-5xl font-black text-gray-900 leading-tight tracking-tighter">Bugi NGK Laser Iridium</h3>
            <p className="text-gray-500 leading-relaxed max-w-md">
              Tối ưu hóa khả năng đánh lửa, giúp xe khởi động dễ dàng hơn và tiết kiệm nhiên liệu vượt trội. Sản phẩm chuyên dụng cho dòng xe AirBlade và SH.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-4xl font-black text-gray-900">250.000đ</span>
              <button className="honda-btn">Thêm vào giỏ hàng</button>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1581235720704-06d3acfcba80?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Featured Part" 
              className="w-full rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
