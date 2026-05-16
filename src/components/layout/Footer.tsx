import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Heart, ExternalLink, Mail, MessageSquare, Shield, Globe, Terminal, Database, Layout, Settings, Cpu, Zap, Award, BookOpen, Users, Trophy } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const FOOTER_LINKS = {
  "Trending Now": [
    { label: "Data Structures", path: "/practice/data-structures" },
    { label: "Algorithms", path: "/practice/algorithms" },
    { label: "System Design", path: "/practice/system-design" },
    { label: "Python Tutorial", path: "/tutorials/python" },
    { label: "MERN Stack", path: "/tutorials/mern" },
    { label: "AI & ML", path: "/tutorials/ai" },
    { label: "Architectural Audits", path: "/tutorials/sysdesign" },
    { label: "Cloud DevOps", path: "/tutorials/devops" },
  ],
  "Practice": [
    { label: "All Questions", path: "/questions" },
    { label: "Company Wise", path: "/questions/companies" },
    { label: "Topic Wise", path: "/questions/topics" },
    { label: "Contests", path: "/contests" },
    { label: "Code Audits", path: "/code-review" },
  ],
  "Community": [
    { label: "Tutorials", path: "/tutorials" },
    { label: "Leaderboard", path: "/leaderboard" },
    { label: "Community", path: "/community" },
    { label: "Knowledge Base", path: "/knowledge" },
    { label: "AI Assistant", path: "/ai-assistant" },
  ],
  "Company": [
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
    { label: "Careers", path: "/careers" },
    { label: "Pricing", path: "/pricing" },
    { label: "Partner Program", path: "/partner" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Github, label: "GitHub", url: "https://github.com/stacktruth" },
  { icon: Twitter, label: "Twitter", url: "https://twitter.com/stacktruth" },
  { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/company/stacktruth" },
  { icon: MessageSquare, label: "Discord", url: "https://discord.gg/stacktruth" },
];

export default function Footer() {
  const { isAuthenticated } = useAuth();
  const handleSocialClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 pt-20 pb-10 border-t border-slate-100 dark:border-slate-800/50 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          {/* Brand Section */}
          <div className="col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="logo-font text-2xl text-slate-900 dark:text-white tracking-tight">StackTruth</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Industrial Intelligence</span>
              </div>
            </Link>
            
            <p className="text-sm leading-relaxed max-w-sm font-medium">
              The premium engineering portal for technical sovereignty. Master distributed systems, high-concurrency protocols, and deep-kernel optimizations with verified intelligence.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <button
                    key={social.label}
                    onClick={() => handleSocialClick(social.url)}
                    aria-label={`Follow us on ${social.label}`}
                    className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-slate-900 hover:bg-primary hover:text-white transition-all rounded-xl border border-slate-200 dark:border-slate-800 group active:scale-90 shadow-sm"
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform text-slate-600 dark:text-slate-400 group-hover:text-white" />
                  </button>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-sm w-fit">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Protocol Operational</span>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="space-y-6">
              <h4 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-[0.2em]">{section}</h4>
              <ul className="space-y-4 text-sm">
                {links.map((link) => (
                  <li key={`${section}-${link.label}`}>
                    <Link to={link.path} className="hover:text-primary flex items-center gap-2 transition-colors group font-medium">
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-slate-100 dark:border-slate-800/50 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">
              © {new Date().getFullYear()} StackTruth MVP • Terminal v2.4.0
            </p>
            <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest">Privacy</Link>
              <Link to="/terms" className="text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest">Terms</Link>
              <Link to="/cookies" className="text-xs font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest">Cookies</Link>
            </div>
          </div>

          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest">
               Handcrafted with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> for Engineers
             </div>
             <div className="hidden sm:flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase">Secured by</span>
                <Shield className="w-5 h-5 text-slate-300 dark:text-slate-700" />
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
