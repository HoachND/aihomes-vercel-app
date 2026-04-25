"use client";

import { useI18n } from "@/context/I18nContext";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, DollarSign, Clock } from "lucide-react";

export default function Commitment() {
  const { t } = useI18n();

  const commitments = [
    { 
      icon: <DollarSign size={40} className="text-yellow-600" />, 
      title: t("commit_1_title"), 
      desc: t("commit_1_desc"),
      color: "bg-yellow-50 border-yellow-100"
    },
    { 
      icon: <Zap size={40} className="text-blue-500" />, 
      title: t("commit_2_title"), 
      desc: t("commit_2_desc"),
      color: "bg-blue-50 border-blue-100"
    },
    { 
      icon: <Clock size={40} className="text-green-500" />, 
      title: t("commit_3_title"), 
      desc: t("commit_3_desc"),
      color: "bg-green-50 border-green-100"
    },
    { 
      icon: <ShieldCheck size={40} className="text-purple-500" />, 
      title: t("commit_4_title"), 
      desc: t("commit_4_desc"),
      color: "bg-purple-50 border-purple-100"
    },
  ];

  return (
    <section id="commitment" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{t("commitment_title")}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">{t("commitment_desc")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {commitments.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-10 rounded-full aspect-square flex flex-col items-center justify-center border-2 ${item.color} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
            >
              <div className="mb-6 bg-white p-4 rounded-full shadow-sm">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-3">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-4">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
