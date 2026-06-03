import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { faqData } from '@/lib/mockData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Type for FAQ items (assuming faqData has this shape)
interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Questions we get
            <br />
            <span className="text-gradient">all the time</span>
          </h2>
          <p className="text-muted-foreground text-lg">Everything you need to know before getting started.</p>
        </div>

        <div className="space-y-3">
          {faqData.slice(0, 6).map((item: FAQItem, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-button-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={item.question} // use question as key (assuming unique)
                className={cn(
                  'bg-card border rounded-xl overflow-hidden transition-all',
                  isOpen ? 'border-primary/30' : 'border-border'
                )}
              >
                <button
                  id={buttonId}
                  type="button"
                  className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary/30"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="font-medium text-sm pr-4">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn('px-6 pb-5', !isOpen && 'hidden')}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-3">Still have questions?</p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" asChild>
              <Link to="/faq">View All FAQs</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}