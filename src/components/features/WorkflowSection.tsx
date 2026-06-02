import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Search, Zap, FileText, Tag, Star, TrendingUp } from 'lucide-react';

const workflows = [
  { step: '01', title: 'Ask Your Question', desc: 'Write your question with code snippets, tags, and markdown formatting. The richer your question, the better the answers.', icon: Zap, color: 'text-blue-400' },
  { step: '02', title: 'AI Pre-Analysis', desc: 'Our AI engine analyzes your question for clarity, searches for duplicate solutions, and suggests relevant knowledge base articles.', icon: Search, color: 'text-purple-400' },
  { step: '03', title: 'Expert Review & Answers', desc: 'Verified experts and community members provide detailed, validated answers with code examples and explanations.', icon: Star, color: 'text-yellow-400' },
  { step: '04', title: 'Knowledge Validated', desc: 'Accepted answers are peer-reviewed, scored for quality, and added to the searchable knowledge base for future developers.', icon: FileText, color: 'text-green-400' },
];

export default function WorkflowSection() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Platform Workflow</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            From question to validated answer
            <br /><span className="text-gradient">in minutes, not days</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">A structured, AI-enhanced workflow that ensures every question gets a quality-validated, expert-reviewed answer.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 hidden lg:block" />

          {workflows.map((w, i) => {
            const Icon = w.icon;
            return (
              <div key={i} className="relative text-center">
                <div className={`w-16 h-16 rounded-2xl bg-card border border-border mx-auto mb-5 flex items-center justify-center relative z-10`}>
                  <Icon className={`w-7 h-7 ${w.color}`} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">{w.step}</span>
                </div>
                <h3 className="font-bold mb-2">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/questions/ask">Ask Your First Question <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
