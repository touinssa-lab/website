import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ClipboardList, ExternalLink } from "lucide-react";
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
    title: "국내 여행 참여 실태 및 수요 전환 조사",
    description: "국민들의 국내 여행 참여 현황, 만족도, 여행 지출 변화 및 해외여행 수요의 국내 전환 실태를 파악하기 위한 설문입니다.",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSc6MTxDHoxrJEFniTJif5pCMpo2sYzYOAOvBcTo-QL5jLD5LQ/viewform?usp=header",
    date: "상시 진행",
    status: "진행중",
  }
];

const Survey = () => {
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
            <p className="text-lg font-bold tracking-wider uppercase text-sky-400 mb-4">SURVEY</p>
            <h1 className="text-3xl md:text-5xl font-semibold font-sans leading-relaxed drop-shadow-md max-w-3xl">
              관광산업의 인사이트
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <section id="surveys">
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

export default Survey;
