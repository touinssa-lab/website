import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LabelList
} from 'recharts';
import { Calendar, BookOpen, PenTool, MessageSquare, ArrowRight, Smile, TrendingUp, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CarbonCalculator from '@/components/CarbonCalculator';

const satisfactionData = [
  { name: '전반 만족도', value: 4.87 },
  { name: '진행자 안내', value: 4.87 },
  { name: '사전 안내·신청', value: 4.82 },
  { name: '체험 장소', value: 4.64 },
];

const awarenessData = [
  { name: '기후친화 관광 공감 (Q12)', value: 4.89 },
  { name: '지속가능 여행 필요성 (Q15)', value: 4.89 },
  { name: '일상 연결성 체감 (Q14)', value: 4.87 },
  { name: '기후변화 영향 체감 (Q10)', value: 4.82 },
  { name: '실천 고민 (Q13)', value: 4.82 },
  { name: '기후실천 의지 (Q16)', value: 4.82 },
  { name: '지역자원 소중함 (Q11)', value: 4.80 },
];

const GoseongClimateDetail: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#F8F7F2] text-[#1a1a1a] font-pretendard relative">
      {/* Hero Header with Forest Background */}
      <section className="relative h-[450px] flex items-center justify-center text-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&h=900&fit=crop" 
          alt="Bright Sunlit Forest"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/10" />
        
        <div className="relative z-10 px-4">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full text-sm text-[#1D9E75] font-bold mb-8 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#1D9E75] animate-pulse"></span>
            측정에서 행동으로
          </div>
          <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-8 tracking-tight text-[#1F2914] drop-shadow-[0_2px_15px_rgba(255,255,255,1)] drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
            탄소를 줄이는 여행,<br />이미 시작되었습니다.
          </h2>
          <p className="text-white text-[22px] leading-relaxed max-w-[800px] mx-auto font-semibold drop-shadow-[0_4px_15px_rgba(0,0,0,0.7)]">
            투어리즘인사이트는 현장의 기후친화 프로그램을 발굴하고,<br />
            데이터로 검증하여 확산시킵니다.
          </p>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto p-4 md:p-10 -mt-20 relative z-20">

        {/* Program Info Card */}
        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm mb-16">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-2 text-[#0F6E56] mb-4">
              <span className="text-xl">▲</span>
              <span className="text-sm font-bold tracking-tight font-pretendard">파일럿 프로그램 · 경남 고성</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#062D24] mb-4 font-pretendard tracking-tight">
              지구를 위한 하루, 경남 고성 기후여행
            </h3>
            <p className="text-[#5F5E5A] text-sm md:text-base font-medium font-pretendard">
              기후적응형 관광 시범사업 · 오두산 치유숲 · 2025년 7월 (1·2회차)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/5">
            {/* Session 01 */}
            <div className="group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/assets/portfolio/goseong/session1.jpg" 
                  alt="기후의 변호인들"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="text-[11px] font-bold text-[#1D9E75] tracking-widest mb-3">SESSION 01</div>
                <div className="text-xl font-bold text-[#04342C] mb-3 font-pretendard">기후의 변호인들</div>
                <p className="text-[15px] text-[#5F5E5A] leading-relaxed font-pretendard font-medium">숲길에서 펼치는 몰입형 기후법정. 환경퀴즈와 친환경 미션으로 시민의식을 회복합니다.</p>
              </div>
            </div>

            {/* Session 02 */}
            <div className="group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/assets/portfolio/goseong/session2.jpg" 
                  alt="지구 명상"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="text-[11px] font-bold text-[#1D9E75] tracking-widest mb-3">SESSION 02</div>
                <div className="text-xl font-bold text-[#04342C] mb-3 font-pretendard">지구 명상</div>
                <p className="text-[15px] text-[#5F5E5A] leading-relaxed font-pretendard font-medium">치유숲 산책과 족욕, 느린 걷기로 내 몸의 열을 지구의 기후위기에 빗대어 인식합니다.</p>
              </div>
            </div>

            {/* Session 03 */}
            <div className="group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src="/assets/portfolio/goseong/session3.jpg" 
                  alt="기후 아트 경매"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="text-[11px] font-bold text-[#1D9E75] tracking-widest mb-3">SESSION 03</div>
                <div className="text-xl font-bold text-[#04342C] mb-3 font-pretendard">기후 아트 경매</div>
                <p className="text-[15px] text-[#5F5E5A] leading-relaxed font-pretendard font-medium">자연 소재로 만든 '지구 조각'을 경매하고, 기후를 위한 약속을 숲에 매답니다.</p>
              </div>
            </div>
          </div>

          <div className="px-8 py-8 flex flex-wrap gap-2 border-t border-dashed border-black/10">
            {['기후감수성', '탄소시민교육', '로컬기후탐험', '생태감수성', '지속가능 전환'].map((tag) => (
              <span key={tag} className="text-xs font-bold bg-[#F1EFE8] text-[#5F5E5A] px-4 py-1.5 rounded-full shadow-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <h3 className="text-2xl font-bold tracking-tight text-[#1a1a1a]">참여자 45명이 경험한 변화</h3>
          <span className="text-xs text-[#888780]">2025년 7월 · 1·2회차 통합 (n=45) · 투어리즘인사이트 분석</span>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: '전반 만족도', value: '4.87', unit: '/ 5' },
            { label: '기후친화 관광 공감', value: '100', unit: '%' },
            { label: '가족 단위 참여', value: '91', unit: '%' },
            { label: '아동 동반 참여', value: '12', unit: '명' }
          ].map((kpi, i) => (
            <div key={i} className="flex flex-col justify-between bg-white border border-black/5 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:brightness-110 cursor-default group min-h-[120px]">
              {/* Top: Title */}
              <div className="py-3 px-5 bg-[#F1F5F2]">
                <div className="text-base font-bold text-[#5F5E5A] font-pretendard tracking-tight leading-tight">
                  {kpi.label}
                </div>
              </div>
              {/* Bottom: Value (Center Aligned) */}
              <div className="bg-[#0F6E56] px-5 py-4 text-center transition-colors group-hover:bg-[#128165]">
                <div className="text-4xl font-bold text-white font-pretendard tracking-tighter">
                  {kpi.value}
                  <span className="text-lg font-bold text-white/80 ml-1 font-pretendard tracking-normal whitespace-pre">
                    {kpi.unit}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border border-black/5 p-8 rounded-2xl">
            <div className="flex justify-between items-baseline pb-5 border-b border-black/5 mb-8">
              <div className="flex items-center gap-3">
                <Smile className="w-6 h-6 text-[#1D9E75]" />
                <h4 className="text-2xl font-bold text-[#0F6E56]">프로그램 만족도</h4>
              </div>
              <span className="text-sm text-[#888780]">5점 척도 · 평균값</span>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={satisfactionData}
                  layout="vertical"
                  margin={{ top: 5, right: 95, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(136,135,128,0.15)" />
                  <XAxis type="number" domain={[0, 5]} hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={120}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 13, fill: '#555555', fontWeight: 500 }}
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} background={{ fill: '#F1F5F2', radius: [0, 4, 4, 0] }}>
                      <LabelList dataKey="value" position="right" dx={10} style={{ fontSize: '13px', fontWeight: 'bold', fill: '#555555' }} />
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index < 3 ? '#1D9E75' : '#9FE1CB'} />
                      ))}
                    </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-black/5 p-8 rounded-2xl">
            <div className="flex justify-between items-baseline pb-5 border-b border-black/5 mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-[#1D9E75]" />
                <h4 className="text-2xl font-bold text-[#0F6E56]">기후 인식 변화</h4>
              </div>
              <span className="text-sm text-[#888780]">5점 리커트 · 평균값</span>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={awarenessData}
                  layout="vertical"
                  margin={{ top: 5, right: 60, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(136,135,128,0.15)" />
                  <XAxis type="number" domain={[0, 5]} hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={185}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 13, fill: '#555555', fontWeight: 500 }}
                    />
                    <Tooltip 
                      cursor={{ fill: 'transparent' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="value" fill="#1D9E75" radius={[0, 4, 4, 0]} barSize={20} background={{ fill: '#F1F5F2', radius: [0, 4, 4, 0] }}>
                      <LabelList dataKey="value" position="right" dx={10} style={{ fontSize: '12px', fontWeight: 'bold', fill: '#555555' }} />
                    </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Voices Card */}
        <div className="bg-[#F0F9F4] p-6 md:p-8 rounded-2xl mb-6">
          <div className="flex items-center gap-3 text-[#0F6E56] font-bold text-2xl mb-8">
            <MessageSquare className="w-6 h-6 text-[#1D9E75]" />
            참여자의 목소리
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { quote: '아이들이 너무 좋아했어요', author: '가족 동반 참여자' },
              { quote: '아주 알차게 구성되어 있습니다', author: '1회차 참여자' },
              { quote: '노력하신 만큼 좋은 결과가 있는 것 같습니다', author: '2회차 참여자' },
              { quote: '산책 코스가 더 길었으면 좋겠어요', author: '개선 제안' }
            ].map((voice, i) => (
              <blockquote key={i} className="bg-white py-4 px-6 rounded-xl shadow-sm">
                <p className="text-[#0a4d3c] text-lg font-serif font-bold italic mb-1">
                  "{voice.quote}"
                </p>
                <p className="text-xs text-[#888780] font-medium">
                  — {voice.author}
                </p>
              </blockquote>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-0">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group bg-[#04342C] text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-[#085041] transition-all hover:-translate-y-1 shadow-xl shadow-[#04342C]/20 flex items-center gap-3 mx-auto"
          >
            우리 지역에 적용하기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 여행 탄소 발자국 계산기 */}
        <div className="mt-10">
          <CarbonCalculator />
        </div>
      </section>

      {/* Consulting Inquiry Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl overflow-hidden p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Warning Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-blue-500" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">컨설팅 문의 안내</h3>
              <p className="text-slate-600 text-base leading-relaxed mb-10 px-2 font-medium">
                지역별로 기후적응형 관광 상품 개발이 필요하신 경우<br />
                <span className="font-bold text-slate-800">Contact 페이지</span>에서 문의해 주시기 바랍니다.
              </p>

              <div className="space-y-3">
                <Button 
                  asChild
                  className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-200 transition-all"
                >
                  <a href="/contact">Contact 바로가기</a>
                </Button>
                
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-lg transition-all"
                >
                  취소
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoseongClimateDetail;
