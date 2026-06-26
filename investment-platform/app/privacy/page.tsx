import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | ArthCalc',
  description: 'ArthCalc privacy policy — how we handle your data. We collect minimal data and never sell it.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-14">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-primary-300 text-sm">Last updated: January 2025</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="card p-8 space-y-8 text-text-secondary text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">1. What We Collect</h2>
            <p>ArthCalc is a purely client-side educational tool. We do not require you to create an account or log in to use any calculator. The data you enter into calculators (investment amounts, rates, years) stays in your browser and is never sent to our servers.</p>
            <p className="mt-3">We may collect anonymous, aggregated usage data (such as which calculators are used most) through standard web analytics. This data contains no personally identifiable information.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">2. Cookies & Local Storage</h2>
            <p>We use browser local storage solely to remember your preferences (color theme, language selection, dark/light mode). No cookies are used for advertising or tracking purposes. You can clear this at any time through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">3. Third-Party Services</h2>
            <p>We may use standard analytics tools (such as Google Analytics) to understand aggregate usage patterns. These tools may set their own cookies as per their privacy policies. We do not share any personally identifiable information with third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">4. No Data Sales</h2>
            <p>We do not sell, rent, trade, or otherwise transfer your data to any third party. ArthCalc has no business model based on user data monetization.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">5. Children</h2>
            <p>ArthCalc is an educational financial tool intended for adults. We do not knowingly collect personal information from children under 18.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-primary mb-3">6. Contact</h2>
            <p>For any privacy-related questions, please reach out through our <a href="/contact" className="text-primary-600 hover:underline">Contact page</a>.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
