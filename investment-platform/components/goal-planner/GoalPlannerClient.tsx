'use client';

import { useState, useMemo } from 'react';
import { Slider, DisclaimerBox } from '@/components/ui';
import { calculateGoalProjections } from '@/lib/calculations';
import { formatINR } from '@/components/ui';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Home, GraduationCap, Heart, Car, Briefcase, Target, TrendingUp, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';

const GOAL_TYPES = [
  { id: 'retirement', label: 'Retirement', icon: Briefcase, color: '#6366f1', description: 'Build a retirement corpus to live comfortably after stopping work' },
  { id: 'house', label: 'Buy a House', icon: Home, color: '#10b981', description: 'Save for down payment or full purchase of a home' },
  { id: 'education', label: 'Child Education', icon: GraduationCap, color: '#f59e0b', description: 'Fund higher education for your child' },
  { id: 'marriage', label: 'Marriage', icon: Heart, color: '#ec4899', description: 'Plan for wedding and related expenses' },
  { id: 'car', label: 'Buy a Car', icon: Car, color: '#3b82f6', description: 'Save for vehicle purchase' },
  { id: 'custom', label: 'Custom Goal', icon: Target, color: '#8b5cf6', description: 'Any other financial milestone you want to plan for' },
];

const INVESTMENTS_FOR_GOAL = [
  { id: 'fd', label: 'Fixed Deposit', rate: 7.0, type: 'compound', color: '#3b82f6' },
  { id: 'ppf', label: 'PPF', rate: 7.1, type: 'ppf', color: '#10b981' },
  { id: 'sip', label: 'Equity SIP (est.)', rate: 12.0, type: 'sip', color: '#f59e0b' },
  { id: 'nps', label: 'NPS (mixed)', rate: 9.5, type: 'sip', color: '#6366f1' },
  { id: 'epf', label: 'EPF', rate: 8.25, type: 'compound', color: '#ec4899' },
  { id: 'ssy', label: 'Sukanya Samriddhi', rate: 8.2, type: 'ppf', color: '#8b5cf6' },
  { id: 'rd', label: 'Recurring Deposit', rate: 6.5, type: 'sip', color: '#0ea5e9' },
  { id: 'elss', label: 'ELSS (est.)', rate: 13.0, type: 'sip', color: '#f97316' },
];

