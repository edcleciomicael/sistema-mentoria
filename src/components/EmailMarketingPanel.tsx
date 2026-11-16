import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Mail,
  Send,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Filter,
  Sparkles,
  Play,
  Pause,
} from 'lucide-react';
import { EmailCampaign } from '../types';

export const EmailMarketingPanel: React.FC = () => {
  const {
    isEmailMarketingOpen,
    setIsEmailMarketingOpen,
    leads,
  } = useApp();

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([
    {
      id: 'cmp-1',
      name: 'Sequência 01: Boas-Vindas & Playbook de Delegação',
      subject: 'Seu Diagnóstico Marquez Adviser + Guia de Gestão em Anexo',
      stage: 'Boas-vindas',
      openRate: 68.4,
      clickRate: 34.2,
      status: 'active',
      leadsReached: 1240,
    },
    {
      id: 'cmp-2',
      name: 'Sequência 02: Os 3 Maiores Erros do Fundador Centralizador',
      subject: 'Por que seus colaboradores não resolvem problemas sozinhos?',
      stage: 'Diagnóstico',
      openRate: 54.1,
      clickRate: 26.8,
      status: 'active',
      leadsReached: 890,
    },
    {
      id: 'cmp-3',
      name: 'Sequência 03: Convite Executivo para o Diagnóstico 1-on-1',
      subject: 'Vaga aberta na agenda confidencial de Marquez Adviser',
      stage: 'Oferta de Mentoria',
      openRate: 49.3,
      clickRate: 21.5,
      status: 'active',
      leadsReached: 620,
    },
  ]);

  const [testEmailSent, setTestEmailSent] = useState(false);

  if (!isEmailMarketingOpen) return null;

  const handleToggleCampaign = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c
      )
    );
  };

  const handleSendTest = () => {
    setTestEmailSent(true);
    setTimeout(() => setTestEmailSent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <Mail className="h-5 w-5 text-blue-900 dark:text-blue-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Lead Nurturing & Automação de E-mail Marketing Integrada
              </h3>
              <p className="text-[11px] text-slate-500">
                Nutrição inteligente de empresários e leads gerados pelo diagnóstico
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEmailMarketingOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Key Metrics Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-[11px] text-slate-500 block">Leads no Funil</span>
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {leads.length + 1240}
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-[11px] text-slate-500 block">Taxa Média de Abertura</span>
              <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                57.2%
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-[11px] text-slate-500 block">Taxa de Cliques (CTR)</span>
              <span className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
                27.5%
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-[11px] text-slate-500 block">Automações Ativas</span>
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                3 fluxos
              </span>
            </div>
          </div>

          {/* Active Workflows List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Sequências Automatizadas de Nutrição
              </h4>
              <button
                onClick={handleSendTest}
                className="inline-flex items-center gap-1.5 py-1.5 px-3 text-xs font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900 transition-colors cursor-pointer"
              >
                <Send className="h-3 w-3" />
                <span>{testEmailSent ? 'E-mail de Teste Disparado!' : 'Disparar E-mail de Teste'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-400">
                        {camp.stage}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        {camp.name}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-500 italic">
                      "{camp.subject}"
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-xs">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Abertura / Clique</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {camp.openRate}% / {camp.clickRate}%
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleCampaign(camp.id)}
                      className={`p-2 rounded-lg border cursor-pointer ${
                        camp.status === 'active'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300'
                          : 'border-slate-200 bg-slate-100 text-slate-500 dark:bg-slate-800'
                      }`}
                      title={camp.status === 'active' ? 'Pausar Sequência' : 'Ativar Sequência'}
                    >
                      {camp.status === 'active' ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscribed Leads Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Últimos Leads Qualificados pelo Diagnóstico
            </h4>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Nome & Empresa</th>
                    <th className="py-2.5 px-4 font-semibold">Contato</th>
                    <th className="py-2.5 px-4 font-semibold">Faturamento</th>
                    <th className="py-2.5 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-2.5 px-4">
                        <span className="font-bold text-slate-900 dark:text-white block">{lead.fullName}</span>
                        <span className="text-[11px] text-slate-500">{lead.company}</span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">
                        <div>{lead.email}</div>
                        <div className="text-[11px] font-mono">{lead.phone}</div>
                      </td>
                      <td className="py-2.5 px-4 font-mono font-medium text-slate-900 dark:text-white">
                        {lead.monthlyRevenue}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                          {lead.status === 'qualified' ? 'Qualificado' : 'Em Nutrição'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
