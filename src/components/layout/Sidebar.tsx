import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, MessageSquare, Code2, Bot, Users, Briefcase,
  BarChart3, Settings, BookOpen, Play, Trophy, Star, UserCheck,
  Shield, Flag, Bell, FileText, Building, Search, Calendar,
  GitBranch, Sparkles, X, ChevronRight, Zap, Sun, Moon, LogOut,
  ChevronDown, PanelLeftClose, PanelLeft, Award
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/contexts/ToastContext";
import { useSidebar } from "@/contexts/SidebarContext";
import type { UserRole } from "@/types";

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: string | number;
  badgeColor?: string;
  subItems?: { label: string; path: string }[];
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

const SIDEBAR_CONFIG: Record<UserRole, SidebarSection[]> = {
  developer: [
    {
      title: "Core Workspace",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/developer" },
        { label: "Questions", icon: MessageSquare, path: "/questions" },
        { label: "Code Reviews", icon: Code2, path: "/code-review" },
        { label: "AI Assistant", icon: Bot, path: "/ai-assistant", badge: "AI", badgeColor: "bg-amber-500" },
      ],
    },
    {
      title: "Resources & Careers",
      items: [
        { label: "Team Workspace", icon: Users, path: "/workspace" },
        { label: "Jobs", icon: Briefcase, path: "/jobs" },
        { label: "Analytics", icon: BarChart3, path: "/analytics" },
        { label: "Profile Settings", icon: Settings, path: "/profile/settings" },
      ],
    },
  ],
  expert: [
    {
      title: "Expert Portal",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/expert" },
        { label: "Mentorship", icon: Award, path: "/expert/mentorship" },
        { label: "Code Reviews", icon: Code2, path: "/code-review", badge: "8", badgeColor: "bg-primary" },
      ],
    },
    {
      title: "Contributions",
      items: [
        { label: "Tutorials", icon: BookOpen, path: "/tutorials" },
        { label: "Live Coding", icon: Play, path: "/live-coding" },
        { label: "Analytics", icon: BarChart3, path: "/analytics" },
        { label: "Community Contributions", icon: Users, path: "/community" },
      ],
    },
  ],
  recruiter: [
    {
      title: "Recruiter Portal",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/recruiter" },
        { label: "Job Postings", icon: Briefcase, path: "/jobs" },
      ],
    },
    {
      title: "Talent Acquisition",
      items: [
        { label: "Candidates", icon: Users, path: "/recruiter/candidates" },
        { label: "Interviews", icon: Calendar, path: "/recruiter/interviews" },
        { label: "Hiring Analytics", icon: BarChart3, path: "/analytics" },
        { label: "Company Profile", icon: Building, path: "/profile" },
      ],
    },
  ],
  admin: [
    {
      title: "Control Panel",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/admin" },
        { label: "User Management", icon: Users, path: "/admin/users" },
        { label: "Moderation", icon: Shield, path: "/admin/moderation" },
        { label: "Reports", icon: Flag, path: "/admin/reports", badge: "12", badgeColor: "bg-red-500" },
      ],
    },
    {
      title: "System Administration",
      items: [
        { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
        { label: "System Settings", icon: Settings, path: "/admin/settings" },
        { label: "Expert Verification", icon: UserCheck, path: "/admin/verification", badge: "3", badgeColor: "bg-amber-500" },
        { label: "Notifications", icon: Bell, path: "/notifications" },
      ],
    },
  ],
};

