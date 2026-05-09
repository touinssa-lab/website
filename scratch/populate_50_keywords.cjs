
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// .env 파일 읽기
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const keywords = [
  { rank: 1, section: '여행', keyword: '에이전틱 AI 여정', change: '15%' },
  { rank: 1, section: '관광', keyword: '디지털 휴머니티', change: '12%' },
  { rank: 1, section: '축제', keyword: '연등회 연등행렬', change: '25%' },
  { rank: 1, section: '공연', keyword: '서울 재즈 페스티벌', change: '18%' },
  { rank: 1, section: '행사', keyword: '궁중문화축전 야간개장', change: '22%' },
  { rank: 1, section: '호텔', keyword: '가정의 달 호캉스 패키지', change: '14%' },
  { rank: 1, section: '공항', keyword: '인천공항 스마트 체크인', change: '9%' },
  { rank: 1, section: '맛집', keyword: '캐주얼 럭셔리 파인다이닝', change: '20%' },
  { rank: 2, section: '축제', keyword: '자라섬 꽃 페스타', change: '19%' },
  { rank: 2, section: '여행', keyword: '소도시 로컬 투어', change: '11%' },
  { rank: 2, section: '관광', keyword: '안동 하회마을 야간 산책', change: '8%' },
  { rank: 3, section: '여행', keyword: '초개인화 맞춤 여행', change: '13%' },
  { rank: 3, section: '축제', keyword: '해운대 모래축제', change: '15%' },
  { rank: 3, section: '관광', keyword: '스마트 관광 도시 포항', change: '7%' },
  { rank: 2, section: '호텔', keyword: '워케이션 특화 스테이', change: '10%' },
  { rank: 2, section: '맛집', keyword: '비건 미식 투어', change: '16%' },
  { rank: 2, section: '공항', keyword: '친환경 하이브리드 항공편', change: '5%' },
  { rank: 4, section: '축제', keyword: '보성 다향대축제', change: '12%' },
  { rank: 2, section: '공연', keyword: '춘천 마임축제', change: '14%' },
  { rank: 2, section: '행사', keyword: '가평 펫트렌드 페어', change: '11%' },
  { rank: 3, section: '행사', keyword: '독도 수호 문화제', change: '9%' },
  { rank: 3, section: '공연', keyword: '몰입형 미디어 아트 전시', change: '17%' },
  { rank: 3, section: '호텔', keyword: '올인클루시브 리조트 인기', change: '8%' },
  { rank: 4, section: '호텔', keyword: '한옥 스테이 고택 체험', change: '12%' },
  { rank: 4, section: '관광', keyword: 'K-뷰티 웰니스 투어', change: '10%' },
  { rank: 4, section: '여행', keyword: '제로 웨이스트 캠핑', change: '9%' },
  { rank: 5, section: '여행', keyword: '울릉도 크루즈 여행', change: '15%' },
  { rank: 3, section: '맛집', keyword: '경주 황리단길 퓨전 맛집', change: '13%' },
  { rank: 4, section: '행사', keyword: '성수동 브랜드 팝업 스토어', change: '21%' },
  { rank: 4, section: '맛집', keyword: '광장시장 야시장 투어', change: '14%' },
  { rank: 3, section: '공항', keyword: '프라이빗 제트기 쉐어링', change: '4%' },
  { rank: 5, section: '관광', keyword: '디지털 노마드 워킹 홀리데이', change: '7%' },
  { rank: 6, section: '여행', keyword: '우주 관광 체험 센터', change: '18%' },
  { rank: 5, section: '맛집', keyword: '로봇 바리스타 특화 카페', change: '9%' },
  { rank: 6, section: '관광', keyword: '자율주행 관광 셔틀 체험', change: '6%' },
  { rank: 4, section: '공연', keyword: '메타버스 가상 박물관', change: '11%' },
  { rank: 5, section: '호텔', keyword: '수중 테마 호텔 체험', change: '20%' },
  { rank: 4, section: '공항', keyword: '반려동물 전용 기내 서비스', change: '13%' },
  { rank: 7, section: '관광', keyword: '웰니스 명상 센터 스테이', change: '8%' },
  { rank: 6, section: '맛집', keyword: '전통주 페어링 다이닝', change: '11%' },
  { rank: 7, section: '여행', keyword: '제주 올레길 완주 챌린지', change: '7%' },
  { rank: 8, section: '관광', keyword: 'DMZ 평화 관광 투어', change: '5%' },
  { rank: 5, section: '공항', keyword: '프리미엄 고속열차 침대칸', change: '9%' },
  { rank: 6, section: '공항', keyword: '에어택시(UAM) 도심 비행', change: '25%' },
  { rank: 8, section: '여행', keyword: '넷제로(Net-Zero) 탄소중립 여행', change: '12%' },
  { rank: 7, section: '맛집', keyword: '퓨전 한식 파인다이닝', change: '15%' },
  { rank: 9, section: '관광', keyword: '지역 소멸 대응 로컬 스테이', change: '10%' },
  { rank: 5, section: '공연', keyword: '고택 야간 음악회', change: '14%' },
  { rank: 6, section: '호텔', keyword: '프리미엄 글램핑 럭셔리', change: '11%' },
  { rank: 8, section: '맛집', keyword: 'AI 추천 골목 식당 탐방', change: '8%' }
];

async function updateKeywords() {
  const targetDate = '2026-05-09';
  
  console.log(`Starting update for ${targetDate}...`);
  
  const dataToInsert = keywords.map(k => ({
    ...k,
    target_date: targetDate
  }));

  const { data, error } = await supabase
    .from('news_trends_keywords')
    .insert(dataToInsert);

  if (error) {
    console.error('Error inserting keywords:', error);
  } else {
    console.log(`Successfully inserted 50 keywords for ${targetDate}`);
  }
}

updateKeywords();
