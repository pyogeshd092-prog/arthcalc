'use client';

import { useState, useMemo } from 'react';
import { Slider, Input } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateFD } from '@/lib/calculations';
import { getInvestmentById } from '@/lib/data/investments';

export function FDCalculatorPage() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7.25);
  const [tenureYears, setTenureYears] = useState(5);
  const [compounding, setCompounding] = useState(4); // quarterly
  const [inflation, setInflation] = useState(6);
  const [isSenior, setIsSenior] = useState(false);

  const result = useMemo(() => calculateFD({
    principal,
    annualRate: rate,
    tenureYears,
    compoundingFrequency: compounding,
    inflationRate: inflation,
    isSeniorCitizen: isSenior,
    seniorCitizenBonus: 0.5,
  }), [principal, rate, tenureYears, compounding, inflation, isSenior]);

  const inv = getInvestmentById('fd')!;

  const inputs = (
    <div className="space-y-6">
      <Slider
        label="Principal Amount"
        value={principal}
        onChange={setPrincipal}
        min={1000}
        max={10000000}
        step={1000}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}`}
        tooltip="One-time lump sum you deposit in the FD"
      />
      <Slider
        label="Annual Interest Rate"
        value={rate}
        onChange={setRate}
        min={3}
        max={12}
        step={0.05}
        suffix="% p.a."
        tooltip="Check your bank's current FD rate for your chosen tenure. Rates vary by bank, tenure, and amount."
      />
      <Slider
        label="Tenure"
        value={tenureYears}
        onChange={setTenureYears}
        min={0.5}
        max={10}
        step={0.5}
        suffix=" years"
      />

      {/* Compounding */}
      <div>
        <label className="text-sm font-medium text-text-secondary mb-2 block">
          Compounding Frequency
        </label>
        <select
          value={compounding}
          onChange={(e) => setCompounding(Number(e.target.value))}
          className="input-base"
        >
          <option value={4}>Quarterly (Standard)</option>
          <option value={12}>Monthly</option>
          <option value={2}>Semi-annually</option>
          <option value={1}>Annually</option>
        </select>
      </div>

      <Slider
        label="Expected Inflation"
        value={inflation}
        onChange={setInflation}
        min={1}
        max={15}
        step={0.5}
        suffix="% p.a."
        tooltip="Used only to calculate inflation-adjusted (real) value. Doesn't change FD returns."
      />

      {/* Senior citizen toggle */}
      <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-xl border border-surface-border">
        <div>
          <p className="text-sm font-medium text-text-primary">Senior Citizen (60+ years)</p>
          <p className="text-xs text-text-muted">Adds +0.5% to interest rate</p>
        </div>
        <button
          onClick={() => setIsSenior(!isSenior)}
          className={`w-11 h-6 rounded-full transition-all ${isSenior ? 'bg-primary-500' : 'bg-surface-tertiary border border-surface-border'}`}
        >
          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform mx-0.5 ${isSenior ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="Fixed Deposit (FD) Calculator"
      shortTitle="FD"
      description="Calculate the maturity amount and total interest earned on your Fixed Deposit. Includes quarterly compounding, senior citizen bonus, and inflation-adjusted real value."
      inputs={inputs}
      result={result}
      officialSource="Reserve Bank of India (RBI)"
      officialUrl="https://www.rbi.org.in"
      effectiveDate="2024-10-01"
      encyclopediaHref="/investments/bank-deposits/fd"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
