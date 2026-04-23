"use client";

import { useI18n } from "@/context/I18nContext";

const feedbacks = [
  {
    id: 1,
    vi: {
      name: "Dương Hoàng",
      role: "Khách hàng",
      quote: `"Tôi thực sự hài lòng về trải nghiệm sản phẩm mà công ty mang lại. Chất lượng sản phẩm hoàn hảo, dịch vụ chăm sóc khách hàng tận tâm. Giá cả sản phẩm hợp lý. Tôi sẽ ủng hộ công ty thường xuyên vào thời gian tới."`,
    },
    en: {
      name: "Duong Hoang",
      role: "Customer",
      quote: `"I am truly satisfied with the product experience provided by the company. Perfect product quality, dedicated customer care. Reasonable pricing. I will support the company regularly in the future."`,
    },
    avatar: "/images/avatar-duong-hoang.png"
  },
  {
    id: 2,
    vi: {
      name: "Quốc Cường",
      role: "Khách hàng",
      quote: `"Ở AI Homes với đội ngũ thiết kế thi công thật chuyên nghiệp! Kiến trúc sư rất có trình độ và giải quyết bài toán khó về yêu cầu công năng và nhiệt tình giải trình, tư vấn kỹ càng cho khách hàng. Đó là cảm nhận của mình."`,
    },
    en: {
      name: "Quoc Cuong",
      role: "Customer",
      quote: `"At AI Homes, the design and construction team is truly professional! The architects are very qualified and solved difficult functional requirements while being enthusiastic in explaining and advising customers thoroughly."`,
    },
    avatar: "/images/avatar-quoc-cuong.png"
  },
  {
    id: 3,
    vi: {
      name: "Hải Yến",
      role: "Khách hàng",
      quote: `"Trong quá trình làm việc với công ty AI Homes mình cảm thấy hài lòng, công ty làm việc uy tín, đội ngũ làm việc nhiệt huyết. Hiểu tâm lý khách hàng và luôn tư vấn kỹ lưỡng vì lợi ích của khách hàng. Hỗ trợ khách hàng tốt nhất trong quá trình thi công."`,
    },
    en: {
      name: "Hai Yen",
      role: "Customer",
      quote: `"Working with AI Homes, I felt satisfied; the company works with prestige, and the team works with enthusiasm. They understand customer psychology and always provide thorough advice for the customer's benefit."`,
    },
    avatar: "/images/avatar-hai-yen.png"
  }
];

export default function Testimonials() {
  const { t, language } = useI18n();

  return (
    <section className="py-24 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold uppercase text-slate-800 tracking-wider">{t("testimonial_title")}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {feedbacks.map((fb) => {
            const data = fb[language as keyof typeof fb] as any;
            return (
              <div key={fb.id} className="bg-white p-8 rounded-lg shadow-md relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-gray-100 flex-shrink-0">
                    <img src={fb.avatar} alt={data.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{data.name}</h4>
                    <p className="text-sm text-gray-500">{data.role}</p>
                  </div>
                </div>
                <div className="text-blue-500 text-4xl leading-none absolute right-6 top-8 opacity-50">"</div>
                <p className="text-gray-600 text-sm italic leading-relaxed z-10 relative">
                  {data.quote}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
