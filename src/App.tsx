import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import DashboardExpert from "./pages/DashboardExpert";
import DashboardRecruiter from "./pages/DashboardRecruiter";
import DashboardAdmin from "./pages/DashboardAdmin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Questions from "./pages/Questions";
import QuestionDetail from "./pages/QuestionDetail";
import AskQuestion from "./pages/AskQuestion";
import KnowledgeBase from "./pages/KnowledgeBase";
import AIAssistant from "./pages/AIAssistant";
import CodeReview from "./pages/CodeReview";
import Teams from "./pages/Teams";
import LiveCoding from "./pages/LiveCoding";
import Jobs from "./pages/Jobs";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import Documentation from "./pages/Documentation";
import Tutorials from "./pages/Tutorials";
import Careers from "./pages/Careers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/expert" element={<DashboardExpert />} />
            <Route path="/dashboard/recruiter" element={<DashboardRecruiter />} />
            <Route path="/dashboard/admin" element={<DashboardAdmin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/questions/ask" element={<AskQuestion />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/code-review" element={<CodeReview />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/live-coding" element={<LiveCoding />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
