import { CheckCircle, Sparkles, Users } from "lucide-react";
import type { ConversionTool } from "@/data/conversionTools";

interface ToolContentProps {
  tool: ConversionTool;
}

const ToolContent = ({ tool }: ToolContentProps) => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Description */}
          <div className="glass rounded-2xl p-6 md:p-8">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">
              About {tool.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {tool.description}
            </p>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                Key Features
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.features.map((feature, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                Common Use Cases
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tool.useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 text-center"
                >
                  <span className="text-muted-foreground">{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Signals */}
          <div className="glass rounded-2xl p-6 md:p-8 bg-gradient-to-r from-primary/5 to-transparent">
            <h3 className="font-display text-lg font-bold text-foreground mb-4">
              Why Choose TransformFiles?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="font-display text-2xl font-bold text-primary mb-1">100%</p>
                <p className="text-sm text-muted-foreground">Free Forever</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-primary mb-1">2hr</p>
                <p className="text-sm text-muted-foreground">File Deletion</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-primary mb-1">256-bit</p>
                <p className="text-sm text-muted-foreground">SSL Encryption</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-primary mb-1">No</p>
                <p className="text-sm text-muted-foreground">Signup Required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolContent;
