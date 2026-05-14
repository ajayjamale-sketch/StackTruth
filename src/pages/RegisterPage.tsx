import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2, Github, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import type { UserRole } from "@/types";
import { TECH_TAGS } from "@/constants/mockData";

const ROLES: { value: UserRole; label: string; description: string; color: string }[] = [
  { value: "developer", label: "Developer", description: "Build, learn, and grow your skills", color: "border-blue-500 bg-blue-500/10" },
  { value: "expert", label: "Expert/Mentor", description: "Share knowledge and mentor others", color: "border-amber-500 bg-amber-500/10" },
  { value: "recruiter", label: "Recruiter", description: "Discover and hire top talent", color: "border-purple-500 bg-purple-500/10" },
];

const STEPS = ["Account", "Profile", "Skills"];

export default function RegisterPage() {
  const { loginAsRole } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    name: "",
    role: "developer" as UserRole,
    bio: "",
    location: "",
    github: "",
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const validateStep0 = () => {
    const errs: Record<string, string> = {};
    if (!form.email.includes("@")) errs.email = "Valid email required";
    if (form.username.length < 3) errs.username = "At least 3 characters";
    if (form.password.length < 8) errs.password = "At least 8 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return;
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    loginAsRole(form.role);
    setIsLoading(false);
    success("Account created!", "Welcome to StackTruth 🎉");
    const paths: Record<UserRole, string> = {
      developer: "/dashboard/developer",
      expert: "/dashboard/expert",
      recruiter: "/dashboard/recruiter",
      admin: "/dashboard/admin",
    };
    navigate(paths[form.role]);
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : prev.length < 10 ? [...prev, skill] : prev
    );
  };

  return (
    <div className="min-h-screen bg-background mesh-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-400 rounded-xl flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl text-white">Stack<span className="text-blue-400">Truth</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-slate-400 text-sm mt-1">Join 2.4M+ developers on StackTruth</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step ? "bg-green-500 text-white" : i === step ? "bg-blue-600 text-white" : "bg-white/10 text-slate-500"
                  }`}
                >
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-[10px] font-medium ${i === step ? "text-blue-400" : "text-slate-600"}`}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-16 mb-4 transition-all ${i < step ? "bg-green-500" : "bg-border"}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="glass-card p-6">
          {/* Step 0: Account */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Account Information</h2>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={async () => { setIsLoading(true); await new Promise(r => setTimeout(r, 1000)); loginAsRole("developer"); success("Signed up with GitHub!"); navigate("/dashboard/developer"); }}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-border rounded-lg py-2.5 text-sm font-medium text-white transition-all"
                >
                  <Github className="w-4 h-4" /> GitHub
                </button>
                <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-border rounded-lg py-2.5 text-sm font-medium text-white transition-all">
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
                <span className="text-xs text-slate-600">or with email</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all ${errors.email ? "border-red-500" : "border-border"}`}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Username</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-sm">@</span>
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) => update("username", e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    placeholder="devwizard42"
                    className={`w-full bg-white/5 border rounded-lg pl-8 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all ${errors.username ? "border-red-500" : "border-border"}`}
                  />
                </div>
                {errors.username && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.username}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="••••••••"
                    className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 pr-10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all ${errors.password ? "border-red-500" : "border-border"}`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
              </div>

              <button onClick={handleNext} className="w-full btn-primary py-3">
                Continue <ArrowRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>
          )}

          {/* Step 1: Profile */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-4">Your Profile</h2>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Alex Chen"
                  className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-3">I am a...</label>
                <div className="space-y-2">
                  {ROLES.map((role) => (
                    <button
                      key={role.value}
                      onClick={() => update("role", role.value)}
                      className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 transition-all text-left ${form.role === role.value ? role.color : "border-border bg-transparent"}`}
                    >
                      <Zap className={`w-4 h-4 mt-0.5 flex-shrink-0 ${form.role === role.value ? "text-current" : "text-slate-500"}`} />
                      <div>
                        <p className={`text-sm font-bold ${form.role === role.value ? "text-white" : "text-slate-400"}`}>{role.label}</p>
                        <p className="text-xs text-slate-500">{role.description}</p>
                      </div>
                      {form.role === role.value && <CheckCircle className="w-4 h-4 ml-auto text-current" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  placeholder="Tell the community about yourself..."
                  rows={3}
                  className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="San Francisco, CA"
                    className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">GitHub handle</label>
                  <input
                    type="text"
                    value={form.github}
                    onChange={(e) => update("github", e.target.value)}
                    placeholder="alexchen"
                    className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="btn-secondary flex-1 py-3">Back</button>
                <button onClick={handleNext} className="btn-primary flex-1 py-3">Continue</button>
              </div>
            </div>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white mb-1">Select Your Skills</h2>
              <p className="text-xs text-slate-500 mb-4">Choose up to 10 technologies you work with</p>

              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                {TECH_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleSkill(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedSkills.includes(tag)
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "bg-white/5 border-border text-slate-400 hover:text-white hover:border-slate-500"
                    }`}
                  >
                    {selectedSkills.includes(tag) && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {tag}
                  </button>
                ))}
              </div>

              <p className="text-xs text-slate-600">{selectedSkills.length}/10 selected</p>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1 py-3">Back</button>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Create Account 🚀"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
