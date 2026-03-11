import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Globe2, ShieldCheck, ArrowRight, CheckCircle2, 
  MapPin, Landmark, Scale, Calculator, UserPlus, 
  MessageSquare, ChevronDown, Sparkles, Bot, Loader2,
  Send, FileText, TrendingDown, Target,
  Briefcase, LineChart, Globe, Check, Phone, Mail
} from 'lucide-react';

// --- 多语言字典 (Translations) ---
const translations = {
  zh: {
    nav: { about: "关于我们", services: "核心业务", comparison: "全球优势", process: "服务流程", cases: "成功案例", ai: "AI规划", contact: "立即连线专家" },
    hero: { tag: "2026 离岸资产与合规指挥部", title1: "全球资本避风港，", title2: "Web3出海桥头堡。", desc: "依托海南自贸港双15%税收红利，为您提供公司注册、多币种离岸账户、RWA发币合规及VIE架构设计的一站式工业化交付。合法降税，安全出海。", btn1: "获取定制出海方案", btn2: "测算节税金额", stat: "企业所得税最高降幅" },
    services: { title: "全矩阵出海与落地服务", desc: "从物理空间的工商注册，到数字世界的Web3合规，我们提供工业化标准的交付体系。", 
      items: [
        { title: "海南内外资公司注册", desc: "提供地址挂靠、核名、营业执照办理、公章刻制全套服务。最快3个工作日下证。" },
        { title: "多币种离岸账户开立", desc: "协助开立海南FT账户及香港、新加坡等多地离岸银行账户，实现资金自由跨境调拨。" },
        { title: "离岸 Web3 与 RWA 架构", desc: "提供“海外基金会+海南运营主体”的VIE隔离架构设计，涵盖 RWA 实体资产代币化咨询。" },
        { title: "代理记账与税务筹划", desc: "小规模/一般纳税人代理记账，深度解析海南鼓励类产业目录，协助申请双15%优惠。" },
        { title: "全球人才落户与签证", desc: "为外籍高管办理来华工作许可及居留签证，协助国内核心团队办理海南落户。" },
        { title: "特许经营资质代办", desc: "代办ICP增值电信业务许可证、网络文化经营许可证、私募基金牌照等核心资质。" }
      ]
    },
    form: { title: "业务下单 / 预约咨询", desc: "请填写您的需求，数据将直接同步至我们的客户管理系统。", 
      service: "服务项目", name: "客户姓名", contact: "联系方式 (电话/邮箱/TG)", verify: "首选联系/验证方式", company: "公司名称 (选填)", req: "特殊需求描述", submit: "提交订单 / 咨询",
      servicesList: ["公司注册 (内资/外资)", "代理记账 (小规模)", "代理记账 (一般纳税人)", "刻章服务", "离岸账户开立", "Web3与RWA合规架构", "税务筹划与审计", "其他综合需求"],
      verifyList: ["手机验证 (Phone)", "邮箱验证 (Email)", "Telegram/微信验证"]
    },
    contactInfo: { title: "开启您的出海征程", desc: "无论是注册公司、代理记账还是架构咨询，我们的专家团队随时待命。", phone: "全球服务热线", email: "官方电子邮箱", address: "指挥部地址", addrText: "中国·海南省海口市龙华区自贸港核心商务区" }
  },
  en: {
    nav: { about: "About Us", services: "Services", comparison: "Advantages", process: "Process", cases: "Cases", ai: "AI Planner", contact: "Contact Experts" },
    hero: { tag: "2026 Offshore Asset & Compliance HQ", title1: "Global Capital Safe Haven,", title2: "Web3 Offshore Bridgehead.", desc: "Leveraging the Hainan Free Trade Port's dual 15% tax benefits, we provide one-stop industrial delivery for company registration, multi-currency offshore accounts, RWA tokenization compliance, and VIE structuring.", btn1: "Get Custom Plan", btn2: "Calculate Tax Savings", stat: "Max Corporate Tax Reduction" },
    services: { title: "Full-Matrix Offshore & Landing Services", desc: "From physical business registration to digital Web3 compliance, we provide industrial-standard delivery systems.", 
      items: [
        { title: "Hainan Company Registration", desc: "Full service including registered address, naming, business license, and seal engraving. License issued in as fast as 3 days." },
        { title: "Multi-Currency Offshore Accounts", desc: "Assist in opening Hainan FT accounts and offshore bank accounts in HK, SG, enabling free cross-border capital transfers." },
        { title: "Offshore Web3 & RWA Structuring", desc: "Provide VIE isolation structure design (Overseas Foundation + Hainan Operating Entity) and RWA tokenization consulting." },
        { title: "Bookkeeping & Tax Planning", desc: "Agency accounting for small/general taxpayers, deep analysis of Hainan's encouraged industries to apply for dual 15% tax benefits." },
        { title: "Global Talent Settlement & Visas", desc: "Process work permits and residence visas for foreign executives, assist core domestic teams with Hainan settlement." },
        { title: "Special Business Licenses", desc: "Agency services for core qualifications like ICP Value-Added Telecom Licenses, Network Culture Licenses, and Private Equity Licenses." }
      ]
    },
    form: { title: "Place Order / Book Consultation", desc: "Please fill in your requirements. Data will be synced directly to our CRM system.", 
      service: "Service Item", name: "Client Name", contact: "Contact Info (Phone/Email/TG)", verify: "Preferred Verification Method", company: "Company Name (Optional)", req: "Special Requirements", submit: "Submit Order / Inquiry",
      servicesList: ["Company Registration", "Bookkeeping (Small Scale)", "Bookkeeping (General Taxpayer)", "Seal Engraving", "Offshore Account Opening", "Web3 & RWA Structuring", "Tax Planning & Audit", "Other Needs"],
      verifyList: ["Phone Verification", "Email Verification", "Telegram/WeChat"]
    },
    contactInfo: { title: "Start Your Offshore Journey", desc: "Whether it's company registration, bookkeeping, or structuring, our expert team is on standby.", phone: "Global Hotline", email: "Official Email", address: "HQ Address", addrText: "Core Business District, Free Trade Port, Longhua Dist, Haikou, Hainan, China" }
  },
  ru: {
    nav: { about: "О нас", services: "Услуги", comparison: "Преимущества", process: "Процесс", cases: "Кейсы", ai: "ИИ-планировщик", contact: "Связаться с экспертом" },
    hero: { tag: "2026 Штаб-квартира офшорных активов", title1: "Глобальная безопасная гавань,", title2: "Офшорный плацдарм Web3.", desc: "Используя двойные налоговые льготы 15% порта свободной торговли Хайнань, мы предоставляем комплексные услуги по регистрации компаний, открытию мультивалютных счетов, комплаенсу токенизации RWA и структурированию VIE.", btn1: "Получить план", btn2: "Расчет налогов", stat: "Макс. снижение налога" },
    services: { title: "Полный спектр офшорных услуг", desc: "От физической регистрации бизнеса до цифрового комплаенса Web3, мы предоставляем системы доставки промышленного стандарта.", 
      items: [
        { title: "Регистрация компаний на Хайнане", desc: "Полный комплекс услуг: юр. адрес, лицензия, печати. Выдача лицензии от 3 дней." },
        { title: "Мультивалютные офшорные счета", desc: "Помощь в открытии счетов FT на Хайнане и офшорных счетов в Гонконге и Сингапуре для свободных переводов." },
        { title: "Структурирование Web3 и RWA", desc: "Проектирование структуры VIE (Зарубежный фонд + Операционная компания на Хайнане) и консалтинг по RWA." },
        { title: "Бухгалтерия и налоговое планирование", desc: "Бухгалтерское обслуживание, анализ поощряемых отраслей для получения налоговых льгот 15%." },
        { title: "Визы и релокация талантов", desc: "Оформление разрешений на работу и виз для иностранных руководителей, помощь в релокации команд." },
        { title: "Специальные лицензии", desc: "Помощь в получении лицензий ICP, лицензий на сетевую культуру и лицензий для частных фондов." }
      ]
    },
    form: { title: "Оформить заказ / Консультация", desc: "Заполните форму. Данные будут синхронизированы с нашей CRM.", 
      service: "Услуга", name: "Имя клиента", contact: "Контакты (Телефон/Email/TG)", verify: "Способ связи", company: "Название компании", req: "Особые требования", submit: "Отправить запрос",
      servicesList: ["Регистрация компании", "Бухгалтерия (Малый бизнес)", "Бухгалтерия (Общая система)", "Изготовление печатей", "Открытие офшорного счета", "Структурирование Web3", "Налоговое планирование", "Другое"],
      verifyList: ["Телефон", "Email", "Telegram/WeChat"]
    },
    contactInfo: { title: "Начните свой офшорный путь", desc: "Наша команда экспертов готова помочь с регистрацией, бухгалтерией и структурированием.", phone: "Глобальная горячая линия", email: "Официальный Email", address: "Адрес штаб-квартиры", addrText: "Центральный деловой район, Порт свободной торговли, Хайкоу, Хайнань, Китай" }
  }
};

