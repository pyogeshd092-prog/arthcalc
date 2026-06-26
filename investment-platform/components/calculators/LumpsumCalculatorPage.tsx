'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateLumpsum } from '@/lib/calculations';

export function LumpsumCalculatorPage() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);

  const result = useMemo(() => calculateLumpsum(principal, rate, years, inflation), [principal, rate, years, inflation]);

  const inputs = (
    <div className="space-y-6">
      <Slider label="One-Time Investment" value={principal} onChange={setPrincipal} min={1000} max={50000000} step={10000}
        formatValue={(v) => `₹${(v/100000).toFixed(1)}L`} tooltip="Lump sum amount invested once" />
      <Slider label="Expected Annual Return (CAGR)" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="% p.a."
        tooltip="Historical large-cap equity fund CAGR (10 yr): 11-14%. Debt funds: 6-8%. Not guaranteed." />
      <Slider label="Investment Period" value={years} onChange={setYears} min={1} max={30} suffix=" years" />
      <Slider label="Expected Inflation" value={inflation} onChange={setInflation} min={1} max={15} step={0.5} suffix="% p.a." />
      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
        Lumpsum carries timing risk — you invest all at once. SIP averages out this risk through regular purchases.
        Returns are not guaranteed. For educational illustration only.
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="Lumpsum Mutual Fund Calculator — One-Time Investment"
      shortTitle="Lumpsum"
      description="Calculate potential wealth from a one-time lumpsum mutual fund investment. Compare lumpsum vs SIP approach. Year-wise growth breakdown. Returns not guaranteed — market-linked. Educational only."
      inputs={inputs}
      result={result}
      officialSource="AMFI India / SEBI"
      officialUrl="https://www.amfiindia.com"
      effectiveDate="2024-10-01"
      formula={result.formula}
      faqs={[
        { q: 'Lumpsum vs SIP — what is the difference?', a: 'Lumpsum invests all money at once. SIP invests regularly. SIP benefits from rupee-cost averaging — you buy more units when price is low. Lumpsum may work better if markets are at a low point. Both have risks.' },
        { q: 'What is CAGR?', a: 'Compound Annual Growth Rate — the annualized return rate assuming reinvestment of profits each year. Formula: CAGR = (Final Value/Initial Value)^(1/years) - 1.' },
      ]}
    />
  );
}
