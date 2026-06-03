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
import { Monitor, Play, Plus, Users, Clock, Code2, Search, Zap, Video, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const sessions = [
  {
    id: '1', title: 'Live Debug: Async Rust with Tokio', host: 'Marcus Rivera',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    lang: 'Rust', participants: 4, maxParticipants: 6, status: 'live', startedAt: '25m ago', tags: ['rust', 'async', 'tokio'],
  },
  {
    id: '2', title: 'TypeScript Interview Practice Session', host: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=32&h=32&fit=crop&crop=face',
    lang: 'TypeScript', participants: 2, maxParticipants: 2, status: 'live', startedAt: '1h ago', tags: ['typescript', 'interview'],
  },
  {
    id: '3', title: 'Pair Programming: React Query Patterns', host: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face',
    lang: 'React', participants: 1, maxParticipants: 3, status: 'open', startedAt: null, tags: ['react', 'react-query'],
  },
  {
    id: '4', title: 'System Design: High-Scale Notification Service', host: 'James Wu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    lang: 'System Design', participants: 0, maxParticipants: 8, status: 'scheduled', startedAt: null, tags: ['architecture', 'distributed'],
  },
];

const modes = [
  { id: 'pair', label: 'Pair Programming', desc: 'Code together in real-time', icon: Users, color: 'text-blue-600 dark:text-blue-400' },
  { id: 'interview', label: 'Interview Mode', desc: 'Technical interview environment', icon: Zap, color: 'text-yellow-600 dark:text-yellow-400' },
  { id: 'sandbox', label: 'Execution Sandbox', desc: 'Run code in isolated environment', icon: Play, color: 'text-green-600 dark:text-green-400' },
];

export default function LiveCoding() {
  useScrollToTop();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeMode, setActiveMode] = useState('pair');
  const [joining, setJoining] = useState<string | null>(null);
  const [waitingRoomOpen, setWaitingRoomOpen] = useState(false);
  const [selectedSessionName, setSelectedSessionName] = useState('');
  const [inSession, setInSession] = useState(false);

  const handleJoin = async (sessionId: string, title: string) => {
    setJoining(sessionId);
    await new Promise(r => setTimeout(r, 800));
    setJoining(null);
    setSelectedSessionName(title);
    setWaitingRoomOpen(true);
  };

  const handleCreate = () => {
    setSelectedSessionName('New Live Session');
    setWaitingRoomOpen(true);
  };

  const enterSession = () => {
    setWaitingRoomOpen(false);
    setInSession(true);
    toast.success(`Joined ${selectedSessionName}!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Header */}
      <div className="pt-20 pb-6 border-b border-border bg-gradient-to-r from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Monitor className="w-6 h-6 text-primary" /> Live Coding Sessions
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Real-time collaborative coding with execution sandbox</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 flex-shrink-0" onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" /> Create Session
            </Button>
          </div>

          {/* Mode Selector */}
          <div className="grid sm:grid-cols-3 gap-3">
            {modes.map(mode => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    activeMode === mode.id
                      ? 'border-primary/40 bg-primary/10'
                      : 'border-border hover:border-primary/20 bg-card'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${mode.color} flex-shrink-0`} />
                  <div>
                    <p className="text-sm font-medium">{mode.label}</p>
                    <p className="text-xs text-muted-foreground">{mode.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search sessions by language, topic..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Live', 'Open', 'Scheduled'].map(f => (
              <button key={f} className="px-3 py-2 rounded-lg text-sm bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors">{f}</button>
            ))}
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-medium">{sessions.filter(s => s.status === 'live').length} sessions live now</span>
        </div>

        {/* Sessions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sessions.filter(s => !search || s.title.toLowerCase().includes(search.toLowerCase())).map(session => (
            <div key={session.id} className="bg-card border border-border rounded-xl overflow-hidden card-hover">
              {/* Session Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={`text-xs ${
                    session.status === 'live' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' :
                    session.status === 'open' ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' :
                    'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                  }`}>
                    {session.status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block mr-1 animate-pulse" />}
                    {session.status.toUpperCase()}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">{session.lang}</Badge>
                </div>
                <h3 className="font-semibold text-sm leading-snug mb-3">{session.title}</h3>
                <div className="flex items-center gap-2">
                  <img src={session.avatar} alt={session.host} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-xs text-muted-foreground">{session.host}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{session.participants}/{session.maxParticipants}</span>
                  {session.startedAt && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{session.startedAt}</span>}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {session.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded">{tag}</span>
                  ))}
                </div>
                <Button
                  className="w-full h-8 text-xs bg-primary hover:bg-primary/90"
                  disabled={session.participants >= session.maxParticipants || joining === session.id}
                  onClick={() => handleJoin(session.id, session.title)}
                >
                  {joining === session.id ? 'Joining...' :
                   session.participants >= session.maxParticipants ? 'Session Full' :
                   session.status === 'scheduled' ? 'Register' : 'Join Session'}
                </Button>
              </div>
            </div>
          ))}

          {/* Create card */}
          <button
            onClick={handleCreate}
            className="bg-card border border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/30 hover:bg-primary/5 transition-all text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Start a Session</p>
              <p className="text-xs text-muted-foreground mt-1">Pair program, interview, or debug together</p>
            </div>
          </button>
        </div>
      </div>

      <Dialog open={waitingRoomOpen} onOpenChange={setWaitingRoomOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-center">{selectedSessionName}</DialogTitle>
            <DialogDescription className="text-center">
              Waiting for the host to admit you...
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-muted flex items-center justify-center">
                <Video className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-pulse">
                <Loader2 className="w-3 h-3 text-white animate-spin" />
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-2">Connecting to secure environment</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2 justify-center"><CheckCircle2 className="w-4 h-4 text-green-500" /> Establishing P2P connection</p>
              <p className="flex items-center gap-2 justify-center"><CheckCircle2 className="w-4 h-4 text-green-500" /> Sandboxing execution environment</p>
              <p className="flex items-center gap-2 justify-center text-primary animate-pulse"><Loader2 className="w-4 h-4 animate-spin" /> Waiting for host approval</p>
            </div>
          </div>
          
          <Button className="w-full" onClick={enterSession}>
            Simulate Entry (Mock)
          </Button>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
