// Documentation.tsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Code2, Terminal, Zap, Shield, Users, GitBranch, Bot, CheckCircle, Lightbulb } from 'lucide-react';

const docsSections = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    items: [
      'What is StackTruth?',
      'Creating an account',
      'Setting up your profile',
      'Asking your first question',
      'Answering & earning reputation'
    ]
  },
  {
    title: 'Features',
    icon: Zap,
    items: [
      'AI‑powered code review',
      'Live coding environment',
      'Community Q&A',
      'Developer mentorship',
      'Reputation & badges'
    ]
  },
  {
    title: 'Code Review',
    icon: GitBranch,
    items: [
      'Submitting code for review',
      'Understanding AI feedback',
      'Requesting human experts',
      'Iterating on reviews',
      'Best practices'
    ]
  },
  {
    title: 'AI Assistant',
    icon: Bot,
    items: [
      'Using the chat interface',
      'Code optimisation prompts',
      'Architecture guidance',
      'Debugging with AI',
      'Limitations & privacy'
    ]
  },
  {
    title: 'Community',
    icon: Users,
    items: [
      'Code of conduct',
      'Reporting issues',
      'Becoming a mentor',
      'Reputation system',
      'Badge progression'
    ]
  }
];

const fullDocs = {
  'Getting Started': {
    description: 'StackTruth is a developer-first platform that combines community Q&A with AI‑powered code review, live collaboration, and skill‑based mentorship.',
    subsections: [
      { title: 'What is StackTruth?', content: 'StackTruth helps engineers solve real‑world coding problems, improve code quality through automated reviews, and grow their technical skills with verified experts. Our platform is trusted by 180,000+ developers worldwide.' },
      { title: 'Creating an account', content: 'Sign up with your email or GitHub account. Verify your email address to unlock all features (asking questions, submitting code reviews, using the AI assistant).' },
      { title: 'Setting up your profile', content: 'Add your tech stack, skills, and GitHub link. A complete profile helps others find you for mentoring and increases trust in your answers.' },
      { title: 'Asking your first question', content: 'Click "Ask Question" from the dashboard. Use a clear title, detailed description, and code blocks. Add up to 5 tags. Our AI will check for clarity before posting.' },
      { title: 'Answering & earning reputation', content: 'Browse the answer queue. Provide thorough, well‑explained solutions. Accepted answers and upvotes increase your reputation, unlocking expert privileges.' }
    ]
  },
  'Features': {
    description: 'StackTruth combines community intelligence with automated AI tools to supercharge your development workflow.',
    subsections: [
      { title: 'AI‑powered code review', content: 'Paste any code snippet and receive instant feedback on security, performance, and style. Our model flags vulnerabilities like SQL injection, weak cryptography, and race conditions.' },
      { title: 'Live coding environment', content: 'Use the collaborative code editor for pair programming, mock interviews, or live debugging with mentors (Premium feature).' },
      { title: 'Community Q&A', content: 'Ask technical questions and get answers from vetted experts. Upvote, downvote, and accept the best solution. All content is moderated for quality.' },
      { title: 'Developer mentorship', content: 'Connect with verified experts in your tech stack. Book one‑on‑one sessions for career guidance, architecture reviews, or deep‑dive debugging.' },
      { title: 'Reputation & badges', content: 'Earn points by providing helpful answers, conducting code reviews, and mentoring. Badges recognise achievements like "Go Expert" or "100 Reviews".' }
    ]
  },
  'Code Review': {
    description: 'Get actionable, automated feedback on your code to catch bugs early and learn best practices.',
    subsections: [
      { title: 'Submitting code for review', content: 'Go to Code Review > Submit Code. Paste your code, select the language, and click "Run AI Review". Our engine scans for security flaws, performance bottlenecks, and style issues.' },
      { title: 'Understanding AI feedback', content: 'Results are categorised as Error, Warning, Info, or Success. Each item includes a line reference and a clear explanation with a fix example.' },
      { title: 'Requesting human experts', content: 'If the AI analysis is insufficient, request a manual review from a verified expert. Experts typically respond within 2 hours.' },
      { title: 'Iterating on reviews', content: 'Fix the issues and resubmit. You can track the review history and see your code quality improve over time.' },
      { title: 'Best practices', content: 'Include only the relevant code snippet, provide context in comments, and always sanitise sensitive data before submitting.' }
    ]
  },
  'AI Assistant': {
    description: 'An intelligent chat assistant trained on millions of engineering Q&As, docs, and real‑world code.',
    subsections: [
      { title: 'Using the chat interface', content: 'Type your question naturally – e.g., "How do I implement JWT refresh tokens in Node.js?". The assistant provides step‑by‑step explanations and code examples.' },
      { title: 'Code optimisation prompts', content: 'Paste a function and ask for performance improvements. The assistant suggests more efficient algorithms, better data structures, or async patterns.' },
      { title: 'Architecture guidance', content: 'Describe your system requirements, and the assistant can propose a high‑level design, technology choices, and trade‑offs.' },
      { title: 'Debugging with AI', content: 'Share error messages and relevant code. The assistant helps pinpoint the cause and suggests fixes.' },
      { title: 'Limitations & privacy', content: 'The AI does not store your conversations permanently. However, avoid pasting proprietary code or secrets. Always verify critical answers manually.' }
    ]
  },
  'Community': {
    description: 'StackTruth is built on mutual respect, knowledge sharing, and continuous improvement.',
    subsections: [
      { title: 'Code of conduct', content: 'Be respectful, inclusive, and constructive. No harassment, spam, or self‑promotion. Help maintain a safe learning environment for all skill levels.' },
      { title: 'Reporting issues', content: 'Use the "Report" button on any question, answer, or comment. Moderators review reports within 24 hours.' },
      { title: 'Becoming a mentor', content: 'Users with 2000+ reputation can apply for the Mentor program. Mentors lead live sessions, review code, and guide junior developers.' },
      { title: 'Reputation system', content: 'Reputation is earned through accepted answers (+15), upvotes (+10), helpful flags (+2), and mentoring (+50 per session). Downvotes and flags reduce reputation.' },
      { title: 'Badge progression', content: 'Badges unlock at different reputation thresholds: Supporter (100), Contributor (500), Expert (2000), Master (10000). Each badge grants new platform abilities.' }
    ]
  }
};

