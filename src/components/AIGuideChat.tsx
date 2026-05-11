import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, MapPin, Briefcase, MessageSquare, Info, ChevronLeft, Trash2, Map as MapIcon, Ship, Users, Languages, Sparkles, Database } from "lucide-react";
import personasData from "@/data/personas_sample.json";
import personaTranslations from "@/data/persona_translations.json";
import SouthKoreaMap from "@/components/SouthKoreaMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { PanelRegistrationModal } from "@/components/survey/PanelRegistrationModal";
import { supabase } from "@/lib/supabase";

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
    if (type === 'districts') {
      for (const [key, trans] of Object.entries(category)) {
        if (key.endsWith('-' + text) || key === text) {
          if ((trans as any)[lang]) return (trans as any)[lang];
        }
      }
    }
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
  return { image: `${basePath}.png`, video: `${basePath}.mp4` };
};

const chatbotTranslations = {
  ko: {
    selectRegion: "여행하고 싶은 지역을 선택해 주세요.",
    chatbotTitle: "로컬 스토리 챗봇",
    chatbotSubtitle: "현지인의 시선으로 여행을 설계하세요",
    inputPlaceholder: "질문을 입력하세요...",
    loadingStatus: "답변 중입니다. 잠시만 기다려 주세요",
    occupation: "직업",
    age: "나이",
    hobbies: "취미 및 관심사",
    guideSuffix: "가이드",
    changeLang: "언어 변경하기",
    otherRegion: "다른 지역 여행하기",
    limitExceeded: "질문 횟수가 초과되었습니다.",
    authRequired: "로컬 스토리 챗봇은 회원만 이용하실 수 있습니다.",
    quickSignUp: "1분 간단 회원가입하기",
    login: "로그인하기",
    loggedIn: "로그인 중",
    logout: "로그아웃",
    infoText: (selectedPersona: any, isUnlimited: boolean, isMember: boolean) => {
      return (
        <div className="space-y-2">
          <p className="font-bold text-sky-700">
            {isMember ? "● 로그인 중입니다. 로컬 스토리 챗봇 서비스를 이용하실 수 있습니다." : "● 로그인 후 이용하실 수 있습니다."}
          </p>
          <ul className="space-y-1 list-none">
            <li>- AI 페르소나의 답변에는 정보의 무결성에 오차(예: 안내 장소 폐업, 당일 임시 휴무 등)가 있을 수 있습니다.</li>
            <li className="text-red-500 font-bold">- 질문 입력 후 잠시만 기다려 주세요. 네트워크 상황에 따라 시간이 걸릴 수 있습니다.</li>
            <li>- AI가 안내한 <span className="text-sky-600 font-bold underline underline-offset-2">장소명</span>을 클릭하면 지도로 상세 위치를 보여줍니다.</li>
            <li>- 장소명 앞에 표시된 <span className="text-red-500 font-bold">'빨간색 지도핀'</span>을 클릭하면 현재 위치에서 해당 장소까지 길안내를 보여줍니다.</li>
            <li>- <span className="text-sky-600 font-bold italic">"'{selectedPersona?.district || '구로구'}'에서 하루종일 놀 수 있는 코스 짜주세요"</span> 라고 입력해 보세요.</li>
          </ul>
        </div>
      );
    },
  },
  en: {
    selectRegion: "Please select the region you want to travel to.",
    chatbotTitle: "Local Story Chatbot",
    chatbotSubtitle: "Plan your trip through the eyes of a local",
    inputPlaceholder: "Ask a question...",
    loadingStatus: "Answering. Please wait a moment",
    occupation: "Occupation",
    age: "Age",
    hobbies: "Hobbies & Interests",
    guideSuffix: "Guide",
    changeLang: "Change Language",
    otherRegion: "Travel to other regions",
    limitExceeded: "Question limit exceeded.",
    authRequired: "Local Story Chatbot is for members only.",
    quickSignUp: "1-min Quick Sign-up",
    login: "Login",
    loggedIn: "Logged in",
    logout: "Logout",
    infoText: (selectedPersona: any, isUnlimited: boolean, isMember: boolean) => {
      return (
        <div className="space-y-2">
          <p className="font-bold text-sky-700">
            {isMember ? "● You are logged in. You can use the local story chatbot service." : "● Please login to use this service."}
          </p>
          <ul className="space-y-1 list-none">
            <li>- AI persona's responses may have errors in information integrity (e.g., closed locations, temporary holidays).</li>
            <li className="text-red-500 font-bold">- Please wait a moment after entering your question. It may take time depending on network conditions.</li>
            <li>- Clicking on the <span className="text-sky-600 font-bold underline underline-offset-2">Location Name</span> provided by the AI will show the detailed location on a map.</li>
            <li>- Clicking on the <span className="text-red-500 font-bold">'Red Map Pin'</span> in front of the location name will show directions from your current location.</li>
            <li>- Try typing: <span className="text-sky-600 font-bold italic">"Please plan a course to play all day in '{selectedPersona?.district || 'Guro-gu'}'"</span></li>
          </ul>
        </div>
      );
    },
  },
  zh: {
    selectRegion: "请选择您想旅行的地区。",
    chatbotTitle: "当地故事聊天机器人",
    chatbotSubtitle: "以当地人的视角规划行程",
    inputPlaceholder: "请输入问题...",
    loadingStatus: "正在回答中，请稍候",
    occupation: "职业",
    age: "年龄",
    hobbies: "爱好与兴趣",
    guideSuffix: "指南",
    changeLang: "更改语言",
    otherRegion: "前往其他地区",
    limitExceeded: "超出提问次数限制。",
    authRequired: "本地故事聊天机器人仅限会员使用。",
    quickSignUp: "1分钟快速注册",
    login: "登录",
    loggedIn: "已登录",
    logout: "登出",
    infoText: (selectedPersona: any, isUnlimited: boolean, isMember: boolean) => {
      return (
        <div className="space-y-2">
          <p className="font-bold text-sky-700">
            {isMember ? "● 您已登录。您可以使用本地故事聊天机器人服务。" : "● 请登录后使用此服务。"}
          </p>
          <ul className="space-y-1 list-none">
            <li>- AI人格的回答可能在信息完整性方面存在误差（例如：场所停业、临时休息等）。</li>
            <li className="text-red-500 font-bold">- 输入问题后请稍候。根据网络情况，可能需要一些时间。</li>
            <li>- 点击AI提供的<span className="text-sky-600 font-bold underline underline-offset-2">地点名称</span>，将在地图上显示详细位置。</li>
            <li>- 点击地点名称前的<span className="text-red-500 font-bold">“红色地图图钉”</span>，将显示从当前位置到该地点的路线指引。</li>
            <li>- 请尝试输入：<span className="text-sky-600 font-bold italic">"请帮我制定一个在‘{selectedPersona?.district || '九老区'}’玩一整天的路线"</span></li>
          </ul>
        </div>
      );
    },
  },
  ja: {
    selectRegion: "旅行したい地域を選択してください。",
    chatbotTitle: "ローカルストーリーチャットボット",
    chatbotSubtitle: "地元の方の視点で旅行を設計しましょう",
    inputPlaceholder: "質問を入力してください...",
    loadingStatus: "回答中です. しばらくお待ちください",
    occupation: "職業",
    age: "年齢",
    hobbies: "趣味・関心事",
    guideSuffix: "ガイド",
    changeLang: "言語を変更",
    otherRegion: "他の地域へ行く",
    limitExceeded: "質問回数が制限を超えました.",
    authRequired: "ローカルストーリーチャットボットは会員のみ利用可能です。",
    quickSignUp: "1分で簡単会員登録",
    login: "ログイン",
    loggedIn: "ログイン中",
    logout: "ログアウト",
    infoText: (selectedPersona: any, isUnlimited: boolean, isMember: boolean) => {
      return (
        <div className="space-y-2">
          <p className="font-bold text-sky-700">
            {isMember ? "● ログイン中です。ローカルストーリーチャットボットサービスをご利用いただけます。" : "● ログイン後にご利用いただけます。"}
          </p>
          <ul className="space-y-1 list-none">
            <li>- AIペルソナ의回答에는情報の完全性に誤差（例：案内場所の廃業、当日臨時休業など）がある場合があります.</li>
            <li className="text-red-500 font-bold">- 質問入力後、少々お待ちください. ネットワーク状況により時間がかかる場合があります.</li>
            <li>- AIが案内した <span className="text-sky-600 font-bold underline underline-offset-2">場所名</span> をクリックすると, 地図で詳細な位置を表示します.</li>
            <li>- 場所名の前に表示されている <span className="text-red-500 font-bold">'赤い地図ピン'</span> をクリックすると, 現在地からその場所までのルート案内を表示します.</li>
            <li>- <span className="text-sky-600 font-bold italic">「『{selectedPersona?.district || '九老区'}』で一日中遊べるコースを立ててください」</span>と入力してみてください.</li>
          </ul>
        </div>
      );
    },
  }
};

