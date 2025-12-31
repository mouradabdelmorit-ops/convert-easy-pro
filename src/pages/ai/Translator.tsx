import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Languages, Loader2, Sparkles, Copy, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
];

const Translator = () => {
  const { language: currentLang } = useLanguage();
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("es");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to translate");
      return;
    }

    setIsLoading(true);
    try {
      const fromName = languages.find(l => l.code === fromLang)?.name;
      const toName = languages.find(l => l.code === toLang)?.name;
      const prompt = `Translate from ${fromName} to ${toName}:\n\n${inputText}`;
      
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: { action: 'translator', text: prompt },
      });

      if (error) throw error;
      setTranslatedText(data.result);
      toast.success("Translated successfully!");
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || "Failed to translate");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>AI Translator - Translate Any Language | TransformFiles</title>
        <meta name="description" content="Translate text between languages instantly with AI. Free online translator tool." />
        <html lang={currentLang} />
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
                AI <span className="text-gradient">Translator</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Translate text between any languages with high accuracy.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Select value={fromLang} onValueChange={setFromLang}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
                <Select value={toLang} onValueChange={setToLang}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter text to translate..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[250px]"
                  />
                  <Button onClick={handleTranslate} disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Translating...</>
                    ) : (
                      <><Languages className="w-4 h-4 mr-2" />Translate</>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Translation</h3>
                    {translatedText && (
                      <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    )}
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4 min-h-[250px] whitespace-pre-wrap">
                    {translatedText || <span className="text-muted-foreground">Translation will appear here...</span>}
                  </div>
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

export default Translator;
