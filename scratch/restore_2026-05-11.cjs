const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mdcgzvfeazrmvkpanpho.supabase.co';
const supabaseAnonKey = 'sb_publishable_HX_nDGxsiEvlV-E3ztJpRw_Va5P13tO';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const target_date = '2026-05-11';

// --- DATA FROM RECOVERED TS FILES ---

const insightCards = [
  {
    keyword: 'K-라이프 투어',
    category: 'Breaking Trend (급상승 키워드)',
    description: '[팩트체크] 2026년 인바운드 관광객의 65%가 단순 관람보다 "한국인처럼 살기"를 선호함에 따라 검색량이 전주 대비 320% 급증했습니다. [산업영향] 이는 기존 대형 관광지 중심에서 골목상권 및 로컬 콘텐츠 중심으로 관광 경제의 축이 이동하고 있음을 시사하며, 지역 소상공인 매출 증대에 핵심적인 기회가 될 것입니다.',
    type: 'analysis',
    target_date: '2026-05-11'
  },
  {
    keyword: '개인화 여행 추천',
    category: 'Tech Innovation (기술 혁신)',
    description: '[팩트체크] 주요 트래블 테크 플랫폼의 AI 컨시어지 이용률이 80%를 넘어섰으며, 이로 인한 여행 만족도는 기존 대비 1.5배 높게 나타났습니다. [산업영향] 개별 여행객(FIT)의 완전한 파편화가 가속화됨에 따라, 공급자 중심의 패키지 상품보다 데이터 기반의 실시간 유동적 공급망(Dynamic Packaging) 구축이 기업의 생존 전략이 되었습니다.',
    type: 'analysis',
    target_date: '2026-05-11'
  },
  {
    keyword: '디지털 노마드 워케이션',
    category: 'Unique Trend (독특한 키워드)',
    description: '[팩트체크] 제주, 강원뿐만 아니라 전남 영암 등 모터스포츠와 결합된 특화 워케이션 수요가 새로운 니치 마켓으로 형성되었습니다. [산업영향] 체류형 관광 인구인 "생활 인구"의 증가는 인구 소멸 위기 지역의 관광 인프라를 유지시키는 실질적인 동력이 되며, 지자체의 관광 정책이 "방문"에서 "거주"로 전환되는 변곡점에 있습니다.',
    type: 'unique',
    target_date: '2026-05-11'
  },
  {
    keyword: '강릉차문화축제',
    category: 'Seasonal Hot Topic (시즌 이슈)',
    description: '[팩트체크] 5월 가정의 달을 맞아 "정적인 힐링"과 "전통 문화"에 대한 검색 가중치가 최근 3년 내 최고치를 기록했습니다. [산업영향] 액티비티 위주의 관광 시장에서 정신적 웰니스(Mental Wellness)로의 수요 전이가 확인되며, 지역 전통 자원과 현대적 감성을 결합한 프리미엄 로컬 체험 상품의 시장성이 입증되었습니다.',
    type: 'unique',
    target_date: '2026-05-11'
  }
];

