import React, { useState } from "react";
import { Mail, MessageSquare, Globe, Send, CheckCircle2, Phone, MapPin } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-24 mesh-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-white mb-4">Get in touch</h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Have questions about StackTruth? Our team is here to help you build better, together.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-xl font-bold text-white">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Email</p>
                      <p className="text-sm text-slate-400">hello@stacktruth.com</p>
                      <p className="text-xs text-slate-500 mt-1">Response time: &lt; 24h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Phone</p>
                      <p className="text-sm text-slate-400">+1 (555) 000-0000</p>
                      <p className="text-xs text-slate-500 mt-1">Mon-Fri: 9am - 6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Office</p>
                      <p className="text-sm text-slate-400">123 Tech Plaza, Suite 500</p>
                      <p className="text-sm text-slate-400">San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-xs text-slate-500 mb-4 uppercase tracking-widest font-bold">Connect with us</p>
                  <div className="flex gap-4">
                    {/* Social icons could go here */}
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-border flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                      <Globe className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-border flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors">
                      <MessageSquare className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="glass-card p-6 bg-blue-500/5 border-blue-500/20">
                <h4 className="font-bold text-white mb-2">Need technical support?</h4>
                <p className="text-sm text-slate-400 mb-4">Check our knowledge base or open a ticket in your dashboard.</p>
                <a href="/knowledge" className="text-sm text-blue-400 font-semibold hover:underline">Visit Knowledge Base →</a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8 sm:p-12">
                {submitted ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Message Sent!</h2>
                    <p className="text-slate-400 max-w-md mx-auto">
                      Thank you for reaching out. We've received your message and will get back to you shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="btn-secondary px-8 py-3"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-300">Full Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          required 
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          required 
                          placeholder="john@example.com"
                          className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                      <select 
                        id="subject" 
                        className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none"
                      >
                        <option value="general" className="bg-slate-900">General Inquiry</option>
                        <option value="sales" className="bg-slate-900">Sales & Enterprise</option>
                        <option value="support" className="bg-slate-900">Technical Support</option>
                        <option value="billing" className="bg-slate-900">Billing & Subscriptions</option>
                        <option value="partnership" className="bg-slate-900">Partnership</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                      <textarea 
                        id="message" 
                        required 
                        rows={6}
                        placeholder="How can we help you?"
                        className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-500">
                      By submitting this form, you agree to our <a href="/" className="underline">Privacy Policy</a>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
