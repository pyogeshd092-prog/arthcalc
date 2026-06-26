'use client';

import { useState, useMemo } from 'react';
import { Slider, DisclaimerBox } from '@/components/ui';
import { formatINR } from '@/components/ui';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Link from 'next/link';

const INVESTMENTS = [
  { id: 'fd', label: 'Fixed Deposit', rate: 7.0, color: '#3b82f6', type: 'monthly' },
  { id: 'ppf', label: 'PPF', rate: 7.1, color: '#10b981', type: 'monthly' },
  { id: 'rd', label: 'Recurring Deposit', rate: 6.7, color: '#0ea5e9', type: 'monthly' },
  { id: 'sip-large', label: 'Large Cap SIP (est.)', rate: 11.0, color: '#f59e0b', type: 'monthly' },
  { id: 'sip-mid', label: 'Mid Cap SIP (est.)', rate: 14.0, color: '#f97316', type: 'monthly' },
  { id: 'elss', label: 'ELSS SIP (est.)', rate: 13.0, color: '#ec4899', type: 'monthly' },
  { id: 'nps', label: 'NPS (est.)', rate: 10.0, color: '#6366f1', type: 'monthly' },
  { id: 'gold', label: 'Gold ETF (est.)', rate: 8.0, color: '#d97706', type: 'monthly' },
];

function sipValue(monthly: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-primary border border-surface-border rounded-xl shadow-card p-3 text-sm max-w-xs">
      <p className="font-bold text-text-primary mb-2">{label} years</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
            <span className="text-text-muted text-xs truncate">{p.name}</span>
          </span>
          <span className="font-semibold text-text-primary text-xs">{formatINR(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

const MILESTONES = [5, 10, 15, 20, 25, 30];

export function JourneySimulatorClient() {
  const [monthly, setMonthly] = useState(5000);
  const [maxYears, setMaxYears] = useState(20);
  const [selectedInvs, setSelectedInvs] = useState<string[]>(['fd', 'ppf', 'sip-large', 'nps']);

  const toggleInv = (id: string) => {
    setSelectedInvs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const chartData = useMemo(() => {
    return Array.from({ length: maxYears }, (_, i) => {
      const y = i + 1;
      const row: any = { year: y, invested: monthly * 12 * y };
      for (const inv of INVESTMENTS) {
        if (selectedInvs.includes(inv.id)) {
          row[inv.label] = Math.round(sipValue(monthly, inv.rate, y));
        }
      }
      return row;
    });
  }, [monthly, maxYears, selectedInvs]);

  const milestoneData = useMemo(() => {
    return MILESTONES.filter((m) => m <= maxYears).map((y) => {
      const invested = monthly * 12 * y;
      const vals = INVESTMENTS.map((inv) => ({
        ...inv,
        maturity: Math.round(sipValue(monthly, inv.rate, y)),
      })).sort((a, b) => b.maturity - a.maturity);
      return { years: y, invested, vals };
    });
  }, [monthly, maxYears]);

  const activeInvs = INVESTMENTS.filter((i) => selectedInvs.includes(i.id));

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Investment Journey Simulator</h1>
          <p className="text-primary-200 text-lg">Watch your money grow year by year across all investment options</p>
          <p className="text-primary-300 text-sm mt-2">Educational estimates only • Market-linked returns are assumed, not guaranteed</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <DisclaimerBox />

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card space-y-6">
            <h2 className="font-bold text-text-primary">Simulation Settings</h2>
            <Slider label="Monthly Investment" value={monthly} onChange={setMonthly}
              min={500} max={100000} step={500} formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
            <Slider label="Simulate for how many years?" value={maxYears} onChange={setMaxYears}
              min={5} max={40} suffix=" years" />
            <div className="p-3 bg-surface-secondary rounded-xl border border-surface-border flex justify-between items-center">
              <span className="text-sm text-text-secondary">Total amount you invest</span>
              <span className="font-bold text-primary-600">{formatINR(monthly * 12 * maxYears)}</span>
            </div>
          </div>
          <div className="card">
            <h2 className="font-bold text-text-primary mb-3">Select investments to compare</h2>
            <div className="grid grid-cols-2 gap-2">
              {INVESTMENTS.map((inv) => (
                <button key={inv.id} onClick={() => toggleInv(inv.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-left transition-all ${selectedInvs.includes(inv.id) ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-surface-border hover:border-primary-300'}`}>
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: inv.color }} />
                  <span className="text-xs font-medium text-text-primary">{inv.label}</span>
                  <span className="ml-auto text-xs text-green-600 font-semibold">{inv.rate}%</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-3">* est. = estimated historical average, not guaranteed</p>
          </div>
        </div>

        {/* Line Chart */}
        {activeInvs.length > 0 && (
          <section className="card">
            <h2 className="font-bold text-text-primary mb-1">Year-by-Year Growth Journey</h2>
            <p className="text-xs text-text-muted mb-6">Monthly investment of ₹{monthly.toLocaleString('en-IN')} over {maxYears} years</p>
            <ResponsiveContainer width="100%" height={380}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-border)" />
                <XAxis dataKey="year" tickFormatter={(v) => `Yr ${v}`} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
                <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line dataKey="invested" name="Amount Invested" stroke="#94a3b8" strokeDasharray="5 5" dot={false} strokeWidth={1.5} />
                {activeInvs.map((inv) => (
                  <Line key={inv.id} type="monotone" dataKey={inv.label} stroke={inv.color} dot={false} strokeWidth={2.5} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </section>
        )}

        {/* Milestone Cards */}
        <section>
          <h2 className="text-xl font-bold text-text-primary mb-5">Key Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {milestoneData.map((m) => (
              <div key={m.years} className="card">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary-600">{m.years} Years</div>
                  <div className="text-right">
                    <div className="text-xs text-text-muted">Invested</div>
                    <div className="font-bold text-text-secondary">{formatINR(m.invested)}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {m.vals.slice(0, 5).map((inv, rank) => (
                    <div key={inv.id} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: inv.color }}>{rank + 1}</span>
                      <span className="text-xs text-text-secondary flex-1 truncate">{inv.label}</span>
                      <span className="text-xs font-bold text-text-primary">{formatINR(inv.maturity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-surface-border text-xs text-text-muted">
                  Best est. return: <span className="text-green-600 font-semibold">{formatINR(m.vals[0].maturity - m.invested)}</span> above invested
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="disclaimer-box">
          <strong>Simulation Disclaimer:</strong> Returns for equity-linked options (SIP, ELSS, NPS, Gold ETF) are assumed historical averages and are NOT guaranteed. Actual market returns can be significantly higher or lower. Government scheme rates (PPF, RD, FD) are based on current rates and subject to revision. This simulation is for educational understanding only and does not constitute financial advice.
        </div>
      </div>
    </div>
  );
}
