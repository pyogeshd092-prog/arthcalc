'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Calculator, ArrowRight, TrendingUp, Shield, BookOpen, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ROTATING_WORDS_EN = ['FD', 'SIP', 'PPF', 'NPS', 'Gold', 'EPF', 'NSC', 'T-Bills'];
const ROTATING_WORDS_MR = ['मुदत ठेव', 'SIP', 'PPF', 'NPS', 'सोने', 'EPF', 'NSC', 'T-Bills'];

export function HeroSection() {
  const { language, t } = useLanguage();
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const ROTATING_WORDS = language === 'mr' ? ROTATING_WORDS_MR : ROTATING_WORDS_EN;

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, [ROTATING_WORDS.length]);

  const HERO_STATS = [
    { label: language === 'mr' ? 'गुंतवणूक पर्याय' : 'Investment Options', value: '40+', icon: TrendingUp },
    { label: language === 'mr' ? 'कॅल्क्युलेटर प्रकार' : 'Calculator Types', value: '25+', icon: Calculator },
    { label: language === 'mr' ? 'तुलना जोड्या' : 'Comparison Pairs', value: '500+', icon: Shield },
    { label: language === 'mr' ? 'अधिकृत स्रोत' : 'Official Sources', value: '8', icon: BookOpen },
  ];

  const QUICK_LINKS = [
    { label: 'FD Calculator', href: '/calculators/fd', emoji: '🏦' },
    { label: 'SIP Calculator', href: '/calculators/sip', emoji: '📈' },
    { label: 'PPF Calculator', href: '/calculators/ppf', emoji: '🏛️' },
    { label: 'NPS Calculator', href: '/calculators/nps', emoji: '🎯' },
    { label: 'FD vs SIP', href: '/compare/fd-vs-sip', emoji: '⚖️' },
    { label: language === 'mr' ? 'उद्दिष्ट नियोजक' : 'Goal Planner', href: '/goal-planner', emoji: '🎯' },
  ];

  return (
    <section className="relative overflow-hidden hero-gradient">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
             style={{ background: 'radial-gradient(circle, var(--accent-500), transparent)' }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
             style={{ background: 'radial-gradient(circle, var(--primary-400), transparent)' }} />
        <div className="absolute inset-0 opacity-5"
             style={{ backgroundImage: 'linear-gradient(var(--primary-400) 1px, transparent 1px), linear-gradient(90deg, var(--primary-400) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-5xl mx-auto">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/80 text-sm mb-8">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>
              {language === 'mr'
                ? 'RBI, EPFO, SEBI आणि India Post चे अधिकृत डेटा'
                : 'Official data from RBI, EPFO, SEBI & India Post'}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {language === 'mr' ? 'गुंतवणूक करण्यापूर्वी' : 'Understand Every'}{' '}
            <span
              className="inline-block transition-all duration-300"
              style={{
                color: 'var(--accent-400)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-8px)',
              }}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
            <br />
            {language === 'mr' ? 'समजून घ्या' : 'Before You Invest'}
          </h1>

          <p className="text-xl md:text-2xl text-primary-200 mb-4 font-medium">
            {language === 'mr' ? 'गणना करा. तुलना करा. शिका.' : 'Calculate. Compare. Learn.'}
          </p>
          <p className="text-primary-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.hero.description}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/calculators"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white shadow-glow-accent hover:opacity-90 active:scale-95 transition-all"
              style={{ background: 'linear-gradient(135deg, var(--accent-500), var(--accent-600))' }}
            >
              <Calculator className="w-5 h-5" />
              {t.hero.ctaCalculate}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/compare"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white border-2 border-white/30 hover:bg-white/10 active:scale-95 transition-all backdrop-blur-sm"
            >
              {language === 'mr' ? 'गुंतवणुकीची तुलना करा' : 'Compare Investments'}
            </Link>
            <Link
              href="/goal-planner"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white/80 hover:text-white transition-all"
            >
              <Target className="w-5 h-5" />
              {language === 'mr' ? 'उद्दिष्ट ठरवा' : 'Plan a Goal'}
            </Link>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
            <span className="text-primary-400 text-sm">
              {language === 'mr' ? 'द्रुत प्रवेश:' : 'Quick access:'}
            </span>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all backdrop-blur-sm border border-white/10"
              >
                <span>{link.emoji}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <stat.icon className="w-6 h-6 mb-2" style={{ color: 'var(--accent-400)' }} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-primary-300 text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M0 64L60 58.7C120 53.3 240 42.7 360 37.3C480 32 600 32 720 37.3C840 42.7 960 53.3 1080 58.7C1200 64 1320 64 1380 64H1440V64H1380C1320 64 1200 64 1080 64C960 64 840 64 720 64C600 64 480 64 360 64C240 64 120 64 60 64H0V64Z" fill="var(--surface)" />
        </svg>
      </div>
    </section>
  );
}
