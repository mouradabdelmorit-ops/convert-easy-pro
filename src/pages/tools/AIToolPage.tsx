import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolPageSEO from "@/components/SEO/ToolPageSEO";
import ToolContent from "@/components/SEO/ToolContent";
import FAQSection from "@/components/SEO/FAQSection";
import InternalLinks from "@/components/SEO/InternalLinks";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Sparkles, Loader2, Copy, Check, ArrowRight, Wand2 } from "lucide-react";
import { aiTools, type ConversionTool } from "@/data/conversionTools";
import { supabase } from "@/integrations/supabase/client";

const AIToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = aiTools.find(t => t.slug === slug);
  
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!inputText.trim() || !tool) {
      toast.error("Please enter some text to process");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { action: tool.slug, text: inputText },
      });

      if (error) throw error;
      setOutputText(data.result);
      toast.success(`${tool.title} completed successfully!`);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || "Processing failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!tool) {
    return <Navigate to="/ai-tools" replace />;
  }

  const getActionButtonText = () => {
    switch (tool.slug) {
      case 'text-summarizer': return 'Summarize Text';
      case 'paraphraser': return 'Paraphrase Text';
      case 'grammar-fixer': return 'Fix Grammar';
      case 'translator': return 'Translate';
      case 'email-generator': return 'Generate Email';
      case 'code-explainer': return 'Explain Code';
      default: return 'Process';
    }
  };

  const getInputPlaceholder = () => {
    switch (tool.slug) {
      case 'text-summarizer': return 'Paste the text you want to summarize here...';
      case 'paraphraser': return 'Paste the text you want to paraphrase here...';
      case 'grammar-fixer': return 'Paste the text you want to check for grammar errors...';
      case 'translator': return 'Paste the text you want to translate here...';
      case 'email-generator': return 'Describe the email you want to generate (e.g., "Write a professional follow-up email after a job interview")...';
      case 'code-explainer': return 'Paste the code you want explained here...';
      default: return 'Enter your text here...';
    }
  };

  const getOutputLabel = () => {
    switch (tool.slug) {
      case 'text-summarizer': return 'Summary';
      case 'paraphraser': return 'Paraphrased Text';
      case 'grammar-fixer': return 'Corrected Text';
      case 'translator': return 'Translation';
      case 'email-generator': return 'Generated Email';
      case 'code-explainer': return 'Explanation';
      default: return 'Result';
    }
  };

  return (
    <>
      <ToolPageSEO tool={tool} categoryPath="ai" />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="relative gradient-hero py-12 md:py-16">
            <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <nav className="text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2 flex-wrap">
                  <a href="/" className="hover:text-foreground">Home</a>
                  <span>/</span>
                  <a href="/ai-tools" className="hover:text-foreground">AI Tools</a>
                  <span>/</span>
                  <span className="text-foreground">{tool.title}</span>
                </nav>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">AI-Powered • 100% Free</span>
                </div>
                
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {tool.h1}
                </h1>
                <h2 className="text-lg md:text-xl text-muted-foreground mb-8">
                  Free Online Tool - No Signup Required
                </h2>
              </div>
            </div>
          </section>

          {/* AI Tool Interface */}
          <section className="py-8 md:py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Input Panel */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Input Text</h3>
                      <span className="text-xs text-muted-foreground">
                        {inputText.length} characters
                      </span>
                    </div>
                    <Textarea
                      placeholder={getInputPlaceholder()}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="min-h-[280px] md:min-h-[320px] bg-card border-border resize-none"
                    />
                    <Button 
                      onClick={handleProcess} 
                      disabled={isLoading || !inputText.trim()} 
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      {isLoading ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Processing...</>
                      ) : (
                        <><Wand2 className="w-4 h-4 mr-2" />{getActionButtonText()}</>
                      )}
                    </Button>
                  </div>

                  {/* Output Panel */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{getOutputLabel()}</h3>
                      {outputText && (
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span className="ml-2 hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                        </Button>
                      )}
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 min-h-[280px] md:min-h-[320px] overflow-auto">
                      {outputText ? (
                        <div className="whitespace-pre-wrap text-foreground">{outputText}</div>
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <p className="text-muted-foreground text-center">
                            {getOutputLabel()} will appear here after processing...
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: '100% Free', desc: 'No hidden costs' },
                    { label: 'No Signup', desc: 'Use instantly' },
                    { label: 'Secure', desc: 'Data deleted' },
                    { label: 'Unlimited', desc: 'No limits' },
                  ].map((item, i) => (
                    <div key={i} className="text-center p-4 rounded-xl bg-card border border-border">
                      <div className="font-bold text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SEO Content */}
          <ToolContent tool={tool} />
          
          {/* FAQs */}
          <FAQSection faqs={tool.faqs} title={`${tool.title} FAQs`} />
          
          {/* Internal Links */}
          <InternalLinks toolId={tool.id} categoryPath="ai" />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AIToolPage;