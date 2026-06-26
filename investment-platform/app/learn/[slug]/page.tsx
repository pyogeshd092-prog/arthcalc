import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, Clock, ArrowLeft, ExternalLink, AlertTriangle } from 'lucide-react';

interface Props { params: { slug: string } }

const ARTICLES: Record<string, {
  title: string;
  tag: string;
  readTime: string;
  emoji: string;
  content: string;
  relatedCalc?: { label: string; href: string };
  officialSource?: { label: string; href: string };
}> = {
  'compound-interest': {
    title: 'What is Compound Interest?',
    tag: 'Fundamentals',
    readTime: '5 min read',
    emoji: '📈',
    content: `
## What is Compound Interest?

Compound interest is interest calculated on both the **initial principal** and the **accumulated interest** from previous periods. Unlike simple interest (which is calculated only on the original principal), compound interest grows exponentially over time.

**Simple Interest Formula:** Interest = P × R × T

**Compound Interest Formula:** A = P × (1 + r/n)^(n×t)

Where:
- **A** = Final amount
- **P** = Principal (initial investment)
- **r** = Annual interest rate (decimal)
- **n** = Number of times interest compounds per year
- **t** = Time in years

## The Power of Compounding

If you invest ₹1,00,000 at 8% per annum for 20 years:
- **Simple interest** gives: ₹2,60,000 (₹1.6L interest)
- **Compound interest** gives: ₹4,66,096 (₹3.66L interest — 2.3x more!)

## Why Starting Early Matters

The longer money compounds, the more powerful it becomes. Starting at age 25 vs 35 for the same investment can mean 2-3x more wealth at retirement — purely due to extra compounding years.

**Example:** ₹5,000/month for 30 years at 12% = ₹1.75 crore
**Example:** ₹5,000/month for 20 years at 12% = ₹49.6 lakh

10 extra years nearly 3.5x your wealth.

## Compounding Frequency Matters

| Frequency | Times/year | ₹1L at 8% for 10 years |
|-----------|------------|------------------------|
| Annual    | 1          | ₹2,15,892 |
| Quarterly | 4          | ₹2,20,804 |
| Monthly   | 12         | ₹2,21,964 |
| Daily     | 365        | ₹2,22,535 |

## Key Rule of 72

Divide 72 by your annual return rate to find how many years it takes to double your money.
- At 6% → doubles in 12 years
- At 8% → doubles in 9 years
- At 12% → doubles in 6 years
    `,
    relatedCalc: { label: 'Try FD Calculator', href: '/calculators/fd' },
    officialSource: { label: 'RBI on Interest Rates', href: 'https://www.rbi.org.in' },
  },
  'inflation': {
    title: 'What is Inflation and Why Does It Matter for Investors?',
    tag: 'Fundamentals',
    readTime: '6 min read',
    emoji: '📉',
    content: `
## What is Inflation?

Inflation is the rate at which the general price level of goods and services rises over time — which means the **purchasing power of money decreases**. If inflation is 6%, something that costs ₹100 today will cost ₹106 next year.

India's average CPI (Consumer Price Index) inflation has been around **5-7% per annum** over the last decade.

## Why Inflation Matters for Investors

If your investments don't beat inflation, you are **losing wealth in real terms**, even if your nominal balance is growing.

**Example:**
- You invest ₹10 lakh in a savings account at 4% p.a.
- Inflation is 6% p.a.
- Your **real return = 4% - 6% = -2%** (you're losing purchasing power)

## Real Return = Nominal Return - Inflation

| Investment | Nominal Return | Inflation | Real Return |
|-----------|---------------|-----------|-------------|
| Savings Account | 3.5% | 6% | -2.5% |
| FD | 7% | 6% | +1% |
| PPF | 7.1% | 6% | +1.1% |
| Equity SIP (historical) | 12% | 6% | +6% |

## How Inflation Erodes Wealth

₹1 lakh today at 6% inflation will have the purchasing power of only:
- ₹74,726 in 5 years
- ₹55,839 in 10 years
- ₹31,180 in 20 years

## How to Beat Inflation

1. **Equity mutual funds (SIP)** — Historically 10-15% CAGR in India over long periods
2. **PPF** — 7.1% (just above inflation, but tax-free)
3. **Real estate** — Long-term appreciation typically beats inflation
4. **Gold** — Historically ~10-12% CAGR in INR over 20+ years
5. **Avoid:** Savings accounts (3.5%), cash under mattress (0%)
    `,
    relatedCalc: { label: 'Try Inflation Calculator', href: '/calculators/inflation' },
    officialSource: { label: 'RBI Inflation Data', href: 'https://www.rbi.org.in' },
  },
  'sip': {
    title: 'What is SIP? Complete Beginner Guide',
    tag: 'Mutual Funds',
    readTime: '8 min read',
    emoji: '🔄',
    content: `
## What is SIP?

SIP (Systematic Investment Plan) is a method of investing a **fixed amount regularly** (typically monthly) into a mutual fund. It's not a product — it's a way of investing in mutual funds.

## How SIP Works

1. You choose a mutual fund (e.g., Nifty 50 index fund)
2. You set up auto-debit of ₹5,000 every month
3. On a fixed date, ₹5,000 is auto-invested at that day's NAV (Net Asset Value)
4. You get units based on NAV that day
5. Over time, you accumulate units at various prices

## SIP Formula

**Maturity Value = P × [(1+r)^n - 1] / r × (1+r)**

Where:
- **P** = Monthly SIP amount
- **r** = Monthly rate (annual rate ÷ 12)
- **n** = Total months

## The Rupee Cost Averaging Advantage

When markets are up, your ₹5,000 buys fewer units. When markets are down, ₹5,000 buys more units. This averaging effect reduces the impact of market volatility.

| Month | NAV | Units Bought |
|-------|-----|-------------|
| Jan   | ₹100 | 50 units |
| Feb (crash) | ₹50 | 100 units |
| Mar   | ₹80 | 62.5 units |
| Total | — | 212.5 units at avg cost ₹70.6 |

## SIP Returns — Historical Reality

- **Large cap equity funds:** 10-12% CAGR over 10+ years
- **Mid/Small cap:** 13-18% CAGR over 10+ years (with higher volatility)
- **Debt funds:** 6-8% CAGR
- **ELSS:** 12-15% CAGR (with 80C benefit)

*Past performance does not guarantee future returns. Market-linked.*

## How to Start SIP

1. Complete KYC (one-time, free) on any AMC or platform
2. Choose a fund (index funds recommended for beginners)
3. Set up mandate for monthly auto-debit
4. Can start with as little as ₹100/month

## Step-Up SIP

Increase your SIP amount by 10% each year to accelerate wealth. ₹5,000/month for 20 years at 12% = ₹49.6L. With 10% annual step-up = ₹1.01 crore — double the wealth!
    `,
    relatedCalc: { label: 'Try SIP Calculator', href: '/calculators/sip' },
    officialSource: { label: 'AMFI — About Mutual Funds', href: 'https://www.amfiindia.com' },
  },
  'ppf': {
    title: 'What is PPF? Everything You Need to Know',
    tag: 'Government Schemes',
    readTime: '7 min read',
    emoji: '🏛️',
    content: `
## What is PPF?

PPF (Public Provident Fund) is a **government-backed, tax-free savings scheme** with a 15-year tenure. It offers guaranteed returns (currently **7.1% p.a.**) with the highest level of safety as deposits are backed by the Government of India.

## Key Features

| Feature | Details |
|---------|---------|
| Current Rate | 7.1% p.a. (compounded annually) |
| Tenure | 15 years (extendable in 5-year blocks) |
| Minimum Deposit | ₹500/year |
| Maximum Deposit | ₹1,50,000/year |
| Tax Treatment | EEE — fully tax-free |
| Risk | Zero (sovereign guarantee) |
| Who Can Invest | Any Indian resident (not NRIs) |

## Triple Tax Benefit (EEE)

PPF has the coveted **EEE (Exempt-Exempt-Exempt)** tax status:
1. **Investment deductible** under Section 80C (up to ₹1.5L)
2. **Interest earned** is fully tax-free
3. **Maturity amount** is fully tax-free

## PPF Returns Calculation

Interest is calculated on the **minimum balance between 5th and last day of each month**. This means — always invest before the 5th of the month!

## Partial Withdrawal

From Year 7, you can withdraw up to 50% of the balance at the end of Year 4 or Year 6 (whichever is lower). Only 1 withdrawal per year allowed.

## Loan Against PPF

From Year 3 to Year 6, you can take a loan of up to 25% of balance. Loan interest = PPF rate + 1%.

## Extension After 15 Years

After maturity, you can extend in 5-year blocks:
- **With contribution:** Continue depositing up to ₹1.5L/year, earning interest
- **Without contribution:** Balance keeps earning interest, free to withdraw anytime

## Who Should Invest in PPF?

✅ Conservative investors wanting guaranteed, tax-free returns
✅ Those in the 30% tax bracket (real post-tax return is excellent)
✅ Long-term goal (15+ years) like retirement or children's education
❌ Those needing liquidity (15-year lock-in)
❌ Those who can handle market risk (equity gives higher returns long-term)
    `,
    relatedCalc: { label: 'Try PPF Calculator', href: '/calculators/ppf' },
    officialSource: { label: 'India Post — PPF', href: 'https://www.indiapost.gov.in' },
  },
  'nps': {
    title: 'What is NPS? National Pension System Explained',
    tag: 'Retirement',
    readTime: '9 min read',
    emoji: '🎯',
    content: `
## What is NPS?

NPS (National Pension System) is a **voluntary, defined contribution retirement savings scheme** regulated by PFRDA (Pension Fund Regulatory and Development Authority). It allows you to build a retirement corpus and get a monthly pension.

## NPS Accounts: Tier 1 vs Tier 2

| Feature | Tier 1 | Tier 2 |
|---------|--------|--------|
| Purpose | Retirement savings | Voluntary savings |
| Lock-in | Until age 60 | No lock-in |
| Tax benefit | Yes (80C + 80CCD) | No |
| Min contribution | ₹500/year | ₹250 |
| Mandatory | For withdrawal | Optional |

## Tax Benefits of NPS

NPS offers **dual tax benefits**:
1. **Under 80C:** Up to ₹1.5 lakh (along with PPF, ELSS, etc.)
2. **Under 80CCD(1B):** Additional ₹50,000 exclusively for NPS

This means NPS gives up to **₹2 lakh in tax deductions** — the most of any single instrument.

For someone in the 30% tax bracket: ₹50,000 × 30% = ₹15,000 additional tax saving per year!

## Asset Allocation in NPS

You choose your own allocation across:
- **Equity (E):** Up to 75% in stocks (higher risk, higher potential returns)
- **Corporate Bonds (C):** Investment-grade bonds
- **Government Securities (G):** Safest, lowest returns

Or use **Auto Choice** — lifecycle-based allocation that reduces equity as you age.

## At Retirement (Age 60)

- Minimum **40% must be used to buy an annuity** (monthly pension)
- Up to **60% can be withdrawn as lump sum** (tax-free)
- If corpus < ₹5 lakh, you can withdraw 100%

## Historical NPS Returns (approximate)

- Equity (E) tier: 10-13% CAGR over 10 years
- Corporate bonds: 8-9% CAGR
- Government securities: 7-8% CAGR

*Market-linked. Past performance not guaranteed.*
    `,
    relatedCalc: { label: 'Try NPS Calculator', href: '/calculators/nps' },
    officialSource: { label: 'PFRDA — NPS Official', href: 'https://www.pfrda.org.in' },
  },
  'epf': {
    title: 'EPF Explained — Employee Provident Fund Guide',
    tag: 'Retirement',
    readTime: '7 min read',
    emoji: '💼',
    content: `
## What is EPF?

EPF (Employee Provident Fund) is a **mandatory retirement savings scheme** for salaried employees in India. Both you and your employer contribute every month. It is managed by EPFO (Employees' Provident Fund Organisation).

## How EPF Contributions Work

For salary up to ₹15,000/month (basic + DA):
| Contributor | Rate | Goes to |
|-------------|------|---------|
| Employee | 12% of Basic | EPF account |
| Employer | 3.67% of Basic | EPF account |
| Employer | 8.33% of Basic | EPS (pension) |

Current EPF interest rate: **8.25% p.a.** (declared annually by EPFO)

## Tax Treatment

- Contributions: Deductible under **Section 80C**
- Interest: Tax-free if employed for 5+ years
- Withdrawal: Tax-free after 5 years of continuous service

## UAN (Universal Account Number)

Your EPF account is linked to a UAN — a 12-digit number that remains the same across jobs. Always link your UAN when switching jobs so your PF balance transfers automatically.

## EPF Withdrawal Rules

| Situation | Withdrawal Allowed |
|-----------|-------------------|
| Unemployment (2+ months) | Full withdrawal |
| Retirement (age 58) | Full withdrawal |
| Medical emergency | Up to 6 months' wages |
| Home purchase | Up to 90% of EPF balance |
| Marriage/education | Up to 50% after 7 years |

## VPF (Voluntary Provident Fund)

You can contribute more than 12% (up to 100% of basic salary) voluntarily. VPF earns the same EPF interest rate (8.25%) with the same tax benefits — excellent for high earners wanting more 80C savings.
    `,
    relatedCalc: { label: 'Try EPF Calculator', href: '/calculators/epf' },
    officialSource: { label: 'EPFO Official', href: 'https://www.epfindia.gov.in' },
  },
  'fd-vs-sip': {
    title: 'FD vs SIP — Which is Better for You?',
    tag: 'Comparison',
    readTime: '8 min read',
    emoji: '⚖️',
    content: `
## FD vs SIP — The Complete Comparison

| Feature | Fixed Deposit (FD) | SIP (Equity MF) |
|---------|-------------------|-----------------|
| Returns | 6.5–8% p.a. (fixed) | 10–15% p.a. (market-linked) |
| Risk | Very Low | Medium to High |
| Guarantee | Yes (DICGC up to ₹5L) | No |
| Liquidity | Moderate (penalty for early exit) | High (T+3 days) |
| Tax on returns | As per income slab | LTCG 12.5% after 1 year |
| Min investment | ₹1,000 | ₹100/month |
| Inflation beating | Barely | Usually yes (long term) |
| Lock-in | Fixed tenure | None (except ELSS) |
| Best for | Short term, capital safety | Long term (5+ years) |

## When FD Wins

- You need the money in 1-3 years
- You cannot tolerate any loss of principal
- You're a senior citizen (extra 0.5% rate)
- Tax bracket is low (10-20%)

## When SIP Wins

- Goal is 5+ years away
- You can handle short-term market falls
- You're in the 30% tax bracket (LTCG at 12.5% is better)
- You want to beat inflation over the long term

## The Numbers Over 15 Years

₹5,000/month for 15 years:
- **FD at 7%:** ₹16.0 lakh invested → ₹24.4 lakh maturity
- **SIP at 12%:** ₹9.0 lakh invested → ₹25.0 lakh maturity

*SIP amounts to less invested total but higher returns due to compounding + market growth. SIP returns not guaranteed.*

## The Right Answer

**Both.** Use FD for your emergency fund and short-term goals. Use SIP for wealth creation over 7+ years. The best investors use both.
    `,
    relatedCalc: { label: 'Compare FD vs SIP', href: '/compare/fd-vs-sip' },
    officialSource: { label: 'SEBI — Mutual Funds', href: 'https://www.sebi.gov.in' },
  },
  'elss': {
    title: 'ELSS — Tax Saving Mutual Funds Explained',
    tag: 'Tax Saving',
    readTime: '6 min read',
    emoji: '💰',
    content: `
## What is ELSS?

ELSS (Equity Linked Savings Scheme) is a type of **mutual fund that invests primarily in equities** and qualifies for tax deduction under **Section 80C** up to ₹1.5 lakh per year.

## Key Features

| Feature | ELSS |
|---------|------|
| Tax deduction | Up to ₹1.5L under 80C |
| Lock-in | 3 years (shortest among 80C options) |
| Returns | Market-linked (~12-15% historical CAGR) |
| Risk | High (equity) |
| Min SIP | ₹500/month |
| Tax on gains | LTCG 12.5% above ₹1.25L/year |

## ELSS vs Other 80C Options

| Option | Returns | Lock-in | Risk |
|--------|---------|---------|------|
| ELSS | 12-15% (market) | 3 years | High |
| PPF | 7.1% (fixed) | 15 years | Nil |
| NSC | 7.7% (fixed) | 5 years | Nil |
| 5-yr FD | 6.5-7.5% | 5 years | Very Low |
| EPF | 8.25% (fixed) | Until retirement | Nil |

## Who Should Invest in ELSS?

✅ Investors with 3+ year horizon
✅ Those in 20-30% tax bracket
✅ Those who want 80C savings with potential for higher returns
✅ Already maxing out PPF and want equity exposure with tax benefit
❌ Those who need capital guarantee
❌ Those who need money within 3 years
    `,
    relatedCalc: { label: 'Try ELSS Calculator', href: '/calculators/elss' },
    officialSource: { label: 'SEBI — ELSS Regulations', href: 'https://www.sebi.gov.in' },
  },
  '80c-tax-saving': {
    title: 'Complete Guide to Section 80C Tax Saving',
    tag: 'Tax Saving',
    readTime: '10 min read',
    emoji: '🧾',
    content: `
## What is Section 80C?

Section 80C of the Income Tax Act allows Indian taxpayers (Old Tax Regime) to **deduct up to ₹1.5 lakh** from their taxable income by investing in specified instruments.

**Tax saved = ₹1.5L × your tax slab rate**
- 30% slab → save ₹46,800 in taxes
- 20% slab → save ₹31,200 in taxes
- 10% slab → save ₹15,600 in taxes

## All 80C-Eligible Investments

| Investment | Returns | Lock-in | Risk |
|-----------|---------|---------|------|
| EPF | 8.25% | Until retirement | None |
| PPF | 7.1% | 15 years | None |
| ELSS MF | 12-15%* | 3 years | High |
| NSC | 7.7% | 5 years | None |
| 5-yr Tax Saver FD | 6.5-8% | 5 years | None |
| SSY | 8.2% | 21 years (girl) | None |
| NPS | Market-linked | Until 60 | Medium |
| ULIP | Varies | 5 years | Varies |
| Life Insurance | Varies | Varies | None |
| Home Loan Principal | — | — | — |
| Tuition Fees | — | — | — |

*Market-linked, not guaranteed

## Additional Deductions Beyond 80C

| Section | What | Limit |
|---------|------|-------|
| 80CCD(1B) | NPS extra | ₹50,000 |
| 80D | Health insurance | ₹25,000 (₹50,000 for seniors) |
| 80E | Education loan interest | No limit |
| 24(b) | Home loan interest | ₹2,00,000 |

## Optimal 80C Strategy

**For most salaried investors:**
1. **EPF** (auto-deducted) → counts toward 80C
2. **ELSS SIP** → fill remaining 80C limit with highest returns
3. **NPS 80CCD(1B)** → extra ₹50,000 deduction

This combination maximizes tax savings while giving equity exposure for wealth creation.

## Important: Old vs New Regime

Section 80C deductions are available **only under the Old Tax Regime**. The New Tax Regime (default from FY2024-25) has lower rates but no 80C deductions. Calculate both to see which is better for your income level.
    `,
    relatedCalc: { label: 'Go to Tax Saving Center', href: '/tax-saver' },
    officialSource: { label: 'Income Tax India', href: 'https://www.incometax.gov.in' },
  },
  'gold-investment': {
    title: 'How to Invest in Gold in India — All 6 Ways',
    tag: 'Gold',
    readTime: '9 min read',
    emoji: '🥇',
    content: `
## Gold Investment Options in India

Historical gold returns in INR: approximately **10-12% CAGR** over 20+ years (not guaranteed).

## 6 Ways to Invest in Gold

### 1. Physical Gold (Jewellery, Coins, Bars)
- **Pros:** Tangible, culturally accepted
- **Cons:** Making charges (10-30% for jewellery), storage risk, purity uncertainty, GST 3%
- **Tax:** LTCG 12.5% after 2 years; STCG as per slab

### 2. Gold ETF
- **Pros:** No storage, no GST, tracks pure gold price, high liquidity
- **Cons:** Expense ratio (0.5-1%), demat account needed
- **Tax:** LTCG 12.5% after 2 years
- **Examples:** Nippon Gold ETF, SBI Gold ETF, HDFC Gold ETF

### 3. Sovereign Gold Bond (SGB)
- **Pros:** Extra 2.5% p.a. interest, zero capital gains if held to maturity (8 years), backed by RBI
- **Cons:** 8-year tenure (5-year early exit possible), no physical delivery
- **Tax:** Interest taxable; capital gain at maturity = ZERO (best option!)

### 4. Gold Mutual Fund (Fund of Funds)
- **Pros:** No demat needed, SIP possible, invests in Gold ETFs
- **Cons:** Higher expense ratio (1-1.5%), slightly lower returns than direct ETF
- **Tax:** Same as Gold ETF

### 5. Digital Gold
- **Pros:** Buy small amounts (₹1), instant, 24-karat pure
- **Cons:** No regulatory framework yet, 3% GST, storage charges
- **Platforms:** PhonePe, Paytm, Google Pay

### 6. Gold Futures
- **Pros:** Leverage, lowest transaction cost
- **Cons:** Complex, high risk, needs expertise
- **For:** Advanced investors only

## Which Gold Investment is Best?

| Priority | Recommendation |
|----------|---------------|
| Best returns | SGB (extra 2.5% + zero LTCG) |
| Most liquid | Gold ETF |
| No demat | Gold MF |
| Small amounts | Digital Gold |
| Avoid for investment | Jewellery |
    `,
    relatedCalc: { label: 'Try Gold Calculator', href: '/calculators/gold' },
    officialSource: { label: 'RBI — Sovereign Gold Bond', href: 'https://www.rbi.org.in' },
  },
  'fd': {
    title: 'Fixed Deposit Guide — Everything About FD',
    tag: 'Bank Deposits',
    readTime: '6 min read',
    emoji: '🏦',
    content: `
## What is a Fixed Deposit?

A Fixed Deposit (FD) is a **financial instrument offered by banks and NBFCs** where you deposit a lump sum for a fixed period at a pre-agreed interest rate. The bank guarantees both your principal and interest.

## FD Interest Formula

**For simple annual payout:** Interest = P × R × T

**For compound maturity value:** A = P × (1 + r/n)^(n×t)

Most bank FDs compound **quarterly** in India.

## Current FD Rates (Indicative, 2024-25)

| Duration | SBI | HDFC | Post Office |
|----------|-----|------|------------|
| 1 year   | 6.8% | 7.0% | 6.9% |
| 2 years  | 7.0% | 7.0% | 7.0% |
| 3 years  | 6.75% | 7.0% | 7.1% |
| 5 years  | 6.5% | 7.0% | 7.5% |

*Always check official bank websites for current rates.*

## Types of FD

| Type | Feature |
|------|---------|
| Regular FD | Standard bank FD |
| Tax Saver FD | 5-year FD, 80C deduction, no premature exit |
| Senior Citizen FD | Extra 0.25-0.5% interest |
| Flexi FD | Linked to savings account |
| Corporate FD | Higher rates, more risk |

## Tax on FD Interest

FD interest is added to your income and taxed as per your slab:
- 10% slab: Pay 10% tax on interest
- 30% slab: Pay 30% tax on interest

**TDS:** If FD interest exceeds ₹40,000/year (₹50,000 for seniors), bank deducts 10% TDS. Submit Form 15G/15H to avoid TDS if income is below taxable limit.

## DICGC Insurance

Bank FDs are insured up to **₹5 lakh per bank per depositor** by DICGC (Deposit Insurance and Credit Guarantee Corporation) — a subsidiary of RBI.

## Premature Withdrawal

Most FDs allow premature withdrawal with a penalty of 0.5-1% less than the contracted rate. Tax Saver FDs cannot be withdrawn before 5 years.
    `,
    relatedCalc: { label: 'Try FD Calculator', href: '/calculators/fd' },
    officialSource: { label: 'RBI — Bank Deposits', href: 'https://www.rbi.org.in' },
  },
  'ssy': {
    title: 'Sukanya Samriddhi Yojana — Complete Guide',
    tag: 'Government Schemes',
    readTime: '7 min read',
    emoji: '👧',
    content: `
## What is Sukanya Samriddhi Yojana (SSY)?

SSY is a **government savings scheme specifically for the girl child**, launched under Beti Bachao, Beti Padhao. It offers one of the **highest guaranteed rates (8.2% p.a.)** among small savings schemes with triple tax-free (EEE) status.

## Key Features

| Feature | Details |
|---------|---------|
| Current Rate | 8.2% p.a. (compounded annually) |
| Who can open | Parent/guardian of girl child |
| Girl's age | Below 10 years at account opening |
| Min deposit | ₹250/year |
| Max deposit | ₹1,50,000/year |
| Deposit period | 15 years from account opening |
| Maturity | When girl turns 21 |
| Tax | EEE — fully tax-free |

## SSY Timeline

- **Year 0:** Account opened (girl under 10)
- **Years 1-15:** Deposits made (max ₹1.5L/year)
- **Years 16-21:** No deposits, but interest continues
- **Year 21:** Account matures, girl can withdraw entire amount

## Partial Withdrawal

After the girl turns **18**, up to **50% of balance** can be withdrawn for education/marriage. Full withdrawal allowed at maturity (age 21) or for marriage after 18.

## Tax Benefits

- Deposits: Deductible under **Section 80C** (up to ₹1.5L)
- Interest: **100% tax-free**
- Maturity: **100% tax-free** (EEE)

## SSY vs PPF

| Feature | SSY | PPF |
|---------|-----|-----|
| Rate | 8.2% | 7.1% |
| Who | Girl child only | Anyone |
| Max deposit | ₹1.5L/year | ₹1.5L/year |
| Maturity | 21 years (girl's age) | 15 years |
| Lock-in | Longer | 15 years |

**SSY gives 1.1% more return than PPF — better choice if you have a daughter under 10.**
    `,
    relatedCalc: { label: 'Try SSY Calculator', href: '/calculators/ssy' },
    officialSource: { label: 'India Post — SSY', href: 'https://www.indiapost.gov.in' },
  },
};

