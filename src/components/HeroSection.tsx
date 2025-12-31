import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, Zap, Shield, Globe, ArrowRight, Sparkles, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface HeroSectionProps {
  onFilesSelected: (files: File[]) => void;
}

const HeroSection = ({ onFilesSelected }: HeroSectionProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const { t } = useLanguage();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  const benefits = [
    { icon: Zap, text: t.features.lightning.title },
    { icon: Shield, text: t.features.secure.title },
    { icon: Globe, text: t.features.mobile.title },
    { icon: Sparkles, text: t.features.free.title },
  ];

  const supportedFormats = [
    { category: t.hero.supportedFormats.includes("Video") ? "Video" : "Video", formats: "MP4, AVI, MKV, MOV, WebM" },
    { category: "Image", formats: "JPG, PNG, WebP, GIF, SVG" },
    { category: "Audio", formats: "MP3, WAV, FLAC, AAC, OGG" },
    { category: "Document", formats: "PDF, DOCX, XLSX, PPT" },
  ];

  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-56 md:w-80 h-56 md:h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-10 md:mb-14">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{t.hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in leading-tight" style={{ animationDelay: "0.1s" }}>
            {t.hero.title} <br className="hidden md:block" />
            <span className="text-gradient">{t.hero.titleHighlight}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
            {t.hero.description}
          </p>

          {/* Benefits Row */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drop Zone */}
        <div 
          {...getRootProps()} 
          className="max-w-4xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.3s" }}
          id="convert"
        >
          <input {...getInputProps()} />
          <div 
            className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 ${
              isDragActive 
                ? "border-primary bg-primary/5 drop-zone-active" 
                : "border-border hover:border-primary/50 hover:bg-card/30"
            }`}
          >
            <div className="p-8 md:p-16 text-center">
              <div className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isDragActive ? "gradient-teal glow-teal-lg scale-110" : "bg-secondary"
              }`}>
                <Upload className={`w-10 h-10 md:w-12 md:h-12 ${isDragActive ? "text-primary-foreground" : "text-primary"}`} />
              </div>
              
              <h3 className="font-display text-xl md:text-3xl font-semibold text-foreground mb-3">
                {isDragActive ? t.hero.dragActive : t.hero.dropzone}
              </h3>
              <p className="text-muted-foreground mb-6 text-base md:text-lg">
                {t.hero.orBrowse}
              </p>

              <Button 
                variant="hero" 
                size="lg" 
                onClick={open}
                className="group text-base md:text-lg px-8 py-6"
              >
                {t.converter.upload}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Supported Formats Grid */}
              <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                {supportedFormats.map((item, index) => (
                  <div key={index} className="text-left p-3 rounded-xl bg-card/30 border border-border/30">
                    <p className="text-xs font-medium text-primary mb-1">{item.category}</p>
                    <p className="text-xs text-muted-foreground">{item.formats}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-3 gap-6 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="glass rounded-xl p-4">
            <p className="font-display text-2xl md:text-3xl font-bold text-primary">1500+</p>
            <p className="text-sm text-muted-foreground">{t.features.formats.title}</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="font-display text-2xl md:text-3xl font-bold text-primary">{t.features.free.title}</p>
            <p className="text-sm text-muted-foreground">{t.features.free.desc}</p>
          </div>
          <div className="glass rounded-xl p-4">
            <p className="font-display text-2xl md:text-3xl font-bold text-primary">100%</p>
            <p className="text-sm text-muted-foreground">{t.features.secure.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
