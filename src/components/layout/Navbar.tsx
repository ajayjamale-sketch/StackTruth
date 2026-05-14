import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, Bell, Sun, Moon, ChevronDown, LogOut, Settings,
  User, Code2, Zap, Menu, X, Plus,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { MOCK_NOTIFICATIONS } from "@/constants/mockData";
import NotificationDropdown from "@/components/features/NotificationDropdown";

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, logout, isAuthenticated } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/questions?q=${encodeURIComponent(searchQuery)}`);
  };

  const getDashboardPath = () => {
    if (!user) return "/";
    const paths: Record<string, string> = {
      developer: "/dashboard/developer",
      expert: "/dashboard/expert",
      recruiter: "/dashboard/recruiter",
      admin: "/dashboard/admin",
    };
    return paths[user.role] || "/";
  };

  return (
    <nav className="sticky top-0 z-40 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="h-full px-4 flex items-center justify-between gap-4 max-w-[1800px] mx-auto">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {isAuthenticated && (
            <button
              onClick={onMenuClick}
              className="lg:hidden btn-ghost p-2"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white hidden sm:block">
              Stack<span className="text-blue-400">Truth</span>
            </span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions, code, articles..."
                className="w-full bg-white/5 border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded hidden lg:block">⌘K</kbd>
            </div>
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="md:hidden btn-ghost p-2" onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="btn-ghost p-2 rounded-lg"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/questions/ask"
                className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/20"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden lg:block">Ask Question</span>
              </Link>

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="btn-ghost p-2 relative"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <NotificationDropdown onClose={() => setShowNotifications(false)} />
                )}
              </div>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 hover:bg-white/10 rounded-lg px-2 py-1.5 transition-all"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-7 h-7 rounded-full bg-slate-700 ring-2 ring-blue-500/30"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-white leading-none">{user?.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-500 hidden lg:block" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-border rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-semibold text-white">{user?.name}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span className="text-xs text-amber-400 font-medium">{user?.reputation.toLocaleString()} rep</span>
                      </div>
                    </div>
                    <div className="p-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link
                        to={getDashboardPath()}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Zap className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link
                        to="/profile/settings"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                    </div>
                    <div className="p-1 border-t border-border">
                      <button
                        onClick={() => { logout(); setShowUserMenu(false); navigate("/"); }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all w-full"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-ghost text-sm px-3 py-2">Sign In</Link>
              <Link to="/register" className="btn-primary text-sm px-4 py-2">Get Started</Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                autoFocus
                className="w-full bg-white/5 border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </form>
        </div>
      )}
    </nav>
  );
}
