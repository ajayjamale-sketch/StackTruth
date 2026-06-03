import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, MessageSquare, Code2, FileText, CheckSquare } from 'lucide-react';

export default function TeamCollabSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - text and features */}
          <div>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              Team Workspaces
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">
              Collaborate like the
              <br />
              <span className="text-gradient">best engineering teams</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Create private workspaces for your team. Share code snippets, review PRs, run async discussions, and manage engineering tasks — all in one focused environment.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: MessageSquare, label: 'Team Discussions' },
                { icon: Code2, label: 'Shared Snippets' },
                { icon: FileText, label: 'Collaborative Docs' },
                { icon: CheckSquare, label: 'Task Boards' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/teams">
                Explore Teams <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Right column - team workspace mockup */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-muted/50">
              <Users className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-semibold">Backend Team · 8 members</span>
              <Badge className="ml-auto text-xs bg-accent/10 text-accent border-accent/20">
                Active
              </Badge>
            </div>

            {/* Tabs (non-functional preview) */}
            <div className="flex border-b border-border">
              {['Discussions', 'Snippets', 'Docs', 'Tasks'].map((tab, idx) => (
                <button
                  key={tab}
                  type="button"
                  className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                    idx === 0
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {[
                {
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face',
                  name: 'Sarah',
                  time: '10m ago',
                  msg: 'Reviewed the new auth middleware. Found a potential timing attack in the token comparison. PR comment added.',
                },
                {
                  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
                  name: 'Marcus',
                  time: '25m ago',
                  msg: 'Pushed fix for the N+1 query in the user endpoint. Performance improved 3x in tests.',
                },
                {
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
                  name: 'Alex',
                  time: '1h ago',
                  msg: 'Created shared snippet for the Redis cache pattern we discussed. Check the snippets tab.',
                },
              ].map((message, idx) => (
                <div key={idx} className="flex gap-3">
                  <img
                    src={message.avatar}
                    alt={message.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 bg-muted rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold">{message.name}</span>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{message.msg}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input (preview only) */}
            <div className="px-4 pb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Send a message..."
                  className="flex-1 px-3 py-2 text-xs bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  readOnly
                  aria-label="Demo message input (read-only)"
                />
                <Button
                  size="sm"
                  className="h-8 bg-primary hover:bg-primary/90 text-xs"
                  onClick={() => {}} // No-op for preview
                  aria-label="Send button (demo)"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}