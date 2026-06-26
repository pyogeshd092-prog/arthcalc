import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Calculator, BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Search — ArthCalc',
  description: 'Search for investment calculators, guides, and comparisons on ArthCalc.',
  alternates: { canonical: '/search' },
};

const ALL_ITEMS = [
  // Calculators
  { type: 'Calculator', name: 'FD Calculator', href: '/calculators/fd', tags: ['fixed deposit', 'fd', 'bank'] },
  { type: 'Calculator', name: 'SIP Calculator', href: '/calculators/sip', tags: ['sip', 'mutual fund', 'systematic'] },
  { type: 'Calculator', name: 'PPF Calculator', href: '/calculators/ppf', tags: ['ppf', 'provident fund', 'tax free'] },
  { type: 'Calculator', name: 'NPS Calculator', href: '/calculators/nps', tags: ['nps', 'pension', 'retirement'] },
  { type: 'Calculator', name: 'EPF Calculator', href: '/calculators/epf', tags: ['epf', 'provident fund', 'salary'] },
  { type: 'Calculator', name: 'SSY Calculator', href: '/calculators/ssy', tags: ['ssy', 'sukanya', 'girl child'] },
  { type: 'Calculator', name: 'RD Calculator', href: '/calculators/rd', tags: ['rd', 'recurring deposit'] },
  { type: 'Calculator', name: 'NSC Calculator', href: '/calculators/nsc', tags: ['nsc', 'national savings'] },
  { type: 'Calculator', name: 'Gold Calculator', href: '/calculators/gold', tags: ['gold', 'precious metal'] },
  { type: 'Calculator', name: 'ELSS Calculator', href: '/calculators/elss', tags: ['elss', 'tax saving', '80c'] },
  { type: 'Calculator', name: 'T-Bill Calculator', href: '/calculators/t-bills', tags: ['t-bill', 'treasury', 'government'] },
  { type: 'Calculator', name: 'SWP Calculator', href: '/calculators/swp', tags: ['swp', 'withdrawal', 'retirement'] },
  { type: 'Calculator', name: 'Lumpsum Calculator', href: '/calculators/lumpsum', tags: ['lumpsum', 'one time', 'mutual fund'] },
  { type: 'Calculator', name: 'Step-Up SIP', href: '/calculators/step-up-sip', tags: ['step up', 'increasing sip'] },
  { type: 'Calculator', name: 'KVP Calculator', href: '/calculators/kvp', tags: ['kvp', 'kisan vikas', 'doubling'] },
  { type: 'Calculator', name: 'MIS Calculator', href: '/calculators/mis', tags: ['mis', 'monthly income', 'post office'] },
  { type: 'Calculator', name: 'SCSS Calculator', href: '/calculators/scss', tags: ['scss', 'senior citizen', 'savings'] },
  { type: 'Calculator', name: 'SGB Calculator', href: '/calculators/sgb', tags: ['sgb', 'sovereign gold bond', 'rbi'] },
  { type: 'Calculator', name: 'VPF Calculator', href: '/calculators/vpf', tags: ['vpf', 'voluntary provident fund'] },
  { type: 'Calculator', name: 'APY Calculator', href: '/calculators/apy', tags: ['apy', 'atal pension', 'guaranteed pension'] },
  // Comparisons
  { type: 'Comparison', name: 'FD vs SIP', href: '/compare/fd-vs-sip', tags: ['fd vs sip', 'compare', 'fixed deposit vs mutual fund'] },
  { type: 'Comparison', name: 'FD vs PPF', href: '/compare/fd-vs-ppf', tags: ['fd vs ppf', 'compare'] },
  { type: 'Comparison', name: 'PPF vs NPS', href: '/compare/ppf-vs-nps', tags: ['ppf vs nps', 'retirement', 'compare'] },
  { type: 'Comparison', name: 'EPF vs NPS', href: '/compare/epf-vs-nps', tags: ['epf vs nps', 'retirement', 'compare'] },
  { type: 'Comparison', name: 'SSY vs PPF', href: '/compare/ssy-vs-ppf', tags: ['ssy vs ppf', 'compare'] },
  // Learn
  { type: 'Article', name: 'What is Compound Interest?', href: '/learn/compound-interest', tags: ['compound interest', 'basics', 'learn'] },
  { type: 'Article', name: 'What is SIP?', href: '/learn/sip', tags: ['sip', 'learn', 'guide'] },
  { type: 'Article', name: 'What is PPF?', href: '/learn/ppf', tags: ['ppf', 'learn', 'guide'] },
  { type: 'Article', name: 'Section 80C Guide', href: '/learn/80c-tax-saving', tags: ['80c', 'tax saving', 'guide'] },
  { type: 'Article', name: 'Gold Investment Guide', href: '/learn/gold-investment', tags: ['gold', 'guide', 'learn'] },
  // Tools
  { type: 'Tool', name: 'Goal Planner', href: '/goal-planner', tags: ['goal', 'plan', 'target'] },
  { type: 'Tool', name: 'Tax Saving Center', href: '/tax-saver', tags: ['tax', '80c', 'save'] },
  { type: 'Tool', name: 'Journey Simulator', href: '/journey-simulator', tags: ['journey', 'wealth', 'simulate'] },
  { type: 'Tool', name: 'Live Rates', href: '/rates', tags: ['rates', 'current', 'live'] },
];

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || '').toLowerCase().trim();

  const results = q
    ? ALL_ITEMS.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.includes(q))
      )
    : [];

  const TYPE_ICON: Record<string, React.ComponentType<any>> = {
    Calculator: Calculator,
    Comparison: ArrowRight,
    Article: BookOpen,
    Tool: Search,
  };

  const TYPE_COLOR: Record<string, string> = {
    Calculator: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Comparison: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    Article: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Tool: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-14">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-6">Search ArthCalc</h1>
          <form method="get" className="flex gap-3">
            <div className="flex-1 flex items-center gap-3 bg-white dark:bg-surface rounded-xl px-4 py-3 shadow-lg">
              <Search className="w-5 h-5 text-text-muted flex-shrink-0" />
              <input
                name="q"
                defaultValue={searchParams.q}
                type="text"
                placeholder="Search FD, SIP, PPF, gold, tax saving..."
                className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none"
                autoFocus
              />
            </div>
            <button type="submit"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))' }}>
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {q && (
          <p className="text-text-secondary text-sm mb-6">
            {results.length > 0 ? `${results.length} results for "${searchParams.q}"` : `No results for "${searchParams.q}"`}
          </p>
        )}

        {results.length > 0 && (
          <div className="space-y-3">
            {results.map((item) => {
              const Icon = TYPE_ICON[item.type] || Search;
              return (
                <Link key={item.href} href={item.href}
                  className="card flex items-center gap-4 p-4 hover:shadow-card-hover transition-all group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ background: 'var(--primary-100)' }}>
                    <Icon className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLOR[item.type]}`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="font-semibold text-text-primary group-hover:text-primary-600 transition-colors">
                      {item.name}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary-500 transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        )}

        {q && results.length === 0 && (
          <div className="card p-8 text-center">
            <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="font-semibold text-text-primary mb-2">No results found for "{searchParams.q}"</p>
            <p className="text-sm text-text-secondary mb-6">Try searching for: FD, SIP, PPF, NPS, EPF, gold, tax, 80C</p>
            <Link href="/calculators" className="text-primary-600 font-semibold hover:underline">
              Browse all calculators →
            </Link>
          </div>
        )}

        {!q && (
          <div>
            <p className="text-text-secondary text-sm mb-6">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {['FD Calculator', 'SIP Calculator', 'PPF Calculator', 'NPS Calculator', 'EPF Calculator',
                'FD vs SIP', 'PPF vs NPS', 'Tax saving 80C', 'Gold investment', 'Sukanya Samriddhi'].map(s => (
                <Link key={s} href={`/search?q=${encodeURIComponent(s)}`}
                  className="px-4 py-2 bg-surface border border-surface-border rounded-xl text-sm text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors">
                  {s}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
