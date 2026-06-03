import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Trophy, Star, Award, Medal, TrendingUp, Filter } from 'lucide-react';

const devs = [
  { rank: 1, name: 'Priya Nair', username: 'priya_n', rep: 18420, answers: 842, reviews: 341, change: '+240', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=48&h=48&fit=crop&crop=face', badge: 'Expert', skills: ['TypeScript', 'Rust', 'Go'] },
  { rank: 2, name: 'Marcus Rivera', username: 'marcus_r', rep: 14280, answers: 621, reviews: 198, change: '+180', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face', badge: 'Mentor', skills: ['Go', 'K8s', 'Terraform'] },
  { rank: 3, name: 'Sarah Chen', username: 'sarah_c', rep: 12100, answers: 534, reviews: 267, change: '+95', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face', badge: 'Top Reviewer', skills: ['React', 'Python', 'ML'] },
  { rank: 4, name: 'Alex Chen', username: 'alexchen', rep: 4820, answers: 183, reviews: 92, change: '+42', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face', badge: 'Contributor', skills: ['TypeScript', 'Rust', 'PostgreSQL'] },
  { rank: 5, name: 'Diana Patel', username: 'diana_p', rep: 9800, answers: 441, reviews: 156, change: '+68', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face', badge: 'Expert', skills: ['Java', 'Microservices', 'AWS'] },
  { rank: 6, name: 'James Wu', username: 'james_w', rep: 7650, answers: 312, reviews: 134, change: '+51', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=48&h=48&fit=crop&crop=face', badge: 'Reviewer', skills: ['Python', 'FastAPI', 'ML'] },
  { rank: 7, name: 'Amara Johnson', username: 'amara_j', rep: 6200, answers: 278, reviews: 89, change: '+37', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop&crop=face', badge: 'Contributor', skills: ['Node.js', 'GraphQL', 'MongoDB'] },
  { rank: 8, name: 'Thomas Walsh', username: 'thomas_w', rep: 5430, answers: 211, reviews: 76, change: '+29', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&h=48&fit=crop&crop=face', badge: 'Contributor', skills: ['React', 'TypeScript', 'Testing'] },
];

const periods = ['This Week', 'This Month', 'All Time'];

export default function Leaderboard() {
  useScrollToTop();
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('This Week');

  const filtered = devs.filter(d =>
    !search || d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.username.toLowerCase().includes(search.toLowerCase()) ||
    d.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-400" />;
    return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Header */}
      <div className="pt-20 pb-8 section-dark border-b border-surface-10 dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-3 bg-primary/20 text-blue-300 border border-primary/30">Community</Badge>
          <h1 className="text-3xl font-bold text-foreground mb-3">Developer Leaderboard</h1>
          <p className="text-muted-foreground">Rankings based on answer quality, code reviews, and community contributions</p>

          {/* Top 3 Podium */}
          <div className="flex justify-center items-end gap-4 mt-8">
            {[devs[1], devs[0], devs[2]].map((dev, i) => (
              <div key={dev.rank} className={`flex flex-col items-center ${i === 1 ? 'order-2 -mb-2' : ''}`}>
                <img src={dev.avatar} alt={dev.name} className={`rounded-full object-cover ring-4 ${i === 1 ? 'w-16 h-16 ring-yellow-400' : 'w-12 h-12 ring-slate-400'}`} />
                <div className={`mt-2 flex items-center justify-center ${i === 1 ? 'w-14 h-14' : 'w-11 h-11'} bg-gradient-to-b ${i === 1 ? 'from-yellow-400/20' : 'from-slate-400/20'} rounded-t-lg border-t border-x ${i === 1 ? 'border-yellow-400/30' : 'border-slate-400/30'}`}>
                  {getRankIcon(dev.rank)}
                </div>
                <p className="text-xs text-foreground/80 font-medium mt-1">{dev.name.split(' ')[0]}</p>
                <p className="text-xs text-muted-foreground">{dev.rep.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search developer..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2">
            {periods.map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${period === p ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Developer</div>
            <div className="col-span-2 text-right">Reputation</div>
            <div className="col-span-2 text-right hidden sm:block">Answers</div>
            <div className="col-span-2 text-right hidden md:block">Reviews</div>
            <div className="col-span-1 text-right">Change</div>
          </div>
          <div className="divide-y divide-border">
            {filtered.map(dev => (
              <div key={dev.rank} className={`grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-muted/30 transition-colors ${dev.rank <= 3 ? 'bg-primary/3' : ''}`}>
                <div className="col-span-1 flex items-center justify-center">
                  {getRankIcon(dev.rank)}
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  <img src={dev.avatar} alt={dev.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{dev.name}</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs text-muted-foreground">@{dev.username}</span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{dev.badge}</Badge>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-bold text-sm text-primary">{dev.rep.toLocaleString()}</span>
                </div>
                <div className="col-span-2 text-right hidden sm:block">
                  <span className="text-sm">{dev.answers}</span>
                </div>
                <div className="col-span-2 text-right hidden md:block">
                  <span className="text-sm">{dev.reviews}</span>
                </div>
                <div className="col-span-1 text-right">
                  <span className="text-xs font-semibold text-accent">{dev.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
