import Header from "@/components/Header";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    inquiryType: "프로젝트의뢰",
    message: "",
    agreed: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreed) {
      toast.error("정보 수신 동의란에 체크해 주세요");
      return;
    }
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/touinssa@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            이름: formData.name,
            소속_기관명: formData.organization,
            이메일: formData.email,
            연락처: formData.phone,
            문의유형: formData.inquiryType,
            내용: formData.message,
            _subject: `[웹사이트 문의] ${formData.inquiryType} - ${formData.name}`,
            _captcha: "false"
        })
      });

      if (response.ok) {
        toast.success("문의 내용이 성공적으로 자동 전송되었습니다!");
        setFormData({ 
          name: "", 
          organization: "", 
          email: "", 
          phone: "", 
          inquiryType: "프로젝트의뢰", 
          message: "",
          agreed: false
        });
      } else {
        toast.error("서버 응답 오류로 전송에 실패했습니다.");
      }
    } catch (error) {
      toast.error("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-3xl font-bold leading-tight animate-slide-down break-keep">
            "답은 현장에, 질문은 당신에게 있습니다."
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-1 break-keep">
            지금, 질문을 던져보세요. 투어리즘인사이트는 당신의 목소리에서 시작합니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="rounded-2xl bg-card border border-border p-8 md:p-10 shadow-xl">
            <h2 className="text-2xl font-bold mb-8 font-serif">문의하기</h2>
            <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up stagger-2">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-sans"
                    placeholder="성함을 입력해주세요"
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-semibold mb-2">
                    소속 / 기관명
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-sans"
                    placeholder="소속 단체를 입력해주세요"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-sans"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-sans"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inquiryType" className="block text-sm font-semibold mb-2">
                  문의유형
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none font-sans"
                >
                  <option value="프로젝트의뢰">프로젝트의뢰</option>
                  <option value="협업파트너쉽 제안">협업파트너쉽 제안</option>
                  <option value="데이터 리포트 요청">데이터 리포트 요청</option>
                  <option value="기타문의">기타문의</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none font-sans"
                  placeholder="문의하실 내용을 상세히 적어주세요"
                />
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 group hover:border-accent/30 transition-colors">
                <input
                  type="checkbox"
                  id="agreed"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-input bg-background text-accent focus:ring-accent accent-accent cursor-pointer"
                />
                <label htmlFor="agreed" className="text-sm text-muted-foreground cursor-pointer select-none leading-relaxed break-keep">
                  입력하신 정보는 문의하신 내용에 대한 회신용으로만 사용됩니다.
                </label>
              </div>

              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-xl py-7 text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.01]"
              >
                문의 내용 전송하기
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="rounded-2xl bg-card p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">서울특별시 서초구 강남대로30길 40, 202호</p>
                    <p className="text-muted-foreground text-sm">Tourism Insight</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">010-7179-7743 / 02-3445-5334</p>
                    <p className="text-muted-foreground text-sm">평일 09:00 - 18:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">service@tourisminsight.co.kr</p>
                    <p className="text-muted-foreground mt-1">touinssa@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-muted p-8">
              <h3 className="text-xl font-bold mb-4">자주 묻는 질문 (FAQ)</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">프로젝트나 컨설팅 의뢰는 어떻게 하나요?</h4>
                  <p className="text-muted-foreground">
                    좌측의 문의 양식을 작성하시거나 기재된 연락처로 전화나 메일을 주시면, 내용을 확인한 후 신속하게 연락드리겠습니다.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">협력 및 파트너십 제안도 가능한가요?</h4>
                  <p className="text-muted-foreground">
                    네, 상호 성장을 위한 협업은 언제나 환영합니다. 관련 안내 자료나 제안 내용을 이메일로 보내주시면 감사하겠습니다.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">분석 데이터 및 인사이트 자료를 인용해도 되나요?</h4>
                  <p className="text-muted-foreground">
                    자료의 인용 및 재배포 시에는 가급적 사전 협의와 명확한 출처 표기가 필요합니다. 관련 사항은 별도 문의 부탁드립니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