export default function Documentation() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Hero */}
      <div className="pt-20 pb-6 border-b border-border bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary-foreground dark:text-blue-300 border border-primary/30">
            Documentation
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            StackTruth Developer Guide
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about our platform – from getting started to advanced features.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-4 sticky top-24">
              <h3 className="font-semibold text-sm mb-3">Contents</h3>
              <div className="space-y-1">
                {docsSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <a
                      key={section.title}
                      href={`#${section.title.toLowerCase().replace(/\s/g, '-')}`}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {section.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Intro Card */}
            <div className="bg-gradient-to-br from-primary/5 via-background to-background border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Welcome to StackTruth
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our mission is to raise the standard for developer knowledge sharing. 
                Whether you're debugging a production issue, learning a new framework, 
                or seeking expert mentorship, StackTruth provides the tools and community 
                you need to succeed.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                  <Link to="/register">Get Started Free <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/features">Explore Features</Link>
                </Button>
              </div>
            </div>

            {/* Detailed Sections */}
            {docsSections.map((section) => {
              const doc = fullDocs[section.title as keyof typeof fullDocs];
              if (!doc) return null;
              const sectionId = section.title.toLowerCase().replace(/\s/g, '-');
              return (
                <div key={section.title} id={sectionId} className="scroll-mt-20">
                  <div className="flex items-center gap-2 mb-3">
                    <section.icon className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold">{section.title}</h2>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 border-l-2 border-primary/30 pl-3">
                    {doc.description}
                  </p>
                  <div className="grid gap-4">
                    {doc.subsections.map((sub) => (
                      <div key={sub.title} className="bg-card border border-border rounded-lg p-4">
                        <h3 className="font-semibold text-sm mb-1 flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-accent" />
                          {sub.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {sub.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Quick Links Footer */}
            <div className="bg-muted/30 border border-border rounded-xl p-6 text-center">
              <h3 className="font-semibold mb-2">Still have questions?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Reach out to our support team or join our community Discord.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href="https://discord.gg/stacktruth" target="_blank" rel="noopener noreferrer">Join Discord</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}