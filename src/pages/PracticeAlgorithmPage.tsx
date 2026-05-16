import React, { useState } from "react";
import { 
  Zap, Search, Filter, ChevronRight, Target, Cpu, 
  Terminal, Layers, Sparkles, Shield, Clock, Award,
  CheckCircle2, PlayCircle, BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";

const ALGORITHM_PROBLEMS = [
  { id: 1, title: "Distributed Consensus Algorithm", difficulty: "Hard", category: "Graphs", successRate: "24%", points: 450, status: "Verified" },
  { id: 2, title: "Memory-Efficient Matrix Rotation", difficulty: "Medium", category: "Arrays", successRate: "42%", points: 200, status: "Active" },
  { id: 3, title: "Atomic Stream Deduplication", difficulty: "Hard", category: "Hashing", successRate: "18%", points: 600, status: "Active" },
  { id: 4, title: "Real-time Shortest Path Node", difficulty: "Medium", category: "Graphs", successRate: "38%", points: 250, status: "Verified" },
  { id: 5, title: "Dynamic Load Balancing Protocol", difficulty: "Hard", category: "DP", successRate: "12%", points: 800, status: "Active" },
  { id: 6, title: "Recursive Pattern Recognition", difficulty: "Easy", category: "Recursion", successRate: "76%", points: 100, status: "Verified" },
  { id: 7, title: "Optimized Registry Sorting", difficulty: "Easy", category: "Sorting", successRate: "82%", points: 100, status: "Verified" },
];

export default function PracticeAlgorithmPage() {
  const navigate = useNavigate();
  const { success } = useToast();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProblems = ALGORITHM_PROBLEMS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || p.difficulty === filter || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-16 animate-in fade-in duration-700">
      {/* 1. Industrial Header */}
      <section className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-16 rounded-2xl shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10">
              <Zap className="w-4 h-4 text-amber-500" /> Algorithm Mastery Node
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">
              Computational <span className="text-primary">Logic Lab.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight">
              Verify mission-critical logic protocols through rigorous computational complexity audits and industrial-grade optimization labs.
            </p>
          </div>
          
          <div className="flex gap-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm">
               <BarChart3 className="w-8 h-8 text-primary mx-auto mb-4" />
               <p className="text-3xl font-black text-slate-950 dark:text-white">840</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Active Mandates</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 text-center shadow-sm">
               <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
               <p className="text-3xl font-black text-slate-950 dark:text-white">12k+</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Verified Audits</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Control Registry (Search & Filters) */}
      <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col xl:flex-row gap-6 items-center">
         <div className="relative flex-1 w-full group">
           <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
           <input 
             value={search} 
             onChange={e => setSearch(e.target.value)} 
             placeholder="Search by protocol title, category, or complexity..." 
             className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl pl-16 pr-6 py-5 text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm font-medium" 
           />
         </div>
         <div className="flex flex-wrap gap-3 w-full xl:w-auto">
            {["All", "Easy", "Medium", "Hard", "Graphs", "DP"].map(tag => (
              <button 
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${filter === tag ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:text-primary hover:border-primary/30"}`}
              >
                {tag}
              </button>
            ))}
         </div>
      </section>

      {/* 3. Logic Registry (Problem List) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
            <Terminal className="w-5 h-5 text-primary" /> Computational Mandates
          </h2>
          <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>Sorting by: <span className="text-primary">Impact Score</span></span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Protocol Status</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Mandate Title</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Complexity</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Integrity Rate</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {filteredProblems.map(problem => (
                  <tr key={problem.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all duration-500 cursor-pointer" onClick={() => navigate(`/practice/lab/${problem.title.toLowerCase().replace(/ /g, "-")}`)}>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2">
                        {problem.status === "Verified" ? (
                          <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-sm text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">Verified</div>
                        ) : (
                          <div className="px-3 py-1 bg-primary/10 text-primary rounded-sm text-[9px] font-black uppercase tracking-widest border border-primary/20">Active</div>
                        )}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="space-y-1">
                        <p className="text-lg font-black text-slate-950 dark:text-white group-hover:text-primary transition-colors tracking-tight">{problem.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{problem.category} • Mandate #{problem.id}</p>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${problem.difficulty === "Hard" ? "text-red-500" : problem.difficulty === "Medium" ? "text-amber-500" : "text-emerald-500"}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: problem.successRate }} />
                        </div>
                        <span className="text-xs font-black text-slate-950 dark:text-white">{problem.successRate}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       <button className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:bg-primary/10 transition-all duration-500 ml-auto border border-slate-200 dark:border-slate-700 group-hover:border-primary/30">
                         <PlayCircle className="w-6 h-6" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Mastery Progress Footnote */}
      <section className="bg-slate-950 rounded-3xl p-12 text-white relative overflow-hidden group shadow-2xl">
         <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
         <div className="absolute top-0 left-0 w-1/2 h-full bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
         
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-black tracking-tighter flex items-center gap-3 justify-center md:justify-start">
                <Award className="w-6 h-6 text-amber-500" /> Logic Mastery Status
              </h3>
              <p className="text-slate-400 font-medium">Your account authority has verified <span className="text-white font-black">12/840</span> algorithm protocols.</p>
            </div>
            <div className="flex gap-8">
               <div className="text-center">
                 <p className="text-4xl font-black text-primary tracking-tighter">84.2%</p>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Percentile</p>
               </div>
               <div className="w-px h-16 bg-white/10" />
               <div className="text-center">
                 <p className="text-4xl font-black text-white tracking-tighter">2.4k</p>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Impact Pts</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
