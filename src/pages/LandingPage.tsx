import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Code2, MessageSquare, Shield, Users, Zap, Trophy, ArrowRight,
  Star, CheckCircle, Github, Search, TrendingUp, Globe, ChevronDown,
  Bot, Briefcase, BookOpen, Award, Sparkles, Building, PlayCircle,
  FileText, Clock, ExternalLink, Quote, Crown, ChevronRight, MapPin,
  Terminal, Database, Cpu, Layout, Settings
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { TESTIMONIALS, PRICING_PLANS, TECH_TAGS, MOCK_JOBS } from "@/constants/mockData";


const CATEGORIES = [
  { label: "Data Structures", icon: <Database className="w-6 h-6" />, color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400" },
  { label: "Algorithms", icon: <Cpu className="w-6 h-6" />, color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400" },
  { label: "Web Dev", icon: <Layout className="w-6 h-6" />, color: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400" },
  { label: "Python", icon: <Terminal className="w-6 h-6" />, color: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400" },
  { label: "Java", icon: <Settings className="w-6 h-6" />, color: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400" },
  { label: "C++", icon: <Code2 className="w-6 h-6" />, color: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400" },
  { label: "Machine Learning", icon: <Bot className="w-6 h-6" />, color: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400" },
  { label: "System Design", icon: <Building className="w-6 h-6" />, color: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400" },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (search.trim()) {
      navigate(`/questions?q=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/questions");
    }
  };

  const handleTagSearch = (tag: string) => {
    navigate(`/questions?q=${encodeURIComponent(tag)}`);
  };

  return (
    <>


      {/* 1. Hero Section - GFG Inspired Clean Search */}
      <section className="relative pt-32 pb-24 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-[#f8f9fa] dark:bg-slate-950/50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Hello, What Do You Want To <span className="text-primary">Learn?</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">Search from over 10,000+ technical articles and interview experiences.</p>
          </div>

          <div className="max-w-3xl mx-auto relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tutorials, courses, or problems..."
                className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl pl-6 pr-40 py-5 text-lg focus:outline-none focus:border-primary transition-all shadow-sm placeholder:text-slate-400 dark:text-white"
              />
              <button type="submit" className="absolute right-2 top-2 bottom-2 bg-primary text-white px-10 rounded-lg font-bold hover:bg-emerald-700 transition-all shadow-md flex items-center gap-2">
                <Search className="w-5 h-5" /> Search
              </button>
            </form>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Trending:</span>
            {["Array", "String", "Linked List", "Tree", "Dynamic Programming"].map(tag => (
              <button key={tag} onClick={() => handleTagSearch(tag)} className="hover:text-primary transition-colors cursor-pointer">{tag}</button>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1">
        {/* 2. Quick Access Categories - High Density Grid */}
        <section className="py-16 bg-white dark:bg-slate-900 border-b border-slate-50 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {CATEGORIES.map((cat) => (
                <Link key={cat.label} to="/knowledge" className="group flex flex-col items-center gap-4 p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary hover:shadow-lg transition-all duration-300 text-center">
                  <div className={`w-14 h-14 ${cat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors whitespace-nowrap">{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Problem of the Day - Engagement Section */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 flex flex-col lg:flex-row items-center gap-12 shadow-sm">
               <div className="flex-1 space-y-6">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-sm text-[10px] font-black uppercase tracking-widest border border-primary/20">
                    <Zap className="w-4 h-4 fill-primary" /> Challenge Protocols
                 </div>
                 <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Problem of the Day</h2>
                 <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Implement an atomic broadcast protocol for high-concurrency clusters. Solve and earn 200 reputation points.</p>
                 <div className="flex items-center gap-8 text-sm font-bold text-slate-400">
                    <span className="flex items-center gap-2 text-primary"><Users className="w-5 h-5" /> 1,240+ Solved</span>
                    <span className="flex items-center gap-2"><Trophy className="w-5 h-5" /> Rank: Medium</span>
                 </div>
                 <Link to="/questions" className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-3">
                    Solve Problem <ArrowRight className="w-5 h-5" />
                 </Link>
               </div>
                <div className="w-full lg:w-96 bg-white dark:bg-slate-900 rounded-xl p-8 font-mono text-xs text-slate-900 dark:text-slate-100 shadow-2xl relative overflow-hidden group min-h-[300px] border border-slate-100 dark:border-slate-800">
                  <img 
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" 
                    alt="Code Audit" 
                    className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity duration-700" 
                  />
                  <div className="relative z-10 space-y-4 opacity-80 group-hover:opacity-100 transition-opacity">
                    <p className="text-slate-400"># protocol_audit.py</p>
                    <p className="text-primary font-bold">def <span className="text-slate-900 dark:text-slate-100">broadcast_message</span>(node_list):</p>
                    <p className="pl-6 text-slate-600 dark:text-slate-400">for node in node_list:</p>
                    <p className="pl-12 text-slate-600 dark:text-slate-400">if node.is_healthy():</p>
                    <p className="pl-18 text-emerald-600 font-bold">node.transmit(msg)</p>
                    <p className="pl-12 text-slate-600">else:</p>
                    <p className="pl-18 text-red-500 font-bold">initiate_recovery(node)</p>
                    <p className="mt-8 animate-pulse text-primary font-black">_ _ _ _ _</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* 4. Statistics - Trust Metrics */}
        <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 text-center">
               {[
                 { label: "Verified Experts", value: "48k+", icon: Users, color: "text-blue-600" },
                 { label: "Solutions Shared", value: "1.2M+", icon: MessageSquare, color: "text-emerald-600" },
                 { label: "Technical Articles", value: "10k+", icon: BookOpen, color: "text-indigo-600" },
                 { label: "Daily Active Users", value: "250k+", icon: Zap, color: "text-amber-600" },
               ].map((stat) => (
                 <div key={stat.label} className="space-y-4">
                   <div className={`w-16 h-16 ${stat.color} bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto border border-slate-100 dark:border-slate-800`}>
                     <stat.icon className="w-8 h-8" />
                   </div>
                   <div className="space-y-1">
                     <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                     <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* 5. Tutorial Paths - Structured Learning */}
        <section className="py-24 bg-slate-50 dark:bg-slate-950/50 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Structured Tutorial Paths</h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Master any domain with our community-verified roadmaps.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Complete DS & Algo", count: "120 Chapters", image: "https://images.unsplash.com/photo-1509228468518-180dd4805a46?auto=format&fit=crop&w=600&q=80", color: "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20" },
                { title: "MERN Stack Mastery", count: "85 Chapters", image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=600&q=80", color: "border-indigo-200 dark:border-indigo-900/40 bg-indigo-50 dark:bg-indigo-950/20" },
                { title: "Python for Data Science", count: "64 Chapters", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80", color: "border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20" },
              ].map((path) => (
                <Link key={path.title} to="/knowledge" className={`group relative h-80 rounded-xl border-2 ${path.color} overflow-hidden hover:shadow-2xl transition-all duration-500`}>
                   <img src={path.image} alt={path.title} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
                   <div className="relative z-10 p-10 h-full flex flex-col gap-6">
                     <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                       {path.title.includes("DS") ? <Database className="w-8 h-8 text-emerald-600" /> : path.title.includes("MERN") ? <Layout className="w-8 h-8 text-indigo-600" /> : <Terminal className="w-8 h-8 text-amber-600" />}
                     </div>
                     <div className="space-y-2">
                       <h3 className="text-2xl font-black text-slate-950 dark:text-white leading-tight group-hover:text-primary transition-colors">{path.title}</h3>
                       <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{path.count}</p>
                     </div>
                     <div className="mt-auto flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                       Start Learning <ChevronRight className="w-4 h-4" />
                     </div>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Popular Courses - Skill Up */}
        <section className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
             <div className="flex items-center justify-between">
               <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Certification & Mastery</h2>
               <Link to="/pricing" className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-primary pb-1">View All Courses</Link>
             </div>
             <div className="grid md:grid-cols-4 gap-8">
               {[
                 { title: "System Design for FAANG", students: "12k+", price: "Free", rating: 4.9, img: "https://images.unsplash.com/photo-1558494949-ef0109121c64?auto=format&fit=crop&w=600&q=80" },
                 { title: "Advanced Java Protocols", students: "8k+", price: "$49", rating: 4.8, img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" },
                 { title: "AI Infrastructure Lab", students: "5k+", price: "$99", rating: 4.7, img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80" },
                 { title: "Security Audit Mastery", students: "3k+", price: "$79", rating: 4.9, img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" },
               ].map((course) => (
                 <div key={course.title} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-xl hover:border-primary/20 hover:shadow-xl transition-all duration-500 group cursor-pointer">
                    <div className="h-48 bg-slate-50 rounded-lg mb-8 overflow-hidden border border-slate-50 relative">
                       <img 
                         src={course.img} 
                         alt={course.title} 
                         className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                         onError={(e) => {
                           (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80";
                         }}
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-60" />
                       <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm border border-slate-50 dark:border-slate-800 flex items-center gap-1.5">
                         <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                         <span className="text-[10px] font-black">{course.rating}</span>
                       </div>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight mb-4">{course.title}</h3>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{course.students} Students</span>
                       <span className="text-lg font-black text-slate-900 dark:text-white">{course.price}</span>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* 7. Jobs Portal Spotlight - Career Growth */}
        <section className="py-24 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800">
           <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 text-primary rounded-sm text-[11px] font-black uppercase tracking-widest border border-primary/20">
                  <Briefcase className="w-5 h-5" /> Career Protocols
                </div>
                <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Elite Jobs From <br /> Global Companies.</h2>
                <p className="text-xl text-slate-500 font-medium leading-relaxed tracking-tight">Your verified reputation score unlocks exclusive mandates from the world's most innovative technology labs.</p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link to="/jobs" className="bg-slate-900 text-white px-10 py-5 rounded-xl font-bold hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-3">
                    Explore Mandates <ChevronRight className="w-5 h-5" />
                  </Link>
                  <Link to="/jobs" className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 px-10 py-5 rounded-xl font-bold hover:border-primary transition-all dark:text-white">Post a Job</Link>
                </div>
              </div>
              <div className="space-y-6">
                {MOCK_JOBS.slice(0, 3).map(job => (
                  <div key={job.id} className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:shadow-xl transition-all duration-500 group flex items-center justify-between">
                     <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                           <Building className="w-8 h-8 text-slate-300 group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                           <h4 className="text-xl font-black text-slate-900 dark:text-white">{job.title}</h4>
                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{job.company} • {job.location}</p>
                        </div>
                     </div>
                     <ArrowRight className="w-6 h-6 text-slate-200 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* 8. Technical Articles - Global Knowledge Base */}
        <section className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
             <div className="flex items-center justify-between">
               <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Recent Technical Index</h2>
               <Link to="/knowledge" className="text-primary font-black text-xs uppercase tracking-widest border-b-2 border-primary pb-1">Read All Articles</Link>
             </div>
             <div className="grid md:grid-cols-3 gap-10">
               {[
                 { title: "Microservices: Implementing Atomic Consensus", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", tag: "Architecture" },
                 { title: "Blockchain Infrastructure: Node Coordination", img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80", tag: "Security" },
                 { title: "High-Scale Systems: The 2026 Blueprint", img: "https://images.unsplash.com/photo-1558494949-ef0109121c64?auto=format&fit=crop&w=800&q=80", tag: "System Design" },
               ].map((article, i) => (
                 <div key={i} className="flex flex-col gap-6 group cursor-pointer">
                    <div className="h-64 bg-slate-100 rounded-xl overflow-hidden relative">
                       <img src={article.img} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-60" />
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span className="text-primary">{article.tag}</span>
                          <span>15 Min Read</span>
                       </div>
                       <h3 className="text-2xl font-black text-slate-950 dark:text-white group-hover:text-primary transition-colors leading-tight tracking-tight">{article.title}</h3>
                       <p className="text-slate-500 font-medium leading-relaxed line-clamp-2">A technical deep-dive into distributed coordination and eventual consistency patterns in high-scale systems.</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* 9. Hall of Sovereignty - Community Spotlight */}
        <section className="py-24 bg-slate-50 dark:bg-slate-950/50 text-slate-950 dark:text-white relative overflow-hidden border-t border-slate-100 dark:border-slate-800">
           <div className="absolute inset-0 bg-[radial-gradient(#2f8d46_1px,transparent_1px)] [background-size:32px:32px] opacity-5 pointer-events-none" />
           <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-20 relative z-10">
              <div className="space-y-10 max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 text-primary rounded-sm text-[11px] font-black uppercase tracking-widest border border-primary/20">
                  <Trophy className="w-5 h-5" /> Technical Hall of Fame
                </div>
                <h2 className="text-5xl font-black tracking-tight leading-tight">The Hall of <br /> <span className="text-primary">Sovereignty.</span></h2>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">Commemorating the elite 0.1% of global contributors who define the standards of modern engineering.</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                   <div className="text-center lg:text-left">
                     <p className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">48k+</p>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Verified Experts</p>
                   </div>
                   <div className="w-px h-12 bg-slate-200 hidden lg:block" />
                   <div className="text-center lg:text-left">
                     <p className="text-4xl font-black text-primary tracking-tighter">1.2M+</p>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Solutions Shared</p>
                   </div>
                </div>
                <Link to="/leaderboard" className="inline-flex bg-primary text-white px-12 py-5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-2xl shadow-primary/30">View Global Rankings</Link>
              </div>
              <div className="grid grid-cols-2 gap-8 w-full lg:w-auto">
                 {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-6 group hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4">
                       <div className="w-20 h-20 bg-primary/5 rounded-xl flex items-center justify-center text-primary font-black text-3xl group-hover:scale-110 transition-transform">
                          {String.fromCharCode(64 + i)}
                       </div>
                       <div className="text-center">
                          <p className="text-xl font-black text-slate-950 dark:text-white">Auditor_0{i}</p>
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Reputation: {15 - i}k</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </main>

    </>
  );
}
