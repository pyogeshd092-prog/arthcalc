'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateSSY } from '@/lib/calculations';
import { getInvestmentById } from '@/lib/data/investments';

export function SSYCalculatorPage() {
  const [yearly, setYearly] = useState(150000);
  const [age, setAge] = useState(5);
  const [rate, setRate] = useState(8.2);
  const [inflation, setInflation] = useState(6);

  const result = useMemo(() => calculateSSY({ yearlyDeposit: yearly, currentAge: age, rate, inflationRate: inflation }),
    [yearly, age, rate, inflation]);
  const inv = getInvestmentById('ssy')!;

  const maturityAge = 21;
  const maturityYear = new Date().getFullYear() + (maturityAge - age);

  const inputs = (
    <div className="space-y-6">
      <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800 text-sm">
        <p className="font-semibold text-pink-800 dark:text-pink-300 mb-1">👧 Sukanya Samriddhi Yojana</p>
        <p className="text-xs text-pink-700 dark:text-pink-400">
          Exclusively for girl children below 10 years. Opens in girl's name with parent as guardian.
          Highest small savings rate: 8.2% p.a. EEE tax status.
        </p>
      </div>
      <div>
        <label className="text-sm font-medium text-text-secondary mb-2 block">Girl Child's Current Age</label>
        <input type="number" value={age} min={1} max={10}
          onChange={(e) => setAge(Math.min(10, Math.max(1, Number(e.target.value))))}
          className="input-base" />
        <p className="text-xs text-text-muted mt-1">Must be below 10 years at account opening. Account matures at age 21 (~{maturityYear}).</p>
      </div>
      <Slider label="Yearly Deposit" value={yearly} onChange={setYearly} min={250} max={150000} step={250}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}`}
        tooltip="Min ₹250, max ₹1,50,000 per year. Eligible for Section 80C deduction." />
      <div className="p-4 bg-surface-secondary rounded-xl border border-surface-border">
        <p className="text-sm font-medium text-text-primary mb-1">SSY Interest Rate</p>
        <p className="text-2xl font-bold" style={{ color: 'var(--accent-500)' }}>{rate}% p.a.</p>
        <p className="text-xs text-text-muted">Min. of Finance (Q1 FY2024-25) — highest small savings rate</p>
        <Slider label="" value={rate} onChange={setRate} min={5} max={12} step={0.1} suffix="%" />
      </div>
      <Slider label="Expected Inflation" value={inflation} onChange={setInflation} min={1} max={15} step={0.5} suffix="% p.a." />
      <div className="p-3 bg-surface-secondary rounded-lg text-xs text-text-muted">
        Deposits for <strong>15 years</strong> | Account matures at age <strong>21</strong> (~{maturityYear}) | Total deposit years: <strong>15</strong>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="SSY Calculator — Sukanya Samriddhi Yojana (8.2%)"
      shortTitle="SSY"
      description="Calculate SSY maturity for your daughter. Current rate 8.2% p.a. — highest among small savings schemes. Deposits for 15 years, matures at age 21. EEE triple tax benefit. For educational purposes only."
      inputs={inputs}
      result={result}
      officialSource="Ministry of Finance / India Post"
      officialUrl="https://dea.gov.in/page/small-savings-schemes"
      effectiveDate="2024-01-01"
      encyclopediaHref="/investments/post-office/ssy"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
