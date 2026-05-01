import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NewsArticle } from "@/data/newsData";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
        contentBlocks: item.content_blocks
      })) as NewsArticle[];
    }
  });

  const currentIndex = newsItems ? newsItems.findIndex(item => item.id === id) : -1;
  const article = currentIndex >= 0 ? newsItems![currentIndex] : null;

  const prevArticle = newsItems && currentIndex > 0 ? newsItems[currentIndex - 1] : null;
  const nextArticle = newsItems && currentIndex >= 0 && currentIndex < newsItems.length - 1 ? newsItems[currentIndex + 1] : null;

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
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              업로드: {article.date}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-serif mb-6 break-keep">
            {article.title}
          </h1>
        </header>

        {/* Article Content Render */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {article.contentBlocks.map((block, idx) => {
            if (block.type === 'text') {
              // Parse ***bold-italic***, **bold**, and *italic* (supports multi-line)
              const parts = block.value.split(/(\*\*\*[\s\S]*?\*\*\*|\*\*[\s\S]*?\*\*|\*[\s\S]*?\*)/g);
              return (
                <p key={idx} className="text-muted-foreground md:text-lg leading-relaxed mb-6 whitespace-pre-line tracking-wide break-keep">
                  {parts.map((part, i) => {
                    if (part.startsWith('***') && part.endsWith('***')) {
                      return <strong key={i} className="text-foreground font-bold italic">{part.slice(3, -3)}</strong>;
                    }
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={i} className="text-foreground font-bold">{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('*') && part.endsWith('*')) {
                      return <em key={i} className="text-foreground italic">{part.slice(1, -1)}</em>;
                    }
                    return part;
                  })}
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
    </div>
  );
};

export default NewsDetail;
