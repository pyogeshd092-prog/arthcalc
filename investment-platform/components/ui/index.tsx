'use client';

import { forwardRef, useState } from 'react';
import { clsx } from 'clsx';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';

// ─── BUTTON ─────────────────────────────────────────────────

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100';
    const variants = {
      primary: 'text-white shadow-md hover:shadow-lg hover:opacity-90',
      secondary: 'bg-surface-secondary text-text-primary border border-surface-border hover:bg-surface-tertiary',
      outline: 'border-2 bg-transparent hover:bg-surface-secondary',
      ghost: 'bg-transparent text-text-secondary hover:bg-surface-secondary hover:text-text-primary',
      accent: 'text-white shadow-md hover:shadow-lg hover:opacity-90',
    };
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-base',
    };
    const dynamicStyle = variant === 'primary'
      ? { background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))', '--tw-ring-color': 'var(--primary-500)' } as React.CSSProperties
      : variant === 'accent'
      ? { background: 'linear-gradient(135deg, var(--accent-500), var(--accent-600))', '--tw-ring-color': 'var(--accent-500)' } as React.CSSProperties
      : variant === 'outline'
      ? { borderColor: 'var(--primary-500)', color: 'var(--primary-600)' } as React.CSSProperties
      : {};

    return (
      <button
        ref={ref}
        className={clsx(base, variants[variant], sizes[size], className)}
        style={dynamicStyle}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// ─── INPUT ──────────────────────────────────────────────────

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, prefix, suffix, tooltip, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full">
        {label && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
              {label}
            </label>
            {tooltip && (
              <div className="group relative">
                <Info className="w-3.5 h-3.5 text-text-muted cursor-help" />
                <div className="absolute left-0 bottom-full mb-2 w-56 tooltip hidden group-hover:block">
                  {tooltip}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 text-text-muted text-sm font-medium pointer-events-none">{prefix}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'input-base',
              prefix && 'pl-8',
              suffix && 'pr-8',
              error && 'border-red-400 dark:border-red-600',
              className
            )}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 text-text-muted text-sm pointer-events-none">{suffix}</span>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        {hint && !error && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// ─── SLIDER ─────────────────────────────────────────────────

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  formatValue?: (v: number) => string;
  tooltip?: string;
  suffix?: string;
}

export function Slider({ label, value, onChange, min, max, step = 1, formatValue, tooltip, suffix }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const display = formatValue ? formatValue(value) : `${value}${suffix || ''}`;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-text-secondary">{label}</span>
          {tooltip && (
            <div className="group relative">
              <Info className="w-3.5 h-3.5 text-text-muted cursor-help" />
              <div className="absolute left-0 bottom-full mb-2 w-56 tooltip hidden group-hover:block">{tooltip}</div>
            </div>
          )}
        </div>
        <span className="text-sm font-bold" style={{ color: 'var(--primary-600)' }}>{display}</span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="absolute w-full h-2 rounded-full bg-surface-tertiary overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--primary-500), var(--accent-500))' }}
          />
        </div>
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-2 opacity-0 cursor-pointer z-10"
        />
        <div
          className="absolute w-5 h-5 rounded-full border-2 border-white shadow-md transition-all duration-150 pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)`, background: 'var(--primary-500)' }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-text-muted">{formatValue ? formatValue(min) : `${min}${suffix || ''}`}</span>
        <span className="text-xs text-text-muted">{formatValue ? formatValue(max) : `${max}${suffix || ''}`}</span>
      </div>
    </div>
  );
}

// ─── CARD ───────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  style?: React.CSSProperties;
}

export function Card({ children, className, hoverable = false, style }: CardProps) {
  return (
    <div
      className={clsx('card', hoverable && 'cursor-pointer', className)}
      style={style}
    >
      {children}
    </div>
  );
}

// ─── STAT CARD ──────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon?: React.ReactNode;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatCard({ label, value, subValue, icon, color, trend }: StatCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-text-secondary">{label}</p>
        {icon && (
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
               style={{ background: color ? `${color}20` : 'var(--surface-tertiary)' }}>
            <span style={{ color: color || 'var(--primary-500)' }}>{icon}</span>
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      {subValue && <p className="text-xs text-text-muted mt-1">{subValue}</p>}
    </div>
  );
}

// ─── TABS ───────────────────────────────────────────────────

interface Tab { id: string; label: string; icon?: React.ReactNode; }
interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={clsx('flex gap-1 bg-surface-secondary p-1 rounded-xl', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
            active === tab.id
              ? 'bg-surface text-text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ─── BADGE ──────────────────────────────────────────────────

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  const variants = {
    default: 'bg-surface-secondary text-text-secondary border-surface-border',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800',
    warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
    error: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
    info: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
  };
  return (
    <span className={clsx(
      'inline-flex items-center border rounded-full font-medium',
      size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1',
      variants[variant]
    )}>
      {children}
    </span>
  );
}

// ─── ACCORDION (FAQ) ────────────────────────────────────────

interface AccordionItem { q: string; a: string; }
interface AccordionProps { items: AccordionItem[]; }

export function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-surface-border border border-surface-border rounded-xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-secondary transition-colors"
          >
            <span className="text-sm font-medium text-text-primary">{item.q}</span>
            {open === i ? <ChevronUp className="w-4 h-4 text-text-muted flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" />}
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed bg-surface-secondary animate-fade-in">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── DISCLAIMER BOX ─────────────────────────────────────────

export function DisclaimerBox({ text }: { text?: string }) {
  return (
    <div className="disclaimer-box flex gap-3">
      <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-600 dark:text-yellow-400" />
      <p className="text-xs leading-relaxed">
        {text || 'This calculation is for educational and informational purposes only. All values shown are estimates based on the assumptions entered. This is not investment advice. Returns are not guaranteed. Please consult a qualified financial advisor before making investment decisions.'}
      </p>
    </div>
  );
}

// ─── SOURCE BADGE ───────────────────────────────────────────

interface SourceBadgeProps {
  source: string;
  url: string;
  effectiveDate?: string;
  lastUpdated?: string;
}

export function SourceBadge({ source, url, effectiveDate, lastUpdated }: SourceBadgeProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <a href={url} target="_blank" rel="noopener noreferrer" className="source-badge hover:opacity-80 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Source: {source}
      </a>
      {effectiveDate && (
        <span className="text-text-muted">Effective: {effectiveDate}</span>
      )}
      {lastUpdated && (
        <span className="text-text-muted">Updated: {lastUpdated}</span>
      )}
    </div>
  );
}

// ─── NUMBER FORMAT ──────────────────────────────────────────

export function formatINR(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

// ─── BEGINNER MODE TOGGLE ────────────────────────────────────

interface BeginnerToggleProps {
  enabled: boolean;
  onToggle: (v: boolean) => void;
}

export function BeginnerToggle({ enabled, onToggle }: BeginnerToggleProps) {
  return (
    <button
      onClick={() => onToggle(!enabled)}
      className={clsx(
        'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all',
        enabled
          ? 'text-white border-transparent'
          : 'text-text-secondary border-surface-border hover:bg-surface-secondary'
      )}
      style={enabled ? { background: 'var(--primary-600)', borderColor: 'var(--primary-600)' } : {}}
    >
      <span>{enabled ? '🟢' : '⚪'}</span>
      Beginner Mode {enabled ? 'ON' : 'OFF'}
    </button>
  );
}
