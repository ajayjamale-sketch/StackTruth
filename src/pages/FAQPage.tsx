import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '@/lib/mockData';
import { cn } from '@/lib/utils';

const categories = [
  { label: 'All', count: faqData.length },
  { label: 'Platform', count: 3 },
  { label: 'Pricing', count: 2 },
  { label: 'Technical', count: 2 },
  { label: 'Account', count: 1 },
];

export default function FAQPage() {
  useScrollToTop();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToTop />

      {/* Hero */}
      <section className="pt-32 pb-16 section-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_70%)]" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-primary/20 text-blue-300 border border-primary/30">FAQ</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-slate-200/80">Everything you need to know about StackTruth</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(c => (
              <button
                key={c.label}
                onClick={() => setActiveCategory(c.label)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === c.label ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {c.label} ({c.count})
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {faqData.map((item, i) => (
              <div key={i} className={cn('bg-card border rounded-xl overflow-hidden transition-all', openIndex === i ? 'border-primary/30' : 'border-border')}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-medium pr-4">{item.question}</span>
                  <ChevronDown className={cn('w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200', openIndex === i && 'rotate-180')} />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <h3 className="font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground text-sm mb-4">Our team responds within 24 hours. Usually much faster.</p>
            <div className="flex justify-center gap-3">
              <Button asChild><Link to="/contact">Contact Support</Link></Button>
              <Button variant="outline" asChild><Link to="/ai-assistant">Ask AI Assistant</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6">Join 180,000+ developers on StackTruth today — free forever.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow" asChild>
            <Link to="/register">Create Free Account</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
