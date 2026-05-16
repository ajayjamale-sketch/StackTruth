import React, { useState, useEffect } from "react";
import { Play, Square, Users, Mic, MicOff, Video, VideoOff, Copy, Share2, Bot, CheckCircle, Clock, Code2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { MOCK_USERS } from "@/constants/mockData";

const STARTER_CODE = `// Welcome to StackTruth Live Coding Room
// Both participants can edit this code in real-time

function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]
console.log(twoSum([3, 3], 6));           // [0, 1]`;

const OUTPUT = `Running tests...
✓ Test 1: [0, 1]  ← Expected: [0, 1]  PASS
✓ Test 2: [1, 2]  ← Expected: [1, 2]  PASS
✓ Test 3: [0, 1]  ← Expected: [0, 1]  PASS

All tests passed! ✅
Time complexity: O(n)
Space complexity: O(n)`;

const SESSIONS = [
  { id: 1, title: "System Design Interview Prep", host: MOCK_USERS[1], participants: 2, language: "Go", type: "interview", duration: "45 min", status: "live" },
  { id: 2, title: "React Hooks Deep Dive", host: MOCK_USERS[0], participants: 3, language: "TypeScript", type: "workshop", duration: "90 min", status: "live" },
  { id: 3, title: "Algorithm Practice Session", host: MOCK_USERS[5], participants: 1, language: "Python", type: "practice", duration: "60 min", status: "scheduled" },
];

export default function LiveCodingPage() {
  const { user } = useAuth();
  const { success } = useToast();
  const [code, setCode] = useState(STARTER_CODE);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [inSession, setInSession] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [language, setLanguage] = useState("typescript");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!inSession) return;
    const t = setInterval(() => setTimer(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [inSession]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const runCode = async () => {
    setRunning(true);
    setOutput("Initializing verification suite...\n");
    await new Promise(r => setTimeout(r, 600));
    setOutput(prev => prev + "Compiling TypeScript source...\n");
    await new Promise(r => setTimeout(r, 800));
    setOutput(prev => prev + "Running unit tests [0/3]...\n");
    await new Promise(r => setTimeout(r, 400));
    setOutput(prev => prev + "✓ Test 1: [0, 1] PASS\n");
    await new Promise(r => setTimeout(r, 300));
    setOutput(prev => prev + "✓ Test 2: [1, 2] PASS\n");
    await new Promise(r => setTimeout(r, 300));
    setOutput(prev => prev + "✓ Test 3: [0, 1] PASS\n");
    await new Promise(r => setTimeout(r, 500));
    setOutput(prev => prev + "\nAnalyzing computational complexity...\n");
    await new Promise(r => setTimeout(r, 1000));
    setOutput(prev => prev + "--------------------------------\n");
    setOutput(prev => prev + "All tests passed! ✅\n");
    setOutput(prev => prev + "Time Complexity: O(n)\n");
    setOutput(prev => prev + "Space Complexity: O(n)\n");
    setOutput(prev => prev + "Memory Audit: CLEAN\n");
    setRunning(false);
  };

  const joinSession = (session: typeof SESSIONS[0]) => {
    setInSession(true);
    success(`Joined "${session.title}"`, "Session started — happy coding!");
  };

  const LANGS = ["typescript", "python", "go", "rust", "java", "javascript"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Live Coding</h1>
          <p className="text-slate-400 text-sm mt-1">Pair programming, interviews, and collaborative sessions</p>
        </div>
        {!inSession && (
          <div className="flex gap-3">
            <button onClick={() => { setInSession(true); success("New session created!", "Share the link to invite collaborators"); }} className="btn-primary flex items-center gap-2">
              <Play className="w-4 h-4" /> Start Session
            </button>
          </div>
        )}
      </div>

      {inSession ? (
        /* Active coding session */
        <div className="space-y-4">
          {/* Session toolbar */}
          <div className="glass-card px-4 py-3 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                LIVE · {formatTime(timer)}
              </div>
              <div className="flex items-center gap-1.5">
                {MOCK_USERS.slice(0, 2).map((u, i) => (
                  <div key={u.id} className="relative" title={u.name}>
                    <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full ring-2 ring-border" />
                    {i === 0 && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-1 ring-slate-900" />}
                  </div>
                ))}
                <span className="text-xs text-slate-500 ml-1">2 participants</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 bg-white/5 border border-border rounded-xl p-1">
                {LANGS.map(l => (
                  <button key={l} onClick={() => setLanguage(l)} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${language === l ? "bg-blue-600 text-white" : "text-slate-500 hover:text-white"}`}>{l}</button>
                ))}
              </div>
              <button onClick={() => { navigator.clipboard.writeText("https://stacktruth.app/room/abc123"); success("Link copied!"); }} className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all"><Copy className="w-4 h-4" /></button>
              <button onClick={() => setMicOn(!micOn)} className={`p-2 rounded-lg transition-all ${micOn ? "text-slate-500 hover:text-white hover:bg-white/10" : "bg-red-500/10 text-red-400"}`}>{micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}</button>
              <button onClick={() => setVideoOn(!videoOn)} className={`p-2 rounded-lg transition-all ${videoOn ? "text-slate-500 hover:text-white hover:bg-white/10" : "bg-red-500/10 text-red-400"}`}>{videoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}</button>
              <button onClick={() => setInSession(false)} className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold px-3 py-2 rounded-lg transition-all">
                <Square className="w-3.5 h-3.5" /> End
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {/* Code editor */}
            <div className="lg:col-span-2 glass-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-slate-950/50">
                <div className="flex gap-1.5"><div className="w-3 h-3 bg-red-500 rounded-full" /><div className="w-3 h-3 bg-amber-500 rounded-full" /><div className="w-3 h-3 bg-green-500 rounded-full" /></div>
                <span className="text-xs text-slate-500 font-mono ml-2">solution.{language === "typescript" ? "ts" : language === "python" ? "py" : language}</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-[10px] text-blue-400 font-mono">Sarah is typing...</span>
                  <span className="w-1.5 h-4 bg-amber-400 cursor-blink" />
                </div>
              </div>
              <textarea
                value={code}
                onChange={e => { setCode(e.target.value); const pos = e.target.value.substring(0, e.target.selectionStart).split("\n"); setCursorPos({ line: pos.length, col: pos[pos.length - 1].length + 1 }); }}
                className="w-full bg-slate-950 text-sm font-mono text-slate-300 p-4 focus:outline-none resize-none leading-relaxed"
                style={{ minHeight: "400px" }}
                spellCheck={false}
              />
              <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-slate-950/50">
                <span className="text-[10px] text-slate-600 font-mono">Ln {cursorPos.line}, Col {cursorPos.col}</span>
                <div className="flex gap-3">
                  <button onClick={runCode} disabled={running} className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold px-4 py-2 rounded-lg transition-all disabled:opacity-60">
                    {running ? <div className="w-3 h-3 border border-green-400/30 border-t-green-400 rounded-full animate-spin" /> : <Play className="w-3 h-3" />}
                    {running ? "Running..." : "Run Code"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="space-y-4">
              {/* Output */}
              <div className="glass-card overflow-hidden">
                <div className="px-4 py-2.5 border-b border-border bg-slate-950/50">
                  <p className="text-xs font-bold text-slate-400 flex items-center gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 ${output.includes("PASS") ? "text-green-400" : "text-slate-500"}`} />
                    Output
                  </p>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-300 leading-relaxed min-h-24 bg-slate-950">
                  {output || <span className="text-slate-700">Run your code to see output...</span>}
                </pre>
              </div>

              {/* AI Hints */}
              <div className="glass-card p-4">
                <p className="text-xs font-bold text-purple-400 flex items-center gap-2 mb-3"><Bot className="w-3.5 h-3.5" />AI Hints</p>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-start gap-2 p-2 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                    Using a HashMap gives O(n) time complexity
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                    Handle duplicate pairs correctly
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                    <Code2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    Consider edge: nums = [3,3], target = 6
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div className="glass-card p-4">
                <p className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2"><Users className="w-3.5 h-3.5" />Participants</p>
                {MOCK_USERS.slice(0, 2).map((u, i) => (
                  <div key={u.id} className="flex items-center gap-2 mb-2">
                    <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-white">{u.name}</p>
                      <p className="text-[10px] text-slate-500">{i === 0 ? "Host" : "Guest"}</p>
                    </div>
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Session browser */
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Active Sessions", value: "24", color: "text-green-400" },
              { label: "Developers Online", value: "1,847", color: "text-blue-400" },
              { label: "Sessions Today", value: "312", color: "text-purple-400" },
            ].map(s => (
              <div key={s.label} className="stat-card text-center">
                <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-5">
            <h2 className="font-bold text-white mb-5">Available Sessions</h2>
            <div className="space-y-3">
              {SESSIONS.map(session => (
                <div key={session.id} className="flex items-center gap-4 p-4 bg-white/5 border border-border rounded-xl hover:border-blue-500/30 transition-all">
                  <img src={session.host.avatar} alt={session.host.name} className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-white">{session.title}</p>
                      {session.status === "live" && (
                        <span className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />LIVE
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span>Host: {session.host.name}</span>
                      <span className="tag-badge text-[10px]">{session.language}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{session.participants}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{session.duration}</span>
                    </div>
                  </div>
                  <button onClick={() => joinSession(session)} className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${session.status === "live" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white/10 hover:bg-white/15 text-slate-300"}`}>
                    {session.status === "live" ? "Join Now" : "Register"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
