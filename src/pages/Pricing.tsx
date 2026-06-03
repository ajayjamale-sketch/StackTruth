import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { pricingPlans } from '@/lib/mockData';
import { Check, ArrowRight } from 'lucide-react';

export default function Pricing() {
  useScrollToTop();
  const navigate = useNavigate();
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToTop />

      {/* Hero */}
      <section className="pt-32 pb-16 section-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Badge className="mb-5 bg-primary/20 text-blue-600 dark:text-blue-300 border border-primary/30">
            Pricing
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Free to get started. Scale as you grow.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3">
            <span
              className={`text-sm ${!yearly ? 'text-white font-medium' : 'text-muted-foreground'}`}
              aria-hidden="true"
            >
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setYearly(!yearly)}
              className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                yearly ? 'bg-primary' : 'bg-surface-8'
              }`}
              aria-label={`Switch to ${yearly ? 'monthly' : 'yearly'} billing`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                  yearly ? 'left-7' : 'left-1'
                }`}
                aria-hidden="true"
              />
            </button>
            <span
              className={`text-sm ${yearly ? 'text-white font-medium' : 'text-muted-foreground'}`}
              aria-hidden="true"
            >
              Yearly <span className="text-accent text-xs font-semibold">Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map(plan => (
              <div
                key={plan.id}
                className={`relative bg-card border rounded-2xl p-6 flex flex-col ${
                  plan.highlighted
                    ? 'border-primary shadow-2xl shadow-primary/20 scale-105'
                    : 'border-border'
                }`}
              >
                {plan.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full ${
                      plan.highlighted
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground border border-border'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black">
                      ${yearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-muted-foreground text-sm mb-1">/month</span>
                  </div>
                  {yearly && plan.price.monthly > 0 && (
                    <p className="text-xs text-accent mt-1">
                      You save ${(plan.price.monthly - plan.price.yearly) * 12}/year
                    </p>
                  )}
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.highlighted ? 'bg-primary hover:bg-primary/90 btn-glow' : ''}`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                  onClick={() => navigate('/register')}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg">Enterprise</h3>
              <p className="text-muted-foreground text-sm">
                Custom plans for large engineering orgs with SSO, dedicated support, and SLA.
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 flex-shrink-0" asChild>
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Pricing FAQ</h2>
          <div className="space-y-3">
            {[
              {
                q: 'Can I change plans at any time?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and are prorated.',
              },
              {
                q: 'Is there a free trial?',
                a: 'All paid plans come with a 14-day free trial. No credit card required to start.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and for enterprise plans, bank transfer and invoicing.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-4">
                <p className="font-medium text-sm mb-2">{faq.q}</p>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Start free today</h2>
          <p className="text-muted-foreground mb-6">
            Join 180K+ developers. No credit card required.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 btn-glow" asChild>
            <Link to="/register">
              Get Started Free <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}