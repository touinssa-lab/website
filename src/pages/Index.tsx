import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Globe, Lightbulb, TrendingUp, Map, PenTool, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AntigravityBackground from "@/components/AntigravityBackground";

const services = [
  { icon: Map, title: "Local Branding", desc: "지역 고유의 매력을 브랜드로 구축합니다", path: "/intelligence#services" },
  { icon: TrendingUp, title: "Signals Analysis", desc: "관광 트렌드의 변화를 분석하고 예측합니다", path: "/intelligence#services" },
  { icon: BarChart3, title: "Data & AI", desc: "데이터와 AI 기반 인사이트를 제공합니다", path: "/intelligence#services" },
  { icon: Lightbulb, title: "Market Insights", desc: "시장 동향과 경쟁 환경을 분석합니다", path: "/intelligence#services" },
  { icon: Globe, title: "Strategic Planning", desc: "지속 가능한 관광 전략을 수립합니다", path: "/intelligence#services" },
  { icon: PenTool, title: "Infographic Design", desc: "데이터를 직관적으로 시각화합니다", path: "/intelligence#services" },
];

const Index = () => {
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
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

            {/* Floating Data Dashboard Visuals */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:flex flex-col items-end justify-center h-full relative"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="glass-panel p-8 rounded-2xl w-full max-w-sm text-foreground dark:text-white shadow-2xl relative z-20"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-border/30 pb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Database className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight mb-1">대한민국 관광 지표</h3>
                    <p className="text-xs text-muted-foreground">Korea Tourism Data Lab</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] font-bold text-black dark:text-white">내국인 방문자수</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-medium">(외지인)전년동기대비</span>
                      <span className="text-[15px] text-red-500 dark:text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded">▲5.8%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] font-bold text-black dark:text-white">방한 외래객수</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-medium">전년동기대비</span>
                      <span className="text-[15px] text-red-500 dark:text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded">▲19.6%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] font-bold text-black dark:text-white">내국인 관광소비</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-medium">(외지인)전년동기대비</span>
                      <span className="text-[15px] text-red-500 dark:text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded">▲4.7%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] font-bold text-black dark:text-white">외국인 관광소비</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-medium">전년동기대비</span>
                      <span className="text-[15px] text-red-500 dark:text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded">▲23.9%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] font-bold text-black dark:text-white">관광사업체수</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-medium">전년동기대비</span>
                      <span className="text-[15px] text-red-500 dark:text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded">▲11.8%</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative nodes */}
              <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] border border-white/10 rounded-full border-dashed mix-blend-overlay animate-[spin_60s_linear_infinite] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-20 md:py-28 text-center max-w-4xl mx-auto"
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
            <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
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
                  <h3 className="text-xl font-bold mb-2 font-serif group-hover:text-primary transition-colors">{service.title}</h3>
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
          className="mb-20 rounded-2xl hero-gradient p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold drop-shadow-sm">함께 성장하는 파트너</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              다층적 데이터 분석부터 심층 전략 수립까지, 차세대 관광 산업의 성장 로드맵을 함께 완성합니다.
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
    </div>
  );
};

export default Index;
