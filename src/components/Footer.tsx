import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Mail, Phone, MapPin, Globe, Database, Zap, Lock, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    t,
    setIsBookingOpen,
    setIsDiagnosticOpen,
    setIsClientPortalOpen,
    setIsIntegrationsOpen,
    setIsEmailMarketingOpen,
    setIsCloudDbOpen,
    openDocumentation,
  } = useApp();

  return (
    <footer className="bg-slate-900 dark:bg-[#050811] text-slate-400 text-xs border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-display font-extrabold text-base">
                M
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                MARQUEZ <span className="text-blue-400 font-light">ADVISER</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Mentoria personalizada de aceleração empresarial e governança corporativa para líderes que desejam transformar suas empresas em organizações autogerenciáveis, previsíveis e lucrativas.
            </p>

            <div className="space-y-1.5 text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-blue-400" />
                <span>Rua Elizabeth, 59 · Natal - RN</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-blue-400" />
                <span>contato@marquezadviser.com.br</span>
              </div>
            </div>
          </div>

          {/* Column 1: Metodologia */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-4">
              Metodologia
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#pilares" className="hover:text-white transition-colors">
                  01. Governança & POPs
                </a>
              </li>
              <li>
                <a href="#pilares" className="hover:text-white transition-colors">
                  02. Máquina de Vendas
                </a>
              </li>
              <li>
                <a href="#pilares" className="hover:text-white transition-colors">
                  03. DRE & Gestão Financeira
                </a>
              </li>
              <li>
                <a href="#pilares" className="hover:text-white transition-colors">
                  04. Liderança Autônoma
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsDiagnosticOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Diagnóstico 360° Online
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Programas & Acesso */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-4">
              Programas & Clientes
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#programas" className="hover:text-white transition-colors">
                  Diagnóstico Estratégico 1-on-1
                </a>
              </li>
              <li>
                <a href="#programas" className="hover:text-white transition-colors">
                  Mentoria Aceleração Marquez
                </a>
              </li>
              <li>
                <a href="#programas" className="hover:text-white transition-colors">
                  Board Advisory Mensal
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsClientPortalOpen(true)}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="h-3 w-3 text-blue-400" />
                  <span>Portal do Aluno (MFA)</span>
                </button>
              </li>
              <li>
                <a href="#casos" className="hover:text-white transition-colors">
                  Casos de Sucesso Reais
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Ferramentas & Ecossistema */}
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-4">
              Gestão & Ferramentas
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => setIsIntegrationsOpen(true)}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Zap className="h-3 w-3 text-amber-400" />
                  <span>Hub de Integrações</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsEmailMarketingOpen(true)}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Mail className="h-3 w-3 text-blue-400" />
                  <span>Lead Nurturing & E-mail</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCloudDbOpen(true)}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Database className="h-3 w-3 text-emerald-400" />
                  <span>Cloud Database Monitor</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openDocumentation('tecnica')}
                  className="hover:text-blue-400 text-blue-400 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <FileText className="h-3 w-3 text-blue-400" />
                  <span>1. Documentação Técnica (PDF)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openDocumentation('manual')}
                  className="hover:text-amber-400 text-amber-400 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <FileText className="h-3 w-3 text-amber-400" />
                  <span>2. Manual do Usuário (PDF)</span>
                </button>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">
                  Biblioteca de Artigos
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 Marquez Adviser Participações e Consultoria Ltda. Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400">Termos de Uso</span>
            <span>·</span>
            <span className="hover:text-slate-400">Política de Privacidade (LGPD)</span>
            <span>·</span>
            <span className="hover:text-slate-400">Termo de Sigilo Executivo (NDA)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
