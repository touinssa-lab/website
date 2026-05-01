import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, CheckCircle2, Loader2, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

interface PanelRegistrationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const REGIONS = [
  "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
  "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
];

const OCCUPATIONS = [
  "무직", "학생(초중고생)", "대학·대학원생", "경영·인사·사무",
  "금융·보험", "연구·공학·기술", "교육·법률", "정부·지자체·관공서",
  "경찰·소방·군인", "사회·복지", "보건·의료", "예술·디자인",
  "방송·뉴미디어", "영업·마케팅·컨설팅", "운송·운전", "건설·인프라",
  "IT·개발·데이터", "기타"
];

export const PanelRegistrationModal = ({ isOpen, onOpenChange }: PanelRegistrationModalProps) => {
  const { user, panelInfo, loading: authLoading, signInWithGoogle, signInWithKakao, signInWithFacebook } = useAuth();
  const [step, setStep] = useState(1);
  const [agree, setAgree] = useState<boolean | "indeterminate">(false);
  const { toast } = useToast();

  // Form states
  const [gender, setGender] = useState("male");
  const [birthYear, setBirthYear] = useState("");
  const [region, setRegion] = useState("");
  const [job, setJob] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-forward to step 3 if user is logged in but has no panel info
  useEffect(() => {
    if (isOpen && !authLoading && user) {
      if (!panelInfo) {
        setStep(3);
      } else {
        // User already has panel info, shouldn't be here really, but just in case
        onOpenChange(false);
      }
    } else if (isOpen && step === 3 && !user) {
      // If modal opened but no user, reset to step 1
      setStep(1);
    }
  }, [isOpen, user, panelInfo, authLoading, onOpenChange]);

  const handleNextStep = () => {
    if (step === 1 && !agree) {
      toast({
        title: "동의 필요",
        description: "개인정보 수집·이용에 동의하셔야 다음 단계로 진행할 수 있습니다.",
        variant: "destructive"
      });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      // Browser will redirect to Google, so we don't need to do anything else here
    } catch (error) {
      toast({
        title: "로그인 오류",
        description: "구글 로그인 중 문제가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  const handleKakaoLogin = async () => {
    try {
      await signInWithKakao();
    } catch (error) {
      toast({
        title: "로그인 오류",
        description: "카카오 로그인 중 문제가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithFacebook();
    } catch (error) {
      toast({
        title: "로그인 오류",
        description: "페이스북 로그인 중 문제가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  const handleComplete = async () => {
    if (!user) {
      toast({ title: "오류", description: "로그인 정보가 없습니다.", variant: "destructive" });
      return;
    }
    if (!birthYear || !region || !job) {
      toast({ title: "입력 오류", description: "모든 추가 정보를 입력해 주세요.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const name = user.user_metadata?.full_name || user.email?.split('@')[0] || "패널";
      
      const { error } = await supabase.from('survey_panels').insert({
        id: user.id,
        name: name,
        gender,
        birth_year: birthYear,
        region,
        job
      });

      if (error) throw error;

      toast({
        title: "가입 완료",
        description: "설문조사 패널에 가입되었습니다. 새로고침을 통해 상태를 반영합니다.",
      });
      
      onOpenChange(false);
      // Optional: reload the page to refresh panelInfo in useAuth, or we can just let React handle it.
      // Since useAuth listens to session changes but not DB changes, a quick reload is safest to get panelInfo.
      window.location.reload();
      
    } catch (error: any) {
      console.error(error);
      toast({
        title: "저장 실패",
        description: error.message || "패널 정보 저장 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && (!user || panelInfo)) {
        setStep(1);
        setAgree(false);
      }
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-border">
        <div className="bg-muted/30 px-6 py-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-4 relative">
            <DialogTitle className="text-xl font-bold font-serif">설문조사 패널 가입</DialogTitle>
            <div className="flex gap-2 items-center">
              <div className="flex gap-1.5 mr-4">
                <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                <div className={`w-2 h-2 rounded-full ${step === 3 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {step === 1 && "1단계: 약관 동의"}
            {step === 2 && "2단계: 소셜 로그인"}
            {step === 3 && "3단계: 추가 정보 입력"}
          </p>
        </div>

        <div className="p-6">
          {/* Step 1: Terms */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  개인정보 수집·이용 동의
                </h3>
                <p className="text-sm text-muted-foreground">
                  (주)투어리즘인사이트는 설문조사 참가자의 개인정보를 중요시하며, 법률을 준수합니다.
                </p>
              </div>

              <ScrollArea className="h-[200px] rounded-md border p-4 bg-muted/10">
                <div className="text-sm space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">수집항목</h4>
                    <p className="text-muted-foreground">이름, 성별, 연령대, 거주지역, 직업군, 이메일</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">수집 및 이용 목적</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>설문조사 작성 데이터 수집</li>
                      <li>이메일 트렌드 기사 발송 및 맞춤형 마케팅 정보 제공</li>
                      <li>모바일 쿠폰 발송</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">보유 및 이용기간</h4>
                    <p className="text-muted-foreground">패널 가입 철회 시점까지 또는 법령에 따른 보존기간</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">동의거부 권리</h4>
                    <p className="text-muted-foreground">동의를 거부할 수 있으며, 거부 시 패널에 가입하실 수 없습니다.</p>
                  </div>
                </div>
              </ScrollArea>

              <div className="flex items-center space-x-2 bg-muted/20 p-4 rounded-lg border border-border/50">
                <Checkbox id="terms" checked={agree === true} onCheckedChange={setAgree} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  위 내용을 모두 확인하였으며, 개인정보 수집·이용에 동의합니다.
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Social Login */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in py-4">
              <div className="text-center space-y-2 mb-8">
                <h3 className="font-semibold text-lg">1초 만에 간편 가입하기</h3>
                <p className="text-sm text-muted-foreground">
                  SNS 계정으로 안전하게 로그인하고 복잡한 이메일 인증을 생략하세요.
                </p>
              </div>

              <div className="space-y-3 max-w-sm mx-auto">
                <Button 
                  variant="outline" 
                  className="w-full h-12 justify-center bg-white hover:bg-gray-50 text-black border border-gray-200 font-medium text-base relative"
                  onClick={handleGoogleLogin}
                >
                  <svg className="absolute left-4 w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google로 시작하기
                </Button>
                <div className="text-center my-4 text-xs text-muted-foreground relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">다른 계정</span></div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full h-12 justify-center bg-[#FEE500] hover:bg-[#FEE500]/90 text-black border-none font-medium text-base relative"
                  onClick={handleKakaoLogin}
                >
                  <svg className="absolute left-4 w-[22px] h-[22px]" viewBox="0 0 24 24">
                    <path d="M12 3C6.48 3 2 6.55 2 10.92c0 2.84 1.83 5.33 4.59 6.8-.2.72-.73 2.65-.77 2.83-.05.19.06.19.16.12.08-.05 1.05-.72 2.92-2.01 1 .28 2.04.42 3.1.42 5.52 0 10-3.55 10-7.92S17.52 3 12 3" fill="#000000"/>
                  </svg>
                  카카오로 시작하기
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-12 justify-center bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-none font-medium text-base relative"
                  onClick={handleFacebookLogin}
                >
                  <svg className="absolute left-4 w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                  Facebook으로 시작하기
                </Button>
              </div>
              
              <div className="text-center mt-6">
                <button className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors" onClick={() => setStep(1)}>
                  이전 단계로 돌아가기
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Extra Info */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-2 mb-4">
                <h3 className="font-semibold text-lg">추가 정보 입력</h3>
                <p className="text-sm text-muted-foreground">
                  원활한 설문 배정과 통계 분석을 위해 필요한 정보입니다. (모든 항목 필수)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름 (또는 닉네임)</Label>
                  <Input id="name" value={user?.user_metadata?.full_name || user?.email?.split('@')[0] || "패널"} readOnly className="bg-muted/50" />
                  <p className="text-[10px] text-muted-foreground">소셜 계정에서 연동됨</p>
                </div>
                <div className="space-y-2">
                  <Label>성별</Label>
                  <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="r1" />
                      <Label htmlFor="r1">남자</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="r2" />
                      <Label htmlFor="r2">여자</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>출생년도</Label>
                  <Select value={birthYear} onValueChange={setBirthYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="출생년도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 83 }, (_, i) => 2012 - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}년
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>거주지역</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="지역 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>직업군</Label>
                <Select value={job} onValueChange={setJob}>
                  <SelectTrigger>
                    <SelectValue placeholder="직업군 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {OCCUPATIONS.map((j) => (
                      <SelectItem key={j} value={j}>
                        {j}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="bg-muted/30 px-6 py-4 border-t border-border/50 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            {step === 3 ? "가입 나중에 하기" : "취소"}
          </Button>
          
          {step === 3 && (
            <Button 
              variant="outline" 
              className="text-xs text-muted-foreground"
              onClick={async () => {
                await supabase.auth.signOut();
                onOpenChange(false);
              }}
            >
              로그아웃
            </Button>
          )}

          {step === 1 && (
            <Button onClick={handleNextStep} className="gap-2">
              다음 단계 <ArrowRight className="w-4 h-4" />
            </Button>
          )}
          
          {step === 3 && (
            <Button onClick={handleComplete} disabled={isSubmitting} className="bg-primary text-primary-foreground min-w-[140px]">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "패널 가입 완료하기"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
