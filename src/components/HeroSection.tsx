import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, FileType, Zap, Shield, Clock, ArrowRight } from "lucide-react";
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

  const stats = [
    { icon: FileType, label: t.hero.supportedFormats, description: t.features.formats.title },
    { icon: Zap, label: t.features.lightning.title, description: t.features.lightning.desc.split(' ').slice(0, 2).join(' ') },
    { icon: Shield, label: t.features.secure.title, description: t.features.secure.desc.split(' ').slice(0, 2).join(' ') },
    { icon: Clock, label: t.features.free.title, description: t.features.free.desc.split(' ').slice(0, 2).join(' ') },
  ];

  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden pt-20">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-56 md:w-80 h-56 md:h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{t.hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t.hero.title}{" "}
            <span className="text-gradient">{t.hero.titleHighlight}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.hero.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-3 md:p-4 text-center hover:glow-teal transition-all duration-300">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mx-auto mb-2" />
                <p className="font-display font-semibold text-foreground text-xs md:text-sm">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Drop Zone */}
        <div 
          {...getRootProps()} 
          className="max-w-3xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.4s" }}
          id="convert"
        >
          <input {...getInputProps()} />
          <div 
            className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
              isDragActive 
                ? "border-primary bg-primary/5 drop-zone-active" 
                : "border-border hover:border-primary/50 hover:bg-card/50"
            }`}
          >
            <div className="p-6 md:p-12 text-center">
              <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isDragActive ? "gradient-teal glow-teal-lg scale-110" : "bg-secondary"
              }`}>
                <Upload className={`w-8 h-8 md:w-10 md:h-10 ${isDragActive ? "text-primary-foreground" : "text-primary"}`} />
              </div>
              
              <h3 className="font-display text-lg md:text-2xl font-semibold text-foreground mb-2">
                {isDragActive ? t.hero.dragActive : t.hero.dropzone}
              </h3>
              <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
                {t.hero.orBrowse}
              </p>

              <Button 
                variant="hero" 
                size="lg" 
                onClick={open}
                className="group"
              >
                {t.converter.upload}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="mt-4 md:mt-6 text-xs md:text-sm text-muted-foreground">
                {t.hero.supportedFormats}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
