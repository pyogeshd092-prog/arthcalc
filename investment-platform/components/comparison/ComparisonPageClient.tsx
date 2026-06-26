'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, Minus, AlertTriangle, ChevronRight, ArrowLeftRight } from 'lucide-react';
import { Slider, DisclaimerBox, SourceBadge, formatINR } from '@/components/ui';
import { CompareBarChart } from '@/components/charts/GrowthChart';
import type { InvestmentOption } from '@/lib/data/investments';
import { calculateFD, calculateSIP, calculatePPF, calculateNSC, calculateKVP, calculateSSY, calculateEPF, calculateNPS, calculateRD, calculateGold, calculateLumpsum } from '@/lib/calculations';

interface Props {
  invA: InvestmentOption;
  invB: InvestmentOption;
}

function getProjectedValue(inv: InvestmentOption, amount: number, monthly: number, years: number): number {
  const rate = inv.currentRate || 8;
  try {
    if (inv.id === 'ppf') {
      const r = rate / 100;
      let c = 0;
      for (let y = 1; y <= Math.min(years, 50); y++) c = (c + Math.min(monthly * 12, 150000)) * (1 + r);
      return c;
    }
    if (inv.id === 'sip' || inv.id === 'elss' || inv.id === 'equity-mf' || inv.id === 'index-fund') {
      const r = rate / 12 / 100;
      const n = years * 12;
      return (amount * Math.pow(1 + rate / 100, years)) + monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    }
    if (inv.id === 'fd' || inv.id === 'tax-saver-fd' || inv.id === 'senior-citizen-fd') {
      return (amount || monthly * 12) * Math.pow(1 + rate / 400, 4 * years);
    }
    if (inv.id === 'epf') {
      let c = 0, salary = monthly * 8; // approximate basic as 40% of monthly
      for (let y = 1; y <= years; y++) {
        c = (c + salary * 0.1567 * 12) * (1 + rate / 100);
        salary *= 1.08;
      }
      return c;
    }
    if (inv.id === 'nps') {
      const r = rate / 12 / 100;
      const n = years * 12;
      return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    }
    // Default: compound interest
    return ((amount || 0) + monthly * years * 12) * Math.pow(1 + rate / 100, years * 0.5);
  } catch {
    return amount * Math.pow(1 + rate / 100, years);
  }
}

const RISK_ORDER = ['Very Low', 'Low', 'Low-Medium', 'Medium', 'Medium-High', 'High', 'Very High'];
const LIQUIDITY_ORDER = ['Very High', 'High', 'Medium', 'Low', 'Very Low'];

type CompareRow = {
  metric: string;
  a: string | boolean | null;
  b: string | boolean | null;
  type: 'text' | 'bool' | 'rate' | 'link';
  highlight?: boolean;
};

function buildCompareRows(a: InvestmentOption, b: InvestmentOption): CompareRow[] {
  return [
    { metric: 'Type of Returns', a: a.returnsType, b: b.returnsType, type: 'text' },
    { metric: 'Current Rate / Avg. Return', a: a.currentRateLabel, b: b.currentRateLabel, type: 'text' },
    { metric: 'Risk Level', a: a.riskLevel, b: b.riskLevel, type: 'text' },
    { metric: 'Liquidity', a: a.liquidityLevel, b: b.liquidityLevel, type: 'text' },
    { metric: 'Lock-In Period', a: a.lockInPeriod, b: b.lockInPeriod, type: 'text' },
    { metric: 'Tax Treatment', a: a.taxTreatment, b: b.taxTreatment, type: 'text' },
    { metric: 'Section 80C Benefit', a: a.section80C, b: b.section80C, type: 'bool' },
    { metric: 'Min. Investment', a: a.minInvestmentLabel, b: b.minInvestmentLabel, type: 'text' },
    { metric: 'Max. Investment', a: a.maxInvestmentLabel, b: b.maxInvestmentLabel, type: 'text' },
    { metric: 'Premature Withdrawal', a: a.prematureWithdrawal, b: b.prematureWithdrawal, type: 'text' },
    { metric: 'Can Invest Online', a: a.canInvestOnline, b: b.canInvestOnline, type: 'bool' },
    { metric: 'Can Invest via Mobile', a: a.canInvestMobile, b: b.canInvestMobile, type: 'bool' },
    { metric: 'Branch Visit Required', a: a.needBranchVisit, b: b.needBranchVisit, type: 'bool' },
    { metric: 'Regulated By', a: a.regulatedBy, b: b.regulatedBy, type: 'text' },
    { metric: 'Official Source', a: a.officialSource, b: b.officialSource, type: 'text' },
  ];
}

const CHART_COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'];

