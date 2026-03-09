import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Globe2, ShieldCheck, ArrowRight, CheckCircle2, 
  MapPin, Landmark, Scale, Calculator, UserPlus, 
  MessageSquare, ChevronDown, Sparkles, Bot, Loader2,
  Send, QrCode, Download, FileText, TrendingDown, Users, Target, Zap, Award,
  Briefcase, LineChart, Globe, Building, ArrowUpRight, Star, Check
} from 'lucide-react';

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // AI Assessment State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  // Tax Calculator State
  const [revenue, setRevenue] = useState<number>(10000000); // Default 10M
  const mainlandTaxRate = 0.25;
  const hainanTaxRate = 0.15;
  const mainlandTax = revenue * mainlandTaxRate;
  const hainanTax = revenue * hainanTaxRate;
  const taxSavings = mainlandTax - hainanTax;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiLoading(true);
    setAiResult(null);
    
    setTimeout(() => {
      setIsAiLoading(false);
      setAiResult("基于您的输入，AI 专家系统建议架构：\n\n1. 【离岸层】设立香港/BVI控股母公司或基金会，负责海外资金归集、Web3代币发行及海外IP持有。\n2. 【境内层】在海南自贸港设立WFOE（外商独资企业）作为境内运营与技术研发中心。\n3. 【资金流】通过海南FT账户（自由贸易账户）实现境内外资金的合法合规流转。\n4. 【核心优势】享受海南15%企业所得税优惠及高管个人所得税15%封顶优惠，同时通过VIE架构实现风险的物理隔离。");
    }, 2500);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format(value);
  };

  const faqs = [
    {
      q: "外资企业在海南可以100%控股吗？",
      a: "完全可以。海南自贸港实行全国最简的《外商投资准入负面清单》，除极少数涉及国家安全的领域外，绝大多数行业均允许外资100%独资控股，且注册资本实行认缴制。"
    },
    {
      q: "Web3与区块链企业在海南如何合规运营？",
      a: "中国大陆对虚拟货币交易有严格限制，但极力鼓励区块链技术应用。我们为Web3企业提供“离岸基金会+海南技术/运营主体”的合规隔离架构，在享受海南15%低税率的同时，合法合规地开展无币区块链、RWA（真实资产上链）、元宇宙及技术研发业务。"
    },
    {
      q: "注册海南公司需要我本人亲自到场吗？",
      a: "大部分环节（如核名、注册、税务登记）我们均可为您全权远程代办，无需您本人到场。仅在多币种银行账户开立等特定环节，可能需要法人进行视频面签或短暂到访，我们会为您提前预约并全程陪同。"
    },
    {
      q: "海南的“双15%”税收优惠具体指什么？",
      a: "1. 企业所得税：对注册在海南并实质性运营的鼓励类产业企业，减按15%征收（全国标准为25%）。2. 个人所得税：对在海南工作的高端人才和紧缺人才，其个人所得税实际税负超过15%的部分予以免征。"
    },
    {
      q: "办理海南公司注册和银行开户通常需要多长时间？",
      a: "在资料齐全的情况下，海南公司注册（拿营业执照）最快只需 3 个工作日。银行开户（含FT账户）通常需要 2-4 周，具体取决于银行的尽职调查进度。我们将全程加急跟进。"
    }
  ];

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
              <span className="block text-[10px] font-medium text-slate-500 uppercase tracking-wider">海南省索拉纳商务咨询</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-[#9945FF] transition-colors">关于我们</a>
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-[#9945FF] transition-colors">核心业务</a>
            <a href="#comparison" className="text-sm font-medium text-slate-600 hover:text-[#9945FF] transition-colors">全球优势</a>
            <a href="#process" className="text-sm font-medium text-slate-600 hover:text-[#9945FF] transition-colors">服务流程</a>
            <a href="#cases" className="text-sm font-medium text-slate-600 hover:text-[#9945FF] transition-colors">成功案例</a>
            <a href="#ai-planner" className="text-sm font-medium text-slate-600 hover:text-[#9945FF] transition-colors flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#9945FF]" /> AI规划
            </a>
            <a href="#contact" className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-[#9945FF] transition-colors shadow-md ml-2">
              立即连线专家
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-[0.03]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#14F195]/10 to-transparent blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#9945FF]/10 to-transparent blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 text-[#9945FF] text-sm font-semibold mb-6 border border-purple-200 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14F195] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#14F195]"></span>
                </span>
                2026 离岸资产与合规指挥部
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6 text-slate-900">
                全球资本避风港，<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                  Web3出海桥头堡。
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                依托海南自贸港双15%税收红利，为您提供公司注册、多币种离岸账户、RWA发币合规及VIE架构设计的一站式工业化交付。合法降税，安全出海。
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-medium hover:bg-[#9945FF] transition-all hover:shadow-xl hover:-translate-y-0.5">
                  获取定制出海方案 <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#calculator" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-slate-700 font-medium border border-slate-200 hover:border-[#14F195] hover:text-[#14F195] transition-all shadow-sm hover:shadow-md">
                  <Calculator className="w-5 h-5" /> 测算节税金额
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#14F195]" /> 100% 落地成功率</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#14F195]" /> 严格保密协议</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#14F195]" /> 官方政策直通车</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="海南自贸港商务中心" className="relative rounded-3xl shadow-2xl border border-white/20 object-cover h-[500px] w-full" referrerPolicy="no-referrer" />
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">企业所得税最高降幅</p>
                  <p className="text-2xl font-bold text-slate-900">40% <span className="text-sm font-normal text-slate-500">(25% → 15%)</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop" alt="Team" className="rounded-2xl shadow-lg w-full h-64 object-cover" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop" alt="Office" className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 text-center w-48">
                <div className="text-4xl font-extrabold text-[#9945FF] mb-1">10+</div>
                <div className="text-sm font-medium text-slate-600">年跨境合规经验</div>
              </div>
            </div>
            <div>
              <span className="text-[#9945FF] font-semibold tracking-wider uppercase text-sm">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
                懂政策，更懂 Crypto 的<br/>顶尖合规智库
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                作为海南自贸港首批专注于 Web3 与跨境合规的咨询机构，Solana Hainan 汇聚了来自顶级律所、四大财税及头部加密交易所的资深专家。
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                我们致力于打破传统咨询的壁垒，为出海企业、Web3 创业者、高净值人群提供从底层架构设计到物理落地的全生命周期服务。我们不仅帮您注册公司，更帮您构建安全的全球商业版图。
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-[#9945FF]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">精准政策解读</h4>
                    <p className="text-sm text-slate-500 mt-1">直通自贸港管委会，掌握一手政策红利与补贴申报通道。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#14F195]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">绝对安全合规</h4>
                    <p className="text-sm text-slate-500 mt-1">法务与税务专家双重把关，确保资金与业务的100%合规隔离。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section id="services" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#14F195] font-semibold tracking-wider uppercase text-sm">Core Services</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">全矩阵出海与落地服务</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">从物理空间的工商注册，到数字世界的Web3合规，我们提供工业化标准的交付体系。</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Building2 className="w-6 h-6 text-[#14F195]" />,
                title: "海南外资/内资公司注册",
                desc: "提供地址挂靠、核名、营业执照办理、公章刻制全套服务。最快3个工作日下证，全程无需法人到场。"
              },
              {
                icon: <Landmark className="w-6 h-6 text-[#9945FF]" />,
                title: "多币种离岸账户开立",
                desc: "协助开立海南FT账户（自由贸易账户）及香港、新加坡等多地离岸银行账户，实现资金自由跨境调拨。"
              },
              {
                icon: <Scale className="w-6 h-6 text-blue-400" />,
                title: "离岸 Web3 与 RWA 架构",
                desc: "深度的合规架构体系。提供“海外基金会+海南运营主体”的VIE隔离架构设计，涵盖 RWA 实体资产代币化咨询与发币合规指导。"
              },
              {
                icon: <Calculator className="w-6 h-6 text-orange-400" />,
                title: "双15%税务筹划与审计",
                desc: "深度解析海南鼓励类产业目录，协助企业及高管申请企业所得税与个人所得税双15%优惠，提供年度合规审计。"
              },
              {
                icon: <UserPlus className="w-6 h-6 text-pink-400" />,
                title: "全球人才落户与工作签证",
                desc: "为外籍高管办理来华工作许可及居留签证，协助国内核心团队办理海南落户及购房/购车资格审查。"
              },
              {
                icon: <Briefcase className="w-6 h-6 text-emerald-400" />,
                title: "特许经营资质代办",
                desc: "代办ICP增值电信业务许可证、网络文化经营许可证、私募基金牌照等核心业务准入资质。"
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Comparison Section */}
      <section id="comparison" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#9945FF] font-semibold tracking-wider uppercase text-sm">Global Advantage</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">为什么选择海南自贸港？</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">对比传统离岸金融中心，海南在税收、成本与背靠中国大陆市场方面具有不可替代的优势。</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden text-left">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-5 px-6 font-semibold text-lg">对比维度</th>
                  <th className="py-5 px-6 font-semibold text-lg bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white">🇨🇳 海南自贸港 (推荐)</th>
                  <th className="py-5 px-6 font-semibold text-lg text-slate-300">🇭🇰 中国香港</th>
                  <th className="py-5 px-6 font-semibold text-lg text-slate-300">🇸🇬 新加坡</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6 font-medium text-slate-700">企业所得税</td>
                  <td className="py-5 px-6 font-bold text-[#9945FF]">15% (鼓励类产业)</td>
                  <td className="py-5 px-6 text-slate-600">16.5%</td>
                  <td className="py-5 px-6 text-slate-600">17%</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6 font-medium text-slate-700">个人所得税</td>
                  <td className="py-5 px-6 font-bold text-[#9945FF]">最高 15% (高端紧缺人才)</td>
                  <td className="py-5 px-6 text-slate-600">最高 17%</td>
                  <td className="py-5 px-6 text-slate-600">最高 22%</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6 font-medium text-slate-700">企业运营成本</td>
                  <td className="py-5 px-6 font-bold text-[#14F195]">极低 (人力/租金成本优势)</td>
                  <td className="py-5 px-6 text-slate-600">极高</td>
                  <td className="py-5 px-6 text-slate-600">极高</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6 font-medium text-slate-700">资金跨境流动</td>
                  <td className="py-5 px-6 font-bold text-slate-900">FT账户自由兑换调拨</td>
                  <td className="py-5 px-6 text-slate-600">完全自由</td>
                  <td className="py-5 px-6 text-slate-600">完全自由</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-6 font-medium text-slate-700">Web3 政策导向</td>
                  <td className="py-5 px-6 font-bold text-slate-900">鼓励无币区块链、元宇宙、RWA研发</td>
                  <td className="py-5 px-6 text-slate-600">拥抱虚拟资产交易 (发牌制)</td>
                  <td className="py-5 px-6 text-slate-600">监管趋严</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Standardized Process Section */}
      <section id="process" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">标准化交付，极速落地</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">拒绝冗长繁琐，我们将复杂的政务与法务流程封装为 4 步标准动作，让您省心省力。</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 transform -translate-y-1/2"></div>
            
            {[
              { step: "01", title: "需求诊断与评估", desc: "专家1V1沟通，结合AI系统评估业务模式，出具初步合规与税务筹划方案。" },
              { step: "02", title: "架构设计与签约", desc: "确定境内外主体股权架构（如VIE），签署严格的保密协议与服务合同。" },
              { step: "03", title: "代办执行与落地", desc: "全程代办核名、注册、刻章、税务登记及银行开户，无需法人亲自到场跑腿。" },
              { step: "04", title: "交付与持续合规", desc: "交付全套公司资料与账户网银。提供后续的代理记账、年度审计与政策补贴申报。" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group hover:border-[#9945FF] transition-colors">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-[#9945FF] transition-colors shadow-md">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tax Calculator Section */}
      <section id="calculator" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#14F195] font-semibold tracking-wider uppercase text-sm">ROI Calculator</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">海南自贸港节税计算器</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">输入您的企业预计年利润，直观感受海南双15%税收优惠政策为您带来的巨大资金结余。</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl">
            <div className="mb-10">
              <label className="block text-sm font-semibold text-slate-700 mb-4">预计企业年利润 (人民币)</label>
              <input 
                type="range" 
                min="1000000" 
                max="100000000" 
                step="1000000" 
                value={revenue} 
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#9945FF]"
              />
              <div className="mt-4 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                {formatCurrency(revenue)}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                <p className="text-sm text-slate-500 mb-2">内地常规企业所得税 (25%)</p>
                <p className="text-2xl font-bold text-slate-700">{formatCurrency(mainlandTax)}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border-2 border-[#14F195]/30 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#14F195]"></div>
                <p className="text-sm text-slate-500 mb-2">海南自贸港企业所得税 (15%)</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(hainanTax)}</p>
              </div>
              <div className="bg-gradient-to-br from-[#9945FF] to-[#14F195] p-6 rounded-2xl shadow-lg text-center text-white transform md:scale-110 flex flex-col justify-center">
                <p className="text-sm font-medium opacity-90 mb-2">每年为您节省纯利润</p>
                <p className="text-3xl font-bold">{formatCurrency(taxSavings)}</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500 mb-6">* 测算结果仅供参考，实际税额需根据企业具体财务状况及产业目录认定为准。</p>
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-[#9945FF] transition-colors shadow-md">
                获取详细税务筹划方案 <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Success Cases Section */}
      <section id="cases" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">商业成功案例</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">我们已成功协助上百家企业完成跨境合规与落地，以下为部分脱敏案例。</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#9945FF]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">某头部 GameFi 链游团队</h3>
                  <p className="text-sm text-slate-500">行业：Web3 / 游戏出海</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-bold text-slate-700 block mb-1">客户痛点：</span>
                  <p className="text-slate-600 text-sm">核心研发团队在国内，面临代币发行合规风险及高额的员工个人所得税。</p>
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-700 block mb-1">Solana Hainan 方案：</span>
                  <p className="text-slate-600 text-sm">搭建“新加坡基金会（发币主体） + 海南 WFOE（研发主体）”的 VIE 架构。通过技术服务协议合规转移利润。</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-sm font-bold text-[#14F195] flex items-center gap-1 mb-1"><Check className="w-4 h-4" /> 落地成果：</span>
                  <p className="text-slate-700 text-sm font-medium">成功规避国内发币风险，国内实体享受 15% 企业所得税，核心高管享受个税 15% 封顶，每年节税超 500 万元。</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <LineChart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">某大型跨境电商大卖</h3>
                  <p className="text-sm text-slate-500">行业：国际贸易 / 跨境电商</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-bold text-slate-700 block mb-1">客户痛点：</span>
                  <p className="text-slate-600 text-sm">海外平台回款结汇繁琐，汇率损失大，且国内主体面临 25% 的高额企业所得税。</p>
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-700 block mb-1">Solana Hainan 方案：</span>
                  <p className="text-slate-600 text-sm">在海南注册商贸公司并开立 FT 账户（自由贸易账户），将海南公司作为全球采购与结算中心。</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-sm font-bold text-[#14F195] flex items-center gap-1 mb-1"><Check className="w-4 h-4" /> 落地成果：</span>
                  <p className="text-slate-700 text-sm font-medium">实现多币种资金自由跨境秒级调拨，汇兑损益降低 40%。成功申请鼓励类产业认定，税率降至 15%。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Architecture Planner Section */}
      <section id="ai-planner" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#9945FF]/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-[#14F195] border border-slate-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" /> AI 赋能咨询引擎
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                AI 智能架构规划系统
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                不知道如何搭建出海架构？告诉我们您的业务形态，我们的 AI 专家系统将为您秒级生成初步的合规架构建议。
              </p>
              
              <form onSubmit={handleAiSubmit} className="space-y-5 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">您的所属行业</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-900 text-white focus:outline-none focus:border-[#9945FF]">
                    <option>Web3 / 区块链技术</option>
                    <option>跨境电商 / 国际贸易</option>
                    <option>游戏出海 / 泛娱乐</option>
                    <option>金融科技 / 投资机构</option>
                    <option>其他创新科技</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">核心诉求 (一句话描述)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-600 bg-slate-900 text-white focus:outline-none focus:border-[#9945FF] placeholder-slate-500" placeholder="例如：想发币，同时国内需要研发团队，如何合规？" required />
                </div>
                <button 
                  type="submit" 
                  disabled={isAiLoading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isAiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Bot className="w-5 h-5" />}
                  {isAiLoading ? 'AI 正在深度分析中...' : '生成专属架构方案'}
                </button>
              </form>
            </div>

            <div className="h-full min-h-[400px]">
              {aiResult ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full bg-white rounded-3xl p-8 text-slate-900 shadow-2xl relative overflow-hidden flex flex-col"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#14F195] blur-[80px] opacity-20"></div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-[#14F195]" />
                    </div>
                    <h3 className="text-xl font-bold">AI 架构建议报告</h3>
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-2xl p-6 border border-slate-100 overflow-y-auto">
                    <p className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium">{aiResult}</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <p className="text-sm text-slate-500 mb-4">* 此为 AI 初步建议，实际落地需结合具体法务与税务情况。</p>
                    <a href="#contact" className="w-full py-3 rounded-xl bg-slate-900 text-white font-medium flex items-center justify-center gap-2 hover:bg-[#9945FF] transition-colors">
                      预约人类专家深度解读 <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full bg-slate-800/30 rounded-3xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-6">
                    <Bot className="w-10 h-10 text-slate-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">等待输入指令</h3>
                  <p className="text-slate-400 max-w-sm">在左侧输入您的业务情况，AI 将在此处为您生成定制化的出海与落地架构建议。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet: Whitepaper Download */}
      <section id="whitepaper" className="py-20 bg-gradient-to-br from-[#9945FF]/10 to-[#14F195]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-white">
            <div className="md:w-2/5 bg-slate-900 p-10 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-overlay"></div>
              <FileText className="w-16 h-16 text-[#14F195] mb-6 relative z-10" />
              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">2026 海南自贸港</h3>
              <h4 className="text-xl text-slate-300 mb-6 relative z-10">Web3与离岸合规白皮书</h4>
              <ul className="space-y-3 text-sm text-slate-400 relative z-10">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#14F195]" /> 最新双15%税收政策解读</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#14F195]" /> RWA代币化实操路径</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#14F195]" /> 离岸账户开立避坑指南</li>
              </ul>
            </div>
            <div className="md:w-3/5 p-10 md:p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">免费获取内部绝密资料</h3>
              <p className="text-slate-600 mb-8">留下您的接收邮箱，系统将自动发送最新版 PDF 报告至您的邮箱。</p>
              <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-4">
                <input type="hidden" name="form_type" value="whitepaper_download" />
                <div>
                  <input type="text" name="name" placeholder="您的称呼" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50" required />
                </div>
                <div>
                  <input type="email" name="email" placeholder="接收邮箱" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50" required />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-[#9945FF] transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> 立即发送至我的邮箱
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">深度合作生态伙伴</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder for Partner Logos */}
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><Landmark className="w-8 h-8"/> 渣打银行</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><Landmark className="w-8 h-8"/> 汇丰银行</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><Scale className="w-8 h-8"/> 锦天城律所</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><Calculator className="w-8 h-8"/> 普华永道</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800"><Globe className="w-8 h-8"/> Solana 基金会</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">常见问题解答</h2>
            <p className="text-slate-600 text-lg">解答您在海南自贸港投资落地的核心疑虑</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl transition-all duration-200 overflow-hidden bg-white ${activeFaq === idx ? 'border-[#9945FF] shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <button 
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  <span className="font-bold text-lg pr-8 text-slate-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${activeFaq === idx ? 'rotate-180 text-[#9945FF]' : ''}`} />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Form Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#9945FF]/10 to-transparent pointer-events-none"></div>
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <div>
                <div className="mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">开启您的出海征程</h2>
                  <p className="text-lg text-slate-400">无论是注册公司、开立账户还是架构咨询，我们的专家团队随时待命。请填写表单，我们将在 1 个工作日内与您联系。</p>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                      <Send className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400 mb-1">Telegram 专线 (推荐)</p>
                      <a href="https://t.me/your_telegram_id" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-[#9945FF] transition-colors">@SolanaHainan_VIP</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 border border-green-500/30">
                      <QrCode className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400 mb-1">微信极速建联</p>
                      <p className="text-lg font-bold text-white">SolanaHainan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/30">
                      <MapPin className="w-6 h-6 text-[#9945FF]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400 mb-1">指挥部地址</p>
                      <p className="text-lg font-bold text-white">中国·海南省海口市<br/>龙华区自贸港核心商务区</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">业务下单 / 预约咨询</h3>
                <form className="space-y-5" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
                  <input type="hidden" name="form_type" value="business_inquiry" />
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">您的姓名 <span className="text-red-500">*</span></label>
                      <input type="text" name="name" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50" placeholder="张先生/女士" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">联系电话/TG <span className="text-red-500">*</span></label>
                      <input type="text" name="contact" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50" placeholder="手机号或Telegram" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">公司名称 (选填)</label>
                    <input type="text" name="company" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50" placeholder="您当前的企业名称" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">意向服务类型</label>
                    <select name="service_type" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 appearance-none">
                      <option>海南公司注册与落地</option>
                      <option>离岸 Web3 与 RWA 架构</option>
                      <option>多币种银行开户</option>
                      <option>财税筹划与政策申报</option>
                      <option>其他需求</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">具体需求描述</label>
                    <textarea name="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 resize-none" placeholder="请简述您的业务背景及想了解的具体政策..."></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#9945FF]/20">
                    提交咨询申请
                  </button>
                  <p className="text-sm text-slate-500 text-center mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> 您的信息将被严格保密
                  </p>
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
              <a href="#" className="hover:text-white transition-colors">隐私政策</a>
              <a href="#" className="hover:text-white transition-colors">服务条款</a>
              <a href="#" className="hover:text-white transition-colors">免责声明</a>
            </div>
          </div>
          <div className="text-center md:text-left text-sm border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} 海南省索拉纳商务咨询中心 (solana-hainan.com). 保留所有权利.</p>
            <p className="mt-2 md:mt-0">琼ICP备XXXXXXXX号-1</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a 
          href="https://t.me/your_telegram_id" 
          target="_blank" 
          rel="noreferrer"
          className="w-14 h-14 bg-[#0088cc] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform group relative"
        >
          <Send className="w-6 h-6 ml-[-2px] mt-[2px]" />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Telegram 专线
          </span>
        </a>
        <a 
          href="#contact" 
          className="w-14 h-14 bg-[#07C160] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform group relative"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            微信极速建联
          </span>
        </a>
      </div>
    </div>
  );
}
