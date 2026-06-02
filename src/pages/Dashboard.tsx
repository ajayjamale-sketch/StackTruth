import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, MessageSquare, GitBranch, Bot, Bookmark,
  Bell, Plus, TrendingUp, Award, Code2, ArrowRight,
  Users, ChevronRight, Zap, BarChart3, Settings, LogOut
} from 'lucide-react';
import { mockUser, mockQuestions, mockBlogs } from '@/lib/mockData';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const repData = [
  { month: 'Aug', rep: 3900 }, { month: 'Sep', rep: 4200 }, { month: 'Oct', rep: 4480 },
  { month: 'Nov', rep: 4600 }, { month: 'Dec', rep: 4820 },
];

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'questions', label: 'My Questions', icon: MessageSquare },
  { id: 'answers', label: 'My Answers', icon: MessageSquare },
  { id: 'reviews', label: 'Code Reviews', icon: GitBranch },
  { id: 'ai', label: 'AI Assistant', icon: Bot },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: 4 },
];

const quickActions = [
  { label: 'Ask Question', href: '/questions/ask', icon: MessageSquare, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { label: 'Code Review', href: '/code-review', icon: GitBranch, color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  { label: 'AI Assistant', href: '/ai-assistant', icon: Bot, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  { label: 'Analytics', href: '/analytics', icon: BarChart3, color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
];

const notifications = [
  { type: 'answer', msg: 'Priya N. answered your question about PostgreSQL transactions', time: '5m', read: false },
  { type: 'upvote', msg: 'Your answer received 12 new upvotes today', time: '1h', read: false },
  { type: 'review', msg: 'Code review request from Backend Team is ready', time: '2h', read: false },
  { type: 'badge', msg: 'You earned the "Helpful Mentor" badge!', time: '1d', read: true },
];

export default function Dashboard() {
  useScrollToTop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const user = mockUser;

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} hidden lg:flex flex-col bg-card border-r border-border min-h-[calc(100vh-64px)] flex-shrink-0 transition-all duration-300`}>
          {/* Profile */}
          {sidebarOpen && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{user.name}</p>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-primary font-medium">{user.reputation.toLocaleString()} rep</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <nav className="flex-1 p-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === item.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && <Badge className="text-[10px] h-4 px-1.5 bg-primary text-white">{item.badge}</Badge>}
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {sidebarOpen && (
            <div className="p-3 border-t border-border space-y-1">
              <button onClick={() => navigate('/settings')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-5 lg:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-5 max-w-5xl">
              {/* Welcome */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
                  <p className="text-muted-foreground text-sm mt-0.5">You have 4 new notifications and 2 pending reviews</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 flex-shrink-0" onClick={() => navigate('/questions/ask')}>
                  <Plus className="w-4 h-4 mr-2" /> Ask Question
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Reputation', value: user.reputation.toLocaleString(), sub: '+240 this month', color: 'text-primary' },
                  { label: 'Questions', value: user.stats.questions, sub: '47 total', color: 'text-blue-400' },
                  { label: 'Answers', value: user.stats.answers, sub: '183 total', color: 'text-green-400' },
                  { label: 'Code Reviews', value: user.stats.reviews, sub: '92 completed', color: 'text-purple-400' },
                ].map((stat, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {quickActions.map(action => {
                    const Icon = action.icon;
                    return (
                      <Link key={action.label} to={action.href} className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${action.color} hover:scale-105 transition-transform text-center`}>
                        <Icon className="w-6 h-6" />
                        <span className="text-xs font-medium">{action.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-5">
                {/* Reputation Chart */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Reputation Trend</h3>
                    <Link to="/analytics" className="text-xs text-primary hover:underline">Full Analytics →</Link>
                  </div>
                  <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={repData}>
                      <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(221 83% 53%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(221 83% 53%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="rep" stroke="hsl(221 83% 53%)" fill="url(#grad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Notifications */}
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <h3 className="font-semibold text-sm">Recent Activity</h3>
                    <Link to="/notifications" className="text-xs text-primary hover:underline">View all</Link>
                  </div>
                  <div className="divide-y divide-border">
                    {notifications.map((n, i) => (
                      <div key={i} className={`px-4 py-3 ${!n.read ? 'bg-primary/3' : ''}`}>
                        <p className={`text-xs leading-relaxed ${!n.read ? 'font-medium' : 'text-muted-foreground'}`}>{n.msg}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{n.time} ago</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Questions */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h3 className="font-semibold">Recent Questions</h3>
                  <Link to="/questions" className="text-xs text-primary hover:underline">View all →</Link>
                </div>
                <div className="divide-y divide-border">
                  {mockQuestions.map(q => (
                    <Link key={q.id} to={`/questions/${q.id}`} className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1 hover:text-primary transition-colors">{q.title}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {q.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 text-xs text-muted-foreground">
                        <span>{q.votes} votes</span>
                        <span className={`px-2 py-0.5 rounded ${q.accepted ? 'bg-accent/10 text-accent' : 'bg-muted'}`}>{q.answers} ans</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">My Questions</h2>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => navigate('/questions/ask')}>
                  <Plus className="w-4 h-4 mr-1" /> Ask
                </Button>
              </div>
              <div className="space-y-3">
                {mockQuestions.map(q => (
                  <Link key={q.id} to={`/questions/${q.id}`} className="block bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
                    <p className="font-medium text-sm mb-2">{q.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {q.tags.map(tag => <span key={tag} className="text-[10px] px-1.5 bg-primary/10 text-primary rounded">{tag}</span>)}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{q.votes} votes</span>
                        <span>{q.answers} answers</span>
                        {q.accepted && <Badge className="text-[10px] bg-accent/10 text-accent border-accent/20">Answered</Badge>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Code Reviews</h2>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => navigate('/code-review')}>
                  <Plus className="w-4 h-4 mr-1" /> Submit Code
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'Auth middleware refactor', lang: 'TypeScript', score: 87, status: 'Reviewed', date: '2d ago' },
                  { title: 'Database query optimizer', lang: 'Python', score: 74, status: 'Pending', date: '1w ago' },
                  { title: 'Redis cache implementation', lang: 'Go', score: 92, status: 'Reviewed', date: '2w ago' },
                ].map((review, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{review.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{review.lang}</Badge>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className={`text-lg font-bold ${review.score >= 85 ? 'text-accent' : review.score >= 70 ? 'text-primary' : 'text-yellow-400'}`}>
                          {review.score}/100
                        </div>
                        <Badge className={`text-xs ${review.status === 'Reviewed' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                          {review.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">AI Assistant</h2>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => navigate('/ai-assistant')}>
                  <Bot className="w-4 h-4 mr-1" /> Open AI Chat
                </Button>
              </div>
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <Bot className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">AI Developer Assistant</h3>
                <p className="text-sm text-muted-foreground mb-4">Get instant help with your coding questions, architecture decisions, and debugging sessions.</p>
                <Button onClick={() => navigate('/ai-assistant')} className="bg-primary hover:bg-primary/90">Launch AI Assistant <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold mb-5">Notifications</h2>
              <div className="bg-card border border-border rounded-xl divide-y divide-border">
                {[...notifications, ...notifications.map(n => ({ ...n, read: true }))].map((n, i) => (
                  <div key={i} className={`p-4 flex items-start gap-3 ${!n.read ? 'bg-primary/5' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!n.read ? 'bg-primary' : 'bg-muted-foreground opacity-30'}`} />
                    <div className="flex-1">
                      <p className={`text-sm ${!n.read ? 'font-medium' : 'text-muted-foreground'}`}>{n.msg}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.time} ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold mb-5">Saved Content</h2>
              <div className="space-y-3">
                {mockQuestions.slice(0, 2).map(q => (
                  <Link key={q.id} to={`/questions/${q.id}`} className="block bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-3.5 h-3.5 text-primary" />
                      <Badge variant="secondary" className="text-xs">Question</Badge>
                    </div>
                    <p className="font-medium text-sm">{q.title}</p>
                  </Link>
                ))}
                {mockBlogs.slice(0, 2).map(b => (
                  <Link key={b.id} to={`/blog/${b.id}`} className="block bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="w-3.5 h-3.5 text-green-400" />
                      <Badge variant="secondary" className="text-xs">Article</Badge>
                    </div>
                    <p className="font-medium text-sm">{b.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'answers' && (
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold mb-5">My Answers</h2>
              <div className="space-y-3">
                {[
                  { q: 'How to handle React state with complex nested objects?', votes: 28, accepted: true, date: '3d ago' },
                  { q: 'PostgreSQL EXPLAIN ANALYZE — how to interpret the output?', votes: 41, accepted: false, date: '1w ago' },
                  { q: 'TypeScript generics: when to use extends vs =?', votes: 19, accepted: true, date: '2w ago' },
                ].map((a, i) => (
                  <Link key={i} to="/questions/1" className="block bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
                    <p className="font-medium text-sm mb-2">{a.q}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{a.votes} votes</span>
                      <span>{a.date}</span>
                      {a.accepted && <Badge className="text-[10px] bg-accent/10 text-accent border-accent/20">✓ Accepted</Badge>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
