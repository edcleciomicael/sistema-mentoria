import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, AlertTriangle, ArrowRight, Share2, Calendar, Award } from 'lucide-react';

interface Question {
  id: number;
  pillar: string;
  question: string;
  options: {
    text: string;
    points: number;
  }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    pillar: 'Processos & Delegação',
    question: 'O que acontece na sua empresa se você (fundador) se ausentar por 30 dias consecutivos?',
    options: [
      { text: 'A empresa para por completo e os clientes começam a reclamar.', points: 5 },
      { text: 'O operacional sobrevive com dificuldade, mas não fecha novos negócios e o caos se instala.', points: 12 },
      { text: 'A equipe mantém os rituais básicos, porém as decisões críticas ficam travadas até meu retorno.', points: 18 },
      { text: 'A empresa continua faturando, batendo metas e crescendo com autonomia da liderança.', points: 25 },
    ],
  },
  {
    id: 2,
    pillar: 'Padronização & POPs',
    question: 'Como estão mapeados os procedimentos operacionais padrão (POPs) das principais rotinas do seu negócio?',
    options: [
      { text: 'Tudo está apenas na minha cabeça e na cabeça de colaboradores antigos.', points: 5 },
      { text: 'Existem anotações esparsas em blocos ou pastas, mas quase ninguém segue no dia a dia.', points: 10 },
      { text: 'Os processos principais estão descritos, mas dependem de cobrança frequente para serem executados.', points: 18 },
      { text: '100% dos fluxos possuem POPs documentados, com checklists e auditorias quinzenais automáticas.', points: 25 },
    ],
  },
  {
    id: 3,
    pillar: 'Vendas & Aquisição',
    question: 'Qual é o grau de previsibilidade do seu faturamento mensal?',
    options: [
      { text: 'Total montanha-russa: meses excelentes seguidos de meses com aperto no caixa.', points: 5 },
      { text: 'Temos indicações constantes, porém dependemos do dono para fechar a maioria das propostas.', points: 12 },
      { text: 'Temos um time de vendas estruturado, mas a taxa de conversão oscila e faltam SLAs rígidos.', points: 18 },
      { text: 'Máquina comercial previsível com metas diárias, funil mapeado e taxa de conversão estável.', points: 25 },
    ],
  },
  {
    id: 4,
    pillar: 'Finanças & EBITDA',
    question: 'Com que frequência você analisa o DRE Gerencial, Margem Líquida e Projeção de Fluxo de Caixa?',
    options: [
      { text: 'Não temos DRE gerencial; acompanhamos apenas o saldo bancário no aplicativo.', points: 5 },
      { text: 'Olhamos uma vez por mês com o contador, mas sempre depois que o mês já fechou.', points: 12 },
      { text: 'Temos DRE e controle de caixa, mas ainda misturamos custos ou faltam projeções futuras.', points: 18 },
      { text: 'Analisamos toda semana o DRE por competência, ponto de equilíbrio e fluxo de 90 dias.', points: 25 },
    ],
  },
];

