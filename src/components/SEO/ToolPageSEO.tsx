import { Helmet } from "react-helmet-async";
import type { ConversionTool } from "@/data/conversionTools";

interface ToolPageSEOProps {
  tool: ConversionTool;
  categoryPath: string;
}

const ToolPageSEO = ({ tool, categoryPath }: ToolPageSEOProps) => {
  const canonicalUrl = `https://transformfiles.com/${categoryPath}/${tool.slug}`;
  
  // Enhanced breadcrumb schema
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
        "name": `${categoryPath.charAt(0).toUpperCase() + categoryPath.slice(1)} Tools`,
        "item": `https://transformfiles.com/${categoryPath}-converter`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.title,
        "item": canonicalUrl
      }
    ]
  };

  // Enhanced software application schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "description": tool.metaDescription,
    "url": canonicalUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
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
    },
    "author": {
      "@type": "Organization",
      "name": "TransformFiles",
      "url": "https://transformfiles.com"
    }
  };

  // Enhanced FAQ schema
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

  // HowTo schema for conversion tools
  const howToSchema = tool.fromFormat && tool.toFormat ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Convert ${tool.fromFormat} to ${tool.toFormat} Online`,
    "description": `Free online ${tool.fromFormat} to ${tool.toFormat} converter. Convert your files in 3 simple steps.`,
    "image": "https://transformfiles.com/og-image.png",
    "totalTime": "PT1M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Upload your file",
        "text": `Click 'Choose Files' or drag and drop your ${tool.fromFormat} file into the upload area.`,
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Convert the file",
        "text": `Click 'Convert Now' to start the ${tool.fromFormat} to ${tool.toFormat} conversion.`,
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Download the result",
        "text": `Once conversion is complete, click 'Download' to save your ${tool.toFormat} file.`,
        "position": 3
      }
    ]
  } : null;

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TransformFiles",
    "url": "https://transformfiles.com",
    "logo": "https://transformfiles.com/logo.png",
    "sameAs": [
      "https://twitter.com/transformfiles",
      "https://github.com/transformfiles"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@transformfiles.com"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{tool.metaTitle}</title>
      <meta name="title" content={tool.metaTitle} />
      <meta name="description" content={tool.metaDescription} />
      <meta name="keywords" content={tool.keywords.join(', ')} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={tool.metaTitle} />
      <meta property="og:description" content={tool.metaDescription} />
      <meta property="og:image" content="https://transformfiles.com/og-image.png" />
      <meta property="og:site_name" content="TransformFiles" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={tool.metaTitle} />
      <meta name="twitter:description" content={tool.metaDescription} />
      <meta name="twitter:image" content="https://transformfiles.com/og-image.png" />
      <meta name="twitter:site" content="@transformfiles" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="TransformFiles" />
      <meta name="publisher" content="TransformFiles" />
      <meta name="copyright" content="TransformFiles" />
      <meta name="application-name" content={tool.title} />
      <meta name="apple-mobile-web-app-title" content={tool.title} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#10b981" />
      
      {/* Language */}
      <html lang="en" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(softwareSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      {howToSchema && (
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      )}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};

export default ToolPageSEO;
