import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from "recharts";
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  ListOrdered, 
  Calendar,
  Loader2,
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SurveysAnalysis = () => {
  const { data: responses, isLoading } = useQuery({
    queryKey: ['admin_survey_responses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('survey_responses')
        .select(`
          *,
          survey_panels!inner (*)
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
  });

  const exportToCSV = () => {
    if (!responses) return;
    
    // Get all unique keys from all responses to create headers
    const allResponseKeys = new Set<string>();
    responses.forEach(r => {
      Object.keys(r.responses || {}).forEach(key => allResponseKeys.add(key));
    });
    
    const responseKeys = Array.from(allResponseKeys);
    const headers = [
      "ID", "설문ID", "패널이름", "성별", "지역", "직업", "제출일시", 
      ...responseKeys
    ];

    const rows = responses.map(r => {
      const p = r.survey_panels || {};
      const res = r.responses || {};
      
      return [
        r.id,
        r.survey_id,
        p.name || "",
        p.gender === 'male' ? '남' : '여',
        p.region || "",
        p.job || "",
        new Date(r.created_at).toLocaleString(),
        ...responseKeys.map(key => {
          const val = res[key];
          if (Array.isArray(val)) return `"${val.join(', ')}"`;
          if (typeof val === 'object' && val !== null) return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
          return val !== undefined ? val : "";
        })
      ];
    });
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `survey_raw_data_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Process data for charts
  const travelTypeData = responses ? processTravelTypes(responses) : [];
  const regionData = responses ? processRegions(responses) : [];
  const satisfactionData = responses ? processSatisfaction(responses) : [];

  const COLORS = ['#1B4FA8', '#6366F1', '#A855F7', '#EC4899', '#F43F5E'];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-slate-400" />
            <select className="bg-white border-none shadow-sm rounded-lg px-4 py-2 text-sm font-bold text-slate-700 outline-none">
              <option>2026년 4월 국내여행 실태조사</option>
              <option>전체 설문 보기</option>
            </select>
          </div>
          <Button 
            variant="outline" 
            className="gap-2 border-none shadow-sm bg-white hover:bg-slate-50 transition-colors"
            onClick={exportToCSV}
            disabled={!responses || responses.length === 0}
          >
            <FileSpreadsheet className="w-4 h-4" /> 전체 원데이터 다운로드
          </Button>
        </div>

        {isLoading ? (
          <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Travel Type Distribution */}
            <Card className="border-none shadow-sm">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-primary" />
                  여행 유형별 비중 (중복포함)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={travelTypeData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} 
                        width={120}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                        {travelTypeData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Region Distribution */}
            <Card className="border-none shadow-sm">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  방문 지역 분포
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: '#94a3b8' }} 
                      />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                      <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Satisfaction Level */}
            <Card className="border-none shadow-sm lg:col-span-2">
              <CardHeader className="border-b border-slate-50">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-primary" />
                  전반적 만족도 분포 (1-5점)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8 flex flex-col md:flex-row gap-8 items-center">
                 <div className="w-full md:w-1/2 h-[300px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie
                         data={satisfactionData}
                         cx="50%"
                         cy="50%"
                         innerRadius={60}
                         outerRadius={100}
                         paddingAngle={5}
                         dataKey="value"
                       >
                         {satisfactionData.map((_, index) => (
                           <Cell key={`cell-${index}`} fill={['#f1f5f9', '#e2e8f0', '#cbd5e1', '#6366f1', '#1B4FA8'][index]} />
                         ))}
                       </Pie>
                       <Tooltip />
                     </PieChart>
                   </ResponsiveContainer>
                 </div>
                 <div className="w-full md:w-1/2 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-slate-50 rounded-2xl">
                          <p className="text-xs text-slate-500 font-bold mb-1">평균 만족도</p>
                          <p className="text-2xl font-bold text-primary">4.2 / 5.0</p>
                       </div>
                       <div className="p-4 bg-slate-50 rounded-2xl">
                          <p className="text-xs text-slate-500 font-bold mb-1">총 응답수</p>
                          <p className="text-2xl font-bold text-primary">{responses?.length || 0}건</p>
                       </div>
                    </div>
                    <div className="space-y-2 pt-2">
                       {satisfactionData.slice().reverse().map((item, idx) => (
                         <div key={idx} className="flex items-center gap-3">
                           <span className="text-xs font-bold text-slate-600 w-12">{item.name}</span>
                           <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                             <div 
                               className="h-full bg-primary" 
                               style={{ width: `${(item.value / (responses?.length || 1)) * 100}%` }} 
                             />
                           </div>
                           <span className="text-xs font-bold text-slate-400 w-8">{item.value}건</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// Helper Functions
function processTravelTypes(responses: any[]) {
  const counts: Record<string, number> = {
    '국내 관광': 0,
    '국내 업무': 0,
    '국내 친지': 0,
    '해외 여행': 0,
  };

  responses.forEach(r => {
    const types = r.responses.travelTypes || [];
    if (types.includes('domestic_tourism')) counts['국내 관광']++;
    if (types.includes('domestic_business')) counts['국내 업무']++;
    if (types.includes('domestic_visit')) counts['국내 친지']++;
    if (types.includes('overseas')) counts['해외 여행']++;
  });

  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

function processRegions(responses: any[]) {
  const counts: Record<string, number> = {};
  responses.forEach(r => {
    const dest = r.responses.domestic_dest;
    if (dest) counts[dest] = (counts[dest] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
}

function processSatisfaction(responses: any[]) {
  const counts = [0, 0, 0, 0, 0]; // 1, 2, 3, 4, 5
  responses.forEach(r => {
    const score = r.responses.q10_overall;
    if (score >= 1 && score <= 5) counts[score - 1]++;
  });
  return [
    { name: '1점', value: counts[0] },
    { name: '2점', value: counts[1] },
    { name: '3점', value: counts[2] },
    { name: '4점', value: counts[3] },
    { name: '5점', value: counts[4] },
  ];
}

export default SurveysAnalysis;
