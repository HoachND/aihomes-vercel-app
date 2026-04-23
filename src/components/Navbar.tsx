"use client";

import { useI18n } from "@/context/I18nContext";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const { t, language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };

  const navLinks = [
    { name: t("nav_home"), href: "#home" },
    { name: t("nav_about"), href: "#about" },
    { name: t("nav_projects"), href: "#projects" },
    { name: t("nav_contact"), href: "#get-quote" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-yellow-600/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-48 md:h-[220px]">
          <div className="flex-shrink-0 flex items-center">
            <a href="#home" className="hover:opacity-80 transition-opacity">
              <Image src="/images/logo-aihomes.png" alt="AI Homes" width={1200} height={400} className="h-32 md:h-[180px] w-auto object-contain scale-150 transform origin-left" priority />
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-300 hover:text-yellow-500 transition-colors font-medium">
                {link.name}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-yellow-500 hover:text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-full transition-all"
            >
              <Globe size={18} />
              <span className="font-semibold">{language.toUpperCase()}</span>
            </button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-yellow-500"
            >
              <Globe size={18} />
              <span className="font-semibold">{language.toUpperCase()}</span>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-yellow-600/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-yellow-500 hover:bg-slate-800"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
