'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateRD } from '@/lib/calculations';
import { getInvestmentById } from '@/lib/data/investments';

export function RDCalculatorPage() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(7.0);
  const [months, setMonths] = useState(36);
  const [inflation, setInflation] = useState(6);

  const result = useMemo(() => calculateRD({
    monthlyInstallment: monthly,
    annualRate: rate,
    tenureMonths: months,
    inflationRate: inflation,
  }), [monthly, rate, months, inflation]);

  const inv = getInvestmentById('rd')!;

  const inputs = (
    <div className="space-y-6">
      <Slider label="Monthly Installment" value={monthly} onChange={setMonthly} min={100} max={500000} step={100}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} tooltip="Fixed amount deposited every month" />
      <Slider label="Annual Interest Rate" value={rate} onChange={setRate} min={3} max={12} step={0.05} suffix="% p.a."
        tooltip="Check your bank's current RD rate. Usually same as FD rate for equivalent tenure." />
      <Slider label="Tenure" value={months} onChange={setMonths} min={6} max={120} step={6} suffix=" months"
        tooltip="RD tenure: 6 months to 10 years" />
      <Slider label="Expected Inflation" value={inflation} onChange={setInflation} min={1} max={15} step={0.5} suffix="% p.a." />
      <div className="p-3 bg-surface-secondary rounded-lg text-xs text-text-muted">
        Tenure: <strong>{(months / 12).toFixed(1)} years</strong> | Total invested: <strong>₹{(monthly * months).toLocaleString('en-IN')}</strong>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="RD Calculator — Recurring Deposit Maturity Calculator"
      shortTitle="RD"
      description="Calculate Recurring Deposit maturity amount with quarterly compounding. Monthly installment savings with guaranteed bank returns. Year-wise breakdown included."
      inputs={inputs}
      result={result}
      officialSource="Reserve Bank of India (RBI)"
      officialUrl="https://www.rbi.org.in"
      effectiveDate="2024-10-01"
      encyclopediaHref="/investments/bank-deposits/rd"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
