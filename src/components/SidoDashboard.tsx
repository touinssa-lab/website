import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { REGIONS } from './SouthKoreaMap';

// ============================================================
// STATIC DATA (From dashboard_sido.html)
// ============================================================
const TYPES = ['역사', '자연', '휴양', '문화', '체험', '레포츠', '숙박', '기타'];
const SIDOS = [
  '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시',
  '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주특별자치도'
];

const COUNT: Record<string, number[]> = {
  '서울특별시': [163, 41, 155, 161, 63, 0, 2, 100],
  '부산광역시': [54, 54, 51, 33, 24, 0, 0, 51],
  '대구광역시': [58, 21, 43, 28, 29, 0, 0, 39],
  '인천광역시': [59, 114, 36, 40, 19, 3, 0, 19],
  '광주광역시': [15, 6, 12, 12, 5, 0, 0, 6],
  '대전광역시': [32, 16, 26, 19, 12, 0, 0, 11],
  '울산광역시': [37, 38, 20, 10, 19, 1, 0, 7],
  '세종특별자치시': [12, 5, 11, 3, 2, 0, 0, 3],
  '경기도': [328, 234, 303, 173, 144, 8, 0, 70],
  '강원도': [177, 340, 78, 101, 99, 28, 20, 57],
  '충청북도': [178, 110, 49, 37, 41, 3, 2, 19],
  '충청남도': [250, 222, 67, 60, 43, 1, 0, 23],
  '전라북도': [322, 148, 69, 58, 41, 2, 1, 6],
  '전라남도': [294, 374, 94, 100, 64, 4, 2, 41],
  '경상북도': [284, 174, 75, 46, 45, 3, 1, 21],
  '경상남도': [311, 271, 115, 91, 79, 4, 1, 42],
  '제주특별자치도': [46, 213, 50, 67, 56, 11, 2, 10]
};

const LQ: Record<string, number[]> = {
  '서울특별시': [0.79, 0.22, 1.57, 1.97, 1.02, 0.00, 0.82, 2.42],
  '부산광역시': [0.67, 0.74, 1.33, 1.04, 1.00, 0.00, 0.00, 3.17],
  '대구광역시': [0.88, 0.35, 1.37, 1.08, 1.47, 0.00, 0.00, 2.97],
  '인천광역시': [0.68, 1.44, 0.86, 1.16, 0.73, 1.32, 0.00, 1.09],
  '광주광역시': [0.89, 0.39, 1.49, 1.79, 0.99, 0.00, 0.00, 1.78],
  '대전광역시': [0.92, 0.50, 1.56, 1.37, 1.15, 0.00, 0.00, 1.57],
  '울산광역시': [0.93, 1.05, 1.05, 0.63, 1.60, 0.97, 0.00, 0.88],
  '세종특별자치시': [1.11, 0.51, 2.12, 0.70, 0.62, 0.00, 0.00, 1.38],
  '경기도': [0.86, 0.68, 1.67, 1.15, 1.27, 0.81, 0.00, 0.92],
  '강원도': [0.65, 1.38, 0.60, 0.94, 1.22, 3.98, 6.24, 1.05],
  '충청북도': [1.35, 0.92, 0.77, 0.71, 1.04, 0.87, 1.28, 0.72],
  '충청남도': [1.25, 1.22, 0.70, 0.75, 0.72, 0.19, 0.00, 0.57],
  '전라북도': [1.65, 0.84, 0.74, 0.75, 0.70, 0.40, 0.43, 0.15],
  '전라남도': [1.00, 1.40, 0.67, 0.86, 0.73, 0.53, 0.58, 0.70],
  '경상북도': [1.45, 0.98, 0.80, 0.59, 0.77, 0.59, 0.43, 0.54],
  '경상남도': [1.13, 1.08, 0.87, 0.83, 0.96, 0.56, 0.31, 0.76],
  '제주특별자치도': [0.34, 1.71, 0.76, 1.23, 1.36, 3.09, 1.23, 0.36]
};

