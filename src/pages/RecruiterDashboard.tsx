import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Briefcase, Users, TrendingUp, Eye, Plus, Search, Star, MapPin, Zap, Clock,
  ArrowRight, CheckCircle, Calendar, Sparkles, Building, Play, Shield, X, HelpCircle
} from "lucide-react";
import { MOCK_USERS, MOCK_JOBS } from "@/constants/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

const PIPELINE_DATA = [
  { stage: "Applied", count: 284, color: "#2f8d46" },
  { stage: "Screened", count: 98, color: "#4ade80" },
  { stage: "Interview", count: 42, color: "#94a3b8" },
  { stage: "Offer", count: 12, color: "#1e293b" },
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
  const { success, info } = useToast();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Recruiter Candidates state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [shortlisted, setShortlisted] = useState<string[]>([]);
  
  // Recruiter Interviews state
  const [interviews, setInterviews] = useState([
    { id: "i1", candidate: "Alex Chen", role: "Senior Full-Stack Developer", time: "Tomorrow at 10:00 AM", type: "Vibe / Architecture Check", status: "confirmed" },
    { id: "i2", candidate: "Priya Sharma", role: "Senior ML Engineer", time: "May 22, 11:30 AM", type: "AI Systems Design Round", status: "confirmed" },
  ]);
  const [candName, setCandName] = useState("");
  const [candRole, setCandRole] = useState("Senior Full-Stack Engineer");
  const [interType, setInterType] = useState("Vibe / Architecture Check");
  const [interTime, setInterTime] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const handleShortlistToggle = (id: string, name: string) => {
    if (shortlisted.includes(id)) {
      setShortlisted(prev => prev.filter(x => x !== id));
      info("Candidate Removed", `Removed ${name} from active recruitment shortlist.`);
    } else {
      setShortlisted(prev => [...prev, id]);
      success("Candidate Shortlisted", `Added ${name} to active recruitment shortlist.`);
    }
  };

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candName || !interTime) return;
    const newInterview = {
      id: `int-${Date.now()}`,
      candidate: candName,
      role: candRole,
      time: interTime,
      type: interType,
      status: "confirmed"
    };
    setInterviews(prev => [...prev, newInterview]);
    success("Interview Invited", `Sent invitation to ${candName} for ${interType} at ${interTime}.`);
    setCandName("");
    setInterTime("");
  };

  const candidatesList = MOCK_USERS.filter(u => u.role === "developer" || u.role === "expert");

  const filteredCandidates = candidatesList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = selectedSkill === "All" || c.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  const allSkills = ["All", ...Array.from(new Set(candidatesList.flatMap(c => c.skills)))];

  const isCandidatesView = pathname === "/recruiter/candidates";
  const isInterviewsView = pathname === "/recruiter/interviews";

  // Subview: Candidates Discovery Hub
  const renderCandidates = () => {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Developer Discovery Hub</h1>
            <p className="text-sm text-slate-500 font-medium">Search verified developers by system reputation, tech stack audit logs, and verified solves.</p>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <span className="text-[10px] font-black bg-blue-500/10 text-blue-600 border border-blue-500/20 px-4 py-2 rounded-lg uppercase tracking-widest">
              Shortlisted: {shortlisted.length} Candidates
            </span>
          </div>
        </div>

        {/* Discovery Filter Bar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm space-y-4">
          <div className="grid md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates by name or technical title..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="md:col-span-4">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200"
              >
                {allSkills.slice(0, 10).map(skill => (
                  <option key={skill} value={skill}>{skill === "All" ? "Filter Tech Stack" : skill}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Discovery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map(c => {
            const isShortlisted = shortlisted.includes(c.id);
            return (
              <div key={c.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:border-primary/20 transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-lg border border-primary/20">
                        {c.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{c.name}</h3>
                        <p className="text-[10px] text-slate-500 font-semibold truncate uppercase tracking-widest">{c.title}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleShortlistToggle(c.id, c.name)}
                      className={`p-1.5 rounded-lg border transition-all ${isShortlisted ? 'bg-primary/10 text-primary border-primary/30' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700 hover:text-primary'}`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">"{c.bio}"</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {c.skills.map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded text-[9px] font-bold uppercase">{skill}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-primary">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{c.reputation.toLocaleString()} Rep</span>
                    </div>
                    <span className="text-slate-400 font-medium">{c.location}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-5 mt-5 border-t border-slate-50 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setCandName(c.name);
                      setCandRole(c.title);
                      success("Preloaded Interview Scheduler", `Prepared invite payload for ${c.name}.`);
                      navigate("/recruiter/interviews");
                    }}
                    className="flex-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest py-2.5 rounded-lg text-center hover:opacity-90 active:scale-95 transition-all shadow-sm"
                  >
                    Invite to Interview
                  </button>
                  <button
                    onClick={() => success(`Opening verified solves protocol for ${c.name}`)}
                    className="px-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-[10px] font-black text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-all"
                  >
                    Audit Solves
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Subview: Interviews Coordination
  const renderInterviews = () => {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Interviews Coordinator</h1>
            <p className="text-sm text-slate-500 font-medium">Conduct secure live-coding diagnostics, track candidate responses, and log grading reviews.</p>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-4 py-2 rounded-lg uppercase tracking-widest animate-pulse">
              12 Active Interviews
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Active Interviews Pipeline */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Upcoming Assessments
            </h2>
            <div className="space-y-4">
              {interviews.map(item => (
                <div key={item.id} className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-primary/20 transition-all bg-slate-50/20 dark:bg-slate-800/10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.type}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white">{item.candidate}</h4>
                      <p className="text-xs text-slate-500 font-semibold">{item.role}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold pt-1">
                      <Clock className="w-3.5 h-3.5 text-primary" /> {item.time}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => success(`Launching Secure Live-Coding Assessment Room`, `Preloading environment configurations for candidate: ${item.candidate}...`)}
                      className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-lg flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-primary/15"
                    >
                      <Play className="w-3.5 h-3.5" /> Launch Coding Room
                    </button>
                    <button
                      onClick={() => {
                        setInterviews(prev => prev.filter(x => x.id !== item.id));
                        info("Interview Purged", `Cancelled interview coordinates for candidate: ${item.candidate}.`);
                      }}
                      className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-lg border border-slate-200 dark:border-slate-700 hover:text-rose-500 hover:border-rose-500/20 active:scale-95 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coordination Form */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" /> Schedule Candidate Assessment
            </h3>
            <form onSubmit={handleScheduleInterview} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Candidate Name</label>
                <input
                  type="text"
                  value={candName}
                  onChange={(e) => setCandName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Target Role</label>
                <select
                  value={candRole}
                  onChange={(e) => setCandRole(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200"
                >
                  <option value="Senior Full-Stack Engineer">Senior Full-Stack Engineer</option>
                  <option value="Senior Machine Learning Specialist">Senior Machine Learning Specialist</option>
                  <option value="Staff Systems Architect">Staff Systems Architect</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Evaluation Type</label>
                <select
                  value={interType}
                  onChange={(e) => setInterType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 dark:text-slate-200"
                >
                  <option value="Vibe / Architecture Check">Vibe / Architecture Check</option>
                  <option value="System Design Round">System Design Round</option>
                  <option value="Algorithmic diagnostics">Algorithmic diagnostics</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Proposed Timestamp</label>
                <input
                  type="text"
                  value={interTime}
                  onChange={(e) => setInterTime(e.target.value)}
                  placeholder="e.g. May 28, 1:00 PM"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <button type="submit" className="w-full btn-primary py-2.5 text-[10px] font-black uppercase tracking-widest mt-2 flex items-center justify-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Coord Session
              </button>
            </form>
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

  // Render Candidates Discover Hub
  if (isCandidatesView) {
    return renderCandidates();
  }

  // Render Interviews Coordinator
  if (isInterviewsView) {
    return renderInterviews();
  }

  const TOP_CANDIDATES = MOCK_USERS.filter(u => u.role === "developer" || u.role === "expert").slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      {/* Header - Hiring Portal Style */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Hiring Workspace</h1>
          <p className="text-sm text-slate-500 font-medium">
            <span className="text-primary font-bold">{user?.company || "TechForge Systems"}</span> • Active Talent Acquisition Portal
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/jobs" className="btn-secondary text-sm px-6 py-2.5 active:scale-95 transition-all">Manage Roles</Link>
          <Link to="/dashboard/recruiter/post-job" className="btn-primary text-sm px-6 py-2.5 active:scale-95 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Post New Role
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Roles", icon: Briefcase, value: 8, trend: "+2 this week" },
          { label: "Total Applicants", icon: Users, value: 284, trend: "+34 new" },
          { label: "Shortlisted", icon: Star, value: shortlisted.length || 42, trend: "+8 new" },
          { label: "Scheduled", icon: Calendar, value: interviews.length || 12, trend: "4 today" },
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

      {/* Pipeline & Market Demand */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Recruitment Pipeline */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Pipeline Distribution</h2>
          <div className="h-[200px] mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={PIPELINE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="count" stroke="none" paddingAngle={4}>
                  {PIPELINE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {PIPELINE_DATA.map((stage) => (
              <div key={stage.stage} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: stage.color }} />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{stage.stage}</span>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{stage.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Demand Market */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Technical Skill Demand</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
               <TrendingUp className="w-4 h-4" /> Market Trends
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SKILL_DEMAND} layout="vertical" margin={{ left: 20, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="skill" type="category" tick={{ fill: "#64748b", fontSize: 11, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="demand" fill="#2f8d46" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Candidates Feed */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recommended Candidates</h2>
          <Link to="/leaderboard" className="text-xs font-bold text-primary hover:underline">View Top Experts</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOP_CANDIDATES.map((candidate) => {
            const isShortlisted = shortlisted.includes(candidate.id);
            return (
              <div key={candidate.id} className="p-6 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-primary transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-primary font-bold border border-slate-200 dark:border-slate-700">
                        {candidate.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{candidate.name}</p>
                        <p className="text-[9px] text-slate-500 font-semibold truncate uppercase tracking-widest">{candidate.title.split(" ")[0]}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleShortlistToggle(candidate.id, candidate.name)}
                      className={`p-1 rounded ${isShortlisted ? 'text-primary bg-primary/10' : 'text-slate-400'}`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-bold mb-6 pt-4 border-t border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-1 text-primary">
                      <Sparkles className="w-3 h-3" />
                      <span>{candidate.reputation.toLocaleString()}</span>
                    </div>
                    <span className="text-slate-400 font-medium">{candidate.location.split(",")[0]}</span>
                  </div>
                </div>
                <button 
                  onClick={() => success(`Opening Candidate Protocol: ${candidate.name}`, "Loading verified skill map and reputation history...")}
                  className="w-full py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  View Protocol Profile
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* RBAC Security Credentials Matrix */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full" />
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            RBAC Recruiter Credentials & Clearances
          </h2>
          <span className="text-[9px] font-black bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded uppercase tracking-widest animate-pulse">Recruitment clearance active</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { action: "Post Jobs & Freelance", permitted: true, detail: "Write listings on global jobs board" },
            { action: "Developer Discovery", permitted: true, detail: "Filter developers by skill and reputation" },
            { action: "Mock Technical Interview", permitted: true, detail: "Schedule live code assessments" },
            { action: "Moderate Technical Q&A", permitted: false, detail: "Locked: Read-only community sections" },
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

      {/* Recruitment Activity Log */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Job Postings</h2>
          <Link to="/jobs" className="text-xs font-bold text-primary hover:underline">Manage All Listings</Link>
        </div>
        <div className="space-y-4">
          {MOCK_JOBS.slice(0, 3).map((job) => (
            <div key={job.id} className="p-5 border border-slate-50 dark:border-slate-800 rounded-xl flex items-center justify-between hover:border-primary/30 transition-all group">
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{job.title}</p>
                <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <span>{job.applicants} Applicants</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Closes {new Date(job.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded uppercase">Live</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
