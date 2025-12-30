import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Youtube, Instagram, Video, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/i18n/LanguageContext";

interface DownloadResult {
  success: boolean;
  downloadUrl?: string;
  title?: string;
  thumbnail?: string;
  error?: string;
}

const Downloader = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [activeTab, setActiveTab] = useState("youtube");
  const { toast } = useToast();
  const { language } = useLanguage();

  const handleDownload = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('social-downloader', {
        body: { url, platform: activeTab }
      });

      if (error) throw error;

      if (data.success && data.downloadUrl) {
        setResult(data);
        toast({
          title: "Success!",
          description: "Your download is ready",
        });
      } else {
        throw new Error(data.error || "Failed to process the URL");
      }
    } catch (error: any) {
      console.error("Download error:", error);
      setResult({ success: false, error: error.message });
      toast({
        title: "Error",
        description: error.message || "Failed to download. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const platforms = [
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      color: "from-red-500 to-red-600",
      placeholder: "https://www.youtube.com/watch?v=...",
      description: "Download YouTube videos in HD quality",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "from-pink-500 via-purple-500 to-orange-500",
      placeholder: "https://www.instagram.com/p/... or /reel/...",
      description: "Download Instagram photos, reels & videos",
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: Video,
      color: "from-cyan-400 to-pink-500",
      placeholder: "https://www.tiktok.com/@user/video/...",
      description: "Download TikTok videos without watermark",
    },
  ];

  const activePlatform = platforms.find(p => p.id === activeTab)!;

  return (
    <>
      <Helmet>
        <title>Free Video Downloader - YouTube, Instagram, TikTok | TransformFiles</title>
        <meta name="description" content="Download videos from YouTube, Instagram photos & reels, TikTok without watermark. Free, fast, and easy to use online video downloader." />
        <link rel="canonical" href={`https://transformfiles.com${language === 'en' ? '' : `/${language}`}/downloader`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 py-16 relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Free Video Downloader</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                  Download Videos from
                  <span className="text-gradient block mt-2">Any Platform</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Download YouTube videos, Instagram photos & reels, and TikTok videos without watermark. Fast, free, and no registration required.
                </p>
              </div>

              {/* Platform Tabs */}
              <div className="max-w-3xl mx-auto">
                <Card className="glass-strong border-border/50 shadow-2xl">
                  <CardHeader className="text-center pb-4">
                    <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setUrl(""); setResult(null); }}>
                      <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                        {platforms.map((platform) => (
                          <TabsTrigger 
                            key={platform.id} 
                            value={platform.id}
                            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                          >
                            <platform.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{platform.name}</span>
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${activePlatform.color} mb-4`}>
                        <activePlatform.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl mb-2">{activePlatform.name} Downloader</CardTitle>
                      <CardDescription>{activePlatform.description}</CardDescription>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        type="url"
                        placeholder={activePlatform.placeholder}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1 h-12 text-base"
                        disabled={loading}
                      />
                      <Button 
                        onClick={handleDownload} 
                        disabled={loading || !url.trim()}
                        className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Download
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Result Section */}
                    {result && (
                      <div className={`p-4 rounded-xl border ${result.success ? 'bg-green-500/10 border-green-500/30' : 'bg-destructive/10 border-destructive/30'}`}>
                        {result.success ? (
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            {result.thumbnail && (
                              <img src={result.thumbnail} alt="Thumbnail" className="w-24 h-24 rounded-lg object-cover" />
                            )}
                            <div className="flex-1 text-center sm:text-left">
                              <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span className="font-semibold text-green-600">Ready to download!</span>
                              </div>
                              {result.title && <p className="text-sm text-muted-foreground line-clamp-2">{result.title}</p>}
                            </div>
                            <Button asChild className="bg-green-600 hover:bg-green-700">
                              <a href={result.downloadUrl} target="_blank" rel="noopener noreferrer" download>
                                <Download className="w-4 h-4 mr-2" />
                                Download Now
                              </a>
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-destructive" />
                            <span className="text-destructive">{result.error}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Downloader?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: "🚀",
                    title: "Lightning Fast",
                    description: "Download videos in seconds with our optimized servers. No waiting, no delays.",
                  },
                  {
                    icon: "🔒",
                    title: "100% Secure",
                    description: "We don't store your videos or personal data. Everything is processed securely.",
                  },
                  {
                    icon: "✨",
                    title: "No Watermark",
                    description: "Download TikTok videos without the annoying watermark. Clean, original quality.",
                  },
                  {
                    icon: "📱",
                    title: "All Devices",
                    description: "Works on any device - desktop, tablet, or mobile. No app installation needed.",
                  },
                  {
                    icon: "🎬",
                    title: "HD Quality",
                    description: "Download videos in the highest quality available. Up to 4K resolution when available.",
                  },
                  {
                    icon: "💯",
                    title: "100% Free",
                    description: "No hidden fees, no subscriptions. Download unlimited videos for free.",
                  },
                ].map((feature, index) => (
                  <Card key={index} className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* How to Use */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-4">How to Download Videos</h2>
              <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                It's super easy! Just follow these 3 simple steps to download any video.
              </p>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { step: 1, title: "Copy the URL", description: "Copy the video link from YouTube, Instagram, or TikTok" },
                  { step: 2, title: "Paste & Click", description: "Paste the URL above and click the Download button" },
                  { step: 3, title: "Download", description: "Wait a few seconds and download your video" },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                {[
                  {
                    q: "Is it free to download videos?",
                    a: "Yes! Our video downloader is completely free to use. No hidden fees, no subscriptions required.",
                  },
                  {
                    q: "Can I download TikTok videos without watermark?",
                    a: "Absolutely! Our TikTok downloader removes the watermark automatically, giving you clean, original videos.",
                  },
                  {
                    q: "What video quality can I download?",
                    a: "We provide the highest quality available for each video. For YouTube, this can be up to 4K resolution.",
                  },
                  {
                    q: "Is it legal to download videos?",
                    a: "Downloading videos for personal use is generally allowed. However, redistributing copyrighted content is not permitted.",
                  },
                  {
                    q: "Do I need to install any software?",
                    a: "No installation required! Our downloader works directly in your web browser on any device.",
                  },
                ].map((faq, index) => (
                  <Card key={index} className="glass border-border/50">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Downloader;
