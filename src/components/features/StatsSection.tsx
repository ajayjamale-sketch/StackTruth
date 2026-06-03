import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  desc: string;
  color: string;
}

const stats: Stat[] = [
  { value: 180000, suffix: 'K+', label: 'Active Developers', desc: 'Engineers from 40+ countries', color: 'from-blue-500 to-blue-600' },
  { value: 2400000, suffix: 'M+', label: 'Questions Solved', desc: 'Validated technical answers', color: 'from-green-500 to-green-600' },
  { value: 94000, suffix: 'K+', label: 'Code Reviews', desc: 'AI + peer reviewed code', color: 'from-purple-500 to-purple-600' },
  { value: 4200, suffix: '+', label: 'Expert Mentors', desc: 'Verified technical experts', color: 'from-orange-500 to-orange-600' },
];

interface AnimatedNumberProps {
  target: number;
  suffix: string;
}

function AnimatedNumber({ target, suffix }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          intervalRef.current = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              if (intervalRef.current) clearInterval(intervalRef.current);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [target, started]);

  // Format the number with appropriate suffix (k, M) and add the provided suffix
  const formatNumber = (num: number, targetValue: number, suffixStr: string): string => {
    if (targetValue >= 1_000_000) {
      const formatted = (num / 1_000_000).toFixed(1).replace(/\.0$/, '');
      return `${formatted}M${suffixStr.replace('M+', '+')}`;
    }
    if (targetValue >= 1_000) {
      const formatted = Math.floor(num / 1_000);
      return `${formatted}K${suffixStr.replace('K+', '+')}`;
    }
    return `${num}${suffixStr}`;
  };

  const display = formatNumber(count, target, suffix);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold text-foreground">
      {display}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Platform by the numbers
          </h2>
          <p className="text-muted-foreground">Real metrics from a real community of developers</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="relative bg-card border border-border rounded-2xl p-6 text-center overflow-hidden group hover:border-primary/30 transition-all hover:-translate-y-1 focus-within:ring-2 focus-within:ring-primary/50"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.color} opacity-60`}
                aria-hidden="true"
              />
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              <p className="text-foreground font-semibold mt-2 mb-1">{stat.label}</p>
              <p className="text-muted-foreground text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}