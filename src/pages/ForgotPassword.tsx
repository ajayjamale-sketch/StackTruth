// ForgotPassword.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Code2, ArrowRight, Loader2, ArrowLeft, Mail } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useScrollToTop';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  useScrollToTop();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentTo, setSentTo] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLoading(false);
    setSentTo(data.email);
    setSent(true);
    toast.success('Password reset link sent!');
  };

  const handleDifferentEmail = () => {
    setSent(false);
    setSentTo('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">
              Stack<span className="text-primary">Truth</span>
            </span>
          </Link>

          {!sent ? (
            <>
              <h1 className="text-2xl font-bold mb-2">Forgot your password?</h1>
              <p className="text-muted-foreground text-sm">
                No worries. Enter your email and we will send a reset link.
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Check your email</h1>
              <p className="text-muted-foreground text-sm">
                We sent a password reset link to{' '}
                <span className="text-foreground font-medium">{sentTo}</span>
              </p>
            </>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {!sent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 h-11"
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</>
                ) : (
                  <>Send Reset Link <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm text-center">
                <p className="text-foreground">
                  Link expires in <span className="font-semibold text-accent">15 minutes</span>.
                </p>
                <p className="text-muted-foreground mt-1">
                  Check your spam folder if you do not see it.
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleDifferentEmail}
              >
                Try a different email
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}