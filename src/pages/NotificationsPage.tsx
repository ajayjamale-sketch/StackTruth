import React, { useState } from "react";
import { Bell, Check, Trash2, MessageSquare, ThumbsUp, Award, AtSign, Briefcase, Code2, Info, Filter } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/constants/mockData";
import type { Notification } from "@/types";
import { useToast } from "@/contexts/ToastContext";

const TYPE_ICONS: Record<Notification["type"], React.ReactNode> = {
  answer: <MessageSquare className="w-4 h-4 text-blue-400" />,
  vote: <ThumbsUp className="w-4 h-4 text-green-400" />,
  badge: <Award className="w-4 h-4 text-amber-400" />,
  mention: <AtSign className="w-4 h-4 text-purple-400" />,
  follow: <Bell className="w-4 h-4 text-cyan-400" />,
  job: <Briefcase className="w-4 h-4 text-orange-400" />,
  review: <Code2 className="w-4 h-4 text-pink-400" />,
  system: <Info className="w-4 h-4 text-slate-400" />,
};

const TYPE_BG: Record<Notification["type"], string> = {
  answer: "bg-blue-500/10",
  vote: "bg-green-500/10",
  badge: "bg-amber-500/10",
  mention: "bg-purple-500/10",
  follow: "bg-cyan-500/10",
  job: "bg-orange-500/10",
  review: "bg-pink-500/10",
  system: "bg-slate-500/10",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

const FILTER_OPTIONS = ["All", "Unread", "Answers", "Votes", "Badges", "System"];

export default function NotificationsPage() {
  const { success } = useToast();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState("All");

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    success("All notifications marked as read");
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filtered = notifications.filter(n => {
    if (filter === "Unread") return !n.isRead;
    if (filter === "Answers") return n.type === "answer";
    if (filter === "Votes") return n.type === "vote";
    if (filter === "Badges") return n.type === "badge";
    if (filter === "System") return n.type === "system";
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-400" />
            Notifications
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Stay up to date with your community activity</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-400 transition-colors">
            <Check className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {FILTER_OPTIONS.map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)} 
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${filter === f ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-500"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-start gap-3 p-4 rounded-xl border transition-all group ${!notif.isRead ? "border-blue-500/20 bg-blue-500/5" : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50"}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${TYPE_BG[notif.type]}`}>
                {TYPE_ICONS[notif.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">{notif.title}</p>
                  {!notif.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed font-medium">{notif.message}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">{timeAgo(notif.createdAt)}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                {!notif.isRead && (
                  <button onClick={() => markRead(notif.id)} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all" title="Mark as read">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
                <button onClick={() => deleteNotification(notif.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-12 rounded-xl text-center shadow-sm">
          <Bell className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
          <p className="text-slate-900 dark:text-white font-bold mb-1">No protocol alerts</p>
          <p className="text-slate-500 text-sm">You're all caught up with the registry!</p>
        </div>
      )}
    </div>
  );
}
