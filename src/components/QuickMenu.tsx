import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowUp, ChevronRight, BarChart3, Compass } from "lucide-react";

const QuickMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdmin) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-40 z-[100] flex flex-col gap-4 items-end pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-3 pointer-events-auto"
          >
            {/* AI Tourism Button */}
            <Link 
              to="/ai-guide"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-2xl shadow-indigo-200 hover:scale-105 transition-all group"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] opacity-80 font-medium">Smart Travel</span>
                <span className="text-sm font-bold">AI 관광 가이드</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-sky-600 transition-colors">
                <Compass className="w-5 h-5" />
              </div>
            </Link>

            {/* AI Data Analysis Button */}
            <Link 
              to="/ai-guide?view=analysis"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 shadow-xl hover:border-indigo-300 hover:scale-105 transition-all group"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-muted-foreground font-medium">Data Analysis</span>
                <span className="text-sm font-bold">AI 데이터분석</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <BarChart3 className="w-5 h-5" />
              </div>
            </Link>

            {/* Latest News Button */}
            <Link 
              to="/news"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 shadow-xl hover:border-primary/30 hover:scale-105 transition-all group"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-muted-foreground font-medium">Latest Signals</span>
                <span className="text-sm font-bold">최신 기획 기사</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top - Always at bottom regardless of banner position */}
      <div className="fixed right-6 bottom-10">
        <AnimatePresence>
          {isVisible && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-600 shadow-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuickMenu;
