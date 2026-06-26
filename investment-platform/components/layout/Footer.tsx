'use client';

import Link from 'next/link';
import { Shield, ExternalLink, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const OFFICIAL_SOURCES = [
  { label: 'RBI', href: 'https://www.rbi.org.in' },
  { label: 'EPFO', href: 'https://www.epfindia.gov.in' },
  { label: 'PFRDA (NPS)', href: 'https://www.pfrda.org.in' },
  { label: 'India Post', href: 'https://www.indiapost.gov.in' },
  { label: 'SEBI', href: 'https://www.sebi.gov.in' },
  { label: 'AMFI', href: 'https://www.amfiindia.com' },
  { label: 'RBI Retail Direct', href: 'https://rbiretaildirect.org.in' },
];

export function Footer() {
  const { language, t } = useLanguage();

  const mr = language === 'mr';

  const FOOTER_LINKS = {
    [mr ? 'कॅल्क्युलेटर' : 'Calculators']: [
      { label: 'FD Calculator', href: '/calculators/fd' },
      { label: 'SIP Calculator', href: '/calculators/sip' },
      { label: 'PPF Calculator', href: '/calculators/ppf' },
      { label: 'NPS Calculator', href: '/calculators/nps' },
      { label: 'EPF Calculator', href: '/calculators/epf' },
      { label: 'SSY Calculator', href: '/calculators/ssy' },
      { label: 'Gold Calculator', href: '/calculators/gold' },
      { label: 'ELSS Calculator', href: '/calculators/elss' },
      { label: mr ? 'सर्व कॅल्क्युलेटर →' : 'All Calculators →', href: '/calculators' },
    ],
    [mr ? 'तुलना' : 'Compare']: [
      { label: 'FD vs SIP', href: '/compare/fd-vs-sip' },
      { label: 'FD vs PPF', href: '/compare/fd-vs-ppf' },
      { label: 'PPF vs NPS', href: '/compare/ppf-vs-nps' },
      { label: mr ? 'सोने vs SIP' : 'Gold vs SIP', href: '/compare/gold-etf-vs-sip' },
      { label: 'EPF vs NPS', href: '/compare/epf-vs-nps' },
      { label: 'SSY vs PPF', href: '/compare/ssy-vs-ppf' },
      { label: mr ? 'सर्व तुलना →' : 'All Comparisons →', href: '/compare' },
    ],
    [mr ? 'शिका' : 'Learn']: [
      { label: mr ? 'गुंतवणूक विश्वकोश' : 'Investment Encyclopedia', href: '/investments' },
      { label: mr ? 'शिक्षण केंद्र' : 'Financial Learning Hub', href: '/learn' },
      { label: mr ? 'उद्दिष्ट नियोजक' : 'Goal Planner', href: '/goal-planner' },
      { label: mr ? 'कर बचत केंद्र' : 'Tax Saving Center', href: '/tax-saver' },
      { label: mr ? 'प्रवास सिम्युलेटर' : 'Journey Simulator', href: '/journey-simulator' },
      { label: mr ? 'थेट दर' : 'Live Rates', href: '/rates' },
    ],
    [mr ? 'अधिकृत स्रोत' : 'Official Sources']: OFFICIAL_SOURCES.map(s => ({ ...s, external: true })),
  };

  return (
    <footer className="bg-surface-secondary border-t border-surface-border mt-20">
      {/* Disclaimer Banner */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
                {mr ? 'महत्त्वपूर्ण अस्वीकरण — कृपया वाचा' : 'Important Disclaimer — Please Read'}
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                {mr
                  ? 'हे प्लॅटफॉर्म केवळ शैक्षणिक आणि माहितीपूर्ण हेतूंसाठी आहे. सर्व गणना सार्वजनिकरित्या उपलब्ध डेटा आणि वापरकर्त्याने प्रविष्ट केलेल्या गृहितकांवर आधारित अंदाज आहेत. ArthCalc गुंतवणूक, आर्थिक, कर किंवा कायदेशीर सल्ला देत नाही. कोणताही निर्णय घेण्यापूर्वी SEBI-नोंदणीकृत गुंतवणूक सल्लागाराचा सल्ला घ्या.'
                  : 'This platform is strictly for educational and informational purposes only. All calculations are estimates based on publicly available data and user-entered assumptions. ArthCalc does NOT provide investment, financial, tax, accounting, or legal advice. The platform does not recommend, endorse, rank, or solicit any investment product or service. Returns shown are illustrative only and not guaranteed. Past performance does not indicate future results. Always consult a SEBI-registered investment advisor before making any investment decisions.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, var(--primary-700), var(--accent-500))' }}>
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <div>
                <span className="font-bold text-lg text-text-primary leading-none block">ArthCalc</span>
                <span className="text-xs font-medium" style={{ color: 'var(--accent-500)' }}>
                  {mr ? 'अर्थ कॅल्क' : 'Wealth Calculator'}
                </span>
              </div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {mr
                ? 'भारतातील सर्वात सर्वसमावेशक गुंतवणूक कॅल्क्युलेटर आणि तुलना प्लॅटफॉर्म. पारदर्शक सूत्रे आणि अधिकृत डेटासह प्रत्येक प्रमुख भारतीय गुंतवणूक पर्याय समजून घ्या.'
                : "India's most comprehensive investment calculator and comparison platform. Calculate, compare, and understand every major Indian investment option with transparent formulas and official data."}
            </p>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>{mr ? 'फक्त अधिकृत डेटा स्रोत — RBI, EPFO, SEBI, AMFI, India Post' : 'Official data sources only — RBI, EPFO, SEBI, AMFI, India Post'}</span>
            </div>

            <div className="mt-6 p-4 bg-surface rounded-xl border border-surface-border">
              <p className="text-xs font-semibold text-text-secondary mb-2">
                {mr ? 'अधिकृत स्रोतांकडून डेटा:' : 'Data from official sources:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {['RBI', 'EPFO', 'PFRDA', 'SEBI', 'AMFI', 'India Post'].map((s) => (
                  <span key={s} className="text-xs px-2 py-1 bg-surface-secondary text-text-secondary rounded-md border border-surface-border">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-text-primary text-sm mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            {t.footer.copyright} {t.footer.madeIn}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-text-muted hover:text-text-secondary transition-colors">{t.footer.about}</Link>
            <Link href="/privacy" className="text-xs text-text-muted hover:text-text-secondary transition-colors">{t.footer.privacy}</Link>
            <Link href="/terms" className="text-xs text-text-muted hover:text-text-secondary transition-colors">{t.footer.terms}</Link>
            <Link href="/disclaimer" className="text-xs text-text-muted hover:text-text-secondary transition-colors">{t.footer.disclaimer}</Link>
            <Link href="/contact" className="text-xs text-text-muted hover:text-text-secondary transition-colors">{t.footer.contact}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
