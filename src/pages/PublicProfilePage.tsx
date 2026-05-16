import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Shield, Award, CheckCircle, MessageSquare, 
  Terminal, Code2, Zap, Globe, Github, Twitter,
  TrendingUp, Star, Users, ArrowLeft
} from "lucide-react";
import { MOCK_USERS } from "@/constants/mockData";

export default function PublicProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find user by ID or use a generic one if it's Expert_X
  const user = MOCK_USERS.find(u => u.id === id) || MOCK_USERS[1]; 
  const isExpert = user.role === "expert";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-12 animate-in fade-in duration-700">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Context
      </button>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Profile Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-2xl shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full" />
             <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="w-32 h-32 bg-primary/10 rounded-2xl flex items-center justify-center text-4xl font-black text-primary border border-primary/20 shadow-inner">
                  {user.name.charAt(0)}
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-2 justify-center">
                    {user.name}
                    {isExpert && <Shield className="w-6 h-6 text-primary" />}
                  </h1>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest">@{user.username}</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-xl font-black text-slate-950 dark:text-white">{user.reputation.toLocaleString()}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reputation</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {user.bio}
                </p>
                <div className="flex gap-4 pt-4">
                  <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:text-primary transition-colors border border-slate-100 dark:border-slate-800"><Github className="w-5 h-5" /></button>
                  <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:text-primary transition-colors border border-slate-100 dark:border-slate-800"><Twitter className="w-5 h-5" /></button>
                  <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:text-primary transition-colors border border-slate-100 dark:border-slate-800"><Globe className="w-5 h-5" /></button>
                </div>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-2xl space-y-8">
             <h3 className="text-xl font-black tracking-tighter flex items-center gap-2">
               <Award className="w-5 h-5 text-primary" /> Verified Credentials
             </h3>
             <div className="flex flex-wrap gap-3">
               {user.badges.map(badge => (
                 <div key={badge.id} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-800 group hover:border-primary/20 transition-all flex items-center gap-3">
                    <span className="text-xl">{badge.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{badge.name}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="lg:col-span-8 space-y-12">
           <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: "Audit Protocols", value: user.contributions, icon: Code2, color: "text-blue-500" },
                { label: "Verified Answers", value: "248", icon: CheckCircle, color: "text-emerald-500" },
                { label: "Impact Score", value: "98.2", icon: Zap, color: "text-amber-500" }
              ].map(stat => (
                <div key={stat.label} className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl space-y-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <div>
                    <p className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">{stat.value}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              ))}
           </div>

           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-2xl space-y-10 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black tracking-tighter">Recent Technical Contributions</h3>
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                         <h4 className="font-black text-slate-950 dark:text-white group-hover:text-primary transition-colors">Distributed Ledger Synchronization Protocol Audit #{i}</h4>
                         <div className="flex gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <span className="flex items-center gap-2"><Star className="w-3.5 h-3.5" /> 24 Helpful</span>
                           <span className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> 128 Views</span>
                         </div>
                      </div>
                      <span className="px-3 py-1 bg-primary/5 text-primary text-[9px] font-black uppercase tracking-widest rounded-md border border-primary/10">Verified</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 border border-slate-100 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary hover:border-primary/20 transition-all">
                View Full Repository
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
