import React, { useState } from "react";
import { Code2, Shield, Zap, AlertTriangle, CheckCircle, XCircle, Info, ChevronDown, ChevronUp, Star, Clock, Upload, Bot, ArrowRight, X } from "lucide-react";
import { MOCK_CODE_REVIEWS } from "@/constants/mockData";
import { useToast } from "@/contexts/ToastContext";
import type { CodeReview, CodeIssue } from "@/types";

const ISSUE_ICONS: Record<CodeIssue["type"], React.ReactNode> = {
  error: <XCircle className="w-4 h-4 text-red-500" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
  security: <Shield className="w-4 h-4 text-orange-500" />,
  info: <Info className="w-4 h-4 text-primary" />,
};

const ISSUE_BG: Record<CodeIssue["type"], string> = {
  error: "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-800/30",
  warning: "bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800/30",
  security: "bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/30",
  info: "bg-primary/5 border-primary/10",
};

const STATUS_BADGE: Record<CodeReview["status"], string> = {
  pending: "text-amber-600 bg-amber-50 border-amber-100",
  reviewed: "text-primary bg-primary/5 border-primary/10",
  approved: "text-primary bg-primary/10 border-primary/20",
  "needs-work": "text-red-600 bg-red-50 border-red-100",
};

function ReviewCard({ review, onFix }: { review: CodeReview; onFix: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [patching, setPatching] = useState(false);
  const { success, info } = useToast();

  const handleAIReview = async () => {
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 1500));
    setAnalyzing(false);
    success("Neural Audit Complete", `Analyzed ${review.issues.length} logic blocks. Quality Index: ${review.score}%`);
  };

  const handleImplementFixes = async () => {
    setPatching(true);
    info("Patch Protocol Initialized", "Neural remediation sequence has been deployed to the source architecture...");
    await new Promise(r => setTimeout(r, 2000));
    onFix(review.id);
    setPatching(false);
    success("Sovereignty Restored", "Automated remediation of identified logic errors is complete. Quality Index: 100%");
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
      {/* Header */}
      <div className="p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black px-3 py-1 rounded-sm border uppercase tracking-[0.2em] ${STATUS_BADGE[review.status]}`}>
                {review.status.replace("-", " ")}
              </span>
              <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-widest">{review.language}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight group-hover:text-primary transition-colors">{review.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium">{review.description}</p>
          </div>

          {/* Quality Index Gauge */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-24 h-24 relative">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-100 dark:text-slate-800" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke="currentColor"
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${(review.score / 100) * 213.6} 213.6`}
                  className="text-primary"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{review.score}</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Index</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black border border-primary/20">
                {review.author.name.charAt(0)}
              </div>
              <span className="text-slate-900 dark:text-slate-300">AUTHOR: @{review.author.username}</span>
            </div>
            {review.reviewedBy && (
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                VERIFIED BY: <span className="text-primary">{review.reviewedBy.name}</span>
              </div>
            )}
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Clock className="w-4 h-4" />
            INITIALIZED: {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest">
               <XCircle className="w-4 h-4" /> {review.issues.filter(i => i.type === "error").length} Critical Errors
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-amber-500 uppercase tracking-widest">
               <AlertTriangle className="w-4 h-4" /> {review.issues.filter(i => i.type === "warning").length} Logic Warnings
            </div>
          </div>
          <button 
            type="button"
            onClick={() => {
              setExpanded(!expanded);
              info(expanded ? "Audit log collapsed." : "Accessing full audit registry.");
            }} 
            className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-widest flex items-center gap-2 group/btn"
          >
             {expanded ? "Collapse Audit Registry" : "Expand Full Audit Log"} 
             {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />}
          </button>
        </div>

        {expanded && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
            {review.issues.map((issue) => (
              <div key={issue.id} className={`p-6 rounded-2xl border transition-all hover:shadow-lg ${ISSUE_BG[issue.type]}`}>
                <div className="flex items-start gap-5">
                  <div className="mt-1">{ISSUE_ICONS[issue.type]}</div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">{issue.type} DETECTED</span>
                      <span className="text-[10px] font-mono font-black text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-2 py-1 rounded">MEM_LOC: {issue.line}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{issue.message}</p>
                    <div className="bg-white/60 dark:bg-black/30 p-4 rounded-xl border border-primary/10 group-hover:border-primary/20 transition-all">
                       <p className="text-xs text-primary font-bold"><span className="uppercase text-[9px] font-black tracking-widest mr-3 text-slate-400">REMEDIATION:</span>{issue.suggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 p-8 rounded-2xl space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3">
                <Zap className="w-4 h-4 text-amber-400" /> Strategic Architecture Optimizations
              </h4>
              <ul className="grid sm:grid-cols-2 gap-4">
                {review.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs font-bold leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleAIReview}
            disabled={analyzing}
            className="flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 transition-all disabled:opacity-50"
          >
            {analyzing ? <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> : <Bot className="w-4 h-4" />}
            {analyzing ? "Neural Auditing..." : "Re-Run AI Protocol"}
          </button>
          <button 
            type="button"
            onClick={handleImplementFixes}
            disabled={patching || review.status === 'approved'}
            className="flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
             {patching ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Shield className="w-4 h-4" />}
             {patching ? "Neural Patching..." : review.status === 'approved' ? "Remediation Applied" : "Implement Fixes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CodeReviewPage() {
  const { success, warning, info } = useToast();
  const [reviews, setReviews] = useState<CodeReview[]>(MOCK_CODE_REVIEWS);
  const [showSubmit, setShowSubmit] = useState(false);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleFix = (id: string) => {
    setReviews(prev => prev.map(r => 
      r.id === id 
        ? { ...r, status: 'approved', issues: [], score: 100 } 
        : r
    ));
  };

  const handleSubmit = async () => {
    if (submitting) return;

    if (!title.trim()) {
      warning("Protocol Title Required", "Please specify a unique identifier for this logic block.");
      return;
    }

    if (!code.trim()) {
      warning("Source Logic Required", "Submission terminal requires valid source code for neural verification.");
      return;
    }

    setSubmitting(true);
    info("Neural Uplink Initialized", "Transmitting source architecture to auditing nodes...");
    
    await new Promise(r => setTimeout(r, 2000));
    
    const newReview: CodeReview = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description: "Neural audit pending for user-submitted logic block.",
      language: language as any,
      status: "pending",
      score: 0,
      issues: [],
      suggestions: ["Initial scan pending complete neural verification."],
      author: { name: "Current Auditor", username: "auditor_node", avatar: "" },
      createdAt: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);
    setSubmitting(false);
    setShowSubmit(false);
    setCode("");
    setTitle("");
    success("Review Initialized", "Strategic neural audit has been queued for execution.");
  };

  const handleDiscard = () => {
    setShowSubmit(false);
    setCode("");
    setTitle("");
    info("Draft Purged", "Review submission draft has been cleared.");
  };

  const LANGS = ["typescript", "javascript", "python", "go", "rust", "java", "sql", "bash"];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">Code Review Lab</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">High-fidelity auditing protocols for mission-critical engineering.</p>
        </div>
        <button 
          type="button"
          onClick={() => {
            setShowSubmit(!showSubmit);
            if (!showSubmit) info("Accessing submission terminal.");
          }} 
          className="relative z-10 bg-primary text-white flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
        >
          {showSubmit ? <X className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
          {showSubmit ? "Close Terminal" : "Submit New Protocol"}
        </button>
      </div>

      {/* Submission Portal */}
      {showSubmit && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">Logic Submission Terminal</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Uplink Active</span>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol Title</label>
              <input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="e.g. DISTRIBUTED_LOCK_MANAGER_REFACTOR" 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400" 
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Source Architecture</label>
                <div className="flex flex-wrap gap-2">
                  {LANGS.map(l => (
                    <button 
                      type="button"
                      key={l} 
                      onClick={() => {
                        setLanguage(l);
                        info(`Source environment set to: ${l.toUpperCase()}`);
                      }} 
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${language === l ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-primary"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="flex items-center gap-3 px-6 py-3 bg-slate-950 dark:bg-slate-900 border border-slate-800 rounded-t-2xl">
                  <div className="flex gap-2"><div className="w-2.5 h-2.5 bg-red-500/80 rounded-full" /><div className="w-2.5 h-2.5 bg-amber-500/80 rounded-full" /><div className="w-2.5 h-2.5 bg-emerald-500/80 rounded-full" /></div>
                  <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest ml-4">{language}_SOURCE_V1.0</span>
                </div>
                <textarea 
                  value={code} 
                  onChange={e => setCode(e.target.value)} 
                  placeholder="// Paste binary-equivalent source for neural verification..." 
                  rows={12} 
                  className="w-full bg-slate-950 border border-slate-800 border-t-0 rounded-b-2xl px-6 py-6 text-sm font-mono text-emerald-400 placeholder:text-slate-800 focus:outline-none transition-all resize-none leading-relaxed" 
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-50 dark:border-slate-800">
              <div className="flex items-center gap-8">
                 <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                    <CheckCircle className="w-4 h-4" /> Multi-pass Scan
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest">
                    <CheckCircle className="w-4 h-4" /> Security Audit
                 </div>
              </div>
              <div className="flex gap-4 w-full sm:w-auto">
                <button type="button" onClick={handleDiscard} className="flex-1 sm:flex-none px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all">Discard</button>
                <button 
                  type="button"
                  onClick={handleSubmit} 
                  className="flex-1 sm:flex-none bg-primary text-white px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
                >
                  {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Zap className="w-4 h-4" />}
                  {submitting ? "Analyzing..." : "Initiate Audit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Reviews Feed */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1.5 h-4 bg-primary rounded-full" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Registry Feed</h2>
        </div>
        {reviews.map((review) => <ReviewCard key={review.id} review={review} onFix={handleFix} />)}
      </div>
    </div>
  );
}