type Lang = 'zh' | 'en' | 'ru';

export default function App() {
  const [lang, setLang] = useState<Lang>('zh');
  const t = translations[lang];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Form State matching Google Sheet columns
  const [formData, setFormData] = useState({
    serviceItem: t.form.servicesList[0],
    clientName: '',
    contactInfo: '',
    verifyMethod: t.form.verifyList[0],
    companyName: '',
    specialReq: ''
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update default dropdowns when language changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      serviceItem: t.form.servicesList[0],
      verifyMethod: t.form.verifyList[0]
    }));
  }, [lang, t]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // 🌟 IMPORTANT: Replace this URL with your actual Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzmDdnj-VryXz-amInJVZHBP1lXzdeTatdeoA0SUBTIdZGRQIrYGr_4aCYl7-xW3RL_GA/exec"; 

    try {
      // Create payload matching Google Sheet columns
      const payload = {
        ...formData,
        language: lang,
        timestamp: new Date().toISOString()
      };

      // Send data to Google Sheet
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 
          'Content-Type': 'text/plain;charset=utf-8' 
        },
        body: JSON.stringify(payload)
      });

      // Simulate network request for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({ serviceItem: t.form.servicesList[0], clientName: '', contactInfo: '', verifyMethod: t.form.verifyList[0], companyName: '', specialReq: '' });
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#9945FF]/30 scroll-smooth">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center shadow-lg">
              <Globe2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Solana Hainan</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-[#9945FF]">{t.nav.services}</a>
            <a href="#comparison" className="text-sm font-medium text-slate-600 hover:text-[#9945FF]">{t.nav.comparison}</a>
            <a href="#process" className="text-sm font-medium text-slate-600 hover:text-[#9945FF]">{t.nav.process}</a>
            <a href="#contact" className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-[#9945FF] transition-colors shadow-md ml-2">
              {t.nav.contact}
            </a>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 ml-4 border-l border-slate-200 pl-4">
              <button onClick={() => setLang('zh')} className={`text-xs font-bold px-2 py-1 rounded ${lang === 'zh' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>中</button>
              <button onClick={() => setLang('en')} className={`text-xs font-bold px-2 py-1 rounded ${lang === 'en' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>EN</button>
              <button onClick={() => setLang('ru')} className={`text-xs font-bold px-2 py-1 rounded ${lang === 'ru' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>RU</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#14F195]/10 to-transparent blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9945FF] text-sm font-semibold mb-6 border border-purple-200 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14F195] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#14F195]"></span>
                </span>
                {t.hero.tag}
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6 text-slate-900">
                {t.hero.title1}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                  {t.hero.title2}
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                {t.hero.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-medium hover:bg-[#9945FF] transition-all hover:shadow-xl hover:-translate-y-0.5">
                  {t.hero.btn1} <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="Hainan Free Trade Port" className="relative rounded-3xl shadow-2xl border border-white/20 object-cover h-[500px] w-full" referrerPolicy="no-referrer" />
              
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">{t.hero.stat}</p>
                  <p className="text-2xl font-bold text-slate-900">40% <span className="text-sm font-normal text-slate-500">(25% → 15%)</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="services" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#14F195] font-semibold tracking-wider uppercase text-sm">Core Services</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{t.services.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">{t.services.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service, idx) => {
              const icons = [
                <Building2 className="w-6 h-6 text-[#14F195]" />,
                <Landmark className="w-6 h-6 text-[#9945FF]" />,
                <Scale className="w-6 h-6 text-blue-400" />,
                <Calculator className="w-6 h-6 text-orange-400" />,
                <UserPlus className="w-6 h-6 text-pink-400" />,
                <Briefcase className="w-6 h-6 text-emerald-400" />
              ];
              return (
                <div key={idx} className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {icons[idx]}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{service.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact & Google Sheet Form Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#9945FF]/10 to-transparent pointer-events-none"></div>
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              
              {/* Left: Contact Info */}
              <div>
                <div className="mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.contactInfo.title}</h2>
                  <p className="text-lg text-slate-400">{t.contactInfo.desc}</p>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                      <Phone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400 mb-1">{t.contactInfo.phone}</p>
                      <a href="tel:+8618117790507" className="text-xl font-bold text-white hover:text-[#9945FF] transition-colors">86-18117790507</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 border border-green-500/30">
                      <Mail className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400 mb-1">{t.contactInfo.email}</p>
                      <a href="mailto:kosok@solana-hainan.com" className="text-xl font-bold text-white hover:text-[#14F195] transition-colors">kosok@solana-hainan.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/30">
                      <MapPin className="w-6 h-6 text-[#9945FF]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400 mb-1">{t.contactInfo.address}</p>
                      <p className="text-lg font-bold text-white">{t.contactInfo.addrText}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Google Sheet Integrated Form */}
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.form.title}</h3>
                <p className="text-sm text-slate-500 mb-6">{t.form.desc}</p>
                
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">{t.form.service} <span className="text-red-500">*</span></label>
                    <select 
                      required
                      value={formData.serviceItem}
                      onChange={(e) => setFormData({...formData, serviceItem: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 appearance-none"
                    >
                      {t.form.servicesList.map((item, i) => <option key={i} value={item}>{item}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">{t.form.name} <span className="text-red-500">*</span></label>
                      <input type="text" required value={formData.clientName} onChange={(e) => setFormData({...formData, clientName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">{t.form.verify} <span className="text-red-500">*</span></label>
                      <select 
                        required
                        value={formData.verifyMethod}
                        onChange={(e) => setFormData({...formData, verifyMethod: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 appearance-none"
                      >
                        {t.form.verifyList.map((item, i) => <option key={i} value={item}>{item}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">{t.form.contact} <span className="text-red-500">*</span></label>
                    <input type="text" required value={formData.contactInfo} onChange={(e) => setFormData({...formData, contactInfo: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">{t.form.company}</label>
                    <input type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">{t.form.req}</label>
                    <textarea rows={3} value={formData.specialReq} onChange={(e) => setFormData({...formData, specialReq: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 resize-none"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#9945FF]/20 flex justify-center items-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : t.form.submit}
                  </button>

                  {submitStatus === 'success' && (
                    <p className="text-green-600 text-sm text-center font-medium bg-green-50 py-2 rounded-lg">✅ 提交成功！我们将尽快与您联系。</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-600 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">❌ 提交失败，请直接通过电话或邮件联系我们。</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Globe2 className="w-6 h-6 text-slate-600" />
              <span className="text-xl font-bold text-slate-300">Solana Hainan</span>
            </div>
            <div className="flex gap-6 text-sm">
              <span>TEL: 86-18117790507</span>
              <span>EMAIL: kosok@solana-hainan.com</span>
            </div>
          </div>
          <div className="text-center md:text-left text-sm border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Solana Hainan. All rights reserved.</p>
            <p className="mt-2 md:mt-0">琼ICP备XXXXXXXX号-1</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
