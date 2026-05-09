import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = Object.fromEntries(
  envContent.split('\n').filter(line => line.includes('=')).map(line => line.trim().split('='))
);

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// --- MAY 8 DATA (Extracted from static files) ---
const keywords8 = [
  { target_date: '2026-05-08', section: '여행', rank: 1, keyword: '속초 가볼만한곳', interest: 85, change: '+12%' },
  { target_date: '2026-05-08', section: '여행', rank: 2, keyword: '제주도 렌터카', interest: 72, change: '+5%' },
  { target_date: '2026-05-08', section: '관광', rank: 1, keyword: '지역 축제 일정', interest: 94, change: '+18%' },
  { target_date: '2026-05-08', section: '관광', rank: 2, keyword: '워케이션 명소', interest: 68, change: '+10%' }
];

const insights8 = [
  { target_date: '2026-05-08', keyword: 'Workation', category: '라이프스타일', reason: '디지털 노마드 증가에 따른 체류형 관광 수요 급증', type: 'analysis' },
  { target_date: '2026-05-08', keyword: 'Sokcho', category: '지역 명소', reason: '새로운 랜드마크 오픈 및 접근성 개선으로 인한 관심도 상승', type: 'unique' }
];

const articles8 = [
  { 
    target_date: '2026-05-08', 
    category: 'AI & Data', 
    title: "피지컬 AI 시대 안전 과제 논의…AI안전포럼 1차 간담회 개최", 
    press: '전자신문', 
    link: 'https://www.etnews.com/20260508000194', 
    thumbnail: 'https://img.etnews.com/news/article/2026/05/08/news-p.v1.20260508.9498ca40f0ab44e68b4532bf2f30b3ee_P1.png', 
    excerpt: "최근 '피지컬 AI' 기술이 부상하면서 이를 둘러싼 안전성 문제가 화두로 떠오르고 있습니다. 정부는 이러한 흐름에 맞춰 AI안전포럼 1차 간담회를 개최하여 각계 전문가들의 의견을 수렴했습니다.",
    tag: '인공지능'
  }
];

// --- MAY 9 DATA (New) ---
const keywords9 = [
  { target_date: '2026-05-09', section: '여행', rank: 1, keyword: '에이전틱 AI', interest: 98, change: '+15%' },
  { target_date: '2026-05-09', section: '여행', rank: 2, keyword: '초개인화 여정', interest: 85, change: '+8%' },
  { target_date: '2026-05-09', section: '관광', rank: 1, keyword: '디지털 휴머니티', interest: 92, change: '+12%' },
  { target_date: '2026-05-09', section: '관광', rank: 2, keyword: '스마트 관광 도시', interest: 78, change: '+5%' }
];

const insights9 = [
  { target_date: '2026-05-09', keyword: 'Agentic AI', category: '기술 혁신', reason: '단순 정보 제공을 넘어 예약까지 수행하는 AI 에이전트 시장 급성장', type: 'analysis' },
  { target_date: '2026-05-09', keyword: 'Digital Humanity', category: '감성 관광', reason: '기술의 편리함 뒤에 숨겨진 인간적 교류와 감성적 경험의 가치 재조명', type: 'unique' }
];

const articles9 = [
  { 
    target_date: '2026-05-09', 
    category: 'AI & Data', 
    title: "'에이전틱 AI'가 바꾸는 여행의 미래…예약부터 일정 최적화까지", 
    press: '투어리즘 인사이트 뉴스', 
    link: '#', 
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995', 
    excerpt: "2026년 5월, AI는 이제 단순한 검색 도구를 넘어 여행자의 의도를 파악하고 직접 행동하는 '에이전트'로 진화하고 있습니다.",
    tag: '인공지능'
  },
  { 
    target_date: '2026-05-09', 
    category: 'AI & Data', 
    title: '관광 산업의 새로운 키워드, 디지털 휴머니티와 감성 테크', 
    press: '데이터 투데이', 
    link: '#', 
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', 
    excerpt: '복잡한 기술의 홍수 속에서 여행자들이 진정으로 원하는 것은 인간적인 따뜻함입니다.',
    tag: '트렌드'
  }
];

async function migrate() {
  console.log('Starting migration...');

  try {
    const { error: err1 } = await supabase.from('news_trends_keywords').insert([...keywords8, ...keywords9]);
    if (err1) throw err1;
    console.log('Keywords migrated successfully.');

    const { error: err2 } = await supabase.from('news_trends_insights').insert([...insights8, ...insights9]);
    if (err2) throw err2;
    console.log('Insights migrated successfully.');

    const { error: err3 } = await supabase.from('news_trends_articles').insert([...articles8, ...articles9]);
    if (err3) throw err3;
    console.log('Articles migrated successfully.');

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error.message);
  }
}

migrate();
