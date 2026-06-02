import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const sections = [
  { title: '1. Acceptance of Terms', content: 'By accessing or using StackTruth (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service. These Terms apply to all visitors, users, and others who access or use the Service.' },
  { title: '2. User Accounts', content: 'When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password and for all activities that occur under your account. You agree to notify us immediately upon becoming aware of any breach of security.' },
  { title: '3. Acceptable Use', content: 'You agree not to use the Service to: post spam, scrape content, harass users, violate intellectual property rights, or post harmful, offensive, or illegal content. We reserve the right to remove content and suspend accounts that violate these terms at our sole discretion.' },
  { title: '4. Content Ownership', content: 'You retain ownership of any intellectual property rights in content you post. By submitting content, you grant StackTruth a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display the content in connection with the Service.' },
  { title: '5. Code of Conduct', content: 'All users must maintain professional conduct. This includes being respectful of other community members, providing accurate technical information, not engaging in targeted harassment, and contributing constructively to discussions. Violations may result in account suspension or termination.' },
  { title: '6. Limitation of Liability', content: 'StackTruth shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service. Our total liability for any claims under these terms shall not exceed the amount you paid us in the past 12 months.' },
  { title: '7. Termination', content: 'We may terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties. Upon termination, your right to use the Service will immediately cease.' },
  { title: '8. Changes to Terms', content: 'We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after changes take effect constitutes your acceptance of the new Terms.' },
];

export default function TermsConditions() {
  useScrollToTop();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToTop />

      <section className="pt-32 pb-12 section-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
          <Badge className="mb-4 bg-primary/20 text-blue-300 border border-primary/30">Legal</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-200/70">Last updated: January 15, 2024</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-primary/20 rounded-xl p-5 mb-8">
            <p className="text-sm leading-relaxed">
              Please read these Terms of Service carefully before using StackTruth. These terms govern your access to and use of our platform. By using StackTruth, you accept these terms in full.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i} className="border-b border-border pb-8 last:border-0">
                <h2 className="text-lg font-bold mb-3">{section.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 bg-muted/30 rounded-xl text-center">
            <p className="text-sm text-muted-foreground">
              Questions about these terms?{' '}
              <Link to="/contact" className="text-primary hover:underline">Contact our legal team</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
