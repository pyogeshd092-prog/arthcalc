'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateNSC } from '@/lib/calculations';
import { getInvestmentById } from '@/lib/data/investments';

export function NSCCalculatorPage() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.7);
  const [inflation, setInflation] = useState(6);

  const result = useMemo(() => calculateNSC(principal, rate, inflation), [principal, rate, inflation]);
  const inv = getInvestmentById('nsc')!;

  const inputs = (
    <div className="space-y-6">
      <Slider label="Investment Amount" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
      <div className="p-4 bg-surface-secondary rounded-xl border border-surface-border">
        <p className="text-sm font-medium text-text-primary mb-1">NSC Interest Rate</p>
        <p className="text-2xl font-bold" style={{ color: 'var(--accent-500)' }}>{rate}% p.a.</p>
        <p className="text-xs text-text-muted">India Post official rate (Q1 FY2024-25). Compounded annually.</p>
        <Slider label="" value={rate} onChange={setRate} min={5} max={12} step={0.1} suffix="%" />
      </div>
      <Slider label="Expected Inflation" value={inflation} onChange={setInflation} min={1} max={15} step={0.5} suffix="% p.a." />
      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-sm">
        <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-2">Section 80C Benefit</p>
        <p className="text-xs text-emerald-700 dark:text-emerald-400">
          Investment up to ₹1,50,000 qualifies for Section 80C deduction. Interest accrued in years 1-4 also
          qualifies as fresh 80C investment (deemed reinvested). Only maturity year interest is taxable.
        </p>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="NSC Calculator — National Savings Certificate (7.7%)"
      shortTitle="NSC"
      description="Calculate NSC maturity value for 5-year investment at current India Post rate of 7.7% p.a. Includes Section 80C tax benefit analysis. Compounded annually."
      inputs={inputs}
      result={result}
      officialSource="India Post / Ministry of Finance"
      officialUrl="https://www.indiapost.gov.in/Financial/Pages/Content/NSC.aspx"
      effectiveDate="2023-04-01"
      encyclopediaHref="/investments/post-office/nsc"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
