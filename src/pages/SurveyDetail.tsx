import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TravelSurvey from "@/components/survey/TravelSurvey";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const SurveyDetail = () => {
  const { id } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // In a real app, fetch survey details based on ID
  const surveyTitle = id === 'national-travel' ? '국내 여행 참여 실태 조사' : '설문조사';

  return (
    <div className="min-h-screen bg-[#f8fafc] animate-fade-in flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/survey" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            목록으로 돌아가기
          </Link>
          <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            진행중
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 md:p-10">
          <div className="border-b border-border/60 pb-6 mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold font-serif mb-2">{surveyTitle}</h1>
            <p className="text-muted-foreground text-sm">
              본 조사는 통계법 제33조에 의해 비밀이 보장되며, 통계 작성 목적 외에는 사용되지 않습니다.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* The TravelSurvey component will handle the multi-step logic internally */}
            <TravelSurvey surveyMonth="2026년 4월" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SurveyDetail;
