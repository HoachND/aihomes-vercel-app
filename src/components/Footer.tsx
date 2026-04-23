"use client";

import { useI18n } from "@/context/I18nContext";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer id="contact" className="bg-slate-900 text-gray-300 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/logo-aihomes.png" alt="AI Homes" className="h-10 md:h-12 w-auto object-contain" />
              <span className="text-lg font-bold text-white">VIMGROUP</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              {t("footer_desc")}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">{t("contact_title")}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <strong className="block text-white pb-1">{t("contact_address_label")}</strong>
                  <span className="text-gray-400">{t("contact_address")}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                <div>
                  <strong className="block text-white pb-1">{t("contact_factory_label")}</strong>
                  <span className="text-gray-400">{t("contact_factory")}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-yellow-500 flex-shrink-0" size={20} />
                <span className="text-gray-400">{t("contact_phone")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-yellow-500 flex-shrink-0" size={20} />
                <span className="text-gray-400">{t("contact_email")}</span>
              </li>
            </ul>
          </div>

          <div className="h-[300px] rounded-xl overflow-hidden shadow-lg border border-slate-700 relative">
            <iframe 
              src="https://maps.google.com/maps?q=B99%20Phố%20Trúc,%20Ecopark,%20Phụng%20Công,%20Hưng%20Yên&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500 absolute inset-0"
            ></iframe>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} AI Homes. All rights reserved. A VIMGROUP Company.</p>
        </div>
      </div>
    </footer>
  );
}
