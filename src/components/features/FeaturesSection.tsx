import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, GitBranch, Bot, BookOpen, Users, Monitor, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Technical Q&A',
    desc: 'Ask questions with code snippets, markdown support, and syntax highlighting. Get answers from expert engineers.',
    href: '/questions',
    badge: 'Core Feature',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/20',
    hoverBorder: 'hover:border-blue-500/40',
  },
  {
    icon: GitBranch,
    title: 'Code Review Engine',
    desc: 'Submit code for AI-powered review. Get security scores, performance notes, and best practice recommendations.',
    href: '/code-review',
    badge: 'AI-Powered',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-500/15',
    border: 'border-green-500/20',
    hoverBorder: 'hover:border-green-500/40',
  },
  {
    icon: Bot,
    title: 'AI Assistant',
    desc: 'Context-aware coding assistant that understands your stack. Debug bugs, optimize code, get architecture advice.',
    href: '/ai-assistant',
    badge: 'GPT-4',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-500/15',
    border: 'border-purple-500/20',
    hoverBorder: 'hover:border-purple-500/40',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Base',
    desc: 'Curated tutorials, API documentation, and technical guides organized by language and framework.',
    href: '/knowledge-base',
    badge: '2.4M+ Resources',
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-500/15',
    border: 'border-yellow-500/20',
    hoverBorder: 'hover:border-yellow-500/40',
  },
  {
    icon: Users,
    title: 'Team Workspaces',
    desc: 'Private team environments with shared snippets, docs, task boards, and real-time discussions.',
    href: '/teams',
    badge: 'Pro',
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-500/15',
    border: 'border-pink-500/20',
    hoverBorder: 'hover:border-pink-500/40',
  },
  {
    icon: Monitor,
    title: 'Live Coding',
    desc: 'Real-time collaborative coding for pair programming, technical interviews, and execution sandbox.',
    href: '/live-coding',
    badge: 'Real-time',
    color: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-500/15',
    border: 'border-cyan-500/20',
    hoverBorder: 'hover:border-cyan-500/40',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/20 text-blue-600 dark:text-blue-300 border border-primary/30">Feature Showcase</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything a developer team needs
            <br />
            <span className="text-gradient">in one platform</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From asking your first question to conducting live technical interviews — StackTruth covers the entire developer workflow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => {
            const Icon = f.icon;
            return (
              <Link
                key={f.href}
                to={f.href}
                className={`group bg-surface-5 border ${f.border} ${f.hoverBorder} rounded-xl p-6 hover:bg-surface-8 transition-all cursor-pointer block`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${f.color}`} />
                  </div>
                  <Badge className="text-xs bg-surface-5 text-muted-foreground/60 border-surface-10">{f.badge}</Badge>
                </div>
                <h3 className="text-foreground font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{f.desc}</p>
                <div className={`flex items-center gap-1 text-sm font-medium ${f.color} group-hover:gap-2 transition-all`}>
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
