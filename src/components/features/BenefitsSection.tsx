import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Accelerate Your Growth',
    desc: 'Developers who actively participate on StackTruth report 2x faster skill development than those who learn alone.',
    stat: '2x faster growth',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Users,
    title: 'Build Real Credibility',
    desc: 'Your StackTruth profile and reputation score is recognized by 500+ hiring companies as a signal of engineering quality.',
    stat: '500+ companies',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Zap,
    title: 'Solve Problems 10x Faster',
    desc: 'Access 2.4M+ validated technical solutions and AI-powered assistance to unblock yourself instantly.',
    stat: '10x faster debug',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Why StackTruth</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">
              Not just answers.
              <br /><span className="text-gradient">Validated knowledge.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Any platform gives you answers. StackTruth gives you validated, expert-reviewed solutions with real code, real explanations, and real context — from engineers who have actually solved the problem in production.
            </p>
            <div className="space-y-4 mb-8">
              {[
                'AI-validated answer quality scoring',
                'Expert verification system with reputation tracking',
                'Code examples tested and reviewed',
                'Version-aware solutions for your specific stack',
                'Real-world context, not just syntax explanations',
              ].map(b => (
                <div key={b} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/register">Start Learning Faster <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>

          <div className="space-y-4">
            {benefits.map(b => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="bg-card border border-border rounded-xl p-6 card-hover">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${b.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${b.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{b.title}</h3>
                        <Badge variant="secondary" className="text-xs">{b.stat}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
