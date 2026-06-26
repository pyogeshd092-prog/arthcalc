import type { Metadata } from 'next';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export const metadata: Metadata = {
  title: 'My Dashboard — Saved Calculations & Comparisons | ArthCalc',
  description: 'View your saved calculations, comparisons, and investment goals. Export to PDF or Excel. Free account feature.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
