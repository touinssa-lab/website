import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Globe, Lightbulb, TrendingUp, Map, PenTool, Database, FileText, LayoutDashboard, MoreHorizontal, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { newsItems as staticNewsItems, NewsArticle } from "@/data/newsData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import AntigravityBackground from "@/components/AntigravityBackground";
import { useAuth } from "@/hooks/useAuth";
import { PanelRegistrationModal } from "@/components/survey/PanelRegistrationModal";
import { Lock } from "lucide-react";
import PanelAccessNoticeModal from "@/components/survey/PanelAccessNoticeModal";

const services = [
  { icon: Map, title: "Local Branding", desc: "지역 고유의 매력을 브랜드로 구축합니다", path: "/intelligence#services" },
  { icon: TrendingUp, title: "Signals Analysis", desc: "관광 트렌드의 변화를 분석하고 예측합니다", path: "/intelligence#services" },
  { icon: BarChart3, title: "Data & AI", desc: "데이터와 AI 기반 인사이트를 제공합니다", path: "/intelligence#services" },
  { icon: Lightbulb, title: "Market Insights", desc: "시장 동향과 경쟁 환경을 분석합니다", path: "/intelligence#services" },
  { icon: Globe, title: "Strategic Planning", desc: "지속 가능한 관광 전략을 수립합니다", path: "/intelligence#services" },
  { icon: PenTool, title: "Infographic Design", desc: "데이터를 직관적으로 시각화합니다", path: "/intelligence#services" },
];

