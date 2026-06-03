import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, LayoutDashboard, BarChart3, GitBranch, MessageSquare, Award, Bot } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <section className="py-24 section-dark relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.1),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/20 text-blue-600 dark:text-blue-300 border border-primary/30">
            Dashboard Preview
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your developer command center
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Track your growth, manage questions, run code reviews, and collaborate with your team — all from a single beautiful dashboard.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="bg-card/90 border border-surface-10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Topbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-surface-10">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-muted-foreground text-xs">StackTruth Dashboard</span>
            </div>
            <div className="flex gap-2">
              {['Overview', 'Questions', 'Reviews', 'AI'].map(tab => (
                <button
                  key={tab}
                  type="button"
                  className={`text-xs px-2.5 py-1 rounded-lg ${
                    tab === 'Overview'
                      ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-40 border-r border-surface-10 p-3 space-y-1 hidden md:block flex-shrink-0">
              {[
                { icon: LayoutDashboard, label: 'Overview', active: true },
                { icon: MessageSquare, label: 'Questions', active: false },
                { icon: GitBranch, label: 'Reviews', active: false },
                { icon: Bot, label: 'AI Assistant', active: false },
                { icon: BarChart3, label: 'Analytics', active: false },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs ${
                      item.active
                        ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    {item.label}
                  </div>
                );
              })}
            </div>

            {/* Main content */}
            <div className="flex-1 p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Reputation', value: '4,820', color: 'text-blue-600 dark:text-blue-400' },
                  { label: 'Questions', value: '47', color: 'text-purple-600 dark:text-purple-400' },
                  { label: 'Answers', value: '183', color: 'text-green-600 dark:text-green-400' },
                  { label: 'Reviews', value: '92', color: 'text-yellow-600 dark:text-yellow-400' },
                ].map(stat => (
                  <div key={stat.label} className="bg-surface-5 border border-surface-10 rounded-xl p-3">
                    <p className="text-muted-foreground/40 text-xs mb-1">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-surface-5 border border-surface-10 rounded-xl p-4">
                <p className="text-muted-foreground/60 text-xs font-semibold mb-3">Recent Questions</p>
                {[
                  'How to handle concurrent PostgreSQL transactions with TypeScript?',
                  'Memory leak in React useEffect with WebSocket connections',
                ].map((question, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 py-2 border-b border-surface-10 last:border-0"
                  >
                    <div
                      className="w-6 h-6 rounded bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold flex-shrink-0"
                      aria-hidden="true"
                    >
                      {42 - idx * 11}
                    </div>
                    <p className="text-muted-foreground text-xs truncate">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button asChild className="bg-primary hover:bg-primary/90 btn-glow">
            <Link to="/register">
              Access Your Dashboard <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}