// ─────────────────────────────────────────────────────────────
// INDIA INVESTMENT PLATFORM — Complete Calculation Engine
// All formulas sourced from official government/regulatory docs
// For educational and informational purposes only
// ─────────────────────────────────────────────────────────────

export interface YearlyBreakdown {
  year: number;
  invested: number;
  interest: number;
  total: number;
  inflationAdjusted?: number;
}

export interface CalcResult {
  investedAmount: number;
  estimatedReturns: number;
  maturityValue: number;
  inflationAdjustedValue: number;
  effectiveAnnualReturn: number;
  yearlyBreakdown: YearlyBreakdown[];
  formula: string;
  assumptions: string[];
  source: string;
}

// ─── UTILITY ────────────────────────────────────────────────

export function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(2) }K`;
  return `₹${amount.toFixed(0)}`;
}

export function inflationAdjust(amount: number, inflationRate: number, years: number): number {
  return amount / Math.pow(1 + inflationRate / 100, years);
}

export function xirr(cashflows: { amount: number; date: Date }[]): number {
  // Newton-Raphson method for XIRR
  let rate = 0.1;
  for (let iter = 0; iter < 1000; iter++) {
    let f = 0, df = 0;
    const t0 = cashflows[0].date.getTime();
    for (const cf of cashflows) {
      const t = (cf.date.getTime() - t0) / (365 * 24 * 3600 * 1000);
      f += cf.amount / Math.pow(1 + rate, t);
      df -= t * cf.amount / Math.pow(1 + rate, t + 1);
    }
    const newRate = rate - f / df;
    if (Math.abs(newRate - rate) < 1e-7) return newRate * 100;
    rate = newRate;
  }
  return rate * 100;
}

// ─── FIXED DEPOSIT ──────────────────────────────────────────

export interface FDInput {
  principal: number;
  annualRate: number;         // % per annum
  tenureYears: number;
  compoundingFrequency: number; // 1=annual, 2=semi, 4=quarterly, 12=monthly
  inflationRate: number;
  isSeniorCitizen: boolean;
  seniorCitizenBonus: number; // extra % for senior citizens
}

export function calculateFD(input: FDInput): CalcResult {
  const rate = input.annualRate / 100 + (input.isSeniorCitizen ? input.seniorCitizenBonus / 100 : 0);
  const n = input.compoundingFrequency;
  const t = input.tenureYears;
  const P = input.principal;

  const maturityValue = P * Math.pow(1 + rate / n, n * t);
  const returns = maturityValue - P;
  const inflationAdjusted = inflationAdjust(maturityValue, input.inflationRate, t);

  const yearly: YearlyBreakdown[] = [];
  for (let y = 1; y <= t; y++) {
    const val = P * Math.pow(1 + rate / n, n * y);
    yearly.push({
      year: y,
      invested: P,
      interest: val - P,
      total: val,
      inflationAdjusted: inflationAdjust(val, input.inflationRate, y),
    });
  }

  return {
    investedAmount: P,
    estimatedReturns: returns,
    maturityValue,
    inflationAdjustedValue: inflationAdjusted,
    effectiveAnnualReturn: (Math.pow(maturityValue / P, 1 / t) - 1) * 100,
    yearlyBreakdown: yearly,
    formula: `A = P × (1 + r/n)^(n×t)\nP=₹${P.toLocaleString('en-IN')}, r=${(rate*100).toFixed(2)}%, n=${n}, t=${t}`,
    assumptions: [
      `Interest rate: ${(rate*100).toFixed(2)}% p.a.${input.isSeniorCitizen ? ` (includes senior citizen bonus of ${input.seniorCitizenBonus}%)` : ''}`,
      `Compounding: ${n === 4 ? 'Quarterly' : n === 12 ? 'Monthly' : n === 2 ? 'Semi-annually' : 'Annually'}`,
      `Inflation: ${input.inflationRate}% p.a. for real value calculation`,
      'No premature withdrawal. Rate fixed throughout tenure.',
      'Calculation for educational purposes only.',
    ],
    source: 'Formula: RBI guidelines on compound interest. Rates from individual bank schedules.',
  };
}

// ─── RECURRING DEPOSIT ───────────────────────────────────────

export interface RDInput {
  monthlyInstallment: number;
  annualRate: number;
  tenureMonths: number;
  inflationRate: number;
}

export function calculateRD(input: RDInput): CalcResult {
  const r = input.annualRate / 400; // quarterly rate
  const n = input.tenureMonths;
  const P = input.monthlyInstallment;
  const years = n / 12;

  // Each installment compounds for remaining tenure
  let maturity = 0;
  for (let m = 1; m <= n; m++) {
    const remainingMonths = n - m + 1;
    const quarters = remainingMonths / 3;
    maturity += P * Math.pow(1 + r, quarters);
  }

  const invested = P * n;
  const returns = maturity - invested;
  const inflationAdjusted = inflationAdjust(maturity, input.inflationRate, years);

  const yearly: YearlyBreakdown[] = [];
  for (let y = 1; y <= Math.ceil(years); y++) {
    const monthsCompleted = Math.min(y * 12, n);
    let val = 0;
    for (let m = 1; m <= monthsCompleted; m++) {
      const remaining = monthsCompleted - m + 1;
      val += P * Math.pow(1 + r, remaining / 3);
    }
    yearly.push({
      year: y,
      invested: P * monthsCompleted,
      interest: val - P * monthsCompleted,
      total: val,
      inflationAdjusted: inflationAdjust(val, input.inflationRate, y),
    });
  }

  return {
    investedAmount: invested,
    estimatedReturns: returns,
    maturityValue: maturity,
    inflationAdjustedValue: inflationAdjusted,
    effectiveAnnualReturn: input.annualRate,
    yearlyBreakdown: yearly,
    formula: `M = R × [(1+i)^n - 1] / (1 - (1+i)^(-1/3))\nR=₹${P}, i=r/400, n=${n} months`,
    assumptions: [
      `Monthly installment: ₹${P.toLocaleString('en-IN')}`,
      `Rate: ${input.annualRate}% p.a. (compounded quarterly)`,
      `Tenure: ${n} months`,
      `Inflation: ${input.inflationRate}% p.a.`,
    ],
    source: 'Formula: Standard RD calculation with quarterly compounding as per RBI guidelines.',
  };
}

// ─── PPF CALCULATOR ──────────────────────────────────────────

export interface PPFInput {
  yearlyDeposit: number;
  annualRate: number;   // Government declared (default 7.1)
  tenure: number;       // 15–50 years
  inflationRate: number;
  depositTiming: 'start' | 'end'; // start = 1st April, end = last working day
}

export function calculatePPF(input: PPFInput): CalcResult {
  const r = input.annualRate / 100;
  const P = input.yearlyDeposit;
  let corpus = 0;
  let totalInvested = 0;
  const yearly: YearlyBreakdown[] = [];

  for (let y = 1; y <= input.tenure; y++) {
    totalInvested += P;
    // For start-of-year deposit, interest is full year
    if (input.depositTiming === 'start') {
      corpus = (corpus + P) * (1 + r);
    } else {
      corpus = corpus * (1 + r) + P;
    }
    yearly.push({
      year: y,
      invested: totalInvested,
      interest: corpus - totalInvested,
      total: corpus,
      inflationAdjusted: inflationAdjust(corpus, input.inflationRate, y),
    });
  }

  return {
    investedAmount: totalInvested,
    estimatedReturns: corpus - totalInvested,
    maturityValue: corpus,
    inflationAdjustedValue: inflationAdjust(corpus, input.inflationRate, input.tenure),
    effectiveAnnualReturn: input.annualRate,
    yearlyBreakdown: yearly,
    formula: `F = P × [((1+r)^n – 1)/r] × (1+r)\nP=₹${P.toLocaleString('en-IN')}, r=${input.annualRate}%, n=${input.tenure} years`,
    assumptions: [
      `Annual deposit: ₹${P.toLocaleString('en-IN')} (same every year)`,
      `PPF rate: ${input.annualRate}% p.a. (government declared, may change quarterly)`,
      `Tenure: ${input.tenure} years`,
      'Interest credited annually on March 31.',
      `Deposit timing: ${input.depositTiming === 'start' ? '1st April (start of year — maximizes interest)' : 'End of financial year'}`,
      'Calculation assumes constant rate throughout. Actual rate may vary.',
    ],
    source: 'Source: Ministry of Finance (DEA). Rate: 7.1% p.a. effective April 1, 2023. https://dea.gov.in',
  };
}

// ─── SIP CALCULATOR ──────────────────────────────────────────

export interface SIPInput {
  monthlyAmount: number;
  annualReturn: number;   // Expected CAGR %
  tenureYears: number;
  inflationRate: number;
  stepUpPercent?: number; // Annual SIP increase %
}

export function calculateSIP(input: SIPInput): CalcResult {
  const r = input.annualReturn / 12 / 100;
  const n = input.tenureYears * 12;
  const P = input.monthlyAmount;
  const stepUp = (input.stepUpPercent || 0) / 100;

  let maturity = 0;
  let totalInvested = 0;
  const yearly: YearlyBreakdown[] = [];

  let currentSIP = P;
  for (let y = 1; y <= input.tenureYears; y++) {
    for (let m = 1; m <= 12; m++) {
      totalInvested += currentSIP;
      const monthsRemaining = (input.tenureYears - y) * 12 + (12 - m);
      maturity += currentSIP * Math.pow(1 + r, monthsRemaining + 1);
    }
    yearly.push({
      year: y,
      invested: totalInvested,
      interest: maturity - totalInvested,
      total: maturity,
      inflationAdjusted: inflationAdjust(maturity, input.inflationRate, y),
    });
    currentSIP = currentSIP * (1 + stepUp);
  }

  // Recalculate properly using standard formula if no step-up
  if (!input.stepUpPercent) {
    const standardMaturity = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return {
      investedAmount: P * n,
      estimatedReturns: standardMaturity - P * n,
      maturityValue: standardMaturity,
      inflationAdjustedValue: inflationAdjust(standardMaturity, input.inflationRate, input.tenureYears),
      effectiveAnnualReturn: input.annualReturn,
      yearlyBreakdown: yearly,
      formula: `M = P × [((1+r)^n – 1)/r] × (1+r)\nP=₹${P}/month, r=${input.annualReturn}%/12/100, n=${n} months`,
      assumptions: [
        `Monthly SIP: ₹${P.toLocaleString('en-IN')}`,
        `Expected return: ${input.annualReturn}% p.a. CAGR (assumed — not guaranteed)`,
        `Tenure: ${input.tenureYears} years`,
        `Inflation: ${input.inflationRate}% p.a.`,
        'Returns are market-linked and not guaranteed. Historical returns ≠ future returns.',
        'Calculation for educational/illustrative purposes only.',
      ],
      source: 'Source: AMFI India. Returns assumed based on historical equity fund performance. Not a guarantee.',
    };
  }

  return {
    investedAmount: totalInvested,
    estimatedReturns: maturity - totalInvested,
    maturityValue: maturity,
    inflationAdjustedValue: inflationAdjust(maturity, input.inflationRate, input.tenureYears),
    effectiveAnnualReturn: input.annualReturn,
    yearlyBreakdown: yearly,
    formula: `Step-Up SIP: Monthly amount increases by ${input.stepUpPercent}% each year`,
    assumptions: [
      `Starting monthly SIP: ₹${P.toLocaleString('en-IN')}`,
      `Annual step-up: ${input.stepUpPercent}%`,
      `Expected return: ${input.annualReturn}% p.a. CAGR (assumed)`,
      'Returns are market-linked and not guaranteed.',
    ],
    source: 'AMFI India — for illustrative purposes only.',
  };
}

// ─── SWP CALCULATOR ──────────────────────────────────────────

export interface SWPInput {
  initialCorpus: number;
  monthlyWithdrawal: number;
  annualReturn: number;
  tenureYears: number;
}

export function calculateSWP(input: SWPInput): CalcResult {
  const r = input.annualReturn / 12 / 100;
  let corpus = input.initialCorpus;
  let totalWithdrawn = 0;
  const yearly: YearlyBreakdown[] = [];

  for (let y = 1; y <= input.tenureYears; y++) {
    for (let m = 1; m <= 12; m++) {
      corpus = corpus * (1 + r) - input.monthlyWithdrawal;
      totalWithdrawn += input.monthlyWithdrawal;
      if (corpus < 0) { corpus = 0; break; }
    }
    yearly.push({
      year: y,
      invested: input.initialCorpus,
      interest: corpus + totalWithdrawn - input.initialCorpus,
      total: corpus,
    });
    if (corpus <= 0) break;
  }

  return {
    investedAmount: input.initialCorpus,
    estimatedReturns: totalWithdrawn,
    maturityValue: corpus,
    inflationAdjustedValue: corpus,
    effectiveAnnualReturn: input.annualReturn,
    yearlyBreakdown: yearly,
    formula: `Corpus(t) = Corpus(t-1) × (1 + r/12) - W\nW=₹${input.monthlyWithdrawal}/month`,
    assumptions: [
      `Initial corpus: ₹${input.initialCorpus.toLocaleString('en-IN')}`,
      `Monthly withdrawal: ₹${input.monthlyWithdrawal.toLocaleString('en-IN')}`,
      `Expected return: ${input.annualReturn}% p.a. (assumed — market-linked)`,
      'Withdrawal before growth is calculated each month.',
      'Returns not guaranteed. For illustrative purposes only.',
    ],
    source: 'AMFI India — SWP simulation for educational purposes only.',
  };
}

// ─── EPF CALCULATOR ──────────────────────────────────────────

export interface EPFInput {
  basicSalary: number;       // Basic + DA per month
  employeeContribPct: number; // Default 12%
  employerContribPct: number; // Default 3.67% to EPF (8.33% to EPS)
  annualRate: number;         // EPFO declared rate (default 8.25)
  tenureYears: number;
  annualSalaryGrowth: number; // Expected salary increment %
  inflationRate: number;
}

export function calculateEPF(input: EPFInput): CalcResult {
  let corpus = 0;
  let totalEmployee = 0;
  let totalEmployer = 0;
  let basicSalary = input.basicSalary;
  const r = input.annualRate / 100;
  const yearly: YearlyBreakdown[] = [];

  for (let y = 1; y <= input.tenureYears; y++) {
    const monthlyEmployee = basicSalary * input.employeeContribPct / 100;
    const monthlyEmployer = basicSalary * input.employerContribPct / 100;
    const annualContrib = (monthlyEmployee + monthlyEmployer) * 12;

    corpus = (corpus + annualContrib) * (1 + r);
    totalEmployee += monthlyEmployee * 12;
    totalEmployer += monthlyEmployer * 12;

    yearly.push({
      year: y,
      invested: totalEmployee + totalEmployer,
      interest: corpus - (totalEmployee + totalEmployer),
      total: corpus,
      inflationAdjusted: inflationAdjust(corpus, input.inflationRate, y),
    });

    basicSalary *= (1 + input.annualSalaryGrowth / 100);
  }

  const totalInvested = totalEmployee + totalEmployer;
  return {
    investedAmount: totalInvested,
    estimatedReturns: corpus - totalInvested,
    maturityValue: corpus,
    inflationAdjustedValue: inflationAdjust(corpus, input.inflationRate, input.tenureYears),
    effectiveAnnualReturn: input.annualRate,
    yearlyBreakdown: yearly,
    formula: `Annual Corpus = (Previous Corpus + Employee Contrib + Employer Contrib) × (1 + r)\nEmployee: ${input.employeeContribPct}% of basic, Employer EPF: ${input.employerContribPct}%`,
    assumptions: [
      `Starting basic salary: ₹${input.basicSalary.toLocaleString('en-IN')}/month`,
      `Employee contribution: ${input.employeeContribPct}% of basic+DA`,
      `Employer EPF contribution: ${input.employerContribPct}% of basic+DA (note: 8.33% goes to EPS, not EPF)`,
      `EPF interest rate: ${input.annualRate}% p.a. (EPFO declared — subject to change annually)`,
      `Salary growth: ${input.annualSalaryGrowth}% per annum (assumed)`,
      'Employer contribution includes only EPF portion (3.67%), not EPS (8.33%)',
    ],
    source: 'Source: EPFO. Rate: 8.25% p.a. for FY2023-24. https://www.epfindia.gov.in',
  };
}

// ─── NPS CALCULATOR ──────────────────────────────────────────

export interface NPSInput {
  monthlyContribution: number;
  currentAge: number;
  retirementAge: number;       // Default 60
  expectedReturn: number;      // Assumed CAGR %
  equityAllocation: number;    // % in equity (max 75 for active choice, 75 auto)
  annuityRate: number;         // Annual annuity % at retirement (assumed 6%)
  annuityPortion: number;      // % for annuity (min 40%)
  inflationRate: number;
}

export function calculateNPS(input: NPSInput): CalcResult {
  const years = input.retirementAge - input.currentAge;
  const r = input.expectedReturn / 12 / 100;
  const n = years * 12;
  const P = input.monthlyContribution;

  const corpus = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const lumpSum = corpus * (1 - input.annuityPortion / 100);
  const annuityCorpus = corpus * (input.annuityPortion / 100);
  const monthlyPension = (annuityCorpus * input.annuityRate / 100) / 12;

  const yearly: YearlyBreakdown[] = [];
  let runningCorpus = 0;
  let totalInvested = 0;
  for (let y = 1; y <= years; y++) {
    const monthsIn = y * 12;
    runningCorpus = P * ((Math.pow(1 + r, monthsIn) - 1) / r) * (1 + r);
    totalInvested = P * monthsIn;
    yearly.push({
      year: y,
      invested: totalInvested,
      interest: runningCorpus - totalInvested,
      total: runningCorpus,
      inflationAdjusted: inflationAdjust(runningCorpus, input.inflationRate, y),
    });
  }

  return {
    investedAmount: P * n,
    estimatedReturns: corpus - P * n,
    maturityValue: corpus,
    inflationAdjustedValue: inflationAdjust(corpus, input.inflationRate, years),
    effectiveAnnualReturn: input.expectedReturn,
    yearlyBreakdown: yearly,
    formula: `Corpus = P × [((1+r)^n – 1)/r] × (1+r)\nLump Sum (${100-input.annuityPortion}%): ₹${lumpSum.toFixed(0)}\nAnnuity Corpus (${input.annuityPortion}%): ₹${annuityCorpus.toFixed(0)}\nEstimated monthly pension: ₹${monthlyPension.toFixed(0)}`,
    assumptions: [
      `Monthly contribution: ₹${P.toLocaleString('en-IN')}`,
      `Investment duration: ${years} years (age ${input.currentAge} to ${input.retirementAge})`,
      `Expected return: ${input.expectedReturn}% p.a. CAGR (assumed — market-linked)`,
      `Equity allocation: ${input.equityAllocation}%`,
      `Annuity portion: ${input.annuityPortion}% (minimum 40% required by PFRDA)`,
      `Annuity rate assumed: ${input.annuityRate}% p.a. (actual depends on annuity provider)`,
      'Returns not guaranteed. For illustrative purposes only.',
    ],
    source: 'Source: PFRDA. https://www.pfrda.org.in. NPS Illustration for educational purposes only.',
  };
}

// ─── NSC CALCULATOR ──────────────────────────────────────────

export function calculateNSC(principal: number, rate: number = 7.7, inflationRate: number = 6): CalcResult {
  const r = rate / 100;
  const maturity = principal * Math.pow(1 + r, 5);
  const yearly: YearlyBreakdown[] = [];

  for (let y = 1; y <= 5; y++) {
    const val = principal * Math.pow(1 + r, y);
    yearly.push({
      year: y,
      invested: principal,
      interest: val - principal,
      total: val,
      inflationAdjusted: inflationAdjust(val, inflationRate, y),
    });
  }

  return {
    investedAmount: principal,
    estimatedReturns: maturity - principal,
    maturityValue: maturity,
    inflationAdjustedValue: inflationAdjust(maturity, inflationRate, 5),
    effectiveAnnualReturn: rate,
    yearlyBreakdown: yearly,
    formula: `A = P × (1 + r)^5\nP=₹${principal.toLocaleString('en-IN')}, r=${rate}%`,
    assumptions: [`NSC rate: ${rate}% p.a.`, 'Compounded annually.', '5-year fixed tenure.', `Inflation: ${inflationRate}%`],
    source: 'Source: India Post. Rate: 7.7% p.a. effective April 1, 2023. https://www.indiapost.gov.in',
  };
}

// ─── KVP CALCULATOR ──────────────────────────────────────────

export function calculateKVP(principal: number, rate: number = 7.5, inflationRate: number = 6): CalcResult {
  const doublingMonths = Math.ceil(Math.log(2) / Math.log(1 + rate / 100));
  const doublingYears = doublingMonths / 12;
  const yearly: YearlyBreakdown[] = [];

  for (let y = 1; y <= Math.ceil(doublingYears); y++) {
    const val = principal * Math.pow(1 + rate / 100, y);
    yearly.push({
      year: y,
      invested: principal,
      interest: val - principal,
      total: val,
      inflationAdjusted: inflationAdjust(val, inflationRate, y),
    });
  }

  return {
    investedAmount: principal,
    estimatedReturns: principal,
    maturityValue: principal * 2,
    inflationAdjustedValue: inflationAdjust(principal * 2, inflationRate, doublingYears),
    effectiveAnnualReturn: rate,
    yearlyBreakdown: yearly,
    formula: `Doubling Period = ln(2) / ln(1 + r)\nAt ${rate}%: doubles in ~${doublingMonths} months`,
    assumptions: [`KVP rate: ${rate}% p.a.`, `Investment doubles in ${doublingMonths} months (~${(doublingMonths/12).toFixed(1)} years)`, `Inflation: ${inflationRate}%`],
    source: 'Source: India Post. Rate: 7.5% p.a. effective April 1, 2023. https://www.indiapost.gov.in',
  };
}

// ─── SSY CALCULATOR ──────────────────────────────────────────

export interface SSYInput {
  yearlyDeposit: number;
  currentAge: number; // Girl's current age (max 10)
  rate: number;       // Default 8.2
  inflationRate: number;
}

export function calculateSSY(input: SSYInput): CalcResult {
  const depositYears = 15; // deposits for 15 years
  const maturityAge = 21;
  const r = input.rate / 100;
  let corpus = 0;
  let totalInvested = 0;
  const yearly: YearlyBreakdown[] = [];
  const totalYears = maturityAge - input.currentAge;

  for (let y = 1; y <= totalYears; y++) {
    if (y <= depositYears) {
      totalInvested += input.yearlyDeposit;
      corpus = (corpus + input.yearlyDeposit) * (1 + r);
    } else {
      corpus = corpus * (1 + r); // just compounding, no deposits
    }
    yearly.push({
      year: y,
      invested: totalInvested,
      interest: corpus - totalInvested,
      total: corpus,
      inflationAdjusted: inflationAdjust(corpus, input.inflationRate, y),
    });
  }

  return {
    investedAmount: totalInvested,
    estimatedReturns: corpus - totalInvested,
    maturityValue: corpus,
    inflationAdjustedValue: inflationAdjust(corpus, input.inflationRate, totalYears),
    effectiveAnnualReturn: input.rate,
    yearlyBreakdown: yearly,
    formula: `Deposits for 15 years, then compounds till girl turns 21\nRate: ${input.rate}% p.a.`,
    assumptions: [
      `Annual deposit: ₹${input.yearlyDeposit.toLocaleString('en-IN')}`,
      `SSY rate: ${input.rate}% p.a. (government declared — may change quarterly)`,
      `Girl's current age: ${input.currentAge}`,
      `Deposits made for ${depositYears} years, maturity at age 21`,
      'Rate assumed constant. Actual rate declared quarterly by Ministry of Finance.',
    ],
    source: 'Source: Ministry of Finance / India Post. Rate: 8.2% p.a. effective Jan 1, 2024. https://dea.gov.in',
  };
}

