import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  MousePointer2,
  Eye,
  Activity
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const Dashboard = () => {
  // Fetch Stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin_stats'],
    queryFn: async () => {
      const [articles, panels, responses] = await Promise.all([
        supabase.from('news_articles').select('article_id', { count: 'exact', head: true }),
        supabase.from('survey_panels').select('id', { count: 'exact', head: true }),
        supabase.from('survey_responses').select('id', { count: 'exact', head: true })
      ]);

      return {
        articles: articles.count || 0,
        panels: panels.count || 0,
        responses: responses.count || 0,
      };
    }
  });

  // Fetch recent activity
  const { data: recentPanels } = useQuery({
    queryKey: ['recent_panels'],
    queryFn: async () => {
      const { data } = await supabase
        .from('survey_panels')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    }
  });

  // Fetch GA4 Analytics Data
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['ga4_analytics'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/analytics');
        if (!response.ok) return null;
        return response.json();
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        return null;
      }
    },
    refetchInterval: 30000, // Refresh every 30 seconds for real-time feel
  });

  // Fetch Agent Status
  const { data: agentStatus } = useQuery({
    queryKey: ['agent_status'],
    queryFn: async () => {
      try {
        const response = await fetch('/agent_status.json');
        if (!response.ok) return null;
        return response.json();
      } catch (error) {
        return null;
      }
    },
    refetchInterval: 3000, // Poll every 3 seconds to ensure real-time terminal sync
  });


  // Format GA4 chart data
  const visitorChartData = analytics?.chartData?.slice(-14).map((item: any) => ({
    name: new Date(item.date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }),
    count: item.count
  })) || [];


  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard 
            title="현재 접속자" 
            value={analytics?.activeUsers || 0} 
            icon={Activity} 
            color="bg-rose-500" 
            trend="Live"
            isPositive={true}
            loading={analyticsLoading}
            highlight={true}
          />
          <StatCard 
            title="최근 30일 방문자" 
            value={analytics?.totals?.activeUsers || 0} 
            icon={Users} 
            color="bg-indigo-600" 
            trend="방문자 추이"
            isPositive={true}
            loading={analyticsLoading}
          />
          <StatCard 
            title="최근 30일 페이지뷰" 
            value={analytics?.totals?.pageViews || 0} 
            icon={Eye} 
            color="bg-orange-500" 
            trend="콘텐츠 조회"
            isPositive={true}
            loading={analyticsLoading}
          />
          <StatCard 
            title="총 기획 기사" 
            value={stats?.articles || 0} 
            icon={FileText} 
            color="bg-blue-500" 
            trend="뉴스 룸"
            loading={statsLoading}
          />
          <StatCard 
            title="설문 응답 수" 
            value={stats?.responses || 0} 
            icon={BarChart3} 
            color="bg-violet-500" 
            trend="조사 참여"
            isPositive={true}
            loading={statsLoading}
          />
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart Section */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                일별 방문자 추이
              </CardTitle>
              <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold uppercase">Last 14 Days</span>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visitorChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#94a3b8' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#94a3b8' }} 
                    />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>

          </Card>

          {/* Recent Activity */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                최근 가입 패널
              </CardTitle>
              <button className="text-xs text-primary font-bold hover:underline">모두 보기</button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {recentPanels?.map((panel: any) => (
                  <div key={panel.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                        {panel.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{panel.name}</p>
                        <p className="text-[11px] text-slate-500">{panel.region} · {panel.job}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-medium text-slate-400">
                        {new Date(panel.created_at).toLocaleDateString()}
                      </p>
                      <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">New</span>
                    </div>
                  </div>
                ))}
                {!recentPanels?.length && (
                   <div className="p-8 text-center text-muted-foreground text-sm">
                     최근 활동이 없습니다.
                   </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AutoAgent Console Section */}
        <Card className="border-none shadow-sm overflow-hidden bg-slate-950 text-slate-100 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-900 pb-4 bg-slate-900 text-white">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${
                agentStatus?.status === 'running' || agentStatus?.status === 'starting'
                  ? 'bg-amber-400 animate-ping'
                  : agentStatus?.status === 'completed'
                  ? 'bg-emerald-400'
                  : 'bg-slate-400'
              }`} />
              관광 AI 뉴스룸 에이전트 실시간 모니터링 (AutoAgent Console)
            </CardTitle>
            <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
              agentStatus?.status === 'running' || agentStatus?.status === 'starting'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : agentStatus?.status === 'completed'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-850 text-slate-450 border border-slate-750'
            }`}>
              {agentStatus?.status || 'OFFLINE'}
            </span>
          </CardHeader>
          <CardContent className="pt-6 font-mono text-xs text-slate-300">
            {agentStatus ? (
              <div className="space-y-4">
                {/* Progress bar and details */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Current Execution Step</p>
                    <h4 className="text-white font-bold text-sm mt-0.5">
                      {agentStatus.message || '대기 중...'}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1">마지막 동기화: {agentStatus.last_updated}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-white bg-slate-800 px-3 py-1 rounded border border-slate-700">
                      Step {agentStatus.step} / {agentStatus.total_steps}
                    </span>
                    <div className="w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-750">
                      <div 
                        className="bg-indigo-500 h-full transition-all duration-500 ease-out" 
                        style={{ width: `${(agentStatus.step / agentStatus.total_steps) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Console Logs */}
                <div>
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-2">Live Execution Logs</p>
                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-850 h-[180px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
                    {agentStatus.logs?.map((log: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-indigo-400 font-bold shrink-0">&gt;</span>
                        <span className="leading-relaxed break-all text-slate-200">{log}</span>
                      </div>
                    ))}
                    {!agentStatus.logs?.length && (
                      <div className="text-slate-600 italic text-center pt-16">로그가 준비되지 않았습니다.</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 italic">
                에이전트 구동 기록이 존재하지 않거나 오프라인 상태입니다. (bat 파일 가동 시 자동으로 실시간 로그가 수집됩니다)
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: any;
  color: string;
  trend: string;
  isPositive?: boolean;
  loading?: boolean;
  highlight?: boolean;
}

const StatCard = ({ title, value, icon: Icon, color, trend, isPositive, loading, highlight }: StatCardProps) => (
  <Card className={`border-none shadow-sm hover:shadow-md transition-all duration-300 ${highlight ? 'ring-2 ring-rose-500/20 bg-rose-50/10' : ''}`}>
    <CardContent className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-bold ${highlight ? 'text-rose-500 animate-pulse' : (isPositive ? 'text-emerald-600' : 'text-slate-400')}`}>
          {highlight && <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-[12px] font-medium text-slate-500 mb-0.5">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">
          {loading ? "..." : value.toLocaleString()}
        </h3>
      </div>
    </CardContent>
  </Card>
);


export default Dashboard;
