import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Star, MessageSquare, GitBranch, BookOpen, Users,
  Award, Settings, LogOut, CheckCircle, Clock, TrendingUp,
  BarChart3, Plus, ArrowRight, Eye, Calendar, CalendarDays
} from 'lucide-react';

const navItems = [
  { id: 'reviews', label: 'Review Requests', icon: GitBranch, badge: 8 },
  { id: 'queue', label: 'Answer Queue', icon: MessageSquare, badge: 12 },
  { id: 'mentorship', label: 'Mentorship', icon: Users },
  { id: 'tutorials', label: 'My Tutorials', icon: BookOpen },
  { id: 'reputation', label: 'Rep Analytics', icon: BarChart3 },
];

// Initial mock data
const initialReviewRequests = [
  { id: '1', title: 'Concurrent WebSocket handler in Node.js', user: 'Alex C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', lang: 'TypeScript', priority: 'high', time: '30m ago' },
  { id: '2', title: 'React Query mutation with optimistic updates', user: 'Sarah K.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face', lang: 'React', priority: 'medium', time: '1h ago' },
  { id: '3', title: 'Rust async runtime selection guide', user: 'Marcus L.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face', lang: 'Rust', priority: 'low', time: '3h ago' },
  { id: '4', title: 'PostgreSQL row-level security implementation', user: 'Diana P.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face', lang: 'SQL', priority: 'high', time: '4h ago' },
];

const initialAnswerQueue = [
  { id: '1', title: 'How to implement two-phase commit in distributed systems?', tags: ['distributed', 'transactions'], votes: 24, time: '1h ago' },
  { id: '2', title: 'Memory model guarantees in Rust with multiple threads?', tags: ['rust', 'concurrency', 'memory'], votes: 18, time: '2h ago' },
  { id: '3', title: 'Best approach for real-time collaborative text editing?', tags: ['crdt', 'realtime', 'architecture'], votes: 31, time: '3h ago' },
];

const initialMentees = [
  { id: '1', name: 'Kevin L.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=face', skill: 'TypeScript', sessions: 6, progress: 74 },
  { id: '2', name: 'Maya R.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face', skill: 'Rust', sessions: 3, progress: 45 },
];

const initialTutorials = [
  { id: '1', title: 'TypeScript 5.0 Generic Patterns You Should Know', views: 12300, likes: 445, status: 'Published' },
  { id: '2', title: 'Advanced Rust Error Handling Patterns', views: 8700, likes: 312, status: 'Published' },
  { id: '3', title: 'Building Real-time APIs with WebSockets in Node.js', views: 0, likes: 0, status: 'Draft' },
];

