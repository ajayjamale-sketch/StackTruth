import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';

const jobs = [
  {
    title: 'Senior Backend Engineer',
    company: 'Stripe',
    location: 'Remote',
    salary: '$180K–$240K',
    type: 'Full-time',
    skills: ['Go', 'PostgreSQL', 'Kubernetes'],
    logo: 'S',
    logoColor: 'bg-blue-600',
    posted: '2d ago',
  },
  {
    title: 'Staff Frontend Engineer',
    company: 'Vercel',
    location: 'San Francisco',
    salary: '$200K–$280K',
    type: 'Full-time',
    skills: ['React', 'TypeScript', 'Next.js'],
    logo: 'V',
    logoColor: 'bg-black',
    posted: '4d ago',
  },
  {
    title: 'Platform Engineer',
    company: 'Linear',
    location: 'Remote',
    salary: '$160K–$220K',
    type: 'Full-time',
    skills: ['Rust', 'AWS', 'TypeScript'],
    logo: 'L',
    logoColor: 'bg-indigo-600',
    posted: '1w ago',
  },
];

export default function JobMarketplaceSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Job Marketplace</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your reputation opens
            <br /><span className="text-gradient">the best engineering doors</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Top companies hire directly from StackTruth. Your public profile, code quality scores, and reputation signal your skills before the first interview.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {jobs.map((job, i) => (
            <Link key={i} to="/jobs" className="bg-card border border-border rounded-xl p-5 card-hover block">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${job.logoColor} flex items-center justify-center text-white font-bold`}>
                  {job.logo}
                </div>
                <Badge variant="secondary" className="text-xs">{job.type}</Badge>
              </div>
              <h3 className="font-semibold mb-1">{job.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{job.company}</p>
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" /> {job.location}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <DollarSign className="w-3 h-3" /> {job.salary}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> Posted {job.posted}
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {job.skills.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-md border border-primary/20">{s}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/jobs">Browse All Jobs <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
