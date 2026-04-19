export type RegionType = 'jeju' | 'seoul' | 'busan';

export interface RegionalData {
  name: string;
  totalVisitors: string;
  growthRate: string;
  monthlyTrend: Array<{ month: string; visitors: number }>;
  demographics: Array<{ name: string; value: number }>;
}

export const mockDashboardData: Record<RegionType, RegionalData> = {
  jeju: {
    name: "제주특별자치도",
    totalVisitors: "1,142,000",
    growthRate: "+8.5%",
    monthlyTrend: [
      { month: "1월", visitors: 850 },
      { month: "2월", visitors: 920 },
      { month: "3월", visitors: 1050 },
      { month: "4월", visitors: 1100 },
      { month: "5월", visitors: 980 },
      { month: "6월", visitors: 1142 },
    ],
    demographics: [
      { name: "20대", value: 35 },
      { name: "30대", value: 30 },
      { name: "40대", value: 20 },
      { name: "50대+", value: 15 },
    ]
  },
  seoul: {
    name: "서울특별시",
    totalVisitors: "3,250,000",
    growthRate: "+12.4%",
    monthlyTrend: [
      { month: "1월", visitors: 2100 },
      { month: "2월", visitors: 2300 },
      { month: "3월", visitors: 2800 },
      { month: "4월", visitors: 3100 },
      { month: "5월", visitors: 3050 },
      { month: "6월", visitors: 3250 },
    ],
    demographics: [
      { name: "20대", value: 45 },
      { name: "30대", value: 25 },
      { name: "40대", value: 15 },
      { name: "50대+", value: 15 },
    ]
  },
  busan: {
    name: "부산광역시",
    totalVisitors: "1,820,000",
    growthRate: "+5.2%",
    monthlyTrend: [
      { month: "1월", visitors: 1200 },
      { month: "2월", visitors: 1350 },
      { month: "3월", visitors: 1500 },
      { month: "4월", visitors: 1680 },
      { month: "5월", visitors: 1750 },
      { month: "6월", visitors: 1820 },
    ],
    demographics: [
      { name: "20대", value: 30 },
      { name: "30대", value: 35 },
      { name: "40대", value: 25 },
      { name: "50대+", value: 10 },
    ]
  }
};
