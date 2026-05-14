import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search, Code2 } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background mesh-bg flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-lg">
        <div className="relative">
          <div className="text-[160px] font-black text-white/5 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-2 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/30">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold text-white">Page not found</h1>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 text-left">
          <p className="text-xs text-slate-500 font-mono mb-1">Error: 404 Not Found</p>
          <code className="text-sm font-mono text-red-400">
            {'>'} The page you're looking for doesn't exist or has been moved.
          </code>
        </div>

        <p className="text-slate-400">
          The route you navigated to doesn't exist. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link to="/questions" className="btn-secondary flex items-center justify-center gap-2">
            <Search className="w-4 h-4" /> Browse Questions
          </Link>
        </div>
      </div>
    </div>
  );
}
