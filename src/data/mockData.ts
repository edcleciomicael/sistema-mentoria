import { MentorshipProgram, BlogPost, TestimonialCase, CourseModule, CompanyOKR, ThirdPartyIntegration, CurrencyConfig } from '../types';

export const currencies: Record<string, CurrencyConfig> = {
  BRL: {
    code: 'BRL',
    symbol: 'R$',
    rateAgainstBrl: 1,
    format: (val) => `R$ ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rateAgainstBrl: 0.19, // 1 BRL = 0.19 USD (~5.26 BRL/USD)
    format: (val) => `$ ${(val * 0.19).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rateAgainstBrl: 0.17, // 1 BRL = 0.17 EUR
    format: (val) => `€ ${(val * 0.17).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rateAgainstBrl: 0.15,
    format: (val) => `£ ${(val * 0.15).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
};

export const mentorshipPrograms: MentorshipProgram[] = [
  {
    id: 'diagnostico-express',
    name: 'Diagnóstico Estratégico 1-on-1',
    tagline: 'Mapeamento cirúrgico dos 3 maiores gargalos do seu negócio',
    description: 'Sessão individual de 90 minutos diretamente com Marquez Adviser. Você sai com a Matriz de Gargalos Operacionais e um Plano de Ação de 30 dias.',
    duration: 'Sessão única de 90 minutos',
    format: 'Videoconferência individual gravada',
    basePriceBrl: 1950,
    isRecurring: false,
    deliverables: [
      'Auditoria preliminar de processos e finanças',
      '90 minutos de mentoria executiva ao vivo',
      'Gravação em alta definição + transcrição com IA',
      'Plano de Ação Tático para os primeiros 30 dias',
    ],
  },
  {
    id: 'aceleracao-executiva',
    name: 'Mentoria Aceleração Marquez',
    tagline: 'O programa completo para transformar sua empresa em uma máquina autogerenciável',
    description: 'Acompanhamento executivo por 6 meses. Reestruturações de processos, DRE gerencial, formação de lideranças e comitê quinzenal de prestação de contas.',
    duration: '6 Meses de Aceleração Contínua',
    format: '12 Sessões Quinzenais 1-on-1 + Suporte Direto WhatsApp',
    basePriceBrl: 18500,
    isRecurring: true,
    recurringInterval: 'month',
    popular: true,
    deliverables: [
      '12 sessões quinzenais executivas com Marquez',
      'Canal VIP direto no WhatsApp com Marquez & time',
      'Acesso integral ao Portal do Aluno com 40+ playbooks',
      'Implementação de OKRs e rituais semanais de gestão',
      'Auditoria de margem EBITDA e fluxo de caixa',
      'Revisão do organograma e contratação de líderes',
    ],
  },
  {
    id: 'conselho-board',
    name: 'Board Advisory & Conselho Consultivo',
    tagline: 'Governança permanente para empresas acima de R$ 300k/mês',
    description: 'Atuação como conselheiro estratégico mensal da sua empresa. Foco em expansão, fusões, captação, novos canais e governança sênior.',
    duration: 'Assinatura Contínua (Mínimo 12 meses)',
    format: '1 Reunião Mensal de Conselho (3h) + Revisão de OKRs',
    basePriceBrl: 4900,
    isRecurring: true,
    recurringInterval: 'month',
    deliverables: [
      'Reunião mensal executiva de diretoria (Board Meeting)',
      'Auditoria contínua de metas, DRE e valuation',
      'Mediação de decisões entre sócios e investidores',
      'Conexão com rede exclusiva de parceiros Marquez',
    ],
  },
];

export const courseModules: CourseModule[] = [
  {
    id: 'mod-1',
    title: 'Módulo 1: O Organograma Funcional & Delegação de Autoridade',
    description: 'Como redesenhar a estrutura da sua empresa para que cada função tenha dono claro e metas mensuráveis.',
    durationMinutes: 120,
    completed: true,
    lessons: [
      {
        id: 'les-1-1',
        title: 'Aula 1: O Fim do Homem-Banda e a Matriz de Competências',
        duration: '22:15',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        completed: true,
        downloads: [
          { name: 'Matriz_Delegacao_RACI.xlsx', size: '1.4 MB', type: 'Excel' },
          { name: 'Playbook_Organograma_Funcional.pdf', size: '3.2 MB', type: 'PDF' },
        ],
      },
      {
        id: 'les-1-2',
        title: 'Aula 2: Descrição de Cargos com foco em Entregáveis (não tarefas)',
        duration: '18:40',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        completed: true,
        downloads: [
          { name: 'Templates_Descricao_Cargos_A_Players.docx', size: '820 KB', type: 'Word' },
        ],
      },
    ],
  },
  {
    id: 'mod-2',
    title: 'Módulo 2: POPs - Procedimentos Operacionais Padrão que Funcionam',
    description: 'Crie processos que seus colaboradores realmente seguem, garantindo padrão de qualidade sem a sua presença.',
    durationMinutes: 145,
    completed: false,
    lessons: [
      {
        id: 'les-2-1',
        title: 'Aula 1: A Estrutura de 4 Passos do POP à Prova de Erros',
        duration: '26:10',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        completed: true,
        downloads: [
          { name: 'Manual_POPs_Empresariais.pdf', size: '4.8 MB', type: 'PDF' },
        ],
      },
      {
        id: 'les-2-2',
        title: 'Aula 2: Rituais de Auditoria de Processo e Melhoria Contínua',
        duration: '21:05',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        completed: false,
        downloads: [
          { name: 'Checklist_Auditoria_Semanal.xlsx', size: '940 KB', type: 'Excel' },
        ],
      },
    ],
  },
  {
    id: 'mod-3',
    title: 'Módulo 3: Finanças Estratégicas, DRE Gerencial & Fluxo de Caixa',
    description: 'Domine seus números: saiba exatamente onde está o lucro real e como proteger a liquidez do negócio.',
    durationMinutes: 180,
    completed: false,
    lessons: [
      {
        id: 'les-3-1',
        title: 'Aula 1: Regime de Caixa vs. Regime de Competência na Prática',
        duration: '31:50',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        completed: false,
        downloads: [
          { name: 'Planilha_DRE_Fluxo_Caixa_2026.xlsx', size: '2.8 MB', type: 'Excel' },
        ],
      },
      {
        id: 'les-3-2',
        title: 'Aula 2: Margem de Contribuição, Ponto de Equilíbrio & Precificação',
        duration: '28:15',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        completed: false,
        downloads: [
          { name: 'Calculadora_Ponto_Equilibrio.xlsx', size: '1.1 MB', type: 'Excel' },
        ],
      },
    ],
  },
  {
    id: 'mod-4',
    title: 'Módulo 4: Rituais Semanais de Gestão & Liderança Autônoma',
    description: 'Como conduzir reuniões produtivas de alinhamento e 1-on-1s que engajam o time em metas claras.',
    durationMinutes: 110,
    completed: false,
    lessons: [
      {
        id: 'les-4-1',
        title: 'Aula 1: A Reunião Semanal de Resultados de 45 Minutos',
        duration: '19:40',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        completed: false,
      },
    ],
  },
];

export const clientOKRs: CompanyOKR[] = [
  {
    id: 'okr-1',
    title: 'Aumentar Margem Líquida EBITDA de 14% para 22%',
    currentValue: '18.4%',
    targetValue: '22.0%',
    progressPercent: 72,
    pillar: 'Finanças',
    deadline: '31/12/2026',
    mentorFeedback: 'Excelente corte de custos fantasmas na operação. Foco agora na renegociação dos principais fornecedores.',
  },
  {
    id: 'okr-2',
    title: 'Implementar 100% dos POPs nos setores Financeiro e Comercial',
    currentValue: '18 de 20 POPs',
    targetValue: '20 POPs',
    progressPercent: 90,
    pillar: 'Gestão',
    deadline: '15/11/2026',
    mentorFeedback: 'Os rituais de auditoria estão rodando sozinhos. Equipe com autonomia validada.',
  },
  {
    id: 'okr-3',
    title: 'Reduzir Tempo do Fundador no Atendimento Operacional para < 8h/semana',
    currentValue: '12h/sem',
    targetValue: '6h/sem',
    progressPercent: 65,
    pillar: 'Pessoas',
    deadline: '30/11/2026',
    mentorFeedback: 'O novo coordenador comercial já absorveu 70% dos fechamentos. Mantenha os 1-on-1s semanais.',
  },
  {
    id: 'okr-4',
    title: 'Atingir R$ 650.000 de Faturamento Mensal Recorrente',
    currentValue: 'R$ 540.000',
    targetValue: 'R$ 650.000',
    progressPercent: 78,
    pillar: 'Vendas',
    deadline: '31/12/2026',
    mentorFeedback: 'O novo script de vendas consultivas aumentou a taxa de fechamento em 19%.',
  },
];

export const testimonials: TestimonialCase[] = [
  {
    id: 'case-1',
    founderName: 'Carlos Eduardo Prado',
    role: 'Fundador & CEO',
    companyName: 'Prado Engenharia e Soluções Industriais',
    segment: 'Engenharia & Manufatura',
    metrics: {
      revenueGrowth: '+184% em 10 meses',
      hoursReduced: 'De 68h para 24h semanais',
      ebitdaMargin: 'De 9.2% para 24.6%',
    },
    beforeStory: 'Eu era o primeiro a chegar e o último a sair. Se eu ficasse doente, a empresa parava. Tudo passava pela minha mesa e a margem de lucro sumia no fim do mês.',
    afterStory: 'Com o método Marquez Adviser, criamos os POPs, delegamos a gerência de obras e hoje tenho uma equipe autônoma. O faturamento saltou de R$ 180k para R$ 510k/mês e tirei 20 dias de férias com a empresa crescendo.',
    quote: '"O Marquez não te ensina teoria barata de livro. Ele sentou comigo, abriu a minha planilha e reorganizou a espinha dorsal da minha empresa."',
    rating: 5,
  },
  {
    id: 'case-2',
    founderName: 'Dra. Mariana Vasconcellos',
    role: 'Sócia-Diretora',
    companyName: 'Clínica Integrada OdontoAdvance (4 Unidades)',
    segment: 'Saúde & Clínicas Especializadas',
    metrics: {
      revenueGrowth: 'De R$ 220k para R$ 780k/mês',
      hoursReduced: 'Saiu 100% do mocho/atendimento',
      ebitdaMargin: 'Margem líquida de 28%',
    },
    beforeStory: 'Eu atendia pacientes o dia todo e tentava gerenciar recepcionistas e fornecedores no intervalo do almoço. Estava à beira de um burnout.',
    afterStory: 'Implantamos o organograma funcional, contratamos gestores capacitados e hoje atuo exclusivamente como conselheira e diretora de expansão das 4 filiais.',
    quote: '"A mentoria me devolveu minha família e multiplicou meu faturamento por quatro. É o melhor investimento que fiz na minha carreira empresarial."',
    rating: 5,
  },
  {
    id: 'case-3',
    founderName: 'Rafael Menezes',
    role: 'Cofundador',
    companyName: 'Nexus Logística & Transportes Inteligentes',
    segment: 'Transportes & Logística B2B',
    metrics: {
      revenueGrowth: 'R$ 1.8M para R$ 4.2M anuais',
      hoursReduced: 'Delegação completa da frota',
      ebitdaMargin: '+11% de economia operacional',
    },
    beforeStory: 'Perdíamos muito dinheiro com falta de controle de manutenção, retrabalho e clientes reclamando de atrasos.',
    afterStory: 'Com a metodologia de processos e DRE gerencial, cada caminhão virou uma unidade de lucro independente com metas claras para os motoristas e coordenadores.',
    quote: '"O acompanhamento do Marquez nos deu a segurança necessária para escalar a frota sem perder o controle financeiro."',
    rating: 5,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Como Sair do Operacional em 90 Dias: O Guia Definitivo da Delegação Eficaz',
    slug: 'como-sair-do-operacional-em-90-dias',
    excerpt: 'Descubra a diferença crucial entre "delargar" e delegar com governança, garantindo que o padrão de qualidade não caia.',
    content: [
      'A maior armadilha do empresário que começa a crescer é acreditar que "ninguém faz tão bem quanto eu". Essa crença limita o tamanho da empresa à capacidade biológica de um único cérebro.',
      'Delegar não significa repassar uma tarefa e cruzar os dedos torcendo para dar certo. A verdadeira delegação exige três elementos fundamentais: 1) Entregável claro e mensurável; 2) Limites de alçada financeira e decisória; 3) Rituais semanais de prestação de contas (Check-in / Check-out).',
      'Quando você substitui a vigilância pela governança, seus colaboradores passam a pensar como donos, porque possuem critérios objetivos de sucesso.',
    ],
    author: {
      name: 'Marquez Adviser',
      role: 'Mentor Executivo & Estrategista de Negócios',
    },
    publishedAt: '24 de Setembro de 2026',
    readTime: '6 min de leitura',
    category: 'Gestão de Processos',
    sharesCount: 384,
  },
  {
    id: 'blog-2',
    title: 'Os 3 Números que Todo Dono de Empresa Precisa Olhar Toda Segunda-Feira',
    slug: 'os-3-numeros-que-todo-dono-precisa-olhar',
    excerpt: 'Esqueça relatórios contábeis de 40 páginas. Estes 3 indicadores de gestão evitam crises de caixa e antecipam problemas com semanas de antecedência.',
    content: [
      'Muitos empresários só descobrem que o mês foi ruim no dia 10 do mês seguinte, quando o contador envia a guia de impostos e a conta bancária está no vermelho.',
      'Uma gestão de alto padrão exige um painel de comando enxuto com apenas 3 métricas vitais avaliadas semanalmente: 1) Saldo de Tesouraria Projetado para os próximos 30 dias; 2) Margem de Contribuição por Linha de Negócio; 3) Taxa de Conversão do Funil de Vendas Primário.',
      'Quem controla esses três ponteiros com rituais semanais nunca é pego de surpresa pelo mercado.',
    ],
    author: {
      name: 'Marquez Adviser',
      role: 'Mentor Executivo & Estrategista de Negócios',
    },
    publishedAt: '18 de Setembro de 2026',
    readTime: '5 min de leitura',
    category: 'Finanças & Lucro',
    sharesCount: 512,
  },
  {
    id: 'blog-3',
    title: 'Como Contratar e Reter Talentos Classe "A" sem Pagar Salários de Multinacional',
    slug: 'como-contratar-e-reter-talentos-classe-a',
    excerpt: 'O passo a passo para atrair profissionais de alto rendimento que resolvem problemas em vez de criar novas dores de cabeça.',
    content: [
      'Empresas médias não perdem talentos apenas por salário: perdem por falta de clareza de futuro, liderança desorganizada e ambiente caótico.',
      'Profissionais de alta performance (Classe A) procuram autonomia, metas claras e um ambiente onde os resultados sejam reconhecidos sem politicagem interna.',
      'Construa um scorecard para cada posição antes de abrir a vaga. Avalie valores e caráter antes de habilidades técnicas.',
    ],
    author: {
      name: 'Equipe Marquez Adviser',
      role: 'Conselho de Governança',
    },
    publishedAt: '12 de Setembro de 2026',
    readTime: '7 min de leitura',
    category: 'Liderança',
    sharesCount: 298,
  },
];

export const thirdPartyIntegrations: ThirdPartyIntegration[] = [
  {
    id: 'hubspot',
    name: 'HubSpot & CRM Empresarial',
    description: 'Sincronização em tempo real de novos leads, diagnósticos e status de fechamento de contratos.',
    category: 'CRM',
    icon: 'Database',
    connected: true,
    lastSync: 'Hoje, às 14:02',
    webhookUrl: 'https://api.marquezadviser.com/webhooks/hubspot/v1',
  },
  {
    id: 'google-meet',
    name: 'Google Meet & Calendar',
    description: 'Geração automática de salas de videoconferência protegidas e envio de convites de mentoria.',
    category: 'Calendar',
    icon: 'Calendar',
    connected: true,
    lastSync: 'Sincronizado em tempo real',
  },
  {
    id: 'slack',
    name: 'Slack VIP & Comunidade',
    description: 'Notificações imediatas no canal de diretoria quando um aluno submete um novo OKR ou agenda sessão.',
    category: 'Communication',
    icon: 'MessageSquare',
    connected: true,
    lastSync: 'Ativo 24/7',
  },
  {
    id: 'zapier-make',
    name: 'Zapier & Make Automations',
    description: 'Disparo de webhooks customizados para disparar fluxos no ERP, Asana ou Trello do cliente.',
    category: 'Automations',
    icon: 'Zap',
    connected: true,
    lastSync: 'Disparador ativo',
  },
  {
    id: 'stripe-billing',
    name: 'Stripe & Gateway Global',
    description: 'Processamento de cartões internacionais em USD, EUR, GBP e faturamento recorrente automatizado.',
    category: 'Finance',
    icon: 'CreditCard',
    connected: true,
    lastSync: 'PCI-DSS Compliance Ativo',
  },
];
