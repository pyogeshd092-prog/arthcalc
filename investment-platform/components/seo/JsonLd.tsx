interface Props {
  type: 'WebSite' | 'FAQPage' | 'BreadcrumbList' | 'FinancialProduct';
  data: Record<string, any>;
}

export function JsonLd({ type, data }: Props) {
  const schema = { '@context': 'https://schema.org', '@type': type, ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export const WEBSITE_SCHEMA = {
  name: 'ArthCalc',
  url: 'https://arthcalc.wealth',
  description: "India's most comprehensive investment calculator and comparison platform. Calculate FD, SIP, PPF, NPS, EPF, Gold returns. Compare 500+ investment combinations. Educational tool only.",
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://arthcalc.wealth/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const FAQ_SCHEMA_HOME = {
  mainEntity: [
    { '@type': 'Question', name: 'Is ArthCalc free to use?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, all calculators, comparison tools, and the investment encyclopedia are completely free.' } },
    { '@type': 'Question', name: 'Does ArthCalc recommend investments?', acceptedAnswer: { '@type': 'Answer', text: 'No. ArthCalc is an educational platform only. It does not recommend, rank, or endorse any investment product.' } },
    { '@type': 'Question', name: 'Where does the data come from?', acceptedAnswer: { '@type': 'Answer', text: 'All rates and rules are sourced from official Indian government publications — RBI, EPFO, PFRDA, India Post, SEBI, AMFI, NSE, and BSE.' } },
    { '@type': 'Question', name: 'How many investment options does ArthCalc cover?', acceptedAnswer: { '@type': 'Answer', text: 'ArthCalc covers 40+ Indian investment options across 10 categories including bank deposits, post office schemes, government securities, mutual funds, ETFs, retirement funds, precious metals, and more.' } },
  ],
};

export function calcBreadcrumbs(items: { name: string; url: string }[]) {
  return {
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://arthcalc.wealth${item.url}`,
    })),
  };
}
