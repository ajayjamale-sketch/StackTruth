import React, { useState } from "react";
import { Briefcase, MapPin, Clock, DollarSign, Search, Filter, ExternalLink, CheckCircle, Zap, Star, Users, ArrowRight, Building, Globe, Shield, Sparkles, Award } from "lucide-react";
import { MOCK_JOBS } from "@/constants/mockData";
import { useToast } from "@/contexts/ToastContext";
import type { Job } from "@/types";

const JOB_TYPES = ["All Types", "full-time", "contract", "freelance", "remote"];
const LEVELS = ["All Levels", "junior", "mid", "senior", "lead"];

const FEATURED_COMPANIES = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_2012.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
];

function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
  const [saved, setSaved] = useState(false);
  const daysLeft = Math.max(0, Math.floor((new Date(job.deadline).getTime() - Date.now()) / 86400000));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-xl hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] dark:hover:shadow-primary/5 transition-all duration-500 group relative overflow-hidden">
      {job.isFeatured && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-white text-[9px] font-black px-6 py-2 uppercase tracking-[0.2em] translate-x-4 translate-y-4 rotate-45 shadow-2xl">
            Featured
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-20 h-20 bg-slate-100/50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-all duration-500 group-hover:scale-110">
          <img src={job.companyLogo} alt={job.company} className="w-12 h-12 object-contain" />
        </div>
        <div className="flex-1 min-w-0 space-y-6">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-slate-950 dark:text-white group-hover:text-primary transition-colors duration-500 tracking-tighter leading-none">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2 text-primary"><Building className="w-4 h-4" />{job.company}</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />{job.location}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{job.type}</span>
            </div>
          </div>

          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium tracking-tight">{job.description}</p>

          <div className="flex flex-wrap gap-2.5">
            {job.skills.slice(0, 6).map((skill) => (
              <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 rounded-lg border border-slate-100 dark:border-slate-800 group-hover:border-primary/20 transition-all">{skill}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-10 border-t border-slate-50 dark:border-slate-800 gap-6">
            <div className="flex items-center gap-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <div className="flex flex-col">
                 <span className="text-primary font-black text-2xl tracking-tighter leading-none mb-1">{job.salary}</span>
                 <span className="text-[9px] text-slate-400 uppercase tracking-widest">Annual Package</span>
              </div>
              <div className="w-px h-10 bg-slate-100 dark:bg-slate-800" />
              <span className="flex items-center gap-2 text-slate-900 dark:text-slate-200"><Users className="w-4 h-4 text-primary" />{job.applicants} Applied</span>
              <span className={`flex items-center gap-2 ${daysLeft <= 7 ? "text-red-500" : "text-slate-900 dark:text-slate-200"}`}>
                <Clock className="w-4 h-4 text-primary" />{daysLeft > 0 ? `${daysLeft} Days Left` : "Closing Soon"}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSaved(!saved)}
                className={`p-4 rounded-xl border transition-all duration-500 ${saved ? "bg-primary/10 border-primary/20 text-primary shadow-xl shadow-primary/10" : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400 hover:text-primary hover:border-primary"}`}
              >
                <Star className={`w-6 h-6 ${saved ? "fill-primary" : ""}`} />
              </button>
              <button
                onClick={() => onApply(job)}
                className="bg-slate-950 dark:bg-primary text-white font-black px-10 py-4 rounded-xl flex items-center gap-3 hover:bg-primary dark:hover:bg-emerald-600 transition-all duration-500 shadow-2xl shadow-primary/20"
              >
                Apply Protocol <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const { success } = useToast();
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleApply = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    success("Application Protocol Initiated", `Your verification profile has been sent to ${job.company}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="flex items-center justify-between px-10 py-8 border-b border-slate-50 dark:border-slate-800">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">Submit Application</h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Formal Verification Protocol</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all">✕</button>
        </div>
        <div className="p-10 space-y-8">
          <div className="flex items-center gap-6 p-6 bg-primary/5 border border-primary/10 rounded-xl">
            <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center border border-primary/20 shadow-sm">
              <img src={job.companyLogo} alt={job.company} className="w-10 h-10 object-contain" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-950 dark:text-white leading-none">{job.title}</p>
              <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-2">{job.company} • {job.salary}</p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Verification Brief</label>
            <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} placeholder="Highlight your technical achievements for this specific role..." rows={6} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-6 py-5 text-base focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none shadow-inner" />
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <p className="text-[11px] text-primary font-black uppercase tracking-widest">Automatic Profile Audit Inclusion</p>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Your global reputation score, verified certifications, and problem-solving audit history will be transmitted securely with this application.</p>
          </div>
        </div>
        <div className="flex gap-6 px-10 py-8 border-t border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <button onClick={onClose} className="flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-slate-500 hover:text-slate-950 transition-all">Cancel</button>
          <button onClick={handleApply} disabled={submitting} className="flex-[2] bg-slate-950 dark:bg-primary text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary dark:hover:bg-emerald-600 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3">
            {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            {submitting ? "Transmitting..." : "Initiate Audit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filtered = MOCK_JOBS.filter((job) => {
    const matchSearch = !search || job.title.toLowerCase().includes(search.toLowerCase()) || job.company.toLowerCase().includes(search.toLowerCase()) || job.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchType = typeFilter === "All Types" || job.type === typeFilter || (typeFilter === "remote" && job.isRemote);
    const matchLevel = levelFilter === "All Levels" || job.experienceLevel === levelFilter;
    return matchSearch && matchType && matchLevel;
  });

  return (
    <div className="space-y-32 py-12">
      {/* 1. Career Marketplace Header */}
      <section className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-16 rounded-xl shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10">
              <Briefcase className="w-4 h-4" /> Global Opportunity Index
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">The Career <br /> <span className="text-primary">Marketplace</span></h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight">Verified technical mandates from elite laboratories and high-growth engineering firms.</p>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-6">
            <div className="flex gap-4">
               <div className="bg-slate-100/50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-100 dark:border-slate-800 text-center w-32">
                 <p className="text-3xl font-black text-slate-950 dark:text-white">{MOCK_JOBS.length}</p>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Live Roles</p>
               </div>
               <div className="bg-slate-100/50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-100 dark:border-slate-800 text-center w-32">
                 <p className="text-3xl font-black text-primary">$125k</p>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Avg Salary</p>
               </div>
            </div>
            <button className="w-full bg-slate-950 dark:bg-primary text-white font-black px-8 py-4 rounded-xl hover:bg-primary transition-all shadow-xl">Post a Mandate</button>
          </div>
        </div>
      </section>

      {/* 2. Intelligent Filters Section */}
      <section className="space-y-12">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-xl shadow-xl flex flex-col xl:flex-row gap-8 items-center relative overflow-hidden">
           <div className="absolute inset-0 grid-pattern opacity-5" />
           <div className="relative flex-1 w-full group">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
             <input 
               value={search} 
               onChange={e => setSearch(e.target.value)} 
               placeholder="Search by role, company, or technical audit protocol..." 
               className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl pl-16 pr-6 py-5 text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm text-foreground placeholder:text-slate-400" 
             />
           </div>
           <div className="flex flex-wrap gap-4 w-full xl:w-auto">
             <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-6 py-5 text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer shadow-sm min-w-[180px]">
               {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
             </select>
             <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-6 py-5 text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer shadow-sm min-w-[180px] capitalize">
               {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
             </select>
           </div>
        </div>
      </section>

      {/* 3. Featured Ecosystems Section */}
      <section className="space-y-12">
         <div className="flex items-center justify-between">
           <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-500" /> Premium Hiring Ecosystems
           </h2>
           <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 mx-8" />
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {FEATURED_COMPANIES.map(company => (
             <div key={company.name} className="bg-white dark:bg-slate-900 p-10 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center grayscale hover:grayscale-0 hover:border-primary/20 hover:shadow-xl transition-all duration-700 group cursor-pointer">
                <img src={company.logo} alt={company.name} className="h-10 object-contain opacity-30 group-hover:opacity-100 transition-all duration-700 dark:invert" />
             </div>
           ))}
         </div>
      </section>

      {/* 4. Active Mandates (Feed) Section */}
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-4">
             <Zap className="w-8 h-8 text-primary" />
             Active Mandates
          </h2>
          <span className="px-5 py-2 bg-slate-100 dark:bg-slate-800 rounded-sm text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] border border-slate-100 dark:border-slate-800">{filtered.length} Live Positions</span>
        </div>
        
        <div className="space-y-8">
          {filtered.length > 0
            ? filtered.map((job) => <JobCard key={job.id} job={job} onApply={setSelectedJob} />)
            : (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-32 text-center rounded-xl shadow-sm">
                <Briefcase className="w-24 h-24 text-slate-100 dark:text-slate-800 mx-auto mb-8 animate-pulse" />
                <h3 className="text-2xl font-black text-slate-950 dark:text-white mb-4">No matching positions</h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto">Our auditors couldn't find any positions matching your search criteria.</p>
                <button onClick={() => {setSearch(""); setTypeFilter("All Types"); setLevelFilter("All Levels");}} className="mt-8 text-primary font-black uppercase tracking-widest text-[10px] border-b-2 border-primary pb-1">Reset All Protocols</button>
              </div>
            )}
        </div>
      </section>

      {/* 5. Career Protocol Lab Section (New) */}
      <section className="bg-slate-950 rounded-xl p-20 text-white relative overflow-hidden group">
         <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
         <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
         
         <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 text-primary rounded-sm text-[11px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-xl shadow-primary/10">
                <Award className="w-5 h-5" /> Professional Career Laboratory
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">Elevate Your <br /> <span className="text-primary">Career Protocol.</span></h2>
              <p className="text-slate-400 text-xl leading-relaxed font-medium tracking-tight">Access specialized interview preparation modules, expert-led salary negotiation audits, and high-fidelity technical resume blueprints.</p>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <button className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-primary/30 active:scale-95">
                  Access Lab
                </button>
                <div className="flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-xl">
                   <CheckCircle className="w-6 h-6 text-emerald-500" />
                   <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">Verified Mentorship Active</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-500 group/item cursor-pointer">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-8 group-hover/item:scale-110 transition-transform">
                    <Code2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black mb-3">Audit Prep</h4>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Company-specific technical audit blueprints and mock protocols.</p>
               </div>
               <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-500 group/item cursor-pointer">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-8 group-hover/item:scale-110 transition-transform">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black mb-3">Salary Audit</h4>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">Global engineering compensation benchmarks and negotiation audits.</p>
               </div>
            </div>
         </div>
      </section>

      {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
}

const Code2 = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m18 16 4-4-4-4" />
    <path d="m6 8-4 4 4 4" />
    <path d="m14.5 4-5 16" />
  </svg>
);
