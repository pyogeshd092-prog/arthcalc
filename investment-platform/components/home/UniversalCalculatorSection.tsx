'use client';

import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, Info } from 'lucide-react';
import { Slider, DisclaimerBox, formatINR } from '@/components/ui';
import { calculateUniversal } from '@/lib/calculations';
import { GrowthChart } from '@/components/charts/GrowthChart';

export function UniversalCalculatorSection() {
  const [initial, setInitial] = useState(100000);
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [returnRate, setReturnRate] = useState(10);
  const [inflation, setInflation] = useState(6);
  const [tax, setTax] = useState(10);

  const result = useMemo(() => calculateUniversal({
    initialAmount: initial,
    monthlyContribution: monthly,
    annualContribution: 0,
    tenureYears: years,
    expectedReturn: returnRate,
    inflationRate: inflation,
    taxRate: tax,
  }), [initial, monthly, years, returnRate, inflation, tax]);

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-secondary border border-surface-border text-sm text-text-secondary mb-4">
            <Calculator className="w-4 h-4" style={{ color: 'var(--primary-500)' }} />
            Universal Investment Calculator
          </div>
          <h2 className="section-heading mb-4">
            Where can I put my money?<br />
            <span className="gradient-text">What could it become?</span>
          </h2>
          <p className="section-subheading mx-auto">
            Adjust any parameter below to see how your money could grow over time.
            Works for any investment type — FD, SIP, PPF, or any other.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Controls — 2 cols */}
          <div className="lg:col-span-2 card space-y-7">
            <div>
              <label className="text-xs font-bold uppercase tracking-wide text-text-muted mb-3 block">Initial Investment</label>
              <Slider
                label="₹"
                value={initial}
                onChange={setInitial}
                min={0}
                max={5000000}
                step={10000}
                formatValue={(v) => formatINR(v, true)}
              />
            </div>
            <div>
              <Slider
                label="Monthly Contribution"
                value={monthly}
                onChange={setMonthly}
                min={0}
                max={100000}
                step={500}
                formatValue={(v) => formatINR(v, true)}
              />
            </div>
            <div>
              <Slider
                label="Investment Period"
                value={years}
                onChange={setYears}
                min={1}
                max={40}
                suffix=" yrs"
                tooltip="How many years you plan to stay invested"
              />
            </div>
            <div>
              <Slider
                label="Expected Return"
                value={returnRate}
                onChange={setReturnRate}
                min={1}
                max={30}
                step={0.5}
                suffix="% p.a."
                tooltip="Assumed annual return rate. Guaranteed for FD/PPF, assumed for equity. Adjust based on investment type."
              />
            </div>
            <div>
              <Slider
                label="Inflation Rate"
                value={inflation}
                onChange={setInflation}
                min={1}
                max={15}
                step={0.5}
                suffix="% p.a."
                tooltip="Used to calculate the real (inflation-adjusted) value of your future money"
              />
            </div>
            <div>
              <Slider
                label="Tax on Gains"
                value={tax}
                onChange={setTax}
                min={0}
                max={30}
                suffix="%"
                tooltip="Applicable tax rate on your gains. Varies by investment (PPF = 0%, FD = slab rate, Equity LTCG = 12.5%)"
              />
            </div>
          </div>

          {/* Results — 3 cols */}
          <div className="lg:col-span-3 space-y-6">
            {/* Key metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Amount Invested', value: formatINR(result.investedAmount, true), color: 'var(--primary-500)' },
                { label: 'Estimated Returns', value: formatINR(result.estimatedReturns, true), color: '#10b981' },
                { label: 'Maturity Value', value: formatINR(result.maturityValue, true), color: 'var(--accent-500)' },
                { label: 'After Inflation*', value: formatINR(result.inflationAdjustedValue, true), color: '#8b5cf6' },
              ].map((m) => (
                <div key={m.label} className="card p-4 text-center">
                  <div className="text-xl md:text-2xl font-bold mb-1" style={{ color: m.color }}>
                    {m.value}
                  </div>
                  <div className="text-xs text-text-muted">{m.label}</div>
                </div>
              ))}
            </div>

            {/* After tax */}
            <div className="card p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary mb-1">Estimated After-Tax Value</p>
                <p className="text-3xl font-bold" style={{ color: 'var(--primary-600)' }}>
                  {formatINR(result.taxAdjustedValue, true)}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  Tax deducted at {tax}% on gains of {formatINR(result.estimatedReturns, true)}
                </p>
              </div>
              <div className="hidden md:flex flex-col items-end gap-1 text-right">
                <div className="text-sm text-text-secondary">Effective Annual Return</div>
                <div className="text-2xl font-bold" style={{ color: 'var(--accent-500)' }}>{returnRate}% p.a.</div>
                <div className="text-xs text-text-muted">as entered by you</div>
              </div>
            </div>

            {/* Chart */}
            <div className="card p-5">
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: 'var(--primary-500)' }} />
                Wealth Growth Chart
              </h3>
              <GrowthChart data={result.yearlyBreakdown} />
            </div>

            {/* Disclaimer */}
            <DisclaimerBox />
          </div>
        </div>

        {/* Compare CTA */}
        <div className="mt-10 text-center">
          <p className="text-text-secondary mb-4">Want to see how this compares across FD, SIP, PPF, NPS, and Gold?</p>
          <a
            href="/compare"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))' }}
          >
            Compare Investments Side-by-Side
          </a>
        </div>
      </div>
    </section>
  );
}
