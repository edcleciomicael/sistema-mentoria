import React from 'react';
import { useApp } from '../context/AppContext';
import { mentorshipPrograms } from '../data/mockData';
import { Check, Calendar, CreditCard, Sparkles, Shield, Clock } from 'lucide-react';
import { MentorshipProgram } from '../types';

export const ProgramsSection: React.FC = () => {
  const {
    t,
    formatCurrency,
    setIsBookingOpen,
    setBookingProgram,
    setIsPaymentOpen,
    setPaymentProgram,
  } = useApp();

  const handleBook = (prog: MentorshipProgram) => {
    setBookingProgram(prog);
    setIsBookingOpen(true);
  };

  const handlePay = (prog: MentorshipProgram) => {
    setPaymentProgram(prog);
    setIsPaymentOpen(true);
  };

  return (
    <section id="programas" className="py-20 md:py-28 bg-slate-50/70 dark:bg-[#091122] border-b border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-2">
            {t.programs.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight [text-wrap:balance]">
            {t.programs.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.programs.desc}
          </p>
        </div>

        {/* 3 Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {mentorshipPrograms.map((prog) => {
            const isPopular = prog.popular;
            return (
              <div
                key={prog.id}
                className={`relative flex flex-col justify-between rounded-2xl border transition-all p-7 sm:p-8 bg-white dark:bg-[#0c1527] ${
                  isPopular
                    ? 'border-blue-900 dark:border-blue-500 shadow-xl ring-2 ring-blue-900/10 dark:ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popularity Marker */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-950 dark:bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                    Mais Procurado por Líderes
                  </div>
                )}

                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    {prog.duration}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
                    {prog.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 min-h-[40px]">
                    {prog.tagline}
                  </p>

                  {/* Price Box */}
                  <div className="mt-6 mb-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                        {formatCurrency(prog.basePriceBrl)}
                      </span>
                      {prog.isRecurring && (
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          / {prog.recurringInterval === 'month' ? 'mês' : 'ano'}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {prog.isRecurring
                        ? 'Assinatura recorrente automática (cancele quando desejar)'
                        : 'Investimento único ou parcelado em até 12x'}
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      O que está incluído:
                    </div>
                    {prog.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTAs */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <button
                    onClick={() => handleBook(prog)}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-blue-950 hover:bg-slate-900 text-white dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-700 dark:hover:bg-slate-600'
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Agendar Sessão no Calendário</span>
                  </button>

                  <button
                    onClick={() => handlePay(prog)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <CreditCard className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Contratar Direto (Pix / Cartão / NF)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Garantia de Clareza & Entrega de Governança
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Se após a primeira sessão você não enxergar um plano inequívoco para desatar os gargalos do seu negócio, devolvemos 100% do seu investimento.
              </div>
            </div>
          </div>

          <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 whitespace-nowrap">
            Compromisso Marquez Adviser
          </div>
        </div>
      </div>
    </section>
  );
};
