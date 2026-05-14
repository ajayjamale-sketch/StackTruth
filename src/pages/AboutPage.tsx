import React from "react";
import { Link } from "react-router-dom";
import { Code2, Users, Zap, Shield, Globe, Award, ArrowRight, Star } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { MOCK_USERS } from "@/constants/mockData";

const TEAM = [
  { name: "Alexandra Chen", role: "CEO & Co-founder", bio: "Former engineering lead at Stripe. Passionate about developer communities.", avatar: MOCK_USERS[1].avatar },
  { name: "Marcus Rodriguez", role: "CTO & Co-founder", bio: "Systems architect with 15+ years building scalable platforms.", avatar: MOCK_USERS[0].avatar },
  { name: "Priya Sharma", role: "Head of AI", bio: "ML researcher specializing in code intelligence and developer tools.", avatar: MOCK_USERS[5].avatar },
  { name: "Jordan Kim", role: "VP of Community", bio: "Community builder who grew three developer communities to 1M+ members.", avatar: MOCK_USERS[4].avatar },
];

const VALUES = [
  { icon: Code2, title: "Developer-First", description: "Every decision starts with 'how does this help developers write better code?'" },
  { icon: Users, title: "Community Driven", description: "Our platform is built by and for developers. Community feedback shapes our roadmap." },
  { icon: Shield, title: "Quality Over Quantity", description: "We prioritize accurate, expert-validated answers over volume." },
  { icon: Globe, title: "Inclusive & Global", description: "We're building a platform that works for developers everywhere in the world." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-24 mesh-bg text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm text-blue-400 mb-8">
            <Zap className="w-3.5 h-3.5" /> Our Mission
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
            Building the world's best{" "}
            <span className="gradient-text">developer community</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            StackTruth was founded by developers frustrated with fragmented tools. We built the platform we always wished existed — one that combines knowledge, validation, collaboration, and career growth.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-slate-950/50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: "2.4M+", label: "Active Developers" },
            { value: "18.4M+", label: "Questions Answered" },
            { value: "340K+", label: "Code Reviews" },
            { value: "127", label: "Countries" },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-4xl font-extrabold text-white">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-white text-center mb-16">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(value => (
              <div key={value.title} className="glass-card p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mx-auto">
                  <value.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-bold text-white">{value.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-slate-950/50 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-white text-center mb-4">The Team</h2>
          <p className="text-slate-400 text-center mb-12">Developers building for developers</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(member => (
              <div key={member.name} className="glass-card p-5 text-center space-y-3">
                <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-2xl bg-slate-700 mx-auto" />
                <div>
                  <h3 className="font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-blue-400 font-medium">{member.role}</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h2 className="text-4xl font-extrabold text-white">Join us on this journey</h2>
          <p className="text-slate-400">Be part of building the future of developer collaboration</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="btn-primary flex items-center gap-2 px-8 py-3">Get Started Free <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/jobs" className="btn-secondary flex items-center gap-2 px-6 py-3">We're Hiring</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
