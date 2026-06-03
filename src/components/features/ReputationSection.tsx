import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy, Star, Award, Zap } from 'lucide-react';

const topDevs = [
  { rank: 1, name: 'Priya Nair', username: '@priya_n', rep: 18420, badge: 'Expert', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=48&h=48&fit=crop&crop=face', skills: ['TypeScript', 'Rust'] },
  { rank: 2, name: 'Marcus Rivera', username: '@marcus_r', rep: 14280, badge: 'Mentor', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face', skills: ['Go', 'Kubernetes'] },
  { rank: 3, name: 'Sarah Chen', username: '@sarah_c', rep: 12100, badge: 'Top Reviewer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face', skills: ['React', 'Python'] },
];

const badges = [
  { name: 'Top Contributor', desc: 'Top 1% of answers', color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20', icon: Trophy },
  { name: 'Code Reviewer', desc: '100+ code reviews', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', icon: Star },
  { name: 'Mentor', desc: 'Guided 50+ devs', color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20', icon: Award },
  { name: 'Early Adopter', desc: 'Joined in 2022', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20', icon: Zap },
];

export default function ReputationSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Reputation System</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Earn recognition for
            <br /><span className="text-gradient">quality contributions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Build a verified reputation that follows you across jobs, interviews, and collaborations. Every great answer earns you points, badges, and expert status.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Leaderboard */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-semibold flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" /> This Week's Leaderboard</h3>
              <Link to="/leaderboard" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-border">
              {topDevs.map(dev => (
                <div key={dev.rank} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    dev.rank === 1 ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                    dev.rank === 2 ? 'bg-slate-400/20 text-slate-400' :
                    'bg-orange-500/20 text-orange-600 dark:text-orange-400'
                  }`}>#{dev.rank}</div>
                  <img src={dev.avatar} alt={dev.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{dev.name}</p>
                    <p className="text-xs text-muted-foreground">{dev.username}</p>
                    <div className="flex gap-1 mt-1">
                      {dev.skills.map(s => <span key={s} className="text-[10px] px-1.5 bg-primary/10 text-primary rounded">{s}</span>)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{dev.rep.toLocaleString()}</p>
                    <Badge variant="secondary" className="text-xs">{dev.badge}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="font-semibold mb-4">Achievement Badges</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {badges.map(b => {
                const Icon = b.icon;
                return (
                  <div key={b.name} className={`border ${b.color} rounded-xl p-4 flex items-center gap-3`}>
                    <Icon className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{b.name}</p>
                      <p className="text-xs opacity-70">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-card border border-border rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Your Reputation Progress</span>
                <span className="text-sm font-bold text-primary">4,820 pts</span>
              </div>
              <div className="h-2 bg-muted rounded-full mb-1">
                <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '62%' }} />
              </div>
              <p className="text-xs text-muted-foreground">1,180 pts to Expert status</p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/leaderboard">View Leaderboard <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
