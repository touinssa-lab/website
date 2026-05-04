import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, MapPin, Briefcase, Heart, MessageSquare, Info, Sparkles, ChevronLeft, Trash2, Map as MapIcon, Ship, Users, Languages } from "lucide-react";
import personasData from "@/data/personas_sample.json";
import personaTranslations from "@/data/persona_translations.json";
import SouthKoreaMap from "@/components/SouthKoreaMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import MarineDashboard from "@/components/MarineDashboard";
import { BarChart as BarChartIcon, Database, LayoutGrid } from "lucide-react";
import AntigravityBackground from "@/components/AntigravityBackground";

interface Persona {
  uuid: string;
  persona: string;
  province: string;
  district: string;
  age: number;
  sex: string;
  occupation: string;
  cultural_background: string;
  hobbies_and_interests: string;
  travel_persona: string;
  image?: string;
  video?: string;
}

type Language = 'ko' | 'en' | 'zh' | 'ja';

const langConfig = {
  ko: { label: "한국어", code: "ko" },
  en: { label: "English", code: "en" },
  zh: { label: "简体中文", code: "zh" },
  ja: { label: "日本語", code: "ja" },
};

const provinceTranslations: Record<string, Record<Language, string>> = {
  "서울": { ko: "서울특별시", en: "Seoul", zh: "首尔", ja: "ソウル" },
  "부산": { ko: "부산광역시", en: "Busan", zh: "釜山", ja: "釜山" },
  "대구": { ko: "대구광역시", en: "Daegu", zh: "大邱", ja: "大邱" },
  "인천": { ko: "인천광역시", en: "Incheon", zh: "仁川", ja: "仁川" },
  "광주": { ko: "광주광역시", en: "Gwangju", zh: "光州", ja: "光州" },
  "대전": { ko: "대전광역시", en: "Daejeon", zh: "大田", ja: "大田" },
  "울산": { ko: "울산광역시", en: "Ulsan", zh: "蔚山", ja: "蔚山" },
  "세종": { ko: "세종특별자치시", en: "Sejong", zh: "世宗", ja: "世宗" },
  "경기": { ko: "경기도", en: "Gyeonggi", zh: "京畿道", ja: "京畿道" },
  "강원": { ko: "강원특별자치도", en: "Gangwon", zh: "江原道", ja: "江原道" },
  "충북": { ko: "충청북도", en: "Chungbuk", zh: "忠清北道", ja: "忠清北道" },
  "충남": { ko: "충청남도", en: "Chungnam", zh: "忠清南道", ja: "忠清南道" },
  "전북": { ko: "전북특별자치도", en: "Jeonbuk", zh: "全羅北道", ja: "全羅北道" },
  "전남": { ko: "전라남도", en: "Jeonnam", zh: "全羅南道", ja: "全羅南道" },
  "경북": { ko: "경상북도", en: "Gyeongbuk", zh: "慶尚北道", ja: "慶尚北道" },
  "경남": { ko: "경상남도", en: "Gyeongnam", zh: "慶尚南道", ja: "慶尚南道" },
  "제주": { ko: "제주특별자치도", en: "Jeju", zh: "済州道", ja: "済州道" },
};

