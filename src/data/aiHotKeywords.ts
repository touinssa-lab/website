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
  {
    "id": "1",
    "section": "여행",
    "rank": 1,
    "keyword": "여행 스케치 여행사",
    "interest": 93,
    "change": "+196%"
  },
  {
    "id": "2",
    "section": "여행",
    "rank": 2,
    "keyword": "여행 을 떠나요",
    "interest": 93,
    "change": "+175%"
  },
  {
    "id": "3",
    "section": "여행",
    "rank": 3,
    "keyword": "아시아나",
    "interest": 92,
    "change": "+151%"
  },
  {
    "id": "4",
    "section": "여행",
    "rank": 4,
    "keyword": "카자흐스탄 여행",
    "interest": 90,
    "change": "+162%"
  },
  {
    "id": "5",
    "section": "여행",
    "rank": 5,
    "keyword": "비행기 예약",
    "interest": 87,
    "change": "+273%"
  },
  {
    "id": "6",
    "section": "여행",
    "rank": 6,
    "keyword": "가마쿠라 여행",
    "interest": 85,
    "change": "+36%"
  },
  {
    "id": "7",
    "section": "여행",
    "rank": 7,
    "keyword": "블라디보스톡 여행",
    "interest": 81,
    "change": "+16%"
  },
  {
    "id": "8",
    "section": "여행",
    "rank": 8,
    "keyword": "수학 여행 코디",
    "interest": 81,
    "change": "+44%"
  },
  {
    "id": "9",
    "section": "여행",
    "rank": 9,
    "keyword": "여행 에 미치다",
    "interest": 77,
    "change": "+38%"
  },
  {
    "id": "10",
    "section": "여행",
    "rank": 10,
    "keyword": "신정호",
    "interest": 75,
    "change": "+16%"
  },
  {
    "id": "11",
    "section": "여행",
    "rank": 11,
    "keyword": "여행 톡톡",
    "interest": 73,
    "change": "+19%"
  },
  {
    "id": "12",
    "section": "여행",
    "rank": 12,
    "keyword": "은하수 를 여행 하는 히치하이커 를 위한 안내서",
    "interest": 72,
    "change": "+38%"
  },
  {
    "id": "13",
    "section": "여행",
    "rank": 13,
    "keyword": "두바이 여행",
    "interest": 69,
    "change": "+16%"
  },
  {
    "id": "14",
    "section": "여행",
    "rank": 14,
    "keyword": "오사카 여행 코스",
    "interest": 70,
    "change": "+19%"
  },
  {
    "id": "15",
    "section": "여행",
    "rank": 15,
    "keyword": "하와이",
    "interest": 68,
    "change": "+33%"
  },
  {
    "id": "16",
    "section": "여행",
    "rank": 16,
    "keyword": "네이버 항공권",
    "interest": 64,
    "change": "+8%"
  },
  {
    "id": "17",
    "section": "여행",
    "rank": 17,
    "keyword": "크루즈 여행 비용",
    "interest": 63,
    "change": "+34%"
  },
  {
    "id": "18",
    "section": "여행",
    "rank": 18,
    "keyword": "기타큐슈 여행",
    "interest": 60,
    "change": "+41%"
  },
  {
    "id": "19",
    "section": "여행",
    "rank": 19,
    "keyword": "제주도 여행 코스",
    "interest": 59,
    "change": "+22%"
  },
  {
    "id": "20",
    "section": "여행",
    "rank": 20,
    "keyword": "튀르 키예 여행",
    "interest": 57,
    "change": "+37%"
  },
  {
    "id": "21",
    "section": "여행",
    "rank": 21,
    "keyword": "소녀 종말 여행",
    "interest": 54,
    "change": "+31%"
  },
  {
    "id": "22",
    "section": "여행",
    "rank": 22,
    "keyword": "skyscanner",
    "interest": 52,
    "change": "+32%"
  },
  {
    "id": "23",
    "section": "여행",
    "rank": 23,
    "keyword": "후쿠오카 여행 코스",
    "interest": 51,
    "change": "+8%"
  },
  {
    "id": "24",
    "section": "여행",
    "rank": 24,
    "keyword": "스위스",
    "interest": 50,
    "change": "+29%"
  },
  {
    "id": "25",
    "section": "여행",
    "rank": 25,
    "keyword": "여행 경보",
    "interest": 45,
    "change": "+30%"
  },
  {
    "id": "26",
    "section": "여행",
    "rank": 26,
    "keyword": "히로시마 여행",
    "interest": 44,
    "change": "+39%"
  },
  {
    "id": "27",
    "section": "여행",
    "rank": 27,
    "keyword": "쿠알라 룸푸르 여행",
    "interest": 43,
    "change": "+20%"
  },
  {
    "id": "28",
    "section": "여행",
    "rank": 28,
    "keyword": "마쓰야마 여행",
    "interest": 39,
    "change": "+27%"
  },
  {
    "id": "29",
    "section": "여행",
    "rank": 29,
    "keyword": "경주 여행",
    "interest": 38,
    "change": "+23%"
  },
  {
    "id": "30",
    "section": "여행",
    "rank": 30,
    "keyword": "스페인",
    "interest": 39,
    "change": "+45%"
  },
  {
    "id": "31",
    "section": "여행",
    "rank": 31,
    "keyword": "스위스 여행",
    "interest": 34,
    "change": "+16%"
  },
  {
    "id": "32",
    "section": "여행",
    "rank": 32,
    "keyword": "여행 가사",
    "interest": 32,
    "change": "+35%"
  },
  {
    "id": "33",
    "section": "여행",
    "rank": 33,
    "keyword": "이스타 항공",
    "interest": 30,
    "change": "+44%"
  },
  {
    "id": "34",
    "section": "여행",
    "rank": 34,
    "keyword": "제주도 여행",
    "interest": 27,
    "change": "+22%"
  },
  {
    "id": "35",
    "section": "여행",
    "rank": 35,
    "keyword": "바이크 여행 갤",
    "interest": 27,
    "change": "+36%"
  },
  {
    "id": "36",
    "section": "여행",
    "rank": 36,
    "keyword": "발리 여행",
    "interest": 26,
    "change": "+24%"
  },
  {
    "id": "37",
    "section": "여행",
    "rank": 37,
    "keyword": "스페인 여행",
    "interest": 23,
    "change": "+20%"
  },
  {
    "id": "38",
    "section": "여행",
    "rank": 38,
    "keyword": "여행 영어 로",
    "interest": 21,
    "change": "+45%"
  },
  {
    "id": "39",
    "section": "여행",
    "rank": 39,
    "keyword": "여행 과 지도",
    "interest": 20,
    "change": "+35%"
  },
  {
    "id": "40",
    "section": "여행",
    "rank": 40,
    "keyword": "마녀 의 여행",
    "interest": 20,
    "change": "+23%"
  },
  {
    "id": "41",
    "section": "여행",
    "rank": 41,
    "keyword": "스카이 스캐너",
    "interest": 20,
    "change": "+11%"
  },
  {
    "id": "42",
    "section": "여행",
    "rank": 42,
    "keyword": "오사카",
    "interest": 20,
    "change": "+44%"
  },
  {
    "id": "43",
    "section": "여행",
    "rank": 43,
    "keyword": "말레이시아 여행",
    "interest": 20,
    "change": "+34%"
  },
  {
    "id": "44",
    "section": "여행",
    "rank": 44,
    "keyword": "여행 가는 달",
    "interest": 20,
    "change": "+8%"
  },
  {
    "id": "45",
    "section": "여행",
    "rank": 45,
    "keyword": "오키나와 여행",
    "interest": 20,
    "change": "+23%"
  },
  {
    "id": "46",
    "section": "여행",
    "rank": 46,
    "keyword": "대만 여행",
    "interest": 20,
    "change": "+39%"
  },
  {
    "id": "47",
    "section": "여행",
    "rank": 47,
    "keyword": "거제도 여행",
    "interest": 20,
    "change": "+27%"
  },
  {
    "id": "48",
    "section": "여행",
    "rank": 48,
    "keyword": "혼자 여행",
    "interest": 20,
    "change": "+19%"
  },
  {
    "id": "49",
    "section": "여행",
    "rank": 49,
    "keyword": "단양 여행",
    "interest": 20,
    "change": "+29%"
  },
  {
    "id": "50",
    "section": "여행",
    "rank": 50,
    "keyword": "강원도 여행",
    "interest": 20,
    "change": "+34%"
  },
  {
    "id": "51",
    "section": "관광",
    "rank": 1,
    "keyword": "대전 관광 공사",
    "interest": 97,
    "change": "+271%"
  },
  {
    "id": "52",
    "section": "관광",
    "rank": 2,
    "keyword": "서울 관광 고",
    "interest": 92,
    "change": "+244%"
  },
  {
    "id": "53",
    "section": "관광",
    "rank": 3,
    "keyword": "강릉 관광 개발 공사",
    "interest": 92,
    "change": "+238%"
  },
  {
    "id": "54",
    "section": "관광",
    "rank": 4,
    "keyword": "경기 관광 플랫폼",
    "interest": 89,
    "change": "+158%"
  },
  {
    "id": "55",
    "section": "관광",
    "rank": 5,
    "keyword": "한국 관광 공사 인턴",
    "interest": 89,
    "change": "+132%"
  },
  {
    "id": "56",
    "section": "관광",
    "rank": 6,
    "keyword": "한국 관광 고등학교",
    "interest": 86,
    "change": "+21%"
  },
  {
    "id": "57",
    "section": "관광",
    "rank": 7,
    "keyword": "한국 관광 공사 공모전",
    "interest": 84,
    "change": "+34%"
  },
  {
    "id": "58",
    "section": "관광",
    "rank": 8,
    "keyword": "제주 관광 대학교",
    "interest": 83,
    "change": "+43%"
  },
  {
    "id": "59",
    "section": "관광",
    "rank": 9,
    "keyword": "부산 관광 공사",
    "interest": 80,
    "change": "+6%"
  },
  {
    "id": "60",
    "section": "관광",
    "rank": 10,
    "keyword": "관광 진흥법 시행령",
    "interest": 77,
    "change": "+12%"
  },
  {
    "id": "61",
    "section": "관광",
    "rank": 11,
    "keyword": "관광 데이터 공모전",
    "interest": 76,
    "change": "+45%"
  },
  {
    "id": "62",
    "section": "관광",
    "rank": 12,
    "keyword": "도쿄",
    "interest": 71,
    "change": "+38%"
  },
  {
    "id": "63",
    "section": "관광",
    "rank": 13,
    "keyword": "국민 관광 상품권",
    "interest": 69,
    "change": "+29%"
  },
  {
    "id": "64",
    "section": "관광",
    "rank": 14,
    "keyword": "대전 관광",
    "interest": 71,
    "change": "+36%"
  },
  {
    "id": "65",
    "section": "관광",
    "rank": 15,
    "keyword": "관광 지식 정보 시스템",
    "interest": 69,
    "change": "+13%"
  },
  {
    "id": "66",
    "section": "관광",
    "rank": 16,
    "keyword": "제주 관광 협회",
    "interest": 64,
    "change": "+19%"
  },
  {
    "id": "67",
    "section": "관광",
    "rank": 17,
    "keyword": "한국 문화 관광 연구원",
    "interest": 62,
    "change": "+45%"
  },
  {
    "id": "68",
    "section": "관광",
    "rank": 18,
    "keyword": "롯데 관광 개발",
    "interest": 61,
    "change": "+5%"
  },
  {
    "id": "69",
    "section": "관광",
    "rank": 19,
    "keyword": "한국 관광 학회",
    "interest": 57,
    "change": "+41%"
  },
  {
    "id": "70",
    "section": "관광",
    "rank": 20,
    "keyword": "교토 관광",
    "interest": 55,
    "change": "+21%"
  },
  {
    "id": "71",
    "section": "관광",
    "rank": 21,
    "keyword": "코레 일 관광 개발",
    "interest": 55,
    "change": "+41%"
  },
  {
    "id": "72",
    "section": "관광",
    "rank": 22,
    "keyword": "인천 관광 공사",
    "interest": 54,
    "change": "+37%"
  },
  {
    "id": "73",
    "section": "관광",
    "rank": 23,
    "keyword": "속초 관광",
    "interest": 52,
    "change": "+18%"
  },
  {
    "id": "74",
    "section": "관광",
    "rank": 24,
    "keyword": "도쿄 관광",
    "interest": 51,
    "change": "+33%"
  },
  {
    "id": "75",
    "section": "관광",
    "rank": 25,
    "keyword": "관광 진흥법",
    "interest": 49,
    "change": "+16%"
  },
  {
    "id": "76",
    "section": "관광",
    "rank": 26,
    "keyword": "한국 관광 공사 채용",
    "interest": 44,
    "change": "+9%"
  },
  {
    "id": "77",
    "section": "관광",
    "rank": 27,
    "keyword": "관광 데이터 랩",
    "interest": 45,
    "change": "+17%"
  },
  {
    "id": "78",
    "section": "관광",
    "rank": 28,
    "keyword": "서울 관광 재단",
    "interest": 42,
    "change": "+21%"
  },
  {
    "id": "79",
    "section": "관광",
    "rank": 29,
    "keyword": "관광 공사",
    "interest": 39,
    "change": "+32%"
  },
  {
    "id": "80",
    "section": "관광",
    "rank": 30,
    "keyword": "코레 일 관광 개발 채용",
    "interest": 38,
    "change": "+14%"
  },
  {
    "id": "81",
    "section": "관광",
    "rank": 31,
    "keyword": "한국 관광 공사",
    "interest": 34,
    "change": "+27%"
  },
  {
    "id": "82",
    "section": "관광",
    "rank": 32,
    "keyword": "롯데 관광 개발 주가",
    "interest": 34,
    "change": "+8%"
  },
  {
    "id": "83",
    "section": "관광",
    "rank": 33,
    "keyword": "일본 관광",
    "interest": 32,
    "change": "+36%"
  },
  {
    "id": "84",
    "section": "관광",
    "rank": 34,
    "keyword": "서울 관광",
    "interest": 30,
    "change": "+23%"
  },
  {
    "id": "85",
    "section": "관광",
    "rank": 35,
    "keyword": "롯데 관광",
    "interest": 25,
    "change": "+39%"
  },
  {
    "id": "86",
    "section": "관광",
    "rank": 36,
    "keyword": "경기 관광 공사",
    "interest": 25,
    "change": "+6%"
  },
  {
    "id": "87",
    "section": "관광",
    "rank": 37,
    "keyword": "한국 관광 대학교",
    "interest": 21,
    "change": "+25%"
  },
  {
    "id": "88",
    "section": "관광",
    "rank": 38,
    "keyword": "한진 관광",
    "interest": 20,
    "change": "+28%"
  },
  {
    "id": "89",
    "section": "관광",
    "rank": 39,
    "keyword": "한국 관광 데이터 랩",
    "interest": 20,
    "change": "+35%"
  },
  {
    "id": "90",
    "section": "관광",
    "rank": 40,
    "keyword": "부산 관광",
    "interest": 20,
    "change": "+16%"
  },
  {
    "id": "91",
    "section": "관광",
    "rank": 41,
    "keyword": "오사카 관광",
    "interest": 20,
    "change": "+12%"
  },
  {
    "id": "92",
    "section": "관광",
    "rank": 42,
    "keyword": "관광 버스",
    "interest": 20,
    "change": "+40%"
  },
  {
    "id": "93",
    "section": "관광",
    "rank": 43,
    "keyword": "광주 관광",
    "interest": 20,
    "change": "+45%"
  },
  {
    "id": "94",
    "section": "관광",
    "rank": 44,
    "keyword": "묻지마 관광",
    "interest": 20,
    "change": "+36%"
  },
  {
    "id": "95",
    "section": "관광",
    "rank": 45,
    "keyword": "관광 통역 안내 사",
    "interest": 20,
    "change": "+28%"
  },
  {
    "id": "96",
    "section": "관광",
    "rank": 46,
    "keyword": "전북 문화 관광 재단",
    "interest": 20,
    "change": "+22%"
  },
  {
    "id": "97",
    "section": "관광",
    "rank": 47,
    "keyword": "관광 데이터 활용 공모전",
    "interest": 20,
    "change": "+10%"
  },
  {
    "id": "98",
    "section": "관광",
    "rank": 48,
    "keyword": "제주 관광 공사",
    "interest": 20,
    "change": "+38%"
  },
  {
    "id": "99",
    "section": "관광",
    "rank": 49,
    "keyword": "후쿠오카 관광",
    "interest": 20,
    "change": "+43%"
  },
  {
    "id": "100",
    "section": "관광",
    "rank": 50,
    "keyword": "마 관광 살포",
    "interest": 20,
    "change": "+16%"
  },
  {
    "id": "101",
    "section": "축제",
    "rank": 1,
    "keyword": "하이키",
    "interest": 96,
    "change": "+315%"
  },
  {
    "id": "102",
    "section": "축제",
    "rank": 2,
    "keyword": "원대 축제",
    "interest": 93,
    "change": "+216%"
  },
  {
    "id": "103",
    "section": "축제",
    "rank": 3,
    "keyword": "고창 청 보리밭 축제",
    "interest": 91,
    "change": "+287%"
  },
  {
    "id": "104",
    "section": "축제",
    "rank": 4,
    "keyword": "남서울대 축제",
    "interest": 90,
    "change": "+336%"
  },
  {
    "id": "105",
    "section": "축제",
    "rank": 5,
    "keyword": "한세대 축제",
    "interest": 87,
    "change": "+204%"
  },
  {
    "id": "106",
    "section": "축제",
    "rank": 6,
    "keyword": "건대 축제 라인업",
    "interest": 84,
    "change": "+12%"
  },
  {
    "id": "107",
    "section": "축제",
    "rank": 7,
    "keyword": "계명대 축제",
    "interest": 82,
    "change": "+14%"
  },
  {
    "id": "108",
    "section": "축제",
    "rank": 8,
    "keyword": "상지대 축제",
    "interest": 79,
    "change": "+7%"
  },
  {
    "id": "109",
    "section": "축제",
    "rank": 9,
    "keyword": "곡성 세계 장미 축제",
    "interest": 81,
    "change": "+16%"
  },
  {
    "id": "110",
    "section": "축제",
    "rank": 10,
    "keyword": "한라대 축제",
    "interest": 76,
    "change": "+26%"
  },
  {
    "id": "111",
    "section": "축제",
    "rank": 11,
    "keyword": "세명대 축제",
    "interest": 77,
    "change": "+27%"
  },
  {
    "id": "112",
    "section": "축제",
    "rank": 12,
    "keyword": "뱃놀이 축제",
    "interest": 73,
    "change": "+27%"
  },
  {
    "id": "113",
    "section": "축제",
    "rank": 13,
    "keyword": "김천 김밥 축제",
    "interest": 71,
    "change": "+35%"
  },
  {
    "id": "114",
    "section": "축제",
    "rank": 14,
    "keyword": "건대 축제",
    "interest": 67,
    "change": "+38%"
  },
  {
    "id": "115",
    "section": "축제",
    "rank": 15,
    "keyword": "김밥 축제",
    "interest": 65,
    "change": "+44%"
  },
  {
    "id": "116",
    "section": "축제",
    "rank": 16,
    "keyword": "대동제",
    "interest": 65,
    "change": "+35%"
  },
  {
    "id": "117",
    "section": "축제",
    "rank": 17,
    "keyword": "영남대 축제 라인업",
    "interest": 62,
    "change": "+32%"
  },
  {
    "id": "118",
    "section": "축제",
    "rank": 18,
    "keyword": "홍대 축제 라인업",
    "interest": 62,
    "change": "+15%"
  },
  {
    "id": "119",
    "section": "축제",
    "rank": 19,
    "keyword": "가천 대 축제",
    "interest": 58,
    "change": "+12%"
  },
  {
    "id": "120",
    "section": "축제",
    "rank": 20,
    "keyword": "센텀 맥주 축제",
    "interest": 58,
    "change": "+22%"
  },
  {
    "id": "121",
    "section": "축제",
    "rank": 21,
    "keyword": "서울대 축제 라인업",
    "interest": 53,
    "change": "+10%"
  },
  {
    "id": "122",
    "section": "축제",
    "rank": 22,
    "keyword": "대학 축제 일정",
    "interest": 53,
    "change": "+26%"
  },
  {
    "id": "123",
    "section": "축제",
    "rank": 23,
    "keyword": "삿포로 맥주 축제",
    "interest": 51,
    "change": "+9%"
  },
  {
    "id": "124",
    "section": "축제",
    "rank": 24,
    "keyword": "부산대 축제",
    "interest": 47,
    "change": "+9%"
  },
  {
    "id": "125",
    "section": "축제",
    "rank": 25,
    "keyword": "최예나",
    "interest": 48,
    "change": "+25%"
  },
  {
    "id": "126",
    "section": "축제",
    "rank": 26,
    "keyword": "강남대 축제",
    "interest": 43,
    "change": "+23%"
  },
  {
    "id": "127",
    "section": "축제",
    "rank": 27,
    "keyword": "원광대",
    "interest": 44,
    "change": "+34%"
  },
  {
    "id": "128",
    "section": "축제",
    "rank": 28,
    "keyword": "라 토마 티나",
    "interest": 41,
    "change": "+39%"
  },
  {
    "id": "129",
    "section": "축제",
    "rank": 29,
    "keyword": "아주대 축제",
    "interest": 38,
    "change": "+39%"
  },
  {
    "id": "130",
    "section": "축제",
    "rank": 30,
    "keyword": "원광대 축제",
    "interest": 37,
    "change": "+16%"
  },
  {
    "id": "131",
    "section": "축제",
    "rank": 31,
    "keyword": "서울대 축제",
    "interest": 37,
    "change": "+37%"
  },
  {
    "id": "132",
    "section": "축제",
    "rank": 32,
    "keyword": "홀리 축제",
    "interest": 33,
    "change": "+41%"
  },
  {
    "id": "133",
    "section": "축제",
    "rank": 33,
    "keyword": "세종대",
    "interest": 29,
    "change": "+6%"
  },
  {
    "id": "134",
    "section": "축제",
    "rank": 34,
    "keyword": "홍대 축제",
    "interest": 29,
    "change": "+44%"
  },
  {
    "id": "135",
    "section": "축제",
    "rank": 35,
    "keyword": "경희대 축제",
    "interest": 26,
    "change": "+17%"
  },
  {
    "id": "136",
    "section": "축제",
    "rank": 36,
    "keyword": "순천향대 축제",
    "interest": 25,
    "change": "+18%"
  },
  {
    "id": "137",
    "section": "축제",
    "rank": 37,
    "keyword": "서경대 축제",
    "interest": 23,
    "change": "+21%"
  },
  {
    "id": "138",
    "section": "축제",
    "rank": 38,
    "keyword": "국민대 축제 라인업",
    "interest": 22,
    "change": "+44%"
  },
  {
    "id": "139",
    "section": "축제",
    "rank": 39,
    "keyword": "세종대 축제",
    "interest": 20,
    "change": "+14%"
  },
  {
    "id": "140",
    "section": "축제",
    "rank": 40,
    "keyword": "곡성 장미 축제 2026",
    "interest": 20,
    "change": "+28%"
  },
  {
    "id": "141",
    "section": "축제",
    "rank": 41,
    "keyword": "연세대 축제",
    "interest": 20,
    "change": "+15%"
  },
  {
    "id": "142",
    "section": "축제",
    "rank": 42,
    "keyword": "프로 미스 나인 대학 축제",
    "interest": 20,
    "change": "+36%"
  },
  {
    "id": "143",
    "section": "축제",
    "rank": 43,
    "keyword": "동아대 축제",
    "interest": 20,
    "change": "+32%"
  },
  {
    "id": "144",
    "section": "축제",
    "rank": 44,
    "keyword": "중랑천 장미 축제",
    "interest": 20,
    "change": "+24%"
  },
  {
    "id": "145",
    "section": "축제",
    "rank": 45,
    "keyword": "대학 축제",
    "interest": 20,
    "change": "+11%"
  },
  {
    "id": "146",
    "section": "축제",
    "rank": 46,
    "keyword": "건국대 축제 라인업",
    "interest": 20,
    "change": "+44%"
  },
  {
    "id": "147",
    "section": "축제",
    "rank": 47,
    "keyword": "동의대 축제",
    "interest": 20,
    "change": "+26%"
  },
  {
    "id": "148",
    "section": "축제",
    "rank": 48,
    "keyword": "대구대 축제 라인업",
    "interest": 20,
    "change": "+30%"
  },
  {
    "id": "149",
    "section": "축제",
    "rank": 49,
    "keyword": "화성 뱃놀이 축제",
    "interest": 20,
    "change": "+41%"
  },
  {
    "id": "150",
    "section": "축제",
    "rank": 50,
    "keyword": "대구대 축제",
    "interest": 20,
    "change": "+39%"
  },
  {
    "id": "151",
    "section": "행사",
    "rank": 1,
    "keyword": "계약 갱신 청구권 행사 방법",
    "interest": 97,
    "change": "+291%"
  },
  {
    "id": "152",
    "section": "행사",
    "rank": 2,
    "keyword": "명조",
    "interest": 95,
    "change": "+179%"
  },
  {
    "id": "153",
    "section": "행사",
    "rank": 3,
    "keyword": "이마트 할인 행사",
    "interest": 90,
    "change": "+297%"
  },
  {
    "id": "154",
    "section": "행사",
    "rank": 4,
    "keyword": "유치권 행사",
    "interest": 91,
    "change": "+181%"
  },
  {
    "id": "155",
    "section": "행사",
    "rank": 5,
    "keyword": "연등 행사",
    "interest": 88,
    "change": "+116%"
  },
  {
    "id": "156",
    "section": "행사",
    "rank": 6,
    "keyword": "gs25 행사",
    "interest": 85,
    "change": "+36%"
  },
  {
    "id": "157",
    "section": "행사",
    "rank": 7,
    "keyword": "버거 킹",
    "interest": 84,
    "change": "+8%"
  },
  {
    "id": "158",
    "section": "행사",
    "rank": 8,
    "keyword": "연례 행사",
    "interest": 82,
    "change": "+12%"
  },
  {
    "id": "159",
    "section": "행사",
    "rank": 9,
    "keyword": "게임 행사",
    "interest": 80,
    "change": "+30%"
  },
  {
    "id": "160",
    "section": "행사",
    "rank": 10,
    "keyword": "킨텍스 행사",
    "interest": 75,
    "change": "+28%"
  },
  {
    "id": "161",
    "section": "행사",
    "rank": 11,
    "keyword": "서울 행사",
    "interest": 77,
    "change": "+24%"
  },
  {
    "id": "162",
    "section": "행사",
    "rank": 12,
    "keyword": "코엑스 행사",
    "interest": 73,
    "change": "+29%"
  },
  {
    "id": "163",
    "section": "행사",
    "rank": 13,
    "keyword": "코엑스",
    "interest": 71,
    "change": "+42%"
  },
  {
    "id": "164",
    "section": "행사",
    "rank": 14,
    "keyword": "스승 의 날 행사",
    "interest": 67,
    "change": "+22%"
  },
  {
    "id": "165",
    "section": "행사",
    "rank": 15,
    "keyword": "서브웨이 5 월 행사",
    "interest": 69,
    "change": "+19%"
  },
  {
    "id": "166",
    "section": "행사",
    "rank": 16,
    "keyword": "버거 킹 행사",
    "interest": 67,
    "change": "+31%"
  },
  {
    "id": "167",
    "section": "행사",
    "rank": 17,
    "keyword": "학교 행사",
    "interest": 62,
    "change": "+44%"
  },
  {
    "id": "168",
    "section": "행사",
    "rank": 18,
    "keyword": "부처님 오신 날 행사",
    "interest": 60,
    "change": "+32%"
  },
  {
    "id": "169",
    "section": "행사",
    "rank": 19,
    "keyword": "행사 영어 로",
    "interest": 57,
    "change": "+25%"
  },
  {
    "id": "170",
    "section": "행사",
    "rank": 20,
    "keyword": "6 월 행사",
    "interest": 55,
    "change": "+15%"
  },
  {
    "id": "171",
    "section": "행사",
    "rank": 21,
    "keyword": "부산 행사",
    "interest": 54,
    "change": "+44%"
  },
  {
    "id": "172",
    "section": "행사",
    "rank": 22,
    "keyword": "포켓몬 행사",
    "interest": 53,
    "change": "+26%"
  },
  {
    "id": "173",
    "section": "행사",
    "rank": 23,
    "keyword": "세븐 일레븐 행사",
    "interest": 50,
    "change": "+13%"
  },
  {
    "id": "174",
    "section": "행사",
    "rank": 24,
    "keyword": "편의점 행사",
    "interest": 48,
    "change": "+5%"
  },
  {
    "id": "175",
    "section": "행사",
    "rank": 25,
    "keyword": "연 행사",
    "interest": 45,
    "change": "+30%"
  },
  {
    "id": "176",
    "section": "행사",
    "rank": 26,
    "keyword": "cu 행사",
    "interest": 44,
    "change": "+27%"
  },
  {
    "id": "177",
    "section": "행사",
    "rank": 27,
    "keyword": "kfc 행사",
    "interest": 42,
    "change": "+11%"
  },
  {
    "id": "178",
    "section": "공연",
    "rank": 1,
    "keyword": "임윤찬 공연",
    "interest": 94,
    "change": "+296%"
  },
  {
    "id": "179",
    "section": "공연",
    "rank": 2,
    "keyword": "놀 티켓",
    "interest": 93,
    "change": "+106%"
  },
  {
    "id": "180",
    "section": "공연",
    "rank": 3,
    "keyword": "거리 공연",
    "interest": 91,
    "change": "+310%"
  },
  {
    "id": "181",
    "section": "공연",
    "rank": 4,
    "keyword": "bts 광화문 공연",
    "interest": 89,
    "change": "+226%"
  },
  {
    "id": "182",
    "section": "공연",
    "rank": 5,
    "keyword": "공연 포스터",
    "interest": 85,
    "change": "+174%"
  },
  {
    "id": "183",
    "section": "공연",
    "rank": 6,
    "keyword": "bts 공연 일정",
    "interest": 83,
    "change": "+34%"
  },
  {
    "id": "184",
    "section": "공연",
    "rank": 7,
    "keyword": "공연 세상",
    "interest": 85,
    "change": "+44%"
  },
  {
    "id": "185",
    "section": "공연",
    "rank": 8,
    "keyword": "홍대 공연",
    "interest": 79,
    "change": "+37%"
  },
  {
    "id": "186",
    "section": "공연",
    "rank": 9,
    "keyword": "공연 안전 지원 센터",
    "interest": 81,
    "change": "+12%"
  },
  {
    "id": "187",
    "section": "공연",
    "rank": 10,
    "keyword": "bts 부산 공연",
    "interest": 79,
    "change": "+34%"
  },
  {
    "id": "188",
    "section": "공연",
    "rank": 11,
    "keyword": "서울 공연 예술 고등학교",
    "interest": 75,
    "change": "+31%"
  },
  {
    "id": "189",
    "section": "공연",
    "rank": 12,
    "keyword": "내한 공연",
    "interest": 72,
    "change": "+45%"
  },
  {
    "id": "190",
    "section": "공연",
    "rank": 13,
    "keyword": "공연 안전 교육",
    "interest": 71,
    "change": "+10%"
  },
  {
    "id": "191",
    "section": "공연",
    "rank": 14,
    "keyword": "위켄드 공연",
    "interest": 69,
    "change": "+44%"
  },
  {
    "id": "192",
    "section": "공연",
    "rank": 15,
    "keyword": "전통 공연 예술 진흥 재단",
    "interest": 68,
    "change": "+41%"
  },
  {
    "id": "193",
    "section": "호텔",
    "rank": 1,
    "keyword": "써미트 호텔",
    "interest": 93,
    "change": "+195%"
  },
  {
    "id": "194",
    "section": "호텔",
    "rank": 2,
    "keyword": "여기어 떄",
    "interest": 91,
    "change": "+350%"
  },
  {
    "id": "195",
    "section": "호텔",
    "rank": 3,
    "keyword": "부영 호텔",
    "interest": 90,
    "change": "+221%"
  },
  {
    "id": "196",
    "section": "호텔",
    "rank": 4,
    "keyword": "레스 케이프 호텔",
    "interest": 89,
    "change": "+164%"
  },
  {
    "id": "197",
    "section": "호텔",
    "rank": 5,
    "keyword": "조선 호텔 앤 리조트",
    "interest": 89,
    "change": "+173%"
  },
  {
    "id": "198",
    "section": "호텔",
    "rank": 6,
    "keyword": "롤링 힐스 호텔",
    "interest": 83,
    "change": "+9%"
  },
  {
    "id": "199",
    "section": "호텔",
    "rank": 7,
    "keyword": "몬스터 호텔",
    "interest": 84,
    "change": "+16%"
  },
  {
    "id": "200",
    "section": "호텔",
    "rank": 8,
    "keyword": "스기노이 호텔",
    "interest": 83,
    "change": "+16%"
  },
  {
    "id": "201",
    "section": "호텔",
    "rank": 9,
    "keyword": "파라다이스 호텔 부산",
    "interest": 81,
    "change": "+38%"
  },
  {
    "id": "202",
    "section": "호텔",
    "rank": 10,
    "keyword": "마이 리얼 트립",
    "interest": 79,
    "change": "+28%"
  },
  {
    "id": "203",
    "section": "호텔",
    "rank": 11,
    "keyword": "신라 호텔 망고 빙수",
    "interest": 74,
    "change": "+44%"
  },
  {
    "id": "204",
    "section": "호텔",
    "rank": 12,
    "keyword": "수안보 온천 호텔",
    "interest": 75,
    "change": "+30%"
  },
  {
    "id": "205",
    "section": "호텔",
    "rank": 13,
    "keyword": "해운대 센텀 호텔",
    "interest": 69,
    "change": "+40%"
  },
  {
    "id": "206",
    "section": "호텔",
    "rank": 14,
    "keyword": "프레지던트 호텔",
    "interest": 70,
    "change": "+27%"
  },
  {
    "id": "207",
    "section": "호텔",
    "rank": 15,
    "keyword": "롯데 호텔 채용",
    "interest": 66,
    "change": "+26%"
  },
  {
    "id": "208",
    "section": "호텔",
    "rank": 16,
    "keyword": "호텔 신라 주식",
    "interest": 63,
    "change": "+18%"
  },
  {
    "id": "209",
    "section": "호텔",
    "rank": 17,
    "keyword": "속초 호텔",
    "interest": 64,
    "change": "+20%"
  },
  {
    "id": "210",
    "section": "호텔",
    "rank": 18,
    "keyword": "브라운 도트 호텔",
    "interest": 62,
    "change": "+22%"
  },
  {
    "id": "211",
    "section": "호텔",
    "rank": 19,
    "keyword": "공군 호텔",
    "interest": 61,
    "change": "+12%"
  },
  {
    "id": "212",
    "section": "호텔",
    "rank": 20,
    "keyword": "롯데 월드",
    "interest": 55,
    "change": "+39%"
  },
  {
    "id": "213",
    "section": "호텔",
    "rank": 21,
    "keyword": "용인 라마다 호텔",
    "interest": 55,
    "change": "+18%"
  },
  {
    "id": "214",
    "section": "호텔",
    "rank": 22,
    "keyword": "칸 데오 호텔 오사카 난바",
    "interest": 53,
    "change": "+10%"
  },
  {
    "id": "215",
    "section": "호텔",
    "rank": 23,
    "keyword": "롯데 호텔 월드",
    "interest": 49,
    "change": "+29%"
  },
  {
    "id": "216",
    "section": "호텔",
    "rank": 24,
    "keyword": "소노 호텔 앤 리조트",
    "interest": 48,
    "change": "+15%"
  },
  {
    "id": "217",
    "section": "호텔",
    "rank": 25,
    "keyword": "호텔 신라 주가",
    "interest": 48,
    "change": "+17%"
  },
  {
    "id": "218",
    "section": "호텔",
    "rank": 26,
    "keyword": "제주 롯데 호텔",
    "interest": 46,
    "change": "+11%"
  },
  {
    "id": "219",
    "section": "호텔",
    "rank": 27,
    "keyword": "신라 호텔 주가",
    "interest": 45,
    "change": "+31%"
  },
  {
    "id": "220",
    "section": "호텔",
    "rank": 28,
    "keyword": "해운대 호텔",
    "interest": 42,
    "change": "+24%"
  },
  {
    "id": "221",
    "section": "호텔",
    "rank": 29,
    "keyword": "해 즈빈 호텔",
    "interest": 40,
    "change": "+5%"
  },
  {
    "id": "222",
    "section": "호텔",
    "rank": 30,
    "keyword": "신라 호텔 뷔페",
    "interest": 37,
    "change": "+7%"
  },
  {
    "id": "223",
    "section": "호텔",
    "rank": 31,
    "keyword": "코리아나 호텔",
    "interest": 36,
    "change": "+12%"
  },
  {
    "id": "224",
    "section": "호텔",
    "rank": 32,
    "keyword": "에코 랜드 호텔",
    "interest": 31,
    "change": "+31%"
  },
  {
    "id": "225",
    "section": "호텔",
    "rank": 33,
    "keyword": "호텔 컴바인",
    "interest": 33,
    "change": "+16%"
  },
  {
    "id": "226",
    "section": "호텔",
    "rank": 34,
    "keyword": "agoda",
    "interest": 27,
    "change": "+25%"
  },
  {
    "id": "227",
    "section": "호텔",
    "rank": 35,
    "keyword": "롯데 호텔 제주",
    "interest": 28,
    "change": "+42%"
  },
  {
    "id": "228",
    "section": "호텔",
    "rank": 36,
    "keyword": "서울 신라 호텔",
    "interest": 24,
    "change": "+40%"
  },
  {
    "id": "229",
    "section": "호텔",
    "rank": 37,
    "keyword": "5 성급 호텔",
    "interest": 23,
    "change": "+11%"
  },
  {
    "id": "230",
    "section": "호텔",
    "rank": 38,
    "keyword": "몬드리안 호텔",
    "interest": 22,
    "change": "+7%"
  },
  {
    "id": "231",
    "section": "호텔",
    "rank": 39,
    "keyword": "해비치 호텔",
    "interest": 21,
    "change": "+41%"
  },
  {
    "id": "232",
    "section": "호텔",
    "rank": 40,
    "keyword": "호텔 스 컴바인",
    "interest": 20,
    "change": "+7%"
  },
  {
    "id": "233",
    "section": "호텔",
    "rank": 41,
    "keyword": "씨마 크 호텔",
    "interest": 20,
    "change": "+34%"
  },
  {
    "id": "234",
    "section": "호텔",
    "rank": 42,
    "keyword": "조선 호텔",
    "interest": 20,
    "change": "+20%"
  },
  {
    "id": "235",
    "section": "호텔",
    "rank": 43,
    "keyword": "파르 나스 호텔",
    "interest": 20,
    "change": "+41%"
  },
  {
    "id": "236",
    "section": "호텔",
    "rank": 44,
    "keyword": "삿포로 호텔",
    "interest": 20,
    "change": "+24%"
  },
  {
    "id": "237",
    "section": "호텔",
    "rank": 45,
    "keyword": "신라 스테이",
    "interest": 20,
    "change": "+14%"
  },
  {
    "id": "238",
    "section": "호텔",
    "rank": 46,
    "keyword": "apa 호텔",
    "interest": 20,
    "change": "+40%"
  },
  {
    "id": "239",
    "section": "호텔",
    "rank": 47,
    "keyword": "후쿠오카 호텔",
    "interest": 20,
    "change": "+20%"
  },
  {
    "id": "240",
    "section": "호텔",
    "rank": 48,
    "keyword": "부산 호텔",
    "interest": 20,
    "change": "+31%"
  },
  {
    "id": "241",
    "section": "호텔",
    "rank": 49,
    "keyword": "신라 호텔",
    "interest": 20,
    "change": "+34%"
  },
  {
    "id": "242",
    "section": "호텔",
    "rank": 50,
    "keyword": "호텔 신라",
    "interest": 20,
    "change": "+38%"
  },
  {
    "id": "243",
    "section": "항공",
    "rank": 1,
    "keyword": "기아차 주가",
    "interest": 97,
    "change": "+271%"
  },
  {
    "id": "244",
    "section": "항공",
    "rank": 2,
    "keyword": "중국 동방 항공 온라인 체크인",
    "interest": 95,
    "change": "+154%"
  },
  {
    "id": "245",
    "section": "항공",
    "rank": 3,
    "keyword": "북극 항공 로",
    "interest": 93,
    "change": "+240%"
  },
  {
    "id": "246",
    "section": "항공",
    "rank": 4,
    "keyword": "조비 항공 주가",
    "interest": 91,
    "change": "+319%"
  },
  {
    "id": "247",
    "section": "항공",
    "rank": 5,
    "keyword": "에바 항공",
    "interest": 87,
    "change": "+177%"
  },
  {
    "id": "248",
    "section": "항공",
    "rank": 6,
    "keyword": "상하이 항공",
    "interest": 86,
    "change": "+27%"
  },
  {
    "id": "249",
    "section": "항공",
    "rank": 7,
    "keyword": "인천 대한 항공 점보스",
    "interest": 84,
    "change": "+28%"
  },
  {
    "id": "250",
    "section": "항공",
    "rank": 8,
    "keyword": "대한 항공 로고",
    "interest": 79,
    "change": "+42%"
  },
  {
    "id": "251",
    "section": "항공",
    "rank": 9,
    "keyword": "삼성 전자 주식 시세",
    "interest": 81,
    "change": "+22%"
  },
  {
    "id": "252",
    "section": "항공",
    "rank": 10,
    "keyword": "휴림 로봇 주가",
    "interest": 77,
    "change": "+24%"
  },
  {
    "id": "253",
    "section": "항공",
    "rank": 11,
    "keyword": "춘추 항공",
    "interest": 76,
    "change": "+16%"
  },
  {
    "id": "254",
    "section": "항공",
    "rank": 12,
    "keyword": "klm 항공",
    "interest": 71,
    "change": "+10%"
  },
  {
    "id": "255",
    "section": "항공",
    "rank": 13,
    "keyword": "대한 항공 스카이 샵",
    "interest": 71,
    "change": "+10%"
  },
  {
    "id": "256",
    "section": "항공",
    "rank": 14,
    "keyword": "항공 갤",
    "interest": 70,
    "change": "+6%"
  },
  {
    "id": "257",
    "section": "항공",
    "rank": 15,
    "keyword": "대한 항공 고객 센터",
    "interest": 66,
    "change": "+32%"
  },
  {
    "id": "258",
    "section": "항공",
    "rank": 16,
    "keyword": "google flight",
    "interest": 67,
    "change": "+29%"
  },
  {
    "id": "259",
    "section": "항공",
    "rank": 17,
    "keyword": "사우스 웨스트 항공",
    "interest": 61,
    "change": "+20%"
  },
  {
    "id": "260",
    "section": "항공",
    "rank": 18,
    "keyword": "lot 항공",
    "interest": 59,
    "change": "+19%"
  },
  {
    "id": "261",
    "section": "항공",
    "rank": 19,
    "keyword": "미래에셋 증권 주가",
    "interest": 60,
    "change": "+27%"
  },
  {
    "id": "262",
    "section": "항공",
    "rank": 20,
    "keyword": "아랍 에미레이트 항공",
    "interest": 57,
    "change": "+22%"
  },
  {
    "id": "263",
    "section": "항공",
    "rank": 21,
    "keyword": "항공 사진",
    "interest": 53,
    "change": "+30%"
  },
  {
    "id": "264",
    "section": "항공",
    "rank": 22,
    "keyword": "덕유 항공",
    "interest": 54,
    "change": "+19%"
  },
  {
    "id": "265",
    "section": "항공",
    "rank": 23,
    "keyword": "유나이티드 항공",
    "interest": 52,
    "change": "+23%"
  },
  {
    "id": "266",
    "section": "항공",
    "rank": 24,
    "keyword": "현대차 주가",
    "interest": 48,
    "change": "+21%"
  },
  {
    "id": "267",
    "section": "항공",
    "rank": 25,
    "keyword": "싱가폴 항공",
    "interest": 47,
    "change": "+11%"
  },
  {
    "id": "268",
    "section": "항공",
    "rank": 26,
    "keyword": "아메리칸 항공",
    "interest": 46,
    "change": "+35%"
  },
  {
    "id": "269",
    "section": "항공",
    "rank": 27,
    "keyword": "샤먼 항공",
    "interest": 42,
    "change": "+39%"
  },
  {
    "id": "270",
    "section": "항공",
    "rank": 28,
    "keyword": "젯 스타 항공",
    "interest": 43,
    "change": "+23%"
  },
  {
    "id": "271",
    "section": "항공",
    "rank": 29,
    "keyword": "중국 동방 항공",
    "interest": 37,
    "change": "+26%"
  },
  {
    "id": "272",
    "section": "항공",
    "rank": 30,
    "keyword": "마이 리얼 트립",
    "interest": 38,
    "change": "+30%"
  },
  {
    "id": "273",
    "section": "항공",
    "rank": 31,
    "keyword": "에어 프레 미아",
    "interest": 37,
    "change": "+8%"
  },
  {
    "id": "274",
    "section": "항공",
    "rank": 32,
    "keyword": "항공 안전 기술원",
    "interest": 31,
    "change": "+37%"
  },
  {
    "id": "275",
    "section": "항공",
    "rank": 33,
    "keyword": "말레이시아 항공",
    "interest": 32,
    "change": "+32%"
  },
  {
    "id": "276",
    "section": "항공",
    "rank": 34,
    "keyword": "땡처리 항공권",
    "interest": 31,
    "change": "+10%"
  },
  {
    "id": "277",
    "section": "항공",
    "rank": 35,
    "keyword": "삼성 sdi 주가",
    "interest": 25,
    "change": "+20%"
  },
  {
    "id": "278",
    "section": "항공",
    "rank": 36,
    "keyword": "에어 부산",
    "interest": 27,
    "change": "+8%"
  },
  {
    "id": "279",
    "section": "항공",
    "rank": 37,
    "keyword": "폴란드 항공",
    "interest": 25,
    "change": "+42%"
  },
  {
    "id": "280",
    "section": "항공",
    "rank": 38,
    "keyword": "대한 항공 마일리지 몰",
    "interest": 23,
    "change": "+30%"
  },
  {
    "id": "281",
    "section": "항공",
    "rank": 39,
    "keyword": "비짓 재팬",
    "interest": 20,
    "change": "+17%"
  },
  {
    "id": "282",
    "section": "항공",
    "rank": 40,
    "keyword": "땡처리 항공",
    "interest": 20,
    "change": "+7%"
  },
  {
    "id": "283",
    "section": "항공",
    "rank": 41,
    "keyword": "티 웨이 항공",
    "interest": 20,
    "change": "+12%"
  },
  {
    "id": "284",
    "section": "항공",
    "rank": 42,
    "keyword": "에코프로 비엠 주가",
    "interest": 20,
    "change": "+29%"
  },
  {
    "id": "285",
    "section": "항공",
    "rank": 43,
    "keyword": "티 웨이",
    "interest": 20,
    "change": "+37%"
  },
  {
    "id": "286",
    "section": "항공",
    "rank": 44,
    "keyword": "티 웨이 항공 주가",
    "interest": 20,
    "change": "+11%"
  },
  {
    "id": "287",
    "section": "항공",
    "rank": 45,
    "keyword": "파라 타 항공",
    "interest": 20,
    "change": "+36%"
  },
  {
    "id": "288",
    "section": "항공",
    "rank": 46,
    "keyword": "동방 항공",
    "interest": 20,
    "change": "+11%"
  },
  {
    "id": "289",
    "section": "항공",
    "rank": 47,
    "keyword": "항공 우주 학회",
    "interest": 20,
    "change": "+9%"
  },
  {
    "id": "290",
    "section": "항공",
    "rank": 48,
    "keyword": "피치 항공",
    "interest": 20,
    "change": "+35%"
  },
  {
    "id": "291",
    "section": "항공",
    "rank": 49,
    "keyword": "아시아나 항공 홈페이지",
    "interest": 20,
    "change": "+33%"
  },
  {
    "id": "292",
    "section": "항공",
    "rank": 50,
    "keyword": "한국 항공 대학교",
    "interest": 20,
    "change": "+40%"
  },
  {
    "id": "293",
    "section": "맛집",
    "rank": 1,
    "keyword": "종각역 맛집",
    "interest": 94,
    "change": "+109%"
  },
  {
    "id": "294",
    "section": "맛집",
    "rank": 2,
    "keyword": "노원역 맛집",
    "interest": 95,
    "change": "+293%"
  },
  {
    "id": "295",
    "section": "맛집",
    "rank": 3,
    "keyword": "이수역 맛집",
    "interest": 89,
    "change": "+206%"
  },
  {
    "id": "296",
    "section": "맛집",
    "rank": 4,
    "keyword": "에버랜드 맛집",
    "interest": 87,
    "change": "+328%"
  },
  {
    "id": "297",
    "section": "맛집",
    "rank": 5,
    "keyword": "도쿄 라멘 맛집",
    "interest": 86,
    "change": "+339%"
  },
  {
    "id": "298",
    "section": "맛집",
    "rank": 6,
    "keyword": "디너 의 여왕",
    "interest": 84,
    "change": "+35%"
  },
  {
    "id": "299",
    "section": "맛집",
    "rank": 7,
    "keyword": "성수역 맛집",
    "interest": 81,
    "change": "+27%"
  },
  {
    "id": "300",
    "section": "맛집",
    "rank": 8,
    "keyword": "판 교역 맛집",
    "interest": 81,
    "change": "+45%"
  },
  {
    "id": "301",
    "section": "맛집",
    "rank": 9,
    "keyword": "종로 3 가 맛집",
    "interest": 77,
    "change": "+45%"
  },
  {
    "id": "302",
    "section": "맛집",
    "rank": 10,
    "keyword": "오사카 맛집 리스트",
    "interest": 77,
    "change": "+36%"
  },
  {
    "id": "303",
    "section": "맛집",
    "rank": 11,
    "keyword": "고베 맛집",
    "interest": 77,
    "change": "+15%"
  },
  {
    "id": "304",
    "section": "맛집",
    "rank": 12,
    "keyword": "삼청동 맛집",
    "interest": 72,
    "change": "+30%"
  },
  {
    "id": "305",
    "section": "맛집",
    "rank": 13,
    "keyword": "동명동 맛집",
    "interest": 72,
    "change": "+38%"
  },
  {
    "id": "306",
    "section": "맛집",
    "rank": 14,
    "keyword": "미금역 맛집",
    "interest": 71,
    "change": "+29%"
  },
  {
    "id": "307",
    "section": "맛집",
    "rank": 15,
    "keyword": "남포동 맛집",
    "interest": 66,
    "change": "+34%"
  },
  {
    "id": "308",
    "section": "맛집",
    "rank": 16,
    "keyword": "남양주 맛집",
    "interest": 66,
    "change": "+24%"
  },
  {
    "id": "309",
    "section": "맛집",
    "rank": 17,
    "keyword": "서촌 맛집",
    "interest": 61,
    "change": "+31%"
  },
  {
    "id": "310",
    "section": "맛집",
    "rank": 18,
    "keyword": "양재역 맛집",
    "interest": 63,
    "change": "+28%"
  },
  {
    "id": "311",
    "section": "맛집",
    "rank": 19,
    "keyword": "서울 숲 맛집",
    "interest": 58,
    "change": "+42%"
  },
  {
    "id": "312",
    "section": "맛집",
    "rank": 20,
    "keyword": "우체국",
    "interest": 57,
    "change": "+37%"
  },
  {
    "id": "313",
    "section": "맛집",
    "rank": 21,
    "keyword": "우체국 맛집 가이드",
    "interest": 54,
    "change": "+17%"
  },
  {
    "id": "314",
    "section": "맛집",
    "rank": 22,
    "keyword": "혜화역 맛집",
    "interest": 54,
    "change": "+9%"
  },
  {
    "id": "315",
    "section": "맛집",
    "rank": 23,
    "keyword": "교토 역 맛집",
    "interest": 50,
    "change": "+43%"
  },
  {
    "id": "316",
    "section": "맛집",
    "rank": 24,
    "keyword": "혜화 맛집",
    "interest": 50,
    "change": "+8%"
  },
  {
    "id": "317",
    "section": "맛집",
    "rank": 25,
    "keyword": "우 슐랭 가이드",
    "interest": 45,
    "change": "+6%"
  },
  {
    "id": "318",
    "section": "맛집",
    "rank": 26,
    "keyword": "영천 맛집",
    "interest": 46,
    "change": "+39%"
  },
  {
    "id": "319",
    "section": "맛집",
    "rank": 27,
    "keyword": "부산역 맛집",
    "interest": 44,
    "change": "+33%"
  },
  {
    "id": "320",
    "section": "맛집",
    "rank": 28,
    "keyword": "영종도 맛집",
    "interest": 39,
    "change": "+9%"
  },
  {
    "id": "321",
    "section": "맛집",
    "rank": 29,
    "keyword": "더 현대 맛집",
    "interest": 41,
    "change": "+33%"
  },
  {
    "id": "322",
    "section": "맛집",
    "rank": 30,
    "keyword": "캐치 테이블",
    "interest": 39,
    "change": "+25%"
  },
  {
    "id": "323",
    "section": "맛집",
    "rank": 31,
    "keyword": "수원역 맛집",
    "interest": 34,
    "change": "+23%"
  },
  {
    "id": "324",
    "section": "맛집",
    "rank": 32,
    "keyword": "사당 맛집",
    "interest": 31,
    "change": "+44%"
  },
  {
    "id": "325",
    "section": "맛집",
    "rank": 33,
    "keyword": "부산대 맛집",
    "interest": 32,
    "change": "+12%"
  },
  {
    "id": "326",
    "section": "맛집",
    "rank": 34,
    "keyword": "강화도 맛집",
    "interest": 30,
    "change": "+21%"
  },
  {
    "id": "327",
    "section": "맛집",
    "rank": 35,
    "keyword": "양평 맛집",
    "interest": 26,
    "change": "+26%"
  },
  {
    "id": "328",
    "section": "맛집",
    "rank": 36,
    "keyword": "청주 맛집",
    "interest": 26,
    "change": "+41%"
  },
  {
    "id": "329",
    "section": "맛집",
    "rank": 37,
    "keyword": "생생 정보통 맛집",
    "interest": 22,
    "change": "+27%"
  },
  {
    "id": "330",
    "section": "맛집",
    "rank": 38,
    "keyword": "타베 로그",
    "interest": 21,
    "change": "+19%"
  },
  {
    "id": "331",
    "section": "맛집",
    "rank": 39,
    "keyword": "우체국 추천 맛집 가이드",
    "interest": 20,
    "change": "+40%"
  },
  {
    "id": "332",
    "section": "맛집",
    "rank": 40,
    "keyword": "마포 맛집",
    "interest": 20,
    "change": "+30%"
  },
  {
    "id": "333",
    "section": "맛집",
    "rank": 41,
    "keyword": "경주 황리 단길 맛집",
    "interest": 20,
    "change": "+33%"
  },
  {
    "id": "334",
    "section": "맛집",
    "rank": 42,
    "keyword": "코엑스 맛집",
    "interest": 20,
    "change": "+33%"
  },
  {
    "id": "335",
    "section": "맛집",
    "rank": 43,
    "keyword": "구미 맛집",
    "interest": 20,
    "change": "+22%"
  },
  {
    "id": "336",
    "section": "맛집",
    "rank": 44,
    "keyword": "한남동 맛집",
    "interest": 20,
    "change": "+39%"
  },
  {
    "id": "337",
    "section": "맛집",
    "rank": 45,
    "keyword": "상하이 맛집",
    "interest": 20,
    "change": "+30%"
  },
  {
    "id": "338",
    "section": "맛집",
    "rank": 46,
    "keyword": "삼각지 맛집",
    "interest": 20,
    "change": "+15%"
  },
  {
    "id": "339",
    "section": "맛집",
    "rank": 47,
    "keyword": "건대 맛집",
    "interest": 20,
    "change": "+12%"
  },
  {
    "id": "340",
    "section": "맛집",
    "rank": 48,
    "keyword": "방이동 맛집",
    "interest": 20,
    "change": "+38%"
  },
  {
    "id": "341",
    "section": "맛집",
    "rank": 49,
    "keyword": "홍대 맛집",
    "interest": 20,
    "change": "+33%"
  },
  {
    "id": "342",
    "section": "맛집",
    "rank": 50,
    "keyword": "황리 단길 맛집",
    "interest": 20,
    "change": "+31%"
  },
  {
    "id": "343",
    "section": "크루즈",
    "rank": 1,
    "keyword": "톰 크루즈 종교",
    "interest": 94,
    "change": "+263%"
  },
  {
    "id": "344",
    "section": "크루즈",
    "rank": 2,
    "keyword": "한타 바이러스 란",
    "interest": 94,
    "change": "+101%"
  },
  {
    "id": "345",
    "section": "크루즈",
    "rank": 3,
    "keyword": "크루즈 여행 비용",
    "interest": 93,
    "change": "+298%"
  },
  {
    "id": "346",
    "section": "크루즈",
    "rank": 4,
    "keyword": "hantavirus",
    "interest": 90,
    "change": "+119%"
  },
  {
    "id": "347",
    "section": "크루즈",
    "rank": 5,
    "keyword": "원피스 트레저 크루즈",
    "interest": 89,
    "change": "+196%"
  },
  {
    "id": "348",
    "section": "크루즈",
    "rank": 6,
    "keyword": "부산 크루즈",
    "interest": 83,
    "change": "+26%"
  },
  {
    "id": "349",
    "section": "크루즈",
    "rank": 7,
    "keyword": "크루즈 닷컴",
    "interest": 85,
    "change": "+5%"
  },
  {
    "id": "350",
    "section": "크루즈",
    "rank": 8,
    "keyword": "코스타 크루즈",
    "interest": 80,
    "change": "+35%"
  },
  {
    "id": "351",
    "section": "크루즈",
    "rank": 9,
    "keyword": "울릉 크루즈",
    "interest": 79,
    "change": "+11%"
  },
  {
    "id": "352",
    "section": "크루즈",
    "rank": 10,
    "keyword": "팬스타 크루즈",
    "interest": 75,
    "change": "+33%"
  },
  {
    "id": "353",
    "section": "크루즈",
    "rank": 11,
    "keyword": "톰 크루즈",
    "interest": 75,
    "change": "+12%"
  },
  {
    "id": "354",
    "section": "크루즈",
    "rank": 12,
    "keyword": "크루즈 컨트롤",
    "interest": 72,
    "change": "+38%"
  },
  {
    "id": "355",
    "section": "크루즈",
    "rank": 13,
    "keyword": "베라 크루즈",
    "interest": 73,
    "change": "+34%"
  },
  {
    "id": "356",
    "section": "크루즈",
    "rank": 14,
    "keyword": "크루즈 한타 바이러스",
    "interest": 70,
    "change": "+30%"
  },
  {
    "id": "357",
    "section": "크루즈",
    "rank": 15,
    "keyword": "산타 크루즈",
    "interest": 68,
    "change": "+14%"
  },
  {
    "id": "358",
    "section": "크루즈",
    "rank": 16,
    "keyword": "디즈니 크루즈",
    "interest": 63,
    "change": "+28%"
  },
  {
    "id": "359",
    "section": "크루즈",
    "rank": 17,
    "keyword": "한타 바이러스 크루즈",
    "interest": 61,
    "change": "+11%"
  },
  {
    "id": "360",
    "section": "크루즈",
    "rank": 18,
    "keyword": "크루즈 바이러스",
    "interest": 61,
    "change": "+25%"
  },
  {
    "id": "361",
    "section": "크루즈",
    "rank": 19,
    "keyword": "한타 바이러스",
    "interest": 57,
    "change": "+13%"
  },
  {
    "id": "362",
    "section": "크루즈",
    "rank": 20,
    "keyword": "스마트 크루즈 컨트롤",
    "interest": 56,
    "change": "+12%"
  },
  {
    "id": "363",
    "section": "크루즈",
    "rank": 21,
    "keyword": "코스타 세레나 크루즈",
    "interest": 55,
    "change": "+26%"
  },
  {
    "id": "364",
    "section": "크루즈",
    "rank": 22,
    "keyword": "정동진 썬 크루즈",
    "interest": 55,
    "change": "+33%"
  },
  {
    "id": "365",
    "section": "크루즈",
    "rank": 23,
    "keyword": "크루즈 여행",
    "interest": 53,
    "change": "+38%"
  },
  {
    "id": "366",
    "section": "크루즈",
    "rank": 24,
    "keyword": "크루즈 다이렉트",
    "interest": 49,
    "change": "+5%"
  },
  {
    "id": "367",
    "section": "크루즈",
    "rank": 25,
    "keyword": "원피스 트레저 크루즈 갤러리",
    "interest": 49,
    "change": "+31%"
  },
  {
    "id": "368",
    "section": "크루즈",
    "rank": 26,
    "keyword": "톰 크루즈 영화",
    "interest": 46,
    "change": "+16%"
  },
  {
    "id": "369",
    "section": "크루즈",
    "rank": 27,
    "keyword": "로얄 캐리비안 크루즈",
    "interest": 42,
    "change": "+32%"
  },
  {
    "id": "370",
    "section": "크루즈",
    "rank": 28,
    "keyword": "이스턴 크루즈",
    "interest": 40,
    "change": "+18%"
  },
  {
    "id": "371",
    "section": "크루즈",
    "rank": 29,
    "keyword": "도톤보리 리버 크루즈",
    "interest": 39,
    "change": "+40%"
  },
  {
    "id": "372",
    "section": "크루즈",
    "rank": 30,
    "keyword": "크루즈 tmk",
    "interest": 39,
    "change": "+14%"
  }
];

