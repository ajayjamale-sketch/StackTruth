// About.tsx
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Eye, Heart, Globe } from 'lucide-react';

const values = [
  { 
    icon: Target, 
    title: 'Quality Over Quantity', 
    desc: 'We validate every answer for technical accuracy.',
    color: 'text-blue-600 dark:text-blue-400', 
    bg: 'bg-blue-500/10' 
  },
  { 
    icon: Eye, 
    title: 'Radical Transparency', 
    desc: 'Open reputation systems and honest moderation.',
    color: 'text-green-600 dark:text-green-400', 
    bg: 'bg-green-500/10' 
  },
  { 
    icon: Heart, 
    title: 'Developer First', 
    desc: 'Every feature is designed with the developer in mind.',
    color: 'text-pink-600 dark:text-pink-400', 
    bg: 'bg-pink-500/10' 
  },
  { 
    icon: Globe, 
    title: 'Inclusive Community', 
    desc: 'Engineers from all backgrounds and skill levels.',
    color: 'text-purple-600 dark:text-purple-400', 
    bg: 'bg-purple-500/10' 
  },
];

export default function About() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="mb-5 bg-primary/20 text-primary-foreground dark:text-blue-300 border border-primary/30">
            Our Story
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Built by developers,<br />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              for developers
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
            We started StackTruth because we were tired of outdated answers, inconsistent 
            code reviews, and platforms that didn't truly understand modern engineering.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              ['2021', 'Founded'],
              ['180K+', 'Developers'],
              ['2.4M+', 'Questions solved'],
              ['40+', 'Countries']
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-foreground">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                Mission
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5">
                Raise the standard for technical knowledge sharing
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                The world runs on software, and the quality of that software depends on 
                the quality of knowledge engineers can access. We believe every developer 
                deserves validated, reliable technical knowledge.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Our AI-powered validation engine, combined with a community of verified 
                experts, ensures that answers on StackTruth are not just upvoted — they 
                are correct.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 transition-all duration-200">
                <Link to="/features">
                  Explore Our Platform <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div 
                    key={value.title} 
                    className="bg-card border border-border rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className={`w-10 h-10 rounded-lg ${value.bg} flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${value.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            Backed By
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">
            Trusted by world-class investors
          </h2>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            {[
              'Sequoia Capital', 
              'Y Combinator', 
              'Andreessen Horowitz', 
              'Founders Fund', 
              'General Catalyst'
            ].map((investor) => (
              <span 
                key={investor} 
                className="text-base font-semibold text-muted-foreground/60 hover:text-muted-foreground/80 transition-colors duration-200"
              >
                {investor}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Join us in raising the bar
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Be part of a community that cares about code quality, knowledge sharing, 
            and developer growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 transition-all duration-200">
              <Link to="/register">
                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="transition-all duration-200">
              <Link to="/careers">
                View Careers
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}