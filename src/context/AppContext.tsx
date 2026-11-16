import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CurrencyCode,
  LanguageCode,
  Booking,
  PaymentTransaction,
  UserSession,
  AppNotification,
  LeadLeadMagnet,
  ChatMessage,
  MentorshipProgram,
  BlogPost,
} from '../types';
import { currencies, mentorshipPrograms } from '../data/mockData';
import { translations } from '../i18n/translations';

interface AppContextType {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // i18n
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: typeof translations.pt;

  // Currency
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatCurrency: (brlValue: number) => string;

  // Offline status
  isOffline: boolean;

  // User & MFA Auth
  user: UserSession | null;
  loginAsDemoClient: () => void;
  loginAsGuest: () => void;
  logout: () => void;
  verifyMfa: (code: string) => boolean;

  // Bookings
  bookings: Booking[];
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'meetUrl'>) => Booking;

  // Payments
  transactions: PaymentTransaction[];
  processPayment: (
    programId: string,
    method: 'pix' | 'credit_card' | 'bank_transfer',
    isRecurring: boolean,
    customerDetails: { name: string; email: string }
  ) => PaymentTransaction;

  // Notifications
  notifications: AppNotification[];
  isPushEnabled: boolean;
  togglePushNotifications: () => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Lead Nurturing & Email Marketing
  leads: LeadLeadMagnet[];
  captureLead: (lead: Omit<LeadLeadMagnet, 'id' | 'createdAt' | 'tags' | 'status'>) => void;

  // Live Chat
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;

  // Modals & Navigation Views
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  bookingProgram: MentorshipProgram | null;
  setBookingProgram: (prog: MentorshipProgram | null) => void;

  isPaymentOpen: boolean;
  setIsPaymentOpen: (open: boolean) => void;
  paymentProgram: MentorshipProgram | null;
  setPaymentProgram: (prog: MentorshipProgram | null) => void;

  isClientPortalOpen: boolean;
  setIsClientPortalOpen: (open: boolean) => void;

  isDiagnosticOpen: boolean;
  setIsDiagnosticOpen: (open: boolean) => void;

  isIntegrationsOpen: boolean;
  setIsIntegrationsOpen: (open: boolean) => void;

  isEmailMarketingOpen: boolean;
  setIsEmailMarketingOpen: (open: boolean) => void;

  isCloudDbOpen: boolean;
  setIsCloudDbOpen: (open: boolean) => void;

  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  isDocumentationOpen: boolean;
  setIsDocumentationOpen: (open: boolean) => void;
  documentationTab: 'tecnica' | 'manual';
  setDocumentationTab: (tab: 'tecnica' | 'manual') => void;
  openDocumentation: (tab?: 'tecnica' | 'manual') => void;

  selectedArticle: BlogPost | null;
  setSelectedArticle: (post: BlogPost | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('marquez_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('marquez_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // i18n Language
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('marquez_lang');
    return (saved as LanguageCode) || 'pt';
  });

  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem('marquez_lang', lang);
  };

  const t = translations[language] || translations.pt;

  // Currency
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('marquez_currency');
    return (saved as CurrencyCode) || 'BRL';
  });

  const handleSetCurrency = (code: CurrencyCode) => {
    setCurrency(code);
    localStorage.setItem('marquez_currency', code);
  };

  const formatCurrency = (brlValue: number): string => {
    const config = currencies[currency] || currencies.BRL;
    return config.format(brlValue);
  };

  // Offline detection
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // User authentication & MFA
  const [user, setUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('marquez_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default demo client logged in
    return {
      id: 'usr-client-01',
      name: 'Dr. Guilherme Siqueira',
      email: 'guilherme@inovaresolucoes.com.br',
      companyName: 'Inovare Soluções Corporativas',
      role: 'client',
      isMfaVerified: true,
      mfaMethod: 'totp',
      activeProgram: 'Mentoria Aceleração Marquez',
      maturityScore: 78,
    };
  });

  const loginAsDemoClient = () => {
    const demo: UserSession = {
      id: 'usr-client-01',
      name: 'Dr. Guilherme Siqueira',
      email: 'guilherme@inovaresolucoes.com.br',
      companyName: 'Inovare Soluções Corporativas',
      role: 'client',
      isMfaVerified: true,
      mfaMethod: 'totp',
      activeProgram: 'Mentoria Aceleração Marquez',
      maturityScore: 78,
    };
    setUser(demo);
    localStorage.setItem('marquez_user', JSON.stringify(demo));
  };

  const loginAsGuest = () => {
    setUser(null);
    localStorage.removeItem('marquez_user');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('marquez_user');
  };

  const verifyMfa = (code: string) => {
    if (code.trim().length >= 4) {
      if (user) {
        const updated = { ...user, isMfaVerified: true };
        setUser(updated);
        localStorage.setItem('marquez_user', JSON.stringify(updated));
      }
      return true;
    }
    return false;
  };

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('marquez_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'bk-101',
        programId: 'aceleracao-executiva',
        programName: 'Mentoria Aceleração Marquez',
        clientName: 'Dr. Guilherme Siqueira',
        clientEmail: 'guilherme@inovaresolucoes.com.br',
        clientPhone: '+55 11 98822-4411',
        companyName: 'Inovare Soluções Corporativas',
        revenueRange: 'R$ 200k - R$ 500k/mês',
        teamSize: '15-30 colaboradores',
        date: '2026-09-29',
        timeSlot: '14:30 - 16:00',
        timezone: 'America/Sao_Paulo (GMT-3)',
        status: 'confirmed',
        createdAt: '2026-09-24T10:00:00Z',
        meetUrl: 'https://meet.google.com/marquez-adviser-vip',
      },
    ];
  });

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'meetUrl'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      meetUrl: `https://meet.google.com/mqz-${Math.random().toString(36).substring(7)}`,
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('marquez_bookings', JSON.stringify(updated));

    // Also trigger notification
    addNotification({
      title: 'Mentoria Agendada com Sucesso',
      message: `Sua sessão com Marquez Adviser foi confirmada para ${newBooking.date} às ${newBooking.timeSlot}.`,
      category: 'mentorship',
      read: false,
    });

    return newBooking;
  };

  // Transactions & Payments
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('marquez_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'tx-9941',
        programId: 'aceleracao-executiva',
        amount: 18500,
        currency: 'BRL',
        paymentMethod: 'credit_card',
        isRecurring: true,
        status: 'approved',
        customerName: 'Dr. Guilherme Siqueira',
        customerEmail: 'guilherme@inovaresolucoes.com.br',
        date: '2026-09-20',
        invoiceUrl: '#invoice-9941',
      },
    ];
  });

  const processPayment = (
    programId: string,
    method: 'pix' | 'credit_card' | 'bank_transfer',
    isRecurring: boolean,
    customerDetails: { name: string; email: string }
  ): PaymentTransaction => {
    const prog = mentorshipPrograms.find((p) => p.id === programId) || mentorshipPrograms[0];
    const newTx: PaymentTransaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      programId: prog.id,
      amount: prog.basePriceBrl,
      currency: currency,
      paymentMethod: method,
      isRecurring: isRecurring || prog.isRecurring,
      status: 'approved',
      customerName: customerDetails.name,
      customerEmail: customerDetails.email,
      date: new Date().toLocaleDateString('pt-BR'),
      invoiceUrl: `#invoice-${Date.now()}`,
    };

    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem('marquez_transactions', JSON.stringify(updated));

    addNotification({
      title: isRecurring ? 'Assinatura Recorrente Confirmada' : 'Pagamento Aprovado com Sucesso',
      message: `A transação de ${formatCurrency(newTx.amount)} para ${prog.name} foi processada e faturada.`,
      category: 'billing',
      read: false,
    });

    return newTx;
  };

  // Push notifications
  const [isPushEnabled, setIsPushEnabled] = useState<boolean>(() => {
    return localStorage.getItem('marquez_push_enabled') === 'true';
  });

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Revisão Quinzenal de OKRs',
      message: 'O mentor Marquez Adviser analisou sua meta de margem EBITDA e deixou notas estratégicas.',
      category: 'mentorship',
      date: 'Há 2 horas',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Novo Playbook Disponível',
      message: 'Template atualizado: "Planilha DRE & Fluxo de Caixa Gerencial 2026" foi adicionado ao portal.',
      category: 'content',
      date: 'Ontem',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Comitê de Líderes na Próxima Terça',
      message: 'Prepare a lista de entregáveis do setor de operações para a reunião das 14h30.',
      category: 'mentorship',
      date: 'Há 3 dias',
      read: true,
    },
  ]);

  const addNotification = (notif: Omit<AppNotification, 'id' | 'date'>) => {
    const item: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      date: 'Agora',
    };
    setNotifications((prev) => [item, ...prev]);

    // Native browser push if permitted
    if (isPushEnabled && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`Marquez Adviser: ${item.title}`, {
          body: item.message,
          icon: '/favicon.ico',
        });
      } catch (err) {
        console.warn('Browser push notification could not be shown:', err);
      }
    }
  };

  const togglePushNotifications = () => {
    if (!isPushEnabled) {
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            setIsPushEnabled(true);
            localStorage.setItem('marquez_push_enabled', 'true');
            addNotification({
              title: 'Notificações Push Ativadas',
              message: 'Você receberá avisos em tempo real de sessões, feedbacks de metas e novos conteúdos.',
              category: 'system',
              read: false,
            });
          }
        });
      } else {
        setIsPushEnabled(true);
        localStorage.setItem('marquez_push_enabled', 'true');
      }
    } else {
      setIsPushEnabled(false);
      localStorage.setItem('marquez_push_enabled', 'false');
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Lead Nurturing & Email Marketing
  const [leads, setLeads] = useState<LeadLeadMagnet[]>(() => {
    const saved = localStorage.getItem('marquez_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'lead-01',
        fullName: 'Roberto F. Alcantara',
        email: 'roberto@alcantaraalimentos.com.br',
        phone: '+55 11 97123-9988',
        company: 'Alcantara Distribuidora de Alimentos',
        monthlyRevenue: 'R$ 350.000 / mês',
        source: 'Diagnóstico 360°',
        createdAt: '2026-09-24T18:30:00Z',
        tags: ['Gargalo em Processos', 'Equipe Desalinhada', 'Lead Quente'],
        status: 'qualified',
      },
      {
        id: 'lead-02',
        fullName: 'Fernanda L. Brandão',
        email: 'fernanda@brandaoarquitetura.com.br',
        phone: '+55 21 98345-1122',
        company: 'Brandão Arquitetura & Interiores',
        monthlyRevenue: 'R$ 120.000 / mês',
        source: 'Ebook Delegação',
        createdAt: '2026-09-25T09:15:00Z',
        tags: ['Sobrecarga Operacional', 'Lead Nutrição'],
        status: 'in_nurturing',
      },
    ];
  });

  const captureLead = (lead: Omit<LeadLeadMagnet, 'id' | 'createdAt' | 'tags' | 'status'>) => {
    const newLead: LeadLeadMagnet = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      tags: ['Diagnóstico Realizado', 'Potencial Mentoria'],
      status: 'subscribed',
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem('marquez_leads', JSON.stringify(updated));

    addNotification({
      title: 'Novo Lead Registrado no Pipeline',
      message: `${newLead.fullName} (${newLead.company}) entrou no fluxo automatizado de nutrição.`,
      category: 'system',
      read: false,
    });
  };

  // Live Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'advisor',
      senderName: 'Marquez Adviser & Equipe',
      text: 'Olá! Seja bem-vindo à central de atendimento e mentoria executiva. Como podemos acelerar sua gestão hoje?',
      timestamp: '14:00',
      read: true,
    },
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sendChatMessage = (text: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: user ? user.name : 'Visitante',
      text,
      timestamp: timeStr,
      read: true,
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Automated smart advisor response simulation
    setTimeout(() => {
      let replyText = 'Entendido! Essa é uma das principais dores que destravamos no primeiro mês de mentoria. Nossos consultores já receberam sua mensagem e você também pode agendar um Diagnóstico 1-on-1 diretamente pelo botão no topo.';
      const lower = text.toLowerCase();
      if (lower.includes('preço') || lower.includes('valor') || lower.includes('custo') || lower.includes('quanto')) {
        replyText = `Nossos programas variam de acordo com a maturidade da sua empresa. Temos desde o Diagnóstico Estratégico pontual (${formatCurrency(1950)}) até a Mentoria de Aceleração Contínua de 6 meses. Você pode conferir os detalhes na seção de Programas!`;
      } else if (lower.includes('agendar') || lower.includes('reunião') || lower.includes('horário')) {
        replyText = 'Você pode escolher o melhor dia e horário diretamente no nosso calendário de agendamento online clicando no botão "Agendar Mentoria" no menu!';
      } else if (lower.includes('processo') || lower.includes('equipe') || lower.includes('delegar')) {
        replyText = 'Processos autogerenciáveis são exatamente o Pilar 01 da nossa metodologia. Mapeamos os POPs para que o time funcione com autonomia total e reporte nos rituais semanais.';
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-resp-${Date.now()}`,
          sender: 'advisor',
          senderName: 'Marquez Adviser (Plantão)',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
        },
      ]);
    }, 1200);
  };

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingProgram, setBookingProgram] = useState<MentorshipProgram | null>(null);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentProgram, setPaymentProgram] = useState<MentorshipProgram | null>(null);

  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);
  const [isEmailMarketingOpen, setIsEmailMarketingOpen] = useState(false);
  const [isCloudDbOpen, setIsCloudDbOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const [documentationTab, setDocumentationTab] = useState<'tecnica' | 'manual'>('tecnica');
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const openDocumentation = (tab: 'tecnica' | 'manual' = 'tecnica') => {
    setDocumentationTab(tab);
    setIsDocumentationOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage: handleSetLanguage,
        t,
        currency,
        setCurrency: handleSetCurrency,
        formatCurrency,
        isOffline,
        user,
        loginAsDemoClient,
        loginAsGuest,
        logout,
        verifyMfa,
        bookings,
        createBooking,
        transactions,
        processPayment,
        notifications,
        isPushEnabled,
        togglePushNotifications,
        markNotificationAsRead,
        clearAllNotifications,
        leads,
        captureLead,
        chatMessages,
        sendChatMessage,
        isChatOpen,
        setIsChatOpen,
        isBookingOpen,
        setIsBookingOpen,
        bookingProgram,
        setBookingProgram,
        isPaymentOpen,
        setIsPaymentOpen,
        paymentProgram,
        setPaymentProgram,
        isClientPortalOpen,
        setIsClientPortalOpen,
        isDiagnosticOpen,
        setIsDiagnosticOpen,
        isIntegrationsOpen,
        setIsIntegrationsOpen,
        isEmailMarketingOpen,
        setIsEmailMarketingOpen,
        isCloudDbOpen,
        setIsCloudDbOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isDocumentationOpen,
        setIsDocumentationOpen,
        documentationTab,
        setDocumentationTab,
        openDocumentation,
        selectedArticle,
        setSelectedArticle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
