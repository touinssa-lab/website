import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check, Sparkles, Languages, Map as MapIcon, MousePointer2, MessageSquare, Navigation, User } from "lucide-react";
import { Button } from "./ui/button";

interface TourStep {
  targetId: string;
  title: string;
  content: string;
  icon: React.ReactNode;
}

interface AIGuideTourProps {
  isOpen: boolean;
  onClose: () => void;
  isMember: boolean;
  translations: any;
}

export const AIGuideTour: React.FC<AIGuideTourProps> = ({ isOpen, onClose, isMember, translations }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const steps: TourStep[] = React.useMemo(() => [
    {
      targetId: "tour-guide-button",
      title: translations.step0_title,
      content: translations.step0_content,
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
    },
    {
      targetId: "tour-login-section",
      title: translations.step1_title,
      content: translations.step1_content,
      icon: <User className="w-6 h-6 text-primary" />,
    },
    {
      targetId: "tour-language-selector",
      title: translations.step2_title,
      content: translations.step2_content,
      icon: <Languages className="w-6 h-6 text-blue-500" />,
    },
    {
      targetId: "tour-map-section",
      title: translations.step3_title,
      content: translations.step3_content,
      icon: <User className="w-6 h-6 text-indigo-500" />,
    },
    {
      targetId: "tour-region-buttons",
      title: translations.step4_title,
      content: translations.step4_content,
      icon: <MapIcon className="w-6 h-6 text-emerald-500" />,
    },
    {
      targetId: "tour-chat-input",
      title: translations.step5_title,
      content: translations.step5_content,
      icon: <MessageSquare className="w-6 h-6 text-sky-500" />,
    },
    {
      targetId: "tour-chat-area",
      title: translations.step6_title,
      content: translations.step6_content,
      icon: <Navigation className="w-6 h-6 text-rose-500" />,
    },
  ], [translations]);

  const updateCoords = useCallback(() => {
    if (!steps[currentStep]) return;
    
    let targetId = steps[currentStep].targetId;
    let element = document.getElementById(targetId);
    
    // Auto-skip login step if already logged in (now at index 1)
    if (isMember && targetId === "tour-login-section" && currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    // Fallback logic for region selection if map is hidden
    if (!element && targetId === "tour-map-section") {
      targetId = "tour-persona-card";
      element = document.getElementById(targetId);
    }

    // Fallback logic for language selector if hidden (chat view)
    if (!element && targetId === "tour-language-selector") {
      targetId = "tour-change-lang-button";
      element = document.getElementById(targetId);
    }
    
    // Fallback logic for explore other buttons
    if (!element && targetId === "tour-region-buttons") {
      targetId = "tour-explore-other";
      element = document.getElementById(targetId);
    }

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const rect = element.getBoundingClientRect();
      setCoords({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    }
  }, [currentStep, isMember, steps]);

  useEffect(() => {
    if (isOpen) {
      // Refresh coordinates multiple times to handle layout shifts and animations
      const refreshIntervals = [50, 150, 300, 600, 1000, 2000];
      const timers = refreshIntervals.map(delay => setTimeout(updateCoords, delay));
      
      window.addEventListener("resize", updateCoords);
      window.addEventListener("scroll", updateCoords, true);
      
      return () => {
        timers.forEach(clearTimeout);
        window.removeEventListener("resize", updateCoords);
        window.removeEventListener("scroll", updateCoords, true);
      };
    }
  }, [isOpen, currentStep, updateCoords]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] overflow-hidden">
      {/* Dimmed Background with Spotlight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] pointer-events-auto"
        style={{
          clipPath: `polygon(0% 0%, 0% 100%, ${coords.left}px 100%, ${coords.left}px ${coords.top}px, ${coords.left + coords.width}px ${coords.top}px, ${coords.left + coords.width}px ${coords.top + coords.height}px, ${coords.left}px ${coords.top + coords.height}px, ${coords.left}px 100%, 100% 100%, 100% 0%)`
        }}
      />

      {/* Invisible layer to block clicks in the spotlight hole */}
      <div className="absolute inset-0 pointer-events-auto" />

      {/* Spotlight Border Effect */}
      <motion.div
        animate={{
          top: coords.top - 4,
          left: coords.left - 4,
          width: coords.width + 8,
          height: coords.height + 8,
          opacity: 1
        }}
        initial={{ opacity: 0 }}
        className="absolute border-2 border-amber-400 rounded-2xl shadow-[0_0_20px_rgba(251,191,36,0.5)] pointer-events-none"
      />

      {/* Tooltip Content - Safe dynamic positioning */}
      <div className={`absolute inset-0 flex flex-col pointer-events-none p-6 md:p-12 transition-all duration-500 ${coords.top > window.innerHeight / 2 ? 'justify-start' : 'justify-end'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: coords.top > window.innerHeight / 2 ? -20 : 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: coords.top > window.innerHeight / 2 ? -20 : 20, scale: 0.9 }}
            className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-auto pointer-events-auto border border-slate-100 relative overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-6 mt-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                {steps[currentStep].icon}
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {steps[currentStep].title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {steps[currentStep].content}
                </p>
              </div>

              <div className="flex items-center justify-between w-full pt-4">
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-primary' : 'w-1.5 bg-slate-200'}`}
                    />
                  ))}
                </div>

                <div className="flex gap-3">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="rounded-xl px-4 py-2 font-bold text-slate-600 border-slate-200"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> PREV
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => {
                      if (currentStep < steps.length - 1) {
                        setCurrentStep(prev => prev + 1);
                      } else {
                        onClose();
                      }
                    }}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2 font-bold shadow-lg shadow-primary/20"
                  >
                    {currentStep === steps.length - 1 ? (
                      <>START <Check className="w-4 h-4 ml-2" /></>
                    ) : (
                      <>NEXT <ChevronRight className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>,
    document.body
  );
};
