import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://mdcgzvfeazrmvkpanpho.supabase.co';
const supabaseKey = 'sb_publishable_HX_nDGxsiEvlV-E3ztJpRw_Va5P13tO';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const targetDate = '2026-05-10';

const keywords = [
  // 여행
  { keyword: '키르기스스탄 여행', section: '여행', rank: 1, change: '급등', target_date: targetDate },
  { keyword: '이시가키 여행', section: '여행', rank: 2, change: '+200%', target_date: targetDate },
  { keyword: '가고시마 여행', section: '여행', rank: 3, change: '+160%', target_date: targetDate },
  { keyword: '크루즈 여행 비용', section: '여행', rank: 4, change: '+150%', target_date: targetDate },
  { keyword: '묵호 여행', section: '여행', rank: 5, change: '+140%', target_date: targetDate },
  { keyword: '우도 여행', section: '여행', rank: 6, change: '+130%', target_date: targetDate },
  { keyword: '중국 여행 준비물', section: '여행', rank: 7, change: '+110%', target_date: targetDate },
  { keyword: '오사카 여행 코스', section: '여행', rank: 8, change: '+80%', target_date: targetDate },
  { keyword: '일본 여행 비자', section: '여행', rank: 9, change: '+80%', target_date: targetDate },
  { keyword: '푸 꾸옥 여행', section: '여행', rank: 10, change: '+70%', target_date: targetDate },
  // 관광
  { keyword: '속초 관광', section: '관광', rank: 1, change: '급등', target_date: targetDate },
  { keyword: '롯데 관광 패키지', section: '관광', rank: 2, change: '급등', target_date: targetDate },
  { keyword: '제주 관광 마라톤', section: '관광', rank: 3, change: '+450%', target_date: targetDate },
  { keyword: '디지털 관광 주민증', section: '관광', rank: 4, change: '+140%', target_date: targetDate },
  { keyword: '관광 열차', section: '관광', rank: 5, change: '+60%', target_date: targetDate },
  // 축제
  { keyword: '봄 열기구 축제', section: '축제', rank: 1, change: '급등', target_date: targetDate },
  { keyword: '진도 바닷길 축제', section: '축제', rank: 2, change: '급등', target_date: targetDate },
  { keyword: '기장 멸치 축제', section: '축제', rank: 3, change: '급등', target_date: targetDate },
  { keyword: '퍼플 섬 라벤더 축제', section: '축제', rank: 4, change: '급등', target_date: targetDate },
  { keyword: '포항 불꽃 축제', section: '축제', rank: 5, change: '급등', target_date: targetDate },
  { keyword: '여주 도자기 축제', section: '축제', rank: 6, change: '급등', target_date: targetDate },
  // 호텔
  { keyword: '서울 가든 호텔', section: '호텔', rank: 1, change: '급등', target_date: targetDate },
  { keyword: '라마다 프라자 제주 호텔', section: '호텔', rank: 2, change: '급등', target_date: targetDate },
  { keyword: '여수 베네치아 호텔', section: '호텔', rank: 3, change: '급등', target_date: targetDate },
  { keyword: '스카이 베이 호텔 경포', section: '호텔', rank: 4, change: '급등', target_date: targetDate },
  { keyword: '그랜드 조선 부산', section: '호텔', rank: 5, change: '급등', target_date: targetDate },
  // 항공
  { keyword: '나트랑 항공권', section: '항공', rank: 1, change: '급등', target_date: targetDate },
  { keyword: '제주 항공 국제선 축소', section: '항공', rank: 2, change: '급등', target_date: targetDate },
  { keyword: '항공 보안 365', section: '항공', rank: 3, change: '급등', target_date: targetDate },
  { keyword: '대한 항공 마일리지 사용', section: '항공', rank: 4, change: '급등', target_date: targetDate },
  { keyword: '티 웨이 항공 터미널', section: '항공', rank: 5, change: '급등', target_date: targetDate },
  // 맛집
  { keyword: '언양 맛집', section: '맛집', rank: 1, change: '급등', target_date: targetDate },
  { keyword: '망원동 맛집', section: '맛집', rank: 2, change: '급등', target_date: targetDate },
  { keyword: '진도 전복 맛집', section: '맛집', rank: 3, change: '급등', target_date: targetDate },
  { keyword: '제부도 맛집', section: '맛집', rank: 4, change: '급등', target_date: targetDate },
  { keyword: '평양 냉면 맛집', section: '맛집', rank: 5, change: '급등', target_date: targetDate },
  // 크루즈
  { keyword: '프린세스 크루즈', section: '크루즈', rank: 1, change: '급등', target_date: targetDate },
  { keyword: '이스턴 크루즈', section: '크루즈', rank: 2, change: '+250%', target_date: targetDate },
  { keyword: '도톤보리 리버 크루즈', section: '크루즈', rank: 3, change: '+170%', target_date: targetDate },
  { keyword: '로얄 캐리비안 크루즈', section: '크루즈', rank: 4, change: '+160%', target_date: targetDate }
];

