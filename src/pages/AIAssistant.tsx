// AIAssistant.tsx (optimized, no team section)
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardPageWrapper from '@/components/layout/DashboardPageWrapper';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  MessageSquare, User, Send, Copy, ThumbsUp, ThumbsDown, 
  RotateCcw, Zap, Code2, Bug, Settings2, Layers 
} from 'lucide-react';

const suggestions = [
  'How do I prevent memory leaks in Node.js WebSocket connections?',
  'Explain CQRS pattern with TypeScript example',
  'What are the best practices for PostgreSQL indexing?',
  'How to implement JWT refresh tokens securely?',
  'Explain the difference between async generators and observables',
];

const features = [
  { icon: Bug, label: 'Bug Detection', desc: 'Identify root causes fast' },
  { icon: Code2, label: 'Code Optimization', desc: 'Performance improvements' },
  { icon: Layers, label: 'Architecture', desc: 'System design advice' },
  { icon: Settings2, label: 'Tech Stack', desc: 'Best tool recommendations' },
];

interface Message {
  role: 'user' | 'ai';
  content: string;
  id: string;
}

const initialMessages: Message[] = [
  {
    role: 'ai',
    id: '0',
    content: `Welcome to StackTruth Developer Resources.

Get expert guidance on:
• **Debugging tips** from experienced engineers
• **Code patterns** and best practices
• **Architecture design** guidance
• **Tech stack recommendations**
• **Performance optimization** strategies

What technical challenge are you facing?`,
  },
];

// Simulated AI response (replace with real API call)
const getAIResponse = async (userMessage: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay

  if (userMessage.toLowerCase().includes('memory')) {
    return `Great question about memory leaks! Here are the key patterns:

\`\`\`typescript
// ✅ Proper cleanup pattern
class WSService {
  private connections = new Set<WebSocket>();

  addConnection(ws: WebSocket) {
    this.connections.add(ws);
    ws.on('close', () => this.connections.delete(ws));
    ws.on('error', () => {
      this.connections.delete(ws);
      ws.terminate();
    });
  }
}
\`\`\`

**Key principles:**
1. Always remove event listeners on close
2. Use \`Set\` not \`Map\` for connection tracking
3. Call \`ws.terminate()\` not just \`ws.close()\` on error
4. Implement heartbeat intervals with cleanup`;
  }

  return `Here's my analysis based on your question:

**Understanding the Problem**  
${userMessage}

This is a common challenge in production environments. Let me break it down:

1. **Root Cause** — Typically stems from improper resource cleanup
2. **Solution Pattern** — Use structured error handling with proper teardown
3. **Best Practice** — Always implement cleanup functions in finally blocks

\`\`\`typescript
// Recommended pattern
async function withResource<T>(fn: () => Promise<T>): Promise<T> {
  const resource = await acquire();
  try {
    return await fn();
  } finally {
    await resource.release();
  }
}
\`\`\`

Would you like me to go deeper on any specific aspect?`;
};

export default function AIAssistant() {
  useScrollToTop();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || loading) return;

    const userMsg: Message = {
      role: 'user',
      content: content.trim(),
      id: Date.now().toString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const aiContent = await getAIResponse(content);
      const aiMsg: Message = {
        role: 'ai',
        content: aiContent,
        id: (Date.now() + 1).toString(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      toast.error('Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages(initialMessages);
    toast.success('Chat cleared');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <DashboardPageWrapper activeTab="ai">
      <ScrollToTop />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 pb-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-72 space-y-4 flex-shrink-0">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Developer Guidance</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Powered by community expertise
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {features.map(feature => {
                const Icon = feature.icon;
                return (
                  <div key={feature.label} className="bg-muted rounded-lg p-2.5 text-center">
                    <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="text-xs font-medium">{feature.label}</p>
                    <p className="text-[10px] text-muted-foreground">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
              Quick Prompts
            </h3>
            <div className="space-y-1.5">
              {suggestions.map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="w-full text-left text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-2.5 py-2 transition-colors leading-relaxed"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-2">Usage</h3>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Messages today</span>
              <span className="font-medium">12 / 100</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full">
              <div className="h-full bg-primary rounded-full" style={{ width: '12%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">Resets midnight UTC</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">Expert Guidance</span>
              <Badge className="text-xs bg-accent/10 text-accent border-accent/20">Community</Badge>
            </div>
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> New Chat
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5" style={{ minHeight: 0, maxHeight: 'calc(100vh - 280px)' }}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  msg.role === 'ai' ? 'bg-gradient-to-br from-primary to-blue-600' : 'bg-primary/20'
                }`}>
                  {msg.role === 'ai' ? <MessageSquare className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-primary" />}
                </div>
                <div className={`max-w-[80%] group ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-tr-sm'
                      : 'bg-muted text-foreground rounded-tl-sm'
                  }`}>
                    <pre className="whitespace-pre-wrap font-sans text-sm">{msg.content}</pre>
                  </div>
                  {msg.role === 'ai' && (
                    <div className="flex items-center gap-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => copyToClipboard(msg.content)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                      <button onClick={() => toast.success('Thanks for the feedback!')} className="text-xs text-muted-foreground hover:text-foreground">
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button onClick={() => toast.success('Feedback submitted')} className="text-xs text-muted-foreground hover:text-foreground">
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted rounded-xl px-4 py-3">
                  <div className="flex gap-1.5 items-center h-5">
                    {[0, 1, 2].map(i => (
                      <span key={i} className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Ask about code, architecture, debugging, best practices..."
                className="flex-1 px-4 py-2.5 text-sm bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                disabled={loading}
              />
              <Button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} className="bg-primary hover:bg-primary/90 px-4">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Always verify solutions against your specific requirements before implementation.
            </p>
          </div>
        </div>
      </div>
    </DashboardPageWrapper>
  );
}