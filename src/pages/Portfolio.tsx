import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { portfolioItems, PortfolioItem } from "@/data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, BookOpen, PenTool, X, ExternalLink, Info } from "lucide-react";
import AntigravityBackground from "@/components/AntigravityBackground";
import { Button } from "@/components/ui/button";
import GoseongClimateDetail from "@/components/portfolio/GoseongClimateDetail";

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const closeModal = () => setSelectedItem(null);

  // 첫 문장만 추출하는 함수
  const getSummary = (text: string) => {
    const firstSentence = text.split('.')[0];
    return firstSentence ? firstSentence + '.' : text;
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {portfolioItems.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-card hover:bg-white transition-all duration-500 rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-2xl flex flex-col sm:flex-row h-auto sm:h-[220px]"
            >
              {/* Image Section */}
              <div className="w-full sm:w-[200px] lg:w-[220px] h-[180px] sm:h-full relative overflow-hidden shrink-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 flex flex-col justify-center overflow-hidden">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="inline-flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/10">
                    <Calendar className="w-4 h-4" />
                    {item.year}
                  </div>
                  {item.categories.slice(0, 2).map((cat, i) => (
                    <div key={i} className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                      {cat === "연구용역" ? <BookOpen className="w-4 h-4" /> : <PenTool className="w-4 h-4" />}
                      {cat}
                    </div>
                  ))}
                </div>

                <h2 className="text-base md:text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {item.title}
                </h2>
                
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-2 font-medium">
                  {item.description}
                </p>

                <div className="mt-4 flex items-center text-primary font-bold text-xs gap-1 group/link">
                  상세 보기
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal Section */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full ${selectedItem.isSpecialDetail ? 'max-w-6xl' : 'max-w-4xl'} max-h-[90vh] bg-white rounded-2xl md:rounded-[20px] shadow-2xl overflow-hidden flex flex-col`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Moved and z-indexed for guaranteed accessibility */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-[60] w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center hover:bg-slate-50 transition-all hover:scale-110 active:scale-95 group"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-slate-900 transition-transform group-hover:rotate-90" />
              </button>

              <div className="overflow-y-auto flex-1">
                {selectedItem.isSpecialDetail ? (
                  <GoseongClimateDetail />
                ) : (
                  <div className="p-0">
                    <div className="aspect-video w-full relative">
                      <img 
                        src={selectedItem.imageUrl} 
                        alt={selectedItem.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                    </div>

                    <div className="px-8 md:px-12 pb-12 -mt-20 relative z-10">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                          <Calendar className="w-4 h-4" />
                          {selectedItem.year}
                        </div>
                        {selectedItem.categories.map((cat, i) => (
                          <div key={i} className="inline-flex items-center gap-1.5 bg-white text-slate-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-md border border-slate-100">
                            {cat === "연구용역" ? <BookOpen className="w-4 h-4" /> : <PenTool className="w-4 h-4" />}
                            {cat}
                          </div>
                        ))}
                      </div>

                      <h2 className="text-2xl md:text-4xl font-bold mb-8 text-slate-900 leading-tight">
                        {selectedItem.title}
                      </h2>

                      <div className="space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-primary font-bold">
                            <Info className="w-5 h-5" />
                            사업 내용
                          </div>
                          <p className="text-slate-600 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium">
                            {selectedItem.description}
                          </p>
                        </div>

                        {selectedItem.externalLink && (
                          <div className="pt-8 border-t border-slate-100">
                            <Button 
                              asChild
                              className="rounded-2xl h-14 px-8 text-base font-bold bg-[#255282] hover:bg-[#1a3a5c] shadow-xl hover:shadow-primary/20 transition-all gap-2"
                            >
                              <a href={selectedItem.externalLink} target="_blank" rel="noopener noreferrer">
                                연구보고서 자세히 보기
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Portfolio;
