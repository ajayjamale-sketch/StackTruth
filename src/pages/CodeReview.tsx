// CodeReview.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  GitBranch, Shield, Zap, AlertTriangle, CheckCircle2,
  Info, Upload, Code2, Loader2, Trash2
} from 'lucide-react';

const languages = ['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Java', 'C++', 'Ruby', 'PHP', 'Swift'];

const sampleCode = `// Sample: Insecure authentication function
async function login(username: string, password: string) {
  const query = \`SELECT * FROM users WHERE username = '\${username}'\`;
  const user = await db.query(query); // SQL injection vulnerability!
  
  if (user && user.password === password) { // Plain text comparison!
    const token = Math.random().toString(); // Weak token generation
    return { token, user };
  }
  return null;
}`;

const reviewResults = [
  { type: 'error', icon: Shield, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10 border-red-500/20', line: 'L3', title: 'SQL Injection Vulnerability', message: 'String interpolation in SQL query allows malicious input. Use parameterized queries: db.query("SELECT * FROM users WHERE username = $1", [username])' },
  { type: 'error', icon: Shield, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10 border-red-500/20', line: 'L6', title: 'Insecure Password Comparison', message: 'Never store or compare plain-text passwords. Use bcrypt.compare() or argon2.verify() for secure hash comparison.' },
  { type: 'warning', icon: AlertTriangle, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', line: 'L8', title: 'Weak Token Generation', message: 'Math.random() is not cryptographically secure. Use crypto.randomBytes(32).toString("hex") or JWT with proper signing.' },
  { type: 'info', icon: Info, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', line: 'L1-12', title: 'Missing Rate Limiting', message: 'Authentication endpoints should implement rate limiting to prevent brute force attacks. Consider using express-rate-limit.' },
  { type: 'success', icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10 border-green-500/20', line: 'L5', title: 'Null Check Present', message: 'Good: checking for user existence before accessing properties. Consider also handling database errors.' },
];

export default function CodeReview() {
  useScrollToTop();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('TypeScript');
  const [reviewed, setReviewed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReview = async () => {
    if (!code.trim()) {
      toast.error('Please enter code to review');
      return;
    }
    setLoading(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    setLoading(false);
    setReviewed(true);
    toast.success('AI code review complete!');
  };

  const loadSample = () => {
    setCode(sampleCode);
    setReviewed(false);
    toast.success('Sample code loaded. Click "Run AI Review" to analyze it.');
  };

  const clearCode = () => {
    setCode('');
    setReviewed(false);
    toast.info('Code cleared');
  };

  const exportReport = () => {
    try {
      const reportText = reviewResults.map(r => 
        `[${r.type.toUpperCase()}] ${r.title} (Line ${r.line})\n${r.message}`
      ).join('\n\n');
      const blob = new Blob([reportText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code-review-report-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Report exported successfully!');
    } catch (error) {
      toast.error('Failed to export report');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      {/* Header */}
      <div className="pt-20 pb-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <GitBranch className="w-6 h-6 text-primary" /> Code Review Engine
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                AI-powered security, performance, and quality analysis
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={loadSample}>
                <Upload className="w-4 h-4 mr-2" /> Load Sample
              </Button>
              <Button variant="outline" onClick={clearCode} disabled={loading}>
                <Trash2 className="w-4 h-4 mr-2" /> Clear
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={handleReview} disabled={loading}>
                {loading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                ) : (
                  <><Zap className="w-4 h-4 mr-2" /> Run AI Review</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Input Section */}
          <div>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Your Code</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="text-xs px-2 py-1 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-primary/30"
                  >
                    {languages.map((lang) => (
                      <option key={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (reviewed) setReviewed(false);
                }}
                placeholder="Paste your code here for AI review...

// Example: TypeScript, Python, Rust, Go, etc.
// Click 'Load Sample' to see a review of insecure code."
                rows={20}
                className="border-0 rounded-none font-mono text-xs focus:ring-0 resize-none bg-[hsl(var(--code-bg))]"
              />
            </div>
          </div>

          {/* Review Results Section */}
          <div>
            {!reviewed && !loading ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center h-full flex flex-col items-center justify-center">
                <GitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
                <h3 className="font-semibold mb-2">Ready to Review</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Paste your code on the left and click "Run AI Review" to get instant analysis.
                </p>
                <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
                  {['Security vulnerabilities', 'Performance issues', 'Code quality', 'Best practices'].map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : loading ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center h-full flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary mx-auto mb-4 animate-spin" />
                <h3 className="font-semibold mb-2">AI is reviewing your code...</h3>
                <p className="text-sm text-muted-foreground">
                  Analyzing security, performance, and quality metrics
                </p>
                <div className="mt-4 space-y-1.5 w-full max-w-xs">
                  {[
                    'Scanning for vulnerabilities...',
                    'Checking performance...',
                    'Analyzing code quality...',
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="w-3 h-3 animate-spin text-primary flex-shrink-0" />
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Score Header */}
                <div className="px-5 py-4 border-b border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">Review Complete</h3>
                    <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                      3 Critical Issues
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Security', score: 24, color: 'bg-red-500' },
                      { label: 'Performance', score: 68, color: 'bg-yellow-500' },
                      { label: 'Quality', score: 71, color: 'bg-blue-500' },
                    ].map((metric) => (
                      <div key={metric.label} className="text-center">
                        <div
                          className={`text-2xl font-bold ${
                            metric.score < 50
                              ? 'text-red-600 dark:text-red-400'
                              : metric.score < 75
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-green-600 dark:text-green-400'
                          }`}
                        >
                          {metric.score}
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                        <div className="h-1 bg-muted rounded-full">
                          <div
                            className={`h-full ${metric.color} rounded-full transition-all duration-500`}
                            style={{ width: `${metric.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Issues List */}
                <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                  {reviewResults.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        className={`p-4 border-l-4 ${
                          item.type === 'error'
                            ? 'border-l-red-500'
                            : item.type === 'warning'
                            ? 'border-l-yellow-500'
                            : item.type === 'success'
                            ? 'border-l-green-500'
                            : 'border-l-blue-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5 border`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold">{item.title}</span>
                              <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0">
                                {item.line}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer with Export */}
                <div className="px-5 py-3 border-t border-border bg-muted/20 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    Analyzed in 2.3s · 5 issues found
                  </span>
                  <Button size="sm" variant="outline" className="text-xs h-7" onClick={exportReport}>
                    Export Report
                  </Button>
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