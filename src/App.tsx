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

// Lazy imports for AI assistant page
const AIAssistantPage = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Assistant</h1>
        <p className="text-slate-400 text-sm mt-1">Your intelligent coding companion — powered by StackTruth AI</p>
      </div>
      <div className="glass-card p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-purple-500/30">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white">AI Assistant is ready!</h2>
        <p className="text-slate-400 max-w-md mx-auto">Use the floating AI widget in the bottom-right corner to chat with our AI assistant. It can help with code review, bug fixing, optimization, and much more.</p>
        <div className="flex items-center justify-center gap-2 text-sm text-blue-400 font-medium">
          <span>→ Look for the blue bot icon in the bottom-right</span>
        </div>
      </div>
    </div>
  );
};

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
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/questions/:id" element={<QuestionsPage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/knowledge" element={<KnowledgeBasePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/pricing" element={<PricingPage />} />
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
        <Route path="/ai-assistant" element={<AIAssistantPage />} />

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
