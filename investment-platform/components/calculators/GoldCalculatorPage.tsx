'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateGold } from '@/lib/calculations';
import { getInvestmentById } from '@/lib/data/investments';

export function GoldCalculatorPage() {
  const [investment, setInvestment] = useState(100000);
  const [goldPrice, setGoldPrice] = useState(6800); // per gram approx
  const [expectedReturn, setExpectedReturn] = useState(11);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);
  const [type, setType] = useState<'physical' | 'etf' | 'digital'>('etf');

  const storageCharge = type === 'physical' ? 0.5 : 0;
  const expenseRatio = type === 'etf' ? 0.5 : type === 'digital' ? 0.5 : 0;

  const result = useMemo(() => calculateGold({
    investmentAmount: investment,
    currentGoldPrice: goldPrice,
    expectedAnnualReturn: expectedReturn,
    tenureYears: years,
    inflationRate: inflation,
    storageChargePercent: storageCharge,
    expenseRatio,
  }), [investment, goldPrice, expectedReturn, years, inflation, storageCharge, expenseRatio]);

  const inv = getInvestmentById('gold-etf')!;

  const inputs = (
    <div className="space-y-6">
      {/* Gold type */}
      <div>
        <label className="text-sm font-medium text-text-secondary mb-2 block">Gold Investment Type</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'physical', label: 'Physical Gold', emoji: '🥇', note: 'Coins/bars' },
            { id: 'etf', label: 'Gold ETF', emoji: '📈', note: 'Demat/exchange' },
            { id: 'digital', label: 'Digital Gold', emoji: '💻', note: 'Apps (Paytm, etc.)' },
          ].map((t) => (
            <button key={t.id} onClick={() => setType(t.id as any)}
              className={`p-3 rounded-xl border-2 text-center transition-all text-xs ${type === t.id ? 'border-primary-500' : 'border-surface-border hover:border-primary-300'}`}>
              <div className="text-lg mb-1">{t.emoji}</div>
              <div className="font-medium text-text-primary">{t.label}</div>
              <div className="text-text-muted">{t.note}</div>
            </button>
          ))}
        </div>
        {type === 'physical' && (
          <p className="text-xs text-amber-600 mt-2">Storage charge of 0.5% p.a. applied (bank locker cost). Making charges not included.</p>
        )}
        {type === 'etf' && (
          <p className="text-xs text-text-muted mt-2">Expense ratio 0.5% p.a. applied. No GST (unlike physical gold).</p>
        )}
      </div>

      <Slider label="Investment Amount" value={investment} onChange={setInvestment} min={1000} max={10000000} step={1000}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
      <Slider label="Current Gold Price (per gram)" value={goldPrice} onChange={setGoldPrice} min={3000} max={15000} step={100}
        formatValue={(v) => `₹${v}/g`} tooltip="Check current gold price from IBJA or any authorized source" />
      <div className="p-3 bg-surface-secondary rounded-lg text-xs text-text-muted">
        Grams purchased: <strong>{(investment / goldPrice).toFixed(2)}g</strong>
      </div>
      <Slider label="Expected Annual Return" value={expectedReturn} onChange={setExpectedReturn} min={1} max={25} step={0.5} suffix="% p.a."
        tooltip="Gold historical CAGR in INR (2000-2024): approximately 10-12% p.a. Not guaranteed." />
      <Slider label="Investment Period" value={years} onChange={setYears} min={1} max={30} suffix=" years" />
      <Slider label="Expected Inflation" value={inflation} onChange={setInflation} min={1} max={15} step={0.5} suffix="% p.a." />

      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-xs">
        <strong>Source:</strong> Historical gold return data from India Bullion and Jewellers Association (IBJA). Returns are not guaranteed. Gold prices are volatile and influenced by global factors.
      </div>
    </div>
  );

  return (
    <CalculatorShell
      title="Gold Calculator — Physical Gold, Gold ETF & Digital Gold"
      shortTitle="Gold"
      description="Calculate gold investment returns across physical gold, Gold ETF, and Digital Gold. Historical ~10-12% CAGR in INR over 20 years. LTCG tax implications included. Educational only."
      inputs={inputs}
      result={result}
      officialSource="India Bullion and Jewellers Association (IBJA) / SEBI"
      officialUrl="https://www.ibjarates.com"
      effectiveDate="2024-10-01"
      encyclopediaHref="/investments/precious-metals/gold"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
