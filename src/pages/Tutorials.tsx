import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Star } from 'lucide-react';

const tutorials = [
  { title: 'Build a Real-time Chat App with WebSockets and React', level: 'Intermediate', duration: '45 min', rating: 4.9, category: 'React', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop' },
  { title: 'TypeScript Advanced Patterns: Conditional Types & Inference', level: 'Advanced', duration: '60 min', rating: 4.8, category: 'TypeScript', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=200&fit=crop' },
  { title: 'PostgreSQL Full-Text Search: From Basics to Production', level: 'Intermediate', duration: '35 min', rating: 4.7, category: 'Database', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop' },
  { title: 'Kubernetes for Beginners: Deploying Your First App', level: 'Beginner', duration: '50 min', rating: 4.9, category: 'DevOps', image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=200&fit=crop' },
  { title: 'Rust Ownership & Borrowing: Visual Guide', level: 'Beginner', duration: '40 min', rating: 4.8, category: 'Rust', image: 'https://images.unsplash.com/photo-1542903660-eedba2cda473?w=400&h=200&fit=crop' },
  { title: 'GraphQL with Apollo: Building Type-Safe APIs', level: 'Intermediate', duration: '55 min', rating: 4.6, category: 'GraphQL', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop' },
];

export default function Tutorials() {
  useScrollToTop();
  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <div className="pt-20 pb-8 section-dark border-b border-surface-10 dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-blue-300 border border-primary/30">Tutorials</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Learn by Building</h1>
          <p className="text-slate-400 mb-6">Step-by-step tutorials from expert engineers</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['All', 'Beginner', 'Intermediate', 'Advanced', 'React', 'TypeScript', 'Database', 'DevOps'].map(t => (
              <button key={t} className="px-3 py-1.5 rounded-lg text-sm bg-surface-5 text-muted-foreground/70 hover:bg-primary/20 hover:text-foreground transition-colors">{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tutorials.map((t, i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden card-hover cursor-pointer">
              <img src={t.image} alt={t.title} className="w-full h-40 object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">{t.category}</Badge>
                  <Badge className={`text-xs ${t.level === 'Beginner' ? 'bg-green-500/10 text-green-400 border-green-500/20' : t.level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>{t.level}</Badge>
                </div>
                <h3 className="font-semibold text-sm mb-3 leading-snug">{t.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.duration}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{t.rating}</span>
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
