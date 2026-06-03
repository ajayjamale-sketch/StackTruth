import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, ArrowRight, Tag, FileText, Video, Code2, Link } from 'lucide-react';

const categories = [
  { name: 'Getting Started', count: 42, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: BookOpen },
  { name: 'TypeScript', count: 128, color: 'bg-blue-600/10 text-blue-400 border-blue-600/20', icon: Code2 },
  { name: 'React', count: 94, color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20', icon: Code2 },
  { name: 'Database', count: 87, color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: FileText },
  { name: 'DevOps', count: 63, color: 'bg-orange-500/10 text-orange-400 border-orange-500/20', icon: Code2 },
  { name: 'Security', count: 51, color: 'bg-red-500/10 text-red-400 border-red-500/20', icon: FileText },
  { name: 'Architecture', count: 76, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: FileText },
  { name: 'APIs', count: 89, color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', icon: Link },
];

const articles = [
  { title: 'Complete Guide to TypeScript Generics', category: 'TypeScript', readTime: 15, type: 'Guide', views: 24100 },
  { title: 'PostgreSQL Performance Tuning Handbook', category: 'Database', readTime: 22, type: 'Reference', views: 18400 },
  { title: 'React Patterns for Large Applications', category: 'React', readTime: 18, type: 'Guide', views: 32100 },
  { title: 'Kubernetes for Node.js Developers', category: 'DevOps', readTime: 25, type: 'Tutorial', views: 14200 },
  { title: 'REST API Security Best Practices', category: 'Security', readTime: 12, type: 'Reference', views: 21800 },
  { title: 'Microservices Architecture Patterns', category: 'Architecture', readTime: 20, type: 'Guide', views: 28900 },
];

export default function KnowledgeBase() {
  useScrollToTop();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = articles.filter(a =>
    (!search || a.title.toLowerCase().includes(search.toLowerCase())) &&
    (!activeCategory || a.category === activeCategory)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Hero */}
      <div className="pt-20 pb-10 section-dark border-b border-surface-10 dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-blue-300 border border-primary/30">Knowledge Base</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Technical Reference & Guides</h1>
          <p className="text-slate-200/70 mb-6">2.4M+ curated resources for modern software engineers</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search tutorials, API docs, guides..." value={search} onChange={e => setSearch(e.target.value)} className="pl-12 h-12 text-base bg-card" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="font-semibold mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all ${
                    activeCategory === cat.name ? cat.color : 'bg-card border-border hover:border-primary/30'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{cat.name}</span>
                  <span className="text-[10px] text-muted-foreground">{cat.count} articles</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles */}
        <div>
          <h2 className="font-semibold mb-4">Featured Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((article, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 card-hover cursor-pointer" onClick={() => {}}>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                  <Badge className="text-xs bg-primary/10 text-primary border-primary/20">{article.type}</Badge>
                </div>
                <h3 className="font-semibold text-sm mb-3 leading-snug">{article.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.readTime} min read</span>
                  <span>{article.views.toLocaleString()} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
