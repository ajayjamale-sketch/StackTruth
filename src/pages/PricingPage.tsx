import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Zap, ArrowRight, ChevronDown, Award, Sparkles, Shield, Star, Users, BookOpen, Globe, Quote, MessageSquare, Clock } from "lucide-react";
import { PRICING_PLANS, FAQS } from "@/constants/mockData";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>

      {/* 1. Mastery Portal Header */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-8 text-center space-y-12 relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/5 text-primary rounded-sm text-[11px] font-black uppercase tracking-[0.3em] border border-primary/10 shadow-sm">
              <Award className="w-4 h-4 text-amber-500" /> Certification & Mastery Programs
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">Invest in Your <br /> <span className="text-primary">Engineering Sovereignty.</span></h1>
            <p className="text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">Professional technical mastery programs designed for modern engineering leaders. Join 48,000+ verified experts.</p>
          </div>

          <div className="flex flex-col items-center gap-10">
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2 shadow-2xl">
              <button onClick={() => setAnnual(false)} className={`px-10 py-4 rounded-lg text-sm font-black uppercase tracking-widest transition-all ${!annual ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xl" : "text-slate-500 hover:text-primary"}`}>Monthly Protocol</button>
              <button onClick={() => setAnnual(true)} className={`px-10 py-4 rounded-lg text-sm font-black uppercase tracking-widest transition-all relative ${annual ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xl" : "text-slate-500 hover:text-primary"}`}>
                Yearly Access
                <span className="absolute -top-3 -right-3 bg-primary text-white text-[9px] font-black px-3 py-1 rounded-sm shadow-lg border-2 border-white dark:border-slate-800">SAVE 25%</span>
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-12 text-[11px] font-black text-slate-400 uppercase tracking-widest">
               <span className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Global Certification</span>
               <span className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Verified Reputation</span>
               <span className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> Mentor Lab Access</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-8 space-y-48 pb-48">
        {/* 2. Tier Selection Section */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          {PRICING_PLANS.map(plan => (
            <div key={plan.id} className={`bg-white dark:bg-slate-900 border p-12 rounded-xl flex flex-col text-left transition-all duration-700 hover:shadow-[0_60px_100px_rgba(0,0,0,0.06)] group relative ${plan.isPopular ? "border-primary/50 ring-4 ring-primary/5 shadow-2xl scale-105 z-10" : "border-slate-100 dark:border-slate-800 shadow-sm"}`}>
              {plan.isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-8 py-2.5 rounded-sm shadow-2xl tracking-[0.3em] uppercase border-4 border-white dark:border-slate-900">
                  Recommended Path
                </div>
              )}
              <div className="space-y-2 mb-12">
                <h3 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter group-hover:text-primary transition-colors duration-500">{plan.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight line-clamp-2">{plan.description}</p>
              </div>
              
              <div className="mb-12 flex items-baseline gap-2">
                <span className="text-6xl font-black text-slate-950 dark:text-white tracking-tighter">
                  ${annual ? Math.floor(plan.price * 0.75) : plan.price}
                </span>
                {plan.price > 0 && <span className="text-slate-400 font-black text-[11px] uppercase tracking-[0.2em]">/ Month</span>}
              </div>

              <ul className="space-y-6 flex-1 mb-12">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-4 text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest leading-loose">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to={plan.cta === "Contact Sales" ? "/contact" : "/register"} 
                className={`w-full text-center py-6 rounded-lg text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${plan.isPopular ? "bg-slate-950 dark:bg-primary text-white shadow-2xl hover:bg-primary dark:hover:bg-emerald-600 active:scale-95" : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 hover:bg-slate-950 hover:text-white"}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </section>

        {/* 3. Global Accreditation Section (New) */}
        <section className="space-y-24">
           <div className="text-center space-y-4">
             <h2 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter">Verified Accreditation</h2>
             <p className="text-xl text-slate-500 dark:text-slate-400 font-medium tracking-tight">StackTruth certifications are audited and recognized by global technology leaders.</p>
           </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
              {[
                "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_2012.svg",
                "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
                "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              ].map((logo, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-12 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center grayscale hover:grayscale-0 hover:border-primary/20 transition-all duration-700 group cursor-pointer shadow-sm">
                   <img src={logo} alt="Partner" className="h-10 object-contain opacity-20 group-hover:opacity-100 transition-all duration-700 dark:invert" />
                </div>
              ))}
            </div>
        </section>

        {/* 4. Expert Mentor Lab Section (New) */}
        <section className="bg-slate-950 rounded-xl p-20 text-white relative overflow-hidden group">
           <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
           <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
           
           <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 text-primary rounded-sm text-[11px] font-black uppercase tracking-[0.3em] border border-primary/20 shadow-xl shadow-primary/10">
                  <Users className="w-5 h-5" /> Elite Expert Laboratory
                </div>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">Audit with the <br /> <span className="text-primary">Best.</span></h2>
                <p className="text-slate-400 text-xl leading-relaxed font-medium tracking-tight">Our mastery programs are curated by senior engineers and architects from FAANG labs and high-growth technical institutes.</p>
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <button className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-primary/30 active:scale-95">
                    Explore Faculty
                  </button>
                  <div className="flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-xl">
                     <Sparkles className="w-6 h-6 text-amber-500" />
                     <span className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">Verified Mentors Only</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                { name: "Sarah Chen", role: "Principal Auditor @ Google", icon: "SC", img: "https://images.unsplash.com/photo-1558494949-ef0109121c64?auto=format&fit=crop&w=400&q=80" },
                { name: "Marcus Lee", role: "Systems Architect @ Meta", icon: "ML", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80" },
                { name: "Dr. Anita Ray", role: "AI Research Lead", icon: "AR", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80" },
                { name: "James Wilson", role: "Cloud Security Expert", icon: "JW", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80" },
              ].map((mentor) => (
                <div key={mentor.name} className="bg-white/5 backdrop-blur-3xl p-10 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-500 group/item cursor-pointer relative overflow-hidden">
                   <img src={mentor.img} alt={mentor.name} className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
                   <div className="relative z-10">
                     <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-black text-xl mb-6 group-hover/item:scale-110 transition-transform">
                       {mentor.icon}
                     </div>
                     <h4 className="text-2xl font-black mb-2">{mentor.name}</h4>
                     <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{mentor.role}</p>
                   </div>
                </div>
              ))}
              </div>
           </div>
        </section>

        {/* 5. Support & Knowledge Retrieval (FAQ) Section */}
        <section className="space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-slate-950 dark:text-white tracking-tighter">Support Protocols</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium tracking-tight">Frequently retrieved information regarding membership and curricula.</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all duration-500 hover:border-primary/30 group">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex items-center justify-between w-full px-12 py-8 text-left group">
                  <span className="font-black text-slate-950 dark:text-slate-100 text-xl tracking-tight group-hover:text-primary transition-colors">{faq.question}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-800 transition-all duration-500 ${openFaq === i ? "rotate-180 bg-primary/10" : ""}`}>
                     <ChevronDown className={`w-6 h-6 text-slate-400 transition-colors ${openFaq === i ? "text-primary" : ""}`} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-12 pb-10 border-t border-slate-50 dark:border-slate-800 animate-in fade-in slide-in-from-top-4 duration-500">
                    <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed pt-10 font-medium tracking-tight">{faq.answer}</p>
                    <div className="mt-10 flex items-center gap-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                       <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> Global Knowledge</span>
                       <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Updated May 2026</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-16 rounded-xl text-center space-y-8">
             <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto">
                <MessageSquare className="w-10 h-10" />
             </div>
             <div className="space-y-4">
               <h3 className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">Still Have Inquiries?</h3>
               <p className="text-lg text-slate-500 dark:text-slate-400 font-medium tracking-tight max-w-xl mx-auto">Our technical auditors are available for complex institutional inquiries and custom enterprise protocols.</p>
             </div>
             <button className="bg-slate-950 dark:bg-primary text-white font-black px-12 py-5 rounded-lg hover:bg-primary transition-all shadow-xl">Contact Support Lab</button>
          </div>
        </section>
      </main>

    </>
  );
}
