"use client";

import { useI18n } from "@/context/I18nContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/aihome_6.png')" }}
      >
        <div className="absolute inset-0 bg-[#0f172a]/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-yellow-500/20 text-yellow-400 font-semibold tracking-wider text-sm mb-6 border border-yellow-500/30">
            {t("hero_promo")}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            {t("hero_title").split(' SANG TRỌNG').map((text, i) => (
              i === 0 ? <span key={i}>{text}<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"> SANG TRỌNG</span></span> : text
            ))}
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            {t("hero_subtitle")}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#get-quote"
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-bold rounded-full hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all transform hover:scale-105"
            >
              {t("hero_cta")}
            </a>
            <a
              href="#projects"
              className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-full hover:bg-white hover:text-slate-900 transition-all"
            >
              {t("nav_projects")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