// ─── GOLD / SILVER CALCULATOR ────────────────────────────────

export interface GoldInput {
  investmentAmount: number;
  currentGoldPrice: number;   // per gram
  expectedAnnualReturn: number; // Historical ~10-12%
  tenureYears: number;
  inflationRate: number;
  storageChargePercent?: number; // for physical gold
  expenseRatio?: number;         // for Gold ETF
}

export function calculateGold(input: GoldInput): CalcResult {
  const grams = input.investmentAmount / input.currentGoldPrice;
  const r = input.expectedAnnualReturn / 100;
  const annualCost = (input.storageChargePercent || 0) / 100 + (input.expenseRatio || 0) / 100;
  const effectiveRate = r - annualCost;
  const maturity = input.investmentAmount * Math.pow(1 + effectiveRate, input.tenureYears);
  const yearly: YearlyBreakdown[] = [];

  for (let y = 1; y <= input.tenureYears; y++) {
    const val = input.investmentAmount * Math.pow(1 + effectiveRate, y);
    yearly.push({
      year: y,
      invested: input.investmentAmount,
      interest: val - input.investmentAmount,
      total: val,
      inflationAdjusted: inflationAdjust(val, input.inflationRate, y),
    });
  }

  return {
    investedAmount: input.investmentAmount,
    estimatedReturns: maturity - input.investmentAmount,
    maturityValue: maturity,
    inflationAdjustedValue: inflationAdjust(maturity, input.inflationRate, input.tenureYears),
    effectiveAnnualReturn: effectiveRate * 100,
    yearlyBreakdown: yearly,
    formula: `Future Value = Investment × (1 + effective_rate)^years\nGrams purchased: ${grams.toFixed(2)}g`,
    assumptions: [
      `Investment: ₹${input.investmentAmount.toLocaleString('en-IN')}`,
      `Current gold price: ₹${input.currentGoldPrice}/gram`,
      `Expected return: ${input.expectedAnnualReturn}% p.a. (historical average — not guaranteed)`,
      ...(input.storageChargePercent ? [`Storage charges: ${input.storageChargePercent}% p.a.`] : []),
      ...(input.expenseRatio ? [`ETF expense ratio: ${input.expenseRatio}% p.a.`] : []),
      'Gold returns are market-linked. Historical returns are not indicative of future performance.',
    ],
    source: 'Source: IBJA (India Bullion and Jewellers Association). Historical data for illustrative purposes only.',
  };
}

