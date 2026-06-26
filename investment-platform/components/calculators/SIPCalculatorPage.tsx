'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateSIP } from '@/lib/calculations';
import { getInvestmentById } from '@/lib/data/investments';

export function SIPCalculatorPage() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);
  const [stepUp, setStepUp] = useState(0);

  const result = useMemo(() => calculateSIP({
    monthlyAmount: monthly,
    annualReturn: rate,
    tenureYears: years,
    inflationRate: inflation,
    stepUpPercent: stepUp || undefined,
  }), [monthly, rate, years, inflation, stepUp]);

  const inv = getInvestmentById('sip')!;

  const inputs = (
    <div className="space-y-6">
      <Slider
        label="Monthly SIP Amount"
        value={monthly}
        onChange={setMonthly}
        min={100}
        max={500000}
        step={500}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}`}
        tooltip="Fixed amount auto-debited every month"
      />
      <Slider
        label="Expected Annual Return"
        value={rate}
        onChange={setRate}
        min={1}
        max={30}
        step={0.5}
        suffix="% p.a."
        tooltip="Historical equity mutual fund SIP CAGR: 10-15% over 10+ years. Debt funds: 6-8%. Returns not guaranteed."
      />
      <Slider
        label="Investment Period"
        value={years}
        onChange={setYears}
        min={1}
        max={40}
        suffix=" years"
      />
      <Slider
        label="Annual Step-Up"
        value={stepUp}
        onChange={setStepUp}
        min={0}
        max={30}
        suffix="%"
        tooltip="Increase your SIP amount by this % every year. 0% = no step-up (fixed SIP)."
      />
      <Slider
        label="Expected Inflation"
        value={inflation}
        onChange={setInflation}
        min={1}
        max={15}
        step={0.5}
        suffix="% p.a."
      />

      {/* Educational note */}
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
        <strong>Important:</strong> SIP returns are market-linked and not guaranteed. The return rate you enter is an assumption for educational illustration. Historical performance does not guarantee future results.
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="SIP Calculator — Systematic Investment Plan"
      shortTitle="SIP"
      description="Calculate potential wealth creation through SIP investments in mutual funds. Includes step-up SIP, inflation-adjusted value, and year-wise growth breakdown. For educational purposes only — returns not guaranteed."
      inputs={inputs}
      result={result}
      officialSource="AMFI India (Association of Mutual Funds in India)"
      officialUrl="https://www.amfiindia.com"
      effectiveDate="2024-10-01"
      encyclopediaHref="/investments/investment-methods/sip"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
