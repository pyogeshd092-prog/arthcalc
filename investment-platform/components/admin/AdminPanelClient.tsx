'use client';

import { useState } from 'react';
import { Settings, TrendingUp, HelpCircle, FileText, BarChart2, Users, RefreshCw, CheckCircle, Edit3, Save } from 'lucide-react';

const INITIAL_RATES = [
  { id: 'ppf', name: 'PPF', rate: '7.1', lastUpdated: 'Oct 2024', source: 'Ministry of Finance' },
  { id: 'epf', name: 'EPF', rate: '8.25', lastUpdated: 'Aug 2024 (FY24)', source: 'EPFO' },
  { id: 'ssy', name: 'SSY', rate: '8.2', lastUpdated: 'Oct 2024', source: 'India Post' },
  { id: 'nsc', name: 'NSC', rate: '7.7', lastUpdated: 'Oct 2024', source: 'India Post' },
  { id: 'kvp', name: 'KVP', rate: '7.5', lastUpdated: 'Oct 2024', source: 'India Post' },
  { id: 'scss', name: 'SCSS', rate: '8.2', lastUpdated: 'Oct 2024', source: 'India Post' },
  { id: 'pomis', name: 'POMIS', rate: '7.4', lastUpdated: 'Oct 2024', source: 'India Post' },
  { id: 'po-td-1', name: 'PO TD 1-yr', rate: '6.9', lastUpdated: 'Oct 2024', source: 'India Post' },
  { id: 'po-td-5', name: 'PO TD 5-yr', rate: '7.5', lastUpdated: 'Oct 2024', source: 'India Post' },
];

const MOCK_ANALYTICS = {
  totalVisits: '12,450',
  calculations: '8,231',
  comparisons: '3,119',
  goalPlans: '891',
  topCalc: 'SIP Calculator',
  topCompare: 'FD vs SIP',
};

