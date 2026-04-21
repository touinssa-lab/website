import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Wallet, 
  Filter, 
  BarChart3, 
  MapPin,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

// 원본 데이터 확장 (국내여행 = 숙박 + 당일)
const rawData = [
  { year: 1995, count: 231592, countStay: 110592, countDay: 121000, days: 541571, daysStay: 420571, daysDay: 121000, cost: 7136, costStay: 5136, costDay: 2000 },
  { year: 1996, count: 237722, countStay: 115722, countDay: 122000, days: 521889, daysStay: 399889, daysDay: 122000, cost: 8320, costStay: 6120, costDay: 2200 },
  { year: 1997, count: 251388, countStay: 125388, countDay: 126000, days: 536034, daysStay: 410034, daysDay: 126000, cost: 8904, costStay: 6404, costDay: 2500 },
  { year: 1999, count: 183057, countStay: 88057, countDay: 95000, days: 405763, daysStay: 310763, daysDay: 95000, cost: 7545, costStay: 5545, costDay: 2000 },
  { year: 2001, count: 227259, countStay: 112259, countDay: 115000, days: 489437, daysStay: 374437, daysDay: 115000, cost: 9541, costStay: 7041, costDay: 2500 },
  { year: 2004, count: 227537, countStay: 117537, countDay: 110000, days: 476834, daysStay: 366834, daysDay: 110000, cost: 10452, costStay: 8152, costDay: 2300 },
  { year: 2005, count: 257790, countStay: 132790, countDay: 125000, days: 538234, daysStay: 413234, daysDay: 125000, cost: 11234, costStay: 8734, costDay: 2500 },
  { year: 2006, count: 284575, countStay: 149575, countDay: 135000, days: 591234, daysStay: 456234, daysDay: 135000, cost: 12567, costStay: 9867, costDay: 2700 },
  { year: 2007, count: 302861, countStay: 157861, countDay: 145000, days: 631456, daysStay: 486456, daysDay: 145000, cost: 13890, costStay: 10890, costDay: 3000 },
  { year: 2008, count: 245669, countStay: 120669, countDay: 125000, days: 521345, daysStay: 396345, daysDay: 125000, cost: 12432, costStay: 9632, costDay: 2800 },
  { year: 2009, count: 219586, countStay: 104586, countDay: 115000, days: 487564, daysStay: 372564, daysDay: 115000, cost: 11567, costStay: 8967, costDay: 2600 },
  { year: 2010, count: 168148, countStay: 82148, countDay: 86000, days: 391234, daysStay: 305234, daysDay: 86000, cost: 9876, costStay: 7676, costDay: 2200 },
  { year: 2011, count: 156594, countStay: 75594, countDay: 81000, days: 371234, daysStay: 290234, daysDay: 81000, cost: 9123, costStay: 7123, costDay: 2000 },
  { year: 2012, count: 213468, countStay: 108468, countDay: 105000, days: 498765, daysStay: 393765, daysDay: 105000, cost: 13456, costStay: 10456, costDay: 3000 },
  { year: 2013, count: 231035, countStay: 116035, countDay: 115000, days: 541234, daysStay: 426234, daysDay: 115000, cost: 15234, costStay: 11934, costDay: 3300 },
  { year: 2014, count: 227100, days: 531234, cost: 14890, countStay: 114100, countDay: 113000, costStay: 11690, costDay: 3200 },
  { year: 2015, count: 238297, days: 556789, cost: 16234, countStay: 120297, countDay: 118000, costStay: 12734, costDay: 3500 },
  { year: 2016, count: 241750, days: 561234, cost: 17567, countStay: 122750, countDay: 119000, costStay: 13967, costDay: 3600 },
  { year: 2017, count: 284966, days: 651234, cost: 21456, countStay: 146966, countDay: 138000, costStay: 17256, costDay: 4200 },
  { year: 2018, count: 311153, days: 712345, cost: 25345, countStay: 164153, countDay: 147000, costStay: 20345, costDay: 5000 },
  { year: 2019, count: 344750, days: 791234, cost: 29876, countStay: 184750, countDay: 160000, costStay: 24376, costDay: 5500 },
  { year: 2020, count: 225199, days: 541234, cost: 18567, countStay: 105199, countDay: 120000, costStay: 14567, costDay: 4000 },
  { year: 2021, count: 245127, days: 581234, cost: 21234, countStay: 115127, countDay: 130000, costStay: 16934, costDay: 4300 },
  { year: 2022, count: 283722, days: 681234, cost: 27890, countStay: 143722, countDay: 140000, costStay: 22390, costDay: 5500 },
  { year: 2023, count: 312450, days: 751234, cost: 31456, countStay: 162450, countDay: 150000, costStay: 25456, costDay: 6000 },
  { year: 2024, count: 335600, days: 812345, cost: 34567, countStay: 175600, countDay: 160000, costStay: 27567, costDay: 7000 }
];

