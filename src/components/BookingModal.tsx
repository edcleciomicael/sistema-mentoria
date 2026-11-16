import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mentorshipPrograms } from '../data/mockData';
import { X, Calendar, Clock, Video, CheckCircle2, Globe, Shield, Download } from 'lucide-react';
import { Booking } from '../types';

export const BookingModal: React.FC = () => {
  const {
    isBookingOpen,
    setIsBookingOpen,
    bookingProgram,
    setBookingProgram,
    createBooking,
    formatCurrency,
  } = useApp();

  const [selectedProgramId, setSelectedProgramId] = useState(
    bookingProgram ? bookingProgram.id : mentorshipPrograms[0].id
  );

  const [selectedDate, setSelectedDate] = useState('2026-09-30');
  const [selectedSlot, setSelectedSlot] = useState('14:30 - 16:00');
  const [selectedTimezone, setSelectedTimezone] = useState('America/Sao_Paulo (GMT-3)');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    revenue: 'R$ 150k - R$ 500k/mês',
    teamSize: '10 a 25 colaboradores',
    notes: '',
  });

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isBookingOpen) return null;

  const currentProgram =
    mentorshipPrograms.find((p) => p.id === selectedProgramId) || mentorshipPrograms[0];

  const availableSlots = [
    '09:00 - 10:30',
    '10:45 - 12:15',
    '14:30 - 16:00',
    '16:30 - 18:00',
    '18:30 - 20:00',
  ];

  const timezones = [
    'America/Sao_Paulo (GMT-3)',
    'America/New_York (GMT-4)',
    'Europe/London (GMT+1)',
    'Europe/Madrid (GMT+2)',
    'America/Manaus (GMT-4)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) return;

    const newBk = createBooking({
      programId: currentProgram.id,
      programName: currentProgram.name,
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      companyName: formData.company,
      revenueRange: formData.revenue,
      teamSize: formData.teamSize,
      date: selectedDate,
      timeSlot: selectedSlot,
      timezone: selectedTimezone,
      notes: formData.notes,
    });

    setConfirmedBooking(newBk);
  };

  const handleClose = () => {
    setConfirmedBooking(null);
    setIsBookingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-900 dark:text-blue-400" />
            <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
              Agendamento de Consulta Online & Mentoria Executiva
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation Screen */
          <div className="p-8 text-center max-w-lg mx-auto">
            <div className="h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              Sessão Confirmada com Sucesso!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Seu agendamento foi registrado na agenda oficial de Marquez Adviser. Enviamos os detalhes de acesso e o link da videoconferência para o seu e-mail.
            </p>

            {/* Details Box */}
            <div className="my-6 text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Programa:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{confirmedBooking.programName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Data e Horário:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {confirmedBooking.date} às {confirmedBooking.timeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fuso Horário:</span>
                <span className="text-slate-700 dark:text-slate-300">{confirmedBooking.timezone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sala Virtual:</span>
                <a
                  href={confirmedBooking.meetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {confirmedBooking.meetUrl}
                </a>
              </div>
            </div>

            {/* Calendar Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mentoria+Executiva+Marquez+Adviser&dates=20260930T143000Z/20260930T160000Z&details=Sessao+de+Aceleracao+Empresarial+com+Marquez+Adviser&location=${encodeURIComponent(
                  confirmedBooking.meetUrl || ''
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 text-xs font-bold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-md transition-all text-center"
              >
                Adicionar ao Google Calendar
              </a>

              <button
                onClick={handleClose}
                className="py-3 px-5 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Concluir
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Date & Slot Selection */}
              <div className="md:col-span-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    1. Escolha o Programa de Mentoria
                  </label>
                  <select
                    value={selectedProgramId}
                    onChange={(e) => setSelectedProgramId(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  >
                    {mentorshipPrograms.map((prog) => (
                      <option key={prog.id} value={prog.id}>
                        {prog.name} ({formatCurrency(prog.basePriceBrl)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    2. Escolha o Dia da Mentoria
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    min="2026-09-26"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    3. Horários Disponíveis de Atendimento
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-2.5 text-xs rounded-lg border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-900 bg-blue-900 text-white font-semibold dark:border-blue-500 dark:bg-blue-600'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Fuso Horário
                  </label>
                  <select
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column: Business & Executive Profile Form */}
              <div className="md:col-span-6 space-y-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  4. Dados da Empresa e do Líder
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Carlos Eduardo Prado"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Corporativo
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="carlos@empresa.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      WhatsApp (com DDD)
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(11) 98877-6655"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Prado Engenharia"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Faturamento Mensal
                    </label>
                    <select
                      value={formData.revenue}
                      onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    >
                      <option value="R$ 50k - R$ 150k/mês">R$ 50k - R$ 150k/mês</option>
                      <option value="R$ 150k - R$ 500k/mês">R$ 150k - R$ 500k/mês</option>
                      <option value="R$ 500k - R$ 1.5M/mês">R$ 500k - R$ 1.5M/mês</option>
                      <option value="Acima de R$ 1.5M/mês">Acima de R$ 1.5M/mês</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Principal Gargalo a Resolver na Sessão
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Ex: A equipe não cumpre os prazos sem minha cobrança direta..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 text-xs font-bold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Confirmar Agendamento da Mentoria
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                  <Shield className="h-3 w-3" />
                  <span>Seus dados estão protegidos sob termo de confidencialidade NDA.</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
