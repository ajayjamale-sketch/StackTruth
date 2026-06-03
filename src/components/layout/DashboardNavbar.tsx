import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useThemeContext } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Moon, Sun, Menu, X, Code2, ChevronDown,
  Bell, User, LogOut, Settings, LayoutDashboard,
  MessageSquare, BookOpen, GitBranch, Users,
  Monitor, Briefcase, Home
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const dashboardLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/questions', label: 'Questions', icon: MessageSquare },
  { href: '/code-review', label: 'Code Review', icon: GitBranch },
  { href: '/teams', label: 'Teams', icon: Users },
  { href: '/live-coding', label: 'Live Coding', icon: Monitor },
];

export default function DashboardNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={handleLogoClick} className="flex items-center gap-2 group flex-shrink-0 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center group-hover:scale-105 transition-transform">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Stack<span className="text-gradient-blue">Truth</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {dashboardLinks.map(link => {
              const Icon = link.icon;
              return (
                <Link key={link.href} to={link.href} className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}>
                  <Icon className="w-4 h-4" /> {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-2">
            <button onClick={toggleTheme} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link to="/notifications" className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="Avatar" className="w-7 h-7 rounded-full object-cover" />
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold">Alex Chen</p>
                  <p className="text-xs text-muted-foreground">alex@example.com</p>
                  <Badge variant="secondary" className="text-xs mt-1">4,820 rep</Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}><User className="w-4 h-4 mr-2" />Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}><Settings className="w-4 h-4 mr-2" />Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/')}><Home className="w-4 h-4 mr-2" />Back to Home</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/login')} className="text-destructive"><LogOut className="w-4 h-4 mr-2" />Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-lg border-b border-border max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1">Navigation</p>
            {dashboardLinks.map(link => {
              const Icon = link.icon;
              return (
                <Link key={link.href} to={link.href} className={cn(
                  'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}>
                  <Icon className="w-4 h-4" /> {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Link to="/notifications" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative">
                <Bell className="w-4 h-4" />
                Notifications
                <span className="absolute right-3 w-2 h-2 bg-primary rounded-full" />
              </Link>
              <Button variant="ghost" className="justify-start" asChild><Link to="/profile"><User className="w-4 h-4 mr-2" />Profile</Link></Button>
              <Button variant="ghost" className="justify-start" asChild><Link to="/settings"><Settings className="w-4 h-4 mr-2" />Settings</Link></Button>
              <Button variant="ghost" className="justify-start" asChild><Link to="/"><Home className="w-4 h-4 mr-2" />Back to Home</Link></Button>
              <Button variant="ghost" className="justify-start text-destructive hover:text-destructive" asChild><Link to="/login"><LogOut className="w-4 h-4 mr-2" />Sign Out</Link></Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
