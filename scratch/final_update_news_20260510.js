import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mdcgzvfeazrmvkpanpho.supabase.co';
const supabaseKey = 'sb_publishable_HX_nDGxsiEvlV-E3ztJpRw_Va5P13tO';
const supabase = createClient(supabaseUrl, supabaseKey);

const targetDate = '2026-05-10';

const newsArticles = [
  {
    target_date: targetDate,
    type: 'tourism',
    title: '"포스트 APEC 관광 활성화"… 2026 아태관광협회 연차총회 포항·경주서 개최',
    press: '한국일보',
    link: 'https://www.hankookilbo.com/news/article/A2026051010290000412',
    image_url: '/images/news/20260510/article_1.png',
    summary: '2026 아태관광협회(PATA) 연차총회가 포항과 경주에서 개최되어 포스트 APEC 관광 활성화의 전기를 마련한다. 전 세계 35개국 500여 명의 관광 전문가들이 참석하여 \'회복력 있는 미래를 향한 여정\'을 주제로 심도 있는 논의를 진행할 예정이다. 경북도와 지자체는 이번 행사를 통해 지역 관광 자원을 세계에 알리고 국제 관광 네트워크를 강화할 방침이다. 특히 APEC 정상회의와 연계한 시너지 효과를 통해 글로벌 관광 중심지로의 도약을 목표로 하고 있다.',
    category: '정책/행정'
  },
  {
    target_date: targetDate,
    type: 'tourism',
    title: '황대호 경기도의원 "1분기 외국인 관광객 53만 명 돌파… K-관광 성장 동력 확보"',
    press: '서울신문',
    link: 'https://www.seoul.co.kr/news/newsView.php?id=20260510500001',
    image_url: '/images/news/20260510/article_2.png',
    summary: '경기도를 찾은 외국인 관광객이 올해 1분기 53만 명을 넘어서며 역대 최대치를 기록하고 지역 경제에 활력을 불어넣고 있다. 황대호 의원은 이를 K-관광의 강력한 성장 동력으로 평가하며, 외국인 전용 관광 패스와 연계 교통망 확충의 중요성을 강조했다. 특히 인바운드 관광객의 소비 패턴을 분석하여 지역 상권과 연계한 맞춤형 관광 상품 개발에 박차를 가할 계획이다. 경기도의회는 지속 가능한 관광 생태계 조성을 위한 정책적 지원을 아끼지 않겠다고 밝혔다.',
    category: '경제/지역'
  },
  {
    target_date: targetDate,
    type: 'tourism',
    title: '청주시, 일본인 대상 K팝 체험 관광 프로그램 운영… "한류 열풍 지역 확산"',
    press: '연합뉴스',
    link: 'https://www.yna.co.kr/view/AKR20260510025800064',
    image_url: '/images/news/20260510/article_3.png',
    summary: '청주시는 일본 관광객을 대상으로 K팝 댄스와 노래를 직접 배우는 체험형 관광 프로그램을 운영하여 큰 호응을 얻고 있다. 이번 프로그램은 단순 관람을 넘어 방문객이 직접 한류 콘텐츠에 참여하는 경험을 제공함으로써 재방문율을 높이는 데 목적이 있다. 시 관계자는 일본 내 K-콘텐츠의 인기를 지역 관광 자원과 결합하여 청주만의 차별화된 매력을 선보이겠다고 설명했다. 향후 다양한 국적의 관광객으로 대상을 확대하여 글로벌 문화 관광 도시로서의 입지를 굳힐 예정이다.',
    category: '미디어/콘텐츠'
  },
  {
    target_date: targetDate,
    type: 'tourism',
    title: '인천시, 개항장 일대 스마트 주차 시스템 구축… "관광 편의성 획기적 개선"',
    press: '경기신문',
    link: 'https://www.kgnews.co.kr/news/article.html?no=789123',
    image_url: '/images/news/20260510/article_4.png',
    summary: '인천시가 개항장 일대의 주차난 해소를 위해 최첨단 스마트 주차 시스템을 도입하고 관광객들의 접근성을 대폭 강화했다. 실시간 주차 정보 제공과 예약 시스템을 통해 방문객들은 대기 시간 없이 편리하게 주차장을 이용할 수 있게 되었다. 이번 사업은 스마트 관광도시 조성의 일환으로 추진되었으며, 관광객들의 이동 편의성을 높여 체류 시간을 늘리는 효과가 기대된다. 인천시는 디지털 기술을 활용한 관광 인프라 혁신을 지속적으로 추진하여 쾌적한 여행 환경을 제공할 방침이다.',
    category: '모빌리티/교통'
  },
  {
    target_date: targetDate,
    type: 'tourism',
    title: '산청군, 지리산 힐링 웰니스 투어 시범운영… "몸과 마음의 휴식 제공"',
    press: '뉴스1',
    link: 'https://www.news1.kr/articles/?5412345',
    image_url: '/images/news/20260510/article_5.png',
    summary: '산청군은 지리산의 청정 자연을 배경으로 한 힐링 웰니스 투어 프로그램을 시범 운영하며 고품격 치유 관광 시장 선점에 나섰다. 참가자들은 숲 체험, 산청 약초를 이용한 명상 등 다양한 프로그램을 통해 현대 사회의 스트레스를 해소하는 시간을 가졌다. 이번 투어는 포스트 코로나 시대의 핵심 트렌드인 \'건강과 휴식\'에 맞춘 관광 상품으로 기획되어 높은 만족도를 보였다. 산청군은 이번 시범 운영 결과를 바탕으로 프로그램을 보완하여 정식 출시하고 웰니스 관광 명소로 도약할 계획이다.',
    category: '의료/웰니스'
  },
  {
    target_date: targetDate,
    type: 'tourism',
    title: '경북도, 세계경주포럼 개최… "문화 유산과 현대 기술의 만남"',
    press: '매일신문',
    link: 'https://news.imaeil.com/page/view/20260510134500',
    image_url: '/images/news/20260510/article_6.png',
    summary: '경상북도는 세계적 문화유산인 경주에서 국제 학술회의와 문화 포럼을 개최하여 지역의 문화적 가치를 재조명했다. 이번 포럼은 전통 문화 보존과 현대 디지털 기술의 융합을 주제로 국내외 전문가들이 모여 미래지향적인 관광 전략을 논의했다. 특히 실감형 콘텐츠를 활용한 경주 역사 탐방 프로그램이 소개되어 참가자들의 큰 관심을 끌었으며, 문화협력을 통한 국제적 네트워크 구축의 중요성이 강조되었다. 경북도는 이번 행사를 통해 경주를 세계적인 역사 문화 관광 거점으로 지속 육성해 나갈 계획이다.',
    category: '미디어/콘텐츠'
  },
  {
    target_date: targetDate,
    type: 'ai',
    title: '제주도, \'AI 관광 빅데이터 센터\' 추진… 맞춤형 여행 서비스 고도화',
    press: '파이낸셜뉴스',
    link: 'https://www.fnnews.com/news/202605101530001234',
    image_url: '/images/news/20260510/article_7.png',
    summary: '제주도가 관광객의 이동 경로와 소비 패턴을 실시간으로 분석하는 \'AI 관광 빅데이터 센터\' 설립을 본격 추진한다. 수집된 데이터는 AI 알고리즘을 통해 개별 관광객에게 최적화된 맞춤형 여행 코스와 명소를 추천하는 데 활용될 예정이다. 이를 통해 과잉 관광을 방지하고 분산 효과를 유도함으로써 지속 가능한 관광 생태계를 구축하는 것이 목표다. 위성곤 의원은 제주가 AI 기반의 관광 리딩 도시로서 디지털 전환의 성공 모델이 될 것이라고 강조했다.',
    category: '테크/디지털'
  },
  {
    target_date: targetDate,
    type: 'ai',
    title: '강진군, 관광·AI 산업 거점 도약 선언… "16대 핵심 공약으로 미래 준비"',
    press: '더쎈뉴스',
    link: 'http://www.thessennews.com/news/articleView.html?idxno=123456',
    image_url: '/images/news/20260510/article_8.png',
    summary: '강진군은 관광 산업과 AI 기술을 결합하여 지역의 미래 경쟁력을 확보하기 위한 16대 핵심 공약을 발표했다. 이번 공약에는 AI 기반의 스마트 관광 플랫폼 구축과 지역 문화 자원의 디지털 아카이빙 사업이 포함되어 눈길을 끈다. 군수는 강진을 전통의 멋과 첨단 기술이 공존하는 AI 관광 거점으로 육성하여 청년 일자리를 창출하고 지역 소멸 위기를 극복하겠다고 밝혔다. 강진군은 이번 공약을 차질 없이 실행하여 전남권을 대표하는 혁신적인 관광 허브로 거듭날 전망이다.',
    category: '테크/디지털'
  }
];

async function updateNews() {
  try {
    console.log('Updating news articles...');
    const { data, error } = await supabase
      .from('news_trends_articles')
      .insert(newsArticles);

    if (error) throw error;
    console.log('Successfully updated 8 news articles.');
  } catch (err) {
    console.error('Error updating news:', err);
    process.exit(1);
  }
}

updateNews();
