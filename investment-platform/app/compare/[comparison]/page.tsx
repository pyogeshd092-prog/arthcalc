import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComparisonPageClient } from '@/components/comparison/ComparisonPageClient';
import { getInvestmentById, INVESTMENTS } from '@/lib/data/investments';

interface Props { params: { comparison: string } }

function parseComparison(slug: string) {
  const vsIdx = slug.indexOf('-vs-');
  if (vsIdx === -1) return null;
  return { a: slug.slice(0, vsIdx), b: slug.slice(vsIdx + 4) };
}

export async function generateStaticParams() {
  const pairs = [
    'fd-vs-sip', 'fd-vs-ppf', 'ppf-vs-nps', 'epf-vs-nps', 'ssy-vs-ppf',
    'fd-vs-rd', 'sip-vs-lumpsum', 'gold-etf-vs-sgb', 'elss-vs-ppf', 'nps-vs-epf',
  ];
  return pairs.map((slug) => ({ comparison: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parsed = parseComparison(params.comparison);
  if (!parsed) return { title: 'Compare | ArthCalc' };
  const a = getInvestmentById(parsed.a);
  const b = getInvestmentById(parsed.b);
  if (!a || !b) return { title: 'Compare | ArthCalc' };
  return {
    title: `${a.shortName} vs ${b.shortName} — Factual Comparison India | ArthCalc`,
    description: `Compare ${a.name} and ${b.name} — returns, risk, liquidity, lock-in, tax treatment, and online availability. Factual data only. No winner declared. Educational tool.`,
    alternates: { canonical: `/compare/${params.comparison}` },
  };
}

export default function ComparisonPage({ params }: Props) {
  const parsed = parseComparison(params.comparison);
  if (!parsed) notFound();
  const a = getInvestmentById(parsed.a);
  const b = getInvestmentById(parsed.b);
  if (!a || !b) notFound();
  return <ComparisonPageClient invA={a} invB={b} />;
}
