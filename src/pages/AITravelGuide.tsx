import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Sparkles, Bot, BarChart as BarChartIcon, Ship, LayoutGrid } from "lucide-react";
import MarineDashboard from "@/components/MarineDashboard";
import AntigravityBackground from "@/components/AntigravityBackground";
import AIGuideChat from "@/components/AIGuideChat";

const translations = {
  ko: {
    heroTitle: <>로컬 친구가 들려주는,<br /><span className="text-sky-600">우리 동네 이야기</span></>,
    heroSubtitle: "한국형 AI 페르소나가 지역의 숨은 매력을 전해 드립니다.",
    analysisData: "분석 데이터: Nemotron-Personas-Korea 700만 건",
    curationTitle: "700만 명의 한국형 AI 페르소나로 설계한 지역 맞춤형 여행 큐레이션",
    curationDesc: <>골목의 단골집부터 동네 사람만 아는 숨겨진 맛집까지,<br />진짜 지역의 이야기를 들려드립니다.</>,
    guideTitle: "로컬 AI 여행가이드",
    analysisTitle: "Data & AI Analysis",
  }
};

const AITravelGuide = () => {
  const [searchParams] = useSearchParams();
  const initialView = searchParams.get('view') === 'analysis' ? 'analysis' : 'guide';
  const [mainView, setMainView] = useState<'guide' | 'analysis'>(initialView);
  const [activeAnalysis, setActiveAnalysis] = useState<'marine'>('marine');

  useEffect(() => {
    const view = searchParams.get('view');
    setMainView(view === 'analysis' ? 'analysis' : 'guide');
  }, [searchParams]);

  const t = translations.ko;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <section className="hero-gradient text-white min-h-[200px] md:min-h-[260px] flex items-center relative overflow-hidden">
        <AntigravityBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-lg font-bold tracking-wider uppercase text-sky-400 mb-4 font-sans">AI LAB</p>
            <h1 className="text-3xl md:text-5xl font-semibold font-serif leading-relaxed drop-shadow-md max-w-4xl">
              데이터와 생성형 AI가 제안하는<br />관광 산업의 미래 인사이트
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-16 font-sans">
          <div className="inline-flex p-1.5 bg-muted/50 backdrop-blur-md rounded-2xl border border-border/50 shadow-inner">
            <button
              onClick={() => setMainView('guide')}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-xl transition-all duration-300 ${mainView === 'guide'
                  ? 'bg-[#255282] text-white shadow-lg font-bold scale-[1.02]'
                  : 'text-muted-foreground hover:text-foreground font-medium'
                }`}
            >
              <Bot className="w-5 h-5" />
              {translations.ko.guideTitle}
            </button>
            <button
              onClick={() => setMainView('analysis')}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-xl transition-all duration-300 ${mainView === 'analysis'
                  ? 'bg-[#255282] text-white shadow-lg font-bold scale-[1.02]'
                  : 'text-muted-foreground hover:text-foreground font-medium'
                }`}
            >
              <BarChartIcon className="w-5 h-5" />
              {translations.ko.analysisTitle}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mainView === 'guide' ? (
            <motion.div key="guide-view" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
              <div style={{ backgroundColor: '#fbfcf9' }} className="rounded-[40px] py-10 md:py-12 px-10 md:px-16 mb-12 relative overflow-hidden shadow-sm border border-sky-100/50">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, #e0f2fe, #f0f9ff 50%, #fbfcf9 70%)' }} />
                <div className="relative z-10 max-w-3xl">
                  <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl mb-3 tracking-tight leading-tight font-serif text-slate-800 font-black">
                    {t.heroTitle}
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-600 mb-6 font-medium">
                    {t.heroSubtitle}
                  </motion.p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    <div className="bg-white/90 backdrop-blur-sm border border-sky-200/50 rounded-full px-5 py-2 flex items-center gap-2.5 shadow-sm">
                      <Database className="w-4 h-4 text-sky-500" />
                      <span className="text-[13px] font-bold text-slate-700">{t.analysisData}</span>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm border border-sky-200/50 rounded-full px-5 py-2 flex items-center gap-2.5 shadow-sm">
                      <Sparkles className="w-4 h-4 text-sky-500" />
                      <span className="text-[13px] font-bold text-slate-700">Powered by NVIDIA</span>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start border-l-4 border-sky-400 pl-6 py-2 bg-sky-50/30 rounded-r-2xl max-w-2xl">
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-slate-800 mb-1">{t.curationTitle}</h4>
                      <div className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">{t.curationDesc}</div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full hidden lg:block opacity-90 pointer-events-none">
                  <img src="/images/local_hero.png" alt="Neighborhood Illustration" className="w-full h-full object-contain object-right" />
                </div>
              </div>

              {/* 공통 챗봇 컴포넌트 호출 (일반 사용자용: 질문 제한 활성) */}
              <AIGuideChat isUnlimited={false} />
            </motion.div>
          ) : (
            <motion.div key="analysis-view" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <button
                  onClick={() => setActiveAnalysis('marine')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${activeAnalysis === 'marine' ? 'bg-primary text-white border-primary shadow-lg' : 'bg-card text-muted-foreground border-border hover:border-primary/50'}`}
                >
                  <Ship className="w-4 h-4" />
                  해양 관광 콘텐츠 AI
                </button>
                <button disabled className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border border-dashed border-border text-muted-foreground/50 cursor-not-allowed">
                  <LayoutGrid className="w-4 h-4" />
                  Coming Soon
                </button>
              </div>
              {activeAnalysis === 'marine' && <MarineDashboard />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default AITravelGuide;
