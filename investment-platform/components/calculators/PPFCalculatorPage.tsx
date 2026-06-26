'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculatePPF } from '@/lib/calculations';
import { getInvestmentById } from '@/lib/data/investments';

export function PPFCalculatorPage() {
  const [yearlyDeposit, setYearlyDeposit] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [tenure, setTenure] = useState(15);
  const [inflation, setInflation] = useState(6);
  const [timing, setTiming] = useState<'start' | 'end'>('start');

  const result = useMemo(() => calculatePPF({
    yearlyDeposit,
    annualRate: rate,
    tenure,
    inflationRate: inflation,
    depositTiming: timing,
  }), [yearlyDeposit, rate, tenure, inflation, timing]);

  const inv = getInvestmentById('ppf')!;

  const inputs = (
    <div className="space-y-6">
      <Slider
        label="Yearly Deposit"
        value={yearlyDeposit}
        onChange={setYearlyDeposit}
        min={500}
        max={150000}
        step={500}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}`}
        tooltip="Maximum ₹1,50,000 per year allowed. Eligible for Section 80C deduction."
      />
      <div className="flex items-center gap-2 -mt-2">
        <button
          onClick={() => setYearlyDeposit(150000)}
          className="text-xs px-3 py-1 rounded-full border border-surface-border hover:bg-surface-secondary transition-colors text-text-secondary"
        >
          Max (₹1.5L)
        </button>
        <button
          onClick={() => setYearlyDeposit(100000)}
          className="text-xs px-3 py-1 rounded-full border border-surface-border hover:bg-surface-secondary transition-colors text-text-secondary"
        >
          ₹1L
        </button>
        <button
          onClick={() => setYearlyDeposit(50000)}
          className="text-xs px-3 py-1 rounded-full border border-surface-border hover:bg-surface-secondary transition-colors text-text-secondary"
        >
          ₹50K
        </button>
      </div>

      <div className="p-4 bg-surface-secondary rounded-xl border border-surface-border">
        <p className="text-sm font-medium text-text-primary mb-1">PPF Interest Rate</p>
        <p className="text-2xl font-bold" style={{ color: 'var(--accent-500)' }}>{rate}% p.a.</p>
        <p className="text-xs text-text-muted mt-1">Government-declared. Currently 7.1% (Q1 FY2024-25)</p>
        <Slider
          label=""
          value={rate}
          onChange={setRate}
          min={5}
          max={12}
          step={0.1}
          suffix="% p.a."
          tooltip="Government declares PPF rate quarterly. Historical range: 7.1%–12%. Default is current official rate."
        />
      </div>

      <Slider
        label="Tenure"
        value={tenure}
        onChange={setTenure}
        min={15}
        max={50}
        suffix=" years"
        tooltip="Minimum 15 years. Can extend in 5-year blocks. Interest keeps accruing tax-free throughout."
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

      {/* Deposit timing */}
      <div>
        <label className="text-sm font-medium text-text-secondary mb-2 block">Deposit Timing</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'start', label: '1st April', desc: 'Full year interest' },
            { value: 'end', label: 'Year End', desc: 'Less interest' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTiming(opt.value as any)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                timing === opt.value ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-surface-border hover:border-primary-300'
              }`}
            >
              <div className="text-sm font-medium text-text-primary">{opt.label}</div>
              <div className="text-xs text-text-muted">{opt.desc}</div>
            </button>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-2">
          Tip: Depositing before April 5th each year earns interest for the full month of April.
        </p>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="PPF Calculator — Public Provident Fund (7.1%)"
      shortTitle="PPF"
      description="Calculate PPF maturity value with complete EEE (Exempt-Exempt-Exempt) tax treatment. Current rate: 7.1% p.a. Government declared. 15-year minimum tenure. Sovereign guarantee."
      inputs={inputs}
      result={result}
      officialSource="Ministry of Finance (DEA) / India Post"
      officialUrl="https://dea.gov.in/page/small-savings-schemes"
      effectiveDate="2023-04-01"
      encyclopediaHref="/investments/post-office/ppf"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
