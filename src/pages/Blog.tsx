// Blog.tsx
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Clock, Heart, Eye, Tag, X } from 'lucide-react';
import { mockBlogs } from '@/lib/mockData';

export default function Blog() {
  useScrollToTop();
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Extract unique tags from all blog posts
  const allTags = [...new Set(mockBlogs.flatMap(b => b.tags))];

  // Filter posts based on search query and active tag
  const filtered = mockBlogs.filter(blog =>
    (!search || blog.title.toLowerCase().includes(search.toLowerCase())) &&
    (!activeTag || blog.tags.includes(activeTag))
  );

  // Helper to toggle tag filter (if same tag is clicked again, clear it)
  const handleTagClick = (tag: string) => {
    setActiveTag(prev => (prev === tag ? null : tag));
  };

  // Clear search input
  const clearSearch = () => setSearch('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Hero Section */}
      <div className="pt-20 pb-10 border-b border-border bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground dark:text-blue-300 border border-primary/30">
            Engineering Blog
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Technical Insights from Expert Engineers
          </h1>
          <p className="text-muted-foreground mb-6">
            In-depth tutorials, patterns, and real-world engineering lessons
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-8 bg-card"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tag Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              !activeTag
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeTag === tag
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Featured Post (first in filtered list) */}
        {filtered.length > 0 && (
          <Link to={`/blog/${filtered[0].id}`} className="block mb-6">
            <div className="grid md:grid-cols-2 gap-0 bg-card border border-border rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <img
                src={filtered[0].image}
                alt={filtered[0].title}
                className="w-full h-56 md:h-full object-cover"
                loading="lazy"
              />
              <div className="p-6 flex flex-col justify-center">
                <Badge className="mb-3 w-fit bg-primary/10 text-primary border-primary/20">
                  Featured
                </Badge>
                <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2">
                  {filtered[0].title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {filtered[0].excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <img
                    src={filtered[0].author.avatar}
                    alt={filtered[0].author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>{filtered[0].author.name}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />{filtered[0].readTime} min
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />{(filtered[0].views / 1000).toFixed(1)}K
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid (skip featured post) */}
        {filtered.slice(1).length === 0 && filtered.length <= 1 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles match your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearch(''); setActiveTag(null); }}>
              Clear filters
            </Button>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(1).map(post => (
            <div key={post.id} className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col">
              <Link to={`/blog/${post.id}`} className="block">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
              </Link>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 2).map(tag => (
                    <button
                      key={tag}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigation to blog post
                        handleTagClick(tag);
                      }}
                      className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{post.tags.length - 2}</span>
                  )}
                </div>
                <Link to={`/blog/${post.id}`} className="block mb-auto">
                  <h3 className="font-bold text-sm mb-3 leading-snug hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground mt-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{post.author.name}</span>
                  <span>·</span>
                  <span>{post.readTime} min</span>
                  <span className="ml-auto flex items-center gap-1">
                    <Heart className="w-3 h-3" />{post.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}