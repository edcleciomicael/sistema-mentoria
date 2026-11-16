import React from 'react';
import { useApp } from '../context/AppContext';
import { testimonials } from '../data/mockData';
import { Quote, Star, TrendingUp, Clock, BarChart3, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t, setIsBookingOpen } = useApp();

  return (
    <section id="casos" className="py-20 md:py-28 bg-white dark:bg-[#070d19] border-b border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-2">
            {t.testimonials.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight [text-wrap:balance]">
            {t.testimonials.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.testimonials.desc}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((cs) => (
            <div
              key={cs.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0c1527] p-7 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                {/* Segment & Rating */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <span className="font-semibold text-blue-900 dark:text-blue-400">{cs.segment}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(cs.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-sm font-medium text-slate-800 dark:text-slate-200 italic mb-6 leading-relaxed">
                  {cs.quote}
                </blockquote>

                {/* Quantified Metrics Grid (Before/After) */}
                <div className="grid grid-cols-1 gap-2.5 mb-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
                      Faturamento:
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {cs.metrics.revenueGrowth}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-blue-600" />
                      Horas do Fundador:
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {cs.metrics.hoursReduced}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <BarChart3 className="h-3.5 w-3.5 text-blue-600" />
                      Rentabilidade:
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {cs.metrics.ebitdaMargin}
                    </span>
                  </div>
                </div>

                {/* Before vs After Story */}
                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                  <div>
                    <span className="font-bold text-rose-700 dark:text-rose-400 block mb-0.5">
                      Antes da Mentoria:
                    </span>
                    <p className="line-clamp-3">{cs.beforeStory}</p>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                      Depois da Aceleração:
                    </span>
                    <p className="line-clamp-3">{cs.afterStory}</p>
                  </div>
                </div>
              </div>

              {/* Founder Signature Footer */}
              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-900 dark:bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {cs.founderName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-display">
                    {cs.founderName}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {cs.role} · {cs.companyName}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Proof CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setIsBookingOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>Quero Construir o Próximo Caso de Sucesso</span>
          </button>
        </div>
      </div>
    </section>
  );
};
