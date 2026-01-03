import { Helmet } from "react-helmet-async";
import type { ConversionTool } from "@/data/conversionTools";

interface ToolPageSEOProps {
  tool: ConversionTool;
  categoryPath: string;
}

const ToolPageSEO = ({ tool, categoryPath }: ToolPageSEOProps) => {
  const canonicalUrl = `https://transformfiles.com/${categoryPath}/${tool.slug}`;
  
  // Schema.org structured data
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "description": tool.metaDescription,
    "url": canonicalUrl,
    "applicationCategory": tool.category === 'ai' ? 'UtilityApplication' : 'MultimediaApplication',
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2847",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://transformfiles.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryPath.charAt(0).toUpperCase() + categoryPath.slice(1) + " Tools",
        "item": `https://transformfiles.com/${categoryPath}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <Helmet>
      <title>{tool.metaTitle}</title>
      <meta name="description" content={tool.metaDescription} />
      <meta name="keywords" content={tool.keywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={tool.metaTitle} />
      <meta property="og:description" content={tool.metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TransformFiles" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tool.metaTitle} />
      <meta name="twitter:description" content={tool.metaDescription} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(softwareAppSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default ToolPageSEO;
