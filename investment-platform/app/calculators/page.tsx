import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ArrowRight, TrendingUp, Shield, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Investment Calculators India — FD, SIP, PPF, NPS, EPF & 40+ More | ArthCalc',
  description: 'Free online investment calculators for every Indian investment — FD, SIP, PPF, NPS, EPF, SSY, NSC, Gold, T-Bills, ELSS, RD, SWP, KVP, Step-up SIP, Lumpsum and 40+ more. Official formulas. Educational only.',
  alternates: { canonical: '/calculators' },
};

const CALCULATOR_GROUPS = [
  {
    title: 'Bank & Post Office Deposits',
    color: '#1e3a8a',
    bg: '#eff6ff',
    emoji: '🏦',
    calculators: [
      { name: 'FD Calculator', href: '/calculators/fd', desc: 'Fixed Deposit maturity & compound interest', hot: true },
      { name: 'RD Calculator', href: '/calculators/rd', desc: 'Recurring Deposit monthly savings', hot: false },
      { name: 'Tax Saver FD', href: '/calculators/tax-saver-fd', desc: '5-year FD with 80C benefit', hot: false },
      { name: 'Senior Citizen FD', href: '/calculators/senior-citizen-fd', desc: 'Higher FD rates for 60+ investors', hot: false },
      { name: 'PO Time Deposit', href: '/calculators/po-time-deposit', desc: 'Post Office 1/2/3/5 year deposits', hot: false },
      { name: 'PO RD Calculator', href: '/calculators/po-rd', desc: 'Post Office Recurring Deposit', hot: false },
    ],
  },
  {
    title: 'Government Small Savings',
    color: '#065f46',
    bg: '#ecfdf5',
    emoji: '🏛️',
    calculators: [
      { name: 'PPF Calculator', href: '/calculators/ppf', desc: 'Public Provident Fund — EEE tax benefit', hot: true },
      { name: 'NSC Calculator', href: '/calculators/nsc', desc: 'National Savings Certificate 5-year (7.7%)', hot: false },
      { name: 'KVP Calculator', href: '/calculators/kvp', desc: 'Kisan Vikas Patra — money doubling', hot: false },
      { name: 'SSY Calculator', href: '/calculators/ssy', desc: 'Sukanya Samriddhi — girl child (8.2%)', hot: true },
      { name: 'MIS Calculator', href: '/calculators/mis', desc: 'Post Office Monthly Income Scheme', hot: false },
      { name: 'SCSS Calculator', href: '/calculators/scss', desc: 'Senior Citizen Savings Scheme (8.2%)', hot: false },
    ],
  },
  {
    title: 'Mutual Funds & SIP',
    color: '#7c3aed',
    bg: '#f5f3ff',
    emoji: '📈',
    calculators: [
      { name: 'SIP Calculator', href: '/calculators/sip', desc: 'Systematic Investment Plan returns', hot: true },
      { name: 'Step-Up SIP', href: '/calculators/step-up-sip', desc: 'SIP with annual increase amount', hot: true },
      { name: 'Lumpsum Calculator', href: '/calculators/lumpsum', desc: 'One-time mutual fund investment', hot: true },
      { name: 'ELSS Calculator', href: '/calculators/elss', desc: 'Tax-saving MF with 80C & 3yr lock-in', hot: false },
      { name: 'Equity MF', href: '/calculators/equity-mf', desc: 'Large/Mid/Small cap equity fund returns', hot: false },
      { name: 'Debt MF', href: '/calculators/debt-mf', desc: 'Debt fund & bond fund returns', hot: false },
      { name: 'Hybrid MF', href: '/calculators/hybrid-mf', desc: 'Balanced / hybrid fund calculator', hot: false },
      { name: 'Index Fund', href: '/calculators/index-fund', desc: 'Nifty 50 / Sensex index fund returns', hot: false },
      { name: 'Liquid Fund', href: '/calculators/liquid-fund', desc: 'Liquid fund vs FD comparison', hot: false },
      { name: 'SWP Calculator', href: '/calculators/swp', desc: 'Systematic Withdrawal Plan planning', hot: false },
      { name: 'STP Calculator', href: '/calculators/stp', desc: 'Systematic Transfer Plan returns', hot: false },
      { name: 'International Fund', href: '/calculators/international-fund', desc: 'US/global equity fund returns in INR', hot: false },
    ],
  },
  {
    title: 'Retirement & Pension',
    color: '#b45309',
    bg: '#fffbeb',
    emoji: '🎯',
    calculators: [
      { name: 'EPF Calculator', href: '/calculators/epf', desc: 'Employee Provident Fund corpus (8.25%)', hot: true },
      { name: 'NPS Calculator', href: '/calculators/nps', desc: 'National Pension System + monthly pension', hot: true },
      { name: 'VPF Calculator', href: '/calculators/vpf', desc: 'Voluntary Provident Fund extra savings', hot: false },
      { name: 'APY Calculator', href: '/calculators/apy', desc: 'Atal Pension Yojana guaranteed pension', hot: false },
      { name: 'PPF Retirement', href: '/calculators/ppf', desc: 'PPF extended for retirement corpus', hot: false },
    ],
  },
  {
    title: 'Government Securities',
    color: '#0e7490',
    bg: '#ecfeff',
    emoji: '📜',
    calculators: [
      { name: 'T-Bill Calculator', href: '/calculators/t-bills', desc: '91, 182, 364-day treasury bills', hot: false },
      { name: 'G-Sec Calculator', href: '/calculators/g-sec', desc: 'Government securities long-term bonds', hot: false },
      { name: 'SDL Calculator', href: '/calculators/sdl', desc: 'State Development Loans', hot: false },
      { name: 'Floating Rate Bonds', href: '/calculators/floating-rate-bonds', desc: 'RBI floating rate savings bonds', hot: false },
    ],
  },
  {
    title: 'Gold & Precious Metals',
    color: '#b45309',
    bg: '#fef3c7',
    emoji: '🥇',
    calculators: [
      { name: 'Gold Calculator', href: '/calculators/gold', desc: 'Physical gold & Gold ETF returns (~10%)', hot: true },
      { name: 'Gold ETF', href: '/calculators/gold-etf', desc: 'Electronic gold — no storage, no GST', hot: false },
      { name: 'SGB Calculator', href: '/calculators/sgb', desc: 'Sovereign Gold Bond + 2.5% interest', hot: false },
      { name: 'Digital Gold', href: '/calculators/digital-gold', desc: 'Digital gold investment returns', hot: false },
      { name: 'Silver ETF', href: '/calculators/silver-etf', desc: 'Silver ETF investment returns in India', hot: false },
      { name: 'Physical Silver', href: '/calculators/physical-silver', desc: 'Physical silver investment calculator', hot: false },
    ],
  },
  {
    title: 'ETFs & Market Investments',
    color: '#dc2626',
    bg: '#fef2f2',
    emoji: '📊',
    calculators: [
      { name: 'Equity ETF', href: '/calculators/equity-etf', desc: 'Nifty BeES, Sensex ETF returns', hot: false },
      { name: 'Bond ETF', href: '/calculators/bond-etf', desc: 'Bharat Bond ETF & other bond ETFs', hot: false },
      { name: 'Stocks Calculator', href: '/calculators/stocks', desc: 'Direct equity investment CAGR', hot: false },
      { name: 'REIT Calculator', href: '/calculators/reit', desc: 'Real Estate Investment Trust returns', hot: false },
      { name: 'InvIT Calculator', href: '/calculators/invit', desc: 'Infrastructure Investment Trust', hot: false },
    ],
  },
  {
    title: 'Insurance-Linked',
    color: '#6d28d9',
    bg: '#f5f3ff',
    emoji: '🛡️',
    calculators: [
      { name: 'ULIP Calculator', href: '/calculators/ulip', desc: 'Unit Linked Insurance Plan returns', hot: false },
      { name: 'Endowment Policy', href: '/calculators/endowment', desc: 'Traditional endowment plan returns', hot: false },
      { name: 'Money-Back Policy', href: '/calculators/money-back', desc: 'Money-back insurance plan calculator', hot: false },
    ],
  },
  {
    title: 'Planning Tools',
    color: '#059669',
    bg: '#ecfdf5',
    emoji: '🎯',
    calculators: [
      { name: 'Inflation Calculator', href: '/calculators/inflation', desc: 'Future cost & purchasing power loss', hot: false },
      { name: 'Goal Planner', href: '/goal-planner', desc: 'How much to invest to reach your goal', hot: true },
      { name: 'Tax Saving Center', href: '/tax-saver', desc: 'Maximize 80C deductions', hot: true },
      { name: 'Wealth Journey', href: '/journey-simulator', desc: 'Visualize wealth growth over time', hot: false },
    ],
  },
];

