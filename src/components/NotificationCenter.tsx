import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Bell,
  Check,
  CheckCheck,
  Calendar,
  Sparkles,
  CreditCard,
  Info,
} from 'lucide-react';

export const NotificationCenter: React.FC = () => {
  const {
    notifications,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isPushEnabled,
    togglePushNotifications,
    markNotificationAsRead,
    clearAllNotifications,
    setIsClientPortalOpen,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  if (!isNotificationsOpen) return null;

  const filteredNotifications =
    activeCategory === 'all'
      ? notifications
      : notifications.filter((n) => n.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mentorship':
        return <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case 'content':
        return <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      case 'billing':
        return <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Info className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-full bg-white dark:bg-[#0c1527] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-blue-900 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              Central de Notificações Push
            </h3>
          </div>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Push Notification Toggle Banner */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-blue-50/50 dark:bg-blue-950/20 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              Notificações no Navegador (Web Push)
            </span>
            <span className="text-[11px] text-slate-500">
              Receba avisos instantâneos de sessões e revisões de OKRs.
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
            <input
              type="checkbox"
              checked={isPushEnabled}
              onChange={togglePushNotifications}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Category Filter Pills & Mark all as read */}
        <div className="px-6 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'Todas' },
              { id: 'mentorship', label: 'Mentoria' },
              { id: 'content', label: 'Conteúdos' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-950 text-white dark:bg-blue-600'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={clearAllNotifications}
            className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="h-3 w-3" />
            <span>Marcar lidas</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              Nenhuma notificação encontrada nesta categoria.
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.category === 'mentorship' || notif.category === 'content') {
                    setIsNotificationsOpen(false);
                    setIsClientPortalOpen(true);
                  }
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  notif.read
                    ? 'border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 opacity-75'
                    : 'border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 shadow-xs'
                }`}
              >
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                  {getCategoryIcon(notif.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-400">{notif.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
