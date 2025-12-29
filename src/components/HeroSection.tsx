import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, FileType, Zap, Shield, Clock, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onFilesSelected: (files: File[]) => void;
}

const HeroSection = ({ onFilesSelected }: HeroSectionProps) => {
  const [isDragActive, setIsDragActive] = useState(false);

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
    { icon: FileType, label: "1500+ Formats", description: "Supported" },
    { icon: Zap, label: "Lightning Fast", description: "Conversion" },
    { icon: Shield, label: "100% Secure", description: "Encrypted" },
    { icon: Clock, label: "Auto Delete", description: "After 2 Hours" },
  ];

  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden pt-20">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Free • Fast • Secure</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Convert Any File to{" "}
            <span className="text-gradient">Any Format</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            The most powerful online file converter. Transform videos, images, audio, 
            documents, and more in seconds. No software installation required.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {stats.map((stat, index) => (
              <div key={index} className="glass rounded-xl p-4 text-center hover:glow-teal transition-all duration-300">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-display font-semibold text-foreground text-sm">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Drop Zone */}
        <div 
          {...getRootProps()} 
          className={`max-w-3xl mx-auto animate-fade-in`}
          style={{ animationDelay: "0.4s" }}
        >
          <input {...getInputProps()} />
          <div 
            className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${
              isDragActive 
                ? "border-primary bg-primary/5 drop-zone-active" 
                : "border-border hover:border-primary/50 hover:bg-card/50"
            }`}
          >
            <div className="p-8 md:p-12 text-center">
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isDragActive ? "gradient-teal glow-teal-lg scale-110" : "bg-secondary"
              }`}>
                <Upload className={`w-10 h-10 ${isDragActive ? "text-primary-foreground" : "text-primary"}`} />
              </div>
              
              <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
                {isDragActive ? "Drop your files here!" : "Drag & Drop your files"}
              </h3>
              <p className="text-muted-foreground mb-6">
                or click to browse from your device
              </p>

              <Button 
                variant="hero" 
                size="xl" 
                onClick={open}
                className="group"
              >
                Choose Files
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="mt-6 text-sm text-muted-foreground">
                Supports: Video, Image, Audio, Document, Archive, E-book & more
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
