'use client';

import { motion } from 'framer-motion';
import { Plus, Minus, Search, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const FAQS = [
  {
    category: 'Sản phẩm',
    questions: [
      {
        q: 'Làm sao để biết phụ tùng này có lắp vừa xe của tôi không?',
        a: 'Bạn có thể kiểm tra phần "Phù hợp cho xe" trong chi tiết sản phẩm hoặc cung cấp số máy/số khung cho nhân viên tư vấn của chúng tôi để được check chính xác 100%.'
      },
      {
        q: 'Sản phẩm có phải là hàng chính hãng Honda không?',
        a: 'Tất cả sản phẩm tại Honda Đại Lợi đều cam kết là hàng chính hãng 100%, có tem đỏ Honda Việt Nam, Thái Lan hoặc Indo. Chúng tôi đền bù 1000% nếu phát hiện hàng giả.'
      }
    ]
  },
  {
    category: 'Giao hàng & Thanh toán',
    questions: [
      {
        q: 'Giao hàng mất bao lâu?',
        a: 'Nội thành TP.HCM chúng tôi hỗ trợ giao hỏa tốc 2H. Các tỉnh thành khác sẽ mất từ 2-4 ngày tùy khu vực.'
      },
      {
        q: 'Tôi có thể kiểm tra hàng trước khi thanh toán không?',
        a: 'Có, chính sách của chúng tôi cho phép khách hàng kiểm tra đúng mã, đúng hàng trước khi nhận và thanh toán cho shipper.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <span className="text-[10px] font-black text-[#CC0000] uppercase tracking-[0.4em]">Support Center</span>
            <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter">
              Giải đáp thắc mắc.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {FAQS.map((cat, idx) => (
            <div key={idx} className="space-y-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-[#CC0000] border-l-4 border-[#CC0000] pl-4">
                {cat.category}
              </h2>
              <div className="space-y-4">
                {cat.questions.map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border rounded-[2rem] transition-all duration-300 ${isOpen ? 'border-[#CC0000] bg-red-50/30' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 text-left"
      >
        <span className="text-lg font-black text-gray-900 tracking-tight uppercase leading-snug">{question}</span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#CC0000] text-white rotate-180' : 'bg-white text-gray-400'}`}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-8 pb-8 text-gray-600 font-medium leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
