'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { formatINR } from '@/components/ui';

interface ChartData {
  year: number;
  invested: number;
  total: number;
  inflationAdjusted?: number;
}

interface GrowthChartProps {
  data: ChartData[];
  showInflation?: boolean;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-surface-border rounded-xl p-4 shadow-card-hover text-sm">
      <p className="font-bold text-text-primary mb-2">Year {label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full" style={{ background: entry.color }} />
          <span className="text-text-secondary">{entry.name}:</span>
          <span className="font-semibold text-text-primary">{formatINR(entry.value, true)}</span>
        </div>
      ))}
    </div>
  );
};

export function GrowthChart({ data, showInflation = true, height = 280 }: GrowthChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--accent-500)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--accent-500)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="inflGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--surface-border)' }}
            label={{ value: 'Year', position: 'insideBottom', offset: -2, fontSize: 12, fill: 'var(--text-muted)' }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatINR(v, true)}
            width={70}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
            formatter={(value) => <span style={{ color: 'var(--text-secondary)' }}>{value}</span>}
          />
          <Area
            type="monotone"
            dataKey="invested"
            name="Amount Invested"
            stroke="var(--primary-500)"
            strokeWidth={2}
            fill="url(#investedGrad)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="total"
            name="Maturity Value"
            stroke="var(--accent-500)"
            strokeWidth={2.5}
            fill="url(#totalGrad)"
            dot={false}
          />
          {showInflation && data[0]?.inflationAdjusted && (
            <Area
              type="monotone"
              dataKey="inflationAdjusted"
              name="Inflation-Adjusted"
              stroke="#8b5cf6"
              strokeWidth={1.5}
              strokeDasharray="5 3"
              fill="url(#inflGrad)"
              dot={false}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── BAR CHART for comparison ────────────────────────────────

import { BarChart, Bar, Cell } from 'recharts';

interface CompareChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
}

export function CompareBarChart({ data, height = 250 }: CompareChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--surface-border)' }}
            angle={-15}
            textAnchor="end"
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => formatINR(v, true)}
            width={75}
          />
          <Tooltip
            formatter={(value: number) => [formatINR(value, true), 'Projected Value']}
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--surface-border)',
              borderRadius: '12px',
              fontSize: '13px',
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
