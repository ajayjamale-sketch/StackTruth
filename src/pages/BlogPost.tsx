import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, Heart, ArrowLeft, Share2 } from 'lucide-react';
import { mockBlogs } from '@/lib/mockData';
import { toast } from 'sonner';

export default function BlogPost() {
  useScrollToTop();
  const { id } = useParams();
  const post = mockBlogs.find(b => b.id === id) || mockBlogs[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <Link to="/blog" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">#{tag}</Badge>
          ))}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-2">
            <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
            <span className="font-medium text-foreground">{post.author.name}</span>
          </div>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} min read</span>
          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.views.toLocaleString()} views</span>
          <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-400" />{post.likes} likes</span>
          <button onClick={() => toast.success('Link copied!')} className="flex items-center gap-1 hover:text-foreground transition-colors ml-auto">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>

        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-xl mb-8" />

        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed text-base mb-5">{post.excerpt}</p>

          <h2 className="text-xl font-bold mt-8 mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Building production-grade software requires deep knowledge of your technology stack. In this article, we'll dive into advanced patterns and best practices that senior engineers use to write maintainable, performant, and secure code.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3">Core Concepts</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Understanding the fundamentals is critical before diving into advanced patterns. We'll cover the core concepts that form the foundation of everything discussed in this article.
          </p>

          <div className="bg-muted rounded-xl p-5 font-mono text-xs my-6 overflow-x-auto">
            <p className="text-slate-400 mb-2">// Example implementation</p>
            <p><span className="text-blue-400">const</span> <span className="text-white">optimizedQuery</span> <span className="text-white/50">= async (</span><span className="text-yellow-400">params</span><span className="text-white/50">: QueryParams</span><span className="text-white/50">) {'=> {'}</span></p>
            <p className="pl-4"><span className="text-blue-400">const</span> <span className="text-white">cached</span> <span className="text-white/50">= await</span> <span className="text-green-400">cache.get</span><span className="text-white/50">(params.key);</span></p>
            <p className="pl-4"><span className="text-purple-400">if</span> <span className="text-white/50">(cached)</span> <span className="text-purple-400">return</span> <span className="text-white">cached</span><span className="text-white/50">;</span></p>
            <p className="pl-4"><span className="text-blue-400">const</span> <span className="text-white">result</span> <span className="text-white/50">= await</span> <span className="text-green-400">db.query</span><span className="text-white/50">(params.sql, params.values);</span></p>
            <p className="pl-4"><span className="text-white/50">await</span> <span className="text-green-400">cache.set</span><span className="text-white/50">(params.key, result, 300);</span></p>
            <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-white">result</span><span className="text-white/50">;</span></p>
            <p><span className="text-white/50">{'};'}</span></p>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-3">Best Practices</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            After years of production deployments and thousands of code reviews, these are the patterns that consistently lead to better outcomes in high-scale systems.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3">Conclusion</h2>
          <p className="text-muted-foreground leading-relaxed">
            The patterns covered in this article have been battle-tested in production environments handling millions of requests per day. Apply them thoughtfully and always measure before optimizing.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-10 pt-6 border-t border-border">
          <Button variant="outline" onClick={() => toast.success('Liked!')}><Heart className="w-4 h-4 mr-2" />Like this article</Button>
          <Button variant="outline" onClick={() => toast.success('Copied!')}><Share2 className="w-4 h-4 mr-2" />Share</Button>
          <Link to="/questions/ask" className="ml-auto">
            <Button className="bg-primary hover:bg-primary/90">Ask a Question</Button>
          </Link>
        </div>

        {/* Related */}
        <div className="mt-10">
          <h3 className="font-bold text-lg mb-4">Related Articles</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {mockBlogs.filter(b => b.id !== post.id).slice(0, 2).map(b => (
              <Link key={b.id} to={`/blog/${b.id}`} className="block bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
                <h4 className="font-medium text-sm mb-1.5 hover:text-primary transition-colors line-clamp-2">{b.title}</h4>
                <p className="text-xs text-muted-foreground">{b.readTime} min read</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
