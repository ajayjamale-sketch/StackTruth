import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Github, Eye, EyeOff, CheckCircle, ArrowRight, Zap, Mail, User, Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import type { UserRole } from "@/types";
import { TECH_TAGS } from "@/constants/mockData";

const ROLES: { value: UserRole; label: string; description: string }[] = [
  { value: "developer", label: "Student / Developer", description: "Learn DS/ALGO and build your project portfolio." },
  { value: "expert", label: "Professional Expert", description: "Review code and mentor the community." },
  { value: "recruiter", label: "Hiring Manager", description: "Access verified technical talent." },
];

export default function RegisterPage() {
  const { loginAsRole } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
    role: "developer" as UserRole,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (field === "password") {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password.length < 8) {
      error("Security Protocol Violation", "Password must be at least 8 characters long.");
      return;
    }

    if (passwordStrength < 2) {
      error("Weak Credentials", "Please use a stronger password with numbers and symbols.");
      return;
    }

    if (selectedSkills.length === 0) {
      error("Profile Incomplete", "Please select at least one technical skill.");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      loginAsRole(form.role);
      success("Registration Complete", "Welcome to the StackTruth community.");
      const paths: Record<string, string> = {
        developer: "/dashboard/developer",
        expert: "/dashboard/expert",
        recruiter: "/dashboard/recruiter",
      };
      navigate(paths[form.role] || "/dashboard/developer");
    } catch (err) {
      error("System Error", "Failed to initialize account protocol.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : prev.length < 10 ? [...prev, skill] : prev
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-2xl space-y-8">
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Join the world's leading computer science portal</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Alex Chen"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Select Your Role</label>
              <div className="grid sm:grid-cols-3 gap-4">
                {ROLES.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => update("role", role.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${form.role === role.value ? "border-primary bg-primary/5" : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100"}`}
                  >
                    <p className={`text-sm font-bold ${form.role === role.value ? "text-primary" : "text-slate-700 dark:text-slate-300"}`}>{role.label}</p>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{role.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Technical Skills (Select Tags)</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {TECH_TAGS.slice(0, 18).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleSkill(tag)}
                    className={`px-3 py-1 rounded text-[10px] font-bold border transition-all ${selectedSkills.includes(tag) ? "bg-primary border-primary text-white" : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 hover:border-primary"}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-12 py-2.5 text-sm focus:outline-none focus:border-primary transition-all"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="flex gap-1 mt-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < passwordStrength ? (passwordStrength <= 2 ? "bg-amber-500" : "bg-emerald-500") : "bg-slate-100 dark:bg-slate-800"}`} 
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="w-4 h-4 accent-primary" required />
              <label htmlFor="terms" className="text-xs text-slate-500">
                I agree to the <Link to="/terms" className="text-primary font-bold">Terms of Service</Link> and <Link to="/privacy" className="text-primary font-bold">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={isLoading} className="w-full btn-primary py-4 text-base font-bold shadow-lg shadow-primary/20">
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 text-center border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already a Geek? <Link to="/login" className="text-primary font-bold hover:underline">Sign In here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
