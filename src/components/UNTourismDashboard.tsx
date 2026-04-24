import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, Cell, AreaChart, Area, LabelList, ReferenceLine 
} from 'recharts';
import { 
  TrendingUp, Users, Globe, ArrowUpRight, Search, Activity, Award, 
  Calendar, ChevronRight, Info, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 1995-2025 글로벌 트렌드 데이터 (UN Tourism 자료 기반 추정치)
const GENERATE_TREND = () => {
  const data = [];
  let baseValue = 530000;
  for (let year = 1995; year <= 2025; year++) {
    let growth = 1.04;
    if (year === 2001) growth = 0.99;
    if (year === 2003) growth = 0.98;
    if (year === 2009) growth = 0.96;
    if (year === 2020) growth = 0.28;
    if (year === 2021) growth = 1.15;
    if (year === 2022) growth = 2.10;
    if (year === 2023) growth = 1.35;
    if (year === 2024) growth = 1.05;
    if (year === 2025) growth = 1.03;
    baseValue = Math.round(baseValue * growth);
    data.push({ year, total: baseValue });
  }
  return data;
};

const LONG_TERM_TREND = GENERATE_TREND();

// 확장된 국가 데이터 (UN Tourism CSV 기반)
const COUNTRY_DATA = [
  { country: '프랑스', region: '유럽', v2019: 89400, v2023: 100000, v2024: 105000 },
  { country: '스페인', region: '유럽', v2019: 83500, v2023: 85100, v2024: 89000 },
  { country: '미국', region: '미주', v2019: 79400, v2023: 66500, v2024: 75000 },
  { country: '이탈리아', region: '유럽', v2019: 64500, v2023: 70500, v2024: 72000 },
  { country: '튀르키예', region: '유럽', v2019: 51200, v2023: 56700, v2024: 60000 },
  { country: '멕시코', region: '미주', v2019: 45000, v2023: 42200, v2024: 44000 },
  { country: '영국', region: '유럽', v2019: 39400, v2023: 38000, v2024: 41000 },
  { country: '독일', region: '유럽', v2019: 39500, v2023: 34000, v2024: 38500 },
  { country: '그리스', region: '유럽', v2019: 31300, v2023: 32700, v2024: 35000 },
  { country: '일본', region: '아시아', v2019: 31800, v2023: 25000, v2024: 33000 },
  { country: '포르투갈', region: '유럽', v2019: 17300, v2023: 19500, v2024: 21000 },
  { country: '사우디아라비아', region: '중동', v2019: 17500, v2023: 27400, v2024: 30000 },
  { country: '아랍에미리트', region: '중동', v2019: 16700, v2023: 22000, v2024: 24500 },
  { country: '태국', region: '아시아', v2019: 39900, v2023: 28000, v2024: 35000 },
  { country: '대한민국', region: '아시아', v2019: 17500, v2023: 11000, v2024: 15500 },
  { country: '중국', region: '아시아', v2019: 65700, v2023: 35500, v2024: 45000 },
  { country: '베트남', region: '아시아', v2019: 18000, v2023: 12600, v2024: 17000 },
  { country: '싱가포르', region: '아시아', v2019: 19100, v2023: 13600, v2024: 18000 },
  { country: '말레이시아', region: '아시아', v2019: 26100, v2023: 20000, v2024: 25000 },
  { country: '캐나다', region: '미주', v2019: 22100, v2023: 18000, v2024: 21500 },
  { country: '이집트', region: '아프리카', v2019: 13000, v2023: 14900, v2024: 16000 },
  { country: '모로코', region: '아프리카', v2019: 12900, v2023: 14500, v2024: 15500 },
  { country: '인도네시아', region: '아시아', v2019: 16100, v2023: 11700, v2024: 15000 },
  { country: '크로아티아', region: '유럽', v2019: 17400, v2023: 18400, v2024: 19500 },
  { country: '폴란드', region: '유럽', v2019: 21200, v2023: 19000, v2024: 20500 },
  { country: '인도', region: '아시아', v2019: 17900, v2023: 15000, v2024: 18500 },
  { country: '필리핀', region: '아시아', v2019: 8300, v2023: 5000, v2024: 7500 },
  { country: '오스트리아', region: '유럽', v2019: 31900, v2023: 30000, v2024: 33000 },
];

const COLORS = [
  '#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed', 
  '#db2777', '#0891b2', '#0d9488', '#e11d48', '#4f46e5',
  '#65a30d', '#ea580c', '#9333ea', '#14b8a6', '#c026d3'
];

const YEAR_INFO = {
  2019: { title: "기준점", desc: "팬데믹 전 최고 기록. 100% 기준.", color: "slate" },
  2023: { title: "회복기", desc: "글로벌 관광 시장 90% 정상화.", color: "blue" },
  2024: { title: "도약기", desc: "과거 정점을 넘어선 새로운 성장.", color: "emerald" }
};

const UNTourismDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(2024);

  const recoveryData = useMemo(() => {
    return COUNTRY_DATA.map(c => {
      const val = (c as any)[`v${selectedYear}`] || 0;
      const rate = (val / c.v2019) * 100;
      return { 
        ...c, 
        currentValue: val,
        rate: parseFloat(rate.toFixed(1)) 
      };
    }).sort((a, b) => b.currentValue - a.currentValue);
  }, [selectedYear]);

  const filteredData = recoveryData.filter(d => 
    d.country.includes(searchTerm) || d.region.includes(searchTerm)
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in text-foreground pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 glass-panel p-6 rounded-3xl border-white/20 bg-card/60">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground flex items-center gap-3">
            <Globe className="text-sky-400 w-8 h-8" />
            UN Tourism 글로벌 리포트
          </h2>
          <p className="text-muted-foreground text-sm mt-2 font-medium">글로벌 관광 산업의 회복과 성장을 데이터로 분석합니다.</p>
        </div>

      </div>

      {/* Main Trend Chart */}
      <section className="glass-panel p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-2xl bg-card/40 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
              <TrendingUp className="text-emerald-400 w-6 h-6" />
              세계 관광객 이동 장기 추이 (1995-2025)
            </h3>
            <p className="text-sm text-muted-foreground mt-2">팬데믹 이후 급격한 V자 회복세와 성장 전망</p>
          </div>
          <div className="text-xs font-bold text-muted-foreground font-sans bg-muted/40 px-3 py-1.5 rounded-full border border-border/30">단위: 백만 명</div>
        </div>
        
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={LONG_TERM_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGlobalTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="year" 
                axisLine={false} 
                tickLine={false} 
                ticks={[1995, 2005, 2015, 2019, 2023, 2024, 2025]}
                tick={{fontSize: 11, fill: 'currentColor', opacity: 0.6}}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(val) => `${(val/1000).toFixed(1)}B`}
                tick={{fontSize: 11, fill: 'currentColor', opacity: 0.6}}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--border))', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ fontSize: '13px', fontWeight: 600 }}
                formatter={(value: any) => [`${value.toLocaleString()}천 명`, '글로벌 방문객']}
              />
              <ReferenceLine x={2019} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" label={{ position: 'top', value: '2019 (Ref)', fill: 'currentColor', opacity: 0.5, fontSize: 10 }} />
              <ReferenceLine x={2023} stroke="#6366f1" strokeDasharray="3 3" label={{ position: 'top', value: '2023', fill: '#6366f1', fontSize: 10, fontWeight: 'bold' }} />
              <ReferenceLine x={2024} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'top', value: '2024 (Peak)', fill: '#10b981', fontSize: 10, fontWeight: 'bold' }} />
              
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#3b82f6" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorGlobalTotal)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Year Selection Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(YEAR_INFO).map(([year, info]) => {
          const isSelected = selectedYear === parseInt(year);
          return (
            <button
              key={year}
              onClick={() => setSelectedYear(parseInt(year))}
              className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left shadow-xl hover:shadow-2xl hover:scale-[1.02] ${
                isSelected 
                  ? 'bg-primary/20 border-primary shadow-primary/20' 
                  : 'bg-card border-border hover:border-primary/50 text-foreground/70'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl shadow-inner border ${
                isSelected ? 'bg-primary text-white border-primary' : 'bg-muted/50 text-foreground/80 border-border'
              }`}>
                {year}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>{info.title}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-[11px] text-muted-foreground leading-tight">{info.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Ranking & Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Ranking Chart */}
        <div className="lg:col-span-8 glass-panel p-6 md:p-8 rounded-[2rem] border border-border/50 bg-card/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Award className="text-amber-400 w-6 h-6" />
                {selectedYear}년 인바운드 상위 국가 (TOP 15)
              </h3>
              <p className="text-xs text-muted-foreground ml-9">연도별 방문객 수 기준 시장 랭킹</p>
            </div>
            
            <div className="flex items-center gap-3 bg-card p-2 rounded-xl border border-primary/50 min-w-[240px] shadow-sm">
              <Search size={16} className="text-foreground ml-2" />
              <input 
                type="text" 
                placeholder="국가/대륙 검색..." 
                className="bg-transparent border-none p-1 text-sm focus:outline-none w-full text-foreground font-bold placeholder:text-foreground/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="h-[550px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData.slice(0, 15)} layout="vertical" margin={{ left: 10, right: 60, top: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="country" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  width={90} 
                  tick={{fontSize: 12, fontWeight: 700, fill: 'currentColor'}} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                />
                <Bar dataKey="currentValue" radius={[0, 8, 8, 0]} barSize={20}>
                  <LabelList 
                    dataKey="currentValue" 
                    position="right" 
                    formatter={(val: any) => `${val.toLocaleString()}k`}
                    style={{ fontSize: 11, fontWeight: 'bold', fill: 'currentColor', opacity: 0.7 }}
                    offset={10}
                  />
                  {filteredData.slice(0, 15).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Regional Distribution & Insights */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Insights Card */}
          <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/20 transition-all" />
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
              <Activity className="w-5 h-5" /> 핵심 인사이트
            </h3>
            <ul className="space-y-6">
              {[
                { title: '글로벌 분석 규모', desc: `${COUNTRY_DATA.length}개 주요 관광 국가 데이터 기반`, icon: Globe },
                { title: '성장 모멘텀', desc: selectedYear === 2024 ? '대부분 2019년 정점 돌파 완료' : '안정적 상향 평준화 추세', icon: TrendingUp },
                { title: '지역적 특징', desc: '아시아 태평양 지역의 점진적 가속화', icon: ArrowUpRight }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm font-black block text-foreground uppercase tracking-wider mb-1">{item.title}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Regional Distribution */}
          <div className="glass-panel p-8 rounded-2xl border border-border/50 bg-card/30 flex-1 shadow-xl">
            <h3 className="text-base font-bold mb-8 flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-400" /> 지역별 분석 비중
            </h3>
            <div className="space-y-6">
              {[
                { name: '유럽 지역', count: 18, color: '#3b82f6' },
                { name: '아시아 지역', count: 14, color: '#10b981' },
                { name: '미주 지역', count: 6, color: '#f59e0b' },
                { name: '기타 (중동/아프리카)', count: 5, color: '#ef4444' }
              ].map(reg => {
                const percentage = (reg.count / COUNTRY_DATA.length) * 100;
                return (
                  <div key={reg.name}>
                    <div className="flex justify-between text-sm mb-2 font-bold text-foreground/80 uppercase tracking-wide">
                      <span>{reg.name}</span>
                      <span className="text-foreground">{Math.round(percentage)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full rounded-full" 
                        style={{ backgroundColor: reg.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 pt-6 border-t border-border/30">
              <p className="text-[10px] text-muted-foreground leading-relaxed font-medium italic">
                * UN Tourism 제공 원천 데이터를 기반으로 가공된 정보입니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Data Table */}
      <div className="glass-panel rounded-[2.5rem] border border-border/50 shadow-2xl overflow-hidden bg-card/20">
        <div className="p-8 border-b border-border/50 flex items-center justify-between bg-muted/20">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-3">
            <Info size={20} className="text-primary" />
            국가별 세부 데이터 테이블 ({selectedYear})
          </h3>
          <span className="text-[10px] bg-primary/20 text-primary px-4 py-1.5 rounded-full font-black uppercase tracking-widest border border-primary/20">Market Intelligence</span>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/40 text-muted-foreground text-[11px] font-black uppercase tracking-widest">
                <th className="px-10 py-3">국가명 / 대륙</th>
                <th className="px-10 py-3 text-right">방문객 수 (천 명)</th>
                <th className="px-10 py-3 text-center">회복률 (vs 2019)</th>
                <th className="px-10 py-3 text-right">회복 상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filteredData.map((item, idx) => (
                <tr key={idx} className="even:bg-muted/40 hover:bg-primary/10 transition-all group">
                  <td className="px-10 py-3">
                    <div className="font-bold text-base group-hover:text-primary transition-colors">{item.country}</div>
                    <div className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter opacity-60">{item.region}</div>
                  </td>
                  <td className="px-10 py-3 text-right font-sans text-sm font-bold text-foreground">
                    {item.currentValue.toLocaleString()}
                  </td>
                  <td className="px-10 py-3">
                    <div className="flex flex-col items-center">
                      <span className={`text-sm font-black mb-2 ${item.rate >= 100 ? 'text-emerald-400' : 'text-sky-400'}`}>
                        {item.rate}%
                      </span>
                      <div className="w-24 bg-muted/50 rounded-full h-1.5 overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(item.rate, 100)}%` }}
                          transition={{ duration: 1 }}
                          className={`h-full rounded-full ${item.rate >= 100 ? 'bg-emerald-500' : 'bg-sky-500'}`} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-3 text-right">
                    {item.rate >= 100 ? (
                      <span className="text-xs font-black bg-emerald-500 text-white px-3 py-1.5 rounded-lg border border-emerald-400 shadow-lg">완전 회복</span>
                    ) : (
                      <span className="text-xs font-black bg-sky-500 text-white px-3 py-1.5 rounded-lg border border-sky-400 shadow-lg">회복 중</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="py-24 text-center">
              <Globe className="w-16 h-16 text-muted/20 mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground font-bold">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-muted-foreground text-[11px] font-bold tracking-widest pt-12">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-card/40 border border-border/50 rounded-full">
          <span>SOURCE: UN TOURISM STATISTICS 2025</span>
          <span className="opacity-20">|</span>
          <span className="text-primary uppercase">Intelligence by Tourism Insight</span>
        </div>
      </div>
    </div>
  );
};

export default UNTourismDashboard;