function compoundMonthly(monthly: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

function compoundLumpsum(principal: number, annualRate: number, years: number): number {
  return principal * Math.pow(1 + annualRate / 100, years);
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-primary border border-surface-border rounded-xl shadow-card p-3 text-sm">
      <p className="font-bold text-text-primary mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
            <span className="text-text-muted">{p.name}</span>
          </span>
          <span className="font-semibold text-text-primary">{formatINR(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function GoalPlannerClient() {
  const [goalType, setGoalType] = useState('retirement');
  const [currentAge, setCurrentAge] = useState(30);
  const [targetAge, setTargetAge] = useState(60);
  const [monthlySavings, setMonthlySavings] = useState(10000);
  const [lumpsum, setLumpsum] = useState(0);
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [inflation, setInflation] = useState(6);

  const years = Math.max(1, targetAge - currentAge);

  const projections = useMemo(() => {
    return INVESTMENTS_FOR_GOAL.map((inv) => {
      const fromMonthly = monthlySavings > 0 ? compoundMonthly(monthlySavings, inv.rate, years) : 0;
      const fromLumpsum = lumpsum > 0 ? compoundLumpsum(lumpsum, inv.rate, years) : 0;
      const total = fromMonthly + fromLumpsum;
      const invested = monthlySavings * years * 12 + lumpsum;
      const inflationFactor = Math.pow(1 + inflation / 100, years);
      const realValue = total / inflationFactor;
      const goalAdjusted = targetAmount * inflationFactor;
      return {
        ...inv,
        maturity: total,
        invested,
        returns: total - invested,
        realValue,
        goalAdjusted,
        achieves: total >= goalAdjusted,
        percentOfGoal: Math.round((total / goalAdjusted) * 100),
      };
    }).sort((a, b) => b.maturity - a.maturity);
  }, [monthlySavings, lumpsum, years, inflation, targetAmount]);

  // Chart data: year-wise growth for top 4 investments
  const chartData = useMemo(() => {
    const top4 = projections.slice(0, 4);
    return Array.from({ length: Math.min(years, 30) }, (_, i) => {
      const y = i + 1;
      const row: any = { year: `Yr ${y}` };
      for (const inv of top4) {
        const fromM = monthlySavings > 0 ? compoundMonthly(monthlySavings, inv.rate, y) : 0;
        const fromL = lumpsum > 0 ? compoundLumpsum(lumpsum, inv.rate, y) : 0;
        row[inv.label] = Math.round(fromM + fromL);
      }
      return row;
    }).filter((_, i) => i % Math.max(1, Math.floor(years / 10)) === 0 || i === years - 1);
  }, [projections, years, monthlySavings, lumpsum]);

  const selectedGoal = GOAL_TYPES.find((g) => g.id === goalType) || GOAL_TYPES[0];
  const COLORS = projections.slice(0, 4).map((p) => p.color);

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Investment Goal Planner</h1>
          <p className="text-primary-200 text-lg">Set your goal → See how different investments can help you reach it</p>
          <p className="text-primary-300 text-sm mt-2">Educational estimates only • No advice • Official rate references</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <DisclaimerBox />

        {/* Goal Type Selector */}
        <section className="card">
          <h2 className="text-lg font-bold text-text-primary mb-4">What is your goal?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {GOAL_TYPES.map((g) => (
              <button key={g.id} onClick={() => setGoalType(g.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center ${goalType === g.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-surface-border hover:border-primary-300'}`}>
                <g.icon className="w-6 h-6" style={{ color: g.color }} />
                <span className="text-xs font-medium text-text-primary">{g.label}</span>
              </button>
            ))}
          </div>
          {selectedGoal && (
            <p className="text-sm text-text-secondary mt-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-text-muted" />
              {selectedGoal.description}
            </p>
          )}
        </section>

        {/* Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="card space-y-6">
            <h2 className="font-bold text-text-primary">Your Profile</h2>
            <Slider label="Your Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={60} suffix=" years" />
            <Slider label={goalType === 'retirement' ? 'Target Retirement Age' : 'Target Age to Achieve Goal'} value={targetAge} onChange={(v) => setTargetAge(Math.max(currentAge + 1, v))} min={19} max={80} suffix=" years" />
            <div className="p-3 bg-surface-secondary rounded-xl border border-surface-border flex items-center justify-between">
              <span className="text-sm text-text-secondary">Time to reach goal</span>
              <span className="font-bold text-primary-600 text-lg">{years} years</span>
            </div>
          </section>

          <section className="card space-y-6">
            <h2 className="font-bold text-text-primary">Savings & Goal</h2>
            <Slider label="Monthly Savings / Investment" value={monthlySavings} onChange={setMonthlySavings}
              min={500} max={200000} step={500} formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
            <Slider label="One-time Lump Sum (if any)" value={lumpsum} onChange={setLumpsum}
              min={0} max={5000000} step={10000} formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
            <Slider label="Goal Target Amount (today's value)" value={targetAmount} onChange={setTargetAmount}
              min={100000} max={100000000} step={100000} formatValue={(v) => formatINR(v)} />
            <Slider label="Expected Inflation Rate" value={inflation} onChange={setInflation} min={1} max={12} step={0.5} suffix="% p.a." />
          </section>
        </div>

        {/* Inflation-adjusted goal notice */}
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-text-secondary">
            <strong className="text-amber-700 dark:text-amber-400">Inflation-adjusted goal: </strong>
            Your target of {formatINR(targetAmount)} today will require approximately{' '}
            <strong>{formatINR(Math.round(targetAmount * Math.pow(1 + inflation / 100, years)))}</strong> in {years} years at {inflation}% inflation.
            The table below compares against this inflation-adjusted target.
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 1 && (
          <section className="card">
            <h2 className="font-bold text-text-primary mb-6">Projected Growth — Top 4 Options</h2>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData}>
                <defs>
                  {projections.slice(0, 4).map((inv, i) => (
                    <linearGradient key={inv.id} id={`gp${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={inv.color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={inv.color} stopOpacity={0.0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-border)" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
                <YAxis tickFormatter={(v) => formatINR(v)} tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {projections.slice(0, 4).map((inv, i) => (
                  <Area key={inv.id} type="monotone" dataKey={inv.label} stroke={inv.color}
                    fill={`url(#gp${i})`} strokeWidth={2} />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </section>
        )}

        {/* Projections Table */}
        <section className="card">
          <h2 className="font-bold text-text-primary mb-2">Projected Maturity — All Options Compared</h2>
          <p className="text-xs text-text-muted mb-5">These are mathematical estimates using current rates. Actual returns may vary significantly.</p>
          <div className="overflow-x-auto">
            <table className="data-table w-full text-sm">
              <thead>
                <tr>
                  <th>Investment</th>
                  <th>Est. Rate</th>
                  <th>Total Invested</th>
                  <th>Est. Maturity</th>
                  <th>Est. Returns</th>
                  <th>Real Value*</th>
                  <th>Goal Status</th>
                </tr>
              </thead>
              <tbody>
                {projections.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link href={`/calculators/${p.id}`} className="font-medium text-primary-600 hover:underline">
                        {p.label}
                      </Link>
                    </td>
                    <td className="font-semibold text-green-600">{p.rate}% p.a.</td>
                    <td>{formatINR(p.invested)}</td>
                    <td className="font-bold text-text-primary">{formatINR(p.maturity)}</td>
                    <td className="text-green-600 font-medium">{formatINR(p.returns)}</td>
                    <td className="text-text-secondary">{formatINR(p.realValue)}</td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        {p.achieves
                          ? <CheckCircle className="w-4 h-4 text-green-500" />
                          : <span className="w-4 h-4 rounded-full border-2 border-red-400 inline-block" />
                        }
                        <span className={`text-xs font-semibold ${p.achieves ? 'text-green-600' : 'text-red-500'}`}>
                          {p.percentOfGoal}% of goal
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-muted mt-3">
            * Real Value = Maturity Amount adjusted for {inflation}% annual inflation over {years} years.
            Goal Status compares against inflation-adjusted target of {formatINR(Math.round(targetAmount * Math.pow(1 + inflation / 100, years)))}.
          </p>
        </section>

        {/* Monthly needed reverse calc */}
        <section className="card">
          <h2 className="font-bold text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-500" />
            How much monthly savings is needed to reach your goal?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INVESTMENTS_FOR_GOAL.slice(0, 4).map((inv) => {
              const goalNeeded = targetAmount * Math.pow(1 + inflation / 100, years);
              const r = inv.rate / 100 / 12;
              const n = years * 12;
              const lumpsumGrowth = lumpsum > 0 ? compoundLumpsum(lumpsum, inv.rate, years) : 0;
              const remainingGoal = Math.max(0, goalNeeded - lumpsumGrowth);
              const needed = r > 0
                ? remainingGoal / (((Math.pow(1 + r, n) - 1) / r) * (1 + r))
                : remainingGoal / n;
              return (
                <div key={inv.id} className="p-4 rounded-xl border border-surface-border bg-surface-secondary text-center">
                  <div className="text-xs text-text-muted mb-1">{inv.label}</div>
                  <div className="text-xl font-bold text-text-primary">₹{Math.ceil(needed).toLocaleString('en-IN')}</div>
                  <div className="text-xs text-text-muted">/month needed</div>
                  <div className="text-xs mt-1 font-medium" style={{ color: inv.color }}>{inv.rate}% p.a.</div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-text-muted mt-3">
            Reverse calculation: monthly amount needed to reach your inflation-adjusted goal amount by target age. Actual requirements will vary.
          </p>
        </section>

        <div className="disclaimer-box">
          <strong>Projection Disclaimer:</strong> All values shown are mathematical estimates for educational purposes.
          Returns shown for equity-linked instruments (SIP, ELSS, NPS) are assumed rates — actual market returns can be higher or lower.
          Returns for PPF, EPF, FD, SSY are based on current government-declared/bank rates and are subject to change.
          This tool does not recommend any specific investment. Consult a SEBI-registered financial advisor for personalized advice.
        </div>
      </div>
    </div>
  );
}
