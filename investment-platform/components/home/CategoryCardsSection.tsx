import Link from 'next/link';
import { INVESTMENT_CATEGORIES } from '@/lib/data/investments';
import {
  Building2, Mail, Landmark, ShieldCheck, TrendingUp,
  RefreshCw, BarChart2, Gem, LineChart, Shield
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Building2, Mail, Landmark, ShieldCheck, TrendingUp,
  RefreshCw, BarChart2, Gem, LineChart, Shield,
};

export function CategoryCardsSection() {
  return (
    <section className="py-20 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Explore Investment Categories</h2>
          <p className="section-subheading mx-auto">
            10 major categories, 40+ investment options — from safe bank deposits to market-linked instruments.
            Click any category to see all options, calculators, and official information.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {INVESTMENT_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || TrendingUp;
            return (
              <Link
                key={cat.id}
                href={`/investments/${cat.slug}`}
                className="group card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: cat.bgColor || '#eff6ff' }}
                >
                  <Icon className="w-6 h-6" style={{ color: cat.color }} />
                </div>

                {/* Name */}
                <h3 className="font-bold text-text-primary text-sm mb-1 group-hover:text-primary-600 transition-colors">
                  {cat.name}
                </h3>

                {/* Tagline */}
                <p className="text-xs text-text-muted mb-3 leading-relaxed flex-1">{cat.tagline}</p>

                {/* Count & arrow */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-secondary">
                    {cat.options.length} options
                  </span>
                  <span
                    className="text-xs font-semibold transition-transform group-hover:translate-x-1"
                    style={{ color: cat.color }}
                  >
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
