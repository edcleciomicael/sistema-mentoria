import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sun,
  Moon,
  Globe,
  DollarSign,
  Bell,
  Lock,
  Menu,
  X,
  User,
  Activity,
  Layers,
  Sparkles,
  FileText,
} from 'lucide-react';
import { CurrencyCode, LanguageCode } from '../types';

export const Header: React.FC = () => {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    currency,
    setCurrency,
    t,
    notifications,
    setIsBookingOpen,
    setIsClientPortalOpen,
    setIsNotificationsOpen,
    setIsDiagnosticOpen,
    setIsIntegrationsOpen,
    setIsEmailMarketingOpen,
    setIsCloudDbOpen,
    openDocumentation,
    user,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#070d19]/95 transition-colors">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="flex items-center gap-2 group text-xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 dark:from-blue-600 dark:to-indigo-800 flex items-center justify-center text-white shadow-sm font-display text-base font-extrabold border border-blue-500/20">
              M
            </div>
            <span className="font-display tracking-tight text-slate-900 dark:text-white">
              MARQUEZ <span className="text-blue-600 dark:text-blue-400 font-light">ADVISER</span>
            </span>
          </a>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#pilares"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.nav.pillars}
          </a>
          <button
            onClick={() => setIsDiagnosticOpen(true)}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t.nav.diagnostic}</span>
            <span className="text-[10px] uppercase font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
              Online
            </span>
          </button>
          <a
            href="#programas"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.nav.mentorship}
          </a>
          <a
            href="#casos"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.nav.results}
          </a>
          <a
            href="#blog"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.nav.blog}
          </a>
        </nav>

        {/* Zone 3: Action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setCurrencyMenuOpen(!currencyMenuOpen);
                setLangMenuOpen(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-md dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
              title="Trocar Moeda / Change Currency"
            >
              <DollarSign className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>{currency}</span>
            </button>

            {currencyMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-lg bg-white p-1.5 shadow-xl ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10 z-50">
                {(['BRL', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => {
                      setCurrency(cur);
                      setCurrencyMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors flex items-center justify-between cursor-pointer ${
                      currency === cur
                        ? 'bg-blue-50 text-blue-700 font-semibold dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <span>{cur}</span>
                    <span className="text-[10px] text-slate-400">
                      {cur === 'BRL' ? 'R$' : cur === 'USD' ? '$' : cur === 'EUR' ? '€' : '£'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setCurrencyMenuOpen(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-md dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white transition-colors cursor-pointer"
              title="Idioma / Language"
            >
              <Globe className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span className="uppercase">{language}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-lg bg-white p-1.5 shadow-xl ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/10 z-50">
                {[
                  { code: 'pt', label: 'Português' },
                  { code: 'en', label: 'English' },
                  { code: 'es', label: 'Español' },
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLanguage(item.code as LanguageCode);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors cursor-pointer ${
                      language === item.code
                        ? 'bg-blue-50 text-blue-700 font-semibold dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Alternar tema claro/escuro"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Push Notification Bell */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Notificações"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Client Portal VIP Button */}
          <button
            onClick={() => setIsClientPortalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-700/80 rounded-lg bg-slate-50 dark:bg-slate-800/60 cursor-pointer"
          >
            <Lock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="whitespace-nowrap">{t.nav.clientArea}</span>
          </button>

          {/* Documentation PDF Button */}
          <button
            onClick={() => openDocumentation('tecnica')}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors border border-blue-200 dark:border-blue-900/60 rounded-lg bg-blue-50/70 dark:bg-blue-950/40 cursor-pointer shadow-xs"
            title="Acessar Documentação Técnica e Manual do Usuário em PDF"
          >
            <FileText className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="whitespace-nowrap font-bold">Docs & PDF</span>
          </button>

          {/* Schedule Mentorship Primary CTA */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            {t.nav.scheduleNow}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 dark:border-slate-800 dark:bg-[#070d19] shadow-lg animate-in slide-in-from-top duration-150">
          <nav className="flex flex-col gap-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <a
              href="#pilares"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600"
            >
              {t.nav.pillars}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDiagnosticOpen(true);
              }}
              className="py-1.5 text-left flex items-center justify-between hover:text-blue-600"
            >
              <span>{t.nav.diagnostic}</span>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded">
                Gratuito
              </span>
            </button>
            <a
              href="#programas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600"
            >
              {t.nav.mentorship}
            </a>
            <a
              href="#casos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600"
            >
              {t.nav.results}
            </a>
            <a
              href="#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-blue-600"
            >
              {t.nav.blog}
            </a>
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDocumentation('tecnica');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold border border-blue-200 dark:border-blue-800/80 rounded-lg text-blue-700 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/40"
            >
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              <span>Documentação & Manual PDF</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsClientPortalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
            >
              <Lock className="h-3.5 w-3.5 text-blue-600" />
              <span>{t.nav.clientArea} (MFA Seguro)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-blue-900 dark:bg-blue-600 rounded-lg shadow-sm"
            >
              {t.nav.scheduleNow}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
