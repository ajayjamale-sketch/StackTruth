import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Shield, Flag, TrendingUp, AlertTriangle, CheckCircle, XCircle, Eye, BarChart3, Zap, Clock, UserCheck, Bell } from "lucide-react";
import { MOCK_USERS } from "@/constants/mockData";
import { StatCardSkeleton } from "@/components/ui/SkeletonLoader";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const STATS = [
  { label: "Total Users", value: "48,291", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10", trend: "+842 this week" },
  { label: "Flagged Content", value: 12, icon: Flag, color: "text-red-400", bg: "bg-red-500/10", trend: "Needs review" },
  { label: "Expert Verifications", value: 3, icon: UserCheck, color: "text-amber-400", bg: "bg-amber-500/10", trend: "Pending approval" },
  { label: "Platform Health", value: "99.8%", icon: Shield, color: "text-green-400", bg: "bg-green-500/10", trend: "All systems normal" },
];

const GROWTH_DATA = [
  { month: "Jan", users: 38000, questions: 12400, reviews: 4200 },
  { month: "Feb", users: 40200, questions: 13800, reviews: 4800 },
  { month: "Mar", users: 42100, questions: 15200, reviews: 5400 },
  { month: "Apr", users: 44800, questions: 16900, reviews: 6100 },
  { month: "May", users: 48291, questions: 18400, reviews: 7200 },
];

const RECENT_REPORTS = [
  { id: 1, type: "spam", content: "Question contains repetitive promotional links", reporter: "alexchen", status: "pending", time: "2h ago" },
  { id: 2, type: "abuse", content: "Comment contains offensive language", reporter: "jordanr", status: "pending", time: "4h ago" },
  { id: 3, type: "misinformation", content: "Answer contains technically incorrect information", reporter: "priyas", status: "reviewing", time: "6h ago" },
  { id: 4, type: "spam", content: "Duplicate question posted 5 times", reporter: "marcusj", status: "resolved", time: "1d ago" },
];

const PENDING_EXPERTS = [
  { name: "Marcus Johnson", username: "marcusj", rep: 7840, skills: ["Python", "ML", "Docker"], applied: "2d ago" },
  { name: "Emily Zhang", username: "emilyzhang", rep: 6920, skills: ["React", "TypeScript", "GraphQL"], applied: "3d ago" },
  { name: "Aisha Patel", username: "aishap", rep: 9100, skills: ["Rust", "Go", "Security"], applied: "5d ago" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  reviewing: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  resolved: "text-green-400 bg-green-500/10 border-green-500/20",
};

const TYPE_COLORS: Record<string, string> = {
  spam: "text-orange-400",
  abuse: "text-red-400",
  misinformation: "text-purple-400",
};

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [verificationActions, setVerificationActions] = useState<Record<number, string>>({});

  useEffect(() => { setTimeout(() => setIsLoading(false), 900); }, []);

  const handleVerification = (idx: number, action: "approve" | "reject") => {
    setVerificationActions(prev => ({ ...prev, [idx]: action }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <span className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-2.5 py-1 rounded-full">
              <Shield className="w-3 h-3" /> ADMIN
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">Platform overview and moderation center</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-xs text-red-400 font-semibold">12 items need review</span>
          </div>
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

      {/* Platform Growth */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">Platform Growth</h2>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />Users</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />Questions</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={GROWTH_DATA}>
            <defs>
              <linearGradient id="gUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gQuestions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, color: "#fff", fontSize: 12 }} />
            <Area type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2} fill="url(#gUsers)" name="Users" />
            <Area type="monotone" dataKey="questions" stroke="#22C55E" strokeWidth={2} fill="url(#gQuestions)" name="Questions" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Reports */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-white flex items-center gap-2">
              <Flag className="w-4 h-4 text-red-400" /> Abuse Reports
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">12</span>
            </h2>
            <Link to="/admin/reports" className="text-xs text-blue-400">View all →</Link>
          </div>
          <div className="space-y-3">
            {RECENT_REPORTS.map((report) => (
              <div key={report.id} className="p-3 bg-white/5 border border-border rounded-xl">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase ${TYPE_COLORS[report.type]}`}>{report.type}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${STATUS_COLORS[report.status]}`}>{report.status}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{report.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-slate-600">Reported by @{report.reporter} · {report.time}</span>
                  {report.status === "pending" && (
                    <div className="flex gap-1">
                      <button className="p-1 text-green-400 hover:bg-green-500/10 rounded transition-all"><CheckCircle className="w-3.5 h-3.5" /></button>
                      <button className="p-1 text-red-400 hover:bg-red-500/10 rounded transition-all"><XCircle className="w-3.5 h-3.5" /></button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Verification */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-400" /> Expert Verifications
              <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
            </h2>
          </div>
          <div className="space-y-3">
            {PENDING_EXPERTS.map((expert, idx) => (
              <div key={expert.username} className="p-4 bg-white/5 border border-border rounded-xl">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-sm font-bold text-white">{expert.name}</p>
                    <p className="text-xs text-slate-500">@{expert.username} · {expert.rep.toLocaleString()} rep · Applied {expert.applied}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded">
                    <Zap className="w-3 h-3" />{expert.rep.toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-1.5 mb-3">
                  {expert.skills.map(s => <span key={s} className="tag-badge text-[10px]">{s}</span>)}
                </div>
                {verificationActions[idx] ? (
                  <div className={`text-xs font-semibold text-center py-2 rounded-lg ${verificationActions[idx] === "approve" ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"}`}>
                    {verificationActions[idx] === "approve" ? "✓ Approved as Expert" : "✗ Application Rejected"}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => handleVerification(idx, "approve")} className="flex-1 text-xs bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 font-semibold py-1.5 rounded-lg transition-all flex items-center justify-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button onClick={() => handleVerification(idx, "reject")} className="flex-1 text-xs bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-1.5 rounded-lg transition-all flex items-center justify-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Management Preview */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-white">Recent Users</h2>
          <Link to="/admin/users" className="text-xs text-blue-400">Manage all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs text-slate-500 font-medium pb-3">User</th>
                <th className="text-left text-xs text-slate-500 font-medium pb-3">Role</th>
                <th className="text-left text-xs text-slate-500 font-medium pb-3">Reputation</th>
                <th className="text-left text-xs text-slate-500 font-medium pb-3">Joined</th>
                <th className="text-left text-xs text-slate-500 font-medium pb-3">Status</th>
                <th className="text-left text-xs text-slate-500 font-medium pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {MOCK_USERS.slice(0, 4).map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition-all">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full bg-slate-700" />
                      <div>
                        <p className="font-medium text-white text-xs">{u.name}</p>
                        <p className="text-[10px] text-slate-500">@{u.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3"><span className="text-xs capitalize text-slate-400">{u.role}</span></td>
                  <td className="py-3"><span className="text-xs font-bold text-amber-400">{u.reputation.toLocaleString()}</span></td>
                  <td className="py-3"><span className="text-xs text-slate-500">{new Date(u.joinedAt).toLocaleDateString()}</span></td>
                  <td className="py-3">
                    {u.isVerified
                      ? <span className="text-[10px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded">Verified</span>
                      : <span className="text-[10px] font-bold text-slate-400 bg-white/5 border border-border px-2 py-0.5 rounded">Standard</span>}
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="text-[10px] text-blue-400 hover:text-blue-300">View</button>
                      <button className="text-[10px] text-red-400 hover:text-red-300">Suspend</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
