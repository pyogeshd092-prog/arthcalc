'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateNPS } from '@/lib/calculations';
import { getInvestmentById } from '@/lib/data/investments';

export function NPSCalculatorPage() {
  const [monthly, setMonthly] = useState(5000);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [equityAlloc, setEquityAlloc] = useState(75);
  const [annuityRate, setAnnuityRate] = useState(6);
  const [annuityPortion, setAnnuityPortion] = useState(40);
  const [inflation, setInflation] = useState(6);

  const result = useMemo(() => calculateNPS({
    monthlyContribution: monthly,
    currentAge,
    retirementAge,
    expectedReturn,
    equityAllocation: equityAlloc,
    annuityRate,
    annuityPortion,
    inflationRate: inflation,
  }), [monthly, currentAge, retirementAge, expectedReturn, equityAlloc, annuityRate, annuityPortion, inflation]);

  const inv = getInvestmentById('nps')!;
  const years = retirementAge - currentAge;
  const corpus = result.maturityValue;
  const annuityCorpus = corpus * (annuityPortion / 100);
  const monthlyPension = (annuityCorpus * annuityRate / 100) / 12;
  const lumpSum = corpus * (1 - annuityPortion / 100);

  const inputs = (
    <div className="space-y-6">
      <Slider
        label="Monthly NPS Contribution"
        value={monthly}
        onChange={setMonthly}
        min={500}
        max={100000}
        step={500}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}`}
        tooltip="Amount you contribute to Tier I NPS account monthly. Tax benefit under 80CCD(1) up to 10% of salary, extra ₹50,000 under 80CCD(1B)."
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">Current Age</label>
          <input type="number" value={currentAge} min={18} max={65}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="input-base" />
        </div>
        <div>
          <label className="text-sm font-medium text-text-secondary mb-2 block">Retirement Age</label>
          <input type="number" value={retirementAge} min={currentAge + 1} max={75}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className="input-base" />
        </div>
      </div>
      <div className="p-3 bg-surface-secondary rounded-lg text-xs text-text-muted">
        Investment period: <strong>{years} years</strong>
      </div>
      <Slider
        label="Expected Return (CAGR)"
        value={expectedReturn}
        onChange={setExpectedReturn}
        min={4}
        max={20}
        step={0.5}
        suffix="% p.a."
        tooltip="NPS returns are market-linked — depends on equity/debt allocation and fund manager performance. Not guaranteed."
      />
      <Slider
        label="Equity Allocation"
        value={equityAlloc}
        onChange={setEquityAlloc}
        min={0}
        max={75}
        suffix="%"
        tooltip="Maximum 75% equity allowed for subscribers below 50. Auto Choice reduces equity with age."
      />
      <Slider
        label="Annuity Portion at Retirement"
        value={annuityPortion}
        onChange={(v) => setAnnuityPortion(Math.max(40, v))}
        min={40}
        max={100}
        suffix="%"
        tooltip="Minimum 40% of NPS corpus must be used to purchase annuity (monthly pension) at retirement."
      />
      <Slider
        label="Assumed Annuity Rate"
        value={annuityRate}
        onChange={setAnnuityRate}
        min={4}
        max={10}
        step={0.5}
        suffix="% p.a."
        tooltip="Rate at which annuity provider will pay monthly pension. Actual rate depends on provider, age, type of annuity chosen."
      />

      {/* NPS payout preview */}
      <div className="p-4 bg-surface-secondary rounded-xl border border-surface-border space-y-2 text-sm">
        <p className="font-semibold text-text-primary">Projected NPS at Retirement</p>
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-text-muted">Total Corpus</span>
            <span className="font-bold" style={{ color: 'var(--accent-500)' }}>
              ₹{corpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Lump Sum (tax-free)</span>
            <span className="font-semibold text-emerald-600">₹{lumpSum.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Annuity Corpus</span>
            <span className="font-semibold text-text-primary">₹{annuityCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between border-t border-surface-border pt-2">
            <span className="text-text-muted">Est. Monthly Pension</span>
            <span className="font-bold text-primary-600">₹{monthlyPension.toLocaleString('en-IN', { maximumFractionDigits: 0 })}/mo</span>
          </div>
        </div>
        <p className="text-xs text-text-muted">Returns not guaranteed. Annuity rate varies by provider and age at retirement.</p>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="NPS Calculator — National Pension System"
      shortTitle="NPS"
      description="Calculate NPS corpus, estimated monthly pension, and lump sum withdrawal at retirement. Additional ₹50,000 tax benefit under Section 80CCD(1B). PFRDA regulated market-linked pension."
      inputs={inputs}
      result={result}
      officialSource="Pension Fund Regulatory and Development Authority (PFRDA)"
      officialUrl="https://www.pfrda.org.in"
      effectiveDate="2024-01-01"
      encyclopediaHref="/investments/retirement-pension/nps"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
