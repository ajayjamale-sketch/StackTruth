import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, MapPin, Globe, DollarSign, Clock, 
  Plus, X, Shield, Sparkles, Rocket, 
  ArrowLeft, CheckCircle, Info, ChevronRight,
  Terminal, Code2, Users
} from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { useAuth } from "@/contexts/AuthContext";

export default function PostJobPage() {
  const navigate = useNavigate();
  const { success, error } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "Full-time",
    location: "Remote",
    salary: "",
    experience: "Mid-level",
    description: "",
    skills: [] as string[],
    currentSkill: ""
  });

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && formData.currentSkill.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(formData.currentSkill.trim())) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, prev.currentSkill.trim()],
          currentSkill: ""
        }));
      }
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      error("Missing Requirements", "Please fulfill the core technical mandates.");
      return;
    }

    setIsLoading(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    
    success("Job Mandate Published", `"${formData.title}" is now active in the technical registry.`);
    navigate("/dashboard/recruiter");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Navigation & Header */}
      <div className="space-y-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Workspace
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-md text-[9px] font-black uppercase tracking-widest border border-primary/20">
              <Plus className="w-3.5 h-3.5" /> Technical Mandate Creation
            </div>
            <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">
              Post New <span className="text-primary">Opportunity.</span>
            </h1>
            <p className="text-slate-500 font-medium">Define high-fidelity roles for the global technical talent pool.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated Recruiter</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name} @ {user?.company || "TechForge"}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" /> Core Information
              </h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. Senior Principal Security Engineer" 
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Type</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option>Full-time</option>
                    <option>Contract</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience</label>
                  <select 
                    value={formData.experience}
                    onChange={e => setFormData({...formData, experience: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option>Junior</option>
                    <option>Mid-level</option>
                    <option>Senior</option>
                    <option>Principal</option>
                    <option>Architect</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 pl-12 rounded-xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Salary Range</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={formData.salary}
                      onChange={e => setFormData({...formData, salary: e.target.value})}
                      placeholder="e.g. $140k - $180k"
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 pl-12 rounded-xl font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
                <Terminal className="w-5 h-5 text-primary" /> Technical Description
              </h2>
              <div className="flex gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Markdown Enabled</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
            <div className="p-8">
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Detail the technical responsibilities, stack requirements, and architectural impact..."
                className="w-full h-96 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl font-medium text-slate-600 dark:text-slate-300 outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl space-y-8 sticky top-32">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" /> Skill Tags
              </h3>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.currentSkill}
                  onChange={e => setFormData({...formData, currentSkill: e.target.value})}
                  onKeyDown={handleAddSkill}
                  placeholder="Press Enter to add..." 
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map(skill => (
                  <span key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-[10px] font-black uppercase tracking-widest border border-primary/10 group">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 rounded-xl space-y-3">
                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Integrity Verified
                </p>
                <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300/70 leading-relaxed">
                  Job mandates are audited for industrial compliance and equal opportunity protocols.
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Rocket className="w-4 h-4" />}
                  {isLoading ? "Publishing..." : "Publish Job Mandate"}
                </button>
                <button 
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all"
                >
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
