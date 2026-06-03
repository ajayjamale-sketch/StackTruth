import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, Github, Twitter, Linkedin, Loader2, CheckCircle, MapPin, Clock, Zap } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  category: z.string().min(1, 'Select a category'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});
type FormData = z.infer<typeof schema>;

export default function Contact() {
  useScrollToTop();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log('Contact form:', data);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    reset();
    toast.success('Message sent! We will respond within 24 hours.');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollToTop />

      {/* Hero */}
      <section className="pt-32 pb-16 section-dark relative overflow-hidden dark">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_70%)]" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <Badge className="mb-5 bg-primary/20 text-blue-300 border border-primary/30">Contact Us</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get in touch</h1>
          <p className="text-xl text-slate-200/80">We respond to every message within 24 hours, usually much faster.</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">We are here to help</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Whether you have a product question, billing issue, or just want to say hello — reach out and we will get back to you fast.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, title: 'Email Us', value: 'hello@stacktruth.dev', sub: 'For general inquiries' },
                  { icon: MessageSquare, title: 'Support', value: 'support@stacktruth.dev', sub: 'For product & billing' },
                  { icon: MapPin, title: 'Location', value: 'San Francisco, CA', sub: 'United States' },
                  { icon: Clock, title: 'Response Time', value: 'Under 24 hours', sub: 'Usually within 2 hours' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3 p-4 bg-card border border-border rounded-xl">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-sm text-foreground">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <p className="text-sm font-medium mb-3">Follow us</p>
                <div className="flex gap-2">
                  {[Github, Twitter, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="bg-card border border-border rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message sent!</h3>
                  <p className="text-muted-foreground mb-6">Thanks for reaching out. We will get back to you within 24 hours.</p>
                  <Button variant="outline" onClick={() => setSent(false)}>Send another message</Button>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-2xl p-8">
                  <h3 className="text-lg font-bold mb-6">Send us a message</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Full Name</Label>
                        <Input placeholder="Alex Chen" {...register('name')} className={errors.name ? 'border-destructive' : ''} />
                        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <Label className="text-sm font-medium mb-1.5 block">Email Address</Label>
                        <Input type="email" placeholder="alex@company.com" {...register('email')} className={errors.email ? 'border-destructive' : ''} />
                        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Category</Label>
                      <select {...register('category')} className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                        <option value="">Select a category...</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Product Support</option>
                        <option value="billing">Billing</option>
                        <option value="enterprise">Enterprise Sales</option>
                        <option value="partnership">Partnership</option>
                        <option value="press">Press & Media</option>
                      </select>
                      {errors.category && <p className="text-xs text-destructive mt-1">{errors.category.message}</p>}
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Subject</Label>
                      <Input placeholder="How can we help?" {...register('subject')} className={errors.subject ? 'border-destructive' : ''} />
                      {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-1.5 block">Message</Label>
                      <Textarea placeholder="Tell us more about your question or issue..." rows={5} {...register('message')} className={errors.message ? 'border-destructive' : ''} />
                      {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90" disabled={loading}>
                      {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : <><Zap className="w-4 h-4 mr-2" />Send Message</>}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ID for status */}
      <section id="status" className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
            <span className="text-sm text-accent font-medium">All systems operational — 99.9% uptime</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
