import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Clock, Heart, Eye, Tag } from 'lucide-react';
import { mockBlogs } from '@/lib/mockData';

export default function Blog() {
  useScrollToTop();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = [...new Set(mockBlogs.flatMap(b => b.tags))];
  const filtered = mockBlogs.filter(b =>
    (!search || b.title.toLowerCase().includes(search.toLowerCase())) &&
    (!activeTag || b.tags.includes(activeTag))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Hero */}
      <div className="pt-20 pb-10 section-dark border-b border-surface-10 dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-blue-300 border border-primary/30">Engineering Blog</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Technical Insights from Expert Engineers</h1>
          <p className="text-slate-200/70 mb-6">In-depth tutorials, patterns, and real-world engineering lessons</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-card" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setActiveTag(null)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!activeTag ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>All</button>
          {allTags.map(tag => (
            <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${activeTag === tag ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>#{tag}</button>
          ))}
        </div>

        {/* Featured Post */}
        {filtered[0] && (
          <Link to={`/blog/${filtered[0].id}`} className="block mb-6">
            <div className="grid md:grid-cols-2 gap-0 bg-card border border-border rounded-2xl overflow-hidden card-hover">
              <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-56 md:h-full object-cover" />
              <div className="p-6 flex flex-col justify-center">
                <Badge className="mb-3 w-fit bg-primary/10 text-primary border-primary/20">Featured</Badge>
                <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors">{filtered[0].title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{filtered[0].excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <img src={filtered[0].author.avatar} alt={filtered[0].author.name} className="w-6 h-6 rounded-full object-cover" />
                  <span>{filtered[0].author.name}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{filtered[0].readTime} min</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{(filtered[0].views/1000).toFixed(1)}K</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(1).map(post => (
            <Link key={post.id} to={`/blog/${post.id}`} className="block bg-card border border-border rounded-xl overflow-hidden card-hover">
              <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
              <div className="p-5">
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">{tag}</span>
                  ))}
                </div>
                <h3 className="font-bold text-sm mb-3 leading-snug hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <img src={post.author.avatar} alt={post.author.name} className="w-5 h-5 rounded-full object-cover" />
                  <span>{post.author.name}</span>
                  <span>·</span>
                  <span>{post.readTime} min</span>
                  <span className="ml-auto flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
