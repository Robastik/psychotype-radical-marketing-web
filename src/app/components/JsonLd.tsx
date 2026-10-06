interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization schema for root layout
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'eyeCARD',
    alternateName: 'eyeCARD — ИИ-анализ карточек товаров',
    url: 'https://eyecard.ru',
    logo: 'https://eyecard.ru/favicon.png',
    description: 'ИИ-аналитика карточек товаров для продавцов маркетплейсов Wildberries и Ozon. Анализ дизайна, психологии покупателей и рекомендации по повышению CTR.',
    sameAs: [
      'https://chromewebstore.google.com/detail/eyecard/fdmglgodmnjklcbkdjmnlbphccjcppdp',
    ],
  };

  return <JsonLd data={data} />;
}

// BreadcrumbList schema for guide pages
export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://eyecard.ru${item.url}`,
    })),
  };

  return <JsonLd data={data} />;
}

// Article schema for guide [code] pages
export function ArticleJsonLd({ title, description, url }: { title: string; description: string; url: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: url.startsWith('http') ? url : `https://eyecard.ru${url}`,
    publisher: {
      '@type': 'Organization',
      name: 'eyeCARD',
      logo: {
        '@type': 'ImageObject',
        url: 'https://eyecard.ru/favicon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `https://eyecard.ru${url}`,
    },
  };

  return <JsonLd data={data} />;
}

// SoftwareApplication schema for home page
export function SoftwareApplicationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'eyeCARD',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Chrome (Browser Extension)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'RUB',
      description: 'Бесплатная установка из Chrome Web Store',
    },
    description: 'ИИ-анализ карточек товаров Wildberries и Ozon. Повышение CTR через научный анализ дизайна и психологии покупателей.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '120',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return <JsonLd data={data} />;
}
