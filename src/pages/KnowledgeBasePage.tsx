import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, BookOpen, Clock, Heart, TrendingUp, Star, 
  Bot, ArrowLeft, Share2, Bookmark, Shield, Layers,
  Trophy, Sparkles, Zap, Users, Globe
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { MOCK_ARTICLES } from "@/constants/mockData";
import { useToast } from "@/contexts/ToastContext";
import { Skeleton } from "@/components/ui/SkeletonLoader";
import type { Article } from "@/types";

const CATEGORIES = ["All", "Tutorial", "Deep Dive", "Architecture", "AI/ML", "Security"];

// --- Optimized Sub-components ---

const ArticleCard = ({ article, onClick }: { article: Article; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer flex flex-col"
  >
    <div className="aspect-video overflow-hidden relative">
      <img
        src={article.coverImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"}
        alt={article.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-200/50 dark:border-slate-700/50 text-slate-900 dark:text-slate-100">
          {article.category}
        </span>
      </div>
    </div>
    
    <div className="p-6 sm:p-8 flex flex-col flex-1">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug mb-3">
        {article.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 font-medium">
        {article.excerpt}
      </p>
      
      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
            {article.author.name[0]}
          </div>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{article.author.name}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-tighter">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}m</span>
          <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {article.likes}</span>
        </div>
      </div>
    </div>
  </div>
);

const TrackCard = ({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-primary/50 transition-all group cursor-pointer shadow-sm dark:shadow-none active:scale-95"
  >
    <div className="text-primary mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <span className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-widest">{title}</span>
  </div>
);

// --- Main Page ---

const DETAILED_CONTENT: Record<string, { sections: { title: string, content: string, type: 'text' | 'code' | 'highlight' }[] }> = {
  "a1": {
    sections: [
      { 
        title: "Architecture Overview", 
        content: "tRPC allows you to build end-to-end typesafe APIs without the need for code generation or runtime validation boilerplate. By sharing types between the server and client, we eliminate the 'contract drift' common in traditional REST implementations.",
        type: "text" 
      },
      { 
        title: "Router Implementation", 
        content: "const appRouter = router({\n  getUser: publicProcedure\n    .input(z.string())\n    .query(async (opts) => {\n      const { input } = opts;\n      const user = await db.user.findById(input);\n      return user;\n    }),\n});",
        type: "code" 
      },
      { 
        title: "The Zod Registry", 
        content: "Every procedure in our tRPC architecture is gated by a Zod schema. This ensures that the incoming data packet is validated at the edge before it reaches our business logic layer, maintaining a 100% integrity rate for internal state transitions.",
        type: "highlight" 
      },
      { 
        title: "Client Consumption", 
        content: "On the frontend, consuming these procedures is as simple as calling a hook. TypeScript will automatically infer the input and output types based on the server-side router definition.",
        type: "text" 
      }
    ]
  }
};

export default function KnowledgeBasePage() {
  const { success } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const filteredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter(a => {
      const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCategory === "All" || a.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory]);

  const selectedArticle = useMemo(() => 
    MOCK_ARTICLES.find(a => a.id === id), [id]
  );

  const detailedContent = useMemo(() => 
    id ? DETAILED_CONTENT[id] : null, [id]
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [id, activeCategory]);

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => navigate("/knowledge")}
          className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </button>

        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            {selectedArticle.title}
          </h1>
          <div className="flex items-center justify-between py-6 border-y border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                {selectedArticle.author.name[0]}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedArticle.author.name}</p>
                <p className="text-xs text-slate-400">Technical Publication</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => success("Saved")} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
                <Bookmark className="w-4 h-4" />
              </button>
              <button onClick={() => success("Link Copied")} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <div className="space-y-12">
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {selectedArticle.excerpt}
          </p>
          
          {detailedContent ? (
            <div className="space-y-16">
              {detailedContent.sections.map((section, index) => (
                <div key={index} className="space-y-6">
                  <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-3">
                    <span className="text-primary opacity-20">0{index + 1}</span> {section.title}
                  </h2>
                  
                  {section.type === 'text' && (
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{section.content}</p>
                  )}
                  
                  {section.type === 'code' && (
                    <div className="bg-slate-950 rounded-2xl border border-white/5 p-8 font-mono text-sm text-slate-300 shadow-2xl relative group">
                      <div className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest text-slate-600 group-hover:text-primary transition-colors">TypeScript Registry</div>
                      <pre className="whitespace-pre-wrap">{section.content}</pre>
                    </div>
                  )}
                  
                  {section.type === 'highlight' && (
                    <div className="bg-primary/5 border-l-4 border-primary p-8 rounded-r-2xl">
                      <p className="text-slate-900 dark:text-white font-bold leading-relaxed">{section.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="aspect-video rounded-2xl bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 font-mono italic">
              [Technical Documentation Content Pending Verification]
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* Search & Intro */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="space-y-4 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Library<span className="text-primary">.</span></h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto lg:mx-0 font-medium leading-relaxed">
            Verified protocols and architectural deep-dives for modern engineering.
          </p>
        </div>
        
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search protocols..."
            className="w-full bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-xl py-4 pl-11 pr-4 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-400"
          />
        </div>
      </section>

      {/* Featured Protocols Spotlight */}
      <section className="grid lg:grid-cols-2 gap-10">
        {[
          { title: "Distributed Consensus 2026", desc: "A technical audit of Paxos vs Raft in high-concurrency clusters.", color: "bg-blue-600", icon: Shield },
          { title: "Neural Layer Scaling", desc: "Scaling transformer architectures across heterogeneous GPU clusters.", color: "bg-primary", icon: Bot },
        ].map((feat, i) => (
          <div 
            key={i} 
            onClick={() => navigate("/knowledge/a1")}
            className="relative group overflow-hidden rounded-3xl bg-white dark:bg-slate-950 p-10 text-slate-900 dark:text-white border border-slate-100 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer active:scale-[0.98] shadow-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 space-y-6">
              <div className={`w-12 h-12 ${feat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                <feat.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">{feat.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">{feat.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary group-hover:gap-4 transition-all">
                Access Audit <Clock className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat 
              ? "bg-primary text-white shadow-lg shadow-primary/25" 
              : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(n => <Skeleton key={n} className="h-80 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map(article => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => navigate(`/knowledge/${article.id}`)} 
            />
          ))}
        </div>
      )}

      {/* Mastery Section - Now Fully Adaptive */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-primary/10 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden relative">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">Mastery Tracks</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium max-w-md mx-auto lg:mx-0">
              Structured learning paths to take you from foundational concepts to expert implementation.
            </p>
            <button 
              onClick={() => navigate("/tutorials")}
              className="w-full sm:w-auto bg-primary text-white hover:opacity-90 px-10 py-4 rounded-xl font-bold text-sm transition-all shadow-xl shadow-primary/20 active:scale-95"
            >
              View All Tracks
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TrackCard icon={<Shield />} title="Security Hub" onClick={() => navigate("/practice/algorithms")} />
            <TrackCard icon={<Bot />} title="AI Mastery" onClick={() => navigate("/tutorials/ai")} />
            <TrackCard icon={<Layers />} title="Architecture" onClick={() => navigate("/tutorials/sysdesign")} />
            <TrackCard icon={<TrendingUp />} title="Scale Ops" onClick={() => navigate("/practice/system-design")} />
          </div>
        </div>
      </section>

      {/* Community Contributor Index */}
      <section className="space-y-10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Technical Contributors</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Top contributors defining the technical standards of the sovereignty.</p>
          </div>
          <button 
            onClick={() => navigate("/leaderboard")}
            className="text-primary font-black uppercase tracking-widest text-[10px] border-b-2 border-primary pb-1 hover:text-primary/80 transition-all"
          >
            View Hall of Fame
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div 
              key={i} 
              onClick={() => navigate(`/profile/auditor_0${i}`)}
              className="flex flex-col items-center gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-primary/30 transition-all cursor-pointer group active:scale-95"
            >
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors text-xl font-black border border-slate-100 dark:border-slate-700">
                {String.fromCharCode(64 + i)}
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-slate-950 dark:text-white">Auditor_0{i}</p>
                <p className="text-[9px] font-black text-primary uppercase tracking-widest mt-0.5">{15-i}k Rep</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription/Newsletter */}
      <section className="bg-primary/5 border border-primary/10 rounded-3xl p-10 md:p-16 text-center space-y-10 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-sm text-[10px] font-black uppercase tracking-widest">
            <Zap className="w-4 h-4" /> Global Intelligence Brief
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Stay Synchronized.</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            Get weekly technical audits, protocol updates, and interview insights delivered directly to your node.
          </p>
        </div>
        <div className="max-w-md mx-auto relative z-10">
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); success("Subscription Confirmed."); }}>
            <input 
              type="email" 
              placeholder="node-identity@stacktruth.com" 
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button className="bg-primary text-white px-8 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/10">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}