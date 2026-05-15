import React, { useState } from "react";
import { 
  Briefcase, MapPin, Clock, DollarSign, Search, Filter, 
  ExternalLink, CheckCircle, Zap, Star, Users, ArrowRight, 
  Building, Globe, Shield, Sparkles, Award, Code2 
} from "lucide-react";
import { MOCK_JOBS } from "@/constants/mockData";
import { useToast } from "@/contexts/ToastContext";
import type { Job } from "@/types";

const JOB_TYPES = ["All Types", "full-time", "contract", "freelance", "remote"];
const LEVELS = ["All Levels", "junior", "mid", "senior", "lead"];

const FEATURED_COMPANIES = [
  { name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
  { name: "Meta", logo: "https://logo.clearbit.com/meta.com" },
];

function CompanyLogo({ src, name, className }: { src: string; name: string; className?: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`${className} bg-primary/10 flex items-center justify-center text-primary font-bold`}>
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={name} 
      className={className} 
      onError={() => setError(true)}
    />
  );
}

function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
  const [saved, setSaved] = useState(false);
  const daysLeft = Math.max(0, Math.floor((new Date(job.deadline).getTime() - Date.now()) / 86400000));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden">
      {job.isFeatured && (
        <div className="absolute top-0 right-0 p-4">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
            <Sparkles className="w-3 h-3" /> Featured
          </span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-16 h-16 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm overflow-hidden p-3">
          <CompanyLogo src={job.companyLogo} name={job.company} className="w-full h-full object-contain dark:brightness-200" />
        </div>

        <div className="flex-1 min-w-0 space-y-4">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-primary"><Building className="w-3.5 h-3.5" />{job.company}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{job.type}</span>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium">{job.description}</p>

          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 5).map((skill) => (
              <span key={skill} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-500 rounded border border-slate-100 dark:border-slate-800">
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 gap-4">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                 <span className="text-primary font-bold text-xl tracking-tight leading-none mb-1">{job.salary}</span>
                 <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Annual Range</span>
              </div>
              <div className="w-px h-8 bg-slate-100 dark:bg-slate-800" />
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Users className="w-3 h-3" /> {job.applicants} Applicants
                </p>
                <p className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${daysLeft <= 7 ? "text-amber-500" : "text-slate-400"}`}>
                  <Clock className="w-3 h-3" /> {daysLeft > 0 ? `${daysLeft}d left` : "Closing"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSaved(!saved)}
                className={`p-3 rounded-lg border transition-all ${saved ? "bg-primary/10 border-primary/20 text-primary" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary hover:border-primary"}`}
              >
                <Star className={`w-5 h-5 ${saved ? "fill-primary" : ""}`} />
              </button>
              <button
                onClick={() => onApply(job)}
                className="bg-primary text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 transition-all text-sm shadow-lg shadow-primary/10"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
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
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    success("Application Sent", `Your profile has been submitted to ${job.company}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Apply for Position</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Role: {job.title}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">✕</button>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 p-2">
              <CompanyLogo src={job.companyLogo} name={job.company} className="w-full h-full object-contain dark:brightness-200" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white leading-none">{job.company}</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1.5">{job.location} • {job.type}</p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Why are you a good fit?</label>
            <textarea 
              value={coverLetter} 
              onChange={e => setCoverLetter(e.target.value)} 
              placeholder="Briefly describe your experience with these technical audit protocols..." 
              rows={4} 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" 
            />
          </div>
        </div>
        <div className="flex gap-4 px-8 py-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
          <button onClick={onClose} className="flex-1 py-3 rounded-lg font-bold text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Cancel</button>
          <button onClick={handleApply} disabled={submitting} className="flex-[2] bg-primary text-white py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            {submitting ? "Sending..." : "Submit Application"}
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
    <div className="space-y-20 py-8">
      {/* 1. Header Section */}
      <section className="bg-white dark:bg-slate-900 text-slate-950 dark:text-white border border-slate-100 dark:border-slate-800 rounded-2xl p-12 relative overflow-hidden shadow-2xl dark:shadow-none">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none dark:invert-0 invert" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded text-[10px] font-black uppercase tracking-widest border border-primary/20">
              <Zap className="w-3.5 h-3.5" /> Market Opportunities
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Find Your Next <br /> <span className="text-primary underline decoration-primary/30 decoration-4 underline-offset-8">Technical Challenge</span></h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">Verified roles from leading technology companies, audited for technical depth and cultural excellence.</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-950 dark:text-white">{MOCK_JOBS.length}</p>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Active Roles</p>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">$180k</p>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Avg Salary</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search & Filters */}
      <section className="grid lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-6 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search roles, companies, or technologies..." 
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all shadow-sm" 
          />
        </div>
        <div className="lg:col-span-3">
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 text-xs font-bold uppercase tracking-wider focus:outline-none transition-all cursor-pointer shadow-sm">
            {JOB_TYPES.map(t => <option key={t} value={t}>{t === 'All Types' ? 'Any Type' : t}</option>)}
          </select>
        </div>
        <div className="lg:col-span-3">
          <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 text-xs font-bold uppercase tracking-wider focus:outline-none transition-all cursor-pointer shadow-sm capitalize">
            {LEVELS.map(l => <option key={l} value={l}>{l === 'All Levels' ? 'Any Level' : l}</option>)}
          </select>
        </div>
      </section>

      {/* 3. Featured Ecosystems */}
      <section className="space-y-6">
        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
          <Building className="w-4 h-4" /> Hiring Ecosystems
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURED_COMPANIES.map(company => (
            <div key={company.name} className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center grayscale hover:grayscale-0 hover:border-primary/50 transition-all duration-300 group cursor-pointer shadow-sm">
              <CompanyLogo src={company.logo} name={company.name} className="h-6 object-contain opacity-50 group-hover:opacity-100 transition-all dark:brightness-200" />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Job List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Latest Mandates <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] rounded text-slate-500">{filtered.length}</span>
          </h2>
        </div>
        
        <div className="grid gap-6">
          {filtered.length > 0
            ? filtered.map((job) => <JobCard key={job.id} job={job} onApply={setSelectedJob} />)
            : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-20 text-center rounded-xl shadow-sm">
                <Briefcase className="w-16 h-16 text-slate-200 dark:text-slate-800 mx-auto mb-6" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No roles found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">Try adjusting your filters or search terms to find more technical opportunities.</p>
                <button onClick={() => {setSearch(""); setTypeFilter("All Types"); setLevelFilter("All Levels");}} className="mt-6 text-primary font-bold text-xs uppercase tracking-widest hover:underline">Reset Filters</button>
              </div>
            )}
        </div>
      </section>

      {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
}
