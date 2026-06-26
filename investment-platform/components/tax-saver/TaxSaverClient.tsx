'use client';

import { useState, useMemo } from 'react';
import { Slider, DisclaimerBox } from '@/components/ui';
import { formatINR } from '@/components/ui';
import { CheckCircle, Info, ExternalLink, Calculator } from 'lucide-react';
import Link from 'next/link';

const TAX_80C_OPTIONS = [
  {
    id: 'ppf', name: 'Public Provident Fund (PPF)', returns: '7.1% p.a. (tax-free)',
    risk: 'Very Low', lockIn: '15 years', liquidity: 'Partial after 5 yrs',
    online: true, section: '80C', limit: 150000, minAmount: '₹500/year',
    officialSource: 'India Post / SBI', officialUrl: 'https://www.indiapost.gov.in',
    highlight: 'EEE status — invest, grow, withdraw all tax-free',
    calcSlug: 'ppf',
  },
  {
    id: 'elss', name: 'ELSS Mutual Funds', returns: '10–15% p.a. (est., market-linked)',
    risk: 'High', lockIn: '3 years (shortest 80C)', liquidity: 'After 3 yrs',
    online: true, section: '80C', limit: 150000, minAmount: '₹500/month SIP',
    officialSource: 'SEBI / AMFI', officialUrl: 'https://www.amfiindia.com',
    highlight: 'Shortest lock-in among 80C options; market-linked returns',
    calcSlug: 'elss',
  },
  {
    id: 'epf', name: 'EPF (Employee Provident Fund)', returns: '8.25% p.a. (FY24)',
    risk: 'Very Low', lockIn: 'Till retirement (exceptions apply)', liquidity: 'On retirement / partial',
    online: true, section: '80C', limit: 150000, minAmount: '12% of basic salary',
    officialSource: 'EPFO', officialUrl: 'https://www.epfindia.gov.in',
    highlight: 'Auto-deducted from salary; employer also contributes',
    calcSlug: 'epf',
  },
  {
    id: 'nps', name: 'NPS (National Pension System)', returns: '9–12% p.a. (est., market-linked)',
    risk: 'Medium', lockIn: 'Till age 60', liquidity: 'Partial after 3 yrs',
    online: true, section: '80C + 80CCD(1B)', limit: 200000, minAmount: '₹500/month',
    officialSource: 'PFRDA', officialUrl: 'https://www.pfrda.org.in',
    highlight: 'Extra ₹50,000 deduction under 80CCD(1B) beyond 80C limit',
    calcSlug: 'nps',
  },
  {
    id: 'nsc', name: 'National Savings Certificate (NSC)', returns: '7.7% p.a.',
    risk: 'Very Low', lockIn: '5 years', liquidity: 'No premature withdrawal',
    online: false, section: '80C', limit: 150000, minAmount: '₹1,000',
    officialSource: 'India Post', officialUrl: 'https://www.indiapost.gov.in',
    highlight: 'Interest auto-reinvested qualifies for 80C in subsequent years',
    calcSlug: 'nsc',
  },
  {
    id: 'tax-saver-fd', name: 'Tax Saver Fixed Deposit', returns: '6.5–7.5% p.a. (bank-dependent)',
    risk: 'Very Low', lockIn: '5 years', liquidity: 'No premature withdrawal',
    online: true, section: '80C', limit: 150000, minAmount: '₹100',
    officialSource: 'RBI / Individual Banks', officialUrl: 'https://www.rbi.org.in',
    highlight: 'Guaranteed returns; interest is taxable as per slab',
    calcSlug: 'fd',
  },
  {
    id: 'ssy', name: 'Sukanya Samriddhi Yojana (SSY)', returns: '8.2% p.a. (tax-free)',
    risk: 'Very Low', lockIn: 'Till girl turns 21', liquidity: '50% at age 18',
    online: false, section: '80C', limit: 150000, minAmount: '₹250/year',
    officialSource: 'India Post', officialUrl: 'https://www.indiapost.gov.in',
    highlight: 'Highest govt rate; EEE status; for girl child (max 2)',
    calcSlug: 'ssy',
  },
  {
    id: 'life-insurance', name: 'Life Insurance Premium', returns: 'Varies (not investment-focused)',
    risk: 'Low', lockIn: 'Policy term', liquidity: 'Surrender value after 3 yrs',
    online: true, section: '80C', limit: 150000, minAmount: 'Depends on policy',
    officialSource: 'IRDAI', officialUrl: 'https://www.irdai.gov.in',
    highlight: 'Premium paid for life cover qualifies; ULIP/endowment returns vary',
    calcSlug: null,
  },
];

const TAX_SLABS_OLD = [
  { label: 'Up to ₹2.5L', rate: 0 },
  { label: '₹2.5L – ₹5L', rate: 5 },
  { label: '₹5L – ₹10L', rate: 20 },
  { label: 'Above ₹10L', rate: 30 },
];

function calcTaxSaving(income: number, deduction: number, slab: number): number {
  return (Math.min(deduction, 150000) * slab) / 100;
}

