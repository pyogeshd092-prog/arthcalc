'use client';

import { useState } from 'react';
import Link from 'next/link';
import { InvestmentOption } from '@/lib/data/investments';
import {
  CheckCircle, XCircle, ExternalLink, Calculator, ArrowLeftRight,
  Info, Shield, Zap, AlertTriangle,
  Smartphone, Globe, Building2, User, FileText, TrendingUp, Clock,
  BookOpen, HelpCircle
} from 'lucide-react';
import { Accordion, DisclaimerBox, SourceBadge, BeginnerToggle } from '@/components/ui';

interface Props {
  investment: InvestmentOption;
  categorySlug: string;
  relatedInvestments: InvestmentOption[];
}

function AccessBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 ${ok ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'}`}>
      {ok ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
      <div>
        <div className={`text-sm font-semibold ${ok ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{label}</div>
        <div className="text-xs text-text-muted">{ok ? 'Available' : 'Not available'}</div>
      </div>
    </div>
  );
}

function RiskBadge({ level }: { level: string }) {
  const config: Record<string, { color: string; bg: string }> = {
    'Very Low':    { color: 'text-green-700 dark:text-green-400',   bg: 'bg-green-100 dark:bg-green-900/30' },
    'Low':         { color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    'Low-Medium':  { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
    'Medium':      { color: 'text-yellow-700 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    'Medium-High': { color: 'text-orange-700 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    'High':        { color: 'text-red-700 dark:text-red-400',       bg: 'bg-red-100 dark:bg-red-900/30' },
    'Very High':   { color: 'text-red-800 dark:text-red-300',       bg: 'bg-red-200 dark:bg-red-900/50' },
  };
  const c = config[level] || config['Medium'];
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${c.bg} ${c.color}`}>{level} Risk</span>;
}

export function InvestmentDetailPage({ investment: inv, categorySlug, relatedInvestments }: Props) {
  const [beginnerMode, setBeginnerMode] = useState(false);
  const calculatorSlug = inv.id;

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Hero */}
      <div className="hero-gradient py-12">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-primary-300 mb-4 flex items-center gap-1 flex-wrap">
            <Link href="/investments" className="hover:text-white">Encyclopedia</Link>
            <span>›</span>
            <Link href={`/investments/${categorySlug}`} className="hover:text-white capitalize">{categorySlug.replace(/-/g, ' ')}</Link>
            <span>›</span>
            <span className="text-white">{inv.shortName}</span>
          </nav>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{inv.name}</h1>
              <p className="text-primary-200 text-lg mb-3">{inv.shortName}</p>
              <div className="flex flex-wrap gap-2">
                <RiskBadge level={inv.riskLevel} />
                {inv.section80C && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    Section 80C Eligible
                  </span>
                )}
                {inv.isPopular && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400">
                    ⭐ Popular
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <BeginnerToggle enabled={beginnerMode} onToggle={setBeginnerMode} />
              <Link href={`/calculators/${calculatorSlug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-colors">
                <Calculator className="w-4 h-4" />
                Open Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <DisclaimerBox />

        {/* Key Numbers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Current Returns', value: inv.currentRate, icon: TrendingUp, color: 'text-green-600' },
            { label: 'Lock-in Period', value: inv.lockInPeriod, icon: Clock, color: 'text-blue-600' },
            { label: 'Min Investment', value: inv.minInvestment, icon: Shield, color: 'text-purple-600' },
            { label: 'Max Investment', value: inv.maxInvestment || 'No limit', icon: Zap, color: 'text-orange-600' },
          ].map((item) => (
            <div key={item.label} className="card text-center">
              <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
              <div className="text-lg font-bold text-text-primary">{item.value}</div>
              <div className="text-xs text-text-muted mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* What is it */}
        <section className="card">
          <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-500" />
            What is {inv.shortName}?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">{inv.description}</p>
          {beginnerMode && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold mb-2">
                <Info className="w-4 h-4" />
                Simple Explanation
              </div>
              <p className="text-text-secondary text-sm">{inv.tagline}</p>
            </div>
          )}
          {inv.interestCalculationMethod && (
            <div className="mt-4 p-4 bg-surface-secondary rounded-xl border border-surface-border">
              <div className="text-xs text-text-muted font-semibold mb-1 uppercase tracking-wide">How Returns Are Calculated</div>
              <div className="text-text-secondary text-sm">{inv.interestCalculationMethod}</div>
              {inv.maturityFormula && (
                <div className="mt-2 font-mono text-xs bg-surface-primary rounded p-2 text-primary-700 dark:text-primary-400 border border-surface-border">
                  {inv.maturityFormula}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Eligibility */}
        <section className="card">
          <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary-500" />
            Who Can Invest?
          </h2>
          <div className="text-text-secondary leading-relaxed mb-6">{inv.eligibility}</div>
          <h3 className="font-semibold text-text-primary mb-3">Tax Treatment</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-sm bg-surface-secondary border border-surface-border text-text-secondary">
              {inv.taxTreatment}
            </span>
            {inv.section80C && (
              <span className="px-3 py-1 rounded-full text-sm bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400">
                Section 80C — up to ₹1.5L deduction
              </span>
            )}
          </div>
          <h3 className="font-semibold text-text-primary mb-3">Liquidity</h3>
          <span className="px-3 py-1 rounded-full text-sm bg-surface-secondary border border-surface-border text-text-secondary capitalize">
            {inv.liquidityLevel.replace('-', ' ')}
          </span>
        </section>

        {/* How to Invest */}
        <section className="card">
          <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary-500" />
            How Can You Invest?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <AccessBadge ok={inv.canInvestOnline} label="Website / Online Portal" />
            <AccessBadge ok={inv.canInvestMobile} label="Mobile App" />
            <AccessBadge ok={inv.canInvestNetBanking} label="Net Banking" />
          </div>
          {inv.needBranchVisit && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl mb-6">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-amber-700 dark:text-amber-400 text-sm">Branch Visit May Be Required</div>
                <div className="text-sm text-text-secondary mt-1">
                  For {inv.shortName}, you may need to visit a branch for account opening, KYC verification, or certain transactions.
                </div>
              </div>
            </div>
          )}
          {inv.investmentChannels && inv.investmentChannels.length > 0 && (
            <>
              <h3 className="font-semibold text-text-primary mb-3">Available Channels</h3>
              <div className="flex flex-wrap gap-2">
                {inv.investmentChannels.map((ch, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-surface-secondary border border-surface-border text-sm text-text-secondary">{ch}</span>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Where to Open */}
        {inv.whereToOpen && inv.whereToOpen.length > 0 && (
          <section className="card">
            <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-500" />
              Where Can You Open {inv.shortName}?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inv.whereToOpen.map((place, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-surface-secondary rounded-xl border border-surface-border">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{place}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Step-by-Step */}
        {inv.stepsToStart && inv.stepsToStart.length > 0 && (
          <section className="card">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-500" />
              Step-by-Step: How to Get Started
            </h2>
            <div className="space-y-4">
              {inv.stepsToStart.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
            {beginnerMode && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  <strong>Beginner tip:</strong> Always start with the official website or a SEBI-registered platform. Avoid third-party apps that are not authorized.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Documents Required */}
        {inv.documentsRequired && inv.documentsRequired.length > 0 && (
          <section className="card">
            <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-500" />
              Documents Required
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inv.documentsRequired.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-surface-secondary rounded-xl border border-surface-border">
                  <FileText className="w-4 h-4 text-primary-400 flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{doc}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Advantages & Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inv.advantages && inv.advantages.length > 0 && (
            <section className="card">
              <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Key Features
              </h2>
              <ul className="space-y-3">
                {inv.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-secondary leading-relaxed">{adv}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {inv.limitations && inv.limitations.length > 0 && (
            <section className="card">
              <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Points to Note
              </h2>
              <ul className="space-y-3">
                {inv.limitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-secondary leading-relaxed">{lim}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Historical Rates */}
        {inv.historicalRates && inv.historicalRates.length > 0 && (
          <section className="card">
            <h2 className="text-xl font-bold text-text-primary mb-4">Historical Rates</h2>
            <div className="overflow-x-auto">
              <table className="data-table w-full text-sm">
                <thead>
                  <tr><th>Period</th><th>Rate</th><th>Source</th></tr>
                </thead>
                <tbody>
                  {inv.historicalRates.map((r, i) => (
                    <tr key={i}>
                      <td>{r.year}</td>
                      <td className="font-semibold text-primary-600">{r.rate}%</td>
                      <td className="text-text-muted text-xs">Official</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-3">
              * Past rates are for reference only and do not guarantee future returns. Always verify with the official source.
            </p>
          </section>
        )}

        {/* FAQs */}
        {inv.faqs && inv.faqs.length > 0 && (
          <section className="card">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary-500" />
              Frequently Asked Questions
            </h2>
            <Accordion items={inv.faqs.map((f) => ({ q: f.q, a: f.a }))} />
          </section>
        )}

        {/* Official Source */}
        <section className="card border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10">
          <h2 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Official Source & Regulator
          </h2>
          <p className="text-text-secondary text-sm mb-4">
            All data on this page is sourced from official government and regulatory publications. For current rates, rules, and eligibility, always refer to the official source directly.
          </p>
          <SourceBadge source={inv.officialSource} url={inv.officialWebsite} />
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={inv.officialWebsite} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
              <ExternalLink className="w-4 h-4" />
              Visit Official Website
            </a>
            <Link href={`/calculators/${calculatorSlug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-green-600 text-green-700 dark:text-green-400 text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
              <Calculator className="w-4 h-4" />
              Calculate Returns
            </Link>
          </div>
        </section>

        {/* CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href={`/calculators/${calculatorSlug}`}
            className="card hover:shadow-card-hover hover:-translate-y-1 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
              <Calculator className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <div className="font-bold text-text-primary">{inv.shortName} Calculator</div>
              <div className="text-xs text-text-muted">Estimate your projected returns</div>
            </div>
          </Link>
          <Link href={`/compare/${inv.id}-vs-fd`}
            className="card hover:shadow-card-hover hover:-translate-y-1 transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent-100 dark:bg-accent-900/40 flex items-center justify-center flex-shrink-0">
              <ArrowLeftRight className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <div className="font-bold text-text-primary">Compare {inv.shortName}</div>
              <div className="text-xs text-text-muted">Side-by-side with other options</div>
            </div>
          </Link>
        </div>

        {/* Related */}
        {relatedInvestments.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Similar Investment Options</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedInvestments.slice(0, 4).map((rel) => (
                <Link key={rel.id} href={`/investments/${categorySlug}/${rel.slug}`}
                  className="card hover:shadow-card-hover hover:-translate-y-1 transition-all text-center p-4">
                  <div className="font-medium text-text-primary text-sm mb-1">{rel.shortName}</div>
                  <div className="text-xs text-green-600 font-semibold">{rel.currentRate}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="disclaimer-box">
          <strong>Educational Platform Only.</strong> ArthCalc does not provide investment advice,
          recommendations, or endorsements. The information on this page is for educational purposes only.
          All rates, rules, and eligibility criteria are subject to change — always verify with the official source.
          Consult a SEBI-registered financial advisor before making any investment decision.
        </div>
      </div>
    </div>
  );
}
