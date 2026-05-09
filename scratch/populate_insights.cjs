const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Manual .env parsing
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
  });
  return env;
}

const env = loadEnv();
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const today = new Date().toISOString().split('T')[0];

const insights = [
  {
    target_date: today,
    keyword: "남해 반값 여행",
    type: "analysis",
    category: "REGIONAL DEVELOPMENT (지역 경제 활성화)",
    reason: "남해군에서 진행하는 '국민쉼터 반반남해' 캠페인입니다. 관외 방문객의 여행 경비 50%(최대 10만 원)를 지역화폐로 환급해주는 파격적인 지자체 프로모션이 웹 검색어 최상위권에 오르며 큰 호응을 얻고 있습니다."
  },
  {
    target_date: today,
    keyword: "소 맥거핀 찰칵 세계 여행",
    type: "unique",
    category: "UNIQUE CONTENT (이색 트렌드)",
    reason: "인기 유튜브 애니메이션 크리에이터 '소맥거핀'의 세계여행 관련 콘텐츠입니다. 단순 정보성 검색을 넘어, 스토리텔링과 캐릭터가 결합된 '엔터테인먼트형 간접 여행' 콘텐츠 소비가 뚜렷한 트렌드로 자리 잡았습니다."
  },
  {
    target_date: today,
    keyword: "에어로 케이",
    type: "analysis",
    category: "AVIATION INDUSTRY (항공 산업)",
    reason: "최근 청주~도쿄(하네다) 노선 취항 및 상하이 등 중국 4개 노선 운수권을 확보하며 공격적으로 노선을 확장하고 있는 LCC 에어로케이의 검색량이 급증했습니다. 중부권 지역민들의 여행 편의가 크게 향상될 것으로 기대됩니다."
  },
  {
    target_date: today,
    keyword: "소녀 종말 여행",
    type: "unique",
    category: "SUBCULTURE TOURISM (서브컬처 관광)",
    reason: "유명 디스토피아 애니메이션/만화 타이틀이 여행 검색어와 섞여 진입했습니다. 서브컬처 IP 기반 콘텐츠 소비가 꾸준하며, 관련 성지순례 등 애니메이션이 실제 팝컬처 관광에 미치는 잠재적 영향을 엿볼 수 있습니다."
  }
];

async function populateInsights() {
  console.log('Inserting insights for:', today);
  
  const { data, error } = await supabase
    .from('news_trends_insights')
    .insert(insights);

  if (error) {
    console.error('Error inserting insights:', error);
  } else {
    console.log('Successfully inserted insights!');
  }
}

populateInsights();
