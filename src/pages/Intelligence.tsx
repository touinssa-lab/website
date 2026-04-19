import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Lightbulb, Construction } from "lucide-react";
import AntigravityBackground from "@/components/AntigravityBackground";

const Intelligence = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in relative overflow-hidden">
      <Header />
      
      <section className="hero-gradient text-white py-14 md:py-20 relative overflow-hidden">
        <AntigravityBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-medium tracking-widest uppercase opacity-80 mb-4">Intelligence</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl">
              투어리즘인사이트의 <br />지능형 관광 솔루션
            </h1>
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex p-5 rounded-full bg-accent/10 text-accent mb-4">
            <Construction className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold">서비스 준비 중입니다</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            데이터 기반의 지능형 관광 컨설팅 플랫폼 'Intelligence' 서비스가 곧 공개될 예정입니다. <br />
            더욱 정교하고 혁신적인 통찰력을 제공하기 위해 준비 중이니 잠시만 기다려 주세요.
          </p>
          <div className="pt-8 flex justify-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-accent">
              <Lightbulb className="w-4 h-4" />
              <span>Smart Solutions Incoming</span>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Intelligence;
