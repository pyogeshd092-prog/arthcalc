'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from './CalculatorShell';
import { calculateTBill } from '@/lib/calculations';
import { DisclaimerBox, SourceBadge, formatINR } from '@/components/ui';
import { getInvestmentById } from '@/lib/data/investments';

export function TBillCalculatorPage() {
  const [faceValue, setFaceValue] = useState(100000);
  const [yield_, setYield] = useState(6.9);
  const [days, setDays] = useState(91);

  const tbill = useMemo(() => calculateTBill(faceValue, yield_, days), [faceValue, yield_, days]);
  const inv = getInvestmentById('t-bills')!;

  // Create a dummy CalcResult for CalculatorShell
  const result = {
    investedAmount: tbill.purchasePrice,
    estimatedReturns: tbill.discount,
    maturityValue: faceValue,
    inflationAdjustedValue: faceValue,
    effectiveAnnualReturn: tbill.annualizedReturn,
    yearlyBreakdown: [{ year: 1, invested: tbill.purchasePrice, interest: tbill.discount, total: faceValue }],
    formula: `Purchase Price = Face Value / (1 + (yield/100) × (days/365))
Discount = Face Value - Purchase Price
Return % = (Discount / Purchase Price) × 100
Annualized Return = Return% × (365/days)`,
    assumptions: [
      `Face value: ₹${faceValue.toLocaleString('en-IN')}`,
      `Yield: ${yield_}% p.a.`,
      `Tenure: ${days} days`,
      'T-Bills issued at discount. No interest payments — profit = discount at maturity.',
      'Zero credit risk — Government of India guarantee.',
    ],
    source: 'Reserve Bank of India (RBI). Rates from weekly auctions.',
  };

  const inputs = (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-text-secondary mb-2 block">T-Bill Tenure</label>
        <div className="grid grid-cols-3 gap-2">
          {[91, 182, 364].map((d) => (
            <button key={d} onClick={() => setDays(d)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${days === d ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-surface-border hover:border-primary-300'}`}>
              <div className="font-bold text-text-primary">{d} days</div>
              <div className="text-xs text-text-muted">{d === 91 ? '~3 months' : d === 182 ? '~6 months' : '~1 year'}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-text-secondary mb-2 block">Face Value (₹)</label>
        <input type="number" value={faceValue} min={10000} step={10000}
          onChange={(e) => setFaceValue(Number(e.target.value))}
          className="input-base" />
        <p className="text-xs text-text-muted mt-1">Minimum bid: ₹10,000. Multiples of ₹10,000.</p>
      </div>

      <div>
        <label className="text-sm font-medium text-text-secondary mb-2 block">Yield / Cut-off Rate (%)</label>
        <input type="number" value={yield_} min={1} max={20} step={0.01}
          onChange={(e) => setYield(Number(e.target.value))}
          className="input-base" />
        <p className="text-xs text-text-muted mt-1">
          Check latest auction results at: <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer"
            className="underline" style={{ color: 'var(--primary-500)' }}>rbi.org.in</a>
        </p>
      </div>

      {/* Results preview */}
      <div className="p-4 bg-surface-secondary rounded-xl border border-surface-border space-y-3">
        <p className="text-sm font-bold text-text-primary">T-Bill Summary</p>
        {[
          { label: 'You Pay (Purchase Price)', value: `₹${tbill.purchasePrice.toFixed(2)}` },
          { label: 'Discount (Your Profit)', value: `₹${tbill.discount.toFixed(2)}`, color: '#10b981' },
          { label: 'You Receive at Maturity', value: `₹${faceValue.toLocaleString('en-IN')}` },
          { label: 'Return for Period', value: `${tbill.returnPct.toFixed(4)}%` },
          { label: 'Annualized Return', value: `${tbill.annualizedReturn.toFixed(2)}% p.a.`, color: 'var(--accent-500)' },
        ].map((r) => (
          <div key={r.label} className="flex justify-between text-sm">
            <span className="text-text-muted">{r.label}</span>
            <span className="font-bold" style={{ color: r.color || 'var(--text-primary)' }}>{r.value}</span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
        <strong>How to buy:</strong> Register at <a href="https://rbiretaildirect.org.in" target="_blank" rel="noopener noreferrer" className="underline">rbiretaildirect.org.in</a> — free, direct, no commission.
        Auctions conducted every Wednesday (91-day) and Friday (182, 364-day).
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="T-Bill Calculator — Treasury Bills (91/182/364 Days)"
      shortTitle="T-Bills"
      description="Calculate Treasury Bill returns for 91-day, 182-day, and 364-day tenures. Zero default risk — Government of India guarantee. Buy directly at RBI Retail Direct (no commission). For educational purposes only."
      inputs={inputs}
      result={result}
      officialSource="Reserve Bank of India (RBI)"
      officialUrl="https://rbiretaildirect.org.in"
      effectiveDate="2024-10-01"
      encyclopediaHref="/investments/government-securities/t-bills"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
