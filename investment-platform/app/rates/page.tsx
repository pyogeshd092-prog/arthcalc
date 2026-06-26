import type { Metadata } from 'next';
import { ExternalLink, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Live Investment Rates India 2024 — PPF, EPF, FD, SSY, NPS | ArthCalc',
  description: 'Current official interest rates for all major Indian investments: PPF 7.1%, EPF 8.25%, SSY 8.2%, NPS, FD, RD, NSC, KVP. Sourced from RBI, EPFO, India Post, PFRDA.',
};

const RATE_SECTIONS = [
  {
    title: 'Government Small Savings Schemes',
    source: 'Ministry of Finance / India Post',
    sourceUrl: 'https://www.indiapost.gov.in/Financial/pages/content/postalinterestrates.aspx',
    updatedQ: 'Q3 FY2024-25 (Oct–Dec 2024)',
    rates: [
      { name: 'Public Provident Fund (PPF)', rate: '7.1% p.a.', compounding: 'Annual', note: 'Tax-free returns, 80C' },
      { name: 'Sukanya Samriddhi Yojana (SSY)', rate: '8.2% p.a.', compounding: 'Annual', note: 'Highest govt rate, for girl child' },
      { name: 'National Savings Certificate (NSC)', rate: '7.7% p.a.', compounding: 'Annual (paid at maturity)', note: '5-year lock-in, 80C' },
      { name: 'Kisan Vikas Patra (KVP)', rate: '7.5% p.a.', compounding: '—', note: 'Doubles in ~115 months' },
      { name: 'Senior Citizen Savings Scheme (SCSS)', rate: '8.2% p.a.', compounding: 'Quarterly', note: '60+ years only, 80C' },
      { name: 'Post Office Monthly Income Scheme (POMIS)', rate: '7.4% p.a.', compounding: 'Monthly payout', note: 'Guaranteed monthly income' },
      { name: 'Post Office Time Deposit 1-yr', rate: '6.9% p.a.', compounding: 'Annual', note: '' },
      { name: 'Post Office Time Deposit 2-yr', rate: '7.0% p.a.', compounding: 'Annual', note: '' },
      { name: 'Post Office Time Deposit 3-yr', rate: '7.1% p.a.', compounding: 'Annual', note: '' },
      { name: 'Post Office Time Deposit 5-yr', rate: '7.5% p.a.', compounding: 'Annual', note: '80C eligible' },
      { name: 'Post Office Recurring Deposit (5-yr)', rate: '6.7% p.a.', compounding: 'Quarterly', note: '' },
    ],
  },
  {
    title: 'Retirement Savings',
    source: 'EPFO / PFRDA',
    sourceUrl: 'https://www.epfindia.gov.in',
    updatedQ: 'FY2023-24 declared',
    rates: [
      { name: 'EPF (Employees Provident Fund)', rate: '8.25% p.a.', compounding: 'Annual', note: 'FY2023-24 declared rate, 80C' },
      { name: 'NPS Tier-1 Equity (est.)', rate: '9–12% p.a. (historical avg)', compounding: 'Market-linked', note: 'Not guaranteed, tax benefit' },
      { name: 'NPS Tier-1 Corporate Bonds (est.)', rate: '8–9% p.a. (historical avg)', compounding: 'Market-linked', note: 'Not guaranteed' },
      { name: 'NPS Tier-1 Govt Securities (est.)', rate: '7–8% p.a. (historical avg)', compounding: 'Market-linked', note: 'Not guaranteed' },
      { name: 'EPS (Employee Pension Scheme)', rate: '8.33% of employer contribution', compounding: '—', note: 'Pension, not withdrawal' },
    ],
  },
  {
    title: 'Bank Deposits (Reference Rates — Major Banks)',
    source: 'RBI / Individual Bank Websites',
    sourceUrl: 'https://www.rbi.org.in',
    updatedQ: 'As of Oct 2024 (varies by bank)',
    rates: [
      { name: 'SBI Fixed Deposit (1–2 yr)', rate: '6.8–7.0% p.a.', compounding: 'Quarterly', note: 'Senior citizen +0.5%' },
      { name: 'HDFC Bank FD (1–2 yr)', rate: '7.0–7.25% p.a.', compounding: 'Quarterly', note: 'Check hdfc bank website' },
      { name: 'ICICI Bank FD (1–2 yr)', rate: '7.0–7.25% p.a.', compounding: 'Quarterly', note: 'Check icici bank website' },
      { name: 'Small Finance Banks FD', rate: 'Up to 9%+ p.a.', compounding: 'Quarterly', note: 'Higher risk, check DICGC cover' },
      { name: 'Recurring Deposit (Bank avg)', rate: '6.5–7.5% p.a.', compounding: 'Quarterly', note: 'Varies by tenure & bank' },
      { name: 'Tax Saver FD (5-yr)', rate: '6.5–7.5% p.a.', compounding: 'Quarterly', note: '80C, 5-yr lock-in' },
    ],
  },
  {
    title: 'Government Securities & T-Bills',
    source: 'RBI / RBI Retail Direct',
    sourceUrl: 'https://rbiretaildirect.org.in',
    updatedQ: 'Indicative (auction-based)',
    rates: [
      { name: 'T-Bills 91-day', rate: '~6.8–7.0% p.a.', compounding: 'Discounted', note: 'Zero coupon, auction-based' },
      { name: 'T-Bills 182-day', rate: '~6.9–7.1% p.a.', compounding: 'Discounted', note: 'Zero coupon, auction-based' },
      { name: 'T-Bills 364-day', rate: '~7.0–7.2% p.a.', compounding: 'Discounted', note: 'Zero coupon, auction-based' },
      { name: 'Govt Bonds (10-yr)', rate: '~7.0–7.3% p.a.', compounding: 'Semi-annual coupon', note: 'RBI Retail Direct' },
    ],
  },
];

export default function RatesPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Investment Rates Tracker</h1>
          <p className="text-primary-200 text-lg mb-2">Current official rates for all major Indian investments</p>
          <p className="text-primary-300 text-sm">Sources: RBI • EPFO • PFRDA • India Post • Ministry of Finance</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <div className="disclaimer-box">
          <strong>Important:</strong> Rates displayed are for educational reference. Interest rates on government schemes are notified quarterly by the Ministry of Finance. Bank FD rates vary by institution and tenure. Market-linked returns (NPS, mutual funds) are estimates only. Always verify current rates from official sources before investing.
        </div>

        {RATE_SECTIONS.map((section) => (
          <section key={section.title} className="card">
            <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
              <div>
                <h2 className="text-xl font-bold text-text-primary">{section.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="source-badge">{section.source}</span>
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" />
                    {section.updatedQ}
                  </span>
                </div>
              </div>
              <a href={section.sourceUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 font-medium">
                Official Source <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table w-full text-sm">
                <thead>
                  <tr>
                    <th>Investment Option</th>
                    <th>Current Rate</th>
                    <th>Compounding</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {section.rates.map((r, i) => (
                    <tr key={i}>
                      <td className="font-medium text-text-primary">{r.name}</td>
                      <td className="font-bold text-green-600">{r.rate}</td>
                      <td className="text-text-secondary">{r.compounding}</td>
                      <td className="text-text-muted text-xs">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <div className="card text-center">
          <p className="text-text-secondary text-sm">
            Rates verified from official government publications. Last reviewed: October 2024.
            For real-time auction rates, visit <a href="https://rbiretaildirect.org.in" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">RBI Retail Direct</a>.
            For EPF rate, visit <a href="https://www.epfindia.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">EPFO official site</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
