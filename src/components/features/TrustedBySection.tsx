export default function TrustedBySection() {
  const companies = [
    'Stripe', 'Vercel', 'Linear', 'Notion', 'GitHub', 'Figma', 'Cloudflare', 'PlanetScale',
  ];

  return (
    <section className="py-14 section-dark border-b border-surface-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest font-semibold">
          Trusted by engineers at world-class companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {companies.map(company => (
            <span key={company} className="text-lg font-bold text-muted-foreground/60 hover:text-foreground transition-colors cursor-default select-none">
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
