import type { Metadata } from 'next';
import Link from 'next/link';
import { INVESTMENTS } from '@/lib/data/investments';
import { ArrowLeftRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compare Investments India — Any vs Any | ArthCalc',
  description: 'Compare any two Indian investments side-by-side — FD vs SIP, PPF vs NPS, Gold vs SIP, and 500+ combinations. Returns, risk, liquidity, tax, lock-in. No recommendations. Educational only.',
};

const FEATURED = [
  ['fd', 'sip'], ['fd', 'ppf'], ['ppf', 'nps'], ['gold-etf', 'sip'],
  ['epf', 'nps'], ['ssy', 'ppf'], ['fd', 'rd'], ['elss', 'ppf'],
  ['t-bills', 'fd'], ['nps', 'epf'], ['physical-gold', 'gold-etf'], ['sip', 'lumpsum'],
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Compare Any Two Investments</h1>
          <p className="text-primary-200 text-lg mb-2">500+ comparison combinations available</p>
          <p className="text-primary-300 text-sm">Factual data only • No winner declared • Official sources • Educational tool</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured comparisons */}
        <h2 className="text-xl font-bold text-text-primary mb-6">Popular Comparisons</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {FEATURED.map(([a, b]) => {
            const invA = INVESTMENTS.find(i => i.id === a);
            const invB = INVESTMENTS.find(i => i.id === b);
            if (!invA || !invB) return null;
            return (
              <Link key={`${a}-${b}`} href={`/compare/${a}-vs-${b}`}
                className="card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex items-center justify-between gap-2 p-4">
                <span className="font-medium text-text-primary text-sm">{invA.shortName}</span>
                <ArrowLeftRight className="w-4 h-4 text-text-muted flex-shrink-0" />
                <span className="font-medium text-text-primary text-sm">{invB.shortName}</span>
              </Link>
            );
          })}
        </div>

        {/* All investments grid for custom comparison */}
        <div className="card">
          <h2 className="font-bold text-text-primary mb-2">Build Your Own Comparison</h2>
          <p className="text-sm text-text-secondary mb-6">
            Click any investment below to see all comparison options for it.
          </p>
          <div className="flex flex-wrap gap-2">
            {INVESTMENTS.map((inv) => (
              <Link key={inv.id} href={`/compare/${inv.id}-vs-fd`}
                className="px-3 py-1.5 rounded-full border border-surface-border text-sm text-text-secondary hover:border-primary-400 hover:text-text-primary hover:bg-surface-secondary transition-all">
                {inv.shortName}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
