import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  X,
  Send,
  User,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Calendar,
} from 'lucide-react';

export const LiveChatWidget: React.FC = () => {
  const {
    t,
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    sendChatMessage,
    setIsBookingOpen,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const quickQuestions = [
    'Quais os programas de mentoria disponíveis?',
    'Como agendar um diagnóstico 1-on-1 com Marquez?',
    'Como funcionam os POPs autogerenciáveis?',
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Toggle Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-blue-950 hover:bg-slate-900 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer dark:bg-blue-600 dark:hover:bg-blue-500 active:scale-95"
          aria-label="Abrir Chat com Marquez Adviser"
        >
          <div className="relative">
            <MessageSquare className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-blue-950" />
          </div>
          <span className="text-xs font-bold tracking-tight">Plantão Marquez</span>
        </button>
      )}

      {/* Expanded Chat Box */}
      {isChatOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-2xl bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-blue-950 text-white dark:bg-[#070d19]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-xs border border-blue-400/30">
                  MA
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-blue-950" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-display leading-tight">
                  {t.chat.title}
                </h4>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {t.chat.onlineStatus}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60 dark:bg-[#091122]/60">
            {chatMessages.map((msg) => {
              const isMe = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-slate-400 mb-1 px-1">
                    {msg.senderName} · {msg.timestamp}
                  </span>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      isMe
                        ? 'bg-blue-900 text-white rounded-br-xs dark:bg-blue-600'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div className="px-3 py-2 bg-white dark:bg-[#0c1527] border-t border-slate-100 dark:border-slate-800 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendChatMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0c1527] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.chat.placeholder}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 text-white disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
