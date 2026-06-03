import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ArrowRight, BookOpen, Clock, Star } from 'lucide-react';

// Type definitions
interface Tutorial {
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  category: string;
  image: string;
}

const tutorials: Tutorial[] = [
  { title: 'Build a Real-time Chat App with WebSockets and React', level: 'Intermediate', duration: '45 min', rating: 4.9, category: 'React', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop' },
  { title: 'TypeScript Advanced Patterns: Conditional Types & Inference', level: 'Advanced', duration: '60 min', rating: 4.8, category: 'TypeScript', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=200&fit=crop' },
  { title: 'PostgreSQL Full-Text Search: From Basics to Production', level: 'Intermediate', duration: '35 min', rating: 4.7, category: 'Database', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop' },
  { title: 'Kubernetes for Beginners: Deploying Your First App', level: 'Beginner', duration: '50 min', rating: 4.9, category: 'DevOps', image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=200&fit=crop' },
  { title: 'Rust Ownership & Borrowing: Visual Guide', level: 'Beginner', duration: '40 min', rating: 4.8, category: 'Rust', image: 'https://images.unsplash.com/photo-1542903660-eedba2cda473?w=400&h=200&fit=crop' },
  { title: 'GraphQL with Apollo: Building Type-Safe APIs', level: 'Intermediate', duration: '55 min', rating: 4.6, category: 'GraphQL', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop' },
];

// All possible filter values (levels + categories)
const allFilters = ['All', 'Beginner', 'Intermediate', 'Advanced', 'React', 'TypeScript', 'Database', 'DevOps', 'Rust', 'GraphQL'];

export default function Tutorials() {
  useScrollToTop();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter tutorials based on activeFilter
  const filteredTutorials = tutorials.filter(tutorial => {
    if (activeFilter === 'All') return true;
    // Match level or category
    return tutorial.level === activeFilter || tutorial.category === activeFilter;
  });

  const handleTutorialClick = (tutorial: Tutorial) => {
    // In a real app, navigate to a tutorial detail page
    // For now, show toast and optionally navigate
    toast.success(`Opening: ${tutorial.title}`);
    // Uncomment when route exists: navigate(`/tutorials/${encodeURIComponent(tutorial.title)}`);
  };

  const getLevelBadgeClass = (level: Tutorial['level']) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'Intermediate':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'Advanced':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Hero */}
      <div className="pt-20 pb-8 section-dark border-b border-surface-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-blue-600 dark:text-blue-300 border border-primary/30">
            Tutorials
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Learn by Building</h1>
          <p className="text-slate-400 mb-6">Step-by-step tutorials from expert engineers</p>
          <div className="flex flex-wrap justify-center gap-2">
            {allFilters.map(filter => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  activeFilter === filter
                    ? 'bg-primary text-white'
                    : 'bg-surface-5 text-muted-foreground hover:bg-primary/20 hover:text-foreground'
                }`}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tutorial Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filteredTutorials.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
            <h3 className="font-semibold mb-2">No tutorials found</h3>
            <p className="text-muted-foreground text-sm mb-4">Try a different filter</p>
            <Button onClick={() => setActiveFilter('All')}>Show all tutorials</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTutorials.map((tutorial, index) => (
              <div
                key={`${tutorial.title}-${index}`}
                onClick={() => handleTutorialClick(tutorial)}
                className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer transition-all hover:border-primary/30 hover:shadow-md"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleTutorialClick(tutorial)}
                aria-label={`Tutorial: ${tutorial.title}, ${tutorial.level} level, ${tutorial.duration}`}
              >
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {tutorial.category}
                    </Badge>
                    <Badge className={`text-xs ${getLevelBadgeClass(tutorial.level)}`}>
                      {tutorial.level}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-3 leading-snug">{tutorial.title}</h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {tutorial.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star
                        className="w-3 h-3 text-yellow-600 dark:text-yellow-400 fill-yellow-400"
                        aria-hidden="true"
                      />
                      {tutorial.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}