// Careers.tsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner'; // optional for feedback

const openings = [
  { title: 'Senior Backend Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time', level: 'Senior' },
  { title: 'ML Infrastructure Engineer', dept: 'AI Team', location: 'San Francisco', type: 'Full-time', level: 'Senior' },
  { title: 'Product Designer', dept: 'Design', location: 'Remote', type: 'Full-time', level: 'Mid-Senior' },
  { title: 'Community Manager', dept: 'Growth', location: 'Remote', type: 'Full-time', level: 'Mid-level' },
  { title: 'DevRel Engineer', dept: 'Developer Relations', location: 'Hybrid', type: 'Full-time', level: 'Mid-Senior' },
];

const values = [
  { title: 'Remote-First', desc: 'Work from anywhere. We have team members in 20+ countries.' },
  { title: 'Async Culture', desc: 'Deep work matters. We minimize unnecessary meetings.' },
  { title: 'High Impact', desc: 'Your work directly impacts 180K+ developers every day.' },
  { title: 'Growth Budget', desc: '$2,000/year for conferences, courses, and books.' },
];

export default function Careers() {
  useScrollToTop();

  const handleApplyClick = (jobTitle: string) => {
    // Optional: log analytics or show a toast
    toast.success(`Application started for ${jobTitle}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={false} /> {/* Assuming Navbar accepts optional prop */}
      <ScrollToTop />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground dark:text-blue-300 border border-primary/30">
            We're Hiring
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-5">
            Build the future of developer knowledge
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are a small, high-impact team building tools that millions of engineers use every day.
          </p>
        </div>
      </section>

      {/* Values & Open Positions */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border rounded-xl p-5 transition-all duration-200 hover:shadow-md"
              >
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>

          {/* Open Positions */}
          <h2 className="text-2xl font-bold mb-6">
            Open Positions ({openings.length})
          </h2>
          <div className="space-y-3">
            {openings.map((job, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/30 transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <Badge variant="secondary" className="text-xs">
                      {job.dept}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                      {job.level}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {job.type}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 flex-shrink-0"
                  asChild
                  onClick={() => handleApplyClick(job.title)}
                >
                  <Link to="/contact">Apply Now</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't see a fit?</h2>
          <p className="text-muted-foreground mb-6">
            We're always looking for exceptional people. Send us your story.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/contact">
              Get In Touch <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}