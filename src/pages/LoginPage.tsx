import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2, Github, Eye, EyeOff, Zap, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import type { UserRole } from "@/types";

const DEMO_ACCOUNTS: { role: UserRole; email: string; label: string; color: string }[] = [
  { role: "developer", email: "alex@example.com", label: "Developer", color: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
  { role: "expert", email: "sarah@example.com", label: "Expert", color: "bg-amber-500/10 border-amber-500/30 text-amber-400" },
  { role: "recruiter", email: "hiring@techforge.com", label: "Recruiter", color: "bg-purple-500/10 border-purple-500/30 text-purple-400" },
  { role: "admin", email: "admin@stacktruth.com", label: "Admin", color: "bg-red-500/10 border-red-500/30 text-red-400" },
];

export default function LoginPage() {
  const { login, loginWithGitHub, loginWithGoogle, loginAsRole } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    const ok = await login(email, password);
    setIsLoading(false);
    if (ok) {
      success("Welcome back!", "You've been signed in successfully");
      navigate("/dashboard/developer");
    } else {
      error("Sign in failed", "Invalid email or password");
    }
  };

  const handleGitHub = async () => {
    setIsLoading(true);
    await loginWithGitHub();
    setIsLoading(false);
    success("Signed in with GitHub!", "Welcome back");
    navigate("/dashboard/developer");
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    await loginWithGoogle();
    setIsLoading(false);
    success("Signed in with Google!", "Welcome back");
    navigate("/dashboard/developer");
  };

  const handleDemoLogin = (role: UserRole) => {
    loginAsRole(role);
    success(`Signed in as ${role}!`, "Exploring the platform");
    const paths: Record<UserRole, string> = {
      developer: "/dashboard/developer",
      expert: "/dashboard/expert",
      recruiter: "/dashboard/recruiter",
      admin: "/dashboard/admin",
    };
    navigate(paths[role]);
  };

  return (
    <div className="min-h-screen bg-background mesh-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-400 rounded-xl flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl text-white">Stack<span className="text-blue-400">Truth</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to your developer account</p>
        </div>

        {/* Demo accounts */}
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500 font-medium mb-3 text-center uppercase tracking-wider">Try a demo account</p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.role}
                onClick={() => handleDemoLogin(acc.role)}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-semibold transition-all hover:scale-105 ${acc.color}`}
              >
                <Zap className="w-3.5 h-3.5" />
                {acc.label}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 space-y-5">
          {/* OAuth buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGitHub}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-border rounded-lg py-2.5 text-sm font-medium text-white transition-all disabled:opacity-50"
            >
              <Github className="w-4 h-4" />
              GitHub
            </button>
            <button
              onClick={handleGoogle}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-border rounded-lg py-2.5 text-sm font-medium text-white transition-all disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-slate-600">or continue with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all ${errors.email ? "border-red-500" : "border-border"}`}
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-400">Password</label>
                <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 pr-10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all ${errors.password ? "border-red-500" : "border-border"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold">
            Create one free
          </Link>
        </p>
      </div>
    </div>
  );
}
