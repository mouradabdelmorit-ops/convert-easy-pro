import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ConversionPanel from "@/components/ConversionPanel";
import FeaturesSection from "@/components/FeaturesSection";
import CookieConsent from "@/components/CookieConsent";
import AdPlaceholder from "@/components/AdPlaceholder";

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setSelectedFiles([]);
  };

  return (
    <>
      <Helmet>
        <title>TransformFiles - Free Online File Converter | Convert Any File Format</title>
        <meta
          name="description"
          content="Convert files online for free. Support for 1500+ formats including video, image, audio, documents. Fast, secure, no registration required."
        />
        <meta
          name="keywords"
          content="file converter, online converter, video converter, image converter, audio converter, PDF converter, free converter"
        />
        <link rel="canonical" href="https://transformfiles.app" />
        
        {/* Open Graph */}
        <meta property="og:title" content="TransformFiles - Free Online File Converter" />
        <meta property="og:description" content="Convert any file to any format. Fast, secure, and free." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://transformfiles.app" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TransformFiles - Free Online File Converter" />
        <meta name="twitter:description" content="Convert any file to any format. Fast, secure, and free." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TransformFiles",
            "description": "Free online file converter supporting 1500+ formats",
            "url": "https://transformfiles.app",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
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

          {/* Ad Zone - Banner */}
          <div className="py-8 bg-navy-dark flex justify-center">
            <AdPlaceholder size="leaderboard" />
          </div>

          <FeaturesSection />

          {/* Ad Zone - Rectangle */}
          <div className="py-8 bg-background flex justify-center">
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
