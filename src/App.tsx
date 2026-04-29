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
import Intelligence from "./pages/Intelligence";
import Survey from "./pages/Survey";
import SurveyDetail from "./pages/SurveyDetail";
import SurveyThankYou from "./pages/SurveyThankYou";
import QuickMenu from "./components/QuickMenu";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminNews from "./pages/admin/News";
import AdminPanels from "./pages/admin/Panels";
import AdminSurveys from "./pages/admin/Surveys";

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
          <Route path="/survey/thank-you" element={<SurveyThankYou />} />
          <Route path="/survey/:id" element={<SurveyDetail />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/panels" element={<AdminPanels />} />
          <Route path="/admin/surveys" element={<AdminSurveys />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <QuickMenu />
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
