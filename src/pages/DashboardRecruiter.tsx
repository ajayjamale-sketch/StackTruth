import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Briefcase, Users, Search, Star, MapPin, Code2, Settings, LogOut, Plus, Filter, BarChart3, Calendar, CheckCircle } from 'lucide-react';

const navItems = [
  { id: 'search', label: 'Candidate Search', icon: Search },
  { id: 'pool', label: 'Talent Pool', icon: Users, badge: 18 },
  { id: 'jobs', label: 'Job Postings', icon: Briefcase },
  { id: 'interviews', label: 'Interviews', icon: Calendar, badge: 3 },
  { id: 'analytics', label: 'Hiring Analytics', icon: BarChart3 },
];

const candidates = [
  { name: 'Marcus Rivera', username: 'marcus_r', rep: 14280, skills: ['Go', 'K8s', 'PostgreSQL'], location: 'Remote', available: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', badge: 'Expert', score: 94 },
  { name: 'Sarah Chen', username: 'sarah_c', rep: 12100, skills: ['React', 'TypeScript', 'Python'], location: 'San Francisco', available: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face', badge: 'Top Reviewer', score: 91 },
  { name: 'Alex Chen', username: 'alexchen', rep: 4820, skills: ['TypeScript', 'Rust', 'Node.js'], location: 'Remote', available: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', badge: 'Contributor', score: 87 },
  { name: 'Diana Patel', username: 'diana_p', rep: 9800, skills: ['Java', 'Microservices', 'AWS'], location: 'New York', available: true, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', badge: 'Expert', score: 92 },
];

const postings = [
  { title: 'Senior Backend Engineer', type: 'Full-time', applicants: 24, status: 'Active', posted: '5d ago' },
  { title: 'Staff Frontend Engineer', type: 'Full-time', applicants: 18, status: 'Active', posted: '1w ago' },
  { title: 'DevOps Engineer', type: 'Contract', applicants: 9, status: 'Draft', posted: null },
];

export default function DashboardRecruiter() {
  useScrollToTop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('search');
  const [search, setSearch] = useState('');
  const [contacted, setContacted] = useState<Set<string>>(new Set());

  const handleContact = (name: string) => {
    setContacted(prev => new Set([...prev, name]));
    toast.success(`Message sent to ${name}!`);
  };

  const filteredCandidates = candidates.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <div className="pt-16 flex">
        <aside className="w-60 hidden lg:flex flex-col bg-card border-r border-border min-h-[calc(100vh-64px)] flex-shrink-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">RD</div>
              <div>
                <p className="font-semibold text-sm">Recruiter Account</p>
                <Badge className="text-[10px] bg-purple-500/10 text-purple-400 border-purple-500/20">Pro Plan</Badge>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-purple-500/10 text-purple-400' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && <Badge className="text-[10px] h-4 px-1.5 bg-purple-500 text-white">{item.badge}</Badge>}
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
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2"><Briefcase className="w-5 h-5 text-purple-400" />Recruiter Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-0.5">3 active job postings · 18 saved developers</p>
            </div>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/jobs')}>
              <Plus className="w-4 h-4 mr-1.5" /> Post Job
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Active Jobs', value: '3', sub: '51 total applicants', color: 'text-purple-400' },
              { label: 'Talent Pool', value: '18', sub: 'Saved developers', color: 'text-blue-400' },
              { label: 'Interviews', value: '3', sub: 'Scheduled this week', color: 'text-yellow-400' },
              { label: 'Avg Match Score', value: '91%', sub: 'Skills match', color: 'text-green-400' },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {activeTab === 'search' && (
            <div className="max-w-4xl">
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search by name, skill, or tech stack..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
                </div>
                <Button variant="outline"><Filter className="w-4 h-4 mr-1.5" />Filter</Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredCandidates.map(c => (
                  <div key={c.name} className="bg-card border border-border rounded-xl p-4 card-hover">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-sm">{c.name}</p>
                          <p className="text-xs text-muted-foreground">@{c.username}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{c.score}</div>
                        <p className="text-[10px] text-muted-foreground">match score</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {c.skills.map(s => <span key={s} className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-md">{s}</span>)}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${c.available ? 'bg-accent' : 'bg-yellow-500'}`} />
                        {c.available ? 'Open to work' : 'Not looking'}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className={`flex-1 h-8 text-xs ${contacted.has(c.name) ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-purple-600 hover:bg-purple-700'}`}
                        onClick={() => handleContact(c.name)}
                        disabled={contacted.has(c.name)}
                      >
                        {contacted.has(c.name) ? <><CheckCircle className="w-3 h-3 mr-1" />Contacted</> : 'Contact'}
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => navigate('/profile')}>View Profile</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div className="max-w-3xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Job Postings</h2>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/jobs')}>
                  <Plus className="w-3.5 h-3.5 mr-1" /> Post Job
                </Button>
              </div>
              <div className="space-y-3">
                {postings.map((p, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{p.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">{p.type}</Badge>
                        {p.posted && <span>Posted {p.posted}</span>}
                        <span>{p.applicants} applicants</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge className={`text-xs ${p.status === 'Active' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-muted text-muted-foreground'}`}>{p.status}</Badge>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => navigate('/jobs')}>Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'interviews' && (
            <div className="max-w-2xl">
              <h2 className="font-semibold mb-4">Scheduled Interviews</h2>
              <div className="space-y-3">
                {[
                  { candidate: 'Marcus Rivera', role: 'Senior Backend Engineer', date: 'Tomorrow, 10:00 AM', type: 'Technical' },
                  { candidate: 'Sarah Chen', role: 'Staff Frontend Engineer', date: 'Thu, 2:00 PM', type: 'System Design' },
                  { candidate: 'Diana Patel', role: 'Senior Backend Engineer', date: 'Fri, 11:00 AM', type: 'Live Coding' },
                ].map((interview, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">{interview.candidate}</p>
                      <Badge variant="secondary" className="text-xs">{interview.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{interview.role} · {interview.date}</p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs h-7" onClick={() => navigate('/live-coding')}>
                      Join Live Session
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="max-w-2xl">
              <h2 className="font-semibold mb-4">Hiring Analytics</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Avg Time to Hire', value: '18 days', sub: '-3 days vs last quarter' },
                  { label: 'Offer Accept Rate', value: '76%', sub: 'Above industry avg' },
                  { label: 'Sourced from ST', value: '83%', sub: 'StackTruth sourced' },
                  { label: 'Quality Score', value: '4.8/5', sub: 'Candidate ratings' },
                ].map((s, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                    <p className="text-2xl font-bold text-purple-400">{s.value}</p>
                    <p className="text-xs text-accent mt-1">{s.sub}</p>
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
