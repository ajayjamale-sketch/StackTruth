import React from "react";
import { Link } from "react-router-dom";
import { Code2, Github, Twitter, Linkedin, Heart } from "lucide-react";

const FOOTER_LINKS = {
  Platform: [
    { label: "Questions", path: "/questions" },
    { label: "Code Reviews", path: "/code-review" },
    { label: "Knowledge Base", path: "/knowledge" },
    { label: "AI Assistant", path: "/ai-assistant" },
    { label: "Jobs", path: "/jobs" },
  ],
  Community: [
    { label: "Leaderboard", path: "/leaderboard" },
    { label: "Expert Program", path: "/about" },
    { label: "Blog", path: "/knowledge" },
    { label: "Discussions", path: "/questions" },
    { label: "Events", path: "/about" },
  ],
  Company: [
    { label: "About", path: "/about" },
    { label: "Pricing", path: "/pricing" },
    { label: "Contact", path: "/contact" },
    { label: "Privacy Policy", path: "/" },
    { label: "Terms of Service", path: "/" },
  ],
  Developers: [
    { label: "API Docs", path: "/knowledge" },
    { label: "Status", path: "/" },
    { label: "GitHub", path: "/" },
    { label: "Changelog", path: "/" },
    { label: "Open Source", path: "/" },
  ],
};

const TECH_BADGES = ["React", "TypeScript", "Go", "Rust", "Python", "GraphQL", "K8s", "Terraform"];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-slate-950/80 mt-12">
      {/* Tech community strip */}
      <div className="border-b border-border py-4 overflow-hidden">
        <div className="flex gap-3 animate-marquee whitespace-nowrap">
          {[...TECH_BADGES, ...TECH_BADGES, ...TECH_BADGES].map((tech, i) => (
            <span
              key={i}
              className="inline-flex items-center px-3 py-1 rounded-md text-xs font-mono font-medium bg-white/5 border border-border text-slate-400 flex-shrink-0"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Stack<span className="text-blue-400">Truth</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              The premium developer community for technical validation, knowledge sharing, and career growth.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-border rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-border rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-border rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © 2025 StackTruth. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500" /> for developers, by developers
          </p>
        </div>
      </div>
    </footer>
  );
}
