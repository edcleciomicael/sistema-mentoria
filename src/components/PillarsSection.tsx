import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, ArrowRight, ShieldCheck, Cpu, DollarSign, Users, ChevronRight } from 'lucide-react';

interface PillarDetail {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  problemSolved: string;
  deliverables: string[];
  transformation: string;
}

export const PillarsSection: React.FC = () => {
  const { t, setIsBookingOpen, setIsDiagnosticOpen } = useApp();
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const pillars: PillarDetail[] = [
    {
      id: 'processos',
      number: '01',
      title: 'Governança & Processos Autogerenciáveis',
      tagline: 'Sua empresa com padrão de qualidade e execução mesmo quando você não está presente.',
      description: 'Estruturação de Procedimentos Operacionais Padrão (POPs) práticos, organograma funcional com descrição clara de entregáveis por cargo e matriz de autoridade RACI.',
      problemSolved: 'Acaba com o "apagar de incêndios diário", perguntas repetitivas de colaboradores e a dependência tóxica do fundador no operacional.',
      deliverables: [
        'Mapeamento dos 20 processos vitais da empresa',
        'Criação e homologação dos POPs operacionais',
        'Matriz de Delegação & Alçadas Decisórias RACI',
        'Rituais de auditoria quinzenal sem retrabalho',
      ],
      transformation: 'O dono ganha até 25 horas livres por semana para focar em estratégia e expansão.',
    },
    {
      id: 'vendas',
      number: '02',
      title: 'Máquina de Vendas & Aquisição Previsível',
      tagline: 'Previsibilidade de faturamento mês a mês com processos comerciais consolidados.',
      description: 'Implementação de funil comercial consultivo, SLAs entre pré-vendas e executivos de contas, scripts de negociação de alto valor e rotinas diárias de pipeline.',
      problemSolved: 'Elimina os meses de montanha-russa financeira (um mês bate meta, no outro passa sufoco) e a dependência do dono para fechar todos os contratos.',
      deliverables: [
        'Estruturação do Playbook Comercial da sua empresa',
        'Padronização do Funil de Aquisição B2B/B2C',
        'Critérios de qualificação e cadência de follow-up',
        'Dashboard de conversão diária por vendedor',
      ],
      transformation: 'O faturamento deixa de ser sorte e passa a ser uma consequência matemática do funil.',
    },
    {
      id: 'financas',
      number: '03',
      title: 'Gestão Financeira, EBITDA & Fluxo de Caixa',
      tagline: 'Clareza milimétrica de onde cada centavo entra, onde vaza e qual o lucro líquido real.',
      description: 'DRE Gerencial por competência e regime de caixa diário, apuração de margem de contribuição por produto/serviço, ponto de equilíbrio e planejamento orçamentário.',
      problemSolved: 'Elimina a sensação angustiante de "faturar muito e não sobrar dinheiro no bolso dos sócios" e a confusão entre conta física e jurídica.',
      deliverables: [
        'Implantação da DRE Gerencial Automatizada',
        'Projeção de Fluxo de Caixa para 60 e 90 dias',
        'Cálculo de margem de contribuição e precificação correta',
        'Definição de Pró-labore fixo e política de distribuição de dividendos',
      ],
      transformation: 'Previsibilidade absoluta de liquidez e crescimento seguro da margem EBITDA.',
    },
    {
      id: 'lideranca',
      number: '04',
      title: 'Liderança, Cultura & Retenção de Talentos',
      tagline: 'Formação de gerentes e coordenadores autônomos que pensam e agem como donos.',
      description: 'Rituais de gestão semanal (reunião de resultados de 45 minutos), 1-on-1s com líderes, métricas de metas via OKRs e plano de incentivo alinhado ao lucro.',
      problemSolved: 'Acaba com o descomprometimento da equipe, alta rotatividade e colaboradores desmotivados que apenas executam o mínimo necessário.',
      deliverables: [
        'Roteiro estruturado para reuniões semanais de metas',
        'Metodologia de 1-on-1 para desenvolvimento de líderes',
        'Implantação de OKRs e metas claras por área',
        'Scorecard para contratação de profissionais Nível A',
      ],
      transformation: 'Uma segunda linha de comando madura que resolve os problemas antes de chegarem à diretoria.',
    },
  ];

  const activePillar = pillars[activePillarIndex];

  return (
    <section id="pilares" className="py-20 md:py-28 bg-white dark:bg-[#070d19] border-b border-slate-200/80 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-2">
            {t.pillars.kicker}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight [text-wrap:balance]">
            {t.pillars.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.pillars.desc}
          </p>
        </div>

        {/* 4 Pillars Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Selector List (clean natural editorial styling) */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar, idx) => {
              const isActive = activePillarIndex === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarIndex(idx)}
                  className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? 'border-blue-900 bg-blue-950 text-white dark:border-blue-500 dark:bg-blue-950/60 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 hover:bg-slate-100 dark:bg-[#0b1324] dark:hover:bg-[#0f1b33] text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span
                    className={`font-mono font-bold text-sm tabular-nums mt-0.5 ${
                      isActive ? 'text-blue-300' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {pillar.number}.
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`text-base font-bold font-display ${
                        isActive ? 'text-white' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {pillar.title.replace(`${pillar.number}. `, '')}
                    </h3>
                    <p
                      className={`text-xs mt-1 line-clamp-2 ${
                        isActive ? 'text-blue-100/80' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {pillar.tagline}
                    </p>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 mt-1 transition-transform ${
                      isActive
                        ? 'text-blue-300 translate-x-1'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: In-Depth Pillar Breakdown */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0c1527] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider mb-2">
              <span>Pilar Estratégico {activePillar.number}</span>
              <span aria-hidden="true">·</span>
              <span>Aceleração de Negócios</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display mb-3">
              {activePillar.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {activePillar.description}
            </p>

            {/* Problem Solved Card */}
            <div className="mb-6 rounded-xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/60 dark:bg-rose-950/20 p-4">
              <div className="text-xs font-semibold text-rose-700 dark:text-rose-400 uppercase mb-1">
                Gargalo que eliminamos na sua empresa:
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {activePillar.problemSolved}
              </div>
            </div>

            {/* Concrete Deliverables */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Entregáveis Práticos da Mentoria:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePillar.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-2.5 rounded-lg"
                  >
                    <Check className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Measured Outcome */}
            <div className="rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/30 p-4 mb-8">
              <div className="text-xs font-semibold text-blue-900 dark:text-blue-400 uppercase mb-1">
                Resultado Mensurável do Pilar:
              </div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">
                {activePillar.transformation}
              </div>
            </div>

            {/* Direct Action */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>Aplicar este Pilar na Minha Empresa</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => setIsDiagnosticOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                <span>Fazer Diagnóstico 360°</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
