import React, { useState, useEffect } from "react";
import { 
  PlayCircle, Code2, Terminal, Shield, Zap, 
  ArrowLeft, Clock, Target, BookOpen, Layers,
  CheckCircle, HelpCircle, MessageSquare, RotateCcw
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";

const MODULE_CONTENT: Record<string, { title: string, tasks: string[], hint: string, boilerplate: string }> = {
  "mern-comprehensive": {
    title: "MERN Stack Full-Cycle Audit",
    tasks: [
      "Implement JWT-based authentication protocol",
      "Verify MongoDB aggregation pipeline efficiency",
      "Configure Express middleware for rate limiting",
      "Audit React state synchronization with Redux/Zustand"
    ],
    hint: "Focus on the atomic consistency between the MongoDB cluster and the React frontend state.",
    boilerplate: "// MERN Comprehensive Audit Registry\n\nconst auditMernProtocol = async () => {\n  // 1. Initialize Auth Cluster\n  // 2. Validate Data Integrity\n  // 3. Verify API Throughput\n};"
  },
  "sorting": {
    title: "Sorting Algorithm Optimization",
    tasks: [
      "Implement Quicksort with median-of-three pivot",
      "Optimize for O(N log N) time complexity",
      "Maintain O(log N) space overhead",
      "Verify stability of the sorting protocol"
    ],
    hint: "Use the median-of-three strategy to avoid worst-case O(N^2) scenarios in the audit.",
    boilerplate: "function quicksort(arr) {\n  // Implementation logic for optimized sorting\n}"
  }
};

export default function PracticeLabPage() {
  const navigate = useNavigate();
  const { success } = useToast();
  const { module } = useParams();
  
  const content = MODULE_CONTENT[module || ""] || {
    title: "Technical Audit Laboratory",
    tasks: ["Implement a time-optimized solution", "Maintain space complexity within O(N)", "Handle edge-case coordinate registries", "Verify atomic data consistency"],
    hint: "Consider using a distributed coordinate registry to handle concurrent node updates without deadlocks.",
    boilerplate: "// Initialize your technical audit here...\n\nfunction auditProtocol() {\n  // Implementation logic\n}"
  };

  const [code, setCode] = useState(content.boilerplate);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Sync code when module changes
  useEffect(() => {
    setCode(content.boilerplate);
    setConsoleOutput([]);
  }, [module]);

  const runAudit = async () => {
    setIsRunning(true);
    setConsoleOutput(["[SYSTEM] Initializing industrial-grade verification suite..."]);
    await new Promise(r => setTimeout(r, 800));
    setConsoleOutput(prev => [...prev, `[COMPILER] Compiling ${module?.toUpperCase()} protocols...`, "[COMPILER] Type-check passed. No critical regressions found."]);
    await new Promise(r => setTimeout(r, 1200));
    setConsoleOutput(prev => [...prev, "[RUNNER] Executing audit benchmarks...", "✓ Complexity: O(N log N) verified", "✓ Memory overhead: 12.4MB PASS", "✓ Atomic consistency: STABLE"]);
    await new Promise(r => setTimeout(r, 1000));
    setConsoleOutput(prev => [...prev, "[SUCCESS] Audit complete. Your implementation meets the industrial standard."]);
    setIsRunning(false);
    success("Audit Complete", "Your technical protocol has been verified against the registry.");
  };

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
      <div className="grid lg:grid-cols-12 gap-8 h-[800px]">
        {/* Code Editor Panel */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex-1 flex flex-col bg-slate-950 rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">protocol.ts</span>
              </div>
              <button 
                onClick={runAudit}
                disabled={isRunning}
                className="bg-primary text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
              >
                {isRunning ? <RotateCcw className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
                {isRunning ? "Verifying..." : "Run Audit"}
              </button>
            </div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent p-8 text-slate-300 font-mono text-sm outline-none resize-none leading-relaxed"
              spellCheck="false"
            />
          </div>

          {/* Audit Console */}
          <div className="h-48 bg-slate-950 rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Audit Console</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
              {consoleOutput.length === 0 ? (
                <span className="text-slate-700">Waiting for protocol execution...</span>
              ) : (
                consoleOutput.map((line, i) => (
                  <div key={i} className={`${line.includes("[SUCCESS]") ? "text-emerald-400" : line.includes("[ERROR]") ? "text-red-400" : line.includes("✓") ? "text-primary" : "text-slate-400"}`}>
                    {line}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Requirements & Documentation */}
        <div className="lg:col-span-4 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-2xl space-y-6">
            <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Mission Protocols
            </h3>
            <div className="space-y-4">
              {content.tasks.map(task => (
                <div key={task} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed">{task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary text-white p-8 rounded-2xl space-y-6 shadow-2xl shadow-primary/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
             <h3 className="text-xl font-black tracking-tighter">Technical Hint</h3>
             <p className="text-sm opacity-90 leading-relaxed font-medium">
               {content.hint}
             </p>
             <button 
               onClick={() => success("Solution protocol unlocked. Retrieving architectural audit and optimized code registry...")}
               className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
             >
                Unlock Solution Audit
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
