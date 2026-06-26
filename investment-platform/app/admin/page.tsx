import type { Metadata } from 'next';
import { AdminPanelClient } from '@/components/admin/AdminPanelClient';

export const metadata: Metadata = {
  title: 'Admin Panel | ArthCalc',
  description: 'Admin panel for managing rates, FAQs, and content.',
};

// In production, protect this with NextAuth middleware
export default function AdminPage() {
  return <AdminPanelClient />;
}
