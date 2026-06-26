'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ui/ThemeProvider';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sun, Moon, Menu, X, Search, Calculator, TrendingUp,
  ChevronDown, BookOpen, Target, BarChart3, Zap
} from 'lucide-react';

export function Header() {
  const { theme, setTheme, colorTheme, setColorTheme, resolvedTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const COLOR_THEMES = [
    { id: 'blue-gold', label: 'Blue & Gold', colors: ['#1e3a8a', '#f59e0b'] },
    { id: 'green-white', label: 'Green & White', colors: ['#059669', '#f59e0b'] },
    { id: 'purple-teal', label: 'Purple & Teal', colors: ['#9333ea', '#14b8a6'] },
  ] as const;

  const NAV_ITEMS = [
    {
      label: t.nav.calculators,
      icon: Calculator,
      href: '/calculators',
      children: [
        { label: 'FD Calculator', href: '/calculators/fd', tag: t.ui.popularBadge },
        { label: 'SIP Calculator', href: '/calculators/sip', tag: t.ui.popularBadge },
        { label: 'PPF Calculator', href: '/calculators/ppf', tag: '' },
        { label: 'NPS Calculator', href: '/calculators/nps', tag: '' },
        { label: 'EPF Calculator', href: '/calculators/epf', tag: '' },
        { label: 'NSC Calculator', href: '/calculators/nsc', tag: '' },
        { label: 'SSY Calculator', href: '/calculators/ssy', tag: '' },
        { label: 'Gold Calculator', href: '/calculators/gold', tag: '' },
        { label: 'RD Calculator', href: '/calculators/rd', tag: '' },
        { label: 'T-Bill Calculator', href: '/calculators/t-bills', tag: t.ui.newBadge },
        { label: 'ELSS Calculator', href: '/calculators/elss', tag: '80C' },
        { label: language === 'mr' ? 'सर्व पहा →' : 'View All →', href: '/calculators', tag: '' },
      ],
    },
    {
      label: t.nav.compare,
      icon: BarChart3,
      href: '/compare',
      children: [
        { label: 'FD vs SIP', href: '/compare/fd-vs-sip', tag: language === 'mr' ? 'ट्रेंडिंग' : 'Trending' },
        { label: 'FD vs PPF', href: '/compare/fd-vs-ppf', tag: '' },
        { label: 'PPF vs NPS', href: '/compare/ppf-vs-nps', tag: '' },
        { label: language === 'mr' ? 'सोने vs SIP' : 'Gold vs SIP', href: '/compare/gold-etf-vs-sip', tag: '' },
        { label: 'EPF vs NPS', href: '/compare/epf-vs-nps', tag: '' },
        { label: 'SSY vs PPF', href: '/compare/ssy-vs-ppf', tag: '' },
        { label: 'FD vs RD', href: '/compare/fd-vs-rd', tag: '' },
        { label: 'ELSS vs PPF', href: '/compare/elss-vs-ppf', tag: '80C' },
        { label: language === 'mr' ? 'कोणतेही दोन तुलना करा →' : 'Compare Any Two →', href: '/compare', tag: '' },
      ],
    },
    {
      label: t.nav.investments,
      icon: TrendingUp,
      href: '/investments',
      children: [
        { label: language === 'mr' ? 'बँक ठेवी' : 'Bank Deposits', href: '/investments/bank-deposits', tag: '' },
        { label: language === 'mr' ? 'पोस्ट ऑफिस योजना' : 'Post Office Schemes', href: '/investments/post-office', tag: '' },
        { label: language === 'mr' ? 'म्युच्युअल फंड' : 'Mutual Funds & SIP', href: '/investments/mutual-funds', tag: '' },
        { label: language === 'mr' ? 'सेवानिवृत्ती (EPF, NPS)' : 'Retirement (EPF, NPS)', href: '/investments/retirement-pension', tag: '' },
        { label: language === 'mr' ? 'सरकारी रोखे' : 'Government Securities', href: '/investments/government-securities', tag: '' },
        { label: language === 'mr' ? 'मौल्यवान धातू' : 'Precious Metals', href: '/investments/precious-metals', tag: '' },
        { label: 'ETFs', href: '/investments/etfs', tag: '' },
        { label: language === 'mr' ? 'सर्व श्रेणी →' : 'All Categories →', href: '/investments', tag: '' },
      ],
    },
    {
      label: t.nav.goalPlanner,
      icon: Target,
      href: '/goal-planner',
      children: [],
    },
    {
      label: t.nav.learn,
      icon: BookOpen,
      href: '/learn',
      children: [
        { label: language === 'mr' ? 'चक्रवाढ व्याज म्हणजे काय?' : 'What is Compound Interest?', href: '/learn/compound-interest', tag: '' },
        { label: language === 'mr' ? 'महागाई म्हणजे काय?' : 'What is Inflation?', href: '/learn/inflation', tag: '' },
        { label: language === 'mr' ? 'SIP म्हणजे काय?' : 'What is SIP?', href: '/learn/sip', tag: '' },
        { label: language === 'mr' ? 'PPF म्हणजे काय?' : 'What is PPF?', href: '/learn/ppf', tag: '' },
        { label: language === 'mr' ? 'NPS म्हणजे काय?' : 'What is NPS?', href: '/learn/nps', tag: '' },
        { label: language === 'mr' ? 'कर बचत मार्गदर्शिका (80C)' : 'Tax Saving Guide (80C)', href: '/tax-saver', tag: '' },
        { label: language === 'mr' ? 'सर्व लेख →' : 'All Articles →', href: '/learn', tag: '' },
        { label: t.nav.journeySimulator, href: '/journey-simulator', tag: language === 'mr' ? 'व्हिज्युअल' : 'Visual' },
        { label: t.nav.taxSaver, href: '/tax-saver', tag: '80C' },
      ],
    },
    {
      label: t.nav.liveRates,
      icon: Zap,
      href: '/rates',
      children: [],
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-md border-b border-surface-border shadow-card'
            : 'bg-surface border-b border-surface-border'
        }`}
      >
        {/* Top bar */}
        <div className="bg-primary-950 dark:bg-primary-950 text-white text-xs py-1.5 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <span className="text-primary-300">
              {language === 'mr'
                ? 'फक्त शैक्षणिक हेतूसाठी. गुंतवणूक सल्ला नाही. नेहमी पात्र आर्थिक सल्लागाराचा सल्ला घ्या.'
                : 'For educational purposes only. Not investment advice. Always consult a qualified financial advisor.'}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-primary-300">PPF: 7.1% | EPF: 8.25% | SSY: 8.2%</span>
              <Link href="/rates" className="text-accent-400 hover:text-accent-500 font-medium">
                {language === 'mr' ? 'सर्व दर →' : 'All Rates →'}
              </Link>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, var(--primary-700), var(--accent-500))' }}>
                <span className="text-white font-bold text-sm">AC</span>
              </div>
              <div>
                <span className="font-bold text-lg text-text-primary leading-none block">ArthCalc</span>
                <span className="text-xs font-medium leading-none" style={{ color: 'var(--accent-500)' }}>
                  {language === 'mr' ? 'अर्थ कॅल्क' : 'Wealth Calculator'}
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeMenu === item.label
                        ? 'bg-surface-secondary text-text-primary'
                        : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                    {item.children.length > 0 && <ChevronDown className="w-3 h-3 opacity-60" />}
                  </Link>

                  {/* Dropdown */}
                  {item.children.length > 0 && activeMenu === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-surface-border rounded-xl shadow-card-hover overflow-hidden z-50 animate-fade-in">
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors group"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform">{child.label}</span>
                            {child.tag && (
                              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                                    style={{ background: 'var(--primary-100)', color: 'var(--primary-700)' }}>
                                {child.tag}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-surface-border text-sm font-medium text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors"
                title={language === 'en' ? 'Switch to Marathi' : 'Switch to English'}
              >
                <span className="text-base leading-none">{language === 'en' ? '🇮🇳' : '🇮🇳'}</span>
                <span className="font-semibold">{language === 'en' ? 'मराठी' : 'EN'}</span>
              </button>

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Color theme picker */}
              <div className="hidden md:flex items-center gap-1 p-1 bg-surface-secondary rounded-lg">
                {COLOR_THEMES.map((ct) => (
                  <button
                    key={ct.id}
                    onClick={() => setColorTheme(ct.id as any)}
                    className={`w-5 h-5 rounded-full transition-all ${colorTheme === ct.id ? 'ring-2 ring-offset-1 scale-110' : ''}`}
                    style={{
                      background: `linear-gradient(135deg, ${ct.colors[0]}, ${ct.colors[1]})`,
                    }}
                    title={ct.label}
                  />
                ))}
              </div>

              {/* Dark mode */}
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors"
                aria-label="Toggle dark mode"
              >
                {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* CTA */}
              <Link
                href="/calculators"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))' }}
              >
                <Calculator className="w-4 h-4" />
                {language === 'mr' ? 'गणना करा' : 'Calculate'}
              </Link>

              {/* Mobile menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-surface-secondary transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-surface-border bg-surface animate-slide-up">
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {/* Mobile language toggle */}
              <div className="flex items-center justify-between px-3 py-2 mb-2">
                <span className="text-sm text-text-secondary font-medium">
                  {language === 'mr' ? 'भाषा' : 'Language'}
                </span>
                <button
                  onClick={() => setLanguage(language === 'en' ? 'mr' : 'en')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-surface-border text-sm font-semibold text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  <span>{language === 'en' ? '🇮🇳 मराठी' : '🇺🇸 English'}</span>
                </button>
              </div>

              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-text-primary font-medium hover:bg-surface-secondary transition-colors"
                  >
                    <item.icon className="w-5 h-5" style={{ color: 'var(--primary-500)' }} />
                    {item.label}
                  </Link>
                  {item.children.length > 0 && (
                    <div className="ml-11 space-y-1">
                      {item.children.slice(0, 4).map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-surface-border">
                <div className="flex items-center justify-between px-3">
                  <span className="text-sm text-text-secondary">
                    {language === 'mr' ? 'रंग थीम' : 'Color Theme'}
                  </span>
                  <div className="flex gap-2">
                    {COLOR_THEMES.map((ct) => (
                      <button
                        key={ct.id}
                        onClick={() => setColorTheme(ct.id as any)}
                        className={`w-6 h-6 rounded-full ${colorTheme === ct.id ? 'ring-2 ring-offset-1' : ''}`}
                        style={{ background: `linear-gradient(135deg, ${ct.colors[0]}, ${ct.colors[1]})` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-surface rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 p-4 border-b border-surface-border">
              <Search className="w-5 h-5 text-text-muted" />
              <input
                autoFocus
                type="text"
                placeholder={language === 'mr' ? 'FD, SIP, PPF शोधा...' : 'Search FD, SIP, PPF, compare FD vs SIP...'}
                className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setSearchOpen(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-xs text-text-muted mb-3">
                {language === 'mr' ? 'लोकप्रिय शोध' : 'Popular searches'}
              </p>
              <div className="flex flex-wrap gap-2">
                {['FD Calculator', 'SIP Calculator', 'PPF Calculator', 'FD vs SIP', 'NPS Calculator', 'Gold Calculator', 'SSY Calculator', 'EPF Calculator'].map((s) => (
                  <Link
                    key={s}
                    href={`/search?q=${encodeURIComponent(s)}`}
                    onClick={() => setSearchOpen(false)}
                    className="px-3 py-1.5 bg-surface-secondary text-text-secondary text-sm rounded-lg hover:bg-surface-tertiary transition-colors"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
