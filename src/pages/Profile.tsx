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
import { User, Mail, MapPin, Github, Globe, Code2, Loader2, Camera, Award, Edit } from 'lucide-react';
import { mockUser } from '@/lib/mockData';

export default function Profile() {
  useScrollToTop();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: mockUser.name,
    bio: mockUser.bio,
    location: mockUser.location,
    website: mockUser.website,
    github: mockUser.github,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <div className="pt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Profile Card */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="relative inline-block mb-4">
                <img src={mockUser.avatar} alt={mockUser.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 mx-auto" />
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background">
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <h2 className="text-xl font-bold">{form.name}</h2>
              <p className="text-muted-foreground text-sm">@{mockUser.username}</p>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-semibold text-primary">{mockUser.reputation.toLocaleString()} reputation</span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {mockUser.badges.map(b => (
                  <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-3">Community Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Questions', value: mockUser.stats.questions },
                  { label: 'Answers', value: mockUser.stats.answers },
                  { label: 'Reviews', value: mockUser.stats.reviews },
                  { label: 'Upvotes', value: mockUser.stats.upvotes },
                ].map(s => (
                  <div key={s.label} className="text-center bg-muted rounded-xl p-2.5">
                    <div className="text-lg font-bold text-primary">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-3">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {mockUser.skills.map(s => (
                  <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Edit Form */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Profile Settings</h2>
                {!editing ? (
                  <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                    <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleSave} disabled={saving}>
                      {saving ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Saving...</> : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Full Name</Label>
                  <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} disabled={!editing} />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Bio</Label>
                  <textarea
                    value={form.bio}
                    onChange={e => setForm({...form, bio: e.target.value})}
                    disabled={!editing}
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none disabled:opacity-60"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />Location</Label>
                    <Input value={form.location} onChange={e => setForm({...form, location: e.target.value})} disabled={!editing} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />Website</Label>
                    <Input value={form.website} onChange={e => setForm({...form, website: e.target.value})} disabled={!editing} />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><Github className="w-3.5 h-3.5" />GitHub Username</Label>
                  <Input value={form.github} onChange={e => setForm({...form, github: e.target.value})} disabled={!editing} />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Account Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-muted-foreground" /><span>{mockUser.email}</span></div>
                  <Badge className="text-xs bg-accent/10 text-accent border-accent/20">Verified</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div className="flex items-center gap-2 text-sm"><Code2 className="w-4 h-4 text-muted-foreground" /><span>Joined {new Date(mockUser.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span></div>
                  <Badge variant="secondary" className="text-xs">{mockUser.role}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
