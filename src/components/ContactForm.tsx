"use client";

import { useState } from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import { useI18n } from "@/context/I18nContext";

export default function ContactForm() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", projectType: t("opt_civil") });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", phone: "", email: "", projectType: t("opt_civil") });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <section id="get-quote" className="py-24 bg-[#0f172a] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">{t("form_title")}</h2>
              <p className="text-gray-300 mb-8">
                {t("form_desc")}
              </p>
            </div>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Phone className="text-white mt-1" size={24} />
                <div>
                  <strong className="block text-white">Hotline 24/7</strong>
                  <span className="text-gray-300">0986 969 339</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="text-white mt-1" size={24} />
                <div>
                  <strong className="block text-white">{t("contact_address_label")}</strong>
                  <span className="text-gray-300">{t("contact_address")}</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="text-white mt-1" size={24} />
                <div>
                  <strong className="block text-white">Email</strong>
                  <span className="text-gray-300">aihomes.vimgroup@gmail.com</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[#1e293b] p-8 md:p-10 rounded-2xl shadow-xl">
            {success ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t("form_success")}</h3>
                <p className="text-gray-400">{t("form_success_desc")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{t("form_name")}</label>
                  <input required type="text" placeholder={t("form_placeholder_name")} className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{t("form_phone")}</label>
                  <input required type="tel" placeholder="09xxxxxxx" className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{t("form_email")}</label>
                  <input type="email" placeholder="example@gmail.com" className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{t("form_type")}</label>
                  <select className="w-full bg-[#0f172a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors" value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})}>
                    <option value={t("opt_civil")}>{t("opt_civil")}</option>
                    <option value={t("opt_office")}>{t("opt_office")}</option>
                    <option value={t("opt_hotel")}>{t("opt_hotel")}</option>
                    <option value={t("opt_showroom")}>{t("opt_showroom")}</option>
                  </select>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-yellow-500/20 flex items-center justify-center">
                  {loading ? t("form_sending") : t("form_cta")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
