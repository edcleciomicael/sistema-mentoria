import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  Server,
  Layers,
  Code2,
  BookOpen,
  CheckCircle2,
  Cpu,
  Globe2,
  Database,
  Workflow,
  Lock,
  ChevronRight,
  ExternalLink,
  Users,
  Calendar,
  CreditCard,
  BarChart3,
  Bot,
  HelpCircle,
  X
} from 'lucide-react';

interface DocumentationViewerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'tecnica' | 'manual';
}

export const DocumentationViewer: React.FC<DocumentationViewerProps> = ({
  isOpen,
  onClose,
  initialTab = 'tecnica'
}) => {
  const [activeTab, setActiveTab] = useState<'tecnica' | 'manual'>(initialTab);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#070d19] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[94vh] overflow-hidden print:max-h-none print:border-none print:shadow-none print:rounded-none">
        
        {/* Top Control Bar (Hidden when printing to PDF) */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50/80 dark:bg-slate-900/80 print:hidden gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Documentação Oficial Marquez Adviser
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pronto para visualização e exportação em PDF de alta resolução
              </p>
            </div>
          </div>

          {/* Switch Document */}
          <div className="flex items-center gap-2 bg-slate-200/70 dark:bg-slate-800/70 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('tecnica')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'tecnica'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              1. Documentação Técnica
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'manual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              2. Manual de Uso
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              title="Salvar como PDF no seu navegador"
            >
              <Printer className="h-4 w-4" />
              <span>Salvar em PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-[#040810] text-slate-800 dark:text-slate-200 print:p-0 print:bg-white print:text-black">
          
          {/* ========================================================================= */}
          {/* DOCUMENTO 1: DOCUMENTAÇÃO TÉCNICA                                         */}
          {/* ========================================================================= */}
          {activeTab === 'tecnica' && (
            <div className="max-w-4xl mx-auto bg-white dark:bg-[#070d19] rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-12 print:shadow-none print:border-none print:p-6 print:rounded-none">
              
              {/* CAPA EXECUTIVA (Cores do site Marquez Adviser: Marinho Profundo, Azul Elétrico, Dourado Bronze) */}
              <div className="relative rounded-2xl p-10 sm:p-14 overflow-hidden mb-12 bg-gradient-to-br from-[#070d19] via-[#0b162c] to-[#030712] text-white border border-blue-500/30 shadow-2xl print:bg-black print:text-white print:border-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col justify-between min-h-[380px]">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white text-lg shadow-lg border border-blue-400/30">
                        M
                      </div>
                      <span className="font-extrabold tracking-wider text-xl">
                        MARQUEZ <span className="text-blue-400 font-light">ADVISER</span>
                      </span>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
                      Arquitetura, DevOps & Infraestrutura
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      Documentação Técnica & Manual de Engenharia
                    </h1>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                      Especificação técnica completa da plataforma: arquitetura front-end SPA, integração contínua (CI/CD) via GitHub Actions, pipeline FTP com cPanel/HostGator, zona DNS e diretrizes de governança de código.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
                    <div>
                      <p className="font-semibold text-white">Projeto: Marquez Adviser Platform</p>
                      <p>Domínio: marquezadviser.com | preview.marquezadviser.com</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">Versão do Documento: 1.0.0 (Release)</p>
                      <p>Data: Outubro de 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ÍNDICE TÉCNICO */}
              <div className="mb-10 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-600" /> Índice Técnico
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-blue-500" /> 1. Visão Geral da Arquitetura</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-blue-500" /> 2. Stack Tecnológica & Dependências</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-blue-500" /> 3. Infraestrutura & Servidor (HostGator cPanel)</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-blue-500" /> 4. Configuração de DNS & Zonas de Domínio</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-blue-500" /> 5. Pipeline CI/CD GitHub Actions</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-blue-500" /> 6. Roteamento SPA e Arquivo .htaccess</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-blue-500" /> 7. Gestão de Secrets & Segurança</li>
                </ul>
              </div>

              {/* SEÇÃO 1 */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <Layers className="h-5 w-5 text-blue-600" /> 1. Visão Geral da Arquitetura
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  A plataforma <strong>Marquez Adviser</strong> foi concebida sob o padrão de <strong>Single Page Application (SPA)</strong> corporativa de alta performance, utilizando React 19, TypeScript e Vite 8. O design é renderizado no cliente com carregamento ultra-rápido, tipografia corporativa refinada (Syne e Plus Jakarta Sans) e suporte total a temas claro e escuro (Dark Mode).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-400 uppercase font-semibold">Front-End</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-1">React 19 + TypeScript</p>
                    <p className="text-xs text-slate-500 mt-1">Componentização modular desacoplada e tipada rigidamente.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-400 uppercase font-semibold">Build Tool</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-1">Vite 8 + Tailwind v4</p>
                    <p className="text-xs text-slate-500 mt-1">Compilação instantânea e CSS utility-first ultraleve.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="text-xs text-slate-400 uppercase font-semibold">Hospedagem</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white mt-1">Apache cPanel / Linux</p>
                    <p className="text-xs text-slate-500 mt-1">Servidor HostGator com suporte a SSL Let's Encrypt.</p>
                  </div>
                </div>
              </section>

              {/* SEÇÃO 2 */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <Code2 className="h-5 w-5 text-blue-600" /> 2. Stack Tecnológica & Dependências
                </h2>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <th className="p-2.5 rounded-l-lg">Pacote / Biblioteca</th>
                        <th className="p-2.5">Versão</th>
                        <th className="p-2.5 rounded-r-lg">Finalidade no Projeto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                      <tr>
                        <td className="p-2.5 font-semibold text-slate-900 dark:text-white">react & react-dom</td>
                        <td className="p-2.5 font-mono">19.0.1</td>
                        <td className="p-2.5">Engine reativa principal da interface e gerenciamento de estado.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-slate-900 dark:text-white">tailwindcss & @tailwindcss/vite</td>
                        <td className="p-2.5 font-mono">4.3.3</td>
                        <td className="p-2.5">Estilização responsiva sem folhas de estilo pesadas.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-slate-900 dark:text-white">lucide-react</td>
                        <td className="p-2.5 font-mono">0.546.0</td>
                        <td className="p-2.5">Iconografia corporativa e SVG vetorial otimizado.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-slate-900 dark:text-white">motion</td>
                        <td className="p-2.5 font-mono">12.23.24</td>
                        <td className="p-2.5">Transições suaves, animações de entrada e interatividade tátil.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold text-slate-900 dark:text-white">typescript</td>
                        <td className="p-2.5 font-mono">7.0.2</td>
                        <td className="p-2.5">Checagem de tipos estática, garantindo zero bugs de tipagem.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SEÇÃO 3 & 4 */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <Server className="h-5 w-5 text-blue-600" /> 3. Infraestrutura & Servidor (HostGator cPanel)
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  A aplicação é hospedada em servidor compartilhado Linux sob controle do <strong>cPanel 134.0.63</strong> na HostGator Brasil (Servidor: <code>br1094.hostgator.com.br</code>).
                </p>
                <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Servidor Físico / Hostname:</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">br1094.hostgator.com.br</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Endereço IP Dedicado:</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">162.241.203.126</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Diretório Homologação (Preview):</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">/home3/ingri024/preview.marquezadviser.com</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Diretório Produção Oficial:</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">/home3/ingri024/marquezadviser.com</span>
                  </div>
                </div>
              </section>

              {/* SEÇÃO 5 */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <Workflow className="h-5 w-5 text-blue-600" /> 4. Pipeline CI/CD GitHub Actions (.github/workflows/deploy.yml)
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  O fluxo de publicação contínua é automatizado via <strong>GitHub Actions</strong>. Toda vez que um commit é sincronizado com a branch <code>main</code> ou <code>preview</code>, o pipeline é acionado automaticamente.
                </p>
                <div className="mt-4 p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto">
                  <pre>{`name: Deploy Marquez Adviser - HostGator
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4 with { node-version: '20' }
  - run: npm install --legacy-peer-deps
  - run: npm run build
  - uses: SamKirkland/FTP-Deploy-Action@v4.3.5
    with:
      server: \${{ secrets.HOSTGATOR_FTP_SERVER }}
      username: \${{ secrets.HOSTGATOR_FTP_USERNAME }}
      password: \${{ secrets.HOSTGATOR_FTP_PASSWORD }}
      local-dir: dist/
      server-dir: \${{ secrets.HOSTGATOR_FTP_DIR || './' }}`}</pre>
                </div>
              </section>

              {/* SEÇÃO 6 */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <ShieldCheck className="h-5 w-5 text-blue-600" /> 5. Roteamento SPA e .htaccess no Apache
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  Como a aplicação é uma SPA, qualquer atualização de página em rotas internas resultaria em erro 404 caso o Apache não soubesse redirecionar para o <code>index.html</code>. O arquivo <code>public/.htaccess</code> resolve isso, além de forçar HTTPS e ativar compressão Gzip.
                </p>
              </section>

              {/* RODAPÉ DO DOCUMENTO */}
              <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
                <span>© 2026 Marquez Adviser. Todos os direitos reservados.</span>
                <span>Documento emitido por Google AI Studio & Engenharia</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DOCUMENTO 2: MANUAL DE USO DA PLATAFORMA                                  */}
          {/* ========================================================================= */}
          {activeTab === 'manual' && (
            <div className="max-w-4xl mx-auto bg-white dark:bg-[#070d19] rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-12 print:shadow-none print:border-none print:p-6 print:rounded-none">
              
              {/* CAPA EXECUTIVA (Manual de Uso) */}
              <div className="relative rounded-2xl p-10 sm:p-14 overflow-hidden mb-12 bg-gradient-to-br from-[#0c1a30] via-[#0f2347] to-[#081122] text-white border border-amber-500/30 shadow-2xl print:bg-black print:text-white print:border-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col justify-between min-h-[380px]">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-bold text-white text-lg shadow-lg border border-amber-400/30">
                        M
                      </div>
                      <span className="font-extrabold tracking-wider text-xl">
                        MARQUEZ <span className="text-amber-400 font-light">ADVISER</span>
                      </span>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/15 text-amber-300 border border-amber-500/25 mb-4">
                      Guia Operacional do Usuário & Mentorando
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      Manual do Usuário & Guia de Recursos da Plataforma
                    </h1>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                      Instruções detalhadas para utilização das funcionalidades executivas da Marquez Adviser: agendamento de sessões, diagnóstico de maturidade, portal exclusivo de mentorandos, gestão financeira e canais de suporte.
                    </p>
                  </div>

                  <div className="pt-8 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
                    <div>
                      <p className="font-semibold text-white">Destinado a: Líderes, Sócios, Mentorandos e Equipe Administrativa</p>
                      <p>Acesso: https://preview.marquezadviser.com</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">Edição: 2026.1</p>
                      <p>Status: Operacional</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ÍNDICE DO MANUAL */}
              <div className="mb-10 p-6 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-amber-600" /> Módulos & Seções do Manual
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-amber-500" /> 1. Navegação e Seleção de Idioma / Moeda</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-amber-500" /> 2. Diagnóstico Interativo de Maturidade Empresarial</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-amber-500" /> 3. Agendamento Online de Sessão Estratégica</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-amber-500" /> 4. Programas de Mentoria & Checkout Integrado</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-amber-500" /> 5. Portal do Mentorando (Área Restrita)</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-amber-500" /> 6. Central de Notificações & Suporte via Chat</li>
                  <li className="flex items-center gap-1.5"><ChevronRight className="h-3 w-3 text-amber-500" /> 7. Painel de Analytics & Métricas de Sucesso</li>
                </ul>
              </div>

              {/* SEÇÃO 1 */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <Globe2 className="h-5 w-5 text-amber-600" /> 1. Navegação e Seleção de Idioma / Moeda
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  No cabeçalho superior (Header), os visitantes e mentorandos contam com ferramentas de personalização instantânea:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">Multi-Idioma (i18n)</p>
                    <p className="text-slate-500 mt-1">Alternância imediata entre Português (PT-BR), Inglês (EN-US) e Espanhol (ES).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">Conversão de Moedas</p>
                    <p className="text-slate-500 mt-1">Visualização de valores em Real (BRL R$), Dólar (USD $) e Euro (EUR €).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">Dark / Light Mode</p>
                    <p className="text-slate-500 mt-1">Modo escuro para conforto visual em reuniões executivas noturnas.</p>
                  </div>
                </div>
              </section>

              {/* SEÇÃO 2 */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <BarChart3 className="h-5 w-5 text-amber-600" /> 2. Diagnóstico Interativo de Maturidade Empresarial
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  O módulo <strong>Diagnóstico Quiz</strong> permite que o empresário responda a uma série de perguntas estratégicas sobre Governança, Lucratividade, Autonomia de Equipe e Escala. Ao final, é gerado um relatório de maturidade com gráfico radar e indicação do programa ideal de aceleração.
                </p>
              </section>

              {/* SEÇÃO 3 */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <Calendar className="h-5 w-5 text-amber-600" /> 3. Agendamento Online de Sessão Estratégica
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  Através do botão <strong>"Agendar Sessão"</strong>, abre-se o modal integrado de calendário:
                </p>
                <ol className="list-decimal list-inside text-xs text-slate-600 dark:text-slate-300 mt-3 space-y-2">
                  <li>Escolha da data e do horário disponível em tempo real.</li>
                  <li>Preenchimento dos dados do tomador de decisão (Nome, Email Corporativo, Cargo e Faturamento).</li>
                  <li>Confirmação automática com disparo de notificação e envio de convite Google Meet / Zoom.</li>
                </ol>
              </section>

              {/* SEÇÃO 4 */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <Lock className="h-5 w-5 text-amber-600" /> 4. Portal do Mentorando (Área Exclusiva)
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  Ao clicar em <strong>"Área do Cliente"</strong> no topo da página, os líderes mentorados têm acesso a:
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">✓ Plano de Ação Personalizado (90 Dias)</p>
                    <p className="text-slate-500 mt-1">Acompanhamento de metas de receita e governança.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">✓ Repositório de Frameworks & Planilhas</p>
                    <p className="text-slate-500 mt-1">Download de modelos de DRE, organogramas e playbooks.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">✓ Histórico de Encontros & Gravações</p>
                    <p className="text-slate-500 mt-1">Revisão das atas e deliberações das sessões anteriores.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <p className="font-semibold text-slate-900 dark:text-white">✓ Linha Direta com o Mentor</p>
                    <p className="text-slate-500 mt-1">Canal prioritário para validação de decisões de risco.</p>
                  </div>
                </div>
              </section>

              {/* SEÇÃO 5 */}
              <section className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <HelpCircle className="h-5 w-5 text-amber-600" /> 5. Suporte & Central de Ajuda
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  A plataforma conta com o <strong>Widget de Chat ao Vivo</strong> no canto inferior direito para atendimento em tempo real com a equipe de concierge da Marquez Adviser, além da <strong>Central de Notificações</strong> no topo para alertas de agendamento e novas atualizações.
                </p>
              </section>

              {/* RODAPÉ DO DOCUMENTO */}
              <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
                <span>© 2026 Marquez Adviser. Todos os direitos reservados.</span>
                <span>Guia Oficial de Operação</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
