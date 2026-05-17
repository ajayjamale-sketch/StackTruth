import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Star, Code2, BookOpen, Users, TrendingUp, Award, ArrowRight,
  CheckCircle, Clock, Zap, Play, MessageSquare, Sparkles, Shield,
  Check, Calendar, MessageCircle, UserCheck, Plus, Trash2, ChevronRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_CODE_REVIEWS, MOCK_QUESTIONS, MOCK_ANALYTICS } from "@/constants/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useToast } from "@/contexts/ToastContext";

const REVIEW_REQUESTS = [
  { id: 1, title: "React state management refactor", author: "Jordan Rivera", language: "TypeScript", urgency: "high", timeAgo: "2h ago" },
  { id: 2, title: "Database indexing strategy", author: "Emily Zhang", language: "SQL", urgency: "medium", timeAgo: "4h ago" },
  { id: 3, title: "REST API rate limiting", author: "David Kim", language: "Go", urgency: "low", timeAgo: "1d ago" },
];

const IMPACT_DATA = [
  { month: "Jan", reviews: 12, answers: 34 },
  { month: "Feb", reviews: 18, answers: 42 },
  { month: "Mar", reviews: 15, answers: 38 },
  { month: "Apr", reviews: 22, answers: 58 },
  { month: "May", reviews: 28, answers: 67 },
];

