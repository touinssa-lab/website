import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TravelSurvey from "@/components/survey/TravelSurvey";
import { ArrowLeft, ClipboardList } from "lucide-react";
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
          <div className="max-w-2xl mx-auto py-12 text-center">
            <ClipboardList className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-800 mb-4">설문조사 준비중입니다.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              현재 해당 설문조사는 준비 중이거나 기간이 종료되었습니다.<br />
              새로운 설문조사가 오픈되면 당신의 경험을 남겨 주세요.
            </p>
            <Link 
              to="/survey" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all"
            >
              다른 설문조사 보기
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SurveyDetail;
