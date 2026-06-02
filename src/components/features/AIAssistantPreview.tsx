import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, User, Copy, ThumbsUp } from 'lucide-react';

const messages = [
  {
    role: 'user',
    content: 'How do I prevent memory leaks in a Node.js service that processes real-time WebSocket data?',
  },
  {
    role: 'ai',
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

export default function AIAssistantPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">AI Developer Assistant</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">
              Your AI pair programmer
              <br />
              <span className="text-gradient">that knows your stack</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Not just a generic chatbot. StackTruth AI understands your technology stack, architecture decisions, and coding style to give you deeply relevant, actionable answers.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Bug Detection', 'Code Optimization', 'Architecture Advice', 'Stack Recommendations', 'Security Audits', 'Performance Analysis'].map(cap => (
                <Badge key={cap} variant="secondary" className="text-xs">{cap}</Badge>
              ))}
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/ai-assistant">Try AI Assistant <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>

          {/* Chat Preview */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">StackTruth AI</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Online · GPT-4o powered
                </p>
              </div>
              <Badge className="ml-auto text-xs bg-accent/10 text-accent border-accent/20">Pro</Badge>
            </div>

            <div className="p-5 space-y-4 max-h-80 overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    msg.role === 'ai' ? 'bg-gradient-brand' : 'bg-primary/20'
                  }`}>
                    {msg.role === 'ai' ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-primary" />}
                  </div>
                  <div className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-tr-sm'
                      : 'bg-muted text-foreground rounded-tl-sm'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap text-xs">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask anything about your code..."
                  className="flex-1 px-3 py-2 text-xs bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  readOnly
                />
                <Link to="/ai-assistant">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 h-9">Ask</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