export default function ExpertDashboard() {
  const { user } = useAuth();
  const { success, info } = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const [isLoading, setIsLoading] = useState(true);
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");

  // Mentorship States
  const [mentees, setMentees] = useState([
    { id: "m1", name: "Alex Chen", title: "Senior Full-Stack Developer", progress: 78, focus: "Rust Systems & K8s Security", avatar: "A" },
    { id: "m2", name: "Jordan Rivera", title: "Backend Engineer", progress: 45, focus: "FastAPI, High Performance APIs", avatar: "J" },
    { id: "m3", name: "Emily Zhang", title: "Database Architect", progress: 60, focus: "Zero-Downtime PostgreSQL Migrations", avatar: "E" },
  ]);

  const [requests, setRequests] = useState([
    { id: "r1", name: "David Kim", title: "Junior DevOps Specialist", focus: "CI/CD Secret Management Protocols", reputation: 1320 },
    { id: "r2", name: "Aisha Patel", title: "React Native Developer", focus: "Mobile Token Rotations", reputation: 1180 },
  ]);

  const [interviews, setInterviews] = useState([
    { id: "i1", candidate: "Alex Chen", type: "Mock Architecture Round", time: "Tomorrow at 10:00 AM", status: "confirmed" },
    { id: "i2", candidate: "Emily Zhang", type: "Postgres Indexing Review", time: "May 20, 2:00 PM", status: "confirmed" },
  ]);

  const [schedName, setSchedName] = useState("");
  const [schedType, setSchedType] = useState("Mock Architecture Round");
  const [schedTime, setSchedTime] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleStartReview = (title: string) => {
    success("Review Session Started", `Analyzing ${title}. Environment initialized.`);
    setTimeout(() => navigate("/code-review"), 1000);
  };

  const handleApproveMentorship = (name: string, id: string, focus: string) => {
    success("Mentorship Approved", `Initialized standard training protocol for ${name}.`);
    setRequests(prev => prev.filter(r => r.id !== id));
    setMentees(prev => [
      ...prev,
      { id, name, title: "Specialist Member", progress: 12, focus, avatar: name.charAt(0) }
    ]);
  };

  const handleDeclineMentorship = (name: string, id: string) => {
    success("Request Archived", `Declined mentorship application from ${name}.`);
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleCreateInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedName || !schedTime) return;
    const newInterview = {
      id: `int-${Date.now()}`,
      candidate: schedName,
      type: schedType,
      time: schedTime,
      status: "confirmed"
    };
    setInterviews(prev => [...prev, newInterview]);
    success("Interview Scheduled", `Coordinated ${schedType} with ${schedName} for ${schedTime}.`);
    setSchedName("");
    setSchedTime("");
  };

  const isMentorshipView = pathname === "/expert/mentorship";

  // Subview: Mentorship Console
  const renderMentorship = () => {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Mentorship Cohort Console</h1>
            <p className="text-sm text-slate-500 font-medium">Guide candidates to expert status, schedule mocks, and audit project architectures.</p>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <span className="text-[10px] font-black bg-amber-500/10 text-amber-600 border border-amber-500/20 px-4 py-2 rounded-lg uppercase tracking-widest">
              Active Cohort: {mentees.length} Mentees
            </span>
          </div>
        </div>

        {/* Mentorship Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Cohort", icon: Users, value: mentees.length, color: "text-amber-500" },
            { label: "Mock Interviews", icon: Calendar, value: interviews.length, color: "text-blue-500" },
            { label: "Weekly Hours Logged", icon: Clock, value: "18.5 hrs", color: "text-emerald-500" },
            { label: "Solves Approved", icon: CheckCircle, value: "14 Solves", color: "text-primary" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Mentees Cohort */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Active Cohort Roster
            </h2>
            <div className="space-y-4">
              {mentees.map(item => (
                <div key={item.id} className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl space-y-4 hover:border-primary/20 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black text-lg border border-primary/20">
                        {item.avatar}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">{item.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-400 uppercase">Focus:</span>
                      <p className="text-xs font-black text-primary truncate max-w-[200px]">{item.focus}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-500 uppercase tracking-wider text-[10px]">Mastery Track Progress</span>
                      <span className="text-primary font-bold">{item.progress}% Completed</span>
                    </div>
                    <div className="h-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => success("Chat Session Initialized", `Secure channel established with ${item.name}.`)}
                      className="btn-secondary text-[9px] font-black uppercase tracking-widest px-4 py-2 flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-primary" /> Communicate
                    </button>
                    <button
                      onClick={() => {
                        setSchedName(item.name);
                        success("Coordination form preloaded", `Ready to schedule mocked assessment for ${item.name}.`);
                      }}
                      className="btn-secondary text-[9px] font-black uppercase tracking-widest px-4 py-2 flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-primary" /> Schedule Mock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coordination Panel & Requests */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Requests */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-xl shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-500" />
                Mentorship Requests
              </h2>
              {requests.length > 0 ? (
                <div className="space-y-4">
                  {requests.map(req => (
                    <div key={req.id} className="p-4 border border-slate-100 dark:border-slate-800 rounded-lg space-y-3 bg-slate-50/50 dark:bg-slate-800/30">
                      <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white">{req.name}</h3>
                        <p className="text-[10px] text-slate-400 font-semibold">{req.title}</p>
                        <p className="text-[9px] text-primary font-black uppercase mt-1">Focus: {req.focus}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApproveMentorship(req.name, req.id, req.focus)}
                          className="flex-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest py-2 rounded-lg text-center hover:opacity-90 active:scale-95 transition-all shadow-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeclineMentorship(req.name, req.id)}
                          className="flex-1 bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest py-2 rounded-lg text-center hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 font-medium text-center py-4">No pending mentorship requests in queue.</p>
              )}
            </div>

            {/* Coordination Form */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-xl shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Coordinator Form
              </h3>
              <form onSubmit={handleCreateInterview} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Candidate Name</label>
                  <input
                    type="text"
                    value={schedName}
                    onChange={(e) => setSchedName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Evaluation Type</label>
                  <select
                    value={schedType}
                    onChange={(e) => setSchedType(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200"
                  >
                    <option value="Mock Architecture Round">Mock Architecture Round</option>
                    <option value="Security Penetration Audit">Security Penetration Audit</option>
                    <option value="Performance Diagnostics">Performance Diagnostics</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Session Timestamp</label>
                  <input
                    type="text"
                    value={schedTime}
                    onChange={(e) => setSchedTime(e.target.value)}
                    placeholder="e.g. May 25, 3:00 PM"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <button type="submit" className="w-full btn-primary py-2.5 text-[10px] font-black uppercase tracking-widest mt-2 flex items-center justify-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Book Session
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Coordinated Sessions Registry */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Coordinated Sessions Registry
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {interviews.map(item => (
              <div key={item.id} className="p-5 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between group hover:border-primary/20 transition-all bg-slate-50/20 dark:bg-slate-800/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.type}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.candidate}</h4>
                  <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 pt-1">
                    <Clock className="w-3.5 h-3.5 text-primary" /> {item.time}
                  </p>
                </div>
                <span className="text-[9px] font-black uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded">Confirmed</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-8 pb-12 animate-in fade-in duration-300">
        <div className="h-40 bg-slate-100 dark:bg-slate-800/40 rounded-xl animate-pulse" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-slate-100 dark:bg-slate-800/40 rounded-xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  // Render Mentorship Portal if requested by route
  if (isMentorshipView) {
    return renderMentorship();
  }

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      {/* Header - Expert Profile Style */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary border-4 border-white dark:border-slate-800 shadow-md">
             <span className="text-3xl font-bold">{user?.name?.charAt(0)}</span>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              {user?.name}
              <CheckCircle className="w-6 h-6 text-primary fill-primary/10" />
            </h1>
            <p className="text-sm text-slate-500 font-medium">{user?.title || "Principal Security Engineer"} • <span className="text-primary font-bold">Verified Mentor</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <button onClick={() => setShowLiveModal(true)} className="btn-secondary text-sm px-6 py-2.5 flex items-center gap-2 active:scale-95 transition-all">
            <Play className="w-4 h-4" /> Go Live
          </button>
          <button onClick={() => setShowArticleModal(true)} className="btn-primary text-sm px-6 py-2.5 active:scale-95 transition-all">Publish Article</button>
        </div>
      </div>

      {/* Live Broadcast Modal Simulation */}
      {showLiveModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden scale-in">
            <div className="p-8 space-y-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <h2 className="text-xl font-black text-slate-950 dark:text-white uppercase tracking-tighter">Live Technical Audit Broadcast</h2>
                </div>
                <button onClick={() => setShowLiveModal(false)} className="text-slate-400 hover:text-primary transition-colors">✕</button>
              </div>
              <div className="aspect-video bg-slate-950 rounded-xl relative overflow-hidden border border-white/5 group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mx-auto animate-bounce">
                      <Play className="w-10 h-10 fill-current" />
                    </div>
                    <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Waiting for encoder stream...</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className="bg-slate-900/80 backdrop-blur text-[9px] font-black px-3 py-1.5 rounded-lg text-white uppercase tracking-widest border border-white/10">00:00:00</div>
                  <div className="bg-slate-900/80 backdrop-blur text-[9px] font-black px-3 py-1.5 rounded-lg text-emerald-400 uppercase tracking-widest border border-emerald-500/20">Active</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { success("Broadcast initialized!"); setShowLiveModal(false); }} className="btn-primary w-full py-4 text-xs">Start Streaming</button>
                <button onClick={() => setShowLiveModal(false)} className="btn-secondary w-full py-4 text-xs">Cancel Session</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Editor Modal Simulation */}
      {showArticleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden scale-in">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black text-slate-950 dark:text-white uppercase tracking-tighter">Publish Technical Research</h2>
                <button onClick={() => setShowArticleModal(false)} className="text-slate-400 hover:text-primary transition-colors">✕</button>
              </div>
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  placeholder="Article Title (e.g., Deep Dive into Rust Memory Safety)" 
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl text-lg font-black outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <textarea 
                  placeholder="Draft your technical analysis here... Markdown supported." 
                  className="w-full h-64 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowArticleModal(false)} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Save Draft</button>
                <button 
                  onClick={() => { 
                    if (!articleTitle) return;
                    success("Article Published", `"${articleTitle}" is now live on the technical feed.`); 
                    setShowArticleModal(false); 
                    setArticleTitle("");
                  }} 
                  className="btn-primary px-10 py-3 text-xs"
                >
                  Publish Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Impact Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Reputation", icon: Sparkles, value: 12350, color: "text-amber-500" },
          { label: "Code Reviews Completed", icon: Code2, value: 156, color: "text-primary" },
          { label: "Solved Questions", icon: MessageSquare, value: 420, color: "text-primary" },
          { label: "Direct Mentorships", icon: Users, value: mentees.length, color: "text-primary" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm hover:border-primary/30 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter">{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Community Contribution Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Monthly Contribution Impact</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-xs font-bold text-slate-500">Activity</span>
              </div>
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={IMPACT_DATA} barSize={40}>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} fontWeight={600} />
                <YAxis stroke="#94a3b8" fontSize={10} fontWeight={600} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="reviews" fill="var(--primary)" radius={[4, 4, 0, 0]}>
                   {IMPACT_DATA.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={index === IMPACT_DATA.length - 1 ? 'var(--primary)' : '#cbd5e1'} />
                   ))}
                </Bar>
                <Bar dataKey="answers" fill="#94a3b8" radius={[4, 4, 0, 0]} opacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Badges & Progress */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Expert Credentials</h2>
            <div className="space-y-4">
              {user?.badges.slice(0, 3).map((badge) => (
                <div key={badge.id} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg group hover:border-primary transition-all">
                  <span className="text-2xl transition-all group-hover:scale-125">{badge.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white uppercase truncate">{badge.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium truncate">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-primary p-6 rounded-xl text-white shadow-lg shadow-primary/20 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">Next Badge Progress</span>
              <Award className="w-5 h-5 text-amber-300 animate-bounce" />
            </div>
            <p className="text-sm font-bold relative z-10">Gold Contributor Status</p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden relative z-10">
              <div className="h-full bg-white transition-all duration-1000" style={{ width: "68%" }} />
            </div>
            <p className="text-[10px] text-white/70 font-medium text-right relative z-10">68 / 100 points until next tier</p>
          </div>
        </div>
      </div>

      {/* RBAC Security Credentials Matrix */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] rounded-full" />
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            RBAC Expert Credentials & Clearances
          </h2>
          <span className="text-[9px] font-black bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">Expert Clearance Active</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { action: "Conduct Peer Reviews", permitted: true, detail: "Write official audits on public files" },
            { action: "Approve Solutions", permitted: true, detail: "Mark answers as officially verified" },
            { action: "Moderate Q&A Board", permitted: true, detail: "Highlight important resources" },
            { action: "Platform Administrator", permitted: false, detail: "Locked: Global system changes" },
          ].map((perm, index) => (
            <div key={index} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 truncate">{perm.action}</span>
                {perm.permitted ? (
                  <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xs">✓</span>
                ) : (
                  <span className="w-4 h-4 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-[10px]">🔒</span>
                )}
              </div>
              <p className="text-[9px] text-slate-400 font-medium leading-normal">{perm.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Review Queue & Unanswered Questions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Active Review Queue</h2>
            <Link to="/code-review" className="text-xs font-bold text-primary hover:underline">View All Requests</Link>
          </div>
          <div className="space-y-4">
            {REVIEW_REQUESTS.map((req) => (
              <div key={req.id} className="p-5 border border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-between group hover:border-primary transition-all hover:shadow-md">
                <div className="space-y-1.5">
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{req.title}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded uppercase tracking-widest">{req.language}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-widest ${req.urgency === 'high' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                      {req.urgency} Priority
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleStartReview(req.title)}
                  className="btn-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
                >
                  Start Review
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Pending Solutions</h2>
            <Link to="/questions" className="text-xs font-bold text-primary hover:underline">See Open Forum</Link>
          </div>
          <div className="space-y-4">
            {MOCK_QUESTIONS.filter(q => !q.isAnswered).slice(0, 3).map((q) => (
              <Link key={q.id} to={`/questions/${q.id}`} className="block p-5 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-primary transition-all group hover:shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{q.title}</h3>
                  <span className="text-xs font-bold text-primary">+{q.votes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {q.tags.slice(0, 2).map((t) => <span key={t} className="text-[9px] text-slate-400 font-black uppercase tracking-widest">#{t}</span>)}
                  </div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">Contribute Solution →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
