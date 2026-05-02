import { ShieldCheck, Award, Heart, Users, MapPin, Phone, Mail } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

export default function AboutPage() {
  return (
    <div className="space-y-32 pb-32">
      <PageHeader 
        title={<>Câu chuyện <br /> <span className="text-[#CC0000]">Của chúng tôi.</span></>}
        subtitle="Về Honda Đại Lợi"
        breadcrumbs={[
          { label: 'Giới thiệu' }
        ]}
        image="https://images.unsplash.com/photo-1558981403-c5f91cbba527?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      />

      {/* Philosophy Section */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight leading-tight">
              TẬN TÂM PHỤC VỤ <br /> 
              VÌ SỰ AN TOÀN CỦA BẠN
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              Tại Honda Đại Lợi, chúng tôi hiểu rằng mỗi chi tiết nhỏ nhất trên chiếc xe của bạn đều đóng vai trò quan trọng trong việc đảm bảo an toàn và trải nghiệm lái xe tuyệt vời.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Được thành lập với sứ mệnh mang đến nguồn phụ tùng Honda chính hãng tin cậy nhất, chúng tôi đã không ngừng nỗ lực để xây dựng hệ thống phân phối chuyên nghiệp, đáp ứng nhu cầu khắt khe của hàng nghìn khách hàng trên khắp cả nước.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <StatItem count="10+" label="Năm kinh nghiệm" />
              <StatItem count="50k+" label="Khách hàng tin dùng" />
            </div>
          </div>
          <div className="relative">
             <div className="absolute -inset-4 bg-[#CC0000]/10 rounded-[50px] blur-2xl" />
             <img 
               src="https://images.unsplash.com/photo-1558981403-c5f91cbba527?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
               alt="Storefront" 
               className="relative rounded-[40px] shadow-2xl z-10"
             />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-32 border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl font-black uppercase tracking-tight">Giá trị cốt lõi</h2>
            <div className="w-20 h-1.5 bg-[#CC0000] mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValueCard 
              icon={<ShieldCheck className="text-[#CC0000]" size={32} />}
              title="Chất lượng tuyệt đối"
              desc="Mọi sản phẩm đều trải qua quy trình kiểm tra nghiêm ngặt, đảm bảo 100% chính hãng Honda."
            />
            <ValueCard 
              icon={<Award className="text-[#CC0000]" size={32} />}
              title="Uy tín hàng đầu"
              desc="Chúng tôi xây dựng niềm tin dựa trên sự minh bạch về nguồn gốc và giá cả của từng món phụ tùng."
            />
            <ValueCard 
              icon={<Heart className="text-[#CC0000]" size={32} />}
              title="Hỗ trợ tận tâm"
              desc="Đội ngũ kỹ thuật giàu kinh nghiệm luôn sẵn sàng tư vấn giải pháp tối ưu nhất cho xế yêu của bạn."
            />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="bg-[#CC0000] rounded-[50px] p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <h2 className="text-4xl font-black uppercase leading-tight">Bạn cần tư vấn kỹ thuật?</h2>
              <p className="text-white/80 text-lg">Đừng ngần ngại liên hệ với chúng tôi. Đội ngũ chuyên gia của Đại Lợi sẽ phản hồi bạn trong vòng 30 phút.</p>
              <div className="flex flex-wrap gap-6 pt-4">
                <ContactInfo icon={<Phone size={20} />} label="Hotline" value="090 123 4567" />
                <ContactInfo icon={<Mail size={20} />} label="Email" value="contact@hondadailoi.vn" />
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <button className="px-10 py-5 bg-white text-[#CC0000] font-black rounded-full hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-2xl">
                LIÊN HỆ NGAY
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatItem({ count, label }: { count: string; label: string }) {
  return (
    <div className="space-y-1">
      <p className="text-4xl font-black text-gray-900 tracking-tighter">{count}</p>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-10 rounded-[40px] bg-gray-50 border border-transparent hover:border-[#CC0000]/20 hover:bg-white hover:shadow-2xl transition-all duration-500 space-y-6">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">{icon}</div>
      <h3 className="text-xl font-black uppercase tracking-tight">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function ContactInfo({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest">{label}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
}
