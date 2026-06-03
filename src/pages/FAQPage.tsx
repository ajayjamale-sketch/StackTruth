// FAQPage.tsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock FAQ data – replace with actual import from @/lib/mockData if available
const faqData = [
  { question: 'What is StackTruth?', answer: 'StackTruth is a developer-first platform that combines community Q&A with AI‑powered code reviews, live collaboration, and skill‑based mentorship.', category: 'Platform' },
  { question: 'How does the AI code review work?', answer: 'Our AI engine scans your code for security vulnerabilities, performance issues, and style problems. It provides line‑by‑line feedback with fix suggestions.', category: 'Technical' },
  { question: 'Is StackTruth free?', answer: 'Yes, basic features including asking questions, answering, and AI code reviews are free. Premium plans offer advanced analytics, live coding sessions, and priority support.', category: 'Pricing' },
  { question: 'How do I become a verified expert?', answer: 'Users with 2000+ reputation can apply for verification. Our team reviews your contributions and technical depth before granting the Expert badge.', category: 'Account' },
  { question: 'What technologies are supported?', answer: 'We support all major languages: JavaScript/TypeScript, Python, Rust, Go, Java, C#, Ruby, PHP, Swift, Kotlin, and more.', category: 'Technical' },
  { question: 'Can I use StackTruth for team training?', answer: 'Yes, we offer Team and Enterprise plans with private Q&A spaces, custom onboarding, and analytics dashboards.', category: 'Pricing' },
  { question: 'How long does it take to get an answer?', answer: 'Most questions receive a response within 2 hours. Our active community of 180K+ developers ensures fast, quality answers.', category: 'Platform' },
  { question: 'Is my code private during reviews?', answer: 'Code submitted for AI review is not stored permanently. For manual expert reviews, you can request an NDA.', category: 'Platform' },
];

// Dynamic category counts
const allCategories = ['All', ...new Set(faqData.map(item => item.category))];
const categories = allCategories.map(cat => ({
  label: cat,
  count: cat === 'All' ? faqData.length : faqData.filter(item => item.category === cat).length
}));

export default function FAQPage() {
  useScrollToTop();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter FAQs by active category
  const filteredFaqs = faqData.filter(item =>
    activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={false} />
      <ScrollToTop />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground dark:text-blue-300 border border-primary/30">
            FAQ
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about StackTruth
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map(cat => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.label
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* FAQ accordion */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No FAQs match this category.
              </div>
            ) : (
              filteredFaqs.map((item, idx) => {
                // Use a stable key based on question + index
                const globalIndex = faqData.findIndex(f => f.question === item.question);
                const isOpen = openIndex === globalIndex;
                return (
                  <div
                    key={globalIndex}
                    className={cn(
                      'bg-card border rounded-xl overflow-hidden transition-all',
                      isOpen ? 'border-primary/30' : 'border-border'
                    )}
                  >
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 text-left"
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                    >
                      <span className="font-medium pr-4">{item.question}</span>
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200',
                          isOpen && 'rotate-180'
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5">
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Still have questions? */}
          <div className="mt-10 bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
            <h3 className="font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Our team responds within 24 hours. Usually much faster.
            </p>
            <div className="flex justify-center gap-3">
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/ai-assistant">Ask AI Assistant</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6">
            Join 180,000+ developers on StackTruth today — free forever.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/register">Create Free Account</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}