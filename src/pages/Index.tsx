// Index.tsx
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, CheckCircle, Star, Users, MessageSquare, GitBranch, 
  Bot, Code2, Award, TrendingUp, Briefcase, Quote, 
  Zap, Shield, Heart, Globe 
} from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';

export default function Index() {
  useScrollToTop();
  const { isAuthenticated } = useAuthContext();

  // Mock data
  const stats = [
    { value: '180K+', label: 'Developers' },
    { value: '2.4M+', label: 'Questions Solved' },
    { value: '40+', label: 'Countries' },
    { value: '99.9%', label: 'Uptime' },
  ];

  const features = [
    { icon: MessageSquare, title: 'Q&A Platform', desc: 'Ask and answer technical questions with verified experts.', color: 'text-blue-600', bg: 'bg-blue-500/10' },
    { icon: GitBranch, title: 'Code Review', desc: 'AI-powered code reviews for 40+ languages.', color: 'text-green-600', bg: 'bg-green-500/10' },
    { icon: Bot, title: 'AI Assistant', desc: 'Get instant help with coding problems and architecture.', color: 'text-purple-600', bg: 'bg-purple-500/10' },
    { icon: Users, title: 'Team Workspaces', desc: 'Collaborate privately with your team.', color: 'text-pink-600', bg: 'bg-pink-500/10' },
  ];

  const testimonials = [
    { name: 'Marcus Rivera', role: 'Senior Engineer, Stripe', content: 'StackTruth has transformed how our team solves technical problems. The AI code review is a game changer.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop' },
    { name: 'Sarah Chen', role: 'Tech Lead, Google', content: 'The quality of answers here is unmatched. I finally found a community that values depth over speed.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop' },
    { name: 'James Park', role: 'Founder, DevTool Labs', content: 'We use StackTruth for all our internal code reviews. It saves us hours every week.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=60&h=60&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={false} />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground dark:text-blue-300 border border-primary/30">
            Welcome to the future of developer knowledge
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Ask, review, and grow<br />
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              with expert developers
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join 180,000+ engineers who use StackTruth to solve problems, review code, and advance their careers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/register">Get Started Free <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/features">Explore Features</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-6">Trusted by engineers at</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale">
            {['Google', 'Microsoft', 'Amazon', 'Netflix', 'Stripe', 'GitHub'].map(company => (
              <span key={company} className="text-base font-semibold">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Core Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to build better</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From Q&A to AI code review, StackTruth gives you the tools to level up your engineering skills.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 rounded-xl ${feat.bg} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QA Preview */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-500/20">Community Q&A</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get answers from verified experts</h2>
              <p className="text-muted-foreground mb-6">Our community of 180,000+ developers provides high-quality, detailed answers to your most challenging technical questions.</p>
              <ul className="space-y-2 mb-6">
                {['Upvote/downvote system', 'Code syntax highlighting', 'Tag-based discovery', 'Answer acceptance'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-accent" /> {item}</li>
                ))}
              </ul>
              <Button asChild className="bg-primary hover:bg-primary/90"><Link to={isAuthenticated ? "/questions" : "/login"}>Browse Questions <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="space-y-4">
                {[
                  'How do I prevent memory leaks in Node.js WebSocket connections?',
                  'Explain CQRS pattern with TypeScript example',
                  'What are the best practices for PostgreSQL indexing?'
                ].map(q => (
                  <div key={q} className="p-3 bg-muted rounded-lg text-sm">{q}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Review Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/20">AI Code Review</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Catch bugs before they ship</h2>
              <p className="text-muted-foreground mb-6">Our AI engine scans your code for security vulnerabilities, performance issues, and style problems.</p>
              <ul className="space-y-2 mb-6">
                {['SQL injection detection', 'Weak cryptography warnings', 'Performance bottlenecks', 'Style suggestions'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-accent" /> {item}</li>
                ))}
              </ul>
              <Button asChild className="bg-primary hover:bg-primary/90"><Link to={isAuthenticated ? "/code-review" : "/login"}>Try Code Review <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 font-mono text-xs">
              <pre className="text-red-400">// SQL injection vulnerability</pre>
              <pre className="text-foreground">{"const query = `SELECT * FROM users WHERE name = '${input}'`;"}</pre>
              <pre className="text-green-400 mt-2">// ✅ Use parameterized queries</pre>
              <pre className="text-foreground">const query = 'SELECT * FROM users WHERE name = $1';</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Tools Preview */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-500/10 text-purple-600 border-purple-500/20">AI Assistant</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your personal AI coding mentor</h2>
              <p className="text-muted-foreground mb-6">Get instant help with debugging, architecture decisions, and code optimization – powered by GPT-4.</p>
              <Button asChild className="bg-primary hover:bg-primary/90"><Link to="/ai-assistant">Chat with AI <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Bot className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div className="bg-muted rounded-lg p-3 text-sm">How do I implement JWT refresh tokens in Node.js?</div>
              </div>
              <div className="flex items-start gap-3 mt-3 justify-end">
                <div className="bg-primary/10 rounded-lg p-3 text-sm">Here's a complete implementation with httpOnly cookies...</div>
                <Bot className="w-6 h-6 text-purple-600 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reputation Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Reputation System</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Earn recognition for your expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Gain reputation points, unlock badges, and become a verified expert in your favorite technologies.</p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Award, label: 'Expert Badge', value: '2000+ rep' },
              { icon: TrendingUp, label: 'Top Contributor', value: 'Monthly awards' },
              { icon: Shield, label: 'Verification', value: 'Identity check' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Collaboration */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-pink-500/10 text-pink-600 border-pink-500/20">Team Workspaces</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Collaborate with your team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Private channels, shared code snippets, and collaborative docs – all in one place.</p>
          <Button asChild variant="outline" className="border-primary/30"><Link to="/teams-info">Learn more →</Link></Button>
        </div>
      </section>

      {/* Job Marketplace */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-cyan-500/10 text-cyan-600 border-cyan-500/20">Job Marketplace</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Find your next role</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">Companies trust StackTruth to find top engineering talent. Browse jobs or get discovered by recruiters.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90"><Link to={isAuthenticated ? "/jobs" : "/login"}>Browse Jobs</Link></Button>
            <Button asChild variant="outline"><Link to={isAuthenticated ? "/dashboard/recruiter" : "/login"}>Post a Job</Link></Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Loved by developers worldwide</h2>
            <p className="text-muted-foreground">Join thousands of engineers who trust StackTruth daily.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-6">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground text-sm mb-4">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to level up your engineering?</h2>
          <p className="text-muted-foreground mb-8">Join StackTruth today – free forever.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/register">Create Free Account <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}