const RATIO: Record<string, number[]> = {
  '서울특별시': [23.8, 6.0, 22.6, 23.5, 9.2, 0.0, 0.3, 14.6],
  '부산광역시': [20.2, 20.2, 19.1, 12.4, 9.0, 0.0, 0.0, 19.1],
  '대구광역시': [26.6, 9.6, 19.7, 12.8, 13.3, 0.0, 0.0, 17.9],
  '인천광역시': [20.3, 39.3, 12.4, 13.8, 6.6, 1.0, 0.0, 6.6],
  '광주광역시': [26.8, 10.7, 21.4, 21.4, 8.9, 0.0, 0.0, 10.7],
  '대전광역시': [27.6, 13.8, 22.4, 16.4, 10.3, 0.0, 0.0, 9.5],
  '울산광역시': [28.0, 28.8, 15.2, 7.6, 14.4, 0.8, 0.0, 5.3],
  '세종특별자치시': [33.3, 13.9, 30.6, 8.3, 5.6, 0.0, 0.0, 8.3],
  '경기도': [26.0, 18.6, 24.0, 13.7, 11.4, 0.6, 0.0, 5.6],
  '강원도': [19.7, 37.8, 8.7, 11.2, 11.0, 3.1, 2.2, 6.3],
  '충청북도': [40.5, 25.1, 11.2, 8.4, 9.3, 0.7, 0.5, 4.3],
  '충청남도': [37.5, 33.3, 10.1, 9.0, 6.5, 0.2, 0.0, 3.5],
  '전라북도': [49.8, 22.9, 10.7, 9.0, 6.3, 0.3, 0.2, 0.9],
  '전라남도': [30.2, 38.4, 9.7, 10.3, 6.6, 0.4, 0.2, 4.2],
  '경상북도': [43.8, 26.8, 11.6, 7.1, 6.9, 0.5, 0.2, 3.2],
  '경상남도': [34.0, 29.6, 12.6, 10.0, 8.6, 0.4, 0.1, 4.6],
  '제주특별자치도': [10.1, 46.8, 11.0, 14.7, 12.3, 2.4, 0.4, 2.2]
};

const VISITOR: Record<string, number[]> = {
  '서울특별시': [14.6, 9.0, 25.5, 16.8, 22.6, 0.0, 0.0, 11.4],
  '부산광역시': [6.8, 28.5, 24.4, 9.3, 19.1, 0.0, 0.0, 11.9],
  '대구광역시': [5.4, 8.8, 29.0, 12.8, 29.5, 0.0, 0.0, 14.4],
  '인천광역시': [6.0, 41.2, 19.6, 8.9, 5.1, 0.2, 0.0, 19.0],
  '광주광역시': [6.8, 21.7, 21.3, 14.2, 19.9, 0.0, 0.0, 16.1],
  '대전광역시': [10.2, 7.6, 26.1, 11.6, 26.3, 0.0, 0.0, 18.4],
  '울산광역시': [16.5, 40.2, 18.7, 5.5, 14.4, 0.1, 0.0, 4.7],
  '세종특별자치시': [5.3, 14.5, 53.5, 2.2, 0.6, 0.0, 0.0, 23.9],
  '경기도': [12.7, 20.5, 37.9, 8.8, 11.9, 0.8, 0.0, 7.3],
  '강원도': [7.3, 49.8, 13.2, 5.9, 10.5, 2.4, 2.4, 8.5],
  '충청북도': [23.4, 33.7, 17.4, 5.5, 6.1, 0.8, 1.5, 11.6],
  '충청남도': [17.4, 44.3, 20.5, 5.5, 5.6, 0.1, 0.0, 6.7],
  '전라북도': [26.3, 34.3, 15.5, 10.8, 10.8, 1.1, 0.0, 1.2],
  '전라남도': [14.5, 45.5, 20.2, 8.1, 6.3, 0.2, 0.3, 5.0],
  '경상북도': [31.3, 32.7, 19.4, 6.5, 3.7, 0.0, 0.0, 6.4],
  '경상남도': [15.7, 45.2, 14.2, 6.7, 9.7, 0.3, 0.2, 8.1],
  '제주특별자치도': [7.6, 52.9, 12.2, 9.4, 8.4, 2.1, 1.4, 5.9]
};

