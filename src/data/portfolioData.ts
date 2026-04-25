export interface PortfolioItem {
  id: string;
  year: string;
  title: string;
  client: string;
  categories: string[];
  description: string;
  imageUrl: string;
  externalLink?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    year: "2025",
    title: "데이터 기반 기후변화에 따른 관광 대응 방안 연구",
    client: "한국관광공사",
    categories: ["연구용역", "인포그래픽스"],
    description: "기후변화로 인한 환경 생태계 변화가 관광산업에 미치는 영향을 분석하기 위해 전국 기초지자체 단위 관광기후 환경 데이터를 연계한 분석 컨설팅을 수행했다. 기후변화-관광산업 간 연관성 분석, 국내외 지속가능한 관광정책 제도 및 탄소중립 친환경 관광 관련 글로벌 동향 등 세부 내용을 조사 분석하였으며, 관광 빅데이터(한국관광 데이터랩, 기상환경 데이터 등)를 활용한 데이터 기반 관광 트렌드 분석 및 지역별 영향 진단을 수행했다. 본 연구 용역을 통해 지속가능한 관광 콘텐츠 발굴, 관광상품 기획 및 정책사업 활용이 가능한 전략 방향과 시사점을 도출했다.",
    imageUrl: "/portfolio-1.png",
    externalLink: "https://datalab.visitkorea.or.kr/site/portal/ex/bbs/View.do?cbIdx=1603&cbIdx2=1129&bcIdx=309787&pageIndex=1&tgtTypeCd=CATE_CONT&searchKey=%EB%8D%B0%EC%9D%B4%ED%84%B0+%EA%B8%B0%EB%B0%98+%EA%B8%B0%ED%9B%84%EB%B3%80%ED%99%94&searchKey1=&searchKey2=&searchKey3=SUB_CONT&tabFlag=N&subFlag=N&cateCont=tlt02"
  },
  {
    id: "2",
    year: "2024",
    title: "데이터 기반 관광 이벤트 및 사업 효과 분석",
    client: "한국관광공사",
    categories: ["연구용역"],
    description: "한국관광공사가 추진하는 주요 관광 이벤트(축제) 및 정책사업의 성과를 객관적으로 검증하기 위해 통신, 신용카드 등 KTO 빅데이터와 사업 데이터를 융합한 효과 분석 용역을 수행했다. 숙박세일페스타, 근로자휴가지원사업, 디지털주민증, 여행가는달, 축제 등 관광 홍보, 프로모션 사업을 대상으로 기초현황 분석 및 방문·소비 패턴 분석을 수행하였으며, 이분차분법(DID), 구조방정식모형(SEM) 등 계량 분석 기법을 활용하여 사업별 직접효과 및 주변 지역 확산효과를 정량적으로 분석 수행했다. 분석 결과를 토대로 관광사업 효과 측정을 위한 표준화된 분석모델을 구축하고, 향후 관광정책 수립,사업 기획,보도자료 및 인포그래픽 활용을 위한 시사점을 도출했다.",
    imageUrl: "/portfolio-2.jpg",
    externalLink: "https://datalab.visitkorea.or.kr/site/portal/ex/bbs/View.do?cbIdx=1129&bcIdx=308703&pageIndex=1&tgtTypeCd=SUB_CONT&searchKey=%EB%8D%B0%EC%9D%B4%ED%84%B0+%EA%B8%B0%EB%B0%98+%EA%B4%80%EA%B4%91+%EC%9D%B4%EB%B2%A4%ED%8A%B8+%EB%B0%8F+%EC%82%AC%EC%97%85+%ED%9A%A8%EA%B3%BC+%EB%B6%84%EC%84%9D&searchKey2=&tabFlag=N&subFlag=N&cateCont=tlt02"
  },
  {
    id: "3",
    year: "2022",
    title: "기초지자체별 관광유형 고도화 및 활용방안 도출",
    client: "한국관광공사",
    categories: ["연구용역", "인포그래픽스"],
    description: "급변하는 관광환경에 선제적 대응 및 체계적 지원을 위한 지역관광 여건분석이 필요함에 따라 관광활동 데이터 및 지역관광여건분석을 종합한 기초 지자체별 관광유형 고도화로 지역별 진단 및 과제 발굴을 위한 프로젝트. 전국 기초 지자체 250개 기초 지자체에 대한 지역여건 및 관광자원 분석, 관광현황분석, 군집분석, 유형도출 및 시각화 인포그래픽스를 제작했다.",
    imageUrl: "/portfolio-3.jpg",
    externalLink: "https://datalab.visitkorea.or.kr/site/portal/ex/bbs/View.do?cbIdx=1603&cbIdx2=1129&bcIdx=303551&pageIndex=1&tgtTypeCd=CATE_CONT&searchKey=%EA%B3%A0%EB%8F%84%ED%99%94&searchKey1=&searchKey2=&searchKey3=SUB_CONT&tabFlag=N&subFlag=N&cateCont=tlt03"
  },
  {
    id: "4",
    year: "2022",
    title: "한국관광데이터랩 데이터앤투어리즘 10호",
    client: "한국관광공사",
    categories: ["인포그래픽스"],
    description: "실데이터 기반 관광산업 동향 시범분석 연구로 확인된 각종 통계 데이터를 한국관광데이터랩 홈페이지 이용자에게 정보 제공을 위한 인포그래픽 제작.",
    imageUrl: "/portfolio-4.jpg",
    externalLink: "https://datalab.visitkorea.or.kr/site/portal/ex/bbs/View.do?cbIdx=1603&cbIdx2=1129&bcIdx=300776&pageIndex=1&tgtTypeCd=CATE_CONT&searchKey=10%ED%98%B8&searchKey1=&searchKey2=&searchKey3=SUB_CONT&tabFlag=N&subFlag=N&cateCont=tlt03"
  },
  {
    id: "5",
    year: "2023",
    title: "한국관광데이터랩 데이터앤투어리즘 19호",
    client: "한국관광공사",
    categories: ["인포그래픽스"],
    description: "빅데이터기반 전국 기초지자체별 관광유형분석 연구로 확인된 각종 통계 데이터를 한국관광데이터랩 홈페이지 이용자에게 정보 제공을 위한 인포그래픽을 제작함",
    imageUrl: "/portfolio-5.jpg",
    externalLink: "https://datalab.visitkorea.or.kr/site/portal/ex/bbs/View.do?cbIdx=1603&cbIdx2=1129&bcIdx=303551&pageIndex=1&tgtTypeCd=CATE_CONT&searchKey=19%ED%98%B8&searchKey1=&searchKey2=&searchKey3=SUB_CONT&tabFlag=N&subFlag=N&cateCont=tlt03"
  },
  {
    id: "6",
    year: "2023",
    title: "한국관광데이터랩 데이터앤투어리즘 21호",
    client: "한국관광공사",
    categories: ["인포그래픽스"],
    description: "관광 빅데이터 및 공공데이터 간 융합분석을 통한 내외국인 방문수요의 주요 원인 연구로 확인된 각종 통계 데이터를 한국관광데이터랩 홈페이지 이용자에게 정보 제공을 위한 인포그래픽 제작.",
    imageUrl: "/portfolio-6.jpg",
    externalLink: "https://datalab.visitkorea.or.kr/site/portal/ex/bbs/View.do?cbIdx=1603&cbIdx2=1129&bcIdx=305184&pageIndex=1&tgtTypeCd=CATE_CONT&searchKey=21%ED%98%B8&searchKey1=&searchKey2=&searchKey3=SUB_CONT&tabFlag=N&subFlag=N&cateCont=tlt03"
  }
];
