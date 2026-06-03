import { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Search, Trophy, Star, Award, Medal, TrendingUp, Filter, X } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for different time periods
const allPeriodData = {
  'This Week': [
    { rank: 1, name: "Alex Chen", username: "alexc", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rep: 1240, answers: 45, reviews: 28, change: "+12", badge: "Rising Star", skills: ["React", "TypeScript", "Node.js"] },
    { rank: 2, name: "Priya Nair", username: "priyan", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face", rep: 1180, answers: 38, reviews: 32, change: "+8", badge: "Top Answerer", skills: ["Python", "AWS", "System Design"] },
    { rank: 3, name: "Samir Patel", username: "samirp", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", rep: 990, answers: 30, reviews: 22, change: "+5", badge: "Active Reviewer", skills: ["Go", "Kubernetes", "Docker"] },
    { rank: 4, name: "Elena Rodriguez", username: "elenar", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", rep: 820, answers: 25, reviews: 18, change: "+3", badge: "Contributor", skills: ["Rust", "C++", "WASM"] },
    { rank: 5, name: "David Kim", username: "davidk", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face", rep: 710, answers: 20, reviews: 15, change: "+7", badge: "Contributor", skills: ["Vue", "CSS", "UI/UX"] },
  ],
  'This Month': [
    { rank: 1, name: "Priya Nair", username: "priyan", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face", rep: 42150, answers: 980, reviews: 1100, change: "+15", badge: "Master", skills: ["Python", "AWS", "System Design"] },
    { rank: 2, name: "Alex Chen", username: "alexc", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rep: 39800, answers: 1100, reviews: 620, change: "+10", badge: "Pro", skills: ["React", "TypeScript", "Node.js"] },
    { rank: 3, name: "Samir Patel", username: "samirp", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", rep: 38200, answers: 850, reviews: 930, change: "+8", badge: "Pro", skills: ["Go", "Kubernetes", "Docker"] },
    { rank: 4, name: "Elena Rodriguez", username: "elenar", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", rep: 35100, answers: 720, reviews: 580, change: "+5", badge: "Expert", skills: ["Rust", "C++", "WASM"] },
    { rank: 5, name: "David Kim", username: "davidk", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face", rep: 28900, answers: 610, reviews: 480, change: "+12", badge: "Contributor", skills: ["Vue", "CSS", "UI/UX"] },
  ],
  'All Time': [
    { rank: 1, name: "Alex Chen", username: "alexc", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", rep: 45200, answers: 1240, reviews: 840, change: "+2", badge: "Expert", skills: ["React", "TypeScript", "Node.js"] },
    { rank: 2, name: "Priya Nair", username: "priyan", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face", rep: 42150, answers: 980, reviews: 1100, change: "-", badge: "Master", skills: ["Python", "AWS", "System Design"] },
    { rank: 3, name: "Samir Patel", username: "samirp", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", rep: 39800, answers: 1100, reviews: 620, change: "+1", badge: "Pro", skills: ["Go", "Kubernetes", "Docker"] },
    { rank: 4, name: "Elena Rodriguez", username: "elenar", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", rep: 38200, answers: 850, reviews: 930, change: "-1", badge: "Pro", skills: ["Rust", "C++", "WASM"] },
    { rank: 5, name: "David Kim", username: "davidk", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face", rep: 35100, answers: 720, reviews: 580, change: "+3", badge: "Contributor", skills: ["Vue", "CSS", "UI/UX"] },
  ],
};

const periods = Object.keys(allPeriodData);

export default function Leaderboard() {
  useScrollToTop();
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('This Week');
  const [selectedDev, setSelectedDev] = useState(null);

  // Get data for the selected period
  const currentData = allPeriodData[period];
  
  // Filter based on search
  const filtered = useMemo(() => {
    if (!search.trim()) return currentData;
    const lowerSearch = search.toLowerCase();
    return currentData.filter(dev =>
      dev.name.toLowerCase().includes(lowerSearch) ||
      dev.username.toLowerCase().includes(lowerSearch) ||
      dev.skills.some(skill => skill.toLowerCase().includes(lowerSearch))
    );
  }, [currentData, search]);

  // Top 3 for the podium (from filtered data, but if filtered has less than 3, use first ones)
  const topThree = filtered.slice(0, 3);
  // Reorder for podium: second (index 1), first (index 0), third (index 2)
  const podiumOrder = topThree.length >= 3 
    ? [topThree[1], topThree[0], topThree[2]]
    : topThree;

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    setSearch(''); // optional: clear search when period changes
    toast.success(`Showing rankings for ${newPeriod}`);
  };

  const handleFilterClick = () => {
    toast.info('Advanced filter options coming soon');
  };

  const clearSearch = () => setSearch('');

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
    return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  };

  const openProfile = (dev) => setSelectedDev(dev);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={false} />
      <ScrollToTop />

      {/* Header */}
      <div className="pt-20 pb-8 border-b border-border bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-3 bg-primary/20 text-primary-foreground dark:text-blue-300 border border-primary/30">
            Community
          </Badge>
          <h1 className="text-3xl font-bold text-foreground mb-3">Developer Leaderboard</h1>
          <p className="text-muted-foreground">
            Rankings based on answer quality, code reviews, and community contributions
          </p>

          {/* Top 3 Podium - dynamic based on filtered data */}
          {filtered.length >= 3 && (
            <div className="flex justify-center items-end gap-4 mt-8">
              {podiumOrder.map((dev, idx) => {
                const isFirst = idx === 1; // the middle is first place
                return (
                  <div key={dev.rank} className={`flex flex-col items-center ${isFirst ? 'order-2 -mb-2' : ''}`}>
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className={`rounded-full object-cover ring-4 ${
                        isFirst ? 'w-16 h-16 ring-yellow-400' : 'w-12 h-12 ring-slate-400'
                      }`}
                    />
                    <div
                      className={`mt-2 flex items-center justify-center ${
                        isFirst ? 'w-14 h-14' : 'w-11 h-11'
                      } bg-gradient-to-b ${
                        isFirst ? 'from-yellow-400/20' : 'from-slate-400/20'
                      } rounded-t-lg border-t border-x ${
                        isFirst ? 'border-yellow-400/30' : 'border-slate-400/30'
                      }`}
                    >
                      {getRankIcon(dev.rank)}
                    </div>
                    <p className="text-xs text-foreground/80 font-medium mt-1">{dev.name.split(' ')[0]}</p>
                    <p className="text-xs text-muted-foreground">{dev.rep.toLocaleString()}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, username, or skill..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-8"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            {periods.map(p => (
              <button
                key={p}
                onClick={() => handlePeriodChange(p)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  period === p
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
            <Button variant="outline" size="sm" onClick={handleFilterClick} className="gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter
            </Button>
          </div>
        </div>

        {/* Leaderboard Table */}
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
              <button
                key={dev.rank}
                onClick={() => openProfile(dev)}
                className={`w-full grid grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-muted/30 transition-colors text-left ${
                  dev.rank <= 3 ? 'bg-primary/3' : ''
                }`}
              >
                <div className="col-span-1 flex items-center justify-center">
                  {getRankIcon(dev.rank)}
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  <img src={dev.avatar} alt={dev.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{dev.name}</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs text-muted-foreground">@{dev.username}</span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {dev.badge}
                      </Badge>
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
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No developers match your search.
            </div>
          )}
        </div>
      </div>

      {/* Profile Dialog */}
      <Dialog open={!!selectedDev} onOpenChange={(open) => !open && setSelectedDev(null)}>
        <DialogContent className="sm:max-w-lg">
          {selectedDev && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <img src={selectedDev.avatar} alt={selectedDev.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div>{selectedDev.name}</div>
                    <div className="text-sm font-normal text-muted-foreground">@{selectedDev.username}</div>
                  </div>
                </DialogTitle>
                <DialogDescription className="sr-only">Developer profile details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-muted rounded-lg p-2">
                    <div className="text-lg font-bold text-primary">{selectedDev.rep.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Reputation</div>
                  </div>
                  <div className="bg-muted rounded-lg p-2">
                    <div className="text-lg font-bold">{selectedDev.answers}</div>
                    <div className="text-xs text-muted-foreground">Answers</div>
                  </div>
                  <div className="bg-muted rounded-lg p-2">
                    <div className="text-lg font-bold">{selectedDev.reviews}</div>
                    <div className="text-xs text-muted-foreground">Reviews</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Badge</h4>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {selectedDev.badge}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Technical Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDev.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-2 text-xs text-muted-foreground border-t border-border">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Rank #{selectedDev.rank} this {period.toLowerCase()}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}