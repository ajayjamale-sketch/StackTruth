import React, { useState, useRef, useEffect, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bot, Send, Code2, RotateCcw, Terminal, Shield, Cpu, 
  Search, Sparkles, ChevronRight, Trophy, Crown, Layers, 
  Users, Target, Calendar, Award, Clipboard, Check
} from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { MOCK_LEADERBOARD } from "@/constants/mockData";
import type { AIMessage, LeaderboardEntry } from "@/types";

// ==========================================
// CONSTANTS & MOCK DATA REGISTRIES
// ==========================================
const PERIODS = ["All Time", "This Month", "This Week"];
const CATEGORIES = ["Overall", "Problem Solving", "Code Audits", "Contributions"];

const AI_RESPONSES = [
  { trigger: "bug", response: "I've analyzed the code pattern. The issue appears to be a **race condition** in your async handler. Here's the fix:\n\n```javascript\nconst controller = new AbortController();\nconst signal = controller.signal;\n\nfetch(url, { signal })\n  .then(res => res.json())\n  .catch(err => {\n    if (err.name === 'AbortError') return;\n    throw err;\n  });\n\nreturn () => controller.abort();\n```\n\nThis ensures only the latest request completes." },
  { trigger: "optimize", response: "Based on the code analysis, I found **3 optimization opportunities**:\n\n1. **Memoize expensive calculations** with `useMemo`\n2. **Lazy load** the heavy component tree\n3. **Virtualize** the long list using `react-window`\n\nEstimated performance gain: **~40% faster renders**" },
  { trigger: "react", response: "For React best practices in 2026:\n\n- Use **Server Components** for static content\n- Prefer **`useTransition`** for non-urgent updates\n- Implement **Suspense boundaries** thoughtfully\n- Use **`useDeferredValue`** for search inputs\n- Always provide **stable keys** for list items" },
  { trigger: "typescript", response: "Here are advanced TypeScript patterns:\n\n```typescript\ntype Result<T> =\n  | { status: 'success'; data: T }\n  | { status: 'error'; message: string };\n\ntype NonNullable<T> = T extends null | undefined ? never : T;\ntype EventName = `on${Capitalize<string>}`;\n```" },
  { trigger: "security", response: "**Security vulnerabilities detected:**\n\n🔴 **Critical**: SQL injection risk — use parameterized queries\n🟡 **Medium**: Missing CSRF token validation\n🟡 **Medium**: Sensitive data in localStorage\n\nFix the critical issue immediately." },
  { trigger: "default", response: "I'm analyzing your request... Here's what I found based on best practices and common patterns in modern development. Would you like me to generate specific code examples or suggest architectural improvements?" },
];

// ==========================================
// UTILITY FUNCTIONS & PARSERS
// ==========================================
function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  const match = AI_RESPONSES.find((r) => r.trigger !== "default" && lower.includes(r.trigger));
  return (match || AI_RESPONSES.find((r) => r.trigger === "default")!).response;
}

// ==========================================
// SUB-COMPONENTS
// ==========================================
const ChangeIndicator = memo(({ change }: { change: number }) => {
  if (change > 0) return <span className="flex items-center gap-1 text-primary text-xs font-black tracking-widest"><ChevronRight className="w-3 h-3 -rotate-90 text-emerald-500" />+{change}</span>;
  if (change < 0) return <span className="flex items-center gap-1 text-red-500 text-xs font-black tracking-widest"><ChevronRight className="w-3 h-3 rotate-90" />{change}</span>;
  return <span className="text-slate-400 text-xs font-bold">-</span>;
});
ChangeIndicator.displayName = "ChangeIndicator";

const CodeBlock = memo(({ code, lang }: { code: string; lang: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-md font-mono text-left">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[10px] uppercase font-black tracking-widest text-slate-400">
        <span>{lang || "code"}</span>
        <button onClick={handleCopy} className="hover:text-primary transition-colors p-1 flex items-center gap-1">
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Clipboard className="w-3 h-3" />}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs text-emerald-400 whitespace-pre leading-relaxed">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
});
CodeBlock.displayName = "CodeBlock";

