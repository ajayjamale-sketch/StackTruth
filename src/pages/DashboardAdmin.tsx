// DashboardAdmin.tsx
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import {
  Users, Shield, Flag, BarChart3, Settings, LogOut,
  Search, Ban, Check, Eye, AlertTriangle, TrendingUp, Activity,
  UserCog, Mail, Calendar, AlertCircle, MoreVertical, Star, UserX, UserCheck, MessageSquare
} from 'lucide-react';

const navItems = [
  { id: 'users', label: 'Users', icon: Users, badge: 0 },
  { id: 'moderation', label: 'Content Moderation', icon: Shield },
  { id: 'reports', label: 'Reports', icon: Flag },
  { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
  { id: 'system', label: 'System Settings', icon: Settings },
];

// Initial users with more fields
const initialUsers = [
  { id: '1', name: 'Marcus Rivera', email: 'marcus@example.com', rep: 14280, role: 'developer', status: 'active', joined: 'Jan 15, 2022', lastActive: '2h ago', answers: 621, reviews: 198, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', warnings: 0 },
  { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', rep: 12100, role: 'expert', status: 'active', joined: 'Mar 22, 2022', lastActive: '1d ago', answers: 534, reviews: 267, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face', warnings: 1 },
  { id: '3', name: 'Spam User', email: 'spam@spam.com', rep: 2, role: 'developer', status: 'flagged', joined: 'Jan 5, 2024', lastActive: '5d ago', answers: 0, reviews: 0, avatar: null, warnings: 2 },
  { id: '4', name: 'Alex Chen', email: 'alex@example.com', rep: 4820, role: 'developer', status: 'active', joined: 'Jun 10, 2023', lastActive: '3h ago', answers: 183, reviews: 92, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', warnings: 0 },
  { id: '5', name: 'Diana Patel', email: 'diana@example.com', rep: 9800, role: 'expert', status: 'active', joined: 'Sep 3, 2022', lastActive: '12h ago', answers: 441, reviews: 156, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', warnings: 0 },
];

const initialReports = [
  { id: '1', type: 'Spam', target: 'Low quality answer on Q#4821', reporter: 'priya_n', time: '2h ago', status: 'Pending' },
  { id: '2', type: 'Abuse', target: 'Offensive comment by @baduser', reporter: 'marcus_r', time: '4h ago', status: 'Pending' },
  { id: '3', type: 'Plagiarism', target: 'Copied answer on Q#3901', reporter: 'sarah_c', time: '1d ago', status: 'Reviewed' },
];

const initialFlaggedContent = [
  { id: 'f1', type: 'Question', title: 'How to hack a website?', reason: 'Inappropriate content', author: 'hacker123', flaggedBy: 'auto', time: '1h ago', status: 'Pending' },
  { id: 'f2', type: 'Answer', title: 'Answer to Q#4821', reason: 'Spam link', author: 'spammer', flaggedBy: 'community', time: '3h ago', status: 'Pending' },
  { id: 'f3', type: 'Comment', title: 'Comment on Q#3901', reason: 'Harassment', author: 'toxic_user', flaggedBy: 'sarah_c', time: '1d ago', status: 'Reviewed' },
];

export default function DashboardAdmin() {
  useScrollToTop();
  const [activeTab, setActiveTab] = useState('users');
  const [userSearch, setUserSearch] = useState('');
  const [users, setUsers] = useState(initialUsers);
  const [reports, setReports] = useState(initialReports);
  const [flaggedContent, setFlaggedContent] = useState(initialFlaggedContent);
  
  // User action modal
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  // Settings state
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    aiAutoApprove: true,
    newUserVerification: true,
    rateLimiting: true,
  });

  // User actions
  const handleBanUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'banned' } : u));
    toast.success('User banned successfully');
  };

  const handleUnbanUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'active' } : u));
    toast.success('User unbanned');
  };

  const handleWarnUser = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, warnings: (u.warnings || 0) + 1 } : u));
    toast.warning('Warning issued to user');
    setUserModalOpen(false);
  };

  const handleChangeRole = (userId: string, newRole: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    toast.success(`Role changed to ${newRole}`);
    setUserModalOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    toast.success('User deleted');
    setUserModalOpen(false);
  };

  const openUserModal = (user: any) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  // Reports handling
  const handleApproveReport = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Reviewed' } : r));
    toast.success('Content approved and kept active');
  };

  const handleRemoveReported = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    toast.success('Content removed successfully');
  };

  // Flagged content moderation
  const handleApproveContent = (id: string) => {
    setFlaggedContent(prev => prev.map(c => c.id === id ? { ...c, status: 'Approved' } : c));
    toast.success('Content approved');
  };

  const handleDeleteContent = (id: string) => {
    setFlaggedContent(prev => prev.filter(c => c.id !== id));
    toast.success('Content deleted');
  };

  // Settings toggle
  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success(`${key} toggled`);
  };

  // Compute counts
  const pendingReportsCount = reports.filter(r => r.status === 'Pending').length;
  const pendingFlaggedCount = flaggedContent.filter(c => c.status === 'Pending').length;
  const bannedUsersCount = users.filter(u => u.status === 'banned').length;
  const activeUsersCount = users.filter(u => u.status === 'active').length;

  // Update nav badges dynamically
  const navItemsWithBadges = navItems.map(item => {
    if (item.id === 'users') return { ...item, badge: bannedUsersCount };
    if (item.id === 'moderation') return { ...item, badge: pendingFlaggedCount };
    if (item.id === 'reports') return { ...item, badge: pendingReportsCount };
    return item;
  });

  const filteredUsers = users.filter(u =>
    !userSearch ||
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const adminUser = {
    name: 'Admin Panel',
    avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=32&h=32&fit=crop&crop=face',
    reputation: 0,
    role: 'Superadmin'
  };

  return (
    <DashboardLayout user={adminUser} navItems={navItemsWithBadges} activeTab={activeTab} setActiveTab={setActiveTab}>
      <ScrollToTop />
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {pendingFlaggedCount + pendingReportsCount} flags pending · Platform health: 99.9%
          </p>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Users', value: users.length.toLocaleString(), sub: `${activeUsersCount} active, ${bannedUsersCount} banned`, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Active Today', value: '24,812', sub: '13.8% DAU', color: 'text-green-600 dark:text-green-400' },
          { label: 'Questions Today', value: '1,847', sub: '+12% vs avg', color: 'text-purple-600 dark:text-purple-400' },
          { label: 'Flags Pending', value: (pendingFlaggedCount + pendingReportsCount).toString(), sub: 'Requires action', color: 'text-red-600 dark:text-red-400' },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div className="max-w-6xl">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase">
              <div className="col-span-3">User</div>
              <div className="col-span-2">Rep</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Warnings</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            <div className="divide-y divide-border">
              {filteredUsers.map(u => (
                <div key={u.id} className="grid grid-cols-12 gap-4 px-5 py-3 items-center">
                  <div className="col-span-3 flex items-center gap-2.5">
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
                      u.status === 'banned' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' :
                      u.status === 'active' ? 'bg-accent/10 text-accent border-accent/20' :
                      'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'
                    }`}>
                      {u.status}
                    </Badge>
                  </div>
                  <div className="col-span-1 text-center">
                    {u.warnings > 0 ? (
                      <Badge variant="outline" className="text-xs border-orange-500/30 text-orange-600">
                        {u.warnings}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">0</span>
                    )}
                  </div>
                  <div className="col-span-2 flex justify-end gap-1.5">
                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => openUserModal(u)}>
                      <UserCog className="w-3.5 h-3.5" />
                    </Button>
                    {u.status !== 'banned' ? (
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10" onClick={() => handleBanUser(u.id)}>
                        <Ban className="w-3.5 h-3.5" />
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-green-600 hover:bg-green-600/10" onClick={() => handleUnbanUser(u.id)}>
                        <UserCheck className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No users found</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT MODERATION TAB */}
      {activeTab === 'moderation' && (
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Flagged Content ({pendingFlaggedCount} pending)</h2>
            <Button variant="outline" size="sm" onClick={() => toast.info('Refreshing...')}>Refresh</Button>
          </div>
          <div className="space-y-3">
            {flaggedContent.map((item) => (
              <div key={item.id} className={`bg-card border rounded-xl p-4 ${item.status === 'Pending' ? 'border-yellow-500/30' : 'border-border'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant="outline" className="text-xs">{item.type}</Badge>
                      <Badge className="text-xs bg-red-500/10 text-red-600 border border-red-500/20">
                        {item.reason}
                      </Badge>
                      <span className="text-xs text-muted-foreground">by @{item.author} · flagged by {item.flaggedBy} · {item.time}</span>
                    </div>
                    <p className="text-sm">{item.title}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className={`text-xs ${item.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' : 'bg-muted text-muted-foreground'}`}>
                      {item.status}
                    </Badge>
                    {item.status === 'Pending' && (
                      <>
                        <Button size="sm" className="h-7 text-xs bg-accent hover:bg-accent/90" onClick={() => handleApproveContent(item.id)}>
                          <Check className="w-3.5 h-3.5 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => handleDeleteContent(item.id)}>
                          <Ban className="w-3.5 h-3.5 mr-1" /> Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {flaggedContent.length === 0 && <div className="text-center py-8 text-muted-foreground">No flagged content</div>}
          </div>
        </div>
      )}

      {/* REPORTS TAB */}
      {activeTab === 'reports' && (
        <div className="max-w-3xl">
          <h2 className="font-semibold mb-4">Reported Content ({pendingReportsCount} pending)</h2>
          <div className="space-y-3">
            {reports.map((r) => (
              <div key={r.id} className={`bg-card border rounded-xl p-4 ${r.status === 'Pending' ? 'border-yellow-500/30' : 'border-border'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`text-xs ${
                        r.type === 'Spam' ? 'bg-yellow-500/10 text-yellow-600' :
                        r.type === 'Abuse' ? 'bg-red-500/10 text-red-600' :
                        'bg-orange-500/10 text-orange-600'
                      } border border-current/20`}>
                        {r.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">by @{r.reporter} · {r.time}</span>
                    </div>
                    <p className="text-sm">{r.target}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className={`text-xs ${r.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' : 'bg-muted text-muted-foreground'}`}>
                      {r.status}
                    </Badge>
                    {r.status === 'Pending' && (
                      <>
                        <Button size="sm" className="h-7 text-xs bg-accent hover:bg-accent/90" onClick={() => handleApproveReport(r.id)}>
                          <Check className="w-3.5 h-3.5 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => handleRemoveReported(r.id)}>
                          <Ban className="w-3.5 h-3.5 mr-1" /> Remove
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {reports.length === 0 && <div className="text-center py-8 text-muted-foreground">No reports</div>}
          </div>
        </div>
      )}

      {/* ANALYTICS TAB */}
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

      {/* SYSTEM SETTINGS TAB */}
      {activeTab === 'system' && (
        <div className="max-w-2xl">
          <h2 className="font-semibold mb-4">System Settings</h2>
          <div className="space-y-3">
            {[
              { label: 'Maintenance Mode', desc: 'Take the platform offline for maintenance', key: 'maintenanceMode' as const },
              { label: 'AI Review Auto-approve', desc: 'Auto-publish AI review results without manual review', key: 'aiAutoApprove' as const },
              { label: 'New User Verification', desc: 'Require email verification for new signups', key: 'newUserVerification' as const },
              { label: 'Rate Limiting', desc: 'Enforce API and posting rate limits', key: 'rateLimiting' as const },
            ].map((setting) => (
              <div key={setting.key} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{setting.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{setting.desc}</p>
                </div>
                <button
                  onClick={() => toggleSetting(setting.key)}
                  className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-primary ${settings[setting.key] ? 'bg-primary' : 'bg-muted'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${settings[setting.key] ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Management Modal */}
      <Dialog open={userModalOpen} onOpenChange={setUserModalOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{selectedUser.name[0]}</div>
                  )}
                  <div>
                    <div>{selectedUser.name}</div>
                    <div className="text-sm font-normal text-muted-foreground">@{selectedUser.email.split('@')[0]}</div>
                  </div>
                </DialogTitle>
                <DialogDescription>Manage user account, roles, and actions.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* User Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">Reputation</p>
                    <p className="font-semibold">{selectedUser.rep.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">Joined</p>
                    <p className="font-semibold">{selectedUser.joined}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">Last Active</p>
                    <p className="font-semibold">{selectedUser.lastActive}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-xs text-muted-foreground">Warnings</p>
                    <p className="font-semibold text-orange-600">{selectedUser.warnings}</p>
                  </div>
                </div>

                {/* Role Change */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Change Role</Label>
                  <div className="flex gap-2">
                    {['developer', 'expert', 'moderator', 'admin'].map(role => (
                      <Button
                        key={role}
                        size="sm"
                        variant={selectedUser.role === role ? 'default' : 'outline'}
                        className="capitalize"
                        onClick={() => handleChangeRole(selectedUser.id, role)}
                      >
                        {role}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  <Button variant="outline" size="sm" onClick={() => handleWarnUser(selectedUser.id)}>
                    <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Issue Warning
                  </Button>
                  {selectedUser.status !== 'banned' ? (
                    <Button variant="destructive" size="sm" onClick={() => handleBanUser(selectedUser.id)}>
                      <Ban className="w-3.5 h-3.5 mr-1" /> Ban User
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="text-green-600" onClick={() => handleUnbanUser(selectedUser.id)}>
                      <UserCheck className="w-3.5 h-3.5 mr-1" /> Unban User
                    </Button>
                  )}
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(selectedUser.id)}>
                    <UserX className="w-3.5 h-3.5 mr-1" /> Delete Account
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUserModalOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}