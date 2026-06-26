import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INVESTMENT_CATEGORIES, getInvestmentsByCategory } from '@/lib/data/investments';
import { CheckCircle, XCircle, Calculator, ArrowRight } from 'lucide-react';

interface Props { params: { category: string } }

export async function generateStaticParams() {
  return INVESTMENT_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = INVESTMENT_CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) return { title: 'Investments | ArthCalc' };
  return {
    title: `${cat.name} — All Options Explained | ArthCalc`,
    description: `Explore all ${cat.name} investment options in India. Factual details on returns, eligibility, how to invest, tax treatment, and official sources. Educational tool only.`,
    alternates: { canonical: `/investments/${params.category}` },
  };
}

export default function CategoryPage({ params }: Props) {
  const cat = INVESTMENT_CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) notFound();
  const investments = getInvestmentsByCategory(cat.id);

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-14">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-primary-300 mb-4">
            <Link href="/investments" className="hover:text-white">Investments</Link>
            <span className="mx-2">›</span>
            <span className="text-white">{cat.name}</span>
          </nav>
          <h1 className="text-3xl font-bold text-white mb-2">{cat.name}</h1>
          <p className="text-primary-200">{cat.description}</p>
          <p className="text-primary-300 text-sm mt-2">{investments.length} options • Factual data only • Official sources</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investments.map((inv) => (
            <Link key={inv.id} href={`/investments/${params.category}/${inv.slug}`}
              className="card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-bold text-text-primary group-hover:text-primary-600 transition-colors">{inv.name}</h2>
                  <p className="text-xs text-text-muted mt-0.5">{inv.shortName}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  inv.riskLevel === 'Very Low' || inv.riskLevel === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  inv.riskLevel === 'Low-Medium' || inv.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {inv.riskLevel} risk
                </span>
              </div>

              <div className="text-sm text-text-secondary mb-3 line-clamp-2">{inv.description}</div>

              <div className="flex items-center gap-4 mb-3 text-xs">
                <span className="text-text-muted">Returns:</span>
                <span className="font-semibold text-text-primary">{inv.currentRate}</span>
                <span className="text-text-muted">Lock-in:</span>
                <span className="font-medium text-text-primary">{inv.lockInPeriod}</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center gap-1 text-xs">
                  {inv.canInvestOnline ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                  <span className="text-text-muted">Online</span>
                </span>
                <span className="flex items-center gap-1 text-xs">
                  {inv.canInvestMobile ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                  <span className="text-text-muted">Mobile</span>
                </span>
                <span className="flex items-center gap-1 text-xs">
                  {inv.section80C ? <CheckCircle className="w-3.5 h-3.5 text-blue-500" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                  <span className="text-text-muted">80C</span>
                </span>
                {inv.isPopular && (
                  <span className="ml-auto text-xs bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400 px-2 py-0.5 rounded-full">Popular</span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-surface-border">
                <Calculator className="w-3.5 h-3.5 text-primary-500" />
                <span className="text-xs text-primary-600 font-medium">View Details & Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary-500 ml-auto" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