const insights = [
  {
    keyword: '묵호·우도 로컬 여행',
    category: '사회/인구',
    type: 'analysis',
    reason: '묵호와 우도 등 숨겨진 로컬 여행지에 대한 검색량이 급증하며 대중적인 유명지보다는 나만의 특별한 장소를 찾는 트렌드가 강화되고 있습니다.',
    target_date: targetDate
  },
  {
    keyword: '국제선 회복 및 다변화',
    category: '테크/디지털',
    type: 'unique',
    reason: '나트랑, 중국, 일본 소도시(이시가키 등) 항공권 검색이 늘어나며 해외 여행 수요가 다변화되고 있으며, 스마트 항공 보안 시스템에 대한 관심도 함께 증가 중입니다.',
    target_date: targetDate
  },
  {
    keyword: '웰니스·생태 관광',
    category: '환경/기후',
    type: 'analysis',
    reason: '산청 힐링 투어 시범 운영 등 자연 속에서의 휴식을 찾는 웰니스 관광이 실질적인 지자체 사업으로 확대되며 높은 관심을 받고 있습니다.',
    target_date: targetDate
  },
  {
    keyword: '봄 축제 시즌 피크',
    category: '사회/인구',
    type: 'unique',
    reason: '봄 열기구, 진도 바닷길, 포항 불꽃 축제 등 전국적인 봄 축제가 실시간 인기 키워드 상위권을 점령하며 국내 여행의 최고 성수기임을 증명하고 있습니다.',
    target_date: targetDate
  }
];

