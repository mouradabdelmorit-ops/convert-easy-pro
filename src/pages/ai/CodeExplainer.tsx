import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Code2, Loader2, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CodeExplainer = () => {
  const { language } = useLanguage();
  const [inputCode, setInputCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExplain = async () => {
    if (!inputCode.trim()) {
      toast.error("Please enter some code to explain");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { action: 'code-explainer', text: inputCode },
      });

      if (error) throw error;
      setExplanation(data.result);
      toast.success("Code explained successfully!");
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || "Failed to explain code");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(explanation);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>AI Code Explainer - Understand Any Code | TransformFiles</title>
        <meta name="description" content="Get clear explanations of any code with AI. Free online code explainer tool." />
        <html lang={language} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Code <span className="text-gradient">Explainer</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Understand any code with clear, simple explanations.
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Your Code
                </h3>
                <Textarea
                  placeholder="Paste your code here..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
                <Button onClick={handleExplain} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Explaining...</>
                  ) : (
                    <><Sparkles className="w-4 h-4 mr-2" />Explain Code</>
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Explanation</h3>
                  {explanation && (
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
                <div className="bg-card border border-border rounded-xl p-4 min-h-[300px] whitespace-pre-wrap overflow-auto">
                  {explanation || <span className="text-muted-foreground">Explanation will appear here...</span>}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CodeExplainer;
