import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Loader2, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const EmailGenerator = () => {
  const { language } = useLanguage();
  const [subject, setSubject] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("professional");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!context.trim()) {
      toast.error("Please describe what the email should be about");
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `Subject: ${subject || 'Not specified'}\nTone: ${tone}\nContext: ${context}`;
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { action: 'email-generator', text: prompt },
      });

      if (error) throw error;
      setEmail(data.result);
      toast.success("Email generated successfully!");
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || "Failed to generate email");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>AI Email Generator - Write Professional Emails | TransformFiles</title>
        <meta name="description" content="Generate professional emails instantly with AI. Free online email writer tool." />
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
                Email <span className="text-gradient">Generator</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Generate professional emails in seconds. Just describe what you need.
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Subject (optional)</Label>
                  <Input
                    placeholder="e.g., Meeting Request"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>What's the email about?</Label>
                  <Textarea
                    placeholder="e.g., I need to request a meeting with my manager to discuss a raise..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
                <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</>
                  ) : (
                    <><Mail className="w-4 h-4 mr-2" />Generate Email</>
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Generated Email</h3>
                  {email && (
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
                <div className="bg-card border border-border rounded-xl p-4 min-h-[350px] whitespace-pre-wrap">
                  {email || <span className="text-muted-foreground">Your email will appear here...</span>}
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

export default EmailGenerator;
