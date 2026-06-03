import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Video, Mic, MicOff, VideoOff, PhoneOff, Users, MessageSquare, Settings } from 'lucide-react';

export default function LiveSession() {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [sessionActive, setSessionActive] = useState(true);

  // Mock end session
  const handleEndSession = () => {
    setSessionActive(false);
    toast.success('Live session ended.');
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col overflow-hidden text-white">
      {/* Session Header */}
      <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-zinc-950 shrink-0">
        <div className="flex items-center gap-4">
          <Badge variant="destructive" className="animate-pulse flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white block" /> LIVE
          </Badge>
          <h1 className="font-semibold text-lg">Mock Coding Interview: {id || 'React & TypeScript'}</h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" /> 2 Participants
          </div>
          <div className="w-px h-4 bg-white/20" />
          <span>00:45:12</span>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Video & Screen Area */}
        <div className="flex-1 p-4 flex flex-col gap-4">
          {sessionActive ? (
            <div className="flex-1 grid grid-cols-2 gap-4">
              {/* Participant 1 */}
              <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden relative group flex items-center justify-center">
                {videoOn ? (
                  <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                    <Video className="w-16 h-16 text-zinc-600" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center text-4xl font-bold text-zinc-500">
                    You
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                  You {!micOn && <MicOff className="w-3.5 h-3.5 text-red-400" />}
                </div>
              </div>

              {/* Participant 2 */}
              <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                  <Video className="w-16 h-16 text-zinc-600" />
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                  Interviewer
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                <PhoneOff className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Session Ended</h2>
              <p className="text-zinc-400">Returning to dashboard...</p>
            </div>
          )}

          {/* Controls */}
          {sessionActive && (
            <div className="h-20 bg-zinc-950 border border-white/10 rounded-2xl flex items-center justify-center gap-4 px-6 shrink-0">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${micOn ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50'}`}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${videoOn ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50'}`}
              >
                {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>
              <div className="w-px h-8 bg-white/10 mx-2" />
              <button className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <Button
                variant="destructive"
                className="ml-4 h-12 px-6 rounded-full font-semibold"
                onClick={handleEndSession}
              >
                <PhoneOff className="w-4 h-4 mr-2" /> End Call
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar (Chat & IDE Placeholder) */}
        <div className="w-80 bg-zinc-950 border-l border-white/10 flex flex-col shrink-0">
          <div className="h-14 border-b border-white/10 flex items-center px-4 gap-2 font-medium">
            <MessageSquare className="w-4 h-4" /> Session Chat
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="bg-zinc-900 p-3 rounded-xl rounded-tl-none border border-white/5 text-sm">
              <p className="text-xs text-zinc-500 mb-1">Interviewer • 10:02 AM</p>
              Hi! Ready to start the mock interview?
            </div>
            <div className="bg-primary/20 p-3 rounded-xl rounded-tr-none border border-primary/30 text-sm ml-8">
              <p className="text-xs text-primary/70 mb-1">You • 10:03 AM</p>
              Yes, I am ready. Should we use the shared editor?
            </div>
          </div>
          <div className="p-4 border-t border-white/10">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              disabled={!sessionActive}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
