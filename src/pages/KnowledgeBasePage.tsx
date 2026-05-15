import React, { useState } from "react";
import { Search, BookOpen, Clock, Heart, Eye, MessageSquare, TrendingUp, Star, Filter, ChevronRight, Code2, Sparkles, Zap, Award, Layers, Bot, Globe, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { MOCK_ARTICLES } from "@/constants/mockData";
import { useToast } from "@/contexts/ToastContext";
import { Skeleton } from "@/components/ui/SkeletonLoader";
import type { Article } from "@/types";

const CATEGORIES = ["All", "Tutorial", "Deep Dive", "Architecture", "AI/ML", "Security", "DevOps"];

function ArticleSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden ${featured ? "lg:flex" : ""}`}>
      <Skeleton className={`flex-shrink-0 ${featured ? "lg:w-[450px] lg:h-full h-64" : "h-56 w-full"}`} />
      <div className="p-10 flex flex-col flex-1 space-y-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="pt-8 border-t border-slate-50 dark:border-slate-800 mt-auto flex justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-xl" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, featured = false, onClick }: { article: Article; featured?: boolean; onClick?: () => void }) {
  const { success } = useToast();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(liked ? article.likes : article.likes + 1);
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden group hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] dark:hover:shadow-primary/5 transition-all duration-500 cursor-pointer ${featured ? "lg:flex" : ""}`}
    >
      <div className={`overflow-hidden flex-shrink-0 relative ${featured ? "lg:w-[450px]" : ""}`}>
        <img
          src={article.coverImage || `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80`}
          alt={article.title}
          className={`w-full object-cover transition-transform duration-1000 group-hover:scale-105 ${featured ? "lg:h-full h-64" : "h-56"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-10 flex flex-col flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black px-3 py-1 rounded-lg border border-primary/20 bg-primary/5 text-primary uppercase tracking-[0.2em]">
            {article.category}
          </span>
          {article.isFeatured && (
            <span className="text-[10px] font-black px-3 py-1 rounded-lg border border-amber-200/50 bg-amber-50 text-amber-600 uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-600" /> Featured
            </span>
          )}
        </div>

        <h3 className={`font-black text-slate-950 dark:text-white group-hover:text-primary transition-colors leading-[1.1] ${featured ? "text-4xl" : "text-2xl"} tracking-tighter`}>
          {article.title}
        </h3>
        <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1 font-medium tracking-tight">{article.excerpt}</p>

        <div className="flex flex-wrap gap-2">
          {article.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 rounded-md border border-slate-100 dark:border-slate-800 group-hover:border-primary/20 transition-colors">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-800 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-primary font-black text-xs border border-primary/10">
              {article.author.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-slate-900 dark:text-slate-200">{article.author.name}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expert Author</span>
            </div>
          </div>
          <div className="flex items-center gap-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />{article.readTime}m</span>
            <button onClick={handleLike} className={`flex items-center gap-1.5 transition-colors ${liked ? "text-red-500" : "hover:text-red-500"}`}>
              <Heart className={`w-4 h-4 ${liked ? "fill-red-500 border-red-500" : ""}`} />{likeCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeBasePage() {
  const { success } = useToast();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filtered = MOCK_ARTICLES.filter((a) => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "All" || a.category === category;
    return matchSearch && matchCat;
  });

  const featured = filtered.filter(a => a.isFeatured).slice(0, 1);

  if (selectedArticle) {
    return (
      <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-500">
        <button 
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Technical Library
        </button>

        <article className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
          <div className="h-96 w-full relative">
            <img 
              src={selectedArticle.coverImage} 
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 space-y-4">
              <span className="text-[10px] font-black px-3 py-1 rounded-lg border border-primary/20 bg-primary/20 text-white uppercase tracking-[0.2em] backdrop-blur-md">
                {selectedArticle.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                {selectedArticle.title}
              </h1>
            </div>
          </div>

          <div className="p-10 md:p-16 space-y-12">
            <div className="flex flex-wrap items-center justify-between gap-8 pb-12 border-b border-slate-50 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black border border-primary/20">
                  {selectedArticle.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-950 dark:text-white leading-none">{selectedArticle.author.name}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Technical Auditor • {selectedArticle.publishedAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => success("Protocol shared to external network.")} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:text-primary transition-colors border border-slate-100 dark:border-slate-800"><Share2 className="w-5 h-5" /></button>
                <button onClick={() => success("Resource cached for offline access.")} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:text-primary transition-colors border border-slate-100 dark:border-slate-800"><Bookmark className="w-5 h-5" /></button>
                <button className="bg-primary text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">Audit This Protocol</button>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {selectedArticle.excerpt}
              </p>
              <div className="h-64 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 font-mono text-sm">
                [TECHNICAL_CONTENT_PAYLOAD_UNAVAILABLE_IN_MVP]
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {selectedArticle.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-md">#{tag}</span>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-32 py-12">
      {/* 1. Hero Header Section */}
      <section className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-16 rounded-xl shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10">
              <BookOpen className="w-4 h-4" /> Technical Sovereignty Index
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">The Technical <br /> <span className="text-primary">Library</span></h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight">Verified documentation, architectural deep-dives, and industrial protocols for modern engineering experts.</p>
          </div>
          <div className="w-full lg:w-96 space-y-4">
             <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
               <input 
                 value={search} 
                 onChange={e => setSearch(e.target.value)} 
                 placeholder="Search protocols..." 
                 className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg pl-12 pr-4 py-5 text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm text-foreground placeholder:text-slate-400" 
               />
             </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20">Search All</button>
                <button className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl hover:border-primary transition-all shadow-sm">
                  <Filter className="w-5 h-5 text-slate-400" />
                </button>
              </div>
          </div>
        </div>
      </section>

      {/* 2. Trending Categories Section */}
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">Exploration Paths</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Browse verified resources by technical discipline</p>
          </div>
          <button className="text-primary font-black uppercase tracking-widest text-[10px] border-b-2 border-primary pb-1">Reset Filters</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setCategory(cat)} 
              className={`p-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 border flex flex-col items-center gap-4 group ${category === cat ? "bg-primary text-white border-primary shadow-2xl scale-105" : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-primary hover:-translate-y-2"}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${category === cat ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/10 group-hover:text-primary"}`}>
                {cat === "All" ? <Layers className="w-5 h-5" /> : cat === "Tutorial" ? <Zap className="w-5 h-5" /> : cat === "Deep Dive" ? <Star className="w-5 h-5" /> : cat === "Architecture" ? <Shield className="w-5 h-5" /> : cat === "AI/ML" ? <Bot className="w-5 h-5" /> : <Code2 className="w-5 h-5" />}
              </div>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Editor's Choice Section */}
      {isLoading ? (
        <section className="space-y-12">
          <Skeleton className="h-6 w-48" />
          <ArticleSkeleton featured />
        </section>
      ) : featured.length > 0 && (
        <section className="space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-500" /> Editor's Premium Audit
            </h2>
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 mx-8" />
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/5 to-primary/5 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <ArticleCard 
              article={featured[0]} 
              featured 
              onClick={() => setSelectedArticle(featured[0])}
            />
          </div>
        </section>
      )}

      {/* 4. Main Library Grid Section */}
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-4">
            <TrendingUp className="w-8 h-8 text-primary" /> 
            Active Repository
          </h2>
          <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-sm text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-100 dark:border-slate-800">
            {isLoading ? "Synchronizing Index..." : `${filtered.length} Resources Found`}
          </span>
        </div>
        
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(i => <ArticleSkeleton key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map(a => (
              <ArticleCard 
                key={a.id} 
                article={a} 
                onClick={() => setSelectedArticle(a)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-32 text-center rounded-xl shadow-sm">
            <BookOpen className="w-24 h-24 text-slate-100 dark:text-slate-800 mx-auto mb-8 animate-pulse" />
            <h3 className="text-2xl font-black text-slate-950 dark:text-white mb-4">No matching resources</h3>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto">Our auditors couldn't find any resources matching your current filter criteria.</p>
            <button onClick={() => { setCategory("All"); setSearch(""); }} className="mt-8 text-primary font-black uppercase tracking-widest text-[10px] border-b-2 border-primary pb-1">Reset All Protocols</button>
          </div>
        )}
      </section>

      {/* 5. Mastery Tracks Section (New) */}
      <section className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-20 text-slate-950 dark:text-white relative overflow-hidden group shadow-2xl dark:shadow-none">
         <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none dark:invert-0 invert" />
         <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[150px] rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
         
         <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 text-primary rounded-sm text-[11px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-xl shadow-primary/10">
                <Sparkles className="w-5 h-5" /> Specialized Skill Acquisition
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-slate-950 dark:text-white">Master Technical <br /> <span className="text-primary">Disciplines.</span></h2>
              <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed font-medium tracking-tight">Structured collections of verified articles designed to take you from foundational concepts to expert implementation protocols.</p>
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <button className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-lg font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl shadow-primary/30 active:scale-95">
                  Explore Tracks
                </button>
                <div className="flex items-center gap-4 px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm">
                   <Award className="w-6 h-6 text-amber-500" />
                   <span className="text-[11px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-[0.3em]">Verified Certifications</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "System Architect", count: "12 Guides", icon: <Shield className="w-6 h-6" /> },
                { title: "AI Operations", count: "18 Guides", icon: <Bot className="w-6 h-6" /> },
                { title: "Security Protocols", count: "15 Guides", icon: <Shield className="w-6 h-6" /> },
                { title: "Cloud Scale", count: "22 Guides", icon: <Globe className="w-6 h-6" /> },
              ].map((track) => (
                <div key={track.title} className="bg-white dark:bg-white/5 backdrop-blur-3xl p-8 rounded-xl border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all duration-500 group/item cursor-pointer hover:-translate-y-2 shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover/item:scale-110 transition-transform">
                    {track.icon}
                  </div>
                  <h4 className="text-xl font-black text-slate-950 dark:text-white mb-2">{track.title}</h4>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{track.count}</p>
                </div>
              ))}
            </div>
         </div>
      </section>
    </div>
  );
}