const translateContent = (text: string, type: 'occupations' | 'districts' | 'hobbies' | 'sex' | 'age', lang: Language) => {
  if (!text || lang === 'ko') return text;

  const category = (personaTranslations as any)[type];
  if (category) {
    if (category[text] && category[text][lang]) return category[text][lang];
    
    // Fallback for districts: check if the key ends with the text (to handle province prefixes)
    if (type === 'districts') {
      for (const [key, trans] of Object.entries(category)) {
        if (key.endsWith('-' + text) || key === text) {
          if ((trans as any)[lang]) return (trans as any)[lang];
        }
      }
    }
  }

  if (type === 'hobbies') {
    // [보류] 취미/특성 문장의 자연스러운 번역을 위해 추후 대량 데이터셋 반영 시 업그레이드 예정
    // 현재는 한글 원문을 노출하여 가독성을 유지함
    return text;

    /* 추후 업그레이드용 로직 보존
    if (personaTranslations.hobbies && (personaTranslations.hobbies as any)[text]) return (personaTranslations.hobbies as any)[text][lang];
    
    let translated = text;
    const sortedPatterns = Object.entries(personaTranslations.patterns).sort((a, b) => b[0].length - a[0].length);
    for (const [pattern, trans] of sortedPatterns) {
      if (translated.includes(pattern)) {
        translated = translated.split(pattern).join((trans as any)[lang]);
      }
    }
    return translated;
    */
  }

  if (type === 'sex') {
    if (text.includes('여')) return { en: 'Female', zh: '女性', ja: '女性' }[lang];
    if (text.includes('남')) return { en: 'Male', zh: '男性', ja: '男性' }[lang];
  }

  if (type === 'age') return text + (lang === 'en' ? '' : lang === 'zh' ? '岁' : '歳');

  return text;
};

const getPersonaMedia = (age: number, sex: string) => {
  const isMale = sex.includes('남');
  const genderKey = isMale ? 'm' : 'f';

  let ageGroup = '20';
  if (age >= 70) ageGroup = '70';
  else if (age >= 60) ageGroup = '60';
  else if (age >= 50) ageGroup = '50';
  else if (age >= 40) ageGroup = '40';
  else if (age >= 30) ageGroup = '30';
  else ageGroup = '20';

  const basePath = `/ai-guides/persona_${ageGroup}${genderKey}`;
  return {
    image: `${basePath}.png`,
    video: `${basePath}.mp4`
  };
};

