import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { thirdPartyIntegrations } from '../data/mockData';
import {
  X,
  Zap,
  CheckCircle2,
  RefreshCw,
  Send,
  Database,
  Calendar,
  MessageSquare,
  CreditCard,
  Layers,
} from 'lucide-react';
import { ThirdPartyIntegration } from '../types';

export const IntegrationsHub: React.FC = () => {
  const { isIntegrationsOpen, setIsIntegrationsOpen } = useApp();
  const [integrations, setIntegrations] = useState<ThirdPartyIntegration[]>(thirdPartyIntegrations);
  const [testWebhookResult, setTestWebhookResult] = useState<string | null>(null);

  if (!isIntegrationsOpen) return null;

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
  };

  const handleTestWebhook = (name: string) => {
    setTestWebhookResult(`Disparando webhook de teste para ${name}... Payload recebido com status 200 OK.`);
    setTimeout(() => {
      setTestWebhookResult(null);
    }, 3500);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'Calendar':
        return <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case 'MessageSquare':
        return <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case 'CreditCard':
        return <CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <Zap className="h-5 w-5 text-blue-900 dark:text-blue-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
                Central de Integrações & Automação de Fluxo de Trabalho
              </h3>
              <p className="text-[11px] text-slate-500">
                Conectores de ERPs, CRMs, videoconferência e webhooks
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsIntegrationsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {testWebhookResult && (
            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{testWebhookResult}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        {getIcon(item.icon)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.connected}
                        onChange={() => toggleConnection(item.id)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <p className="text-xs text-slate-500 mb-3">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{item.lastSync}</span>
                  {item.connected && (
                    <button
                      onClick={() => handleTestWebhook(item.name)}
                      className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Send className="h-3 w-3" />
                      <span>Testar Webhook</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
