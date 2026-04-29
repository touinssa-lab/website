import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SurveyThankYou = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold font-serif">참여해주셔서 감사합니다!</h1>
          
          <p className="text-muted-foreground text-lg">
            소중한 의견이 정상적으로 제출되었습니다.<br/>
            보내주신 답변은 한국 관광산업 발전을 위한 귀중한 자료로 활용될 것입니다.
          </p>

          <div className="pt-8">
            <Button asChild size="lg" className="w-full sm:w-auto font-bold rounded-xl h-14 px-8 text-lg">
              <Link to="/survey">
                다른 설문 확인하기
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SurveyThankYou;
