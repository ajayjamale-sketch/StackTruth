import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardPageWrapper from '@/components/layout/DashboardPageWrapper';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  GitBranch, Shield, AlertTriangle, CheckCircle2,
  Info, ArrowLeft, Code2, Play, MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

const mockReviews: Record<string, any> = {
  '1': {
    title: 'Auth middleware refactor',
    lang: 'TypeScript',
    score: 87,
    status: 'Reviewed',
    date: '2d ago',
    author: 'Sarah K.',
    code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    // BUG: Generic error logging might leak token details
    console.error(err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};`,
    issues: [
      { type: 'warning', icon: AlertTriangle, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', line: 'L16', title: 'Generic Error Logging', message: 'Logging raw JWT verification errors can lead to token leakage in server logs. Strip sensitive information before logging.' },
      { type: 'success', icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10 border-green-500/20', line: 'L6-8', title: 'Good null check', message: 'Correctly handling missing authorization headers.' },
      { type: 'info', icon: Info, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', line: 'L1', title: 'Consider custom types', message: 'Consider extending the Express Request type globally rather than mutating it inline for better type safety.' }
    ]
  },
  '2': {
    title: 'Database query optimizer',
    lang: 'Python',
    score: 74,
    status: 'Pending',
    date: '1w ago',
    author: 'Marcus L.',
    code: `import sqlite3

def get_user_records(user_id):
    # Connect to the database
    conn = sqlite3.connect('app.db')
    cursor = conn.cursor()
    
    # Inefficient: Querying inside a loop instead of JOIN or IN clause
    results = []
    cursor.execute("SELECT order_id FROM user_orders WHERE user_id = ?", (user_id,))
    order_ids = cursor.fetchall()
    
    for order in order_ids:
        cursor.execute("SELECT * FROM order_details WHERE order_id = ?", (order[0],))
        details = cursor.fetchone()
        results.append(details)
        
    conn.close()
    return results`,
    issues: [
      { type: 'error', icon: AlertTriangle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10 border-red-500/20', line: 'L13-16', title: 'N+1 Query Problem', message: 'Querying inside a loop results in an N+1 query problem, severely impacting performance. Use a JOIN instead: SELECT d.* FROM order_details d JOIN user_orders o ON d.order_id = o.order_id WHERE o.user_id = ?' },
      { type: 'warning', icon: Shield, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', line: 'L4', title: 'Connection not closed on error', message: 'If an exception occurs during execution, the database connection will remain open. Use a context manager (with sqlite3.connect(...) as conn:) to ensure safe cleanup.' },
      { type: 'info', icon: Info, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', line: 'L18', title: 'Missing Type Hints', message: 'Consider adding type hints to function arguments and return types to improve code readability and safety.' }
    ]
  },
  '3': {
    title: 'Redis cache implementation',
    lang: 'Go',
    score: 92,
    status: 'Reviewed',
    date: '2w ago',
    author: 'Alex C.',
    code: `package cache

import (
	"context"
	"encoding/json"
	"time"

	"github.com/go-redis/redis/v8"
)

type Cache struct {
	client *redis.Client
}

func NewCache(addr string) *Cache {
	rdb := redis.NewClient(&redis.Options{
		Addr: addr,
	})
	return &Cache{client: rdb}
}

func (c *Cache) SetUser(ctx context.Context, key string, user interface{}) error {
	val, err := json.Marshal(user)
	if err != nil {
		return err
	}
	
	// Cache for 1 hour
	return c.client.Set(ctx, key, val, time.Hour).Err()
}`,
    issues: [
      { type: 'success', icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10 border-green-500/20', line: 'L23', title: 'Proper Error Handling', message: 'Good job returning the marshal error explicitly instead of swallowing it.' },
      { type: 'success', icon: CheckCircle2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10 border-green-500/20', line: 'L22', title: 'Use of Context', message: 'Passing context to Redis commands ensures proper cancellation and timeout handling.' },
      { type: 'warning', icon: AlertTriangle, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', line: 'L16-18', title: 'Hardcoded Options', message: 'Consider allowing more Redis options (e.g., Password, DB) to be passed into NewCache rather than hardcoding only Addr.' }
    ]
  }
};

export default function CodeReviewDetail() {
  useScrollToTop();
  const { id } = useParams();
  
  const [commentOpen, setCommentOpen] = useState(false);
  const [autoFixOpen, setAutoFixOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [commentText, setCommentText] = useState('');

  const review = mockReviews[id as string] || {
    title: 'Database query optimizer',
    lang: 'Python',
    score: 74,
    status: 'Pending',
    date: '1w ago',
    author: 'Unknown',
    code: '# Code content unavailable',
    issues: []
  };

  return (
    <DashboardPageWrapper activeTab="reviews">
      <ScrollToTop />

      {/* Header */}
      <div className="pt-20 pb-6 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <GitBranch className="w-6 h-6 text-primary" /> {review.title}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Submitted by {review.author} · {review.date}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="secondary" className="px-3 py-1 text-sm">{review.lang}</Badge>
              <Badge className={`px-3 py-1 text-sm ${review.status === 'Reviewed' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20'}`}>
                {review.status}
              </Badge>
              <div className={`ml-2 text-2xl font-bold ${review.score >= 85 ? 'text-accent' : review.score >= 70 ? 'text-primary' : 'text-yellow-600 dark:text-yellow-400'}`}>
                {review.score}/100
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Viewer Section */}
          <div className="bg-card border border-border rounded-xl overflow-hidden h-[600px] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Source Code</span>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-zinc-950 text-zinc-300 font-mono text-sm leading-relaxed whitespace-pre">
              {review.code}
            </div>
          </div>

          {/* Review Results Section */}
          <div className="bg-card border border-border rounded-xl overflow-hidden h-[600px] flex flex-col">
            <div className="px-5 py-4 border-b border-border bg-muted/30">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" /> Analysis Results
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {review.issues.length > 0 ? (
                review.issues.map((item: any, idx: number) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-4 border-l-4 ${
                        item.type === 'error' ? 'border-l-red-500' : 
                        item.type === 'warning' ? 'border-l-yellow-500' : 
                        item.type === 'success' ? 'border-l-green-500' : 
                        'border-l-blue-500'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 mt-0.5 border`}>
                          <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold">{item.title}</span>
                            <Badge variant="secondary" className="text-[10px] font-mono px-1.5 py-0">
                              {item.line}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                            {item.message}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 text-xs hover:bg-muted transition-colors" 
                              onClick={() => { setSelectedIssue(item); setCommentOpen(true); }}
                            >
                              <MessageSquare className="w-3 h-3 mr-1" /> Comment
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 text-xs bg-primary/5 text-primary hover:bg-primary border-primary/20 hover:text-primary-foreground transition-colors" 
                              onClick={() => { setSelectedIssue(item); setAutoFixOpen(true); }}
                            >
                              <Play className="w-3 h-3 mr-1" /> Auto-Fix
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-muted-foreground flex flex-col items-center justify-center h-full">
                  <CheckCircle2 className="w-12 h-12 text-accent opacity-50 mb-3" />
                  <p>No issues found in this code review.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={commentOpen} onOpenChange={setCommentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Comment</DialogTitle>
            <DialogDescription>
              Discuss this issue: "{selectedIssue?.title}" on {selectedIssue?.line}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              placeholder="Type your comment here..." 
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setCommentOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success('Comment posted successfully!');
              setCommentOpen(false);
              setCommentText('');
            }}>Post Comment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={autoFixOpen} onOpenChange={setAutoFixOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply Auto-Fix</DialogTitle>
            <DialogDescription>
              StackTruth AI will automatically generate and apply a fix for: "{selectedIssue?.title}".
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Play className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              This will create a new pull request with the suggested changes for your review.
            </p>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setAutoFixOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success('Auto-fix applied! Check your PRs.');
              setAutoFixOpen(false);
            }}>Apply Fix</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </DashboardPageWrapper>
  );
}
