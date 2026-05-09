
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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

const targetDate = '2026-05-09';

const categories = {
  '여행': ['5월 제주도 2박3일 코스', '강릉 당일치기 여행', '남해 독일마을 숙소', '소도시 여행지 추천', '전주 한옥마을 체험', '여수 밤바다 힐링', '근로자의날 연휴 여행', '어린이날 가볼만한곳', '로컬힙 투어', '촌캉스 숙소 추천', '울릉도 배편 예약', '포항 호미곶 일출', '국내 혼자 여행지', '주말 나들이 명소', '자전거 종주 코스'],
  '관광': ['경복궁 야간개장 예매', '창경궁 야연 티켓', '안동 하회마을 별신굿', '스마트 관광 도시 포항', '디지털 휴머니티 투어', '대한민국 구석구석 앱', '시티투어 버스 예약', '비무장지대(DMZ) 투어', '지역 소멸 관광 캠페인', 'K-관광 패스 사용법', '유네스코 세계유산 탐방', '창덕궁 후원 예약', '제주 다크 투어리즘', '서울 숲 산책로', '한탄강 주상절리길'],
  '축제': ['한강페스티벌 봄 일정', '대구약령시 한방축제', '부산 밀 페스티벌 화명', '해운대 모래축제 전시', '서울 장미축제 중랑천', '연등회 연등행렬 시간', '보성 다향대축제 체험', '하동 야생차문화축제', '자라섬 꽃 페스타 가평', '이천 도자기축제 일정', '담양 대나무축제', '음성 품바축제', '춘천 막국수 닭갈비 축제', '밀양 아리랑 대축제', '문경 찻사발 축제'],
  '행사': ['가평 펫트렌드 페어', '성수동 팝업스토어 5월', '독도 수호 문화제 공연', '어린이날 기념 행사', '어버이날 카네이션 만들기', '스타트업 컨퍼런스 2026', '지자체 데이터 마케팅 설명회', '지역 특산물 직거래 장터', '킨텍스 캠핑 페어', '코엑스 트래블쇼', 'DDP 디자인 마켓', '광화문 광장 북마당', '세종시 지역축제 행사', 'IT 가전 박람회 일정', '중소기업 박람회'],
  '공연': ['서울 재즈 페스티벌 2026 라인업', '춘천 마임축제 예매', '세종문화회관 5월 공연', '뮤지컬 알라딘 한국 공연', '예술의전당 오케스트라', '대학로 소극장 축제', '몰입형 미디어 아트 전시회', '고택 음악회 티켓', '국립극장 창극 공연', '홍대 버스킹 축제 일정', '내한 공연 소식', '클래식 독주회 예매', '인디밴드 페스티벌', '야외 조각 전시회', '현대무용 정기공연'],
  '호텔': ['신라호텔 망고빙수 가격', '시그니엘 서울 패키지', '제주 독채 펜션 추천', '한옥 호텔 스테이', '반려동물 동반 호텔', '럭셔리 글램핑 추천', '호캉스 얼리버드 특가', '서울 야외 수영장 호텔', '비즈니스 호텔 조식 맛집', '감성 숙소 에어비앤비', '부티크 호텔 인테리어', '호텔 어메니티 추천', '서울 가성비 호텔', '인천 파라다이스 시티', '풀빌라 펜션 순위'],
  '항공': ['대한항공 마일리지 개편', '아시아나 항공권 특가', '에어부산 오키나와 노선', '인천공항 제2여객터미널 확장', '친환경 항공유(SAF) 소식', '도심 항공 모빌리티(UAM) 체험', '항공권 가격 비교 사이트', '저가 항공사(LCC) 순위', '기내식 신메뉴 후기', '스마트 체크인 서비스', '비즈니스석 업그레이드', '공항 면세점 할인쿠폰', '유류할증료 인하 소식', '항공사 연합 마일리지', '김포공항 국내선 시간표'],
  '맛집': ['파인다이닝 예약 앱', '성수동 카페거리 핫플', '비건 레스토랑 추천', '전통주 페어링 바', '미슐랭 가이드 서울 2026', '수요미식회 냉면 맛집', '골목식당 로컬 미식 투어', '루프탑 바 추천', '이색 디저트 카페', '제철 나물 정식 맛집', '전통시장 먹거리 지도', '오마카세 예약 꿀팁', '서울 빵지순례 코스', '노포 맛집 탐방', '푸드트럭 야시장 위치'],
  '크루즈': ['속초항 크루즈 입항 일정', '울릉도 크루즈 배편', '지중해 크루즈 여행 가격', '리버 크루즈 투어', '크루즈 승무원 채용', '럭셔리 크루즈 패키지', '아시아 최대 크루즈 선사', '크루즈 객실 등급 비교', '크루즈 여행 준비물', '국내 연안 크루즈 노선', '부산항 국제 크루즈 터미널', '크루즈 선상 파티 소식', '카리브해 크루즈 예약', '알래스카 크루즈 시즌', '크루즈 여행 후기 베스트']
};

async function populateKeywords() {
  console.log(`Populating 100+ keywords for ${targetDate}...`);
  
  let allKeywords = [];

  for (const [section, words] of Object.entries(categories)) {
    words.forEach((word, index) => {
      allKeywords.push({
        target_date: targetDate,
        section: section,
        rank: index + 1,
        keyword: word,
        change: `${Math.floor(Math.random() * 30) + 5}%`
      });
    });
  }

  // Insert only - Cleanup is handled by UI deduplication for now
  const { data, error } = await supabase
    .from('news_trends_keywords')
    .insert(allKeywords);

  if (error) {
    console.error('Error inserting keywords:', error);
  } else {
    console.log(`Successfully inserted ${allKeywords.length} keywords for 9 categories!`);
  }
}

populateKeywords();
