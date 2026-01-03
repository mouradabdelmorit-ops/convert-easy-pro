import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import { Upload, Download, Loader2, Sparkles, ImageIcon, Zap, Shield, Globe, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { pipeline, env } from "@huggingface/transformers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

env.allowLocalModels = false;
env.useBrowserCache = true;

const MAX_IMAGE_DIMENSION = 1024;

const BackgroundRemover = () => {
  const { language } = useLanguage();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
    setProgress("Loading AI model...");
    const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
      device: 'webgpu',
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    
    let width = imageElement.naturalWidth;
    let height = imageElement.naturalHeight;
    if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
      if (width > height) {
        height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
        width = MAX_IMAGE_DIMENSION;
      } else {
        width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
        height = MAX_IMAGE_DIMENSION;
      }
    }
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(imageElement, 0, 0, width, height);
    
    setProgress("Processing image...");
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    const result = await segmenter(imageData);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    setProgress("Removing background...");
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    outputCtx.drawImage(canvas, 0, 0);
    const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const data = outputImageData.data;
    
    for (let i = 0; i < result[0].mask.data.length; i++) {
      const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Failed to create blob')),
        'image/png',
        1.0
      );
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setOriginalImage(dataUrl);
      setProcessedImage(null);
      
      setIsLoading(true);
      try {
        const img = new Image();
        img.onload = async () => {
          try {
            const blob = await removeBackground(img);
            const url = URL.createObjectURL(blob);
            setProcessedImage(url);
            toast.success("Background removed successfully!");
          } catch (error: any) {
            console.error('Error removing background:', error);
            toast.error(error.message || "Failed to remove background");
          } finally {
            setIsLoading(false);
            setProgress("");
          }
        };
        img.src = dataUrl;
      } catch (error: any) {
        console.error('Error:', error);
        toast.error("Failed to process image");
        setIsLoading(false);
        setProgress("");
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    disabled: isLoading,
    noClick: true,
  });

  const downloadImage = () => {
    if (!processedImage) return;
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = 'no-background.png';
    a.click();
  };

  const faqs = [
    {
      question: "How does the AI Background Remover work?",
      answer: "Our tool uses advanced AI segmentation models to identify the subject in your image and separate it from the background. The AI runs directly in your browser using WebGPU for fast, private processing."
    },
    {
      question: "What types of images work best?",
      answer: "The background remover works best with images that have clear subjects like people, products, animals, or objects. Images with good contrast between the subject and background produce the best results."
    },
    {
      question: "Is my image uploaded to a server?",
      answer: "No! All processing happens locally in your browser. Your images are never uploaded to any server, ensuring complete privacy and security."
    },
    {
      question: "What format is the output?",
      answer: "The processed image is saved as a PNG file with a transparent background, ready to use in design projects, product listings, or social media."
    },
    {
      question: "Is the Background Remover free?",
      answer: "Yes, our Background Remover is completely free to use. No registration, no watermarks, and unlimited removals."
    }
  ];

  const features = [
    "AI-powered segmentation",
    "Instant results in seconds",
    "Transparent PNG output",
    "Works in browser (WebGPU)",
    "No upload to servers",
    "High-quality output",
    "Perfect for product photos",
    "Works on all devices"
  ];

  return (
    <>
      <Helmet>
        <title>Free Background Remover Online - Remove Image Background AI | TransformFiles</title>
        <meta name="description" content="Remove background from image free online. AI-powered background remover for product photos, portraits, logos. Instant results, transparent PNG, no registration required." />
        <meta name="keywords" content="background remover, remove background, remove image background, transparent background, ai background remover, free background remover, remove bg, photo background remover, product photo background, cutout image" />
        <link rel="canonical" href="https://transformfiles.com/ai/background-remover" />
        <meta property="og:title" content="Free Background Remover Online - AI Powered | TransformFiles" />
        <meta property="og:description" content="Remove background from images instantly with AI. Free, fast, transparent PNG output." />
        <meta property="og:url" content="https://transformfiles.com/ai/background-remover" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Background Remover - TransformFiles",
            "description": "Free AI-powered background remover. Remove backgrounds from images instantly.",
            "url": "https://transformfiles.com/ai/background-remover",
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
            <div className="absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-pink-500/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span className="text-sm font-medium text-foreground">AI-Powered</span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Background <span className="text-pink-400">Remover</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8">
                  Remove backgrounds from your images instantly with AI. Perfect for product photos, portraits, and more.
                </p>
              </div>
            </div>
          </section>

          {/* Main Tool Section */}
          <section className="py-8 md:py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {!originalImage ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                      isDragActive
                        ? "border-pink-500 bg-pink-500/5"
                        : "border-border hover:border-pink-500/50"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      isDragActive ? 'bg-pink-500' : 'bg-secondary'
                    }`}>
                      <Upload className={`w-8 h-8 ${isDragActive ? 'text-white' : 'text-pink-400'}`} />
                    </div>
                    <p className="text-xl text-foreground font-medium mb-2">
                      {isDragActive ? "Drop the image here..." : "Upload an image"}
                    </p>
                    <p className="text-muted-foreground mb-4">
                      Drag & drop or click to browse (PNG, JPG, WEBP)
                    </p>
                    <Button onClick={open} className="bg-pink-500 hover:bg-pink-600 text-white">
                      Choose Image <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Original */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <ImageIcon className="w-5 h-5" />
                          Original
                        </h3>
                        <div className="bg-card border border-border rounded-2xl p-4">
                          <img src={originalImage} alt="Original" className="max-h-80 mx-auto rounded-lg" />
                        </div>
                      </div>

                      {/* Processed */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <Sparkles className="w-5 h-5" />
                          Result
                        </h3>
                        <div className="bg-card border border-border rounded-2xl p-4 min-h-[320px] flex items-center justify-center"
                          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'10\' height=\'10\' fill=\'%23333\'/%3E%3Crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23333\'/%3E%3C/svg%3E")' }}
                        >
                          {isLoading ? (
                            <div className="text-center">
                              <Loader2 className="w-12 h-12 animate-spin text-pink-500 mx-auto mb-4" />
                              <p className="text-muted-foreground">{progress}</p>
                            </div>
                          ) : processedImage ? (
                            <img src={processedImage} alt="Processed" className="max-h-80 rounded-lg" />
                          ) : (
                            <p className="text-muted-foreground">Processing...</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setOriginalImage(null);
                          setProcessedImage(null);
                        }}
                      >
                        Upload New Image
                      </Button>
                      {processedImage && (
                        <Button onClick={downloadImage} className="bg-pink-500 hover:bg-pink-600 text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Download PNG
                        </Button>
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
                  Why Use Our AI Background Remover?
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-pink-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Instant Results</h3>
                    <p className="text-sm text-muted-foreground">
                      AI processes your image in seconds. No waiting, no manual editing required.
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">100% Private</h3>
                    <p className="text-sm text-muted-foreground">
                      All processing happens in your browser. Your images never leave your device.
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Works Everywhere</h3>
                    <p className="text-sm text-muted-foreground">
                      Compatible with Chrome, Edge, and other modern browsers. No installation needed.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-12">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-pink-500 flex-shrink-0" />
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
                <h2 className="text-2xl font-bold text-foreground mb-6">Related Tools</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link to="/ai/image-enhancer" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Image Enhancer</span>
                  </Link>
                  <Link to="/image/image-compressor" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Image Compressor</span>
                  </Link>
                  <Link to="/image-converter" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Image Converter</span>
                  </Link>
                  <Link to="/ai/image-to-code" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-primary transition-colors text-center">
                    <span className="text-foreground font-medium">Image to Code</span>
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

export default BackgroundRemover;