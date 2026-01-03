import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { allTools, getToolsByCategory } from "@/data/conversionTools";
import { Video, Image, Music, FileText, Sparkles } from "lucide-react";

const AllTools = () => {
  const { language, getLocalizedPath } = useLanguage();

  const categories = [
    { 
      id: 'video', 
      name: 'Video Converters', 
      icon: Video, 
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      tools: getToolsByCategory('video')
    },
    { 
      id: 'image', 
      name: 'Image Converters', 
      icon: Image, 
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      tools: getToolsByCategory('image')
    },
    { 
      id: 'audio', 
      name: 'Audio Converters', 
      icon: Music, 
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      tools: getToolsByCategory('audio')
    },
    { 
      id: 'pdf', 
      name: 'PDF Tools', 
      icon: FileText, 
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      tools: getToolsByCategory('pdf')
    },
    { 
      id: 'ai', 
      name: 'AI Tools', 
      icon: Sparkles, 
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      tools: getToolsByCategory('ai')
    },
  ];

  const canonicalUrl = language === 'en' 
    ? 'https://transformfiles.com/all-tools' 
    : `https://transformfiles.com/${language}/all-tools`;

  return (
    <>
      <Helmet>
        <title>All Free Online Converters & Tools - 60+ File Conversion Tools | TransformFiles</title>
        <meta name="description" content="Browse 60+ free online file converters and AI tools. Convert video, image, audio, PDF files instantly. No signup required. Fast, secure, and free." />
        <meta name="keywords" content="file converter, online converter, video converter, image converter, audio converter, PDF converter, free converter, MP4 to MP3, JPG to PNG, PDF to Word, merge PDF, compress files, AI tools" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="All Free Online Converters & Tools - 60+ File Conversion Tools" />
        <meta property="og:description" content="Browse 60+ free online file converters and AI tools. Convert video, image, audio, PDF files instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <html lang={language} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "All Free Online Converters & Tools",
            "description": "Browse 60+ free online file converters and AI tools.",
            "url": canonicalUrl,
            "numberOfItems": allTools.length,
            "hasPart": categories.map(cat => ({
              "@type": "ItemList",
              "name": cat.name,
              "numberOfItems": cat.tools.length
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Hero */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                All Free Online <span className="text-gradient">Converters & Tools</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse our complete collection of 60+ free online file converters and AI-powered tools. 
                Convert any file format instantly without signup.
              </p>
            </div>

            {/* Tools by Category */}
            <div className="space-y-12">
              {categories.map((category) => (
                <section key={category.id} id={category.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-xl ${category.bgColor}`}>
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-foreground">
                      {category.name}
                    </h2>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {category.tools.length} tools
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {category.tools.map((tool) => {
                      const toolPath = category.id === 'ai' 
                        ? `/ai/${tool.slug}` 
                        : `/${category.id}/${tool.slug}`;
                      return (
                      <Link
                        key={tool.slug}
                        to={getLocalizedPath(toolPath)}
                        className="group p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                      >
                        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {tool.metaDescription.slice(0, 60) + '...'}
                        </p>
                      </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-xl bg-card border border-border">
                <div className="text-3xl font-bold text-gradient">60+</div>
                <div className="text-sm text-muted-foreground">Free Tools</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-card border border-border">
                <div className="text-3xl font-bold text-gradient">100%</div>
                <div className="text-sm text-muted-foreground">Free to Use</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-card border border-border">
                <div className="text-3xl font-bold text-gradient">No</div>
                <div className="text-sm text-muted-foreground">Signup Required</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-card border border-border">
                <div className="text-3xl font-bold text-gradient">Fast</div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AllTools;