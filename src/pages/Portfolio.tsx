import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { portfolioItems } from "@/data/portfolioData";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, BookOpen, PenTool } from "lucide-react";
import AntigravityBackground from "@/components/AntigravityBackground";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in relative overflow-hidden">
      <Header />
      
      <section className="hero-gradient text-white min-h-[200px] md:min-h-[260px] flex items-center relative overflow-hidden">
        <AntigravityBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg font-bold tracking-wider uppercase text-sky-400 mb-4">Our Track Records</p>
            <h1 className="text-3xl md:text-5xl font-semibold font-sans leading-relaxed drop-shadow-md max-w-3xl">
              가치를 입증하는 주요 실적
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-16">
          {portfolioItems.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              key={item.id}
              className="glass-panel overflow-hidden border border-border/60 group"
            >
              <div className="grid lg:grid-cols-12 gap-0 items-stretch">
                {/* Image Section */}
                <div className="lg:col-span-5 relative overflow-hidden bg-muted/20 aspect-[4/3] lg:aspect-auto lg:min-h-[480px]">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    src={item.imageUrl} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-2xl lg:rounded-t-none lg:rounded-l-2xl border-b lg:border-b-0 lg:border-r border-border/40"
                  />
                  {/* Subtle overlay for dark mode readability */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Content Section */}
                <div className="lg:col-span-7 p-6 lg:px-12 lg:pt-6 lg:pb-10 flex flex-col justify-start relative bg-muted/60 dark:bg-muted/40">
                  <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-accent mb-6">
                    <div className="flex items-center gap-1.5 bg-accent/10 px-3 py-1.5 rounded-full ring-1 ring-accent/20">
                      <Calendar className="w-4 h-4" />
                      {item.year}
                    </div>
                    {item.categories.map((cat, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-accent/10 px-3 py-1.5 rounded-full ring-1 ring-accent/20">
                        {cat === "연구용역" ? <BookOpen className="w-4 h-4" /> : <PenTool className="w-4 h-4" />}
                        {cat}
                      </div>
                    ))}
                    </div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-6 font-serif leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                    {item.description}
                  </p>

                  <div className="mt-auto">
                    {item.externalLink ? (
                      <a 
                        href={item.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-accent transition-colors uppercase tracking-wider group/btn cursor-pointer"
                      >
                        연구보고서 자세히 보기
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                      </a>
                    ) : (
                      <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground/60 cursor-not-allowed uppercase tracking-wider group/btn">
                        연구보고서 준비 중
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
