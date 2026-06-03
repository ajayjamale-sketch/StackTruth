import { useState } from 'react';
import { useParams } from 'react-router-dom';
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

// Type for profile form data
interface ProfileFormData {
  name: string;
  bio: string;
  location: string;
  website: string;
  github: string;
}

export default function Profile() {
  useScrollToTop();
  const { username } = useParams<{ username?: string }>();
  
  const publicUsers: Record<string, any> = {
    'marcus_r': {
      id: 2,
      name: 'Marcus R.',
      username: 'marcus_r',
      email: 'marcus@example.com',
      avatar: 'https://i.pravatar.cc/150?u=marcus_r',
      bio: 'Database Architect | SQL Optimization Enthusiast',
      role: 'Expert',
      reputation: 6420,
      badges: ['Database Master', 'Performance Guru', 'Top Reviewer'],
      stats: { questions: 12, answers: 345, reviews: 89, upvotes: 1250 },
      skills: ['SQL', 'Python', 'PostgreSQL', 'Redis', 'Database Design'],
      location: 'Berlin, DE',
      website: 'https://marcusr.dev',
      github: 'marcusr',
      joinedAt: '2023-01-15T00:00:00Z',
    }
  };

  const isOwnProfile = !username || username === mockUser.username;
  const profileUser = isOwnProfile ? mockUser : (publicUsers[username as string] || mockUser);

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProfileFormData>({
    name: profileUser.name,
    bio: profileUser.bio,
    location: profileUser.location,
    website: profileUser.website,
    github: profileUser.github,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  // Helper to update form fields
  const updateField = <K extends keyof ProfileFormData>(field: K, value: ProfileFormData[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <main className="pt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Profile Card */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={profileUser.avatar}
                  alt={`${profileUser.name}'s avatar`}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 mx-auto"
                />
                {isOwnProfile && (
                <button
                  type="button"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-background transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Change profile picture"
                  disabled={!editing}
                >
                  <Camera className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                </button>
                )}
              </div>
              <h2 className="text-xl font-bold">{isOwnProfile ? form.name : profileUser.name}</h2>
              <p className="text-muted-foreground text-sm">@{profileUser.username}</p>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
                <span className="text-sm font-semibold text-primary">
                  {profileUser.reputation.toLocaleString()} reputation
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {profileUser.badges.map((badge: string) => (
                  <Badge key={badge} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-3">Community Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Questions', value: profileUser.stats.questions },
                  { label: 'Answers', value: profileUser.stats.answers },
                  { label: 'Reviews', value: profileUser.stats.reviews },
                  { label: 'Upvotes', value: profileUser.stats.upvotes },
                ].map(stat => (
                  <div key={stat.label} className="text-center bg-muted rounded-xl p-2.5">
                    <div className="text-lg font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-3">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {profileUser.skills.map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Edit Form */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">{isOwnProfile ? 'Profile Settings' : 'Profile Details'}</h2>
                {isOwnProfile && !editing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(true)}
                    aria-label="Edit profile"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                    Edit Profile
                  </Button>
                )}
                {isOwnProfile && editing && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditing(false)}
                      aria-label="Cancel editing"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                      onClick={handleSave}
                      disabled={saving}
                      aria-label="Save profile changes"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" aria-hidden="true" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="full-name" className="text-sm font-medium mb-1.5 block">
                    Full Name
                  </Label>
                  <Input
                    id="full-name"
                    value={isOwnProfile ? form.name : profileUser.name}
                    onChange={e => updateField('name', e.target.value)}
                    disabled={!editing}
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-sm font-medium mb-1.5 block">
                    Bio
                  </Label>
                  <textarea
                    id="bio"
                    value={isOwnProfile ? form.bio : profileUser.bio}
                    onChange={e => updateField('bio', e.target.value)}
                    disabled={!editing}
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60 resize-none"
                    aria-describedby="bio-description"
                  />
                  <p id="bio-description" className="text-xs text-muted-foreground mt-1">
                    Brief description for your profile
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={isOwnProfile ? form.location : profileUser.location}
                      onChange={e => updateField('location', e.target.value)}
                      disabled={!editing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website" className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={isOwnProfile ? form.website : profileUser.website}
                      onChange={e => updateField('website', e.target.value)}
                      disabled={!editing}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="github" className="text-sm font-medium mb-1.5 block flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5" aria-hidden="true" />
                    GitHub Username
                  </Label>
                  <Input
                    id="github"
                    value={isOwnProfile ? form.github : profileUser.github}
                    onChange={e => updateField('github', e.target.value)}
                    disabled={!editing}
                    placeholder="username"
                  />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Account Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    <span>{profileUser.email}</span>
                  </div>
                  <Badge className="text-xs bg-accent/10 text-accent border-accent/20">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Code2 className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    <span>
                      Joined{' '}
                      {new Date(profileUser.joinedAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {profileUser.role}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}