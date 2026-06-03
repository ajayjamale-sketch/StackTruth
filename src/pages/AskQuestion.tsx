// AskQuestion.tsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardPageWrapper from '@/components/layout/DashboardPageWrapper';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { HelpCircle, Tag, Code2, X, Loader2, Lightbulb, Sparkles } from 'lucide-react';

const suggestedTags = ['typescript', 'react', 'postgresql', 'nodejs', 'rust', 'python', 'docker', 'kubernetes', 'graphql', 'aws', 'go', 'microservices'];

export default function AskQuestion() {
  useScrollToTop();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiChecking, setAiChecking] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addTag = (tag: string) => {
    const clean = tag.toLowerCase().trim();
    if (clean && !tags.includes(clean) && tags.length < 5) {
      setTags([...tags, clean]);
      setTagInput('');
    } else if (tags.length >= 5) {
      toast.error('Maximum 5 tags allowed');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag));

  // Insert markdown syntax at cursor position
  const insertMarkdown = (before: string, after: string = '') => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = body.substring(start, end);
    const newText = 
      body.substring(0, start) + 
      before + selectedText + after + 
      body.substring(end);
    setBody(newText);
    // Set cursor position after inserted markdown
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleBold = () => insertMarkdown('**', '**');
  const handleItalic = () => insertMarkdown('*', '*');
  const handleCode = () => insertMarkdown('`', '`');
  const handleCodeBlock = () => insertMarkdown('```\n', '\n```');
  const handleLink = () => insertMarkdown('[', '](url)');
  const handleList = () => insertMarkdown('- ');

  // Mock AI pre-check
  const runAiPreCheck = async () => {
    setAiChecking(true);
    await new Promise(r => setTimeout(r, 800)); // Simulate API call

    const issues = [];
    if (title.length < 15) issues.push('• Title should be at least 15 characters.');
    if (body.length < 30) issues.push('• Question body must be at least 30 characters.');
    if (tags.length === 0) issues.push('• Add at least one tag to help categorize your question.');
    if (title.toLowerCase().includes('help') && title.length < 30) issues.push('• Consider making the title more specific (avoid vague words like "help").');
    if (!body.includes('```') && (body.includes('code') || body.includes('error'))) issues.push('• Use code blocks (```) to format any code snippets.');

    if (issues.length > 0) {
      toast.error(`AI pre‑check found issues:\n${issues.join('\n')}`, { duration: 6000 });
    } else {
      toast.success('AI pre‑check passed! Your question looks well‑formed.');
    }
    setAiChecking(false);
  };

  const handleSubmit = async () => {
    if (!title.trim() || title.length < 15) {
      toast.error('Title must be at least 15 characters');
      return;
    }
    if (!body.trim() || body.length < 30) {
      toast.error('Question body must be at least 30 characters');
      return;
    }
    if (tags.length === 0) {
      toast.error('Add at least one tag');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    toast.success('Question posted successfully!');
    navigate('/questions/1');
  };

  return (
    <DashboardPageWrapper activeTab="questions">

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
              <p className={`text-xs mt-1 ${title.length >= 15 ? 'text-muted-foreground' : 'text-destructive'}`}>
                {title.length}/150 characters {title.length < 15 && '(needs at least 15)'}
              </p>
            </div>

            {/* Body */}
            <div className="bg-card border border-border rounded-xl p-5">
              <Label className="text-sm font-semibold mb-1 block">Question Details</Label>
              <p className="text-xs text-muted-foreground mb-2">Describe the problem thoroughly. Include what you've already tried and any error messages.</p>
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="flex gap-2 px-3 py-2 border-b border-border bg-muted/50">
                  <button
                    onClick={handleBold}
                    className="text-xs px-2 py-0.5 rounded text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                    title="Bold ( **text** )"
                  >
                    Bold
                  </button>
                  <button
                    onClick={handleItalic}
                    className="text-xs px-2 py-0.5 rounded text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                    title="Italic ( *text* )"
                  >
                    Italic
                  </button>
                  <button
                    onClick={handleCode}
                    className="text-xs px-2 py-0.5 rounded text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                    title="Inline code ( `code` )"
                  >
                    Code
                  </button>
                  <button
                    onClick={handleCodeBlock}
                    className="text-xs px-2 py-0.5 rounded text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                    title="Code block ( ``` ``` )"
                  >
                    Block
                  </button>
                  <button
                    onClick={handleLink}
                    className="text-xs px-2 py-0.5 rounded text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                    title="Link ( [text](url) )"
                  >
                    Link
                  </button>
                  <button
                    onClick={handleList}
                    className="text-xs px-2 py-0.5 rounded text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                    title="Bullet list item ( - )"
                  >
                    List
                  </button>
                </div>
                <Textarea
                  ref={textareaRef}
                  placeholder="Describe your problem in detail. Include code snippets using ``` code blocks. What have you tried? What error are you getting?"
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  rows={12}
                  className="border-0 rounded-none focus:ring-0 resize-none"
                />
              </div>
              <p className={`text-xs mt-1 ${body.length >= 30 ? 'text-muted-foreground' : 'text-destructive'}`}>
                {body.length} characters {body.length < 30 && '(needs at least 30)'}
              </p>
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
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(tagInput); } }}
                  className="text-sm"
                />
                <Button variant="outline" size="sm" onClick={() => addTag(tagInput)} disabled={tags.length >= 5}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {suggestedTags.filter(t => !tags.includes(t)).slice(0, 8).map(tag => (
                  <button
                    key={tag}
                    onClick={() => addTag(tag)}
                    className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded hover:bg-primary/10 hover:text-primary transition-colors"
                  >
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
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400" /> Writing Tips
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span>Summarize the problem in the title</li>
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span>Include relevant code snippets</li>
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span>Describe what you've already tried</li>
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span>Include error messages verbatim</li>
                <li className="flex items-start gap-1.5"><span className="text-primary mt-0.5">→</span>Mention your language and framework versions</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary" /> AI Pre‑check
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={runAiPreCheck}
                  disabled={aiChecking}
                  className="h-7 px-2 text-xs"
                >
                  {aiChecking ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  {aiChecking ? 'Checking...' : 'Run check'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Our AI will review your question for clarity, completeness, and common pitfalls.
              </p>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${aiChecking ? 'bg-yellow-500 animate-pulse' : 'bg-accent'}`} />
                <span className="text-xs text-accent">
                  {aiChecking ? 'AI is analysing...' : 'AI review ready'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </DashboardPageWrapper>
  );
}