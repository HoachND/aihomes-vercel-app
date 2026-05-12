"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone } from "lucide-react";

type Message = { id: string; text: string; sender: "bot" | "user"; };

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Chào Sếp! Em là trợ lý AI của AI Homes. Sếp cần tư vấn về thiết kế thi công nhà thông minh hay các giải pháp smart home chuyên sâu ạ?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    setTimeout(() => {
      let botReply = "Dạ AI Homes đã nhận thông tin. Sếp vui lòng để lại SĐT hoặc gọi Hotline 0986 969 339 để kỹ sư của chúng em tư vấn chi tiết nhé!";
      if (text.includes("giải pháp")) botReply = "AI Homes cung cấp giải pháp nhà thông minh toàn diện: Chiếu sáng thông minh, Rèm tự động, Cửa thông minh, Kiểm soát an ninh AI. Sếp quan tâm mảng nào ạ?";
      if (text.includes("báo giá")) botReply = "Dạ chi phí thi công nhà thông minh phụ thuộc vào diện tích và số lượng thiết bị. Với căn hộ 2 phòng ngủ, chi phí từ 30-50 triệu. Sếp cho em biết diện tích nhà mình nhé?";
      if (text.includes("thiết kế")) botReply = "AI Homes cung cấp gói Thiết kế - Thi công trọn gói nội thất tích hợp Smart Home, đảm bảo thẩm mỹ và công nghệ liền mạch. Sếp đã có bản vẽ chưa ạ?";
      if (text.includes("bảo hành")) botReply = "Toàn bộ thiết bị Smart Home do AI Homes cung cấp đều được bảo hành chính hãng 24 tháng, hỗ trợ kỹ thuật 24/7. Sếp hoàn toàn yên tâm ạ!";
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: botReply, sender: "bot" };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const suggestions = [
    { q: "Giải pháp smart home?", a: "giải pháp" },
    { q: "Báo giá thi công?", a: "báo giá" },
    { q: "Thiết kế nội thất AI?", a: "thiết kế" },
    { q: "Chính sách bảo hành?", a: "bảo hành" }
  ];

  return (
    <div className="fixed bottom-32 left-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[320px] bg-slate-900 rounded-3xl shadow-[0_0_40px_rgba(202,138,4,0.3)] border border-yellow-500/20 flex flex-col origin-bottom-left" style={{ height: "500px" }}>
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 text-slate-900 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center font-black text-yellow-500 text-lg">AI</div>
                <div><h3 className="font-bold text-sm">AI Homes Assistant</h3><p className="text-[10px] text-slate-900/80 font-medium">⚡ Đang trực tuyến</p></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-slate-900/10 p-1 rounded-lg"><X size={20} /></button>
            </div>
            <div className="flex-1 p-4 bg-slate-950 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === "user" ? "bg-yellow-500 text-slate-900 rounded-tr-none font-medium" : "bg-slate-800 text-white rounded-tl-none border border-yellow-500/20"}`}>{msg.text}</div>
                </div>
              ))}
              {messages.length < 4 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button 
                      key={s.q}
                      className="bg-slate-900 border border-yellow-500/30 text-yellow-500 px-3 py-1.5 rounded-full text-[11px] font-bold hover:bg-yellow-500 hover:text-slate-900 transition-all shadow-sm"
                      onClick={() => handleSend(s.q)}
                    >
                      {s.q}
                    </button>
                  ))}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-yellow-500/20 bg-slate-900 space-y-3">
              <a href="tel:0986969339" className="flex items-center justify-center gap-2 w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 py-2 rounded-xl font-bold text-sm hover:bg-emerald-500 hover:text-slate-900 transition-colors">
                <Phone size={16} /> Gọi AI Homes: 0986 969 339
              </a>
              <form onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }} className="flex gap-2">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Nhập tin nhắn..." className="flex-1 bg-slate-800 text-white placeholder-slate-400 border border-yellow-500/20 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none" />
                <button type="submit" className="bg-yellow-500 text-slate-900 p-2 rounded-xl hover:bg-yellow-400 transition-transform active:scale-90"><Send size={18} /></button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-500 text-slate-900 p-4 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)] flex items-center justify-center relative">
        <MessageCircle size={28} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900"></span>
      </motion.button>
    </div>
  );
}
