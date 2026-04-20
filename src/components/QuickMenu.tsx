import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ClipboardList, ArrowUp, ChevronRight } from "lucide-react";

const QuickMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    {
      id: "articles",
      label: (
        <>
          관광산업<br />최신동향
        </>
      ),
      icon: FileText,
      path: "/news#articles",
      color: "bg-primary",
    },
    {
      id: "surveys",
      label: (
        <>
          2026<br />설문조사
        </>
      ),
      icon: ClipboardList,
      path: "/survey",
      color: "bg-accent",
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    const [pathname, hash] = path.split("#");
    if (location.pathname === pathname && hash) {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4 items-end pointer-events-none">
      <AnimatePresence>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="pointer-events-auto"
          >
            <Link
              to={item.path}
              onClick={(e) => handleLinkClick(e, item.path)}
              className="group"
            >
              <div className={`w-20 h-20 flex flex-col items-center justify-center rounded-lg ${item.color} text-white shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden active:scale-95 border border-white/20`}>
                <item.icon className="w-6 h-6 mb-1.5 relative z-10 transition-transform group-hover:scale-110 text-white" />
                <span className="text-[13px] font-black leading-[1.2] relative z-10 text-center px-1 tracking-tighter text-amber-400 group-hover:text-amber-300 transition-colors drop-shadow-md">
                  {item.label}
                </span>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </motion.div>
        ))}

        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="pointer-events-auto w-20 h-10 flex items-center justify-center rounded-md bg-card/90 backdrop-blur-md border border-border/50 text-foreground shadow-lg hover:bg-muted transition-all duration-300 group mt-2"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickMenu;
