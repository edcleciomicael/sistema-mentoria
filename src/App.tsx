import React from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PillarsSection } from './components/PillarsSection';
import { ProgramsSection } from './components/ProgramsSection';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PaymentModal } from './components/PaymentModal';
import { DiagnosticQuiz } from './components/DiagnosticQuiz';
import { ClientPortal } from './components/ClientPortal';
import { EmailMarketingPanel } from './components/EmailMarketingPanel';
import { IntegrationsHub } from './components/IntegrationsHub';
import { CloudDatabaseViewer } from './components/CloudDatabaseViewer';
import { NotificationCenter } from './components/NotificationCenter';
import { LiveChatWidget } from './components/LiveChatWidget';
import { OfflineBanner } from './components/OfflineBanner';
import { DocumentationViewer } from './components/DocumentationViewer';
import { useApp } from './context/AppContext';

function MainApp() {
  const { isDocumentationOpen, setIsDocumentationOpen, documentationTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070d19] dark:text-slate-100 transition-colors duration-200">
      {/* Offline Status Top Banner */}
      <OfflineBanner />

      {/* Top Bar Contract Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <PillarsSection />
        <ProgramsSection />
        <AnalyticsDashboard />
        <TestimonialsSection />
        <BlogSection />
      </main>

      {/* Quiet Corporate Footer */}
      <Footer />

      {/* Interactive Modals and Drawers */}
      <BookingModal />
      <PaymentModal />
      <DiagnosticQuiz />
      <ClientPortal />
      <EmailMarketingPanel />
      <IntegrationsHub />
      <CloudDatabaseViewer />
      <NotificationCenter />
      <LiveChatWidget />
      
      {/* Executive Documentation Viewer & PDF Export */}
      <DocumentationViewer
        isOpen={isDocumentationOpen}
        onClose={() => setIsDocumentationOpen(false)}
        initialTab={documentationTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
