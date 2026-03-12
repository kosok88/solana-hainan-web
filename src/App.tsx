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
    navMain: { home: "首页", services: "核心业务", policies: "政策与优势", business: "商务与合作", support: "客户支持" },
    navSub: { about: "关于我们", process: "服务流程", parks: "重点园区", policy: "核心政策", comparison: "全球对比", cases: "成功案例", commander: "指挥官计划", agreements: "标准协议", payment: "支付中心", ai: "常见问题" },
    auth: { login: "登录", register: "注册", modalTitle: "客户管理系统", comingSoon: "系统升级中，敬请期待..." },
    payment: { title: "支付中心", desc: "支持多种法币与加密货币的安全支付渠道。", items: [{name: "加密货币支付", desc: "支持 USDT, USDC, SOL 等主流加密货币。"}, {name: "法币对公转账", desc: "支持多币种离岸账户电汇 (USD, HKD, SGD)。"}, {name: "第三方支付", desc: "支持支付宝、微信、PayPal 等快捷支付。"}] },
    hero: { tag: "2026 离岸资产与合规指挥部", title1: "全球资本避风港，", title2: "Web3出海桥头堡。", desc: "依托海南自贸港双15%税收红利，为您提供公司注册、多币种离岸账户、RWA发币合规及VIE架构设计的一站式工业化交付。合法降税，安全出海。", btn1: "获取定制出海方案", btn2: "测算节税金额", stat: "企业所得税最高降幅" },
    about: { 
      title: "关于我们", 
      desc: "立足海南自贸港，辐射全球的Web3与离岸资产合规中心。",
      content: "随着海南全岛封关运作的推进，海南正成为全球企业布局中国与亚太市场的核心枢纽。我们依托海南13个重点园区的产业聚集优势，为全球创业者提供从战略咨询、公司注册、财税规划到技术落地的全生命周期服务。无论您是Web3先锋、跨境电商还是高新技术企业，我们都能为您精准匹配最优园区与政策。",
      stats: [{ label: "重点园区资源", value: "13+" }, { label: "企业所得税", value: "15%" }, { label: "个人所得税", value: "15%" }]
    },
    comparison: { 
      title: "全球离岸架构优势对比", 
      desc: "为什么选择海南？成本、合规与政策的完美平衡。",
      headers: ["对比维度", "中国·海南 (Hainan)", "中国·香港 (Hong Kong)", "新加坡 (Singapore)", "BVI / 开曼"],
      rows: [
        { feature: "企业所得税", hn: "15% (鼓励类)", hk: "16.5%", sg: "17%", bvi: "0%" },
        { feature: "个人所得税", hn: "最高 15%", hk: "最高 15%", sg: "最高 22%", bvi: "0%" },
        { feature: "银行开户难度", hn: "低 (FT账户体系)", hk: "高 (需实地审查)", sg: "极高 (需高额存款)", bvi: "极高 (受反洗钱限制)" },
        { feature: "Web3/RWA 政策", hn: "沙盒监管/积极探索", hk: "发牌合规制", sg: "严格监管", bvi: "缺乏监管/高风险" },
        { feature: "整体运营成本", hn: "低", hk: "高", sg: "极高", bvi: "中 (仅维护费)" }
      ]
    },
    process: { 
      title: "标准化服务流程", 
      desc: "从咨询到落地，全流程透明化、工业化交付。",
      steps: [
        { title: "需求诊断与政策匹配", desc: "深度分析您的业务模式，匹配海南13大重点园区中最适合的税收与产业政策。" },
        { title: "架构设计与园区入驻", desc: "设计VIE或离岸架构，协助完成园区入驻审批、地址挂靠与核名。" },
        { title: "执照办理与账户开立", desc: "极速办理营业执照、公章，并协助开立多币种FT（自由贸易）账户。" },
        { title: "财税托管与合规运营", desc: "提供长期的代理记账、税务审计、资质代办及Web3合规咨询服务。" }
      ]
    },
    cases: { 
      title: "行业成功案例", 
      desc: "助力全球创业者与企业实现资产合规出海。",
      items: [
        { title: "某头部 Web3 游戏平台", tag: "海南生态软件园", desc: "通过设立海南运营主体，享受双15%税收优惠，并成功开立FT账户实现合规的跨境资金调拨，整体税负降低40%。" },
        { title: "跨国高新技术研发中心", tag: "三亚崖州湾科技城", desc: "协助其外籍高管团队办理工作签证与落户，并成功申请高新技术企业认定，获得百万级政府补贴。" },
        { title: "跨境电商与供应链企业", tag: "海口综合保税区", desc: "利用海南“零关税”政策与加工增值30%免关税政策，大幅降低进口成本，建立高效的亚太分拨中心。" }
      ]
    },
    faq: { 
      title: "常见问题解答", 
      desc: "为您解答关于海南注册与Web3出海的核心疑问。",
      items: [
        { q: "什么是海南自贸港的“双15%”税收优惠？", a: "对注册在海南自贸港并实质性运营的鼓励类产业企业，减按15%征收企业所得税；对在海南自贸港工作的高端人才和紧缺人才，其个人所得税实际税负超过15%的部分，予以免征。" },
        { q: "13个重点园区有什么区别？我该选哪个？", a: "海南有13个重点园区（如生态软件园、复兴城、崖州湾等），各有不同的产业定位和叠加政策。例如，Web3和数字经济首选生态软件园或复兴城。我们将根据您的具体业务为您精准匹配。" },
        { q: "什么是 FT 账户？与普通账户有什么区别？", a: "FT账户（自由贸易账户）是海南自贸港特有的本外币合一可兑换账户。它适用离岸汇率，资金跨一线（境外）可自由划转，是实现资金合规出海的核心工具。" },
        { q: "外籍人士或海外企业可以在海南注册公司吗？", a: "完全可以。海南实行准入前国民待遇加负面清单管理制度，外资注册流程已大幅简化，我们提供全套的代办与外籍人员签证服务。" }
      ]
    },
    parks: {
      title: "海南重点园区",
      desc: "为您精准匹配最适合业务发展的产业园区。",
      items: [
        { name: "海南生态软件园 (RSC)", desc: "数字经济、Web3、游戏出海首选地。" },
        { name: "海口复兴城", desc: "跨境电商、国际离岸创新创业基地。" },
        { name: "三亚崖州湾科技城", desc: "深海科技、南繁种业、高新技术研发中心。" },
        { name: "海口综合保税区", desc: "免税品仓储、加工增值、国际物流枢纽。" }
      ]
    },
    policy: {
      title: "自贸港核心政策",
      desc: "零关税、低税率、简税制，打造全球投资新高地。",
      items: [
        { title: "双15%税收优惠", desc: "鼓励类产业企业所得税15%，高端人才个人所得税最高15%。" },
        { title: "零关税政策", desc: "企业进口自用生产设备、营运用交通工具、原辅料免征关税。" },
        { title: "加工增值30%免关税", desc: "在重点园区加工增值超30%的货物，进入内地免征进口关税。" },
        { title: "跨境资金自由便利", desc: "依托多币种FT账户，实现跨境资金的高效、合规调拨。" }
      ]
    },
    commander: {
      title: "全球指挥官计划",
      desc: "成为我们的全球合伙人，共享海南自贸港发展红利。",
      content: "我们正在全球招募具备行业资源的“指挥官”。无论您是律所合伙人、财税专家还是Web3社区领袖，加入我们，您将获得丰厚的业务佣金、专属的交付团队支持以及海南自贸港的最新政策一手资讯。"
    },
    agreements: {
      title: "标准服务协议",
      desc: "公开透明的契约精神，保障您的每一项权益。",
      items: [
        { title: "咨询服务协议", desc: "明确战略咨询、架构设计与政策匹配的服务范围与保密条款。" },
        { title: "财税代理协议", desc: "规范代理记账、税务申报、年度审计的权责边界。" },
        { title: "设计与技术服务协议", desc: "涵盖品牌设计、网站建设、Web3技术落地的交付标准。" }
      ]
    },
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
    navMain: { home: "Home", services: "Core Services", policies: "Policies & Parks", business: "Business", support: "Support" },
    navSub: { about: "About Us", process: "Process", parks: "Key Parks", policy: "Policies", comparison: "Comparison", cases: "Cases", commander: "Commander", agreements: "Agreements", payment: "Payment", ai: "FAQ" },
    auth: { login: "Login", register: "Register", modalTitle: "Client Management System", comingSoon: "System upgrading, coming soon..." },
    payment: { title: "Payment Center", desc: "Secure payment channels supporting fiat and cryptocurrencies.", items: [{name: "Crypto Payment", desc: "Support USDT, USDC, SOL, etc."}, {name: "Corporate Wire", desc: "Multi-currency offshore wire transfers (USD, HKD, SGD)."}, {name: "Third-party", desc: "Alipay, WeChat, PayPal, etc."}] },
    hero: { tag: "2026 Offshore Asset & Compliance HQ", title1: "Global Capital Safe Haven,", title2: "Web3 Offshore Bridgehead.", desc: "Leveraging the Hainan Free Trade Port's dual 15% tax benefits, we provide one-stop industrial delivery for company registration, multi-currency offshore accounts, RWA tokenization compliance, and VIE structuring.", btn1: "Get Custom Plan", btn2: "Calculate Tax Savings", stat: "Max Corporate Tax Reduction" },
    about: { 
      title: "About Us", 
      desc: "Based in the Hainan Free Trade Port, radiating globally as a Web3 and offshore asset compliance center.",
      content: "With the advancement of Hainan's island-wide customs closure, Hainan is becoming the core hub for global enterprises to layout in China and the Asia-Pacific market. Relying on the industrial agglomeration advantages of Hainan's 13 Key Industrial Parks, we provide global entrepreneurs with full-lifecycle services from strategic consulting, company registration, tax planning to technology implementation.",
      stats: [{ label: "Key Parks", value: "13+" }, { label: "Corporate Tax", value: "15%" }, { label: "Personal Tax", value: "15%" }]
    },
    comparison: { 
      title: "Global Offshore Structure Comparison", 
      desc: "Why choose Hainan? The perfect balance of cost, compliance, and policy.",
      headers: ["Dimension", "Hainan, China", "Hong Kong, China", "Singapore", "BVI / Cayman"],
      rows: [
        { feature: "Corporate Tax", hn: "15% (Encouraged)", hk: "16.5%", sg: "17%", bvi: "0%" },
        { feature: "Personal Tax", hn: "Max 15%", hk: "Max 15%", sg: "Max 22%", bvi: "0%" },
        { feature: "Bank Account Opening", hn: "Easy (FT Accounts)", hk: "Hard (On-site req)", sg: "Very Hard (High deposit)", bvi: "Very Hard (AML strict)" },
        { feature: "Web3/RWA Policy", hn: "Sandbox / Exploring", hk: "Licensing Compliance", sg: "Strict Regulation", bvi: "Unregulated / High Risk" },
        { feature: "Overall Op. Cost", hn: "Low", hk: "High", sg: "Very High", bvi: "Medium (Maint. only)" }
      ]
    },
    process: { 
      title: "Standardized Service Process", 
      desc: "From consultation to landing, full-process transparent and industrialized delivery.",
      steps: [
        { title: "Requirement Diagnosis", desc: "Deeply analyze your business model and match the most suitable tax and industrial policies among Hainan's 13 key parks." },
        { title: "Structure & Park Entry", desc: "Design VIE or offshore structures, assist in park entry approval, address affiliation, and naming." },
        { title: "License & Account Setup", desc: "Rapidly process business licenses, company seals, and assist in opening multi-currency FT (Free Trade) accounts." },
        { title: "Tax & Compliance Ops", desc: "Provide long-term agency accounting, tax auditing, qualification processing, and Web3 compliance consulting." }
      ]
    },
    cases: { 
      title: "Industry Success Cases", 
      desc: "Helping global entrepreneurs and enterprises achieve asset compliance offshore.",
      items: [
        { title: "Top Web3 Game Platform", tag: "Hainan Resort Software Community", desc: "By setting up a Hainan operating entity, they enjoyed the dual 15% tax benefits and successfully opened an FT account for compliant cross-border fund transfers, reducing overall tax burden by 40%." },
        { title: "Multinational Tech R&D Center", tag: "Yazhou Bay Science and Technology City", desc: "Assisted their foreign executive team with work visas and settlement, successfully applied for High-Tech Enterprise certification, receiving millions in government subsidies." },
        { title: "Cross-border E-commerce", tag: "Haikou Comprehensive Free Trade Zone", desc: "Utilized Hainan's 'zero tariff' and 30% value-added tax exemption policies to significantly reduce import costs and establish an efficient Asia-Pacific distribution center." }
      ]
    },
    faq: { 
      title: "Frequently Asked Questions", 
      desc: "Answering your core questions about Hainan registration and Web3 offshore.",
      items: [
        { q: "What is the 'Dual 15%' tax benefit in Hainan Free Trade Port?", a: "Enterprises in encouraged industries registered and operating substantively in Hainan enjoy a reduced corporate income tax rate of 15%. High-end and urgently needed talents working in Hainan are exempt from the portion of their actual personal income tax burden exceeding 15%." },
        { q: "What is the difference between the 13 Key Industrial Parks?", a: "Hainan has 13 key parks (e.g., Resort Software Community, Fuxing City, Yazhou Bay), each with different industrial positioning and overlapping policies. For example, Web3 and digital economy prefer RSC or Fuxing City. We match you precisely based on your business." },
        { q: "What is an FT Account? How is it different?", a: "The FT (Free Trade) account is a unique convertible account integrating domestic and foreign currencies in Hainan. It applies offshore exchange rates and allows free transfer of funds across the 'first line' (overseas), making it a core tool for compliant capital offshore." },
        { q: "Can foreigners or overseas companies register in Hainan?", a: "Absolutely. Hainan implements pre-establishment national treatment plus a negative list management system. The foreign investment registration process is greatly simplified, and we provide full agency and visa services." }
      ]
    },
    parks: {
      title: "Hainan Key Parks",
      desc: "Precisely matching the most suitable industrial park for your business development.",
      items: [
        { name: "Hainan Resort Software Community (RSC)", desc: "The preferred destination for digital economy, Web3, and gaming." },
        { name: "Haikou Fuxing City", desc: "Cross-border e-commerce and international offshore innovation base." },
        { name: "Sanya Yazhou Bay Science and Technology City", desc: "Deep-sea tech, seed industry, and high-tech R&D center." },
        { name: "Haikou Comprehensive Free Trade Zone", desc: "Duty-free warehousing, value-added processing, and international logistics hub." }
      ]
    },
    policy: {
      title: "Core Free Trade Port Policies",
      desc: "Zero tariffs, low tax rates, and simplified tax systems creating a new global investment highland.",
      items: [
        { title: "Dual 15% Tax Benefit", desc: "15% corporate tax for encouraged industries, max 15% personal income tax for high-end talents." },
        { title: "Zero Tariff Policy", desc: "Exemption from import duties on self-used production equipment, operational vehicles, and raw materials." },
        { title: "30% Value-Added Tariff Exemption", desc: "Goods processed in key parks with over 30% value added are exempt from import duties when entering the mainland." },
        { title: "Cross-Border Capital Freedom", desc: "Relying on multi-currency FT accounts to achieve efficient and compliant cross-border capital transfers." }
      ]
    },
    commander: {
      title: "Global Commander Program",
      desc: "Become our global partner and share the dividends of the Hainan Free Trade Port.",
      content: "We are recruiting 'Commanders' with industry resources globally. Whether you are a law firm partner, tax expert, or Web3 community leader, join us to receive generous business commissions, exclusive delivery team support, and first-hand policy information."
    },
    agreements: {
      title: "Standard Service Agreements",
      desc: "Open and transparent contract spirit, protecting every right of yours.",
      items: [
        { title: "Consulting Service Agreement", desc: "Clarifies the scope of services and confidentiality clauses for strategic consulting, structure design, and policy matching." },
        { title: "Fiscal & Tax Agency Agreement", desc: "Regulates the rights and responsibilities of bookkeeping, tax declaration, and annual auditing." },
        { title: "Design & Tech Service Agreement", desc: "Covers delivery standards for brand design, website construction, and Web3 technology implementation." }
      ]
    },
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
    navMain: { home: "Главная", services: "Услуги", policies: "Политика", business: "Бизнес", support: "Поддержка" },
    navSub: { about: "О нас", process: "Процесс", parks: "Парки", policy: "Политика", comparison: "Сравнение", cases: "Кейсы", commander: "Командир", agreements: "Соглашения", payment: "Оплата", ai: "Вопросы" },
    auth: { login: "Войти", register: "Регистрация", modalTitle: "Система управления", comingSoon: "Обновление системы, скоро..." },
    payment: { title: "Платежный центр", desc: "Безопасные каналы оплаты (фиат и криптовалюты).", items: [{name: "Криптовалюта", desc: "Поддержка USDT, USDC, SOL и др."}, {name: "Банковский перевод", desc: "Мультивалютные переводы (USD, HKD, SGD)."}, {name: "Эл. платежи", desc: "Alipay, WeChat, PayPal и др."}] },
    hero: { tag: "2026 Штаб-квартира офшорных активов", title1: "Глобальная безопасная гавань,", title2: "Офшорный плацдарм Web3.", desc: "Используя двойные налоговые льготы 15% порта свободной торговли Хайнань, мы предоставляем комплексные услуги по регистрации компаний, открытию мультивалютных счетов, комплаенсу токенизации RWA и структурированию VIE.", btn1: "Получить план", btn2: "Расчет налогов", stat: "Макс. снижение налога" },
    about: { 
      title: "О нас", 
      desc: "Базируясь в порту свободной торговли Хайнань, мы являемся глобальным центром комплаенса Web3 и офшорных активов.",
      content: "По мере продвижения закрытия таможни на всем острове Хайнань, он становится ключевым узлом для глобальных предприятий. Опираясь на преимущества 13 ключевых индустриальных парков Хайнаня, мы предоставляем предпринимателям услуги полного цикла: от стратегического консалтинга и регистрации компаний до налогового планирования и внедрения технологий.",
      stats: [{ label: "Ключевые парки", value: "13+" }, { label: "Корпоративный налог", value: "15%" }, { label: "Подоходный налог", value: "15%" }]
    },
    comparison: { 
      title: "Сравнение глобальных офшорных структур", 
      desc: "Почему стоит выбрать Хайнань? Идеальный баланс стоимости, комплаенса и политики.",
      headers: ["Критерий", "Хайнань, Китай", "Гонконг, Китай", "Сингапур", "БВО / Кайманы"],
      rows: [
        { feature: "Корпоративный налог", hn: "15% (Льготный)", hk: "16.5%", sg: "17%", bvi: "0%" },
        { feature: "Подоходный налог", hn: "Макс 15%", hk: "Макс 15%", sg: "Макс 22%", bvi: "0%" },
        { feature: "Открытие счета", hn: "Легко (Счета FT)", hk: "Сложно (Личный визит)", sg: "Очень сложно (Высокий депозит)", bvi: "Очень сложно (Строгий AML)" },
        { feature: "Политика Web3/RWA", hn: "Песочница / Исследование", hk: "Лицензирование", sg: "Строгое регулирование", bvi: "Нет регулирования / Высокий риск" },
        { feature: "Общие затраты", hn: "Низкие", hk: "Высокие", sg: "Очень высокие", bvi: "Средние (Только обслуживание)" }
      ]
    },
    process: { 
      title: "Стандартизированный процесс обслуживания", 
      desc: "От консультации до реализации, полностью прозрачный процесс.",
      steps: [
        { title: "Диагностика требований", desc: "Глубокий анализ вашей бизнес-модели и подбор наиболее подходящей налоговой и промышленной политики среди 13 ключевых парков Хайнаня." },
        { title: "Структура и вход в парк", desc: "Проектирование структур VIE или офшоров, помощь в утверждении входа в парк, предоставление адреса и названия." },
        { title: "Лицензии и счета", desc: "Быстрое оформление бизнес-лицензий, печатей компаний и помощь в открытии мультивалютных счетов FT (свободной торговли)." },
        { title: "Налоги и комплаенс", desc: "Долгосрочное бухгалтерское обслуживание, налоговый аудит, оформление квалификаций и консалтинг по комплаенсу Web3." }
      ]
    },
    cases: { 
      title: "Успешные кейсы в отрасли", 
      desc: "Помогаем глобальным предпринимателям и предприятиям достичь комплаенса активов в офшоре.",
      items: [
        { title: "Ведущая игровая платформа Web3", tag: "Hainan Resort Software Community", desc: "Создав операционную компанию на Хайнане, они воспользовались двойными налоговыми льготами 15% и успешно открыли счет FT для легальных трансграничных переводов, снизив общую налоговую нагрузку на 40%." },
        { title: "Многонациональный центр НИОКР", tag: "Yazhou Bay Science and Technology City", desc: "Помогли иностранным руководителям с рабочими визами и релокацией, успешно подали заявку на сертификацию высокотехнологичного предприятия, получив миллионные государственные субсидии." },
        { title: "Трансграничная электронная коммерция", tag: "Haikou Comprehensive Free Trade Zone", desc: "Использовали политику 'нулевых тарифов' Хайнаня и освобождение от НДС на 30% добавленной стоимости, чтобы значительно снизить затраты на импорт и создать эффективный распределительный центр." }
      ]
    },
    faq: { 
      title: "Часто задаваемые вопросы", 
      desc: "Отвечаем на ваши основные вопросы о регистрации на Хайнане и офшорах Web3.",
      items: [
        { q: "Что такое налоговая льгота 'Двойные 15%'?", a: "Предприятия поощряемых отраслей, зарегистрированные и ведущие реальную деятельность на Хайнане, пользуются сниженной ставкой корпоративного налога 15%. Высококвалифицированные специалисты освобождаются от уплаты НДФЛ в части, превышающей 15%." },
        { q: "В чем разница между 13 ключевыми парками?", a: "На Хайнане 13 ключевых парков, каждый со своей специализацией. Например, для Web3 и цифровой экономики лучше всего подходят RSC или Fuxing City. Мы подберем парк специально для вашего бизнеса." },
        { q: "Что такое счет FT?", a: "Счет FT (свободной торговли) — это уникальный конвертируемый счет на Хайнане. К нему применяются офшорные обменные курсы, и он позволяет свободно переводить средства за границу, что делает его ключевым инструментом для офшорного капитала." },
        { q: "Могут ли иностранцы зарегистрировать компанию?", a: "Абсолютно. На Хайнане действует система национального режима до учреждения и негативный список. Процесс регистрации иностранных инвестиций значительно упрощен, и мы предоставляем полные агентские и визовые услуги." }
      ]
    },
    parks: {
      title: "Ключевые парки Хайнаня",
      desc: "Точный подбор наиболее подходящего индустриального парка для развития вашего бизнеса.",
      items: [
        { name: "Hainan Resort Software Community (RSC)", desc: "Предпочтительное место для цифровой экономики, Web3 и игр." },
        { name: "Haikou Fuxing City", desc: "Трансграничная электронная коммерция и международная база инноваций." },
        { name: "Sanya Yazhou Bay Science and Technology City", desc: "Глубоководные технологии, семеноводство и центр НИОКР." },
        { name: "Haikou Comprehensive Free Trade Zone", desc: "Склады беспошлинной торговли, переработка и международный логистический центр." }
      ]
    },
    policy: {
      title: "Ключевая политика порта",
      desc: "Нулевые тарифы, низкие налоговые ставки и упрощенная налоговая система.",
      items: [
        { title: "Двойная льгота 15%", desc: "Корпоративный налог 15% для поощряемых отраслей, макс. 15% НДФЛ для высококвалифицированных специалистов." },
        { title: "Политика нулевых тарифов", desc: "Освобождение от импортных пошлин на производственное оборудование, транспортные средства и сырье." },
        { title: "Освобождение от пошлин при 30% добавленной стоимости", desc: "Товары, переработанные в ключевых парках с добавленной стоимостью более 30%, освобождаются от пошлин при ввозе на материк." },
        { title: "Свобода трансграничного капитала", desc: "Использование мультивалютных счетов FT для эффективных и легальных трансграничных переводов." }
      ]
    },
    commander: {
      title: "Глобальная программа Командир",
      desc: "Станьте нашим глобальным партнером и разделите дивиденды порта свободной торговли Хайнань.",
      content: "Мы ищем 'Командиров' с отраслевыми ресурсами по всему миру. Будь вы партнером юридической фирмы, налоговым экспертом или лидером сообщества Web3, присоединяйтесь к нам, чтобы получать щедрые комиссионные, эксклюзивную поддержку команды и информацию о политике из первых рук."
    },
    agreements: {
      title: "Стандартные соглашения",
      desc: "Открытый и прозрачный дух контракта, защищающий каждое ваше право.",
      items: [
        { title: "Соглашение о консалтинге", desc: "Определяет объем услуг и положения о конфиденциальности для стратегического консалтинга." },
        { title: "Соглашение о налоговом представительстве", desc: "Регулирует права и обязанности по ведению бухгалтерии и налоговому декларированию." },
        { title: "Соглашение о дизайне и технологиях", desc: "Охватывает стандарты доставки для дизайна бренда, создания сайтов и внедрения Web3." }
      ]
    },
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
  const [showAuthModal, setShowAuthModal] = useState(false);

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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#9945FF]/30 scroll-smooth">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-md'}`}>
        {/* Top Row: Main Categories & Actions */}
        <div className="border-b border-slate-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center shadow-lg">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Solana Hainan</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-base font-bold text-slate-900 hover:text-[#9945FF] transition-colors">{t.navMain.home}</a>
              <a href="#services" className="text-base font-bold text-slate-900 hover:text-[#9945FF] transition-colors">{t.navMain.services}</a>
              <a href="#policy" className="text-base font-bold text-slate-900 hover:text-[#9945FF] transition-colors">{t.navMain.policies}</a>
              <a href="#agreements" className="text-base font-bold text-slate-900 hover:text-[#9945FF] transition-colors">{t.navMain.business}</a>
              <a href="#faq" className="text-base font-bold text-slate-900 hover:text-[#9945FF] transition-colors">{t.navMain.support}</a>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setShowAuthModal(true)} className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900">{t.auth.login}</button>
              <button onClick={() => setShowAuthModal(true)} className="text-sm font-medium px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-[#9945FF] transition-colors shadow-md">{t.auth.register}</button>
              
              <div className="h-5 w-px bg-slate-300 mx-2 hidden sm:block"></div>
              
              {/* Language Switcher */}
              <div className="flex items-center gap-1">
                <button onClick={() => setLang('zh')} className={`text-xs font-bold px-2 py-1 rounded ${lang === 'zh' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>中</button>
                <button onClick={() => setLang('en')} className={`text-xs font-bold px-2 py-1 rounded ${lang === 'en' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>EN</button>
                <button onClick={() => setLang('ru')} className={`text-xs font-bold px-2 py-1 rounded ${lang === 'ru' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>RU</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Sub Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 hidden lg:flex items-center justify-center gap-8 overflow-x-auto no-scrollbar bg-slate-50/50">
          <a href="#about" className="text-sm font-medium text-slate-500 hover:text-[#9945FF] whitespace-nowrap transition-colors">{t.navSub.about}</a>
          <a href="#process" className="text-sm font-medium text-slate-500 hover:text-[#9945FF] whitespace-nowrap transition-colors">{t.navSub.process}</a>
          <a href="#parks" className="text-sm font-medium text-slate-500 hover:text-[#9945FF] whitespace-nowrap transition-colors">{t.navSub.parks}</a>
          <a href="#policy" className="text-sm font-medium text-slate-500 hover:text-[#9945FF] whitespace-nowrap transition-colors">{t.navSub.policy}</a>
          <a href="#comparison" className="text-sm font-medium text-slate-500 hover:text-[#9945FF] whitespace-nowrap transition-colors">{t.navSub.comparison}</a>
          <a href="#cases" className="text-sm font-medium text-slate-500 hover:text-[#9945FF] whitespace-nowrap transition-colors">{t.navSub.cases}</a>
          <a href="#commander" className="text-sm font-medium text-slate-500 hover:text-[#9945FF] whitespace-nowrap transition-colors">{t.navSub.commander}</a>
          <a href="#agreements" className="text-sm font-medium text-slate-500 hover:text-[#9945FF] whitespace-nowrap transition-colors">{t.navSub.agreements}</a>
          <a href="#payment" className="text-sm font-medium text-slate-500 hover:text-[#9945FF] whitespace-nowrap transition-colors">{t.navSub.payment}</a>
          <a href="#faq" className="text-sm font-medium text-slate-500 hover:text-[#9945FF] whitespace-nowrap transition-colors">{t.navSub.ai}</a>
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

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-slate-900">{t.about.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.about.desc}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-12 rounded-3xl text-center">
            <p className="text-slate-500 italic">[ 内容占位：这里将详细介绍公司的背景、愿景、团队实力以及海南自贸港的宏观政策红利。下一步再填充具体内容。 ]</p>
          </div>
        </div>
      </section>

      {/* Parks Section */}
      <section id="parks" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Key Parks</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-slate-900">{t.parks.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.parks.desc}</p>
          </div>
          <div className="bg-white border border-slate-200 p-12 rounded-3xl text-center shadow-sm">
            <p className="text-slate-500 italic">[ 内容占位：这里将展示海南 13 个重点园区的图文介绍，特别是 RSC 和复兴城。下一步再填充具体内容。 ]</p>
          </div>
        </div>
      </section>

      {/* Policy Section */}
      <section id="policy" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Core Policies</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-slate-900">{t.policy.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.policy.desc}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-12 rounded-3xl text-center">
            <p className="text-slate-500 italic">[ 内容占位：这里将详细解读双15%税收优惠、零关税、FT账户等核心政策。下一步再填充具体内容。 ]</p>
          </div>
        </div>
      </section>

      {/* Commander Section */}
      <section id="commander" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#14F195] font-semibold tracking-wider uppercase text-sm">Global Partner</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{t.commander.title}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">{t.commander.desc}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 p-12 rounded-3xl text-center">
            <p className="text-slate-400 italic">[ 内容占位：这里将介绍“指挥官计划”的招募条件、佣金比例、赋能支持等。下一步再填充具体内容。 ]</p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Global Advantages</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-slate-900">{t.comparison.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.comparison.desc}</p>
          </div>
          <div className="bg-white border border-slate-200 p-12 rounded-3xl text-center shadow-sm">
            <p className="text-slate-500 italic">[ 内容占位：这里将放置一个对比表格，横向对比海南、香港、新加坡、BVI 在税率、开户难度、Web3友好度等方面的差异。下一步再填充具体内容。 ]</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Service Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-slate-900">{t.process.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.process.desc}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-12 rounded-3xl text-center">
            <p className="text-slate-500 italic">[ 内容占位：这里将展示 1-2-3-4 步的标准化服务流程图，例如：需求沟通 -{'>'} 方案定制 -{'>'} 签约执行 -{'>'} 交付运营。下一步再填充具体内容。 ]</p>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Success Cases</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-slate-900">{t.cases.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.cases.desc}</p>
          </div>
          <div className="bg-white border border-slate-200 p-12 rounded-3xl text-center shadow-sm">
            <p className="text-slate-500 italic">[ 内容占位：这里将展示 3-6 个脱敏的客户成功案例，例如某 Web3 游戏公司如何通过海南架构合规发币并节税。下一步再填充具体内容。 ]</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-slate-900">{t.faq.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.faq.desc}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-12 rounded-3xl text-center">
            <p className="text-slate-500 italic">[ 内容占位：这里将放置手风琴折叠面板，解答客户最关心的 5-10 个常见问题。下一步再填充具体内容。 ]</p>
          </div>
        </div>
      </section>

      {/* Agreements Section */}
      <section id="agreements" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Legal & Agreements</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-slate-900">{t.agreements.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.agreements.desc}</p>
          </div>
          <div className="bg-white border border-slate-200 p-12 rounded-3xl text-center shadow-sm">
            <p className="text-slate-500 italic">[ 内容占位：这里将列出各项标准服务协议的下载或预览链接，如咨询协议、财税协议等。下一步再填充具体内容。 ]</p>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section id="payment" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Payment Center</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-slate-900">{t.payment.title}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t.payment.desc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.payment.items.map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                  {idx === 0 ? <Globe className="w-8 h-8 text-[#9945FF]" /> : 
                   idx === 1 ? <Landmark className="w-8 h-8 text-blue-500" /> : 
                   <ShieldCheck className="w-8 h-8 text-green-500" />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.name}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Google Sheet Form Section */}
      <section id="contact" className="py-24 bg-slate-900">
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

      {/* Auth Modal (Login/Register) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            >
              ✕
            </button>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9945FF] to-[#14F195] rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{t.auth.modalTitle}</h3>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <Loader2 className="w-8 h-8 text-[#9945FF] animate-spin mx-auto mb-3" />
              <p className="text-slate-600 font-medium">{t.auth.comingSoon}</p>
              <p className="text-sm text-slate-400 mt-2">The client portal is currently under construction. Please contact us directly for immediate assistance.</p>
            </div>
            
            <button 
              onClick={() => setShowAuthModal(false)}
              className="w-full mt-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}

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
