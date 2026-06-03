import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardNavbar from '@/components/layout/DashboardNavbar';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Star, MessageSquare, GitBranch, BookOpen, Users,
  Award, Settings, LogOut, CheckCircle, Clock, TrendingUp,
  BarChart3, Plus, ArrowRight, Eye
} from 'lucide-react';

const navItems = [
  { id: 'reviews', label: 'Review Requests', icon: GitBranch, badge: 8 },
  { id: 'queue', label: 'Answer Queue', icon: MessageSquare, badge: 12 },
  { id: 'mentorship', label: 'Mentorship', icon: Users },
  { id: 'tutorials', label: 'My Tutorials', icon: BookOpen },
  { id: 'reputation', label: 'Rep Analytics', icon: BarChart3 },
];

const reviewRequests = [
  { id: '1', title: 'Concurrent WebSocket handler in Node.js', user: 'Alex C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', lang: 'TypeScript', priority: 'high', time: '30m ago' },
  { id: '2', title: 'React Query mutation with optimistic updates', user: 'Sarah K.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face', lang: 'React', priority: 'medium', time: '1h ago' },
  { id: '3', title: 'Rust async runtime selection guide', user: 'Marcus L.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face', lang: 'Rust', priority: 'low', time: '3h ago' },
  { id: '4', title: 'PostgreSQL row-level security implementation', user: 'Diana P.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face', lang: 'SQL', priority: 'high', time: '4h ago' },
];

const answerQueue = [
  { id: '1', title: 'How to implement two-phase commit in distributed systems?', tags: ['distributed', 'transactions'], votes: 24, time: '1h ago' },
  { id: '2', title: 'Memory model guarantees in Rust with multiple threads?', tags: ['rust', 'concurrency', 'memory'], votes: 18, time: '2h ago' },
  { id: '3', title: 'Best approach for real-time collaborative text editing?', tags: ['crdt', 'realtime', 'architecture'], votes: 31, time: '3h ago' },
];

const mentees = [
  { name: 'Kevin L.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=face', skill: 'TypeScript', sessions: 6, progress: 74 },
  { name: 'Maya R.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face', skill: 'Rust', sessions: 3, progress: 45 },
];

export default function DashboardExpert() {
  useScrollToTop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reviews');

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <ScrollToTop />

      <div className="pt-16 flex">
        <aside className="w-60 hidden lg:flex flex-col bg-card border-r border-border min-h-[calc(100vh-64px)] flex-shrink-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face" alt="Expert" className="w-10 h-10 rounded-full object-cover ring-2 ring-yellow-400/40" />
              <div>
                <p className="font-semibold text-sm">Priya Nair</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-medium">Verified Expert</span>
                </div>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-yellow-500/10 text-yellow-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && <Badge className="text-[10px] h-4 px-1.5 bg-yellow-500 text-white">{item.badge}</Badge>}
                </button>
              );
            })}
          </nav>
          <div className="p-3 border-t border-border space-y-1">
            <button onClick={() => navigate('/settings')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </button>
            <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-5 lg:p-6">
          {/* Expert Stats */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400" />Expert Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-0.5">8 review requests · 12 questions in queue</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/code-review')}>Go to Reviews</Button>
              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">Start Reviewing</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Reviews Done', value: '341', sub: '+8 today', color: 'text-yellow-400' },
              { label: 'Answers Given', value: '842', sub: '+22 this week', color: 'text-blue-400' },
              { label: 'Reputation', value: '18,420', sub: 'Expert level', color: 'text-primary' },
              { label: 'Mentees', value: '12', sub: 'Active this month', color: 'text-green-400' },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              <h2 className="font-semibold mb-4">Pending Code Reviews ({reviewRequests.length})</h2>
              <div className="space-y-3">
                {reviewRequests.map(req => (
                  <div key={req.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img src={req.avatar} alt={req.user} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{req.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{req.user}</span>
                          <Badge variant="secondary" className="text-xs">{req.lang}</Badge>
                          <span className="text-xs text-muted-foreground">{req.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge className={`text-xs ${req.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' : req.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-muted text-muted-foreground'}`}>
                        {req.priority}
                      </Badge>
                      <Button size="sm" className="h-7 text-xs bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => navigate('/code-review')}>
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'queue' && (
            <div className="max-w-3xl">
              <h2 className="font-semibold mb-4">Answer Queue ({answerQueue.length})</h2>
              <div className="space-y-3">
                {answerQueue.map(q => (
                  <Link key={q.id} to={`/questions/${q.id}`} className="block bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all">
                    <p className="font-medium text-sm mb-2">{q.title}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">{q.tags.map(t => <span key={t} className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">{t}</span>)}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{q.votes} votes</span>
                        <span>{q.time}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mentorship' && (
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Active Mentees ({mentees.length})</h2>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => navigate('/dashboard')}>Find Mentees</Button>
              </div>
              <div className="space-y-3">
                {mentees.map(m => (
                  <div key={m.name} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{m.name}</p>
                        <p className="text-xs text-muted-foreground">Learning {m.skill} · {m.sessions} sessions</p>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => navigate('/live-coding')}>Schedule</Button>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{m.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${m.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tutorials' && (
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">My Tutorials</h2>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => navigate('/blog')}>
                  <Plus className="w-3.5 h-3.5 mr-1" /> New Tutorial
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { title: 'TypeScript 5.0 Generic Patterns You Should Know', views: 12300, likes: 445, status: 'Published' },
                  { title: 'Advanced Rust Error Handling Patterns', views: 8700, likes: 312, status: 'Published' },
                  { title: 'Building Real-time APIs with WebSockets in Node.js', views: 0, likes: 0, status: 'Draft' },
                ].map((t, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{t.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>{t.views.toLocaleString()} views</span>
                        <span>{t.likes} likes</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <Badge className={`text-xs ${t.status === 'Published' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-muted text-muted-foreground'}`}>
                        {t.status}
                      </Badge>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => navigate('/blog')}>Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reputation' && (
            <div className="max-w-2xl">
              <h2 className="font-semibold mb-4">Reputation Analytics</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'This Week', value: '+240', detail: 'From 18 answers' },
                  { label: 'This Month', value: '+1,240', detail: 'Top 0.1% of experts' },
                  { label: 'Avg Score', value: '94/100', detail: 'Answer quality' },
                  { label: 'Accept Rate', value: '68%', detail: 'Accepted answers' },
                ].map((s, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                    <p className="text-2xl font-bold text-yellow-400">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
