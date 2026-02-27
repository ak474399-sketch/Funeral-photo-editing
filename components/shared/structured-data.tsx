export function WebsiteStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Funeral Photo Editing",
    url: "https://funeralphotoediting.com",
    description:
      "Professional AI-powered memorial photo editing service. Create formal portraits, colorize vintage photos, and generate memorial posters with dignity.",
    applicationCategory: "PhotoEditingApplication",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        name: "Basic Plan",
        price: "0.99",
        priceCurrency: "USD",
        description: "1 formal B&W portrait + 1 memorial poster",
      },
      {
        "@type": "Offer",
        name: "Standard Plan",
        price: "9.99",
        priceCurrency: "USD",
        description: "Multiple portraits and posters with batch processing",
      },
      {
        "@type": "Offer",
        name: "Premium Plan",
        price: "39.99",
        priceCurrency: "USD",
        description: "All features including colorization, composites, and print-ready output",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "156",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqStructuredData({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BlogPostStructuredData({
  title,
  description,
  date,
  author,
  url,
}: {
  title: string;
  description: string;
  date: string;
  author?: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    author: {
      "@type": "Person",
      name: author ?? "Funeral Photo Editing Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Funeral Photo Editing",
      url: "https://funeralphotoediting.com",
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
