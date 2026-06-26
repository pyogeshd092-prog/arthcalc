import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | ArthCalc',
  description: 'Terms of use for ArthCalc — India\'s free investment calculator platform.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-14">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Terms of Use</h1>
          <p className="text-primary-300 text-sm">Last updated: January 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="card p-8 space-y-8 text-text-secondary text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">1. Educational Purpose Only</h2>
            <p>ArthCalc is an educational tool designed to help Indian investors understand how various investments work mathematically. All calculators, comparisons, articles, and other content are for educational and informational purposes only. Nothing on this platform constitutes investment advice, financial advice, tax advice, legal advice, or any other professional advice.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">2. No Investment Advice</h2>
            <p>ArthCalc does not recommend, endorse, rank, or solicit any investment product, financial product, or service. The platform does not make any recommendations about which investments are suitable for any individual. All investment decisions are your own responsibility.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">3. Accuracy of Information</h2>
            <p>We make every effort to use accurate, up-to-date rates from official sources (RBI, EPFO, PFRDA, India Post, SEBI, AMFI). However, rates change and we cannot guarantee that all information is current at the time of your use. Always verify current rates from official government/regulatory sources before making investment decisions.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">4. No Guarantee of Results</h2>
            <p>All calculator outputs are estimates based on user-entered assumptions and publicly available rates. Returns shown — especially for market-linked investments such as mutual funds, ELSS, NPS, and equities — are illustrative only and not guaranteed. Past performance does not guarantee future results. Market-linked investments carry risk including possible loss of principal.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">5. Use At Your Own Risk</h2>
            <p>By using ArthCalc, you agree that your use of the platform and reliance on any information is at your own risk. ArthCalc, its owners, and contributors shall not be liable for any investment losses, financial decisions, or other damages arising from use of this platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">6. Consult a Professional</h2>
            <p>Before making any investment decisions, please consult a SEBI-registered investment advisor, AMFI-registered mutual fund distributor, or other qualified financial professional who can assess your personal financial situation.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">7. Intellectual Property</h2>
            <p>All content on ArthCalc, including text, design, calculators, and code, is the intellectual property of ArthCalc. You may not copy, reproduce, or distribute this content without permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">8. Changes to Terms</h2>
            <p>We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
