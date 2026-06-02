import { useScrollToTopButton } from '@/hooks/useTheme';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const { visible, scrollToTop } = useScrollToTopButton();

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all hover:scale-110 btn-glow"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
