"use client";

import { useI18n } from "@/context/I18nContext";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image 
              src="/images/aihome_3.png" 
              alt="AI Homes Factory" 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="bg-yellow-500/90 backdrop-blur-sm px-4 py-2 rounded-lg inline-block font-bold mb-2">
                {t("about_exp")}
              </div>
              <p className="text-sm font-medium">{t("about_factory_desc")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
              <span className="text-yellow-600 border-b-4 border-yellow-500 pb-2">{t("about_title")}</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {t("about_desc")}
            </p>

            <div className="space-y-4">
              {(Array.isArray(t("about_points")) ? t("about_points") as any as string[] : (t("about_points") as string).split(',')).map((point: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-yellow-500 flex-shrink-0" size={24} />
                  <span className="text-slate-700 font-medium text-lg">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-xl mb-4 text-slate-800">{t("about_facility")}</h3>
              <ul className="space-y-3 text-slate-600">
                <li><strong className="text-slate-800">{t("contact_factory_label")}:</strong> {t("contact_factory")}</li>
                <li><strong className="text-slate-800">{t("contact_address_label")}:</strong> {t("contact_address")}</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
