import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, Send, Code2, Lightbulb, Zap, RotateCcw, 
  Terminal, Shield, Cpu, Search, Sparkles, MessageSquare
} from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import type { AIMessage } from "@/types";

const AI_RESPONSES = [
  { trigger: "bug", response: "I've analyzed the code pattern. The issue appears to be a **race condition** in your async handler. Here's the fix:\n\n```javascript\nconst controller = new AbortController();\nconst signal = controller.signal;\n\nfetch(url, { signal })\n  .then(res => res.json())\n  .catch(err => {\n    if (err.name === 'AbortError') return; // Ignore aborted\n    throw err;\n  });\n\nreturn () => controller.abort(); // Cleanup\n```\n\nThis ensures only the latest request completes." },
  { trigger: "optimize", response: "Based on the code analysis, I found **3 optimization opportunities**:\n\n1. **Memoize expensive calculations** with `useMemo`\n2. **Lazy load** the heavy component tree\n3. **Virtualize** the long list using `react-window`\n\nEstimated performance gain: **~40% faster renders**" },
  { trigger: "react", response: "For React best practices in 2025:\n\n- Use **Server Components** for static content\n- Prefer **`useTransition`** for non-urgent updates\n- Implement **Suspense boundaries** thoughtfully\n- Use **`useDeferredValue`** for search inputs\n- Always provide **stable keys** for list items" },
  { trigger: "typescript", response: "Here are advanced TypeScript patterns:\n\n```typescript\n// Discriminated unions\ntype Result<T> =\n  | { status: 'success'; data: T }\n  | { status: 'error'; message: string };\n\n// Conditional types\ntype NonNullable<T> = T extends null | undefined ? never : T;\n\n// Template literal types\ntype EventName = `on${Capitalize<string>}`;\n```" },
  { trigger: "security", response: "**Security vulnerabilities detected:**\n\n🔴 **Critical**: SQL injection risk — use parameterized queries\n🟡 **Medium**: Missing CSRF token validation\n🟡 **Medium**: Sensitive data in localStorage\n🟢 **Low**: Missing Content-Security-Policy headers\n\nFix the critical issue immediately. I can generate secure code patterns for each." },
  { trigger: "default", response: "I'm analyzing your request... Here's what I found based on best practices and common patterns in modern development. Would you like me to:\n\n1. Generate specific code examples\n2. Explain the underlying concepts\n3. Review your existing code\n4. Suggest architectural improvements\n\nJust let me know and I'll dive deeper!" },
];

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  const match = AI_RESPONSES.find((r) => r.trigger !== "default" && lower.includes(r.trigger));
  return (match || AI_RESPONSES.find((r) => r.trigger === "default")!).response;
}

const QUICK_PROMPTS = [
  { icon: Code2, label: "Review my code", prompt: "Please review this code for bugs and improvements" },
  { icon: Lightbulb, label: "Optimize performance", prompt: "How can I optimize this for better performance?" },
  { icon: Zap, label: "Fix this bug", prompt: "I have a bug in my code, can you help debug it?" },
  { icon: Shield, label: "Security Audit", prompt: "Perform a security audit on this authentication logic" },
];

export default function AIAssistantPage() {
  const { success } = useToast();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "👋 Welcome to the **Neural Audit Lab**. I'm your StackTruth AI Auditor.\n\nI can perform deep-logic verification, security audits, and architectural optimizations. What technical protocol shall we examine today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1500));

    const aiMsg: AIMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(content),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("```")) return null;
      if (line.includes("**")) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-sm leading-relaxed">
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j} className="font-bold text-white">{part}</strong> : part
            )}
          </p>
        );
      }
      return line ? <p key={i} className="text-sm leading-relaxed">{line}</p> : <br key={i} />;
    });
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)] flex flex-col gap-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-md text-[10px] font-black uppercase tracking-widest border border-primary/20">
            <Sparkles className="w-4 h-4" /> Neural Auditor v4.0
          </div>
          <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">AI Assistant <span className="text-primary">Lab.</span></h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Real-time technical audit and logic verification protocols.</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => { setMessages([messages[0]]); success("Neural memory purged."); }}
             className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm active:scale-95"
           >
             <RotateCcw className="w-5 h-5" />
           </button>
           <button className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-xl active:scale-95">
             Export Audit
           </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" />
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 no-scrollbar relative z-10">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-6 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg ${msg.role === "assistant" ? "bg-primary text-white" : "bg-slate-950 text-white"}`}>
                {msg.role === "assistant" ? <Bot className="w-6 h-6" /> : <span className="font-black">U</span>}
              </div>
              <div className={`max-w-[80%] space-y-2 ${msg.role === "user" ? "text-right" : ""}`}>
                <div className={`rounded-2xl p-6 shadow-sm border ${msg.role === "user" ? "bg-primary text-white border-primary" : "bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300"}`}>
                   {renderContent(msg.content)}
                </div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{new Date(msg.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                <Bot className="w-6 h-6" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 flex gap-2 items-center">
                 <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                 <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                 <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="px-6 sm:px-10 pb-6 flex flex-wrap gap-4 relative z-10">
            {QUICK_PROMPTS.map((qp) => (
              <button
                key={qp.label}
                onClick={() => sendMessage(qp.prompt)}
                className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-6 py-4 rounded-xl text-sm font-black text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary hover:shadow-xl transition-all active:scale-95"
              >
                <qp.icon className="w-5 h-5" />
                {qp.label}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-6 sm:p-10 border-t border-slate-100 dark:border-slate-800 relative z-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
           <div className="relative flex items-end gap-4 bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl p-4 focus-within:border-primary transition-all shadow-inner">
             <textarea 
               ref={inputRef}
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Enter technical query for neural audit..."
               className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 resize-none outline-none py-2 px-4 font-medium"
               rows={1}
               style={{ minHeight: "40px", maxHeight: "200px" }}
             />
             <button 
               onClick={() => sendMessage(input)}
               disabled={!input.trim() || isTyping}
               className="bg-primary text-white p-4 rounded-xl hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-xl shadow-primary/20"
             >
               <Send className="w-6 h-6" />
             </button>
           </div>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mt-6 flex items-center justify-center gap-2">
             <Shield className="w-3 h-3" /> Secure E2E Encrypted Protocol Audit
           </p>
        </div>
      </div>

      {/* Lab Stats Sidebar/Bottom */}
      <div className="grid sm:grid-cols-3 gap-8">
         {[
           { icon: Terminal, label: "Logic Depth", value: "Level 8" },
           { icon: Cpu, label: "Neural Nodes", value: "1,240" },
           { icon: Search, label: "Audit Registry", value: "10k+ Docs" },
         ].map(stat => (
           <div key={stat.label} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-2xl flex items-center gap-6 shadow-sm">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary">
                 <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-xl font-black text-slate-950 dark:text-white tracking-tighter">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}
