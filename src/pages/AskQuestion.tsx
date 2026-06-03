import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { HelpCircle, Tag, Code2, X, Loader2, Lightbulb } from 'lucide-react';

const suggestedTags = ['typescript', 'react', 'postgresql', 'nodejs', 'rust', 'python', 'docker', 'kubernetes', 'graphql', 'aws', 'go', 'microservices'];

export default function AskQuestion() {
  useScrollToTop();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addTag = (tag: string) => {
    const clean = tag.toLowerCase().trim();
    if (clean && !tags.includes(clean) && tags.length < 5) {
      setTags([...tags, clean]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  const handleSubmit = async () => {
    if (!title.trim() || title.length < 15) { toast.error('Title must be at least 15 characters'); return; }
    if (!body.trim() || body.length < 30) { toast.error('Question body must be at least 30 characters'); return; }
    if (tags.length === 0) { toast.error('Add at least one tag'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    toast.success('Question posted successfully!');
    navigate('/questions/1');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Ask a Technical Question</h1>
          <p className="text-muted-foreground">Be specific. Include code examples. The more detail you provide, the better answers you'll receive.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div className="bg-card border border-border rounded-xl p-5">
              <Label className="text-sm font-semibold mb-1 block">Question Title</Label>
              <p className="text-xs text-muted-foreground mb-2">Be specific. Pretend you're asking a colleague in one sentence.</p>
              <Input
                placeholder="e.g. How do I handle race conditions in a Node.js + Redis queue?"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">{title.length}/150 characters</p>
            </div>

            {/* Body */}
            <div className="bg-card border border-border rounded-xl p-5">
              <Label className="text-sm font-semibold mb-1 block">Question Details</Label>
              <p className="text-xs text-muted-foreground mb-2">Describe the problem thoroughly. Include what you've already tried and any error messages.</p>
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="flex gap-2 px-3 py-2 border-b border-border bg-muted/50">
                  {['Bold', 'Italic', 'Code', 'Block', 'Link', 'List'].map(f => (
                    <button key={f} className="text-xs px-2 py-0.5 rounded text-muted-foreground hover:bg-card transition-colors">{f}</button>
                  ))}
                </div>
                <Textarea
                  placeholder="Describe your problem in detail. Include code snippets using ``` code blocks. What have you tried? What error are you getting?"
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  rows={12}
                  className="border-0 rounded-none focus:ring-0 resize-none"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Markdown supported · {body.length} characters</p>
            </div>

            {/* Tags */}
            <div className="bg-card border border-border rounded-xl p-5">
              <Label className="text-sm font-semibold mb-1 block">Tags</Label>
              <p className="text-xs text-muted-foreground mb-2">Add up to 5 tags to help categorize your question.</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-xs">
                    #{tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-destructive ml-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type a tag and press Enter..."
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput); }}}
                  className="text-sm"
                />
                <Button variant="outline" size="sm" onClick={() => addTag(tagInput)} disabled={tags.length >= 5}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {suggestedTags.filter(t => !tags.includes(t)).slice(0, 8).map(tag => (
                  <button key={tag} onClick={() => addTag(tag)} className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded hover:bg-primary/10 hover:text-primary transition-colors">
                    +{tag}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 h-11" onClick={handleSubmit} disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Posting question...</> : 'Post Your Question'}
            </Button>
          </div>

          {/* Tips Sidebar */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />Writing Tips</h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span>Summarize the problem in the title</li>
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span>Include relevant code snippets</li>
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span>Describe what you've already tried</li>
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span>Include error messages verbatim</li>
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span>Mention your language and framework versions</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2"><HelpCircle className="w-4 h-4 text-primary" />AI Pre-check</h3>
              <p className="text-xs text-muted-foreground mb-3">Our AI will review your question before posting for clarity and completeness.</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-accent">AI review enabled</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