// ─── T-BILL CALCULATOR ───────────────────────────────────────

export function calculateTBill(faceValue: number, yieldPct: number, days: number): {
  purchasePrice: number; discount: number; returnPct: number; annualizedReturn: number;
} {
  const purchasePrice = faceValue / (1 + (yieldPct / 100) * (days / 365));
  const discount = faceValue - purchasePrice;
  const returnPct = (discount / purchasePrice) * 100;
  const annualizedReturn = returnPct * (365 / days);
  return { purchasePrice, discount, returnPct, annualizedReturn };
}

// ─── UNIVERSAL CALCULATOR ────────────────────────────────────

export interface UniversalInput {
  initialAmount: number;
  monthlyContribution: number;
  annualContribution: number;
  tenureYears: number;
  expectedReturn: number;
  inflationRate: number;
  taxRate: number;
}

export function calculateUniversal(input: UniversalInput): CalcResult & { taxAdjustedValue: number } {
  const r = input.expectedReturn / 12 / 100;
  let corpus = input.initialAmount;
  let totalInvested = input.initialAmount;
  const yearly: YearlyBreakdown[] = [];

  for (let y = 1; y <= input.tenureYears; y++) {
    corpus += input.annualContribution;
    totalInvested += input.annualContribution;
    for (let m = 1; m <= 12; m++) {
      corpus = corpus * (1 + r) + input.monthlyContribution;
      totalInvested += input.monthlyContribution;
    }
    yearly.push({
      year: y,
      invested: totalInvested,
      interest: corpus - totalInvested,
      total: corpus,
      inflationAdjusted: inflationAdjust(corpus, input.inflationRate, y),
    });
  }

  const gains = corpus - totalInvested;
  const taxOnGains = gains * (input.taxRate / 100);
  const taxAdjustedValue = corpus - taxOnGains;

  return {
    investedAmount: totalInvested,
    estimatedReturns: gains,
    maturityValue: corpus,
    inflationAdjustedValue: inflationAdjust(corpus, input.inflationRate, input.tenureYears),
    taxAdjustedValue,
    effectiveAnnualReturn: input.expectedReturn,
    yearlyBreakdown: yearly,
    formula: 'Compound growth with monthly contributions. Universal calculator with inflation & tax adjustment.',
    assumptions: [
      `Initial investment: ₹${input.initialAmount.toLocaleString('en-IN')}`,
      `Monthly contribution: ₹${input.monthlyContribution.toLocaleString('en-IN')}`,
      `Annual contribution: ₹${input.annualContribution.toLocaleString('en-IN')}`,
      `Expected return: ${input.expectedReturn}% p.a. (assumed — not guaranteed)`,
      `Inflation: ${input.inflationRate}% p.a.`,
      `Tax on gains: ${input.taxRate}%`,
      'For educational/illustrative purposes only.',
    ],
    source: 'Illustration only. Returns depend on investment type and market conditions.',
  };
}