const GROUPS = [
  { tag: 'A', name: '자연·레저 복합형', def: '자연 LQ ≥ 1.2 + 레포츠/숙박 동시 특화', sidos: ['강원도', '제주특별자치도', '인천광역시'], color: '#4A7C59' },
  { tag: 'B', name: '자연·역사 복합형', def: '자연·역사 양쪽 LQ ≥ 1.2', sidos: ['충청남도'], color: '#C9A961' },
  { tag: 'C', name: '자연 특화형', def: '자연 LQ ≥ 1.2 (레저 약함)', sidos: ['전라남도'], color: '#5B7C99' },
  { tag: 'D', name: '역사 특화형', def: '역사 LQ ≥ 1.2 (자연 약함)', sidos: ['충청북도', '전라북도', '경상북도'], color: '#B85C3C' },
  { tag: 'E', name: '도시·소비 특화형', def: '휴양/문화/체험/기타 도시형 자원 특화', sidos: ['서울특별시', '부산광역시', '대구광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시', '경기도'], color: '#6B5B95' },
  { tag: 'F', name: '균형형', def: '모든 LQ < 1.2 (뚜렷한 특화 없음)', sidos: ['경상남도'], color: '#8B8680' }
];

const SHORT: Record<string, string> = {
  '서울특별시': '서울', '부산광역시': '부산', '대구광역시': '대구', '인천광역시': '인천', '광주광역시': '광주',
  '대전광역시': '대전', '울산광역시': '울산', '세종특별자치시': '세종', '경기도': '경기', '강원도': '강원',
  '충청북도': '충북', '충청남도': '충남', '전라북도': '전북', '전라남도': '전남', '경상북도': '경북', '경상남도': '경남',
  '제주특별자치도': '제주'
};

const TYPE_COLORS: Record<string, string> = {
  '역사': '#B85C3C', '자연': '#4A7C59', '휴양': '#5B7C99', '문화': '#6B5B95',
  '체험': '#C9A961', '레포츠': '#2D5F8F', '숙박': '#6F4E37', '기타': '#8B8680'
};

const SIDO_GROUP: Record<string, any> = {};
GROUPS.forEach(g => g.sidos.forEach(s => SIDO_GROUP[s] = g));

