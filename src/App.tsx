import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Features from "./pages/Features";
import Careers from "./pages/Careers";
import TeamsMarketing from "./pages/TeamsMarketing";
import Contact from "./pages/Contact";
import LiveSession from "./pages/LiveSession";
import Pricing from "./pages/Pricing";
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

import Documentation from "./pages/Documentation";
import Tutorials from "./pages/Tutorials";
import CodeReviewDetail from "./pages/CodeReviewDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/expert" element={<ProtectedRoute><DashboardExpert /></ProtectedRoute>} />
            <Route path="/dashboard/recruiter" element={<ProtectedRoute><DashboardRecruiter /></ProtectedRoute>} />
            <Route path="/dashboard/admin" element={<ProtectedRoute><DashboardAdmin /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
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
            <Route path="/code-review/:id" element={<CodeReviewDetail />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/live-coding" element={<LiveCoding />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />

            <Route path="/docs" element={<Documentation />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/teams-info" element={<TeamsMarketing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/live-session/:id" element={<ProtectedRoute><LiveSession /></ProtectedRoute>} />
            <Route path="/live-session/mock" element={<ProtectedRoute><LiveSession /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