export default function Sidebar({ 
  isOpen, 
  onClose
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { success } = useToast();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    // Auto-expand current path section
    SIDEBAR_CONFIG[user?.role || "developer"].forEach(section => {
      section.items.forEach(item => {
        if (item.subItems?.some(si => location.pathname.startsWith(si.path))) {
          if (!expandedItems.includes(item.label)) {
            setExpandedItems(prev => [...prev, item.label]);
          }
        }
      });
    });
  }, [location.pathname, user?.role]);

  if (!user) return null;

  const sections = SIDEBAR_CONFIG[user.role];

  const toggleExpand = (label: string) => {
    if (isCollapsed) setIsCollapsed(false);
    setExpandedItems(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);
  };

  const handleLogout = () => {
    logout();
    success("Session Terminated", "You have been logged out of the secure network.");
    // Force a small tick to ensure state updates before navigation
    setTimeout(() => {
      navigate("/", { replace: true });
      window.scrollTo(0, 0);
    }, 100);
  };

  const isAdminPage = location.pathname.startsWith("/admin") || location.pathname.startsWith("/dashboard/admin");

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60] lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed left-0 ${isAdminPage ? "top-0 h-screen" : "top-0 h-screen lg:top-20 lg:h-[calc(100vh-80px)]"} bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col z-[70] lg:z-40 transition-all duration-500 shadow-2xl dark:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${isCollapsed ? "w-20" : "w-80"}`}>
        
        {/* Collapse Toggle - Desktop Only */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-4 top-10 w-8 h-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full items-center justify-center text-slate-400 hover:text-primary shadow-xl z-50 transition-all active:scale-90"
        >
          {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>

        {/* User Profile Summary */}
        <div className={`p-6 border-b border-slate-50 dark:border-slate-800/50 transition-all overflow-hidden ${isCollapsed ? "px-4" : "px-6"}`}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black border border-primary/20 flex-shrink-0">
                 {user.name.charAt(0)}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0 animate-in fade-in slide-in-from-left-2 duration-500">
                  <p className="text-sm font-black text-slate-950 dark:text-white truncate">{user.name}</p>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{user.role}</p>
                </div>
              )}
            </div>
            
            {/* Mobile Close Button */}
            {isOpen && (
              <button 
                onClick={onClose}
                aria-label="Close sidebar"
                className="lg:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Nav Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              {section.title && !isCollapsed && (
                <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 animate-in fade-in duration-700">
                  {section.title}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path || (item.path !== "/dashboard/developer" && location.pathname.startsWith(item.path));
                  const isExpanded = expandedItems.includes(item.label);
                  const hasSubItems = item.subItems && item.subItems.length > 0;

                  return (
                    <div key={item.label} className="space-y-1">
                      {hasSubItems ? (
                        <button
                          onClick={() => toggleExpand(item.label)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all group ${
                            isActive && !isCollapsed ? "text-primary bg-primary/5" : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary"
                          }`}
                        >
                          <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1 text-left">{item.label}</span>
                              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90 text-primary' : 'text-slate-300'}`} />
                            </>
                          )}
                        </button>
                      ) : (
                      <Link
                        to={item.path}
                        onClick={() => window.innerWidth < 1024 && onClose()}
                        title={isCollapsed ? item.label : ""}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all group ${
                          isActive 
                            ? "bg-primary text-white shadow-xl shadow-primary/20" 
                            : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-primary"
                        }`}
                      >
                        <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'group-hover:text-primary'}`} />
                        {!isCollapsed && (
                          <>
                            <span className="flex-1">{item.label}</span>
                            {item.badge && (
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black ${isActive ? 'bg-white/20 text-white' : `${item.badgeColor || 'bg-slate-100 dark:bg-slate-800'} ${item.badgeColor ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`}`}>
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Link>
                      )}

                      {/* Sub Items */}
                      {hasSubItems && isExpanded && !isCollapsed && (
                        <div className="ml-9 space-y-1 animate-in slide-in-from-top-2 duration-300">
                          {item.subItems!.map(sub => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              onClick={() => window.innerWidth < 1024 && onClose()}
                              className={`block px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                location.pathname === sub.path 
                                  ? "text-primary bg-primary/5" 
                                  : "text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-white/5"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Global Controls Footer */}
        <div className="p-4 border-t border-slate-50 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/50">
          <button 
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-white/5 hover:text-primary hover:shadow-sm ${isCollapsed ? "justify-center px-0" : ""}`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {!isCollapsed && <span>{isDark ? "Light Interface" : "Dark Interface"}</span>}
          </button>
          
          <button 
            onClick={() => navigate("/profile/settings")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-white/5 hover:text-primary hover:shadow-sm ${isCollapsed ? "justify-center px-0" : ""}`}
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span>Control Settings</span>}
          </button>

          <button 
            type="button"
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:shadow-sm relative z-50 ${isCollapsed ? "justify-center px-0" : ""}`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Terminate Session</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
