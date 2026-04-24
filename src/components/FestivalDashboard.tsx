import { useState, useMemo } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    AreaChart, Area, LabelList
} from 'recharts';
import { 
    CloudAlert, Map as MapIcon, Info, TrendingUp, Ghost, AlertTriangle, XCircle,
    Palette, History, Users, Leaf, Apple
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SouthKoreaMap from './SouthKoreaMap';

// --- 스태틱 데이터 정의 ---
const themeByRegionData = [
    { region: "서울", "문화예술": 42, "전통역사": 8, "주민화합": 12, "자연생태": 4, "지역특산물": 2, total: 68 },
    { region: "부산", "문화예술": 35, "전통역사": 10, "주민화합": 8, "자연생태": 5, "지역특산물": 3, total: 61 },
    { region: "대구", "문화예술": 18, "전통역사": 4, "주민화합": 6, "자연생태": 3, "지역특산물": 1, total: 32 },
    { region: "인천", "문화예술": 14, "전통역사": 3, "주민화합": 5, "자연생태": 2, "지역특산물": 2, total: 26 },
    { region: "광주", "문화예술": 12, "전통역사": 2, "주민화합": 3, "자연생태": 1, "지역특산물": 1, total: 19 },
    { region: "대전", "문화예술": 13, "전통역사": 2, "주민화합": 4, "자연생태": 2, "지역특산물": 2, total: 23 },
    { region: "울산", "문화예술": 16, "전통역사": 4, "주민화합": 5, "자연생태": 3, "지역특산물": 3, total: 31 },
    { region: "세종", "문화예술": 4, "전통역사": 1, "주민화합": 1, "자연생태": 1, "지역특산물": 0, total: 7 },
    { region: "경기", "문화예술": 78, "전통역사": 15, "주민화합": 25, "자연생태": 18, "지역특산물": 14, total: 150 },
    { region: "강원", "문화예술": 45, "전통역사": 18, "주민화합": 20, "자연생태": 42, "지역특산물": 28, total: 153 },
    { region: "충북", "문화예술": 22, "전통역사": 10, "주민화합": 12, "자연생태": 10, "지역특산물": 11, total: 65 },
    { region: "충남", "문화예술": 38, "전통역사": 16, "주민화합": 18, "자연생태": 15, "지역특산물": 29, total: 116 },
    { region: "전북", "문화예술": 32, "전통역사": 14, "주민화합": 15, "자연생태": 15, "지역특산물": 20, total: 96 },
    { region: "전남", "문화예술": 35, "전통역사": 18, "주민화합": 22, "자연생태": 25, "지역특산물": 30, total: 130 },
    { region: "경북", "문화예술": 38, "전통역사": 22, "주민화합": 20, "자연생태": 15, "지역특산물": 30, total: 125 },
    { region: "경남", "문화예술": 40, "전통역사": 15, "주민화합": 18, "자연생태": 12, "지역특산물": 24, total: 109 },
    { region: "제주", "문화예술": 15, "전통역사": 5, "주민화합": 10, "자연생태": 18, "지역특산물": 7, total: 55 },
];

const sspScenarios: Record<string, any> = {
    "SSP1-2.6": {
        name: "저탄소 시나리오 (지속가능)",
        color: "hsl(142, 71%, 45%)", // emerald/green
        extinctionRate: 8,
        description: "친환경 기술 발전으로 기후 변화를 억제함. 대부분의 자연형 축제가 일정을 소폭 조정하여 생존 가능한 경로.",
        data: [
            { year: '2026', extinction: 2, ecoRisk: 12 },
            { year: '2035', extinction: 4, ecoRisk: 16 },
            { year: '2045', extinction: 6, ecoRisk: 22 },
            { year: '2055', extinction: 8, ecoRisk: 28 },
        ]
    },
    "SSP2-4.5": {
        name: "중간 시나리오 (중도)",
        color: "hsl(217, 91%, 60%)", // blue
        extinctionRate: 24,
        description: "현재 수준의 노력이 계속될 경우. 남부 지방의 얼음 축제 및 일부 특산물 축제의 소멸 위험군 진입.",
        data: [
            { year: '2026', extinction: 3, ecoRisk: 12 },
            { year: '2035', extinction: 10, ecoRisk: 24 },
            { year: '2045', extinction: 18, ecoRisk: 38 },
            { year: '2055', extinction: 24, ecoRisk: 52 },
        ]
    },
    "SSP3-7.0": {
        name: "고탄소 시나리오 (지역 분할)",
        color: "hsl(38, 92%, 50%)", // amber
        extinctionRate: 58,
        description: "기후 대응 실패 시나리오. 절반 이상의 자연 자산 기반 축제가 주산지 북상 및 생태계 변화로 소멸.",
        data: [
            { year: '2026', extinction: 5, ecoRisk: 12 },
            { year: '2035', extinction: 20, ecoRisk: 32 },
            { year: '2045', extinction: 42, ecoRisk: 58 },
            { year: '2055', extinction: 58, ecoRisk: 78 },
        ]
    },
    "SSP5-8.5": {
        name: "최악 시나리오 (화석연료)",
        color: "hsl(0, 84%, 60%)", // red
        extinctionRate: 88,
        description: "최악의 상황. 대한민국 내 겨울/꽃 축제의 90% 가까이 소멸. 아열대 작물 중심의 전면적 개편 필수.",
        data: [
            { year: '2026', extinction: 8, ecoRisk: 12 },
            { year: '2035', extinction: 35, ecoRisk: 42 },
            { year: '2045', extinction: 65, ecoRisk: 75 },
            { year: '2055', extinction: 88, ecoRisk: 92 },
        ]
    }
};

const themes = [
    { id: '문화예술', color: 'hsl(239, 84%, 67%)', icon: Palette },
    { id: '전통역사', color: 'hsl(0, 84%, 60%)', icon: History },
    { id: '주민화합', color: 'hsl(263, 70%, 50%)', icon: Users },
    { id: '자연생태', color: 'hsl(142, 71%, 45%)', icon: Leaf },
    { id: '지역특산물', color: 'hsl(38, 92%, 50%)', icon: Apple },
];

// Removed gridMap in favor of SouthKoreaMap SVG component

const FestivalDashboard = () => {
    const [activeTab, setActiveTab] = useState<'distribution' | 'climate'>('distribution'); 
    const [selectedTheme, setSelectedTheme] = useState('자연생태');
    const [selectedSSP, setSelectedSSP] = useState('SSP5-8.5');

    const filteredData = useMemo(() => {
        return themeByRegionData.map(d => ({
            region: d.region,
            count: d[selectedTheme as keyof typeof d] as number,
            percentage: ((d[selectedTheme as keyof typeof d] as number / d.total) * 100).toFixed(1)
        })).sort((a, b) => b.count - a.count);
    }, [selectedTheme]);

    const currentSSP = sspScenarios[selectedSSP];

    const regionalExtinctionData = useMemo(() => {
        const rate = currentSSP.extinctionRate / 100;
        return themeByRegionData.map(d => {
            const riskFestivals = d["자연생태"] + d["지역특산물"];
            return {
                region: d.region,
                riskCount: riskFestivals,
                extinctionCount: Math.round(riskFestivals * rate),
            };
        }).sort((a, b) => b.extinctionCount - a.extinctionCount);
    }, [selectedSSP, currentSSP]);

    return (
        <div className="w-full text-foreground space-y-8">
            {/* Component Header Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold font-serif mb-2 flex items-center gap-2 text-foreground">
                        <CloudAlert className="text-primary w-8 h-8" />
                        지역축제 기후 위기 소멸 예측
                    </h2>
                    <p className="text-muted-foreground font-medium">SSP 시나리오에 따른 2055년 전국 축제 생존성 시뮬레이션</p>
                </div>
                
                <div className="flex p-1 bg-muted/30 backdrop-blur-md rounded-full border border-border/50 self-start">
                    <button 
                        onClick={() => setActiveTab('distribution')} 
                        className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeTab === 'distribution' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {activeTab === 'distribution' && (
                            <motion.div
                                layoutId="activeFestivalTab"
                                className="absolute inset-0 bg-background rounded-full shadow-sm border border-border/50"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">현황 분석</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('climate')} 
                        className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                            activeTab === 'climate' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {activeTab === 'climate' && (
                            <motion.div
                                layoutId="activeFestivalTab"
                                className="absolute inset-0 bg-background rounded-full shadow-sm border border-border/50"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">소멸 예측 (SSP)</span>
                    </button>
                </div>
            </div>

            {/* View Layer */}
            <div className="min-h-[600px]">
                {activeTab === 'distribution' ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Theme Selectors */}
                        <div className="flex flex-wrap gap-3">
                            {themes.map(theme => (
                                <button 
                                    key={theme.id} 
                                    onClick={() => setSelectedTheme(theme.id)} 
                                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 ${
                                        selectedTheme === theme.id 
                                        ? 'bg-card border-primary ring-2 ring-primary/20 shadow-md translate-y-[-2px]' 
                                        : 'bg-card/50 border-border/40 text-muted-foreground hover:border-primary/50'
                                    }`}
                                >
                                    <theme.icon className={`w-4 h-4 ${selectedTheme === theme.id ? 'text-primary' : 'text-muted-foreground'}`} />
                                    <span className={`text-sm font-bold ${selectedTheme === theme.id ? 'text-primary' : ''}`}>{theme.id}</span>
                                </button>
                            ))}
                        </div>

                        {/* Dash Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Left: Map & Insight */}
                            <div className="lg:col-span-6 space-y-6">
                                <section className="glass-panel p-6 rounded-3xl border border-border/30 overflow-hidden">
                                    <h3 className="text-lg font-bold mb-12 flex items-center gap-2 text-primary">
                                        <MapIcon className="w-5 h-5" /> 
                                        <span>전국 테마 분포 맵<span className="text-xs font-medium opacity-70 ml-1">(지역별 축제 밀집도 지리적 분포)</span></span>
                                    </h3>
                                    
                                    <div className="flex justify-center items-center py-2">
                                        <SouthKoreaMap 
                                            data={themeByRegionData.map(d => ({
                                                region: d.region,
                                                count: (d as any)[selectedTheme]
                                            }))}
                                            color={themes.find(t => t.id === selectedTheme)?.color || 'hsl(var(--primary))'}
                                        />
                                    </div>
                                </section>
                                
                                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 shadow-sm">
                                    <h4 className="text-base font-bold mb-3 flex items-center gap-2 text-primary">
                                        <Info className="w-5 h-5" /> 분석 인사이트
                                    </h4>
                                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                                        현재 <strong className="text-foreground">{selectedTheme}</strong> 테마의 단일 축제는 <strong className="text-foreground">{filteredData[0]?.region}</strong> 지역이 가장 높은 밀집도를 보유하고 있습니다. 향후 기후위기 민감도가 높은 생태 특화 테마의 경우, 지역별 미래 시나리오별 플랜B 수립이 필수적입니다.
                                    </p>
                                </div>
                            </div>

                            {/* Right: Bar Chart */}
                            <div className="lg:col-span-6 glass-panel p-6 md:p-8 rounded-3xl border border-border/30 h-[700px] flex flex-col">
                                <h3 className="text-lg font-bold mb-12 flex items-center gap-2 text-primary">
                                    <TrendingUp className="w-5 h-5" /> 지역별 테마 보유 집중도 현황
                                </h3>
                                <div className="flex-1 w-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={filteredData} layout="vertical" margin={{left: 20, right: 40}}>
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border) / 0.3)" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} width={60} interval={0} tick={{fontSize: 12, fontWeight: 600, fill: 'currentColor', opacity: 0.8}} />
                                            <Tooltip 
                                                cursor={{fill: 'hsl(var(--accent) / 0.1)'}} 
                                                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px' }}
                                                itemStyle={{ fontWeight: 'bold' }}
                                            />
                                            <Bar dataKey="count" fill={themes.find(t => t.id === selectedTheme)?.color || 'currentColor'} radius={[0, 8, 8, 0]} barSize={24}>
                                                <LabelList dataKey="count" position="right" style={{ fill: 'currentColor', fontSize: 12, fontWeight: 'bold', opacity: 0.9 }} offset={10} />
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* SSP Scenario Selectors */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.keys(sspScenarios).map((ssp) => (
                                <button 
                                    key={ssp} 
                                    onClick={() => setSelectedSSP(ssp)} 
                                    className={`p-5 rounded-2xl border transition-all text-left group ${
                                        selectedSSP === ssp 
                                        ? 'bg-card border-border shadow-lg translate-y-[-4px]' 
                                        : 'bg-card/40 border-transparent text-muted-foreground hover:bg-card hover:border-border/50'
                                    }`}
                                >
                                    <div className="font-black text-xl lg:text-2xl mb-1" style={{ color: selectedSSP === ssp ? sspScenarios[ssp].color : 'currentColor' }}>
                                        {ssp}
                                    </div>
                                    <div className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-60">Climate Path</div>
                                    <div className={`mt-3 text-sm font-bold ${selectedSSP === ssp ? 'text-foreground' : ''}`}>
                                        최종 소멸 예측: {sspScenarios[ssp].extinctionRate}%
                                    </div>
                                    <div 
                                        className="mt-3 w-full h-1.5 rounded-full overflow-hidden bg-muted"
                                    >
                                        <div 
                                            className="h-full transition-all duration-700" 
                                            style={{ width: `${sspScenarios[ssp].extinctionRate}%`, backgroundColor: sspScenarios[ssp].color }} 
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Climate Dashboard Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Left: Extinction Area Chart */}
                            <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl border border-border/30">
                                <div className="flex justify-between items-start mb-10">
                                    <div>
                                        <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: currentSSP.color }}>
                                            <Ghost className="w-6 h-6" /> {selectedSSP} 소멸률 가속 추이
                                        </h3>
                                        <p className="text-muted-foreground text-sm mt-1.5 font-bold">{currentSSP.name}</p>
                                    </div>
                                    <div className="text-4xl lg:text-5xl font-black font-sans" style={{ color: currentSSP.color }}>
                                        {currentSSP.extinctionRate}%
                                    </div>
                                </div>
                                <div className="h-64 lg:h-80 w-full mb-8">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={currentSSP.data}>
                                            <defs>
                                                <linearGradient id="colorEx" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={currentSSP.color} stopOpacity={0.4}/>
                                                    <stop offset="95%" stopColor={currentSSP.color} stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: 'currentColor'}} />
                                            <YAxis unit="%" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: 'currentColor'}} />
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.3)" />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px' }}
                                                itemStyle={{ fontWeight: 'bold' }}
                                            />
                                            <Area type="monotone" dataKey="extinction" name="생태축제 소멸비율" stroke={currentSSP.color} fill="url(#colorEx)" strokeWidth={4} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="p-5 bg-muted/30 rounded-xl border border-border/40 flex items-start gap-4">
                                    <AlertTriangle className="w-6 h-6 shrink-0" style={{ color: currentSSP.color }} />
                                    <p className="text-sm text-foreground font-medium leading-relaxed italic">
                                        "{currentSSP.description}"
                                    </p>
                                </div>
                            </div>

                            {/* Right: Regional Extinction Risk Bars */}
                            <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-3xl border border-border/30 flex flex-col h-[600px]">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-accent">
                                    <XCircle className="w-5 h-5" /> 지자체별 실질적 위험 축제 수
                                </h3>
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-5">
                                    {regionalExtinctionData.map((d) => (
                                        <div key={d.region} className="group">
                                            <div className="flex justify-between text-sm font-bold mb-2">
                                                <span className="text-foreground">{d.region}</span>
                                                <span className="font-black" style={{ color: currentSSP.color }}>
                                                    {d.extinctionCount} <span className="text-muted-foreground font-medium text-xs">/ {d.riskCount} 개</span>
                                                </span>
                                            </div>
                                            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full transition-all duration-1000 ease-in-out relative" 
                                                    style={{ 
                                                        width: `${d.riskCount === 0 ? 0 : (d.extinctionCount / d.riskCount) * 100}%`, 
                                                        backgroundColor: currentSSP.color,
                                                        opacity: 0.8
                                                    }} 
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default FestivalDashboard;
