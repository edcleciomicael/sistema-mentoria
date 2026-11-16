import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Clock, Award, BarChart3, Users2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, setIsBookingOpen, setIsDiagnosticOpen } = useApp();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200/70 dark:border-slate-800/80 bg-gradient-to-b from-slate-50 via-white to-slate-100/50 dark:from-[#070d19] dark:via-[#091122] dark:to-[#070d19]">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Clean unboxed kicker (no pill badge) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-900 dark:text-blue-400 uppercase mb-4">
              <span>{t.hero.tag}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-slate-500 dark:text-slate-400">Método Validado</span>
            </div>

            {/* Headline with text-wrap balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6 font-display [text-wrap:balance]">
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              {t.hero.subtitle}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setIsDiagnosticOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </div>

            {/* Quick trust anchors */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Mentoria 100% Personalizada 1-on-1</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Sigilo Contratual & Governança NDA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Resultados mensurados em 90 dias</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Executive Dashboard Anchor */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0c1527] p-6 shadow-xl shadow-slate-200/40 dark:shadow-black/50">
              {/* Header of the executive card */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Índice de Governança Corporativa
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    Marquez Business Cockpit
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Em Aceleração</span>
                </div>
              </div>

              {/* Transformation Comparison metrics */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 p-3.5">
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Horas do Dono na Operação
                  </div>
                  <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    -62%
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    De 65h para 24h semanais
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/60 p-3.5">
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Margem Líquida EBITDA
                  </div>
                  <div className="text-xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                    26.8%
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    +14.2 p.p. de expansão
                  </div>
                </div>
              </div>

              {/* Progress Bar of Pillars */}
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Processos Autogerenciáveis (POPs)</span>
                    <span className="font-mono tabular-nums text-slate-900 dark:text-white">92%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-blue-900 dark:bg-blue-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Delegação & Liderança Autônoma</span>
                    <span className="font-mono tabular-nums text-slate-900 dark:text-white">85%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-blue-800 dark:bg-blue-600 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>DRE & Previsibilidade de Caixa</span>
                    <span className="font-mono tabular-nums text-slate-900 dark:text-white">96%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-indigo-900 dark:bg-indigo-500 rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>
              </div>

              {/* Mentor Direct Advisory Quote */}
              <div className="rounded-xl border border-blue-100 dark:border-blue-950 bg-blue-50/60 dark:bg-blue-950/20 p-4 flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                  MA
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Marquez Adviser
                  </span>
                  "Se sua empresa para quando você viaja, você não tem um negócio, tem um emprego de risco."
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantified Proof Bar (Claim-to-Proof Adjacency) */}
        <div className="mt-16 pt-10 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              1.240+
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              Empresas aceleradas no Brasil e exterior
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              R$ 480M+
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              Em valor e faturamento destravados
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              98.4%
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              Índice Net Promoter Score (NPS)
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              +142%
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
              Crescimento médio do lucro operacional
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
