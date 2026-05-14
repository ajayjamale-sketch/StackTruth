import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare, Code2, TrendingUp, Award, ArrowRight, Flame,
  ThumbsUp, Eye, BookmarkCheck, Zap, Star, Clock, CheckCircle,
  Users, Briefcase, Bot, Play,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_QUESTIONS, MOCK_CODE_REVIEWS, MOCK_NOTIFICATIONS, MOCK_ANALYTICS } from "@/constants/mockData";
import { StatCardSkeleton, QuestionSkeleton } from "@/components/ui/SkeletonLoader";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";

const STATS = [
  { label: "Reputation", key: "reputation", icon: Zap, color: "text-amber-400", bgColor: "bg-amber-500/10", trend: "+248 this week" },
  { label: "Questions", value: 124, icon: MessageSquare, color: "text-blue-400", bgColor: "bg-blue-500/10", trend: "+8 this month" },
  { label: "Code Reviews", value: 45, icon: Code2, color: "text-green-400", bgColor: "bg-green-500/10", trend: "+12 this month" },
  { label: "Day Streak", key: "streak", icon: Flame, color: "text-rose-400", bgColor: "bg-rose-500/10", trend: "Best: 128 days" },
];

const QUICK_ACTIONS = [
  { label: "Ask Question", icon: MessageSquare, path: "/questions/ask", color: "from-blue-600 to-blue-700" },
  { label: "Submit Code", icon: Code2, path: "/code-review", color: "from-green-600 to-green-700" },
  { label: "AI Assistant", icon: Bot, path: "/ai-assistant", color: "from-purple-600 to-purple-700" },
  { label: "Live Coding", icon: Play, path: "/live-coding", color: "from-amber-600 to-orange-600" },
];

const CONTRIBUTION_DATA = Array.from({ length: 52 }, (_, week) => ({
  week: `W${week + 1}`,
  commits: Math.floor(Math.random() * 15),
  answers: Math.floor(Math.random() * 8),
  reviews: Math.floor(Math.random() * 5),
})).slice(40);

export default function DeveloperDashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const recentQuestions = MOCK_QUESTIONS.slice(0, 4);
  const recentReviews = MOCK_CODE_REVIEWS.slice(0, 2);

  const radarData = MOCK_ANALYTICS.skillGrowth.map((s) => ({
    skill: s.skill,
    level: s.level,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-white">
              Good morning, {user?.name?.split(" ")[0]} 👋
            </h1>
          </div>
          <p className="text-slate-400 text-sm">Your developer workspace is ready. Keep the streak going!</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-amber-400">{user?.streak} day streak</span>
          </div>
          <Link to="/profile" className="btn-secondary text-sm px-4 py-2">View Profile</Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.label}
            to={action.path}
            className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br ${action.color} hover:opacity-90 transition-all hover:shadow-lg group`}
          >
            <action.icon className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">{action.label}</span>
            <ArrowRight className="w-4 h-4 text-white/60 ml-auto group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? STATS.map((_, i) => <StatCardSkeleton key={i} />)
          : STATS.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                  <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-white">
                  {stat.key === "reputation" ? user?.reputation.toLocaleString() : stat.key === "streak" ? user?.streak : stat.value}
                </p>
                <p className={`text-xs mt-1 ${stat.color}`}>{stat.trend}</p>
              </div>
            ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-white">Activity Overview</h2>
            <div className="flex gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" />Answers</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400" />Reviews</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MOCK_ANALYTICS.engagement}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAnswers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, color: "#F8FAFC", fontSize: 12 }}
              />
              <Area type="monotone" dataKey="votes" stroke="#2563EB" strokeWidth={2} fill="url(#colorViews)" name="Votes" />
              <Area type="monotone" dataKey="answers" stroke="#22C55E" strokeWidth={2} fill="url(#colorAnswers)" name="Answers" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Radar */}
        <div className="glass-card p-5">
          <h2 className="font-bold text-white mb-5">Skill Levels</h2>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "#64748B", fontSize: 10 }} />
              <Radar name="Level" dataKey="level" stroke="#2563EB" fill="#2563EB" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {MOCK_ANALYTICS.skillGrowth.slice(0, 4).map((skill) => (
              <div key={skill.skill} className="flex items-center gap-2">
                <span className="text-xs text-slate-400 w-20 flex-shrink-0">{skill.skill}</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 w-8">{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Questions */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">Recent Discussions</h2>
          <Link to="/questions" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3">
          {isLoading
            ? [1, 2].map((i) => <QuestionSkeleton key={i} />)
            : recentQuestions.map((q) => (
                <Link
                  key={q.id}
                  to={`/questions/${q.id}`}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-border"
                >
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${q.isAnswered ? "bg-green-500/10 text-green-400" : "bg-white/5 text-slate-400"}`}>
                      <ThumbsUp className="w-3 h-3" />
                      {q.votes}
                    </div>
                    <span className="text-[10px] text-slate-600">{q.answers} ans</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">{q.title}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex gap-1.5">
                        {q.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tag-badge text-[10px]">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-600 ml-auto">
                        <Eye className="w-3 h-3" />
                        {q.views.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {q.isAnswered && <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />}
                </Link>
              ))}
        </div>
      </div>

      {/* Badges */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">Badges & Achievements</h2>
          <Link to="/profile" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
            All badges <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {user?.badges.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-border hover:border-blue-500/30 transition-all">
              <span className="text-3xl">{badge.icon}</span>
              <div className="text-center">
                <p className="text-xs font-bold text-white">{badge.name}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{badge.description}</p>
                <span className={`text-[10px] font-bold mt-1 inline-block ${
                  badge.rarity === "legendary" ? "text-amber-400" : badge.rarity === "epic" ? "text-purple-400" : badge.rarity === "rare" ? "text-blue-400" : "text-slate-400"
                }`}>
                  {badge.rarity.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-dashed border-border opacity-50">
            <Star className="w-8 h-8 text-slate-600" />
            <p className="text-xs text-slate-600 text-center">Keep contributing to unlock more!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
