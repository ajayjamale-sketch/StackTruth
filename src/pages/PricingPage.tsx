import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Zap, ArrowRight, ChevronDown } from "lucide-react";
import { PRICING_PLANS, FAQS } from "@/constants/mockData";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-24 mesh-bg text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-6">
            <Zap className="w-3.5 h-3.5" /> Simple Pricing
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-4">Invest in your developer journey</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">Start free, scale as you grow. No hidden fees, cancel anytime.</p>

          <div className="inline-flex items-center bg-white/5 border border-border rounded-xl p-1 mb-12">
            <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${!annual ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${annual ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>
              Annual <span className="text-green-400 text-xs font-bold ml-1.5">Save 20%</span>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {PRICING_PLANS.map(plan => (
              <div key={plan.id} className={`relative glass-card p-6 flex flex-col ${plan.isPopular ? "border-blue-500/50 shadow-xl shadow-blue-500/10 scale-105" : ""}`}>
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white text-xl mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-500 mb-5">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-extrabold text-white">
                    ${annual ? Math.floor(plan.price * 0.8) : plan.price}
                  </span>
                  {plan.price > 0 && <span className="text-slate-500 text-sm">/month{annual ? "*" : ""}</span>}
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={plan.cta === "Contact Sales" ? "/contact" : "/register"} 
                  className={`text-center py-3 rounded-xl text-sm font-bold transition-all ${plan.isPopular ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20" : "bg-white/10 hover:bg-white/20 text-white"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          {annual && <p className="text-xs text-slate-600 mt-6">*Billed annually. Switch to monthly anytime.</p>}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">Pricing FAQ</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex items-center justify-between w-full px-5 py-4 text-left">
                  <span className="font-semibold text-white text-sm">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 border-t border-border">
                    <p className="text-sm text-slate-400 leading-relaxed pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
