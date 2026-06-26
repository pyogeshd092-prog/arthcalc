import { Accordion } from '@/components/ui';

const FAQS = [
  {
    q: 'Is this website free to use?',
    a: 'Yes, all calculators, comparisons, and educational content on ArthCalc are completely free to use. There are no hidden charges.',
  },
  {
    q: 'Does this platform give investment advice?',
    a: 'No. ArthCalc strictly provides educational information and calculation tools only. We do not recommend, advise, rank, or endorse any investment product or option. All calculations are estimates based on user-entered assumptions. Please consult a SEBI-registered investment advisor before making financial decisions.',
  },
  {
    q: 'Where does the rate data come from?',
    a: 'All rates and data come exclusively from official authorized sources: RBI (for bank FD norms and T-Bills), EPFO (for EPF rates), PFRDA (for NPS), Ministry of Finance / India Post (for PPF, SSY, NSC, KVP), SEBI and AMFI (for mutual fund regulations). No unofficial sources are used.',
  },
  {
    q: 'How accurate are the calculations?',
    a: 'Calculations use standard financial formulas (compound interest, SIP formula, etc.) published by regulators. However, actual returns depend on many factors: actual rate changes, timing, taxes, inflation, and fund performance. All results are estimates for educational purposes only.',
  },
  {
    q: 'Can I compare FD with SIP directly?',
    a: 'Yes. Use the Compare tool to compare any two investments. You\'ll see a side-by-side table of returns (based on your entered amount and duration), risk level, liquidity, lock-in period, tax treatment, and more. No winner is declared — the comparison is purely factual.',
  },
  {
    q: 'What is the Investment Goal Planner?',
    a: 'The Goal Planner lets you enter your age, monthly savings, and target goal (retirement, child education, house, etc.). It then shows projected outcomes across multiple investment types — FD, PPF, NPS, SIP, EPF, SSY, and T-Bills — side by side. No recommendations are made.',
  },
  {
    q: 'Can I download/export my calculations?',
    a: 'Yes. Registered users can export calculation results and comparison reports as PDF or Excel files. Each export clearly includes the inputs, assumptions, formulas, and the mandatory disclaimer.',
  },
  {
    q: 'What is Beginner Mode?',
    a: 'Beginner Mode simplifies financial language throughout the website. When enabled, complex terms are explained in plain English, examples are shown, and tooltips are more descriptive. Perfect if you\'re new to investing.',
  },
  {
    q: 'What is ₹1 Crore in today\'s value after 20 years at 6% inflation?',
    a: 'At 6% annual inflation, ₹1 Crore in 20 years would have the purchasing power of approximately ₹31 lakh in today\'s money. This is why the inflation-adjusted value is shown alongside the maturity value in every calculator — so you understand real returns, not just nominal returns.',
  },
  {
    q: 'Does this website sell investment products?',
    a: 'No. ArthCalc does not sell, recommend, or facilitate any investment transaction. It is purely an educational and calculation platform. There are no referral fees for investment products.',
  },
];

export function FAQSection() {
  return (
    <section className="py-20 bg-surface-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">Frequently Asked Questions</h2>
          <p className="section-subheading mx-auto">
            Common questions about the platform, how calculations work, and our data sources.
          </p>
        </div>
        <Accordion items={FAQS} />
      </div>
    </section>
  );
}
