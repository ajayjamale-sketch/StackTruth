import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Search, Plus, BookOpen, CheckCircle, TrendingUp, Star
} from 'lucide-react';
import { mockQuestions } from '@/lib/mockData';

const allTags = ['typescript', 'react', 'postgresql', 'nodejs', 'rust', 'python', 'kubernetes', 'graphql', 'microservices', 'aws', 'docker', 'go'];
const filters = ['Newest', 'Most Voted', 'Unanswered', 'Active', 'Featured'];

// Extended mock data (combine imported + additional)
const extendedQuestions = [
  ...mockQuestions,
  {
    id: '4', title: 'Rust async/await with Tokio: handling multiple concurrent HTTP requests',
    body: '', tags: ['rust', 'async', 'tokio', 'http'],
    author: { name: 'James Wu', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', reputation: 2100 },
    votes: 28, answers: 4, views: 1200, accepted: false, createdAt: '2024-01-17T11:00:00Z',
  },
  {
    id: '5', title: 'Docker multi-stage builds for Node.js: reduce image size from 1GB to 150MB',
    body: '', tags: ['docker', 'nodejs', 'devops'],
    author: { name: 'Amara J', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', reputation: 3450 },
    votes: 54, answers: 9, views: 4100, accepted: true, createdAt: '2024-01-16T08:30:00Z',
  },
  {
    id: '6', title: 'GraphQL N+1 problem: DataLoader implementation in production at scale',
    body: '', tags: ['graphql', 'dataloader', 'performance'],
    author: { name: 'Priya M', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face', reputation: 5200 },
    votes: 71, answers: 15, views: 5600, accepted: true, createdAt: '2024-01-14T15:00:00Z',
  },
];

export default function Questions() {
  useScrollToTop();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Newest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredAndSorted = useMemo(() => {
    // Step 1: Filter by search and tag
    let filtered = extendedQuestions.filter(q => {
      const matchesSearch = !search || 
        q.title.toLowerCase().includes(search.toLowerCase()) || 
        q.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchesTag = !selectedTag || q.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });

    // Step 2: Apply sort / special filters
    switch (activeFilter) {
      case 'Newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'Most Voted':
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case 'Unanswered':
        filtered = filtered.filter(q => q.answers === 0);
        break;
      case 'Active':
        // For demo: sort by most recent activity (using createdAt as proxy)
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'Featured':
        // Featured: accepted answers first, then by votes
        filtered.sort((a, b) => {
          if (a.accepted && !b.accepted) return -1;
          if (!a.accepted && b.accepted) return 1;
          return b.votes - a.votes;
        });
        break;
    }
    return filtered;
  }, [search, activeFilter, selectedTag]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Header */}
      <div className="pt-20 pb-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Technical Questions</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {extendedQuestions.length} questions · Ask anything technical
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 flex-shrink-0" onClick={() => navigate('/questions/ask')}>
              <Plus className="w-4 h-4 mr-2" /> Ask Question
            </Button>
          </div>

          {/* Search & Filters */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search questions by title, tag, or keyword..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                    activeFilter === f ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                !selectedTag ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedTag === tag ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Questions List */}
          <div className="lg:col-span-3 space-y-3">
            {filteredAndSorted.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                <h3 className="font-semibold mb-2">No questions found</h3>
                <p className="text-muted-foreground text-sm mb-4">Try adjusting your search or filters</p>
                <Button onClick={() => navigate('/questions/ask')}>Ask a Question</Button>
              </div>
            ) : (
              filteredAndSorted.map(q => (
                <Link key={q.id} to={`/questions/${q.id}`} className="block bg-card border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="flex gap-5">
                    {/* Stats */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-2 text-center min-w-[52px]">
                      <div>
                        <div className={`text-lg font-bold ${q.votes > 50 ? 'text-accent' : 'text-muted-foreground'}`}>{q.votes}</div>
                        <div className="text-xs text-muted-foreground">votes</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${q.accepted ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-muted text-muted-foreground'}`}>
                        <div className="text-base font-bold">{q.answers}</div>
                        <div className="text-[10px]">ans</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div>{typeof q.views === 'number' ? `${(q.views/1000).toFixed(1)}K` : q.views}</div>
                        <div>views</div>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors line-clamp-2">{q.title}</h3>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {q.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md border border-primary/20">{tag}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <img src={q.author.avatar} alt={q.author.name} className="w-5 h-5 rounded-full object-cover" />
                          <span>{q.author.name}</span>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{q.author.reputation.toLocaleString()} rep</Badge>
                        </div>
                        <span>·</span>
                        <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                        {q.accepted && (
                          <span className="flex items-center gap-1 text-accent"><CheckCircle className="w-3 h-3" />Accepted answer</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-primary" />Trending Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {allTags.slice(0, 8).map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />Top Contributors</h3>
              <div className="space-y-2">
                {[
                  { name: 'Priya N.', rep: 18420, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=28&h=28&fit=crop&crop=face' },
                  { name: 'Marcus R.', rep: 14280, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=28&h=28&fit=crop&crop=face' },
                  { name: 'Sarah C.', rep: 12100, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=28&h=28&fit=crop&crop=face' },
                ].map(u => (
                  <div key={u.name} className="flex items-center gap-2">
                    <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-xs flex-1">{u.name}</span>
                    <span className="text-xs text-primary font-medium">{(u.rep/1000).toFixed(1)}K</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2">Have a question?</h3>
              <p className="text-xs text-muted-foreground mb-3">Join 180K+ developers and ask your technical question today.</p>
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90" onClick={() => navigate('/questions/ask')}>
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Ask Question
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}