import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Download, 
  Filter, 
  MoreVertical,
  Mail,
  Calendar,
  MapPin,
  Briefcase,
  User as UserIcon,
  Loader2
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const PanelsManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: panels, isLoading } = useQuery({
    queryKey: ['admin_panels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('survey_panels')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
  });

  const filteredPanels = panels?.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.region?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.job?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportToCSV = () => {
    if (!filteredPanels) return;
    const headers = ["ID", "이름", "성별", "출생년도", "지역", "직업", "가입일"];
    const rows = filteredPanels.map(p => [
      p.id,
      p.name,
      p.gender === 'male' ? '남' : '여',
      p.birth_year,
      p.region,
      p.job,
      new Date(p.created_at).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `panel_list_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="이름, 지역, 직업으로 검색..." 
              className="pl-10 h-11 border-none shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 h-11 px-4 border-none shadow-sm bg-white" onClick={exportToCSV}>
              <Download className="w-4 h-4" /> CSV 내보내기
            </Button>
            <Button variant="outline" className="gap-2 h-11 px-4 border-none shadow-sm bg-white">
              <Filter className="w-4 h-4" /> 상세 필터
            </Button>
          </div>
        </div>

        {/* Panels Table */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b border-slate-50 py-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              조사 패널 목록
              <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full ml-2">
                {filteredPanels?.length || 0}명
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
            ) : (
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-slate-50">
                    <TableHead className="font-bold text-slate-800">패널 정보</TableHead>
                    <TableHead className="font-bold text-slate-800">성별/연령</TableHead>
                    <TableHead className="font-bold text-slate-800">거주지역</TableHead>
                    <TableHead className="font-bold text-slate-800">직업군</TableHead>
                    <TableHead className="font-bold text-slate-800">가입일</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPanels?.map((panel) => (
                    <TableRow key={panel.id} className="hover:bg-slate-50/50 border-slate-50 group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-xs border border-primary/10">
                            {panel.name?.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-900">{panel.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${panel.gender === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'}`}>
                            {panel.gender === 'male' ? 'M' : 'F'}
                          </span>
                          <span className="text-sm text-slate-600 font-medium">{panel.birth_year}년생</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {panel.region}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-slate-600">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                          {panel.job}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-300" />
                          {new Date(panel.created_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4 text-slate-400" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {!isLoading && filteredPanels?.length === 0 && (
              <div className="text-center py-20">
                <UserIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">등록된 패널이 없습니다.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PanelsManagement;
