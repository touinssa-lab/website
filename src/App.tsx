import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Company from "./pages/Company";
import Portfolio from "./pages/Portfolio";
import NewsRoom from "./pages/NewsRoom";
import NewsDetail from "./pages/NewsDetail";
import Contact from "./pages/Contact";
import AdminNews from "./pages/AdminNews";
import Intelligence from "./pages/Intelligence";
import Survey from "./pages/Survey";
import QuickMenu from "./components/QuickMenu";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/company" element={<Company />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/news" element={<NewsRoom />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <QuickMenu />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
