'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateKVP } from '@/lib/calculations';
import { getInvestmentById } from '@/lib/data/investments';

export function KVPCalculatorPage() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.5);
  const [inflation, setInflation] = useState(6);

  const result = useMemo(() => calculateKVP(principal, rate, inflation), [principal, rate, inflation]);
  const inv = getInvestmentById('kvp')!;
  const doublingMonths = Math.ceil(Math.log(2) / Math.log(1 + rate / 100));

  const inputs = (
    <div className="space-y-6">
      <Slider label="Investment Amount" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
      <div className="p-4 bg-surface-secondary rounded-xl border border-surface-border">
        <p className="text-sm font-medium text-text-primary mb-1">KVP Interest Rate</p>
        <p className="text-2xl font-bold" style={{ color: 'var(--accent-500)' }}>{rate}% p.a.</p>
        <p className="text-xs text-text-muted">India Post (Q1 FY2024-25). Doubles in {doublingMonths} months.</p>
        <Slider label="" value={rate} onChange={setRate} min={5} max={12} step={0.1} suffix="%" />
      </div>
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-center">
        <p className="text-sm text-amber-800 dark:text-amber-300">At {rate}%, your ₹{(principal/100000).toFixed(1)}L doubles to</p>
        <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 my-2">₹{(principal*2).toLocaleString('en-IN')}</p>
        <p className="text-sm text-amber-700 dark:text-amber-400">in <strong>{doublingMonths} months</strong> (~{(doublingMonths/12).toFixed(1)} years)</p>
      </div>
      <Slider label="Expected Inflation" value={inflation} onChange={setInflation} min={1} max={15} step={0.5} suffix="% p.a." />
    </div>
  );

  return (
    <CalculatorShell
      title="KVP Calculator — Kisan Vikas Patra Doubling Calculator"
      shortTitle="KVP"
      description="Calculate when Kisan Vikas Patra doubles your money. Current rate 7.5% p.a. from India Post — doubles in 115 months (~9.6 years). Government sovereign guarantee. No 80C benefit. Educational only."
      inputs={inputs}
      result={result}
      officialSource="India Post / Ministry of Finance"
      officialUrl="https://www.indiapost.gov.in/Financial/Pages/Content/KVP.aspx"
      effectiveDate="2023-04-01"
      encyclopediaHref="/investments/post-office/kvp"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
