import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  ArrowUp, ArrowDown, CheckCircle, MessageSquare,
  Share2, Bookmark, Flag, Clock, Eye, User
} from 'lucide-react';
import { mockQuestions } from '@/lib/mockData';

const answers = [
  {
    id: 'a1',
    content: `The key to handling concurrent transactions in PostgreSQL with TypeScript is using the \`pg\` client properly with transaction isolation levels.

Here's a production-ready pattern:

\`\`\`typescript
import { Pool, PoolClient } from 'pg';

async function withTransaction<T>(
  pool: Pool,
  fn: (client: PoolClient) => Promise<T>,
  isolationLevel: 'SERIALIZABLE' | 'REPEATABLE READ' | 'READ COMMITTED' = 'READ COMMITTED'
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query(\`BEGIN ISOLATION LEVEL \${isolationLevel}\`);
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
\`\`\`

For high-concurrency scenarios, use \`SERIALIZABLE\` isolation with retry logic for serialization failures.`,
    author: { name: 'Priya Nair', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face', reputation: 18420, badge: 'Expert' },
    votes: 38, accepted: true, createdAt: '2024-01-20T12:00:00Z',
  },
  {
    id: 'a2',
    content: `Additionally, for TypeScript users I recommend creating a typed transaction wrapper that uses generics properly. The key issues I see in most implementations are:

1. **Missing ROLLBACK on client.release()** — always release in finally
2. **Not handling deadlock retries** — implement exponential backoff
3. **Pool exhaustion** — monitor \`pool.totalCount\` and \`pool.waitingCount\`

For Prisma users, use \`prisma.$transaction()\` with the \`isolationLevel\` option — much cleaner API.`,
    author: { name: 'Marcus Lee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face', reputation: 14280, badge: 'Top Reviewer' },
    votes: 22, accepted: false, createdAt: '2024-01-20T14:30:00Z',
  },
];

export default function QuestionDetail() {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const [answerText, setAnswerText] = useState('');
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [bookmarked, setBookmarked] = useState(false);

  const question = mockQuestions.find(q => q.id === id) || mockQuestions[0];

  const handleVote = (itemId: string, dir: 1 | -1) => {
    setVotes(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + dir }));
    toast.success(dir > 0 ? 'Upvoted!' : 'Downvoted');
  };

  const handleAnswer = () => {
    if (!answerText.trim() || answerText.length < 20) {
      toast.error('Answer must be at least 20 characters');
      return;
    }
    toast.success('Answer posted successfully!');
    setAnswerText('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />
      <ScrollToTop />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/questions" className="hover:text-foreground">Questions</Link>
          <span>/</span>
          <span className="text-foreground truncate">{question.title.slice(0, 50)}...</span>
        </div>

        {/* Question */}
        <div className="flex gap-6 mb-8">
          {/* Vote */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <button onClick={() => handleVote('q', 1)} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
              <ArrowUp className="w-5 h-5" />
            </button>
            <span className="text-xl font-bold">{question.votes + (votes['q'] || 0)}</span>
            <button onClick={() => handleVote('q', -1)} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
              <ArrowDown className="w-5 h-5" />
            </button>
            <button
              onClick={() => { setBookmarked(!bookmarked); toast.success(bookmarked ? 'Removed from bookmarks' : 'Bookmarked!'); }}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${bookmarked ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-5">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Asked {new Date(question.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{question.views} views</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{question.answers} answers</span>
            </div>

            <div className="prose prose-sm max-w-none mb-5">
              <p className="text-muted-foreground leading-relaxed">
                I'm working on a high-traffic e-commerce application using Node.js with TypeScript and PostgreSQL. We have multiple services that need to handle concurrent database transactions — especially during checkout where inventory updates, payment records, and order creation must all succeed or all fail atomically.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                I'm seeing occasional data inconsistencies under load testing. What's the recommended pattern for handling concurrent transactions safely with TypeScript and the `pg` library?
              </p>

              {/* Code block */}
              <div className="bg-muted rounded-lg p-4 font-mono text-xs mt-4 overflow-x-auto">
                <pre>{`// Current approach (causing issues)
const client = await pool.connect();
await client.query('BEGIN');
await client.query('UPDATE inventory SET qty = qty - 1 WHERE id = $1', [itemId]);
await client.query('INSERT INTO orders ...');
await client.query('COMMIT');
client.release(); // BUG: not in finally!`}</pre>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {question.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20">{tag}</span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Share2 className="w-3.5 h-3.5" />Share</button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Flag className="w-3.5 h-3.5" />Flag</button>
              </div>
              <div className="flex items-center gap-2.5 bg-primary/5 border border-primary/10 rounded-xl px-3 py-2">
                <img src={question.author.avatar} alt={question.author.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-medium">{question.author.name}</p>
                  <p className="text-xs text-muted-foreground">{question.author.reputation.toLocaleString()} reputation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Answers */}
        <div className="border-t border-border pt-8 mb-8">
          <h2 className="text-xl font-bold mb-6">{answers.length} Answers</h2>
          <div className="space-y-6">
            {answers.map(answer => (
              <div key={answer.id} className={`flex gap-6 pb-6 border-b border-border last:border-0 ${answer.accepted ? 'bg-accent/5 -mx-4 px-4 rounded-xl border border-accent/20' : ''}`}>
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <button onClick={() => handleVote(answer.id, 1)} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                    <ArrowUp className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-bold">{answer.votes + (votes[answer.id] || 0)}</span>
                  <button onClick={() => handleVote(answer.id, -1)} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                    <ArrowDown className="w-5 h-5" />
                  </button>
                  {answer.accepted && (
                    <CheckCircle className="w-6 h-6 text-accent" title="Accepted answer" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {answer.accepted && (
                    <Badge className="mb-3 bg-accent/10 text-accent border-accent/20"><CheckCircle className="w-3 h-3 mr-1" />Accepted Answer</Badge>
                  )}
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap mb-4">
                    {answer.content}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"><Share2 className="w-3 h-3" />Share</button>
                    </div>
                    <div className="flex items-center gap-2.5 bg-card border border-border rounded-xl px-3 py-2">
                      <img src={answer.author.avatar} alt={answer.author.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-medium">{answer.author.name}</p>
                        <div className="flex items-center gap-1">
                          <p className="text-xs text-primary">{answer.author.reputation.toLocaleString()} rep</p>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{answer.author.badge}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Post Answer */}
        <div>
          <h2 className="text-xl font-bold mb-4">Your Answer</h2>
          <div className="bg-card border border-border rounded-xl p-4 mb-3">
            <div className="flex gap-2 mb-2 border-b border-border pb-2">
              {['B', 'I', 'Code', 'Link', 'Quote'].map(f => (
                <button key={f} className="text-xs px-2 py-1 rounded text-muted-foreground hover:bg-muted transition-colors font-mono">{f}</button>
              ))}
            </div>
            <Textarea
              placeholder="Write your answer here. Markdown and code blocks supported. Minimum 20 characters."
              value={answerText}
              onChange={e => setAnswerText(e.target.value)}
              rows={8}
              className="border-0 bg-transparent focus:ring-0 resize-none p-0"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleAnswer} className="bg-primary hover:bg-primary/90">Post Answer</Button>
            <span className="text-xs text-muted-foreground">Be clear, concise, and include code examples where relevant.</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
