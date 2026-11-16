import React from 'react';
import { useApp } from '../context/AppContext';
import { WifiOff, Database } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOffline, t } = useApp();

  if (!isOffline) return null;

  return (
    <aside
      aria-label="Aviso de conexão offline"
      className="bg-amber-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm sticky top-0 z-50 animate-in slide-in-from-top duration-200"
    >
      <WifiOff className="h-4 w-4" />
      <span>{t.common.offlineMessage}</span>
      <span className="hidden sm:inline opacity-80">· Banco local persistido</span>
    </aside>
  );
};
