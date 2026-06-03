import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Target, Eye, Heart, Globe, Users, Code2 } from 'lucide-react';

const team = [
  { name: 'Marcus Rivera', role: 'Founder & CEO', bio: 'Ex-Stripe engineer. 12 years building developer tools.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face' },
  { name: 'Sarah Chen', role: 'CTO', bio: 'Former Google Brain researcher. AI systems architect.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face' },
  { name: 'James Park', role: 'Head of Product', bio: 'Previously at Linear & Notion. Developer UX obsessed.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face' },
  { name: 'Priya Mehta', role: 'Head of Engineering', bio: 'Full-stack engineer. Open-source contributor. Rust fan.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face' },
  { name: 'Daniel Wu', role: 'Lead Designer', bio: 'Design systems expert. Previously at Figma & GitHub.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face' },
  { name: 'Amara Johnson', role: 'Community Lead', bio: 'Developer advocate. 10+ years growing tech communities.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face' },
];

const values = [
  { icon: Target, title: 'Quality Over Quantity', desc: 'We validate every answer for technical accuracy.', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Eye, title: 'Radical Transparency', desc: 'Open reputation systems and honest moderation.', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10' },
  { icon: Heart, title: 'Developer First', desc: 'Every feature is designed with the developer in mind.', color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-500/10' },
  { icon: Globe, title: 'Inclusive Community', desc: 'Engineers from all backgrounds and skill levels.', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10' },
];

export default function About() {
  useScrollToTop();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToTop />

      {/* Hero */}
      <section className="pt-32 pb-20 section-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="mb-5 bg-primary/20 text-blue-600 dark:text-blue-300 border border-primary/30">Our Story</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Built by developers,<br /><span className="text-gradient">for developers</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            We started StackTruth because we were tired of outdated answers, inconsistent code reviews, and platforms that didn't truly understand modern engineering.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[['2021', 'Founded'], ['180K+', 'Developers'], ['2.4M+', 'Questions solved'], ['40+', 'Countries']].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-bold text-foreground">{v}</div>
                <div className="text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Mission</Badge>
              <h2 className="text-3xl font-bold mb-5">Raise the standard for technical knowledge sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                The world runs on software, and the quality of that software depends on the quality of knowledge engineers can access. We believe every developer deserves validated, reliable technical knowledge.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our AI-powered validation engine, combined with a community of verified experts, ensures that answers on StackTruth are not just upvoted — they are correct.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/features">Explore Our Platform <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map(v => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="bg-card border border-border rounded-xl p-5 card-hover">
                    <div className={`w-9 h-9 rounded-lg ${v.bg} flex items-center justify-center mb-3`}>
                      <Icon className={`w-4 h-4 ${v.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{v.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">The Team</Badge>
            <h2 className="text-3xl font-bold mb-3">The people behind StackTruth</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Engineers and designers who lived the problem and are obsessed with solving it.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(member => (
              <div key={member.name} className="bg-card border border-border rounded-xl p-6 card-hover text-center">
                <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-2 ring-primary/10" />
                <h3 className="font-bold">{member.name}</h3>
                <Badge variant="secondary" className="text-xs mt-1 mb-3">{member.role}</Badge>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Backed By</Badge>
          <h2 className="text-2xl font-bold mb-8">Trusted by world-class investors</h2>
          <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale">
            {['Sequoia Capital', 'Y Combinator', 'Andreessen Horowitz', 'Founders Fund', 'General Catalyst'].map(inv => (
              <span key={inv} className="text-base font-bold">{inv}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join us in raising the bar</h2>
          <p className="text-muted-foreground mb-8">Be part of a community that cares about code quality, knowledge sharing, and developer growth.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90"><Link to="/register">Get Started Free <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/careers">View Careers</Link></Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
