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
  Eye
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
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="최근 30일 방문자" 
            value={analytics?.totals?.activeUsers || 0} 
            icon={Users} 
            color="bg-indigo-600" 
            trend="실시간 수집 중"
            isPositive={true}
            loading={analyticsLoading}
          />
          <StatCard 
            title="최근 30일 페이지뷰" 
            value={analytics?.totals?.pageViews || 0} 
            icon={Eye} 
            color="bg-orange-500" 
            trend="수치 안정적"
            isPositive={true}
            loading={analyticsLoading}
          />
          <StatCard 
            title="총 기획 기사" 
            value={stats?.articles || 0} 
            icon={FileText} 
            color="bg-blue-500" 
            trend="+2건 (이번 달)"
            loading={statsLoading}
          />
          <StatCard 
            title="설문 응답 수" 
            value={stats?.responses || 0} 
            icon={BarChart3} 
            color="bg-violet-500" 
            trend="+156건 (전체)"
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
}

const StatCard = ({ title, value, icon: Icon, color, trend, isPositive, loading }: StatCardProps) => (
  <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className={`flex items-center gap-1 text-[11px] font-bold ${isPositive ? 'text-emerald-600' : 'text-slate-400'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-900">
          {loading ? "..." : value.toLocaleString()}
        </h3>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;
