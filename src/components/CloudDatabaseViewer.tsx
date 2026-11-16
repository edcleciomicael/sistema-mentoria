import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Database,
  Cloud,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Server,
  HardDrive,
  ShieldCheck,
} from 'lucide-react';

export const CloudDatabaseViewer: React.FC = () => {
  const {
    isCloudDbOpen,
    setIsCloudDbOpen,
    bookings,
    leads,
    transactions,
    notifications,
  } = useApp();

  const [activeCollection, setActiveCollection] = useState<'bookings' | 'leads' | 'transactions'>('bookings');
  const [syncing, setSyncing] = useState(false);

  if (!isCloudDbOpen) return null;

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1200);
  };

  const handleExportBackup = () => {
    const data = {
      timestamp: new Date().toISOString(),
      platform: 'Marquez Adviser Cloud DB',
      version: '2026.4',
      collections: {
        bookings,
        leads,
        transactions,
        notifications,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marquez_adviser_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <Cloud className="h-5 w-5 text-blue-900 dark:text-blue-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Banco de Dados em Nuvem de Alta Escalabilidade
              </h3>
              <p className="text-[11px] text-slate-500">
                Replicação multirregional ativa · SLA 99.99% · Backup Automatizado
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCloudDbOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-3">
              <Server className="h-5 w-5 text-emerald-600" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Status dos Nós</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Ativo & Sincronizado</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-3">
              <HardDrive className="h-5 w-5 text-blue-600" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Registros em Memória</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                  {bookings.length + leads.length + transactions.length} documentos
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-indigo-600" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Criptografia</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">AES-256 em Repouso</span>
              </div>
            </div>
          </div>

          {/* Collection Switcher & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
              <button
                onClick={() => setActiveCollection('bookings')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCollection === 'bookings'
                    ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Agendamentos ({bookings.length})
              </button>

              <button
                onClick={() => setActiveCollection('leads')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCollection === 'leads'
                    ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Leads de Marketing ({leads.length})
              </button>

              <button
                onClick={() => setActiveCollection('transactions')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCollection === 'transactions'
                    ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Transações / Faturamento ({transactions.length})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSync}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin text-blue-600' : ''}`} />
                <span>{syncing ? 'Sincronizando...' : 'Sincronizar Nuvem'}</span>
              </button>

              <button
                onClick={handleExportBackup}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-950 dark:bg-blue-600 rounded-lg shadow-xs hover:bg-slate-900 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Exportar Backup JSON</span>
              </button>
            </div>
          </div>

          {/* JSON Explorer View */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 font-mono text-[11px] text-emerald-400 max-h-64 overflow-y-auto">
            <pre>
              {JSON.stringify(
                activeCollection === 'bookings'
                  ? bookings
                  : activeCollection === 'leads'
                  ? leads
                  : transactions,
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
