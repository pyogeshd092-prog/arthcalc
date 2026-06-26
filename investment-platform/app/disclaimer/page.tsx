import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer | ArthCalc',
  description: 'Full disclaimer for ArthCalc — educational investment calculator. Not financial advice.',
  alternates: { canonical: '/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-14">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Disclaimer</h1>
          <p className="text-primary-300 text-sm">Please read this carefully before using ArthCalc</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6">

        <div className="card p-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800 dark:text-amber-300 mb-2">ArthCalc is NOT a financial advisor</p>
              <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                ArthCalc is a purely educational investment calculator tool. We are not registered with SEBI as an
                investment advisor, not registered with AMFI as a mutual fund distributor, not a bank, not a
                Non-Banking Financial Company (NBFC), and not a financial institution of any kind.
              </p>
            </div>
          </div>
        </div>

        <div className="card p-8 space-y-6 text-text-secondary text-sm leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-text-primary mb-2">No Investment Recommendations</h2>
            <p>Nothing on ArthCalc constitutes a recommendation, endorsement, solicitation, or offer to buy or sell any investment product. We do not rank investments against each other, suggest which investments are "better," or provide personalized investment advice of any kind.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-text-primary mb-2">Calculator Results Are Estimates</h2>
            <p>All calculator outputs are mathematical estimates based on: (a) rates entered by the user, or (b) publicly available rates from official sources at the time of publication. These results are not guarantees of actual returns. Actual returns will differ based on actual market conditions, rate changes, compounding frequency, timing, fees, and taxes.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-text-primary mb-2">Market-Linked Investments Carry Risk</h2>
            <p>For market-linked investments (mutual funds, ELSS, NPS equity, stocks, REITs, gold), returns shown are historical estimates only. Market-linked investments carry risk of loss including possible loss of the principal amount. Past performance does not guarantee future returns.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-text-primary mb-2">Tax Information Is General</h2>
            <p>Tax-related information provided on this platform is general in nature and based on publicly available tax rules as of the publication date. Tax laws change. Your individual tax liability depends on your total income, applicable deductions, and current tax laws. Always consult a qualified chartered accountant or tax advisor for your specific tax situation.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-text-primary mb-2">Rates May Be Outdated</h2>
            <p>Interest rates for government schemes (PPF, NSC, SSY, KVP, MIS, SCSS, etc.) are reviewed quarterly by the Ministry of Finance and may change. EPF and NPS rates are announced annually. Always verify current rates from the official source before investing.</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-text-primary mb-2">Consult a Professional</h2>
            <p>Before making any investment decision, please consult with a SEBI-registered investment advisor who can provide personalized advice based on your financial goals, risk tolerance, time horizon, and complete financial picture.</p>
          </section>

          <div className="pt-4 border-t border-surface-border">
            <p className="text-xs text-text-muted">
              By using ArthCalc, you acknowledge that you have read and understood this disclaimer and that you use
              the platform entirely at your own risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