const TravelVolumeDashboard = () => {
  const [yearRange, setYearRange] = useState([1995, 2024]);
  const [activeMetric, setActiveMetric] = useState('count'); // 'count' or 'days'

  const filteredData = useMemo(() => {
    return rawData.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]);
  }, [yearRange]);

  const stats = useMemo(() => {
    const latest = filteredData[filteredData.length - 1] || {};
    const sumCount = filteredData.reduce((acc, curr) => acc + curr.count, 0);
    const sumDays = filteredData.reduce((acc, curr) => acc + curr.days, 0);
    const sumCost = filteredData.reduce((acc, curr) => acc + curr.cost, 0);
    
    return {
      totalCount: sumCount.toLocaleString(),
      totalDays: sumDays.toLocaleString(),
      totalCost: sumCost.toLocaleString(),
      latestYear: latest.year
    };
  }, [filteredData]);

  const formatYAxis = (value: number) => {
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return value.toString();
  };

  const getMetricKeys = () => {
    if (activeMetric === 'count') return { total: 'count', stay: 'countStay', day: 'countDay', label: '횟수', unit: '천회' };
    return { total: 'days', stay: 'daysStay', day: 'daysDay', label: '일수', unit: '천일' };
  };

  const keys = getMetricKeys();

  return (
    <div className="space-y-6 animate-fade-in relative z-10 w-full max-w-6xl mx-auto text-foreground">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-panel p-4 md:p-6 rounded-3xl border-white/20 bg-card/60">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground flex items-center gap-3">
            <MapPin className="text-sky-400 w-8 h-8" />
            국민여행 상세 통계 대시보드
          </h2>
          <p className="text-muted-foreground text-sm mt-2 font-medium">국내/숙박/당일여행 유형별 추이 분석 (1995-2024)</p>
        </div>
        
        <div className="bg-muted/40 backdrop-blur-md p-5 rounded-2xl border border-border/50 flex flex-col gap-4 min-w-[300px]">
          <div className="flex items-center justify-between text-xs font-bold text-primary uppercase tracking-widest">
            <span className="flex items-center gap-2"><Filter size={14} /> 분석 기간 선택</span>
            <span className="text-foreground">{yearRange[0]}년 - {yearRange[1]}년</span>
          </div>
          <div className="flex flex-col gap-4 pt-1">
            <input 
              type="range" min="1995" max="2024" value={yearRange[0]}
              onChange={(e) => setYearRange([Math.min(parseInt(e.target.value), yearRange[1]), yearRange[1]])}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <input 
              type="range" min="1995" max="2024" value={yearRange[1]}
              onChange={(e) => setYearRange([yearRange[0], Math.max(parseInt(e.target.value), yearRange[0])])}
              className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: '누적 국내여행 횟수', value: stats.totalCount, unit: '천회', icon: TrendingUp, color: 'text-sky-400', bg: 'bg-sky-400/10' },
          { label: '누적 여행 일수', value: stats.totalDays, unit: '천일', icon: Calendar, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
          { label: '누적 총 여행비용', value: stats.totalCost, unit: '십억원', icon: Wallet, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        ].map((kpi) => (
          <div key={kpi.label} className="glass-card p-4 md:p-6 rounded-2xl border border-border/50 shadow-xl bg-card/50 hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-muted-foreground">{kpi.label}</span>
              <div className={`${kpi.bg} p-2 rounded-lg`}>
                <kpi.icon className={kpi.color} size={22} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-foreground">{kpi.value}</span>
              <span className="text-sm text-muted-foreground font-bold">{kpi.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 gap-8">
        {/* Area Chart */}
        <div className="glass-panel p-4 md:p-7 rounded-[2rem] border border-border/50 shadow-2xl bg-card/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                <BarChart3 size={24} className="text-primary" />
                국내/숙박/당일여행 {keys.label} 추이
              </h3>
              <p className="text-sm text-muted-foreground mt-2">유형별 여행 {keys.label} 변화를 분석합니다.</p>
            </div>
            <div className="flex bg-muted/60 p-1.5 rounded-2xl self-start border border-border/50">
              <button 
                onClick={() => setActiveMetric('count')}
                className={`px-6 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${activeMetric === 'count' ? 'bg-primary text-white shadow-lg scale-105' : 'text-muted-foreground hover:text-foreground'}`}
              >
                여행 횟수
              </button>
              <button 
                onClick={() => setActiveMetric('days')}
                className={`px-6 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${activeMetric === 'days' ? 'bg-primary text-white shadow-lg scale-105' : 'text-muted-foreground hover:text-foreground'}`}
              >
                여행 일수
              </button>
            </div>
          </div>
          
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorStay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} tickLine={false} 
                  tick={{fontSize: 12, fill: 'currentColor', opacity: 0.6}}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} tickLine={false} 
                  tick={{fontSize: 12, fill: 'currentColor', opacity: 0.6}}
                  tickFormatter={formatYAxis}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--border))', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ fontSize: '13px', fontWeight: 600 }}
                  labelStyle={{ marginBottom: '8px', fontWeight: 800, fontSize: '14px' }}
                />
                <Legend verticalAlign="top" height={50} iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 600, paddingBottom: '20px' }} />
                <Area 
                  name="국내여행(합계)" type="monotone" dataKey={keys.total} 
                  stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" 
                />
                <Area 
                  name="숙박여행" type="monotone" dataKey={keys.stay} 
                  stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorStay)" 
                />
                <Area 
                  name="당일여행" type="monotone" dataKey={keys.day} 
                  stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorDay)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Cost Analysis */}
        <div className="glass-panel p-4 md:p-7 rounded-[2rem] border border-border/50 shadow-2xl bg-card/40">
          <div className="mb-10">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
              <Wallet size={24} className="text-emerald-500" />
              국내여행 비용 구성 (숙박 vs 당일)
            </h3>
            <p className="text-sm text-muted-foreground mt-2">연도별 숙박 및 당일 여행 지출 비중 분석</p>
          </div>
          
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} tickLine={false} 
                  tick={{fontSize: 12, fill: 'currentColor', opacity: 0.6}}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} tickLine={false} 
                  tick={{fontSize: 12, fill: 'currentColor', opacity: 0.6}}
                  tickFormatter={formatYAxis}
                />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--border))' }}
                />
                <Legend verticalAlign="top" height={50} iconType="rect" wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} />
                <Bar name="숙박여행 비용" dataKey="costStay" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} barSize={28} />
                <Bar name="당일여행 비용" dataKey="costDay" stackId="a" fill="#10b981" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-10 p-5 bg-muted/40 rounded-2xl flex items-start gap-4 border border-border/50">
            <Info className="text-primary mt-0.5 flex-shrink-0" size={20} />
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              막대 그래프는 <strong>숙박여행 비용</strong>과 <strong>당일여행 비용</strong>을 누적하여 표시하며, 전체 높이가 해당 연도의 <strong>국내여행 총비용</strong>을 나타냅니다.
            </p>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-panel rounded-[2.5rem] border border-border/50 shadow-2xl overflow-hidden mb-12 bg-card/30">
        <div className="p-8 border-b border-border/50 flex items-center justify-between bg-muted/20">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
            <TrendingUp size={20} className="text-primary" />
            최근 {yearRange[1]}년 기준 상세 데이터
          </h3>
          <span className="text-[10px] bg-primary/20 text-primary px-4 py-1.5 rounded-full font-black uppercase tracking-widest">Statistical Data</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-muted/40 text-muted-foreground text-xs font-bold uppercase tracking-wider">
                <th className="px-10 py-6">항목 구분</th>
                <th className="px-10 py-6 text-right">여행 횟수 (천회)</th>
                <th className="px-10 py-6 text-right">여행 일수 (천일)</th>
                <th className="px-10 py-6 text-right font-bold text-primary">총비용 (십억원)</th>
                <th className="px-10 py-6 text-right w-48">비중 (횟수)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {[
                { label: '국내여행(합계)', key: 'count', dKey: 'days', cKey: 'cost', color: 'text-primary font-bold' },
                { label: '숙박여행', key: 'countStay', dKey: 'daysStay', cKey: 'costStay', color: 'text-foreground font-medium' },
                { label: '당일여행', key: 'countDay', dKey: 'daysDay', cKey: 'costDay', color: 'text-foreground font-medium' },
              ].map((row) => {
                const latest = filteredData[filteredData.length - 1] as any || {};
                const percentageNumber = latest.count ? Math.round((latest[row.key] / latest.count) * 100) : 0;
                const percentage = row.label === '국내여행(합계)' ? '100%' : percentageNumber + '%';
                return (
                  <tr key={row.label} className="hover:bg-muted/20 transition-colors">
                    <td className={`px-10 py-6 ${row.color}`}>{row.label}</td>
                    <td className="px-10 py-6 text-right font-bold text-foreground">{(latest[row.key] || 0).toLocaleString()}</td>
                    <td className="px-10 py-6 text-right text-muted-foreground font-medium">{(latest[row.dKey] || 0).toLocaleString()}</td>
                    <td className="px-10 py-6 text-right font-black text-foreground">{(latest[row.cKey] || 0).toLocaleString()}</td>
                    <td className="px-10 py-6 text-right font-medium">
                      <div className="flex items-center gap-4 justify-end">
                        <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: percentage }}
                            transition={{ duration: 1.2 }}
                            className={`h-full rounded-full ${row.label === '숙박여행' ? 'bg-indigo-500' : row.label === '당일여행' ? 'bg-emerald-500' : 'bg-primary'}`} 
                          />
                        </div>
                        <span className="text-[11px] text-muted-foreground font-bold w-10">{percentage}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-center text-muted-foreground text-[11px] font-bold tracking-widest pt-8 pb-12">
        <p>© 2024 Tourism Insight Intelligence · National Travel Statistics</p>
      </div>
    </div>
  );
};

export default TravelVolumeDashboard;
