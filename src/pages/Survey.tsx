import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ClipboardList, ExternalLink, UserPlus, Gift, Clock, ShieldCheck } from "lucide-react";
import AntigravityBackground from "@/components/AntigravityBackground";
import { PanelRegistrationModal } from "@/components/survey/PanelRegistrationModal";
import { PreSurveyInfoModal } from "@/components/survey/PreSurveyInfoModal";

const surveys = [
  {
    id: 1,
    title: "국내 여행 참여 실태 및 수요 전환 조사",
    description: "국민들의 국내 여행 참여 현황, 만족도, 여행 지출 변화 및 해외여행 수요의 국내 전환 실태를 파악하기 위한 설문입니다.",
    url: "/survey/national-travel",
    date: "상시 진행",
    status: "진행중",
    category: "국내여행실태",
    estimatedTime: "15문항 (약 3분)",
    requireBasicInfo: true,
    requirePhone: false,
    image: "/images/bright_tourism.png"
  }
];

const Survey = () => {
  const navigate = useNavigate();
  const { user, panelInfo, loading } = useAuth();

  const [isPanelModalOpen, setIsPanelModalOpen] = useState(false);
  const [isPreSurveyModalOpen, setIsPreSurveyModalOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<typeof surveys[0] | null>(null);

  // Auto-open modal to step 3 if user is logged in but hasn't completed panel registration
  useEffect(() => {
    if (!loading && user && !panelInfo) {
      setIsPanelModalOpen(true);
    }
  }, [user, panelInfo, loading]);

  const isLoggedInPanel = !!panelInfo;

  const handleSurveyClick = (survey: typeof surveys[0], e: React.MouseEvent) => {
    e.preventDefault();
    
    if (survey.url === '#') return;

    if (isLoggedInPanel) {
      // User is already panel, open survey directly
      navigate(survey.url);
    } else {
      // User is not panel, show Pre-Survey modal
      setSelectedSurvey(survey);
      setIsPreSurveyModalOpen(true);
    }
  };

  const startSurvey = () => {
    if (selectedSurvey) {
      setIsPreSurveyModalOpen(false);
      navigate(selectedSurvey.url);
    }
  };

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
            <p className="text-lg font-bold tracking-wider uppercase text-sky-400 mb-4">SURVEY & RESEARCH</p>
            <h1 className="text-3xl md:text-5xl font-semibold font-sans leading-relaxed drop-shadow-md max-w-3xl">
              관광산업 인사이트 연구 조사
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Panel Registration Section */}
        <section className="mb-24">
          <div className="bg-white border border-primary/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-primary/5 relative overflow-hidden">
            {/* Decorative background element - kept simple */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl z-0" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm">
                  <UserPlus className="w-4 h-4" />
                  <span>설문조사 패널 상시 모집</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-serif leading-tight">
                  당신의 경험이 <br className="hidden md:block"/> 한국 관광의 미래를 만듭니다.
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl">
                  투어리즘인사이트의 조사 패널이 되어주세요. 설문에 참여하실 때마다 특별한 리워드와 최신 관광 트렌드 리포트를 보내드립니다.
                </p>
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">안전한 정보보호</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">참여 리워드 지급</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 w-full md:w-auto">
                {isLoggedInPanel ? (
                  <div className="w-full md:w-auto px-10 py-5 rounded-2xl bg-primary/10 text-primary font-bold text-lg flex items-center justify-center gap-3 border-2 border-primary/20 shadow-lg shadow-primary/5 animate-pulse-subtle">
                    <div className="bg-primary text-primary-foreground p-1 rounded-full">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    패널 가입 완료
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsPanelModalOpen(true)}
                    className="w-full md:w-auto px-8 py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-3"
                  >
                    <UserPlus className="w-6 h-6" />
                    1분 만에 패널 가입하기
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Surveys Section */}
        <section id="surveys">
          <div className="mb-10">
            <h2 className="text-3xl font-bold font-serif mb-3">설문조사 참가</h2>
            <p className="text-muted-foreground">현재 진행 중인 리서치 프로젝트입니다.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {surveys.map((survey) => (
              <div 
                key={survey.id}
                onClick={(e) => handleSurveyClick(survey, e as any)}
                className={`block group cursor-pointer ${survey.url === '#' ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                <div className="rounded-2xl bg-card border border-border transition-all duration-300 hover:shadow-xl hover:border-primary/40 overflow-hidden flex flex-col h-full group-hover:-translate-y-1">
                  {/* Image Cover */}
                  <div className="h-48 w-full relative overflow-hidden bg-muted">
                    <img 
                      src={survey.image} 
                      alt={survey.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary text-primary-foreground backdrop-blur-md">
                        {survey.category}
                      </span>
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md ${survey.status === '진행중' ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                        {survey.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold font-serif mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {survey.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {survey.description}
                    </p>
                    
                    <div className="mt-auto space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-4 rounded-xl">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{survey.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Gift className="w-4 h-4" />
                          <span>{survey.requirePhone ? '리워드 지급' : '참여 감사'}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-muted-foreground">기간: {survey.date}</span>
                        <div className={`flex items-center font-bold ${survey.status === '진행중' ? 'text-primary' : 'text-muted-foreground'}`}>
                          {survey.status === '진행중' ? '참여하기' : '준비중'}
                          {survey.status === '진행중' && (
                            <ExternalLink className="w-5 h-5 ml-1 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modals */}
      <PanelRegistrationModal 
        isOpen={isPanelModalOpen} 
        onOpenChange={setIsPanelModalOpen} 
      />
      
      {selectedSurvey && (
        <PreSurveyInfoModal
          isOpen={isPreSurveyModalOpen}
          onOpenChange={setIsPreSurveyModalOpen}
          surveyTitle={selectedSurvey.title}
          requirePhone={selectedSurvey.requirePhone}
          onStartSurvey={startSurvey}
        />
      )}

      <Footer />
    </div>
  );
};

export default Survey;
