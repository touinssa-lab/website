import Header from "@/components/Header";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/touinssa@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _subject: `[웹사이트 문의] ${formData.subject}`,
            _captcha: "false"
        })
      });

      if (response.ok) {
        toast.success("문의 내용이 성공적으로 자동 전송되었습니다!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("서버 응답 오류로 전송에 실패했습니다.");
      }
    } catch (error) {
      toast.error("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-down">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-1">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="rounded-2xl bg-card p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up stagger-2">
          <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6"
              >
                Send Message
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
                    <p className="text-muted-foreground">010-7179-7743 / 02-3445-5333</p>
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
