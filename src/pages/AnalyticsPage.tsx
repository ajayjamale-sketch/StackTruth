import React, { useState } from "react";
import { TrendingUp, Eye, ThumbsUp, MessageSquare, Code2, Award, Calendar, BarChart3, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_ANALYTICS } from "@/constants/mockData";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const PERIODS = ["7 Days", "30 Days", "3 Months", "1 Year"];

function ContributionGraph() {
  const weeks = 20;
  const days = 7;
  const data = MOCK_ANALYTICS.contributions.slice(0, weeks * days);
  const maxCount = Math.max(...data.map(d => d.count));

  const getColor = (count: number) => {
    if (count === 0) return "bg-white/5";
    const intensity = count / maxCount;
    if (intensity < 0.25) return "bg-green-900/80";
    if (intensity < 0.5) return "bg-green-700";
    if (intensity < 0.75) return "bg-green-500";
    return "bg-green-400";
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: days }, (_, d) => {
              const item = data[w * days + d];
              return item ? (
                <div
                  key={d}
                  className={`w-3.5 h-3.5 rounded-sm ${getColor(item.count)} hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer`}
                  title={`${item.date}: ${item.count} contributions`}
                />
              ) : <div key={d} className="w-3.5 h-3.5" />;
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-600">
        <span>Less</span>
        {["bg-white/5", "bg-green-900/80", "bg-green-700", "bg-green-500", "bg-green-400"].map((c, i) => (
          <div key={i} className={`w-3.5 h-3.5 rounded-sm ${c}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

const TAG_COLORS = ["#2563EB", "#22C55E", "#F59E0B", "#8B5CF6", "#EF4444"];

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [period, setPeriod] = useState("30 Days");

  const radarData = MOCK_ANALYTICS.skillGrowth.map(s => ({ skill: s.skill, level: s.level }));
  const pieData = MOCK_ANALYTICS.topTags.map((t, i) => ({ ...t, color: TAG_COLORS[i] }));

  const totalViews = MOCK_ANALYTICS.engagement.reduce((s, e) => s + e.views, 0);
  const totalVotes = MOCK_ANALYTICS.engagement.reduce((s, e) => s + e.votes, 0);
  const totalAnswers = MOCK_ANALYTICS.engagement.reduce((s, e) => s + e.answers, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics & Insights</h1>
          <p className="text-slate-400 text-sm mt-1">Your performance and growth metrics</p>
        </div>
        <div className="flex gap-1 bg-white/5 border border-border rounded-xl p-1">
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${period === p ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>{p}</button>
          ))}
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, color: "text-blue-400", bg: "bg-blue-500/10", trend: "+24%" },
          { label: "Votes Received", value: totalVotes.toLocaleString(), icon: ThumbsUp, color: "text-green-400", bg: "bg-green-500/10", trend: "+18%" },
          { label: "Answers Given", value: totalAnswers.toLocaleString(), icon: MessageSquare, color: "text-purple-400", bg: "bg-purple-500/10", trend: "+31%" },
          { label: "Reputation", value: user?.reputation.toLocaleString() || "0", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", trend: "+248" },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500">{stat.label}</span>
              <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.color}`}>{stat.trend} this period</p>
          </div>
        ))}
      </div>

      {/* Engagement chart */}
      <div className="glass-card p-5">
        <h2 className="font-bold text-white mb-5">Engagement Over Time</h2>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={MOCK_ANALYTICS.engagement}>
            <defs>
              <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gVw" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: 12 }} />
            <Area type="monotone" dataKey="views" stroke="#2563EB" strokeWidth={2} fill="url(#gVw)" name="Views" />
            <Area type="monotone" dataKey="votes" stroke="#22C55E" strokeWidth={2} fill="url(#gA)" name="Votes" />
            <Area type="monotone" dataKey="answers" stroke="#8B5CF6" strokeWidth={2} fill="url(#gV)" name="Answers" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skill Radar */}
        <div className="glass-card p-5">
          <h2 className="font-bold text-white mb-4">Skill Profile</h2>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "#64748B", fontSize: 10 }} />
              <Radar name="Level" dataKey="level" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Growth */}
        <div className="glass-card p-5">
          <h2 className="font-bold text-white mb-4">Skill Growth</h2>
          <div className="space-y-3">
            {MOCK_ANALYTICS.skillGrowth.map((skill) => (
              <div key={skill.skill}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-300">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-400 font-medium">+{skill.growth}%</span>
                    <span className="text-xs text-slate-500">{skill.level}%</span>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Tags */}
        <div className="glass-card p-5">
          <h2 className="font-bold text-white mb-4">Activity by Tag</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="count" paddingAngle={3}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((tag) => (
              <div key={tag.tag} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tag.color }} />
                  <span className="text-xs text-slate-400">{tag.tag}</span>
                </div>
                <span className="text-xs font-bold text-white">{tag.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contribution graph */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-400" /> Contribution Graph
          </h2>
          <div className="flex items-center gap-2 text-xs text-green-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            {user?.contributions} total contributions
          </div>
        </div>
        <ContributionGraph />
      </div>
    </div>
  );
}
