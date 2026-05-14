import React, { useState } from "react";
import { Briefcase, MapPin, Clock, DollarSign, Search, Filter, ExternalLink, CheckCircle, Zap, Star, Users, ArrowRight, Building } from "lucide-react";
import { MOCK_JOBS } from "@/constants/mockData";
import { useToast } from "@/contexts/ToastContext";
import type { Job } from "@/types";

const JOB_TYPES = ["All Types", "full-time", "contract", "freelance", "remote"];
const LEVELS = ["All Levels", "junior", "mid", "senior", "lead"];

const TYPE_COLORS: Record<string, string> = {
  "full-time": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "contract": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "freelance": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "remote": "bg-green-500/10 text-green-400 border-green-500/20",
  "part-time": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

const LEVEL_COLORS: Record<string, string> = {
  junior: "text-green-400",
  mid: "text-blue-400",
  senior: "text-amber-400",
  lead: "text-purple-400",
};

function JobCard({ job, onApply }: { job: Job; onApply: (job: Job) => void }) {
  const [saved, setSaved] = useState(false);
  const daysLeft = Math.max(0, Math.floor((new Date(job.deadline).getTime() - Date.now()) / 86400000));

  return (
    <div className={`glass-card-hover p-5 relative ${job.isFeatured ? "border-blue-500/30" : ""}`}>
      {job.isFeatured && (
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
          <Star className="w-3 h-3 fill-blue-400" /> FEATURED
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
          <img src={job.companyLogo} alt={job.company} className="w-10 h-10" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-base mb-0.5">{job.title}</h3>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
            <Building className="w-3.5 h-3.5" />
            <span className="font-medium">{job.company}</span>
            <span className="text-slate-600">·</span>
            <MapPin className="w-3.5 h-3.5" />
            <span>{job.location}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${TYPE_COLORS[job.type] || TYPE_COLORS["full-time"]}`}>
              {job.type}
            </span>
            {job.isRemote && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg border bg-green-500/10 text-green-400 border-green-500/20">Remote</span>
            )}
            <span className={`text-xs font-semibold ${LEVEL_COLORS[job.experienceLevel]} bg-white/5 border border-border px-2.5 py-1 rounded-lg capitalize`}>
              {job.experienceLevel}
            </span>
          </div>

          <p className="text-sm text-slate-400 line-clamp-2 mb-4">{job.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {job.skills.slice(0, 5).map((skill) => (
              <span key={skill} className="tag-badge">{skill}</span>
            ))}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-border/50">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1 font-bold text-green-400">
                <DollarSign className="w-3.5 h-3.5" />{job.salary}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />{job.applicants} applicants
              </span>
              <span className={`flex items-center gap-1 ${daysLeft <= 7 ? "text-red-400" : ""}`}>
                <Clock className="w-3.5 h-3.5" />{daysLeft > 0 ? `${daysLeft}d left` : "Closing soon"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSaved(!saved)}
                className={`p-2 rounded-lg border transition-all ${saved ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "bg-white/5 border-border text-slate-500 hover:text-white"}`}
              >
                <Star className={`w-4 h-4 ${saved ? "fill-blue-400" : ""}`} />
              </button>
              <button
                onClick={() => onApply(job)}
                className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
              >
                Apply Now <ArrowRight className="w-3.5 h-3.5" />
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
    success("Application submitted!", `Applied to ${job.title} at ${job.company}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-white">Apply for Position</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-all">✕</button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl">
            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
              <img src={job.companyLogo} alt={job.company} className="w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-white">{job.title}</p>
              <p className="text-sm text-slate-400">{job.company} · {job.salary}</p>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Cover Letter <span className="text-slate-600 font-normal">(optional)</span></label>
            <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} placeholder="Tell them why you're the perfect fit..." rows={5} className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all resize-none" />
          </div>
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-3">
            <p className="text-xs text-green-400 font-semibold mb-1">Your profile will be included</p>
            <p className="text-xs text-slate-500">Skills, reputation score, badges, and portfolio links will be sent with your application</p>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-border">
          <button onClick={onClose} className="btn-secondary flex-1 py-2.5">Cancel</button>
          <button onClick={handleApply} disabled={submitting} className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2 disabled:opacity-60">
            {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            {submitting ? "Submitting..." : "Submit Application"}
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Jobs & Opportunities</h1>
        <p className="text-slate-400 text-sm mt-1">Developer-verified positions from top companies</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs, companies, or skills..." className="w-full bg-white/5 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all" />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="bg-white/5 border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all">
          {JOB_TYPES.map(t => <option key={t} value={t} className="bg-slate-900">{t}</option>)}
        </select>
        <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)} className="bg-white/5 border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all">
          {LEVELS.map(l => <option key={l} value={l} className="bg-slate-900 capitalize">{l}</option>)}
        </select>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-6 p-4 glass-card">
        <div className="text-center"><p className="text-xl font-bold text-white">{filtered.length}</p><p className="text-xs text-slate-500">Open positions</p></div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center"><p className="text-xl font-bold text-white">{MOCK_JOBS.filter(j => j.isRemote).length}</p><p className="text-xs text-slate-500">Remote</p></div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center"><p className="text-xl font-bold text-white">{MOCK_JOBS.filter(j => j.isFeatured).length}</p><p className="text-xs text-slate-500">Featured</p></div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center"><p className="text-xl font-bold text-green-400">$120k+</p><p className="text-xs text-slate-500">Avg salary</p></div>
      </div>

      {/* Job list */}
      <div className="space-y-4">
        {filtered.length > 0
          ? filtered.map((job) => <JobCard key={job.id} job={job} onApply={setSelectedJob} />)
          : (
            <div className="glass-card p-12 text-center">
              <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-white font-semibold mb-2">No jobs found</p>
              <p className="text-slate-500 text-sm">Try adjusting your filters</p>
            </div>
          )}
      </div>

      {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
}
