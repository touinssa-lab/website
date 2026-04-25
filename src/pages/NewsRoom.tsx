import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UNTourismDashboard from "@/components/UNTourismDashboard";
import CarbonCalculator from "@/components/CarbonCalculator";
import FestivalDashboard from "@/components/FestivalDashboard";
import TravelVolumeDashboard from "@/components/TravelVolumeDashboard";
import { newsItems } from "@/data/newsData";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Leaf, 
  CloudAlert, 
  Calendar, 
  Tag, 
  ChevronRight,
  LayoutDashboard,
  FileText,
  MapPin,
  Globe
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import AntigravityBackground from "@/components/AntigravityBackground";


const NewsRoom = () => {
  const location = useLocation();
  const [mainView, setMainView] = useState<'articles' | 'dashboard'>('articles');
  const [activeView, setActiveView] = useState<'data' | 'carbon' | 'festival' | 'travel'>('data');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const view = searchParams.get('view');
    if (view === 'dashboard') {
      setMainView('dashboard');
      
      const subView = searchParams.get('sub');
      if (subView === 'carbon') setActiveView('carbon');
      else if (subView === 'festival') setActiveView('festival');
      else if (subView === 'travel') setActiveView('travel');
      else if (subView === 'data') setActiveView('data');
    } else if (view === 'articles') {
      setMainView('articles');
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background animate-fade-in relative overflow-hidden">
      <Header />

      {/* Hero Section */}
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
        {/* Main Category Toggle */}
        <div className="flex justify-center mb-16">
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
              onClick={() => setMainView('dashboard')}
              className={`flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 ${
                mainView === 'dashboard'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-[1.05]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <LayoutDashboard className={`w-5 h-5 ${mainView === 'dashboard' ? 'text-sky-300' : 'text-muted-foreground'}`} />
              데이터분석 대시보드
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
              <div className="flex flex-col items-center mb-12">
                <h2 className="text-3xl font-bold font-serif underline-accent text-center">최신 기획 기사</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsItems.map((news, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={news.id}
                  >
                    <Link to={`/news/${news.id}`} className="block h-full group">
                      <article className="glass-panel overflow-hidden border border-border/80 h-full flex flex-col rounded-2xl transition-all duration-300 hover:shadow-2xl hover:border-accent/60 bg-card/70 shadow-sm">
                        {/* Thumbnail */}
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          {news.thumbnail ? (
                            <img 
                              src={news.thumbnail} 
                              alt={news.title}
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
                        </div>

                        {/* Content Container */}
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

                          <h2 className="text-xl font-bold mb-3 font-serif line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                            {news.title}
                          </h2>

                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-1">
                            {news.excerpt}
                          </p>

                          <div className="mt-auto pt-4 border-t border-border/80">
                            <span className="flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                              기사 자세히 보기
                              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <section className="relative z-0">
                <div className="flex flex-col items-center mb-12">
                  <h2 className="text-3xl font-bold mb-8 text-center underline-accent">데이터분석 대시보드</h2>
                  
                  {/* Toggle Nav */}
                  <div className="flex justify-center mb-4 overflow-x-auto pb-4 custom-scrollbar w-full max-w-4xl">
                    <div className="inline-flex items-center p-1.5 bg-muted/50 border border-border/40 rounded-xl backdrop-blur-sm min-w-max">
                        <button
                        onClick={() => setActiveView('data')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                          activeView === 'data'
                            ? 'bg-background shadow-md text-primary scale-[1.02]'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Globe className="w-4 h-4" />
                        UN Tourism 글로벌 리포트
                      </button>
                      <button
                        onClick={() => setActiveView('travel')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                          activeView === 'travel'
                            ? 'bg-background shadow-md text-sky-500 scale-[1.02]'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                        국민여행 총량 통계
                      </button>
                      <button
                        onClick={() => setActiveView('festival')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                          activeView === 'festival'
                            ? 'bg-background shadow-md text-indigo-500 scale-[1.02]'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <CloudAlert className="w-4 h-4" />
                        지역축제 기후위기 예측
                      </button>
                      <button
                        onClick={() => setActiveView('carbon')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                          activeView === 'carbon'
                            ? 'bg-background shadow-md text-accent scale-[1.02]'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Leaf className="w-4 h-4" />
                        여행 탄소 발자국 계산기
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                  {activeView === 'data' && (
                    <motion.div
                      key="sub-data"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="py-4"
                    >
                      <UNTourismDashboard />
                    </motion.div>
                  )}
                  {activeView === 'festival' && (
                    <motion.div
                      key="sub-festival"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="py-4"
                    >
                      <FestivalDashboard />
                    </motion.div>
                  )}
                  {activeView === 'carbon' && (
                    <motion.div
                      key="sub-carbon"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="py-3"
                    >
                      <CarbonCalculator />
                    </motion.div>
                  )}
                  {activeView === 'travel' && (
                    <motion.div
                      key="sub-travel"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="py-2"
                    >
                      <TravelVolumeDashboard />
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default NewsRoom;
