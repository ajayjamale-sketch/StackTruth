import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code2, Github, Eye, EyeOff, ArrowRight, Loader2, Zap, Shield, Star, Briefcase, Sun, Moon } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useThemeContext } from '@/context/ThemeContext';

// Utility function – should be moved to @/lib/utils in a real project
const cn = (...classes: (string | false | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});
type FormData = z.infer<typeof schema>;

const devAccounts = [
  { label: 'Developer', icon: Code2, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30', dest: '/dashboard', desc: 'Full developer dashboard' },
  { label: 'Expert', icon: Star, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/30', dest: '/dashboard/expert', desc: 'Expert review panel' },
  { label: 'Recruiter', icon: Briefcase, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30', dest: '/dashboard/recruiter', desc: 'Hiring & talent dashboard' },
  { label: 'Admin', icon: Shield, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30', dest: '/dashboard/admin', desc: 'Platform admin panel' },
];

export default function Login() {
  useScrollToTop();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeContext();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bypassLoading, setBypassLoading] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    // Use the entered email address for a personalized message
    toast.success(`Welcome back, ${data.email.split('@')[0]}!`);
    navigate('/dashboard');
  };

  const handleBypass = async (dest: string, label: string) => {
    setBypassLoading(label);
    await new Promise(r => setTimeout(r, 800));
    setBypassLoading(null);
    toast.success(`Logged in as ${label}`);
    navigate(dest);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel – unchanged, but all custom classes (e.g. bg-gradient-brand) must exist in your Tailwind config */}
      <div className="hidden lg:flex lg:w-5/12 section-dark relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.2),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,197,94,0.1),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)`, backgroundSize: '50px 50px' }} />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground text-lg">Stack<span className="text-blue-600 dark:text-blue-400">Truth</span></span>
          </Link>

          {/* Code preview */}
          <div className="bg-card/90 border border-surface-10 rounded-xl p-4 font-mono text-xs mb-8">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="text-muted-foreground ml-2 text-[10px]">solution.ts</span>
            </div>
            <div className="space-y-0.5">
              <p><span className="text-blue-600 dark:text-blue-400">async function</span> <span className="text-green-600 dark:text-green-400">validateCode</span><span className="text-foreground">(</span><span className="text-yellow-600 dark:text-yellow-400">snippet</span><span className="text-foreground">: string) {`{`}</span></p>
              <p className="pl-4"><span className="text-blue-600 dark:text-blue-400">const</span> <span className="text-foreground">result</span> <span className="text-muted-foreground">= await</span> <span className="text-green-600 dark:text-green-400">aiReview</span><span className="text-foreground">(snippet);</span></p>
              <p className="pl-4"><span className="text-purple-600 dark:text-purple-400">return</span> <span className="text-foreground">{`{`}</span></p>
              <p className="pl-8"><span className="text-yellow-600 dark:text-yellow-400">score</span><span className="text-muted-foreground">: result.quality,</span></p>
              <p className="pl-8"><span className="text-yellow-600 dark:text-yellow-400">issues</span><span className="text-muted-foreground">: result.bugs,</span></p>
              <p className="pl-4"><span className="text-foreground">{`};`}</span></p>
              <p><span className="text-foreground">{`}`}</span></p>
            </div>
          </div>

          <blockquote className="text-muted-foreground text-sm leading-relaxed mb-4 italic">
            &ldquo;StackTruth completely changed how I approach code reviews. The AI catches things even senior engineers miss.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face" alt="Priya" className="w-10 h-10 rounded-full object-cover ring-2 ring-white/20" />
            <div>
              <p className="text-foreground font-medium text-sm">Priya Nair</p>
              <p className="text-muted-foreground text-xs">Full-Stack Developer · Vercel</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex gap-4 text-muted-foreground text-xs">
          <span>180K+ Developers</span><span>·</span><span>2.4M+ Solutions</span><span>·</span><span>SOC 2 Certified</span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold">Stack<span className="text-primary">Truth</span></span>
          </Link>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/register">Create account</Link>
            </Button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
              <p className="text-muted-foreground text-sm">Sign in to your StackTruth account</p>
            </div>

            {/* Dev Bypass Buttons */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Access — No Credentials Needed</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {devAccounts.map(acc => {
                  const Icon = acc.icon;
                  return (
                    <button
                      key={acc.label}
                      type="button"
                      onClick={() => handleBypass(acc.dest, acc.label)}
                      disabled={!!bypassLoading}
                      className={cn(
                        `flex items-center gap-2 p-2.5 rounded-lg border text-left transition-all ${acc.bg}`,
                        bypassLoading === acc.label && 'opacity-70'
                      )}
                    >
                      {bypassLoading === acc.label ? (
                        <Loader2 className={`w-4 h-4 ${acc.color} animate-spin flex-shrink-0`} />
                      ) : (
                        <Icon className={`w-4 h-4 ${acc.color} flex-shrink-0`} />
                      )}
                      <div>
                        <p className="text-xs font-semibold">{acc.label}</p>
                        <p className="text-[10px] text-muted-foreground">{acc.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs text-muted-foreground"><span className="bg-background px-3">or sign in with credentials</span></div>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <Button variant="outline" className="w-full" onClick={() => handleBypass('/dashboard', 'GitHub')} disabled={loading}>
                <Github className="w-4 h-4 mr-2" /> GitHub
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleBypass('/dashboard', 'Google')} disabled={loading}>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-1.5 block">Email address</Label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-sm font-medium">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Input
                    type={showPwd ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPwd ? 'Hide password' : 'Show password'}
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-11" disabled={loading}>
                {loading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing in...</>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-5">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}