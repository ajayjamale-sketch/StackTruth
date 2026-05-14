import React, { useState } from "react";
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Star, Award, Zap, Code2, MessageSquare, Search } from "lucide-react";
import { MOCK_LEADERBOARD, MOCK_USERS } from "@/constants/mockData";
import type { LeaderboardEntry } from "@/types";

const PERIODS = ["All Time", "This Month", "This Week"];
const CATEGORIES = ["Overall", "Answers", "Code Reviews", "Questions"];

const RANK_STYLES: Record<number, string> = {
  1: "bg-gradient-to-br from-amber-400 to-yellow-600 text-white shadow-lg shadow-amber-500/30",
  2: "bg-gradient-to-br from-slate-300 to-slate-500 text-white shadow-lg shadow-slate-400/20",
  3: "bg-gradient-to-br from-amber-700 to-amber-900 text-white shadow-lg shadow-amber-700/20",
};

const RANK_ICONS: Record<number, React.ReactNode> = {
  1: <Crown className="w-3.5 h-3.5" />,
  2: <Star className="w-3.5 h-3.5" />,
  3: <Award className="w-3.5 h-3.5" />,
};

function ChangeIndicator({ change }: { change: number }) {
  if (change > 0) return <span className="flex items-center gap-0.5 text-green-400 text-xs font-bold"><TrendingUp className="w-3 h-3" />+{change}</span>;
  if (change < 0) return <span className="flex items-center gap-0.5 text-red-400 text-xs font-bold"><TrendingDown className="w-3 h-3" />{change}</span>;
  return <span className="flex items-center gap-0.5 text-slate-500 text-xs"><Minus className="w-3 h-3" /></span>;
}

function TopThreeCard({ entry }: { entry: LeaderboardEntry }) {
  const isFirst = entry.rank === 1;
  return (
    <div className={`flex flex-col items-center ${isFirst ? "order-first lg:order-none scale-110" : ""}`}>
      <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mb-3 ${isFirst ? "w-24 h-24" : ""}`}>
        <img src={entry.user.avatar} alt={entry.user.name} className="w-full h-full rounded-2xl ring-4 ring-border" />
        <div className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black ${RANK_STYLES[entry.rank]}`}>
          {RANK_ICONS[entry.rank]}
        </div>
      </div>
      <p className="font-bold text-white text-sm">{entry.user.name}</p>
      <p className="text-xs text-slate-500">@{entry.user.username}</p>
      <div className="flex items-center gap-1 mt-2">
        <Zap className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-sm font-bold text-amber-400">{entry.score.toLocaleString()}</span>
      </div>
      <div className="flex flex-wrap justify-center gap-1 mt-2">
        {entry.user.skills.slice(0, 2).map(s => <span key={s} className="tag-badge text-[10px]">{s}</span>)}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("All Time");
  const [category, setCategory] = useState("Overall");
  const [search, setSearch] = useState("");

  const filtered = MOCK_LEADERBOARD.filter(e =>
    !search || e.user.name.toLowerCase().includes(search.toLowerCase()) || e.user.username.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400" /> Community Leaderboard
        </h1>
        <p className="text-slate-400 text-sm mt-1">Top contributors powering the StackTruth community</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 bg-white/5 border border-border rounded-xl p-1">
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${period === p ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>{p}</button>
          ))}
        </div>
        <div className="flex gap-1 bg-white/5 border border-border rounded-xl p-1">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${category === c ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>{c}</button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search developers..." className="w-full bg-white/5 border border-border rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all" />
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="glass-card p-8">
        <div className="flex items-end justify-center gap-8 lg:gap-16">
          {top3[1] && <TopThreeCard entry={top3[1]} />}
          {top3[0] && <TopThreeCard entry={top3[0]} />}
          {top3[2] && <TopThreeCard entry={top3[2]} />}
        </div>
      </div>

      {/* Full table */}
      <div className="glass-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-bold text-white">Full Rankings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs text-slate-500 font-medium px-5 py-3">Rank</th>
                <th className="text-left text-xs text-slate-500 font-medium px-5 py-3">Developer</th>
                <th className="text-left text-xs text-slate-500 font-medium px-5 py-3 hidden md:table-cell">Score</th>
                <th className="text-left text-xs text-slate-500 font-medium px-5 py-3 hidden lg:table-cell">Answers</th>
                <th className="text-left text-xs text-slate-500 font-medium px-5 py-3 hidden lg:table-cell">Reviews</th>
                <th className="text-left text-xs text-slate-500 font-medium px-5 py-3">Change</th>
                <th className="text-left text-xs text-slate-500 font-medium px-5 py-3 hidden md:table-cell">Top Skills</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {rest.map((entry) => (
                <tr key={entry.rank} className="hover:bg-white/5 transition-all">
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-slate-400">#{entry.rank}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={entry.user.avatar} alt={entry.user.name} className="w-9 h-9 rounded-full bg-slate-700 ring-2 ring-border flex-shrink-0" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-white">{entry.user.name}</p>
                          {entry.user.isVerified && <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"><Star className="w-2.5 h-2.5 text-white fill-white" /></span>}
                        </div>
                        <p className="text-xs text-slate-500">@{entry.user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-sm font-bold text-amber-400">{entry.score.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-400" /> {entry.answers}
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Code2 className="w-3.5 h-3.5 text-green-400" /> {entry.codeReviews}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <ChangeIndicator change={entry.change} />
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex gap-1">
                      {entry.user.skills.slice(0, 2).map(s => <span key={s} className="tag-badge text-[10px]">{s}</span>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