const translations = {
  ko: {
    heroTitle: <>로컬 친구가 들려주는,<br /><span className="text-sky-600">우리 동네 이야기</span></>,
    heroSubtitle: "한국형 AI 페르소나가 지역의 숨은 매력을 전해 드립니다.",
    analysisData: "분석 데이터: Nemotron-Personas-Korea 700만 건",
    curationTitle: "700만 명의 리얼 보이스로 설계한 지역 맞춤형 여행 큐레이션",
    curationDesc: <>골목의 단골집부터 동네 사람만 아는 숨겨진 맛집까지,<br />진짜 지역의 이야기를 들려드립니다.</>,
    selectRegion: "여행하고 싶은 지역을 선택해 주세요.",
    guideTitle: "로컬 AI 여행가이드",
    analysisTitle: "Data & AI Analysis",
    otherRegion: "다른 지역 여행하기",
    chatbotTitle: "로컬 스토리 챗봇",
    chatbotSubtitle: "현지인의 시선으로 여행을 설계하세요",
    inputPlaceholder: "질문을 입력하세요...",
    loading: "답변 준비 중...",
    loadingStatus: <>답변 중입니다.<br />잠시만 기다려 주세요</>,
    occupation: "직업",
    age: "나이",
    hobbies: "취미 및 관심사",
    guideSuffix: "가이드",
    infoText: (selectedPersona: any) => (
      <ul className="space-y-0.5 list-disc list-inside">
        <li className="marker:text-primary">로컬 스토리 챗봇은 정식서비스가 아닙니다. AI 페르소나의 답변에는 오류가 있을 수 있습니다.</li>
        <li className="marker:text-red-500 text-red-500 font-bold">질문 횟수는 5회로 제한됩니다.</li>
        <li className="marker:text-primary">AI가 안내한 <span className="font-bold text-primary underline underline-offset-2 italic">장소명</span>을 클릭하면 지도로 상세 위치를 보여줍니다.</li>
        <li className="marker:text-primary">장소명 앞의 <span className="font-bold text-red-500">빨간색 지도핀</span>을 클릭하시면 현재 위치에서 해당 장소까지의 <span className="font-medium text-foreground">경로 안내(길찾기)</span>를 보여줍니다.</li>
        <li className="marker:text-primary"><span className="text-primary font-black italic underline underline-offset-2">"{translateContent(selectedPersona?.district, 'districts', 'ko')}"에서 하루 종일 놀 수 있는 코스 짜주세요</span> 라고 입력해 보세요.</li>
      </ul>
    ),
    changeLang: "언어 변경하기",
  },
  en: {
    heroTitle: <>Local Stories from<br /><span className="text-sky-600">Your Neighborhood Friends</span></>,
    heroSubtitle: "Discover the hidden charms of Korea through AI personas.",
    analysisData: "Analysis Data: 7 million cases of Nemotron-Personas-Korea",
    curationTitle: "Customized travel curation designed with 7 million real voices",
    curationDesc: <>From local favorites to hidden gems only known by locals,<br />we tell you the real story of the region.</>,
    selectRegion: "Please select the region you want to travel to.",
    guideTitle: "Local AI Travel Guide",
    analysisTitle: "Data & AI Analysis",
    otherRegion: "Travel to other regions",
    chatbotTitle: "Local Story Chatbot",
    chatbotSubtitle: "Plan your trip through the eyes of a local",
    inputPlaceholder: "Ask a question...",
    loading: "Preparing answer...",
    loadingStatus: "(Answering. Please wait a moment)",
    occupation: "Occupation",
    age: "Age",
    hobbies: "Hobbies & Interests",
    guideSuffix: "Guide",
    infoText: (selectedPersona: any) => (
      <>
        Click the <span className="font-bold text-primary underline underline-offset-2 italic">place name</span> guided by AI to see the detailed location on the map.<br />
        Click the <span className="font-bold text-red-500">red map pin</span> in front to start <span className="font-medium text-foreground">directions (navigation)</span> from your current location to the place.<br />
        Try typing <span className="text-primary font-bold">"Plan an all-day course in {translateContent(selectedPersona?.district, 'districts', 'en')}"</span>.
      </>
    ),
    changeLang: "Change Language",
  },
  zh: {
    heroTitle: <>当地朋友为您讲述的<br /><span className="text-sky-600">家乡故事</span></>,
    heroSubtitle: "韩国型 AI 人物为您传递地区的隐藏魅力。",
    analysisData: "分析数据：Nemotron-Personas-Korea 700万件",
    curationTitle: "以700万真实声音设计的地区定制旅行策划",
    curationDesc: <>从胡同里的常去店到只有当地人知道的隐藏餐厅，<br />为您讲述真正的地区故事。</>,
    selectRegion: "请选择您想旅行的地区。",
    guideTitle: "当地 AI 旅行指南",
    analysisTitle: "数据与人工智能分析",
    otherRegion: "去其他地区旅行",
    chatbotTitle: "当地故事聊天机器人",
    chatbotSubtitle: "以当地人的视角规划行程",
    inputPlaceholder: "请输入问题...",
    loading: "正在准备回答...",
    loadingStatus: "(正在回答中，请稍候)",
    occupation: "职业",
    age: "年龄",
    hobbies: "爱好与兴趣",
    guideSuffix: "指南",
    infoText: (selectedPersona: any) => (
      <>
        点击 AI 指导的 <span className="font-bold text-primary underline underline-offset-2 italic">地点名称</span> 即可在地图上查看详细位置。<br />
        点击前面的 <span className="font-bold text-red-500">红色地图大头针</span> 即可开始从当前位置到该地点的 <span className="font-medium text-foreground">路径指引（寻找路线）</span>。<br />
        请尝试输入 <span className="text-primary font-bold">"请制定一个可以在 {translateContent(selectedPersona?.district, 'districts', 'zh')} 玩一整天的路线"</span>.
      </>
    ),
    changeLang: "更改语言",
  },
  ja: {
    heroTitle: <>地元の友達が語る、<br /><span className="text-sky-600">わが街の物語</span></>,
    heroSubtitle: "韓国型 AI ペルソナが地域の隠れた魅力を伝えます。",
    analysisData: "分析データ：Nemotron-Personas-Korea 700만件",
    curationTitle: "700만인의 リアルボイスで設計した地域密着型旅行キュレーション",
    curationDesc: <>路地の行きつけの店から地元の人だけが知る隠れた名店まで, <br />本当の地域の物語をお届けします。</>,
    selectRegion: "旅行したい地域を選択してください。",
    guideTitle: "ローカル AI 旅行ガイド",
    analysisTitle: "データ＆AI分析",
    otherRegion: "他の地域へ行く",
    chatbotTitle: "ローカルストーリーチャットボット",
    chatbotSubtitle: "地元の方の視点で旅行を設計しましょう",
    inputPlaceholder: "質問を入力してください...",
    loading: "回答を準備中...",
    loadingStatus: "(回答中です。少々お待ちください)",
    occupation: "職業",
    age: "年齢",
    hobbies: "趣味・関心事",
    guideSuffix: "ガイド",
    infoText: (selectedPersona: any) => (
      <>
        AIが案内した <span className="font-bold text-primary underline underline-offset-2 italic">場所名</span> をクリックすると、地図で詳細な位置を表示します。<br />
        前の <span className="font-bold text-red-500">赤いマップピン</span> をクリックすると、現在地からその場所までの <span className="font-medium text-foreground">ルート案内（経路検索）</span> が始まります。<br />
        <span className="text-primary font-bold">「{translateContent(selectedPersona?.district, 'districts', 'ja')}で一日中遊べるコースを立てて」</span> と入力してみてください.
      </>
    ),
    changeLang: "言語を変更",
  }
};

