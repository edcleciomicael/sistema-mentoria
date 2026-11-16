import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { courseModules, clientOKRs } from '../data/mockData';
import {
  X,
  Lock,
  ShieldCheck,
  PlayCircle,
  CheckCircle2,
  Download,
  Calendar,
  TrendingUp,
  FileSpreadsheet,
  FileText,
  User,
  LogOut,
  Video,
  KeyRound,
  Sparkles,
} from 'lucide-react';

export const ClientPortal: React.FC = () => {
  const {
    isClientPortalOpen,
    setIsClientPortalOpen,
    user,
    logout,
    verifyMfa,
    bookings,
    formatCurrency,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'modules' | 'okrs' | 'sessions' | 'playbooks'>('modules');
  const [selectedModuleId, setSelectedModuleId] = useState(courseModules[0].id);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);

  // MFA Challenge State
  const [mfaInput, setMfaInput] = useState('');
  const [mfaError, setMfaError] = useState(false);

  if (!isClientPortalOpen) return null;

  // Handle MFA verification
  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyMfa(mfaInput);
    if (!success) {
      setMfaError(true);
    } else {
      setMfaError(false);
    }
  };

  const selectedModule =
    courseModules.find((m) => m.id === selectedModuleId) || courseModules[0];
  const activeLesson = selectedModule.lessons[selectedLessonIndex] || selectedModule.lessons[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-6xl rounded-2xl bg-white dark:bg-[#0a1120] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Top VIP Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070d19]">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xs">
              VIP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                  Portal do Aluno · Marquez Adviser
                </h3>
                {user?.isMfaVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    <ShieldCheck className="h-3 w-3" />
                    MFA Ativo
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                {user ? `${user.name} (${user.companyName})` : 'Acesso Restrito a Mentorados'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsClientPortalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* If MFA is not verified yet, show MFA Challenge */}
        {user && !user.isMfaVerified ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="h-14 w-14 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-200 dark:border-blue-800">
              <KeyRound className="h-7 w-7" />
            </div>

            <h4 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Verificação de 2 Fatores (MFA)
            </h4>
            <p className="text-xs text-slate-500 mt-2">
              Para proteger a governança da sua empresa e os dados financeiros estratégicos, digite o código de 6 dígitos do seu aplicativo autenticador.
            </p>

            <form onSubmit={handleMfaSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                autoFocus
                maxLength={6}
                value={mfaInput}
                onChange={(e) => setMfaInput(e.target.value)}
                placeholder="Ex: 849201"
                className="w-full text-center tracking-widest text-2xl font-mono py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
              />

              {mfaError && (
                <div className="text-xs text-rose-600 dark:text-rose-400">
                  Código inválido. Digite ao menos 4 números para autenticar.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl transition-all cursor-pointer"
              >
                Confirmar Autenticação Segura
              </button>

              <div className="text-[11px] text-slate-400">
                Dica de demonstração: Digite qualquer código de 4 a 6 dígitos (ex: 123456)
              </div>
            </form>
          </div>
        ) : (
          /* Main Client Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a1120] overflow-x-auto">
              <button
                onClick={() => setActiveTab('modules')}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'modules'
                    ? 'border-blue-900 text-blue-950 dark:border-blue-400 dark:text-blue-300'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Trilha de Aceleração (Aulas & Vídeos)
              </button>

              <button
                onClick={() => setActiveTab('okrs')}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'okrs'
                    ? 'border-blue-900 text-blue-950 dark:border-blue-400 dark:text-blue-300'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Metas & OKRs da Empresa
              </button>

              <button
                onClick={() => setActiveTab('sessions')}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'sessions'
                    ? 'border-blue-900 text-blue-950 dark:border-blue-400 dark:text-blue-300'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Sessões Agendadas ({bookings.length})
              </button>

              <button
                onClick={() => setActiveTab('playbooks')}
                className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'playbooks'
                    ? 'border-blue-900 text-blue-950 dark:border-blue-400 dark:text-blue-300'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Biblioteca de Playbooks & Planilhas
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-[#070d19]/60">
              {/* TAB 1: Modules & Lessons */}
              {activeTab === 'modules' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left: Video Player */}
                  <div className="lg:col-span-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] overflow-hidden shadow-sm">
                    {/* Immersive Video Player Container */}
                    <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center">
                      <video
                        key={activeLesson.videoUrl}
                        controls
                        poster=""
                        className="w-full h-full object-cover"
                      >
                        <source src={activeLesson.videoUrl} type="video/mp4" />
                        Seu navegador não suporta a tag de vídeo.
                      </video>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>{selectedModule.title}</span>
                        <span className="font-mono">{activeLesson.duration}</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                        {activeLesson.title}
                      </h4>

                      {/* Attachments for this lesson */}
                      {activeLesson.downloads && activeLesson.downloads.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                            Materiais Complementares desta Aula:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {activeLesson.downloads.map((dl, i) => (
                              <button
                                key={i}
                                onClick={() => alert(`Iniciando download seguro de: ${dl.name}`)}
                                className="inline-flex items-center gap-2 py-2 px-3 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 cursor-pointer"
                              >
                                <Download className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                <span>{dl.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono">({dl.size})</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Modules & Lessons Curriculum List */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Módulos da Aceleração
                    </div>

                    <div className="space-y-3">
                      {courseModules.map((mod) => {
                        const isCurrentMod = mod.id === selectedModuleId;
                        return (
                          <div
                            key={mod.id}
                            className={`rounded-xl border transition-all overflow-hidden ${
                              isCurrentMod
                                ? 'border-blue-900 dark:border-blue-600 bg-white dark:bg-[#0c1527]'
                                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60'
                            }`}
                          >
                            <button
                              onClick={() => {
                                setSelectedModuleId(mod.id);
                                setSelectedLessonIndex(0);
                              }}
                              className="w-full text-left p-3.5 cursor-pointer flex items-center justify-between"
                            >
                              <div>
                                <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                                  {mod.title}
                                </h5>
                                <span className="text-[11px] text-slate-500">
                                  {mod.lessons.length} aulas · {mod.durationMinutes} min
                                </span>
                              </div>
                              {mod.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                              ) : (
                                <PlayCircle className="h-4 w-4 text-blue-600 shrink-0" />
                              )}
                            </button>

                            {/* Sub-lessons list if expanded */}
                            {isCurrentMod && (
                              <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-2 space-y-1">
                                {mod.lessons.map((les, idx) => (
                                  <button
                                    key={les.id}
                                    onClick={() => setSelectedLessonIndex(idx)}
                                    className={`w-full text-left px-3 py-2 text-xs rounded-lg flex items-center justify-between cursor-pointer ${
                                      selectedLessonIndex === idx
                                        ? 'bg-blue-900 text-white font-medium dark:bg-blue-600'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                                  >
                                    <span className="truncate pr-2">{les.title}</span>
                                    <span className="text-[10px] font-mono shrink-0">{les.duration}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: OKRs & Goals */}
              {activeTab === 'okrs' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                        Painel de OKRs & Metas Estratégicas
                      </h4>
                      <p className="text-xs text-slate-500">
                        Metas auditadas quinzenalmente no comitê executivo com Marquez Adviser.
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      Média do Trimestre: 76.2% Concluído
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clientOKRs.map((okr) => (
                      <div
                        key={okr.id}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] p-5 shadow-sm space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                            Pilar: {okr.pillar}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">Prazo: {okr.deadline}</span>
                        </div>

                        <h5 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                          {okr.title}
                        </h5>

                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-500">Atual: {okr.currentValue}</span>
                            <span className="font-bold text-slate-900 dark:text-white">Alvo: {okr.targetValue}</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-blue-900 dark:bg-blue-500 rounded-full"
                              style={{ width: `${okr.progressPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Mentor Note */}
                        {okr.mentorFeedback && (
                          <div className="p-3 rounded-xl border border-blue-100 dark:border-blue-950 bg-blue-50/60 dark:bg-blue-950/30 text-xs text-slate-700 dark:text-slate-300">
                            <span className="font-semibold text-blue-900 dark:text-blue-300 block mb-0.5">
                              Feedback do Marquez:
                            </span>
                            {okr.mentorFeedback}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Scheduled Mentorship Sessions */}
              {activeTab === 'sessions' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                      Minhas Sessões de Mentoria Marcadas
                    </h4>
                    <p className="text-xs text-slate-500">
                      Encontros 1-on-1 com Marquez Adviser e comitês quinzenais de resultados.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {bookings.map((bk) => (
                      <div
                        key={bk.id}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-900">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                              Sessão Confirmada
                            </span>
                            <h5 className="text-base font-bold text-slate-900 dark:text-white font-display">
                              {bk.programName}
                            </h5>
                            <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                              <span>Data: {bk.date}</span>
                              <span>·</span>
                              <span>Horário: {bk.timeSlot}</span>
                              <span>·</span>
                              <span>{bk.timezone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={bk.meetUrl || 'https://meet.google.com/marquez-adviser-vip'}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-xs transition-all"
                          >
                            <Video className="h-4 w-4" />
                            <span>Entrar na Sala Virtual</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Playbooks & Spreadsheets */}
              {activeTab === 'playbooks' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                      Ferramentas, Planilhas & Playbooks Executivos
                    </h4>
                    <p className="text-xs text-slate-500">
                      Modelos prontos para aplicação imediata na sua empresa.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: 'Planilha DRE & Fluxo de Caixa Gerencial 2026',
                        desc: 'Regime de competência e caixa automatizados com projeção de 90 dias.',
                        type: 'Excel (.xlsx)',
                        size: '2.8 MB',
                        category: 'Finanças',
                      },
                      {
                        title: 'Matriz RACI de Delegação & Alçadas Decisórias',
                        desc: 'Defina quem é Responsável, Aprovador, Consultado e Informado em cada rotina.',
                        type: 'Excel (.xlsx)',
                        size: '1.4 MB',
                        category: 'Processos',
                      },
                      {
                        title: 'Manual de Criação de POPs Autogerenciáveis',
                        desc: 'Guia passo a passo para padronizar qualquer setor da sua empresa em 4 fases.',
                        type: 'PDF (.pdf)',
                        size: '4.8 MB',
                        category: 'Operações',
                      },
                      {
                        title: 'Roteiro de 1-on-1s e Reunião Semanal de Resultados',
                        desc: 'Script de condução para lideranças engajarem equipes em metas claras.',
                        type: 'Word (.docx)',
                        size: '950 KB',
                        category: 'Liderança',
                      },
                    ].map((tool, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1527] p-5 shadow-sm flex items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                            <FileSpreadsheet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              {tool.category} · {tool.type}
                            </span>
                            <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                              {tool.title}
                            </h5>
                            <p className="text-xs text-slate-500 mt-1">{tool.desc}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => alert(`Download de ${tool.title} iniciado com sucesso.`)}
                          className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-900 dark:text-blue-400 cursor-pointer"
                          title="Baixar Arquivo"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
