import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Loader2, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const GrammarFixer = () => {
  const { language } = useLanguage();
  const [inputText, setInputText] = useState("");
  const [fixedText, setFixedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFix = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to fix");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { action: 'grammar-fixer', text: inputText },
      });

      if (error) throw error;
      setFixedText(data.result);
      toast.success("Grammar fixed successfully!");
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || "Failed to fix grammar");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fixedText);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>AI Grammar Fixer - Fix Grammar & Spelling | TransformFiles</title>
        <meta name="description" content="Fix grammar, spelling, and punctuation errors instantly with AI. Free online grammar checker." />
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
                Grammar <span className="text-gradient">Fixer</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fix grammar, spelling, and punctuation errors in your text instantly.
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Original Text</h3>
                <Textarea
                  placeholder="Paste your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[300px]"
                />
                <Button onClick={handleFix} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Fixing...</>
                  ) : (
                    <><CheckCircle className="w-4 h-4 mr-2" />Fix Grammar</>
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Fixed Text</h3>
                  {fixedText && (
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
                <div className="bg-card border border-border rounded-xl p-4 min-h-[300px] whitespace-pre-wrap">
                  {fixedText || <span className="text-muted-foreground">Your corrected text will appear here...</span>}
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

export default GrammarFixer;
