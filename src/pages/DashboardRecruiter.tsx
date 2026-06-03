import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { Briefcase, Users, Search, MapPin, Plus, Filter, BarChart3, Calendar, CheckCircle, Mail, Phone, Linkedin, Video, UserCheck } from 'lucide-react';

const navItems = [
  { id: 'search', label: 'Candidate Search', icon: Search },
  { id: 'pool', label: 'Talent Pool', icon: Users, badge: 18 },
  { id: 'jobs', label: 'Job Postings', icon: Briefcase },
  { id: 'interviews', label: 'Interviews', icon: Calendar, badge: 3 },
  { id: 'analytics', label: 'Hiring Analytics', icon: BarChart3 },
];

const initialCandidates = [
  { id: '1', name: 'Marcus Rivera', username: 'marcus_r', rep: 14280, skills: ['Go', 'K8s', 'PostgreSQL'], location: 'Remote', available: true, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', badge: 'Expert', score: 94, email: 'marcus@example.com', phone: '+1 (555) 123-4567' },
  { id: '2', name: 'Sarah Chen', username: 'sarah_c', rep: 12100, skills: ['React', 'TypeScript', 'Python'], location: 'San Francisco', available: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face', badge: 'Top Reviewer', score: 91, email: 'sarah@example.com', phone: '+1 (555) 234-5678' },
  { id: '3', name: 'Alex Chen', username: 'alexchen', rep: 4820, skills: ['TypeScript', 'Rust', 'Node.js'], location: 'Remote', available: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', badge: 'Contributor', score: 87, email: 'alex@example.com', phone: '+1 (555) 345-6789' },
  { id: '4', name: 'Diana Patel', username: 'diana_p', rep: 9800, skills: ['Java', 'Microservices', 'AWS'], location: 'New York', available: true, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', badge: 'Expert', score: 92, email: 'diana@example.com', phone: '+1 (555) 456-7890' },
];

// Mock applicants per job
const applicantsData: Record<number, any[]> = {
  1: [
    { id: 'a1', name: 'Marcus Rivera', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face', email: 'marcus@example.com', appliedDate: '2d ago', score: 94 },
    { id: 'a2', name: 'Diana Patel', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face', email: 'diana@example.com', appliedDate: '3d ago', score: 92 },
  ],
  2: [
    { id: 'a3', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face', email: 'sarah@example.com', appliedDate: '1d ago', score: 91 },
    { id: 'a4', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', email: 'alex@example.com', appliedDate: '4d ago', score: 87 },
  ],
  3: [
    { id: 'a5', name: 'Kevin L.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=32&h=32&fit=crop&crop=face', email: 'kevin@example.com', appliedDate: '5d ago', score: 78 },
  ],
};

const initialPostings = [
  { id: 1, title: 'Senior Backend Engineer', type: 'Full-time', applicants: 24, status: 'Active', posted: '5d ago', description: 'Looking for experienced backend engineers...', location: 'Remote', skills: ['Go', 'K8s', 'PostgreSQL'] },
  { id: 2, title: 'Staff Frontend Engineer', type: 'Full-time', applicants: 18, status: 'Active', posted: '1w ago', description: 'Lead frontend architecture...', location: 'San Francisco', skills: ['React', 'TypeScript', 'CSS'] },
  { id: 3, title: 'DevOps Engineer', type: 'Contract', applicants: 9, status: 'Draft', posted: null, description: 'Help with CI/CD pipelines...', location: 'Remote', skills: ['AWS', 'Terraform', 'K8s'] },
];

const initialInterviews = [
  { id: 1, candidate: 'Marcus Rivera', role: 'Senior Backend Engineer', date: 'Tomorrow, 10:00 AM', type: 'Technical' },
  { id: 2, candidate: 'Sarah Chen', role: 'Staff Frontend Engineer', date: 'Thu, 2:00 PM', type: 'System Design' },
  { id: 3, candidate: 'Diana Patel', role: 'Senior Backend Engineer', date: 'Fri, 11:00 AM', type: 'Live Coding' },
];

export default function DashboardRecruiter() {
  useScrollToTop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('search');
  const [search, setSearch] = useState('');
  const [contacted, setContacted] = useState<Set<string>>(new Set());
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [manageJobOpen, setManageJobOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<any>(null);
  const [editJobTitle, setEditJobTitle] = useState('');
  const [editJobType, setEditJobType] = useState('');
  const [editJobStatus, setEditJobStatus] = useState('');
  const [editJobLocation, setEditJobLocation] = useState('');
  const [editJobDesc, setEditJobDesc] = useState('');
  const [editJobSkills, setEditJobSkills] = useState('');

  // Data states
  const [talentPool, setTalentPool] = useState(initialCandidates);
  const [jobPostings, setJobPostings] = useState(initialPostings);
  const [interviews, setInterviews] = useState(initialInterviews);

  // Form states for new job
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobType, setNewJobType] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobSkills, setNewJobSkills] = useState('');

  // Profile modal
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  // Live coding modal – will directly open meeting window
  // No need for modal anymore, we'll open meeting directly

  // Applicants modal
  const [applicantsModalOpen, setApplicantsModalOpen] = useState(false);
  const [currentJobApplicants, setCurrentJobApplicants] = useState<any[]>([]);
  const [currentJobTitle, setCurrentJobTitle] = useState('');

  const handleContact = (name: string) => {
    setContacted(prev => new Set([...prev, name]));
    toast.success(`Message sent to ${name}!`);
  };

  const handleFilter = () => {
    toast.info('Filter options (coming soon)');
  };

  const handlePostJob = () => setPostJobOpen(true);

  const submitPostJob = () => {
    if (!newJobTitle.trim()) {
      toast.error('Job title is required');
      return;
    }
    const newJob = {
      id: Date.now(),
      title: newJobTitle,
      type: newJobType || 'Full-time',
      applicants: 0,
      status: 'Active',
      posted: 'Just now',
      description: newJobDesc || 'No description provided',
      location: newJobLocation || 'Remote',
      skills: newJobSkills.split(',').map(s => s.trim()).filter(s => s),
    };
    setJobPostings([newJob, ...jobPostings]);
    setPostJobOpen(false);
    setNewJobTitle('');
    setNewJobType('');
    setNewJobLocation('');
    setNewJobDesc('');
    setNewJobSkills('');
    toast.success('Job posted successfully!');
  };

  const deleteJob = (id: number) => {
    setJobPostings(jobPostings.filter(job => job.id !== id));
    toast.success('Job deleted');
  };

  const openManageJob = (job: any) => {
    setCurrentJob(job);
    setEditJobTitle(job.title);
    setEditJobType(job.type);
    setEditJobStatus(job.status);
    setEditJobLocation(job.location || '');
    setEditJobDesc(job.description || '');
    setEditJobSkills(job.skills ? job.skills.join(', ') : '');
    setManageJobOpen(true);
  };

  const saveManageJob = () => {
    if (!editJobTitle.trim()) {
      toast.error('Job title required');
      return;
    }
    setJobPostings(prev => prev.map(job =>
      job.id === currentJob.id
        ? {
            ...job,
            title: editJobTitle,
            type: editJobType,
            status: editJobStatus,
            location: editJobLocation,
            description: editJobDesc,
            skills: editJobSkills.split(',').map(s => s.trim()).filter(s => s),
          }
        : job
    ));
    setManageJobOpen(false);
    setCurrentJob(null);
    toast.success('Job updated successfully');
  };

  const removeFromPool = (id: string) => {
    setTalentPool(talentPool.filter(c => c.id !== id));
    toast.success('Candidate removed from talent pool');
  };

  const cancelInterview = (id: number) => {
    setInterviews(interviews.filter(i => i.id !== id));
    toast.success('Interview cancelled');
  };

  const openProfile = (candidate: any) => {
    setSelectedCandidate(candidate);
    setProfileModalOpen(true);
  };

  const openApplicants = (jobId: number, jobTitle: string) => {
    const applicants = applicantsData[jobId] || [];
    setCurrentJobApplicants(applicants);
    setCurrentJobTitle(jobTitle);
    setApplicantsModalOpen(true);
  };

  const startLiveSession = (interview: any) => {
    // Create a unique meeting room ID for the inbuilt module
    const roomId = `interview-${interview.id}-${Date.now()}`;
    navigate(`/live-session/${roomId}`);
    toast.success(`Opening meeting room for ${interview.candidate}`);
  };

  const filteredCandidates = talentPool.filter(c =>
    !search ||
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const recruiterUser = {
    name: 'Recruiter Account',
    avatar: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=40&h=40&fit=crop&crop=face',
    reputation: 0,
    role: 'Pro Plan'
  };

  return (
    <DashboardLayout user={recruiterUser} navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}>
      <ScrollToTop />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />Recruiter Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {jobPostings.filter(j => j.status === 'Active').length} active job postings · {talentPool.length} saved developers
          </p>
        </div>
        <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={handlePostJob}>
          <Plus className="w-4 h-4 mr-1.5" /> Post Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Active Jobs', value: jobPostings.filter(j => j.status === 'Active').length.toString(), sub: `${jobPostings.reduce((acc, j) => acc + j.applicants, 0)} total applicants`, color: 'text-purple-600 dark:text-purple-400' },
          { label: 'Talent Pool', value: talentPool.length.toString(), sub: 'Saved developers', color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Interviews', value: interviews.length.toString(), sub: 'Scheduled this week', color: 'text-yellow-600 dark:text-yellow-400' },
          { label: 'Avg Match Score', value: `${Math.round(talentPool.reduce((acc, c) => acc + c.score, 0) / talentPool.length)}%`, sub: 'Skills match', color: 'text-green-600 dark:text-green-400' },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 transition-all hover:shadow-md">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* CANDIDATE SEARCH TAB */}
      {activeTab === 'search' && (
        <div className="max-w-4xl">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skill, or tech stack..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="w-4 h-4 mr-1.5" /> Filter
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredCandidates.map(c => (
              <div key={c.id} className="bg-card border border-border rounded-xl p-4 transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">@{c.username}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{c.score}</div>
                    <p className="text-[10px] text-muted-foreground">match score</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {c.skills.map(s => (
                    <span key={s} className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-md">{s}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${c.available ? 'bg-accent' : 'bg-yellow-500'}`} />
                    {c.available ? 'Open to work' : 'Not looking'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className={`flex-1 h-8 text-xs ${
                      contacted.has(c.name)
                        ? 'bg-accent/10 text-accent border border-accent/20'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                    onClick={() => handleContact(c.name)}
                    disabled={contacted.has(c.name)}
                  >
                    {contacted.has(c.name) ? <><CheckCircle className="w-3 h-3 mr-1" />Contacted</> : 'Contact'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs"
                    onClick={() => openProfile(c)}
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
            {filteredCandidates.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">No candidates match your search</div>
            )}
          </div>
        </div>
      )}

      {/* TALENT POOL TAB */}
      {activeTab === 'pool' && (
        <div className="max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Saved Candidates ({talentPool.length})</h2>
            <Button variant="outline" size="sm" onClick={() => toast.info('Export talent pool feature coming soon')}>Export</Button>
          </div>
          <div className="space-y-3">
            {talentPool.map(c => (
              <div key={c.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.skills.slice(0, 2).join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/20">{c.score}% match</Badge>
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => openProfile(c)}>View</Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeFromPool(c.id)}>Remove</Button>
                </div>
              </div>
            ))}
            {talentPool.length === 0 && <div className="text-center text-muted-foreground py-8">Your talent pool is empty.</div>}
          </div>
        </div>
      )}

      {/* JOB POSTINGS TAB */}
      {activeTab === 'jobs' && (
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Job Postings</h2>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={handlePostJob}><Plus className="w-3.5 h-3.5 mr-1" /> Post Job</Button>
          </div>
          <div className="space-y-3">
            {jobPostings.map(job => (
              <div key={job.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{job.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">{job.type}</Badge>
                    {job.posted && <span>Posted {job.posted}</span>}
                    <span>{job.applicants} applicants</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge className={`text-xs ${job.status === 'Active' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-muted text-muted-foreground'}`}>
                    {job.status}
                  </Badge>
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => openApplicants(job.id, job.title)}>
                    Applicants
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => openManageJob(job)}>Manage</Button>
                  <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => deleteJob(job.id)}>Delete</Button>
                </div>
              </div>
            ))}
            {jobPostings.length === 0 && <div className="text-center py-8 text-muted-foreground">No active job postings.</div>}
          </div>
        </div>
      )}

      {/* INTERVIEWS TAB */}
      {activeTab === 'interviews' && (
        <div className="max-w-2xl">
          <h2 className="font-semibold mb-4">Scheduled Interviews ({interviews.length})</h2>
          <div className="space-y-3">
            {interviews.map(interview => (
              <div key={interview.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">{interview.candidate}</p>
                  <Badge variant="secondary" className="text-xs">{interview.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{interview.role} · {interview.date}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs h-7" onClick={() => startLiveSession(interview)}>
                    <Video className="w-3 h-3 mr-1" /> Join Live Session
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs h-7 text-destructive hover:bg-destructive/10" onClick={() => cancelInterview(interview.id)}>Cancel</Button>
                </div>
              </div>
            ))}
            {interviews.length === 0 && <div className="text-center text-muted-foreground py-8">No scheduled interviews.</div>}
          </div>
        </div>
      )}

      {/* HIRING ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="max-w-2xl">
          <h2 className="font-semibold mb-4">Hiring Analytics</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Avg Time to Hire', value: '18 days', sub: '-3 days vs last quarter' },
              { label: 'Offer Accept Rate', value: '76%', sub: 'Above industry avg' },
              { label: 'Sourced from ST', value: '83%', sub: 'StackTruth sourced' },
              { label: 'Quality Score', value: '4.8/5', sub: 'Candidate ratings' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stat.value}</p>
                <p className="text-xs text-accent mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIALOGS */}

      {/* Post Job Dialog */}
      <Dialog open={postJobOpen} onOpenChange={setPostJobOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Post a New Job</DialogTitle>
            <DialogDescription>Create a new job posting to find top engineering talent.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Job Title</Label>
              <Input placeholder="e.g. Senior Full Stack Engineer" value={newJobTitle} onChange={e => setNewJobTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Employment Type</Label>
                <Input placeholder="Full-time, Contract" value={newJobType} onChange={e => setNewJobType(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Location</Label>
                <Input placeholder="Remote, New York" value={newJobLocation} onChange={e => setNewJobLocation(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea rows={3} placeholder="Describe the role..." value={newJobDesc} onChange={e => setNewJobDesc(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Skills (comma separated)</Label>
              <Input placeholder="React, Node.js, PostgreSQL" value={newJobSkills} onChange={e => setNewJobSkills(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPostJobOpen(false)}>Cancel</Button>
            <Button onClick={submitPostJob}>Post Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Job Dialog */}
      <Dialog open={manageJobOpen} onOpenChange={setManageJobOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Manage Job</DialogTitle>
            <DialogDescription>Edit job details and update status.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Job Title</Label>
              <Input value={editJobTitle} onChange={e => setEditJobTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Employment Type</Label>
                <Input value={editJobType} onChange={e => setEditJobType(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Location</Label>
                <Input value={editJobLocation} onChange={e => setEditJobLocation(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editJobStatus} onChange={e => setEditJobStatus(e.target.value)}>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea rows={3} value={editJobDesc} onChange={e => setEditJobDesc(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label>Skills</Label>
              <Input value={editJobSkills} onChange={e => setEditJobSkills(e.target.value)} placeholder="Comma separated" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setManageJobOpen(false)}>Cancel</Button>
            <Button onClick={saveManageJob}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Applicants Modal */}
      <Dialog open={applicantsModalOpen} onOpenChange={setApplicantsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Applicants for {currentJobTitle}</DialogTitle>
            <DialogDescription>{currentJobApplicants.length} candidates have applied</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-[400px] overflow-y-auto py-2">
            {currentJobApplicants.map(applicant => (
              <div key={applicant.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <img src={applicant.avatar} alt={applicant.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium">{applicant.name}</p>
                    <p className="text-xs text-muted-foreground">{applicant.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="text-xs bg-purple-500/10 text-purple-600">{applicant.score}% match</Badge>
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => {
                    toast.info(`Schedule interview with ${applicant.name}`);
                    setApplicantsModalOpen(false);
                  }}>Schedule</Button>
                </div>
              </div>
            ))}
            {currentJobApplicants.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">No applicants yet.</div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApplicantsModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Modal */}
      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedCandidate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div>{selectedCandidate.name}</div>
                    <div className="text-sm font-normal text-muted-foreground">@{selectedCandidate.username}</div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-muted rounded-lg p-2">
                    <div className="text-lg font-bold text-primary">{selectedCandidate.rep.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Reputation</div>
                  </div>
                  <div className="bg-muted rounded-lg p-2">
                    <div className="text-lg font-bold">{selectedCandidate.score}%</div>
                    <div className="text-xs text-muted-foreground">Match Score</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Contact Info</h4>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {selectedCandidate.email}</div>
                    <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {selectedCandidate.phone}</div>
                    <div className="flex items-center gap-2"><Linkedin className="w-3 h-3" /> linkedin.com/in/{selectedCandidate.username}</div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCandidate.skills.map(skill => <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>)}
                  </div>
                </div>
                <div className="pt-2 text-xs text-muted-foreground border-t border-border">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {selectedCandidate.location}</span>
                  <span className="flex items-center gap-1 mt-1"><span className={`w-2 h-2 rounded-full ${selectedCandidate.available ? 'bg-accent' : 'bg-yellow-500'}`} /> {selectedCandidate.available ? 'Open to work' : 'Not looking'}</span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setProfileModalOpen(false)}>Close</Button>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => { handleContact(selectedCandidate.name); setProfileModalOpen(false); }} disabled={contacted.has(selectedCandidate.name)}>
                  {contacted.has(selectedCandidate.name) ? 'Contacted' : 'Contact Candidate'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}