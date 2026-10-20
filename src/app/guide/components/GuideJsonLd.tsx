import JsonLd from "@/app/components/JsonLd";

// Article schema for guide [code] pages
export function ArticleJsonLd({
  title,
  description,
  url,
  author,
  publishedAt,
  updatedAt,
}: {
  title: string;
  description: string;
  url: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: url.startsWith('http') ? url : `https://eyecard.ru${url}`,
    author: {
      '@type': 'Organization',
      name: author || 'eyeCARD',
    },
    ...(publishedAt && { datePublished: publishedAt }),
    ...(updatedAt && { dateModified: updatedAt }),
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
