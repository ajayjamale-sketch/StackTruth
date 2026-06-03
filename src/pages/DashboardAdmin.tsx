import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Users, Shield, Flag, BarChart3, Settings, LogOut,
  Search, Ban, Check, Eye, AlertTriangle, TrendingUp, Activity
} from 'lucide-react';

const navItems = [
  { id: 'users', label: 'Users', icon: Users, badge: 12 },
  { id: 'moderation', label: 'Content Moderation', icon: Shield, badge: 8 },
  { id: 'reports', label: 'Reports', icon: Flag, badge: 5 },
  { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
  { id: 'system', label: 'System Settings', icon: Settings },
];

const users = [
  { name: 'Marcus Rivera', email: 'marcus@example.com', rep: 14280, role: 'developer', status: 'active', joined: 'Jan 2022', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
  { name: 'Sarah Chen', email: 'sarah@example.com', rep: 12100, role: 'expert', status: 'active', joined: 'Mar 2022', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face' },
  { name: 'Suspicious User', email: 'spam@spam.com', rep: 2, role: 'developer', status: 'flagged', joined: 'Jan 2024', avatar: null },
  { name: 'Alex Chen', email: 'alex@example.com', rep: 4820, role: 'developer', status: 'active', joined: 'Jun 2023', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
];

const initialReports = [
  { id: '1', type: 'Spam', target: 'Low quality answer on Q#4821', reporter: 'priya_n', time: '2h ago', status: 'Pending' },
  { id: '2', type: 'Abuse', target: 'Offensive comment by @baduser', reporter: 'marcus_r', time: '4h ago', status: 'Pending' },
  { id: '3', type: 'Plagiarism', target: 'Copied answer on Q#3901', reporter: 'sarah_c', time: '1d ago', status: 'Reviewed' },
];

export default function DashboardAdmin() {
  useScrollToTop();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [userSearch, setUserSearch] = useState('');
  const [banned, setBanned] = useState<Set<string>>(new Set());

  const [reports, setReports] = useState(initialReports);

  const handleBan = (name: string) => {
    setBanned(prev => new Set([...prev, name]));
    toast.success(`${name} has been suspended`);
  };

  const handleApprove = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Reviewed' } : r));
    toast.success('Content approved and kept active');
  };

  const handleRemove = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    toast.success('Content removed successfully');
  };

  const adminUser = {
    name: 'Admin Panel',
    avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=32&h=32&fit=crop&crop=face',
    reputation: 0,
    role: 'Superadmin'
  };

  return (
    <DashboardLayout user={adminUser} navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab}>
      <ScrollToTop />
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2"><Shield className="w-5 h-5 text-red-600 dark:text-red-400" />Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-0.5">25 flags pending · Platform health: 99.9%</p>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Total Users', value: '180,243', sub: '+1,240 this week', color: 'text-blue-600 dark:text-blue-400' },
              { label: 'Active Today', value: '24,812', sub: '13.8% DAU', color: 'text-green-600 dark:text-green-400' },
              { label: 'Questions Today', value: '1,847', sub: '+12% vs avg', color: 'text-purple-600 dark:text-purple-400' },
              { label: 'Flags Pending', value: '25', sub: '8 critical', color: 'text-red-600 dark:text-red-400' },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {activeTab === 'users' && (
            <div className="max-w-4xl">
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users..." value={userSearch} onChange={e => setUserSearch(e.target.value)} className="pl-9" />
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase">
                  <div className="col-span-4">User</div>
                  <div className="col-span-2">Rep</div>
                  <div className="col-span-2">Role</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                <div className="divide-y divide-border">
                  {users.filter(u => !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase())).map(u => (
                    <div key={u.name} className="grid grid-cols-12 gap-4 px-5 py-3 items-center">
                      <div className="col-span-4 flex items-center gap-2.5">
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{u.name[0]}</div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{u.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                        </div>
                      </div>
                      <div className="col-span-2 text-sm font-medium text-primary">{u.rep.toLocaleString()}</div>
                      <div className="col-span-2">
                        <Badge variant="secondary" className="text-xs">{u.role}</Badge>
                      </div>
                      <div className="col-span-2">
                        <Badge className={`text-xs ${
                          banned.has(u.name) ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' :
                          u.status === 'active' ? 'bg-accent/10 text-accent border-accent/20' :
                          'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
                        }`}>
                          {banned.has(u.name) ? 'Banned' : u.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex justify-end gap-1.5">
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => navigate('/profile')}>
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        {!banned.has(u.name) && (
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10" onClick={() => handleBan(u.name)}>
                            <Ban className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="max-w-3xl">
              <h2 className="font-semibold mb-4">Reported Content ({reports.filter(r => r.status === 'Pending').length} pending)</h2>
              <div className="space-y-3">
                {reports.map((r) => (
                  <div key={r.id} className={`bg-card border rounded-xl p-4 ${r.status === 'Pending' ? 'border-yellow-500/30' : 'border-border'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`text-xs ${r.type === 'Spam' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' : r.type === 'Abuse' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-orange-500/10 text-orange-600 dark:text-orange-400'} border border-current/20`}>
                            {r.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">by @{r.reporter} · {r.time}</span>
                        </div>
                        <p className="text-sm">{r.target}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge className={`text-xs ${r.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20' : 'bg-muted text-muted-foreground'}`}>{r.status}</Badge>
                        {r.status === 'Pending' && (
                          <>
                            <Button size="sm" className="h-7 text-xs bg-accent hover:bg-accent/90" onClick={() => handleApprove(r.id)}>Approve</Button>
                            <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => handleRemove(r.id)}>Remove</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="max-w-3xl">
              <h2 className="font-semibold mb-4">Platform Analytics</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Questions / Day', value: '1,847', sub: 'avg 7d' },
                  { label: 'Answer Rate', value: '94.2%', sub: 'questions answered' },
                  { label: 'Avg Response Time', value: '2.4h', sub: 'to first answer' },
                  { label: 'User Retention', value: '78%', sub: '30-day retention' },
                  { label: 'Code Reviews', value: '342', sub: 'submitted today' },
                  { label: 'AI Queries', value: '8,210', sub: 'today' },
                ].map((s, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                    <p className="text-2xl font-bold text-primary">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="max-w-2xl">
              <h2 className="font-semibold mb-4">System Settings</h2>
              <div className="space-y-3">
                {[
                  { label: 'Maintenance Mode', desc: 'Take the platform offline for maintenance', enabled: false },
                  { label: 'AI Review Auto-approve', desc: 'Auto-publish AI review results without manual review', enabled: true },
                  { label: 'New User Verification', desc: 'Require email verification for new signups', enabled: true },
                  { label: 'Rate Limiting', desc: 'Enforce API and posting rate limits', enabled: true },
                ].map((setting, i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{setting.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{setting.desc}</p>
                    </div>
                    <button
                      onClick={() => toast.success(`${setting.label} toggled`)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${setting.enabled ? 'bg-primary' : 'bg-muted'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${setting.enabled ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
    </DashboardLayout>
  );
}
