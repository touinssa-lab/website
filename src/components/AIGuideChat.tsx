import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, MapPin, Briefcase, MessageSquare, Info, ChevronLeft, Trash2, Map as MapIcon, Ship, Users, Languages, Sparkles, Database, ArrowRight, CheckCircle2, Loader2, X, HelpCircle, Play } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { AIGuideTour } from "./AIGuideTour";

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
  "전북": { ko: "전북특별자치도", en: "Jeonbuk", zh: "全罗北道", ja: "全罗北道" },
  "전남": { ko: "전라남도", en: "Jeonnam", zh: "全罗南道", ja: "全罗南道" },
  "경북": { ko: "경상북도", en: "Gyeongbuk", zh: "庆尚北道", ja: "庆尚北道" },
  "경남": { ko: "경상남도", en: "Gyeongnam", zh: "庆尚南道", ja: "庆尚南道" },
  "제주": { ko: "제주특별자치도", en: "Jeju", zh: "济州道", ja: "济州道" },
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

const chatbotTranslations: Record<string, any> = {
  ko: {
    selectRegion: "여행하고 싶은 지역을 선택해주세요.",
    chatbotTitle: "로컬 스토리 챗봇",
    chatbotSubtitle: "현지인의 시선으로 여행을 설계하세요",
    inputPlaceholder: "질문을 입력하세요...",
    loadingStatus: "답변 중입니다. 잠시만 기다려주세요",
    occupation: "직업",
    age: "나이",
    hobbies: "취미 및 관심사",
    guideSuffix: "가이드",
    changeLang: "언어 변경하기",
    otherRegion: "다른 지역 여행하기",
    limitExceeded: "질문 횟수를 초과했습니다.",
    authRequired: "로컬 스토리 챗봇은 회원 전용 서비스입니다.",
    quickSignUp: "1분 간편 회원가입",
    login: "로그인하기",
    loggedIn: "로그인 중",
    logout: "로그아웃",
    guideButton: "AI챗봇 이용안내 가이드",
    tour: {
      step0_title: "AI 가이드 이용 안내",
      step0_content: "로컬 스토리 챗봇을 처음 이용하시나요? 1분 만에 주요 기능을 안내해 드릴게요!",
      step1_title: "로그인 후 이용 가능",
      step1_content: "로컬 스토리 챗봇은 회원 전용 서비스입니다. 먼저 회원가입 및 로그인을 완료해 주세요.",
      step2_title: "언어 선택",
      step2_content: "한국어뿐만 아니라 영어, 중국어, 일본어로도 대화할 수 있습니다. 언어 변경하기 버튼을 클릭하시면 상단에 다른 언어로 변경할 수 있습니다.",
      step3_title: "선택한 지역 로컬 가이드 등장",
      step3_content: "선택하신 지역의 실제 거주자를 기반으로 한 AI 페르소나가 등장합니다. 현지인의 생생한 이야기를 들어보세요.",
      step4_title: "다른 지역 여행하기",
      step4_content: "다른 지역의 정보가 궁금하다면 언제든지 이 버튼을 눌러 지도로 이동할 수 있습니다.",
      step5_title: "AI와 대화하기",
      step5_content: "궁금한 맛집, 명소, 코스 등을 자유롭게 질문해 보세요. AI가 당신을 위한 여행을 설계해 드립니다.",
      step6_title: "지도 및 길안내",
      step6_content: "AI가 추천한 장소명을 클릭하면 지도에서 위치를 확인하고, 지도핀을 클릭하면 현재 위치에서의 길안내를 받을 수 있습니다.",
    },
    infoText: (selectedPersona: any, isUnlimited: boolean, isMember: boolean) => {
      return (
        <div className="space-y-2">
          <p className="font-bold text-sky-700">
            {isMember ? "● 로그인 상태입니다. 로컬 스토리 챗봇 서비스를 이용하실 수 있습니다." : "● 서비스 이용을 위해 로그인을 해주세요."}
          </p>
          <ul className="space-y-1 list-none">
            <li>- AI 페르소나의 답변은 정보의 무결성에 오차(예: 폐업, 당일 임시 휴무 등)가 있을 수 있습니다.</li>
            <li className="text-red-500 font-bold">- 질문 입력 후 잠시만 기다려 주세요. 네트워크 상황에 따라 시간이 걸릴 수 있습니다.</li>
            <li>- AI가 안내한 <span className="text-sky-600 font-bold underline underline-offset-2">장소명</span>을 클릭하면 지도에서 상세 위치를 보여줍니다.</li>
            <li>- 장소명 앞에 표시된 <span className="text-red-500 font-bold">'빨간색 지도핀'</span>을 클릭하면 현재 위치에서 해당 장소까지 길안내를 보여줍니다.</li>
            <li>- <span className="text-sky-600 font-bold italic">"{selectedPersona?.district || '구로구'}에서 하루종일 놀 수 있는 코스 짜주세요"</span>라고 입력해 보세요.</li>
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
    loggedIn: "Logged In",
    logout: "Logout",
    guideButton: "AI Chatbot User Guide",
    tour: {
      step0_title: "AI Guide Introduction",
      step0_content: "New to Local Story Chatbot? Let us guide you through the key features in just 1 minute!",
      step1_title: "Login Required",
      step1_content: "Local Story Chatbot is a members-only service. Please complete sign-up and login first.",
      step2_title: "Language Selection",
      step2_content: "You can chat in English, Chinese, and Japanese as well as Korean. Click the 'Change Language' button to switch languages at the top.",
      step3_title: "Local Guide Appearance",
      step3_content: "An AI persona based on an actual resident of your selected region appears. Hear authentic local stories.",
      step4_title: "Explore Other Regions",
      step4_content: "If you're curious about other regions, click this button to return to the map anytime.",
      step5_title: "Chat with AI",
      step5_content: "Ask about restaurants, attractions, or travel courses. AI will design the perfect trip for you.",
      step6_title: "Maps & Directions",
      step6_content: "Click a place name to see its location on the map, or click the map pin for directions from your current location.",
    },
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
    guideButton: "AI聊天机器人使用指南",
    tour: {
      step0_title: "AI指南介绍",
      step0_content: "第一次使用本地故事聊天机器人吗？让我们在1分钟内为您介绍主要功能！",
      step1_title: "需要登录",
      step1_content: "本地故事聊天机器人是会员专用服务。请先完成注册并登录。",
      step2_title: "语言选择",
      step2_content: "除了韩语，您还可以用英语、中文和日语聊天。点击“更改语言”按钮即可在上方切换语言。",
      step3_title: "当地导游登场",
      step3_content: "基于您选择区域的实际居民的AI角色将会出现。听听真实的当地故事。",
      step4_title: "探索其他地区",
      step4_content: "如果您对其他地区感兴趣，可以随时点击此按钮返回地图。",
      step5_title: "与AI交流",
      step5_content: "自由提问美食、景点或旅行路线。AI将为您规划完美的旅行。",
      step6_title: "地图与路线",
      step6_content: "点击地点名称可在地图上查看位置，点击地图图标可获取从当前位置出发的路线导航。",
    },
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
    guideButton: "AIチャットボット利用ガイド",
    tour: {
      step0_title: "AIガイド利用案内",
      step0_content: "ローカルストーリーチャットボットは初めてですか？1分で主な機能をご案内します！",
      step1_title: "ログインが必要です",
      step1_content: "ローカルストーリーチャットボットは会員専用サービスです。まず会員登録とログインを完了してください。",
      step2_title: "言語選択",
      step2_content: "韓国語だけでなく、英語、中国語、日本語でも会話できます。「言語を変更」ボタンをクリックすると、上部で他の言語に切り替えることができます。",
      step3_title: "現地ガイドの登場",
      step3_content: "選択した地域の実際の居住者に基づいたAIペルソナが登場します。現地人のリアルな話を聞いてみてください。",
      step4_title: "他の地域を旅する",
      step4_content: "他の地域の情報が気になる場合は、いつでもこのボタンを押して地図に戻ることができます。",
      step5_title: "AIと対話する",
      step5_content: "おすすめのグルメ, 名所, コースなどを自由に質問してみてください。AIがあなたのために旅行を設計します。",
      step6_title: "地図とルート案内",
      step6_content: "場所名をクリックすると地図で位置を確認でき、ピンをクリックすると現在地からのルート案内を受けられます。",
    },
    infoText: (selectedPersona: any, isUnlimited: boolean, isMember: boolean) => {
      return (
        <div className="space-y-2">
          <p className="font-bold text-sky-700">
            {isMember ? "● ログイン中です。ローカルストーリーチャットボットサービスを利用できます。" : "● サービス利用のためにログインしてください。"}
          </p>
          <ul className="space-y-1 list-none">
            <li>- AIペルソナの回答は情報の無謬性に誤差（例：廃業、当日臨時休業など）がある場合があります。</li>
            <li className="text-red-500 font-bold">- 質問入力後, しばらくお待ちください. ネットワーク状況により時間がかかる場合があります.</li>
            <li>- AIが案内した<span className="text-sky-600 font-bold underline underline-offset-2">場所名</span>をクリックすると地図で詳細な位置を表示します。</li>
            <li>- 場所名の前に表示された<span className="text-red-500 font-bold">「赤い地図ピン」</span>をクリックすると現在地からその場所までのルート案内を表示します。</li>
            <li>- <span className="text-sky-600 font-bold italic">「{selectedPersona?.district || '九老区'}で一日中遊べるコースを立ててください」</span>と入力してみてください。</li>
          </ul>
        </div>
      );
    },
  },
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
  const [modalInitialStep, setModalInitialStep] = useState(1);
  const [isTourOpen, setIsTourOpen] = useState(false);
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
      zh: `我是居住在 ${translateContent(randomPersona.district, 'districts', 'zh').replace('-', ' ')} 的 ${translateContent(randomPersona.occupation, 'occupations', 'zh')}。关于我们这里，您有什么想了解的尽管问我吧！`,
      ja: `私は ${translateContent(randomPersona.district, 'districts', 'ja').replace('-', ' ')} に住んでいる ${translateContent(randomPersona.occupation, 'occupations', 'ja')} です。私たちの街について気になることがあれば何でも聞いてくださいね！`,
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
        3. **Formatting**: Use [LocationName] for map links. Example: [Namsan Tower].
        4. **Persona**: You are a real person, not an AI.
      `;

      const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
      if (!API_KEY) throw new Error("API Key is missing in environment variables.");

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
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
      <div className="flex flex-col xl:flex-row items-center justify-between mb-8 gap-4 xl:gap-8 relative z-50 w-full max-w-6xl mx-auto transition-all duration-500">
        <div className="w-full xl:w-[550px] shrink-0">
          <div className="flex items-center justify-between bg-white/90 backdrop-blur-md rounded-full px-4 md:px-6 py-2 shadow-lg border border-sky-100 h-[56px]">
            <p className="text-[11px] md:text-sm font-bold text-slate-600 truncate mr-2">{t.authRequired}</p>
            {isMember ? (
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 md:gap-2 text-sky-600 font-extrabold text-[10px] md:text-sm bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100 whitespace-nowrap">
                  <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                  {t.loggedIn}
                </div>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-[9px] md:text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100 transition-colors whitespace-nowrap cursor-pointer active:scale-95"
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <div id="tour-login-section" className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => { setModalInitialStep(1); setIsAuthModalOpen(true); }}
                  className="text-[9px] md:text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-100 transition-colors whitespace-nowrap cursor-pointer active:scale-95"
                >
                  {t.quickSignUp}
                </button>
                <button 
                  onClick={() => { setModalInitialStep(2); setIsAuthModalOpen(true); }}
                  className="text-[9px] md:text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 transition-colors whitespace-nowrap cursor-pointer active:scale-95"
                >
                  {t.login}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-full xl:w-[550px] flex justify-end shrink-0">
          <AnimatePresence mode="wait">
            {!selectedPersona ? (
              <motion.div 
                key="lang-selector"
                id="tour-language-selector" 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full"
              >
                <div className="flex bg-white/80 backdrop-blur-md rounded-full p-1 shadow-xl border border-sky-100 items-center h-[56px]">
                  <div className="px-5 py-2 flex items-center gap-2 text-sky-600 border-r border-sky-100 mr-1 shrink-0">
                    <Languages className="w-4 h-4" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider hidden sm:inline">Language</span>
                  </div>
                  <div className="flex flex-1 justify-around gap-1 px-1">
                    {Object.entries(langConfig).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedLang(key as Language)}
                        className={`flex-1 px-2 py-2 rounded-xl text-[11px] md:text-sm font-bold transition-all duration-300 whitespace-nowrap text-center cursor-pointer active:scale-95 hover:bg-sky-50
                          ${selectedLang === key ? 'bg-sky-500 text-white shadow-md' : 'text-slate-500 hover:text-sky-600'}
                        `}
                      >
                        {config.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="guide-button"
                id="tour-guide-button"
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                className="shrink-0"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsTourOpen(true)}
                  className="relative group overflow-hidden bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 bg-[length:200%_auto] hover:bg-[100%_auto] text-white px-6 py-3 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-3 transition-all duration-300 border-2 border-white/20 h-[56px]"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold text-sm md:text-base whitespace-nowrap">{t.guideButton}</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!selectedPersona ? (
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start max-w-6xl mx-auto">
          <motion.div id="tour-map-section" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 w-full max-w-[550px]">
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
          <motion.div id="tour-region-buttons" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-[550px]">
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
          <motion.div id="tour-persona-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
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

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-[830px] bg-card rounded-3xl border shadow-xl overflow-hidden">
            <div className="p-4 md:p-6 border-b bg-muted/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div id="tour-chatbot-header" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"><MessageSquare className="h-5 w-5" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base md:text-lg whitespace-nowrap">{t.chatbotTitle}</h3>
                  </div>
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
                  <Button variant="outline" id="tour-change-lang-button" onClick={() => setSelectedPersona(null)} className="flex-1 md:flex-none border-primary text-primary hover:bg-primary/10 gap-1.5 md:gap-2 font-extrabold h-10 md:h-11 px-3 md:px-6 text-xs md:text-sm"><Languages className="h-4 w-4 md:h-5 md:w-5" /> {t.changeLang}</Button>
                  <Button variant="default" id="tour-explore-other" onClick={() => setSelectedPersona(null)} className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 md:gap-2 font-extrabold h-10 md:h-11 px-3 md:px-6 text-xs md:text-sm"><MapIcon className="h-4 w-4 md:h-5 md:w-5" /> {t.otherRegion}</Button>
                </div>
              </div>
            </div>

            <ScrollArea id="tour-chat-area" className="flex-1 p-6 bg-[#abc1d1]">
              <div className="space-y-6">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[85%] space-y-3">
                      <div className={`p-5 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-[#FEE500] text-black rounded-tr-none shadow-sm" : "bg-white text-black rounded-tl-none shadow-sm"}`}>
                        {msg.content.split(/(\[[^\]]+\]|\*\*[\s\S]*?\*\*)/g).map((part, i) => {
                          if (part.startsWith('[') && part.endsWith(']')) {
                            const locationName = part.slice(1, -1);
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

            <div id="tour-chat-input" className="p-6 border-t bg-muted/10 space-y-4">
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
      <PanelRegistrationModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} initialStep={modalInitialStep} />
      
      {isTourOpen && (
        <AIGuideTour 
          isOpen={isTourOpen} 
          onClose={() => setIsTourOpen(false)} 
          isMember={isMember}
          translations={t.tour}
        />
      )}
    </div>
  );
};

export default AIGuideChat;
