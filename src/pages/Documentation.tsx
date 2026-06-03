import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Code2, Terminal, Zap } from 'lucide-react';

const sections = [
  { title: 'Authentication', items: ['POST /auth/register', 'POST /auth/login', 'POST /auth/refresh', 'DELETE /auth/logout'] },
  { title: 'Questions', items: ['GET /questions', 'POST /questions', 'GET /questions/:id', 'PUT /questions/:id', 'DELETE /questions/:id'] },
  { title: 'Answers', items: ['POST /questions/:id/answers', 'PUT /answers/:id', 'POST /answers/:id/vote', 'PATCH /answers/:id/accept'] },
  { title: 'Code Reviews', items: ['POST /reviews', 'GET /reviews/:id', 'GET /reviews/user/:userId'] },
  { title: 'AI Assistant', items: ['POST /ai/chat', 'POST /ai/review', 'POST /ai/optimize'] },
];

export default function Documentation() {
  useScrollToTop();
  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <div className="pt-20 pb-6 section-dark border-b border-surface-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-blue-600 dark:text-blue-300 border border-primary/30">Documentation</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">StackTruth API Reference</h1>
          <p className="text-muted-foreground">RESTful API for integrating StackTruth into your applications</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-4 sticky top-24">
              <h3 className="font-semibold text-sm mb-3">API Reference</h3>
              <div className="space-y-1">
                {sections.map(s => (
                  <a key={s.title} href={`#${s.title.toLowerCase()}`} className="block text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-lg hover:bg-muted transition-colors">
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="font-bold text-lg mb-2">Getting Started</h2>
              <p className="text-muted-foreground text-sm mb-4">All API requests must be authenticated using a Bearer token.</p>
              <div className="bg-[hsl(var(--code-bg))] rounded-lg p-4 font-mono text-xs">
                <p className="text-slate-400"># Base URL</p>
                <p className="text-green-600 dark:text-green-400">https://api.stacktruth.dev/v1</p>
                <p className="text-slate-400 mt-3"># Authentication</p>
                <p className="text-foreground">Authorization: Bearer {'<your-token>'}</p>
              </div>
            </div>

            {sections.map(section => (
              <div key={section.title} id={section.title.toLowerCase()} className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-bold">{section.title}</h2>
                  <Badge variant="secondary" className="text-xs">{section.items.length} endpoints</Badge>
                </div>
                <div className="divide-y divide-border">
                  {section.items.map((endpoint, i) => {
                    const method = endpoint.split(' ')[0];
                    const path = endpoint.split(' ')[1];
                    return (
                      <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-muted/30 transition-colors">
                        <Badge className={`text-xs font-mono w-14 flex-shrink-0 justify-center ${
                          method === 'GET' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' :
                          method === 'POST' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' :
                          method === 'PUT' || method === 'PATCH' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20' :
                          'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                        }`}>{method}</Badge>
                        <code className="text-sm font-mono text-foreground">{path}</code>
                      </div>
                    );
                  })}
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
