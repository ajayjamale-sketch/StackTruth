import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Github, Eye, EyeOff, Zap, ArrowRight, AlertCircle, Shield, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import type { UserRole } from "@/types";

const DEMO_ACCOUNTS: { role: UserRole; email: string; label: string; color: string }[] = [
  { role: "developer", email: "alex@example.com", label: "Developer", color: "bg-primary text-white" },
  { role: "expert", email: "sarah@example.com", label: "Expert", color: "bg-slate-700 text-white" },
  { role: "recruiter", email: "hiring@techforge.com", label: "Recruiter", color: "bg-blue-600 text-white" },
  { role: "admin", email: "admin@stacktruth.com", label: "Admin", color: "bg-destructive text-white" },
];

export default function LoginPage() {
  const { login, loginWithGitHub, loginWithGoogle, loginAsRole } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const getRolePath = (email: string) => {
    const roleMap: Record<string, string> = {
      "alex@example.com": "/dashboard/developer",
      "sarah@example.com": "/dashboard/expert",
      "hiring@techforge.com": "/dashboard/recruiter",
      "admin@stacktruth.com": "/dashboard/admin",
    };
    return roleMap[email] || "/dashboard/developer";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const ok = await login(email, password);
    setIsLoading(false);
    if (ok) {
      success("Login Successful", "Welcome back to the portal.");
      navigate(getRolePath(email));
    } else {
      error("Authentication failed", "Please check your email and password.");
    }
  };

  const handleForgotPassword = () => {
    if (email.includes("@")) {
      success("Reset Link Sent", `Password reset instructions sent to ${email}`);
    } else {
      error("Email Required", "Please enter your email address first.");
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    loginAsRole(role);
    success(`Authenticated as ${role}`, "Loading workspace...");
    const paths: Record<UserRole, string> = {
      developer: "/dashboard/developer",
      expert: "/dashboard/expert",
      recruiter: "/dashboard/recruiter",
      admin: "/dashboard/admin",
    };
    navigate(paths[role]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Sign In</h1>
          <p className="text-sm text-slate-500">Master your technical skills with StackTruth</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Password</label>
                  <button type="button" onClick={handleForgotPassword} className="text-xs text-primary hover:underline font-bold">Forgot Password?</button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="w-full btn-primary py-3 mt-4 text-base font-bold">
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or Continue With</span>
              <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={loginWithGitHub} className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <Github className="w-4 h-4" /> GitHub
              </button>
              <button onClick={loginWithGoogle} className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg py-2.5 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                </svg>
                Google
              </button>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 text-center border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              New to StackTruth? <Link to="/register" className="text-primary font-bold hover:underline">Create an account</Link>
            </p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="text-center">
          <button onClick={() => setShowDemo(!showDemo)} className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">
            {showDemo ? "Hide Demo Access" : "Show Demo Access"}
          </button>
          {showDemo && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {DEMO_ACCOUNTS.map((acc) => (
                <button key={acc.role} onClick={() => handleDemoLogin(acc.role)} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all hover:opacity-90 shadow-sm ${acc.color}`}>
                   {acc.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
