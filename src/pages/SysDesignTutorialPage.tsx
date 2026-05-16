import React, { useState } from "react";
import { 
  Shield, Layers, Zap, CheckCircle, PlayCircle, 
  ArrowLeft, Clock, Target, BookOpen, Award,
  Terminal, Database, Cpu, Globe, Server, Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";

export default function SysDesignTutorialPage() {
  const navigate = useNavigate();
  const { success } = useToast();
  const [activeModule, setActiveModule] = useState<number | null>(1);

  const modules = [
    { id: 1, title: "Scalability Core Protocols", duration: "5h 45m", lessons: 10 },
    { id: 2, title: "Distributed Database Architecture", duration: "9h 30m", lessons: 18 },
    { id: 3, title: "Concurrency & Conflict Resolution", duration: "7h 15m", lessons: 14 },
    { id: 4, title: "High-Availability Clusters", duration: "8h 00m", lessons: 16 },
    { id: 5, title: "Global Load Balancing Mastery", duration: "6h 50m", lessons: 12 },
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
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
            <Shield className="w-4 h-4" /> System Design Elite
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">
            Architect for <br /> <span className="text-emerald-500 underline decoration-emerald-500/20 decoration-8 underline-offset-8">Scale.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
            Master the architectural patterns required to build high-concurrency, fault-tolerant clusters that handle millions of requests.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => navigate("/practice/lab/sysdesign-core")}
              className="bg-emerald-500 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
            >
              Start Architecting
            </button>
            <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl">
               <Layers className="w-5 h-5 text-emerald-500" />
               <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Mastery Verified</span>
            </div>
          </div>
        </div>
        <div className="relative aspect-square bg-slate-100 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
           <img 
             src="/assets/images/system-design-blueprint.png" 
             className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" 
             alt="System Architecture"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
           <div className="absolute bottom-10 left-10 right-10 grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Availability</p>
                 <p className="text-2xl font-black text-white">99.999%</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Latency</p>
                 <p className="text-2xl font-black text-white">&lt; 50ms</p>
              </div>
           </div>
        </div>
      </section>

      {/* 2. Core Modules (Syllabus) */}
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">Architectural Syllabus</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">12 Specialized weeks of intensive distributed systems theory.</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
             <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 37h Total Content</span>
             <span className="flex items-center gap-2"><Layers className="w-4 h-4" /> 52 Design Patterns</span>
          </div>
        </div>
        <div className="grid gap-4">
          {modules.map(module => (
            <div 
              key={module.id} 
              onClick={() => {
                setActiveModule(module.id);
                navigate(`/practice/lab/sysdesign-${module.id}`);
              }}
              className={`p-8 bg-white dark:bg-slate-900 border rounded-2xl flex items-center justify-between group cursor-pointer transition-all ${activeModule === module.id ? "border-emerald-500 shadow-xl shadow-emerald-500/5 ring-4 ring-emerald-500/5" : "border-slate-100 dark:border-slate-800 hover:border-emerald-500/30"}`}
            >
              <div className="flex items-center gap-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black transition-all ${activeModule === module.id ? "bg-emerald-500 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-400"}`}>
                  {module.id}
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">{module.title}</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">{module.lessons} Modules • {module.duration}</p>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-emerald-500 transition-all ${activeModule === module.id ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : ""}`}>
                 <PlayCircle className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Key Concepts Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">Master These Patterns</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Core competencies required for elite architectural roles.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Distributed Consensus", icon: Network, desc: "Paxos & Raft protocols" },
             { title: "Eventual Consistency", icon: Activity, desc: "CAP theorem implementation" },
             { title: "Sharding Strategies", icon: Server, desc: "Horizontal data distribution" },
             { title: "Load Balancing", icon: Globe, desc: "Global traffic orchestration" },
             { title: "Caching Protocols", icon: Zap, desc: "Multi-layer data retrieval" },
             { title: "Message Queues", icon: Terminal, desc: "Asynchronous coordination" },
           ].map(tech => (
              <div 
                key={tech.title} 
                onClick={() => success(`Accessing ${tech.title} specialized audit node...`)}
                className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-emerald-500/50 transition-all group hover:shadow-xl cursor-pointer"
              >
                <tech.icon className="w-10 h-10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">{tech.title}</h3>
                <p className="text-sm text-slate-500 mt-2 font-medium">{tech.desc}</p>
              </div>
            ))}
        </div>
      </section>

      {/* 4. Prerequisites & Roadmap */}
      <section className="grid md:grid-cols-12 gap-8">
         <div className="md:col-span-7 p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-8">
            <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">Technical Prerequisites</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Advanced Backend Mastery",
                "Operating Systems Internals",
                "Networking Core Protocols",
                "Database Theory Elite",
                "Algorithm Optimization",
                "Distributed Core Theory"
              ].map(pre => (
                <div key={pre} className="flex items-center gap-3">
                   <CheckCircle className="w-4 h-4 text-emerald-500" />
                   <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{pre}</span>
                </div>
              ))}
            </div>
         </div>
         <div className="md:col-span-5 p-12 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 grid-pattern opacity-10 dark:invert-0 invert" />
            <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">Industry Impact</h3>
            <div className="space-y-4 relative z-10">
               <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Architects with verified mastery in these protocols are responsible for the infrastructure of global platforms.</p>
               <div className="pt-6 space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl">
                     <p className="text-xs text-emerald-500 font-black uppercase tracking-widest mb-1">Target Role</p>
                     <p className="text-lg font-black text-slate-950 dark:text-white">Staff Systems Architect</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl">
                     <p className="text-xs text-emerald-500 font-black uppercase tracking-widest mb-1">Average Salary</p>
                     <p className="text-lg font-black text-slate-950 dark:text-white">$250k - $450k</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. Final Certification */}
      <section className="p-16 md:p-24 bg-emerald-500 rounded-3xl text-center space-y-12 shadow-2xl shadow-emerald-500/30 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 blur-[100px] rounded-full" />
         <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-900/10 blur-[100px] rounded-full" />
         <div className="space-y-6 relative z-10">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-white mx-auto">
               <Award className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Architectural Sovereignty</h2>
            <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto">Complete the elite track and validate your ability to architect global-scale distributed systems.</p>
         </div>
         <div className="relative z-10 pt-8">
            <button 
              onClick={() => navigate("/practice/lab/sysdesign-elite")}
              className="bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-black px-16 py-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-2xl active:scale-95 uppercase text-sm tracking-widest"
            >
              Begin Final Evaluation
            </button>
         </div>
      </section>
    </div>
  );
}

// Missing icon from AI page
function Network(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </svg>
  )
}
