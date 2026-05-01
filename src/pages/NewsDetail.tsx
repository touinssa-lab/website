import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NewsArticle } from "@/data/newsData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { PanelRegistrationModal } from "@/components/survey/PanelRegistrationModal";
import PanelAccessNoticeModal from "@/components/survey/PanelAccessNoticeModal";
import { Lock, UserPlus, ArrowLeft, Calendar, Tag, ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { panelInfo } = useAuth();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  
  // Like states
  const [likes, setLikes] = useState(Math.floor(Math.random() * 20) + 5);
  const [isLiked, setIsLiked] = useState(false);

  // Scroll to top when article is loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fetch all news to handle navigation
  const { data: newsItems, isLoading } = useQuery({
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
        visibility: item.visibility || 'all'
      })) as NewsArticle[];
    }
  });

  const currentIndex = newsItems ? newsItems.findIndex(item => item.id === id) : -1;
  const article = currentIndex >= 0 ? newsItems![currentIndex] : null;

  const prevArticle = newsItems && currentIndex > 0 ? newsItems[currentIndex - 1] : null;
  const nextArticle = newsItems && currentIndex >= 0 && currentIndex < newsItems.length - 1 ? newsItems[currentIndex + 1] : null;

  const parseStyles = (text: string) => {
    const parts = text.split(/(\*\*\*[\s\S]*?\*\*\*|\*\*[\s\S]*?\*\*|\*[\s\S]*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('***') && part.endsWith('***')) return <strong key={i} className="text-foreground font-bold italic">{part.slice(3, -3)}</strong>;
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="text-foreground font-bold">{part.slice(2, -2)}</strong>;
      if (part.startsWith('*') && part.endsWith('*')) return <em key={i} className="text-foreground italic">{part.slice(1, -1)}</em>;
      return part;
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    
    if (!isLiked) {
      toast({
        title: "좋아요!",
        description: "이 기사가 마음에 드셨군요.",
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "주소 복사 완료",
      description: "기사 주소가 클립보드에 복사되었습니다. 소셜미디어에 공유해 보세요!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">해당 기사를 찾을 수 없습니다.</h1>
        <button onClick={() => navigate('/news')} className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative selection:bg-accent/20">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-fade-in">
        
        {/* Back Link */}
        <Link to="/news" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          목록으로 돌아가기
        </Link>

        {/* Article Header */}
        <header className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium mb-6">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full border border-accent/20 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground mr-4">
              <Calendar className="w-4 h-4" />
              업로드: {article.date}
            </span>

            <div className="flex items-center gap-3 ml-auto">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all duration-300 ${
                  isLiked 
                    ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-rose-200 hover:text-rose-500 hover:bg-rose-50/30'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs font-bold">{likes}</span>
              </button>
              <button 
                onClick={handleShare}
                className="p-2.5 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-primary transition-all duration-300 group relative"
                title="공유하기"
              >
                <Share2 className="w-4 h-4" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  주소 복사하기
                </span>
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-serif mb-6 break-keep">
            {article.title}
          </h1>
        </header>

        {article.visibility === 'panel' && !panelInfo ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 px-6 bg-muted/30 rounded-3xl border border-border/50 backdrop-blur-sm"
          >
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Lock className="w-10 h-10 text-amber-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-6">패널 가입 회원 전용 기사입니다.</h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed mb-10">
              해당 콘텐츠를 이용하시려면 설문조사 패널로 등록해 주세요.<br />
              소셜 로그인 방식으로 안전하고 빠르게 가입하실 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Button 
                onClick={() => setIsNoticeModalOpen(true)}
                className="h-14 px-8 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg shadow-xl shadow-rose-200 transition-all transform hover:scale-[1.02]"
              >
                <Lock className="w-5 h-5 mr-2" />
                지금 바로 패널 등록하고 읽기
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/news')}
                className="h-14 px-8 rounded-2xl border-slate-200 text-slate-600 font-bold text-lg hover:bg-slate-50 transition-all"
              >
                다른 기사 보기
              </Button>
            </div>
          </motion.div>
        ) : (
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {article.contentBlocks.map((block, idx) => {
              if (block.type === 'text') {
                return (
                  <p key={idx} className="text-muted-foreground md:text-lg leading-relaxed mb-6 whitespace-pre-line tracking-wide break-keep">
                    {parseStyles(block.value)}
                  </p>
                );
              } 
              if (block.type === 'image') {
                return (
                  <figure key={idx} className="my-10 md:my-14 overflow-hidden rounded-2xl mx-auto border border-border/50 bg-card">
                    <img 
                      src={block.value} 
                      alt={block.caption || article.title} 
                      className="w-full h-auto object-cover max-h-[600px]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/logo4.png';
                        (e.target as HTMLImageElement).className = 'w-1/3 h-auto m-auto py-12 object-contain opacity-20';
                      }}
                    />
                    {block.caption && (
                      <figcaption className="text-center text-sm text-muted-foreground py-3 border-t border-border/50 bg-muted/10">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return null;
            })}
          </article>
        )}

        {/* Footer Navigation (Prev/Next) */}
        <div className="mt-20 pt-8 border-t border-border/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link to={`/news/${prevArticle.id}`} className="flex flex-col p-6 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors group">
                <span className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <ChevronLeft className="w-3.5 h-3.5" /> 이전 기사
                </span>
                <span className="font-semibold line-clamp-1 group-hover:text-accent transition-colors">{prevArticle.title}</span>
              </Link>
            ) : <div />}

            {nextArticle ? (
              <Link to={`/news/${nextArticle.id}`} className="flex flex-col p-6 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors text-right group items-end">
                <span className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  다음 기사 <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="font-semibold line-clamp-1 group-hover:text-accent transition-colors text-left">{nextArticle.title}</span>
              </Link>
            ) : <div />}
          </div>
        </div>

      </main>

      <Footer />
      
      <PanelRegistrationModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />

      <PanelAccessNoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onConfirm={() => {
          setIsNoticeModalOpen(false);
          setIsModalOpen(true);
        }}
      />
    </div>
  );
};

export default NewsDetail;
