"use client";

import { useI18n } from "@/context/I18nContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X, Maximize2 } from "lucide-react";

// Project Data - 15 Dự án Tiêu biểu AI Homes
const projectsData = [
  { 
    id: 1, img: "/images/projects/biet-thu-anh-minh/1.png", title: { vi: "Biệt thự Anh Minh", en: "Anh Minh Villa" }, category: "cat_villa", 
    details: { area: "600m²", address: { vi: "Xã Vĩnh Ngọc, chân cầu Nhật Tân, Hà Nội", en: "Vinh Ngoc, Nhat Tan Bridge, Hanoi" }, style: { vi: "Hiện đại sang trọng", en: "Modern Luxury" } },
    gallery: ["/images/projects/biet-thu-anh-minh/1.png", "/images/projects/biet-thu-anh-minh/2.png", "/images/projects/biet-thu-anh-minh/3.png", "/images/projects/biet-thu-anh-minh/4.png", "/images/projects/biet-thu-anh-minh/5.png"]
  },
  { 
    id: 2, img: "/images/projects/van-phong-dliebe/1.png", title: { vi: "Văn phòng D.LIEBE", en: "D.LIEBE Office" }, category: "cat_office",
    details: { area: "300m²", address: { vi: "Tầng 21 Leadvisors Tower, Hà Nội", en: "21st Floor Leadvisors Tower, Hanoi" }, style: { vi: "Hiện đại tối giản", en: "Modern Minimalist" } },
    gallery: ["/images/projects/van-phong-dliebe/1.png", "/images/projects/van-phong-dliebe/2.png", "/images/projects/van-phong-dliebe/3.png", "/images/projects/van-phong-dliebe/4.png", "/images/projects/van-phong-dliebe/5.png", "/images/projects/van-phong-dliebe/6.png"]
  },
  { 
    id: 3, img: "/images/projects/chung-cu-eurowindow/1.png", title: { vi: "Chung cư Eurowindow River Park", en: "Eurowindow River Park Apartment" }, category: "cat_apartment",
    details: { area: "100m²", address: { vi: "Đông Anh, Hà Nội", en: "Dong Anh, Hanoi" }, style: { vi: "Hiện đại ấm cúng", en: "Modern Cozy" } },
    gallery: ["/images/projects/chung-cu-eurowindow/1.png", "/images/projects/chung-cu-eurowindow/2.png", "/images/projects/chung-cu-eurowindow/3.png", "/images/projects/chung-cu-eurowindow/4.png", "/images/projects/chung-cu-eurowindow/5.png"]
  },
  { 
    id: 4, img: "/images/projects/homestay-tam-dao/1.png", title: { vi: "Homestay Tam Đảo", en: "Tam Dao Homestay" }, category: "cat_service",
    details: { area: "1000m²", address: { vi: "Tam Đảo, Vĩnh Phúc", en: "Tam Dao, Vinh Phuc" }, style: { vi: "Nghỉ dưỡng hiện đại", en: "Modern Resort" } },
    gallery: ["/images/projects/homestay-tam-dao/1.png", "/images/projects/homestay-tam-dao/2.png", "/images/projects/homestay-tam-dao/3.png", "/images/projects/homestay-tam-dao/4.png", "/images/projects/homestay-tam-dao/5.png", "/images/projects/homestay-tam-dao/6.png"]
  },
  { 
    id: 5, img: "/images/projects/chung-cu-lancaster/1.png", title: { vi: "Chung cư Lancaster Núi Trúc", en: "Lancaster Nui Truc Apartment" }, category: "cat_apartment",
    details: { area: "100m²", address: { vi: "Núi Trúc, Ba Đình, Hà Nội", en: "Nui Truc, Ba Dinh, Hanoi" }, style: { vi: "Tân cổ điển", en: "Neo-classical" } },
    gallery: ["/images/projects/chung-cu-lancaster/1.png", "/images/projects/chung-cu-lancaster/2.png", "/images/projects/chung-cu-lancaster/3.png", "/images/projects/chung-cu-lancaster/4.png", "/images/projects/chung-cu-lancaster/5.png"]
  },
  { 
    id: 6, img: "/images/projects/spa-lavender/1.png", title: { vi: "Spa Lavender An Giang", en: "Lavender Spa An Giang" }, category: "cat_service",
    details: { area: "4 tầng, 120m²/sàn", address: { vi: "Long Xuyên, An Giang", en: "Long Xuyen, An Giang" }, style: { vi: "Luxury hiện đại", en: "Modern Luxury" } },
    gallery: ["/images/projects/spa-lavender/1.png", "/images/projects/spa-lavender/2.png", "/images/projects/spa-lavender/3.png", "/images/projects/spa-lavender/4.png", "/images/projects/spa-lavender/5.png", "/images/projects/spa-lavender/6.png"]
  },
  { 
    id: 7, img: "/images/projects/chung-cu-hd-mon/1.png", title: { vi: "Chung cư HD Mon Central", en: "HD Mon Central Apartment" }, category: "cat_apartment",
    details: { area: "90m²", address: { vi: "Mỹ Đình, Nam Từ Liêm, Hà Nội", en: "My Dinh, Nam Tu Liem, Hanoi" }, style: { vi: "Hiện đại", en: "Modern" } },
    gallery: ["/images/projects/chung-cu-hd-mon/1.png", "/images/projects/chung-cu-hd-mon/2.png", "/images/projects/chung-cu-hd-mon/3.png", "/images/projects/chung-cu-hd-mon/4.png", "/images/projects/chung-cu-hd-mon/5.png"]
  },
  { 
    id: 8, img: "/images/projects/chung-cu-northern-diamond/1.png", title: { vi: "Chung cư Northern Diamond", en: "Northern Diamond Apartment" }, category: "cat_apartment",
    details: { area: "110m²", address: { vi: "Long Biên, Hà Nội", en: "Long Bien, Hanoi" }, style: { vi: "Sang trọng", en: "Luxury" } },
    gallery: ["/images/projects/chung-cu-northern-diamond/1.png", "/images/projects/chung-cu-northern-diamond/2.png", "/images/projects/chung-cu-northern-diamond/3.png", "/images/projects/chung-cu-northern-diamond/4.png", "/images/projects/chung-cu-northern-diamond/5.png", "/images/projects/chung-cu-northern-diamond/6.png"]
  },
  { 
    id: 9, img: "/images/projects/van-phong-easygoing/1.png", title: { vi: "Văn phòng EasyGoing", en: "EasyGoing Office" }, category: "cat_office",
    details: { area: "200m²", address: { vi: "Hà Nội", en: "Hanoi" }, style: { vi: "Trẻ trung, sáng tạo", en: "Youthful, Creative" } },
    gallery: ["/images/projects/van-phong-easygoing/1.png", "/images/projects/van-phong-easygoing/2.png", "/images/projects/van-phong-easygoing/3.png", "/images/projects/van-phong-easygoing/4.png", "/images/projects/van-phong-easygoing/5.png"]
  },
  { 
    id: 10, img: "/images/projects/chung-cu-379-doi-can/1.png", title: { vi: "Chung cư 379 Đội Cấn", en: "379 Doi Can Apartment" }, category: "cat_apartment",
    details: { area: "85m²", address: { vi: "379 Đội Cấn, Ba Đình, Hà Nội", en: "379 Doi Can, Ba Dinh, Hanoi" }, style: { vi: "Hiện đại", en: "Modern" } },
    gallery: ["/images/projects/chung-cu-379-doi-can/1.png", "/images/projects/chung-cu-379-doi-can/2.png", "/images/projects/chung-cu-379-doi-can/3.png", "/images/projects/chung-cu-379-doi-can/4.png", "/images/projects/chung-cu-379-doi-can/5.png"]
  },
  { 
    id: 11, img: "/images/projects/nha-pho-chi-mai/1.png", title: { vi: "Nhà phố Chị Mai", en: "Ms. Mai Townhouse" }, category: "cat_townhouse",
    details: { area: "80m²/sàn", address: { vi: "Hà Nội", en: "Hanoi" }, style: { vi: "Hiện đại ấm cúng", en: "Modern Cozy" } },
    gallery: ["/images/projects/nha-pho-chi-mai/1.png", "/images/projects/nha-pho-chi-mai/2.png", "/images/projects/nha-pho-chi-mai/3.png", "/images/projects/nha-pho-chi-mai/4.png", "/images/projects/nha-pho-chi-mai/5.png"]
  },
  { 
    id: 12, img: "/images/projects/chung-cu-thanh-thai/1.png", title: { vi: "Chung cư Số 1 Thành Thái", en: "No. 1 Thanh Thai Apartment" }, category: "cat_apartment",
    details: { area: "95m²", address: { vi: "Số 1 Thành Thái, Đống Đa, Hà Nội", en: "No. 1 Thanh Thai, Dong Da, Hanoi" }, style: { vi: "Sang trọng", en: "Luxury" } },
    gallery: ["/images/projects/chung-cu-thanh-thai/1.png", "/images/projects/chung-cu-thanh-thai/2.png", "/images/projects/chung-cu-thanh-thai/3.png", "/images/projects/chung-cu-thanh-thai/4.png", "/images/projects/chung-cu-thanh-thai/5.png"]
  },
  { 
    id: 13, img: "/images/projects/khach-san/1.png", title: { vi: "Khách sạn", en: "Hotel" }, category: "cat_service",
    details: { area: "2000m²", address: { vi: "Hà Nội", en: "Hanoi" }, style: { vi: "5 sao hiện đại", en: "5-star Modern" } },
    gallery: ["/images/projects/khach-san/1.png", "/images/projects/khach-san/2.png", "/images/projects/khach-san/3.png", "/images/projects/khach-san/4.png", "/images/projects/khach-san/5.png", "/images/projects/khach-san/6.png"]
  },
  { 
    id: 14, img: "/images/projects/trung-tam-hoc-tap/1.png", title: { vi: "Trung tâm Học tập & Thư viện", en: "Learning Center & Library" }, category: "cat_public",
    details: { area: "500m²", address: { vi: "Hà Nội", en: "Hanoi" }, style: { vi: "Hiện đại, thân thiện", en: "Modern, Friendly" } },
    gallery: ["/images/projects/trung-tam-hoc-tap/1.png", "/images/projects/trung-tam-hoc-tap/2.png", "/images/projects/trung-tam-hoc-tap/3.png", "/images/projects/trung-tam-hoc-tap/4.png", "/images/projects/trung-tam-hoc-tap/5.png"]
  },
  { 
    id: 15, img: "/images/projects/van-phong-99design/1.png", title: { vi: "Văn phòng 99Design", en: "99Design Office" }, category: "cat_office",
    details: { area: "150m²", address: { vi: "Hà Nội", en: "Hanoi" }, style: { vi: "Sáng tạo, công nghệ", en: "Creative, Tech" } },
    gallery: ["/images/projects/van-phong-99design/1.png", "/images/projects/van-phong-99design/2.png", "/images/projects/van-phong-99design/3.png", "/images/projects/van-phong-99design/4.png"]
  },
];