const naverNewsData = [
  {
    "title": "횡성루지체험장, 개장 3주만에 방문객 1만명 돌파",
    "press": "연합뉴스",
    "target_date": "2026-05-11",
    "excerpt": "강원 횡성군의 대표 액티비티 시설인 횡성루지체험장이 올해 시즌 개장 3주 만에 누적 방문객 1만 명을 돌파하며 흥행 가도를 달리고 있습니다. 횡성루지는 폐국도를 활용한 세계 최장 길이의 트랙을 자랑하며, 수려한 자연 경관과 짜릿한 속도감을 동시에 즐길 수 있어 가족 단위 관광객들에게 큰 인기를 끌고 있습니다. 군은 방문객 1만 명 돌파를 기념해 다양한 이벤트를 진행 중이며, 향후 야간 개장과 주변 관광지 연계 할인을 통해 관광객 유치에 박차를 가할 계획입니다. 이번 성과는 지역 경제 활성화에도 긍정적인 신호탄이 될 것으로 기대됩니다.",
    "category": "Tourism News",
    "tag": "지역 경제 활성화",
    "link": "https://m.sports.naver.com/general/article/001/0016069037",
    "thumbnail": "/images/news/2026-05-11/article_1.jpg"
  },
  {
    "title": "대명소노, ‘소노트리니티’로 새출발…항공·숙박 통합 본격화",
    "press": "마이데일리",
    "target_date": "2026-05-11",
    "excerpt": "대명소노그룹이 새로운 브랜드 '소노트리니티(SONO TRINITY)'를 론칭하고 호텔, 리조트, 항공을 아우르는 글로벌 호스피탈리티 기업으로의 도약을 선포했습니다. 이번 브랜드 통합은 티웨이항공 경영 참여와 연계하여 이동수단과 숙박 서비스를 원스톱으로 제공하는 '버티컬 통합' 전략의 일환입니다. 소노트리니티는 최상급 럭셔리 서비스를 지향하며, 국내외 주요 거점에 프리미엄 멤버십 체인을 확장해 나갈 예정입니다. 그룹 측은 데이터 기반의 맞춤형 여행 경험을 제공함으로써 고객 충성도를 높이고 글로벌 시장에서의 경쟁력을 강화하겠다고 밝혔습니다.",
    "category": "Tourism News",
    "tag": "기업 전략 혁신",
    "link": "https://n.news.naver.com/mnews/article/117/0004063367?sid=103",
    "thumbnail": "/images/news/2026-05-11/article_2.jpg"
  },
  {
    "title": "아시아 모터스포츠 카니발 X 파크뮤직페스티벌, 5월 연휴 영암 달군다",
    "press": "스포츠경향",
    "target_date": "2026-05-11",
    "excerpt": "전남 영암 국제자동차경주장에서 펼쳐지는 '2026 아시아 모터스포츠 카니발'이 '파크뮤직페스티벌'과 결합하여 역대급 규모의 관광 축제로 개최됩니다. 박진감 넘치는 슈퍼레이스 챔피언십과 함께 국내 정상급 뮤지션들의 공연이 어우러져 모터스포츠 팬뿐만 아니라 MZ세대의 발길을 사로잡을 전망입니다. 이번 행사는 스포츠와 음악 콘텐츠를 결합한 새로운 형태의 관광 모델로서, 지역 특화 자원을 활용한 대규모 유입 효과가 기대됩니다. 주최 측은 방문객의 편의를 위해 셔틀버스를 증편하고 드론 쇼 등 다채로운 부대행사를 마련하여 완벽한 연휴 여행 경험을 선사할 계획입니다.",
    "category": "Tourism News",
    "tag": "축제/행사 기획",
    "link": "https://m.entertain.naver.com/home/article/144/0001114730",
    "thumbnail": "/images/news/2026-05-11/article_3.jpg"
  },
  {
    "title": "최휘영 문체부 장관 \"구장 환경 개선 및 수익 구조 다변화 지원\"",
    "press": "이데일리",
    "target_date": "2026-05-11",
    "excerpt": "최휘영 문화체육관광부 장관이 프로축구 K리그 현장을 방문하여 스포츠 산업의 자생력 강화를 위한 적극적인 지원 의지를 밝혔습니다. 최 장관은 노후화된 구장 시설의 현대화와 관람객 편의성 제고가 스포츠 관광 활성화의 핵심임을 강조하며 정부 차원의 인프라 구축 예산 지원을 약속했습니다. 또한 프로구단들이 단순 입장 수익을 넘어 굿즈, 로컬 테마 투어 등 수익 구조를 다변화할 수 있도록 컨설팅과 마케팅 지원을 확대할 방침입니다. 이는 지역 사회와 스포츠가 상생하는 선순환 구조를 만들어 관광 시너지 효과를 극대화하려는 전략으로 풀이됩니다.",
    "category": "Tourism News",
    "tag": "관광 거버넌스",
    "link": "https://m.sports.naver.com/kfootball/article/018/0006278424",
    "thumbnail": "/images/news/2026-05-11/article_4.jpg"
  },
  {
    "title": "이날치 “범 내려온다로 대박… 이번엔 ‘가마귀’로 스며들래요”",
    "press": "세계일보",
    "target_date": "2026-05-11",
    "excerpt": "K-관광 붐의 주역인 밴드 이날치가 신곡 '가마귀'를 통해 다시 한번 글로벌 시장의 문을 두드립니다. 이번 신곡은 판소리 심청가의 '가마귀' 대목을 현대적인 팝 사운드로 재해석하여, 중독성 강한 멜로밀과 독특한 한국적 감성을 동시에 담아냈습니다. 이날치는 '범 내려온다' 이후 제기된 원히트원더 우려를 씻어내고 자신들만의 확고한 음악 세계를 공고히 하겠다는 포부를 밝혔습니다. 이들의 창의적인 시도는 한국 고유의 문화 콘텐츠가 전 세계 관광객들에게 얼마나 매력적인 여행 테마가 될 수 있는지를 다시금 입증하고 있습니다.",
    "category": "Tourism News",
    "tag": "K-컬처 콘텐츠",
    "link": "https://m.entertain.naver.com/home/article/022/0004127374",
    "thumbnail": "/images/news/2026-05-11/article_5.jpg"
  },
  {
    "title": "강원지사 첫 토론회…지역 현안 및 관광 성장 전략 논의",
    "press": "뉴스1",
    "target_date": "2026-05-11",
    "excerpt": "강원특별자치도지사 선거를 앞두고 열린 첫 방송 토론회에서 후보들은 강원도의 미래 성장 동력으로 '관광 산업의 질적 전환'을 최우선 과제로 꼽았습니다. 각 후보는 폐광 지역의 스마트 관광 도시 조성, 설악산 오색케이블카 연계 인프라 확충, 강원형 워케이션 특구 지정 등 구체적인 공약을 내세우며 열띤 공방을 벌였습니다. 특히 인구 소멸 위기 극복을 위해 생활 인구를 늘리는 관광 전략의 중요성에 대해 공감대를 형성하며 데이터 기반의 관광 정책 수립을 약속했습니다. 이번 토론회는 향후 4년 강원도 관광 정책의 방향타를 결정짓는 중요한 분수령이 되었습니다.",
    "category": "Tourism News",
    "tag": "지역 정책 수립",
    "link": "https://n.news.naver.com/mnews/article/421/0008938204?sid=162",
    "thumbnail": "/images/news/2026-05-11/article_6.jpg"
  }
];