export default function CalculatorsPage() {
  const totalCalcs = CALCULATOR_GROUPS.reduce((sum, g) => sum + g.calculators.length, 0);

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Hero */}
      <div className="hero-gradient py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white/80 text-sm mb-6">
            <Calculator className="w-4 h-4 text-yellow-400" />
            Free · Accurate · Official Formulas
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">All Investment Calculators</h1>
          <p className="text-primary-200 text-lg mb-2">
            {totalCalcs}+ calculators covering every major Indian investment
          </p>
          <p className="text-primary-300 text-sm">
            FD · SIP · PPF · NPS · EPF · Gold · NSC · T-Bills · ELSS · SGB · MIS · SCSS · VPF · APY and more
          </p>
        </div>
      </div>

      {/* Quick nav */}
      <div className="bg-surface border-b border-surface-border sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto">
          {CALCULATOR_GROUPS.map((g) => (
            <a
              key={g.title}
              href={`#${g.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors"
            >
              <span>{g.emoji}</span>
              <span className="whitespace-nowrap">{g.title}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {CALCULATOR_GROUPS.map((group) => (
          <section key={group.title} id={group.title.toLowerCase().replace(/\s+/g, '-')}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                   style={{ background: group.bg }}>
                {group.emoji}
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">{group.title}</h2>
                <p className="text-xs text-text-muted">{group.calculators.length} calculators</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {group.calculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="group card p-4 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <h3 className="font-bold text-text-primary text-sm group-hover:text-primary-600 transition-colors leading-tight">
                      {calc.name}
                    </h3>
                    {calc.hot && (
                      <Star className="w-3.5 h-3.5 flex-shrink-0 text-amber-500 fill-amber-500" />
                    )}
                  </div>
                  <p className="text-xs text-text-muted flex-1 leading-relaxed">{calc.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold transition-transform group-hover:translate-x-1"
                       style={{ color: group.color }}>
                    Calculate <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Bottom disclaimer */}
        <div className="card border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm mb-1">Educational Tool Only</p>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                All calculators on ArthCalc use standard mathematical formulas and publicly available official rates.
                Results are estimates for educational purposes. Returns are not guaranteed — especially for market-linked
                investments. Past performance does not guarantee future results. Always consult a SEBI-registered financial
                advisor before investing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
