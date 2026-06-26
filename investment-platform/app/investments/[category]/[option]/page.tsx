import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InvestmentDetailPage } from '@/components/investments/InvestmentDetailPage';
import {
  INVESTMENT_CATEGORIES,
  getInvestmentById,
  getInvestmentsByCategory,
} from '@/lib/data/investments';

interface Props { params: { category: string; option: string } }

export async function generateStaticParams() {
  const params: { category: string; option: string }[] = [];
  for (const cat of INVESTMENT_CATEGORIES) {
    const invs = getInvestmentsByCategory(cat.id);
    for (const inv of invs) {
      params.push({ category: cat.slug, option: inv.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const inv = getInvestmentById(params.option);
  if (!inv) return { title: 'Investment | ArthCalc' };
  return {
    title: `${inv.name} (${inv.shortName}) — How to Invest, Returns & Details | ArthCalc`,
    description: `Complete guide to ${inv.name}: current returns ${inv.currentRate}, eligibility, how to invest online/mobile/branch, tax treatment, documents required, and FAQs. Official sources only. Educational tool.`,
    alternates: { canonical: `/investments/${params.category}/${params.option}` },
    openGraph: {
      title: `${inv.name} — Complete Investment Guide`,
      description: `Current returns: ${inv.currentRate} • Risk: ${inv.riskLevel} • Lock-in: ${inv.lockInPeriod} • Official data from ${inv.officialSource}`,
    },
  };
}

export default function InvestmentOptionPage({ params }: Props) {
  const cat = INVESTMENT_CATEGORIES.find((c) => c.slug === params.category);
  if (!cat) notFound();
  const inv = getInvestmentById(params.option);
  if (!inv) notFound();
  const related = getInvestmentsByCategory(cat.id).filter((i) => i.id !== inv.id);
  return (
    <InvestmentDetailPage
      investment={inv}
      categorySlug={params.category}
      relatedInvestments={related}
    />
  );
}
