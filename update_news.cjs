const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function loadEnv() {
  const envPath = path.join(process.cwd(), '.env');
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

async function updatePremiumNews() {
  const today = '2026-05-09';
  const articles = [
    {
      target_date: today,
      category: 'Tourism News',
      tag: '지역 축제',
      title: '아리랑, 시대를 넘어 미래로…제68회 밀양아리랑대축제 개막',
      excerpt: '68년 전통을 자랑하는 경남의 대표 축제 ‘밀양아리랑대축제’가 화려하게 개막했습니다. 밀양강을 배경으로 펼쳐지는 초대형 실경 멀티미디어 공연 ‘밀양강 오딧세이’와 다채로운 체험 행사로 전국의 관광객들을 맞이하고 있습니다.',
      press: '연합뉴스TV',
      link: 'http://www.yonhapnewstv.co.kr/news/MYH20260509145236GXz',
      thumbnail: 'https://imgnews.pstatic.net/image/422/2026/05/09/MYH20260509145236GXz_20260509151532241.jpg?type=w800'
    },
    {
      target_date: today,
      category: 'Tourism News',
      tag: '도시 문화',
      title: '서울세계도시문화축제 개막…DDP서 즐기는 ‘도심 속 세계 여행’',
      excerpt: '서울 동대문디자인플라자(DDP)에서 ‘2026 서울세계도시문화축제’가 막을 올렸습니다. 전 세계 70여 개 도시의 전통 음식과 문화를 한자리에서 체험할 수 있어 주말 나들이객들에게 이국적인 즐거움을 선사하고 있습니다.',
      press: '연합뉴스',
      link: 'https://www.yna.co.kr/view/PYH20260509022400013?input=1196m',
      thumbnail: 'https://imgnews.pstatic.net/image/001/2026/05/09/PYH2026050902240001300_P4_20260509143329241.jpg?type=w800'
    },
    {
      target_date: today,
      category: 'Tourism News',
      tag: '여행 트렌드',
      title: '5월 가정의 달, 동남아 ‘패밀리 프렌들리’ 휴양 여행 각광',
      excerpt: '5월 황금연휴를 맞아 온 가족이 편안하게 즐길 수 있는 동남아 휴양지가 큰 인기를 끌고 있습니다. 베트남 나트랑 등 키즈 시설과 휴양 인프라가 완비된 리조트를 중심으로 가족 단위 관광객들의 예약이 집중되고 있습니다.',
      press: '비즈월드',
      link: 'http://www.bizwnews.com/news/articleView.html?idxno=136004',
      thumbnail: 'http://www.bizwnews.com/news/photo/202605/136004_122421_1720.jpg'
    },
    {
      target_date: today,
      category: 'AI & Data',
      tag: 'AI 산업',
      title: '“적자인데 목표가 줄상향”…AI 데이터센터 전력난 최대 수혜주 부상',
      excerpt: '글로벌 AI 열풍으로 데이터센터 전력 수요가 폭증하면서 수소연료전지 등 전력 인프라 기업들이 핵심 수혜주로 떠올랐습니다. 미래 수주 기대감이 반영되며 증권사들이 목표주가를 잇따라 상향 조정하고 있습니다.',
      press: '매일경제',
      link: 'https://www.mk.co.kr/article/12042285',
      thumbnail: 'https://imgnews.pstatic.net/image/009/2026/05/09/0005677510_001_20260509134810241.jpg?type=w800'
    },
    {
      target_date: today,
      category: 'AI & Data',
      tag: '스마트 행정',
      title: '춘천시, 지자체 최초 생성형 AI 행정서비스 ‘AI 주무관’ 본격 운영',
      excerpt: '춘천시가 공공기관 최초로 생성형 AI를 내부 행정에 도입한 ‘AI 주무관’ 서비스를 시작했습니다. AI가 복잡한 행정 업무와 데이터 분석을 지원하여 공무원들의 업무 효율을 높이고 스마트한 행정 서비스를 구현합니다.',
      press: '비욘드포스트',
      link: 'http://www.beyondpost.co.kr/view.php?ud=202605091336454420205868f676_30',
      thumbnail: 'http://www.beyondpost.co.kr/news/photo/202605/224522_20260509133645.jpg'
    },
    {
      target_date: today,
      category: 'AI & Data',
      tag: '반도체 트렌드',
      title: '“새로운 슈퍼사이클 진입”…SK하이닉스, AI 메모리 시장 독주 예고',
      excerpt: 'AI 반도체 수요 폭발에 힘입어 SK하이닉스가 메모리 시장의 새로운 슈퍼사이클에 진입했다는 분석입니다. 증권가는 목표주가를 대폭 상향하며 AI 시장 성장에 따른 압도적인 수익성 개선을 전망하고 있습니다.',
      press: '핀포인트뉴스',
      link: 'https://www.pinpointnews.co.kr/news/articleView.html?idxno=451520',
      thumbnail: 'https://www.pinpointnews.co.kr/news/photo/202605/451520_451520_1234.jpg'
    }
  ];

  console.log('Cleaning up and inserting Premium news articles for 5/9...');
  await supabase.from('news_trends_articles').delete().eq('target_date', today);
  const { error } = await supabase.from('news_trends_articles').insert(articles);

  if (error) {
    console.error('Update error:', error);
  } else {
    console.log('Success! Premium news content for 5/9 has been fully updated.');
  }
}

updatePremiumNews();
