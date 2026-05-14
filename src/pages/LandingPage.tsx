import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Code2, MessageSquare, Shield, Users, Zap, Trophy, ArrowRight,
  Star, CheckCircle, Github, Play, TrendingUp, Globe, ChevronDown,
  Bot, Briefcase, BookOpen, Award,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { TESTIMONIALS, PRICING_PLANS, FAQS, TECH_TAGS } from "@/constants/mockData";

const STATS = [
  { value: "2.4M+", label: "Developers", icon: Users },
  { value: "8.9M+", label: "Questions answered", icon: MessageSquare },
  { value: "340K+", label: "Code reviews", icon: Code2 },
  { value: "98%", label: "Expert satisfaction", icon: Star },
];

const FEATURES = [
  { icon: MessageSquare, title: "Technical Q&A", description: "Stack Overflow-quality discussions with AI-enhanced answers and expert validation.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: Code2, title: "AI Code Review", description: "Automated security scanning, performance analysis, and best practice enforcement.", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { icon: Bot, title: "AI Developer Assistant", description: "Context-aware AI that understands your codebase and provides actionable suggestions.", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { icon: Users, title: "Team Workspaces", description: "Private collaboration hubs with shared code, docs, and real-time communication.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { icon: Play, title: "Live Coding Rooms", description: "Pair programming, technical interviews, and mentorship sessions in real-time.", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { icon: Trophy, title: "Reputation System", description: "Gamified contribution tracking with expert badges, streaks, and community rankings.", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
  { icon: BookOpen, title: "Knowledge Base", description: "Curated tutorials, technical articles, and API documentation from industry experts.", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { icon: Briefcase, title: "Job Marketplace", description: "Developer-verified job listings with skill-matched opportunities and recruiter profiles.", color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/20" },
];

const COMPANY_LOGOS = ["Google", "Microsoft", "Stripe", "Vercel", "GitHub", "Cloudflare", "Figma", "Linear"];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const step = target / 60;
    const timer = setInterval(() => {
      setCount((c) => {
        if (c >= target) { clearInterval(timer); return target; }
        return Math.min(c + step, target);
      });
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <>{Math.floor(count).toLocaleString()}{suffix}</>;
}

function HeroCodeBlock() {
  const code = `// StackTruth AI Code Review
const analyzeCode = async (code: string) => {
  const analysis = await ai.review(code, {
    checks: ['security', 'performance', 'style'],
    autoFix: true
  });
  
  return {
    score: analysis.score,      // 94/100
    issues: analysis.issues,    // 2 warnings
    suggestions: analysis.tips  // 5 improvements
  };
};`;

  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= code.length) {
        setDisplayed(code.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCursor((c) => !c), 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-green-500/10 rounded-2xl blur-xl" />
      <div className="relative bg-slate-950 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700 bg-slate-900/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <span className="text-xs text-slate-500 font-mono">analyze.ts</span>
        </div>
        <pre className="p-5 text-xs font-mono text-slate-300 leading-relaxed overflow-hidden">
          <code>
            {displayed}
            {cursor && <span className="bg-blue-400 text-blue-400">|</span>}
          </code>
        </pre>
        {/* Analysis result overlay */}
        <div className="absolute bottom-4 right-4 bg-green-500/10 border border-green-500/30 rounded-lg p-2.5 text-xs font-mono">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-3 h-3" />
            <span>Score: 94/100</span>
          </div>
          <div className="text-slate-500 mt-0.5">2 warnings · 5 suggestions</div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { isAuthenticated, loginAsRole } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePricingPeriod, setActivePricingPeriod] = useState<"month" | "year">("month");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 font-medium">
                <Zap className="w-3.5 h-3.5" />
                Now with AI-powered code analysis
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[0.95] tracking-tight">
                  Where Developers{" "}
                  <span className="gradient-text">Build Truth</span>
                </h1>
                <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                  The premium developer platform combining expert Q&A, AI code review, live collaboration, and career growth — all in one technical workspace.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Link to="/dashboard/developer" className="btn-primary flex items-center gap-2 text-base px-8 py-3">
                    Go to Dashboard <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <>
                    <Link to="/register" className="btn-primary flex items-center gap-2 text-base px-8 py-3">
                      Start for Free <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/login" className="btn-secondary flex items-center gap-2 text-base px-6 py-3">
                      Sign In
                    </Link>
                  </>
                )}
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}&backgroundColor=b6e3f4`}
                      alt=""
                      className="w-8 h-8 rounded-full ring-2 ring-background bg-slate-700"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">Loved by <strong className="text-white">2.4M+</strong> developers</p>
                </div>
              </div>
            </div>

            {/* Hero code block */}
            <div className="hidden lg:block">
              <HeroCodeBlock />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-slate-600 font-medium uppercase tracking-widest mb-8">
            Trusted by engineers at
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {COMPANY_LOGOS.map((company) => (
              <div key={company} className="text-slate-600 hover:text-slate-400 transition-colors font-bold text-lg tracking-tight">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Everything a developer needs
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From technical Q&A to AI code analysis, live collaboration to job matching — one platform for your entire developer journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className={`glass-card-hover p-5 cursor-default animate-in stagger-${Math.min(i + 1, 5)}`}
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${feature.bg}`}>
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Tags */}
      <section className="py-16 border-y border-border bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Covering Every Tech Stack</h2>
            <p className="text-slate-400">Expert knowledge across the modern developer ecosystem</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_TAGS.map((tag) => (
              <span key={tag} className="tag-badge text-sm px-3 py-1.5">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4">Loved by developers worldwide</h2>
            <p className="text-slate-400">Don't take our word for it — hear from the community</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="glass-card p-5 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full bg-slate-700" />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-slate-950/50 border-y border-border" id="pricing">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-400 mb-8">Start free, scale with your team</p>
            <div className="inline-flex items-center bg-white/5 border border-border rounded-xl p-1">
              <button
                onClick={() => setActivePricingPeriod("month")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activePricingPeriod === "month" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setActivePricingPeriod("year")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activePricingPeriod === "year" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Annual <span className="text-green-400 text-xs font-bold ml-1">-20%</span>
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative glass-card p-6 flex flex-col ${plan.isPopular ? "border-blue-500/50 shadow-xl shadow-blue-500/10" : ""}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-500 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-white">
                    ${activePricingPeriod === "year" ? Math.floor(plan.price * 0.8) : plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-slate-500 text-sm">/{activePricingPeriod === "year" ? "mo" : plan.period}</span>
                  )}
                </div>
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.cta === "Contact Sales" ? "/contact" : "/register"}
                  className={`text-center py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    plan.isPopular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4">Frequently asked questions</h2>
            <p className="text-slate-400">Everything you need to know about StackTruth</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                >
                  <span className="font-semibold text-white text-sm">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`}
                  />
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

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/10 rounded-3xl blur-3xl" />
            <div className="relative glass-card p-12 space-y-6">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
                Ready to level up your{" "}
                <span className="gradient-text">developer game?</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                Join 2.4 million developers building, learning, and growing their careers on StackTruth.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register" className="btn-primary flex items-center gap-2 text-base px-8 py-3">
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/about" className="btn-secondary flex items-center gap-2 text-base px-6 py-3">
                  Learn More
                </Link>
              </div>
              <p className="text-xs text-slate-600">No credit card required · Free forever plan available</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