const articles = [
  {
    title: "\"포스트 APEC 관광 활성화\"… 2026 아태관광협회 연차총회 포항·경주서 개최",
    press: "한국일보",
    target_date: targetDate,
    category: "Tourism News",
    tag: "정책/행정",
    link: "https://www.hankookilbo.com/news/article/A2026051010290000412",
    thumbnail: "https://search.pstatic.net/common/?src=https%3A%2F%2Fimgnews.pstatic.net%2Fimage%2F469%2F2026%2F05%2F10%2F0000929880_001.jpg",
    excerpt: "경상북도가 5월 11일부터 포항과 경주에서 '2026 아시아·태평양 관광협회 연차총회'를 개최한다. 이번 행사는 전 세계 관광 전문가들이 대거 참여하여 경북의 국제 관광 네트워크를 확대하는 계기가 될 전망이다. 지속 가능한 관광과 디지털 전환 등 글로벌 관광 트렌드에 대한 심도 있는 논의가 진행된다. 포스트 APEC 시대에 맞춰 지역 마이스(MICE) 산업의 활성화를 도모하는 중요한 행사로 평가받는다."
  },
  {
    title: "황대호 경기도의원, 1분기 외국인 53만 방문…\"K-관광 신성장 동력으로\"",
    press: "기호일보",
    target_date: targetDate,
    category: "Tourism News",
    tag: "경제/지역",
    link: "http://www.kihoilbo.co.kr/news/articleView.html?idxno=1086431",
    thumbnail: "https://search.pstatic.net/common/?src=https%3A%2F%2Fimgnews.pstatic.net%2Fimage%2F5112%2F2026%2F05%2F10%2F0001086431_001.jpg",
    excerpt: "올해 1분기 경기도를 방문한 외국인 관광객이 53만 명을 기록하며 전년 대비 비약적인 성장세를 보였다. 황대호 의원은 K-관광을 경기도의 새로운 핵심 성장 동력으로 삼아야 한다고 강조하며 적극적인 지원을 촉구했다. 지역 특화 관광 콘텐츠 개발과 인바운드 인프라 개선을 통해 글로벌 경쟁력을 강화할 계획이다. 경기도의 풍부한 문화 자산을 활용한 지역 경제 활성화 전략이 본격화될 것으로 기대된다."
  },
  {
    title: "청주시, 일본인 대상 K팝 체험 관광 프로그램 운영",
    press: "연합뉴스",
    target_date: targetDate,
    category: "Tourism News",
    tag: "사회/인구",
    link: "https://www.yna.co.kr/view/AKR20260510014500064",
    thumbnail: "https://search.pstatic.net/common/?src=https%3A%2F%2Fimgnews.pstatic.net%2Fimage%2F001%2F2026%2F05%2F10%2FAKR20260510014500064_01_i.jpg",
    excerpt: "충북 청주시가 일본 내 K-컬처 인기를 반영하여 일본인 관광객 전용 K팝 체험 프로그램을 본격 운영한다. 댄스 클래스와 드라마 촬영지 방문 등으로 구성된 이번 투어는 외국인 유치 확대에 기여할 것으로 보인다. 시는 지역 상권 활성화와 국제적 브랜드 이미지 홍보를 동시에 도모하고 있다. 향후 국가별 맞춤형 관광 상품을 지속적으로 개발하여 재방문율을 높여나갈 방침이다."
  },
  {
    title: "인천시, 개항장 공영주차장 개장…스마트 주차 시스템 구축",
    press: "경기신문",
    target_date: targetDate,
    category: "Tourism News",
    tag: "테크/디지털",
    link: "https://www.kgnews.co.kr/news/article.html?no=894945",
    thumbnail: "https://search.pstatic.net/common/?src=https%3A%2F%2Fimgnews.pstatic.net%2Fimage%2F5291%2F2026%2F05%2F10%2F0000894945_001.jpg",
    excerpt: "인천시가 원도심 주차난 해소를 위해 첨단 스마트 주차 시스템이 적용된 공영주차장을 개항장 일대에 개장했다. 실시간 정보 제공과 자동 결제 기능을 통해 관광객들의 이용 편의를 획기적으로 개선했다. 이번 시설은 스마트 관광 도시로서의 기반을 공고히 하는 중요한 인프라 역할을 수행할 예정이다. 앞으로도 주차 공유 플랫폼 활성화 등 스마트 기술 기반의 관광 편의 정책을 확대해 나갈 계획이다."
  },
  {
    title: "산청 힐링 투어 시범운영…웰니스 관광 활성화",
    press: "뉴스1",
    target_date: targetDate,
    category: "Tourism News",
    tag: "환경/기후",
    link: "https://www.news1.kr/articles/?5411234",
    thumbnail: "https://search.pstatic.net/common/?src=https%3A%2F%2Fimgnews.pstatic.net%2Fimage%2F421%2F2026%2F05%2F10%2F00075411234_001.jpg",
    excerpt: "경남 산청군이 지리산의 청정 환경을 활용한 '산청 힐링 투어' 시범운영을 통해 웰니스 관광의 새로운 모델을 제시한다. 숲 체험과 한방 치유 등 자연 친화적 프로그램으로 구성되어 현대인들의 스트레스 해소를 돕는다. 참가자들은 지속 가능한 생태 관광의 가치를 직접 체험하며 자연의 소중함을 다시금 느낄 수 있다. 산청군은 이번 운영 결과를 바탕으로 지역 경제와 환경을 동시에 살리는 정식 프로그램을 구축할 예정이다."
  },
  {
    title: "경북도, '세계경주포럼 문화협력 국제학술회의' 개최",
    press: "매일신문",
    target_date: targetDate,
    category: "Tourism News",
    tag: "경제/지역",
    link: "https://www.imaeil.com/page/view/2026051010340000123",
    thumbnail: "https://search.pstatic.net/common/?src=https%3A%2F%2Fimgnews.pstatic.net%2Fimage%2F088%2F2026%2F05%2F10%2F0000881234_001.jpg",
    excerpt: "경상북도가 세계경주포럼을 통해 유네스코 세계유산 도시 경주의 문화적 가치와 글로벌 비전을 재조명했다. 국내외 석학들이 모여 문화 협력 방안을 논의하며 국제 관광 도시로서의 위상을 강화하는 자리를 마련했다. 포스트 APEC 시대를 대비한 해외 교류 확대와 글로벌 마케팅 전략 수립에 박차를 가하고 있다. 이번 회의에서 도출된 아이디어들은 향후 경북의 핵심 관광 정책과 장기 로드맵에 적극 반영될 예정이다."
  },
  {
    title: "위성곤 \"제주 AI 기본권 보장\"… 관광 빅데이터 센터 추진",
    press: "파이낸셜뉴스",
    target_date: targetDate,
    category: "AI & Data",
    tag: "테크/디지털",
    link: "https://www.fnnews.com/news/2026051010150000456",
    thumbnail: "https://search.pstatic.net/common/?src=https%3A%2F%2Fimgnews.pstatic.net%2Fimage%2F014%2F2026%2F05%2F10%2F0005123456_001.jpg",
    excerpt: "제주의 디지털 주권 확보를 위한 '공공 AI 플랫폼' 구축과 빅데이터 기반 관광 산업 육성 공약이 발표되었다. 관광 빅데이터 센터를 강화하여 정교한 맞춤형 관광 서비스를 제공하고 지역 경제의 새로운 성장 동력을 확보할 계획이다. AI 기술이 관광 산업 전반에 스며들어 누구나 편리하게 스마트 관광의 혜택을 누릴 수 있는 환경이 조성된다. 이는 제주를 AI와 데이터 기반의 글로벌 관광 혁신 거점으로 도약시키는 핵심 전략이 될 것으로 보인다."
  },
  {
    title: "강진군, 관광·AI 산업 거점 도약… 16대 핵심 공약 발표",
    press: "더쎈뉴스",
    target_date: targetDate,
    category: "AI & Data",
    tag: "노동/교육",
    link: "http://www.thessennnews.com/news/articleView.html?idxno=12345",
    thumbnail: "https://search.pstatic.net/common/?src=https%3A%2F%2Fimgnews.pstatic.net%2Fimage%2F5812%2F2026%2F05%2F10%2F0000012345_001.jpg",
    excerpt: "강진군이 AI 산업 육성과 관광을 결합한 스마트 거점 도시 조성을 위한 '미래 16대 공약'을 발표하며 주목받고 있다. AI 기반의 행정 효율화와 관광 분야의 디지털 전환을 통해 지역 경쟁력을 극대화하는 내용을 담고 있다. 남도 관광의 중심지로서 AI 기술을 활용한 새로운 비즈니스 모델 발굴에 앞장설 계획이다. 데이터 기반의 인구 감소 대응 전략과 중장기 발전 계획을 통해 지역 경제에 새로운 활력을 불어넣을 것으로 기대된다."
  }
];

async function updateData() {
  try {
    console.log('Cleaning existing data for', targetDate);
    // Optional: Clean existing data for the date to avoid duplicates
    await supabase.from('news_trends_keywords').delete().eq('target_date', targetDate);
    await supabase.from('news_trends_insights').delete().eq('target_date', targetDate);
    await supabase.from('news_trends_articles').delete().eq('target_date', targetDate);

    console.log('Inserting keywords...');
    const { error: kError } = await supabase.from('news_trends_keywords').insert(keywords);
    if (kError) throw kError;

    console.log('Inserting insights...');
    const { error: iError } = await supabase.from('news_trends_insights').insert(insights);
    if (iError) throw iError;

    console.log('Inserting articles...');
    const { error: aError } = await supabase.from('news_trends_articles').insert(articles);
    if (aError) throw aError;

    console.log('Update completed successfully for', targetDate);
  } catch (error) {
    console.error('Error updating data:', error);
    process.exit(1);
  }
}

updateData();
