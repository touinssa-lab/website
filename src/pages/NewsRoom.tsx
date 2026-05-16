import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsItems as staticNewsItems, NewsArticle } from "@/data/newsData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { 
  Zap,
  Cpu,
  BarChart3, 
  Leaf, 
  CloudAlert, 
  Calendar, 
  Tag, 
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  TrendingUp,
  FileText,
  MapPin,
  Globe,
  Sparkles,
  Bot,
  ArrowUpRight,
  ArrowUp,
  Search,
  Filter
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AntigravityBackground from "@/components/AntigravityBackground";
import { PanelRegistrationModal } from "@/components/survey/PanelRegistrationModal";
import PanelAccessNoticeModal from "@/components/survey/PanelAccessNoticeModal";
import { Lock, UserPlus, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { webTrendKeywords, insightCards } from "@/data/aiHotKeywords";
import { naverNewsData } from "@/data/naverNewsData";
import { naverNewsDataAI } from "@/data/naverNewsDataAI";
import StockMarketTrends from "@/components/StockMarketTrends";

const NewsRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, panelInfo } = useAuth();
  const [mainView, setMainView] = useState<'articles' | 'trends' | 'stocks'>('articles');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialStep, setModalInitialStep] = useState(1);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [newsTab, setNewsTab] = useState<'tourism' | 'ai'>('tourism');
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>("2026-05-16");
  
  // DB에서 데이터가 있는 가장 최신 날짜 가져오기
  const { data: latestDate } = useQuery({
    queryKey: ['latest_trend_date'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_trends_keywords')
        .select('target_date')
        .order('target_date', { ascending: false })
        .limit(1);
      if (error) throw error;
      return data?.[0]?.target_date || "2026-05-16";
    }
  });

  // 최신 날짜가 로드되면 초기값으로 설정
  useEffect(() => {
    if (latestDate) {
      setSelectedDate(latestDate);
    }
  }, [latestDate]);

  const dateInputRef = useRef<HTMLInputElement>(null);
  const itemsPerPage = 9;

  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (error) {
        dateInputRef.current.focus();
      }
    }
  };

  // --- Supabase Trends Data Queries ---
  const { data: trendKeywords = [], isLoading: isKeywordsLoading } = useQuery({
    queryKey: ['trend_keywords', selectedDate],
    queryFn: async () => {


      const { data, error } = await supabase
        .from('news_trends_keywords')
        .select('*')
        .eq('target_date', selectedDate)
        .order('rank', { ascending: true });
      if (error) throw error;
      
      const filtered = (data || []).filter(item => 
        !['에이전틱 AI', '초개인화 여정', '디지털 휴머니티', '에이전틱 AI 여정', 'Digital Humanity', 'Agentic AI'].includes(item.keyword)
      );
      
      const dataToProcess = filtered;
      const sectionOrder = ['여행', '관광', '축제', '행사', '공연', '호텔', '항공', '맛집', '크루즈'];
      
      const normalizeSection = (s: string) => {
        if (s === '미식') return '맛집';
        if (s === '공항') return '항공';
        return s;
      };

      const uniqueKeywords = (dataToProcess || []).reduce((acc: any[], current: any) => {
        const currentSection = normalizeSection(current.section);
        const x = acc.find(item => item.keyword === current.keyword && normalizeSection(item.section) === currentSection);
        if (!x) {
          return acc.concat([{ ...current, section: currentSection }]);
        } else {
          return acc;
        }
      }, []);

      const sortedData = uniqueKeywords.sort((a: any, b: any) => {
        const indexA = sectionOrder.indexOf(a.section);
        const indexB = sectionOrder.indexOf(b.section);
        
        if (indexA !== indexB) return indexA - indexB;
        return a.rank - b.rank;
      });

      let lastSection = '';
      let currentRank = 0;
      const reRankedData = sortedData.map((item: any) => {
        if (item.section !== lastSection) {
          lastSection = item.section;
          currentRank = 1;
        } else {
          currentRank++;
        }
        return { ...item, displayRank: currentRank };
      });
      
      return reRankedData;
    },
    enabled: mainView === 'trends'
  });

  const { data: trendInsights = [], isLoading: isInsightsLoading } = useQuery({
    queryKey: ['trend_insights', selectedDate],
    queryFn: async () => {


      const { data, error } = await supabase
        .from('news_trends_insights')
        .select('*')
        .eq('target_date', selectedDate);
      if (error) throw error;
      
      const unique = (data || []).reduce((acc: any[], current: any) => {
        const x = acc.find(item => item.keyword === current.keyword);
        if (!x) return acc.concat([current]);
        return acc;
      }, []);
      
      return unique;
    },
    enabled: mainView === 'trends'
  });

  const { data: trendArticles = [], isLoading: isTrendArticlesLoading } = useQuery({
    queryKey: ['trend_articles', selectedDate, newsTab],
    queryFn: async () => {


      const category = newsTab === 'tourism' ? 'Tourism News' : 'AI & Data';
      const { data, error } = await supabase
        .from('news_trends_articles')
        .select('*')
        .eq('target_date', selectedDate)
        .eq('category', category);
      if (error) throw error;
      
      const uniqueData = (data || []).reduce((acc, current) => {
        const x = acc.find(item => item.title === current.title);
        if (!x) return acc.concat([current]);
        return acc;
      }, [] as any[]);
      
      return uniqueData;
    },
    enabled: mainView === 'trends'
  });

  useEffect(() => {
    if (mainView !== 'trends' || trendKeywords.length === 0) return;
    const interval = setInterval(() => {
      setStartIndex(prev => (prev + 10 >= trendKeywords.length ? 0 : prev + 10));
    }, 5000);
    return () => clearInterval(interval);
  }, [mainView, trendKeywords]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const view = searchParams.get('view');
    if (view === 'trends') {
      setMainView('trends');
    } else if (view === 'articles') {
      setMainView('articles');
    } else if (view === 'stocks') {
      setMainView('stocks');
    }
  }, [location]);

  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['news_articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('article_id', { ascending: false });
      
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
      })).sort((a, b) => Number(b.id) - Number(a.id)) as NewsArticle[];
    }
  });

  return (
    <div className="min-h-screen bg-background animate-fade-in relative overflow-hidden">
      <Header />

      <section className="hero-gradient text-white min-h-[200px] md:min-h-[260px] flex items-center relative overflow-hidden">
        <AntigravityBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg font-bold tracking-wider uppercase text-sky-400 mb-4">Signals</p>
            <h1 className="text-3xl md:text-5xl font-semibold font-sans leading-relaxed drop-shadow-md max-w-3xl">
              관광 산업의 최신 소식과<br />인사이트 기획 기사
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex justify-center mb-10">
          <div className="flex p-1.5 bg-muted/60 backdrop-blur-md rounded-2xl border border-border/40 shadow-xl">
            <button
              onClick={() => setMainView('articles')}
              className={`flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 ${
                mainView === 'articles'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-[1.05]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <FileText className={`w-5 h-5 ${mainView === 'articles' ? 'text-sky-300' : 'text-muted-foreground'}`} />
              최신 기획 기사
            </button>
            <button
              onClick={() => setMainView('trends')}
              className={`flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 ${
                mainView === 'trends'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-[1.05]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <TrendingUp className={`w-5 h-5 ${mainView === 'trends' ? 'text-sky-300' : 'text-muted-foreground'}`} />
              AI 트렌드&뉴스
            </button>
            <button
              onClick={() => setMainView('stocks')}
              className={`flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 ${
                mainView === 'stocks'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-[1.05]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <BarChart3 className={`w-5 h-5 ${mainView === 'stocks' ? 'text-sky-300' : 'text-muted-foreground'}`} />
              Stock Market Trends
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mainView === 'articles' ? (
            <motion.div
              key="articles-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center justify-center gap-6 mb-12 bg-white/50 backdrop-blur-sm pt-4 md:pt-6 px-6 md:px-8 pb-6 md:pb-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex flex-col gap-2 text-center">
                  <h2 className="text-3xl font-bold font-sans underline-accent">최신 기획 기사</h2>
                  <p className="text-muted-foreground text-base">투어리즘인사이트가 분석한 관광 산업의 전문 기획 기사입니다.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10">
                  <div className="text-center sm:text-left">
                    <p className="text-[15px] font-semibold text-slate-900 leading-snug">
                      {panelInfo ? "최신 기획 기사 인텔리전스 리포트를 이용 중입니다" : "최신 기획 기사는 회원에게만 제공되는 기획 리포트입니다"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {panelInfo ? "회원님을 위한 맞춤형 기획 기사를 확인해 보세요" : "로그인하시거나 1분 간편 회원가입해 주세요"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {panelInfo ? (
                      <>
                        <div className="flex items-center gap-2 px-5 py-2.5 bg-sky-50 text-sky-600 text-sm font-bold rounded-full border border-sky-100 shadow-sm">
                          <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                          로그인 중
                        </div>
                        <button 
                          onClick={async () => { 
                            await supabase.auth.signOut(); 
                            window.location.reload(); 
                          }}
                          className="whitespace-nowrap px-5 py-2.5 bg-rose-50 text-rose-600 text-sm font-bold rounded-full hover:bg-rose-100 transition-all border border-rose-100 shadow-sm"
                        >
                          로그아웃
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          onClick={() => { setModalInitialStep(1); setIsModalOpen(true); }}
                          className="whitespace-nowrap px-6 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/10"
                        >
                          1분 간편 회원가입
                        </button>
                        <button 
                          onClick={() => { setModalInitialStep(2); setIsModalOpen(true); }}
                          className="whitespace-nowrap px-6 py-3 bg-white text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all hover:scale-105 border border-slate-200 shadow-sm"
                        >
                          로그인하기
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(newsItems || []).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((news, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      key={news.id}
                    >
                      {(() => {
                        const firstImageBlock = (news.contentBlocks || []).find(b => b.type === 'image' && b.value);
                        const displayThumbnail = news.thumbnail || firstImageBlock?.value;
                        const isRestricted = news.visibility === 'panel' && !panelInfo;

                        const handleArticleClick = (e: React.MouseEvent) => {
                          if (isRestricted) {
                            e.preventDefault();
                            setIsNoticeModalOpen(true);
                          }
                        };

                        return (
                          <Link 
                            to={`/news/${news.id}`} 
                            onClick={handleArticleClick}
                            className="block h-full group"
                          >
                            <article className="glass-panel overflow-hidden border border-border/80 h-full flex flex-col rounded-2xl transition-all duration-300 hover:shadow-2xl hover:border-accent/60 bg-card/70 shadow-sm relative">
                              <div className="relative aspect-video overflow-hidden bg-muted">
                                {displayThumbnail ? (
                                  <img 
                                    src={displayThumbnail} 
                                    alt={news.title}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/logo4.png';
                                      (e.target as HTMLImageElement).className = 'w-1/2 h-1/2 m-auto mt-[10%] object-contain opacity-20';
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                                    <span className="text-muted-foreground">No Image</span>
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                                
                                {news.visibility === 'panel' && (
                                  <div className="absolute top-4 left-4 z-20">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/80 backdrop-blur-lg border border-white/20 text-white text-[11px] font-extrabold rounded-full shadow-2xl tracking-wider">
                                      <Lock className="w-3.5 h-3.5 fill-white/20" />
                                      회원전용기사
                                    </div>
                                  </div>
                                )}
                              </div>
      
                              <div className="p-6 md:p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                                  <div className="flex items-center gap-1.5 text-accent">
                                    <Tag className="w-3.5 h-3.5" />
                                    {news.category}
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {news.date}
                                  </div>
                                </div>
 
                                <h2 className="text-xl font-bold mb-3 font-sans line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                                  {news.title}
                                </h2>
 
                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-1">
                                  {news.excerpt}
                                </p>
 
                                <div className="mt-auto pt-4 border-t border-border/80">
                                  <span className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                                    {isRestricted ? "패널 등록 후 읽기" : "기사 자세히 보기"}
                                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                  </span>
                                </div>
                              </div>
                            </article>
                          </Link>
                        );
                      })()}
                    </motion.div>
                  ))}
                  </div>

                  {/* Pagination UI */}
                  {(newsItems || []).length > itemsPerPage && (
                    <div className="flex justify-center items-center gap-2 mt-16">
                      <button
                        onClick={() => {
                          setCurrentPage(prev => Math.max(prev - 1, 1));
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      {Array.from({ length: Math.ceil((newsItems || []).length / itemsPerPage) }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className={`w-10 h-10 rounded-lg border font-bold transition-all ${
                            currentPage === pageNum
                              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                              : 'border-border bg-card text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          setCurrentPage(prev => Math.min(prev + 1, Math.ceil((newsItems || []).length / itemsPerPage)));
                          window.scrollTo({ top: 400, behavior: 'smooth' });
                        }}
                        disabled={currentPage === Math.ceil((newsItems || []).length / itemsPerPage)}
                        className="p-2 rounded-lg border border-border bg-card hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ) : mainView === 'trends' ? (
            <motion.div
              key="trends-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <section className="relative z-0">
                <div className="flex flex-col items-center pt-4 md:pt-6 mb-12">
                  <h2 className="text-3xl font-bold font-sans mb-2 text-center underline-accent">AI 트렌드&뉴스</h2>
                  <p className="text-muted-foreground text-center font-medium mb-8">AI 에이전트가 선정한 Google Trends 키워드와 주요 관광 산업계 뉴스입니다.</p>

                  {/* Archive Search Bar - Enhanced Dark Theme */}
                  <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-4 bg-slate-900/95 backdrop-blur-2xl border border-white/10 p-4 rounded-[1.5rem] shadow-2xl shadow-primary/20 animate-slide-up relative overflow-hidden group">
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/30 transition-colors"></div>
                    
                    {/* Left Branding Label */}
                    <div className="hidden lg:flex flex-col items-start pl-6 pr-8 border-r border-white/10 relative z-10 shrink-0">
                      <span className="text-white/50 text-[12px] font-bold tracking-tight mb-0.5">투어리즘인사이트</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-white text-2xl font-extrabold leading-none tracking-tight">아카이브</span>
                      </div>
                    </div>

                    <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-4 relative z-10">
                      <div 
                        onClick={handleCalendarClick}
                        className="flex-1 w-full flex items-center gap-3 px-5 py-3.5 bg-white/5 rounded-xl border border-white/10 shadow-inner group/date cursor-pointer hover:bg-white/10 transition-all relative z-10"
                      >
                      <Calendar className="w-5 h-5 text-sky-400 group-hover/date:scale-110 transition-transform" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-sky-300/60 uppercase tracking-widest leading-none mb-1.5">Archive Date</span>
                        <input 
                          ref={dateInputRef}
                          type="date" 
                          value={selectedDate}
                          min="2026-05-09"
                          max={latestDate || "2026-05-16"}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="bg-transparent border-none p-0 text-sm font-bold text-white focus:ring-0 cursor-pointer w-full [color-scheme:dark]"
                        />
                      </div>
                    </div>
                    
                    <div className="w-px h-10 bg-white/10 hidden sm:block relative z-10"></div>
 
                    <div className="flex-1 flex items-center gap-3 px-5 py-3.5 bg-white/5 rounded-xl border border-white/10 shadow-inner group/search relative z-10 opacity-60">
                      <Search className="w-5 h-5 text-slate-500 group-hover/search:scale-110 transition-transform" />
                      <div className="flex flex-col w-full">
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest leading-none mb-1.5">Keyword Search</span>
                        <input 
                          type="text" 
                          readOnly
                          placeholder="DB 검색은 준비중 입니다"
                          className="bg-transparent border-none p-0 text-sm font-bold text-white/40 focus:ring-0 placeholder:text-slate-500 w-full cursor-not-allowed"
                        />
                      </div>
                    </div>
 
                    <button 
                      disabled
                      className="bg-slate-800 text-slate-500 p-4 rounded-xl shadow-none cursor-not-allowed relative z-10 border border-white/5 opacity-50"
                    >
                      <Filter className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-20">
                  <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 font-sans">AI Hot Keyword</h3>
                        <p className="text-sm text-muted-foreground font-medium">실시간 트렌드 및 데이터 분석 기반 주요 키워드</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-[45%] flex flex-col gap-4">
                      <div className="flex items-center gap-2 mb-2 px-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <h4 className="text-lg font-bold text-slate-800 font-sans">
                          Today Top Rankings <span className="font-normal text-slate-400 text-sm ml-1">({selectedDate})</span>
                        </h4>
                      </div>
                      <div className="bg-white/50 backdrop-blur-md border border-slate-100 rounded-[1.5rem] p-8 shadow-sm h-full">
                        <div className="flex items-center text-sm font-semibold text-slate-500 border-b border-slate-300 pb-3 mb-4 px-2">
                          <div className="w-24 flex items-center justify-center gap-3">
                            <span>섹션</span>
                            <span className="min-w-[1.5rem] text-center">순위</span>
                          </div>
                          <div className="flex-1 text-left px-2 flex items-center gap-2">
                            <span>검색어</span>
                            <button 
                              onClick={() => setStartIndex(prev => (prev + 10 >= trendKeywords.length ? 0 : prev + 10))}
                              className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-md text-[10px] font-bold transition-all group/btn"
                            >
                              <span>다음 순위 보기</span>
                              <ChevronRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                            </button>
                          </div>
                          <div className="w-32 text-center text-xs">Increase percent</div>
                        </div>
                        
                        <div className="relative h-[520px] overflow-hidden">
                          {isKeywordsLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                          ) : trendKeywords.length > 0 ? (
                            <AnimatePresence mode="popLayout">
                              <motion.div
                                key={`${startIndex}-${selectedDate}`}
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -40, opacity: 0 }}
                                transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                                className="absolute inset-0 w-full flex flex-col gap-0"
                              >
                                {trendKeywords.slice(startIndex, startIndex + 10).map((item) => {
                                  const sectionNames = ['여행', '관광', '축제', '행사', '공연', '호텔', '항공', '맛집', '크루즈'];
                                  const isAlternate = sectionNames.indexOf(item.section) % 2 === 1;
                                  const isSpecial = item.section === '크루즈';
                                  
                                  let badgeStyle = isAlternate 
                                    ? 'text-indigo-700 bg-indigo-50 border-indigo-100' 
                                    : 'text-teal-700 bg-teal-50 border-teal-100';
                                  
                                  if (isSpecial) {
                                    badgeStyle = 'text-blue-700 bg-blue-50 border-blue-200 shadow-sm';
                                  }

                                  return (
                                    <div key={item.id} className="flex items-center py-3 px-2 rounded-xl hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group">
                                      <div className="w-24 flex items-center justify-center gap-3 font-bold transition-colors">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                                          {item.section}
                                        </span>
                                        <span className="text-slate-400 group-hover:text-primary min-w-[1.5rem] text-center">
                                          {item.displayRank}
                                        </span>
                                      </div>
                                      <div className="flex-1 font-bold text-slate-800 text-[15px] truncate px-2">
                                        {item.keyword}
                                      </div>
                                      <div className="w-32 flex items-center justify-center gap-1.5">
                                        <ArrowUp className="w-3.5 h-3.5 text-slate-800" strokeWidth={3} />
                                        <span className="text-[15px] font-bold text-slate-800 tracking-tight">{item.change}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </motion.div>
                            </AnimatePresence>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
                              <CloudAlert className="w-10 h-10 opacity-20" />
                              <p className="text-sm font-medium">선택하신 날짜의 데이터가 없습니다.</p>
                            </div>
                          )}
                        </div>

                        <div className="mt-1 pt-3 border-t border-slate-300">
                          <ul className="text-[11px] text-slate-400 space-y-1.5 leading-relaxed font-medium">
                            <li className="flex gap-2 items-start">
                              <span className="shrink-0">•</span>
                              <span>데이터 출처 : Google 트렌드 키워드 탐색</span>
                            </li>
                            <li className="flex gap-2 items-start">
                              <span className="shrink-0">•</span>
                              <span>검색어 기준 : 여행, 관광, 축제, 행사, 공연, 호텔, 항공, 맛집, 크루즈 섹션의 급상승 키워드</span>
                            </li>
                            <li className="flex gap-2 items-start">
                              <span className="shrink-0">•</span>
                              <span>AI 키워드 선정 방식 : Tourism을 기준으로 정책/행정, 경제/지역, 사회/인구, 테크/디지털, 환경/기후, 의료/웰니스, 미디어/콘텐츠, 모빌리티/교통, 유통/식음료, 노동/교육 총 10개 산업군별 연관 키워드(총 50개)와 매칭되는 Google 트렌드 급상승 키워드를 인공지능 알고리즘으로 추출</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-[55%] flex flex-col gap-4">
                      <div className="flex items-center gap-2 mb-2 px-2">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        <h4 className="text-lg font-bold text-slate-800 font-sans">
                          AI Selected Insights <span className="font-normal text-slate-400 text-sm ml-1">(Today Top Rankings 에서 선정한 키워드)</span>
                        </h4>
                      </div>
                      
                      <div className="bg-white/50 backdrop-blur-md border border-slate-100 rounded-[1.5rem] p-8 shadow-sm h-full">
                        {isInsightsLoading ? (
                          <div className="flex flex-col gap-4">
                            {[1, 2].map(i => (
                              <div key={i} className="h-40 bg-slate-100/50 animate-pulse rounded-2xl"></div>
                            ))}
                          </div>
                        ) : trendInsights.length > 0 ? (
                          <div className="space-y-4">
                            {trendInsights.map((card, index) => (
                              <motion.div
                                key={card.id || index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/80 border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:border-indigo-200 group relative overflow-hidden"
                              >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl -mr-8 -mt-8 group-hover:bg-indigo-500/10 transition-colors"></div>
                                
                                <div className="flex justify-between items-start mb-2 relative z-10">
                                  <h5 className="text-[17px] font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors">
                                    #{card.keyword}
                                  </h5>
                                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                                    card.type === 'analysis'
                                      ? 'bg-blue-50 text-blue-500' 
                                      : 'bg-purple-50 text-purple-500'
                                  }`}>
                                    {card.type === 'analysis' ? '데이터 매칭' : (card.type === 'unique' ? '독특한 트렌드' : 'TREND')}
                                  </span>
                                </div>
                                
                                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-2 relative z-10">
                                  <Tag className="w-3 h-3" />
                                  <span>{card.category}</span>
                                </div>
                                
                                <p className="text-[13px] text-slate-600 leading-relaxed font-medium relative z-10">
                                  {card.reason || card.description}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full py-10 bg-slate-50/50 rounded-[1.5rem] border border-dashed border-slate-200 text-muted-foreground">
                            <p className="text-xs font-bold">인사이트 정보가 없습니다.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-border/60 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-inner border border-indigo-100">
                        <Bot className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">AI Hot News</h3>
                        <p className="text-sm text-muted-foreground font-medium mt-0.5">AI에이전트가 선정하고 요약한 오늘의 핫뉴스</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-1.5 bg-muted/60 rounded-2xl border border-border/40">
                      <span className="hidden md:block pl-4 pr-2 text-xs font-bold text-muted-foreground whitespace-nowrap">
                        분야별 뉴스를 확인하세요!
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setNewsTab('tourism')}
                          className="px-6 py-2.5 text-sm font-extrabold rounded-xl transition-all hover:bg-white/50 data-[active=true]:bg-white data-[active=true]:shadow-md data-[active=true]:text-primary"
                          data-active={newsTab === 'tourism'}
                        >
                          Tourism News
                        </button>
                        <button
                          onClick={() => setNewsTab('ai')}
                          className="px-6 py-2.5 text-sm font-extrabold rounded-xl transition-all hover:bg-white/50 data-[active=true]:bg-white data-[active=true]:shadow-md data-[active=true]:text-primary"
                          data-active={newsTab === 'ai'}
                        >
                          AI & Data
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                    {isTrendArticlesLoading ? (
                      [1, 2, 3, 4].map(i => (
                        <div key={i} className="h-[400px] bg-slate-50 animate-pulse rounded-2xl"></div>
                      ))
                    ) : trendArticles.length > 0 ? (
                      trendArticles.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (idx % 10) * 0.1 }}
                          className="group bg-white/70 backdrop-blur-md border border-slate-100 p-8 md:p-10 rounded-2xl hover:shadow-2xl transition-all hover:border-primary/20 bg-card flex flex-col"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <span className={`px-4 py-1.5 ${item.category === 'Tourism News' ? 'bg-sky-100 text-sky-700' : 'bg-primary/10 text-primary'} text-[10px] font-black rounded-full uppercase tracking-tighter`}>
                                {item.category}
                              </span>
                              <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-bold">
                                <Tag className="w-3.5 h-3.5" />
                                {item.tag}
                              </span>
                            </div>
                            <span className="text-xs text-slate-400 font-bold">{item.target_date}</span>
                          </div>
                          
                          <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight font-sans">
                            {item.title}
                          </h4>
                          
                          <div className="flex items-center gap-1.5 mb-5 text-indigo-600 bg-indigo-50/80 w-fit px-2.5 py-1 rounded-md border border-indigo-100/50">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-extrabold tracking-tight">AI 요약 기사</span>
                          </div>

                          <div className="mb-8 flex-1">
                            {item.thumbnail && (
                              <div className="relative float-left w-36 h-28 md:w-40 md:h-32 mr-5 mb-2 rounded-xl overflow-hidden bg-muted shadow-sm border border-slate-100">
                                <img 
                                  src={item.thumbnail} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                              </div>
                            )}
                            <p className="text-[15px] text-muted-foreground leading-relaxed">
                              {item.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                            <span className="text-[15px] font-extrabold text-slate-900">{item.press}</span>
                            <a 
                              href={item.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs font-black text-accent hover:underline group/btn"
                            >
                              언론사 기사원문 읽기
                              <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </a>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-full py-20 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-muted-foreground">
                        <Bot className="w-12 h-12 mb-4 opacity-10" />
                        <p className="font-bold">선택하신 날짜와 카테고리에 해당하는 뉴스가 없습니다.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-20 p-10 bg-slate-900 text-white rounded-[1.75rem] flex flex-col lg:flex-row items-center gap-10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32 rounded-full group-hover:bg-primary/30 transition-all duration-700"></div>
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shrink-0 relative overflow-hidden group/icon">
                    <svg className="absolute inset-0 w-full h-full opacity-30 text-sky-400" viewBox="0 0 80 80">
                      <path d="M40 0 v15 M40 65 v15 M0 40 h15 M65 40 h15 M15 15 l10 10 M55 55 l10 10 M15 65 l10 -10 M55 25 l10 -10" stroke="currentColor" strokeWidth="1" fill="none" />
                      <circle cx="40" cy="15" r="1.5" fill="currentColor" />
                      <circle cx="40" cy="65" r="1.5" fill="currentColor" />
                      <circle cx="15" cy="40" r="1.5" fill="currentColor" />
                      <circle cx="65" cy="40" r="1.5" fill="currentColor" />
                    </svg>
                    <Cpu className="w-10 h-10 text-sky-400 relative z-10 group-hover/icon:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 text-center lg:text-left relative z-10">
                    <h4 className="text-2xl font-bold mb-2">'AI 트렌드&뉴스' 시스템</h4>
                    <p className="text-slate-400 leading-relaxed font-medium">
                      현재 제공되는 AI 트렌드&뉴스 콘텐츠는 AI에이전트를 사용하여 일일 배치 시스템을 통해 자동 생성되는 자료입니다.<br />
                      AI 데이터 수집과 분석, 알고리즘에 의한 핵심 키워드 추출과 내용 요약 생성 사례를 보여 주기 위한 자료이며, 샘플링된 원문 기사의 저작권은 각 언론사에 있습니다.
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="stocks-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <StockMarketTrends />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
      
      <PanelRegistrationModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        initialStep={modalInitialStep}
      />

      <PanelAccessNoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onConfirm={() => {
          setIsNoticeModalOpen(false);
          setModalInitialStep(1);
          setIsModalOpen(true);
        }}
        onLogin={() => {
          setIsNoticeModalOpen(false);
          setModalInitialStep(2);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
};

export default NewsRoom;
