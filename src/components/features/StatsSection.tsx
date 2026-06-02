import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 180000, suffix: 'K+', label: 'Active Developers', desc: 'Engineers from 40+ countries', color: 'from-blue-500 to-blue-600' },
  { value: 2400000, suffix: 'M+', label: 'Questions Solved', desc: 'Validated technical answers', color: 'from-green-500 to-green-600' },
  { value: 94000, suffix: 'K+', label: 'Code Reviews', desc: 'AI + peer reviewed code', color: 'from-purple-500 to-purple-600' },
  { value: 4200, suffix: '+', label: 'Expert Mentors', desc: 'Verified technical experts', color: 'from-orange-500 to-orange-600' },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  const display = target >= 1000000
    ? (count / 1000000).toFixed(1).replace('.0', '') + suffix
    : target >= 1000
    ? (count / 1000).toFixed(0) + suffix
    : count + suffix;

  return <div ref={ref} className="text-4xl sm:text-5xl font-bold text-white">{display}</div>;
}

export default function StatsSection() {
  return (
    <section className="py-20 section-dark-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Platform by the numbers</h2>
          <p className="text-slate-300/70">Real metrics from a real community of developers</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center overflow-hidden group hover:border-white/20 transition-all hover:-translate-y-1">
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.color} opacity-60`} />
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              <p className="text-white font-semibold mt-2 mb-1">{stat.label}</p>
              <p className="text-slate-300/60 text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
