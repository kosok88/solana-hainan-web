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
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwZa8hDyZhMutSjneaCHwDJQBkdTv7aa5RhuqcQClwFBujBsNykxknwSPzSGG9Z3lc7fA/exec"; 

    try {
      // Create payload matching Google Sheet columns
      const payload = {
        ...formData,
        language: lang,
        timestamp: new Date().toISOString()
      };

      // Send data to Google Sheet using URLSearchParams (100% CORS safe)
      const formBody = new URLSearchParams();
      formBody.append('data', JSON.stringify(payload));

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded' 
        },
        body: formBody.toString()
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
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-blue-200">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Globe2 className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Solana Hainan</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-blue-600 transition-colors">{t.nav.services}</a>
            <a href="#comparison" className="text-sm font-medium hover:text-blue-600 transition-colors">{t.nav.comparison}</a>
            <a href="#process" className="text-sm font-medium hover:text-blue-600 transition-colors">{t.nav.process}</a>
            <a href="#ai-planner" className="text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> {t.nav.ai}
            </a>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-full">
              {(['zh', 'en', 'ru'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${lang === l ? 'bg-white shadow-sm text-blue-600' : 'text-neutral-500 hover:text-neutral-900'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <a href="#contact" className="bg-neutral-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
              {t.nav.contact}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6"
            >
              <ShieldCheck className="w-4 h-4" />
              {t.hero.tag}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              {t.hero.title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t.hero.title2}
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-2xl"
            >
              {t.hero.desc}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="#contact" className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20">
                {t.hero.btn1} <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#ai-planner" className="bg-white text-neutral-900 border border-neutral-200 px-8 py-4 rounded-full font-medium hover:bg-neutral-50 transition-all flex items-center gap-2">
                <Calculator className="w-4 h-4" /> {t.hero.btn2}
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center gap-8 pt-8 border-t border-neutral-200"
            >
              <div>
                <div className="text-3xl font-bold text-neutral-900">15%</div>
                <div className="text-sm text-neutral-500 mt-1">{t.hero.stat}</div>
              </div>
              <div className="w-px h-12 bg-neutral-200"></div>
              <div>
                <div className="text-3xl font-bold text-neutral-900">3 Days</div>
                <div className="text-sm text-neutral-500 mt-1">Fastest Registration</div>
              </div>
              <div className="w-px h-12 bg-neutral-200"></div>
              <div>
                <div className="text-3xl font-bold text-neutral-900">100%</div>
                <div className="text-sm text-neutral-500 mt-1">Compliance Guarantee</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">{t.services.title}</h2>
            <p className="text-neutral-600">{t.services.desc}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((item, index) => {
              const icons = [Building2, Landmark, Globe, FileText, UserPlus, Briefcase];
              const Icon = icons[index];
              return (
                <div key={index} className="p-8 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors group">
                  <div className="w-12 h-12 bg-white rounded-xl border border-neutral-200 flex items-center justify-center mb-6 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact & Order Form Section */}
      <section id="contact" className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Contact Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
                <MessageSquare className="w-4 h-4" />
                {t.nav.contact}
              </div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">{t.contactInfo.title}</h2>
              <p className="text-neutral-400 text-lg mb-12 max-w-md">
                {t.contactInfo.desc}
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400 mb-1">{t.contactInfo.phone}</div>
                    <div className="text-xl font-medium">+86 181 1779 0507</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400 mb-1">{t.contactInfo.email}</div>
                    <div className="text-xl font-medium">kosok@solana-hainan.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400 mb-1">{t.contactInfo.address}</div>
                    <div className="text-base font-medium text-neutral-300 leading-relaxed max-w-xs">
                      {t.contactInfo.addrText}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 text-neutral-900 shadow-2xl">
              <h3 className="text-2xl font-bold mb-2">{t.form.title}</h3>
              <p className="text-neutral-500 text-sm mb-8">{t.form.desc}</p>

              {submitStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-green-900 mb-2">提交成功！</h4>
                  <p className="text-green-700 text-sm">您的需求已同步至系统，我们的专家将在 24 小时内与您联系。</p>
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-6 text-sm font-medium text-green-700 hover:text-green-800 underline"
                  >
                    提交新需求
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t.form.service}</label>
                    <div className="relative">
                      <select 
                        required
                        value={formData.serviceItem}
                        onChange={(e) => setFormData({...formData, serviceItem: e.target.value})}
                        className="w-full appearance-none bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      >
                        {t.form.servicesList.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t.form.name}</label>
                      <input 
                        type="text" 
                        required
                        value={formData.clientName}
                        onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t.form.company}</label>
                      <input 
                        type="text" 
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="Company Ltd."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t.form.contact}</label>
                      <input 
                        type="text" 
                        required
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="+86 / Email / @TG"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t.form.verify}</label>
                      <div className="relative">
                        <select 
                          required
                          value={formData.verifyMethod}
                          onChange={(e) => setFormData({...formData, verifyMethod: e.target.value})}
                          className="w-full appearance-none bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        >
                          {t.form.verifyList.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">{t.form.req}</label>
                    <textarea 
                      rows={3}
                      value={formData.specialReq}
                      onChange={(e) => setFormData({...formData, specialReq: e.target.value})}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                      placeholder="Please describe your specific needs..."
                    ></textarea>
                  </div>

                  {submitStatus === 'error' && (
                    <div className="text-red-500 text-sm font-medium">
                      提交失败，请稍后重试或直接联系我们。
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white rounded-xl px-4 py-4 font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                    ) : (
                      <><Send className="w-5 h-5" /> {t.form.submit}</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 text-neutral-400 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-neutral-500" />
            <span className="font-medium text-neutral-300">Solana Hainan</span>
          </div>
          <div className="text-sm">
            © 2026 Solana Hainan Business Consulting. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