const AITravelGuide = () => {
  const [selectedLang, setSelectedLang] = useState<Language>('ko');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const initialView = searchParams.get('view') === 'analysis' ? 'analysis' : 'guide';
  const [mainView, setMainView] = useState<'guide' | 'analysis'>(initialView);
  const [chatCount, setChatCount] = useState<number>(0);

  // 로컬스토리지에서 질문 횟수 및 날짜 불러오기
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
    const savedCount = localStorage.getItem('touinssa_chat_count');
    const savedDate = localStorage.getItem('touinssa_chat_date');

    if (savedDate !== today) {
      // 날짜가 다르거나 데이터가 없으면 초기화
      setChatCount(0);
      localStorage.setItem('touinssa_chat_count', '0');
      localStorage.setItem('touinssa_chat_date', today);
    } else if (savedCount) {
      setChatCount(parseInt(savedCount, 10));
    }
  }, []);

  // 질문 횟수 변경될 때마다 로컬스토리지 저장 (날짜 포함)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('touinssa_chat_count', chatCount.toString());
    localStorage.setItem('touinssa_chat_date', today);
  }, [chatCount]);

  // URL 파라미터 변경 감지 및 뷰 업데이트
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'analysis') {
      setMainView('analysis');
    } else {
      setMainView('guide');
    }
  }, [searchParams]);
  const [activeAnalysis, setActiveAnalysis] = useState<'marine'>('marine');
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  const t = translations[selectedLang];

  const processedPersonas = personasData.map((p: any) => {
    let province = p.district.includes('-') ? p.district.split('-')[0].trim() : (p.province || '기타').trim();
    const district = p.district.includes('-') ? p.district.split('-')[1].trim() : p.district.trim();

    if (province === "경상남") province = "경남";
    if (province === "경상북") province = "경북";
    if (province === "전라남") province = "전남";
    if (province === "충청남") province = "충남";
    if (province === "충청북") province = "충북";

    return {
      ...p,
      province,
      district
    };
  });

  const provinces = Array.from(new Set(processedPersonas.map((p: any) => p.province)))
    .filter(p => p && p !== "country")
    .sort((a, b) => {
      const order = Object.keys(provinceTranslations);
      return order.indexOf(a) - order.indexOf(b);
    });

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollEndRef.current) {
        scrollEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };
    
    // 타임아웃을 살짝 주어 DOM 렌더링이 완료된 후 스크롤이 실행되도록 함
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  const handleProvinceSelect = (provinceName: string) => {
    window.history.pushState({ view: 'chat' }, '');
    setSelectedProvince(provinceName);
    const filtered = processedPersonas.filter((p: any) => p.province === provinceName);
    const randomPersona = filtered[Math.floor(Math.random() * filtered.length)] as any;

    const media = getPersonaMedia(randomPersona.age, randomPersona.sex);
    randomPersona.image = media.image;
    randomPersona.video = media.video;
    setSelectedPersona(randomPersona);

    const greetings: Record<Language, string> = {
      ko: "안녕하세요!",
      en: "Hello!",
      zh: "您好！",
      ja: "こんにちは！"
    };

    if (selectedLang === 'ko') {
      if (["부산", "경남", "경북", "대구", "울산"].includes(provinceName)) greetings.ko = "반갑습니데이!";
      else if (["전남", "전북", "광주"].includes(provinceName)) greetings.ko = "반갑구만잉~";
      else if (provinceName === "제주") greetings.ko = "반갑수다!";
    }

    const introText = {
      ko: `저는 ${translateContent(randomPersona.district, 'districts', 'ko').replace('-', ' ')}에 살고 있는 ${translateContent(randomPersona.occupation, 'occupations', 'ko')}입니다. 우리 동네에 대해 궁금한 거 있으면 뭐든 물어보세요!`,
      en: `I am a ${translateContent(randomPersona.occupation, 'occupations', 'en')} living in ${translateContent(randomPersona.district, 'districts', 'en').replace('-', ' ')}. Ask me anything about our neighborhood!`,
      zh: `我是住在 ${translateContent(randomPersona.district, 'districts', 'zh').replace('-', ' ')} 的一名 ${translateContent(randomPersona.occupation, 'occupations', 'zh')}。如果您对我们这里有什么好奇的，尽管问我！`,
      ja: `私は ${translateContent(randomPersona.district, 'districts', 'ja').replace('-', ' ')} に住んでいる ${translateContent(randomPersona.occupation, 'occupations', 'ja')} です。私たちの街について気になることがあれば、何でも聞いてください！`
    };

    setMessages([
      {
        role: "bot",
        content: `${greetings[selectedLang]} ${introText[selectedLang]}`,
      },
    ]);
  };

  useEffect(() => {
    const handlePopState = () => {
      if (selectedPersona) {
        setSelectedPersona(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedPersona]);

  const handleBackToSelection = () => {
    if (selectedPersona) window.history.back();
  };

  const openMapPopup = (url: string) => {
    const width = 1000;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(url, 'googleMapsPopup', `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`);
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedPersona) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    // 질문 횟수 체크 (5회 제한)
    if (chatCount >= 5) {
      // 0.5초 뒤에 제한 메시지 답변 (자연스러운 느낌을 위해)
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          role: "bot", 
          content: "질문 횟수가 초과되었습니다." 
        }]);
      }, 500);
      return;
    }

    setIsLoading(true);

    try {
      const systemInstruction = `
        You are a local resident of ${selectedPersona.province}, South Korea. 
        Current language interaction: ${selectedLang} (Answer in this language).
        Residence: ${selectedPersona.province} ${selectedPersona.district}
        Age: ${selectedPersona.age}
        Sex: ${selectedPersona.sex}
        Occupation: ${selectedPersona.occupation}
        Personality/Background: ${selectedPersona.cultural_background}
        Hobbies: ${selectedPersona.hobbies_and_interests}
        Travel Expertise: Expert in planning local itineraries and efficient routes.

        Instructions:
        1. **Tone**: Speak naturally and warmly like a friendly neighbor or a local expert. 
        2. **Language**: Always reply in ${selectedLang === 'ko' ? 'Korean' : selectedLang === 'en' ? 'English' : selectedLang === 'zh' ? 'Chinese' : 'Japanese'}. 
        3. **Formatting**: Use a specific marker for map links and bold text for emphasis.
           - **Map Links**: Use the exact format 📍[LocationName] (NO space between 📍 and [, and MUST close with ]). Example: 📍[Namsan Tower] is a great spot.
        4. **Persona**: You are a real person, not an AI. 
      `;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemInstruction },
            ...messages.map((m) => ({
              role: m.role === 'bot' ? 'assistant' : 'user',
              content: m.content
            })),
            { role: "user", content: userMessage }
          ]
        })
      });

      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error || "Error");
      
      setMessages((prev) => [...prev, { role: "bot", content: data.content }]);
      setChatCount(prev => prev + 1); // 답변이 성공적으로 오면 횟수 증가
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <section className="hero-gradient text-white min-h-[200px] md:min-h-[260px] flex items-center relative overflow-hidden">
        <AntigravityBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-lg font-bold tracking-wider uppercase text-sky-400 mb-4 font-sans">AI LAB</p>
            <h1 className="text-3xl md:text-5xl font-semibold font-serif leading-relaxed drop-shadow-md max-w-4xl">
              데이터와 생성형 AI가 제안하는<br />관광 산업의 미래 인사이트
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-16 font-sans">
          <div className="inline-flex p-1.5 bg-muted/50 backdrop-blur-md rounded-2xl border border-border/50 shadow-inner">
            <button
              onClick={() => setMainView('guide')}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-xl transition-all duration-300 ${mainView === 'guide'
                  ? 'bg-[#255282] text-white shadow-lg font-bold scale-[1.02]'
                  : 'text-muted-foreground hover:text-foreground font-medium'
                }`}
            >
              <Bot className="w-5 h-5" />
              {translations.ko.guideTitle}
            </button>
            <button
              onClick={() => setMainView('analysis')}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-xl transition-all duration-300 ${mainView === 'analysis'
                  ? 'bg-[#255282] text-white shadow-lg font-bold scale-[1.02]'
                  : 'text-muted-foreground hover:text-foreground font-medium'
                }`}
            >
              <BarChartIcon className="w-5 h-5" />
              {translations.ko.analysisTitle}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mainView === 'guide' ? (
            <motion.div key="guide-view" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
              <div style={{ backgroundColor: '#fbfcf9' }} className="rounded-[40px] py-10 md:py-12 px-10 md:px-16 mb-12 relative overflow-hidden shadow-sm border border-sky-100/50">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, #e0f2fe, #f0f9ff 50%, #fbfcf9 70%)' }} />
                <div className="relative z-10 max-w-3xl">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className={`text-4xl md:text-5xl mb-3 tracking-tight leading-tight font-serif text-slate-800 ${selectedLang === 'zh' ? 'font-bold' : 'font-black'}`}
                  >
                    {t.heroTitle}
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-600 mb-6 font-medium">
                    {t.heroSubtitle}
                  </motion.p>
                  
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3 mb-8">
                    <div className="bg-white/90 backdrop-blur-sm border border-sky-200/50 rounded-full px-5 py-2 flex items-center gap-2.5 shadow-sm">
                      <Database className="w-4 h-4 text-sky-500" />
                      <span className="text-[13px] font-bold text-slate-700">{t.analysisData}</span>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm border border-sky-200/50 rounded-full px-5 py-2 flex items-center gap-2.5 shadow-sm">
                      <Sparkles className="w-4 h-4 text-sky-500" />
                      <span className="text-[13px] font-bold text-slate-700">Powered by NVIDIA Nemotron</span>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-6 items-start border-l-4 border-sky-400 pl-6 py-2 bg-sky-50/30 rounded-r-2xl max-w-2xl">
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-slate-800 mb-1">{t.curationTitle}</h4>
                      <div className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
                        {t.curationDesc}
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full hidden lg:block opacity-90 pointer-events-none">
                  <img src="/images/local_hero.png" alt="Neighborhood Illustration" className="w-full h-full object-contain object-right" />
                </div>
              </div>

              <div className="flex justify-center -mt-6 mb-12 relative z-20">
                <div className="inline-flex bg-white/80 backdrop-blur-md rounded-full p-1 shadow-xl border border-sky-100 items-center">
                  <div className="px-4 py-2 flex items-center gap-2 text-sky-600 border-r border-sky-100 mr-1">
                    <Languages className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Language</span>
                  </div>
                  {Object.entries(langConfig).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => !selectedPersona && setSelectedLang(key as Language)}
                      disabled={!!selectedPersona}
                      className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${selectedLang === key 
                        ? 'bg-sky-500 text-white shadow-md' 
                        : 'text-slate-500 hover:bg-sky-50 hover:text-sky-600'} ${selectedPersona ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>

              {!selectedPersona ? (
                <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start max-w-6xl mx-auto">
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 w-full max-w-[550px]">
                    <div className="bg-card/50 backdrop-blur-xl rounded-3xl p-4 md:p-6 shadow-2xl border border-border/50 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                      <SouthKoreaMap
                        data={provinces.map(prov => ({ region: prov, count: 30 }))}
                        color="hsl(var(--primary))"
                        showCounts={false}
                        selectedRegion={selectedProvince || undefined}
                        onRegionClick={handleProvinceSelect}
                        language={selectedLang}
                      />
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-[550px]">
                    <h4 className="text-xl font-bold mb-6 text-center lg:text-left text-primary/80 font-serif">{t.selectRegion}</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {provinces.map((prov) => (
                        <Button
                          key={prov}
                          variant="outline"
                          className="h-[72px] text-[15px] font-bold hover:bg-primary/10 hover:text-primary hover:border-primary transition-all flex items-center justify-center border-primary/20 bg-primary/5 backdrop-blur-sm px-2 text-center break-keep shadow-sm rounded-2xl"
                          onClick={() => handleProvinceSelect(prov)}
                        >
                          {provinceTranslations[prov][selectedLang]}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="overflow-hidden border-none shadow-2xl bg-gradient-to-br from-card to-muted/50 rounded-3xl">
                      <div className="aspect-[3/4] relative">
                        <video key={selectedPersona.video} src={selectedPersona.video} autoPlay loop muted playsInline poster={selectedPersona.image} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                          <h3 className="text-2xl font-bold mb-1">{provinceTranslations[selectedPersona.province][selectedLang]} {t.guideSuffix}</h3>
                          <p className="text-sm opacity-90 flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {provinceTranslations[selectedPersona.province][selectedLang]} {translateContent(selectedPersona.district, 'districts', selectedLang)}
                          </p>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-6">
                          <div className="space-y-1.5">
                            <p className="text-sm text-muted-foreground font-extrabold">{t.occupation}</p>
                            <p className="text-base font-bold flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-primary" /> {translateContent(selectedPersona.occupation, 'occupations', selectedLang)}
                            </p>
                          </div>
                          <div className="space-y-1.5">
                            <p className="text-sm text-muted-foreground font-extrabold">{t.age}</p>
                            <p className="text-base font-bold flex items-center gap-2">
                              <User className="h-4 w-4 text-primary" /> {selectedPersona.age} ({translateContent(selectedPersona.sex, 'sex', selectedLang)})
                            </p>
                          </div>
                        <div className="pt-2">
                          <p className="text-sm text-muted-foreground font-extrabold mb-3">{t.hobbies}</p>
                          <div className="flex flex-col gap-3">
                            {selectedPersona.hobbies_and_interests.split(/[\n,]+/).map((h, i) => (
                              <div key={i} className="text-[13px] leading-relaxed font-medium bg-primary/5 text-primary border border-primary/10 px-4 py-3 rounded-2xl shadow-sm">
                                {translateContent(h.trim(), 'hobbies', selectedLang)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-[850px] bg-card rounded-3xl border shadow-xl overflow-hidden">
                    <div className="p-6 border-b bg-muted/30 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{t.chatbotTitle}</h3>
                          <div className="flex items-center gap-3">
                            <p className="text-xs text-muted-foreground">{t.chatbotSubtitle}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isLoading && (
                          <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: [0.6, 1, 0.6] }} 
                            transition={{ repeat: Infinity, duration: 1.5 }} 
                            className="h-11 flex items-center justify-center px-8 rounded-xl bg-red-500 text-white shadow-lg text-[13px] font-black leading-tight text-center mr-1"
                          >
                            {t.loadingStatus}
                          </motion.div>
                        )}
                        <Button variant="outline" size="default" onClick={handleBackToSelection} className="border-primary text-primary hover:bg-primary/10 gap-2 text-base font-extrabold transition-all shadow-sm h-11 px-6 active:scale-95">
                          <Languages className="h-5 w-5" />
                          {t.changeLang}
                        </Button>
                        <Button variant="default" size="default" onClick={handleBackToSelection} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-base font-extrabold transition-all shadow-lg hover:shadow-xl hover:scale-105 h-11 px-6 active:scale-95">
                          <MapIcon className="h-5 w-5" />
                          {t.otherRegion}
                        </Button>
                      </div>
                    </div>

                    <ScrollArea className="flex-1 p-6 bg-[#abc1d1]" ref={scrollRef}>
                      <div className="space-y-6">
                        {messages.map((msg, index) => (
                          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className="max-w-[85%] space-y-3">
                              <div className={`p-5 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-[#FEE500] text-black rounded-tr-none shadow-sm font-medium" : "bg-white text-black rounded-tl-none shadow-sm"}`}>
                                {msg.content.split(/(\*\*\*[\s\S]*?\*\*\*|📍\s?\[[^\]\n]+\]|\*\*[\s\S]*?\*\*|\*[\s\S]*?\*)/g).map((part, i) => {
                                  if (part.startsWith('***') && part.endsWith('***')) return <strong key={i} className="text-primary font-bold italic">{part.slice(3, -3)}</strong>;
                                  if (part.startsWith('📍')) {
                                    const match = part.match(/📍\s?\[(.*?)\]/);
                                    if (match) {
                                      const locationName = match[1].trim();
                                      const fullLocationQuery = `${selectedPersona?.province} ${locationName}`;
                                      return (
                                        <span key={i} className="inline-flex items-baseline gap-0.5">
                                          <button onClick={(e) => { e.stopPropagation(); openMapPopup(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullLocationQuery)}`); }} className="p-0.5 rounded hover:bg-red-50 text-red-500 transition-colors align-middle">
                                            <MapPin className="w-3.5 h-3.5 opacity-90 fill-red-500/10" />
                                          </button>
                                          <button onClick={() => openMapPopup(`https://maps.google.com/?q=${encodeURIComponent(fullLocationQuery)}`)} className="text-primary font-bold hover:underline align-baseline">
                                            {locationName}
                                          </button>
                                        </span>
                                      );
                                    }
                                  }
                                  if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
                                  return part;
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={scrollEndRef} className="h-1" />
                      </div>
                    </ScrollArea>

                    <div className="p-6 border-t bg-muted/10 space-y-4">
                      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                        <Input placeholder={t.inputPlaceholder} value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 h-12 rounded-xl bg-background border-primary/20 focus:border-primary transition-all shadow-sm !text-xl md:!text-xl font-semibold" />
                        <Button type="submit" disabled={isLoading} className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/90 shadow-md">
                          <Send className="h-5 w-5" />
                        </Button>
                      </form>

                      <div className="flex items-start gap-3 text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground px-1 bg-white/50 p-3 rounded-xl border border-border/50">
                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div className="flex-1">{t.infoText(selectedPersona)}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="analysis-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Analysis Sub-Navigation */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <button
                  onClick={() => setActiveAnalysis('marine')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${activeAnalysis === 'marine'
                      ? 'bg-primary text-white border-primary shadow-lg'
                      : 'bg-card text-muted-foreground border-border hover:border-primary/50'
                    }`}
                >
                  <Ship className="w-4 h-4" />
                  해양 관광 콘텐츠 AI
                </button>
                <button
                  disabled
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border border-dashed border-border text-muted-foreground/50 cursor-not-allowed"
                >
                  <LayoutGrid className="w-4 h-4" />
                  Coming Soon
                </button>
              </div>

              {activeAnalysis === 'marine' && <MarineDashboard />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default AITravelGuide;
