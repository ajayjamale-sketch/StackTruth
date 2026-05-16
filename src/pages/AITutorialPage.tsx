import React, { useState } from "react";
import { 
  Bot, Cpu, Network, Zap, CheckCircle, PlayCircle, 
  ArrowLeft, Clock, Target, BookOpen, Layers, Award,
  Terminal, Database, Sparkles, Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";

export default function AITutorialPage() {
  const navigate = useNavigate();
  const { success } = useToast();
  const [activeModule, setActiveModule] = useState<number | null>(1);

  const modules = [
    { id: 1, title: "Neural Architecture Fundamentals", duration: "6h 20m", lessons: 12 },
    { id: 2, title: "Deep Learning Optimization", duration: "8h 45m", lessons: 15 },
    { id: 3, title: "Natural Language Processing Labs", duration: "10h 15m", lessons: 20 },
    { id: 4, title: "Computer Vision Protocols", duration: "7h 30m", lessons: 14 },
    { id: 5, title: "LLM Fine-tuning & Deployment", duration: "12h 00m", lessons: 18 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-24 animate-in fade-in duration-700">
      {/* Navigation */}
      <button 
        onClick={() => navigate("/tutorials")}
        className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Academy
      </button>

      {/* 1. Hero Section */}
      <section className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-500/10 text-purple-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-500/20">
            <Bot className="w-4 h-4" /> AI & ML Infrastructure
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">
            Scale Neural <br /> <span className="text-purple-500 underline decoration-purple-500/20 decoration-8 underline-offset-8">Architectures.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
            Master the deployment, scaling, and fine-tuning of machine learning models in mission-critical production environments.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => success("AI Core initialized. Deployment protocol active.")}
              className="bg-purple-500 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-purple-600 transition-all shadow-xl shadow-purple-500/20 active:scale-95"
            >
              Initialize Mastery
            </button>
            <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl">
               <Shield className="w-5 h-5 text-purple-500" />
               <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Verified Accreditation</span>
            </div>
          </div>
        </div>
        <div className="relative aspect-square bg-slate-100 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
           <img 
             src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80" 
             className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" 
             alt="AI Infrastructure"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
           <div className="absolute bottom-10 left-10 right-10 flex gap-6">
              {[
                { label: "Stability", value: "99.9%" },
                { label: "Accuracy", value: "98.4%" },
                { label: "Nodes", value: "4.2k" },
              ].map(stat => (
                <div key={stat.label} className="flex-1 text-center">
                  <p className="text-xl font-black text-white leading-none">{stat.value}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 2. Core Modules (Syllabus) */}
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">Mission Syllabus</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">5 Sequential modules designed for high-density neural mastery.</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
             <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 44h Total Content</span>
             <span className="flex items-center gap-2"><Layers className="w-4 h-4" /> 79 Laboratory Tasks</span>
          </div>
        </div>
        <div className="grid gap-4">
          {modules.map(module => (
            <div 
              key={module.id} 
              onClick={() => setActiveModule(module.id)}
              className={`p-8 bg-white dark:bg-slate-900 border rounded-2xl flex items-center justify-between group cursor-pointer transition-all ${activeModule === module.id ? "border-purple-500 shadow-xl shadow-purple-500/5 ring-4 ring-purple-500/5" : "border-slate-100 dark:border-slate-800 hover:border-purple-500/30"}`}
            >
              <div className="flex items-center gap-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black transition-all ${activeModule === module.id ? "bg-purple-500 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-400"}`}>
                  {module.id}
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">{module.title}</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">{module.lessons} Modules • {module.duration}</p>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-purple-500 transition-all ${activeModule === module.id ? "bg-purple-500/10 border-purple-500/20 text-purple-500" : ""}`}>
                 <PlayCircle className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Technology Stack */}
      <section className="p-16 bg-slate-950 rounded-3xl text-white space-y-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Standardized Tech Stack</h2>
          <p className="text-slate-400 text-lg font-medium tracking-tight">Industrial tools utilized throughout this mastery track.</p>
        </div>
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { name: "PyTorch 2.x", icon: Cpu, desc: "Neural Engine" },
             { name: "TensorFlow", icon: Network, desc: "Production Scale" },
             { name: "CUDA 12", icon: Zap, desc: "GPU Compute" },
             { name: "HuggingFace", icon: Globe, desc: "Model Registry" },
           ].map(tech => (
             <div key={tech.name} className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center space-y-4 hover:border-purple-500/50 transition-all group">
                <tech.icon className="w-10 h-10 text-purple-500 mx-auto group-hover:scale-110 transition-transform" />
                <div>
                   <p className="text-base font-black tracking-tight">{tech.name}</p>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{tech.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 4. Prerequisites & Roadmap */}
      <section className="grid md:grid-cols-2 gap-12">
         <div className="p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-8">
            <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">Prerequisites</h3>
            <div className="space-y-6">
              {[
                "Advanced Python Orchestration",
                "Linear Algebra Mastery",
                "Distributed Computing Theory",
                "Linux Core Protocols"
              ].map(pre => (
                <div key={pre} className="flex items-center gap-4">
                   <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                   <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-[0.15em]">{pre}</span>
                </div>
              ))}
            </div>
         </div>
         <div className="p-12 bg-purple-500 text-white rounded-3xl space-y-8 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 blur-[80px] rounded-full" />
            <h3 className="text-2xl font-black tracking-tighter">Career Trajectory</h3>
            <div className="space-y-6 relative z-10">
               {[
                 { role: "ML Infrastructure Engineer", salary: "$160k - $240k" },
                 { role: "AI Systems Architect", salary: "$180k - $300k" },
                 { role: "Data Science Director", salary: "$220k - $350k" },
               ].map(job => (
                 <div key={job.role} className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-sm font-bold opacity-80">{job.role}</span>
                    <span className="text-xs font-black uppercase tracking-widest">{job.salary}</span>
                 </div>
               ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Verified global industry benchmarks</p>
         </div>
      </section>

      {/* 5. Certification Protocol */}
      <section className="relative p-16 md:p-24 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-center space-y-10 overflow-hidden">
         <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
         <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mx-auto shadow-inner relative z-10">
            <Award className="w-10 h-10" />
         </div>
         <div className="space-y-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">Neural Mastery Protocol</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">Complete the AI/ML track to receive a verifiable cryptographic credential of infrastructure mastery.</p>
         </div>
         <div className="flex justify-center gap-8 relative z-10">
            <button 
              onClick={() => success("Certification process initialized.")}
              className="bg-slate-950 dark:bg-purple-500 text-white font-black px-12 py-5 rounded-xl hover:opacity-90 transition-all shadow-2xl active:scale-95 uppercase text-xs tracking-widest"
            >
              Begin Certification
            </button>
         </div>
      </section>
    </div>
  );
}