// ============================================================
// COMPONENT
// ============================================================
const SidoDashboard = () => {
  const [currentView, setCurrentView] = useState<'lq' | 'ratio' | 'visitor' | 'count'>('lq');
  const [selectedSido, setSelectedSido] = useState('서울특별시');
  const [chartMode, setChartMode] = useState<'count' | 'visitor'>('count');

  // Heatmap Color Helper
  const lerpColor = (t: number, low: string, mid: string, high: string) => {
    const hexToRgb = (h: string) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const a = hexToRgb(low), b = hexToRgb(mid), c = hexToRgb(high);
    if (t < 0.5) {
      const k = t * 2;
      return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`;
    } else {
      const k = (t - 0.5) * 2;
      return `rgb(${b.map((v, i) => Math.round(v + (c[i] - v) * k)).join(',')})`;
    }
  };

  const getCellColor = (view: string, val: number) => {
    if (view === 'lq') {
      const t = Math.max(0, Math.min(1, val / 3));
      return lerpColor(t, '#8B5A4F', '#E8DDD0', '#4A7C59');
    } else if (view === 'count') {
      const t = Math.max(0, Math.min(1, Math.log10(val + 1) / Math.log10(400)));
      return lerpColor(t, '#FAF7F2', '#C9B8A0', '#5B4434');
    } else {
      const t = Math.max(0, Math.min(1, val / 50));
      return lerpColor(t, '#FAF7F2', '#C9A961', '#8B2635');
    }
  };

  const getTextColor = (bgRgb: string) => {
    const m = bgRgb.match(/\d+/g);
    if (!m) return '#1A1A1A';
    const lum = (parseInt(m[0]) + parseInt(m[1]) + parseInt(m[2])) / 3;
    return lum < 130 ? '#FFFFFF' : '#1A1A1A';
  };

  // Chart Data
  const chartData = useMemo(() => {
    const data = chartMode === 'count' ? COUNT[selectedSido] : VISITOR[selectedSido];
    return TYPES.map((t, i) => ({
      name: t,
      value: data[i],
      color: TYPE_COLORS[t]
    }));
  }, [selectedSido, chartMode]);

  const sidoInfo = useMemo(() => {
    const g = SIDO_GROUP[selectedSido];
    const lqVals = LQ[selectedSido];
    const cnt = COUNT[selectedSido].reduce((a, b) => a + b, 0);
    const ranked = TYPES.map((t, i) => ({ t, lq: lqVals[i] }))
                        .sort((a, b) => b.lq - a.lq);
    const p1 = ranked[0].lq >= 1.2 ? ranked[0] : null;
    const p2 = ranked[1].lq >= 1.2 ? ranked[1] : null;
    return { g, cnt, p1, p2, lowest: ranked[ranked.length - 1] };
  }, [selectedSido]);

  return (
    <div className="bg-[#FAF7F2] text-[#1A1A1A] font-sans p-2 md:p-8 rounded-3xl border border-[#D8D2C4] shadow-sm max-w-[1240px] mx-auto overflow-hidden">
      {/* Hero Section */}
      <header className="border-b border-[#D8D2C4] pb-12 mb-16 relative">
        <div className="h-[2px] bg-[#1A1A1A] absolute top-0 left-0 right-0" />
        
        {/* Background Map SVG */}
        <motion.div 
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 0.15, x: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="absolute top-0 right-0 w-[570px] h-[675px] pointer-events-none -mr-32 -mt-16 overflow-hidden hidden lg:block"
        >
          <svg viewBox="0 0 550 600" className="w-full h-full">
            {REGIONS.map(r => (
              <path key={r.id} d={r.path} fill="none" stroke="#1A1A1A" strokeWidth="1.2" />
            ))}
          </svg>
        </motion.div>
        <div className="flex justify-between items-baseline text-[11px] tracking-[0.16em] uppercase text-[#4A4A4A] mt-2 mb-9">
          <span className="flex items-center"><span className="w-1.5 h-1.5 bg-[#B85C3C] rounded-full mr-2" />Tourism Resource Analysis · 2022.01–2024.12</span>
          <span className="hidden md:inline">Korea Tourism Organization · POI Dataset</span>
        </div>
        <div className="text-[16px] tracking-[0.28em] uppercase text-[#B85C3C] font-semibold mb-4">시도 단위 분류 분석 · Volume I</div>
        <h1 className="flex flex-col mb-12 relative">
          <span className="block text-4xl md:text-6xl font-extrabold tracking-[-0.045em] leading-[1.1] z-10">
            관광자원 시도별
          </span>
          <span className="block self-end font-serif italic font-medium text-[#B85C3C] text-4xl md:text-8xl tracking-[-0.03em] leading-[1.0] -mt-8 md:-mt-18 mr-0 md:mr-40">
            속성·비율 분석
          </span>
        </h1>
        <p className="text-base leading-[1.55] text-[#4A4A4A] max-w-[850px] mb-9">
          전국 8,703개 KTO POI를 시도 17개 단위로 집계해 자원 유형 구성·특화도(LQ)·방문자수 패턴을 분석한 결과,<br />
          <strong className="text-[#1A1A1A] font-semibold">자원 LQ 휴리스틱(LQ ≥ 1.2)에 기반한 6개 자원특성 그룹</strong>으로 시도를 분류하고 진단한다.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-[#1A1A1A]">
          {[
            { n: '8,703', u: '개', l: 'Total POI' },
            { n: '17', u: '개 시도', l: 'Administrative Regions' },
            { n: '36', u: '개월', l: 'Visitor Period' },
            { n: '6', u: '개 그룹', l: 'Resource Profile Types' }
          ].map((k, i) => (
            <div key={i} className={`p-6 border-r border-[#D8D2C4] ${i === 3 ? 'md:border-r-0' : ''}`}>
              <div className="font-serif text-6xl font-bold tracking-tight text-[#2D5F8F]">{k.n}<span className="text-lg text-[#4A4A4A] ml-1 font-normal">{k.u}</span></div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-[#8B8680] mt-2.5">{k.l}</div>
            </div>
          ))}
        </div>
      </header>

      {/* Section 1: Groups */}
      <section className="mb-24 pb-24 border-b border-[#D8D2C4]">
        <div className="grid md:grid-cols-[180px_1fr] gap-12 mb-12 items-start">
          <div className="font-serif italic text-8xl text-[#B85C3C] font-medium leading-[0.9]">01<small className="block text-[15px] tracking-[0.2em] uppercase text-[#8B8680] mt-2 not-italic font-sans">자원특성 그룹</small></div>
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 font-sans">LQ 패턴으로 본<br />시도 자원 포트폴리오 6유형</h2>
            <p className="text-lg text-[#4A4A4A] max-w-[870px]">자원특화도(Location Quotient)를 기준으로 시도를 6개 그룹으로 분류했다. 광역시는 도시·소비 인프라 자원에, 도(道) 단위는 역사·자연 자원에 각각 특화되는 구조다.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GROUPS.map((g, i) => (
            <motion.div 
              key={g.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)' }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-[#D8D2C4] p-7 pb-8 relative group cursor-pointer transition-shadow"
            >
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: g.color }} />
              <div className="font-serif text-sm font-bold tracking-[0.05em] mb-3" style={{ color: g.color }}>Group {g.tag}</div>
              <div className="text-2xl font-extrabold tracking-tight mb-3">{g.name}</div>
              <div className="text-[13.5px] text-[#4A4A4A] leading-[1.55] mb-4.5 min-h-[42px]">{g.def}</div>
              <div className="text-sm pt-3.5 border-t border-[#D8D2C4]">
                <span className="block text-[10px] tracking-[0.2em] uppercase text-[#8B8680] mb-1.5">시도 ({g.sidos.length})</span>
                {g.sidos.map(s => SHORT[s]).join(', ')}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 2: Heatmap */}
      <section className="mb-24 pb-24 border-b border-[#D8D2C4]">
        <div className="grid md:grid-cols-[180px_1fr] gap-12 mb-12 items-start">
          <div className="font-serif italic text-8xl text-[#B85C3C] font-medium leading-[0.9]">02<small className="block text-[15px] tracking-[0.2em] uppercase text-[#8B8680] mt-2 not-italic font-sans">특화도 매트릭스</small></div>
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 font-sans">17 시도 × 8 자원유형<br />특화도 히트맵</h2>
            <p className="text-lg text-[#4A4A4A] max-w-[870px]">LQ 1.0이 전국 평균 수준. 1.2 이상이면 특화로 해석한다. 강원의 숙박 LQ 6.24와 레포츠 3.98이 압도적 — 사실상 단일 체류·레저 클러스터로 작동.</p>
          </div>
        </div>
        
        <div className="bg-white border border-[#D8D2C4] p-8">

          <div className="flex flex-wrap gap-2 mb-6 items-center">
            <span className="text-[11px] tracking-[0.18em] uppercase text-[#8B8680] mr-2">View</span>
            {[
              { id: 'lq', label: '자원 특화도 LQ' },
              { id: 'ratio', label: '시도내 비율(%)' },
              { id: 'visitor', label: '방문자수 비율(%)' },
              { id: 'count', label: '자원수(개소)' }
            ].map(v => (
              <button 
                key={v.id}
                onClick={() => setCurrentView(v.id as any)}
                className={`px-4 py-2 border text-[12px] font-medium tracking-[0.06em] transition-all ${currentView === v.id ? 'bg-[#1A1A1A] text-[#FAF7F2] border-[#1A1A1A]' : 'bg-transparent border-[#D8D2C4] text-[#4A4A4A] hover:border-[#1A1A1A]'}`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px] grid grid-cols-[100px_repeat(8,1fr)] gap-[2px]">
              <div />
              {TYPES.map(t => (
                <div key={t} className="p-3 text-center font-bold text-[11px] tracking-[0.04em] border-b border-[#1A1A1A] pb-3.5" style={{ color: TYPE_COLORS[t] }}>{t}</div>
              ))}
              {SIDOS.map(sido => (
                <React.Fragment key={sido}>
                  <div className="p-3 text-right font-semibold text-[12.5px] pr-4 self-center cursor-pointer hover:text-[#B85C3C]" onClick={() => setSelectedSido(sido)}>{SHORT[sido]}</div>
                  {TYPES.map((t, j) => {
                    const data = currentView === 'lq' ? LQ : currentView === 'ratio' ? RATIO : currentView === 'visitor' ? VISITOR : COUNT;
                    const val = data[sido][j];
                    const bg = getCellColor(currentView, val);
                    return (
                      <div 
                        key={j} 
                        className="p-3 text-center font-serif font-bold text-[14px] flex items-center justify-center min-h-[44px] transition-transform hover:scale-105 hover:z-10 hover:shadow-[0_0_0_2px_#1A1A1A] cursor-help"
                        style={{ backgroundColor: bg, color: getTextColor(bg) }}
                        title={`${sido} ${t}: ${currentView === 'lq' ? val.toFixed(2) : val.toLocaleString()}`}
                      >
                        {currentView === 'lq' ? val.toFixed(2) : val.toLocaleString()}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Detail Charts */}
      <section className="mb-24">
        <div className="grid md:grid-cols-[180px_1fr] gap-12 mb-12 items-start">
          <div className="font-serif italic text-8xl text-[#B85C3C] font-medium leading-[0.9]">03<small className="block text-[15px] tracking-[0.2em] uppercase text-[#8B8680] mt-2 not-italic font-sans">시도별 상세</small></div>
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 font-sans">시도를 선택해<br />자원 구성을 확인하세요</h2>
            <p className="text-lg text-[#4A4A4A] max-w-[870px]">각 시도의 자원 수 구성, 방문자수 비중, 특화 유형을 확인할 수 있다. 자원 수와 방문자수 비중을 비교하면 공급-수요 미스매치도 함께 진단할 수 있다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
          {/* Chart Panel */}
          <div className="bg-white border border-[#D8D2C4] p-7">
            <div className="text-[12px] tracking-[0.2em] uppercase text-[#8B8680] font-bold mb-1">Resource Composition</div>
            <div className="font-serif text-2xl font-bold tracking-tight mb-6">{selectedSido} — {chartMode === 'count' ? '자원유형 분포' : '방문자 비중'}</div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D8D2C4" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#1A1A1A' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontStyle: 'italic', fill: '#8B8680' }} />
                  <Tooltip cursor={{ fill: '#F2EDE4' }} contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #1A1A1A', borderRadius: '0' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.9} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 pt-5 border-t border-[#D8D2C4] flex gap-2">
              <button 
                onClick={() => setChartMode('count')}
                className={`px-4 py-2 border text-[12px] font-medium transition-all ${chartMode === 'count' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-transparent border-[#D8D2C4] hover:border-[#1A1A1A]'}`}
              >
                자원수 (개소)
              </button>
              <button 
                onClick={() => setChartMode('visitor')}
                className={`px-4 py-2 border text-[12px] font-medium transition-all ${chartMode === 'visitor' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-transparent border-[#D8D2C4] hover:border-[#1A1A1A]'}`}
              >
                방문자수 비중 (%)
              </button>
            </div>
          </div>

          {/* Region Details Panel */}
          <div className="bg-white border border-[#D8D2C4] p-7">
            <div className="text-[12px] tracking-[0.2em] uppercase text-[#8B8680] font-bold mb-1">Region Selector</div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-1 mb-6">
              {SIDOS.map(s => (
                <button 
                  key={s}
                  onClick={() => setSelectedSido(s)}
                  className={`py-2.5 px-2 text-[12.5px] font-medium transition-all ${selectedSido === s ? 'bg-[#1A1A1A] text-[#FAF7F2] font-bold' : 'bg-[#F2EDE4] hover:bg-white border border-transparent hover:border-[#D8D2C4]'}`}
                >
                  {SHORT[s]}
                </button>
              ))}
            </div>
            
            <div className="pt-2">
              <div className="text-3xl font-extrabold tracking-tight mb-1">{selectedSido}</div>
              <div className="font-serif italic text-base text-[#4A4A4A] mb-5 flex items-center">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-tight not-italic font-sans mr-2 text-white" style={{ backgroundColor: sidoInfo.g.color }}>Group {sidoInfo.g.tag}</span>
                {sidoInfo.g.name}
              </div>
              
              <div className="grid grid-cols-2 border-y border-[#D8D2C4] mb-6">
                <div className="py-4 pl-5 border-r border-[#D8D2C4]">
                  <div className="font-serif text-3xl font-bold h-[38px] flex items-baseline">{sidoInfo.cnt.toLocaleString()}</div>
                  <div className="text-[14px] tracking-[0.18em] uppercase text-[#8B8680] mt-1 font-medium">자원수 (개소)</div>
                </div>
                <div className="py-4 pl-5">
                  <div className="font-serif text-3xl font-bold h-[38px] flex items-baseline">
                    {(sidoInfo.cnt / 8703 * 100).toFixed(1)}
                    <span className="text-[18px] text-[#8B8680] ml-0.5 font-normal">%</span>
                  </div>
                  <div className="text-[14px] tracking-[0.18em] uppercase text-[#8B8680] mt-1 font-medium">전국 비중</div>
                </div>
              </div>

              <div className="space-y-0.5">
                {[
                  { l: '1차 특화', v: sidoInfo.p1 ? `${sidoInfo.p1.t} ${sidoInfo.p1.lq.toFixed(2)}` : '없음' },
                  { l: '2차 특화', v: sidoInfo.p2 ? `${sidoInfo.p2.t} ${sidoInfo.p2.lq.toFixed(2)}` : '없음' },
                  { l: '최저 LQ 유형', v: `${sidoInfo.lowest.t} ${sidoInfo.lowest.lq.toFixed(2)}` }
                ].map((row, i) => (
                  <div key={i} className="flex justify-between py-2.5 border-b border-dashed border-[#D8D2C4] last:border-0">
                    <span className="text-[11px] tracking-[0.16em] uppercase text-[#8B8680]">{row.l}</span>
                    <span className="font-serif text-[16px] font-bold">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Key Findings */}
      <section className="mb-24 pb-24 border-b border-[#D8D2C4]">
        <div className="grid md:grid-cols-[180px_1fr] gap-12 mb-12 items-start">
          <div className="font-serif italic text-8xl text-[#B85C3C] font-medium leading-[0.9]">04<small className="block text-[15px] tracking-[0.2em] uppercase text-[#8B8680] mt-2 not-italic font-sans">핵심 발견</small></div>
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 font-sans">분석에서 확인된<br />구조적 패턴 6가지</h2>
            <p className="text-lg text-[#4A4A4A] max-w-[870px]">자원 LQ만 사용한 휴리스틱 분류 결과에서 도출된 시도 단위 구조적 발견들이다. 카드 소비 데이터와의 결합 분석은 별도 보고서에서 다룬다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
          {[
            { n: '01', h: '광역시·도 이원 구조', b: '광역시는 도시·소비형 자원(휴양·문화·기타) 중심, 도 단위는 역사·자연 자원 중심으로 자원 포트폴리오의 분화가 매우 뚜렷하다. 지역 간 대체보다 보완 관계로 해석 가능.' },
            { n: '02', h: '강원·제주의 단일 체류·레저 클러스터', b: '강원 숙박 LQ 6.24, 레포츠 3.98·제주 레포츠 3.09, 자연 1.71로 두 시도가 사실상 분리된 체류·레저 시장을 형성. K-means K=3에서도 단독 클러스터로 분리.' },
            { n: '03', h: '역사 자원 비중 최고 3개 도', b: '전북 49.8%(LQ 1.65), 경북 43.8%(1.45), 충북 40.5%(1.35) — 시도내 자원 절반 가량을 역사관광지가 차지. 한국의 역사 자원 보유 분포가 이 세 시도에 집중되어 있음.' },
            { n: '04', h: '자연 자원 비중 최고 4개 시도', b: '제주 46.8%(LQ 1.71), 인천 39.3%(1.44), 전남 38.4%(1.40), 강원 37.8%(1.38). 도서·해안·산악 지형이 자연 자원 비중을 결정.' },
            { n: '05', h: '자원수 ≠ 방문자 비중', b: '강원·제주는 자연 자원이 자원 수의 38–47%이지만 방문자 비중은 50% 내외 — 수요가 자원 분포보다 자연 자원에 더 집중되는 운영 패턴 확인.' },
            { n: '06', h: '"기타" 유형의 광역시 집중', b: '서울 LQ 2.42, 부산 3.17, 대구 2.97 — "기타" 유형(쇼핑·건축조형물·산업관광)이 광역시에 집중. 도시 소비형 자원의 KTO 분류 특성을 반영.' }
          ].map((f, i) => (
            <div key={i} className="pt-7 border-t border-[#D8D2C4] first:border-t-0 md:first:border-t-0 md:[&:nth-child(2)]:border-t-0">
              <div className="font-serif italic text-4xl text-[#B85C3C] leading-none mb-3">{f.n}</div>
              <div className="text-lg font-bold tracking-tight mb-2.5 leading-[1.3]">{f.h}</div>
              <div className="text-[14.5px] text-[#4A4A4A] leading-[1.65]" dangerouslySetInnerHTML={{ __html: f.b.replace(/<b>(.*?)<\/b>/g, '<strong class="text-[#1A1A1A] font-semibold">$1</strong>') }} />
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Methodology */}
      <section className="mb-24">
        <div className="grid md:grid-cols-[180px_1fr] gap-12 mb-12 items-start">
          <div className="font-serif italic text-8xl text-[#B85C3C] font-medium leading-[0.9]">05<small className="block text-[15px] tracking-[0.2em] uppercase text-[#8B8680] mt-2 not-italic font-sans">방법론</small></div>
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 font-sans">분석 방법 및<br />지표 정의</h2>
            <p className="text-lg text-[#4A4A4A] max-w-[870px]">시도 단위 분석의 기본 지표 산출식과 분류 기준이다. 데이터 출처와 한계도 함께 명시한다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          {[
            { l: 'Data Source', t: '한국관광공사(KTO) POI 데이터 8,703개. 17개 시도 · 22.01–24.12 월별 방문자수 포함.' },
            { l: 'Classification Axis', t: 'KTO 자체 분류인 최신유형 8종(역사·자연·휴양·문화·체험·레포츠·숙박·기타)을 주축으로 사용.' },
            { l: 'Resource Composition', t: '시도 i, 유형 j → r_ij = n_ij / Σ_j n_ij × 100 (%)' },
            { l: 'Location Quotient (LQ)', t: 'LQ_ij = r_ij / R_j. R_j는 전국 유형 j 평균 비율. LQ ≥ 1.2는 특화, 0.8 ≤ LQ < 1.2는 평균, LQ < 0.8은 부족.' },
            { l: 'Resource Profile Type', t: 'LQ 패턴 기반 휴리스틱 6그룹 분류 (자연·역사·레저·도시소비 4개 축 조합). 임계값 1.2를 기준으로 1차 특화·2차 특화 식별.' },
            { l: 'Limitations', t: '"기타" 유형은 쇼핑·건축조형물 등 혼합되어 광역시 비중 과대해석 우려. 임계값 1.2는 자의적 선택 — K-means 객관 검증 결과 시도 단위에서는 휴리스틱과 거의 일치.' }
          ].map((m, i) => (
            <div key={i} className={`py-6 border-t border-[#D8D2C4] ${i < 2 ? 'md:border-t-0' : ''} ${i % 2 === 0 ? 'md:pr-8 md:border-r border-[#D8D2C4]' : 'md:pl-8'}`}>
              <div className="text-[11px] tracking-[0.2em] uppercase text-[#B85C3C] font-bold mb-2">{m.l}</div>
              <div className="text-sm text-[#4A4A4A] leading-[1.6]">{m.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Finding */}
      <div className="bg-[#1A1A1A] text-[#FAF7F2] p-8 -mx-8 -mb-8 mt-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="font-serif italic text-2xl font-bold mb-2">관광자원 시도별 분류 분석</div>
          <div className="text-[13px] text-[#8B8680] leading-[1.6]">전국 17개 시도의 관광자원 포트폴리오와 방문자 패턴을 시각화한 인터랙티브 보고서입니다. 데이터 기반의 객관적 분석을 통해 지역 관광 경쟁력을 진단합니다.</div>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#8B8680] mb-2 font-bold">Data & Analysis</div>
          <div className="text-[13px] text-[#8B8680]">KTO POI (22.01-24.12) / Location Quotient Heuristic 6-Group</div>
        </div>
      </div>
    </div>
  );
};

export default SidoDashboard;
