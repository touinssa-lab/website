import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { NewsArticle } from "@/data/newsData";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  ChevronUp,
  ChevronDown,
  Search,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["국제동향", "관광동향", "관광 통계", "호텔업동향", "축제이벤트"];

const NewsManagement = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentArticle, setCurrentArticle] = useState<Partial<NewsArticle>>({
    id: "",
    category: "국제동향",
    title: "",
    date: new Date().toLocaleDateString('ko-KR').replace(/\s/g, '').replace(/\.$/, ''),
    thumbnail: "",
    excerpt: "",
    contentBlocks: [],
    visibility: "all"
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
        contentBlocks: item.content_blocks,
        visibility: item.visibility || "all"
      })) as NewsArticle[];
    }
  });

  // Filtered articles
  const filteredArticles = articles?.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (article: Partial<NewsArticle>) => {
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
        content_blocks: article.contentBlocks,
        visibility: article.visibility || "all"
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

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    setCurrentArticle(prev => {
      const blocks = [...(prev.contentBlocks || [])];
      if (direction === 'up' && index > 0) {
        [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
      } else if (direction === 'down' && index < blocks.length - 1) {
        [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
      }
      return { ...prev, contentBlocks: blocks };
    });
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
      contentBlocks: [],
      visibility: "all"
    });
    setIsEditing(true);
  };

  const startEdit = (article: NewsArticle) => {
    setCurrentArticle(article);
    setIsEditing(true);
  };

  return (
    <AdminLayout>
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="기사 제목 또는 카테고리 검색..." 
                  className="pl-10 h-11 border-none shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 h-11 px-4">
                  <Filter className="w-4 h-4" /> 필터
                </Button>
                <Button onClick={startNew} className="gap-2 h-11 px-6 font-bold">
                  <Plus className="w-4 h-4" /> 새 기사 작성
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {isLoading ? (
                <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
              ) : filteredArticles?.map(article => (
                <Card key={article.id} className="border-none shadow-sm hover:shadow-md transition-all group">
                  <CardContent className="flex items-center p-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 mr-6 flex-shrink-0 flex items-center justify-center border border-slate-50">
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
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">{article.category}</span>
                        {article.visibility === 'panel' && (
                          <span className="text-[10px] bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">패널 전용</span>
                        )}
                        <span className="text-xs text-slate-400 font-medium">{article.date}</span>
                      </div>
                      <h2 className="font-bold text-slate-800 text-lg truncate group-hover:text-primary transition-colors">{article.title}</h2>
                    </div>
                    <div className="flex gap-2 ml-6">
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-primary/5 hover:text-primary" onClick={() => window.open(`/news/${article.id}`, '_blank')}>
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-emerald-50 hover:text-emerald-600" onClick={() => startEdit(article)}>
                        <Pencil className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-destructive/5 text-slate-400 hover:text-destructive" onClick={() => {
                        if (confirm("정말 삭제하시겠습니까?")) deleteMutation.mutate(article.id);
                      }}>
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {!isLoading && filteredArticles?.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                  <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">검색 결과가 없습니다.</p>
                </div>
              )}
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
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsEditing(false)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-slate-800">기사 {currentArticle.id ? "수정" : "작성"}</h1>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Basic Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader className="border-b border-slate-50"><CardTitle className="text-lg">기본 정보</CardTitle></CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-slate-600">기사 ID (숫자 권장)</Label>
                        <Input value={currentArticle.id} onChange={e => setCurrentArticle(p => ({ ...p, id: e.target.value }))} placeholder="예: 10" className="h-11" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-600">카테고리</Label>
                        <Input 
                          list="category-suggestions"
                          value={currentArticle.category} 
                          onChange={e => setCurrentArticle(p => ({ ...p, category: e.target.value }))}
                          placeholder="카테고리를 선택하거나 직접 입력하세요"
                          className="h-11"
                        />
                        <datalist id="category-suggestions">
                          {Array.from(new Set([
                            ...CATEGORIES,
                            ...(articles?.map(a => a.category) || [])
                          ])).map(c => <option key={c} value={c} />)}
                        </datalist>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-600">제목</Label>
                      <Input value={currentArticle.title} onChange={e => setCurrentArticle(p => ({ ...p, title: e.target.value }))} placeholder="기사 제목을 입력하세요" className="h-11" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-slate-600">날짜</Label>
                        <Input value={currentArticle.date} onChange={e => setCurrentArticle(p => ({ ...p, date: e.target.value }))} placeholder="2026. 04. 25" className="h-11" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-600">썸네일 이미지</Label>
                        <div className="flex gap-2">
                          <Input value={currentArticle.thumbnail} onChange={e => setCurrentArticle(p => ({ ...p, thumbnail: e.target.value }))} placeholder="https://..." className="flex-1 h-11" />
                          <Button variant="outline" size="icon" className="shrink-0 h-11 w-11" asChild>
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
                      <Label className="text-slate-600">요약 문구 (Excerpt)</Label>
                      <Textarea value={currentArticle.excerpt} onChange={e => setCurrentArticle(p => ({ ...p, excerpt: e.target.value }))} placeholder="목록에 표시될 요약 문구" rows={3} />
                    </div>
                  </CardContent>
                </Card>

                {/* Content Blocks */}
                <div className="space-y-4 pb-20">
                  <div className="flex justify-between items-center px-1">
                    <h2 className="text-lg font-bold text-slate-800">본문 구성</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleAddBlock('text')} className="gap-1.5 rounded-full px-4 h-9">
                        <Type className="w-4 h-4" /> 텍스트 추가
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAddBlock('image')} className="gap-1.5 rounded-full px-4 h-9">
                        <ImageIcon className="w-4 h-4" /> 이미지 추가
                      </Button>
                    </div>
                  </div>

                  {currentArticle.contentBlocks?.map((block, idx) => (
                    <Card key={idx} className="relative group border-none shadow-sm overflow-visible">
                      <div className="absolute -right-3 -top-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all z-10 scale-90 group-hover:scale-100">
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="w-8 h-8 rounded-full shadow-md border border-slate-100 bg-white"
                          onClick={() => handleMoveBlock(idx, 'up')}
                          disabled={idx === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="w-8 h-8 rounded-full shadow-md border border-slate-100 bg-white"
                          onClick={() => handleMoveBlock(idx, 'down')}
                          disabled={idx === (currentArticle.contentBlocks?.length || 0) - 1}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="w-8 h-8 rounded-full shadow-md"
                          onClick={() => handleRemoveBlock(idx)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <CardContent className="p-5 space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {block.type === 'text' ? <Type className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
                          {block.type === 'text' ? "Text Block" : "Image Block"}
                        </div>
                        {block.type === 'text' ? (
                          <Textarea 
                            value={block.value} 
                            onChange={e => handleUpdateBlock(idx, e.target.value)} 
                            placeholder="본문 내용을 입력하세요. **볼드**, *이태릭*, ***볼드+이태릭*** 사용 가능."
                            className="min-h-[160px] border-slate-100 focus:ring-primary/10"
                          />
                        ) : (
                          <div className="grid gap-4">
                            <div className="flex gap-3">
                              <Input 
                                value={block.value} 
                                onChange={e => handleUpdateBlock(idx, e.target.value)} 
                                placeholder="이미지 경로 (https://...)" 
                                className="flex-1 h-11 border-slate-100"
                              />
                              <Button variant="outline" size="icon" className="shrink-0 h-11 w-11 border-slate-100" asChild>
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
                              className="h-10 border-slate-100 text-xs"
                            />
                            {block.value && (
                              <div className="mt-2 rounded-xl overflow-hidden border border-slate-100 max-h-40 bg-slate-50">
                                <img src={block.value} alt="" className="w-full h-full object-contain" />
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar / Actions */}
              <div className="space-y-6">
                <Card className="sticky top-28 border-none shadow-sm">
                  <CardHeader className="border-b border-slate-50"><CardTitle className="text-lg">노출 및 저장</CardTitle></CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <div className="space-y-3">
                      <Label className="text-slate-600">노출 권한 설정</Label>
                      <RadioGroup 
                        value={currentArticle.visibility || "all"} 
                        onValueChange={(v: "all" | "panel") => setCurrentArticle(p => ({ ...p, visibility: v }))}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                          <RadioGroupItem value="all" id="v-all" />
                          <Label htmlFor="v-all" className="flex-1 cursor-pointer font-medium">일반 노출 (모두 공개)</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                          <RadioGroupItem value="panel" id="v-panel" />
                          <Label htmlFor="v-panel" className="flex-1 cursor-pointer font-medium text-amber-600">패널 전용 (로그인 필수)</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-50">
                      <Button className="w-full h-12 gap-2 text-base font-bold shadow-lg shadow-primary/20" onClick={() => saveMutation.mutate(currentArticle)} disabled={saveMutation.isPending}>
                        {saveMutation.isPending ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                        기사 저장하기
                      </Button>
                      <Button variant="outline" className="w-full h-11 font-medium border-slate-200" onClick={() => setIsEditing(false)}>
                        편집 취소
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
};

export default NewsManagement;
