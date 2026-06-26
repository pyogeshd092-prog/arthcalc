'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui';
import { CalculatorShell } from './CalculatorShell';
import { calculateEPF } from '@/lib/calculations';
import { getInvestmentById } from '@/lib/data/investments';

export function EPFCalculatorPage() {
  const [basicSalary, setBasicSalary] = useState(30000);
  const [rate, setRate] = useState(8.25);
  const [years, setYears] = useState(25);
  const [salaryGrowth, setSalaryGrowth] = useState(8);
  const [inflation, setInflation] = useState(6);

  const result = useMemo(() => calculateEPF({
    basicSalary,
    employeeContribPct: 12,
    employerContribPct: 3.67,
    annualRate: rate,
    tenureYears: years,
    annualSalaryGrowth: salaryGrowth,
    inflationRate: inflation,
  }), [basicSalary, rate, years, salaryGrowth, inflation]);

  const inv = getInvestmentById('epf')!;

  const inputs = (
    <div className="space-y-6">
      <Slider
        label="Current Basic Salary + DA"
        value={basicSalary}
        onChange={setBasicSalary}
        min={5000}
        max={500000}
        step={1000}
        formatValue={(v) => `₹${v.toLocaleString('en-IN')}/mo`}
        tooltip="EPF contributions are 12% of Basic Salary + Dearness Allowance (DA)"
      />

      <div className="p-4 bg-surface-secondary rounded-xl border border-surface-border space-y-2">
        <p className="text-sm font-semibold text-text-primary">Contribution Breakdown</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-text-muted text-xs">Your contribution (12%)</p>
            <p className="font-bold" style={{ color: 'var(--primary-600)' }}>
              ₹{(basicSalary * 0.12).toLocaleString('en-IN')}/mo
            </p>
          </div>
          <div>
            <p className="text-text-muted text-xs">Employer to EPF (3.67%)</p>
            <p className="font-bold text-emerald-600">
              ₹{(basicSalary * 0.0367).toFixed(0)}/mo
            </p>
          </div>
        </div>
        <p className="text-xs text-text-muted">
          Note: Employer's remaining 8.33% goes to Employee Pension Scheme (EPS), not EPF.
        </p>
      </div>

      <div className="p-4 bg-surface-secondary rounded-xl border border-surface-border">
        <p className="text-sm font-medium text-text-primary mb-1">EPF Interest Rate</p>
        <p className="text-2xl font-bold" style={{ color: 'var(--accent-500)' }}>{rate}% p.a.</p>
        <p className="text-xs text-text-muted">EPFO declared. Currently 8.25% for FY2023-24.</p>
        <Slider label="" value={rate} onChange={setRate} min={5} max={12} step={0.05} suffix="%" tooltip="EPFO declares EPF interest rate annually. Historical range 8.1%–9.5%." />
      </div>

      <Slider
        label="Working Years Until Retirement"
        value={years}
        onChange={setYears}
        min={1}
        max={40}
        suffix=" years"
      />
      <Slider
        label="Annual Salary Growth"
        value={salaryGrowth}
        onChange={setSalaryGrowth}
        min={0}
        max={30}
        suffix="% p.a."
        tooltip="Expected annual increment in basic salary. This increases EPF contributions over time."
      />
      <Slider label="Expected Inflation" value={inflation} onChange={setInflation} min={1} max={15} step={0.5} suffix="% p.a." />
    </div>
  );

  return (
    <CalculatorShell
      title="EPF Calculator — Employee Provident Fund (8.25%)"
      shortTitle="EPF"
      description="Calculate your EPF retirement corpus including both employee (12%) and employer (3.67% EPF) contributions. Current EPFO rate: 8.25% p.a. With salary growth simulation and inflation-adjusted value."
      inputs={inputs}
      result={result}
      officialSource="Employees' Provident Fund Organisation (EPFO)"
      officialUrl="https://www.epfindia.gov.in"
      effectiveDate="2023-04-01"
      encyclopediaHref="/investments/retirement-pension/epf"
      formula={result.formula}
      faqs={inv.faqs}
    />
  );
}