// ─── GOAL PLANNER ────────────────────────────────────────────

export interface GoalInput {
  targetAmount: number;
  currentAge: number;
  goalAge: number;
  currentSavings: number;
  monthlySavings: number;
}

export interface GoalProjection {
  investmentId: string;
  name: string;
  projectedValue: number;
  monthlyNeeded: number;
  achievable: boolean;
  gap: number;
  returnRate: number;
}

const GOAL_RATES: Record<string, { id: string; name: string; rate: number }> = {
  fd:  { id: 'fd', name: 'Fixed Deposit (FD)', rate: 7.25 },
  ppf: { id: 'ppf', name: 'PPF', rate: 7.1 },
  nps: { id: 'nps', name: 'NPS (assumed)', rate: 10.0 },
  sip: { id: 'sip', name: 'Equity SIP (assumed)', rate: 12.0 },
  epf: { id: 'epf', name: 'EPF', rate: 8.25 },
  ssy: { id: 'ssy', name: 'SSY', rate: 8.2 },
  't-bills': { id: 't-bills', name: 'T-Bills', rate: 7.0 },
  rd:  { id: 'rd', name: 'Recurring Deposit', rate: 7.0 },
};

export function calculateGoalProjections(input: GoalInput): GoalProjection[] {
  const years = input.goalAge - input.currentAge;
  const results: GoalProjection[] = [];

  for (const key of Object.keys(GOAL_RATES)) {
    const inv = GOAL_RATES[key];
    const r = inv.rate / 12 / 100;
    const n = years * 12;
    const P = input.monthlySavings;

    // Future value of current savings
    const fvCurrentSavings = input.currentSavings * Math.pow(1 + inv.rate / 100, years);
    // Future value of monthly contributions (SIP formula)
    const fvMonthlySavings = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalProjected = fvCurrentSavings + fvMonthlySavings;

    // Monthly needed to reach target
    const remainingTarget = input.targetAmount - fvCurrentSavings;
    const monthlyNeeded = remainingTarget > 0
      ? remainingTarget / (((Math.pow(1 + r, n) - 1) / r) * (1 + r))
      : 0;

    results.push({
      investmentId: inv.id,
      name: inv.name,
      projectedValue: totalProjected,
      monthlyNeeded: Math.max(0, monthlyNeeded),
      achievable: totalProjected >= input.targetAmount,
      gap: input.targetAmount - totalProjected,
      returnRate: inv.rate,
    });
  }

  return results.sort((a, b) => b.projectedValue - a.projectedValue);
}

