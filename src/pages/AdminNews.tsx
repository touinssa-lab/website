import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { NewsArticle, ContentBlock } from "@/data/newsData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Plus, 
  Trash2, 
  Save, 
  Image as ImageIcon, 
  Type, 
  ArrowLeft,
  Loader2,
  Pencil,
  Eye,
  Upload,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["국제동향", "관광동향", "관광 통계", "호텔업동향", "축제이벤트"];

const AdminNews = () => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "true";
  });
  const [inputPassword, setInputPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Partial<NewsArticle>>({
    id: "",
    category: "국제동향",
    title: "",
    date: new Date().toLocaleDateString('ko-KR').replace(/\s/g, '').replace(/\.$/, ''),
    thumbnail: "",
    excerpt: "",
    contentBlocks: []
  });

  // Fetch articles
  const { data: articles, isLoading } = useQuery({
    queryKey: ['news_articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      return (data || []).map(item => ({
        id: item.article_id,
        category: item.category,
        title: item.title,
        date: item.date,
        thumbnail: item.thumbnail,
        excerpt: item.excerpt,
        contentBlocks: item.content_blocks
      })) as NewsArticle[];
    }
  });

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (article: Partial<NewsArticle>) => {
      // 썸네일이 비어있을 경우 본문에서 첫 번째 이미지를 찾아 자동으로 설정
      let finalThumbnail = article.thumbnail;
      if (!finalThumbnail && article.contentBlocks) {
        const firstImageBlock = article.contentBlocks.find(b => b.type === 'image');
        if (firstImageBlock) {
          finalThumbnail = firstImageBlock.value;
        }
      }

      const payload = {
        article_id: article.id,
        category: article.category,
        title: article.title,
        date: article.date,
        thumbnail: finalThumbnail,
        excerpt: article.excerpt,
        content_blocks: article.contentBlocks
      };
      const { error } = await supabase
        .from('news_articles')
        .upsert(payload, { onConflict: 'article_id' });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news_articles'] });
      toast.success("기사가 저장되었습니다.");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error("저장 실패: " + error.message);
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (articleId: string) => {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('article_id', articleId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news_articles'] });
      toast.success("기사가 삭제되었습니다.");
    },
    onError: (error: any) => {
      toast.error("삭제 실패: " + error.message);
    }
  });

  const handleAddBlock = (type: 'text' | 'image') => {
    setCurrentArticle(prev => ({
      ...prev,
      contentBlocks: [
        ...(prev.contentBlocks || []),
        type === 'text' ? { type: 'text', value: "" } : { type: 'image', value: "", caption: "" }
      ]
    }));
  };

  const handleUpdateBlock = (index: number, value: string, caption?: string) => {
    setCurrentArticle(prev => {
      const newBlocks = [...(prev.contentBlocks || [])];
      newBlocks[index] = { ...newBlocks[index], value, ...(caption !== undefined ? { caption } : {}) };
      return { ...prev, contentBlocks: newBlocks };
    });
  };

  const handleRemoveBlock = (index: number) => {
    setCurrentArticle(prev => ({
      ...prev,
      contentBlocks: (prev.contentBlocks || []).filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = async (file: File, callback: (url: string) => void) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      toast.loading("이미지 업로드 중...");
      
      const { error: uploadError } = await supabase.storage
        .from('news_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('news_images')
        .getPublicUrl(filePath);

      callback(data.publicUrl);
      toast.dismiss();
      toast.success("이미지가 업로드되었습니다.");
    } catch (error: any) {
      toast.dismiss();
      toast.error("업로드 실패: " + error.message);
    }
  };

  const startNew = () => {
    const nextId = articles && articles.length > 0 
      ? String(Math.max(...articles.map(a => parseInt(a.id) || 0)) + 1)
      : "1";
    
    setCurrentArticle({
      id: nextId,
      category: "국제동향",
      title: "",
      date: new Date().toLocaleDateString('ko-KR'),
      thumbnail: "",
      excerpt: "",
      contentBlocks: []
    });
    setIsEditing(true);
  };

  const startEdit = (article: NewsArticle) => {
    setCurrentArticle(article);
    setIsEditing(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (inputPassword === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      toast.success("로그인 성공");
    } else {
      toast.error("비밀번호가 올바르지 않습니다.");
    }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">관리자 로그인</CardTitle>
            <p className="text-sm text-muted-foreground">기사 관리를 위해 비밀번호를 입력하세요.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="비밀번호" 
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">로그인</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {!isEditing ? (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">기획 기사 관리</h1>
                <Button onClick={startNew} className="gap-2">
                  <Plus className="w-4 h-4" /> 새 기사 작성
                </Button>
              </div>

              <div className="grid gap-4">
                {(articles || []).map(article => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center p-4">
                      <div className="w-16 h-16 rounded overflow-hidden bg-muted mr-4 flex-shrink-0 flex items-center justify-center">
                        {(() => {
                          const firstImageBlock = (article.contentBlocks || []).find(b => b.type === 'image' && b.value);
                          const displayThumbnail = article.thumbnail || firstImageBlock?.value;
                          return (
                            <img 
                              src={displayThumbnail} 
                              alt="" 
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/logo4.png';
                                (e.target as HTMLImageElement).className = 'w-1/2 h-auto opacity-20 object-contain';
                              }}
                            />
                          );
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">{article.category}</span>
                          <span className="text-xs text-muted-foreground">{article.date}</span>
                        </div>
                        <h2 className="font-bold truncate">{article.title}</h2>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="icon" onClick={() => window.open(`/news/${article.id}`, '_blank')}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => startEdit(article)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => {
                          if (confirm("정말 삭제하시겠습니까?")) deleteMutation.mutate(article.id);
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-3xl font-bold">기사 {currentArticle.id ? "수정" : "작성"}</h1>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader><CardTitle>기본 정보</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>기사 ID (숫자 권장)</Label>
                          <Input value={currentArticle.id} onChange={e => setCurrentArticle(p => ({ ...p, id: e.target.value }))} placeholder="예: 10" />
                        </div>
                        <div className="space-y-2">
                          <Label>카테고리</Label>
                          <select 
                            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            value={currentArticle.category} 
                            onChange={e => setCurrentArticle(p => ({ ...p, category: e.target.value }))}
                          >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>제목</Label>
                        <Input value={currentArticle.title} onChange={e => setCurrentArticle(p => ({ ...p, title: e.target.value }))} placeholder="기사 제목을 입력하세요" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>날짜</Label>
                          <Input value={currentArticle.date} onChange={e => setCurrentArticle(p => ({ ...p, date: e.target.value }))} placeholder="2026. 04. 25" />
                        </div>
                        <div className="space-y-2">
                          <Label>썸네일 이미지</Label>
                          <div className="flex gap-2">
                            <Input value={currentArticle.thumbnail} onChange={e => setCurrentArticle(p => ({ ...p, thumbnail: e.target.value }))} placeholder="/news_xxx.png" className="flex-1" />
                            <Button variant="outline" size="icon" className="shrink-0" asChild>
                              <label className="cursor-pointer">
                                <Upload className="w-4 h-4" />
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(file, url => setCurrentArticle(p => ({ ...p, thumbnail: url })));
                                  }} 
                                />
                              </label>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>요약 문구 (Excerpt)</Label>
                        <Textarea value={currentArticle.excerpt} onChange={e => setCurrentArticle(p => ({ ...p, excerpt: e.target.value }))} placeholder="목록에 표시될 요약 문구" rows={3} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Content Blocks */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">본문 구성</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleAddBlock('text')} className="gap-1.5">
                          <Type className="w-4 h-4" /> 텍스트 추가
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleAddBlock('image')} className="gap-1.5">
                          <ImageIcon className="w-4 h-4" /> 이미지 추가
                        </Button>
                      </div>
                    </div>

                    {currentArticle.contentBlocks?.map((block, idx) => (
                      <Card key={idx} className="relative group">
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="absolute -right-2 -top-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveBlock(idx)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                            {block.type === 'text' ? <Type className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                            {block.type === 'text' ? "Text Block" : "Image Block"}
                          </div>
                          {block.type === 'text' ? (
                            <Textarea 
                              value={block.value} 
                              onChange={e => handleUpdateBlock(idx, e.target.value)} 
                              placeholder="본문 내용을 입력하세요. **강조** 사용 가능."
                              rows={5}
                            />
                          ) : (
                            <div className="grid gap-3">
                              <div className="flex gap-2">
                                <Input 
                                  value={block.value} 
                                  onChange={e => handleUpdateBlock(idx, e.target.value)} 
                                  placeholder="이미지 경로 (예: /news_009_1.png)" 
                                  className="flex-1"
                                />
                                <Button variant="outline" size="icon" className="shrink-0" asChild>
                                  <label className="cursor-pointer">
                                    <Upload className="w-4 h-4" />
                                    <input 
                                      type="file" 
                                      className="hidden" 
                                      accept="image/*"
                                      onChange={e => {
                                        const file = e.target.files?.[0];
                                        if (file) handleImageUpload(file, url => handleUpdateBlock(idx, url));
                                      }} 
                                    />
                                  </label>
                                </Button>
                              </div>
                              <Input 
                                value={block.caption || ""} 
                                onChange={e => handleUpdateBlock(idx, block.value, e.target.value)} 
                                placeholder="이미지 캡션 (설명)" 
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Sidebar / Actions */}
                <div className="space-y-6">
                  <Card className="sticky top-24">
                    <CardHeader><CardTitle>작업</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full gap-2" onClick={() => saveMutation.mutate(currentArticle)} disabled={saveMutation.isPending}>
                        {saveMutation.isPending ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                        기사 저장하기
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => setIsEditing(false)}>
                        취소
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default AdminNews;
