"use client";

import { useI18n } from "@/context/I18nContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function CEO() {
  const { t } = useI18n();

  return (
    <section id="ceo" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
        >
          <div className="flex flex-col lg:flex-row items-center">
            {/* CEO Image Container */}
            <div className="w-full lg:w-2/5 relative h-[400px] lg:h-[500px] bg-slate-200">
              <Image 
                src="/images/ceo-hoach.png" 
                alt="CEO Nguyễn Đức Hoạch" 
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent lg:hidden"></div>
            </div>

            {/* Content Container */}
            <div className="w-full lg:w-3/5 p-8 lg:p-16">
              <div className="inline-block px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 font-bold text-sm mb-4">
                {t("ceo_role")}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {t("ceo_name")}
              </h2>
              <p className="text-lg font-medium text-slate-500 mb-8 border-l-4 border-yellow-500 pl-4">
                {t("ceo_title")}
              </p>
              
              <p className="text-slate-600 leading-relaxed mb-8 italic text-lg">
                &quot;{t("ceo_desc")}&quot;
              </p>

              <div className="space-y-4 mb-10">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(() => {
                  const data = t("ceo_points");
                  const points = Array.isArray(data) ? data : (typeof data === "string" ? (data.includes("|") ? data.split("|") : data.includes("\n") ? data.split("\n") : data.split(",")) : []);
                  return points.map((point: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="text-yellow-600 flex-shrink-0" size={20} />
                      <span className="text-slate-700 font-medium">{point.trim()}</span>
                    </div>
                  ));
                })()}
              </div>

              <a 
                href="#get-quote"
                className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-bold rounded-full hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-200 transform hover:scale-105"
              >
                {t("ceo_cta")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
