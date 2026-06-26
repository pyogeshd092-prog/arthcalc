'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, ArrowLeftRight, Target, Download, Trash2, Share2, LogIn, BookOpen, TrendingUp, PlusCircle } from 'lucide-react';
import { formatINR } from '@/components/ui';

interface SavedCalc {
  id: string;
  type: string;
  name: string;
  inputs: Record<string, any>;
  result: { maturityValue: number; estimatedReturns: number; investedAmount: number };
  savedAt: string;
}

interface SavedComparison {
  id: string;
  invA: string;
  invB: string;
  savedAt: string;
}

function EmptyState({ icon: Icon, title, desc, cta, href }: { icon: any; title: string; desc: string; cta: string; href: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-primary-500" />
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-text-muted text-sm max-w-xs mb-6">{desc}</p>
      <Link href={href} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
        <PlusCircle className="w-4 h-4" />
        {cta}
      </Link>
    </div>
  );
}

export function DashboardClient() {
  const [tab, setTab] = useState<'calcs' | 'comparisons' | 'goals'>('calcs');
  const [savedCalcs, setSavedCalcs] = useState<SavedCalc[]>([]);
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([]);
  const [isLoggedIn] = useState(false); // placeholder — integrate with NextAuth

  useEffect(() => {
    try {
      const calcs = JSON.parse(sessionStorage.getItem('savedCalculations') || '[]');
      const comps = JSON.parse(sessionStorage.getItem('savedComparisons') || '[]');
      setSavedCalcs(calcs);
      setSavedComparisons(comps);
    } catch {}
  }, []);

  const deleteCalc = (id: string) => {
    const updated = savedCalcs.filter((c) => c.id !== id);
    setSavedCalcs(updated);
    sessionStorage.setItem('savedCalculations', JSON.stringify(updated));
  };

  const exportAllPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('ArthCalc — My Saved Calculations', 14, 20);
    doc.setFontSize(10);
    doc.text('DISCLAIMER: Educational estimates only. Not financial advice.', 14, 30);
    let y = 45;
    savedCalcs.forEach((calc, i) => {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFontSize(13);
      doc.text(`${i + 1}. ${calc.name}`, 14, y);
      y += 8;
      doc.setFontSize(10);
      doc.text(`Invested: ${formatINR(calc.result.investedAmount)}   Returns: ${formatINR(calc.result.estimatedReturns)}   Maturity: ${formatINR(calc.result.maturityValue)}`, 14, y);
      y += 6;
      doc.text(`Saved: ${new Date(calc.savedAt).toLocaleDateString('en-IN')}`, 14, y);
      y += 12;
    });
    doc.save('ArthCalc-Saved-Calculations.pdf');
  };

  const TABS = [
    { id: 'calcs', label: 'Calculations', icon: Calculator, count: savedCalcs.length },
    { id: 'comparisons', label: 'Comparisons', icon: ArrowLeftRight, count: savedComparisons.length },
    { id: 'goals', label: 'Goal Plans', icon: Target, count: 0 },
  ];

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="hero-gradient py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-primary-200">Your saved calculations, comparisons, and goals</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!isLoggedIn && (
          <div className="card border-2 border-primary-200 dark:border-primary-800 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
                <LogIn className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="font-bold text-text-primary mb-1">Sign in to sync across devices</h2>
                <p className="text-sm text-text-secondary mb-4">
                  Without signing in, your calculations are saved only in this browser session. Sign in with Google to save permanently and access from any device.
                </p>
                <Link href="/api/auth/signin"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
                  <LogIn className="w-4 h-4" />
                  Sign in with Google (Free)
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${tab === t.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'border-surface-border text-text-secondary hover:border-primary-300'}`}>
              <t.icon className="w-4 h-4" />
              {t.label}
              {t.count > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">{t.count}</span>
              )}
            </button>
          ))}
          {savedCalcs.length > 0 && tab === 'calcs' && (
            <button onClick={exportAllPDF}
              className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
              <Download className="w-4 h-4" />
              Export All PDF
            </button>
          )}
        </div>

        {/* Saved Calculations */}
        {tab === 'calcs' && (
          savedCalcs.length === 0
            ? <EmptyState icon={Calculator} title="No saved calculations yet"
                desc="Use any calculator and click 'Save' to store your results here."
                cta="Go to Calculators" href="/calculators/fd" />
            : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedCalcs.map((calc) => (
                  <div key={calc.id} className="card">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-text-primary">{calc.name}</h3>
                        <p className="text-xs text-text-muted">{new Date(calc.savedAt).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => navigator.share?.({ title: calc.name, url: window.location.href })}
                          className="p-2 rounded-lg hover:bg-surface-secondary transition-colors text-text-muted hover:text-text-primary">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteCalc(calc.id)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-text-muted hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {[
                        { label: 'Invested', value: calc.result.investedAmount, color: 'text-text-primary' },
                        { label: 'Returns', value: calc.result.estimatedReturns, color: 'text-green-600' },
                        { label: 'Maturity', value: calc.result.maturityValue, color: 'text-primary-600' },
                      ].map((m) => (
                        <div key={m.label} className="text-center p-2 rounded-lg bg-surface-secondary">
                          <div className={`font-bold text-sm ${m.color}`}>{formatINR(m.value)}</div>
                          <div className="text-xs text-text-muted">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <Link href={`/calculators/${calc.type}`}
                      className="text-xs text-primary-600 hover:underline font-medium">
                      Recalculate →
                    </Link>
                  </div>
                ))}
              </div>
            )
        )}

        {/* Saved Comparisons */}
        {tab === 'comparisons' && (
          savedComparisons.length === 0
            ? <EmptyState icon={ArrowLeftRight} title="No saved comparisons"
                desc="Compare any two investments and click 'Save' to keep them here."
                cta="Compare Investments" href="/compare" />
            : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedComparisons.map((comp) => (
                  <div key={comp.id} className="card flex items-center gap-4">
                    <div className="flex-1">
                      <div className="font-bold text-text-primary capitalize">{comp.invA.replace(/-/g, ' ')} vs {comp.invB.replace(/-/g, ' ')}</div>
                      <div className="text-xs text-text-muted">{new Date(comp.savedAt).toLocaleDateString('en-IN')}</div>
                    </div>
                    <Link href={`/compare/${comp.invA}-vs-${comp.invB}`}
                      className="text-xs text-primary-600 hover:underline font-medium">
                      View →
                    </Link>
                  </div>
                ))}
              </div>
            )
        )}

        {/* Goals */}
        {tab === 'goals' && (
          <EmptyState icon={Target} title="No saved goal plans"
            desc="Use the Goal Planner to create a plan and save it here."
            cta="Open Goal Planner" href="/goal-planner" />
        )}

        {/* Quick Links */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: '/calculators/fd', icon: Calculator, label: 'FD Calculator' },
              { href: '/calculators/sip', icon: TrendingUp, label: 'SIP Calculator' },
              { href: '/compare', icon: ArrowLeftRight, label: 'Compare' },
              { href: '/goal-planner', icon: Target, label: 'Goal Planner' },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className="card hover:shadow-card-hover hover:-translate-y-1 transition-all flex flex-col items-center gap-2 py-5 text-center">
                <item.icon className="w-6 h-6 text-primary-500" />
                <span className="text-sm font-medium text-text-primary">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
