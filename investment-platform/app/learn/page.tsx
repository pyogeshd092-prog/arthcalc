import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Financial Learning Hub — Investment Guides for India | ArthCalc',
  description: 'Free financial education articles for Indian investors. Learn about compound interest, inflation, SIP, PPF, NPS, ELSS, EPF, tax saving under 80C, and more.',
  alternates: { canonical: '/learn' },
};

const ARTICLES = [
  {
    slug: 'compound-interest',
    title: 'What is Compound Interest?',
    desc: 'The most powerful force in investing — how money grows exponentially and why starting early matters.',
    readTime: '5 min read',
    tag: 'Fundamentals',
    emoji: '📈',
  },
  {
    slug: 'inflation',
    title: 'What is Inflation and Why Does It Matter for Investors?',
    desc: 'Why ₹1 lakh today won\'t buy the same things in 2040 — and how to invest to beat inflation.',
    readTime: '6 min read',
    tag: 'Fundamentals',
    emoji: '📉',
  },
  {
    slug: 'sip',
    title: 'What is SIP? Complete Beginner Guide',
    desc: 'Systematic Investment Plan — how rupee cost averaging works, benefits, and how to start with ₹500/month.',
    readTime: '8 min read',
    tag: 'Mutual Funds',
    emoji: '🔄',
  },
  {
    slug: 'ppf',
    title: 'What is PPF? Everything You Need to Know',
    desc: 'Public Provident Fund — tax-free returns, 15-year tenure, partial withdrawal rules, and who should invest.',
    readTime: '7 min read',
    tag: 'Government Schemes',
    emoji: '🏛️',
  },
  {
    slug: 'nps',
    title: 'What is NPS? National Pension System Explained',
    desc: 'How NPS works, tier 1 vs tier 2, tax benefits under 80CCD, asset allocation, and annuity at retirement.',
    readTime: '9 min read',
    tag: 'Retirement',
    emoji: '🎯',
  },
  {
    slug: 'epf',
    title: 'EPF Explained — Employee Provident Fund Guide',
    desc: 'How EPF contributions work, employer share, interest calculation, withdrawal rules, and UAN management.',
    readTime: '7 min read',
    tag: 'Retirement',
    emoji: '💼',
  },
  {
    slug: 'fd-vs-sip',
    title: 'FD vs SIP — Which is Better for You?',
    desc: 'Fixed Deposit vs SIP — detailed comparison of returns, risk, liquidity, tax treatment, and who should choose what.',
    readTime: '8 min read',
    tag: 'Comparison',
    emoji: '⚖️',
  },
  {
    slug: 'elss',
    title: 'ELSS — Tax Saving Mutual Funds Explained',
    desc: 'How ELSS works, 3-year lock-in, 80C benefit of ₹1.5L, LTCG tax, and comparison with PPF and NPS.',
    readTime: '6 min read',
    tag: 'Tax Saving',
    emoji: '💰',
  },
  {
    slug: '80c-tax-saving',
    title: 'Complete Guide to Section 80C Tax Saving',
    desc: 'All investments eligible under Section 80C — PPF, ELSS, EPF, NSC, SSY, FD — and how to maximize ₹1.5L limit.',
    readTime: '10 min read',
    tag: 'Tax Saving',
    emoji: '🧾',
  },
  {
    slug: 'gold-investment',
    title: 'How to Invest in Gold in India — All 6 Ways',
    desc: 'Physical gold, Gold ETF, Sovereign Gold Bond, Digital Gold, Gold MF, Gold Futures — pros, cons, and tax.',
    readTime: '9 min read',
    tag: 'Gold',
    emoji: '🥇',
  },
  {
    slug: 'fd',
    title: 'Fixed Deposit Guide — Everything About FD',
    desc: 'How FD interest is calculated, compounding options, TDS, premature withdrawal penalty, and best FD rates.',
    readTime: '6 min read',
    tag: 'Bank Deposits',
    emoji: '🏦',
  },
  {
    slug: 'ssy',
    title: 'Sukanya Samriddhi Yojana — Complete Guide',
    desc: 'SSY for your daughter — eligibility, 8.2% rate, EEE tax benefit, deposit rules, withdrawal, and maturity.',
    readTime: '7 min read',
    tag: 'Government Schemes',
    emoji: '👧',
  },
];

const TAG_COLORS: Record<string, string> = {
  'Fundamentals': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Mutual Funds': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Government Schemes': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Retirement': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'Comparison': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Tax Saving': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'Gold': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Bank Deposits': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
};

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white/80 text-sm mb-6">
            <BookOpen className="w-4 h-4" />
            Free Financial Education
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Financial Learning Hub</h1>
          <p className="text-primary-200 text-lg">
            Plain-English guides to every major Indian investment — no jargon, no bias.
          </p>
          <p className="text-primary-300 text-sm mt-2">{ARTICLES.length} articles · Updated regularly · Educational only</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div className="text-3xl mb-4">{article.emoji}</div>
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TAG_COLORS[article.tag] || 'bg-surface-secondary text-text-muted'}`}>
                  {article.tag}
                </span>
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>
              <h2 className="font-bold text-text-primary group-hover:text-primary-600 transition-colors mb-2 leading-tight">
                {article.title}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed flex-1">{article.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-1"
                   style={{ color: 'var(--primary-500)' }}>
                Read article <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
