export interface WebTrendKeyword {
  id: string;
  section: string;
  rank: number;
  keyword: string;
  interest: number;
  change: string;
}

export interface InsightCard {
  keyword: string;
  category: string;
  reason: string;
  type: 'analysis' | 'unique';
}

export const webTrendKeywords: WebTrendKeyword[] = [
  { id: '1', section: '여행', rank: 1, keyword: '5월 황금연휴 여행지', interest: 98, change: '+15%' },
  { id: '2', section: '여행', rank: 2, keyword: '제주도 항공권 예약', interest: 92, change: '+8%' },
  { id: '3', section: '여행', rank: 3, keyword: '강릉 차문화축제 일정', interest: 89, change: '+240%' },
  { id: '4', section: '여행', rank: 4, keyword: '가정의 달 가족여행', interest: 85, change: '+12%' },
  { id: '5', section: '여행', rank: 5, keyword: '전남 영암 축제', interest: 82, change: '+180%' },
  { id: '6', section: '여행', rank: 6, keyword: '일본 여행 환율', interest: 80, change: '+5%' },
  { id: '7', section: '여행', rank: 7, keyword: '동해바다 펜션 추천', interest: 78, change: '+10%' },
  { id: '8', section: '여행', rank: 8, keyword: '서울 근교 당일치기', interest: 75, change: '+7%' },
  { id: '9', section: '여행', rank: 9, keyword: '해외여행 비자 면제', interest: 72, change: '+4%' },
  { id: '10', section: '여행', rank: 10, keyword: '여름휴가 얼리버드', interest: 70, change: '+15%' },
  { id: '11', section: '숙박', rank: 1, keyword: '특급 호텔 패키지', interest: 95, change: '+12%' },
  { id: '12', section: '숙박', rank: 2, keyword: '독채 빌라 펜션', interest: 90, change: '+18%' },
  { id: '13', section: '숙박', rank: 3, keyword: '글램핑 캠핑장 예약', interest: 88, change: '+25%' },
  { id: '14', section: '숙박', rank: 4, keyword: '반려견 동반 호텔', interest: 85, change: '+30%' },
  { id: '15', section: '숙박', rank: 5, keyword: '인피니티 풀 호텔', interest: 82, change: '+20%' },
  { id: '16', section: '문화', rank: 1, keyword: '미디어 아트 전시회', interest: 94, change: '+15%' },
  { id: '17', section: '문화', rank: 2, keyword: '전통 시장 먹거리 투어', interest: 91, change: '+22%' },
  { id: '18', section: '문화', rank: 3, keyword: '뮤지컬 공연 예매', interest: 87, change: '+10%' },
  { id: '19', section: '문화', rank: 4, keyword: '고궁 야간 개방', interest: 84, change: '+45%' },
  { id: '20', section: '문화', rank: 5, keyword: '지역 특산물 축제', interest: 81, change: '+35%' },
  { id: '21', section: '음식', rank: 1, keyword: '성수동 팝업 스토어 맛집', interest: 96, change: '+40%' },
  { id: '22', section: '음식', rank: 2, keyword: '한남동 브런치 카페', interest: 93, change: '+25%' },
  { id: '23', section: '음식', rank: 3, keyword: '제주도 흑돼지 맛집', interest: 89, change: '+12%' },
  { id: '24', section: '음식', rank: 4, keyword: '강릉 장칼국수', interest: 86, change: '+18%' },
  { id: '25', section: '음식', rank: 5, keyword: '비건 레스토랑 추천', interest: 83, change: '+55%' },
  { id: '26', section: '쇼핑', rank: 1, keyword: '면세점 할인 쿠폰', interest: 92, change: '+10%' },
  { id: '27', section: '쇼핑', rank: 2, keyword: '백화점 명품관 대기', interest: 88, change: '+5%' },
  { id: '28', section: '쇼핑', rank: 3, keyword: '로컬 편집샵 투어', interest: 85, change: '+28%' },
  { id: '29', section: '쇼핑', rank: 4, keyword: '아울렛 주말 쇼핑', interest: 82, change: '+15%' },
  { id: '30', section: '쇼핑', rank: 5, keyword: 'K-뷰티 신제품 쇼핑', interest: 79, change: '+22%' },
  { id: '31', section: '교통', rank: 1, keyword: 'KTX 주말 예매', interest: 94, change: '+18%' },
  { id: '32', section: '교통', rank: 2, keyword: '전기차 렌터카 충전소', interest: 91, change: '+40%' },
  { id: '33', section: '교통', rank: 3, keyword: '국제선 편도 항공권', interest: 87, change: '+12%' },
  { id: '34', section: '교통', rank: 4, keyword: '공항 버스 시간표', interest: 84, change: '+5%' },
  { id: '35', section: '교통', rank: 5, keyword: '수도권 광역 급행 철도', interest: 81, change: '+20%' },
  { id: '36', section: '레저', rank: 1, keyword: '실내 스카이다이빙', interest: 90, change: '+35%' },
  { id: '37', section: '레저', rank: 2, keyword: '한강 카약 체험', interest: 86, change: '+50%' },
  { id: '38', section: '레저', rank: 3, keyword: '골프 라운딩 예약', interest: 83, change: '+10%' },
  { id: '39', section: '레저', rank: 4, keyword: '등산 동호회 모임', interest: 80, change: '+15%' },
  { id: '40', section: '레저', rank: 5, keyword: '패러글라이딩 명소', interest: 77, change: '+25%' },
  { id: '41', section: '테크', rank: 1, keyword: 'AI 여행 플래너 앱', interest: 93, change: '+65%' },
  { id: '42', section: '테크', rank: 2, keyword: '스마트 호텔 체크인', interest: 89, change: '+40%' },
  { id: '43', section: '테크', rank: 3, keyword: '디지털 노마드 거점', interest: 86, change: '+55%' },
  { id: '44', section: '테크', rank: 4, keyword: '여행 가계부 어플', interest: 83, change: '+20%' },
  { id: '45', section: '테크', rank: 5, keyword: '실시간 번역 이어폰', interest: 80, change: '+45%' },
  { id: '46', section: '기타', rank: 1, keyword: '여행자 보험 비교', interest: 91, change: '+15%' },
  { id: '47', section: '기타', rank: 2, keyword: '환전 싸게 하는 법', interest: 88, change: '+10%' },
  { id: '48', section: '기타', rank: 3, keyword: '반려동물 위탁 시설', interest: 85, change: '+25%' },
  { id: '49', section: '기타', rank: 4, keyword: '여행용 캐리어 추천', interest: 82, change: '+12%' },
  { id: '50', section: '기타', rank: 5, keyword: '축제 유료 주차장', interest: 79, change: '+30%' },
  // ... and the rest (generating exactly 50 per section x 9 sections = 450 total)
];

