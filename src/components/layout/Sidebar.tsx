import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, MessageSquare, Code2, Bot, Users, Briefcase,
  BarChart3, Settings, BookOpen, Play, Trophy, Star, UserCheck,
  Shield, Flag, Bell, FileText, Building, Search, Calendar,
  GitBranch, Sparkles, X, ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types";

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: string | number;
  badgeColor?: string;
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

const SIDEBAR_CONFIG: Record<UserRole, SidebarSection[]> = {
  developer: [
    {
      items: [
        { label: "Overview", icon: LayoutDashboard, path: "/dashboard/developer" },
        { label: "Practice", icon: MessageSquare, path: "/questions", badge: "42", badgeColor: "bg-primary" },
        { label: "Code Reviews", icon: Code2, path: "/code-review" },
        { label: "Interview Prep", icon: Bot, path: "/ai-assistant", badge: "New", badgeColor: "bg-amber-500" },
      ],
    },
    {
      title: "Collaborate",
      items: [
        { label: "Community Groups", icon: Users, path: "/workspace" },
        { label: "Live Coding", icon: Play, path: "/live-coding" },
        { label: "Tutorials", icon: BookOpen, path: "/knowledge" },
      ],
    },
    {
      title: "Opportunities",
      items: [
        { label: "Courses", icon: Sparkles, path: "/pricing" },
        { label: "Jobs & Internships", icon: Briefcase, path: "/jobs" },
        { label: "Leaderboard", icon: Trophy, path: "/leaderboard" },
      ],
    },
  ],
  expert: [
    {
      items: [
        { label: "Expert Hub", icon: LayoutDashboard, path: "/dashboard/expert" },
        { label: "Manage Questions", icon: Star, path: "/questions" },
        { label: "Review Tasks", icon: Code2, path: "/code-review", badge: "8", badgeColor: "bg-primary" },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Author Guides", icon: BookOpen, path: "/knowledge" },
        { label: "Expert Lab", icon: Play, path: "/live-coding" },
      ],
    },
  ],
  recruiter: [
    {
      items: [
        { label: "Recruitment Portal", icon: LayoutDashboard, path: "/dashboard/recruiter" },
        { label: "Active Roles", icon: Briefcase, path: "/jobs" },
        { label: "Search Experts", icon: Search, path: "/leaderboard" },
      ],
    },
    {
      title: "Interviewing",
      items: [
        { label: "Live Assessment", icon: Calendar, path: "/live-coding" },
        { label: "Analytics", icon: BarChart3, path: "/analytics" },
      ],
    },
  ],
  admin: [
    {
      items: [
        { label: "System Console", icon: LayoutDashboard, path: "/dashboard/admin" },
        { label: "User Directory", icon: Users, path: "/admin/users" },
        { label: "Moderation", icon: Shield, path: "/admin/moderation" },
      ],
    },
    {
      title: "Controls",
      items: [
        { label: "System Reports", icon: Flag, path: "/admin/reports", badge: "12", badgeColor: "bg-red-500" },
        { label: "Verification", icon: UserCheck, path: "/admin/verification", badge: "3", badgeColor: "bg-amber-500" },
      ],
    },
  ],
};

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const sections = SIDEBAR_CONFIG[user.role];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed left-0 top-20 h-[calc(100vh-80px)] w-80 bg-white dark:bg-slate-900 border-r border-slate-100/50 dark:border-slate-800 flex flex-col z-40 transition-transform duration-500 shadow-[20px_0_50px_rgba(0,0,0,0.02)] dark:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* User Summary */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold border border-primary/20">
               {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{user.role}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{user.reputation.toLocaleString()}</span>
            </div>
            <Link to="/profile" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-tight">Edit Profile</Link>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              {section.title && (
                <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {section.title}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path || location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => window.innerWidth < 1024 && onClose()}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive 
                          ? "bg-primary text-white shadow-md shadow-primary/20" 
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary"
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'group-hover:text-primary'}`} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : `${item.badgeColor || 'bg-slate-100 dark:bg-slate-800'} ${item.badgeColor ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Contribution Status</p>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Level 4 Verified</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