const categories = ["cat_all", "cat_apartment", "cat_villa", "cat_townhouse", "cat_office", "cat_service", "cat_public"];

export default function Projects() {
  const { t, language } = useI18n();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState("cat_all");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = activeCategory === "cat_all" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);
  
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{t("projects_title")}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full"></div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((catKey) => (
            <button
              key={catKey}
              onClick={() => { setActiveCategory(catKey); setShowAll(false); }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeCategory === catKey
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                  : "bg-white text-slate-600 border-slate-200 hover:border-yellow-500 hover:text-yellow-600"
              }`}
            >
              {t(catKey)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelectedProject(proj)}
              className="group relative h-[350px] rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-slate-200"
            >
              <Image 
                src={proj.img} 
                alt={proj.title[language as keyof typeof proj.title]} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"></div>
              
              <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <Maximize2 size={20} className="text-white" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                <span className="text-yellow-400 text-sm font-bold uppercase tracking-wider mb-2 block border-l-2 border-yellow-400 pl-2">{t(proj.category)}</span>
                <h3 className="text-xl font-bold text-white leading-tight">{proj.title[language as keyof typeof proj.title]}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More / Less Button */}
        {filteredProjects.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300"
            >
              {showAll ? t("show_less") + " ↑" : `${t("show_more")} (${filteredProjects.length - 6} ${t("projects")}) ↓`}
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            ></motion.div>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-red-500 rounded-full text-white transition-colors">
                <X size={24} />
              </button>

              <div className="w-full md:w-2/3 h-[300px] md:h-auto relative bg-slate-100 overflow-y-auto custom-scrollbar">
                {selectedProject.gallery.map((imgUrl: string, i: number) => (
                  <div key={i} className="relative w-full aspect-[4/3] border-b-2 border-white">
                    <Image src={imgUrl} alt="Gallery" fill className="object-cover" />
                  </div>
                ))}
              </div>

              <div className="w-full md:w-1/3 p-8 flex flex-col bg-slate-50 border-l border-slate-200 overflow-y-auto">
                <span className="inline-block py-1 px-3 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-700 font-bold text-xs mb-4 uppercase inline-table w-max">
                  {t(selectedProject.category)}
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-gray-200">{selectedProject.title[language as keyof typeof selectedProject.title]}</h2>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <strong className="block text-gray-500 uppercase text-xs tracking-wider mb-1">{t("modal_area")}</strong>
                    <span className="text-slate-800 font-medium">{selectedProject.details.area}</span>
                  </div>
                  <div>
                    <strong className="block text-gray-500 uppercase text-xs tracking-wider mb-1">{t("modal_location")}</strong>
                    <span className="text-slate-800 font-medium">{selectedProject.details.address[language as keyof typeof selectedProject.details.address]}</span>
                  </div>
                  <div>
                    <strong className="block text-gray-500 uppercase text-xs tracking-wider mb-1">{t("modal_style")}</strong>
                    <span className="text-slate-800 font-medium">{selectedProject.details.style[language as keyof typeof selectedProject.details.style]}</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-4">{t("modal_desc")}</p>
                  <a href="#get-quote" onClick={() => setSelectedProject(null)} className="block text-center w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition-colors">
                    {t("modal_cta")}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
