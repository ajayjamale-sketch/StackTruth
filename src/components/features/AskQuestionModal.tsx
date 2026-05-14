import React, { useState } from "react";
import { X, Code2, Eye, HelpCircle, ChevronDown, Plus } from "lucide-react";
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
  const [tagInput, setTagInput] = useState("");
  const [preview, setPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : prev.length < 5 ? [...prev, tag] : prev);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim() || selectedTags.length === 0) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSubmitting(false);
    success("Question posted!", "Your question is now live");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-white">Ask a Technical Question</h2>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Question Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to handle race conditions in React hooks?"
              maxLength={150}
              className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
            />
            <p className="text-xs text-slate-600 mt-1">{title.length}/150</p>
          </div>

          {/* Body */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-300">
                Description <span className="text-red-400">*</span>
              </label>
              <button
                onClick={() => setPreview(!preview)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                {preview ? "Edit" : "Preview"}
              </button>
            </div>
            {preview ? (
              <div className="min-h-32 p-4 bg-white/5 border border-border rounded-lg text-sm text-slate-300 leading-relaxed">
                {body || <span className="text-slate-600">Nothing to preview yet</span>}
              </div>
            ) : (
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Describe your problem in detail. Include what you've tried, expected behavior, and what's actually happening..."
                rows={6}
                className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all resize-none"
              />
            )}
          </div>

          {/* Code block toggle */}
          <div>
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <Code2 className="w-4 h-4 text-blue-400" />
              {showCode ? "Remove code snippet" : "Add code snippet"}
              <ChevronDown className={`w-4 h-4 transition-transform ${showCode ? "rotate-180" : ""}`} />
            </button>
            {showCode && (
              <div className="mt-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-border rounded-t-lg">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-amber-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs text-slate-500 font-mono ml-2">code.ts</span>
                </div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={CODE_EXAMPLE}
                  rows={8}
                  className="w-full bg-slate-950 border border-border border-t-0 rounded-b-lg px-4 py-3 text-sm font-mono text-green-300 placeholder:text-slate-700 focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Tags <span className="text-red-400">*</span>
              <span className="text-slate-600 font-normal ml-2">Select up to 5</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {selectedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="flex items-center gap-1 bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-lg"
                >
                  {tag} <X className="w-3 h-3" />
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TECH_TAGS.filter(t => !selectedTags.includes(t)).slice(0, 20).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="tag-badge"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <p className="text-xs font-bold text-blue-400">Writing tips</p>
            </div>
            <ul className="text-xs text-slate-500 space-y-1">
              <li>• Be specific and provide enough context</li>
              <li>• Include what you've already tried</li>
              <li>• Add minimal, reproducible code examples</li>
              <li>• Choose accurate tags to reach the right experts</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-xs text-slate-600">Fields marked <span className="text-red-400">*</span> are required</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-secondary text-sm px-4 py-2">Cancel</button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || !body.trim() || selectedTags.length === 0 || isSubmitting}
              className="btn-primary text-sm px-6 py-2 flex items-center gap-2 disabled:opacity-50"
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
