import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, Bell, Sun, Moon, ChevronDown, LogOut, Settings,
  User, Sparkles, Zap, Menu, X, Plus, Shield,
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
  const [showMobileNav, setShowMobileNav] = useState(false);
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
    <nav className="sticky top-0 z-50 h-20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border-b border-slate-100/50 dark:border-slate-800/50 shadow-sm">
      <div className="h-full px-12 flex items-center justify-between gap-12 max-w-[2000px] mx-auto">
        {/* Left: Logo + Menu */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {isAuthenticated ? (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/90 transition-all shadow-sm">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="logo-font text-2xl text-primary leading-none">
                StackTruth
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-0.5">LEARN • PRACTICE • VERIFY</span>
            </div>
          </Link>
          
          {/* Main Nav Links - Publicly Visible */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/tutorials" className="nav-link">Tutorials</Link>
            <Link to="/knowledge" className="nav-link">Library</Link>
            <Link to="/questions" className="nav-link">Practice</Link>
            <Link to="/pricing" className="nav-link">Courses</Link>
            <Link to="/jobs" className="nav-link">Jobs</Link>
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <form onSubmit={handleSearch}>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
                className="w-full bg-muted/50 border border-border rounded-md pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-background transition-all"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden lg:flex gap-1">
                <kbd className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">⌘</kbd>
                <kbd className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">K</kbd>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground" onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/questions/ask"
                className="hidden sm:flex items-center gap-2 bg-primary text-white text-xs font-black px-4 py-2 rounded-md transition-all active:scale-95 shadow-lg shadow-primary/20 hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:block">Post Question</span>
              </Link>

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-background" />
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2">
                    <NotificationDropdown onClose={() => setShowNotifications(false)} />
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-1 rounded-md hover:bg-muted transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    ) : (
                      <span className="text-sm font-black text-primary uppercase">{user?.name.charAt(0)}</span>
                    )}
                  </div>
                  <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 card-elevated p-2 z-50">
                    <div className="px-4 py-3 border-b border-border mb-2">
                      <p className="text-sm font-bold text-foreground leading-none mb-1">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: '65%' }} />
                        </div>
                        <span className="text-[10px] font-black text-accent uppercase tracking-widest">{user?.reputation.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all font-medium"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <Link
                        to={getDashboardPath()}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all font-medium"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Zap className="w-4 h-4" /> Workspace
                      </Link>
                      <Link
                        to="/profile/settings"
                        className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-all font-medium"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                    </div>
                    
                    <div className="mt-2 pt-2 border-t border-border">
                      <button
                        onClick={() => { logout(); setShowUserMenu(false); navigate("/"); }}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-md transition-all font-bold w-full"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
              <Link to="/register" className="btn-primary text-xs px-5 py-2">Join Free</Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="md:hidden p-4 border-t border-border animate-fade-in-up">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                autoFocus
                className="w-full bg-muted border border-border rounded-md pl-10 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </form>
        </div>
      )}

      {/* Mobile Nav Menu */}
      {showMobileNav && !isAuthenticated && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in-up">
          <div className="px-6 py-4 space-y-1">
            {[
              { label: "Tutorials", path: "/tutorials" },
              { label: "Practice", path: "/questions" },
              { label: "Courses", path: "/pricing" },
              { label: "Jobs", path: "/jobs" },
              { label: "Leaderboard", path: "/leaderboard" },
              { label: "About", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setShowMobileNav(false)}
                className="block px-4 py-3 text-sm font-semibold text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
