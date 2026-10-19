import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Генерируем JSON-LD разметку для BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://eyecard.ru${item.href}` }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Навигационные хлебные крошки"
        style={{
          padding: "16px 0",
          fontSize: "14px",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
        }}
      >
        <div className="container">
          <ol
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              listStyle: "none",
              margin: 0,
              padding: 0,
              alignItems: "center",
            }}
          >
            {items.map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {index > 0 && (
                  <span style={{ color: "var(--text-muted)" }}>/</span>
                )}
                {item.href && index < items.length - 1 ? (
                  <Link
                    href={item.href}
                    style={{
                      color: "var(--cobalt-primary)",
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span style={{ color: "var(--text-secondary)" }}>
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