export const insightCards: InsightCard[] = [
  {
    "keyword": "대학 축제 시즌",
    "category": "Seasonal Hot Topic (시즌 이슈)",
    "reason": "[팩트체크] 건국대, 홍익대 등 주요 대학들의 5월 대동제 기간을 맞아 라인업과 일정에 대한 검색량이 전주 대비 300% 이상 폭증했습니다. [산업영향] 젊은 층의 대규모 이동에 따른 대학가 상권 활성화와 함께, 축제 테마의 숙박 및 교통 상품에 대한 수요가 동반 상승하고 있습니다.",
    "type": "analysis"
  },
  {
    "keyword": "카자흐스탄 여행",
    "category": "Breaking Trend (급상승 키워드)",
    "reason": "[팩트체크] 중앙아시아 직항 노선 확대와 미디어 노출로 인해 카자흐스탄 등 이색 해외 여행지에 대한 관심도가 급격히 높아지고 있습니다. [산업영향] 일본, 동남아에 집중되었던 여행 수요가 다변화되면서 새로운 해외 관광 상품 개발과 항공업계의 노선 경쟁이 가속화될 전망입니다.",
    "type": "unique"
  },
  {
    "keyword": "신라호텔 망고빙수",
    "category": "Luxury F&B (럭셔리 트렌드)",
    "reason": "[팩트체크] 본격적인 초여름 날씨가 시작되며 호텔업계의 시그니처 메뉴인 망고빙수가 출시되자마자 MZ세대의 SNS 인증샷 성지로 떠오르고 있습니다. [산업영향] '스몰 럭셔리' 소비 성향이 지속됨에 따라 특급 호텔의 식음료 부문 매출이 크게 증가하고 있으며, 이는 호텔 브랜드 로열티 강화로 이어지고 있습니다.",
    "type": "analysis"
  },
  {
    "keyword": "임윤찬 공연",
    "category": "Culture & Art (문화 예술)",
    "reason": "[팩트체크] 세계적인 피아니스트 임윤찬의 공연 예매 일정이 공개되면서 클래식 공연에 대한 전국적인 '피켓팅(피 튀기는 티켓팅)' 현상이 벌어지고 있습니다. [산업영향] 스타 연주자를 중심으로 한 공연 예술 시장의 성장은 '아트 투어리즘(Art Tourism)'을 활성화시키며 공연장 주변 숙박 및 관광 인프라에 긍정적인 영향을 미치고 있습니다.",
    "type": "unique"
  }
];
