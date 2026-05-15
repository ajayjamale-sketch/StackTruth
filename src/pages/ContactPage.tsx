import React, { useState } from "react";
import { Mail, MessageSquare, Globe, Send, CheckCircle2, Phone, MapPin, Zap, Shield, Target, Users, Sparkles, Building, Headphones } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

export default function ContactPage() {
  const { success } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      success("Communication protocol established. Response pending.");
    }, 1500);
  };

  return (
    <div className="space-y-32 py-12">
      {/* 1. Industrial Header Section */}
      <section className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-16 rounded-xl shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary rounded-sm text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10">
              <Headphones className="w-4 h-4" /> Operational Support
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-none">
              Communication <br /> <span className="text-primary">Protocols.</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed tracking-tight">
              Establish a direct link with our technical auditors and strategic support nodes for institutional inquiries.
            </p>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-6">
             <div className="bg-slate-100/50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-100 dark:border-slate-800 text-center w-48">
               <p className="text-2xl font-black text-slate-950 dark:text-white">&lt; 12h</p>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Response Latency</p>
             </div>
          </div>
        </div>
      </section>

      {/* 2. Global Support Nodes Section */}
      <section className="grid md:grid-cols-3 gap-10">
        {[
          { title: "Technical Lab", email: "lab@stacktruth.com", icon: Zap, color: "text-blue-500", desc: "Complex architectural inquiries" },
          { title: "Strategic Sales", email: "strategic@stacktruth.com", icon: Target, color: "text-emerald-500", desc: "Institutional mandates" },
          { title: "Community HQ", email: "hq@stacktruth.com", icon: Users, color: "text-purple-500", desc: "Governance and node support" },
        ].map(node => (
          <div key={node.title} className="bg-white dark:bg-slate-900 p-10 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:shadow-xl transition-all duration-500 group cursor-pointer">
            <div className={`w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center ${node.color} mb-8 group-hover:scale-110 transition-transform`}>
              <node.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tighter mb-2">{node.title}</h3>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">{node.desc}</p>
            <p className="text-lg font-bold text-primary">{node.email}</p>
          </div>
        ))}
      </section>

      {/* 3. Communication Interface Section */}
      <section className="grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-8">
           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-12 rounded-xl shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 grid-pattern opacity-5" />
              {submitted ? (
                <div className="text-center py-20 space-y-8 animate-in fade-in zoom-in duration-700 relative z-10">
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">Protocol Initiated</h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium">Your inquiry has been logged in our global registry. A technical auditor will respond shortly.</p>
                  </div>
                  <button onClick={() => setSubmitted(false)} className="bg-slate-950 dark:bg-slate-800 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-primary transition-all">Send New Protocol</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiry Source Name</label>
                        <input required placeholder="Enter full name..." className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-lg px-6 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-foreground placeholder:text-slate-400" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Communication Channel (Email)</label>
                        <input type="email" required placeholder="Enter active email..." className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-lg px-6 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-foreground placeholder:text-slate-400" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mandate Classification</label>
                      <select className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-lg px-6 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-foreground appearance-none">
                        <option>General Technical Inquiry</option>
                        <option>Institutional Mandate</option>
                        <option>Strategic Partnership</option>
                        <option>Technical Support Audit</option>
                      </select>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mandate Description</label>
                      <textarea required rows={6} placeholder="Provide comprehensive technical context..." className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-lg px-6 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-foreground placeholder:text-slate-400 resize-none" />
                   </div>
                   <button type="submit" disabled={loading} className="w-full bg-primary text-white py-6 rounded-xl font-black uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:bg-emerald-600 transition-all active:scale-[0.98] disabled:opacity-50">
                     {loading ? "Establishing Protocol..." : "Initialize Communication"}
                   </button>
                </form>
              )}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <div className="bg-slate-950 text-white p-10 rounded-xl space-y-8 relative overflow-hidden">
              <div className="absolute inset-0 grid-pattern opacity-10" />
              <h3 className="text-2xl font-black tracking-tighter relative z-10">Global Labs</h3>
              <div className="space-y-6 relative z-10">
                 <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Industrial Hub</p>
                      <p className="text-sm font-bold leading-relaxed">123 Engineering Plaza, Suite 500<br />San Francisco, CA 94105</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Support Protocol</p>
                      <p className="text-sm font-bold">+1 (555) 000-0000</p>
                    </div>
                 </div>
              </div>
              <div className="pt-8 border-t border-white/10 relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Availability</p>
                <div className="flex items-center gap-2 text-emerald-500 text-[11px] font-black uppercase tracking-widest">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   Nodes Online 24/7
                </div>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-xl space-y-6 group cursor-pointer hover:border-primary/20 transition-all">
              <Shield className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-xl font-black text-slate-950 dark:text-white tracking-tighter">Security Protocols</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">For security-sensitive disclosures, please use our encrypted audit protocol.</p>
              <button className="text-primary font-black uppercase tracking-widest text-[10px] border-b-2 border-primary pb-1">Encryption Lab →</button>
           </div>
        </div>
      </section>

      {/* 4. Strategic FAQ Grid Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">Support Lab Retrieval</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium tracking-tight">Instant information retrieval for common technical inquiries.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[
             { title: "Institutional Onboarding", desc: "How to initialize corporate-level technical audits for global teams." },
             { title: "Reputation Verification", desc: "Auditing protocols for expert-level reputation multipliers." },
             { title: "Mandate Scoping", desc: "Defining the technical scope for strategic engineering projects." },
           ].map(faq => (
             <div key={faq.title} className="bg-slate-50 dark:bg-slate-800/40 p-8 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4 hover:border-primary/20 transition-all">
               <h4 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">{faq.title}</h4>
               <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{faq.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* 5. Final CTA Node */}
      <section className="bg-slate-950 rounded-xl p-20 text-white relative overflow-hidden group">
         <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
         <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
         
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="space-y-10 max-w-2xl">
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 text-primary rounded-sm text-[11px] font-black uppercase tracking-[0.3em] border border-primary/20">
                <Sparkles className="w-5 h-5" /> Strategic Synergy
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">Elevate Your <br /> <span className="text-primary">Engineering Node.</span></h2>
              <p className="text-slate-400 text-xl leading-relaxed font-medium tracking-tight">Access the world's most rigorous technical audit platform and drive industrial excellence.</p>
            </div>
            <Link to="/pricing" className="bg-primary text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-primary/30 text-center">View Programs</Link>
         </div>
      </section>
    </div>
  );
}
