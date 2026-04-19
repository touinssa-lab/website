import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Eye, Users, Award, BarChart3, Globe, Lightbulb, TrendingUp, Map, PenTool } from "lucide-react";
import AntigravityBackground from "@/components/AntigravityBackground";

const values = [
  { icon: Target, title: "데이터 기반 의사결정", desc: "데이터와 AI 기술을 활용하여 객관적이고 정확한 분석을 제공합니다." },
  { icon: Eye, title: "지역 중심 관점", desc: "지역의 고유한 자원과 매력을 발견하고 브랜드화하여 지속 가능한 관광을 만듭니다." },
  { icon: Users, title: "협력적 파트너십", desc: "고객과의 긴밀한 소통을 통해 맞춤형 솔루션을 제공합니다." },
  { icon: Award, title: "전문성과 신뢰", desc: "관광 산업 전문가로서 축적된 경험과 노하우를 바탕으로 최고의 결과를 만듭니다." },
];

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

const Company = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />

      {/* Hero */}
      <section className="hero-gradient text-white py-14 md:py-20 relative overflow-hidden">
        <AntigravityBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-sm font-medium tracking-widest uppercase opacity-80 mb-4">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
            관광의 미래를 데이터로 설계합니다
          </h1>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About */}
        <section className="py-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold">About Us</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              데이터로 관광의 미래를 진단하고, 전략으로 지역의 성장을 설계합니다.
              투어리즘인사이트는 관광 정책 컨설팅과 고도화된 빅데이터 분석을 결합하여 최적의 해법을 제시하는 관광 전략 파트너입니다. 우리는 지역 사회와 관광 유관 기관이 변화하는 환경 속에서 지속 가능한 성장 동력을 확보할 수 있도록 정교한 맞춤형 솔루션을 지원합니다.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              단순한 현상 분석을 넘어, 최신 트렌드와 다층적 데이터를 기반으로 여행자의 수요와 행동 패턴을 예측합니다. 이를 통해 지역 경제에 실질적으로 기여할 수 있는 실행 가능한 전략을 도출하고, 관광 자원을 효율적으로 관리할 수 있는 독보적인 인사이트를 제공합니다.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden animate-scale-in">
            <img
              src="/visual_01.jpg"
              alt="Tourism Insight office"
              className="w-full h-80 object-cover"
            />
          </div>
        </section>

        {/* Vision */}
        <section className="py-12 border-t border-border">
          <div className="text-center w-[90%] md:w-[70%] mx-auto mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              데이터 기반 의사결정을 통해 지역 특성에 맞는 최적화된 관광 전략을 수립하고,
              AI 플랫폼을 통해 맞춤형 콘텐츠 생성 및 직관적 시각화 데이터를 제공하여
              관광 산업의 지속 가능한 발전을 이끕니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`p-6 rounded-2xl bg-card border border-border animate-slide-up stagger-${Math.min(index + 1, 4)}`}
              >
                <value.icon className="h-8 w-8 text-accent mb-3" />
                <h3 className="text-2xl font-bold mb-2 font-serif">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="py-12 border-t border-border" id="services">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              관광 산업의 모든 단계를 함께합니다
            </p>
          </div>
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid md:grid-cols-5 gap-8 p-8 md:p-10 rounded-2xl bg-card border border-border animate-slide-up stagger-${Math.min(index + 1, 6)}`}
              >
                <div className="md:col-span-2 space-y-4">
                  <service.icon className="h-12 w-12 text-accent" />
                  <h2 className="text-2xl font-bold font-serif">{service.title}</h2>
                  <p className="text-sm font-medium text-accent">{service.subtitle}</p>
                </div>
                <div className="md:col-span-3 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Company;
