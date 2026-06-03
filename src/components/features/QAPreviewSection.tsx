import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const questions = [
  {
    title: 'How to efficiently handle concurrent database transactions in PostgreSQL with TypeScript?',
    tags: ['typescript', 'postgresql', 'concurrency'],
    votes: 42, answers: 7, views: '1.8K',
    author: 'sarah_k', time: '2h ago', accepted: true,
  },
  {
    title: 'Memory leak in React useEffect cleanup with WebSocket connections',
    tags: ['react', 'websocket', 'hooks'],
    votes: 31, answers: 5, views: '920',
    author: 'marcus_l', time: '5h ago', accepted: false,
  },
  {
    title: 'Best practices for implementing CQRS pattern in microservices',
    tags: ['microservices', 'cqrs', 'architecture'],
    votes: 68, answers: 12, views: '3.2K',
    author: 'diana_p', time: '1d ago', accepted: true,
  },
];

export default function QAPreviewSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div>
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              Technical Q&A
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5">
              Get precise answers from
              <br />
              <span className="text-gradient">verified experts</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Ask technical questions with full code support, markdown, and syntax highlighting. Answers are ranked by quality and verified by our AI validation engine — not just upvotes.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Rich markdown editor with code block support',
                'AI-powered answer quality scoring',
                'Expert badges and reputation verification',
                'Tag-based discovery and smart search',
              ].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/questions">
                  Browse Questions <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/questions/ask">Ask a Question</Link>
              </Button>
            </div>
          </div>

          {/* Right column – question previews */}
          <div className="space-y-3">
            {questions.map((question, idx) => (
              <Link
                key={`${question.author}-${question.title}`}
                to="/questions"
                className="block bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all card-hover focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 text-center">
                    <div className={`text-lg font-bold ${question.accepted ? 'text-accent' : 'text-muted-foreground'}`}>
                      {question.votes}
                    </div>
                    <div className="text-xs text-muted-foreground">votes</div>
                    <div
                      className={`mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                        question.accepted
                          ? 'bg-accent/10 text-accent'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {question.answers} ans
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground mb-2 leading-snug line-clamp-2">
                      {question.title}
                    </h4>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {question.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{question.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{question.time}</span>
                      <span aria-hidden="true">·</span>
                      <span>{question.views} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            <Link
              to="/questions"
              className="flex items-center justify-center py-3 text-sm text-primary hover:underline gap-1 focus:outline-none focus:ring-2 focus:ring-primary rounded"
            >
              View all questions <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}