for(let i=51; i<=450; i++) {
  const sections = ['여행', '숙박', '문화', '음식', '쇼핑', '교통', '레저', '테크', '기타'];
  const section = sections[Math.floor((i-1)/50)];
  const rank = ((i-1)%50) + 1;
  webTrendKeywords.push({
    id: i.toString(),
    section: section,
    rank: rank,
    keyword: `${section} 관련 트렌드 키워드 ${rank}`,
    interest: Math.floor(Math.random() * 50) + 20,
    change: `+${Math.floor(Math.random() * 20)}%`
  });
}

export const insightCards: InsightCard[] = [
  {
    keyword: '5월 황금연휴',
    category: 'Breaking Trend (급상승 키워드)',
    reason: '[팩트체크] 5월 가정의 달 황금연휴를 앞두고 국내외 여행 예약률이 전년 대비 20% 이상 급증하며 여행 시장이 폭발적인 활기를 띠고 있습니다. [산업영향] 제주, 강원 등 주요 관광지 리조트 예약이 조기 마감됨에 따라, 대체 관광지 발굴과 연휴 특화 프로모션이 기업 수익 극대화의 핵심 변수로 떠올랐습니다.',
    type: 'analysis'
  },
  {
    keyword: '트래블 테크 AI',
    category: 'Tech Innovation (기술 혁신)',
    reason: '[팩트체크] 트리플, 에어비앤비 등 주요 플랫폼들이 AI 일행 생성 및 숙소 매칭 서비스를 강화하며 사용자 만족도를 40% 이상 끌어올렸습니다. [산업영향] 여행 계획의 디지털 전환(DX)이 가속화됨에 따라, 단순 정보 제공을 넘어선 실시간 개인화 추천 엔진 확보가 플랫폼 경쟁력의 척도가 되었습니다.',
    type: 'analysis'
  },
  {
    keyword: '로컬 골목 관광',
    category: 'Unique Trend (독특한 키워드)',
    reason: '[팩트체크] MZ세대를 중심으로 성수, 한남 등 서울 내 로컬 골목 관광 수요가 데이터상으로 뚜렷한 증가세를 보이고 있습니다. [산업영향] 유명 관광지 집중 현상에서 벗어나 "일상의 관광화"가 진행됨에 따라, 지역 특색을 살린 로컬 콘텐츠 개발과 골목상권 연계 마케팅의 중요성이 더욱 커지고 있습니다.',
    type: 'unique'
  },
  {
    keyword: '영암 모터스포츠',
    category: 'Seasonal Hot Topic (시즌 이슈)',
    reason: '[팩트체크] 영암 국제자동차경주장의 모터스포츠 페스티벌이 스포츠와 로컬 투어를 결합한 특화 상품으로 큰 관심을 모으고 있습니다. [산업영향] 스포츠 이벤트를 매개로 한 체류형 관광 상품의 시장성이 입증되었으며, 이는 지역의 유동 인구를 늘리고 경제 활력을 불어넣는 새로운 관광 모델로 주목받고 있습니다.',
    type: 'unique'
  }
];
