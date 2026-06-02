import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Users, Plus, Search, MessageSquare, Code2, FileText,
  CheckSquare, Settings, MoreHorizontal, Hash, Bell, Lock
} from 'lucide-react';

const teams = [
  {
    id: '1', name: 'Backend Platform', members: 8, description: 'Infrastructure, APIs, databases',
    tags: ['Go', 'PostgreSQL', 'Kubernetes'], active: true, messages: 24, unread: 3,
    avatar: 'BP', color: 'bg-blue-600',
  },
  {
    id: '2', name: 'Frontend Guild', members: 12, description: 'React, TypeScript, design systems',
    tags: ['React', 'TypeScript', 'Figma'], active: true, messages: 41, unread: 0,
    avatar: 'FG', color: 'bg-purple-600',
  },
  {
    id: '3', name: 'DevOps & SRE', members: 5, description: 'Deployment, monitoring, reliability',
    tags: ['Docker', 'AWS', 'Terraform'], active: false, messages: 8, unread: 1,
    avatar: 'DS', color: 'bg-green-600',
  },
];

const tabs = ['Discussions', 'Snippets', 'Docs', 'Tasks'];

const discussions = [
  { user: 'Sarah K.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face', time: '10m ago', msg: 'Reviewed the new auth middleware. Found a potential timing attack. PR comment added.' },
  { user: 'Marcus L.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face', time: '25m ago', msg: 'Pushed fix for the N+1 query in user endpoint. Performance improved 3x in load tests.' },
  { user: 'Alex C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', time: '1h ago', msg: 'Created shared snippet for the Redis cache pattern. Worth adding to our patterns library.' },
  { user: 'Priya M.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face', time: '2h ago', msg: 'Architecture proposal for the new notification service is in the Docs tab. Please review by EOD.' },
];

export default function Teams() {
  useScrollToTop();
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [activeTab, setActiveTab] = useState('Discussions');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const sendMessage = () => {
    if (!message.trim()) return;
    toast.success('Message sent!');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <div className="pt-16 h-screen flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          {/* Teams Sidebar */}
          <div className="w-64 bg-card border-r border-border flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-sm">Your Teams</h2>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => toast.success('Create team modal coming soon!')}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {teams.filter(t => !search || t.name.toLowerCase().includes(search.toLowerCase())).map(team => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                    selectedTeam.id === team.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${team.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {team.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium truncate">{team.name}</span>
                      {team.unread > 0 && (
                        <Badge className="text-[10px] h-4 px-1.5 bg-primary text-white">{team.unread}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Users className="w-2.5 h-2.5" />{team.members} members
                      {team.active && <span className="ml-1 text-accent">● active</span>}
                    </div>
                  </div>
                </button>
              ))}

              <button
                onClick={() => toast.success('Create team modal!')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-muted transition-colors border border-dashed border-border"
              >
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">Create new team</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Team Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${selectedTeam.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {selectedTeam.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold">{selectedTeam.name}</h2>
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">{selectedTeam.members} members · {selectedTeam.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="text-xs bg-accent/10 text-accent border-accent/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block mr-1.5" />Active
                </Badge>
                <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => toast.success('Invite members!')}>
                  <Users className="w-3.5 h-3.5 mr-1" /> Invite
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Settings className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border px-5">
              {tabs.map((tab, i) => {
                const icons = [MessageSquare, Code2, FileText, CheckSquare];
                const Icon = icons[i];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" /> {tab}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {activeTab === 'Discussions' && (
                <div className="space-y-4 max-w-3xl">
                  {discussions.map((d, i) => (
                    <div key={i} className="flex gap-3">
                      <img src={d.avatar} alt={d.user} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold">{d.user}</span>
                          <span className="text-xs text-muted-foreground">{d.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{d.msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'Snippets' && (
                <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
                  {[
                    { title: 'Redis Cache Pattern', lang: 'TypeScript', author: 'Alex C.', updated: '2h ago' },
                    { title: 'JWT Middleware', lang: 'TypeScript', author: 'Sarah K.', updated: '1d ago' },
                    { title: 'DB Connection Pool', lang: 'Go', author: 'Marcus L.', updated: '3d ago' },
                  ].map(s => (
                    <div key={s.title} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{s.title}</h4>
                        <Badge variant="secondary" className="text-xs">{s.lang}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">by {s.author} · {s.updated}</p>
                    </div>
                  ))}
                  <button onClick={() => toast.success('Create snippet!')} className="border border-dashed border-border rounded-xl p-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
                    <Plus className="w-4 h-4" /> New Snippet
                  </button>
                </div>
              )}
              {activeTab === 'Docs' && (
                <div className="space-y-3 max-w-3xl">
                  {[
                    { title: 'Architecture Decision Records', author: 'Priya M.', updated: '1h ago' },
                    { title: 'API Design Guidelines', author: 'Marcus L.', updated: '2d ago' },
                    { title: 'Onboarding Guide', author: 'Alex C.', updated: '1w ago' },
                  ].map(doc => (
                    <div key={doc.title} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{doc.title}</p>
                          <p className="text-xs text-muted-foreground">by {doc.author} · {doc.updated}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => toast.success(`Opening ${doc.title}`)}>Open</Button>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'Tasks' && (
                <div className="grid sm:grid-cols-3 gap-4 max-w-4xl">
                  {[
                    { status: 'To Do', color: 'border-t-slate-400', items: ['Set up monitoring alerts', 'Review PR #142', 'Update API docs'] },
                    { status: 'In Progress', color: 'border-t-blue-500', items: ['Refactor auth module', 'Fix N+1 queries'] },
                    { status: 'Done', color: 'border-t-green-500', items: ['Deploy v2.3.1', 'Security audit', 'Team sync notes'] },
                  ].map(col => (
                    <div key={col.status} className={`bg-card border border-border border-t-2 ${col.color} rounded-xl p-4`}>
                      <h4 className="font-semibold text-sm mb-3">{col.status} ({col.items.length})</h4>
                      <div className="space-y-2">
                        {col.items.map(item => (
                          <div key={item} className="bg-background border border-border rounded-lg p-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer">{item}</div>
                        ))}
                        <button onClick={() => toast.success('Add task!')} className="w-full text-xs text-muted-foreground hover:text-foreground py-1.5 flex items-center gap-1 justify-center">
                          <Plus className="w-3 h-3" /> Add task
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Input (only for Discussions) */}
            {activeTab === 'Discussions' && (
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder={`Message #${selectedTeam.name.toLowerCase().replace(' ', '-')}...`}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                    className="flex-1"
                  />
                  <Button className="bg-primary hover:bg-primary/90" onClick={sendMessage}>Send</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
