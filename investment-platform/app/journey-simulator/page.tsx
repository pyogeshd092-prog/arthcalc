import type { Metadata } from 'next';
import { JourneySimulatorClient } from '@/components/journey/JourneySimulatorClient';

export const metadata: Metadata = {
  title: 'Investment Journey Simulator India — ₹5000/month for 20 Years | ArthCalc',
  description: 'See how ₹5000 per month invested over 5, 10, 15, 20, 25, 30 years grows across all Indian investments — FD, PPF, SIP, NPS, EPF, Gold, T-Bills. Visual timeline. Educational only.',
};

export default function JourneySimulatorPage() {
  return <JourneySimulatorClient />;
}
