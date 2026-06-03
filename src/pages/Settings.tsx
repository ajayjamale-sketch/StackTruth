import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Settings2, Bell, Shield, Palette, Code2, Trash2, Loader2, Sun, Moon, Monitor } from 'lucide-react';
import { useThemeContext } from '@/context/ThemeContext';

const sections = ['Account', 'Notifications', 'Appearance', 'Privacy', 'Integrations'];

export default function Settings() {
  useScrollToTop();
  const { theme, toggleTheme } = useThemeContext();
  const [activeSection, setActiveSection] = useState('Account');
  const [saving, setSaving] = useState(false);
  const [notifs, setNotifs] = useState({
    answers: true, upvotes: true, mentions: true, reviews: true,
    teamMessages: false, email: true, push: false,
  });
  const [privacy, setPrivacy] = useState({
    publicProfile: true, showEmail: false, showActivity: true,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <div className="pt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Settings2 className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold">Settings</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {sections.map(s => (
                <button
                  key={s}
                  onClick={() => setActiveSection(s)}
                  className={`w-full px-4 py-3 text-sm font-medium text-left border-b border-border last:border-0 transition-colors ${
                    activeSection === s ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeSection === 'Account' && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-bold text-lg mb-5">Account Settings</h2>
                <div className="space-y-4 mb-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Display Name</Label>
                      <Input defaultValue="Alex Chen" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Username</Label>
                      <Input defaultValue="alexchen" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Email Address</Label>
                    <Input defaultValue="alex@example.com" type="email" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Current Password</Label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">New Password</Label>
                      <Input type="password" placeholder="New password" />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Confirm Password</Label>
                      <Input type="password" placeholder="Confirm password" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <Button variant="destructive" size="sm" onClick={() => toast.error('Deletion requires email confirmation')}>
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete Account
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" onClick={handleSave} disabled={saving}>
                    {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {activeSection === 'Notifications' && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-bold text-lg mb-5">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'answers', label: 'New Answers', desc: 'When someone answers your question' },
                    { key: 'upvotes', label: 'Upvotes', desc: 'When your content receives upvotes' },
                    { key: 'mentions', label: 'Mentions', desc: 'When someone mentions you' },
                    { key: 'reviews', label: 'Code Reviews', desc: 'Review requests and completions' },
                    { key: 'teamMessages', label: 'Team Messages', desc: 'Messages in team workspaces' },
                    { key: 'email', label: 'Email Digest', desc: 'Weekly activity summary email' },
                    { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                  ].map(n => (
                    <div key={n.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium">{n.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifs(prev => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                        className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${notifs[n.key as keyof typeof notifs] ? 'bg-primary' : 'bg-muted'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifs[n.key as keyof typeof notifs] ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Button className="bg-primary hover:bg-primary/90" onClick={handleSave} disabled={saving}>
                    {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : 'Save Preferences'}
                  </Button>
                </div>
              </div>
            )}

            {activeSection === 'Appearance' && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-bold text-lg mb-5">Appearance</h2>
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Color Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'light', label: 'Light', icon: Sun },
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'system', label: 'System', icon: Monitor },
                    ].map(t => {
                      const Icon = t.icon;
                      return (
                        <button
                          key={t.id}
                          onClick={toggleTheme}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                            theme === t.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/30'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                          <span className="text-sm font-medium">{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-3 block">Code Font Size</Label>
                  <div className="flex gap-2">
                    {['12px', '14px', '16px'].map(size => (
                      <button key={size} className="px-4 py-2 rounded-lg border border-border text-sm hover:border-primary/30 transition-colors font-mono">{size}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'Privacy' && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-bold text-lg mb-5">Privacy Settings</h2>
                <div className="space-y-4">
                  {[
                    { key: 'publicProfile', label: 'Public Profile', desc: 'Anyone can view your profile and activity' },
                    { key: 'showEmail', label: 'Show Email', desc: 'Display your email on your public profile' },
                    { key: 'showActivity', label: 'Show Activity', desc: 'Show your contribution activity publicly' },
                  ].map(p => (
                    <div key={p.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm font-medium">{p.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
                      </div>
                      <button
                        onClick={() => setPrivacy(prev => ({ ...prev, [p.key]: !prev[p.key as keyof typeof prev] }))}
                        className={`w-11 h-6 rounded-full transition-colors relative ${privacy[p.key as keyof typeof privacy] ? 'bg-primary' : 'bg-muted'}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${privacy[p.key as keyof typeof privacy] ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <Button className="bg-primary hover:bg-primary/90" onClick={handleSave} disabled={saving}>Save Privacy Settings</Button>
                </div>
              </div>
            )}

            {activeSection === 'Integrations' && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-bold text-lg mb-5">Connected Integrations</h2>
                <div className="space-y-3">
                  {[
                    { name: 'GitHub', icon: Code2, connected: true, username: 'alexchen' },
                    { name: 'Google', icon: Code2, connected: false },
                    { name: 'Slack', icon: Code2, connected: false },
                    { name: 'VS Code Extension', icon: Code2, connected: true, username: 'Installed' },
                  ].map(int => (
                    <div key={int.name} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                          <int.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{int.name}</p>
                          {int.connected && <p className="text-xs text-muted-foreground">{int.username}</p>}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={int.connected ? 'outline' : 'default'}
                        className={int.connected ? '' : 'bg-primary hover:bg-primary/90'}
                        onClick={() => toast.success(int.connected ? `${int.name} disconnected` : `${int.name} connected!`)}
                      >
                        {int.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
