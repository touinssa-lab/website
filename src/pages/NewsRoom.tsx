import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DataDashboard from "@/components/DataDashboard";
import CarbonCalculator from "@/components/CarbonCalculator";
import FestivalDashboard from "@/components/FestivalDashboard";
import { newsItems } from "@/data/newsData";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Leaf, 
  CloudAlert, 
  ClipboardList, 
  ExternalLink, 
  Calendar, 
  Tag, 
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import AntigravityBackground from "@/components/AntigravityBackground";

const surveys = [
  {
    id: 1,
    title: "한국 방문 외국인 관광객 설문조사",
    description: "한국을 방문한 주요 22개국 관광객의 여행 경험, 방문 이유, 언어 사용 및 선호 여행지에 대한 이해를 돕기 위한 설문조사입니다.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfY4ObULYKdey8-1j5mhDDzyu3ozPevbrjQ0JIQ4BlczRQCXw/viewform?usp=publish-editor",
    date: "상시 진행",
    status: "진행중",
  },
  {
    id: 2,
    title: "지역 맞춤형 관광 콘텐츠 선호도 조사",
    description: "관광 시장 활성화를 위해 가장 선호하는 맞춤형 방문 콘텐츠 유형을 조사합니다.",
    url: "#",
    date: "오픈 예정",
    status: "예정",
  }
];

const NewsRoom = () => {
  const [activeView, setActiveView] = useState<'data' | 'carbon' | 'festival'>('data');

  return (
    <div className="min-h-screen bg-background animate-fade-in relative overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="hero-gradient text-white py-14 md:py-20 relative overflow-hidden">
        <AntigravityBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-medium tracking-widest uppercase opacity-80 mb-4">Signals</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
              관광 산업의 최신 소식과<br />인사이트 기획 기사
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Section 1: Dashboard */}
        <section className="relative z-0">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">데이터 분석 및 기후위기 시뮬레이션</h2>
            
            {/* Toggle Nav */}
            <div className="flex justify-center mb-10 overflow-x-auto pb-4 custom-scrollbar w-full max-w-4xl">
              <div className="inline-flex items-center p-1.5 bg-muted/50 border border-border/40 rounded-xl backdrop-blur-sm min-w-max">
                <button
                  onClick={() => setActiveView('data')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                    activeView === 'data'
                      ? 'bg-background shadow-md text-primary scale-[1.02]'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  관광 데이터 분석 인사이트
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
                key="data"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <DataDashboard />
              </motion.div>
            )}
            {activeView === 'festival' && (
              <motion.div
                key="festival"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <FestivalDashboard />
              </motion.div>
            )}
            {activeView === 'carbon' && (
              <motion.div
                key="carbon"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="py-4"
              >
                <CarbonCalculator />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Section 2: Latest Planning Articles */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold font-serif">최신 기획 기사</h2>
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
                  <article className="glass-panel overflow-hidden border border-border/50 h-full flex flex-col rounded-2xl transition-all duration-300 hover:shadow-lg hover:border-accent/40 bg-card/40">
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

                      <div className="mt-auto pt-4 border-t border-border/50">
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
        </section>

        {/* Section 3: Survey */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold font-serif">설문조사 참여</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveys.map((survey) => (
              <a 
                key={survey.id}
                href={survey.url} 
                target={survey.url !== '#' ? "_blank" : undefined} 
                rel={survey.url !== '#' ? "noopener noreferrer" : undefined}
                className={`block group ${survey.url === '#' ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                <div className="p-8 rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-lg hover:border-accent/50 h-full flex flex-col relative overflow-hidden group-hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${survey.status === '진행중' ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                      {survey.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold font-serif mb-3 group-hover:text-primary transition-colors">
                    {survey.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-6 flex-1">
                    {survey.description}
                  </p>
                  
                  <div className="mt-auto pt-5 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">{survey.date}</span>
                    <div className={`flex items-center text-sm font-medium ${survey.status === '진행중' ? 'text-accent' : 'text-muted-foreground'}`}>
                      {survey.status === '진행중' ? '참여하기' : '준비중'}
                      {survey.status === '진행중' && (
                        <ExternalLink className="w-4 h-4 ml-1 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      )}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default NewsRoom;
