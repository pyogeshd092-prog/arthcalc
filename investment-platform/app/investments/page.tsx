import type { Metadata } from 'next';
import Link from 'next/link';
import { INVESTMENT_CATEGORIES } from '@/lib/data/investments';
import { Building2, Mail, Landmark, ShieldCheck, TrendingUp, RefreshCw, BarChart2, Gem, LineChart, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Investment Encyclopedia India — All Investment Options Explained | ArthCalc',
  description: 'Complete guide to every major Indian investment — FD, PPF, SIP, NPS, EPF, Gold, NSC, T-Bills and 40+ more. What it is, how to invest, online/mobile availability, tax treatment, official sources.',
};

const ICON_MAP: Record<string, any> = { Building2, Mail, Landmark, ShieldCheck, TrendingUp, RefreshCw, BarChart2, Gem, LineChart, Shield };

export default function InvestmentsPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Investment Encyclopedia</h1>
          <p className="text-primary-200 text-lg">Learn everything about every major Indian investment option</p>
          <p className="text-primary-300 text-sm mt-2">Official sources • No recommendations • Factual & educational</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INVESTMENT_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || TrendingUp;
            return (
              <Link key={cat.id} href={`/investments/${cat.slug}`}
                className="card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: cat.bgColor }}>
                    <Icon className="w-6 h-6" style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h2 className="font-bold text-text-primary group-hover:text-primary-600 transition-colors">{cat.name}</h2>
                    <p className="text-xs text-text-muted">{cat.options.length} investment options</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{cat.description}</p>
                <p className="text-xs font-semibold" style={{ color: cat.color }}>Explore {cat.options.length} options →</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
