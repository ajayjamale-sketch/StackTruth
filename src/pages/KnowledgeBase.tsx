// KnowledgeBase.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, ArrowRight, Tag, FileText, Video, Code2, Link, X } from 'lucide-react';

const categories = [
  { name: 'Getting Started', count: 42, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', icon: BookOpen },
  { name: 'TypeScript', count: 128, color: 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20', icon: Code2 },
  { name: 'React', count: 94, color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20', icon: Code2 },
  { name: 'Database', count: 87, color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20', icon: FileText },
  { name: 'DevOps', count: 63, color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20', icon: Code2 },
  { name: 'Security', count: 51, color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20', icon: FileText },
  { name: 'Architecture', count: 76, color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', icon: FileText },
  { name: 'APIs', count: 89, color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20', icon: Link },
];

const articles = [
  { id: 'ts-generics', title: 'Complete Guide to TypeScript Generics', category: 'TypeScript', readTime: 15, type: 'Guide', views: 24100 },
  { id: 'postgres-tuning', title: 'PostgreSQL Performance Tuning Handbook', category: 'Database', readTime: 22, type: 'Reference', views: 18400 },
  { id: 'react-patterns', title: 'React Patterns for Large Applications', category: 'React', readTime: 18, type: 'Guide', views: 32100 },
  { id: 'k8s-nodejs', title: 'Kubernetes for Node.js Developers', category: 'DevOps', readTime: 25, type: 'Tutorial', views: 14200 },
  { id: 'rest-security', title: 'REST API Security Best Practices', category: 'Security', readTime: 12, type: 'Reference', views: 21800 },
  { id: 'microservices', title: 'Microservices Architecture Patterns', category: 'Architecture', readTime: 20, type: 'Guide', views: 28900 },
];

export default function KnowledgeBase() {
  useScrollToTop();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = articles.filter(article =>
    (!search || article.title.toLowerCase().includes(search.toLowerCase())) &&
    (!activeCategory || article.category === activeCategory)
  );

  const clearFilters = () => {
    setSearch('');
    setActiveCategory(null);
  };

  const isFilterActive = search !== '' || activeCategory !== null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Hero Section */}
      <div className="pt-20 pb-10 border-b border-border bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground dark:text-blue-300 border border-primary/30">
            Knowledge Base
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Technical Reference & Guides
          </h1>
          <p className="text-muted-foreground mb-6">
            2.4M+ curated resources for modern software engineers
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tutorials, API docs, guides..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-12 h-12 text-base bg-card"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Browse by Category</h2>
            {isFilterActive && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7">
                <X className="w-3 h-3 mr-1" /> Clear filters
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(isActive ? null : cat.name)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all ${
                    isActive
                      ? cat.color
                      : 'bg-card border-border hover:border-primary/30 hover:bg-muted/50'
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
          <h2 className="font-semibold mb-4">
            {isFilterActive ? 'Search Results' : 'Featured Articles'}
          </h2>
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
              <h3 className="font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Try adjusting your search or category filter.
              </p>
              <Button variant="outline" onClick={clearFilters}>Clear all filters</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(article => (
                <Link
                  key={article.id}
                  to={`/knowledge-base/${article.id}`}
                  className="block bg-card border border-border rounded-xl p-5 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                    <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                      {article.type}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-3 leading-snug hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.readTime} min read</span>
                    <span>{article.views.toLocaleString()} views</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}