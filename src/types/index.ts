export type CurrencyCode = 'BRL' | 'USD' | 'EUR' | 'GBP';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateAgainstBrl: number; // 1 BRL = X foreign currency or conversion multiplier
  format: (value: number) => string;
}

export type LanguageCode = 'pt' | 'en' | 'es';

export interface MentorshipProgram {
  id: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  format: string;
  basePriceBrl: number;
  isRecurring: boolean;
  recurringInterval?: 'month' | 'year';
  deliverables: string[];
  popular?: boolean;
}

export interface Booking {
  id: string;
  programId: string;
  programName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  revenueRange: string;
  teamSize: string;
  date: string;
  timeSlot: string;
  timezone: string;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'pending_payment' | 'completed' | 'cancelled';
  meetUrl?: string;
}

export interface PaymentTransaction {
  id: string;
  bookingId?: string;
  programId: string;
  amount: number;
  currency: CurrencyCode;
  paymentMethod: 'pix' | 'credit_card' | 'bank_transfer';
  isRecurring: boolean;
  status: 'approved' | 'pending' | 'processing';
  customerName: string;
  customerEmail: string;
  date: string;
  invoiceUrl: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  companyName: string;
  role: 'client' | 'mentor' | 'admin';
  avatar?: string;
  isMfaVerified: boolean;
  mfaMethod?: 'totp' | 'sms';
  activeProgram: string;
  maturityScore: number;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  completed: boolean;
  lessons: {
    id: string;
    title: string;
    duration: string;
    videoUrl: string;
    completed: boolean;
    downloads?: { name: string; size: string; type: string }[];
  }[];
}

export interface CompanyOKR {
  id: string;
  title: string;
  targetValue: string;
  currentValue: string;
  progressPercent: number;
  pillar: 'Gestão' | 'Vendas' | 'Finanças' | 'Pessoas' | 'Operações';
  deadline: string;
  mentorFeedback?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  category: 'Gestão de Processos' | 'Finanças & Lucro' | 'Liderança' | 'Escala';
  sharesCount: number;
}

export interface TestimonialCase {
  id: string;
  founderName: string;
  role: string;
  companyName: string;
  segment: string;
  metrics: {
    revenueGrowth: string;
    hoursReduced: string;
    ebitdaMargin: string;
  };
  beforeStory: string;
  afterStory: string;
  quote: string;
  rating: number;
}

export interface LeadLeadMagnet {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  monthlyRevenue: string;
  source: string;
  createdAt: string;
  tags: string[];
  status: 'subscribed' | 'qualified' | 'in_nurturing' | 'converted';
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  stage: 'Boas-vindas' | 'Diagnóstico' | 'Lembrete' | 'Oferta de Mentoria';
  openRate: number;
  clickRate: number;
  status: 'active' | 'paused';
  leadsReached: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'advisor' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  category: 'mentorship' | 'content' | 'billing' | 'system';
  date: string;
  read: boolean;
  actionUrl?: string;
}

export interface ThirdPartyIntegration {
  id: string;
  name: string;
  description: string;
  category: 'CRM' | 'Automations' | 'Calendar' | 'Communication' | 'Finance';
  icon: string;
  connected: boolean;
  lastSync?: string;
  webhookUrl?: string;
}
