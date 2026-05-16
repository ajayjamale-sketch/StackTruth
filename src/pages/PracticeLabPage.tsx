import React, { useState } from "react";
import { 
  PlayCircle, Code2, Terminal, Shield, Zap, 
  ArrowLeft, Clock, Target, BookOpen, Layers,
  CheckCircle, HelpCircle, MessageSquare
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";

export default function PracticeLabPage() {
  const navigate = useNavigate();
  const { success } = useToast();
  const { module } = useParams();
  
  const [code, setCode] = useState("// Initialize your technical audit here...\n\nfunction auditProtocol() {\n  // Implementation logic\n}");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-12 animate-in fade-in duration-700">
      {/* Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Registry
      </button>

      {/* Lab Header */}
      <header className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-md text-[9px] font-black uppercase tracking-widest border border-primary/20">
              <Terminal className="w-4 h-4" /> Lab Module: {module?.replace("-", " ").toUpperCase()}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">
              Technical Audit <span className="text-primary">Laboratory.</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl">
              Verify your implementation protocols against industrial-grade test cases and computational benchmarks.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 w-24">
                <p className="text-2xl font-black text-slate-950 dark:text-white">64</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Difficulty</p>
             </div>
             <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 w-24">
                <p className="text-2xl font-black text-primary">A+</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Standard</p>
             </div>
          </div>
        </div>
      </header>

      {/* Main Lab Interface */}
      <div className="grid lg:grid-cols-12 gap-8 h-[700px]">
        {/* Code Editor Panel */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950 rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">editor.tsx</span>
            </div>
            <button 
              onClick={() => success("Protocol execution initiated. Analyzing computational complexity...")}
              className="bg-primary text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4" /> Run Audit
            </button>
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-transparent p-8 text-slate-300 font-mono text-sm outline-none resize-none"
            spellCheck="false"
          />
          <div className="p-4 bg-white/5 border-t border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex justify-between">
             <span>Memory: 12.4MB</span>
             <span>CPU: 0.02%</span>
          </div>
        </div>

        {/* Requirements & Documentation */}
        <div className="lg:col-span-4 space-y-8 overflow-y-auto pr-2">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Mission Protocols
            </h3>
            <div className="space-y-4">
              {[
                "Implement a time-optimized solution",
                "Maintain space complexity within O(N)",
                "Handle edge-case coordinate registries",
                "Verify atomic data consistency"
              ].map(task => (
                <div key={task} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary text-white p-8 rounded-2xl space-y-6 shadow-2xl shadow-primary/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full" />
             <h3 className="text-xl font-black tracking-tighter">Technical Hint</h3>
             <p className="text-sm opacity-90 leading-relaxed font-medium">
               Consider using a distributed coordinate registry to handle concurrent node updates without deadlocks.
             </p>
             <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                Unlock Solution Audit
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
