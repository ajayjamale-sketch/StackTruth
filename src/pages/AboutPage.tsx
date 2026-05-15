import React from "react";
import { Link } from "react-router-dom";
import { Code2, Users, Zap, Shield, Globe, Award, ArrowRight, Star, Target, Sparkles, Building, Layers } from "lucide-react";
import { MOCK_USERS } from "@/constants/mockData";
import { useToast } from "@/contexts/ToastContext";

const TEAM = [
  { name: "Alexandra Chen", role: "Chief Executive Auditor", bio: "Former engineering lead at Stripe labs. Architecting the future of global technical sovereignty.", avatar: MOCK_USERS[1].avatar },
  { name: "Marcus Rodriguez", role: "Chief Technical Architect", bio: "Systems architect with 15+ years building high-frequency distributed platforms.", avatar: MOCK_USERS[0].avatar },
  { name: "Priya Sharma", role: "Director of Neural Intelligence", bio: "ML researcher specializing in automated code auditing and developer heuristics.", avatar: MOCK_USERS[5].avatar },
  { name: "Jordan Kim", role: "Head of Community Governance", bio: "Growth architect who scaled global engineering nodes to 1M+ active contributors.", avatar: MOCK_USERS[4].avatar },
];

const VALUES = [
  { icon: Code2, title: "Engineering First", description: "Every decision is audited against the single metric of developer computational excellence." },
  { icon: Users, title: "Protocol Driven", description: "Our ecosystem is governed by verified community-audited technical standards." },
  { icon: Shield, title: "Sovereign Quality", description: "We prioritize rigorous, expert-validated technical audits over high-volume data noise." },
  { icon: Globe, title: "Global Resilience", description: "Building a distributed knowledge ecosystem that operates across all global engineering nodes." },
];

export default function AboutPage() {
  const { success } = useToast();

  return (
    <div className="space-y-32 py-12">
      {/* 1. Sovereign Mission Header */}
      <section className="relative bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-950 dark:text-white rounded-2xl p-16 overflow-hidden group shadow-2xl dark:shadow-none">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none dark:invert-0 invert" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 text-primary rounded-sm text-[11px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-xl">
            <Zap className="w-5 h-5" /> The Strategic Mission
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
            Architecting <br /> <span className="text-primary">Technical Sovereignty.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight max-w-2xl">
            StackTruth was founded to eliminate knowledge fragmentation. We are building the world's most rigorous industrial laboratory for technical validation, architectural auditing, and expert collaboration.
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <button className="bg-primary text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-primary/30 active:scale-95">
              Read the Manifesto
            </button>
            <div className="flex items-center gap-4 px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm">
               <Shield className="w-6 h-6 text-primary" />
               <span className="text-[11px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-[0.3em]">Verified Protocol Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Industrial Statistics Section */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { value: "2.4M+", label: "Active Nodes", icon: Globe },
          { value: "18.4M+", label: "Verified Audits", icon: Target },
          { value: "340K+", label: "Expert Reviews", icon: Layers },
          { value: "127", label: "Global Hubs", icon: Building },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-xl shadow-sm text-center space-y-4 group hover:border-primary/30 transition-all duration-500">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">{stat.value}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* 3. Operational Values Section */}
      <section className="space-y-16">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
             <Star className="w-5 h-5 text-amber-500" /> Core Engineering Values
          </h2>
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 mx-8" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map(value => (
            <div key={value.title} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-xl space-y-6 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">{value.title}</h3>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium tracking-tight">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Executive Leadership Section */}
      <section className="space-y-24 bg-slate-50 dark:bg-slate-950/50 border-y border-slate-100 dark:border-slate-800 py-24 -mx-12 px-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter">Executive Leadership</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium tracking-tight">The architects driving global technical standards.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map(member => (
            <div key={member.name} className="bg-white dark:bg-slate-900 p-10 rounded-xl border border-slate-100 dark:border-slate-800 text-center space-y-6 hover:shadow-2xl transition-all group overflow-hidden relative">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-[40px] rounded-full" />
               <img src={member.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"} alt={member.name} className="w-24 h-24 rounded-2xl object-cover mx-auto bg-slate-100 dark:bg-slate-800 grayscale group-hover:grayscale-0 transition-all duration-700 relative z-10" />
               <div className="relative z-10 space-y-2">
                 <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">{member.name}</h3>
                 <p className="text-[11px] text-primary font-black uppercase tracking-[0.2em]">{member.role}</p>
                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-medium line-clamp-3">{member.bio}</p>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Final Convergence CTA */}
      <section className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-20 text-slate-950 dark:text-white relative overflow-hidden group shadow-2xl dark:shadow-none">
         <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none dark:invert-0 invert" />
         <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
         
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="space-y-10 max-w-2xl">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 text-primary rounded-sm text-[11px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-xl shadow-primary/10">
                <Sparkles className="w-5 h-5" /> Career Convergence
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-slate-950 dark:text-white">Join the <br /> <span className="text-primary">Laboratory.</span></h2>
              <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed font-medium tracking-tight">We are constantly seeking elite technical minds to scale our global auditing protocols. Explore our current mandates.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
              <Link to="/register" className="bg-primary text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl shadow-primary/30 text-center">Start Protocol</Link>
              <Link to="/jobs" className="bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-950 dark:text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/20 transition-all text-center">View Mandates</Link>
            </div>
         </div>
      </section>
    </div>
  );
}
