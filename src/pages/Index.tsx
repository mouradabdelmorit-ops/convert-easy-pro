import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ConversionPanel from "@/components/ConversionPanel";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import FileCompressor from "@/components/FileCompressor";
import CookieConsent from "@/components/CookieConsent";
import AdPlaceholder from "@/components/AdPlaceholder";
import { useLanguage } from "@/i18n/LanguageContext";

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { t, language, languages } = useLanguage();

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setSelectedFiles([]);
  };

  const canonicalUrl = language === 'en' 
    ? 'https://transformfiles.com' 
    : `https://transformfiles.com/${language}`;

  const hreflangTags = Object.keys(languages).map((lang) => ({
    lang,
    url: lang === 'en' ? 'https://transformfiles.com' : `https://transformfiles.com/${lang}`
  }));

  return (
    <>
      <Helmet>
        <title>{t.meta.homeTitle}</title>
        <meta name="description" content={t.meta.homeDesc} />
        <meta name="keywords" content="file converter, online converter, video converter, image converter, audio converter, PDF converter, free converter" />
        <link rel="canonical" href={canonicalUrl} />
        {hreflangTags.map(({ lang, url }) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="alternate" hrefLang="x-default" href="https://transformfiles.com" />
        <meta property="og:title" content={t.meta.homeTitle} />
        <meta property="og:description" content={t.meta.homeDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={language} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.homeTitle} />
        <meta name="twitter:description" content={t.meta.homeDesc} />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TransformFiles",
            "description": t.meta.homeDesc,
            "url": canonicalUrl,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "inLanguage": language
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection onFilesSelected={handleFilesSelected} />
          
          {selectedFiles.length > 0 && (
            <ConversionPanel
              files={selectedFiles}
              onRemoveFile={handleRemoveFile}
              onClearAll={handleClearAll}
            />
          )}

          <FeaturesSection />
          
          <FileCompressor />
          
          <div className="py-8 bg-background flex justify-center">
            <AdPlaceholder size="leaderboard" />
          </div>

          <FAQSection />

          <div className="py-8 bg-navy-dark flex justify-center">
            <AdPlaceholder size="rectangle" />
          </div>
        </main>

        <Footer />
        <CookieConsent />
      </div>
    </>
  );
};

export default Index;
