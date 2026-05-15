import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate, useParams } from "react-router-dom";
import { Search, Filter, ThumbsUp, MessageSquare, Eye, CheckCircle, TrendingUp, Clock, Flame, Plus, Tag, Award, BookmarkPlus, ChevronUp, ChevronDown, Sparkles, Shield, Users, MessageCircle } from "lucide-react";
import { MOCK_QUESTIONS, TECH_TAGS } from "@/constants/mockData";
import { QuestionSkeleton } from "@/components/ui/SkeletonLoader";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import type { Question } from "@/types";
import AskQuestionModal from "@/components/features/AskQuestionModal";

const FILTERS = ["All", "Unanswered", "Featured", "Bounty", "Week", "Month"];
const SORT_OPTIONS = [
  { label: "Newest", icon: Clock },
  { label: "Trending", icon: TrendingUp },
  { label: "Hot", icon: Flame },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function QuestionCard({ question }: { question: Question }) {
  const { success } = useToast();
  const [voteCount, setVoteCount] = useState(question.votes);
  const [voted, setVoted] = useState<number>(0);

  const handleVote = (dir: number) => {
    if (voted === dir) {
      setVoted(0);
      setVoteCount(question.votes);
    } else {
      setVoted(dir);
      setVoteCount(question.votes + dir);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-xl hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] dark:hover:shadow-primary/5 transition-all duration-500 group relative overflow-hidden">
      <div className="flex items-start gap-10">
        {/* Vote Counter - Ultra Clean */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0 bg-slate-100/50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 transition-all duration-500 group-hover:border-primary/20 group-hover:bg-primary/5">
          <button 
            onClick={() => handleVote(1)}
            className={`p-1.5 rounded-xl hover:bg-primary/10 transition-colors ${voted === 1 ? 'text-primary' : 'text-slate-300'}`}
          >
            <ChevronUp className="w-8 h-8" />
          </button>
          <span className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">{voteCount}</span>
          <button 
             onClick={() => handleVote(-1)}
             className={`p-1.5 rounded-xl hover:bg-primary/10 transition-colors ${voted === -1 ? 'text-primary' : 'text-slate-300'}`}
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>

        {/* Question Content */}
        <div className="flex-1 min-w-0 space-y-6">
          <div className="flex items-start justify-between gap-6">
            <Link to={`/questions/${question.id}`} className="text-2xl font-black text-slate-950 dark:text-white hover:text-primary transition-colors leading-[1.1] tracking-tighter line-clamp-2">
              {question.title}
            </Link>
            {question.bounty && (
              <span className="flex-shrink-0 bg-amber-500 text-white text-[9px] font-black px-4 py-1.5 rounded-sm uppercase tracking-widest shadow-lg shadow-amber-500/20">
                +{question.bounty} Bounty
              </span>
            )}
          </div>
          
          <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium tracking-tight">{question.body}</p>

          <div className="flex flex-wrap gap-2.5">
            {question.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 rounded-md border border-slate-100 dark:border-slate-800 group-hover:border-primary/20 transition-all">{tag}</span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-800 mt-6 gap-6">
            <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Eye className="w-4 h-4 text-primary" />{question.views.toLocaleString()} Index</span>
              <span className={`flex items-center gap-2 ${question.isAnswered ? 'text-primary' : ''}`}>
                <MessageSquare className="w-4 h-4" /> {question.answers} Protocols
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs font-black text-slate-900 dark:text-slate-200 leading-none">@{question.author.username}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{timeAgo(question.createdAt)}</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center text-primary font-black text-sm border border-primary/10">
                {question.author.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuestionsPage() {
  const { isAuthenticated } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [showAsk, setShowAsk] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => { setTimeout(() => setIsLoading(false), 800); }, []);

  const filtered = MOCK_QUESTIONS.filter((q) => {
    if (filter === "Unanswered") return !q.isAnswered;
    if (filter === "Featured") return q.isFeatured;
    if (filter === "Bounty") return !!q.bounty;
    return true;
  }).filter((q) => {
    if (search) return q.title.toLowerCase().includes(search.toLowerCase()) || q.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    if (selectedTag) return q.tags.includes(selectedTag);
    return true;
  }).sort((a, b) => {
    if (sort === "Newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === "Trending") return b.views - a.views;
    if (sort === "Hot") return b.votes - a.votes;
    return 0;
  });

  const selectedQuestion = id ? MOCK_QUESTIONS.find(q => q.id === id) : null;

  if (selectedQuestion) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <button 
          onClick={() => navigate("/questions")}
          className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-primary transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Registry
        </button>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-12 rounded-xl shadow-2xl space-y-8 relative overflow-hidden">
               <div className="absolute inset-0 grid-pattern opacity-5" />
               <div className="relative z-10 space-y-6">
                 <div className="flex flex-wrap gap-4 items-center justify-between">
                   <div className="flex gap-2">
                     {selectedQuestion.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-md border border-primary/10">{tag}</span>
                     ))}
                   </div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <Clock className="w-4 h-4" /> {timeAgo(selectedQuestion.createdAt)}
                   </span>
                 </div>
                 <h1 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter leading-tight">
                   {selectedQuestion.title}
                 </h1>
                 <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {selectedQuestion.body}
                    </p>
                 </div>
                 <div className="pt-10 border-t border-slate-50 dark:border-slate-800 flex flex-wrap gap-6 items-center justify-between">
                    <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-2"><Eye className="w-4 h-4 text-primary" />{selectedQuestion.views.toLocaleString()} Index</span>
                       <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" />{selectedQuestion.answers} Protocols</span>
                    </div>
                    <button 
                      onClick={() => navigate("/live-coding")}
                      className="bg-primary text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-xl active:scale-95"
                    >
                      Solve Challenge
                    </button>
                 </div>
               </div>
            </div>

            <div className="space-y-8">
               <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter">Community Responses ({selectedQuestion.answers})</h3>
               {[1, 2].map(i => (
                 <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-xl space-y-6 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                       <CheckCircle className="w-6 h-6 text-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-primary font-black">E</div>
                       <div>
                          <p className="text-sm font-black text-slate-950 dark:text-white leading-none">Expert_Auditor_{i}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Reputation: 12.4k</p>
                       </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                       Verified solution protocol for this challenge. Implementation involves optimizing the O(n) traversal using an atomic coordinate registry...
                    </p>
                    <div className="flex gap-4">
                       <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
                          <ThumbsUp className="w-4 h-4" /> Helpful (24)
                       </button>
                       <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
                          <MessageSquare className="w-4 h-4" /> Comment
                       </button>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-10">
             <div className="bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-white p-10 rounded-xl space-y-8 relative overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl">
                <div className="absolute inset-0 grid-pattern opacity-10" />
                <h3 className="text-2xl font-black tracking-tighter relative z-10 text-slate-950 dark:text-white">Audit Metadata</h3>
                <div className="space-y-6 relative z-10">
                   {[
                     { label: "Difficulty", value: "Level 4 (Elite)", color: "text-amber-500" },
                     { label: "Success Rate", value: "24.5%", color: "text-emerald-500" },
                     { label: "Audit Nodes", value: "128 Active", color: "text-blue-500" },
                   ].map(stat => (
                     <div key={stat.label} className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                        <span className={`text-sm font-black ${stat.color}`}>{stat.value}</span>
                     </div>
                   ))}
                </div>
                <div className="pt-8 border-t border-slate-200 dark:border-white/10 relative z-10">
                   <button 
                     onClick={() => success("Audit report downloaded to local node.")}
                     className="w-full bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 py-4 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-white/20 transition-all active:scale-95 shadow-sm"
                   >
                     Download Report
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-32 py-12">
      {/* 1. Discussion Hub Header */}
      <section className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-16 rounded-xl shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10">
              <MessageCircle className="w-4 h-4" /> Global Discussion Hub
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">The Technical <br /> <span className="text-primary">Audits</span></h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight">Explore community-verified solutions and architectural audits for complex engineering challenges.</p>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-6">
            <div className="flex gap-4">
               <div className="bg-slate-100/50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-100 dark:border-slate-800 text-center w-32">
                 <p className="text-3xl font-black text-slate-950 dark:text-white">{MOCK_QUESTIONS.length}</p>
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Audits</p>
               </div>
            </div>
            {isAuthenticated && (
              <button onClick={() => setShowAsk(true)} className="w-full bg-primary text-white font-black px-10 py-5 rounded-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-2xl active:scale-95">
                <Plus className="w-6 h-6" /> Initiate New Audit
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Trending Topics Grid */}
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
             <Tag className="w-5 h-5 text-primary" /> Technical Disciplines
          </h2>
          <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 mx-8" />
          <button 
            onClick={() => { setSelectedTag(null); setFilter("All"); setSort("Newest"); setSearch(""); }}
            className="text-primary font-black uppercase tracking-widest text-[10px] border-b-2 border-primary pb-1 active:scale-95 transition-all"
          >
            Reset All
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {TECH_TAGS.slice(0, 15).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${selectedTag === tag ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-primary hover:-translate-y-1'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Main Discussion Feed & Search Section */}
      <section className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-12">
          {/* Advanced Search & Sorting */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-xl shadow-xl flex flex-col xl:flex-row gap-6 items-center relative overflow-hidden">
             <div className="absolute inset-0 grid-pattern opacity-5" />
             <div className="relative flex-1 w-full group">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
               <input
                 type="text"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search protocols by keyword, tag, or contributor..."
                 className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-lg pl-16 pr-6 py-5 text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-sm text-foreground placeholder:text-slate-400"
               />
             </div>
             <div className="flex gap-3 w-full xl:w-auto p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
               {SORT_OPTIONS.map((opt) => (
                 <button
                   key={opt.label}
                   onClick={() => setSort(opt.label)}
                   className={`flex-1 xl:flex-none px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${sort === opt.label ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xl' : 'text-slate-500 hover:text-primary'}`}
                 >
                   {opt.label}
                 </button>
               ))}
             </div>
          </div>

          {/* Discussion Registry */}
          <div className="space-y-8">
            {isLoading
              ? [1, 2, 3].map((i) => <QuestionSkeleton key={i} />)
              : filtered.length > 0
              ? filtered.map((q) => <QuestionCard key={q.id} question={q} />)
              : (
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-32 text-center rounded-xl shadow-sm">
                  <MessageCircle className="w-24 h-24 text-slate-100 dark:text-slate-800 mx-auto mb-8 animate-pulse" />
                  <h3 className="text-2xl font-black text-slate-950 dark:text-white mb-4">No matching audits</h3>
                  <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto">Our registry couldn't find any discussions matching your current search parameters.</p>
                  {isAuthenticated && <button onClick={() => setShowAsk(true)} className="mt-8 bg-primary text-white px-12 py-5 rounded-lg font-black uppercase tracking-widest shadow-xl">Initiate New Audit</button>}
                </div>
              )}
          </div>
        </div>

        {/* Sidebar Intelligence */}
        <div className="lg:col-span-4 space-y-12">
          {/* Community Stats Section (4) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-xl shadow-xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full" />
            <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter flex items-center gap-3 relative z-10">
              <TrendingUp className="w-6 h-6 text-primary" />
              Community Momentum
            </h3>
            <div className="space-y-8 relative z-10">
               {[
                 { label: "Active Auditors", value: "2.4k", color: "text-blue-500" },
                 { label: "Verified Solutions", value: "15k+", color: "text-emerald-500" },
                 { label: "Open Bounties", value: "$4.2k", color: "text-amber-500" },
               ].map(stat => (
                 <div key={stat.label} className="flex items-center justify-between">
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                   <p className={`text-2xl font-black ${stat.color} tracking-tighter`}>{stat.value}</p>
                 </div>
               ))}
            </div>
            <div className="pt-10 border-t border-slate-50 dark:border-slate-800">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Top Reputation Movers</p>
               <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                    <div 
                      key={i} 
                      onClick={() => success(`Opening profile for Expert_${i}...`)}
                      className="flex items-center justify-between group cursor-pointer active:scale-95 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary font-black text-[10px] group-hover:bg-primary group-hover:text-white transition-all">U</div>
                        <span className="text-sm font-black text-slate-900 dark:text-slate-200 group-hover:text-primary transition-colors">Expert_{i}</span>
                      </div>
                      <span className="text-[10px] font-black text-emerald-500">+{120 - i*10} PTS</span>
                    </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Audit Protocols Section (5) */}
          <div className="bg-white dark:bg-slate-950 rounded-xl p-10 border border-slate-100 dark:border-slate-800 space-y-8 relative overflow-hidden group">
             <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
             <Shield className="w-12 h-12 text-primary opacity-20 absolute top-10 right-10 group-hover:scale-125 transition-transform duration-700" />
             <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter relative z-10">Audit Protocols</h3>
             <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed relative z-10">Ensure all discussions maintain high technical fidelity by following our community-verified audit protocols.</p>
             <ul className="space-y-4 relative z-10">
               {[
                 "Cite verified documentation",
                 "Provide industrial context",
                 "Maintain technical objectivity",
                 "Verify solution protocols"
               ].map(rule => (
                 <li key={rule} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                   <CheckCircle className="w-4 h-4 text-primary" /> {rule}
                 </li>
               ))}
             </ul>
             <button 
               onClick={() => success("Guideline protocol opened. Please review carefully.")}
               className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-950 dark:text-white font-black py-4 rounded-lg text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all relative z-10 active:scale-95"
             >
               Read Guidelines
             </button>
          </div>
        </div>
      </section>

      {showAsk && <AskQuestionModal onClose={() => setShowAsk(false)} />}
    </div>
  );
}