export const DiagnosticQuiz: React.FC = () => {
  const {
    isDiagnosticOpen,
    setIsDiagnosticOpen,
    setIsBookingOpen,
    captureLead,
  } = useApp();

  const [currentStep, setCurrentStep] = useState(0); // 0 to 3 are questions, 4 is lead capture, 5 is results
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Lead capture form state
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    monthlyRevenue: 'R$ 100k - R$ 300k',
  });

  if (!isDiagnosticOpen) return null;

  const totalQuestions = quizQuestions.length;

  const handleSelectOption = (points: number, optionIdx: number) => {
    setSelectedOption(optionIdx);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    const currentQ = quizQuestions[currentStep];
    const points = currentQ.options[selectedOption].points;
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(4); // Move to lead capture step
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.fullName || !leadForm.email || !leadForm.company) return;

    captureLead({
      fullName: leadForm.fullName,
      email: leadForm.email,
      phone: leadForm.phone,
      company: leadForm.company,
      monthlyRevenue: leadForm.monthlyRevenue,
      source: 'Calculadora de Maturidade 360°',
    });

    setCurrentStep(5); // Show final results
  };

  // Score calculation
  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);

  const getMaturityTier = (score: number) => {
    if (score < 45) {
      return {
        level: 'Nível 1: Sobrecarga & Apagador de Incêndios',
        color: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
        summary: 'Sua empresa depende 100% da sua presença física e mental. Sem processos claros, você corre risco iminente de estagnação e exaustão operacional.',
        urgency: 'Prioridade Absoluta: Mapeamento de POPs e Organograma Funcional.',
      };
    } else if (score < 75) {
      return {
        level: 'Nível 2: Tração com Gargalo Centralizador',
        color: 'text-amber-600 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
        summary: 'A empresa já gera receita consistente, porém o crescimento está limitado pela quantidade de horas que você consegue trabalhar.',
        urgency: 'Prioridade: Implantação de Rituais Semanais e Formação de Coordenadores.',
      };
    } else {
      return {
        level: 'Nível 3: Governança & Pronta para Escalar',
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
        summary: 'Estrutura sólida com processos e liderança emergente. O foco agora é expansão de margem EBITDA e criação de um conselho consultivo.',
        urgency: 'Prioridade: Otimização Financeira, M&A e Governança de Conselho.',
      };
    }
  };

  const maturityInfo = getMaturityTier(totalScore);

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <span className="text-[11px] font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider">
              Diagnóstico 360° Marquez Adviser
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Calculadora de Maturidade de Gestão
            </h3>
          </div>
          <button
            onClick={() => setIsDiagnosticOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Question Progress bar */}
        {currentStep < 4 && (
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full bg-blue-900 dark:bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Step 0-3: Questions */}
          {currentStep < totalQuestions && (
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span>Pergunta {currentStep + 1} de {totalQuestions}</span>
                <span className="font-semibold text-blue-900 dark:text-blue-400">
                  {quizQuestions[currentStep].pillar}
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 font-display">
                {quizQuestions[currentStep].question}
              </h4>

              <div className="space-y-3 mb-8">
                {quizQuestions[currentStep].options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(option.points, idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-blue-900 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/50 text-slate-900 dark:text-white ring-1 ring-blue-900/20 dark:ring-blue-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                          isSelected
                            ? 'border-blue-900 bg-blue-900 text-white dark:border-blue-400 dark:bg-blue-500'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-sm font-medium leading-relaxed">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:opacity-40 rounded-xl transition-all cursor-pointer"
                >
                  <span>{currentStep === totalQuestions - 1 ? 'Calcular Meu Raio-X' : 'Próxima Pergunta'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Lead Capture */}
          {currentStep === 4 && (
            <div>
              <div className="text-center max-w-md mx-auto mb-6">
                <div className="inline-flex p-3 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-400 mb-3">
                  <Award className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Seu diagnóstico está pronto!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Onde devemos enviar o relatório executivo completo com a Matriz de Gargalos e a recomendação do mentor Marquez?
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={leadForm.fullName}
                    onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                    placeholder="Ex: Carlos Eduardo Silva"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Corporativo
                    </label>
                    <input
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="carlos@empresa.com.br"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      WhatsApp com DDD
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="(11) 98888-7777"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nome da Sua Empresa
                    </label>
                    <input
                      type="text"
                      required
                      value={leadForm.company}
                      onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      placeholder="Ex: Alfa Engenharia Ltda"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Faturamento Mensal
                    </label>
                    <select
                      value={leadForm.monthlyRevenue}
                      onChange={(e) => setLeadForm({ ...leadForm, monthlyRevenue: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Até R$ 50k / mês">Até R$ 50k / mês</option>
                      <option value="R$ 50k - R$ 150k / mês">R$ 50k - R$ 150k / mês</option>
                      <option value="R$ 150k - R$ 500k / mês">R$ 150k - R$ 500k / mês</option>
                      <option value="R$ 500k - R$ 1.5M / mês">R$ 500k - R$ 1.5M / mês</option>
                      <option value="Acima de R$ 1.5M / mês">Acima de R$ 1.5M / mês</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 text-xs font-bold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Ver Meu Resultado & Recomendações
                </button>
              </form>
            </div>
          )}

          {/* Step 5: Final Results & Roadmap */}
          {currentStep === 5 && (
            <div className="space-y-6">
              {/* Score Display Card */}
              <div className={`p-6 rounded-2xl border ${maturityInfo.bg} text-center`}>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Pontuação Global de Maturidade
                </div>
                <div className="text-5xl font-extrabold font-mono text-slate-900 dark:text-white my-2 tabular-nums">
                  {totalScore} <span className="text-2xl text-slate-400 font-sans">/ 100</span>
                </div>
                <div className={`text-base font-bold font-display ${maturityInfo.color}`}>
                  {maturityInfo.level}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 max-w-lg mx-auto">
                  {maturityInfo.summary}
                </p>
              </div>

              {/* Urgency Callout */}
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/20 text-xs text-slate-800 dark:text-slate-200">
                <span className="font-bold text-blue-900 dark:text-blue-400 block mb-0.5">
                  Recomendação Direta de Marquez Adviser:
                </span>
                {maturityInfo.urgency}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsDiagnosticOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-bold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-md cursor-pointer transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Agendar Diagnóstico 1-on-1 com Marquez</span>
                </button>

                <button
                  onClick={() => {
                    const text = `Fiz o diagnóstico empresarial da Marquez Adviser e minha empresa pontuou ${totalScore}/100 no índice de governança!`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Compartilhar</span>
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={resetQuiz}
                  className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline cursor-pointer"
                >
                  Refazer Diagnóstico
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