export function ComparisonPageClient({ invA, invB }: Props) {
  const [lumpsum, setLumpsum] = useState(100000);
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);

  const projA = useMemo(() => getProjectedValue(invA, lumpsum, monthly, years), [invA, lumpsum, monthly, years]);
  const projB = useMemo(() => getProjectedValue(invB, lumpsum, monthly, years), [invB, lumpsum, monthly, years]);
  const totalInvested = lumpsum + monthly * years * 12;

  const chartData = [
    { name: 'Invested', value: totalInvested, color: '#64748b' },
    { name: invA.shortName, value: projA, color: CHART_COLORS[0] },
    { name: invB.shortName, value: projB, color: CHART_COLORS[1] },
  ];

  const rows = buildCompareRows(invA, invB);

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Header */}
      <div className="hero-gradient py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-primary-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/compare" className="hover:text-white">Compare</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{invA.shortName} vs {invB.shortName}</span>
          </nav>

          <div className="text-center">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-5xl mb-2">🏦</div>
                <h1 className="text-2xl font-bold text-white">{invA.name}</h1>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center">
                <ArrowLeftRight className="w-6 h-6 text-white" />
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">📈</div>
                <h1 className="text-2xl font-bold text-white">{invB.name}</h1>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm">
              <AlertTriangle className="w-4 h-4" />
              Factual comparison only — No winner declared — Educational purposes only
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Projection inputs */}
        <div className="card">
          <h2 className="font-bold text-text-primary mb-6">Compare Projected Outcomes</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Slider label="Lump Sum" value={lumpsum} onChange={setLumpsum} min={0} max={10000000} step={10000}
              formatValue={(v) => `₹${(v/100000).toFixed(1)}L`} />
            <Slider label="Monthly Contribution" value={monthly} onChange={setMonthly} min={0} max={100000} step={500}
              formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
            <Slider label="Period" value={years} onChange={setYears} min={1} max={30} suffix=" yrs" />
            <Slider label="Inflation" value={inflation} onChange={setInflation} min={1} max={15} step={0.5} suffix="%" />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="card p-5 text-center">
              <p className="text-sm text-text-secondary mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-text-primary">{formatINR(totalInvested, true)}</p>
              <p className="text-xs text-text-muted">Over {years} years</p>
            </div>
            <div className="card p-5 text-center border-2" style={{ borderColor: CHART_COLORS[0] }}>
              <p className="text-sm text-text-secondary mb-1">{invA.shortName} — Estimated Value</p>
              <p className="text-2xl font-bold" style={{ color: CHART_COLORS[0] }}>{formatINR(projA, true)}</p>
              <p className="text-xs text-text-muted">at {invA.currentRate || 8}% (assumed)</p>
            </div>
            <div className="card p-5 text-center border-2" style={{ borderColor: CHART_COLORS[1] }}>
              <p className="text-sm text-text-secondary mb-1">{invB.shortName} — Estimated Value</p>
              <p className="text-2xl font-bold" style={{ color: CHART_COLORS[1] }}>{formatINR(projB, true)}</p>
              <p className="text-xs text-text-muted">at {invB.currentRate || 8}% (assumed)</p>
            </div>
          </div>

          <CompareBarChart data={chartData} />

          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
            <strong>Important:</strong> Projected values are estimates only, based on assumed returns. Market-linked
            products (SIP, NPS, ETFs) returns are not guaranteed. Government-declared rates may change.
            This comparison does not declare a winner or make any recommendation.
          </div>
        </div>

        {/* Head-to-head comparison table */}
        <div className="card overflow-hidden p-0">
          <div className="p-5 border-b border-surface-border">
            <h2 className="font-bold text-text-primary">Side-by-Side Factual Comparison</h2>
            <p className="text-sm text-text-muted mt-1">All data from official sources. No recommendations made.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-secondary">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide w-1/3">Metric</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide w-1/3" style={{ color: CHART_COLORS[0] }}>
                    {invA.shortName}
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide w-1/3" style={{ color: CHART_COLORS[1] }}>
                    {invB.shortName}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? '' : 'bg-surface-secondary/50'}>
                    <td className="px-5 py-3.5 text-sm font-medium text-text-secondary">{row.metric}</td>
                    <td className="px-5 py-3.5 text-sm">
                      {row.type === 'bool' ? (
                        row.a === true ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
                        row.a === false ? <XCircle className="w-5 h-5 text-red-400" /> :
                        <Minus className="w-4 h-4 text-text-muted" />
                      ) : (
                        <span className="text-text-primary">{row.a as string || '—'}</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-sm">
                      {row.type === 'bool' ? (
                        row.b === true ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
                        row.b === false ? <XCircle className="w-5 h-5 text-red-400" /> :
                        <Minus className="w-4 h-4 text-text-muted" />
                      ) : (
                        <span className="text-text-primary">{row.b as string || '—'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment details side-by-side */}
        <div className="grid md:grid-cols-2 gap-6">
          {[invA, invB].map((inv, idx) => (
            <div key={inv.id} className="card border-t-4" style={{ borderTopColor: CHART_COLORS[idx] }}>
              <h3 className="font-bold text-text-primary mb-4">{inv.name}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{inv.description.slice(0, 250)}...</p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-text-muted uppercase mb-2">How to Invest</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2">
                    {inv.canInvestOnline ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-400" />}
                    <span className="text-text-secondary">Online / Internet Banking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {inv.canInvestMobile ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-400" />}
                    <span className="text-text-secondary">Mobile App</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!inv.needBranchVisit ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
                    <span className="text-text-secondary">{inv.needBranchVisit ? 'Branch visit required' : 'No branch visit needed'}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-text-muted uppercase mb-2">Advantages</p>
                <ul className="space-y-1">
                  {inv.advantages.slice(0, 3).map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-text-muted uppercase mb-2">Limitations</p>
                <ul className="space-y-1">
                  {inv.limitations.slice(0, 3).map((l, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              <SourceBadge source={inv.officialSource} url={inv.officialWebsite} effectiveDate={inv.rateEffectiveDate} />

              <div className="mt-4 flex gap-2">
                <Link href={`/calculators/${inv.slug}`}
                  className="flex-1 text-center py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: CHART_COLORS[idx] }}>
                  Calculator
                </Link>
                <Link href={`/investments/${inv.categoryId}/${inv.slug}`}
                  className="flex-1 text-center py-2 rounded-lg text-sm font-semibold border border-surface-border text-text-secondary hover:bg-surface-secondary transition-all">
                  Full Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <DisclaimerBox text="This comparison is for educational and informational purposes only. ArthCalc does not declare any winner or recommend any investment. Projected values are estimates based on assumed return rates. Market-linked products carry risk of loss. Consult a SEBI-registered investment advisor before investing." />
      </div>
    </div>
  );
}
