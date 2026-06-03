import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import HeroSection from '@/components/features/HeroSection';
import TrustedBySection from '@/components/features/TrustedBySection';
import StatsSection from '@/components/features/StatsSection';
import FeaturesSection from '@/components/features/FeaturesSection';
import QAPreviewSection from '@/components/features/QAPreviewSection';
import CodeReviewPreview from '@/components/features/CodeReviewPreview';
import DeveloperToolsPreview from '@/components/features/DeveloperToolsPreview';
import ReputationSection from '@/components/features/ReputationSection';
import TeamCollabSection from '@/components/features/TeamCollabSection';
import JobMarketplaceSection from '@/components/features/JobMarketplaceSection';
import TestimonialsSection from '@/components/features/TestimonialsSection';
import CTABanner from '@/components/features/CTABanner';

export default function Index() {
  useScrollToTop();
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <ScrollToTop />
      <HeroSection />
      <TrustedBySection />
      <StatsSection />
      <FeaturesSection />
      <QAPreviewSection />
      <CodeReviewPreview />
      <DeveloperToolsPreview />
      <ReputationSection />
      <TeamCollabSection />
      <JobMarketplaceSection />
      <TestimonialsSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
