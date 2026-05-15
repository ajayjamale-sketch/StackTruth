import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, BookOpen, Clock, Heart, TrendingUp, Star, 
  Bot, ArrowLeft, Share2, Bookmark, Shield, Layers 
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
    
    <div className="p-8 flex flex-col flex-1">
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

const TrackCard = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl hover:border-primary/50 transition-all group cursor-pointer shadow-sm dark:shadow-none">
    <div className="text-primary mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <span className="font-bold text-sm text-slate-900 dark:text-white">{title}</span>
  </div>
);

// --- Main Page ---

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

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            {selectedArticle.excerpt}
          </p>
          <div className="aspect-video rounded-2xl bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 font-mono italic">
            [Technical Documentation Content]
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* Search & Intro */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Library<span className="text-primary">.</span></h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-md font-medium">
            Verified protocols and architectural deep-dives for modern engineering.
          </p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search protocols..."
            className="w-full bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:ring-primary/20 transition-all text-slate-900 dark:text-white"
          />
        </div>
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
      <section className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-primary/10 rounded-3xl p-10 md:p-16 overflow-hidden relative">
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">Mastery Tracks</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
              Structured learning paths to take you from foundational concepts to expert implementation.
            </p>
            <button className="bg-primary text-white hover:opacity-90 px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-xl shadow-primary/20">
              View All Tracks
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TrackCard icon={<Shield />} title="Security" />
            <TrackCard icon={<Bot />} title="AI Ops" />
            <TrackCard icon={<Layers />} title="Architecture" />
            <TrackCard icon={<TrendingUp />} title="Scale" />
          </div>
        </div>
      </section>
    </div>
  );
}