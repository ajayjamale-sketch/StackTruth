import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Shield, Flag, TrendingUp, AlertTriangle, CheckCircle, XCircle, Eye, BarChart3, Zap, Clock, UserCheck, Bell, Sparkles } from "lucide-react";
import { MOCK_USERS } from "@/constants/mockData";
import { StatCardSkeleton } from "@/components/ui/SkeletonLoader";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useToast } from "@/contexts/ToastContext";

const GROWTH_DATA = [
  { month: "Jan", users: 38000, questions: 12400 },
  { month: "Feb", users: 40200, questions: 13800 },
  { month: "Mar", users: 42100, questions: 15200 },
  { month: "Apr", users: 44800, questions: 16900 },
  { month: "May", users: 48291, questions: 18400 },
];

const RECENT_REPORTS = [
  { id: 1, type: "spam", content: "Question contains repetitive promotional links", reporter: "alexchen", status: "pending", time: "2h ago" },
  { id: 2, type: "abuse", content: "Comment contains offensive language", reporter: "jordanr", status: "pending", time: "4h ago" },
  { id: 3, type: "misinformation", content: "Answer contains technically incorrect information", reporter: "priyas", status: "reviewing", time: "6h ago" },
];

const PENDING_EXPERTS = [
  { name: "Marcus Johnson", username: "marcusj", rep: 7840, skills: ["Python", "ML"], applied: "2d ago" },
  { name: "Emily Zhang", username: "emilyzhang", rep: 6920, skills: ["React", "TS"], applied: "3d ago" },
];

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [verificationActions, setVerificationActions] = useState<Record<number, string>>({});
  const [reportActions, setReportActions] = useState<Record<number, string>>({});
  const { success, warning } = useToast();

  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 800); return () => clearTimeout(t); }, []);

  const handleVerification = (idx: number, action: "approve" | "reject") => {
    setVerificationActions(prev => ({ ...prev, [idx]: action }));
    if (action === "approve") {
      success("Expert Approved", `${PENDING_EXPERTS[idx].name} has been granted expert status.`);
    } else {
      warning("Application Rejected", `${PENDING_EXPERTS[idx].name}'s application has been declined.`);
    }
  };

  const handleReport = (id: number, action: "resolve" | "dismiss") => {
    setReportActions(prev => ({ ...prev, [id]: action }));
    if (action === "resolve") {
      success("Report Resolved", "The reported content has been addressed.");
    } else {
      warning("Report Dismissed", "The report has been dismissed as non-actionable.");
    }
  };

  const handleViewAlerts = () => {
    success("System Status", "No critical alerts at this time. All systems operational.");
  };

  const handleUserDetails = (name: string, role: string, rep: number) => {
    success(`${name}`, `Role: ${role} • Reputation: ${rep.toLocaleString()} • Status: Active`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header - Admin Portal Style */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">System Control Panel</h1>
            <span className="px-3 py-1 bg-red-100 text-red-600 text-[10px] font-bold rounded-full uppercase tracking-widest flex items-center gap-1.5">
               <Shield className="w-3 h-3" /> Root Admin
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">All systems operational. <span className="text-primary font-bold">12 moderation items</span> pending review.</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleViewAlerts} className="bg-red-50 text-red-600 border border-red-100 px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-red-100 transition-all">
            <AlertTriangle className="w-4 h-4" /> View Alerts
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Community", icon: Users, value: "48,291", trend: "+842 new" },
          { label: "Moderation Queue", icon: Flag, value: 12, trend: "3 high priority" },
          { label: "Expert Requests", icon: UserCheck, value: 3, trend: "Needs review" },
          { label: "System Uptime", icon: Shield, value: "99.9%", trend: "Healthy" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-primary">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-[10px] font-bold text-primary mt-1 uppercase tracking-widest">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Growth Analytics */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Platform Growth Trends
          </h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary" />
              <span className="text-xs font-bold text-slate-500">Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-500" />
              <span className="text-xs font-bold text-slate-500">Questions</span>
            </div>
          </div>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={GROWTH_DATA}>
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} fontWeight={600} />
              <YAxis stroke="#94a3b8" fontSize={10} fontWeight={600} />
              <Tooltip contentStyle={{ borderRadius: 8 }} />
              <Area type="monotone" dataKey="users" stroke="#2f8d46" strokeWidth={3} fill="#2f8d46" fillOpacity={0.1} />
              <Area type="monotone" dataKey="questions" stroke="#10b981" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Moderation Queue */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Reports</h2>
            <Link to="/admin/reports" className="text-xs font-bold text-primary hover:underline">Full Queue</Link>
          </div>
          <div className="space-y-4">
            {RECENT_REPORTS.map((report) => (
              <div key={report.id} className="p-5 border border-slate-50 dark:border-slate-800 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-widest">{report.type}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{report.time}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{report.content}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400">Reporter: @{report.reporter}</span>
                  {reportActions[report.id] ? (
                    <span className={`text-xs font-bold uppercase tracking-widest ${reportActions[report.id] === 'resolve' ? 'text-primary' : 'text-slate-400'}`}>
                      {reportActions[report.id] === 'resolve' ? '✓ Resolved' : '✗ Dismissed'}
                    </span>
                  ) : (
                    <div className="flex gap-4">
                      <button onClick={() => handleReport(report.id, 'resolve')} className="text-xs font-bold text-primary hover:underline">Resolve</button>
                      <button onClick={() => handleReport(report.id, 'dismiss')} className="text-xs font-bold text-slate-400 hover:text-slate-600">Dismiss</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Verifications */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Expert Applications</h2>
            <span className="text-xs font-bold text-slate-400">3 Pending</span>
          </div>
          <div className="space-y-4">
            {PENDING_EXPERTS.map((expert, idx) => (
              <div key={expert.username} className="p-5 border border-slate-50 dark:border-slate-800 rounded-xl space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{expert.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">Applied {expert.applied} • {expert.rep.toLocaleString()} Reputation</p>
                  </div>
                  <div className="flex gap-2">
                    {expert.skills.map(s => <span key={s} className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{s}</span>)}
                  </div>
                </div>
                {verificationActions[idx] ? (
                  <div className={`text-xs font-bold text-center py-3 rounded-lg uppercase tracking-widest ${verificationActions[idx] === "approve" ? "text-primary bg-primary/5" : "text-red-600 bg-red-50"}`}>
                    {verificationActions[idx] === "approve" ? "✓ Approved" : "✗ Rejected"}
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={() => handleVerification(idx, "approve")} className="flex-1 btn-primary py-2 text-xs font-bold">Approve</button>
                    <button onClick={() => handleVerification(idx, "reject")} className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-all">Reject</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Directory Preview */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">User Directory Preview</h2>
          <Link to="/admin/users" className="text-xs font-bold text-primary hover:underline">Full Directory →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-100 dark:border-slate-800">
                <th className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-4">User</th>
                <th className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-4">Role</th>
                <th className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-4 text-right">Reputation</th>
                <th className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {MOCK_USERS.slice(0, 5).map((u) => (
                <tr key={u.id} className="group">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-primary font-bold text-[10px] border border-slate-200 dark:border-slate-700">
                        {u.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{u.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium truncate">@{u.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-[10px] font-bold text-slate-500 px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded uppercase">{u.role}</span>
                  </td>
                  <td className="py-4 text-right font-bold text-primary text-sm">
                    {u.reputation.toLocaleString()}
                  </td>
                  <td className="py-4 text-right">
                    <button onClick={() => handleUserDetails(u.name, u.role, u.reputation)} className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">Details</button>
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
