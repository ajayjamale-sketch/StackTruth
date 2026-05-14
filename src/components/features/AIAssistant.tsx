import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Minimize2, Maximize2, Code2, Lightbulb, Zap, RotateCcw } from "lucide-react";
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
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "👋 Hi! I'm the **StackTruth AI Assistant**, powered by advanced code analysis.\n\nI can help you with:\n- 🐛 Bug detection & fixing\n- ⚡ Code optimization\n- 🔒 Security analysis\n- 💡 Best practice recommendations\n- 🏗️ Architecture suggestions\n\nWhat are you working on?",
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

    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

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
      if (line.startsWith("- ") || line.match(/^\d+\./)) {
        return <p key={i} className="text-sm leading-relaxed pl-2">{line}</p>;
      }
      if (line.startsWith("#")) {
        return <p key={i} className="text-sm font-bold text-white">{line.replace(/^#+\s/, "")}</p>;
      }
      return line ? <p key={i} className="text-sm leading-relaxed">{line}</p> : <br key={i} />;
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="floating-widget w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all hover:scale-110 active:scale-95"
      >
        <Bot className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse" />
      </button>
    );
  }

  return (
    <div
      className={`floating-widget flex flex-col bg-slate-900 border border-border rounded-2xl shadow-2xl shadow-black/50 overflow-hidden transition-all duration-300 ${
        isMinimized ? "w-72 h-12" : "w-80 sm:w-96 h-[520px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/10 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">AI Assistant</p>
            <p className="text-[10px] text-green-400">● Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMessages([messages[0]])}
            className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white/5 border border-border text-slate-300"
                  }`}
                >
                  <div className="space-y-1">
                    {renderContent(msg.content)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-white/5 border border-border rounded-xl px-3 py-2">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((qp) => (
                <button
                  key={qp.label}
                  onClick={() => sendMessage(qp.prompt)}
                  className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-border rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:text-white transition-all flex-shrink-0"
                >
                  <qp.icon className="w-3 h-3" />
                  {qp.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border flex-shrink-0">
            <div className="flex items-end gap-2 bg-white/5 border border-border rounded-xl px-3 py-2 focus-within:border-blue-500 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about bugs, code review, optimization..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 resize-none focus:outline-none max-h-20"
                rows={1}
                style={{ height: "auto", minHeight: "20px" }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="p-1.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <p className="text-[10px] text-slate-700 mt-1.5 text-center">Shift+Enter for new line</p>
          </div>
        </>
      )}
    </div>
  );
}
