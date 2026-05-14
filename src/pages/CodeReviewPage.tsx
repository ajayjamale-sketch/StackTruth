import React, { useState } from "react";
import { Code2, Shield, Zap, AlertTriangle, CheckCircle, XCircle, Info, ChevronDown, ChevronUp, Star, Clock, Upload, Bot, ArrowRight } from "lucide-react";
import { MOCK_CODE_REVIEWS } from "@/constants/mockData";
import { useToast } from "@/contexts/ToastContext";
import type { CodeReview, CodeIssue } from "@/types";

const SCORE_COLOR = (score: number) =>
  score >= 85 ? "text-green-400" : score >= 65 ? "text-amber-400" : "text-red-400";

const SCORE_BG = (score: number) =>
  score >= 85 ? "bg-green-500" : score >= 65 ? "bg-amber-500" : "bg-red-500";

const ISSUE_ICONS: Record<CodeIssue["type"], React.ReactNode> = {
  error: <XCircle className="w-4 h-4 text-red-400" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-400" />,
  security: <Shield className="w-4 h-4 text-orange-400" />,
  info: <Info className="w-4 h-4 text-blue-400" />,
};

const ISSUE_BG: Record<CodeIssue["type"], string> = {
  error: "bg-red-500/5 border-red-500/20",
  warning: "bg-amber-500/5 border-amber-500/20",
  security: "bg-orange-500/5 border-orange-500/20",
  info: "bg-blue-500/5 border-blue-500/20",
};

const STATUS_BADGE: Record<CodeReview["status"], string> = {
  pending: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  reviewed: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  approved: "text-green-400 bg-green-500/10 border-green-500/30",
  "needs-work": "text-red-400 bg-red-500/10 border-red-500/30",
};

