import React, { useState } from "react";
import { Code2, Shield, Zap, AlertTriangle, CheckCircle, XCircle, Info, ChevronDown, ChevronUp, Star, Clock, Upload, Bot, ArrowRight } from "lucide-react";
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

function ReviewCard({ review }: { review: CodeReview }) {
  const [expanded, setExpanded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const { success } = useToast();

  const handleAIReview = async () => {
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 2000));
    setAnalyzing(false);
    success("AI Analysis complete!", `Found ${review.issues.length} issues with quality score ${review.score}/100`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* Header */}
      <div className="p-6 border-b border-slate-50 dark:border-slate-800">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded border uppercase tracking-widest ${STATUS_BADGE[review.status]}`}>
                {review.status.replace("-", " ")}
              </span>
              <span className="tag-badge text-[10px]">{review.language}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{review.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{review.description}</p>
          </div>

          {/* Quality Score Circle */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-20 h-20 relative">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f5f9" strokeWidth="8" className="dark:stroke-slate-800" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke="#2f8d46"
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${(review.score / 100) * 213.6} 213.6`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                <span className="text-xl font-black text-primary">{review.score}</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">Index</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50 dark:border-slate-800">
          <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-primary font-bold text-[10px]">
                {review.author.name.charAt(0)}
              </div>
              <span className="text-slate-700 dark:text-slate-300">@{review.author.username}</span>
            </div>
            {review.reviewedBy && (
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
                Expert: <span className="text-primary">{review.reviewedBy.name}</span>
              </div>
            )}
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-500">
               <XCircle className="w-4 h-4" /> {review.issues.filter(i => i.type === "error").length} Critical
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
               <AlertTriangle className="w-4 h-4" /> {review.issues.filter(i => i.type === "warning").length} Warnings
            </div>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
             {expanded ? "Hide Audit Details" : "View Full Audit Log"} {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {expanded && (
          <div className="space-y-4 animate-in">
            {review.issues.map((issue) => (
              <div key={issue.id} className={`p-4 rounded-xl border ${ISSUE_BG[issue.type]}`}>
                <div className="flex items-start gap-4">
                  <div className="mt-1">{ISSUE_ICONS[issue.type]}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300">{issue.type} detected</span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">LOC: {issue.line}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{issue.message}</p>
                    <div className="bg-white/50 dark:bg-black/20 p-3 rounded-lg border border-primary/10">
                       <p className="text-xs text-primary font-bold"><span className="uppercase text-[10px] mr-2">Recommended Fix:</span>{issue.suggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                <Zap className="w-4 h-4" /> Strategic Optimizations
              </h4>
              <ul className="grid sm:grid-cols-2 gap-3">
                {review.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
          <button
            onClick={handleAIReview}
            disabled={analyzing}
            className="btn-secondary text-xs px-6 py-2.5 flex items-center gap-2"
          >
            {analyzing ? <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /> : <Bot className="w-4 h-4" />}
            {analyzing ? "Auditing Architecture..." : "Re-Run AI Audit"}
          </button>
          <button className="btn-primary text-xs px-6 py-2.5">Implement Fixes</button>
        </div>
      </div>
    </div>
  );
}

export default function CodeReviewPage() {
  const { success } = useToast();
  const [showSubmit, setShowSubmit] = useState(false);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim() || !title.trim()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setSubmitting(false);
    setShowSubmit(false);
    setCode("");
    setTitle("");
    success("Protocol Submitted", "Strategic AI analysis initiated.");
  };

  const LANGS = ["typescript", "javascript", "python", "go", "rust", "java", "sql", "bash"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm flex items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Code Review Lab</h1>
          <p className="text-sm text-slate-500 mt-1">Verified auditing for high-performance engineering</p>
        </div>
        <button onClick={() => setShowSubmit(!showSubmit)} className="btn-primary flex items-center gap-2 px-6 py-3">
          <Upload className="w-5 h-5" /> Submit New Protocol
        </button>
      </div>

      {/* Submission Portal */}
      {showSubmit && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-lg animate-in space-y-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">New Review Session</h2>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Distributed Lock Manager Optimization" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Language Stack</label>
                <div className="flex flex-wrap gap-2">
                  {LANGS.map(l => (
                    <button key={l} onClick={() => setLanguage(l)} className={`px-3 py-1 rounded text-[10px] font-bold border transition-all ${language === l ? "bg-primary border-primary text-white" : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-primary"}`}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-t-lg">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 bg-red-400 rounded-full" /><div className="w-2.5 h-2.5 bg-amber-400 rounded-full" /><div className="w-2.5 h-2.5 bg-green-400 rounded-full" /></div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase ml-2">{language} source</span>
                </div>
                <textarea value={code} onChange={e => setCode(e.target.value)} placeholder="// Paste source code for verification..." rows={15} className="w-full bg-slate-900 border border-slate-200 dark:border-slate-700 border-t-0 rounded-b-lg px-4 py-4 text-sm font-mono text-green-400 placeholder:text-slate-700 focus:outline-none transition-all resize-none" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <CheckCircle className="w-4 h-4" /> Multi-pass Scan
                 </div>
                 <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <CheckCircle className="w-4 h-4" /> Security Audit
                 </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setShowSubmit(false)} className="btn-secondary px-8">Discard</button>
                <button onClick={handleSubmit} disabled={!code.trim() || !title.trim() || submitting} className="btn-primary px-8 flex items-center gap-2">
                  {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Zap className="w-4 h-4" />}
                  {submitting ? "Processing..." : "Initiate Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Reviews Feed */}
      <div className="space-y-6">
        {MOCK_CODE_REVIEWS.map((review) => <ReviewCard key={review.id} review={review} />)}
      </div>
    </div>
  );
}
