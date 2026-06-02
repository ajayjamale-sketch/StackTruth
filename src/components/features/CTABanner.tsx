import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2 } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-24 section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.18),transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-6">
          <Code2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
          Ready to write better code?
          <br /><span className="text-gradient">Start for free today.</span>
        </h2>
        <p className="text-xl text-slate-200/80 mb-10 max-w-xl mx-auto">
          Join 180,000+ developers who use StackTruth to learn faster, build better, and advance their careers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow h-13 px-8 text-base" asChild>
            <Link to="/register">Get Started Free — No Card Required <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-13 px-8 text-base" asChild>
            <Link to="/questions">Explore Questions</Link>
          </Button>
        </div>
        <p className="text-slate-400 text-sm mt-6">Free forever · No credit card · Cancel anytime</p>
      </div>
    </section>
  );
}