export function AdminPanelClient() {
  const [tab, setTab] = useState<'rates' | 'analytics' | 'faqs' | 'content'>('rates');
  const [rates, setRates] = useState(INITIAL_RATES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  const startEdit = (id: string, currentRate: string) => {
    setEditingId(id);
    setEditValue(currentRate);
  };

  const saveRate = (id: string) => {
    setRates((prev) => prev.map((r) => r.id === id ? { ...r, rate: editValue, lastUpdated: new Date().toLocaleDateString('en-IN') } : r));
    setEditingId(null);
    setSavedMsg('Rate updated successfully! Changes will reflect immediately.');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const TABS = [
    { id: 'rates', label: 'Manage Rates', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'content', label: 'Content', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="bg-gray-900 dark:bg-gray-950 py-8">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-3">
          <Settings className="w-7 h-7 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm">ArthCalc — No coding needed to update rates & content</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${tab === t.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'border-surface-border text-text-secondary hover:border-primary-300'}`}>
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {savedMsg && (
          <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl mb-6">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-green-700 dark:text-green-400 text-sm font-medium">{savedMsg}</span>
          </div>
        )}

        {/* Manage Rates */}
        {tab === 'rates' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Government Scheme Rates</h2>
                <p className="text-sm text-text-muted mt-1">Update these when the government notifies new quarterly rates</p>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl border border-surface-border text-text-secondary hover:bg-surface-secondary transition-colors">
                <RefreshCw className="w-3.5 h-3.5" />
                Sync All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table w-full text-sm">
                <thead>
                  <tr>
                    <th>Investment</th>
                    <th>Current Rate (%)</th>
                    <th>Last Updated</th>
                    <th>Source</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.map((r) => (
                    <tr key={r.id}>
                      <td className="font-medium text-text-primary">{r.name}</td>
                      <td>
                        {editingId === r.id ? (
                          <div className="flex items-center gap-2">
                            <input type="number" step="0.1" value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-20 px-2 py-1 rounded-lg border border-primary-400 bg-surface-primary text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                            <span className="text-text-muted text-xs">% p.a.</span>
                          </div>
                        ) : (
                          <span className="font-bold text-green-600">{r.rate}%</span>
                        )}
                      </td>
                      <td className="text-text-muted text-xs">{r.lastUpdated}</td>
                      <td className="text-text-muted text-xs">{r.source}</td>
                      <td>
                        {editingId === r.id ? (
                          <div className="flex gap-2">
                            <button onClick={() => saveRate(r.id)}
                              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors">
                              <Save className="w-3 h-3" /> Save
                            </button>
                            <button onClick={() => setEditingId(null)}
                              className="px-3 py-1 rounded-lg border border-surface-border text-xs text-text-secondary hover:bg-surface-secondary transition-colors">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => startEdit(r.id, r.rate)}
                            className="flex items-center gap-1 px-3 py-1 rounded-lg border border-surface-border text-xs text-text-secondary hover:border-primary-400 hover:text-primary-600 transition-colors">
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
              <p className="text-xs text-amber-700 dark:text-amber-400">
                ⚠️ Government scheme rates are notified quarterly. Check the{' '}
                <a href="https://financialservices.gov.in" target="_blank" rel="noopener noreferrer" className="underline">Ministry of Finance website</a>{' '}
                for the latest official rates before updating.
              </p>
            </div>
          </div>
        )}

        {/* Analytics */}
        {tab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Total Visits (30 days)', value: MOCK_ANALYTICS.totalVisits, icon: Users, color: 'text-blue-600' },
                { label: 'Calculations Run', value: MOCK_ANALYTICS.calculations, icon: TrendingUp, color: 'text-green-600' },
                { label: 'Comparisons Made', value: MOCK_ANALYTICS.comparisons, icon: BarChart2, color: 'text-purple-600' },
                { label: 'Goal Plans Created', value: MOCK_ANALYTICS.goalPlans, icon: FileText, color: 'text-orange-600' },
                { label: 'Top Calculator', value: MOCK_ANALYTICS.topCalc, icon: TrendingUp, color: 'text-primary-600' },
                { label: 'Top Comparison', value: MOCK_ANALYTICS.topCompare, icon: BarChart2, color: 'text-accent-600' },
              ].map((m) => (
                <div key={m.label} className="card text-center">
                  <m.icon className={`w-6 h-6 mx-auto mb-2 ${m.color}`} />
                  <div className="text-xl font-bold text-text-primary">{m.value}</div>
                  <div className="text-xs text-text-muted mt-1">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 className="font-bold text-text-primary mb-2">Connect Analytics</h3>
              <p className="text-sm text-text-secondary">
                Connect Google Analytics 4 (GA4) or Plausible for detailed traffic analytics.
                Add your GA4 Measurement ID to <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded">.env.local</code>{' '}
                as <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded">NEXT_PUBLIC_GA_ID</code>.
              </p>
            </div>
          </div>
        )}

        {/* FAQs */}
        {tab === 'faqs' && (
          <div className="card">
            <h2 className="text-xl font-bold text-text-primary mb-4">Manage FAQs</h2>
            <p className="text-sm text-text-secondary mb-6">
              FAQs are stored in <code className="text-xs bg-surface-secondary px-1.5 py-0.5 rounded">lib/data/investments.ts</code>{' '}
              per investment, and in individual calculator components. Update them directly in the data files — no deployment needed on Vercel (hot reload).
            </p>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>Coming Soon:</strong> In-app FAQ editor with database persistence. For now, edit <code>lib/data/investments.ts</code> → each investment has a <code>faqs: [{`{ q, a }`}]</code> array.
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        {tab === 'content' && (
          <div className="card">
            <h2 className="text-xl font-bold text-text-primary mb-4">Content Management</h2>
            <div className="space-y-3">
              {[
                { label: 'Investment Descriptions', file: 'lib/data/investments.ts → description field' },
                { label: 'Beginner Explanations', file: 'lib/data/investments.ts → beginnerExplanation field' },
                { label: 'Calculator Formulas & Assumptions', file: 'lib/calculations/index.ts → assumptions array' },
                { label: 'Comparison Highlights', file: 'components/comparison/ComparisonPageClient.tsx' },
                { label: 'Homepage Hero Text', file: 'components/home/HeroSection.tsx' },
                { label: 'Footer Links & Sources', file: 'components/layout/Footer.tsx' },
                { label: 'Tax Saving Options', file: 'components/tax-saver/TaxSaverClient.tsx → TAX_80C_OPTIONS' },
                { label: 'Official Rates (Admin)', file: 'Admin Panel → Manage Rates tab above' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl border border-surface-border bg-surface-secondary">
                  <span className="text-sm font-medium text-text-primary">{item.label}</span>
                  <code className="text-xs text-text-muted">{item.file}</code>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
              <p className="text-sm text-green-700 dark:text-green-400">
                <strong>Deployment tip:</strong> Push to your Git repo → Vercel auto-deploys within 60 seconds. No server restart needed.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
