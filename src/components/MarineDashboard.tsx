import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie, Legend, LabelList
} from 'recharts';
import { 
  Anchor, Users, Map, AlertTriangle, Ship, 
  TrendingUp, Compass, Info, ChevronRight,
  Target, Calendar, CreditCard, Award,
  Database, LayoutGrid, MapPin, Lightbulb, Share2, Link as LinkIcon,
  Utensils, History, Waves, FileText, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── 데이터 ──────────────────────────────────────
const REGIONS = [
  {
    num:'①', name:'경기 시화호', color:'#0891b2', theme:'생태·교육',
    target:'40대 여성 가족', form:'당일 자가용', price:'92,000원~',
    tags:['#생태체험', '#조력발전소', '#대부도'],
    image: '/regions/region1.jpg',
    n:1978, persona_base:'travel',
    travel:{'자연·경관':52.3,'로컬추구':11.2,'미식':23.5},
    extra_type:'travel', extra:{},
    latest:'2025.10 시화호 해양전략 국제포럼 개최\n경기·화성·안산·시흥 공동협약\n시화호 통합BI 선포\n전기유람선 뱃길(반달섬~방아머리 13km) 취항',
    insight:'수도권 인접 지리적 이점과 조력발전소의 교육적 가치를 결합한 "에듀테인먼트" 해양관광의 핵심 거점',
    connection:'인천 도서지역(레저) - 경기 시화호(교육) - 충남 태안(치유)을 잇는 서해안 황금 연계 노선',
    courses:[
      {t:'시화나래조력공원 견학',d:'세계 최대 조력발전소 산업+생태 스토리텔링 · 무료'},
      {t:'철새 탐조 체험',d:'봄·가을 시즌 · 해설사 동행 · 어린이 탐조 체크리스트'},
      {t:'어촌 직판 점심',d:'안산 현지가격 회·조개구이 — 관광지 대비 가격 USP'},
      {t:'대부도 자유 탐방',d:'갯벌 체험 또는 바지락칼국수 선택'},
    ],
    diff:['조력발전소를 에너지교육 콘텐츠로 재구성 — 학교 체험학습 연계','시화호 통합BI 선포 직후 — 공식 브랜드와 상품 연계 시너지','QR 자가 가이드 — 가이드 비용 절감+자유여행 감성'],
    compare_tag:'travel 단독',
  },
  {
    num:'②', name:'인천 도서지역', color:'#2563eb', theme:'해양레저',
    target:'40-50대 남성 가족', form:'당일 자가용', price:'28,000원~',
    tags:['#섬여행', '#바다낚시', '#영종도'],
    image: '/regions/region2.jpg',
    n:10221, persona_base:'travel+sports',
    travel:{'자연·경관':51.8,'휴식·회복':31.3,'미식':23.7,'로컬':11.3},
    extra_type:'sports',
    extra:{'산책':40.6,'배드민턴':12.1,'낚시':5.7,'헬스':7.5,'사우나':5.5},
    latest:'2026.3 인천 해양레저 산업 성장 보도 · 강화도·덕적도 섬 낚시 체험 인기 · 인천 러닝대회 확대 · 도서지역 갯벌생태관광 수요 증가',
    insight:'낚시와 배드민턴 등 정적·동적 레저 수요가 공존하는 "액티브 아일랜드"의 가능성 확인',
    connection:'경기 시화호(에너지) - 인천 영종/강화(레저) - 서해5도 연계 섬 관광 고도화 루트',
    courses:[
      {t:'강화도 광성보 역사 탐방',d:'배리어프리 동선 · QR 해설 · 부모 효도 코스'},
      {t:'동막해변 갯벌 낚시 체험',d:'장화 대여 · 조개·낙지 · 섬 선상 낚시 옵션'},
      {t:'외포리 밴댕이회 점심',d:'어촌 직판 연계 · 현지가격 USP'},
      {t:'자유 산책+귀환',d:'배드민턴 동호회 연계 옵션 추가'},
    ],
    diff:['sports 데이터: 낚시 5.7% — 5개 레저권역 중 최고 → 섬 낚시 특화 명확','배드민턴 12.1% → 도서 배드민턴+낚시 당일 복합 코스','travel: 자연경관 51.8% + 휴식 31.3% → 한적한 섬 당일 코스 정합'],
    compare_tag:'travel+sports',
  },
  {
    num:'③', name:'강원 속초 아바이마을', color:'#dc2626', theme:'지역문화·런케이션',
    target:'20-30대 여성 친구', form:'1박2일 KTX+버스', price:'132,000원~',
    tags:['#런케이션', '#아바이마을', '#갯배'],
    image: '/regions/region3.jpg',
    n:6403, persona_base:'travel',
    travel:{'미식·FnB':36.4,'자연·경관':26.2,'로컬추구':20.4,'친구동반':43.0},
    extra_type:'travel', extra:{},
    latest:'해파랑길 45코스(17.6km) 아바이마을 경유\n청량리↔강릉 KTX-이음 편도 26,000원 하루 17~24회\n강릉역→강릉시외버스터미널 시내버스 30분\n강릉→속초 시외버스 직통 1시간 / 완행 1시간20분(하루 21회)',
    insight:'KTX-이음의 압도적 접근성을 활용한 2030 여성 대상 "런케이션(Run+Workation)" 트렌드 선점',
    connection:'강릉역(교통 거점) - 속초 아바이마을(문화) - 고성 해변(휴식)을 잇는 동해 북부 런트립 루트',
    courses:[
      {t:'KTX-이음 강릉역→시내버스→시외버스 속초',d:'청량리 출발 총 3시간 내외 · 편도 26,000+버스비'},
      {t:'워케이션 코워킹 공간 입장',d:'청초호 뷰 코워킹 카페 or 숙소 세팅'},
      {t:'아바이마을 저녁 런 5km',d:'갯배선착장→청호동 해안→설악대교 순환'},
      {t:'새벽 런 3선 택일',d:'5km/10km/해파랑 17.6km 난이도별 선택'},
    ],
    diff:['해파랑길 45코스가 아바이마을 직접 경유 — 타 지역 복제 불가 지리 USP','KTX-이음+시내버스+시외버스 3단계 환승 통합 안내 — 진입장벽 제거','달리기→노포 회복식(아바이순대·함흥냉면) 동선 완결'],
    compare_tag:'travel 단독',
  },
  {
    num:'④', name:'충남 태안 안면도', color:'#059669', theme:'치유·반려동물',
    target:'50-60대 남성 부부', form:'1박2일 즉흥가능', price:'78,000원~',
    tags:['#안면도', '#반려동물동반', '#갯벌낚시'],
    image: '/regions/region4.jpg',
    n:2098, persona_base:'travel',
    travel:{'자연·경관':48.1,'휴식·회복':35.2,'미식':22.1},
    extra_type:'travel', extra:{},
    latest:'2025 케이펫페어 반려동물 친화관광도시 태안\nSNS 펫니스태안 운영\n안면도 6만 3천평 규모의 지방정원 시범운영 돌입(2026.04)\n태안 해안순환도로 핵심 구간(가로림만교량 등) 2026년 말 구축 가시화\n꽃지해수욕장·팜카밀레 펫 동반 여행 활성화',
    insight:'반려동물 동반 인구의 폭발적 수요와 즉흥적 여행 패턴을 수용하는 "펫-웰니스" 특화 공간',
    connection:'충남 당진(당일) - 태안 안면도(체류) - 보령 해저터널 연계 서해안 남부 확장 노선',
    courses:[
      {t:'안면도 갯벌낚시 체험',d:'예약없이 현장 조인 · 3시간 · 장비대여 포함'},
      {t:'어촌계 직판 대하·꽃게',d:'현지 가격 USP · 시즌별 제철'},
      {t:'펫프렌들리 펜션 체크인',d:'반려견 동반 가능 전용 공간'},
      {t:'서해 드라이브 귀환',d:'꽃지·만리포·몽산포 3해변 자유 코스'},
    ],
    diff:['2025 케이펫페어 참가로 반려동물 친화관광도시 공식화','즉흥형 13.9% → 사전예약 없이 현장 조인 오픈형 구조','해안순환도로 2026년 완전 개통 → 드라이브 코스 접근성 향상'],
    compare_tag:'travel 단독',
  },
  {
    num:'⑤', name:'전북 군산·부안', color:'#d97706', theme:'생태·해양미식',
    target:'15-29세·30-40대 여성 친구', form:'1박2일 KTX', price:'115,000원~',
    tags:['#군산짬뽕', '#근대거리', '#변산반도'],
    image: '/regions/region5.jpg',
    n:3559, persona_base:'travel+culinary',
    travel:{'미식·FnB':55.9,'로컬추구':38.3,'자연·경관':21.1},
    extra_type:'culinary',
    extra:{'나물':57.3,'비빔밥':19.2,'회':17.4,'초밥':13.5,'한정식':12.4,'된장':9.3},
    latest:'군산 이성당·짬뽕 지속 인기 · 부안 변산반도 갯벌생태 체험 수요 증가 · 곰소염전 직판 젓갈·백합 로컬 식재료 발굴 · 전북 여성 관광객 미식 탐방 SNS 활발',
    insight:'압도적인 미식 니즈(55.9%)와 로컬 식재료(나물 57.3%)를 결합한 "슬로푸드 고메" 투어의 메카',
    connection:'익산역(교통 거점) - 군산 근대거리(문화) - 부안 변산반도(생태/미식) 연계 루트',
    courses:[
      {t:'KTX 익산역→군산 버스',d:'서울↔익산 KTX 2시간 · 군산 버스 30분'},
      {t:'군산 근대거리+이성당',d:'로컬 가이드 동행 · 짬뽕 도장깨기 스탬프'},
      {t:'근대가옥 숙소 체크인',d:'리모델링 게스트하우스 · 감성 숙소'},
      {t:'부안 갯벌+곰소 점심',d:'나물·백합죽·젓갈 직판 — 슬로푸드 USP'},
    ],
    diff:['culinary: 나물 57.3% 압도 → 슬로푸드 미식이 전면 콘텐츠','이성당·짬뽕 넘어 곰소젓갈·백합죽 미발굴 식재료로 차발화','15-29세 여성 1위 + 로컬추구 38.3% → SNS 바이럴 설계 내장'],
    compare_tag:'travel+culinary',
  },
  {
    num:'⑥', name:'전남 전역 미식', color:'#ea580c', theme:'미식',
    target:'40-50대 가족·부부', form:'2박3일 자가용', price:'128,000원~',
    tags:['#남도미식', '#여수밤바다', '#목포낙지'],
    image: '/regions/region6.jpg',
    n:5462, persona_base:'travel+culinary',
    travel:{'미식·FnB':48.9,'자연·경관':35.9,'휴식·회복':30.2,'로컬':27.9},
    extra_type:'culinary',
    extra:{'나물':49.9,'초밥':18.7,'회':17.7,'제철':7.6,'한정식':12.3,'된장':6.1},
    latest:'여수 낭만포차 야간 미식 지속 인기 · 목포 낙지거리·유달산 방문객 증가 · 청산도 슬로시티 입도 수요 회복 · 남도 미식 여행 SNS 확산 · 완도~여수~목포 자가용 드라이브 코스 인기',
    insight:'나물 미식과 해산물 포차 감성이 어우러진 "K-고메 나이트" 테마의 남도 대표 미식 관광지',
    connection:'목포(역사) - 여수(야간) - 순천(생태)을 아우르는 남해안 미식 벨트 핵심 경로',
    courses:[
      {t:'완도 전복 체험+직판',d:'어촌계 직판 · 전복 손질 체험 포함'},
      {t:'청산도 슬로길 여객선',d:'한림항 왕복 1시간 · 유네스코 슬로시티'},
      {t:'여수 낭만포차 야간',d:'선셋→야간 포차·해산물+소주 페어링'},
      {t:'목포 낙지거리 점심 귀환',d:'KTX 목포역 연결'},
    ],
    diff:['culinary: 나물 49.9% + 제철 7.6% → 전북보다 해산물 비중 높음','소주 10.3% 언급 → 여수 야간 포차 페어링 콘텐츠 근거 확보','로컬추구 27.9% — 어촌계 직판 연계가 실수요 정합'],
    compare_tag:'travel+culinary',
  },
  {
    num:'⑦', name:'전남 완도 치유', color:'#0d9488', theme:'치유',
    target:'40-60대 중장년 가족', form:'2박3일~5박6일', price:'참가비 30~70% 지원',
    tags:['#해양치유', '#완도', '#웰니스'],
    image: '/regions/region7.jpg',
    n:5462, persona_base:'travel',
    travel:{'휴식·회복':30.2,'자연·경관':35.9,'미식':48.9},
    extra_type:'travel', extra:{},
    latest:'완도해양치유센터 누적 방문 13만명\n2026 우수 웰니스 관광지 재지정\n장기 체류형 1박2일~5박6일 해양 치유프로그램 운영, 참가비 30~70% 지원(2026.4~)\n체류형 관광 인센티브 사업 \'완도 치유 페이\' 운영, 최대 10만원 지원 및 1인 여행 대상 확대\n2026 지방소멸대응기금 120억 확보, 해양치유, 맞춤형 인구정책 특화 사업에 투입',
    insight:'국내 유일의 해양치유 인프라와 강력한 인센티브 제도를 결합한 "메디컬 웰니스"의 롤모델',
    connection:'해남(땅끝문화) - 완도(치유) - 강진(로컬) 연계 전남 남부권 치유 관광 루트',
    courses:[
      {t:'완도해양치유센터',d:'7,740㎡ · 딸라소풀·해조류 테라피 16개 시설'},
      {t:'신지 명사십리 맨발 걷기',d:'6년 연속 블루플래그 인증 해수욕장'},
      {t:'청산도 슬로길+명상',d:'범바위 명상공간 · 경관 치유'},
      {t:'완도 치유 페이 활용',d:'SNS 인증 최대 20만원 지원 · 2026년 확대'},
    ],
    diff:['국내 최초 해양치유 전문시설 — 복제 불가 하드웨어 USP','체류형 1박~5박6일 치유 프로그램 참가비 최대 70% 지원','완도 치유 페이 SNS 인증 최대 20만원 — 디지털 마케팅 내재화'],
    compare_tag:'travel 단독',
  },
  {
    num:'⑧', name:'경북 포항·영덕·울진', color:'#4f46e5', theme:'역사+미식',
    target:'50-70대 여성 친구·가족', form:'2박3일 KTX+셔틀', price:'200,000원~',
    tags:['#경주역사', '#영덕대게', '#울진온천'],
    image: '/regions/region8.jpg',
    n:35155, persona_base:'travel+sports',
    travel:{'역사·문화':70.5,'미식·FnB':23.8,'휴식·회복':15.8},
    extra_type:'sports',
    extra:{'산책':47.4,'사우나':12.1,'배드민턴':12.6,'둘레길':3.5,'등산':7.5,'낚시':1.3},
    latest:'경주 역사문화 관광 지속 1위 · 영덕 대게 직판장 시가 대비 할인 연계 · 포항 과메기·물회 계절 미식 인기 · 해파랑길 경북 구간 시니어 트레킹 수요 증가 · 울진 성류굴+금강소나무숲 방문객 증가',
    insight:'70% 이상의 역사·문화 니즈를 기반으로 온천과 미식을 결합한 시니어 맞춤형 "헤리티지 치유" 투어',
    connection:'경주(역사) - 포항(미식) - 영덕/울진(해안트레킹)을 잇는 동해 중부 역사벨트',
    courses:[
      {t:'KTX 경주역+패키지 셔틀',d:'서울↔경주 2시간10분 · 렌터카 불필요'},
      {t:'불국사·석굴암·동궁과월지',d:'역사 해설사 동행 — 60대 선호 방식'},
      {t:'포항 물회→영덕 대게 저녁',d:'직판장 협약가 시가 -20%'},
      {t:'울진 성류굴+온천 귀환',d:'사우나 12.1% 데이터 근거 온천 연계'},
    ],
    diff:['travel: 역사·문화 70.5% — 해양레저 테마와 최대 괴리 → 테마 재정의 필수','sports: 사우나 12.1%+둘레길 3.5% — 5개 권역 중 최고 → 온천+트레킹 패키지','60-70대 여성 43% → KTX+셔틀로 3개 도시 이동'],
    compare_tag:'travel+sports',
  },
  {
    num:'⑨', name:'부산 전역', color:'#e11d48', theme:'축제·해양미식',
    target:'15-29세 남성 친구', form:'당일 시민 대상', price:'60,000원~',
    tags:['#광안리', '#바다축제', '#부산야시장'],
    image: '/regions/region9.jpg',
    n:15577, persona_base:'travel+sports',
    travel:{'미식·FnB':41.0,'로컬추구':23.9,'자연·경관':26.1,'휴식·회복':21.9},
    extra_type:'sports',
    extra:{'산책':37.6,'배드민턴':12.6,'헬스':9.2,'수영':6.3,'사우나':10.5},
    latest:'제29회 부산바다축제(2025.8.1~3) 다대포 · 2,000석 포장마차 확대 · 드론라이트쇼+불꽃쇼 · 2026 부산 밀 페스티벌(5.9~10) · 광안리 M 드론라이트쇼 정기운영 · 부산축제조직위원회 미쉐린~로컬맛집 미식도시 포지셔닝',
    insight:'미식과 야간 축제 콘텐츠가 결합된 "글로벌 미식 도시"로서의 SNS 바이럴 최적화 상품 구조',
    connection:'부산 도심(쇼핑/미식) - 기장(레저/바다) - 울산(야경)을 잇는 동남권 야간관광 거점',
    courses:[
      {t:'기장 해수욕장 수영',d:'sports: 수영 6.3% 데이터 근거 · 해변 오픈워터'},
      {t:'기장 현지인 노포 점심',d:'미역·대구탕·멸치쌈밥 — 로컬추구 23.9%'},
      {t:'광안리 선셋→광안대교 야경',d:'SNS 해시태그 음료 할인 인센티브'},
      {t:'야시장 야식 스탬프',d:'밀면·어묵·돼지국밥 3대 야식 투어'},
    ],
    diff:['travel: 미식41%+로컬24% → 야간 F&B가 핵심 동기','sports: 수영(6.3%)·헬스(9.2%) 5개 권역 최고 → 해변 수영+운동 복합','부산바다축제 2,000석 포장마차 → SNS 바이럴 내장 상품 구조'],
    compare_tag:'travel+sports',
  },
  {
    num:'⑩', name:'경남 거제·울산', color:'#7c3aed', theme:'이색로컬·체험',
    target:'40-50대 남성 가족', form:'1박2일 즉흥가능', price:'70,000원~',
    tags:['#거제도', '#어촌체험', '#런트립'],
    image: '/regions/region10.jpg',
    n:5494, persona_base:'travel',
    travel:{'자연·경관':45.2,'휴식·회복':35.1,'미식':28.3},
    extra_type:'travel', extra:{},
    latest:'거제 옥계마을 2025 전국 어촌마을 전진대회 어촌특화 최우수상\n거제 산달도마을 어촌체험휴양마을 대상 5년 연속(2025.11)\n거제 트레일&웰니스 로컬 런트립 진행(2026.3)\n울산 간절곶 간절루 신설(2025.08)\n2026 주요 관광지 및 축제행사 드론라이트쇼',
    insight:'어촌마을의 진정성 있는 로컬 체험과 스포츠 런트립 수요를 결합한 "프리미엄 로컬 체험" 모델',
    connection:'통영(예술) - 거제(체험) - 창원(로컬) 연계 경남 남해안 이색 로컬 투어 벨트',
    courses:[
      {t:'거제 옥계마을 어촌 체험',d:'해양쓰레기 액세서리 만들기 · ESG 결합'},
      {t:'거제 산달도 체험휴양마을',d:'5년 연속 대상 · 폐교 체류형 펜션 1박3식'},
      {t:'남해 바다멍 프리존',d:'망원경·해먹 비치 · 프로그램 없음'},
      {t:'울산 간절곶 일출',d:'한반도 최초 일출 · 새 랜드마크 간절루'},
    ],
    diff:['거제 옥계마을·산달도마을 공식 수상 — 신뢰도 높은 어촌 콘텐츠','클투×한화 거제 런트립 4:1 경쟁 — 스포츠+로컬 복합 수요 검증','울산 간절곶 간절루 신설 — 야간 야경+새벽 일출 이중 콘텐츠'],
    compare_tag:'travel 단독',
  },
  {
    num:'⑪', name:'울산 간절곶·명도', color:'#9333ea', theme:'체험·야간',
    target:'40-50대 부부·가족', form:'당일~1박', price:'30,000원~',
    tags:['#간절곶', '#드론쇼', '#일출명소'],
    image: '/regions/region11.jpg',
    n:5494, persona_base:'travel',
    travel:{'자연·경관':45.2,'휴식·회복':35.1,'미식':28.3},
    extra_type:'travel', extra:{},
    latest:'2026 새해 간절곶 드론라이트쇼 1,500대+불꽃놀이+야간경관전시 \'비밀의 정원\'\n간절루 신설(해 모양 곡선 지붕)\n진하해수욕장·서생포왜성 연계 야간 관광코스 인기\n한반도 최초 일출 명소 브랜딩 강화',
    insight:'한반도 최초 일출과 드론라이트쇼 등 압도적 하드웨어를 활용한 "야간 특화 관광"의 정점',
    connection:'부산(축제) - 울산 간절곶(야간/일출) - 경주(역사)를 연결하는 동해안 야간 관광 루트',
    courses:[
      {t:'간절곶 야간 경관전시',d:'드론라이트쇼·불꽃·비밀의 정원'},
      {t:'간절루 새벽 일출 관람',d:'한반도 최초 일출 · 소망우체통 체험'},
      {t:'진하해수욕장 산책',d:'간절곶에서 도보 연계'},
      {t:'서생포왜성 역사 탐방',d:'해안 역사문화 연계'},
    ],
    diff:['1,500대 드론라이트쇼 → 야간 콘텐츠 전국 최고 수준 하드웨어','간절루 신설로 낮·밤 콘텐츠 이중 구성 완성','동해안 유일 야간특화 → 경북 루트B와 연계 1박 확장 가능'],
    compare_tag:'travel 단독',
  },
  {
    num:'⑫', name:'제주 올레 ESG', color:'#c026d3', theme:'ESG·플로깅',
    target:'30-40대 여성 친구·가족', form:'2박3일 항공', price:'220,000원~',
    tags:['#올레길', '#플로깅', '#지속가능한여행'],
    image: '/regions/region12.jpg',
    n:12446, persona_base:'travel',
    travel:{'자연·경관':67.8,'휴식·회복':45.8,'미식':44.6,'로컬':22.5},
    extra_type:'travel', extra:{},
    latest:'제주알씨(JEJURC) 러닝크루 플로깅 정기 운영\n그랜드조선제주 올레길 플로깅 이벤트\n올레길 27개 코스 운영(2026.3 기준)\n제주 올레 민박 활용 공정여행 모델 지속',
    insight:'ESG를 전면 마케팅보다는 "느린 여행"과 "로컬 민박"의 감성으로 녹여낸 공정여행의 재해석',
    connection:'제주 서부(공정) - 남부(치유) - 동부(자연)를 순환하는 올레길 기반 ESG 스테이 루트',
    courses:[
      {t:'제주공항 독채 체크인',d:'항공 예약 대행+공항 픽업 포함'},
      {t:'올레 7코스 (단축 선택)',d:'17.6km 전체 or 분기점 선택'},
      {t:'마을 식당 한 끼',d:'고사리육개장·옥돔구이·흑돼지 — 관광지 아님'},
      {t:'귀환+플로깅 백 기념품',d:'ESG는 소소한 참여 옵션으로 설계'},
    ],
    diff:['travel: 자연경관 67.8%+휴식 45.8% — ESG(2% 미만)보다 압도적','마케팅 재정의: ESG 전면 철수 → \'느린 제주·비주류 섬\' 포지셔닝','계획형 22.5% → 항공+숙박+풀패키지로 설계 부담 제거'],
    compare_tag:'travel 단독',
  },
  {
    num:'⑬', name:'제주 비양도 공정여행', color:'#db2777', theme:'공정여행·생태교육',
    target:'30-40대 가족·커플', form:'1박2일 항공', price:'180,000원~',
    tags:['#비양도', '#생태관광', '#올리브섬'],
    image: '/regions/region13.jpg',
    n:12446, persona_base:'travel',
    travel:{'자연·경관':67.8,'휴식·회복':45.8,'미식':44.6,'로컬':22.5},
    extra_type:'travel', extra:{},
    latest:'KTO 지속가능한 해양관광 거점으로 올리브 섬 조성 프로젝트 본격 착수(2026.04)\n비양도에서 올리브잎 비누체험·플로깅 행사 진행, 향후 러닝대회, 미식 축제 등 다양한 행사 추진 계획\n기후 변화에 따른 해양생태계 훼손에 대응할 수 있는 소득 창출안으로 해양관광활성화 방안 모색',
    insight:'KTO 공식 협약과 올리브섬 프로젝트 등 구체적 사업 로드맵을 기반으로 한 "생태 특화 섬" 브랜딩',
    connection:'제주 본도(관광) - 비양도(생태체험) - 우도/추자도 연계 부속 섬 특화 여행 노선',
    courses:[
      {t:'한림항→비양도 여객선 15분',d:'협재해변 일몰 조망'},
      {t:'올리브잎 비누 만들기',d:'비양도 올리브 섬 테마 체험 · 2026 신규'},
      {t:'비양봉 트레킹+해녀 체험',d:'섬 생태교육 · 주민 가이드'},
      {t:'쓰담 플로깅+귀환',d:'KTO 공식 프로그램 · 플로깅 백 증정'},
    ],
    diff:['KTO 공식 협약+올리브섬 프로젝트 진행 중 — 현장 실행력 확보','입도객 28.8% YoY 증가 — 수요 확인된 콘텐츠','올리브잎 비누·미식축제 신규 콘텐츠 2026 출시 예정'],
    compare_tag:'travel 단독',
  },
];

const MarineDashboard = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showSokchoModal, setShowSokchoModal] = useState(false);
  const [showPrivateModal, setShowPrivateModal] = useState(false);

  const activeRegion = selectedId !== null ? REGIONS[selectedId] : null;

  // ── 차트 데이터 ──────────────────────────────────────
  const regionScaleData = REGIONS.filter((r, i) => [0, 1, 2, 3, 4, 5, 7, 8, 9, 11].includes(i)).map(r => ({
    name: r.name.split(' ')[0],
    value: r.n,
    color: r.color
  }));

  const ageData = [
    { name: '15-29세', value: 19352, color: '#0891b2' },
    { name: '30대', value: 22678, color: '#4f46e5' },
    { name: '40대', value: 29344, color: '#e11d48' },
    { name: '50대', value: 34843, color: '#059669' },
    { name: '60대', value: 31284, color: '#d97706' },
    { name: '70대+', value: 25198, color: '#7c3aed' },
  ];

  const foodData = [
    { name: '나물', 전북: 57.3, 전남: 49.9 },
    { name: '비빔밥', 전북: 19.2, 전남: 12.1 },
    { name: '회', 전북: 17.4, 전남: 17.7 },
    { name: '초밥', 전북: 13.5, 전남: 18.7 },
    { name: '한정식', 전북: 12.4, 전남: 12.3 },
    { name: '된장', 전북: 9.3, 전남: 6.1 },
    { name: '제철', 전북: 5.4, 전남: 7.6 },
  ];

  const sportsData = [
    { name: '산책', 인천: 40.6, 경북: 47.4, 부산: 37.6 },
    { name: '배드민턴', 인천: 12.1, 경북: 12.6, 부산: 12.6 },
    { name: '사우나', 인천: 5.5, 경북: 12.1, 부산: 10.5 },
    { name: '헬스', 인천: 7.5, 경북: 7.0, 부산: 9.2 },
    { name: '수영', 인천: 4.8, 경북: 3.7, 부산: 6.3 },
    { name: '낚시', 인천: 5.7, 경북: 1.3, 부산: 1.3 },
    { name: '둘레길', 인천: 1.6, 경북: 3.5, 부산: 1.4 },
  ];

  const renderBar = (label: string, pct: number, color: string, max = 100) => {
    const width = Math.min((pct / max) * 100, 100);
    return (
      <div key={label} className="space-y-1 mb-4">
        <div className="text-[11px] font-bold text-slate-500">
          <span>{label}</span>
        </div>
        <div className="relative h-7 w-full bg-white rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${width}%` }}
            className="h-full"
            style={{ backgroundImage: 'linear-gradient(to right, #60a5fa, #1d4ed8)' }}
          />
          <div className="absolute inset-0 flex items-center justify-end px-4 pointer-events-none">
            <span className="text-[12px] font-black text-blue-800">{pct}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 py-8 max-w-[1400px] mx-auto px-6 font-sans">
      {/* Hero Section: Round Table with Sea Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-white shadow-2xl mb-12"
        style={{ 
          background: 'linear-gradient(135deg, #0f172a 0%, #111827 30%, #164e63 100%)',
        }}
      >
        {/* Decorative Wave Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-teal-400/10 rounded-full -ml-40 -mb-40 blur-3xl" />
        
        {/* South Korea Map Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 60 }}
          animate={{ opacity: 0.20, scale: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 2, ease: "easeOut" }}
          className="absolute right-[-12%] top-[-30%] w-[55%] h-[140%] pointer-events-none mix-blend-screen hidden lg:block"
          style={{
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)',
          }}
        >
          <img 
            src="/images/korea_map.png" 
            alt="Korea Coastline Map" 
            className="w-full h-full object-contain filter brightness-125 contrast-200 grayscale"
          />
        </motion.div>

        <div className="relative z-10 space-y-10">
          <div className="space-y-5">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-black leading-tight tracking-tight font-serif"
              style={{ textShadow: '0 4px 12px rgba(0,0,0,0.25)' }}
            >
              페르소나 데이터 기반<br />
              <span className="text-teal-300">권역별 해양관광 특화 콘텐츠</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 text-[13px] font-bold text-sky-100/90"
            >
              <div className="flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
                <Database size={18} className="text-teal-300" />
                분석 데이터: Nemotron-Personas-Korea 100만 건 전수 분석
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
                <Target size={18} className="text-teal-300" />
                대상 권역: 전국 10개 해양관광 권역
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl space-y-5 border-l-4 border-teal-400/30 pl-8"
          >
            <div className="text-lg md:text-xl font-black text-white leading-snug">
              100만 명의 여행 DNA로 설계한 <span className="text-teal-300">권역별 해양관광 상품 기획</span>
            </div>
            <p className="text-sm md:text-base text-sky-50/90 leading-relaxed font-medium">
              한국인 100만 페르소나 데이터를 전수 분석해 10개 해양관광 권역의 실제 방문객 니즈와 기피 요인을 도출했습니다. <br className="hidden md:block" />
              숫자가 아닌 <span className="text-white">사람의 언어</span>로 시작한 콘텐츠 기획이 어떻게 달라지는지 확인해보세요.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Regional Analysis Section: Large Round Table */}
      <div className="bg-slate-100/70 rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-md space-y-10">
        <div className="flex flex-col md:flex-row md:items-end gap-3 px-2">
          <div className="flex items-center gap-3">
            <Map className="text-indigo-500" size={32} />
            <h2 className="text-3xl font-black text-slate-800 font-sans">권역별 관광상품 기획안</h2>
          </div>
          <p className="text-base text-slate-400 font-medium font-sans pb-1">
            카드를 클릭하면 페르소나 분석부터 추천 루트까지 한눈에 확인할 수 있습니다.
          </p>
        </div>

        <div className="region-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {REGIONS.map((r, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedId(selectedId === idx ? null : idx)}
              className={`cursor-pointer group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border-2 ${
                selectedId === idx ? 'border-primary' : 'border-transparent'
              }`}
            >
              {/* Image Section */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={r.image} 
                  alt={r.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                {/* Top Badge (Region) */}
                <div className="absolute top-4 left-4 bg-[#2563eb] text-white text-[11px] font-black px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md">
                  {r.name.split(' ')[0]}
                </div>
                
                {/* Top Right Pin Icon */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
                  <MapPin size={16} />
                </div>

                {/* Theme Badge (Floating) */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-800 shadow-sm">
                  <Anchor size={12} className="text-primary" />
                  {r.theme}
                </div>

                {/* Gangwon Special Overlay: Planning Document Open */}
                {idx === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="bg-red-600/70 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-black text-[13px] shadow-2xl border border-red-400/50 flex items-center gap-2">
                      <FileText size={16} /> 상품기획서 공개
                    </div>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-5 space-y-3 relative bg-white">
                <div className="space-y-1">
                  <h4 className="text-[17px] font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">
                    [{r.name.split(' ')[0]}] {r.tags.join(' ')}
                  </h4>
                  <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium">
                    <span>{r.target}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-black text-slate-900">{r.price}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{r.form}</span>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>

              {/* Selection Indicator */}
              {selectedId === idx && (
                <div className="absolute inset-0 border-4 border-primary rounded-3xl pointer-events-none z-30" />
              )}
            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail Panel Modal */}
      <AnimatePresence>
        {selectedId !== null && activeRegion && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-6xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/20"
            >
              {/* Close Button: Premium Glass Style */}
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-900/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-red-500 hover:border-red-400 hover:rotate-90 transition-all duration-300 z-[100] shadow-2xl group active:scale-90"
                title="닫기"
              >
                <X size={20} className="transition-transform group-hover:scale-110" />
              </button>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Image Header Section */}
                <div className="relative h-[320px] w-full overflow-hidden">
                  <img 
                    src={activeRegion.image} 
                    alt={activeRegion.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlays for Extreme Readability */}
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Header Content */}
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                      <div className="flex-1">
                        <div className="mb-6 md:mb-14">
                          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-sans tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] text-amber-400 break-keep">
                            {activeRegion.name}
                          </h3>
                        </div>
                        
                        <div className="border-l-2 border-blue-500/80 pl-6 py-1">
                          <div className="flex flex-col items-start gap-5">
                            <div className="flex items-center gap-3">
                              <div className="px-6 py-2.5 rounded-full text-[14px] font-black bg-blue-600/40 text-white border border-blue-400/30 backdrop-blur-md shadow-xl">
                                {activeRegion.theme}
                              </div>
                              <button 
                                onClick={() => {
                                  if (activeRegion.name.includes('속초')) {
                                    setShowSokchoModal(true);
                                  } else {
                                    setShowPrivateModal(true);
                                  }
                                }}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-black text-white cursor-pointer transition-all active:scale-95 shadow-2xl border backdrop-blur-sm group ${
                                  activeRegion.name.includes('속초') 
                                    ? 'bg-red-600/70 hover:bg-red-700/80 border-red-400/30' 
                                    : 'bg-blue-600 hover:bg-blue-700 border-blue-400/30'
                                }`}
                              >
                                <FileText size={18} className="group-hover:rotate-12 transition-transform" />
                                관광상품 기획서 보기
                              </button>
                            </div>
                            <p className="text-[18px] md:text-[19px] font-bold text-white/90 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                              {activeRegion.insight}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right pb-2 hidden md:block">
                        <div className="text-[12px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2 font-sans drop-shadow-md">Price Basis</div>
                        <div className="text-[16px] text-white/90 font-bold font-sans drop-shadow-md mb-1">{activeRegion.form}</div>
                        <div className="text-2xl md:text-3xl font-black font-sans text-amber-200/90 drop-shadow-lg">{activeRegion.price}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 -mt-4 relative z-10 bg-white rounded-t-2xl">
                  {/* Data Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Column 1: travel_persona */}
                  <div className="bg-slate-100 rounded-xl p-7 border border-slate-200/60 shadow-md">
                    <h5 className="text-[16px] font-black text-slate-950 uppercase tracking-normal mb-6 flex items-center gap-2 font-sans">
                      <Target size={18} className="text-blue-600" /> TRAVEL_PERSONA 니즈
                    </h5>
                    {Object.entries(activeRegion.travel).map(([key, val]) => renderBar(key, val as number, '#2563eb'))}
                  </div>

                  {/* Column 2: extra or latest */}
                  <div className="bg-slate-100 rounded-xl p-7 border border-slate-200/60 font-sans shadow-md">
                    {activeRegion.extra_type !== 'travel' && Object.keys(activeRegion.extra).length > 0 ? (
                      <>
                        <h5 className="text-[16px] font-black text-slate-950 uppercase tracking-normal mb-6 flex items-center gap-2 font-sans">
                          <TrendingUp size={18} className="text-blue-600" /> {activeRegion.extra_type.toUpperCase()}_PERSONA 접목
                        </h5>
                        {Object.entries(activeRegion.extra).slice(0, 5).map(([key, val]) => 
                          renderBar(key, val as number, '#2563eb')
                        )}
                      </>
                    ) : (
                      <>
                        <h5 className="text-[16px] font-black text-slate-950 uppercase tracking-normal mb-6 flex items-center gap-2 font-sans">
                          <Info size={18} className="text-blue-600" /> 최신 현장 자료
                        </h5>
                        <div className="space-y-3">
                          {activeRegion.latest.split('\n').filter(line => line.trim()).map((line, i) => (
                            <div key={i} className="flex gap-2.5 items-start">
                              <span className="text-slate-400 mt-[9px] shrink-0 text-[6px]">●</span>
                              <p className="text-[14px] text-slate-600 leading-relaxed font-bold">
                                {line.replace(/^[-\u2022\s]+/, '')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Column 3: Recommended Course */}
                  <div className="bg-slate-100 rounded-xl p-7 border border-slate-200/60 shadow-md">
                    <h5 className="text-[16px] font-black text-slate-950 uppercase tracking-normal mb-6 flex items-center gap-2 font-sans">
                      <Map size={18} className="text-blue-600" /> 추천 코스
                    </h5>
                    <div className="space-y-0">
                      {activeRegion.courses.map((c, i) => (
                        <div key={i} className="flex gap-4 pb-8 last:pb-0 relative">
                          {/* Vertical Connection Line */}
                          {i < activeRegion.courses.length - 1 && (
                            <div className="absolute left-3 top-7 bottom-0 w-[3px] bg-blue-400/40 -translate-x-1/2" />
                          )}
                          
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 mt-0.5 bg-blue-100 text-blue-700 border-2 border-blue-500/50 relative z-10">
                            {i + 1}
                          </div>
                          <div className="space-y-1">
                            <div className="text-[14.5px] font-black text-slate-800">{c.t}</div>
                            <div className="text-[13px] text-slate-500 leading-relaxed font-bold">{c.d}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Differentiation Points */}
                  <div className="bg-slate-100 rounded-xl p-8 border border-slate-200/60 shadow-md">
                    <h5 className="text-[16px] font-black text-slate-950 uppercase tracking-normal mb-6 flex items-center gap-2 font-sans">
                      <Award size={18} className="text-blue-600" /> 차별화 포인트 · 데이터 근거
                    </h5>
                    <div className="space-y-4">
                      {activeRegion.diff.map((d, i) => (
                        <div key={i} className="text-[14.5px] text-slate-700 font-bold leading-relaxed bg-white p-4 px-6 rounded-2xl border-l-[6px] border-blue-600 shadow-sm">
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* New: Connection Route Section */}
                  <div className="bg-slate-100 rounded-xl p-8 border border-slate-200/60 shadow-md">
                    <h5 className="text-[16px] font-black text-slate-950 uppercase tracking-normal mb-6 flex items-center gap-2 font-sans">
                      <Share2 size={18} className="text-blue-600" /> 권역 연계 루트 (Synergy)
                    </h5>
                    <div className="bg-white p-6 rounded-2xl border-l-[6px] border-blue-600 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <Map size={120} />
                      </div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100">
                          <MapPin size={24} className="text-blue-600" />
                        </div>
                        <span className="text-[17px] font-black text-slate-800">광역 관광 벨트 확장</span>
                      </div>
                      <p className="text-[15.5px] text-blue-900 leading-relaxed font-serif font-black italic">
                        "{activeRegion.connection}"
                      </p>
                      <div className="mt-8 flex items-center gap-2 text-[12px] font-black text-slate-300">
                        <LinkIcon size={14} /> 데이터 기반 권역 연계 최적화 경로
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* Private Access Modal */}
    <AnimatePresence>
      {showPrivateModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPrivateModal(false)}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[380px] bg-white rounded-3xl p-10 shadow-2xl text-center border border-slate-200"
          >
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <AlertTriangle size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 font-sans">기획서 열람 안내</h3>
            <div className="space-y-2 text-slate-600 font-medium leading-relaxed mb-10">
              <p>이 지역의 관광상품 기획 자료가<br/>필요하시면 Contact 페이지에서<br/>문의해 주시기 바랍니다.</p>
            </div>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[15px] shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                Contact 바로가기
              </button>
              <button 
                onClick={() => setShowPrivateModal(false)}
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-black text-[15px] transition-all"
              >
                취소
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

      {/* Data Insight Section: Large Round Table */}
      <div className="bg-slate-100/70 rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-md space-y-10">
        <div className="flex flex-col md:flex-row md:items-end gap-3 px-2">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-teal-600" size={32} />
            <h2 className="text-3xl font-black text-slate-800 font-sans">데이터 인사이트</h2>
          </div>
          <p className="text-base text-slate-400 font-medium font-sans pb-1">
            travel_persona 기반 · 100만 건 전수 분석 수치
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Size Chart */}
          <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
            <h3 className="text-[15px] font-black text-slate-950 uppercase tracking-normal mb-5 flex items-center gap-2 font-sans">
              <Database size={15} className="text-slate-400" /> 권역별 페르소나 규모 (n)
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionScaleData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#000' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={24}>
                    {regionScaleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.5} />
                    ))}
                    <LabelList 
                      dataKey="value" 
                      position="top" 
                      style={{ fill: '#000', fontSize: 10, fontWeight: 700 }}
                      formatter={(v: number) => `${(v/1000).toFixed(1)}K`} 
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. Age Distribution */}
          <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
            <h3 className="text-[15px] font-black text-slate-950 uppercase tracking-normal mb-5 flex items-center gap-2 font-sans">
              <Users size={15} className="text-slate-400" /> 전체 연령대 분포 (%)
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="value"
                    label={({ name, percent, x, y, cx }) => (
                      <text 
                        x={x} y={y} 
                        fill="#000" 
                        fontSize={10} 
                        fontWeight={700} 
                        textAnchor={x > cx ? 'start' : 'end'} 
                        dominantBaseline="central"
                      >
                        {`${name} ${(percent * 100).toFixed(1)}%`}
                      </text>
                    )}
                    stroke="#fff"
                    strokeWidth={1}
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.6} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" align="center" layout="horizontal" iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: '#64748b', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 3. Culinary Keywords */}
          <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
            <h3 className="text-[13px] font-black text-slate-950 uppercase tracking-widest mb-5 flex items-center gap-2 font-sans">
              <TrendingUp size={15} className="text-amber-500" /> 전북·전남 culinary 키워드 (%)
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={foodData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#000' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingBottom: '20px' }} />
                  <Bar dataKey="전북" fill="#d97706" fillOpacity={0.6} radius={[3, 3, 0, 0]} barSize={12}>
                    <LabelList dataKey="전북" position="top" style={{ fill: '#000', fontSize: 9, fontWeight: 700 }} formatter={(v: number) => `${v}%`} />
                  </Bar>
                  <Bar dataKey="전남" fill="#0d9488" fillOpacity={0.6} radius={[3, 3, 0, 0]} barSize={12}>
                    <LabelList dataKey="전남" position="top" style={{ fill: '#000', fontSize: 9, fontWeight: 700 }} formatter={(v: number) => `${v}%`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4. Sports Keywords */}
          <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
            <h3 className="text-[13px] font-black text-slate-950 uppercase tracking-widest mb-5 flex items-center gap-2 font-sans">
              <TrendingUp size={15} className="text-blue-500" /> 인천·경북·부산 sports 키워드 (%)
            </h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sportsData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#000' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: '11px', fontWeight: 700, paddingBottom: '20px' }} />
                  <Bar dataKey="인천" fill="#2563eb" fillOpacity={0.6} radius={[3, 3, 0, 0]} barSize={10}>
                    <LabelList dataKey="인천" position="top" style={{ fill: '#000', fontSize: 8, fontWeight: 700 }} formatter={(v: number) => `${v}%`} />
                  </Bar>
                  <Bar dataKey="경북" fill="#7c3aed" fillOpacity={0.6} radius={[3, 3, 0, 0]} barSize={10}>
                    <LabelList dataKey="경북" position="top" style={{ fill: '#000', fontSize: 8, fontWeight: 700 }} formatter={(v: number) => `${v}%`} />
                  </Bar>
                  <Bar dataKey="부산" fill="#dc2626" fillOpacity={0.6} radius={[3, 3, 0, 0]} barSize={10}>
                    <LabelList dataKey="부산" position="top" style={{ fill: '#000', fontSize: 8, fontWeight: 700 }} formatter={(v: number) => `${v}%`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Core Insight Section (Round Table Style) */}
      <div className="bg-slate-100/70 rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-md space-y-10 mt-12">
        <div className="flex flex-col md:flex-row md:items-end gap-3 px-2">
          <div className="flex items-center gap-3">
            <Lightbulb className="text-amber-500" size={32} />
            <h2 className="text-3xl font-black text-slate-800 font-sans">핵심 인사이트</h2>
          </div>
          <p className="text-base text-slate-400 font-medium font-sans pb-1">
            NEMOTRON-PERSONAS 기반 테마별 전수 데이터 분석 요약
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: '전북·전남 미식', d: '나물이 해산물을 압도', c: '전남(57.3%)·전북(49.9%) 모두 나물이 미식 1위. 해산물보다 나물 기반 한정식을 전면에 둔 제철 특화 포지셔닝 필요.', icon: Utensils, color: '#059669' },
            { t: '레저 3권역', d: '서핑·카약 없고 산책이 40% ↑', c: '인천·경북·부산 모두 산책 수요가 압도적 1위. 해양 익스트림보다 산책·둘레길·사우나 연계 체력회복형 루트 차별화.', icon: Compass, color: '#2563eb' },
            { t: '경북 권역', d: '60대+ 43%, 전국 최고령 권역', c: '역사·문화 70.5% 압도적. 시니어 타겟의 해파랑길 트레킹+경주 역사문화+영덕 울진 온천 조합이 최적 정합.', icon: History, color: '#4f46e5' },
            { t: '부산 전역', d: '미식+로컬이 레저보다 높음', c: '미식(41%)·로컬(24%)이 자연경관보다 높음. 야간 콘텐츠와 노포 미식 결합이 sports 활동보다 강력한 동기.', icon: Waves, color: '#e11d48' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <item.icon size={22} style={{ color: item.color }} />
                <div className="h-5 w-[2px]" style={{ backgroundColor: item.color }}></div>
                <div className="text-[17px] font-black text-slate-800">{item.t}</div>
              </div>
              <div className="text-[15.5px] font-bold mb-2" style={{ color: item.color }}>{item.d}</div>
              <p className="text-[12.5px] text-slate-500 leading-relaxed font-medium">{item.c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Regional Connection Route Section (Round Table Style) */}
      <div className="bg-slate-100/70 rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-md space-y-10 mt-12">
        <div className="flex flex-col md:flex-row md:items-end gap-3 px-2">
          <div className="flex items-center gap-3">
            <Share2 className="text-indigo-500" size={32} />
            <h2 className="text-3xl font-black text-slate-800 font-sans">권역 연계 루트</h2>
          </div>
          <p className="text-base text-slate-400 font-medium font-sans pb-1">
            페르소나 동시 언급 분석 기반 · 광역 관광 시너지 모델
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'A', t: '수도권 출발형', s: '강원 → 제주 / 20-30대 여성', list: ['서울·경기 출발', 'KTX 강릉역 → 속초 (런케이션 1박)', '양양국제공항 → 제주 항공', '비양도·올레 ESG 2박'], color: '#0ea5e9' },
            { id: 'B', t: '동남남부 드라이브', s: '경북 → 부산 → 경남 / 40-60대 부부', list: ['KTX 경주역 도착', '영덕 대게 + 해파랑 트레킹 1박', '부산 바다축제 · 기장 노포 1박', '남해·거제 어촌 체험 당일'], color: '#6366f1' },
            { id: 'C', t: '서해안 종단', s: '충남 → 전북 → 전남 / 50-60대 부부·가족', list: ['자가용 태안 안면도 펫 힐링 1박', '군산 나물·된장 슬로푸드 당일', '완도 해양치유 + 전복 1박', '여수 제철 해산물 후 귀환'], color: '#10b981' }
          ].map((route, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-5">
                <div className="px-3 py-1 rounded-full text-[11px] font-black uppercase" style={{ backgroundColor: `${route.color}15`, color: route.color }}>Route {route.id}</div>
                <MapPin size={18} style={{ color: route.color }} />
              </div>
              <h4 className="text-[20px] font-black text-slate-900 mb-1">{route.t}</h4>
              <p className="text-[12px] font-bold opacity-70 mb-8" style={{ color: route.color }}>{route.s}</p>
              
              <div className="space-y-5">
                {route.list.map((step, si) => (
                  <div key={si} className="flex items-start gap-4 relative">
                    {si < route.list.length - 1 && (
                      <div className="absolute left-[6px] top-5 w-[2px] h-7" style={{ backgroundColor: route.color, opacity: 0.3 }}></div>
                    )}
                    <div className="w-[15px] h-[15px] rounded-full border-[3px] mt-1 shrink-0 bg-white" style={{ borderColor: route.color }}></div>
                    <span className="text-[14px] font-bold text-slate-600 leading-tight">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compare Table (Round Table Style) */}
      <div className="bg-slate-100/70 rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-md space-y-10 mt-12">
        <div className="flex flex-col md:flex-row md:items-end gap-3 px-2">
          <div className="flex items-center gap-3">
            <LayoutGrid className="text-slate-500" size={32} />
            <h2 className="text-3xl font-black text-slate-800 font-sans">상품 한눈에 보기</h2>
          </div>
          <p className="text-base text-slate-400 font-medium font-sans pb-1">
            권역별 핵심 타겟 및 상품 방향성 요약 비교
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px] table-fixed">
            <thead>
              <tr className="bg-white">
                <th className="w-[18%] p-5 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 text-center">권역</th>
                <th className="w-[14%] p-5 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 text-center">테마</th>
                <th className="w-[15%] p-5 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 text-center">데이터 근거</th>
                <th className="w-[15%] p-5 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 text-center">핵심 타깃</th>
                <th className="w-[25%] p-5 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 text-center">상품 방향</th>
                <th className="w-[13%] p-5 text-[12px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 text-center">가격</th>
              </tr>
            </thead>
            <tbody>
              {REGIONS.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 border-b border-slate-200 font-sans">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black"
                        style={{ backgroundColor: `${r.color}20`, color: r.color }}>
                        {r.num}
                      </span>
                      <span className="text-[13px] font-extrabold" style={{ color: r.color }}>{r.name}</span>
                    </div>
                  </td>
                  <td className="p-5 border-b border-slate-200 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold" 
                      style={{ backgroundColor: `${r.color}15`, color: r.color }}>
                      {r.theme}
                    </span>
                  </td>
                  <td className="p-5 border-b border-slate-200 font-sans">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded text-[9px] font-bold uppercase tracking-tight">
                      {r.compare_tag}
                    </span>
                  </td>
                  <td className="p-5 border-b border-slate-200 font-sans font-bold text-[13px] text-slate-800 max-w-[130px]">
                    <div className="leading-tight whitespace-normal">{r.target}</div>
                  </td>
                  <td className="p-5 border-b border-slate-200 max-w-[280px] font-sans">
                    <div className="text-[13px] text-slate-800 leading-relaxed font-medium whitespace-normal">{r.diff[0]}</div>
                  </td>
                  <td className="p-5 border-b border-slate-200 text-right font-sans font-medium text-[13px] text-slate-800">
                    {r.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      
      <div className="text-center pt-8 border-t border-slate-100 font-sans">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Maritime Tourism Insight Lab</p>
        <p className="text-[10px] text-slate-300 font-medium">Data Analyzed by Nemotron-Personas-Korea-1M · Powered by NVIDIA</p>
      </div>

      {/* Sokcho Intro Modal */}
      <AnimatePresence>
        {showSokchoModal && (
          <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSokchoModal(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/20"
            >
              {/* Modal Header */}
              <div className="absolute top-6 right-6 z-10">
                <button 
                  onClick={() => setShowSokchoModal(false)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all active:scale-90"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Iframe Content */}
              <div className="flex-1 w-full h-full bg-[#F5F0E8]">
                <iframe 
                  src="/docs/sokcho-intro.html" 
                  className="w-full h-full border-none"
                  title="속초 아바이마을 소개서"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarineDashboard;
