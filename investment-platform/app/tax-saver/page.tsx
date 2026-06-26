import type { Metadata } from 'next';
import { TaxSaverClient } from '@/components/tax-saver/TaxSaverClient';

export const metadata: Metadata = {
  title: 'Tax Saving Investment Guide India — Section 80C, 80CCD, 80D | ArthCalc',
  description: 'Complete guide to tax-saving investments in India: PPF, ELSS, EPF, NPS, NSC, Tax Saver FD, SSY, Life Insurance. Calculate your 80C tax savings under old and new tax regime.',
};

export default function TaxSaverPage() {
  return <TaxSaverClient />;
}
