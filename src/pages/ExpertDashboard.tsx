import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Code2, BookOpen, Users, TrendingUp, Award, ArrowRight, CheckCircle, Clock, Zap, Play, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_CODE_REVIEWS, MOCK_QUESTIONS, MOCK_ANALYTICS } from "@/constants/mockData";
import { StatCardSkeleton } from "@/components/ui/SkeletonLoader";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const MENTOR_STATS = [
  { label: "Reputation", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", value: 12350 },
  { label: "Reviews Done", icon: Code2, color: "text-green-400", bg: "bg-green-500/10", value: 156 },
  { label: "Answers Given", icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/10", value: 420 },
  { label: "Devs Mentored", icon: Users, color: "text-purple-400", bg: "bg-purple-500/10", value: 48 },
];

const REVIEW_REQUESTS = [
  { id: 1, title: "React state management refactor", author: "Jordan Rivera", language: "TypeScript", urgency: "high", timeAgo: "2h ago" },
  { id: 2, title: "Database indexing strategy", author: "Emily Zhang", language: "SQL", urgency: "medium", timeAgo: "4h ago" },
  { id: 3, title: "REST API rate limiting", author: "David Kim", language: "Go", urgency: "low", timeAgo: "1d ago" },
];

const URGENCY_COLORS: Record<string, string> = {
  high: "text-red-400 bg-red-500/10 border-red-500/20",
  medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  low: "text-green-400 bg-green-500/10 border-green-500/20",
};

const IMPACT_DATA = [
  { month: "Jan", reviews: 12, answers: 34 },
  { month: "Feb", reviews: 18, answers: 42 },
  { month: "Mar", reviews: 15, answers: 38 },
  { month: "Apr", reviews: 22, answers: 58 },
  { month: "May", reviews: 28, answers: 67 },
];

export default function ExpertDashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { setTimeout(() => setIsLoading(false), 900); }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Expert Dashboard</h1>
            <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full">
              <Star className="w-3 h-3 fill-amber-400" /> VERIFIED EXPERT
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">Your community impact at a glance</p>
        </div>
        <div className="flex gap-3">
          <Link to="/live-coding" className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all">
            <Play className="w-4 h-4" /> Host Session
          </Link>
          <Link to="/knowledge" className="btn-primary text-sm px-4 py-2">Write Tutorial</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? MENTOR_STATS.map((_, i) => <StatCardSkeleton key={i} />) : MENTOR_STATS.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500">{stat.label}</span>
              <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white">{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Impact Chart */}
        <div className="lg:col-span-2 glass-card p-5">
          <h2 className="font-bold text-white mb-5">Community Impact</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={IMPACT_DATA} barGap={4}>
              <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              <Bar dataKey="reviews" fill="#22C55E" radius={[4, 4, 0, 0]} name="Code Reviews" />
              <Bar dataKey="answers" fill="#2563EB" radius={[4, 4, 0, 0]} name="Answers" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Expert Badges */}
        <div className="glass-card p-5">
          <h2 className="font-bold text-white mb-4">Expert Status</h2>
          <div className="space-y-3">
            {user?.badges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-border">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{badge.name}</p>
                  <p className="text-xs text-slate-500">{badge.description}</p>
                </div>
              </div>
            ))}
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl">
              <p className="text-xs font-bold text-blue-400">Next milestone</p>
              <p className="text-xs text-slate-500 mt-0.5">500 code reviews → Gold Reviewer badge</p>
              <div className="mt-2 h-1.5 bg-white/10 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "31%" }} />
              </div>
              <p className="text-[10px] text-slate-600 mt-1">156/500 reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Requests */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">Pending Review Requests</h2>
          <Link to="/code-review" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
        </div>
        <div className="space-y-3">
          {REVIEW_REQUESTS.map((req) => (
            <div key={req.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-border hover:border-blue-500/30 transition-all">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{req.title}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-slate-500">by {req.author}</span>
                  <span className="tag-badge text-[10px]">{req.language}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${URGENCY_COLORS[req.urgency]}`}>{req.urgency}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-slate-600 flex items-center gap-1"><Clock className="w-3 h-3" />{req.timeAgo}</span>
                <Link to="/code-review" className="btn-primary text-xs px-3 py-1.5">Review</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Q&A */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">Questions Awaiting Expert Answers</h2>
          <Link to="/questions" className="text-xs text-blue-400 hover:text-blue-300">View all →</Link>
        </div>
        <div className="space-y-3">
          {MOCK_QUESTIONS.filter(q => !q.isAnswered).map((q) => (
            <Link key={q.id} to={`/questions/${q.id}`} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-border">
              <div className="flex flex-col items-center gap-1 text-center flex-shrink-0">
                <span className="text-sm font-bold text-blue-400">{q.votes}</span>
                <span className="text-[10px] text-slate-600">votes</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">{q.title}</p>
                <div className="flex gap-1.5 mt-2">
                  {q.tags.slice(0, 3).map((t) => <span key={t} className="tag-badge text-[10px]">{t}</span>)}
                </div>
              </div>
              <span className="text-xs text-amber-400 font-bold flex-shrink-0">Answer →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
