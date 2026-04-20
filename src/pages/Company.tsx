import Header from "@/components/Header";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { Target, Eye, Users, Award } from "lucide-react";
import AntigravityBackground from "@/components/AntigravityBackground";

const values = [
  { icon: Target, title: "데이터 기반 의사결정", desc: "데이터와 AI 기술을 활용하여 객관적이고 정확한 분석을 제공합니다." },
  { icon: Eye, title: "지역 중심 관점", desc: "지역의 고유한 자원과 매력을 발견하고 브랜드화하여 지속 가능한 관광을 만듭니다." },
  { icon: Users, title: "협력적 파트너십", desc: "고객과의 긴밀한 소통을 통해 맞춤형 솔루션을 제공합니다." },
  { icon: Award, title: "전문성과 신뢰", desc: "관광 산업 전문가로서 축적된 경험과 노하우를 바탕으로 최고의 결과를 만듭니다." },
];

const Company = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />

      {/* Hero */}
      <section className="hero-gradient text-white min-h-[200px] md:min-h-[260px] flex items-center relative overflow-hidden">
        <AntigravityBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg font-bold tracking-wider uppercase text-sky-400 mb-4">About Us</p>
            <h1 className="text-3xl md:text-5xl font-semibold font-sans leading-relaxed drop-shadow-md max-w-3xl">
              관광의 미래를 데이터로 설계합니다
            </h1>
          </motion.div>
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
        <section className="py-12 border-t border-border mb-20">
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
      </main>

      <Footer />
    </div>
  );
};

export default Company;
