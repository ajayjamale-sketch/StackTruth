import React, { useState } from "react";
import { MapPin, Globe, Github, Twitter, Zap, Flame, Star, Edit3, Check, Users, BookOpen, Code2, MessageSquare, Calendar, Award } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { MOCK_QUESTIONS, MOCK_CODE_REVIEWS } from "@/constants/mockData";
import { TECH_TAGS } from "@/constants/mockData";

const ROLE_BADGE_COLORS: Record<string, string> = {
  developer: "bg-blue-500/10 border-blue-500/30 text-blue-400",
  expert: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  recruiter: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  admin: "bg-red-500/10 border-red-500/30 text-red-400",
};

const TABS = ["Overview", "Questions", "Code Reviews", "Badges", "Settings"];

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { success } = useToast();
  const [activeTab, setActiveTab] = useState("Overview");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ bio: user?.bio || "", location: user?.location || "", website: user?.website || "" });

  if (!user) return null;

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    success("Profile updated!", "Your changes have been saved");
  };

  const userQuestions = MOCK_QUESTIONS.slice(0, 3);
  const userReviews = MOCK_CODE_REVIEWS.slice(0, 2);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile header */}
      <div className="glass-card p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl bg-slate-700 ring-4 ring-border" />
            <span className={`absolute -bottom-2 -right-2 text-xs font-bold px-2 py-0.5 rounded-lg border capitalize ${ROLE_BADGE_COLORS[user.role]}`}>
              {user.role}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                  {user.isVerified && <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"><Star className="w-3 h-3 text-white fill-white" /></span>}
                </div>
                <p className="text-slate-400">@{user.username} · {user.title}</p>
              </div>
              <button onClick={() => setEditing(!editing)} className="btn-secondary text-sm px-4 py-2 flex items-center gap-2 flex-shrink-0">
                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
              </button>
            </div>

            <p className="text-sm text-slate-300 mt-3 leading-relaxed">{editing ? (
              <textarea value={form.bio} onChange={e => setForm(f => ({...f, bio: e.target.value}))} className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 resize-none" rows={2} />
            ) : user.bio}</p>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-400">
              {user.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{user.location}</span>}
              {user.website && <a href={user.website} className="flex items-center gap-1 hover:text-blue-400 transition-colors"><Globe className="w-3.5 h-3.5" />{user.website.replace("https://", "")}</a>}
              {user.github && <a href={`https://github.com/${user.github}`} className="flex items-center gap-1 hover:text-white transition-colors"><Github className="w-3.5 h-3.5" />@{user.github}</a>}
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Joined {new Date(user.joinedAt).toLocaleDateString("en", { year: "numeric", month: "long" })}</span>
            </div>

            {editing && (
              <div className="flex gap-3 mt-3">
                <button onClick={handleSave} className="btn-primary text-sm px-4 py-2 flex items-center gap-2"><Check className="w-4 h-4" />Save</button>
                <button onClick={() => setEditing(false)} className="btn-secondary text-sm px-4 py-2">Cancel</button>
              </div>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6 pt-6 border-t border-border">
          {[
            { label: "Reputation", value: user.reputation.toLocaleString(), color: "text-amber-400", icon: Zap },
            { label: "Streak", value: `${user.streak}d`, color: "text-rose-400", icon: Flame },
            { label: "Followers", value: user.followers.toLocaleString(), color: "text-blue-400", icon: Users },
            { label: "Following", value: user.following.toLocaleString(), color: "text-slate-400", icon: Users },
            { label: "Contributions", value: user.contributions.toLocaleString(), color: "text-green-400", icon: Code2 },
            { label: "Badges", value: user.badges.length.toString(), color: "text-purple-400", icon: Award },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`text-lg font-extrabold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="glass-card p-5">
        <h2 className="font-bold text-white mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {user.skills.map(skill => (
            <span key={skill} className="tag-badge text-sm px-3 py-1.5">{skill}</span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${activeTab === tab ? "border-blue-500 text-blue-400" : "border-transparent text-slate-500 hover:text-white"}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <div className="space-y-4">
            <h2 className="font-bold text-white">Recent Questions</h2>
            {userQuestions.map(q => (
              <div key={q.id} className="glass-card p-4">
                <h3 className="text-sm font-semibold text-white mb-2">{q.title}</h3>
                <div className="flex gap-2">{q.tags.slice(0, 3).map(t => <span key={t} className="tag-badge text-[10px]">{t}</span>)}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Questions" && (
          <div className="space-y-3">
            {MOCK_QUESTIONS.map(q => (
              <div key={q.id} className="glass-card p-4 flex items-start gap-3">
                <div className="text-center flex-shrink-0">
                  <p className="text-sm font-bold text-blue-400">{q.votes}</p>
                  <p className="text-[10px] text-slate-600">votes</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white line-clamp-1">{q.title}</p>
                  <div className="flex gap-1.5 mt-1">{q.tags.slice(0, 3).map(t => <span key={t} className="tag-badge text-[10px]">{t}</span>)}</div>
                </div>
                {q.isAnswered && <Check className="w-4 h-4 text-green-400 flex-shrink-0" />}
              </div>
            ))}
          </div>
        )}

        {activeTab === "Code Reviews" && (
          <div className="space-y-3">
            {MOCK_CODE_REVIEWS.map(r => (
              <div key={r.id} className="glass-card p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{r.title}</p>
                  <span className="text-sm font-bold text-green-400">{r.score}/100</span>
                </div>
                <div className="flex gap-2 mt-2"><span className="tag-badge text-[10px]">{r.language}</span></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Badges" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.badges.map(badge => (
              <div key={badge.id} className="glass-card p-4 flex flex-col items-center gap-3 text-center hover:border-blue-500/30 transition-all">
                <span className="text-4xl">{badge.icon}</span>
                <div>
                  <p className="font-bold text-white text-sm">{badge.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{badge.description}</p>
                  <span className={`text-[10px] font-bold uppercase mt-1 inline-block ${badge.rarity === "legendary" ? "text-amber-400" : badge.rarity === "epic" ? "text-purple-400" : badge.rarity === "rare" ? "text-blue-400" : "text-slate-500"}`}>
                    {badge.rarity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Settings" && (
          <div className="space-y-6 max-w-lg">
            <div className="glass-card p-5 space-y-4">
              <h3 className="font-bold text-white">Account Settings</h3>
              {[
                { label: "Full Name", value: user.name, type: "text" },
                { label: "Email", value: user.email, type: "email" },
                { label: "Location", value: user.location, type: "text" },
                { label: "Website", value: user.website, type: "url" },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">{field.label}</label>
                  <input type={field.type} defaultValue={field.value} className="w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all" />
                </div>
              ))}
              <button onClick={() => success("Settings saved!")} className="btn-primary text-sm px-6 py-2.5">Save Settings</button>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-bold text-white mb-4">Notification Preferences</h3>
              {["New answers on my questions", "Upvotes on my content", "Code review completed", "Job matches", "Badge earned", "Mentions"].map(pref => (
                <label key={pref} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0 cursor-pointer group">
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{pref}</span>
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-10 h-5 bg-white/10 peer-checked:bg-blue-600 rounded-full transition-all" />
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5" />
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
