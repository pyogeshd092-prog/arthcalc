import { Shield, AlertTriangle, ExternalLink } from 'lucide-react';

const OFFICIAL_SOURCES = [
  { name: 'Reserve Bank of India', abbr: 'RBI', url: 'https://www.rbi.org.in', desc: 'FD norms, T-Bills, G-Sec, Monetary Policy' },
  { name: 'Employees\' Provident Fund Organisation', abbr: 'EPFO', url: 'https://www.epfindia.gov.in', desc: 'EPF, EPS, VPF interest rates' },
  { name: 'Pension Fund Regulatory and Development Authority', abbr: 'PFRDA', url: 'https://www.pfrda.org.in', desc: 'NPS, APY pension fund regulations' },
  { name: 'India Post', abbr: 'India Post', url: 'https://www.indiapost.gov.in', desc: 'PPF, NSC, KVP, SSY, MIS, SCSS rates' },
  { name: 'Securities and Exchange Board of India', abbr: 'SEBI', url: 'https://www.sebi.gov.in', desc: 'Mutual funds, ETFs, stocks, REITs' },
  { name: 'Association of Mutual Funds in India', abbr: 'AMFI', url: 'https://www.amfiindia.com', desc: 'Mutual fund NAV, scheme data' },
  { name: 'National Stock Exchange', abbr: 'NSE', url: 'https://www.nseindia.com', desc: 'Stock market data, ETF trading' },
  { name: 'Bombay Stock Exchange', abbr: 'BSE', url: 'https://www.bseindia.com', desc: 'Stock market data, listed products' },
];

export function DisclaimerSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main disclaimer */}
        <div className="rounded-2xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10 p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-3">
                Important Legal Disclaimer
              </h2>
              <div className="space-y-3 text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                <p>
                  <strong>ArthCalc is strictly an educational and informational platform.</strong> All
                  calculators, comparisons, and content are provided for educational purposes only.
                </p>
                <p>
                  All calculations are <strong>estimates only</strong>, based on assumptions entered by you and
                  publicly available official data. Actual returns may differ significantly due to rate changes,
                  market conditions, inflation, applicable taxes, and other factors.
                </p>
                <p>
                  <strong>This platform does NOT:</strong> provide investment advice, recommend any investment,
                  rank or endorse products, provide tax or legal advice, guarantee any return, or represent that
                  any projection will be achieved.
                </p>
                <p>
                  Market-linked investments (mutual funds, ETFs, stocks, NPS) carry <strong>risk of loss</strong>.
                  Past performance is not indicative of future results.
                </p>
                <p>
                  <strong>Always consult a SEBI-registered investment advisor (RIA), AMFI-registered
                  Mutual Fund Distributor (MFD), or qualified Chartered Accountant</strong> before making
                  any financial decision.
                </p>
                <p className="text-amber-600 dark:text-amber-400 font-medium">
                  By using this platform, you acknowledge that all outputs are for educational illustration
                  only and you will make your own independent judgment before investing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Official sources */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5" style={{ color: 'var(--primary-500)' }} />
            <h3 className="font-bold text-text-primary">Official Data Sources Used on This Platform</h3>
          </div>
          <p className="text-sm text-text-secondary mb-6">
            All rates, rules, and regulatory information are sourced exclusively from these official
            government and regulatory bodies. No unofficial or third-party financial sources are used.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFICIAL_SOURCES.map((src) => (
              <a
                key={src.abbr}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-surface-border hover:border-primary-300 hover:bg-surface-secondary transition-all group"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs text-white"
                     style={{ background: 'linear-gradient(135deg, var(--primary-700), var(--primary-900))' }}>
                  {src.abbr.slice(0, 3)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-text-primary group-hover:text-primary-600 transition-colors">
                      {src.abbr}
                    </span>
                    <ExternalLink className="w-3 h-3 text-text-muted" />
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed mt-0.5">{src.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
