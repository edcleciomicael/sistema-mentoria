import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mentorshipPrograms } from '../data/mockData';
import {
  X,
  CreditCard,
  QrCode,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';
import { PaymentTransaction } from '../types';

export const PaymentModal: React.FC = () => {
  const {
    isPaymentOpen,
    setIsPaymentOpen,
    paymentProgram,
    currency,
    formatCurrency,
    processPayment,
    setIsClientPortalOpen,
  } = useApp();

  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'credit_card' | 'bank_transfer'>('pix');
  const [isRecurring, setIsRecurring] = useState(paymentProgram?.isRecurring ?? true);
  const [copiedPix, setCopiedPix] = useState(false);

  const [formData, setFormData] = useState({
    name: 'Carlos Eduardo Prado',
    email: 'carlos@pradoengenharia.com.br',
    document: '28.192.404/0001-82',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvv: '884',
    installments: '1',
  });

  const [processedTx, setProcessedTx] = useState<PaymentTransaction | null>(null);

  if (!isPaymentOpen) return null;

  const currentProgram = paymentProgram || mentorshipPrograms[0];
  const pixCopyString = `00020126580014br.gov.bcb.pix0136marquez-adviser-financeiro@pix.com520400005303986540${currentProgram.basePriceBrl}.005802BR5920Marquez Adviser SA6005NATAL62070503***6304E8A2`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCopyString);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tx = processPayment(currentProgram.id, selectedMethod, isRecurring, {
      name: formData.name,
      email: formData.email,
    });
    setProcessedTx(tx);
  };

  const handleClose = () => {
    setProcessedTx(null);
    setIsPaymentOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#0c1527] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-slate-900 dark:text-white font-display">
              Checkout Seguro & Pagamento Integrado
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {processedTx ? (
          /* Payment Approved State */
          <div className="p-8 text-center max-w-lg mx-auto">
            <div className="h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              Transação Aprovada com Sucesso!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Seu acesso à Mentoria Marquez Adviser foi liberado. A fatura e nota fiscal foram enviadas para {processedTx.customerEmail}.
            </p>

            <div className="my-6 text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">ID da Transação:</span>
                <span className="font-mono text-slate-900 dark:text-white">{processedTx.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Programa:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{currentProgram.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Valor Cobrado:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono">
                  {formatCurrency(processedTx.amount)} {currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tipo de Faturamento:</span>
                <span className="text-slate-700 dark:text-slate-300">
                  {processedTx.isRecurring ? 'Assinatura Recorrente Automática' : 'Pagamento Único'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  handleClose();
                  setIsClientPortalOpen(true);
                }}
                className="flex-1 py-3 px-4 text-xs font-bold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Acessar Portal VIP do Aluno
              </button>
              <button
                onClick={handleClose}
                className="py-3 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          /* Payment Processing Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {/* Program Summary Card */}
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/20 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-blue-900 dark:text-blue-400 uppercase tracking-wider block">
                  Resumo do Investimento
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  {currentProgram.name}
                </h4>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Moeda selecionada: {currency} (Conversão automática em tempo real)
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
                  {formatCurrency(currentProgram.basePriceBrl)}
                </div>
                {currentProgram.isRecurring && (
                  <span className="text-[10px] text-slate-500">/ cobrança mensal</span>
                )}
              </div>
            </div>

            {/* Recurring Subscription Toggle */}
            <div className="mb-6 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <RefreshCw className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Assinatura Recorrente Automática
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Garante vaga reservada no comitê de Marquez e renovação sem burocracia.
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Payment Method Tabs */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Método de Pagamento
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('pix')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    selectedMethod === 'pix'
                      ? 'border-blue-900 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/60 font-bold text-blue-950 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <QrCode className="h-5 w-5" />
                  <span className="text-xs">Pix Instantâneo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('credit_card')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    selectedMethod === 'credit_card'
                      ? 'border-blue-900 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/60 font-bold text-blue-950 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <CreditCard className="h-5 w-5" />
                  <span className="text-xs">Cartão de Crédito</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('bank_transfer')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    selectedMethod === 'bank_transfer'
                      ? 'border-blue-900 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/60 font-bold text-blue-950 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">Boleto / NF-e</span>
                </button>
              </div>
            </div>

            {/* Pix Interface */}
            {selectedMethod === 'pix' && (
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-center mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  {/* Generated QR Code SVG */}
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200 shrink-0">
                    <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
                      <rect width="100" height="100" fill="white" />
                      {/* Stylized QR Code matrix representation */}
                      <path
                        d="M10 10h28v28h-28zM16 16v16h16v-16zM22 22h4v4h-4zM62 10h28v28h-28zM68 16v16h16v-16zM74 22h4v4h-4zM10 62h28v28h-28zM16 68v16h16v-16zM22 74h4v4h-4zM44 14h6v6h-6zM52 24h6v6h-6zM46 32h10v6h-10zM62 48h8v8h-8zM76 48h14v6h-14zM48 60h6v8h-6zM60 62h8v6h-8zM74 62h6v12h-6zM84 64h6v6h-6zM48 76h8v14h-8zM62 82h12v8h-12zM80 82h10v8h-10z"
                        fill="#0a192f"
                      />
                    </svg>
                  </div>

                  <div className="text-left text-xs space-y-2">
                    <span className="font-bold text-slate-900 dark:text-white block text-sm">
                      Liberação Automática em até 5 segundos
                    </span>
                    <p className="text-slate-500">
                      Abra o aplicativo do seu banco, escolha <strong>Pix &gt; Pagar QR Code</strong> ou copie o código abaixo.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="inline-flex items-center gap-1.5 py-2 px-3 text-xs font-semibold text-blue-900 dark:text-blue-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-100"
                      >
                        {copiedPix ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedPix ? 'Código Pix Copiado!' : 'Copiar Código Pix'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Credit Card Interface */}
            {selectedMethod === 'credit_card' && (
              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Validade (MM/AA)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardExp}
                      onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      CVV / Código de Segurança
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardCvv}
                      onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Parcelamento
                  </label>
                  <select
                    value={formData.installments}
                    onChange={(e) => setFormData({ ...formData, installments: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="1">1x de {formatCurrency(currentProgram.basePriceBrl)} (à vista)</option>
                    <option value="3">3x de {formatCurrency(currentProgram.basePriceBrl / 3)} sem juros</option>
                    <option value="6">6x de {formatCurrency(currentProgram.basePriceBrl / 6)} sem juros</option>
                    <option value="12">12x de {formatCurrency(currentProgram.basePriceBrl / 12)}</option>
                  </select>
                </div>
              </div>
            )}

            {/* Bank Transfer / NF Interface */}
            {selectedMethod === 'bank_transfer' && (
              <div className="space-y-3 mb-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Emitimos a Nota Fiscal eletrônica (NF-e de Serviços de Consultoria de Gestão Empresarial) e o boleto bancário corporativo com vencimento para 3 dias úteis.
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    CNPJ da Empresa
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.document}
                    onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 text-xs font-bold text-white bg-blue-950 hover:bg-slate-900 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Confirmar Pagamento de {formatCurrency(currentProgram.basePriceBrl)}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Ambiente Criptografado TLS 256-bit com Certificação PCI-DSS Nível 1</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
