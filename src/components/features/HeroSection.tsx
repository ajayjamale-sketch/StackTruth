import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, PlayCircle } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const stats = [
  { value: '180K+', label: 'Developers' },
  { value: '2.4M+', label: 'Questions Solved' },
  { value: '98%', label: 'Answer Quality' },
  { value: '40+', label: 'Languages' },
];

const techBadges = ['TypeScript', 'Rust', 'React', 'PostgreSQL', 'Kubernetes', 'Go', 'Python', 'GraphQL'];

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden section-hero">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-10 dark:opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background dark:from-[#020617]/40 dark:via-[#020617]/60 dark:to-[#020617]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(37,99,235,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(34,197,94,0.08),transparent_50%)]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-green-500/20 text-green-600 dark:text-green-300 border border-green-500/30 px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block mr-1.5 animate-pulse" aria-hidden="true" />
                180K+ developers trust StackTruth
              </Badge>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              The Platform
              <br />
              <span className="text-gradient">Where Code Gets</span>
              <br />
              Validated.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              Ask technical questions, get AI-powered code reviews, collaborate with expert engineers, and grow your reputation in the world's most rigorous developer community.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 btn-glow h-12 px-6" onClick={() => navigate('/register')}>
                Join Community Free <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline" className="border-surface-10 text-foreground hover:bg-surface-8 hover:border-surface-10 h-12 px-6" onClick={() => navigate('/questions')}>
                <PlayCircle className="w-4 h-4 mr-2" aria-hidden="true" /> Explore Questions
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {stats.map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column – code preview */}
          <div className="hidden lg:block animate-float">
            <div className="bg-card/90 border border-surface-10 rounded-2xl overflow-hidden shadow-2xl glow-blue">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-10 bg-surface-5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" aria-hidden="true" />
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-muted-foreground/40 text-xs font-mono">ai-review.ts</span>
                </div>
                <Badge className="text-[10px] bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
                  AI Reviewing...
                </Badge>
              </div>

              {/* Code block */}
              <div className="p-5 font-mono text-xs leading-relaxed">
                <div className="space-y-1">
                  <p><span className="text-slate-500">// PostgreSQL concurrent transaction handler</span></p>
                  <p><span className="text-blue-600 dark:text-blue-400">async function</span> <span className="text-green-600 dark:text-green-400">handleTransaction</span><span className="text-foreground">(</span></p>
                  <p className="pl-4"><span className="text-yellow-600 dark:text-yellow-400">db</span><span className="text-muted-foreground">: Pool,</span></p>
                  <p className="pl-4"><span className="text-yellow-600 dark:text-yellow-400">fn</span><span className="text-muted-foreground">: TransactionFn</span></p>
                  <p><span className="text-foreground">) {`{`}</span></p>
                  <p className="pl-4"><span className="text-blue-600 dark:text-blue-400">const</span> <span className="text-foreground">client</span> <span className="text-muted-foreground">= await</span> <span className="text-foreground">db</span><span className="text-muted-foreground">.</span><span className="text-green-600 dark:text-green-400">connect</span><span className="text-muted-foreground">();</span></p>
                  <p className="pl-4"><span className="text-purple-600 dark:text-purple-400">try</span> <span className="text-foreground">{`{`}</span></p>
                  <p className="pl-8"><span className="text-foreground">await client</span><span className="text-muted-foreground">.</span><span className="text-green-600 dark:text-green-400">query</span><span className="text-muted-foreground">('BEGIN');</span></p>
                  <p className="pl-8"><span className="text-blue-600 dark:text-blue-400">const</span> <span className="text-foreground">result</span> <span className="text-muted-foreground">= await</span> <span className="text-green-600 dark:text-green-400">fn</span><span className="text-muted-foreground">(client);</span></p>
                  <p className="pl-8"><span className="text-foreground">await client</span><span className="text-muted-foreground">.</span><span className="text-green-600 dark:text-green-400">query</span><span className="text-muted-foreground">('COMMIT');</span></p>
                  <p className="pl-8"><span className="text-purple-600 dark:text-purple-400">return</span> <span className="text-foreground">result</span><span className="text-muted-foreground">;</span></p>
                  <p className="pl-4"><span className="text-foreground">{`}`}</span></p>
                </div>
              </div>

              {/* AI Review Panel */}
              <div className="border-t border-surface-10 p-4 bg-gradient-to-r from-green-500/5 to-primary/5">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground text-xs font-medium mb-1">AI Review Complete</p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      ✅ Transaction isolation looks good. Consider adding <span className="text-yellow-600 dark:text-yellow-400">SERIALIZABLE</span> isolation level for concurrent writes. Missing error release for client pool.
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-green-600 dark:text-green-400 font-semibold">Score: 87/100</span>
                      <span className="text-[10px] text-muted-foreground">2 suggestions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating tech badges */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {techBadges.map(badge => (
                <Badge key={badge} variant="secondary" className="text-xs bg-surface-5 text-muted-foreground/60 border-surface-10">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}