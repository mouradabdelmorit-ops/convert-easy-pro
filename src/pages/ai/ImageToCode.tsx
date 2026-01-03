import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import { Upload, Code, Copy, Download, Loader2, Sparkles, CheckCircle, Zap, Shield, Globe, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ImageToCode = () => {
  const { language } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'] },
    maxFiles: 1,
    noClick: true,
  });

  const handleGenerate = async () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: {
          action: 'image-to-code',
          imageBase64: image,
          prompt: prompt || "Convert this design to clean, responsive HTML and CSS code.",
        },
      });

      if (error) throw error;
      setGeneratedCode(data.result);
      toast.success("Code generated successfully!");
    } catch (error: any) {
      console.error('Error generating code:', error);
      toast.error(error.message || "Failed to generate code");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success("Code copied to clipboard!");
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-code.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      question: "How does Image to Code AI work?",
      answer: "Our AI analyzes the visual elements, layout, colors, and typography in your uploaded image. It then generates clean, semantic HTML and CSS code that recreates the design as closely as possible."
    },
    {
      question: "What types of designs can I convert?",
      answer: "You can convert UI mockups, website screenshots, app designs, landing pages, forms, buttons, cards, and more. The AI works best with clear, well-structured designs."
    },
    {
      question: "Is the generated code responsive?",
      answer: "Yes! The AI generates responsive code using modern CSS techniques like Flexbox and Grid. You can also specify 'Make it responsive' in the prompt for better mobile compatibility."
    },
    {
      question: "Can I use Tailwind CSS or other frameworks?",
      answer: "Absolutely! Just specify in the prompt what framework you want. For example: 'Use Tailwind CSS classes' or 'Generate React components with styled-components'."
    },
    {
      question: "Is the Image to Code tool free?",
      answer: "Yes, our Image to Code converter is completely free to use. No registration required, no watermarks, and unlimited conversions."
    }
  ];

  const features = [
    "AI-powered design recognition",
    "Clean, semantic HTML5 output",
    "Modern CSS with Flexbox/Grid",
    "Responsive design generation",
    "Custom framework support (Tailwind, Bootstrap)",
    "React/Vue component generation",
    "Copy code with one click",
    "Download as HTML file"
  ];

  return (
    <>
      <Helmet>
        <title>Free Image to Code Converter - AI Screenshot to HTML CSS | TransformFiles</title>
        <meta name="description" content="Convert screenshots and design mockups to HTML/CSS code instantly with AI. Free online image to code converter - supports Tailwind, React, Vue. No registration required." />
        <meta name="keywords" content="image to code, screenshot to html, design to code, ai code generator, mockup to html, figma to code, psd to html, ui to code, design to html css, free code generator" />
        <link rel="canonical" href="https://transformfiles.com/ai/image-to-code" />
        <meta property="og:title" content="Free Image to Code Converter - AI Powered | TransformFiles" />
        <meta property="og:description" content="Convert any screenshot or design mockup to clean HTML/CSS code using AI. Free, fast, no registration." />
        <meta property="og:url" content="https://transformfiles.com/ai/image-to-code" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Image to Code - TransformFiles",
            "description": "Free AI-powered image to code converter. Convert screenshots to HTML/CSS instantly.",
            "url": "https://transformfiles.com/ai/image-to-code",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "featureList": features
          })}
        </script>
        <html lang={language} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative gradient-hero py-12 md:py-16">
            <div className="absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-foreground">AI-Powered</span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Image to <span className="text-cyan-400">Code</span> Converter
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8">
                  Upload a screenshot or design mockup and let AI convert it to clean, responsive HTML and CSS code instantly.
                </p>
              </div>
            </div>
          </section>

          {/* Main Tool Section */}
          <section className="py-8 md:py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Upload Section */}
                <div className="space-y-6">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                      isDragActive
                        ? "border-cyan-500 bg-cyan-500/5"
                        : "border-border hover:border-cyan-500/50"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {image ? (
                      <img src={image} alt="Uploaded design" className="max-h-64 mx-auto rounded-lg" />
                    ) : (
                      <div className="py-8">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                          isDragActive ? 'bg-cyan-500' : 'bg-secondary'
                        }`}>
                          <Upload className={`w-8 h-8 ${isDragActive ? 'text-white' : 'text-cyan-400'}`} />
                        </div>
                        <p className="text-foreground font-medium mb-2">
                          {isDragActive ? "Drop the image here..." : "Upload your design"}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Drag & drop or click to browse (PNG, JPG, WEBP)
                        </p>
                        <Button onClick={open} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                          Choose Image <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <Textarea
                    placeholder="Optional: Add specific instructions (e.g., 'Use Tailwind CSS', 'Generate React component', 'Make it dark mode')"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />

                  <Button
                    onClick={handleGenerate}
                    disabled={!image || isLoading}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating Code...
                      </>
                    ) : (
                      <>
                        <Code className="w-5 h-5 mr-2" />
                        Generate Code
                      </>
                    )}
                  </Button>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Generated Code</h3>
                    {generatedCode && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadCode}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <pre className="bg-card border border-border rounded-2xl p-4 overflow-auto max-h-[500px] text-sm">
                      <code className="text-foreground">
                        {generatedCode || "// Your generated code will appear here..."}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  Why Use Our Image to Code Converter?
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-cyan-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">AI-Powered</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced AI analyzes your design and generates pixel-perfect code in seconds.
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Clean Code</h3>
                    <p className="text-sm text-muted-foreground">
                      Get semantic HTML5, modern CSS, and well-structured code ready for production.
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Any Framework</h3>
                    <p className="text-sm text-muted-foreground">
                      Generate code for Tailwind, Bootstrap, React, Vue, or plain HTML/CSS.
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 md:py-16 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Frequently Asked Questions
                  </h2>
                </div>
                
                <Accordion type="single" collapsible className="space-y-3">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`faq-${index}`}
                      className="bg-secondary/30 border border-border rounded-xl px-6 data-[state=open]:bg-secondary/50 transition-colors"
                    >
                      <AccordionTrigger className="text-left text-foreground hover:text-primary py-5 text-base font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6">Related AI Tools</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link to="/ai/text-summarizer" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Text Summarizer</span>
                  </Link>
                  <Link to="/ai/paraphraser" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Paraphraser</span>
                  </Link>
                  <Link to="/ai/code-explainer" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Code Explainer</span>
                  </Link>
                  <Link to="/ai/image-enhancer" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Image Enhancer</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ImageToCode;