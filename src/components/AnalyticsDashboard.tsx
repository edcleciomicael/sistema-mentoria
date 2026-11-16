import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Users,
  Award,
  BarChart3,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  ChevronDown,
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const [selectedCohort, setSelectedCohort] = useState('Turma Executiva 2026.2');

  const stats = [
    {
      label: 'Horas Poupadas por Dono',
      value: '-38h / mês',
      sub: 'Delegação e eliminação de reuniões inúteis',
      positive: true,
    },
    {
      label: 'Expansão de Margem EBITDA',
      value: '+14.6 p.p.',
      sub: 'Auditoria de custos e precificação correta',
      positive: true,
    },
    {
      label: 'POPs Implementados e Auditados',
      value: '88.4%',
      sub: 'Processos funcionando sem supervisão direta',
      positive: true,
    },
    {
      label: 'Cumprimento de Metas OKRs',
      value: '82.1%',
      sub: 'Monitoradas quinzenalmente pelo conselho',
      positive: true,
    },
  ];

  const maturityRadar = [
    { pillar: 'Processos & POPs', before: 32, after: 89 },
    { pillar: 'Máquina Comercial', before: 45, after: 84 },
    { pillar: 'DRE & Fluxo de Caixa', before: 28, after: 94 },
    { pillar: 'Liderança & 1-on-1s', before: 38, after: 86 },
    { pillar: 'Governança & Conselho', before: 18, after: 80 },
  ];

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#070d19] border-b border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-2">
              Auditoria em Tempo Real
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
              Painel de Desempenho & Métricas dos Mentorados
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
              Dados consolidados de transformação empresarial acompanhados diretamente pelo conselho de Marquez Adviser.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white cursor-pointer shadow-xs"
            >
              <option value="Turma Executiva 2026.2">Turma Executiva 2026.2 (Atual)</option>
              <option value="Turma Executiva 2026.1">Turma Executiva 2026.1</option>
              <option value="Consolidado Geral (1.240 Empresas)">Consolidado Geral (1.240 Empresas)</option>
            </select>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0c1527] p-6 shadow-sm"
            >
              <div className="text-xs font-medium text-slate-500 mb-2">{item.label}</div>
              <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mb-2 tabular-nums">
                {item.value}
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>{item.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Deep Dive Performance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radar / Maturity Transformation Comparison */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Evolução por Pilar: Antes x Depois da Aceleração
                </h4>
                <p className="text-xs text-slate-500">
                  Pontuação média na escala de governança de 0 a 100 pontos.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span>Antes</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-900 dark:text-blue-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-900 dark:bg-blue-500" />
                  <span>Depois (90 dias)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {maturityRadar.map((p, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-700 dark:text-slate-300">{p.pillar}</span>
                    <span className="font-mono text-slate-900 dark:text-white tabular-nums">
                      {p.before} pts → <strong className="text-blue-600 dark:text-blue-400">{p.after} pts</strong>
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    {/* Before bar */}
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-slate-300 dark:bg-slate-600 rounded-full"
                      style={{ width: `${p.before}%` }}
                    />
                    {/* After bar */}
                    <div
                      className="absolute top-0 bottom-0 left-0 bg-blue-900 dark:bg-blue-500 rounded-full opacity-90"
                      style={{ width: `${p.after}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Health Card */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0c1527] p-6 sm:p-8">
            <h4 className="text-base font-bold text-slate-900 dark:text-white font-display mb-2">
              Índice de Sobrevivência e Escala
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Segundo o IBGE, 60% das empresas fecham em menos de 5 anos por falta de processos e gestão de caixa. As empresas que passam pela mentoria Marquez Adviser apresentam:
            </p>

            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/20 text-xs">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">
                  96.8% de Taxa de Sobrevivência & Lucro Contínuo
                </span>
                Empresas mentoradas mantêm geração de caixa positiva nos primeiros 24 meses.
              </div>

              <div className="p-3 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50 dark:bg-blue-950/20 text-xs">
                <span className="font-bold text-blue-900 dark:text-blue-300 block mb-0.5">
                  Zero Dependência de "Heróis Operacionais"
                </span>
                Processos documentados evitam que a saída de um colaborador paralise a empresa.
              </div>
            </div>

            <div className="text-[11px] text-slate-500 italic text-center">
              Auditoria de métricas atualizada semanalmente pelo comitê Marquez.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
