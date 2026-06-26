import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FDCalculatorPage } from '@/components/calculators/FDCalculatorPage';
import { SIPCalculatorPage } from '@/components/calculators/SIPCalculatorPage';
import { PPFCalculatorPage } from '@/components/calculators/PPFCalculatorPage';
import { EPFCalculatorPage } from '@/components/calculators/EPFCalculatorPage';
import { NPSCalculatorPage } from '@/components/calculators/NPSCalculatorPage';
import { RDCalculatorPage } from '@/components/calculators/RDCalculatorPage';
import { NSCCalculatorPage } from '@/components/calculators/NSCCalculatorPage';
import { SSYCalculatorPage } from '@/components/calculators/SSYCalculatorPage';
import { GoldCalculatorPage } from '@/components/calculators/GoldCalculatorPage';
import { TBillCalculatorPage } from '@/components/calculators/TBillCalculatorPage';
import { ELSSCalculatorPage } from '@/components/calculators/ELSSCalculatorPage';
import { SWPCalculatorPage } from '@/components/calculators/SWPCalculatorPage';
import { LumpsumCalculatorPage } from '@/components/calculators/LumpsumCalculatorPage';
import { KVPCalculatorPage } from '@/components/calculators/KVPCalculatorPage';
import { GenericCalculatorPage } from '@/components/calculators/GenericCalculatorPage';

interface PageProps {
  params: { type: string };
}

const CALCULATOR_META: Record<string, { title: string; description: string }> = {
  fd: {
    title: 'FD Calculator — Fixed Deposit Maturity & Interest Calculator India',
    description: 'Calculate Fixed Deposit (FD) maturity amount, total interest, and inflation-adjusted value. Compare FD rates from SBI, HDFC, ICICI, Axis, Post Office. Official formula. Educational only.',
  },
  sip: {
    title: 'SIP Calculator — Systematic Investment Plan Returns Calculator India',
    description: 'Calculate SIP (Systematic Investment Plan) returns, maturity value, and wealth creation potential. Step-up SIP, with year-wise breakdown and chart. Educational only.',
  },
  ppf: {
    title: 'PPF Calculator — Public Provident Fund Maturity Calculator India (7.1%)',
    description: 'Calculate PPF maturity value for 15-year tenure at current rate of 7.1% p.a. Triple tax benefit (EEE). Year-wise growth table. Official Ministry of Finance rate. Educational only.',
  },
  epf: {
    title: 'EPF Calculator — Employee Provident Fund Retirement Corpus Calculator',
    description: 'Calculate EPF corpus at retirement. Current EPFO rate 8.25% p.a. Employee (12%) and employer (3.67% EPF) contributions with salary growth. Educational only.',
  },
  nps: {
    title: 'NPS Calculator — National Pension System Corpus & Monthly Pension Calculator',
    description: 'Calculate NPS corpus, estimated monthly pension, and additional ₹50,000 tax benefit under 80CCD(1B). PFRDA regulated. Market-linked. Educational only.',
  },
  rd: {
    title: 'RD Calculator — Recurring Deposit Maturity Calculator India',
    description: 'Calculate Recurring Deposit maturity amount. Monthly installment savings with quarterly compounding. Year-wise breakdown. Educational tool only.',
  },
  nsc: {
    title: 'NSC Calculator — National Savings Certificate Maturity Calculator (7.7%)',
    description: 'Calculate NSC maturity for 5-year investment at 7.7% p.a. Section 80C tax benefit. India Post official rate. Educational only.',
  },
  ssy: {
    title: 'SSY Calculator — Sukanya Samriddhi Yojana Calculator India (8.2%)',
    description: 'Calculate SSY maturity for your daughter. Highest small savings rate at 8.2% p.a. EEE triple tax benefit. Deposits for 15 years, matures at girl\'s age 21. Educational only.',
  },
  gold: {
    title: 'Gold Calculator India — Physical Gold, Gold ETF & SGB Returns Calculator',
    description: 'Calculate gold investment returns — physical gold, Gold ETF, Sovereign Gold Bond. Historical ~10-12% CAGR in INR. LTCG tax implications. Educational only.',
  },
  'gold-etf': {
    title: 'Gold ETF Calculator India — Electronic Gold Investment Returns Calculator',
    description: 'Calculate Gold ETF returns. Tracks 99.5% pure gold price. No storage cost, no GST. Expense ratio 0.5-1%. LTCG tax after 2 years. Educational only.',
  },
  't-bills': {
    title: 'T-Bill Calculator India — Treasury Bill Returns (91, 182, 364 Days)',
    description: 'Calculate Treasury Bill returns for 91-day, 182-day, and 364-day tenures. Zero default risk. Buy via RBI Retail Direct. Discount pricing explained. Educational only.',
  },
  elss: {
    title: 'ELSS Calculator — Equity Linked Savings Scheme Returns & 80C Tax Calculator',
    description: 'Calculate ELSS mutual fund returns with 3-year lock-in and Section 80C tax deduction up to ₹1.5L. Market-linked. LTCG at 12.5%. Educational only.',
  },
  swp: {
    title: 'SWP Calculator — Systematic Withdrawal Plan Calculator India',
    description: 'Calculate how long your corpus will last with monthly withdrawals. Systematic Withdrawal Plan simulation with growth and depletion chart. Educational only.',
  },
  lumpsum: {
    title: 'Lumpsum Mutual Fund Calculator India — One-Time Investment Returns',
    description: 'Calculate one-time lumpsum mutual fund investment returns. Compare with SIP. Year-wise growth chart. CAGR simulation. Educational only.',
  },
  kvp: {
    title: 'KVP Calculator — Kisan Vikas Patra Doubling Period Calculator (7.5%)',
    description: 'Calculate when Kisan Vikas Patra doubles your money. Current rate 7.5% p.a. — doubles in 115 months. India Post scheme. Educational only.',
  },
  'step-up-sip': {
    title: 'Step-Up SIP Calculator India — Annual Increase SIP Returns Calculator',
    description: 'Calculate Step-Up SIP (increasing SIP) returns where you increase monthly SIP amount annually. More realistic wealth creation projections. Educational only.',
  },
  inflation: {
    title: 'Inflation Calculator India — Future Value & Purchasing Power Calculator',
    description: 'Calculate how inflation erodes purchasing power. What will ₹1 lakh be worth in 20 years? Future cost of goals adjusted for Indian inflation rate. Educational only.',
  },
};

