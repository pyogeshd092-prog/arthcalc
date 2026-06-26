'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateSIP } from '@/lib/calculations';
import { getInvestmentById } from '@/lib/data/investments';

export function ELSSCalculatorPage() {
  const [monthly, setMonthly] = useState(12500); // ₹1.5L / 12
  const [rate, setRate] = useState(14);
  const [years, setYears] = useState(5);
  const [inflation, setInflation] = useState(6);
  const [taxSlab, setTaxSlab] = useState(30);

  const result = useMemo(() => calculateSIP({ monthlyAmount: monthly, annualReturn: rate, tenureYears: years, inflationRate: inflation }),
    [monthly, rate, years, inflation]);

  const annualInvestment = monthly * 12;
  const deductionBenefit = Math.min(annualInvestment, 150000) * (taxSlab / 100);
  const inv = getInvestmentById('elss')!;

  const inputs = (
    <div className="space-y-6">
      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-sm">
        <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">Section 80C — ELSS Tax Benefit</p>
        <p className="text-xs text-emerald-700 dark:text-emerald-400">
          ELSS investments up to ₹1,50,000/year qualify for Section 80C deduction.
          Shortest lock-in (3 years per installment) among all 80C options.
        </p>
      </div>
      <Slider label="Monthly SIP Amount" value={monthly} onChange={setMonthly} min={500} max={50000} step={500}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}`}
        tooltip="To maximize 80C: ₹12,500/month = ₹1.5L/year. ELSS lock-in: 3 years per installment." />
      <Slider label="Expected Annual Return" value={rate} onChange={setRate} min={5} max={30} step={0.5} suffix="% p.a."
        tooltip="Top ELSS funds historical CAGR (10-year): 14-18%. Returns not guaranteed. Market-linked." />
      <Slider label="Investment Period" value={years} onChange={setYears} min={3} max={30} suffix=" years"
        tooltip="ELSS has 3-year mandatory lock-in per installment." />

      <div>
        <label className="text-sm font-medium text-text-secondary mb-2 block">Your Income Tax Slab</label>
        <select value={taxSlab} onChange={(e) => setTaxSlab(Number(e.target.value))} className="input-base">
          <option value={5}>5% slab</option>
          <option value={10}>10% slab</option>
          <option value={20}>20% slab</option>
          <option value={30}>30% slab</option>
        </select>
      </div>

      {/* Tax benefit preview */}
      <div className="p-4 bg-surface-secondary rounded-xl border border-surface-border space-y-2 text-sm">
        <p className="font-semibold text-text-primary">Estimated Annual Tax Saving</p>
        <div className="flex justify-between">
          <span className="text-text-muted">Annual ELSS investment</span>
          <span className="font-medium">₹{Math.min(annualInvestment, 150000).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Tax slab</span>
          <span className="font-medium">{taxSlab}%</span>
        </div>
        <div className="flex justify-between border-t border-surface-border pt-2">
          <span className="text-text-muted">Estimated tax saved/year</span>
          <span className="font-bold" style={{ color: '#10b981' }}>₹{deductionBenefit.toLocaleString('en-IN')}</span>
        </div>
        <p className="text-xs text-text-muted">Actual tax saving depends on total 80C investments & applicable slab.</p>
      </div>
      <Slider label="Expected Inflation" value={inflation} onChange={setInflation} min={1} max={15} step={0.5} suffix="% p.a." />
    </div>
  );

  return (
    <CalculatorShell
      title="ELSS Calculator — Equity Linked Savings Scheme (80C)"
      shortTitle="ELSS"
      description="Calculate ELSS mutual fund returns with Section 80C tax deduction up to ₹1.5L. Shortest 3-year lock-in among 80C options. Market-linked, equity exposure, LTCG at 12.5% above ₹1.25L. Educational only."
      inputs={inputs}
      result={result}
      officialSource="SEBI / AMFI India"
      officialUrl="https://www.amfiindia.com"
      effectiveDate="2024-10-01"
      encyclopediaHref="/investments/mutual-funds/elss"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