export function TaxSaverClient() {
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [currentDeduction, setCurrentDeduction] = useState(0);
  const [taxSlab, setTaxSlab] = useState(30);

  const maxAdditional = Math.max(0, 150000 - currentDeduction);
  const taxSaving80C = (maxAdditional * taxSlab) / 100;
  const npsExtra = 50000 * taxSlab / 100;
  const totalPossibleSaving = taxSaving80C + npsExtra;

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Tax Saving Investment Center</h1>
          <p className="text-primary-200 text-lg">Understand how to reduce taxable income legally through investments</p>
          <p className="text-primary-300 text-sm mt-2">Section 80C • 80CCD(1B) • Old Tax Regime • Educational tool only</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <DisclaimerBox />

        {/* Tax Saving Calculator */}
        <section className="card">
          <h2 className="text-xl font-bold text-text-primary mb-6">Estimate Your 80C Tax Savings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Slider label="Annual Income (Gross)" value={annualIncome} onChange={setAnnualIncome}
                min={300000} max={5000000} step={50000} formatValue={(v) => formatINR(v)} />
              <Slider label="Current 80C Investments (this year)" value={currentDeduction} onChange={setCurrentDeduction}
                min={0} max={150000} step={5000} formatValue={(v) => `₹${v.toLocaleString('en-IN')}`} />
              <div>
                <label className="text-sm font-semibold text-text-primary block mb-2">Your Tax Slab (Old Regime)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 20, 30].map((s) => (
                    <button key={s} onClick={() => setTaxSlab(s)}
                      className={`py-2 rounded-xl border-2 text-sm font-medium transition-all ${taxSlab === s ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700' : 'border-surface-border text-text-secondary hover:border-primary-300'}`}>
                      {s}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                <div className="text-sm text-text-muted mb-1">Remaining 80C limit to utilize</div>
                <div className="text-3xl font-bold text-primary-600">₹{maxAdditional.toLocaleString('en-IN')}</div>
                <div className="text-xs text-text-muted mt-1">of ₹1,50,000 maximum</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
                  <div className="text-xs text-text-muted mb-1">Tax saving via 80C</div>
                  <div className="text-xl font-bold text-green-600">₹{Math.round(taxSaving80C).toLocaleString('en-IN')}</div>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-center">
                  <div className="text-xs text-text-muted mb-1">+ NPS 80CCD(1B)</div>
                  <div className="text-xl font-bold text-blue-600">₹{Math.round(npsExtra).toLocaleString('en-IN')}</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 text-center">
                <div className="text-xs text-text-muted mb-1">Maximum total tax saving possible</div>
                <div className="text-2xl font-bold text-accent-600">₹{Math.round(totalPossibleSaving).toLocaleString('en-IN')}</div>
                <div className="text-xs text-text-muted mt-1">Under Old Tax Regime with {taxSlab}% slab</div>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                <p className="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  Under the New Tax Regime (2024), 80C deductions are not available. This calculator applies to the Old Tax Regime only. Verify with a CA before filing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 80C Options Table */}
        <section className="card">
          <h2 className="text-xl font-bold text-text-primary mb-2">All Section 80C Investment Options</h2>
          <p className="text-sm text-text-muted mb-6">Total 80C deduction limit: ₹1,50,000 per financial year (Old Tax Regime)</p>
          <div className="space-y-4">
            {TAX_80C_OPTIONS.map((opt) => (
              <div key={opt.id} className="border border-surface-border rounded-xl overflow-hidden">
                <div className="p-4 bg-surface-secondary flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-bold text-text-primary">{opt.name}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{opt.section} • Limit: ₹{opt.limit.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {opt.calcSlug && (
                      <Link href={`/calculators/${opt.calcSlug}`}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-400 font-medium hover:bg-primary-200 transition-colors">
                        <Calculator className="w-3.5 h-3.5" />
                        Calculator
                      </Link>
                    )}
                    <a href={opt.officialUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-medium hover:bg-green-200 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Official Source
                    </a>
                  </div>
                </div>
                <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-text-muted mb-1">Returns</div>
                    <div className="font-semibold text-green-600">{opt.returns}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">Risk</div>
                    <div className="font-medium text-text-primary">{opt.risk}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">Lock-in</div>
                    <div className="font-medium text-text-primary">{opt.lockIn}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">Online</div>
                    <div className="flex items-center gap-1">
                      {opt.online ? <CheckCircle className="w-4 h-4 text-green-500" /> : <span className="text-red-400 text-xs">Branch needed</span>}
                      {opt.online && <span className="text-xs text-green-600 font-medium">Available</span>}
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700 dark:text-blue-400">{opt.highlight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NPS Extra benefit */}
        <section className="card border-2 border-blue-200 dark:border-blue-800">
          <h2 className="text-lg font-bold text-text-primary mb-3">NPS: Additional ₹50,000 Deduction — Section 80CCD(1B)</h2>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            NPS (National Pension System) offers an <strong>additional deduction of ₹50,000</strong> under Section 80CCD(1B) — over and above the ₹1.5 lakh 80C limit. This means NPS subscribers can claim up to <strong>₹2 lakh total</strong> in deductions (₹1.5L via 80C + ₹50K via 80CCD(1B)).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {[5, 20, 30].map((slab) => (
              <div key={slab} className="p-4 rounded-xl bg-surface-secondary border border-surface-border text-center">
                <div className="text-xs text-text-muted mb-1">{slab}% tax slab</div>
                <div className="text-xl font-bold text-blue-600">₹{(50000 * slab / 100).toLocaleString('en-IN')}</div>
                <div className="text-xs text-text-muted">additional tax saving</div>
              </div>
            ))}
          </div>
          <a href="https://www.pfrda.org.in" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:underline font-medium">
            Official PFRDA Source <ExternalLink className="w-4 h-4" />
          </a>
        </section>

        <div className="disclaimer-box">
          <strong>Tax Disclaimer:</strong> Tax laws are subject to change. This tool applies to the Old Tax Regime only. The New Tax Regime (2024) does not allow 80C deductions. Calculations are indicative and do not account for surcharge, cess, or other deductions. Always consult a Chartered Accountant or tax professional for accurate tax planning. This platform does not provide tax advice.
        </div>
      </div>
    </div>
  );
}