const CALCULATOR_COMPONENTS: Record<string, React.ComponentType> = {
  fd: FDCalculatorPage,
  sip: SIPCalculatorPage,
  ppf: PPFCalculatorPage,
  epf: EPFCalculatorPage,
  nps: NPSCalculatorPage,
  rd: RDCalculatorPage,
  nsc: NSCCalculatorPage,
  ssy: SSYCalculatorPage,
  gold: GoldCalculatorPage,
  'gold-etf': GoldCalculatorPage,
  't-bills': TBillCalculatorPage,
  elss: ELSSCalculatorPage,
  swp: SWPCalculatorPage,
  lumpsum: LumpsumCalculatorPage,
  kvp: KVPCalculatorPage,
  'step-up-sip': SIPCalculatorPage,
  inflation: GenericCalculatorPage,
  mis: GenericCalculatorPage,
  scss: GenericCalculatorPage,
  'po-rd': RDCalculatorPage,
  'po-time-deposit': FDCalculatorPage,
  'g-sec': TBillCalculatorPage,
  sdl: TBillCalculatorPage,
  sgb: GoldCalculatorPage,
  'floating-rate-bonds': TBillCalculatorPage,
  vpf: EPFCalculatorPage,
  apy: NPSCalculatorPage,
  'equity-mf': LumpsumCalculatorPage,
  'debt-mf': LumpsumCalculatorPage,
  'hybrid-mf': LumpsumCalculatorPage,
  'index-fund': LumpsumCalculatorPage,
  'liquid-fund': LumpsumCalculatorPage,
  'international-fund': LumpsumCalculatorPage,
  stp: SIPCalculatorPage,
  'equity-etf': LumpsumCalculatorPage,
  'silver-etf': GoldCalculatorPage,
  'bond-etf': LumpsumCalculatorPage,
  'physical-gold': GoldCalculatorPage,
  'physical-silver': GoldCalculatorPage,
  'digital-gold': GoldCalculatorPage,
  stocks: LumpsumCalculatorPage,
  ipo: LumpsumCalculatorPage,
  reit: LumpsumCalculatorPage,
  invit: LumpsumCalculatorPage,
  ulip: LumpsumCalculatorPage,
  endowment: FDCalculatorPage,
  'money-back': FDCalculatorPage,
};

export async function generateStaticParams() {
  return Object.keys(CALCULATOR_COMPONENTS).map((type) => ({ type }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const meta = CALCULATOR_META[params.type];
  if (!meta) return { title: 'Calculator | ArthCalc' };
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/calculators/${params.type}` },
    openGraph: { title: meta.title, description: meta.description },
  };
}

export default function CalculatorPage({ params }: PageProps) {
  const Component = CALCULATOR_COMPONENTS[params.type];
  if (!Component) notFound();
  return <Component />;
}
