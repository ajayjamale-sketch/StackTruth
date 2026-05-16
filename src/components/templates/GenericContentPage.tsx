import React from "react";
import { 
  Shield, Zap, Award, CheckCircle, ArrowRight, 
  Search, Filter, Globe, Star, Users, Layers, 
  Code2, Sparkles, BookOpen, Clock, Target, 
  MessageSquare, Terminal, Cpu, Network 
} from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

interface Section {
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface PageTemplateProps {
  title: string;
  subtitle: string;
  heroBadge: string;
  heroDescription: string;
  sections: Section[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  ctaOnClick?: () => void;
  primaryColor?: string;
}

const COLOR_MAPS: Record<string, { bg: string, text: string, border: string, btn: string, glow: string }> = {
  primary: {
    bg: "bg-primary",
    text: "text-primary",
    border: "border-primary",
    btn: "bg-primary",
    glow: "bg-primary/5"
  },
  "emerald-500": {
    bg: "bg-emerald-500",
    text: "text-emerald-500",
    border: "border-emerald-500",
    btn: "bg-emerald-500",
    glow: "bg-emerald-500/5"
  },
  "blue-600": {
    bg: "bg-blue-600",
    text: "text-blue-600",
    border: "border-blue-600",
    btn: "bg-blue-600",
    glow: "bg-blue-600/5"
  },
  "purple-600": {
    bg: "bg-purple-600",
    text: "text-purple-600",
    border: "border-purple-600",
    btn: "bg-purple-600",
    glow: "bg-purple-600/5"
  },
  "indigo-600": {
    bg: "bg-indigo-600",
    text: "text-indigo-600",
    border: "border-indigo-600",
    btn: "bg-indigo-600",
    glow: "bg-indigo-600/5"
  },
  "amber-600": {
    bg: "bg-amber-600",
    text: "text-amber-600",
    border: "border-amber-600",
    btn: "bg-amber-600",
    glow: "bg-amber-600/5"
  }
};

export default function GenericContentPage({ 
  title, subtitle, heroBadge, heroDescription, 
  sections, ctaTitle, ctaDescription, ctaButton,
  ctaOnClick,
  primaryColor = "primary"
}: PageTemplateProps) {
  const { success } = useToast();
  const colors = COLOR_MAPS[primaryColor] || COLOR_MAPS.primary;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-32 py-12 animate-in fade-in duration-700">
      {/* 1. Hero Section */}
      <section className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 sm:p-12 lg:p-16 rounded-xl shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className={`absolute top-0 right-0 w-1/2 h-full ${colors.glow} blur-[120px] rounded-full pointer-events-none`} />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="space-y-6 max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 ${colors.glow} ${colors.text} rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border ${colors.border}/10`}>
              <Zap className="w-4 h-4" /> {heroBadge}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">
              {title} <br /> <span className={`${colors.text}`}>{subtitle}</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight">
              {heroDescription}
            </p>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-6">
            <div className="flex gap-4">
               <div className="bg-slate-100/50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-100 dark:border-slate-800 text-center w-32">
                 <p className="text-3xl font-black text-slate-950 dark:text-white">Ver.</p>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Status</p>
               </div>
               <div className="bg-slate-100/50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-100 dark:border-slate-800 text-center w-32">
                 <p className={`text-3xl font-black ${colors.text}`}>2.0</p>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Protocol</p>
               </div>
            </div>
            <button 
              onClick={ctaOnClick || (() => success("Protocol established. Initializing technical program..."))}
              className={`w-full bg-slate-950 dark:${colors.bg} text-white font-black px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-xl active:scale-95`}
            >
              Initialize Program
            </button>
          </div>
        </div>
      </section>

      {/* 2. Features Grid Section */}
      <section className="space-y-16">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
             <Layers className={`w-5 h-5 ${colors.text}`} /> Operational Modules
          </h2>
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 mx-8" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {sections.map((section, i) => (
            <div 
              key={i} 
              onClick={section.onClick || (() => success(`Accessing ${section.title} module...`))}
              className="bg-white dark:bg-slate-900 p-10 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:shadow-xl transition-all duration-500 group cursor-pointer active:scale-[0.98]"
            >
              <div className={`w-14 h-14 ${colors.glow} rounded-2xl flex items-center justify-center ${colors.text} mb-8 group-hover:scale-110 transition-transform`}>
                {section.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter mb-4">{section.title}</h3>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium tracking-tight">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Metrics Section */}
      <section className="bg-slate-50 dark:bg-slate-950/50 border-y border-slate-100 dark:border-slate-800 py-24">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
           {[
             { label: "Verified Users", value: "48.2k+" },
             { label: "Success Rate", value: "99.4%" },
             { label: "Active Nodes", value: "1.2k" },
             { label: "SLA Guarantee", value: "24/7" }
           ].map(stat => (
             <div key={stat.label} className="space-y-2">
               <p className={`text-4xl font-black text-slate-950 dark:text-white tracking-tighter`}>{stat.value}</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
             </div>
           ))}
        </div>
      </section>

      {/* 4. Strategic FAQ Section */}
      <section className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">Support Protocols</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium tracking-tight">Commonly retrieved information regarding this program.</p>
        </div>
        <div className="space-y-4">
          {[
            "How do I initiate the technical audit?",
            "What are the verified certification requirements?",
            "Can I collaborate with other global experts?"
          ].map((q, i) => (
            <div 
              key={i} 
              onClick={() => success("Protocol documentation retrieved.")}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer"
            >
              <span className="font-black text-slate-950 dark:text-white text-lg tracking-tight">{q}</span>
              <ChevronDown className={`w-5 h-5 text-slate-400 group-hover:${colors.text} transition-colors`} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Final CTA Section */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl p-8 sm:p-16 lg:p-20 text-slate-950 dark:text-white relative overflow-hidden group shadow-2xl dark:shadow-none">
         <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none dark:invert-0 invert" />
         <div className={`absolute top-0 right-0 w-1/3 h-full ${colors.bg}/20 blur-[150px] rounded-full pointer-events-none`} />
         
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-8 max-w-2xl text-center lg:text-left">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight text-slate-950 dark:text-white">{ctaTitle}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed font-medium tracking-tight">
                {ctaDescription}
              </p>
            </div>
            <button 
              onClick={ctaOnClick || (() => success("Program enrollment protocol initiated."))}
              className={`${colors.bg} text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl active:scale-95`}
            >
              {ctaButton}
            </button>
         </div>
      </section>
    </div>
  );
}

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);
