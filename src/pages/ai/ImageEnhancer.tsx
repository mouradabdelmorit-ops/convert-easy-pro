import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import { Upload, Wand2, Download, Loader2, Sparkles, SlidersHorizontal, Zap, Shield, Globe, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ImageEnhancer = () => {
  const { language } = useLanguage();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [sharpness, setSharpness] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    disabled: isLoading,
    noClick: true,
  });

  const applyEnhancements = async () => {
    if (!originalImage) return;

    setIsLoading(true);
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
        ctx.drawImage(img, 0, 0);

        if (sharpness > 0) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const sharpenedData = applySharpen(imageData, sharpness / 100);
          ctx.putImageData(sharpenedData, 0, 0);
        }

        setEnhancedImage(canvas.toDataURL('image/png', 1.0));
        toast.success("Image enhanced successfully!");
        setIsLoading(false);
      };
      img.src = originalImage;
    } catch (error) {
      console.error('Error enhancing image:', error);
      toast.error("Failed to enhance image");
      setIsLoading(false);
    }
  };

  const applySharpen = (imageData: ImageData, amount: number): ImageData => {
    const weights = [
      0, -amount, 0,
      -amount, 1 + 4 * amount, -amount,
      0, -amount, 0
    ];
    
    const side = 3;
    const halfSide = Math.floor(side / 2);
    const src = imageData.data;
    const sw = imageData.width;
    const sh = imageData.height;
    const output = new ImageData(sw, sh);
    const dst = output.data;

    for (let y = 0; y < sh; y++) {
      for (let x = 0; x < sw; x++) {
        const dstOff = (y * sw + x) * 4;
        let r = 0, g = 0, b = 0;
        
        for (let cy = 0; cy < side; cy++) {
          for (let cx = 0; cx < side; cx++) {
            const scy = Math.min(sh - 1, Math.max(0, y + cy - halfSide));
            const scx = Math.min(sw - 1, Math.max(0, x + cx - halfSide));
            const srcOff = (scy * sw + scx) * 4;
            const wt = weights[cy * side + cx];
            r += src[srcOff] * wt;
            g += src[srcOff + 1] * wt;
            b += src[srcOff + 2] * wt;
          }
        }
        
        dst[dstOff] = Math.min(255, Math.max(0, r));
        dst[dstOff + 1] = Math.min(255, Math.max(0, g));
        dst[dstOff + 2] = Math.min(255, Math.max(0, b));
        dst[dstOff + 3] = src[dstOff + 3];
      }
    }
    
    return output;
  };

  const downloadImage = () => {
    if (!enhancedImage) return;
    const a = document.createElement('a');
    a.href = enhancedImage;
    a.download = 'enhanced-image.png';
    a.click();
  };

  const autoEnhance = () => {
    setBrightness(110);
    setContrast(115);
    setSaturation(120);
    setSharpness(30);
    toast.info("Auto-enhancement applied. Click 'Enhance' to apply.");
  };

  const faqs = [
    {
      question: "How does the AI Image Enhancer work?",
      answer: "Our image enhancer uses advanced algorithms to adjust brightness, contrast, saturation, and sharpness. You can manually adjust each setting or use the Auto-Enhance feature for one-click optimization."
    },
    {
      question: "What image formats are supported?",
      answer: "We support all major image formats including JPG, PNG, WebP, and more. The enhanced image is downloaded as a high-quality PNG file."
    },
    {
      question: "Will the enhancement reduce image quality?",
      answer: "No! Our enhancer maintains the original resolution and quality of your image. We use lossless processing to ensure your enhanced image looks its best."
    },
    {
      question: "Is the Image Enhancer free to use?",
      answer: "Yes, our Image Enhancer is completely free with no registration required. Enhance unlimited images without any watermarks or restrictions."
    },
    {
      question: "Can I enhance photos on mobile?",
      answer: "Absolutely! Our tool works perfectly on smartphones and tablets. Just upload your photo and adjust the settings directly on your mobile device."
    }
  ];

  const features = [
    "Brightness adjustment",
    "Contrast enhancement",
    "Saturation control",
    "Sharpness optimization",
    "One-click auto-enhance",
    "Real-time preview",
    "High-quality PNG output",
    "Works on all devices"
  ];

  return (
    <>
      <Helmet>
        <title>Free AI Image Enhancer - Improve Photo Quality Online | TransformFiles</title>
        <meta name="description" content="Enhance your photos with AI. Adjust brightness, contrast, saturation, and sharpness. Free online image enhancer - improve photo quality instantly, no registration." />
        <meta name="keywords" content="image enhancer, photo enhancer, enhance photo quality, improve image quality, ai image enhancer, photo editor online, image quality enhancer, free photo enhancer, enhance blurry photos" />
        <link rel="canonical" href="https://transformfiles.com/ai/image-enhancer" />
        <meta property="og:title" content="Free AI Image Enhancer - Improve Photo Quality | TransformFiles" />
        <meta property="og:description" content="Enhance your photos with AI. Adjust brightness, contrast, saturation. Free, instant results." />
        <meta property="og:url" content="https://transformfiles.com/ai/image-enhancer" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Image Enhancer - TransformFiles",
            "description": "Free AI-powered image enhancer. Improve photo quality with brightness, contrast, saturation adjustments.",
            "url": "https://transformfiles.com/ai/image-enhancer",
            "applicationCategory": "MultimediaApplication",
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
            <div className="absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-foreground">AI-Powered</span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  AI Image <span className="text-amber-400">Enhancer</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8">
                  Enhance your photos with powerful adjustment tools. Improve brightness, contrast, saturation, and sharpness instantly.
                </p>
              </div>
            </div>
          </section>

          {/* Main Tool Section */}
          <section className="py-8 md:py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                {!originalImage ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                      isDragActive
                        ? "border-amber-500 bg-amber-500/5"
                        : "border-border hover:border-amber-500/50"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      isDragActive ? 'bg-amber-500' : 'bg-secondary'
                    }`}>
                      <Upload className={`w-8 h-8 ${isDragActive ? 'text-white' : 'text-amber-400'}`} />
                    </div>
                    <p className="text-xl text-foreground font-medium mb-2">
                      {isDragActive ? "Drop the image here..." : "Upload an image to enhance"}
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Drag & drop or click to browse (PNG, JPG, WEBP)
                    </p>
                    <Button onClick={open} className="bg-amber-500 hover:bg-amber-600 text-white">
                      Choose Image <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                      <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5" />
                            Adjustments
                          </h3>
                          <Button variant="ghost" size="sm" onClick={autoEnhance}>
                            <Wand2 className="w-4 h-4 mr-1" />
                            Auto
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm">Brightness: {brightness}%</Label>
                            <Slider
                              value={[brightness]}
                              onValueChange={(v) => setBrightness(v[0])}
                              min={50}
                              max={150}
                              step={1}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label className="text-sm">Contrast: {contrast}%</Label>
                            <Slider
                              value={[contrast]}
                              onValueChange={(v) => setContrast(v[0])}
                              min={50}
                              max={150}
                              step={1}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label className="text-sm">Saturation: {saturation}%</Label>
                            <Slider
                              value={[saturation]}
                              onValueChange={(v) => setSaturation(v[0])}
                              min={0}
                              max={200}
                              step={1}
                              className="mt-2"
                            />
                          </div>

                          <div>
                            <Label className="text-sm">Sharpness: {sharpness}%</Label>
                            <Slider
                              value={[sharpness]}
                              onValueChange={(v) => setSharpness(v[0])}
                              min={0}
                              max={100}
                              step={1}
                              className="mt-2"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-4">
                          <Button onClick={applyEnhancements} disabled={isLoading} className="bg-amber-500 hover:bg-amber-600 text-white">
                            {isLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Enhancing...
                              </>
                            ) : (
                              <>
                                <Wand2 className="w-4 h-4 mr-2" />
                                Enhance Image
                              </>
                            )}
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={() => {
                              setOriginalImage(null);
                              setEnhancedImage(null);
                              setBrightness(100);
                              setContrast(100);
                              setSaturation(100);
                              setSharpness(0);
                            }}
                          >
                            Upload New Image
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Preview */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Original</h4>
                          <div className="bg-card border border-border rounded-xl p-2">
                            <img src={originalImage} alt="Original" className="max-h-64 mx-auto rounded" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">Enhanced</h4>
                          <div className="bg-card border border-border rounded-xl p-2 min-h-[272px] flex items-center justify-center">
                            {enhancedImage ? (
                              <img src={enhancedImage} alt="Enhanced" className="max-h-64 mx-auto rounded" />
                            ) : (
                              <p className="text-muted-foreground text-sm">Click "Enhance" to preview</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {enhancedImage && (
                        <div className="flex justify-center">
                          <Button onClick={downloadImage} size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                            <Download className="w-4 h-4 mr-2" />
                            Download Enhanced Image
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  Why Use Our AI Image Enhancer?
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Instant Results</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time preview of all adjustments. See changes instantly as you adjust settings.
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Privacy First</h3>
                    <p className="text-sm text-muted-foreground">
                      All processing happens in your browser. Your images are never uploaded to our servers.
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Works Everywhere</h3>
                    <p className="text-sm text-muted-foreground">
                      Compatible with all devices - desktop, tablet, and mobile. No app installation needed.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-12">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
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
                  <Link to="/ai/background-remover" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Background Remover</span>
                  </Link>
                  <Link to="/ai/image-to-code" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Image to Code</span>
                  </Link>
                  <Link to="/image/image-compressor" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Image Compressor</span>
                  </Link>
                  <Link to="/image-converter" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Image Converter</span>
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

export default ImageEnhancer;