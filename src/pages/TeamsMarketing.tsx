import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Lock, BookOpen, GitMerge, Users, ShieldCheck, Zap } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Private Knowledge Base',
    desc: 'A secure, searchable repository for your team\'s internal documentation, onboarding materials, and best practices.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10'
  },
  {
    icon: GitMerge,
    title: 'Seamless Integrations',
    desc: 'Connect StackTruth Teams with GitHub, Jira, Slack, and your existing CI/CD pipelines for a unified workflow.',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-500/10'
  },
  {
    icon: Users,
    title: 'Expert Collaboration',
    desc: 'Empower your engineers to ask questions, review code, and share knowledge securely within your organization.',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-500/10'
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    desc: 'SSO, advanced access controls, and compliance features to keep your proprietary code and knowledge safe.',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-500/10'
  }
];

export default function TeamsMarketing() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ScrollToTop />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <Badge className="mb-5 bg-primary/20 text-primary-foreground dark:text-blue-300 border border-primary/30">
              StackTruth for Teams
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Empower your engineering team to build better, <span className="text-gradient">faster.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
              A private, secure platform for your organization to share knowledge, conduct code reviews, and onboard new engineers effectively.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 btn-glow h-12 px-8">
                <Link to="/contact">
                  Contact Sales
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8">
                <Link to="/register">
                  Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything your engineering team needs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Break down silos and accelerate development with tools built specifically for technical collaboration.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="bg-card border border-border rounded-xl p-6 hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-lg ${feature.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to transform your team's workflow?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of organizations using StackTruth Teams to scale their engineering culture and productivity.
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 btn-glow">
              <Link to="/contact">Get a Demo</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
