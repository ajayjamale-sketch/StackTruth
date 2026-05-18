import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Search, ChevronRight, Sparkles, Target, Users, Calendar, Layers, Award } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { MOCK_LEADERBOARD } from "@/constants/mockData";
import type { LeaderboardEntry } from "@/types";

const PERIODS = ["All Time", "This Month", "This Week"];
const CATEGORIES = ["Overall", "Problem Solving", "Code Audits", "Contributions"];

function ChangeIndicator({ change }: { change: number }) {
  if (change > 0) return <span className="flex items-center gap-1 text-primary text-xs font-black uppercase tracking-widest"><TrendingUp className="w-3 h-3" />+{change}</span>;
  if (change < 0) return <span className="flex items-center gap-1 text-red-500 text-xs font-black uppercase tracking-widest"><TrendingDown className="w-3 h-3" />{change}</span>;
  return <span className="flex items-center gap-1 text-slate-400 text-xs"><Minus className="w-3 h-3" /></span>;
}

function TopThreeCard({ entry, onClick }: { entry: LeaderboardEntry; onClick: (id: string) => void }) {
  const isFirst = entry.rank === 1;
  return (
    <div 
      onClick={() => onClick(entry.user.id)}
      className={`flex flex-col items-center group cursor-pointer active:scale-95 transition-all ${isFirst ? "scale-110 lg:-translate-y-12" : "scale-95 translate-y-4"}`}
    >
      <div className="relative mb-8 group">
        {isFirst && <Crown className="w-12 h-12 text-amber-400 absolute -top-16 left-1/2 -translate-x-1/2 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-pulse" />}
        <div className={`w-32 h-32 rounded-xl flex items-center justify-center text-primary font-black text-4xl border-4 transition-all duration-700 group-hover:scale-110 ${isFirst ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/20' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl'}`}>
           {entry.user.name.charAt(0)}
        </div>
        <div className={`absolute -bottom-3 -right-3 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-2xl border-4 border-white dark:border-slate-900 ${isFirst ? 'bg-primary text-xl' : entry.rank === 2 ? 'bg-slate-400' : 'bg-amber-700'}`}>
           {entry.rank}
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xl font-black text-slate-950 dark:text-white tracking-tighter truncate max-w-[160px]">{entry.user.name}</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">{entry.score.toLocaleString()} PTS</span>
          <ChangeIndicator change={entry.change} />
        </div>
        <div className="flex gap-2 justify-center pt-3">
          {entry.user.skills.slice(0, 2).map(s => <span key={s} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-400 rounded-md border border-slate-100 dark:border-slate-800 group-hover:border-primary/20 transition-colors">{s}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const { success } = useToast();
  const navigate = useNavigate();
  const [period, setPeriod] = useState("All Time");
  const [category, setCategory] = useState("Overall");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Wrap evaluation processing logic completely in a useMemo listening directly to selection switches
  const sortedAndFiltered = useMemo(() => {
    return [...MOCK_LEADERBOARD]
      .filter(e => {
        const matchesSearch = !search || 
          e.user.name.toLowerCase().includes(search.toLowerCase()) || 
          e.user.username.toLowerCase().includes(search.toLowerCase());
        
        const matchesCategory = 
          category === "Overall" ||
          (category === "Problem Solving" && (e.answers > 0 || e.questions > 0)) ||
          (category === "Code Audits" && e.codeReviews > 0) ||
          (category === "Contributions" && (e.answers + e.codeReviews) > 10);
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        
        if (category === "Problem Solving") {
          scoreA = (a.answers || 0) + (a.questions || 0);
          scoreB = (b.answers || 0) + (b.questions || 0);
        } else if (category === "Code Audits") {
          scoreA = a.codeReviews || 0;
          scoreB = b.codeReviews || 0;
        } else if (category === "Contributions") {
          scoreA = (a.answers || 0) + (a.codeReviews || 0);
          scoreB = (b.answers || 0) + (b.codeReviews || 0);
        } else {
          scoreA = a.score || 0;
          scoreB = b.score || 0;
        }

        // Apply Time Horizon Velocity Multipliers
        if (period === "This Week") {
          scoreA = scoreA * 0.1 + (a.change || 0) * 100;
          scoreB = scoreB * 0.1 + (b.change || 0) * 100;
        } else if (period === "This Month") {
          scoreA = scoreA * 0.5 + (a.change || 0) * 50;
          scoreB = scoreB * 0.5 + (b.change || 0) * 50;
        }
        
        // Tie-breaker fallback if values match perfectly
        if (scoreB === scoreA) {
          return b.score - a.score; 
        }

        return scoreB - scoreA;
      })
      .map((entry, index) => ({
        ...entry,
        rank: index + 1 // Re-assign global placement cleanly
      }));
  }, [period, category, search]);

  // Reset pagination safely inside state initialization when dependencies shift
  React.useEffect(() => {
    setCurrentPage(1);
  }, [period, category, search]);

  const totalPages = Math.ceil(sortedAndFiltered.length / itemsPerPage);
  
  // Calculate top 3 directly from the mutated global dataset context
  const top3 = sortedAndFiltered.slice(0, 3);
  
  // Paginate items correctly
  const paginatedItems = sortedAndFiltered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  // Filter table records to exclude current podium figures completely from view
  const rest = paginatedItems.filter(item => !top3.some(t => t.user.id === item.user.id));

  const handleProfileClick = (id: string) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-32 py-12">
      {/* 1. Hall of Sovereignty Header */}
      <section className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-16 rounded-xl shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10">
              <Trophy className="w-4 h-4 text-amber-500" /> Community Hall of Fame
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">Elite Contributor <br /> <span className="text-primary">Rankings</span></h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight">Recognizing the global elite who drive the world's most rigorous technical protocols.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
               <Users className="w-8 h-8 text-primary mx-auto mb-4" />
               <p className="text-3xl font-black text-slate-950 dark:text-white">48.2k+</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Global Experts</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
               <Target className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
               <p className="text-3xl font-black text-slate-950 dark:text-white">1.2M+</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Audit Protocols</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Premium Podium Section */}
      <section className="space-y-16">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
             <Crown className="w-5 h-5 text-amber-500" /> Sovereignty Podium
          </h2>
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 mx-8" />
        </div>
        <div className="relative group">
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end justify-center gap-16 lg:gap-32 pb-12">
            {top3[1] && <TopThreeCard entry={top3[1]} onClick={handleProfileClick} />}
            {top3[0] && <TopThreeCard entry={top3[0]} onClick={handleProfileClick} />}
            {top3[2] && <TopThreeCard entry={top3[2]} onClick={handleProfileClick} />}
          </div>
        </div>
      </section>

      {/* 3. Global Filters & Context Section */}
      <section className="space-y-12">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-xl shadow-xl flex flex-col xl:flex-row gap-8 items-center relative overflow-hidden">
           <div className="absolute inset-0 grid-pattern opacity-5" />
           <div className="relative flex-1 w-full group">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
             <input 
               value={search} 
               onChange={e => setSearch(e.target.value)} 
               placeholder="Search by contributor handle, reputation, or expertise..." 
               className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-lg pl-16 pr-6 py-5 text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm" 
             />
           </div>
        </div>
      </section>

      {/* 4. The Registry (Main Table) Section */}
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-4">
             <Layers className="w-8 h-8 text-primary" />
             The Global Registry
          </h2>
          <span className="px-5 py-2 bg-slate-50 dark:bg-slate-800 rounded-sm text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border border-slate-100 dark:border-slate-800">Verified Protocol Experts</span>
        </div>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-left bg-slate-50/50 dark:bg-slate-800/30">
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Auditor Rank</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Contributor Profile</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Technical Status</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Reputation Score</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Momentum</th>
                  <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Audit Registry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {rest.length > 0 ? (
                  rest.map((entry) => (
                    <tr 
                      key={entry.user.id} 
                      onClick={() => handleProfileClick(entry.user.id)}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-500 cursor-pointer"
                    >
                      <td className="px-10 py-8">
                        <span className="text-xl font-black text-slate-300 group-hover:text-primary transition-colors tracking-tighter">#{entry.rank}</span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-center text-primary font-black text-lg group-hover:scale-110 transition-transform duration-500">
                             {entry.user.name.charAt(0)}
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg font-black text-slate-950 dark:text-white tracking-tight group-hover:text-primary transition-colors duration-500">{entry.user.name}</p>
                            <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">Expert ID: ST_{entry.user.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex gap-2">
                          {entry.user.skills.slice(0, 2).map(s => (
                            <span key={s} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400 rounded-lg border border-slate-100 dark:border-slate-800 group-hover:border-primary/30 transition-all">{s}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right font-black text-slate-950 dark:text-white text-xl tracking-tighter">
                        {entry.score.toLocaleString()}
                      </td>
                      <td className="px-10 py-8 text-right">
                        <ChangeIndicator change={entry.change} />
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 ml-auto">
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-10 py-16 text-center text-slate-400 font-medium">
                      No matching contributors found for the current filter views.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-10 py-8 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Showing {Math.min(paginatedItems.length, itemsPerPage)} of {sortedAndFiltered.length} Auditors
              </p>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-black text-[10px] transition-all ${currentPage === i + 1 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white dark:bg-slate-900 text-slate-400 hover:text-primary border border-slate-100 dark:border-slate-800"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. Seasonal Achievements Section */}
      <section className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-20 text-slate-950 dark:text-white relative overflow-hidden group shadow-2xl dark:shadow-none">
         <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none dark:invert-0 invert" />
         <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
         
         <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 text-primary rounded-sm text-[11px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-xl shadow-primary/10">
                <Calendar className="w-5 h-5" /> Seasonal Performance Audit
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-slate-950 dark:text-white">Rising Stars of <br /> <span className="text-primary">Q2 2026.</span></h2>
              <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed font-medium tracking-tight">The contributors with the highest reputation velocity and protocol audit quality over the current seasonal quarter.</p>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <button 
                  onClick={() => navigate("/analytics")}
                  className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-lg font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-primary/30 active:scale-95"
                >
                  View Seasonal Report
                </button>
                <div className="flex items-center gap-4 px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm">
                   <Sparkles className="w-6 h-6 text-amber-500" />
                   <span className="text-[11px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-[0.3em]">Reputation Multiplier Active</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
               {[1, 2, 3].map(i => (
                 <div key={i} className="bg-white dark:bg-white/5 backdrop-blur-3xl p-8 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-between group/item hover:border-primary/50 transition-all duration-500 shadow-sm">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-black text-xl">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <div>
                        <p className="text-xl font-black text-slate-950 dark:text-white">Expert_Rising_{i}</p>
                        <p className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mt-1">Velocity: +1,240 / Week</p>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                       <Award className="w-6 h-6 text-amber-500" />
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}