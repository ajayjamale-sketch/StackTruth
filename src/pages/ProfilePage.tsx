import React, { useState } from "react";
import { MapPin, Globe, Github, Twitter, Zap, Flame, Star, Edit3, Check, Users, BookOpen, Code2, MessageSquare, Calendar, Award } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { MOCK_QUESTIONS, MOCK_CODE_REVIEWS } from "@/constants/mockData";

const TABS = ["Overview", "Discussions", "Certifications", "Badges", "Control Panel"];

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
    success("Profile Protocol Updated", "Changes have been committed to the directory.");
  };

  const userQuestions = MOCK_QUESTIONS.slice(0, 3);
  const userReviews = MOCK_CODE_REVIEWS.slice(0, 2);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="relative group">
            <div className="w-32 h-32 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-4xl border-2 border-primary/20 transition-all group-hover:bg-primary/20">
               {user.name.charAt(0)}
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1 shadow-sm">
               <span className="text-[10px] font-black text-primary uppercase tracking-widest">{user.role}</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                  {user.name}
                  {user.isVerified && <Star className="w-6 h-6 text-amber-400 fill-amber-400" />}
                </h1>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">@{user.username} • {user.title}</p>
              </div>
              <button onClick={() => setEditing(!editing)} className="btn-secondary text-xs px-6 py-2.5 flex items-center gap-2">
                <Edit3 className="w-4 h-4" /> Manage Profile
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
               {editing ? (
                 <textarea value={form.bio} onChange={e => setForm(f => ({...f, bio: e.target.value}))} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none" rows={3} />
               ) : (
                 <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">"{user.bio}"</p>
               )}
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              {user.location && <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase"><MapPin className="w-4 h-4 text-primary" />{user.location}</span>}
              {user.website && <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase"><Globe className="w-4 h-4 text-primary" />{user.website.replace("https://", "")}</span>}
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase"><Calendar className="w-4 h-4 text-primary" />Member since 2024</span>
            </div>

            {editing && (
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2">Commit Changes</button>
                <button onClick={() => setEditing(false)} className="btn-secondary text-xs px-6 py-2.5">Discard</button>
              </div>
            )}
          </div>
        </div>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-10 pt-10 border-t border-slate-50 dark:border-slate-800">
          {[
            { label: "Reputation", value: user.reputation.toLocaleString(), color: "text-primary", icon: Zap },
            { label: "Active Streak", value: `${user.streak}d`, color: "text-red-500", icon: Flame },
            { label: "Followers", value: user.followers.toLocaleString(), color: "text-slate-700 dark:text-slate-300", icon: Users },
            { label: "Solves", value: user.contributions.toLocaleString(), color: "text-slate-700 dark:text-slate-300", icon: Check },
            { label: "Level", value: "Expert IV", color: "text-amber-600", icon: Award },
            { label: "Badges", value: user.badges.length.toString(), color: "text-slate-700 dark:text-slate-300", icon: Star },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left space-y-1">
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs System */}
      <div className="space-y-6">
        <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" /> Technical Proficiency
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map(s => <span key={s} className="tag-badge text-xs font-bold">{s}</span>)}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl space-y-4">
               <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" /> Recent Accomplishments
              </h2>
              <div className="space-y-3">
                 {userQuestions.map(q => (
                   <div key={q.id} className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="truncate">{q.title}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "Discussions" && (
          <div className="space-y-4">
            {userQuestions.map((q) => (
              <Link
                key={q.id}
                to={`/questions/${q.id}`}
                className="block bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-xl hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{q.title}</h3>
                    <div className="flex gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      <span>{q.votes} Votes</span>
                      <span>{q.answers} Answers</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "Certifications" && (
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Advanced React Auditor", issuer: "StackTruth Labs", date: "April 2024", id: "ST-8821" },
              { title: "System Design Specialist", issuer: "StackTruth Labs", date: "January 2024", id: "ST-4491" },
            ].map((cert) => (
              <div key={cert.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-xl flex items-start gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full" />
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest">{cert.issuer}</p>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{cert.title}</h3>
                  <div className="pt-4 flex flex-col gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>ID: {cert.id}</span>
                    <span>Issued: {cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Badges" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {user.badges.map(badge => (
              <div key={badge.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-xl flex flex-col items-center text-center gap-3 hover:border-primary/30 transition-all">
                <span className="text-4xl filter grayscale hover:grayscale-0 transition-all cursor-pointer">{badge.icon}</span>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{badge.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{badge.rarity}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Control Panel" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm space-y-8 max-w-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Directory Configuration</h3>
            <div className="space-y-6">
              {[
                { label: "Identity Display", value: user.name, type: "text" },
                { label: "Contact Protocol", value: user.email, type: "email" },
                { label: "Geographic Origin", value: user.location, type: "text" },
              ].map(field => (
                <div key={field.label} className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{field.label}</label>
                  <input type={field.type} defaultValue={field.value} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                </div>
              ))}
              <button onClick={() => success("Directory Updated")} className="btn-primary px-8 py-3">Update Identity</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
