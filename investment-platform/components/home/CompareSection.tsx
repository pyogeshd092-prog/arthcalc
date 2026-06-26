'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeftRight, ChevronDown } from 'lucide-react';
import { INVESTMENTS } from '@/lib/data/investments';

const POPULAR_COMPARISONS = [
  { label: 'FD vs SIP', href: '/compare/fd-vs-sip', tag: 'Most Popular' },
  { label: 'FD vs PPF', href: '/compare/fd-vs-ppf', tag: '' },
  { label: 'PPF vs NPS', href: '/compare/ppf-vs-nps', tag: '' },
  { label: 'Gold vs SIP', href: '/compare/gold-vs-sip', tag: 'Trending' },
  { label: 'EPF vs NPS', href: '/compare/epf-vs-nps', tag: '' },
  { label: 'SSY vs PPF', href: '/compare/ssy-vs-ppf', tag: "Best for Girls' savings" },
  { label: 'FD vs RD', href: '/compare/fd-vs-rd', tag: '' },
  { label: 'ELSS vs PPF', href: '/compare/elss-vs-ppf', tag: '80C options' },
  { label: 'T-Bills vs FD', href: '/compare/t-bills-vs-fd', tag: '' },
  { label: 'Gold ETF vs Gold', href: '/compare/gold-etf-vs-physical-gold', tag: '' },
  { label: 'NPS vs EPF', href: '/compare/nps-vs-epf', tag: 'Retirement' },
  { label: 'RD vs SIP', href: '/compare/rd-vs-sip', tag: '' },
];

export function CompareSection() {
  const [inv1, setInv1] = useState('fd');
  const [inv2, setInv2] = useState('sip');

  const compareUrl = `/compare/${inv1}-vs-${inv2}`;

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-secondary border border-surface-border text-sm text-text-secondary mb-4">
            <ArrowLeftRight className="w-4 h-4" style={{ color: 'var(--primary-500)' }} />
            Smart Comparison Engine
          </div>
          <h2 className="section-heading mb-4">
            Compare Any Two Investments
          </h2>
          <p className="section-subheading mx-auto">
            Side-by-side factual comparison of returns, risk, liquidity, tax treatment, and lock-in.
            No winner declared. You decide.
          </p>
        </div>

        {/* Interactive compare picker */}
        <div className="max-w-2xl mx-auto card p-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2 block">
                First Investment
              </label>
              <div className="relative">
                <select
                  value={inv1}
                  onChange={(e) => setInv1(e.target.value)}
                  className="input-base appearance-none pr-10 cursor-pointer"
                >
                  {INVESTMENTS.map((inv) => (
                    <option key={inv.id} value={inv.id}>{inv.shortName}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              </div>
            </div>

            <div className="flex-shrink-0 mt-6">
              <div className="w-10 h-10 rounded-full border-2 border-surface-border flex items-center justify-center text-text-muted font-bold">
                VS
              </div>
            </div>

            <div className="flex-1">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2 block">
                Second Investment
              </label>
              <div className="relative">
                <select
                  value={inv2}
                  onChange={(e) => setInv2(e.target.value)}
                  className="input-base appearance-none pr-10 cursor-pointer"
                >
                  {INVESTMENTS.map((inv) => (
                    <option key={inv.id} value={inv.id}>{inv.shortName}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              </div>
            </div>
          </div>

          <Link
            href={compareUrl}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))' }}
          >
            <ArrowLeftRight className="w-5 h-5" />
            Compare Now — No Winner Declared
          </Link>
          <p className="text-xs text-text-muted text-center mt-3">
            Factual comparison only. The platform never recommends or ranks investments.
          </p>
        </div>

        {/* Popular comparisons grid */}
        <div>
          <h3 className="text-center font-semibold text-text-secondary text-sm uppercase tracking-wide mb-6">
            Popular Comparisons
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {POPULAR_COMPARISONS.map((comp) => (
              <Link
                key={comp.href}
                href={comp.href}
                className="group card p-4 text-center hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="text-sm font-semibold text-text-primary group-hover:text-primary-600 transition-colors mb-1">
                  {comp.label}
                </div>
                {comp.tag && (
                  <div className="text-xs text-text-muted">{comp.tag}</div>
                )}
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ color: 'var(--primary-600)' }}
            >
              View all 500+ comparison combinations →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
