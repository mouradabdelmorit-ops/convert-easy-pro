import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  Video, Upload, ArrowRight, Download, Loader2, X, 
  Play, CheckCircle, Film, Zap, Shield, Globe, HelpCircle
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const videoFormats = ["MP4", "AVI", "MKV", "MOV", "WMV", "FLV", "WEBM", "M4V", "3GP", "MPEG"];

interface ConversionFile {
  file: File;
  targetFormat: string;
  status: "pending" | "converting" | "done" | "error";
  progress: number;
  downloadUrl?: string;
  downloadName?: string;
}

const VideoConverter = () => {
  const [files, setFiles] = useState<ConversionFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const videoFiles = acceptedFiles.filter(f => f.type.startsWith('video/'));
    const newFiles = videoFiles.map(file => ({
      file,
      targetFormat: selectedFormat,
      status: "pending" as const,
      progress: 0
    }));
    setFiles(prev => [...prev, ...newFiles]);
    
    if (videoFiles.length > 0) {
      toast({ title: "Files added", description: `${videoFiles.length} video file(s) ready` });
    }
  }, [selectedFormat]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'video/*': ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm', '.m4v', '.3gp', '.mpeg'] },
    noClick: true,
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConversion = async () => {
    if (!selectedFormat || files.length === 0) {
      toast({ title: "Error", description: "Please select a format and upload files", variant: "destructive" });
      return;
    }

    setIsConverting(true);

    for (let index = 0; index < files.length; index++) {
      setFiles(prev => prev.map((f, i) => 
        i === index ? { ...f, status: "converting", progress: 20 } : f
      ));

      try {
        const formData = new FormData();
        formData.append('file', files[index].file);
        formData.append('targetFormat', selectedFormat);

        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/convert-file`, {
          method: 'POST',
          body: formData,
        });

        setFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, progress: 60 } : f
        ));

        const data = await response.json();

        if (data.success && data.data) {
          const binaryString = atob(data.data);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: data.mimeType });
          const url = URL.createObjectURL(blob);

          setFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, status: "done", progress: 100, downloadUrl: url, downloadName: data.fileName } : f
          ));
        } else {
          throw new Error(data.error || 'Conversion failed');
        }
      } catch (error) {
        console.error('Conversion error:', error);
        setFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, status: "error" } : f
        ));
      }
    }
    setIsConverting(false);
  };

  const handleDownload = (cf: ConversionFile) => {
    if (cf.downloadUrl && cf.downloadName) {
      const a = document.createElement('a');
      a.href = cf.downloadUrl;
      a.download = cf.downloadName;
      a.click();
    }
  };

  const faqs = [
    {
      question: "What video formats can I convert?",
      answer: "Our converter supports all major video formats including MP4, AVI, MKV, MOV, WMV, FLV, WebM, M4V, 3GP, and MPEG. You can convert between any of these formats."
    },
    {
      question: "Is there a file size limit?",
      answer: "We support video files up to 500MB for free conversions. For larger files, consider compressing them first or splitting into smaller segments."
    },
    {
      question: "Will the video quality be affected?",
      answer: "Our converter maintains the highest possible quality during conversion. We use optimized settings to preserve video quality while ensuring compatibility."
    },
    {
      question: "Is the video converter free?",
      answer: "Yes! Our video converter is completely free to use. No registration required, no watermarks, and unlimited conversions."
    },
    {
      question: "Can I convert multiple videos at once?",
      answer: "Yes, you can upload and convert multiple videos in a single batch. Each file will be processed and made available for individual download."
    }
  ];

  const features = [
    "Convert MP4 to AVI, MKV to MP4, MOV to MP4",
    "Support for 10+ video formats",
    "Batch conversion support",
    "No file size limits for most files",
    "Fast cloud-based processing",
    "Maintains video quality",
    "No watermarks added",
    "Works on all devices"
  ];

  return (
    <>
      <Helmet>
        <title>Free Video Converter Online - Convert MP4 to AVI, MKV to MP4, MOV to MP4 | TransformFiles</title>
        <meta name="description" content="Convert video files online free. MP4 to AVI, MKV to MP4, MOV to MP4, AVI to MP4, WebM to MP4. Best free video converter - fast, secure, no registration, no watermark." />
        <meta name="keywords" content="video converter, mp4 to avi, mkv to mp4, mov to mp4, avi to mp4, convert video online, free video converter, webm to mp4, flv to mp4, wmv to mp4, video format converter, online video converter free, convert video without watermark" />
        <link rel="canonical" href="https://transformfiles.com/video-converter" />
        <meta property="og:title" content="Free Video Converter Online - Convert MP4, AVI, MKV, MOV | TransformFiles" />
        <meta property="og:description" content="Convert video files online free. MP4 to AVI, MKV to MP4, MOV to MP4. Best free video converter - fast, secure, no watermark." />
        <meta property="og:url" content="https://transformfiles.com/video-converter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Video Converter - TransformFiles",
            "description": "Free online video converter. Convert MP4, AVI, MKV, MOV, WebM and 50+ video formats.",
            "url": "https://transformfiles.com/video-converter",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "featureList": features
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero */}
          <section className="relative gradient-hero py-12 md:py-16">
            <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-red-500/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <Video className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-foreground">Video Converter</span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Convert <span className="text-red-400">Video Files</span> Online Free
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8">
                  Convert between MP4, AVI, MKV, MOV, and 10+ formats. Fast, free, and no watermarks.
                </p>
              </div>
            </div>
          </section>

          {/* Converter */}
          <section className="py-8 md:py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              {/* Format Selection */}
              <div className="max-w-3xl mx-auto mb-8">
                <h3 className="font-display font-semibold text-foreground mb-4 text-center">Select Output Format</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {videoFormats.map((format) => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedFormat === format
                          ? "bg-red-500 text-white"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Zone */}
              <div {...getRootProps()} className="max-w-3xl mx-auto">
                <input {...getInputProps()} />
                <div className={`rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  isDragActive ? 'border-red-500 bg-red-500/5' : 'border-border hover:border-red-500/50'
                }`}>
                  <div className="p-6 md:p-8 text-center">
                    <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      isDragActive ? 'bg-red-500' : 'bg-secondary'
                    }`}>
                      <Film className={`w-7 h-7 md:w-8 md:h-8 ${isDragActive ? 'text-white' : 'text-red-400'}`} />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                      {isDragActive ? 'Drop your videos here!' : 'Upload Video Files'}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm md:text-base">Drag & drop or click to browse</p>
                    <Button onClick={open} className="bg-red-500 hover:bg-red-600 text-white">
                      Choose Files <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="max-w-3xl mx-auto mt-6 space-y-3">
                  {files.map((f, index) => (
                    <div key={index} className="glass rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                        <Play className="w-6 h-6 text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{f.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(f.file.size / 1024 / 1024).toFixed(2)} MB
                          {selectedFormat && <span className="text-red-400 ml-2">→ {selectedFormat}</span>}
                        </p>
                        {f.status === "converting" && (
                          <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${f.progress}%` }} />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {f.status === "done" && (
                          <Button size="sm" onClick={() => handleDownload(f)} className="bg-red-500 hover:bg-red-600">
                            <Download className="w-4 h-4 mr-1" /> Download
                          </Button>
                        )}
                        {f.status === "converting" && <Loader2 className="w-5 h-5 text-red-400 animate-spin" />}
                        {f.status === "pending" && (
                          <button onClick={() => removeFile(index)} className="p-2 text-muted-foreground hover:text-destructive">
                            <X className="w-5 h-5" />
                          </button>
                        )}
                        {f.status === "done" && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                    </div>
                  ))}

                  <Button
                    size="lg"
                    className="w-full bg-red-500 hover:bg-red-600 text-white mt-4"
                    onClick={handleConversion}
                    disabled={!selectedFormat || isConverting}
                  >
                    {isConverting ? (
                      <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Converting...</>
                    ) : (
                      <>Convert {files.length} Video{files.length > 1 ? 's' : ''}</>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  Why Use Our Video Converter?
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
                    <p className="text-sm text-muted-foreground">
                      Cloud-based processing converts your videos in seconds, not minutes.
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Secure & Private</h3>
                    <p className="text-sm text-muted-foreground">
                      Files are encrypted and automatically deleted within 2 hours.
                    </p>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                      <Globe className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Works Everywhere</h3>
                    <p className="text-sm text-muted-foreground">
                      Browser-based - works on Windows, Mac, Linux, iOS, Android.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-12">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-secondary/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
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
                <h2 className="text-2xl font-bold text-foreground mb-6">Popular Video Conversions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link to="/video/mp4-to-mp3" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-red-500 transition-colors text-center">
                    <span className="text-foreground font-medium">MP4 to MP3</span>
                  </Link>
                  <Link to="/video/mkv-to-mp4" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-red-500 transition-colors text-center">
                    <span className="text-foreground font-medium">MKV to MP4</span>
                  </Link>
                  <Link to="/video/mov-to-mp4" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-red-500 transition-colors text-center">
                    <span className="text-foreground font-medium">MOV to MP4</span>
                  </Link>
                  <Link to="/video/avi-to-mp4" className="p-4 bg-secondary/30 rounded-xl border border-border hover:border-red-500 transition-colors text-center">
                    <span className="text-foreground font-medium">AVI to MP4</span>
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

export default VideoConverter;
