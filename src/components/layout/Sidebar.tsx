import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, MessageSquare, Code2, Bot, Users, Briefcase,
  BarChart3, Settings, BookOpen, Play, Trophy, Star, UserCheck,
  Shield, Flag, Bell, FileText, Building, Search, Calendar,
  GitBranch, Flame, X, ChevronRight,
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
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/developer" },
        { label: "Questions", icon: MessageSquare, path: "/questions", badge: "42", badgeColor: "bg-blue-500" },
        { label: "Code Reviews", icon: Code2, path: "/code-review" },
        { label: "AI Assistant", icon: Bot, path: "/ai-assistant", badge: "New", badgeColor: "bg-green-500" },
      ],
    },
    {
      title: "Collaborate",
      items: [
        { label: "Team Workspace", icon: Users, path: "/workspace" },
        { label: "Live Coding", icon: Play, path: "/live-coding" },
        { label: "Knowledge Base", icon: BookOpen, path: "/knowledge" },
      ],
    },
    {
      title: "Career",
      items: [
        { label: "Jobs & Projects", icon: Briefcase, path: "/jobs", badge: "5", badgeColor: "bg-amber-500" },
      ],
    },
    {
      title: "Insights",
      items: [
        { label: "Analytics", icon: BarChart3, path: "/analytics" },
        { label: "Leaderboard", icon: Trophy, path: "/leaderboard" },
        { label: "Profile", icon: Settings, path: "/profile" },
      ],
    },
  ],
  expert: [
    {
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/expert" },
        { label: "Mentorship", icon: Star, path: "/questions" },
        { label: "Code Reviews", icon: Code2, path: "/code-review", badge: "8", badgeColor: "bg-blue-500" },
      ],
    },
    {
      title: "Create & Teach",
      items: [
        { label: "Tutorials", icon: BookOpen, path: "/knowledge" },
        { label: "Live Coding", icon: Play, path: "/live-coding" },
        { label: "AI Review Tools", icon: Bot, path: "/ai-assistant" },
      ],
    },
    {
      title: "Community",
      items: [
        { label: "Analytics", icon: BarChart3, path: "/analytics" },
        { label: "Contributions", icon: GitBranch, path: "/leaderboard" },
        { label: "Profile", icon: Settings, path: "/profile" },
      ],
    },
  ],
  recruiter: [
    {
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/recruiter" },
        { label: "Job Postings", icon: Briefcase, path: "/jobs" },
        { label: "Candidates", icon: Search, path: "/leaderboard" },
      ],
    },
    {
      title: "Hiring",
      items: [
        { label: "Interviews", icon: Calendar, path: "/live-coding" },
        { label: "Team Workspace", icon: Users, path: "/workspace" },
        { label: "Hiring Analytics", icon: BarChart3, path: "/analytics" },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Company Profile", icon: Building, path: "/profile" },
        { label: "Settings", icon: Settings, path: "/profile/settings" },
      ],
    },
  ],
  admin: [
    {
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/admin" },
        { label: "User Management", icon: Users, path: "/admin/users" },
        { label: "Moderation", icon: Shield, path: "/admin/moderation" },
      ],
    },
    {
      title: "Content",
      items: [
        { label: "Questions", icon: MessageSquare, path: "/questions" },
        { label: "Reports", icon: Flag, path: "/admin/reports", badge: "12", badgeColor: "bg-red-500" },
        { label: "Featured Content", icon: FileText, path: "/knowledge" },
      ],
    },
    {
      title: "Platform",
      items: [
        { label: "Analytics", icon: BarChart3, path: "/analytics" },
        { label: "Expert Verification", icon: UserCheck, path: "/admin/verification", badge: "3", badgeColor: "bg-amber-500" },
        { label: "Notifications", icon: Bell, path: "/notifications" },
        { label: "System Settings", icon: Settings, path: "/profile/settings" },
      ],
    },
  ],
};

const ROLE_COLORS: Record<UserRole, string> = {
  developer: "from-blue-500 to-cyan-500",
  expert: "from-amber-500 to-orange-500",
  recruiter: "from-purple-500 to-pink-500",
  admin: "from-red-500 to-rose-500",
};

const ROLE_LABELS: Record<UserRole, string> = {
  developer: "Developer",
  expert: "Expert",
  recruiter: "Recruiter",
  admin: "Admin",
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const sections = SIDEBAR_CONFIG[user.role];
  const roleColor = ROLE_COLORS[user.role];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-slate-950/95 backdrop-blur-xl border-r border-border flex flex-col z-30 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* User info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full bg-slate-700 ring-2 ring-border"
              />
              <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-gradient-to-br ${roleColor} ring-2 ring-slate-950`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <span className={`text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${roleColor} bg-clip-text text-transparent`}>
                {ROLE_LABELS[user.role]}
              </span>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="text-center">
              <p className="text-xs font-bold text-amber-400">{(user.reputation / 1000).toFixed(1)}k</p>
              <p className="text-[10px] text-slate-600">Rep</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-xs font-bold text-blue-400">{user.streak}</p>
              <p className="text-[10px] text-slate-600">Streak</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-green-400">{user.contributions}</p>
              <p className="text-[10px] text-slate-600">Posts</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar">
          {sections.map((section, si) => (
            <div key={si}>
              {section.title && (
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 px-3 mb-2">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path || 
                    (item.path !== "/" && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => window.innerWidth < 1024 && onClose()}
                      className={isActive ? "sidebar-item-active" : "sidebar-item"}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white ${item.badgeColor || "bg-slate-600"}`}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="w-3 h-3 text-blue-400" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Streak indicator */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <Flame className="w-4 h-4 text-amber-400" />
            <div>
              <p className="text-xs font-bold text-amber-400">{user.streak} Day Streak!</p>
              <p className="text-[10px] text-slate-500">Keep it going 🔥</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
