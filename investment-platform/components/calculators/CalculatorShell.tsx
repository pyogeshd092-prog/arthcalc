'use client';

import { useState } from 'react';
import { Download, Share2, BookOpen, Info, ChevronRight } from 'lucide-react';
import { DisclaimerBox, SourceBadge, Accordion, formatINR } from '@/components/ui';
import { GrowthChart } from '@/components/charts/GrowthChart';
import type { CalcResult } from '@/lib/calculations';

interface CalculatorShellProps {
  title: string;
  shortTitle: string;
  description: string;
  inputs: React.ReactNode;
  result: CalcResult | null;
  officialSource: string;
  officialUrl: string;
  effectiveDate: string;
  faqs: { q: string; a: string }[];
  encyclopediaHref?: string;
  formula?: string;
}

export function CalculatorShell({
  title, shortTitle, description, inputs, result,
  officialSource, officialUrl, effectiveDate, faqs,
  encyclopediaHref, formula,
}: CalculatorShellProps) {
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');

  const exportPDF = () => {
    // Simple print-to-PDF
    window.print();
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Page header */}
      <div className="hero-gradient py-12 mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-primary-300 text-sm mb-4">
            <a href="/" className="hover:text-white">Home</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/calculators" className="hover:text-white">Calculators</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{shortTitle} Calculator</span>
          </nav>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h1>
              <p className="text-primary-200 max-w-2xl leading-relaxed">{description}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 no-print">
              {encyclopediaHref && (
                <a
                  href={encyclopediaHref}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm border border-white/20 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  Learn
                </a>
              )}
              <button onClick={share} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all">
                <Share2 className="w-4 h-4" />
              </button>
              <button onClick={exportPDF} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Inputs — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="font-bold text-text-primary mb-6 flex items-center gap-2">
                <span className="w-2 h-6 rounded-full" style={{ background: 'var(--primary-500)' }} />
                Calculator Inputs
              </h2>
              {inputs}
            </div>

            {/* Source info */}
            <div className="card p-4">
              <SourceBadge
                source={officialSource}
                url={officialUrl}
                effectiveDate={effectiveDate}
                lastUpdated={effectiveDate}
              />
              {formula && (
                <div className="mt-3 pt-3 border-t border-surface-border">
                  <p className="text-xs font-semibold text-text-muted mb-1 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    Calculation Formula
                  </p>
                  <pre className="text-xs text-text-secondary whitespace-pre-wrap leading-relaxed font-mono bg-surface-secondary p-3 rounded-lg">
                    {formula}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Results — 3 cols */}
          <div className="lg:col-span-3 space-y-6">
            {result ? (
              <>
                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Amount Invested', value: formatINR(result.investedAmount, true), color: 'var(--primary-500)' },
                    { label: 'Estimated Returns', value: formatINR(result.estimatedReturns, true), color: '#10b981' },
                    { label: 'Maturity Value', value: formatINR(result.maturityValue, true), color: 'var(--accent-500)', large: true },
                    { label: 'After Inflation', value: formatINR(result.inflationAdjustedValue, true), color: '#8b5cf6' },
                  ].map((m) => (
                    <div key={m.label} className={`card p-5 ${m.large ? 'col-span-2 flex items-center justify-between' : ''}`}>
                      <div>
                        <p className="text-sm text-text-secondary mb-1">{m.label}</p>
                        <p className={`font-bold ${m.large ? 'text-4xl' : 'text-2xl'}`} style={{ color: m.color }}>
                          {m.value}
                        </p>
                      </div>
                      {m.large && (
                        <div className="text-right text-sm">
                          <p className="text-text-muted">Effective Annual Return</p>
                          <p className="font-bold text-xl" style={{ color: 'var(--accent-500)' }}>
                            {result.effectiveAnnualReturn.toFixed(2)}% p.a.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Chart / Table toggle */}
                <div className="card p-5">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-text-primary">Growth Breakdown</h3>
                    <div className="flex bg-surface-secondary rounded-lg p-1 text-sm">
                      <button
                        onClick={() => setActiveTab('chart')}
                        className={`px-4 py-1.5 rounded-md transition-all font-medium ${activeTab === 'chart' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary'}`}
                      >
                        Chart
                      </button>
                      <button
                        onClick={() => setActiveTab('table')}
                        className={`px-4 py-1.5 rounded-md transition-all font-medium ${activeTab === 'table' ? 'bg-surface text-text-primary shadow-sm' : 'text-text-secondary'}`}
                      >
                        Table
                      </button>
                    </div>
                  </div>

                  {activeTab === 'chart' ? (
                    <GrowthChart data={result.yearlyBreakdown} />
                  ) : (
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <table className="data-table">
                        <thead className="sticky top-0">
                          <tr>
                            <th>Year</th>
                            <th>Amount Invested</th>
                            <th>Interest Earned</th>
                            <th>Total Value</th>
                            <th>After Inflation*</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.yearlyBreakdown.map((row) => (
                            <tr key={row.year}>
                              <td className="font-medium">Year {row.year}</td>
                              <td>{formatINR(row.invested, true)}</td>
                              <td className="text-emerald-600 dark:text-emerald-400">{formatINR(row.interest, true)}</td>
                              <td className="font-bold" style={{ color: 'var(--accent-500)' }}>{formatINR(row.total, true)}</td>
                              <td className="text-text-muted">{row.inflationAdjusted ? formatINR(row.inflationAdjusted, true) : '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Assumptions */}
                <div className="card p-5">
                  <h3 className="font-semibold text-text-primary text-sm mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-text-muted" />
                    Assumptions Used in This Calculation
                  </h3>
                  <ul className="space-y-1.5">
                    {result.assumptions.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-1.5 flex-shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <DisclaimerBox />
              </>
            ) : (
              <div className="card p-12 text-center text-text-muted">
                <p>Adjust the inputs to see your calculation results.</p>
              </div>
            )}
          </div>
        </div>

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
            <Accordion items={faqs} />
          </div>
        )}
      </div>
    </div>
  );
}
