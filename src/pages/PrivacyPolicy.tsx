import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, ask a question, post an answer, or contact us for support. This includes: your name and email address; username and password; profile information such as bio, location, and skills; code snippets and technical content you submit; and any other information you choose to provide. We also automatically collect certain information about your device and how you interact with our Services.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to: provide, maintain, and improve our Services; process transactions and send related information; send technical notices, updates, security alerts, and support messages; respond to your comments and questions; monitor and analyze trends, usage, and activities in connection with our Services; detect, investigate, and prevent fraudulent transactions and other illegal activities; and personalize and improve your experience.`,
  },
  {
    title: '3. Sharing of Information',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with: third-party vendors and service providers that perform services on our behalf; other users when you voluntarily disclose information in public areas of the service; and when required by law, subpoena, or other legal process. We may also share aggregated or de-identified information that cannot reasonably be used to identify you.`,
  },
  {
    title: '4. Data Security',
    content: `We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. StackTruth is SOC 2 Type II certified and undergoes regular third-party security audits. All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We implement strict access controls and conduct regular security training for all employees.`,
  },
  {
    title: '5. Cookies and Tracking Technologies',
    content: `We use cookies and similar tracking technologies to track activity on our Services and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services. We use functional cookies (required for core functionality), analytics cookies (to understand usage patterns), and preference cookies (to remember your settings).`,
  },
  {
    title: '6. Data Retention',
    content: `We retain your information for as long as your account is active or as needed to provide you services. You may request deletion of your data at any time through your account settings or by contacting us. Upon deletion, we will remove your personal information from our active databases within 30 days, though some information may be retained in backup archives for up to 90 days.`,
  },
  {
    title: '7. Your Rights and Choices',
    content: `Depending on your location, you may have certain rights regarding your personal information, including: the right to access the personal information we hold about you; the right to request correction of inaccurate data; the right to request deletion of your data; the right to opt out of marketing communications; and the right to data portability. To exercise these rights, contact us at privacy@stacktruth.dev.`,
  },
  {
    title: '8. Children\'s Privacy',
    content: `StackTruth is not directed to children under 13 years of age, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information of a child under 13, we will take steps to delete such information as quickly as possible.`,
  },
  {
    title: '9. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email (if you have provided one) or by posting a prominent notice on our website prior to the change becoming effective. We encourage you to review this Privacy Policy periodically for the latest information on our privacy practices.`,
  },
  {
    title: '10. Contact Us',
    content: `If you have any questions about this Privacy Policy or our privacy practices, please contact us at privacy@stacktruth.dev or write to us at: StackTruth, Inc., 123 Developer Way, San Francisco, CA 94102, United States.`,
  },
];

export default function PrivacyPolicy() {
  useScrollToTop();
  return (
    <div className="min-h-screen">
      <Navbar />
      <ScrollToTop />

      {/* Hero */}
      <section className="pt-32 pb-12 section-dark dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <Badge className="mb-4 bg-primary/20 text-blue-300 border border-primary/30">Legal</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-200/70">Last updated: January 15, 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-primary/20 rounded-xl p-5 mb-8">
            <p className="text-sm leading-relaxed">
              At StackTruth, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this carefully. If you disagree with its terms, please discontinue use of the platform immediately.
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
              Have privacy questions?{' '}
              <Link to="/contact" className="text-primary hover:underline">Contact our privacy team</Link>
              {' '}or email{' '}
              <a href="mailto:privacy@stacktruth.dev" className="text-primary hover:underline">privacy@stacktruth.dev</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
