import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, Shield, Flag, TrendingUp, AlertTriangle, CheckCircle, 
  XCircle, Eye, BarChart3, Zap, Clock, UserCheck, Bell, Sparkles,
  Search, Filter, MoreVertical, Ban, RefreshCw
} from "lucide-react";
import { MOCK_USERS, MOCK_NOTIFICATIONS } from "@/constants/mockData";
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
  { id: 4, type: "duplicate", content: "This question has been asked multiple times in 24h", reporter: "kevinm", status: "pending", time: "8h ago" },
];

const PENDING_EXPERTS = [
  { name: "Marcus Johnson", username: "marcusj", rep: 7840, skills: ["Python", "ML"], applied: "2d ago" },
  { name: "Emily Zhang", username: "emilyzhang", rep: 6920, skills: ["React", "TS"], applied: "3d ago" },
  { name: "Sarah Connor", username: "sconnor", rep: 12400, skills: ["Security", "Rust"], applied: "4d ago" },
];

export default function AdminDashboard() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [verificationActions, setVerificationActions] = useState<Record<number, string>>({});
  const [reportActions, setReportActions] = useState<Record<number, string>>({});
  const { success, warning, info } = useToast();

  useEffect(() => { 
    const t = setTimeout(() => setIsLoading(false), 800); 
    return () => clearTimeout(t); 
  }, [pathname]);

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

  const handleUserAction = (name: string, action: string) => {
    info(`User Protocol: ${action}`, `Administrative action initiated for ${name}.`);
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main Growth Analytics */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Platform Growth Trends
            </h2>
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

        {/* System Health */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
           <h2 className="text-lg font-bold text-slate-900 dark:text-white">System Health</h2>
           <div className="space-y-4">
              {[
                { label: "Auth Registry", status: "Healthy", color: "text-primary" },
                { label: "Content Nodes", status: "Active", color: "text-primary" },
                { label: "API Gateway", status: "Healthy", color: "text-primary" },
                { label: "Media Storage", status: "Active", color: "text-primary" },
              ].map(sys => (
                <div key={sys.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-xs font-bold text-slate-500">{sys.label}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${sys.color}`}>{sys.status}</span>
                </div>
              ))}
           </div>
           <button onClick={() => info("Health check initiated.")} className="w-full py-3 bg-slate-100 dark:bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-all">
             Run Global Diagnostics
           </button>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">User Directory</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search community..." className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <button className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:text-primary"><Filter className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-100 dark:border-slate-800">
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Entity</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Authority Role</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reputation</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {MOCK_USERS.map((u) => (
              <tr key={u.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black border border-primary/20">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-950 dark:text-white">{u.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium lowercase">@{u.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className="text-[10px] font-black text-slate-500 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded uppercase tracking-widest">{u.role}</span>
                </td>
                <td className="px-8 py-4 font-black text-primary text-sm">
                  {u.reputation.toLocaleString()}
                </td>
                <td className="px-8 py-4">
                  <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Active
                  </span>
                </td>
                <td className="px-8 py-4 text-right">
                  <div className="flex justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleUserAction(u.name, "Restrict")} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-all"><Ban className="w-4 h-4" /></button>
                    <button onClick={() => handleUserAction(u.name, "Audit")} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"><RefreshCw className="w-4 h-4" /></button>
                    <button onClick={() => handleUserAction(u.name, "View")} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderModeration = () => (
    <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Reports */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-500" /> Active Reports
          </h2>
        </div>
        <div className="space-y-4">
          {RECENT_REPORTS.map((report) => (
            <div key={report.id} className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4 hover:border-red-200 dark:hover:border-red-500/20 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded uppercase tracking-[0.2em]">{report.type}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{report.time}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{report.content}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Entity: @{report.reporter}</span>
                {reportActions[report.id] ? (
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${reportActions[report.id] === 'resolve' ? 'text-primary' : 'text-slate-400'}`}>
                    {reportActions[report.id] === 'resolve' ? '✓ RESOLVED' : '✗ DISMISSED'}
                  </span>
                ) : (
                  <div className="flex gap-6">
                    <button onClick={() => handleReport(report.id, 'resolve')} className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Resolve</button>
                    <button onClick={() => handleReport(report.id, 'dismiss')} className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest">Dismiss</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" /> Authority Verification
          </h2>
        </div>
        <div className="space-y-4">
          {PENDING_EXPERTS.map((expert, idx) => (
            <div key={expert.username} className="p-5 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-4 hover:border-primary/20 transition-all">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-black text-slate-950 dark:text-white">{expert.name}</p>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">APPLIED {expert.applied} • {expert.rep.toLocaleString()} REP</p>
                </div>
                <div className="flex gap-2">
                  {expert.skills.map(s => <span key={s} className="text-[9px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-lg uppercase tracking-widest">{s}</span>)}
                </div>
              </div>
              {verificationActions[idx] ? (
                <div className={`text-[10px] font-black text-center py-4 rounded-xl uppercase tracking-[0.3em] ${verificationActions[idx] === "approve" ? "text-primary bg-primary/5 border border-primary/10" : "text-red-600 bg-red-50 border border-red-100"}`}>
                  {verificationActions[idx] === "approve" ? "✓ VERIFIED" : "✗ REJECTED"}
                </div>
              ) : (
                <div className="flex gap-4">
                  <button onClick={() => handleVerification(idx, "approve")} className="flex-1 bg-primary text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-primary/20">Grant Access</button>
                  <button onClick={() => handleVerification(idx, "reject")} className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-950 dark:hover:text-white transition-all">Decline</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header - Admin Portal Style */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter">System Control Panel</h1>
            <span className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-black rounded-sm uppercase tracking-[0.2em] flex items-center gap-1.5 border border-red-500/20">
               <Shield className="w-3.5 h-3.5" /> ROOT AUTHORITY
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">All nodes operational. <span className="text-primary font-black">12 protocols</span> pending review.</p>
        </div>
        <div className="relative z-10 flex items-center gap-4">
          <button onClick={() => success("Diagnostic Protocol", "System health 99.9%. All clusters active.")} className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition-all shadow-xl active:scale-95">
             Run Diagnostics
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-8 border-b border-slate-100 dark:border-slate-800 pb-px overflow-x-auto no-scrollbar">
        {[
          { label: "Overview", path: "/dashboard/admin", icon: LayoutDashboard },
          { label: "Users", path: "/admin/users", icon: Users },
          { label: "Moderation", path: "/admin/moderation", icon: Shield },
          { label: "Reports", path: "/admin/reports", icon: Flag },
          { label: "Verification", path: "/admin/verification", icon: UserCheck },
        ].map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex items-center gap-3 pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                isActive 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Content Rendering */}
      <div className="min-h-[600px]">
        {pathname === "/dashboard/admin" && renderOverview()}
        {pathname === "/admin/users" && renderUsers()}
        {pathname === "/admin/moderation" && renderModeration()}
        {pathname === "/admin/reports" && renderModeration()}
        {pathname === "/admin/verification" && renderModeration()}
      </div>
    </div>
  );
}

const LayoutDashboard = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);
