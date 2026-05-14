import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, TrendingUp, Eye, Plus, Search, Star, MapPin, Zap, Clock, ArrowRight, CheckCircle, Calendar } from "lucide-react";
import { MOCK_USERS, MOCK_JOBS } from "@/constants/mockData";
import { StatCardSkeleton } from "@/components/ui/SkeletonLoader";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { useAuth } from "@/contexts/AuthContext";

const STATS = [
  { label: "Active Jobs", value: 8, icon: Briefcase, color: "text-blue-400", bg: "bg-blue-500/10", trend: "+2 this week" },
  { label: "Total Applicants", value: 284, icon: Users, color: "text-green-400", bg: "bg-green-500/10", trend: "+34 this week" },
  { label: "Shortlisted", value: 42, icon: CheckCircle, color: "text-amber-400", bg: "bg-amber-500/10", trend: "+8 this week" },
  { label: "Interviews", value: 12, icon: Calendar, color: "text-purple-400", bg: "bg-purple-500/10", trend: "4 this week" },
];

const TOP_CANDIDATES = MOCK_USERS.filter(u => u.role === "developer" || u.role === "expert").slice(0, 4);

const PIPELINE_DATA = [
  { stage: "Applied", count: 284, color: "#2563EB" },
  { stage: "Screened", count: 98, color: "#8B5CF6" },
  { stage: "Interview", count: 42, color: "#F59E0B" },
  { stage: "Offer", count: 12, color: "#22C55E" },
];

const SKILL_DEMAND = [
  { skill: "React", demand: 45 },
  { skill: "TypeScript", demand: 38 },
  { skill: "Node.js", demand: 32 },
  { skill: "Python", demand: 28 },
  { skill: "Go", demand: 22 },
];

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { setTimeout(() => setIsLoading(false), 900); }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Hiring Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">{user?.company || "Your company"} · Talent Acquisition</p>
        </div>
        <div className="flex gap-3">
          <Link to="/jobs" className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
            <Eye className="w-4 h-4" /> View Candidates
          </Link>
          <Link to="/jobs" className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Post Job
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? STATS.map((_, i) => <StatCardSkeleton key={i} />) : STATS.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500">{stat.label}</span>
              <div className={`w-8 h-8 ${stat.bg} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.color}`}>{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pipeline */}
        <div className="glass-card p-5">
          <h2 className="font-bold text-white mb-5">Hiring Pipeline</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={PIPELINE_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="count" paddingAngle={4}>
                {PIPELINE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {PIPELINE_DATA.map((stage) => (
              <div key={stage.stage} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                  <span className="text-xs text-slate-400">{stage.stage}</span>
                </div>
                <span className="text-xs font-bold text-white">{stage.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Demand */}
        <div className="lg:col-span-2 glass-card p-5">
          <h2 className="font-bold text-white mb-5">Most Demanded Skills in Your Jobs</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SKILL_DEMAND} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="skill" type="category" tick={{ fill: "#94A3B8", fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: 12 }} />
              <Bar dataKey="demand" fill="#2563EB" radius={[0, 6, 6, 0]} name="Applicants" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Candidates */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">Recommended Candidates</h2>
          <Link to="/leaderboard" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">Browse all <ArrowRight className="w-3 h-3" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {TOP_CANDIDATES.map((candidate) => (
            <div key={candidate.id} className="p-4 bg-white/5 border border-border rounded-xl hover:border-blue-500/30 transition-all group">
              <div className="flex items-start gap-3 mb-3">
                <img src={candidate.avatar} alt={candidate.name} className="w-10 h-10 rounded-full bg-slate-700 ring-2 ring-border" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{candidate.name}</p>
                  <p className="text-xs text-slate-500 truncate">{candidate.title}</p>
                </div>
                {candidate.isVerified && <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold text-amber-400">{candidate.reputation.toLocaleString()} rep</span>
                <MapPin className="w-3 h-3 text-slate-500 ml-auto" />
                <span className="text-xs text-slate-500 truncate">{candidate.location.split(",")[0]}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {candidate.skills.slice(0, 3).map((s) => <span key={s} className="tag-badge text-[10px]">{s}</span>)}
              </div>
              <button className="w-full text-xs bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold py-1.5 rounded-lg transition-all">
                Invite to Interview
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">Active Job Postings</h2>
          <Link to="/jobs" className="text-xs text-blue-400 hover:text-blue-300">Manage →</Link>
        </div>
        <div className="space-y-3">
          {MOCK_JOBS.slice(0, 3).map((job) => (
            <div key={job.id} className="flex items-center gap-4 p-4 bg-white/5 border border-border rounded-xl">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{job.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Users className="w-3 h-3" />{job.applicants} applicants</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" />Closes {new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded">Active</span>
                <Link to="/jobs" className="btn-ghost text-xs px-3 py-1.5">Manage</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