export async function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = ARTICLES[params.slug];
  if (!article) return { title: 'Article | ArthCalc' };
  return {
    title: `${article.title} | ArthCalc`,
    description: `Learn about ${article.title.toLowerCase()} — a free educational guide for Indian investors from ArthCalc.`,
    alternates: { canonical: `/learn/${params.slug}` },
  };
}

export default function LearnArticlePage({ params }: Props) {
  const article = ARTICLES[params.slug];
  if (!article) notFound();

  // Convert markdown-like content to HTML-ready sections
  const paragraphs = article.content.trim().split('\n\n');

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Hero */}
      <div className="hero-gradient py-14">
        <div className="max-w-3xl mx-auto px-4">
          <nav className="text-sm text-primary-300 mb-4">
            <Link href="/learn" className="hover:text-white">Learning Hub</Link>
            <span className="mx-2">›</span>
            <span className="text-white">{article.tag}</span>
          </nav>
          <div className="text-4xl mb-4">{article.emoji}</div>
          <h1 className="text-3xl font-bold text-white mb-3">{article.title}</h1>
          <div className="flex items-center gap-3 text-primary-300 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
            <span>·</span>
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-xs">{article.tag}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Disclaimer */}
        <div className="card p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 mb-8 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            Educational content only. Not investment advice. Consult a SEBI-registered financial advisor before investing.
          </p>
        </div>

        {/* Article content */}
        <div className="card p-8 prose-custom">
          {paragraphs.map((para, i) => {
            if (para.startsWith('## ')) {
              return <h2 key={i} className="text-xl font-bold text-text-primary mt-8 mb-4 first:mt-0">{para.replace('## ', '')}</h2>;
            }
            if (para.startsWith('### ')) {
              return <h3 key={i} className="text-lg font-bold text-text-primary mt-6 mb-3">{para.replace('### ', '')}</h3>;
            }
            if (para.startsWith('| ')) {
              // Table
              const rows = para.split('\n').filter(r => r.trim() && !r.match(/^\|[-| ]+\|$/));
              return (
                <div key={i} className="overflow-x-auto my-4">
                  <table className="w-full text-sm border-collapse">
                    {rows.map((row, ri) => {
                      const cells = row.split('|').filter(c => c.trim());
                      const isHeader = ri === 0;
                      return (
                        <tr key={ri} className={ri % 2 === 0 ? 'bg-surface-secondary' : ''}>
                          {cells.map((cell, ci) => isHeader ? (
                            <th key={ci} className="px-3 py-2 text-left text-text-primary font-semibold border border-surface-border">{cell.trim()}</th>
                          ) : (
                            <td key={ci} className="px-3 py-2 text-text-secondary border border-surface-border">{cell.trim()}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </table>
                </div>
              );
            }
            if (para.startsWith('- ') || para.startsWith('✅') || para.startsWith('❌') || para.startsWith('*')) {
              const items = para.split('\n').filter(l => l.trim());
              return (
                <ul key={i} className="space-y-2 my-4">
                  {items.map((item, ii) => (
                    <li key={ii} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-0.5">{item.startsWith('- ') ? '•' : ''}</span>
                      <span dangerouslySetInnerHTML={{ __html: item.replace(/^[-✅❌]\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-text-secondary leading-relaxed my-4 text-sm"
                 dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary">$1</strong>') }} />
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {article.relatedCalc && (
            <Link href={article.relatedCalc.href}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))' }}>
              <BookOpen className="w-4 h-4" />
              {article.relatedCalc.label}
            </Link>
          )}
          {article.officialSource && (
            <a href={article.officialSource.href} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border border-surface-border text-text-secondary hover:bg-surface-tertiary transition-all">
              <ExternalLink className="w-4 h-4" />
              {article.officialSource.label}
            </a>
          )}
        </div>

        <div className="mt-8">
          <Link href="/learn" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Learning Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
