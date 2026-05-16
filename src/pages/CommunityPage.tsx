import React, { useState } from "react";
import { 
  Users, MessageSquare, Flame, Sparkles, Plus, 
  Search, Filter, Globe, Shield, Zap, TrendingUp,
  Award, Heart, Share2, MoreVertical
} from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { MOCK_USERS, MOCK_QUESTIONS } from "@/constants/mockData";

export default function CommunityPage() {
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState("discussions");

  const stats = [
    { label: "Active Nodes", value: "12,402", color: "text-blue-500" },
    { label: "Verified Experts", value: "842", color: "text-emerald-500" },
    { label: "Total Audits", value: "48.2k", color: "text-primary" },
    { label: "Live Labs", value: "12", color: "text-amber-500" },
  ];

  const categories = [
    { name: "Frontend", icon: Globe, count: 124 },
    { name: "Backend", icon: Zap, count: 89 },
    { name: "Infrastructure", icon: Shield, count: 56 },
    { name: "AI/ML", icon: Sparkles, count: 42 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 animate-in fade-in duration-700">
      {/* 1. Community Hero */}
      <section className="relative bg-slate-950 rounded-3xl p-8 sm:p-16 overflow-hidden border border-white/5 shadow-2xl">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-primary/10 blur-[150px] rounded-full" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
               <Users className="w-4 h-4" /> Global Engineering Collective
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              The Protocol <br /> <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">Collective.</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
              Collaborate with the world's elite engineers to solve complex technical challenges and verify architectural protocols.
            </p>
            <div className="flex flex-wrap gap-4">
               <button 
                 onClick={() => success("Collective protocol active. Welcome, Auditor.")}
                 className="bg-primary text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95"
               >
                 Join Collective
               </button>
               <button className="bg-white/5 text-white border border-white/10 px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95">
                 View Manifesto
               </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
             {stats.map(stat => (
               <div key={stat.label} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm group hover:border-primary/50 transition-all">
                  <p className={`text-4xl font-black ${stat.color} tracking-tighter mb-2`}>{stat.value}</p>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 2. Main Community Feed */}
      <section className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-12">
          {/* Navigation Tabs */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex gap-8">
              {["Discussions", "Live Labs", "Events", "Directory"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative pb-4 ${activeTab === tab.toLowerCase() ? "text-primary" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase() && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full animate-in fade-in duration-300" />}
                </button>
              ))}
            </div>
            <button className="text-primary font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:translate-x-1 transition-transform">
              <Plus className="w-4 h-4" /> New Thread
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-6">
             <div className="relative flex-1 group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search collective knowledge..."
                 className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl pl-12 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
               />
             </div>
             <button className="px-6 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-primary transition-all active:scale-95 shadow-sm">
                <Filter className="w-4 h-4" /> Filter Protocols
             </button>
          </div>

          {/* Discussion List */}
          <div className="space-y-6">
             {MOCK_QUESTIONS.slice(0, 5).map((q, i) => (
               <div key={q.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-2xl hover:shadow-xl hover:border-primary/20 transition-all duration-500 group">
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl h-fit border border-slate-100 dark:border-slate-800">
                       <button className="text-slate-300 hover:text-primary transition-colors"><TrendingUp className="w-5 h-5" /></button>
                       <span className="text-sm font-black text-slate-950 dark:text-white">{q.votes}</span>
                    </div>
                    <div className="flex-1 space-y-4">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-black">U</div>
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">@{q.author.username} • 2h ago</span>
                          </div>
                          <button className="text-slate-300 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                       </div>
                       <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight group-hover:text-primary transition-colors cursor-pointer">{q.title}</h3>
                       <div className="flex flex-wrap gap-2">
                          {q.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 rounded-md">#{tag}</span>
                          ))}
                       </div>
                       <div className="flex items-center gap-6 pt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 dark:border-slate-800">
                          <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> {q.answers} Audits</span>
                          <span className="flex items-center gap-2 hover:text-red-500 cursor-pointer transition-colors"><Heart className="w-4 h-4" /> 124</span>
                          <span className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors"><Share2 className="w-4 h-4" /> Share</span>
                       </div>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Community Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          {/* Trending Topics */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-2xl shadow-xl space-y-10">
             <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-3">
               <Flame className="w-6 h-6 text-orange-500" /> Hot Protocols
             </h3>
             <div className="space-y-6">
                {categories.map(cat => (
                  <div key={cat.name} className="flex items-center justify-between group cursor-pointer active:scale-95 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                           <cat.icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-black text-slate-900 dark:text-slate-200">{cat.name}</span>
                     </div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.count} active</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Top Contributors */}
          <div className="bg-slate-950 rounded-2xl p-10 border border-white/5 space-y-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
             <h3 className="text-2xl font-black text-white tracking-tighter relative z-10 flex items-center gap-3">
               <Award className="w-6 h-6 text-amber-500" /> Top Auditors
             </h3>
             <div className="space-y-6 relative z-10">
                {MOCK_USERS.slice(0, 4).map((user, i) => (
                  <div key={user.id} className="flex items-center justify-between group cursor-pointer active:scale-95 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-black border border-primary/20">
                           {user.name.charAt(0)}
                        </div>
                        <div>
                           <p className="text-sm font-black text-white leading-none">@{user.username}</p>
                           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Reputation: {(user.reputation / 1000).toFixed(1)}k</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-emerald-500">Rank #{i+1}</p>
                     </div>
                  </div>
                ))}
             </div>
             <button 
               onClick={() => success("Opening global leaderboard...")}
               className="w-full bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 relative z-10"
             >
               View Leaderboard
             </button>
          </div>

          {/* Community Guidelines Card */}
          <div className="p-10 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl text-white space-y-8 shadow-2xl shadow-primary/20">
             <Shield className="w-12 h-12 opacity-50" />
             <h3 className="text-3xl font-black tracking-tighter">Collective Integrity</h3>
             <p className="text-sm font-medium opacity-80 leading-relaxed">Ensure all technical audits follow our verified objectivity protocols to maintain collective intelligence.</p>
             <button className="w-full bg-white text-primary font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
                Review Protocols
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
