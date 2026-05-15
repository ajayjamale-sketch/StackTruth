import React, { useState } from "react";
import { 
  Layout, Bot, Shield, Globe, Sparkles, TrendingUp, 
  PlayCircle, Star, CheckCircle, ChevronRight, Award,
  Search, Filter, ArrowLeft, Clock, Target, BookOpen,
  Terminal, Database, Cpu, Zap, Code2, Layers, Play
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/contexts/ToastContext";

const TRACKS = [
  { 
    id: "mern",
    title: "MERN Stack Mastery", 
    desc: "Complete path from zero to full-stack architect with verified industry protocols.",
    icon: <Layout className="w-8 h-8" />,
    count: "85 Chapters",
    category: "Development",
    color: "from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/5 dark:to-blue-500/5",
    text: "text-indigo-600"
  },
  { 
    id: "ai",
    title: "AI & ML Infrastructure", 
    desc: "Master the deployment and scaling of neural architectures in production labs.",
    icon: <Bot className="w-8 h-8" />,
    count: "64 Chapters",
    category: "AI/ML",
    color: "from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5",
    text: "text-purple-600"
  },
  { 
    id: "sysdesign",
    title: "System Design Elite", 
    desc: "Architectural patterns for high-concurrency clusters and atomic data integrity.",
    icon: <Shield className="w-8 h-8" />,
    count: "42 Chapters",
    category: "Architecture",
    color: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5",
    text: "text-emerald-600"
  },
  { 
    id: "devops",
    title: "Cloud Scale DevOps", 
    desc: "Infrastructure as code, automated audits, and global coordination protocols.",
    icon: <Globe className="w-8 h-8" />,
    count: "76 Chapters",
    category: "DevOps",
    color: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5",
    text: "text-amber-600"
  }
];

const CATEGORIES = ["All", "Development", "AI/ML", "Architecture", "DevOps"];

export default function TutorialsPage() {
  const { success } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTrack, setSelectedTrack] = useState<any | null>(null);

  const filteredTracks = TRACKS.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         track.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || track.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const trackSyllabus = [
    { id: 1, title: "Foundational Protocols", duration: "4h 20m", lessons: 8, status: "completed" },
    { id: 2, title: "Architecture Orchestration", duration: "6h 45m", lessons: 12, status: "in-progress" },
    { id: 3, title: "Security Enforcement", duration: "3h 15m", lessons: 6, status: "locked" },
    { id: 4, title: "Scale Synchronization", duration: "8h 10m", lessons: 15, status: "locked" },
  ];

  const handleAction = (trackId?: string) => {
    if (trackId === "mern") navigate("/tutorials/mern");
    else if (trackId === "python") navigate("/tutorials/python");
    else {
      const track = TRACKS.find(t => t.id === trackId);
      if (track) setSelectedTrack(track);
      else success("Protocol initiated. Welcome to the track.");
    }
  };

  if (selectedTrack) {
    return (
      <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button 
          onClick={() => setSelectedTrack(null)}
          className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Technical Academy
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-8">
              <div className={`w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-xl`}>
                {selectedTrack.icon}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">{selectedTrack.title}</h1>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Verified</span>
                </div>
                <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{selectedTrack.desc}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "Total Duration", value: "24h 45m", icon: Clock },
                { label: "Mastery Level", value: "Industrial", icon: Target },
                { label: "Track Modules", value: "12 Stages", icon: BookOpen },
              ].map(stat => (
                <div key={stat.label} className="p-6 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 space-y-2">
                  <stat.icon className="w-5 h-5 text-emerald-500" />
                  <p className="text-lg font-black text-slate-950 dark:text-white">{stat.value}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-3">
                <Layers className="w-6 h-6 text-emerald-500" /> Syllabus Protocol
              </h2>
              <div className="space-y-4">
                {trackSyllabus.map(module => (
                  <div key={module.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between group hover:border-emerald-500/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-black text-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        {module.id}
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-950 dark:text-white tracking-tight">{module.title}</h4>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">{module.lessons} Modules • {module.duration}</p>
                      </div>
                    </div>
                    {module.status === "completed" ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : module.status === "in-progress" ? (
                      <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">Resuming...</div>
                    ) : (
                      <Shield className="w-5 h-5 text-slate-200 dark:text-slate-800" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 bg-slate-950 rounded-xl text-white space-y-8 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 grid-pattern opacity-10" />
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Mission Parameters</p>
                  <h3 className="text-2xl font-black tracking-tighter leading-tight">Initialize Mastery Protocol</h3>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between text-xs border-b border-white/10 pb-4">
                     <span className="text-white/60">Success Rate</span>
                     <span className="font-black">94.2%</span>
                   </div>
                   <div className="flex items-center justify-between text-xs border-b border-white/10 pb-4">
                     <span className="text-white/60">Audit Credits</span>
                     <span className="font-black text-emerald-400">+1,200</span>
                   </div>
                   <div className="flex items-center justify-between text-xs pb-4">
                     <span className="text-white/60">Estimated Time</span>
                     <span className="font-black">2.5 Weeks</span>
                   </div>
                </div>
                <button 
                  onClick={() => success("Protocol deployed. Laboratory initialized.")}
                  className="w-full py-4 bg-emerald-500 text-white rounded-lg font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
                >
                  Join Track
                </button>
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl space-y-6">
              <h3 className="text-lg font-black text-slate-950 dark:text-white tracking-tighter">Prerequisites</h3>
              <div className="space-y-4">
                {["Basic Logic Protocols", "CLI Access Mastery", "Distributed Theory"].map(pre => (
                  <div key={pre} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">{pre}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-32 py-12">
        
        {/* 1. Hero Section */}
        <section className="relative bg-white dark:bg-slate-900 rounded-xl p-16 md:p-24 overflow-hidden group border border-slate-100 dark:border-white/5 shadow-2xl dark:shadow-none">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/grid.svg')] bg-center dark:invert-0 invert" />
          <div className="absolute top-0 right-0 w-2/3 h-full bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="space-y-10 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-sm text-[11px] font-black uppercase tracking-[0.3em] border border-emerald-500/20">
                <Sparkles className="w-5 h-5" /> Elite Technical Roadmap
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">
                Master the <br /> <span className="text-emerald-500">Protocols.</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed max-w-xl">
                Structured tutorial paths designed by industry veterans to take you from foundational concepts to mission-critical implementations.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                 <button 
                   onClick={() => handleAction()}
                   className="bg-emerald-500 text-white px-12 py-5 rounded-lg font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 active:scale-95"
                 >
                   Start Learning
                 </button>
                 <div className="flex items-center gap-4 text-slate-400 font-black text-[10px] uppercase tracking-widest cursor-pointer hover:text-slate-950 dark:hover:text-white transition-colors">
                   <PlayCircle className="w-6 h-6 text-slate-950 dark:text-white" /> Watch Overview
                 </div>
              </div>
            </div>

            <div className="w-full lg:w-[450px] bg-slate-50 dark:bg-white/5 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-xl p-10 space-y-8 shadow-xl dark:shadow-none">
               <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-950 dark:text-white">Daily Progress</h3>
                 <TrendingUp className="w-6 h-6 text-emerald-500" />
               </div>
               <div className="space-y-6">
                 {[
                   { label: "Architecture Audit", progress: 85 },
                   { label: "Node Coordination", progress: 62 },
                   { label: "Security Scanning", progress: 45 },
                 ].map(item => (
                   <div key={item.label} className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                       <span>{item.label}</span>
                       <span>{item.progress}%</span>
                     </div>
                     <div className="h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500" style={{ width: `${item.progress}%` }} />
                     </div>
                   </div>
                 ))}
               </div>
               <button 
                 onClick={() => handleAction("mern")}
                 className="w-full py-4 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-950 dark:text-white hover:bg-emerald-500 hover:text-white transition-all active:scale-95 shadow-sm"
               >
                 Resume Last Protocol
               </button>
            </div>
          </div>
        </section>

        {/* 2. Structured Mastery Tracks with Search and Filters */}
        <section className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">Structured Mastery Tracks</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto md:mx-0">Verified learning sequences designed for high-density knowledge retention.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative group flex-1 sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="Search tracks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                />
              </div>
              <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm' : 'text-slate-500 hover:text-emerald-500'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredTracks.map((track) => (
              <div 
                key={track.title} 
                onClick={() => handleAction(track.id)}
                className="group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
              >
                 <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                 <div className="relative z-10 space-y-8">
                    <div className={`w-16 h-16 ${track.text} bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      {track.icon}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter leading-tight">{track.title}</h3>
                      <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{track.desc}</p>
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-800">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{track.count} • {track.category}</span>
                      <ChevronRight className="w-6 h-6 text-emerald-500 group-hover:translate-x-2 transition-transform" />
                    </div>
                 </div>
              </div>
            ))}
            {filteredTracks.length === 0 && (
              <div className="col-span-full py-24 text-center bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                 <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                 <p className="text-lg font-black text-slate-400">No tracks found matching your protocol.</p>
                 <button onClick={() => { setSearchTerm(""); setActiveCategory("All"); }} className="mt-4 text-emerald-500 font-black uppercase tracking-widest text-[10px] border-b-2 border-emerald-500">Reset Filters</button>
              </div>
            )}
          </div>
        </section>

        {/* 3. Featured Spotlight Roadmap */}
        <section className="relative py-24 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="max-w-5xl mx-auto px-10 relative z-10 flex flex-col lg:flex-row items-center gap-20">
             <div className="flex-1 space-y-8">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-500 rounded-sm text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                  <Star className="w-4 h-4 fill-amber-500" /> Premium Roadmap
               </div>
               <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">Advanced System <br /> Design Blueprint</h2>
               <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">A specialized 12-week intensive protocol covering global distribution and high-availability clusters.</p>
               <ul className="grid grid-cols-2 gap-4">
                 {["Distributed Locking", "Consensus Protocols", "Eventual Consistency", "Sharding Strategies"].map(item => (
                   <li key={item} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                     <CheckCircle className="w-4 h-4 text-emerald-500" /> {item}
                   </li>
                 ))}
               </ul>
               <button 
                 onClick={() => navigate("/practice/system-design")}
                 className="bg-emerald-600 dark:bg-emerald-500 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-xl active:scale-95"
               >
                 Enroll in Track
               </button>
             </div>
             <div className="w-full lg:w-[400px] aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden relative shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef0109121c64?auto=format&fit=crop&w=800&q=80" 
                  alt="System Design"
                  className="w-full h-full object-cover opacity-60 dark:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-xl">
                   <p className="text-xs font-black text-white uppercase tracking-widest mb-2">Next Cohort</p>
                   <p className="text-2xl font-black text-white">May 24, 2026</p>
                </div>
             </div>
          </div>
        </section>

        {/* 4. Expert Video Collections */}
        <section className="space-y-16">
          <div className="flex items-center justify-between">
             <div className="space-y-1">
               <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">Premium Collections</h2>
               <p className="text-slate-500 dark:text-slate-400 font-medium">Deep-dive video series from verified technical auditors.</p>
             </div>
             <button 
              onClick={() => navigate("/community")}
              className="text-emerald-500 font-black uppercase tracking-widest text-[10px] border-b-2 border-emerald-500 pb-1 hover:text-emerald-400 transition-colors"
             >
              Browse All Videos
             </button>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Distributed Database Internals", time: "14h 20m", level: "Expert", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80" },
              { title: "Large Scale AI Deployment", time: "10h 45m", level: "Advanced", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" },
              { title: "Industrial Security Protocols", time: "12h 15m", level: "Pro", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" }
            ].map((video, i) => (
              <div key={i} className="group cursor-pointer space-y-6">
                 <div className="relative aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <img src={video.img} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <PlayCircle className="w-8 h-8 fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-slate-950/80 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-black text-white rounded-lg uppercase tracking-widest">
                      {video.time}
                    </div>
                 </div>
                 <div className="space-y-3">
                    <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      <span className="text-emerald-500">{video.level} Level</span>
                      <span>Verified Audit</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-950 dark:text-white leading-tight group-hover:text-emerald-500 transition-colors">{video.title}</h3>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Final CTA */}
        <section className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-16 md:p-24 rounded-xl text-center space-y-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:40px:40px] opacity-[0.03] pointer-events-none" />
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 rounded-sm text-[11px] font-black uppercase tracking-widest border border-emerald-500/20">
              <Award className="w-5 h-5" /> Certification Protocol
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tighter">Validate Your <br /> Technical <span className="text-emerald-500">Sovereignty.</span></h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">Complete any verified track and earn a cryptographic proof of technical mastery.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 relative z-10">
             {[
               { label: "Verified Tracks", value: "120+" },
               { label: "Learning Experts", value: "48k+" },
               { label: "Hours of Content", value: "2.4k+" }
             ].map(stat => (
               <div key={stat.label} className="space-y-1">
                 <p className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">{stat.value}</p>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
               </div>
             ))}
          </div>
          <div className="pt-8 relative z-10">
            <button 
              onClick={handleAction}
              className="bg-emerald-500 text-white px-16 py-6 rounded-lg font-black uppercase tracking-widest text-sm hover:bg-emerald-400 transition-all shadow-2xl active:scale-95"
            >
              Start Your First Track
            </button>
          </div>
        </section>
      </div>
    );
}