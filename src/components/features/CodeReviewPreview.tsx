import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

const reviewItems = [
  { type: 'error', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', line: 'L14', message: 'Missing transaction rollback on exception — can cause data corruption under load' },
  { type: 'warning', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10', line: 'L22', message: 'N+1 query detected. Consider using JOIN or DataLoader for batch resolution' },
  { type: 'success', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10', line: 'L8', message: 'Good use of parameterized queries. SQL injection protection confirmed' },
  { type: 'info', icon: Shield, color: 'text-blue-400', bg: 'bg-blue-500/10', line: 'L31', message: 'Consider adding connection pool timeout for high-traffic environments' },
];

export default function CodeReviewPreview() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Preview Panel */}
          <div className="order-2 lg:order-1">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  <span className="text-xs text-muted-foreground ml-2 font-mono">db-service.ts</span>
                </div>
                <Badge className="text-xs bg-primary/10 text-primary border-primary/20">AI Review Complete</Badge>
              </div>

              {/* Score Bar */}
              <div className="px-5 py-4 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">Code Quality Score</span>
                  <span className="text-2xl font-bold text-primary">74<span className="text-sm text-muted-foreground">/100</span></span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-primary rounded-full" style={{ width: '74%' }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                  <span>Security: 82</span>
                  <span>Performance: 68</span>
                  <span>Readability: 91</span>
                </div>
              </div>

              {/* Review Items */}
              <div className="divide-y divide-border">
                {reviewItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex gap-3 p-4 hover:bg-muted/30 transition-colors">
                      <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <Badge variant="secondary" className="text-xs font-mono px-1.5 py-0">{item.line}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-5 py-3 border-t border-border flex justify-between items-center">
                <span className="text-xs text-muted-foreground">4 issues found · 2 critical</span>
                <Button size="sm" variant="outline" className="text-xs h-7" asChild>
                  <Link to="/code-review">Full Report</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Code Review Engine</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">
              AI that reviews code
              <br />
              <span className="text-gradient">like a senior engineer</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Submit any code and receive instant, detailed feedback. Our AI engine catches security vulnerabilities, performance bottlenecks, and code quality issues with line-by-line annotations.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: 'Security Analysis', value: '99.2%', sub: 'vulnerability detection' },
                { label: 'Avg Review Time', value: '<3s', sub: 'instant results' },
                { label: 'Code Quality', value: '40+', sub: 'metrics analyzed' },
                { label: 'Languages', value: '40+', sub: 'fully supported' },
              ].map(item => (
                <div key={item.label} className="bg-card border border-border rounded-xl p-3">
                  <div className="text-xl font-bold text-primary">{item.value}</div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.sub}</div>
                </div>
              ))}
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/code-review">Try Code Review <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
