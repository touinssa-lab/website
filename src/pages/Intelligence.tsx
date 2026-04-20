import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { BarChart3, Globe, Lightbulb, TrendingUp, Map, PenTool } from "lucide-react";
import AntigravityBackground from "@/components/AntigravityBackground";

const services = [
  {
    icon: Map,
    title: "Local Branding",
    subtitle: "지역 브랜딩",
    desc: "지역의 고유한 자원과 매력을 반영한 목적지 관리 전략을 수립해 관광 산업의 지속 가능성을 높입니다. 지역사회와의 협력을 통해 강력한 관광 브랜드를 구축하고, 방문자 경험을 강화하는 포괄적인 솔루션을 제공합니다.",
    features: ["지역 자원 발굴 및 브랜드 전략", "관광 콘텐츠 기획 및 개발", "지역사회 참여형 관광 모델 구축"],
  },
  {
    icon: TrendingUp,
    title: "Signals Analysis",
    subtitle: "시그널 분석",
    desc: "관광 산업의 최신 트렌드를 분석하고, 변화하는 시장 환경에 대한 심층적인 인사이트를 제공합니다. 국내외 관광 동향을 모니터링하고, 미래 전략 수립을 위한 기초 자료를 제공합니다.",
    features: ["국내외 관광 트렌드 모니터링", "소비자 행동 패턴 분석", "미래 관광 시장 예측"],
  },
  {
    icon: BarChart3,
    title: "Data & AI Analysis",
    subtitle: "데이터·AI 분석",
    desc: "데이터 분석을 통해 여행자 수요와 행동을 예측하고, 관광 자원을 효과적으로 관리할 수 있는 인사이트를 제공합니다. AI 플랫폼을 통해 맞춤형 콘텐츠 생성 및 직관적 시각화 데이터를 제공합니다.",
    features: ["관광 데이터 수집 및 분석", "AI 기반 수요 예측 모델", "맞춤형 데이터 시각화"],
  },
  {
    icon: Lightbulb,
    title: "Market Insights",
    subtitle: "시장 인사이트",
    desc: "관광 시장의 경쟁 환경과 기회 요인을 분석하여, 전략적 의사결정에 필요한 핵심 정보를 제공합니다. 시장 세분화와 타겟 분석을 통해 효과적인 마케팅 전략을 수립합니다.",
    features: ["경쟁 환경 및 벤치마킹 분석", "시장 세분화 및 타겟 분석", "마케팅 ROI 분석"],
  },
  {
    icon: Globe,
    title: "Strategic Planning",
    subtitle: "전략 수립",
    desc: "지역 경제와 관광 산업의 장기적 성장을 위한 실행 가능한 전략을 수립합니다. 데이터 기반 의사결정을 통해 지역 특성에 맞는 최적화된 관광 전략을 제안합니다.",
    features: ["관광 발전 마스터플랜 수립", "지역 관광 정책 컨설팅", "실행 로드맵 및 KPI 설계"],
  },
  {
    icon: PenTool,
    title: "Infographic Design",
    subtitle: "인포그래픽 디자인",
    desc: "복잡한 데이터와 분석 결과를 직관적이고 매력적인 시각 자료로 변환합니다. 보고서, 프레젠테이션, 홍보 자료 등 다양한 형태의 인포그래픽을 제작합니다.",
    features: ["데이터 시각화 디자인", "보고서 및 프레젠테이션 디자인", "홍보 자료 및 콘텐츠 제작"],
  },
];

const Intelligence = () => {
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
            <p className="text-lg font-bold tracking-wider uppercase text-sky-400 mb-4">Intelligence</p>
            <h1 className="text-3xl md:text-5xl font-semibold font-sans leading-relaxed drop-shadow-md max-w-3xl">
              데이터 기반 인텔리전스 서비스
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <section className="mb-20 text-center max-w-3xl mx-auto animate-slide-up">
          <h2 className="text-3xl font-bold mb-6">Our Intelligence Services</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            데이터 기반의 정교한 분석과 혁신적인 전략 수립을 통해 <br />
            관광 산업의 새로운 미래를 제시합니다.
          </p>
        </section>

        {/* Services */}
        <section id="services" className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grid md:grid-cols-12 gap-2 p-8 md:p-10 rounded-2xl bg-card border border-border hover:border-accent/40 transition-all duration-300"
            >
              <div className="md:col-span-4 space-y-4">
                <service.icon className="h-12 w-12 text-accent" />
                <h2 className="text-3xl font-bold font-serif text-primary dark:text-sky-400 leading-tight drop-shadow-sm">{service.title}</h2>
                <p className="text-base font-medium text-accent">{service.subtitle}</p>
              </div>
              <div className="md:col-span-8 space-y-5">
                <p className="text-lg font-bold text-foreground/90 leading-relaxed">{service.desc}</p>
                <ul className="space-y-1.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-base">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Intelligence;
