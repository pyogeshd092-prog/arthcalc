'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateLumpsum, calculateSIP } from '@/lib/calculations';

export function GenericCalculatorPage() {
  const [mode, setMode] = useState<'lumpsum' | 'sip'>('sip');
  const [amount, setAmount] = useState(5000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);

  const result = useMemo(() => {
    if (mode === 'lumpsum') return calculateLumpsum(amount, rate, years, inflation);
    return calculateSIP({ monthlyAmount: amount, annualReturn: rate, tenureYears: years, inflationRate: inflation });
  }, [mode, amount, rate, years, inflation]);

  const inputs = (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2">
        {[{ id: 'sip', label: 'Monthly SIP' }, { id: 'lumpsum', label: 'Lumpsum' }].map((m) => (
          <button key={m.id} onClick={() => setMode(m.id as any)}
            className={`py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${mode === m.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700' : 'border-surface-border text-text-secondary hover:border-primary-300'}`}>
            {m.label}
          </button>
        ))}
      </div>
      <Slider label={mode === 'sip' ? 'Monthly Amount' : 'Lump Sum Amount'} value={amount} onChange={setAmount}
        min={100} max={1000000} step={100} formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
      <Slider label="Expected Annual Return" value={rate} onChange={setRate} min={1} max={25} step={0.5} suffix="% p.a." />
      <Slider label="Investment Period" value={years} onChange={setYears} min={1} max={30} suffix=" years" />
      <Slider label="Expected Inflation" value={inflation} onChange={setInflation} min={1} max={15} step={0.5} suffix="% p.a." />
    </div>
  );

  return (
    <CalculatorShell
      title="Investment Calculator"
      shortTitle="Calculator"
      description="Calculate estimated returns for various investment types. Enter your amount, expected return, and tenure to see projected maturity value. For educational purposes only."
      inputs={inputs}
      result={result}
      officialSource="SEBI / RBI / AMFI"
      officialUrl="https://www.sebi.gov.in"
      effectiveDate="2024-10-01"
      formula={result.formula}
      faqs={[
        { q: 'How is this calculated?', a: 'For SIP: Uses standard SIP formula M = P × [(1+r)^n – 1] / r × (1+r). For Lumpsum: A = P × (1+r)^n. All values are estimates based on assumed return rates.' },
      ]}
    />
  );
}
