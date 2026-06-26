import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';

const CALCULATORS = [
  { name: 'FD Calculator', href: '/calculators/fd', emoji: '🏦', desc: 'Fixed Deposit maturity & interest', popular: true },
  { name: 'SIP Calculator', href: '/calculators/sip', emoji: '📈', desc: 'Systematic Investment Plan wealth', popular: true },
  { name: 'PPF Calculator', href: '/calculators/ppf', emoji: '🏛️', desc: 'Public Provident Fund 15-year plan', popular: true },
  { name: 'NPS Calculator', href: '/calculators/nps', emoji: '🎯', desc: 'National Pension System corpus + pension', popular: true },
  { name: 'EPF Calculator', href: '/calculators/epf', emoji: '💼', desc: 'Employee Provident Fund retirement', popular: true },
  { name: 'SSY Calculator', href: '/calculators/ssy', emoji: '👧', desc: 'Sukanya Samriddhi Yojana for girl child', popular: true },
  { name: 'RD Calculator', href: '/calculators/rd', emoji: '📅', desc: 'Recurring Deposit maturity', popular: false },
  { name: 'NSC Calculator', href: '/calculators/nsc', emoji: '📜', desc: 'National Savings Certificate (5 yr)', popular: false },
  { name: 'Gold Calculator', href: '/calculators/gold', emoji: '🥇', desc: 'Gold & Gold ETF investment growth', popular: false },
  { name: 'ELSS Calculator', href: '/calculators/elss', emoji: '💰', desc: 'ELSS mutual fund with 80C benefit', popular: false },
  { name: 'T-Bill Calculator', href: '/calculators/t-bills', emoji: '🏛️', desc: '91, 182, 364-day treasury bills', popular: false },
  { name: 'SWP Calculator', href: '/calculators/swp', emoji: '💸', desc: 'Systematic Withdrawal Plan planning', popular: false },
  { name: 'Lumpsum MF', href: '/calculators/lumpsum', emoji: '📊', desc: 'One-time mutual fund investment', popular: false },
  { name: 'Step-Up SIP', href: '/calculators/step-up-sip', emoji: '⬆️', desc: 'SIP with annual increase (step-up)', popular: false },
  { name: 'KVP Calculator', href: '/calculators/kvp', emoji: '✉️', desc: 'Kisan Vikas Patra doubling period', popular: false },
  { name: 'Inflation Calculator', href: '/calculators/inflation', emoji: '📉', desc: 'Future value after inflation impact', popular: false },
];

export function PopularCalculatorsSection() {
  return (
    <section className="py-20 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-surface-border text-sm text-text-secondary mb-4">
            <Calculator className="w-4 h-4" style={{ color: 'var(--primary-500)' }} />
            Individual Calculators
          </div>
          <h2 className="section-heading mb-4">Calculators for Every Investment</h2>
          <p className="section-subheading mx-auto">
            25+ dedicated calculators — each showing the exact formula, assumptions, year-wise breakdown,
            and growth chart.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {CALCULATORS.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="group card p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="text-2xl mb-3">{calc.emoji}</div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-text-primary text-sm group-hover:text-primary-600 transition-colors leading-tight">
                  {calc.name}
                </h3>
                {calc.popular && (
                  <span className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full font-medium"
                        style={{ background: 'var(--primary-100)', color: 'var(--primary-700)' }}>
                    Hot
                  </span>
                )}
              </div>
              <p className="text-xs text-text-muted flex-1">{calc.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold transition-transform group-hover:translate-x-1"
                   style={{ color: 'var(--primary-500)' }}>
                Calculate <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 font-semibold transition-all hover:bg-surface-tertiary"
            style={{ borderColor: 'var(--primary-500)', color: 'var(--primary-600)' }}
          >
            View All Calculators
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
