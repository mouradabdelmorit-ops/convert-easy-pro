import { 
  Zap, Shield, Cloud, Smartphone, Globe, Clock,
  Video, Image, Music, FileText, Lock, Sparkles
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Convert files in seconds with our optimized processing engine. No waiting, no delays.",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "256-bit SSL encryption protects your files. Auto-delete ensures complete privacy.",
    },
    {
      icon: Cloud,
      title: "Cloud-Based",
      description: "No software to install. Works directly in your browser on any device.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Convert files on the go. Fully responsive design works on all devices.",
    },
    {
      icon: Globe,
      title: "1500+ Formats",
      description: "Support for virtually every file format. Video, audio, image, document, and more.",
    },
    {
      icon: Clock,
      title: "Batch Processing",
      description: "Convert multiple files at once. Save time with bulk conversions.",
    },
  ];

  const categories = [
    { icon: Video, label: "Video", count: "200+", color: "from-red-500 to-orange-500" },
    { icon: Image, label: "Image", count: "150+", color: "from-green-500 to-emerald-500" },
    { icon: Music, label: "Audio", count: "100+", color: "from-purple-500 to-pink-500" },
    { icon: FileText, label: "Document", count: "300+", color: "from-blue-500 to-cyan-500" },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Powerful Features</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to{" "}
            <span className="text-gradient">Convert Files</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Professional-grade file conversion with enterprise features. 
            Free forever, no registration required.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative glass rounded-2xl p-6 text-center hover:glow-teal transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">
                  {category.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.count} formats
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-6 hover:bg-card/80 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="mt-16 glass rounded-2xl p-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <Lock className="w-8 h-8 text-primary" />
              <div className="text-left">
                <p className="font-display font-semibold text-foreground">Secure & Private</p>
                <p className="text-sm text-muted-foreground">Files auto-delete after 2 hours</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border" />
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-primary" />
              <div className="text-left">
                <p className="font-display font-semibold text-foreground">10M+ Files Converted</p>
                <p className="text-sm text-muted-foreground">Trusted by users worldwide</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border" />
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-primary" />
              <div className="text-left">
                <p className="font-display font-semibold text-foreground">99.9% Uptime</p>
                <p className="text-sm text-muted-foreground">Always available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
