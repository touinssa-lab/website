import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  LogOut, 
  Menu, 
  X,
  Lock,
  ChevronRight,
  Globe,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const MENU_ITEMS = [
  { path: "/admin", icon: LayoutDashboard, label: "대시보드" },
  { path: "/admin/news", icon: FileText, label: "기획기사 관리" },
  { path: "/admin/panels", icon: Users, label: "설문패널 관리" },
  { path: "/admin/surveys", icon: BarChart3, label: "설문데이터 분석" },
  { path: "/admin/ai-guide", icon: Sparkles, label: "로컬 AI 여행가이드" },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth") === "true";
    setIsAuthenticated(auth);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: inputPassword }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_auth", "true");
        toast.success("관리자 인증 성공");
      } else {
        toast.error(result.error || "비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      toast.error("인증 서버 오류가 발생했습니다.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    navigate("/");
    toast.info("로그아웃 되었습니다.");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-2xl overflow-hidden">
            <div className="h-2 bg-primary w-full" />
            <CardHeader className="text-center pt-10 pb-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold font-serif">관리자 포털 인증</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">투어리즘인사이트 관리 시스템입니다.</p>
            </CardHeader>
            <CardContent className="px-8 pb-10">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Input 
                    type="password" 
                    placeholder="관리자 비밀번호" 
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    className="h-12 border-slate-200 focus:ring-primary/20"
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full h-12 text-base font-bold">로그인</Button>
                <button 
                  type="button" 
                  onClick={() => navigate("/")}
                  className="w-full text-xs text-muted-foreground hover:text-primary transition-colors mt-4"
                >
                  홈페이지로 돌아가기
                </button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen z-50 overflow-hidden shadow-sm"
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-white" />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-lg tracking-tight truncate">Tourism Insight</span>
            )}
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-slate-100 rounded-md transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5 text-slate-500" /> : <Menu className="w-5 h-5 text-slate-500" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-primary"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-500 group-hover:text-primary"}`} />
                {isSidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
                {isActive && isSidebarOpen && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-4 px-4 py-3 text-slate-600 hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all`}
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="font-medium">로그아웃</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-lg font-bold text-slate-800">
            {MENU_ITEMS.find(item => item.path === location.pathname)?.label || "관리 시스템"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">Administrator</p>
              <p className="text-[10px] text-slate-500 font-medium">관리자 계정</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center">
              <Users className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
