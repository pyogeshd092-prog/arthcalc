'use client';

import Link from 'next/link';
import { ExternalLink, TrendingUp } from 'lucide-react';

const LIVE_RATES = [
  { label: 'PPF', rate: '7.1%', source: 'Min. of Finance', period: 'Q1 FY25', href: '/calculators/ppf' },
  { label: 'EPF', rate: '8.25%', source: 'EPFO', period: 'FY23-24', href: '/calculators/epf' },
  { label: 'SSY', rate: '8.2%', source: 'Min. of Finance', period: 'Q1 FY25', href: '/calculators/ssy' },
  { label: 'NSC', rate: '7.7%', source: 'India Post', period: 'Q1 FY25', href: '/calculators/nsc' },
  { label: 'KVP', rate: '7.5%', source: 'India Post', period: 'Q1 FY25', href: '/calculators/kvp' },
  { label: 'MIS', rate: '7.4%', source: 'India Post', period: 'Q1 FY25', href: '/calculators/mis' },
  { label: 'SCSS', rate: '8.2%', source: 'India Post', period: 'Q1 FY25', href: '/calculators/scss' },
  { label: 'FD (SBI)', rate: '~7.1%', source: 'SBI', period: 'Oct 2024', href: '/calculators/fd' },
  { label: 'T-Bill 91d', rate: '~6.9%', source: 'RBI', period: 'Latest', href: '/calculators/t-bills' },
  { label: 'PO TD 5yr', rate: '7.5%', source: 'India Post', period: 'Q1 FY25', href: '/calculators/po-time-deposit' },
];

export function RatesTickerSection() {
  return (
    <div className="bg-surface-secondary border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3 overflow-hidden">
          {/* Label */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wide">Live Rates</span>
          </div>

          {/* Scrolling rates */}
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-6 animate-[scroll_40s_linear_infinite]"
                 style={{ width: 'max-content' }}>
              {[...LIVE_RATES, ...LIVE_RATES].map((r, i) => (
                <Link
                  key={i}
                  href={r.href}
                  className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity flex-shrink-0"
                >
                  <span className="font-bold text-text-primary">{r.label}</span>
                  <span className="font-semibold" style={{ color: 'var(--accent-500)' }}>{r.rate}</span>
                  <span className="text-xs text-text-muted">({r.source})</span>
                  <span className="text-surface-border">|</span>
                </Link>
              ))}
            </div>
          </div>

          {/* View all */}
          <Link
            href="/rates"
            className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold hover:opacity-80 transition-opacity"
            style={{ color: 'var(--primary-600)' }}
          >
            All Rates
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