const ContentRenderer = memo(({ content }: { content: string }) => {
  const parts = useMemo(() => content.split(/(```[\s\S]*?```)/g), [content]);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("```")) {
          const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
          const lang = match ? match[1]?.trim() : "source";
          const code = match ? match[2] : part.replace(/```/g, "");
          return <CodeBlock key={index} code={code} lang={lang || "source"} />;
        }

        return part.split("\n").map((line, lineIdx) => {
          if (!line.trim() && lineIdx !== 0) return <div key={`br-${lineIdx}`} className="h-2" />;
          const boldParts = line.split(/\*\*(.*?)\*\*/g);
          return (
            <p key={`line-${lineIdx}`} className="text-sm leading-relaxed mb-1 break-words">
              {boldParts.map((subPart, subIdx) => 
                subIdx % 2 === 1 ? <strong key={subIdx} className="font-extrabold text-slate-950 dark:text-white">{subPart}</strong> : subPart
              )}
            </p>
          );
        });
      })}
    </>
  );
});
ContentRenderer.displayName = "ContentRenderer";

const TopThreeCard = memo(({ entry, onClick }: { entry: LeaderboardEntry; onClick: (id: string) => void }) => {
  const isFirst = entry.rank === 1;
  return (
    <div 
      onClick={() => onClick(entry.user.id)}
      className={`flex flex-col items-center group cursor-pointer active:scale-95 transition-all ${isFirst ? "scale-110 lg:-translate-y-8" : "scale-95 translate-y-4"}`}
    >
      <div className="relative mb-6">
        {isFirst && <Crown className="w-10 h-10 text-amber-400 absolute -top-12 left-1/2 -translate-x-1/2 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] animate-pulse"/>}
        <div className={`w-28 h-28 rounded-xl flex items-center justify-center text-primary font-black text-3xl border-4 transition-all duration-500 group-hover:scale-105 ${isFirst ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md'}`}>
           {entry.user.name.charAt(0)}
        </div>
        <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black shadow-md border-4 border-white dark:border-slate-900 ${isFirst ? 'bg-primary text-lg' : entry.rank === 2 ? 'bg-slate-400' : 'bg-amber-700'}`}>
           {entry.rank}
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-lg font-black text-slate-950 dark:text-white tracking-tight truncate max-w-[140px]">{entry.user.name}</p>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[10px] font-black text-primary uppercase tracking-widest">{entry.score.toLocaleString()} PTS</span>
          <ChangeIndicator change={entry.change}/>
        </div>
      </div>
    </div>
  );
});
TopThreeCard.displayName = "TopThreeCard";

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export default function AIAssistantPage() {
  const { success } = useToast();
  const navigate = useNavigate();
  
  // Tab/View Toggle
  const [activeTab, setActiveTab] = useState<"leaderboard" | "ai_assistant">("leaderboard");

  // Leaderboard States
  const [period, setPeriod] = useState("All Time");
  const [category, setCategory] = useState("Overall");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // AI Assistant States
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "👋 Welcome to the **Neural Audit Lab**. I'm your StackTruth AI Auditor.\n\nWhat technical protocol shall we examine today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ------------------------------------------
  // LEADERBOARD PROCESSING PIPELINE (Memoized)
  // ------------------------------------------
  const sortedAndFiltered = useMemo(() => {
    return [...MOCK_LEADERBOARD]
      .filter(e => {
        const matchesSearch = !search || 
          e.user.name.toLowerCase().includes(search.toLowerCase()) || 
          e.user.username.toLowerCase().includes(search.toLowerCase());
        
        const matchesCategory = 
          category === "Overall" ||
          (category === "Problem Solving" && ((e.answers || 0) > 0 || (e.questions || 0) > 0)) ||
          (category === "Code Audits" && (e.codeReviews || 0) > 0) ||
          (category === "Contributions" && ((e.answers || 0) + (e.codeReviews || 0)) > 10);
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        let scoreA = category === "Problem Solving" ? (a.answers || 0) + (a.questions || 0)
                 : category === "Code Audits" ? (a.codeReviews || 0)
                 : category === "Contributions" ? (a.answers || 0) + (a.codeReviews || 0)
                 : a.score || 0;

        let scoreB = category === "Problem Solving" ? (b.answers || 0) + (b.questions || 0)
                 : category === "Code Audits" ? (b.codeReviews || 0)
                 : category === "Contributions" ? (b.answers || 0) + (b.codeReviews || 0)
                 : b.score || 0;

        if (period === "This Week") {
          scoreA = scoreA * 0.1 + (a.change || 0) * 100;
          scoreB = scoreB * 0.1 + (b.change || 0) * 100;
        } else if (period === "This Month") {
          scoreA = scoreA * 0.5 + (a.change || 0) * 50;
          scoreB = scoreB * 0.5 + (b.change || 0) * 50;
        }
        
        return scoreB === scoreA ? b.score - a.score : scoreB - scoreA;
      })
      .map((entry, index) => ({ ...entry, rank: index + 1 }));
  }, [period, category, search]);

  useEffect(() => { setCurrentPage(1); }, [period, category, search]);

  const totalPages = Math.ceil(sortedAndFiltered.length / itemsPerPage);
  const top3 = useMemo(() => sortedAndFiltered.slice(0, 3), [sortedAndFiltered]);
  const paginatedItems = useMemo(() => sortedAndFiltered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), [sortedAndFiltered, currentPage]);
  const tableRegistryItems = useMemo(() => paginatedItems.filter(item => !top3.some(t => t.user.id === item.user.id)), [paginatedItems, top3]);

  // ------------------------------------------
  // AI ASSISTANT EFFECTS & HANDLERS
  // ------------------------------------------
  useEffect(() => {
    if (activeTab === "ai_assistant") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, activeTab]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "40px";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(userMsg.content),
      timestamp: new Date().toISOString(),
    }]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-500">
      
      {/* Dynamic Module Selector Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 justify-between items-center pb-2">
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab("leaderboard")}
            className={`pb-3 text-sm font-black uppercase tracking-wider transition-all border-b-2 ${activeTab === "leaderboard" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"}`}
          >
            Contributor Leaderboard
          </button>
          <button 
            onClick={() => setActiveTab("ai_assistant")}
            className={`pb-3 text-sm font-black uppercase tracking-wider transition-all border-b-2 ${activeTab === "ai_assistant" ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600"}`}
          >
            AI Auditor Lab
          </button>
        </div>
        
        {activeTab === "ai_assistant" && (
          <button 
            onClick={() => { setMessages([messages[0]]); success("Neural memory purged."); }}
            className="p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:text-primary transition-all"
            title="Purge Memory"
          >
            <RotateCcw className="w-4 h-4"/>
          </button>
        )}
      </div>

      {/* ==========================================
          VIEW MODULE 1: GLOBAL LEADERBOARD
          ========================================== */}
      {activeTab === "leaderboard" && (
        <div className="space-y-16 animate-in fade-in duration-300">
          {/* Header Hero */}
          <section className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-md text-[10px] font-black uppercase tracking-widest">
                  <Trophy className="w-3 h-3 text-amber-500"/> Community Hall of Fame
                </div>
                <h1 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter leading-tight">Elite Contributor Rankings</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Recognizing the global elite running programmatic technical code protocol verifications.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800 text-center min-w-[120px]">
                   <Users className="w-6 h-6 text-primary mx-auto mb-2"/>
                   <p className="text-xl font-black text-slate-950 dark:text-white">48.2k+</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Experts</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800 text-center min-w-[120px]">
                   <Target className="w-6 h-6 text-emerald-500 mx-auto mb-2"/>
                   <p className="text-xl font-black text-slate-950 dark:text-white">1.2M+</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Audits</p>
                </div>
              </div>
            </div>
          </section>

          {/* Podium */}
          <section className="flex flex-col md:flex-row items-end justify-center gap-8 lg:gap-16 pt-6">
            {top3[1] && <TopThreeCard entry={top3[1]} onClick={(id) => navigate(`/profile/${id}`)} />}
            {top3[0] && <TopThreeCard entry={top3[0]} onClick={(id) => navigate(`/profile/${id}`)} />}
            {top3[2] && <TopThreeCard entry={top3[2]} onClick={(id) => navigate(`/profile/${id}`)} />}
          </section>

          {/* Controls Bar */}
          <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-md flex flex-col xl:flex-row gap-4 items-center">
             <div className="relative flex-1 w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
               <input 
                 value={search} 
                 onChange={e => setSearch(e.target.value)} 
                 placeholder="Search handles, reputations, or skill subsets..." 
                 className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
               />
             </div>
          </section>

          {/* Registry Table */}
          <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contributor</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reputation Score</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Momentum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {tableRegistryItems.length > 0 ? (
                    tableRegistryItems.map((entry) => (
                      <tr key={entry.user.id} onClick={() => navigate(`/profile/${entry.user.id}`)} className="group hover:bg-slate-50/30 dark:hover:bg-slate-800/20 cursor-pointer transition-colors">
                        <td className="p-6 font-black text-slate-400 group-hover:text-primary">#{entry.rank}</td>
                        <td className="p-6 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-primary">{entry.user.name.charAt(0)}</div>
                          <div>
                            <p className="font-black text-sm text-slate-950 dark:text-white group-hover:text-primary transition-colors">{entry.user.name}</p>
                            <p className="text-[9px] text-slate-400 font-mono">ST_{entry.user.id.slice(0, 6)}</p>
                          </div>
                        </td>
                        <td className="p-6 font-mono text-sm font-bold">{entry.score.toLocaleString()}</td>
                        <td className="p-6 text-right"><ChangeIndicator change={entry.change}/></td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} className="p-12 text-center text-sm text-slate-400 font-medium">No system records match filtered targets.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Page {currentPage} of {totalPages}</p>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 text-[10px] font-bold rounded-md border transition-all ${currentPage === i + 1 ? "bg-primary border-primary text-white" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400"}`}>{i + 1}</button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* ==========================================
          VIEW MODULE 2: AI AUDITOR LAB
          ========================================== */}
      {activeTab === "ai_assistant" && (
        <div className="h-[calc(100vh-14rem)] min-h-[450px] flex flex-col gap-4 animate-in fade-in duration-300">
          <div className="flex-1 min-h-0 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl flex flex-col overflow-hidden relative">
            
            {/* Scrollable Message History Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 max-w-3xl mx-auto ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm font-black text-sm ${msg.role === "assistant" ? "bg-primary text-white" : "bg-slate-900 dark:bg-slate-950 text-white"}`}>
                    {msg.role === "assistant" ? <Bot className="w-4 h-4"/> : "U"}
                  </div>
                  <div className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`rounded-xl px-4 py-3 shadow-sm border text-left text-slate-700 dark:text-slate-300 ${msg.role === "user" ? "bg-primary border-primary text-white" : "bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800/60"}`}>
                       <ContentRenderer content={msg.content}/>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 px-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 max-w-3xl mx-auto">
                  <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-sm"><Bot className="w-4 h-4"/></div>
                  <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 flex gap-1 items-center">
                     <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                     <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                     <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Action Tray */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0">
               <div className="relative flex items-end gap-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-2 max-w-3xl mx-auto focus-within:border-primary focus-within:bg-white dark:focus-within:bg-slate-950 transition-all">
                 <textarea 
                   ref={inputRef}
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                   placeholder="Verify execution architecture..."
                   className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 text-xs resize-none outline-none py-1.5 px-2 font-medium max-h-40 min-h-[32px] leading-relaxed"
                   rows={1}
                 />
                 <button 
                   onClick={handleSendMessage}
                   disabled={!input.trim() || isTyping}
                   className="bg-primary text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-md flex-shrink-0"
                 >
                   <Send className="w-4 h-4"/>
                 </button>
               </div>
               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest text-center mt-3 flex items-center justify-center gap-1"><Shield className="w-3 h-3 text-emerald-500"/> E2E Secure Neural Audit Channel</p>
            </div>
          </div>

          {/* Infrastructure Metrics Footnotes */}
          <div className="grid grid-cols-3 gap-3 flex-shrink-0 max-w-3xl w-full mx-auto">
             {[
               { icon: Terminal, label: "Audit Nodes", value: "1,240 Core Cluster" },
               { icon: Cpu, label: "Context Window", value: "Level 8 Verification" },
               { icon: Search, label: "Logic Depth", value: "Deep Analysis" }
             ].map(stat => (
               <div key={stat.label} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-3 rounded-xl flex items-center gap-3 shadow-sm min-w-0">
                  <div className="w-8 h-8 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary flex-shrink-0"><stat.icon className="w-4 h-4" /></div>
                  <div className="min-w-0"><p className="text-[8px] font-black text-slate-400 uppercase tracking-wider truncate">{stat.label}</p><p className="text-xs font-black text-slate-950 dark:text-white truncate">{stat.value}</p></div>
               </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
}