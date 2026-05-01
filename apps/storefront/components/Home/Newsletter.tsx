export default function Newsletter() {
  return (
    <section className="container mx-auto px-4 lg:px-8">
      <div className="bg-[#CC0000] rounded-[40px] p-16 text-center text-white space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <h2 className="text-4xl font-black uppercase tracking-tighter relative z-10">Đừng bỏ lỡ các ưu đãi độc quyền</h2>
        <p className="text-white/80 max-w-lg mx-auto relative z-10">
          Đăng ký nhận bản tin để cập nhật những phụ tùng mới nhất và mã giảm giá dành riêng cho bạn.
        </p>
        <div className="max-w-md mx-auto flex gap-2 relative z-10">
          <input 
            type="email" 
            placeholder="Email của bạn..."
            className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:bg-white focus:text-black transition-all outline-none"
          />
          <button className="px-8 py-4 bg-white text-[#CC0000] font-black rounded-full hover:bg-gray-100 transition-all">GỬI</button>
        </div>
      </div>
    </section>
  );
}
