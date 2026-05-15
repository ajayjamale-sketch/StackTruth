import React, { useState } from "react";
import { X, Code2, Eye, HelpCircle, ChevronDown, Plus, Sparkles, Terminal } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { TECH_TAGS } from "@/constants/mockData";

const CODE_EXAMPLE = `// Paste your code here
function example() {
  return "Hello, StackTruth!";
}`;

export default function AskQuestionModal({ onClose }: { onClose: () => void }) {
  const { success } = useToast();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : prev.length < 5 ? [...prev, tag] : prev);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim() || selectedTags.length === 0) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSubmitting(false);
    success("Protocol initiated!", "Your technical inquiry has been broadcasted to the global registry.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh] animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 sm:px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 relative z-20">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Ask a Technical Question
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Registry Access</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all active:scale-90">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Scrollable area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 no-scrollbar relative z-10">
          <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
          
          {/* Title */}
          <div className="relative z-10">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              Inquiry Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to handle race conditions in React hooks?"
              maxLength={150}
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
            />
            <div className="flex justify-between mt-2">
              <p className="text-[10px] text-slate-400 font-medium italic">Summarize your inquiry briefly</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title.length}/150</p>
            </div>
          </div>

          {/* Body */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Detailed Technical Context <span className="text-red-500">*</span>
              </label>
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-md text-[10px] font-black text-slate-500 hover:text-primary transition-colors border border-slate-200 dark:border-white/5"
              >
                <Eye className="w-3.5 h-3.5" />
                {preview ? "EDIT MODE" : "PREVIEW MODE"}
              </button>
            </div>
            {preview ? (
              <div className="min-h-32 p-6 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {body || <span className="text-slate-400 italic">Nothing to preview yet...</span>}
              </div>
            ) : (
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Describe your problem in detail. Include what you've tried, expected behavior, and actual results..."
                rows={6}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-sm text-slate-950 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all resize-none shadow-sm"
              />
            )}
          </div>

          {/* Code block toggle */}
          <div className="relative z-10">
            <button
              onClick={() => setShowCode(!showCode)}
              className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${showCode ? "text-primary" : "text-slate-400 hover:text-slate-950 dark:hover:text-white"}`}
            >
              <div className={`p-1.5 rounded-md ${showCode ? "bg-primary/10" : "bg-slate-100 dark:bg-white/5"}`}>
                <Code2 className="w-4 h-4" />
              </div>
              {showCode ? "Remove technical snippet" : "Add technical snippet"}
              <ChevronDown className={`w-4 h-4 transition-transform ${showCode ? "rotate-180" : ""}`} />
            </button>
            {showCode && (
              <div className="mt-4 animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between px-5 py-3 bg-slate-800 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                    </div>
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-2 flex items-center gap-2">
                       <Terminal className="w-3 h-3" /> audit.ts
                    </span>
                  </div>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={CODE_EXAMPLE}
                  rows={8}
                  className="w-full bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 border-t-0 rounded-b-xl px-5 py-4 text-sm font-mono text-emerald-400 placeholder:text-slate-700 focus:outline-none focus:border-primary transition-all resize-none shadow-xl"
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="relative z-10 space-y-4">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Topic Classification <span className="text-red-500">*</span>
              <span className="text-slate-400 font-normal ml-3 italic">(Select up to 5)</span>
            </label>
            <div className="flex flex-wrap gap-2 min-h-8">
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="flex items-center gap-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg shadow-lg shadow-primary/20 hover:bg-emerald-600 transition-all active:scale-95 animate-in zoom-in duration-200"
                >
                  {tag} <X className="w-3 h-3" />
                </button>
              ))}
              {selectedTags.length === 0 && <span className="text-xs text-slate-400 italic">No tags selected...</span>}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {TECH_TAGS.filter(t => !selectedTags.includes(t)).slice(0, 15).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-black text-slate-500 hover:text-primary hover:border-primary transition-all rounded-lg uppercase tracking-widest"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="relative z-10 bg-primary/5 border border-primary/10 rounded-2xl p-6 overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Sparkles className="w-12 h-12 text-primary" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <HelpCircle className="w-4 h-4 text-primary" />
              </div>
              <p className="text-[11px] font-black text-primary uppercase tracking-widest">Discussion Guidelines</p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 font-medium">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full" /> Be specific and provide technical context</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full" /> Include what you've already attempted</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full" /> Add minimal, reproducible code snippets</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-primary rounded-full" /> Classify accurately for expert retrieval</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 backdrop-blur-md gap-4 relative z-20">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fields marked <span className="text-red-500">*</span> are required</p>
          <div className="flex gap-4 w-full sm:w-auto">
            <button 
              onClick={onClose} 
              className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 dark:hover:text-white transition-all border border-slate-200 dark:border-white/10 active:scale-90"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !body.trim() || selectedTags.length === 0 || isSubmitting}
              className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-10 py-3 rounded-xl flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Plus className="w-4 h-4" /> Post Question</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
