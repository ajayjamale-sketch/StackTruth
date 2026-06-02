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
import { Briefcase, MapPin, DollarSign, Clock, Search, Bookmark, BookmarkCheck, Filter, Building2, ExternalLink, CheckCircle } from 'lucide-react';

const jobs = [
  {
    id: '1', title: 'Senior Backend Engineer', company: 'Stripe', location: 'Remote', salary: '$180K–$240K',
    type: 'Full-time', skills: ['Go', 'PostgreSQL', 'Kubernetes', 'gRPC'],
    logo: 'S', logoColor: 'bg-blue-600', posted: '2d ago', level: 'Senior',
    desc: 'Join Stripe\'s platform team to build the infrastructure that processes billions of dollars in payments.',
    perks: ['Remote First', 'Equity', '401K', 'Health'],
  },
  {
    id: '2', title: 'Staff Frontend Engineer', company: 'Vercel', location: 'San Francisco', salary: '$200K–$280K',
    type: 'Full-time', skills: ['React', 'TypeScript', 'Next.js', 'Edge Functions'],
    logo: 'V', logoColor: 'bg-black', posted: '4d ago', level: 'Staff',
    desc: 'Shape the future of frontend development at the company powering millions of web projects.',
    perks: ['Hybrid', 'Equity', 'Learning Budget', 'Health'],
  },
  {
    id: '3', title: 'Platform Engineer', company: 'Linear', location: 'Remote', salary: '$160K–$220K',
    type: 'Full-time', skills: ['Rust', 'AWS', 'TypeScript', 'Terraform'],
    logo: 'L', logoColor: 'bg-indigo-600', posted: '1w ago', level: 'Mid-Senior',
    desc: 'Build the infrastructure and developer tooling that keeps Linear blazingly fast at scale.',
    perks: ['Remote First', 'Equity', 'Async Culture'],
  },
  {
    id: '4', title: 'Senior DevOps Engineer', company: 'PlanetScale', location: 'Remote', salary: '$170K–$230K',
    type: 'Full-time', skills: ['Kubernetes', 'MySQL', 'Go', 'Terraform'],
    logo: 'P', logoColor: 'bg-green-700', posted: '3d ago', level: 'Senior',
    desc: 'Help scale the world\'s most advanced serverless MySQL platform to millions of databases.',
    perks: ['Remote First', 'Equity', 'Home Office', 'Health'],
  },
  {
    id: '5', title: 'Senior Full-Stack Engineer', company: 'Notion', location: 'Hybrid - NY', salary: '$175K–$245K',
    type: 'Full-time', skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    logo: 'N', logoColor: 'bg-gray-900', posted: '5d ago', level: 'Senior',
    desc: 'Work on Notion\'s core editor and collaboration features used by millions of knowledge workers.',
    perks: ['Hybrid', 'Equity', 'Unlimited PTO', 'Health'],
  },
  {
    id: '6', title: 'AI/ML Infrastructure Engineer', company: 'Figma', location: 'San Francisco', salary: '$200K–$290K',
    type: 'Full-time', skills: ['Python', 'PyTorch', 'Kubernetes', 'CUDA'],
    logo: 'F', logoColor: 'bg-red-500', posted: '1d ago', level: 'Staff',
    desc: 'Lead the infrastructure powering Figma\'s AI features and bring them to production at scale.',
    perks: ['On-site', 'Equity', 'Learning Budget', 'Health'],
  },
];

export default function Jobs() {
  useScrollToTop();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [applying, setApplying] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  const toggleSave = (id: string) => {
    const next = new Set(saved);
    if (next.has(id)) { next.delete(id); toast.success('Removed from saved'); }
    else { next.add(id); toast.success('Job saved!'); }
    setSaved(next);
  };

  const handleApply = async (id: string, title: string) => {
    setApplying(id);
    await new Promise(r => setTimeout(r, 1500));
    setApplying(null);
    toast.success(`Application submitted for ${title}!`);
  };

  const filtered = jobs.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'All' || j.location.includes(filter === 'Remote' ? 'Remote' : filter);
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Header */}
      <div className="pt-20 pb-8 section-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-primary/20 text-blue-300 border border-primary/30">Job Marketplace</Badge>
            <h1 className="text-3xl font-bold text-white mb-3">Find Your Next Engineering Role</h1>
            <p className="text-slate-200/70">Top companies hire directly from StackTruth based on your reputation and code quality</p>
          </div>
          <div className="max-w-2xl mx-auto flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title, company, or skills..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90"><Filter className="w-4 h-4 mr-2" />Filter</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All', 'Remote', 'Hybrid', 'Senior', 'Staff'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
          <Badge variant="secondary" className="ml-2">{filtered.length} jobs</Badge>
        </div>

        {/* Job Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(job => (
            <div key={job.id} className="bg-card border border-border rounded-xl overflow-hidden card-hover flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${job.logoColor} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{job.title}</h3>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                    </div>
                  </div>
                  <button onClick={() => toggleSave(job.id)} className="text-muted-foreground hover:text-primary transition-colors mt-0.5">
                    {saved.has(job.id) ? <BookmarkCheck className="w-4 h-4 text-primary" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{job.desc}</p>

                <div className="flex flex-wrap gap-2 mb-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{job.salary}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.posted}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {job.skills.slice(0, 3).map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-md border border-primary/20">{s}</span>
                  ))}
                  {job.skills.length > 3 && (
                    <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-md">+{job.skills.length - 3}</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {job.perks.map(p => (
                    <span key={p} className="text-[10px] px-1.5 py-0.5 bg-muted rounded text-muted-foreground flex items-center gap-0.5">
                      <CheckCircle className="w-2.5 h-2.5 text-accent" />{p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-5 flex gap-2">
                <Button
                  className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90"
                  disabled={applying === job.id}
                  onClick={() => handleApply(job.id, job.title)}
                >
                  {applying === job.id ? 'Applying...' : 'Quick Apply'}
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-3" onClick={() => toast.success('Opening full listing...')}>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
            <h3 className="font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
