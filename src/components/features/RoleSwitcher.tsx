import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Key, Shield, User, Users, Briefcase, RefreshCw, X, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import type { UserRole } from "@/types";

export default function RoleSwitcher() {
  const { user, loginAsRole, isAuthenticated } = useAuth();
  const { success, info } = useToast();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isRecalibrating, setIsRecalibrating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuthenticated || !user) return null;

  const rolesList: { role: UserRole; label: string; icon: React.ElementType; color: string; desc: string; path: string }[] = [
    {
      role: "developer",
      label: "Developer / Engineer",
      icon: User,
      color: "text-emerald-500 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10",
      desc: "Code reviews, AI assistant, team workspaces, apply for projects.",
      path: "/dashboard/developer",
    },
    {
      role: "expert",
      label: "Technical Expert / Mentor",
      icon: Sparkles,
      color: "text-amber-500 border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10",
      desc: "Peer reviews, approve answers, tutorials, interview sessions.",
      path: "/dashboard/expert",
    },
    {
      role: "recruiter",
      label: "Recruiter / Company",
      icon: Briefcase,
      color: "text-blue-500 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10",
      desc: "Hiring boards, discovery filters, pipeline management, shortlist candidates.",
      path: "/dashboard/recruiter",
    },
    {
      role: "admin",
      label: "Admin / Moderator",
      icon: Shield,
      color: "text-rose-500 border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10",
      desc: "System console, moderation queue, user directory, verification metrics.",
      path: "/dashboard/admin",
    },
  ];

  const handleRoleChange = async (targetRole: UserRole, targetPath: string) => {
    if (user.role === targetRole) return;
    setIsRecalibrating(true);
    info("Recalibrating Authority", `Decrypting credentials for ${targetRole.toUpperCase()} clearances...`);
    
    // Simulate authority change animation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    loginAsRole(targetRole);
    success("Access Key Accepted", `Switched to ${targetRole.toUpperCase()} credentials. Session updated.`);
    setIsRecalibrating(false);
    setIsOpen(false);
    
    // Smooth transition redirect
    navigate(targetPath);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end" ref={menuRef}>
      {/* Floating Panel */}
      {isOpen && (
        <div className="mb-4 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-5 space-y-4 animate-in fade-in-up duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Security Terminal</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-900 dark:text-white">Switch Security Profiles</p>
            <p className="text-[10px] text-slate-400 font-medium">Select a role credential below to recalibrate the portal workspace instantly.</p>
          </div>

          <div className="space-y-3 pt-2">
            {rolesList.map((item) => {
              const isActive = user.role === item.role;
              return (
                <button
                  key={item.role}
                  disabled={isRecalibrating}
                  onClick={() => handleRoleChange(item.role, item.path)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                    isActive
                      ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/10"
                      : `${item.color} border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300`
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-white dark:bg-slate-800 border ${isActive ? "border-primary/20 text-primary" : "border-slate-100 dark:border-slate-700"} flex-shrink-0 mt-0.5`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black uppercase tracking-wider">{item.label}</p>
                      {isActive && (
                        <span className="text-[8px] font-black text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded uppercase tracking-widest">Active</span>
                      )}
                    </div>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 leading-normal">{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {isRecalibrating && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl gap-3 text-white">
              <RefreshCw className="w-8 h-8 text-primary animate-spin" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Recalibrating Access...</p>
            </div>
          )}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden border border-white/10 dark:border-black/5"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        <RefreshCw className={`w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-700 ${isRecalibrating ? 'animate-spin' : ''}`} />
        <span className="text-[10px] uppercase tracking-[0.2em]">DEMO SWITCHER</span>
        <span className="text-[8px] font-black bg-primary text-white border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-widest leading-none">
          {user.role}
        </span>
      </button>
    </div>
  );
}
