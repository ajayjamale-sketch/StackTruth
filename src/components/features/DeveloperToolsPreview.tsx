import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, User } from 'lucide-react';

const messages = [
  {
    role: 'user',
    content: 'How do I prevent memory leaks in a Node.js service that processes real-time WebSocket data?',
  },
  {
    role: 'community',
    content: `Great question. Here are the key strategies:

1. **Cleanup event listeners** — always remove listeners in your close handler
2. **Use WeakMap/WeakSet** for storing connection references
3. **Implement connection timeouts** with heartbeat checks
4. **Monitor heap usage** with \`process.memoryUsage()\`

\`\`\`typescript
// Example cleanup pattern
wss.on('connection', (ws) => {
  const cleanup = () => {
    ws.removeAllListeners();
    connections.delete(ws);
  };
  ws.on('close', cleanup);
  ws.on('error', cleanup);
});
\`\`\``,
  },
];

export default function DeveloperToolsPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column – text & CTA */}
          <div>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              Developer Tools
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">
              Get expert answers
              <br />
              <span className="text-gradient">from your community</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Ask technical questions and get solutions from experienced developers. Share knowledge, solve problems together, and build faster with collective expertise.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                'Code Review',
                'Technical Q&A',
                'Architecture Patterns',
                'Best Practices',
                'Debugging Tips',
                'Performance Insights',
              ].map(cap => (
                <Badge key={cap} variant="secondary" className="text-xs">
                  {cap}
                </Badge>
              ))}
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/questions">
                Explore Questions <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Right column – chat preview */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold">Community Q&A</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Active · Trusted experts
                </p>
              </div>
              <Badge className="ml-auto text-xs bg-accent/10 text-accent border-accent/20">
                Verified
              </Badge>
            </div>

            <div className="p-5 space-y-4 max-h-80 overflow-y-auto">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      msg.role === 'community' ? 'bg-primary/20' : 'bg-muted'
                    }`}
                    aria-hidden="true"
                  >
                    {msg.role === 'community' ? (
                      <MessageSquare className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                    )}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-muted text-foreground rounded-tl-sm'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap text-xs">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask your question..."
                  className="flex-1 px-3 py-2 text-xs bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  readOnly
                  aria-label="Demo question input (read-only)"
                />
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90 h-9">
                  <Link to="/questions">Ask</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}