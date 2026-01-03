import { type ConversionTool } from "@/data/conversionTools";
import { CheckCircle, Zap, Shield, Globe, Clock, Smartphone, Sparkles, Users } from "lucide-react";

interface ToolContentProps {
  tool: ConversionTool;
}

const ToolContent = ({ tool }: ToolContentProps) => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Description */}
          <article className="prose prose-lg prose-invert max-w-none mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {tool.fromFormat && tool.toFormat 
                ? `Why Use Our ${tool.fromFormat} to ${tool.toFormat} Converter?`
                : `Why Choose ${tool.title}?`}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {tool.description}
            </p>
          </article>

          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-secondary/30 rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Our cloud-based processing ensures your files are converted in seconds, not minutes. No waiting, no frustration.
              </p>
            </div>
            <div className="bg-secondary/30 rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">100% Secure</h3>
              <p className="text-sm text-muted-foreground">
                All files are encrypted during transfer and automatically deleted within 2 hours. Your privacy is our priority.
              </p>
            </div>
            <div className="bg-secondary/30 rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Works Everywhere</h3>
              <p className="text-sm text-muted-foreground">
                Browser-based tool that works on Windows, Mac, Linux, iPhone, Android – any device with a modern browser.
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {tool.title} Features
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {tool.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          {tool.fromFormat && tool.toFormat && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                How to Convert {tool.fromFormat} to {tool.toFormat} Online
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-b from-primary/5 to-transparent rounded-xl border border-border">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">1</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Upload</h3>
                  <p className="text-sm text-muted-foreground">
                    Click "Choose Files" or drag and drop your {tool.fromFormat} file into the upload area
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-b from-primary/5 to-transparent rounded-xl border border-border">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">2</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Convert</h3>
                  <p className="text-sm text-muted-foreground">
                    Click "Convert Now" and wait a few seconds while we process your file
                  </p>
                </div>
                <div className="text-center p-6 bg-gradient-to-b from-primary/5 to-transparent rounded-xl border border-border">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-foreground">3</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Download</h3>
                  <p className="text-sm text-muted-foreground">
                    Click "Download" to save your converted {tool.toFormat} file to your device
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Use Cases */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Common Use Cases
              </h2>
            </div>
            <div className="space-y-4">
              {tool.useCases.map((useCase, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-secondary/10 rounded-lg border border-border/50">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-foreground">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="flex items-start gap-4 p-5 bg-secondary/20 rounded-xl">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Save Time</h3>
                <p className="text-sm text-muted-foreground">
                  No software to install, no accounts to create. Just upload and convert instantly.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-secondary/20 rounded-xl">
              <Smartphone className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Mobile Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Convert files directly from your phone. Works perfectly on iOS and Android.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="text-center p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Trusted by Millions Worldwide
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div>
                <div className="text-3xl font-bold text-primary">10M+</div>
                <div className="text-sm text-muted-foreground">Files Converted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Free Forever</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolContent;
