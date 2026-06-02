import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { pricingPlans } from '@/lib/mockData';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start free, scale as you grow
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Every plan includes full access to the Q&A community, knowledge base, and AI code review.
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm ${!yearly ? 'font-medium' : 'text-muted-foreground'}`}>Monthly</span>
            <button onClick={() => setYearly(!yearly)} className={`w-11 h-6 rounded-full transition-colors relative ${yearly ? 'bg-primary' : 'bg-muted'}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${yearly ? 'left-6' : 'left-1'}`} />
            </button>
            <span className={`text-sm ${yearly ? 'font-medium' : 'text-muted-foreground'}`}>
              Yearly <span className="text-accent text-xs font-semibold ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {pricingPlans.map(plan => (
            <div key={plan.id} className={`relative bg-card border rounded-2xl p-6 flex flex-col ${plan.highlighted ? 'border-primary shadow-xl shadow-primary/20 scale-105' : 'border-border'}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full bg-primary text-white">
                  {plan.badge}
                </div>
              )}
              <div className="mb-5">
                <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black">${yearly ? plan.price.yearly : plan.price.monthly}</span>
                  {plan.price.monthly > 0 && <span className="text-muted-foreground text-sm mb-1">/month</span>}
                </div>
              </div>
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.slice(0, 5).map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${plan.highlighted ? 'bg-primary hover:bg-primary/90 btn-glow' : ''}`}
                variant={plan.highlighted ? 'default' : 'outline'}
                onClick={() => navigate('/register')}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/pricing" className="text-sm text-primary hover:underline">
            View full pricing details and enterprise plans →
          </Link>
        </div>
      </div>
    </section>
  );
}