interface AIGuideChatProps {
  isUnlimited?: boolean;
}

const AIGuideChat = ({ isUnlimited = false }: AIGuideChatProps) => {
  const [selectedLang, setSelectedLang] = useState<Language>('ko');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatCount, setChatCount] = useState<number>(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const isMember = !!user;

  useEffect(() => {
    if (isMember) {
      localStorage.setItem('touinssa_is_member', 'true');
    } else {
      localStorage.removeItem('touinssa_is_member');
    }
  }, [isMember]);

  const t = chatbotTranslations[selectedLang];

  const processedPersonas = personasData.map((p: any) => {
    let province = p.district.includes('-') ? p.district.split('-')[0].trim() : (p.province || '기타').trim();
    const district = p.district.includes('-') ? p.district.split('-')[1].trim() : p.district.trim();
    if (province === "경상남") province = "경남";
    if (province === "경상북") province = "경북";
    if (province === "전라남") province = "전남";
    if (province === "충청남") province = "충남";
    if (province === "충청북") province = "충북";
    return { ...p, province, district };
  });

  const provinces = Array.from(new Set(processedPersonas.map((p: any) => p.province)))
    .filter(p => p && p !== "country")
    .sort((a, b) => {
      const order = Object.keys(provinceTranslations);
      return order.indexOf(a) - order.indexOf(b);
    });

  useEffect(() => {
    if (!isUnlimited) {
      const today = new Date().toISOString().split('T')[0];
      const savedCount = localStorage.getItem('touinssa_chat_count');
      const savedDate = localStorage.getItem('touinssa_chat_date');
      if (savedDate !== today) {
        setChatCount(0);
        localStorage.setItem('touinssa_chat_count', '0');
        localStorage.setItem('touinssa_chat_date', today);
      } else if (savedCount) {
        setChatCount(parseInt(savedCount, 10));
      }
    }
  }, [isUnlimited]);

  useEffect(() => {
    if (!isUnlimited) {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('touinssa_chat_count', chatCount.toString());
      localStorage.setItem('touinssa_chat_date', today);
    }
  }, [chatCount, isUnlimited]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  const handleProvinceSelect = (provinceName: string) => {
    setSelectedProvince(provinceName);
    const filtered = processedPersonas.filter((p: any) => p.province === provinceName);
    const randomPersona = filtered[Math.floor(Math.random() * filtered.length)] as any;
    const media = getPersonaMedia(randomPersona.age, randomPersona.sex);
    randomPersona.image = media.image;
    randomPersona.video = media.video;
    setSelectedPersona(randomPersona);

    const greetings: Record<Language, string> = { ko: "안녕하세요!", en: "Hello!", zh: "您好！", ja: "こんにちは！" };
    if (selectedLang === 'ko') {
      if (["부산", "경남", "경북", "대구", "울산"].includes(provinceName)) greetings.ko = "반갑습니데이!";
      else if (["전남", "전북", "광주"].includes(provinceName)) greetings.ko = "반갑구만잉~";
      else if (provinceName === "제주") greetings.ko = "반갑수다!";
    }

    const introText = {
      ko: `저는 ${translateContent(randomPersona.district, 'districts', 'ko').replace('-', ' ')}에 살고 있는 ${translateContent(randomPersona.occupation, 'occupations', 'ko')}입니다. 우리 동네에 대해 궁금한 거 있으면 뭐든 물어보세요!`,
      en: `I am a ${translateContent(randomPersona.occupation, 'occupations', 'en')} living in ${translateContent(randomPersona.district, 'districts', 'en').replace('-', ' ')}. Ask me anything about our neighborhood!`,
      zh: `我是住在 ${translateContent(randomPersona.district, 'districts', 'zh').replace('-', ' ')} 的一名 ${translateContent(randomPersona.occupation, 'occupations', 'zh')}。如果您对我们这里有什么好奇的，尽管问我！`,
      ja: `私は ${translateContent(randomPersona.district, 'districts', 'ja').replace('-', ' ')} に住んでいる ${translateContent(randomPersona.occupation, 'occupations', 'ja')} です. 私たちの街について気になることがあれば, 何でも聞いてください！`
    };

    setMessages([{ role: "bot", content: `${greetings[selectedLang]} ${introText[selectedLang]}` }]);
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

    // Member check
    if (!isMember) {
      const loginStatusMsg = {
        ko: "로그인 후 이용하실 수 있습니다.",
        en: "Please login to use this service.",
        zh: "请登录后使用此服务。",
        ja: "ログイン後にご利用いただけます。"
      };
      toast.error(loginStatusMsg[selectedLang]);
      return;
    }

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    if (!isUnlimited && chatCount >= 5) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", content: t.limitExceeded }]);
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
        1. **Tone**: Speak naturally and warmly like a friendly neighbor.
        2. **Language**: Always reply in ${selectedLang}.
        3. **Formatting**: Use 📍[LocationName] for map links. Example: 📍[Namsan Tower].
        4. **Persona**: You are a real person, not an AI.
      `;

      const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
      if (!API_KEY) throw new Error("API Key is missing in environment variables.");

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `SYSTEM INSTRUCTION: ${systemInstruction}\n\nPlease follow the instruction above for all subsequent messages.` }]
            },
            {
              role: "model",
              parts: [{ text: "Understood. I will act as the travel guide with the persona you described." }]
            },
            ...messages.map((m) => ({
              role: m.role === 'bot' ? 'model' : 'user',
              parts: [{ text: m.content }]
            })),
            {
              role: "user",
              parts: [{ text: userMessage }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        })
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error?.message || "AI Response Error");
      }

      const botContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!botContent) throw new Error("Empty response from AI");

      setMessages((prev) => [...prev, { role: "bot", content: botContent }]);
      setChatCount(prev => prev + 1);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Error: " + error.message);
      console.error("Chat Error:", error);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row items-center lg:items-start mb-8 gap-12 relative z-50 w-full max-w-6xl mx-auto">
        {/* Auth Info Section - Aligned with Map (max-w-[550px]) */}
        <div className="flex-1 w-full lg:max-w-[550px]">
          <div className="flex items-center justify-between bg-white/90 backdrop-blur-md rounded-full px-6 py-2 shadow-lg border border-sky-100 h-[56px]">
            <p className="text-xs md:text-sm font-bold text-slate-600 truncate mr-2">{t.authRequired}</p>
            {isMember ? (
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-2 text-sky-600 font-extrabold text-xs md:text-sm bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100 whitespace-nowrap">
                  <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  {t.loggedIn}
                </div>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-[10px] md:text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 transition-colors whitespace-nowrap cursor-pointer active:scale-95"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-[10px] md:text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 transition-colors whitespace-nowrap cursor-pointer active:scale-95"
                >
                  {t.quickSignUp}
                </button>
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-[10px] md:text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 transition-colors whitespace-nowrap cursor-pointer active:scale-95"
                >
                  {t.login}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Language Selection Section - Aligned with Region Selection (lg:w-[550px]) */}
        <div className="w-full lg:w-[550px]">
          <div className="flex bg-white/80 backdrop-blur-md rounded-full p-1 shadow-xl border border-sky-100 items-center h-[56px]">
            <div className="px-3 md:px-5 py-2 flex items-center gap-2 text-sky-600 border-r border-sky-100 mr-1 shrink-0">
              <Languages className="w-4 h-4" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider hidden sm:inline">Language</span>
            </div>
            <div className="flex flex-1 justify-around">
              {Object.entries(langConfig).map(([key, config]) => {
                const isSelected = selectedLang === key;
                const isDisabled = !!selectedPersona;
                
                return (
                  <button
                    key={key}
                    onClick={() => !isDisabled && setSelectedLang(key as Language)}
                    disabled={isDisabled}
                    className={`flex-1 mx-0.5 px-2 md:px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap text-center
                      ${isDisabled 
                        ? 'cursor-not-allowed opacity-30 grayscale' 
                        : 'cursor-pointer active:scale-95 hover:bg-sky-50'
                      }
                      ${isSelected 
                        ? (isDisabled ? 'bg-slate-400 text-white shadow-none' : 'bg-sky-500 text-white shadow-md')
                        : (isDisabled ? 'text-slate-400' : 'text-slate-500 hover:text-sky-600')
                      }
                    `}
                  >
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {!selectedPersona ? (
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 w-full max-w-[550px]">
            <div className="bg-card/50 backdrop-blur-xl rounded-3xl p-4 md:p-6 shadow-2xl border border-border/50 relative overflow-hidden group">
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
                <Button key={prov} variant="outline" className="h-[72px] text-[15px] font-bold hover:bg-primary/10 hover:text-primary border-primary/20 bg-primary/5 rounded-2xl" onClick={() => handleProvinceSelect(prov)}>
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
                  <p className="text-sm opacity-90 flex items-center gap-1"><MapPin className="h-3 w-3" /> {provinceTranslations[selectedPersona.province][selectedLang]} {translateContent(selectedPersona.district, 'districts', selectedLang)}</p>
                </div>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-1.5">
                  <p className="text-sm text-muted-foreground font-extrabold">{t.occupation}</p>
                  <p className="text-base font-bold flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" /> {translateContent(selectedPersona.occupation, 'occupations', selectedLang)}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm text-muted-foreground font-extrabold">{t.age}</p>
                  <p className="text-base font-bold flex items-center gap-2"><User className="h-4 w-4 text-primary" /> {selectedPersona.age} ({translateContent(selectedPersona.sex, 'sex', selectedLang)})</p>
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

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-[750px] bg-card rounded-3xl border shadow-xl overflow-hidden">
            <div className="p-4 md:p-6 border-b bg-muted/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"><MessageSquare className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-bold text-base md:text-lg whitespace-nowrap">{t.chatbotTitle}</h3>
                  <p className="text-[11px] md:text-xs text-muted-foreground">{t.chatbotSubtitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                {isLoading && (
                  <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-10 md:h-11 flex items-center justify-center px-4 md:px-8 rounded-xl bg-red-500 text-white shadow-lg text-[11px] md:text-[13px] font-black mr-1 whitespace-nowrap">
                    {t.loadingStatus}
                  </motion.div>
                )}
                <div className="flex gap-2 w-full md:w-auto">
                  <Button variant="outline" onClick={() => setSelectedPersona(null)} className="flex-1 md:flex-none border-primary text-primary hover:bg-primary/10 gap-1.5 md:gap-2 font-extrabold h-10 md:h-11 px-3 md:px-6 text-xs md:text-sm"><Languages className="h-4 w-4 md:h-5 md:w-5" /> {t.changeLang}</Button>
                  <Button variant="default" onClick={() => setSelectedPersona(null)} className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 md:gap-2 font-extrabold h-10 md:h-11 px-3 md:px-6 text-xs md:text-sm"><MapIcon className="h-4 w-4 md:h-5 md:w-5" /> {t.otherRegion}</Button>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6 bg-[#abc1d1]">
              <div className="space-y-6">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[85%] space-y-3">
                      <div className={`p-5 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-[#FEE500] text-black rounded-tr-none shadow-sm" : "bg-white text-black rounded-tl-none shadow-sm"}`}>
                        {msg.content.split(/(📍\s?\[[^\]]+\]|\*\*[\s\S]*?\*\*)/g).map((part, i) => {
                          if (part.match(/📍\s?\[(.*?)\]/)) {
                            const match = part.match(/📍\s?\[(.*?)\]/);
                            if (match) {
                              const locationName = match[1].trim();
                              const provinceName = selectedPersona?.province || "";
                              const fullLocationQuery = `${provinceName} ${locationName}`;
                              return (
                                <span key={i} className="inline-flex items-center gap-1 mx-1.5 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100 shadow-sm relative top-[-1px] align-middle">
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); openMapPopup(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullLocationQuery)}`); }} 
                                    className="p-0.5 rounded text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                    title="길찾기"
                                  >
                                    <MapPin className="w-3.5 h-3.5 fill-red-500" />
                                  </button>
                                  <button 
                                    onClick={() => openMapPopup(`https://maps.google.com/?q=${encodeURIComponent(fullLocationQuery)}`)} 
                                    className="text-sky-600 font-bold hover:underline cursor-pointer text-[14px]"
                                    title="지도 보기"
                                  >
                                    {locationName}
                                  </button>
                                </span>
                              );
                            }
                          }
                          if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-bold text-sky-800">{part.slice(2, -2)}</strong>;
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
                <Input placeholder={t.inputPlaceholder} value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 h-12 rounded-xl bg-background border-primary/20 text-base font-semibold" />
                <Button type="submit" disabled={isLoading} className="h-12 w-12 rounded-xl bg-primary shadow-md"><Send className="h-5 w-5" /></Button>
              </form>
              <div className="flex items-start gap-3 text-[13px] text-muted-foreground px-1 bg-white/50 p-3 rounded-xl border border-border/50">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="flex-1">{t.infoText(selectedPersona, isUnlimited, isMember)}</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <PanelRegistrationModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </div>
  );
};

export default AIGuideChat;