// ─── LUMPSUM CALCULATOR ──────────────────────────────────────

export function calculateLumpsum(
  principal: number, annualReturn: number, years: number, inflationRate: number
): CalcResult {
  const r = annualReturn / 100;
  const maturity = principal * Math.pow(1 + r, years);
  const yearly: YearlyBreakdown[] = [];
  for (let y = 1; y <= years; y++) {
    const val = principal * Math.pow(1 + r, y);
    yearly.push({ year: y, invested: principal, interest: val - principal, total: val, inflationAdjusted: inflationAdjust(val, inflationRate, y) });
  }
  return {
    investedAmount: principal,
    estimatedReturns: maturity - principal,
    maturityValue: maturity,
    inflationAdjustedValue: inflationAdjust(maturity, inflationRate, years),
    effectiveAnnualReturn: annualReturn,
    yearlyBreakdown: yearly,
    formula: `A = P × (1 + r)^n\nP=₹${principal.toLocaleString('en-IN')}, r=${annualReturn}%, n=${years}`,
    assumptions: [`Lump sum: ₹${principal.toLocaleString('en-IN')}`, `Return: ${annualReturn}% CAGR (assumed)`, `Tenure: ${years} years`, `Inflation: ${inflationRate}%`, 'Returns not guaranteed. For educational purposes only.'],
    source: 'Standard compound interest formula. AMFI India for mutual fund reference.',
  };
}