function ReviewCard({ review }: { review: CodeReview }) {
  const [expanded, setExpanded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const { success } = useToast();

  const handleAIReview = async () => {
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 2000));
    setAnalyzing(false);
    success("AI Analysis complete!", `Found ${review.issues.length} issues with score ${review.score}/100`);
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${STATUS_BADGE[review.status]}`}>
                {review.status.replace("-", " ").toUpperCase()}
              </span>
              <span className="tag-badge">{review.language}</span>
            </div>
            <h3 className="font-bold text-white text-base">{review.title}</h3>
            <p className="text-sm text-slate-400 mt-1">{review.description}</p>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#334155" strokeWidth="6" />
                <circle
                  cx="32" cy="32" r="28" fill="none"
                  stroke={review.score >= 85 ? "#22C55E" : review.score >= 65 ? "#F59E0B" : "#EF4444"}
                  strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${(review.score / 100) * 175.9} 175.9`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-sm font-extrabold ${SCORE_COLOR(review.score)}`}>{review.score}</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-600 mt-1">Quality</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <img src={review.author.avatar} alt={review.author.name} className="w-6 h-6 rounded-full bg-slate-700" />
            <span className="text-xs text-slate-400">{review.author.name}</span>
          </div>
          {review.reviewedBy && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              Reviewed by <span className="text-amber-400 font-medium">{review.reviewedBy.name}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-slate-600 ml-auto">
            <Clock className="w-3.5 h-3.5" />
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Issues */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-red-400"><XCircle className="w-3.5 h-3.5" />{review.issues.filter(i => i.type === "error").length} errors</span>
            <span className="flex items-center gap-1 text-amber-400"><AlertTriangle className="w-3.5 h-3.5" />{review.issues.filter(i => i.type === "warning").length} warnings</span>
            <span className="flex items-center gap-1 text-orange-400"><Shield className="w-3.5 h-3.5" />{review.issues.filter(i => i.type === "security").length} security</span>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
            {expanded ? <><ChevronUp className="w-3.5 h-3.5" />Collapse</> : <><ChevronDown className="w-3.5 h-3.5" />View Details</>}
          </button>
        </div>

        {/* Score bar */}
        <div className="h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
          <div className={`h-full ${SCORE_BG(review.score)} rounded-full transition-all duration-700`} style={{ width: `${review.score}%` }} />
        </div>

        {expanded && (
          <div className="space-y-3 mt-4">
            {review.issues.map((issue) => (
              <div key={issue.id} className={`p-3.5 rounded-xl border ${ISSUE_BG[issue.type]}`}>
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5">{ISSUE_ICONS[issue.type]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white capitalize">{issue.type}</span>
                      <span className="text-xs text-slate-600 font-mono">Line {issue.line}</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{issue.message}</p>
                    <div className="mt-2 pl-3 border-l-2 border-blue-500/50">
                      <p className="text-xs text-blue-400"><span className="font-semibold">Fix:</span> {issue.suggestion}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Suggestions */}
            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
              <p className="text-xs font-bold text-green-400 mb-2 flex items-center gap-2"><Zap className="w-3.5 h-3.5" />Improvement Suggestions</p>
              <ul className="space-y-1.5">
                {review.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAIReview}
            disabled={analyzing}
            className="flex items-center gap-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-60"
          >
            {analyzing ? (
              <div className="w-3.5 h-3.5 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
            ) : <Bot className="w-3.5 h-3.5" />}
            {analyzing ? "Analyzing..." : "AI Re-analysis"}
          </button>
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
    success("Code submitted for review!", "AI analysis will complete in ~30 seconds");
  };

  const LANGS = ["typescript", "javascript", "python", "go", "rust", "java", "sql", "bash"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Code Review</h1>
          <p className="text-slate-400 text-sm mt-1">AI-powered code analysis and expert review</p>
        </div>
        <button onClick={() => setShowSubmit(!showSubmit)} className="btn-primary flex items-center gap-2">
          <Upload className="w-4 h-4" /> Submit Code
        </button>
      </div>

      {/* Submit panel */}
      {showSubmit && (
        <div className="glass-card p-6 animate-in">
          <h2 className="font-bold text-white mb-4">Submit Code for Review</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What does this code do?" className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-400">Language</label>
                <div className="flex gap-1">
                  {LANGS.map(l => (
                    <button key={l} onClick={() => setLanguage(l)} className={`text-[10px] px-2 py-0.5 rounded font-medium transition-all ${language === l ? "bg-blue-600 text-white" : "bg-white/5 text-slate-500 hover:text-white"}`}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-border rounded-t-lg">
                  <div className="flex gap-1.5"><div className="w-3 h-3 bg-red-500 rounded-full" /><div className="w-3 h-3 bg-amber-500 rounded-full" /><div className="w-3 h-3 bg-green-500 rounded-full" /></div>
                  <span className="text-xs font-mono text-slate-500">{language}</span>
                </div>
                <textarea value={code} onChange={e => setCode(e.target.value)} placeholder="// Paste your code here..." rows={12} className="w-full bg-slate-950 border border-border border-t-0 rounded-b-lg px-4 py-3 text-sm font-mono text-green-300 placeholder:text-slate-700 focus:outline-none focus:border-blue-500 transition-all resize-none" />
              </div>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
              <p className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-2"><Bot className="w-3.5 h-3.5" />AI Analysis will check for:</p>
              <div className="grid grid-cols-2 gap-1.5">
                {["Security vulnerabilities", "Performance issues", "Code style violations", "Best practice adherence", "Memory leak detection", "Type safety issues"].map(item => (
                  <div key={item} className="flex items-center gap-1.5 text-xs text-slate-400"><CheckCircle className="w-3 h-3 text-green-400" />{item}</div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowSubmit(false)} className="btn-secondary text-sm px-4 py-2">Cancel</button>
              <button onClick={handleSubmit} disabled={!code.trim() || !title.trim() || submitting} className="btn-primary text-sm px-6 py-2 flex items-center gap-2 disabled:opacity-50">
                {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Bot className="w-4 h-4" />}
                {submitting ? "Analyzing..." : "Submit & Analyze"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="space-y-4">
        {MOCK_CODE_REVIEWS.map((review) => <ReviewCard key={review.id} review={review} />)}
      </div>
    </div>
  );
}