export default function DashboardExpert() {
  useScrollToTop();
  // State for active tab
  const [activeTab, setActiveTab] = useState('reviews');
  
  // State for review requests
  const [reviewRequests, setReviewRequests] = useState(initialReviewRequests);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<typeof initialReviewRequests[0] | null>(null);
  const [reviewComment, setReviewComment] = useState('');

  // State for answer queue
  const [answerQueue, setAnswerQueue] = useState(initialAnswerQueue);
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<typeof initialAnswerQueue[0] | null>(null);
  const [answerText, setAnswerText] = useState('');

  // State for mentorship
  const [mentees, setMentees] = useState(initialMentees);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [currentMentee, setCurrentMentee] = useState<typeof initialMentees[0] | null>(null);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  // State for tutorials
  const [tutorials, setTutorials] = useState(initialTutorials);
  const [newTutorialOpen, setNewTutorialOpen] = useState(false);
  const [tutorialTitle, setTutorialTitle] = useState('');
  const [tutorialStatus, setTutorialStatus] = useState('Draft');
  const [editTutorialOpen, setEditTutorialOpen] = useState(false);
  const [editTutorial, setEditTutorial] = useState<typeof initialTutorials[0] | null>(null);

  const expertUser = {
    name: 'Priya Nair',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face',
    reputation: 18420,
    role: 'Verified Expert'
  };

  // ----- Review Handlers -----
  const handleReview = (req: typeof initialReviewRequests[0]) => {
    setCurrentReview(req);
    setReviewComment('');
    setReviewModalOpen(true);
  };

  const submitReview = () => {
    if (!reviewComment.trim()) {
      toast.error('Please provide review comments');
      return;
    }
    // Remove the reviewed request from the list
    setReviewRequests(prev => prev.filter(r => r.id !== currentReview!.id));
    toast.success(`Review submitted for "${currentReview!.title}"`);
    setReviewModalOpen(false);
    setCurrentReview(null);
    setReviewComment('');
  };

  // ----- Answer Handlers -----
  const handleAnswer = (q: typeof initialAnswerQueue[0]) => {
    setCurrentQuestion(q);
    setAnswerText('');
    setAnswerModalOpen(true);
  };

  const submitAnswer = () => {
    if (!answerText.trim()) {
      toast.error('Please write an answer');
      return;
    }
    // Remove the answered question from the queue
    setAnswerQueue(prev => prev.filter(q => q.id !== currentQuestion!.id));
    toast.success(`Answer posted for "${currentQuestion!.title}"`);
    setAnswerModalOpen(false);
    setCurrentQuestion(null);
    setAnswerText('');
  };

  // ----- Mentorship Handlers -----
  const handleSchedule = (mentee: typeof initialMentees[0]) => {
    setCurrentMentee(mentee);
    setScheduleDate('');
    setScheduleTime('');
    setScheduleModalOpen(true);
  };

  const submitSchedule = () => {
    if (!scheduleDate || !scheduleTime) {
      toast.error('Please select date and time');
      return;
    }
    // Update mentee's sessions count and progress
    setMentees(prev => prev.map(m => {
      if (m.id === currentMentee!.id) {
        const newSessions = m.sessions + 1;
        const newProgress = Math.min(100, m.progress + 10);
        return { ...m, sessions: newSessions, progress: newProgress };
      }
      return m;
    }));
    toast.success(`Session scheduled with ${currentMentee!.name} on ${scheduleDate} at ${scheduleTime}`);
    setScheduleModalOpen(false);
    setCurrentMentee(null);
  };

  // ----- Tutorial Handlers -----
  const handleCreateTutorial = () => {
    if (!tutorialTitle.trim()) {
      toast.error('Tutorial title required');
      return;
    }
    const newTutorial = {
      id: Date.now().toString(),
      title: tutorialTitle,
      views: 0,
      likes: 0,
      status: tutorialStatus,
    };
    setTutorials([newTutorial, ...tutorials]);
    toast.success('Tutorial created!');
    setNewTutorialOpen(false);
    setTutorialTitle('');
    setTutorialStatus('Draft');
  };

  const handleEditTutorial = (tutorial: typeof initialTutorials[0]) => {
    setEditTutorial(tutorial);
    setEditTutorialOpen(true);
  };

  const saveEditTutorial = () => {
    if (!editTutorial) return;
    if (!editTutorial.title.trim()) {
      toast.error('Title required');
      return;
    }
    setTutorials(prev => prev.map(t => t.id === editTutorial.id ? editTutorial : t));
    toast.success('Tutorial updated');
    setEditTutorialOpen(false);
    setEditTutorial(null);
  };

  // Stats calculation
  const reviewsDone = initialReviewRequests.length - reviewRequests.length;
  const answersGiven = initialAnswerQueue.length - answerQueue.length;
  const totalRep = expertUser.reputation;
  const activeMentees = mentees.length;

  return (
    <DashboardLayout user={expertUser} navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}>
      <ScrollToTop />
      
      {/* Expert Stats Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />Expert Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {reviewRequests.length} review requests · {answerQueue.length} questions in queue
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Go to Reviews
          </Button>
          <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white" disabled>
            Start Reviewing
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Reviews Done', value: reviewsDone.toString(), sub: `${reviewRequests.length} pending`, color: 'text-yellow-600 dark:text-yellow-400' },
          { label: 'Answers Given', value: answersGiven.toString(), sub: `${answerQueue.length} in queue`, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Reputation', value: totalRep.toLocaleString(), sub: 'Expert level', color: 'text-primary' },
          { label: 'Mentees', value: activeMentees.toString(), sub: 'Active this month', color: 'text-green-600 dark:text-green-400' },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* REVIEW REQUESTS TAB */}
      {activeTab === 'reviews' && (
        <div className="max-w-3xl">
          <h2 className="font-semibold mb-4">Pending Code Reviews ({reviewRequests.length})</h2>
          <div className="space-y-3">
            {reviewRequests.map((req) => (
              <div key={req.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img src={req.avatar} alt={req.user} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{req.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{req.user}</span>
                      <Badge variant="secondary" className="text-xs">{req.lang}</Badge>
                      <span className="text-xs text-muted-foreground">{req.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge className={`text-xs ${
                    req.priority === 'high'
                      ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
                      : req.priority === 'medium'
                      ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {req.priority}
                  </Badge>
                  <Button
                    size="sm"
                    className="h-7 text-xs bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => handleReview(req)}
                  >
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANSWER QUEUE TAB */}
      {activeTab === 'queue' && (
        <div className="max-w-3xl">
          <h2 className="font-semibold mb-4">Answer Queue ({answerQueue.length})</h2>
          <div className="space-y-3">
            {answerQueue.map((q) => (
              <div key={q.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all cursor-pointer" onClick={() => handleAnswer(q)}>
                <p className="font-medium text-sm mb-2">{q.title}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {q.tags.map((t) => (
                      <span key={t} className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{q.votes} votes</span>
                    <span>{q.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MENTORSHIP TAB */}
      {activeTab === 'mentorship' && (
        <div className="max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Active Mentees ({mentees.length})</h2>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90"
              onClick={() => toast.info('Searching for new mentees (demo)')}
            >
              Find Mentees
            </Button>
          </div>
          <div className="space-y-3">
            {mentees.map((m) => (
              <div key={m.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">Learning {m.skill} · {m.sessions} sessions</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => handleSchedule(m)}
                  >
                    Schedule
                  </Button>
                </div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{m.progress}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${m.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TUTORIALS TAB */}
      {activeTab === 'tutorials' && (
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">My Tutorials</h2>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90"
              onClick={() => setNewTutorialOpen(true)}
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> New Tutorial
            </Button>
          </div>
          <div className="space-y-3">
            {tutorials.map((t) => (
              <div key={t.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{t.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{t.views.toLocaleString()} views</span>
                    <span>{t.likes} likes</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <Badge className={`text-xs ${
                    t.status === 'Published'
                      ? 'bg-accent/10 text-accent border-accent/20'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {t.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => handleEditTutorial(t)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPUTATION ANALYTICS TAB */}
      {activeTab === 'reputation' && (
        <div className="max-w-2xl">
          <h2 className="font-semibold mb-4">Reputation Analytics</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'This Week', value: '+240', detail: 'From 18 answers' },
              { label: 'This Month', value: '+1,240', detail: 'Top 0.1% of experts' },
              { label: 'Avg Score', value: '94/100', detail: 'Answer quality' },
              { label: 'Accept Rate', value: '68%', detail: 'Accepted answers' },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Modal */}
      <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Code Review: {currentReview?.title}</DialogTitle>
            <DialogDescription>Provide your review comments and feedback.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="review-comment">Review Comments</Label>
              <Textarea
                id="review-comment"
                placeholder="Write your feedback, issues found, suggestions..."
                rows={6}
                value={reviewComment}
                onChange={e => setReviewComment(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewModalOpen(false)}>Cancel</Button>
            <Button onClick={submitReview}>Submit Review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Answer Modal */}
      <Dialog open={answerModalOpen} onOpenChange={setAnswerModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Answer: {currentQuestion?.title}</DialogTitle>
            <DialogDescription>Provide a detailed answer with code examples if possible.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="answer-text">Your Answer</Label>
              <Textarea
                id="answer-text"
                placeholder="Write your answer..."
                rows={8}
                value={answerText}
                onChange={e => setAnswerText(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAnswerModalOpen(false)}>Cancel</Button>
            <Button onClick={submitAnswer}>Post Answer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Modal */}
      <Dialog open={scheduleModalOpen} onOpenChange={setScheduleModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Session with {currentMentee?.name}</DialogTitle>
            <DialogDescription>Choose a date and time for the mentorship session.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={scheduleDate}
                onChange={e => setScheduleDate(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={scheduleTime}
                onChange={e => setScheduleTime(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleModalOpen(false)}>Cancel</Button>
            <Button onClick={submitSchedule}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Tutorial Modal */}
      <Dialog open={newTutorialOpen} onOpenChange={setNewTutorialOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create New Tutorial</DialogTitle>
            <DialogDescription>Start writing a new tutorial to share your expertise.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Tutorial Title</Label>
              <Input id="title" placeholder="e.g. Mastering React Server Components" value={tutorialTitle} onChange={e => setTutorialTitle(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Initial Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={tutorialStatus}
                onChange={e => setTutorialStatus(e.target.value)}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTutorialOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTutorial}>Create Tutorial</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Tutorial Modal */}
      {editTutorial && (
        <Dialog open={editTutorialOpen} onOpenChange={setEditTutorialOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Edit Tutorial</DialogTitle>
              <DialogDescription>Modify your existing tutorial details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Tutorial Title</Label>
                <Input
                  id="edit-title"
                  value={editTutorial.title}
                  onChange={e => setEditTutorial({ ...editTutorial, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={editTutorial.status}
                  onChange={e => setEditTutorial({ ...editTutorial, status: e.target.value })}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditTutorialOpen(false)}>Cancel</Button>
              <Button onClick={saveEditTutorial}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  );
}