// ─── COMPARISON ENGINE ───────────────────────────────────────

export interface ComparisonScenario {
  investmentAmount: number;
  monthlyContribution: number;
  tenureYears: number;
  inflationRate: number;
}

export interface ComparisonResult {
  investmentId: string;
  name: string;
  returnRate: number;
  investedAmount: number;
  maturityValue: number;
  estimatedReturns: number;
  inflationAdjustedValue: number;
  riskLevel: string;
  liquidityLevel: string;
  taxTreatment: string;
  lockInPeriod: string;
  isGuaranteed: boolean;
}

export function compareInvestments(
  investmentIds: string[],
  scenario: ComparisonScenario,
  investmentsData: any[]
): ComparisonResult[] {
  return investmentIds.map(id => {
    const inv = investmentsData.find((i: any) => i.id === id);
    if (!inv) return null;

    const rate = inv.currentRate || 8;
    let maturity: number;
    let invested: number;

    if (scenario.monthlyContribution > 0) {
      const r = rate / 12 / 100;
      const n = scenario.tenureYears * 12;
      const P = scenario.monthlyContribution;
      maturity = scenario.investmentAmount * Math.pow(1 + rate / 100, scenario.tenureYears) +
        P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      invested = scenario.investmentAmount + P * n;
    } else {
      maturity = scenario.investmentAmount * Math.pow(1 + rate / 100, scenario.tenureYears);
      invested = scenario.investmentAmount;
    }

    return {
      investmentId: id,
      name: inv.name,
      returnRate: rate,
      investedAmount: invested,
      maturityValue: maturity,
      estimatedReturns: maturity - invested,
      inflationAdjustedValue: inflationAdjust(maturity, scenario.inflationRate, scenario.tenureYears),
      riskLevel: inv.riskLevel,
      liquidityLevel: inv.liquidityLevel,
      taxTreatment: inv.taxTreatment,
      lockInPeriod: inv.lockInPeriod,
      isGuaranteed: inv.returnsType === 'Guaranteed' || inv.returnsType === 'Government-Declared',
    } as ComparisonResult;
  }).filter(Boolean) as ComparisonResult[];
}
