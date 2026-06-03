import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2, Home, ArrowRight, Search, MessageSquare } from 'lucide-react';

export default function NotFound() {
  useScrollToTop(); // Scrolls to top when component mounts
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToTop /> {/* Handles scroll on route changes */}

      <main className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-xl">
          <div className="relative mb-8">
            <div className="text-[120px] font-black text-primary/10 leading-none select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-card border border-border rounded-2xl p-4 shadow-xl">
                <Code2 className="w-8 h-8 text-primary mx-auto mb-2" aria-hidden="true" />
                <p className="font-mono text-xs text-muted-foreground">TypeError: page not found</p>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-3">Page not found</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back to somewhere useful.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" aria-hidden="true" /> Go Home
            </Button>
            <Button variant="outline" onClick={() => navigate('/questions')}>
              <MessageSquare className="w-4 h-4 mr-2" aria-hidden="true" /> Browse Questions
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Or try one of these:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: 'AI Assistant', href: '/ai-assistant' },
                { label: 'Code Review', href: '/code-review' },
                { label: 'Leaderboard', href: '/leaderboard' },
                { label: 'Jobs', href: '/jobs' },
              ].map(link => (
                <Link key={link.href} to={link.href}>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">
                    {link.label}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}