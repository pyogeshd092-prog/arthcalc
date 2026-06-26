import Link from 'next/link';
import { BookOpen, ArrowRight, Globe, Smartphone, Building2, CheckCircle2, XCircle } from 'lucide-react';

const FEATURED = [
  {
    id: 'fd', name: 'Fixed Deposit', emoji: '🏦',
    oneLiner: 'Bank deposit for fixed tenure at guaranteed interest rate',
    canInvestOnline: true, canInvestMobile: true, needBranch: false,
    risk: 'Very Low', returns: 'Guaranteed', taxBenefit: false,
    href: '/investments/bank-deposits/fd',
  },
  {
    id: 'ppf', name: 'PPF', emoji: '🏛️',
    oneLiner: '15-year government savings with complete triple tax exemption (EEE)',
    canInvestOnline: true, canInvestMobile: true, needBranch: false,
    risk: 'Very Low', returns: 'Government-Declared', taxBenefit: true,
    href: '/investments/post-office/ppf',
  },
  {
    id: 'sip', name: 'SIP', emoji: '📈',
    oneLiner: 'Invest fixed amount monthly in mutual funds via auto-debit',
    canInvestOnline: true, canInvestMobile: true, needBranch: false,
    risk: 'Medium-High', returns: 'Market-Linked', taxBenefit: false,
    href: '/investments/investment-methods/sip',
  },
  {
    id: 'nps', name: 'NPS', emoji: '🎯',
    oneLiner: 'Voluntary pension with extra ₹50,000 tax deduction under 80CCD(1B)',
    canInvestOnline: true, canInvestMobile: true, needBranch: false,
    risk: 'Medium', returns: 'Market-Linked', taxBenefit: true,
    href: '/investments/retirement-pension/nps',
  },
  {
    id: 'gold-etf', name: 'Gold ETF', emoji: '🥇',
    oneLiner: 'Buy 99.5% pure gold electronically on stock exchange',
    canInvestOnline: true, canInvestMobile: true, needBranch: false,
    risk: 'Medium', returns: 'Market-Linked', taxBenefit: false,
    href: '/investments/etfs/gold-etf',
  },
  {
    id: 'ssy', name: 'SSY', emoji: '👧',
    oneLiner: 'Highest small savings rate (8.2%) for girl children below 10',
    canInvestOnline: true, canInvestMobile: false, needBranch: true,
    risk: 'Very Low', returns: 'Government-Declared', taxBenefit: true,
    href: '/investments/post-office/ssy',
  },
];

const RISK_COLORS: Record<string, string> = {
  'Very Low': '#10b981',
  'Low': '#34d399',
  'Medium': '#f59e0b',
  'Medium-High': '#ef4444',
  'High': '#dc2626',
};

export function EncyclopediaPreview() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-secondary border border-surface-border text-sm text-text-secondary mb-4">
            <BookOpen className="w-4 h-4" style={{ color: 'var(--primary-500)' }} />
            Investment Encyclopedia
          </div>
          <h2 className="section-heading mb-4">Learn Everything About Every Investment</h2>
          <p className="section-subheading mx-auto">
            Click any option to see what it is, how it works, where to open it (online/mobile/branch),
            required documents, tax implications, and FAQs — all with official sources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED.map((inv) => (
            <Link
              key={inv.id}
              href={inv.href}
              className="group card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{inv.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-text-primary mb-1 group-hover:text-primary-600 transition-colors">
                    {inv.name}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">{inv.oneLiner}</p>
                </div>
              </div>

              {/* How to invest */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className={`flex items-center gap-1.5 text-xs ${inv.canInvestOnline ? 'text-emerald-600 dark:text-emerald-400' : 'text-text-muted'}`}>
                  {inv.canInvestOnline ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  <Globe className="w-3 h-3" />
                  Online
                </div>
                <div className={`flex items-center gap-1.5 text-xs ${inv.canInvestMobile ? 'text-emerald-600 dark:text-emerald-400' : 'text-text-muted'}`}>
                  {inv.canInvestMobile ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  <Smartphone className="w-3 h-3" />
                  Mobile
                </div>
                <div className={`flex items-center gap-1.5 text-xs ${inv.needBranch ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {inv.needBranch ? '⚠️' : <CheckCircle2 className="w-3.5 h-3.5" />}
                  <Building2 className="w-3 h-3" />
                  Branch
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{ background: `${RISK_COLORS[inv.risk]}20`, color: RISK_COLORS[inv.risk] }}>
                  Risk: {inv.risk}
                </span>
                <span className="text-xs px-2 py-1 rounded-full font-medium bg-surface-secondary text-text-secondary border border-surface-border">
                  {inv.returns}
                </span>
                {inv.taxBenefit && (
                  <span className="text-xs px-2 py-1 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400">
                    Tax Benefit
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold transition-transform group-hover:translate-x-1"
                   style={{ color: 'var(--primary-500)' }}>
                Read full details <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/investments"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))' }}
          >
            <BookOpen className="w-4 h-4" />
            Explore Full Investment Encyclopedia
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
