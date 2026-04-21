import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { mockDashboardData, RegionType } from "@/data/mockData";
import { Users, TrendingUp, MapPin, BarChart3 } from "lucide-react";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--muted-foreground))'];

export default function DataDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<RegionType>('jeju');
  
  const regions: { id: RegionType; label: string }[] = [
    { id: 'jeju', label: '제주' },
    { id: 'seoul', label: '서울' },
    { id: 'busan', label: '부산' },
  ];

  const currentData = mockDashboardData[selectedRegion];

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold font-serif mb-2 flex items-center gap-2">
            <BarChart3 className="text-primary w-8 h-8" />
            관광 데이터 분석 인사이트
          </h2>
          <p className="text-muted-foreground">지역별 실시간 관광객 동향 및 인구통계학적 특성 (모의 데이터)</p>
        </div>
        
        {/* Tab Selection */}
        <div className="flex p-1 bg-muted/30 backdrop-blur-md rounded-full border border-border/50">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegion(region.id)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedRegion === region.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {selectedRegion === region.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-background rounded-full shadow-sm border border-border/50"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{region.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedRegion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Main Chart Area */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-6 md:p-8 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="flex items-center gap-2 text-accent mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-semibold">{currentData.name}</span>
                </div>
                <h3 className="text-xl font-bold">월별 방문자 추이</h3>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black font-sans">{currentData.totalVisitors}</div>
                <div className="text-sm text-primary flex items-center justify-end gap-1 font-bold mt-1">
                  <TrendingUp className="w-4 h-4" />
                  {currentData.growthRate} (전년비)
                </div>
              </div>
            </div>

            <div className="flex-1 w-full h-[300px] min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'currentColor', opacity: 0.5}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'currentColor', opacity: 0.5}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorVisitors)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Demographics Area */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-accent mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm font-semibold">Demographics</span>
              </div>
              <h3 className="text-xl font-bold mb-6">연령대별 방문 비율</h3>
            </div>
            
            <div className="flex-1 h-[200px] relative flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentData.demographics}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                    animationDuration={1000}
                  >
                    {currentData.demographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-2xl font-bold text-foreground">100%</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {currentData.demographics.map((demo, idx) => (
                <div key={demo.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <div className="text-sm text-muted-foreground">{demo.name}</div>
                  <div className="text-sm font-bold ml-auto">{demo.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
