import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/contexts/ToastContext";
import PublicLayout from "@/components/layout/PublicLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import ScrollToTop from "@/components/layout/ScrollToTop";

// Pages
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DeveloperDashboard from "@/pages/DeveloperDashboard";
import ExpertDashboard from "@/pages/ExpertDashboard";
import RecruiterDashboard from "@/pages/RecruiterDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import QuestionsPage from "@/pages/QuestionsPage";
import CodeReviewPage from "@/pages/CodeReviewPage";
import TutorialsPage from "@/pages/TutorialsPage";
import KnowledgeBasePage from "@/pages/KnowledgeBasePage";
import AuthorGuidesPage from "@/pages/AuthorGuidesPage";
import JobsPage from "@/pages/JobsPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import ProfilePage from "@/pages/ProfilePage";
import TeamWorkspacePage from "@/pages/TeamWorkspacePage";
import LiveCodingPage from "@/pages/LiveCodingPage";
import AboutPage from "@/pages/AboutPage";
import PricingPage from "@/pages/PricingPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import CookiePolicyPage from "@/pages/CookiePolicyPage";
import NotFoundPage from "@/pages/NotFoundPage";

// New Pages
import DataStructuresPage from "@/pages/DataStructuresPage";
import AlgorithmsPage from "@/pages/AlgorithmsPage";
import SystemDesignPage from "@/pages/SystemDesignPage";
import PythonTutorialPage from "@/pages/PythonTutorialPage";
import MERNStackPage from "@/pages/MERNStackPage";
import CompanyWisePage from "@/pages/CompanyWisePage";
import TopicWisePage from "@/pages/TopicWisePage";
import ContestsPage from "@/pages/ContestsPage";
import CommunityPage from "@/pages/CommunityPage";
import PartnerProgramPage from "@/pages/PartnerProgramPage";
import CareersPage from "@/pages/CareersPage";
import AIAssistantPage from "@/pages/AIAssistantPage";
import CoursesPage from "@/pages/CoursesPage";


function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="glass-card p-12 text-center max-w-md mx-auto mt-12">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-white mb-2">Access Restricted</h2>
        <p className="text-slate-400 text-sm">This area requires {requiredRole} access. Your current role is {user?.role}.</p>
      </div>
    );
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated && user) {
    const dashboardPaths: Record<string, string> = {
      developer: "/dashboard/developer",
      expert: "/dashboard/expert",
      recruiter: "/dashboard/recruiter",
      admin: "/dashboard/admin",
    };
    return <Navigate to={dashboardPaths[user.role] || "/dashboard/developer"} replace />;
  }

  return <>{children}</>;
}

function DynamicLayout() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthLayout /> : <PublicLayout />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Strictly Public routes (No sidebar even if logged in) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
      </Route>

      {/* Feature pages (Sidebar if logged in, none if guest) */}
      <Route element={<DynamicLayout />}>
        {/* Questions & Topics */}
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/questions/:id" element={<QuestionsPage />} />
        <Route path="/questions/companies" element={<CompanyWisePage />} />
        <Route path="/questions/topics" element={<TopicWisePage />} />

        {/* Practice Tracks */}
        <Route path="/practice" element={<QuestionsPage />} />
        <Route path="/practice/data-structures" element={<DataStructuresPage />} />
        <Route path="/practice/algorithms" element={<AlgorithmsPage />} />
        <Route path="/practice/system-design" element={<SystemDesignPage />} />

        {/* Tutorials */}
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/tutorials/python" element={<PythonTutorialPage />} />
        <Route path="/tutorials/mern" element={<MERNStackPage />} />

        {/* Career & Knowledge */}
        <Route path="/knowledge" element={<KnowledgeBasePage />} />
        <Route path="/author-guides" element={<AuthorGuidesPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/partner" element={<PartnerProgramPage />} />
        <Route path="/contests" element={<ContestsPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Route>

      {/* Strictly Authenticated routes (Always has sidebar) */}
      <Route element={<AuthLayout />}>
        {/* Dashboards */}
        <Route path="/dashboard/developer" element={<ProtectedRoute><DeveloperDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/expert" element={<ProtectedRoute><ExpertDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/recruiter" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />

        {/* Protected Features */}
        <Route path="/questions/ask" element={<ProtectedRoute><QuestionsPage /></ProtectedRoute>} />
        <Route path="/code-review" element={<ProtectedRoute><CodeReviewPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/profile/settings" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/workspace" element={<ProtectedRoute><TeamWorkspacePage /></ProtectedRoute>} />
        <Route path="/live-coding" element={<ProtectedRoute><LiveCodingPage /></ProtectedRoute>} />
        <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistantPage /></ProtectedRoute>} />

        {/* Admin Specific */}
        <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/moderation" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/verification" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
