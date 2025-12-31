import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Code, ImageIcon, Wand2, Sparkles, ArrowRight, Zap, Shield, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const AITools = () => {
  const { language, getLocalizedPath } = useLanguage();

  const tools = [
    {
      icon: Code,
      title: "Image to Code",
      description: "Convert screenshots and designs to clean, responsive HTML/CSS code instantly.",
      path: "/image-to-code",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: ImageIcon,
      title: "Background Remover",
      description: "Remove backgrounds from images with AI-powered precision. Perfect for products and portraits.",
      path: "/background-remover",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Wand2,
      title: "Image Enhancer",
      description: "Enhance your photos with powerful adjustment tools. Improve brightness, contrast, and more.",
      path: "/image-enhancer",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in seconds with our optimized AI models.",
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your files are processed securely and never stored.",
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "Access our AI tools 24/7 from any device.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>AI Tools - Free Online AI-Powered Tools | TransformFiles</title>
        <meta name="description" content="Free AI-powered tools: Image to Code converter, Background Remover, Image Enhancer. Transform your files with artificial intelligence." />
        <html lang={language} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Tools</span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                Transform Your Files with{" "}
                <span className="text-gradient">Artificial Intelligence</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Powerful AI tools to convert, enhance, and transform your images. 
                Fast, free, and available right in your browser.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={getLocalizedPath(tool.path)}
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    Try Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Features */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
                Why Use Our AI Tools?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature) => (
                  <div key={feature.title} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Assistant Info */}
            <div className="max-w-3xl mx-auto mt-20 text-center">
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
                <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  AI Chat Assistant
                </h3>
                <p className="text-muted-foreground mb-4">
                  Need help with file conversions? Click the chat bubble in the bottom right 
                  corner to talk to our AI assistant about file formats, conversions, and more.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AITools;
