'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateSWP } from '@/lib/calculations';

export function SWPCalculatorPage() {
  const [corpus, setCorpus] = useState(5000000);
  const [monthly, setMonthly] = useState(25000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(20);

  const result = useMemo(() => calculateSWP({ initialCorpus: corpus, monthlyWithdrawal: monthly, annualReturn: rate, tenureYears: years }),
    [corpus, monthly, rate, years]);

  const totalWithdrawn = result.estimatedReturns;
  const remainingCorpus = result.maturityValue;

  const inputs = (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 text-sm">
        <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">What is SWP?</p>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Systematic Withdrawal Plan lets you withdraw a fixed amount monthly from your mutual fund investment.
          Your remaining corpus continues to grow at the fund's return rate.
        </p>
      </div>
      <Slider label="Initial Corpus (Investment)" value={corpus} onChange={setCorpus} min={100000} max={100000000} step={100000}
        formatValue={(v) => `₹${(v/100000).toFixed(1)}L`} tooltip="Total amount invested/accumulated in mutual fund" />
      <Slider label="Monthly Withdrawal" value={monthly} onChange={setMonthly} min={1000} max={500000} step={1000}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
      <Slider label="Expected Return on Corpus" value={rate} onChange={setRate} min={1} max={20} step={0.5} suffix="% p.a."
        tooltip="Expected annual return on remaining corpus. Market-linked — not guaranteed." />
      <Slider label="Simulation Period" value={years} onChange={setYears} min={1} max={40} suffix=" years" />

      <div className="p-4 bg-surface-secondary rounded-xl border border-surface-border space-y-2 text-sm">
        <p className="font-semibold text-text-primary">SWP Summary</p>
        <div className="flex justify-between"><span className="text-text-muted">Total withdrawn over {years} years</span>
          <span className="font-bold text-emerald-600">₹{totalWithdrawn.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span></div>
        <div className="flex justify-between"><span className="text-text-muted">Corpus remaining after {years} years</span>
          <span className={`font-bold ${remainingCorpus > 0 ? 'text-primary-600' : 'text-red-500'}`}>
            {remainingCorpus > 0 ? `₹${remainingCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` : 'Depleted'}
          </span></div>
        {remainingCorpus <= 0 && (
          <p className="text-xs text-red-500">Corpus depletes before {years} years at this withdrawal rate. Reduce monthly withdrawal or increase initial corpus.</p>
        )}
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="SWP Calculator — Systematic Withdrawal Plan"
      shortTitle="SWP"
      description="Calculate how long your mutual fund corpus will last with monthly SWP withdrawals. Shows corpus depletion timeline and remaining balance. For educational planning purposes only — returns not guaranteed."
      inputs={inputs}
      result={result}
      officialSource="AMFI India / SEBI"
      officialUrl="https://www.amfiindia.com"
      effectiveDate="2024-10-01"
      formula={result.formula}
      faqs={[
        { q: 'What is SWP?', a: 'Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount regularly from a mutual fund investment. Your remaining corpus continues to earn returns.' },
        { q: 'Is SWP tax efficient?', a: 'Each SWP withdrawal is treated as a redemption. LTCG (>1 year for equity) at 12.5% and STCG at 20% applies. Debt fund gains taxed at slab rate. Consult a tax advisor.' },
      ]}
    />
  );
}
