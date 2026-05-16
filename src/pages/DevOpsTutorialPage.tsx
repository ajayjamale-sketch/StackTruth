import React, { useState } from "react";
import { 
  Globe, Globe2, Zap, CheckCircle, PlayCircle, 
  ArrowLeft, Clock, Target, BookOpen, Award,
  Terminal, Database, Cpu, Shield, Activity, GitBranch,
  Cloud, Lock, Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";

export default function DevOpsTutorialPage() {
  const navigate = useNavigate();
  const { success } = useToast();
  const [activeModule, setActiveModule] = useState<number | null>(1);

  const modules = [
    { id: 1, title: "Infrastructure as Code (IaC) Mastery", duration: "7h 15m", lessons: 14 },
    { id: 2, title: "CI/CD Orchestration Protocols", duration: "8h 45m", lessons: 16 },
    { id: 3, title: "Kubernetes Cluster Management", duration: "12h 30m", lessons: 22 },
    { id: 4, title: "Observability & Audit Scanning", duration: "6h 20m", lessons: 12 },
    { id: 5, title: "Global Scale Security Hardening", duration: "9h 10m", lessons: 18 },
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
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
            <Globe className="w-4 h-4" /> Cloud Scale DevOps
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">
            Orchestrate <br /> <span className="text-amber-500 underline decoration-amber-500/20 decoration-8 underline-offset-8">Global Scale.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
            Master the protocols for automated infrastructure, resilient deployment pipelines, and global security enforcement.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => success("DevOps Pipeline initialized. Deployment authorization granted.")}
              className="bg-amber-500 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
            >
              Start Deployment
            </button>
            <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl">
               <Activity className="w-5 h-5 text-amber-500" />
               <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Protocol Verified</span>
            </div>
          </div>
        </div>
        <div className="relative aspect-square bg-slate-100 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
           <img 
             src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" 
             className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" 
             alt="Cloud Infrastructure"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
           <div className="absolute bottom-10 left-10 right-10 flex gap-4">
              <div className="flex-1 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                 <p className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-1 text-center">Pipelines Active</p>
                 <p className="text-xl font-black text-white text-center">1,284</p>
              </div>
              <div className="flex-1 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                 <p className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-1 text-center">Uptime Grade</p>
                 <p className="text-xl font-black text-white text-center">AAA+</p>
              </div>
           </div>
        </div>
      </section>

      {/* 2. Pipeline Syllabus */}
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">Mission Syllabus</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Verified tracks for industrial cloud orchestration mastery.</p>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
             <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 46h Total Content</span>
             <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> 82 Real-world Projects</span>
          </div>
        </div>
        <div className="grid gap-4">
          {modules.map(module => (
            <div 
              key={module.id} 
              onClick={() => setActiveModule(module.id)}
              className={`p-8 bg-white dark:bg-slate-900 border rounded-2xl flex items-center justify-between group cursor-pointer transition-all ${activeModule === module.id ? "border-amber-500 shadow-xl shadow-amber-500/5 ring-4 ring-amber-500/5" : "border-slate-100 dark:border-slate-800 hover:border-amber-500/30"}`}
            >
              <div className="flex items-center gap-8">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black transition-all ${activeModule === module.id ? "bg-amber-500 text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-400"}`}>
                  {module.id}
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">{module.title}</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">{module.lessons} Modules • {module.duration}</p>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-amber-500 transition-all ${activeModule === module.id ? "bg-amber-500/10 border-amber-500/20 text-amber-500" : ""}`}>
                 <PlayCircle className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Global Infrastructure Tools */}
      <section className="p-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter text-center">Industrial Tooling</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium text-center">Master the tools that power modern infrastructure.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { name: "Terraform", icon: Settings, desc: "Infrastructure as Code" },
             { name: "Kubernetes", icon: Cloud, desc: "Orchestration" },
             { name: "AWS/GCP", icon: Globe2, desc: "Cloud Platforms" },
             { name: "Docker", icon: GitBranch, desc: "Containerization" },
             { name: "GitHub Actions", icon: Activity, desc: "CI/CD Automation" },
             { name: "Prometheus", icon: Activity, desc: "Monitoring" },
             { name: "Vault", icon: Lock, desc: "Security" },
             { name: "Ansible", icon: Terminal, desc: "Configuration" },
           ].map(tech => (
             <div key={tech.name} className="p-6 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-center space-y-4 group hover:border-amber-500/50 transition-all">
                <tech.icon className="w-8 h-8 text-amber-500 mx-auto group-hover:scale-110 transition-transform" />
                <div>
                   <p className="text-sm font-black text-slate-950 dark:text-white tracking-tight">{tech.name}</p>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{tech.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 4. Prerequisites & Trajectory */}
      <section className="grid md:grid-cols-2 gap-12">
         <div className="p-12 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-8">
            <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">Prerequisites</h3>
            <div className="space-y-6">
              {[
                "Linux System Administration",
                "Advanced CLI Mastery",
                "Networking Core Protocols",
                "Basic Scripting Mastery"
              ].map(pre => (
                <div key={pre} className="flex items-center gap-4">
                   <div className="w-2 h-2 bg-amber-500 rounded-full" />
                   <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">{pre}</span>
                </div>
              ))}
            </div>
         </div>
         <div className="p-12 bg-slate-950 text-white rounded-3xl space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
            <h3 className="text-2xl font-black tracking-tighter">Career Outlook</h3>
            <div className="space-y-6 relative z-10">
               {[
                 { role: "Site Reliability Engineer", salary: "$140k - $220k" },
                 { role: "Cloud Architect", salary: "$160k - $280k" },
                 { role: "DevSecOps Specialist", salary: "$150k - $250k" },
               ].map(job => (
                 <div key={job.role} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-sm font-bold opacity-80">{job.role}</span>
                    <span className="text-xs font-black uppercase tracking-widest">{job.salary}</span>
                 </div>
               ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Verified global industry benchmarks</p>
         </div>
      </section>

      {/* 5. Final Certification */}
      <section className="p-16 md:p-24 bg-slate-950 border border-amber-500/30 rounded-3xl text-center space-y-12 relative overflow-hidden shadow-2xl">
         <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
         <div className="space-y-6 relative z-10">
            <div className="w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-950 mx-auto shadow-xl shadow-amber-500/20">
               <Award className="w-10 h-10" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Cloud Orchestration <br /> Mastery Protocol</h2>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">Validate your technical sovereignty and join the elite ranks of verified cloud architects.</p>
         </div>
         <div className="relative z-10 pt-8">
            <button 
              onClick={() => success("Certification protocol deployed. Ready for evaluation.")}
              className="bg-amber-500 text-slate-950 font-black px-16 py-6 rounded-xl hover:bg-amber-400 transition-all shadow-2xl active:scale-95 uppercase text-sm tracking-widest"
            >
              Begin Final Audit
            </button>
         </div>
      </section>
    </div>
  );
}
