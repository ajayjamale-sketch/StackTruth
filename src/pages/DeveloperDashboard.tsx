import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare, Code2, TrendingUp, Award, ArrowRight, Flame,
  ThumbsUp, Eye, BookmarkCheck, Zap, Star, Clock, CheckCircle,
  Users, Briefcase, Bot, Play, Sparkles, ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_QUESTIONS, MOCK_CODE_REVIEWS, MOCK_NOTIFICATIONS, MOCK_ANALYTICS } from "@/constants/mockData";
import { StatCardSkeleton, QuestionSkeleton } from "@/components/ui/SkeletonLoader";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";

const QUICK_ACTIONS = [
  { label: "Post Question", icon: MessageSquare, path: "/questions/ask", accent: "primary" },
  { label: "Review Code", icon: Code2, path: "/code-review", accent: "primary" },
  { label: "AI Sandbox", icon: Bot, path: "/ai-assistant", accent: "primary" },
  { label: "Live Coding", icon: Play, path: "/live-coding", accent: "primary" },
];

export default function DeveloperDashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const recentQuestions = MOCK_QUESTIONS.slice(0, 4);

  const radarData = MOCK_ANALYTICS.skillGrowth.map((s) => ({
    skill: s.skill,
    level: s.level,
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Header - GFG Style */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Hello, <span className="text-primary">{user?.name?.split(" ")[0]}!</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Continue your learning journey. You have <span className="text-primary font-bold">4 active reviews</span> pending.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reputation Score</span>
            <span className="text-2xl font-bold text-primary">{user?.reputation.toLocaleString()}</span>
          </div>
          <Link to="/profile" className="btn-secondary text-xs px-6 py-2.5">My Profile</Link>
        </div>
      </div>

      {/* Quick Actions - Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.label}
            to={action.path}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl hover:border-primary transition-all text-center group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all">
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-primary transition-colors">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Main Stats Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Learning Progress */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Activity Index
            </h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-xs font-bold text-slate-500">Votes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-slate-300" />
                <span className="text-xs font-bold text-slate-500">Answers</span>
              </div>
            </div>
          </div>
          
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ANALYTICS.engagement}>
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={10} fontWeight={600} />
                <YAxis stroke="#94a3b8" fontSize={10} fontWeight={600} />
                <Tooltip
                  contentStyle={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 8 }}
                />
                <Area type="monotone" dataKey="votes" stroke="#2f8d46" strokeWidth={3} fill="#2f8d46" fillOpacity={0.1} />
                <Area type="monotone" dataKey="answers" stroke="#94a3b8" strokeWidth={3} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Set */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Top Skills
          </h2>
          
          <div className="space-y-4">
            {MOCK_ANALYTICS.skillGrowth.slice(0, 5).map((skill) => (
              <div key={skill.skill} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-400">{skill.skill}</span>
                  <span className="text-primary">{skill.level}%</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
          
          <Link to="/profile" className="block text-center text-xs font-bold text-primary hover:underline pt-4 border-t border-slate-100 dark:border-slate-800">
            View Complete Skill Map
          </Link>
        </div>
      </div>

      {/* Feed Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recommended Questions */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recommended for You</h2>
            <Link to="/questions" className="text-xs font-bold text-primary hover:underline">Explore More</Link>
          </div>
          <div className="space-y-4">
            {recentQuestions.map((q) => (
              <Link
                key={q.id}
                to={`/questions/${q.id}`}
                className="flex items-start gap-4 p-4 border border-slate-100 dark:border-slate-800 rounded-lg hover:border-primary transition-all group"
              >
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <span className="text-xs font-bold text-primary">{q.votes}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Votes</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">{q.title}</h3>
                  <div className="flex gap-2 mt-2">
                    {q.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Community Badges */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Achievements</h2>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {user?.badges.slice(0, 3).map((badge) => (
              <div key={badge.id} className="text-center space-y-2 group cursor-help">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-full flex items-center justify-center mx-auto group-hover:border-primary group-hover:scale-105 transition-all">
                  <span className="text-3xl">{badge.icon}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase truncate">{badge.name}</p>
              </div>
            ))}
          </div>
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-primary uppercase">Next Milestone</p>
              <p className="text-[10px] text-slate-500">Expert Reviewer (12/50 reviews)</p>
            </div>
            <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "24%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