const Index = () => {
  const { panelInfo } = useAuth();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentDashIndex, setCurrentDashIndex] = useState(0);
  const [currentPersonaIndex, setCurrentPersonaIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch news from Supabase
  const { data: newsItems = [] } = useQuery({
    queryKey: ['news_articles_main'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('date', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      
      return (data || []).map(item => ({
        id: item.article_id,
        category: item.category,
        title: item.title,
        date: item.date,
        thumbnail: item.thumbnail,
        excerpt: item.excerpt,
        contentBlocks: item.content_blocks,
        visibility: item.visibility || 'all'
      })) as NewsArticle[];
    }
  });

  const dashboards = [
    { name: 'UN Tourism 글로벌 리포트', image: '/dash_un_tourism.png' },
    { name: '국민여행 총량 통계', image: '/dash_travel_volume.png' },
    { name: '지역축제 기후위기 예측', image: '/dash_festival_climate.png' },
    { name: '여행 탄소 발자국 계산기', image: '/dash_carbon_footprint.png' }
  ];

  const personas = [
    {
      id: 1,
      image: "/ai-guides/persona_30f.png",
      name: "부산광역시 가이드",
      location: "부산 연제구",
      info: "33세 · 영업원",
      quote: "반갑습니데이! 우리 동네에 대해 궁금한 거 있으면 뭐든 물어보세요!"
    },
    {
      id: 2,
      image: "/ai-guides/persona_40f.png",
      name: "서울특별시 가이드",
      location: "서울 송파구",
      info: "43세 · 기업 임원",
      quote: "안녕하세요! 송파에서 가족들과 진짜 자주 가는 곳들 알려드릴까요?"
    },
    {
      id: 3,
      image: "/ai-guides/persona_50m.png",
      name: "제주특별자치도 가이드",
      location: "제주 서귀포",
      info: "58세 · 감귤 농장",
      quote: "혼저옵서예! 제주 현지인들만 아는 숨은 명소들 제가 다 알려드릴게요."
    },
    {
      id: 4,
      image: "/ai-guides/persona_30m.png",
      name: "전라남도 가이드",
      location: "전남 여수시",
      info: "35세 · 카페 사장",
      quote: "여수 밤바다도 좋지만, 현지인들만 가는 찐 맛집 골목 알려드릴까요?"
    },
    {
      id: 5,
      image: "/ai-guides/persona_20f.png",
      name: "강원특별자치도 가이드",
      location: "강원 속초시",
      info: "24세 · 프리랜서",
      quote: "속초의 푸른 바다가 보이는 조용한 카페에서 힐링하고 가세요!"
    }
  ];

  useEffect(() => {
    if (newsItems.length === 0) return;
    const newsInterval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 4500);
    return () => clearInterval(newsInterval);
  }, [newsItems.length]);

  useEffect(() => {
    const dashInterval = setInterval(() => {
      setCurrentDashIndex((prev) => (prev + 1) % dashboards.length);
    }, 3800);
    return () => clearInterval(dashInterval);
  }, [dashboards.length]);

  useEffect(() => {
    const personaInterval = setInterval(() => {
      setCurrentPersonaIndex((prev) => (prev + 1) % personas.length);
    }, 5000);
    return () => clearInterval(personaInterval);
  }, [personas.length]);

  return (
    <div className="min-h-screen bg-background animate-fade-in focus:outline-none">
      <Header />

      {/* Hero Section */}
      <section className="relative hero-gradient text-white overflow-hidden">
        <AntigravityBackground />

        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear", repeatType: "reverse" }}
            className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)",
              backgroundSize: "200% 200%"
            }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <p className="text-xl font-bold tracking-wider uppercase text-sky-400">TURNING SIGNALS INTO INTELLIGENCE</p>
              <h1 className="text-4xl md:text-6xl font-semibold font-sans leading-relaxed drop-shadow-md">
                관광의 모든 <span className="text-amber-400">시그널</span>을,<br />
                <span className="text-amber-400">인텔리전스</span>로 바꿉니다.
              </h1>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl">
                흩어진 데이터와 현장의 움직임을 결합하여<br className="hidden sm:block" />
                최적의 의사결정을 돕는 관광 인텔리전스를 만듭니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/intelligence"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[hsl(0_0%_100%/0.15)] backdrop-blur-sm border border-[hsl(0_0%_100%/0.25)] font-medium hover:bg-[hsl(0_0%_100%/0.25)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:scale-105"
                >
                  인텔리전스 살펴보기 <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[hsl(var(--hero-gradient-start))] font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 transition-all"
                >
                  문의하기
                </Link>
              </div>
            </motion.div>

            {/* AI Persona SNS Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:flex flex-col items-center justify-center h-full relative"
            >
              <div className="relative w-full max-w-[440px] aspect-[1/0.95] [perspective:1000px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPersonaIndex}
                    initial={{ opacity: 0, rotateY: 15, x: 20 }}
                    animate={{ opacity: 1, rotateY: 0, x: 0 }}
                    exit={{ opacity: 0, rotateY: -15, x: -20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 bg-white/75 dark:bg-zinc-900/75 backdrop-blur-xl rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2),0_0_20px_rgba(79,70,229,0.1)] overflow-hidden border border-white/60 dark:border-white/10 ring-2 ring-indigo-500/20 flex flex-col"
                  >
                    {/* Card Body */}
                    <div className="flex-1 px-8 pt-6 flex flex-col relative z-20">
                      {/* Main Title Section (Moved to Top) */}
                      <div className="mb-3">
                        <h2 className="text-[22px] font-sans font-black leading-tight mb-2 tracking-tight bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                          로컬 친구를 만나보세요
                        </h2>
                        <p className="text-[15px] text-zinc-500 leading-relaxed font-semibold">
                          700만 한국형 AI 페르소나가 들려주는 진짜 우리 동네 이야기
                        </p>
                      </div>

                      {/* Card Header / Profile Section (Moved below Title) */}
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-[3px] rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 shadow-xl">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-zinc-900 bg-white">
                              <img src={personas[currentPersonaIndex].image} alt="" className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <h3 className="font-extrabold text-zinc-900 dark:text-white leading-none text-lg">{personas[currentPersonaIndex].name}</h3>
                            <div className="flex items-center gap-1.5 text-zinc-500 font-bold text-[13px]">
                              <span>{personas[currentPersonaIndex].location}</span>
                              <span className="w-1 h-1 rounded-full bg-zinc-300" />
                              <span>{personas[currentPersonaIndex].info}</span>
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          LIVE
                        </div>
                      </div>

                      {/* Quote Box Section */}
                      <div className="relative mt-2 mb-4">
                        {/* Speech Bubble Tail */}
                        {/* Speech Bubble Tail - Refined alignment to center of persona photo */}
                        <div className="absolute -top-3 left-[34px] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[15px] border-b-amber-100 dark:border-b-amber-800/60 z-10" />
                        
                        <div className="bg-amber-100 dark:bg-amber-900/50 p-5 rounded-2xl rounded-tl-sm relative border border-amber-200/50 dark:border-amber-500/30 shadow-sm">
                          <p className="text-[15px] font-semibold text-amber-900 dark:text-amber-200 italic leading-relaxed text-center">
                            "{personas[currentPersonaIndex].quote}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="p-6 pt-0">
                      <button 
                        onClick={() => navigate('/ai-guide')}
                        className="group relative w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-base flex items-center justify-center gap-3 overflow-hidden shadow-xl hover:shadow-[0_15px_35px_-10px_rgba(79,70,229,0.5)] transition-all duration-300 active:scale-[0.98] border border-white/10"
                      >
                        {/* Shine Effect Animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_infinite]" />
                        
                        <MessageCircle className="w-5 h-5 fill-white/20" />
                        <span>동네 친구 만나기</span>

                        <style dangerouslySetInnerHTML={{ __html: `
                          @keyframes shine {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(100%); }
                          }
                        `}} />
                      </button>

                      {/* Compact Progress Bar (Moved to requested position) */}
                      <div className="mt-4 w-3/5 mx-auto flex gap-1.5">
                        {personas.map((_, idx) => (
                          <div key={idx} className="h-[2px] flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: currentPersonaIndex === idx ? "100%" : currentPersonaIndex > idx ? "100%" : "0%" }}
                              transition={{ duration: currentPersonaIndex === idx ? 5 : 0.3, ease: "linear" }}
                              className="h-full bg-indigo-600"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-center">
                        <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest italic">AI Lab • Recommended</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Background decorative elements */}
                <div className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] border border-white/10 rounded-full border-dashed mix-blend-overlay -z-10" />
                <div className="absolute bottom-[5%] left-[-15%] w-24 h-24 bg-amber-400/20 rounded-full blur-2xl -z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Links Section */}
        <section className="relative mt-12 mb-6 z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Card News Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl bg-sky-50/50 dark:bg-sky-900/10 backdrop-blur-xl border border-sky-200/50 dark:border-sky-500/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500">
                      <FileText size={18} />
                    </div>
                    <span className="text-base font-bold font-sans">최신 기획 기사</span>
                  </div>
                  <MoreHorizontal size={18} className="text-muted-foreground" />
                </div>
                
                <div className="relative h-32 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {newsItems.length > 0 ? (
                      <motion.div
                        key={currentNewsIndex}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        {(() => {
                          const news = newsItems[currentNewsIndex];
                          const displayThumbnail = news.thumbnail || 
                            (news.contentBlocks || []).find(b => b.type === 'image' && b.value)?.value;

                          const handleNewsClick = (e: React.MouseEvent) => {
                            e.preventDefault();
                            navigate('/news');
                          };

                          return (
                            <Link 
                              to={`/news/${news.id}`} 
                              onClick={handleNewsClick}
                              className="flex gap-4 items-center h-full group/card"
                            >
                              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-md relative">
                                <img 
                                  src={displayThumbnail} 
                                  alt="" 
                                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/logo4.png';
                                    (e.target as HTMLImageElement).className = 'w-1/2 h-1/2 m-auto mt-[10%] object-contain opacity-20';
                                  }}
                                />
                                {news.visibility === 'panel' && (
                                  <div className="absolute top-2 left-2 z-10">
                                    <div className="flex items-center gap-1 px-2.5 py-1 bg-rose-600/80 backdrop-blur-lg border border-white/20 text-white text-[10px] font-extrabold rounded-full shadow-xl tracking-wider">
                                      <Lock className="w-3 h-3 fill-white/20" />
                                      패널전용
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-lg md:text-xl font-bold font-sans mb-2 line-clamp-1 group-hover/card:text-sky-600 transition-colors">
                                  {news.title}
                                </h4>
                                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                  {news.excerpt}
                                </p>
                              </div>
                            </Link>
                          );
                        })()}
                      </motion.div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        소식을 불러오는 중입니다...
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                
                <Link to="/news" className="mt-6 pt-4 border-t border-sky-200/30 dark:border-sky-500/10 flex items-center justify-between text-sm font-medium text-sky-600 dark:text-sky-400 group/footer">
                  <span>전체 기사 보기</span>
                  <ArrowRight size={14} className="group-hover/footer:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Dashboard Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group overflow-hidden rounded-2xl bg-amber-50/50 dark:bg-amber-900/10 backdrop-blur-xl border border-amber-200/50 dark:border-amber-500/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                      <LayoutDashboard size={18} />
                    </div>
                    <span className="text-base font-bold font-sans">데이터분석 대시보드</span>
                  </div>
                  <MoreHorizontal size={18} className="text-muted-foreground" />
                </div>
                
                <div className="relative h-32 flex flex-col justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDashIndex}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -100, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Link to="/news?view=dashboard" className="flex gap-4 items-center h-full group/dash">
                        <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shadow-md">
                          <img 
                            src={dashboards[currentDashIndex].image} 
                            alt="" 
                            className="w-full h-full object-cover group-hover/dash:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-lg md:text-xl font-bold font-sans text-amber-700 dark:text-amber-400 mb-2 group-hover/dash:translate-x-1 transition-transform line-clamp-1">
                            {dashboards[currentDashIndex].name}
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                            관광 산업의 핵심 지표를 실시간 시각화 데이터로 분석합니다.
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <Link to="/news?view=dashboard" className="mt-6 pt-4 border-t border-amber-200/30 dark:border-amber-500/10 flex items-center justify-between text-sm font-medium text-amber-600 dark:text-amber-400 group/footer">
                  <span>대시보드 바로가기</span>
                  <ArrowRight size={14} className="group-hover/footer:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Intro */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="pt-8 pb-10 md:pt-12 md:pb-14 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            관광의 미래를 여는<br className="hidden md:block" />
            데이터 중심의 맞춤형 컨설팅
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            단순한 분석을 넘어, 지역 경제와 관광 산업의 장기적인 성장을 견인할 수 있도록<br className="hidden md:block" />
            실행 가능하고 지속 가능한 마스터플랜을 세워드립니다.
          </p>
        </motion.section>

        {/* Services Grid */}
        <section className="pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sans">Our Services</h2>
            <Link to="/intelligence#services" className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
              전체 보기 <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={service.path}
                  className="block h-full group p-8 rounded-2xl glass-card hover:border-accent/50 card-hover"
                >
                  <service.icon className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2 font-sans group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 rounded-2xl hero-gradient p-10 md:p-12 text-center text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold drop-shadow-sm">함께 성장하는 파트너</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              다층적 데이터 분석부터 심층 전략 수립까지,<br />차세대 관광 산업의 성장 로드맵을 함께 완성합니다.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-[hsl(var(--hero-gradient-start))] font-bold hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
            >
              프로젝트 문의하기 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
      
      <PanelRegistrationModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      
      <PanelAccessNoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onConfirm={() => {
          setIsNoticeModalOpen(false);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
};

export default Index;