const naverNewsDataAI = [
  {
    "title": "\"낙조만 보고 가긴 아쉽게\"…안산도시공사 탄도항 관광 육성",
    "press": "머니투데이",
    "target_date": "2026-05-11",
    "excerpt": "안산도시공사가 대부도 탄도항의 관광 매력을 극대화하기 위해 빅데이터 분석 결과를 토대로 한 맞춤형 육성 전략을 발표했습니다. 그동안 단순 낙조 감상지로만 소비되던 탄도항을 누에섬 등대 전망대와 연계한 실감형 미디어 아트 공간으로 탈바꿈시켜 체류 시간을 늘리겠다는 계획입니다. 공사는 방문객들의 유입 경로와 선호 활동 데이터를 분석하여 주차 공간 확충과 더불어 로컬 푸드 체험장 등 편의 시설을 대폭 보강할 예정입니다. 이러한 데이터 기반의 체계적인 관리는 탄도항을 서해안 대표 스마트 관광 거점으로 성장시키는 밑거름이 될 것으로 보입니다.",
    "category": "AI & Data",
    "tag": "데이터 기반 전략",
    "link": "https://n.news.naver.com/mnews/article/008/0005355945?sid=102",
    "thumbnail": "/images/news/2026-05-11/article_ai_1.jpg"
  },
  {
    "title": "문성유 \"AI는 환상 아닌 책임\"… 위성곤 'AX 제주' 공약 정면 비판",
    "press": "파이낸셜뉴스",
    "target_date": "2026-05-11",
    "excerpt": "제주특별자치도지사 선거에 출마한 문성유 후보가 경쟁 후보의 'AX(AI 전환) 제주' 공약에 대해 실현 가능성이 부족한 선심성 정책이라고 강하게 비판하며 '책임 있는 AI 도입'을 역설했습니다. 문 후보는 AI 기술 도입이 단순한 화려한 기술 시연에 그쳐서는 안 되며, 실제 도민의 삶의 질 향상과 관광 종사자들의 디지털 격차 해소에 초점을 맞춰야 한다고 주장했습니다. 그는 구체적으로 소상공인 AI 마케팅 지원과 공공 데이터 개방 확대 등 실무적인 디지털 정책을 대안으로 제시했습니다. 이번 논쟁은 제주 관광의 DX 추진 방향에 대한 정책적 담론을 형성하는 계기가 되었습니다.",
    "category": "AI & Data",
    "tag": "인공지능 정책",
    "link": "https://n.news.naver.com/mnews/article/014/0005519542?sid=162",
    "thumbnail": "/images/news/2026-05-11/article_ai_2.jpg"
  },
  {
    "title": "브래드 피트 내한설 불러놓고…정윤민, 뒤늦게 \"AI 사진\" 황당",
    "press": "엑스포츠뉴스",
    "target_date": "2026-05-11",
    "excerpt": "최근 SNS에서 큰 화제가 되었던 할리우드 배우 브래드 피트의 한국 시장 방문 사진이 생성형 AI로 제작된 정교한 가짜 이미지로 밝혀지며 실감형 콘텐츠의 윤리적 가이드라인에 대한 논란이 재점화되었습니다. 해당 사진을 공유했던 관계자는 뒤늦게 AI 제작물임을 고백했으나, 이미 관광 업계와 팬들 사이에서는 큰 혼란이 빚어진 후였습니다. 이번 사건은 AI 기술이 홍보 마케팅에 미치는 영향력이 얼마나 강력한지 보여주는 동시에, 허위 정보가 관광 시장의 신뢰도를 떨어뜨릴 수 있다는 경각심을 일깨워주었습니다. 업계 전문가들은 AI 생성 콘텐츠에 대한 워터마크 표시 의무화 등 제도적 보완이 시급하다고 입을 모으고 있습니다.",
    "category": "AI & Data",
    "tag": "AI 윤리 및 콘텐츠",
    "link": "https://m.entertain.naver.com/home/article/311/0002009664",
    "thumbnail": "/images/news/2026-05-11/article_ai_3.jpg"
  },
  {
    "title": "핫플·맛집…매달 '경남픽' 알려드려요",
    "press": "한국경제",
    "target_date": "2026-05-11",
    "excerpt": "경상남도가 지역 관광 빅데이터 플랫폼을 활용해 매월 도내 숨은 명소와 맛집을 추천하는 '경남픽' 서비스를 본격 가동하며 개인화된 여행 큐레이션 시대를 열었습니다. 이 서비스는 통신 데이터와 카드 매출액 등 방대한 정량 데이터를 분석하여 연령별, 목적별 최적의 여행지를 도출해 내는 것이 특징입니다. 단순히 인기 순위를 나열하는 대신, 최근 떠오르는 트렌드를 반영한 테마별 코스를 제안하여 관광객들에게 높은 만족도를 얻고 있습니다. 도 관계자는 데이터 기반의 정밀한 추천을 통해 관광객의 분산을 유도하고 지역 내 균형 있는 경제 성장을 도모하겠다고 밝혔습니다.",
    "category": "AI & Data",
    "tag": "데이터 기반 큐레이션",
    "link": "https://n.news.naver.com/mnews/article/015/0005285602?sid=102",
    "thumbnail": "/images/news/2026-05-11/article_ai_4b.jpg"
  },
  {
    "title": "“더 진화했다”…‘케이콘 재팬 2026’, 12만 명 동원하며 성료",
    "press": "문화일보",
    "target_date": "2026-05-11",
    "excerpt": "일본 지바현에서 개최된 세계 최대 규모의 K-컬처 페스티벌 '케이콘 재팬 2026'이 첨단 ICT 기술과 K-팝이 결합된 고도의 공연 문화를 선보이며 12만 관객의 열광 속에 막을 내렸습니다. 이번 행사에서는 AI 기반의 다국어 자막 시스템과 팬맞춤형 인터랙티브 부스가 설치되어 언어의 장벽을 뛰어넘는 혁신적인 관람 경험을 제공했습니다. 특히 메타버스를 통해 현장에 오지 못한 글로벌 팬들도 동시 접속하여 공연을 즐리는 등 디지털 플랫폼의 확장성을 보여주었습니다. 이러한 기술 융합형 축제는 K-컬처를 매개로 한 외국인 관광객 유치에 강력한 동력이 되고 있습니다.",
    "category": "AI & Data",
    "tag": "테크 결합 공연",
    "link": "https://m.entertain.naver.com/home/article/021/0002790519",
    "thumbnail": "/images/news/2026-05-11/article_ai_5.jpg"
  },
  {
    "title": "외국어 메뉴판 무료 제공에도 활용 저조한 부산",
    "press": "국제신문",
    "target_date": "2026-05-11",
    "excerpt": "부산광역시가 외국인 관광객 편의를 위해 AI 번역 기술을 적용한 외국어 메뉴판 제작을 대대적으로 지원하고 있으나, 현장의 실제 활용도는 기대에 못 미치고 있는 것으로 나타났습니다. 현장 조사 결과, 메뉴판 보급 이후 사후 관리 부족과 식당 업주들의 디지털 기기 조작 미숙 등이 주요 원인으로 분석되었습니다. 시는 이를 해결하기 위해 단순 기기 보급을 넘어 업주들을 대상으로 한 찾아가는 디지털 교육과 실시간 업데이트 시스템을 강화할 방침입니다. 스마트 관광 도시로 거듭나기 위해서는 인프라 구축뿐만 아니라 현장의 수용태세를 개선하는 세심한 관리가 필요하다는 지적이 나오고 있습니다.",
    "category": "AI & Data",
    "tag": "스마트 관광 인프라",
    "link": "https://n.news.naver.com/mnews/article/658/0000143518?sid=102",
    "thumbnail": "/images/news/2026-05-11/article_ai_6.jpg"
  }
];

async function restore() {
  console.log('Starting restore for 2026-05-11...');

  // 1. Restore Insights
  const { error: insightError } = await supabase
    .from('news_trends_insights')
    .upsert(insightCards);
  if (insightError) console.error('Insight Restore Error:', insightError);
  else console.log('Insights restored successfully.');

  // 2. Restore Articles
  const allArticles = [...naverNewsData, ...naverNewsDataAI];
  const { error: articleError } = await supabase
    .from('news_trends_articles')
    .upsert(allArticles);
  if (articleError) console.error('Article Restore Error:', articleError);
  else console.log('Articles restored successfully.');

  console.log('Restore complete.');
}

restore();
