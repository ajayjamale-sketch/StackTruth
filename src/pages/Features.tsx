import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, GitBranch, Bot, BookOpen, Users, Monitor, Trophy, BarChart3, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: MessageSquare, title: 'Technical Q&A', href: '/questions',
    features: ['Rich markdown editor', 'Code syntax highlighting', 'Answer voting & acceptance', 'Tag-based discovery', 'Expert verification badges'],
    color: 'text-blue-400', bg: 'bg-blue-500/10',
  },
  {
    icon: GitBranch, title: 'Code Review Engine', href: '/code-review',
    features: ['AI security analysis', 'Performance scoring', 'Line-by-line annotations', 'Best practice suggestions', '40+ language support'],
    color: 'text-green-400', bg: 'bg-green-500/10',
  },
  {
    icon: Bot, title: 'AI Developer Assistant', href: '/ai-assistant',
    features: ['GPT-4o powered', 'Stack-aware responses', 'Bug detection & fixes', 'Architecture advice', 'Code optimization'],
    color: 'text-purple-400', bg: 'bg-purple-500/10',
  },
  {
    icon: BookOpen, title: 'Knowledge Base', href: '/knowledge-base',
    features: ['2.4M+ curated resources', 'API documentation', 'Video tutorials', 'Learning paths', 'Contributor guides'],
    color: 'text-yellow-400', bg: 'bg-yellow-500/10',
  },
  {
    icon: Users, title: 'Team Workspaces', href: '/teams',
    features: ['Private team channels', 'Shared code snippets', 'Collaborative docs', 'Task management', 'Access controls'],
    color: 'text-pink-400', bg: 'bg-pink-500/10',
  },
  {
    icon: Monitor, title: 'Live Coding', href: '/live-coding',
    features: ['Real-time collaboration', 'Code execution sandbox', 'Interview mode', 'Pair programming', 'Session recording'],
    color: 'text-cyan-400', bg: 'bg-cyan-500/10',
  },
];

export default function Features() {
  useScrollToTop();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToTop />

      {/* Hero */}
      <section className="pt-32 pb-20 section-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-primary/20 text-blue-300 border border-primary/30">Features</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">Everything developers need<br /><span className="text-gradient">to build better</span></h1>
          <p className="text-xl text-slate-200/80 max-w-2xl mx-auto mb-8">A complete developer ecosystem — from asking questions to shipping production code, together.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow" asChild>
            <Link to="/register">Start for Free <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Feature Details */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`w-12 h-12 rounded-2xl ${feat.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">{feat.title}</h2>
                  <ul className="space-y-2.5 mb-6">
                    {feat.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link to={feat.href}>Try {feat.title} <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''} bg-card border border-border rounded-2xl p-6`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-8 h-8 rounded-lg ${feat.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${feat.color}`} />
                    </div>
                    <span className="font-semibold text-sm">{feat.title} Preview</span>
                    <Badge variant="secondary" className="text-xs ml-auto">Live Demo</Badge>
                  </div>
                  <div className="bg-muted rounded-xl p-4">
                    <div className="space-y-2">
                      {feat.features.slice(0, 3).map((f, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3 h-3 text-accent flex-shrink-0" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Try every feature free</h2>
          <p className="text-muted-foreground mb-8">No credit card. No setup. Just create an account and start building better.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow" asChild>
            <Link to="/register">Get Started Free <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
