import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Target, BookOpen, Calculator, TrendingUp, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About ArthCalc — India\'s Free Investment Calculator Platform',
  description: 'ArthCalc is a free, educational investment calculator platform for Indian investors. We provide accurate calculators for FD, SIP, PPF, NPS, EPF and 40+ investments. No ads, no recommendations, no bias.',
  alternates: { canonical: '/about' },
};

const PILLARS = [
  { icon: Shield, title: 'Official Data Only', desc: 'All rates sourced from RBI, EPFO, PFRDA, India Post, SEBI, and AMFI. No guesses, no outdated numbers.' },
  { icon: BookOpen, title: 'Fully Transparent', desc: 'Every calculator shows the exact formula it uses. No black boxes. You can verify every result independently.' },
  { icon: Target, title: 'No Recommendations', desc: 'We never tell you what to invest in. We provide facts. You make your own informed decisions.' },
  { icon: Calculator, title: 'Accurate Formulas', desc: 'All mathematical formulas match official definitions — compound interest, SIP, PPF, EPF, NPS, and more.' },
  { icon: TrendingUp, title: '40+ Investments', desc: 'Every major Indian investment covered — from bank FDs to government bonds, mutual funds to gold.' },
  { icon: Users, title: 'For Every Indian', desc: 'Simple enough for first-time investors. Detailed enough for experienced ones. In English and Marathi.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">About ArthCalc</h1>
          <p className="text-primary-200 text-lg">
            A free, transparent, educational investment calculator platform for every Indian investor.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-14">
        {/* Mission */}
        <section className="card p-8">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            ArthCalc was built to answer one simple question that millions of Indian investors ask every day:
            <strong className="text-text-primary"> "If I invest ₹X in Y for Z years, what will I get?"</strong>
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            Most investment calculators in India are built by financial companies with a product to sell. Their
            calculators are designed to make one investment look better than others. ArthCalc is different —
            we have no products to sell, no commissions to earn, and no incentive to bias any result.
          </p>
          <p className="text-text-secondary leading-relaxed">
            We cover <strong className="text-text-primary">40+ Indian investment options</strong> with accurate
            formulas, official rates sourced directly from RBI, EPFO, SEBI, and India Post, and complete
            transparency about every assumption we make.
          </p>
        </section>

        {/* Pillars */}
        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">What Makes ArthCalc Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div key={p.title} className="card p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                     style={{ background: 'var(--primary-100)' }}>
                  <p.icon className="w-5 h-5" style={{ color: 'var(--primary-600)' }} />
                </div>
                <h3 className="font-bold text-text-primary mb-2">{p.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What we cover */}
        <section className="card p-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6">What We Cover</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-text-secondary">
            {[
              'Fixed Deposit (FD)', 'Recurring Deposit (RD)', 'Public Provident Fund (PPF)',
              'Sukanya Samriddhi (SSY)', 'National Savings Certificate (NSC)', 'Kisan Vikas Patra (KVP)',
              'Employee Provident Fund (EPF)', 'National Pension System (NPS)', 'Voluntary PF (VPF)',
              'Atal Pension Yojana (APY)', 'SIP (Mutual Funds)', 'ELSS (Tax Saver MF)',
              'Lumpsum Investment', 'Step-Up SIP', 'SWP (Systematic Withdrawal)',
              'Gold & Gold ETF', 'Sovereign Gold Bond (SGB)', 'Treasury Bills (T-Bills)',
              'Government Securities', 'Senior Citizen Savings Scheme', 'Monthly Income Scheme',
              'Post Office Time Deposit', 'Index Funds', 'REITs & InvITs',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--primary-500)' }} />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="card p-8 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <h2 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-3">Important Disclaimer</h2>
          <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
            ArthCalc is strictly an educational tool. We are not a SEBI-registered investment advisor, not a mutual
            fund distributor, not a bank, and not a financial institution of any kind. Nothing on this platform
            constitutes investment advice, financial advice, tax advice, or legal advice. All calculations are
            illustrative estimates only. Always consult a qualified financial professional before making any
            investment decision.
          </p>
        </section>

        <div className="text-center">
          <Link href="/calculators"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))' }}>
            <Calculator className="w-5 h-5" />
            Start Calculating — It&apos;s Free
          </Link>
        </div>
      </div>
    </div>
  );
}
