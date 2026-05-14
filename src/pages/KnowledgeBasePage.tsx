import React, { useState } from "react";
import { Search, BookOpen, Clock, Heart, Eye, MessageSquare, TrendingUp, Star, Filter, ChevronRight, Code2 } from "lucide-react";
import { MOCK_ARTICLES } from "@/constants/mockData";
import { useToast } from "@/contexts/ToastContext";
import type { Article } from "@/types";

const CATEGORIES = ["All", "Tutorial", "Deep Dive", "Architecture", "AI/ML", "Security", "DevOps"];

function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const { success } = useToast();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    setLikeCount(liked ? article.likes : article.likes + 1);
  };

  return (
    <div className={`glass-card-hover overflow-hidden group ${featured ? "lg:flex" : ""}`}>
      {article.coverImage && (
        <div className={`overflow-hidden flex-shrink-0 ${featured ? "lg:w-80" : ""}`}>
          <img
            src={article.coverImage}
            alt={article.title}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${featured ? "lg:h-full h-48" : "h-40"}`}
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
            {article.category}
          </span>
          {article.isFeatured && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400" />Featured
            </span>
          )}
        </div>

        <h3 className={`font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug ${featured ? "text-xl" : "text-base"}`}>
          {article.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 flex-1 mb-4">{article.excerpt}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-badge text-[10px]">{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <img src={article.author.avatar} alt={article.author.name} className="w-6 h-6 rounded-full bg-slate-700" />
            <span className="text-xs text-slate-400">{article.author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}m read</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{(article.views / 1000).toFixed(1)}k</span>
            <button onClick={handleLike} className={`flex items-center gap-1 transition-colors ${liked ? "text-red-400" : "hover:text-red-400"}`}>
              <Heart className={`w-3 h-3 ${liked ? "fill-red-400" : ""}`} />{likeCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = MOCK_ARTICLES.filter((a) => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "All" || a.category === category;
    return matchSearch && matchCat;
  });

  const featured = filtered.filter(a => a.isFeatured).slice(0, 1);
  const rest = filtered.filter(a => !a.isFeatured || filtered.indexOf(a) > 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Knowledge Base</h1>
        <p className="text-slate-400 text-sm mt-1">Tutorials, deep dives, and technical resources from expert contributors</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tutorials, articles, documentation..." className="w-full bg-white/5 border border-border rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-all" />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${category === cat ? "bg-blue-600 text-white" : "bg-white/5 border border-border text-slate-400 hover:text-white"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div>
          <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" />Featured</h2>
          {featured.map(a => <ArticleCard key={a.id} article={a} featured />)}
        </div>
      )}

      {/* Articles grid */}
      <div>
        <h2 className="font-bold text-white mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-blue-400" />All Articles ({filtered.length})</h2>
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-white font-semibold mb-2">No articles found</p>
            <p className="text-slate-500 text-sm">Try different keywords or categories</p>
          </div>
        )}
      </div>
    </div>
  );
}
