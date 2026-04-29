import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { PlayCircle } from "lucide-react";

interface PreSurveyInfoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  surveyTitle: string;
  requirePhone?: boolean;
  onStartSurvey: () => void;
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

export const PreSurveyInfoModal = ({
  isOpen,
  onOpenChange,
  surveyTitle,
  requirePhone = false,
  onStartSurvey,
}: PreSurveyInfoModalProps) => {
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requirePhone && !agree) {
      alert("개인정보 수집에 동의해주세요.");
      return;
    }
    // Call API to save basic info if needed here
    onStartSurvey();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border bg-card">
        <div className="bg-muted/30 px-6 py-5 border-b border-border">
          <h2 className="text-xl font-bold font-serif mb-1">설문 참여 사전 정보</h2>
          <p className="text-sm text-muted-foreground">
            정확한 통계 분석을 위해 기본 정보가 필요합니다.
            패널로 가입하시면 다음부터 이 과정을 생략할 수 있습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-primary mb-2 font-medium">
            대상 설문: {surveyTitle}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>출생년도 <span className="text-destructive">*</span></Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="선택하세요" />
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
              <Label>성별 <span className="text-destructive">*</span></Label>
              <RadioGroup defaultValue="male" className="flex gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="g_male" />
                  <Label htmlFor="g_male">남자</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="g_female" />
                  <Label htmlFor="g_female">여자</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>거주지역 <span className="text-destructive">*</span></Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>직업군 <span className="text-destructive">*</span></Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {OCCUPATIONS.map((job) => (
                    <SelectItem key={job} value={job}>
                      {job}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {requirePhone && (
            <div className="pt-4 border-t border-border mt-2 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  휴대폰 번호 <span className="text-destructive">*</span>
                  <span className="text-xs text-muted-foreground ml-2 font-normal">(리워드 모바일 쿠폰 발송용)</span>
                </Label>
                <Input id="phone" type="tel" placeholder="010-0000-0000" required />
              </div>
              
              <div className="flex items-start space-x-2 bg-muted/20 p-3 rounded-md border border-border/50">
                <Checkbox 
                  id="reward-agree" 
                  checked={agree} 
                  onCheckedChange={(c) => setAgree(c as boolean)} 
                  className="mt-0.5"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="reward-agree"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    경품 발송을 위한 개인정보 수집 이용 동의
                  </label>
                  <p className="text-xs text-muted-foreground">
                    수집 목적: 모바일 쿠폰 발송 / 보존 기간: 발송 후 1개월 내 파기
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-border mt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" className="gap-2 bg-primary text-primary-foreground">
              <PlayCircle className="w-4 h-4" /> 설문 시작하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
