import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { UniversalCalculatorSection } from '@/components/home/UniversalCalculatorSection';
import { CategoryCardsSection } from '@/components/home/CategoryCardsSection';
import { CompareSection } from '@/components/home/CompareSection';
import { PopularCalculatorsSection } from '@/components/home/PopularCalculatorsSection';
import { RatesTickerSection } from '@/components/home/RatesTickerSection';
import { EncyclopediaPreview } from '@/components/home/EncyclopediaPreview';
import { FAQSection } from '@/components/home/FAQSection';
import { DisclaimerSection } from '@/components/home/DisclaimerSection';

export const metadata: Metadata = {
  title: 'ArthCalc — India\'s Most Comprehensive Investment Calculator',
  description: 'Free investment calculators for FD, SIP, PPF, NPS, EPF, NSC, SSY, Gold, T-Bills and 40+ more. Compare any two investments side-by-side. Official rates. Educational tool only.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Rates Ticker */}
      <RatesTickerSection />

      {/* 3. Universal Calculator */}
      <UniversalCalculatorSection />

      {/* 4. Investment Categories */}
      <CategoryCardsSection />

      {/* 5. Compare Section */}
      <CompareSection />

      {/* 6. Popular Calculators */}
      <PopularCalculatorsSection />

      {/* 7. Encyclopedia Preview */}
      <EncyclopediaPreview />

      {/* 8. FAQs */}
      <FAQSection />

      {/* 9. Disclaimer */}
      <DisclaimerSection />
    </>
  );
}
