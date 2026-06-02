import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useThemeContext } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Moon, Sun, Menu, X, Code2, ChevronDown,
  Bell, User, LogOut, Settings, LayoutDashboard,
  MessageSquare, BookOpen, Bot, GitBranch, Users,
  Monitor, Briefcase, Trophy, BarChart3, Search
} from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const productLinks = [
  { href: '/questions', label: 'Questions', icon: MessageSquare, desc: 'Ask & answer technical questions' },
  { href: '/knowledge-base', label: 'Knowledge Base', icon: BookOpen, desc: 'Tutorials, guides & docs' },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Bot, desc: 'Smart coding & debug helper' },
  { href: '/code-review', label: 'Code Reviews', icon: GitBranch, desc: 'AI-powered code validation' },
  { href: '/teams', label: 'Teams', icon: Users, desc: 'Collaborative workspaces' },
  { href: '/live-coding', label: 'Live Coding', icon: Monitor, desc: 'Pair programming sessions' },
];

const communityLinks = [
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Navbar({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setProductOpen(false); }, [location.pathname]);

  const isDark = location.pathname === '/' && !scrolled;

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-sm' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center group-hover:scale-105 transition-transform">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Stack<span className="text-gradient-blue">Truth</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Product Dropdown */}
            <div className="relative" onMouseEnter={() => setProductOpen(true)} onMouseLeave={() => setProductOpen(false)}>
              <button className={cn(
                'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                productOpen ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}>
                Product <ChevronDown className={cn('w-3 h-3 transition-transform', productOpen && 'rotate-180')} />
              </button>
              {productOpen && (
                <div className="absolute top-full left-0 pt-2 w-80">
                  <div className="bg-card border border-border rounded-xl shadow-xl p-2">
                    {productLinks.map(link => {
                      const Icon = link.icon;
                      return (
                        <Link key={link.href} to={link.href} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{link.label}</p>
                            <p className="text-xs text-muted-foreground">{link.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {communityLinks.map(link => {
              const Icon = link.icon;
              return (
                <Link key={link.href} to={link.href} className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  location.pathname === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}>
                  <Icon className="w-3.5 h-3.5" /> {link.label}
                </Link>
              );
            })}

            <Link to="/pricing" className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              location.pathname === '/pricing' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}>Pricing</Link>
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-2">
            <button onClick={toggleTheme} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {isAuthenticated ? (
              <>
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
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}><LayoutDashboard className="w-4 h-4 mr-2" />Dashboard</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}><User className="w-4 h-4 mr-2" />Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}><Settings className="w-4 h-4 mr-2" />Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/login')} className="text-destructive"><LogOut className="w-4 h-4 mr-2" />Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild><Link to="/login">Sign In</Link></Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90 btn-glow" asChild><Link to="/register">Get Started Free</Link></Button>
              </>
            )}
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
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1">Product</p>
            {productLinks.map(link => {
              const Icon = link.icon;
              return (
                <Link key={link.href} to={link.href} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <Icon className="w-4 h-4" /> {link.label}
                </Link>
              );
            })}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-1 mt-2">Community</p>
            {communityLinks.map(link => {
              const Icon = link.icon;
              return (
                <Link key={link.href} to={link.href} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <Icon className="w-4 h-4" /> {link.label}
                </Link>
              );
            })}
            <Link to="/pricing" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">Pricing</Link>
            <div className="pt-3 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="justify-start" asChild><Link to="/dashboard"><LayoutDashboard className="w-4 h-4 mr-2" />Dashboard</Link></Button>
                  <Button variant="ghost" className="justify-start text-destructive hover:text-destructive" asChild><Link to="/login"><LogOut className="w-4 h-4 mr-2" />Sign Out</Link></Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild><Link to="/login">Sign In</Link></Button>
                  <Button className="bg-primary" asChild><Link to="/register">Get Started Free</Link></Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
