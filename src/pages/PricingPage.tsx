import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  CheckCircle, Zap, ArrowRight, ChevronDown, Award, 
  Sparkles, Shield, Star, Users, BookOpen, Globe, 
  MessageSquare, Clock, Terminal, Cpu, Network, X, CreditCard, Lock
} from "lucide-react";
import { PRICING_PLANS, FAQS } from "@/constants/mockData";
import { useToast } from "@/contexts/ToastContext";
import { useAuth } from "@/contexts/AuthContext";

export default function PricingPage() {
  const { success, warning } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const handleCTA = (plan: any) => {
    if (plan.cta === "Contact Sales") {
      success("Redirecting to institutional inquiry protocol...");
      navigate("/contact");
      return;
    }

    if (!isAuthenticated) {
      warning("Authentication Required", "Please initialize identity protocols to proceed with enrollment.");
      navigate("/register");
    } else {
      setSelectedPlan(plan);
      setShowPayment(true);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    success("Transaction Initialized", "Payment protocol successful. Provisioning technical access...");
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen">
      {/* 1. Mastery Portal Header */}
      <section className="relative pt-32 pb-40 overflow-hidden bg-white dark:bg-slate-950">
        <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none dark:invert-0 invert" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-8 text-center space-y-12 relative z-10">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/5 text-primary rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] border border-primary/10 shadow-sm">
              <Award className="w-4 h-4 text-amber-500" /> Mastery Protocols & Accreditation
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-950 dark:text-white tracking-tighter leading-[1.1]">
              Invest in Your <br /> <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">Engineering Sovereignty.</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">
              Professional technical mastery programs designed for modern engineering leaders. Join 48,000+ verified experts driving the global frontier.
            </p>
          </div>

          <div className="flex flex-col items-center gap-10">
            <div className="inline-flex items-center bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-1.5 shadow-2xl backdrop-blur-3xl">
              <button 
                onClick={() => setAnnual(false)} 
                className={`px-10 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${!annual ? "bg-white dark:bg-primary text-slate-950 dark:text-white shadow-xl" : "text-slate-500 hover:text-primary"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setAnnual(true)} 
                className={`px-10 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 relative ${annual ? "bg-white dark:bg-primary text-slate-950 dark:text-white shadow-xl" : "text-slate-500 hover:text-primary"}`}
              >
                Annual Protocol
                <span className="absolute -top-3 -right-3 bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-sm shadow-lg border-2 border-white dark:border-slate-950">SAVE 25%</span>
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
               <span className="flex items-center gap-3"><Shield className="w-5 h-5 text-primary" /> Global Certification</span>
               <span className="flex items-center gap-3"><Star className="w-5 h-5 text-primary" /> Verified Reputation</span>
               <span className="flex items-center gap-3"><Users className="w-5 h-5 text-primary" /> Mentor Lab Access</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-8 space-y-48 pb-48 relative z-10">
        {/* 2. Tier Selection Section */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, i) => (
            <div 
              key={plan.id} 
              className={`flex flex-col bg-white dark:bg-slate-900 border p-10 rounded-2xl transition-all duration-700 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] dark:hover:shadow-primary/5 group relative h-full ${plan.isPopular ? "border-primary/50 ring-4 ring-primary/5 shadow-2xl scale-105 z-20" : "border-slate-100 dark:border-slate-800 shadow-sm"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-black px-6 py-2 rounded-full shadow-2xl tracking-[0.2em] uppercase border-4 border-white dark:border-slate-900">
                  Recommended Path
                </div>
              )}
              
              <div className="space-y-4 mb-10">
                <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter group-hover:text-primary transition-colors duration-500">{plan.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight h-10 line-clamp-2">{plan.description}</p>
              </div>
              
              <div className="mb-10 flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter">
                  ${annual ? Math.floor(plan.price * 0.75) : plan.price}
                </span>
                {plan.price > 0 ? (
                  <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">/ Month</span>
                ) : (
                  <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Free Forever</span>
                )}
              </div>

              <ul className="space-y-4 flex-1 mb-12">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-[11px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest leading-normal group/item">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleCTA(plan)}
                className={`w-full text-center py-5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 shadow-lg ${plan.isPopular ? "bg-slate-950 dark:bg-primary text-white hover:bg-primary dark:hover:bg-emerald-500" : "bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-white/10 hover:bg-slate-950 dark:hover:bg-primary hover:text-white"}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </section>

        {/* 3. Global Accreditation Section */}
        <section className="space-y-24">
           <div className="text-center space-y-6">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Verified Registry</div>
             <h2 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tighter">Verified Accreditation</h2>
             <p className="text-xl text-slate-500 dark:text-slate-400 font-medium tracking-tight max-w-2xl mx-auto">StackTruth certifications are audited and recognized by global technology leaders and architectural labs.</p>
           </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              ].map((logo, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:border-primary/30 transition-all duration-700 group cursor-pointer shadow-sm">
                   <img src={logo} alt="Partner" className="h-8 object-contain dark:invert" />
                </div>
              ))}
            </div>
        </section>

        {/* 4. Expert Mentor Lab Section */}
        <section className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-12 md:p-24 relative overflow-hidden group shadow-2xl dark:shadow-none">
           <div className="absolute inset-0 grid-pattern opacity-[0.05] pointer-events-none dark:invert-0 invert" />
           <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
           
           <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-xl shadow-primary/5">
                  <Users className="w-5 h-5" /> Elite Expert Laboratory
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-slate-950 dark:text-white">Audit with the <br /> <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">Best.</span></h2>
                <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed font-medium tracking-tight">Our mastery programs are curated by senior engineers and architects from FAANG labs and high-growth technical institutes.</p>
                <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                  <button onClick={() => navigate("/faculty")} className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-primary/30 active:scale-95">
                    Explore Faculty
                  </button>
                  <div className="flex items-center gap-4 px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
                     <Sparkles className="w-6 h-6 text-amber-500" />
                     <span className="text-[10px] font-black text-slate-400 dark:text-slate-300 uppercase tracking-[0.2em]">Verified Mentors Only</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                { name: "Sarah Chen", role: "Principal Auditor @ Google", icon: "SC", img: "https://images.unsplash.com/photo-1558494949-ef0109121c64?auto=format&fit=crop&w=400&q=80" },
                { name: "Marcus Lee", role: "Systems Architect @ Meta", icon: "ML", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80" },
                { name: "Dr. Anita Ray", role: "AI Research Lead", icon: "AR", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80" },
                { name: "James Wilson", role: "Cloud Security Expert", icon: "JW", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80" },
              ].map((mentor) => (
                <div key={mentor.name} className="bg-white dark:bg-slate-950 p-8 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-primary/50 transition-all duration-500 group/item cursor-pointer relative overflow-hidden shadow-sm">
                   <div className="relative z-10 flex flex-col items-center text-center">
                     <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-primary font-black text-2xl mb-6 group-hover/item:scale-110 group-hover/item:bg-primary/10 transition-all shadow-sm">
                       {mentor.icon}
                     </div>
                     <h4 className="text-xl font-black mb-2 text-slate-950 dark:text-white tracking-tighter">{mentor.name}</h4>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mentor.role}</p>
                   </div>
                </div>
              ))}
              </div>
           </div>
        </section>

        {/* 5. Support & Knowledge Retrieval (FAQ) Section */}
        <section className="space-y-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Operational Support</div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tighter">Support Protocols</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium tracking-tight">Frequently retrieved information regarding membership and curricula.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all duration-500 hover:border-primary/30 group">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex items-center justify-between w-full px-10 py-8 text-left group">
                  <span className="font-black text-slate-950 dark:text-slate-100 text-lg tracking-tight group-hover:text-primary transition-colors">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-800 transition-all duration-500 ${openFaq === i ? "rotate-180 bg-primary/10" : ""}`}>
                     <ChevronDown className={`w-5 h-5 text-slate-400 transition-colors ${openFaq === i ? "text-primary" : ""}`} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-10 pb-10 border-t border-slate-50 dark:border-slate-800 animate-in fade-in slide-in-from-top-4 duration-500">
                    <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed pt-8 font-medium tracking-tight">{faq.answer}</p>
                    <div className="mt-8 flex items-center gap-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                       <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> Global Knowledge</span>
                       <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Updated May 2026</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-16 rounded-3xl text-center space-y-10 shadow-2xl dark:shadow-none relative overflow-hidden">
             <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />
             <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto shadow-inner relative z-10">
                <MessageSquare className="w-10 h-10" />
             </div>
             <div className="space-y-4 relative z-10">
               <h3 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">Still Have Inquiries?</h3>
               <p className="text-lg text-slate-500 dark:text-slate-400 font-medium tracking-tight max-w-xl mx-auto">Our technical auditors are available for complex institutional inquiries and custom enterprise protocols.</p>
             </div>
             <button onClick={() => navigate("/contact")} className="bg-slate-950 dark:bg-primary text-white font-black px-12 py-5 rounded-xl hover:bg-primary transition-all shadow-2xl active:scale-95 relative z-10 uppercase text-xs tracking-widest">Contact Support Lab</button>
          </div>
        </section>
      </main>

      {/* 6. Secure Payment Modal */}
      {showPayment && selectedPlan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowPayment(false)} />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
             {/* Modal Header */}
             <div className="bg-slate-50 dark:bg-white/5 px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <CreditCard className="w-5 h-5" />
                   </div>
                   <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Payment Protocol</h3>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secure Terminal v2.4</p>
                   </div>
                </div>
                <button onClick={() => setShowPayment(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-all">
                   <X className="w-5 h-5" />
                </button>
             </div>

             <form onSubmit={handlePayment} className="p-8 space-y-8">
                {/* Plan Summary */}
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Selected Program</p>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{selectedPlan.name}</h4>
                   </div>
                   <div className="text-right">
                      <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">${annual ? Math.floor(selectedPlan.price * 0.75) : selectedPlan.price}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{annual ? "Annually" : "Monthly"}</p>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Node (Email)</label>
                      <input type="email" required placeholder="name@stacktruth.com" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-primary transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Instrument</label>
                      <div className="relative">
                        <input type="text" required placeholder="Card Number" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-primary transition-all pr-12" />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <input type="text" required placeholder="MM/YY" className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-primary transition-all" />
                      <input type="text" required placeholder="CVV" className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-primary transition-all" />
                   </div>
                </div>

                <div className="pt-4 space-y-6">
                   <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-3">
                      Complete Enrollment <ArrowRight className="w-5 h-5" />
                   </button>
                   <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      <Lock className="w-3.5 h-3.5 text-emerald-500" /> AES-256 Encrypted Transaction
                   </div>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
}
