import React from "react";
import { Link } from "react-router-dom";
import { Bell, MessageSquare, ThumbsUp, Award, AtSign, Briefcase, Code2, Info, Check } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "@/constants/mockData";
import type { Notification } from "@/types";

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

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationDropdown({ onClose }: { onClose: () => void }) {
  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

  return (
    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-slate-900 border border-border rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-white" />
          <span className="font-semibold text-white text-sm">Notifications</span>
          {unread > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {unread}
            </span>
          )}
        </div>
        <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
          <Check className="w-3 h-3" /> Mark all read
        </button>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto">
        {MOCK_NOTIFICATIONS.map((notif) => (
          <Link
            key={notif.id}
            to={notif.link || "/notifications"}
            onClick={onClose}
            className={`flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-all border-b border-border/50 last:border-0 ${
              !notif.isRead ? "bg-blue-500/5" : ""
            }`}
          >
            <div className="mt-0.5 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              {TYPE_ICONS[notif.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold text-white leading-snug">{notif.title}</p>
                {!notif.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-0.5" />
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
              <p className="text-[10px] text-slate-600 mt-1">{timeAgo(notif.createdAt)}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border">
        <Link
          to="/notifications"
          onClick={onClose}
          className="text-xs text-blue-400 hover:text-blue-300 font-medium w-full text-center block"
        >
          View all notifications →
        </Link>
      </div>
    </div>
  );
}
