import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Filter, ThumbsUp, MessageSquare, Eye, CheckCircle, TrendingUp, Clock, Flame, Plus, Tag, Award, BookmarkPlus } from "lucide-react";
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
  { label: "Most Voted", icon: ThumbsUp },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function QuestionCard({ question }: { question: Question }) {
  const { success } = useToast();
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [voteCount, setVoteCount] = useState(question.votes);
  const [saved, setSaved] = useState(false);

  const handleVote = (dir: "up" | "down") => {
    if (voted === dir) {
      setVoted(null);
      setVoteCount(question.votes);
    } else {
      setVoted(dir);
      setVoteCount(question.votes + (dir === "up" ? 1 : -1));
    }
  };

  return (
    <div className="glass-card-hover p-5 group">
      <div className="flex items-start gap-4">
        {/* Vote */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <button
            onClick={() => handleVote("up")}
            className={`p-1.5 rounded-lg transition-all ${voted === "up" ? "text-green-400 bg-green-500/10" : "text-slate-500 hover:text-green-400 hover:bg-green-500/10"}`}
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <span className={`text-sm font-bold ${voted === "up" ? "text-green-400" : voted === "down" ? "text-red-400" : "text-slate-300"}`}>
            {voteCount}
          </span>
          <button
            onClick={() => handleVote("down")}
            className={`p-1.5 rounded-lg transition-all rotate-180 ${voted === "down" ? "text-red-400 bg-red-500/10" : "text-slate-500 hover:text-red-400 hover:bg-red-500/10"}`}
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <Link to={`/questions/${question.id}`} className="text-base font-semibold text-white hover:text-blue-400 transition-colors leading-snug line-clamp-2 flex-1">
              {question.title}
            </Link>
            {question.bounty && (
              <span className="flex-shrink-0 flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-2 py-1 rounded-lg">
                <Award className="w-3 h-3" />+{question.bounty}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 line-clamp-2 mb-3">{question.body}</p>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex flex-wrap gap-1.5">
              {question.tags.map((tag) => (
                <span key={tag} className="tag-badge">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 flex-shrink-0">
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{question.views.toLocaleString()}</span>
              <div className={`flex items-center gap-1 font-medium ${question.isAnswered ? "text-green-400" : "text-slate-500"}`}>
                <MessageSquare className="w-3.5 h-3.5" />
                {question.answers} {question.isAnswered && <CheckCircle className="w-3 h-3" />}
              </div>
              <button onClick={() => { setSaved(!saved); success(saved ? "Removed from saved" : "Saved!", ""); }}>
                <BookmarkPlus className={`w-3.5 h-3.5 transition-colors ${saved ? "text-blue-400" : "hover:text-blue-400"}`} />
              </button>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
            <img src={question.author.avatar} alt={question.author.name} className="w-5 h-5 rounded-full bg-slate-700" />
            <span className="text-xs text-slate-500">
              <span className="text-slate-400 font-medium">{question.author.name}</span>
              {" "}asked {timeAgo(question.createdAt)}
            </span>
            <span className="text-xs text-amber-400 font-medium ml-auto">{question.author.reputation.toLocaleString()} rep</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuestionsPage() {
  const { isAuthenticated } = useAuth();
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
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Questions</h1>
          <p className="text-slate-400 text-sm mt-1">{MOCK_QUESTIONS.length} questions · {MOCK_QUESTIONS.filter(q => q.isAnswered).length} answered</p>
        </div>
        {isAuthenticated && (
          <button onClick={() => setShowAsk(true)} className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Ask Question
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="w-full bg-white/5 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex gap-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setSort(opt.label)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${sort === opt.label ? "bg-blue-600 text-white" : "bg-white/5 border border-border text-slate-400 hover:text-white"}`}
                >
                  <opt.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:block">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${filter === f ? "bg-blue-600 text-white" : "bg-white/5 border border-border text-slate-400 hover:text-white"}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="space-y-3">
            {isLoading
              ? [1, 2, 3].map((i) => <QuestionSkeleton key={i} />)
              : filtered.length > 0
              ? filtered.map((q) => <QuestionCard key={q.id} question={q} />)
              : (
                <div className="glass-card p-12 text-center">
                  <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-white font-semibold mb-2">No questions found</p>
                  <p className="text-slate-500 text-sm mb-4">Be the first to ask this question!</p>
                  {isAuthenticated && <button onClick={() => setShowAsk(true)} className="btn-primary">Ask Question</button>}
                </div>
              )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Featured tags */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Tag className="w-4 h-4 text-blue-400" />Popular Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {TECH_TAGS.slice(0, 16).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`tag-badge ${selectedTag === tag ? "bg-blue-500/20 border-blue-400" : ""}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-white mb-3">Community Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Questions", value: "18,421" },
                { label: "Answers", value: "89,342" },
                { label: "Users", value: "48,291" },
                { label: "Tags", value: "1,892" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{stat.label}</span>
                  <span className="text-xs font-bold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hot questions */}
          <div className="glass-card p-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Flame className="w-4 h-4 text-orange-400" />Hot Today</h3>
            <div className="space-y-2">
              {MOCK_QUESTIONS.slice(0, 4).map((q) => (
                <Link key={q.id} to={`/questions/${q.id}`} className="block text-xs text-slate-400 hover:text-blue-400 transition-colors line-clamp-2 leading-relaxed">
                  {q.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showAsk && <AskQuestionModal onClose={() => setShowAsk(false)} />}
    </div>
  );
}
