import React, { useState } from "react";
import { 
  BookOpen, Edit3, Shield, Zap, FileText, HelpCircle, 
  ChevronRight, CheckCircle2, AlertCircle, Award, 
  Layers, Download, ExternalLink, MessageSquare,
  Sparkles, PenTool, ClipboardCheck, Rocket
} from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

const GUIDELINES = [
  {
    title: "Technical Accuracy",
    desc: "Every claim must be backed by official documentation or reproducible benchmarks.",
    icon: <Shield className="w-6 h-6" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Concise Delivery",
    desc: "Avoid fluff. Use direct language and high-fidelity code snippets for clarity.",
    icon: <Zap className="w-6 h-6" />,
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  {
    title: "Industrial Context",
    desc: "Relate concepts to real-world engineering challenges and industrial protocols.",
    icon: <Layers className="w-6 h-6" />,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  }
];

const WORKFLOW = [
  { step: "01", title: "Protocol Definition", desc: "Define the scope and technical objectives of your article.", icon: <PenTool className="w-5 h-5" /> },
  { step: "02", title: "Drafting & Logic", desc: "Structure your content with valid syntax and logical flow.", icon: <Edit3 className="w-5 h-5" /> },
  { step: "03", title: "Technical Audit", desc: "Internal review by the Expert Council for accuracy.", icon: <ClipboardCheck className="w-5 h-5" /> },
  { step: "04", title: "Final Deployment", desc: "Live publication to the global technical library.", icon: <Rocket className="w-5 h-5" /> },
];

export default function AuthorGuidesPage() {
  const { success } = useToast();
  const [activeSection, setActiveSection] = useState("guidelines");

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 pb-32 space-y-24 animate-in fade-in duration-700">
      {/* 1. Hero/Header Section */}
      <section className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-16 rounded-xl shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10">
              <Award className="w-4 h-4" /> Author Excellence Program
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">The Author <br /> <span className="text-primary">Protocols</span></h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight">Official benchmarks and standards for crafting high-fidelity technical content on StackTruth.</p>
          </div>
          <div className="flex gap-4">
             <button onClick={() => success("Template downloaded to secure storage.")} className="bg-primary text-white font-black px-8 py-4 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest">
               <Download className="w-5 h-5" /> Download Kit
             </button>
          </div>
        </div>
      </section>

      {/* 2. Writing Guidelines Section */}
      <section className="space-y-12">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">Core Benchmarks</h2>
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {GUIDELINES.map((item) => (
            <div key={item.title} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-xl hover:shadow-xl transition-all group">
              <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Content Standards & 4. Publishing Workflow */}
      <div className="grid lg:grid-cols-2 gap-12">
        <section className="space-y-8 bg-slate-50 dark:bg-slate-950 p-12 rounded-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-5" />
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter relative z-10 flex items-center gap-3">
            <ClipboardCheck className="w-6 h-6 text-primary" /> Content Standards
          </h2>
          <div className="space-y-4 relative z-10">
            {[
              "High-resolution code blocks with explanations",
              "Proper markdown heading hierarchy (H1-H4)",
              "Citations for all external technical data",
              "Original visual assets or licensed images",
              "Minimum 800 words for deep-dive tutorials"
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/10 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{rule}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10 p-12 rounded-xl border border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-3">
            <Rocket className="w-6 h-6 text-primary" /> Publishing Workflow
          </h2>
          <div className="space-y-6">
            {WORKFLOW.map((step) => (
              <div key={step.step} className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary font-black text-lg group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-widest">{step.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">{step.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 5. Resources/Templates Section */}
      <section className="bg-primary p-20 rounded-xl text-white relative overflow-hidden shadow-2xl shadow-primary/20 group">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 blur-[100px] rounded-full translate-x-1/2" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">Master the Author <br /> Toolkit.</h2>
            <p className="text-white/80 text-lg leading-relaxed font-medium">Access our curated repository of writing templates, asset kits, and technical style guides.</p>
            <div className="flex flex-wrap gap-4 pt-4">
               <button onClick={() => success("Writing template loaded.")} className="bg-white text-primary font-black px-10 py-4 rounded-xl text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Get Templates</button>
               <button onClick={() => success("Asset kit downloaded.")} className="bg-primary-foreground/10 text-white border border-white/20 font-black px-10 py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Image Assets</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Style Guide", icon: <FileText className="w-5 h-5" /> },
              { label: "Code Prefixes", icon: <Edit3 className="w-5 h-5" /> },
              { label: "SEO Protocols", icon: <Sparkles className="w-5 h-5" /> },
              { label: "Expert Lab", icon: <MessageSquare className="w-5 h-5" /> },
            ].map(item => (
              <div key={item.label} className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer group/item">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover/item:scale-110 transition-all">{item.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ/Help Section */}
      <section className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">Frequent Inquiries</h2>
          <p className="text-slate-500 font-medium">Support protocols for author excellence.</p>
        </div>
        <div className="space-y-4">
          {[
            { q: "How long does the audit process take?", a: "The Expert Council typically completes a technical audit within 48-72 standard operation hours." },
            { q: "Can I include external library dependencies?", a: "Yes, provided they are cited and justified within the technical industrial context of the article." },
            { q: "What is the reputation gain for featured articles?", a: "Featured articles provide a base gain of +500 reputation points plus engagement bonuses." }
          ].map((faq, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-xl hover:border-primary transition-all group">
              <div className="flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">{faq.q}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
