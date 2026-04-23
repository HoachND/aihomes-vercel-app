"use client";

import { Phone, MessageCircle } from "lucide-react";

export default function Widgets() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Hotline / Phone */}
      <a 
        href="tel:0986969339" 
        className="w-12 h-12 bg-white rounded-full flex justify-center items-center text-blue-600 shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform"
      >
        <Phone fill="currentColor" size={22} className="animate-pulse" />
      </a>

      {/* Zalo */}
      <a 
        href="https://zalo.me/0986969339" 
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 bg-white rounded-full flex justify-center items-center text-blue-500 shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform"
      >
        <span className="font-extrabold text-sm tracking-tighter">Zalo</span>
      </a>

      {/* Messenger */}
      <a 
        href="https://m.me/aihome99" 
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00c6ff] to-[#0072ff] flex items-center justify-center text-white">
          <MessageCircle size={18} fill="currentColor" />
        </div>
      </a>
    </div>
  );
}
