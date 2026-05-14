import React, { useState, useRef, useEffect } from "react";
import { Hash, Plus, Send, Code2, Smile, Paperclip, Users, Settings, Pin, Search, MoreHorizontal } from "lucide-react";
import { MOCK_TEAM_CHANNELS, MOCK_USERS } from "@/constants/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import type { TeamMessage, TeamChannel } from "@/types";

const REACTIONS = ["👍", "🚀", "❤️", "😂", "🎉", "👀", "🔥"];

function MessageItem({ msg }: { msg: TeamMessage }) {
  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState(msg.reactions);

  const addReaction = (emoji: string) => {
    setReactions(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }));
    setShowReactions(false);
  };

  return (
    <div className="flex items-start gap-3 group hover:bg-white/5 rounded-xl px-3 py-2 transition-all">
      <img src={msg.author.avatar} alt={msg.author.name} className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-bold text-white">{msg.author.name}</span>
          <span className="text-[10px] text-slate-600">{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        {msg.type === "code" ? (
          <div className="bg-slate-950 border border-slate-700 rounded-lg p-3 font-mono text-xs text-green-300 max-w-lg">
            <div className="flex items-center gap-2 mb-2 text-slate-500"><Code2 className="w-3 h-3" />code snippet</div>
            const apiSchema = &#123;<br />
            &nbsp;&nbsp;endpoint: '/api/v2',<br />
            &nbsp;&nbsp;method: 'POST',<br />
            &nbsp;&nbsp;auth: 'Bearer token'<br />
            &#125;;
          </div>
        ) : (
          <p className="text-sm text-slate-300 leading-relaxed">{msg.content}</p>
        )}
        {Object.keys(reactions).length > 0 && (
          <div className="flex gap-1.5 mt-2">
            {Object.entries(reactions).map(([emoji, count]) => (
              <button key={emoji} onClick={() => setReactions(prev => ({ ...prev, [emoji]: prev[emoji] + 1 }))} className="flex items-center gap-1 bg-white/10 hover:bg-white/15 border border-border rounded-lg px-2 py-0.5 text-xs transition-all">
                <span>{emoji}</span>
                <span className="text-slate-400 font-medium">{count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <div className="relative">
          <button onClick={() => setShowReactions(!showReactions)} className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
            <Smile className="w-3.5 h-3.5" />
          </button>
          {showReactions && (
            <div className="absolute right-0 bottom-8 flex gap-1 bg-slate-800 border border-border rounded-xl p-2 shadow-xl z-10">
              {REACTIONS.map(emoji => (
                <button key={emoji} onClick={() => addReaction(emoji)} className="text-lg hover:scale-125 transition-transform">{emoji}</button>
              ))}
            </div>
          )}
        </div>
        <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function TeamWorkspacePage() {
  const { user } = useAuth();
  const { success } = useToast();
  const [activeChannel, setActiveChannel] = useState(MOCK_TEAM_CHANNELS[0]);
  const [messages, setMessages] = useState(activeChannel.messages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !user) return;
    const newMsg: TeamMessage = {
      id: Date.now().toString(),
      author: user,
      content: input.trim(),
      type: "text",
      createdAt: new Date().toISOString(),
      reactions: {},
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-0 glass-card overflow-hidden">
      {/* Channels sidebar */}
      <div className="w-56 flex-shrink-0 border-r border-border flex flex-col bg-slate-950/50">
        <div className="p-4 border-b border-border">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace</p>
          <p className="text-sm font-bold text-white mt-0.5">StackTruth Team</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 px-2 mb-2">Channels</p>
          {MOCK_TEAM_CHANNELS.map(channel => (
            <button
              key={channel.id}
              onClick={() => { setActiveChannel(channel); setMessages(channel.messages); }}
              className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-all ${activeChannel.id === channel.id ? "bg-blue-600/20 text-white border border-blue-500/30" : "text-slate-400 hover:text-white hover:bg-white/10"}`}
            >
              <Hash className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{channel.name}</span>
              {channel.messages.length > 0 && (
                <span className="ml-auto text-[10px] font-bold text-slate-600">{channel.messages.length}</span>
              )}
            </button>
          ))}
          <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-slate-600 hover:text-slate-400 transition-all mt-1">
            <Plus className="w-3.5 h-3.5" /> Add Channel
          </button>
        </div>

        {/* Online members */}
        <div className="p-3 border-t border-border">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-2">Online · {activeChannel.members.length}</p>
          <div className="space-y-1.5">
            {activeChannel.members.slice(0, 4).map(member => (
              <div key={member.id} className="flex items-center gap-2">
                <div className="relative">
                  <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full bg-slate-700" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-1 ring-slate-950" />
                </div>
                <span className="text-xs text-slate-400 truncate">{member.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Channel header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-slate-500" />
            <h2 className="font-bold text-white">{activeChannel.name}</h2>
            <span className="text-slate-600 text-xs">·</span>
            <p className="text-xs text-slate-500">{activeChannel.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"><Search className="w-4 h-4" /></button>
            <button className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"><Pin className="w-4 h-4" /></button>
            <button className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"><Users className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {messages.map(msg => <MessageItem key={msg.id} msg={msg} />)}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="flex items-end gap-2 bg-white/5 border border-border rounded-xl px-4 py-3 focus-within:border-blue-500 transition-all">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message #${activeChannel.name}`}
              rows={1}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 resize-none focus:outline-none"
            />
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"><Paperclip className="w-4 h-4" /></button>
              <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"><Code2 className="w-4 h-4" /></button>
              <button onClick={sendMessage} disabled={!input.trim()} className="p-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 rounded-lg transition-all">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
