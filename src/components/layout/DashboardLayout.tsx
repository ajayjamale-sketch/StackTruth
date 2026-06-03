import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useThemeContext } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Moon, Sun, Menu, X, Code2, ChevronDown,
  Bell, User, LogOut, Settings, LayoutDashboard,
  Search, Plus, Home
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: { name: string; avatar: string; reputation: number; role?: string };
  navItems: NavItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DashboardLayout({ children, user, navItems, activeTab, setActiveTab }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(true);
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center group-hover:scale-105 transition-transform">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Stack<span className="text-gradient-blue">Truth</span>
          </span>
        </Link>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{user.name}</p>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-primary font-medium">{user.reputation ? user.reputation.toLocaleString() + ' rep' : user.role}</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2 mt-2">Navigation</p>
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                activeTab === item.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && <Badge className="text-[10px] h-4 px-1.5 bg-primary text-white">{item.badge}</Badge>}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border space-y-1">
        <button onClick={() => { navigate('/settings'); setMobileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Settings className="w-4 h-4" /> Settings
        </button>
        <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 fixed inset-y-0 left-0 bg-card border-r border-border flex-col z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="w-[280px] max-w-[80vw] bg-card border-r border-border flex flex-col shadow-2xl relative z-10 h-full transform transition-transform">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0">
        {/* Header / Navbar */}
        <header className="sticky top-0 z-40 h-16 bg-background/95 backdrop-blur-lg border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Global Search */}
              <button type="button" onClick={() => setSearchOpen(true)} className="relative w-full max-w-md flex items-center justify-start text-muted-foreground bg-muted/50 hover:bg-muted/70 transition-colors h-9 px-3 rounded-lg text-sm border-none">
                <Search className="w-4 h-4 mr-2" />
                <span className="flex-1 text-left">Search questions, code, or users...</span>
                <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-auto">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button size="sm" className="hidden sm:flex bg-primary hover:bg-primary/90 h-9" onClick={() => navigate('/questions/ask')}>
              <Plus className="w-4 h-4 mr-1.5" /> New Question
            </Button>

            <button onClick={toggleTheme} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button onClick={() => navigate('/notifications')} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-muted transition-colors border border-transparent hover:border-border">
                  <img src={user.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover" />
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">user@stacktruth.dev</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}><User className="w-4 h-4 mr-2" />Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}><Settings className="w-4 h-4 mr-2" />Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/')}><Home className="w-4 h-4 mr-2" />Back to Home</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/login')} className="text-destructive"><LogOut className="w-4 h-4 mr-2" />Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-5 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Global Search Command Palette */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => { setSearchOpen(false); navigate('/questions'); }}>
              <Code2 className="mr-2 h-4 w-4" />
              <span>Browse Questions</span>
            </CommandItem>
            <CommandItem onSelect={() => { setSearchOpen(false); navigate('/leaderboard'); }}>
              <User className="mr-2 h-4 w-4" />
              <span>Top Contributors</span>
            </CommandItem>
            <CommandItem onSelect={() => { setSearchOpen(false); navigate('/jobs'); }}>
              <Home className="mr-2 h-4 w-4" />
              <span>Job Board</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => { setSearchOpen(false); navigate('/profile'); }}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </CommandItem>
            <CommandItem onSelect={() => { setSearchOpen(false); navigate('/settings'); }}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
