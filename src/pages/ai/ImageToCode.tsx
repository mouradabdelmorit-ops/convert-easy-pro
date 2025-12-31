import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import { Upload, Code, Copy, Download, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ImageToCode = () => {
  const { language } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'] },
    maxFiles: 1,
  });

  const handleGenerate = async () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-tools', {
        body: {
          action: 'image-to-code',
          imageBase64: image,
          prompt: prompt || "Convert this design to clean, responsive HTML and CSS code.",
        },
      });

      if (error) throw error;
      setGeneratedCode(data.result);
      toast.success("Code generated successfully!");
    } catch (error: any) {
      console.error('Error generating code:', error);
      toast.error(error.message || "Failed to generate code");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success("Code copied to clipboard!");
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-code.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Image to Code - AI Design Converter | TransformFiles</title>
        <meta name="description" content="Convert screenshots and designs to HTML/CSS code using AI. Free online design to code converter." />
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
                Image to <span className="text-gradient">Code</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload a screenshot or design mockup and let AI convert it to clean, responsive HTML and CSS code.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Upload Section */}
              <div className="space-y-6">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <input {...getInputProps()} />
                  {image ? (
                    <img src={image} alt="Uploaded design" className="max-h-64 mx-auto rounded-lg" />
                  ) : (
                    <div className="py-8">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-foreground font-medium mb-2">
                        {isDragActive ? "Drop the image here..." : "Drag & drop your design"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        or click to browse (PNG, JPG, WEBP)
                      </p>
                    </div>
                  )}
                </div>

                <Textarea
                  placeholder="Optional: Add specific instructions (e.g., 'Use Tailwind CSS', 'Make it dark mode')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />

                <Button
                  onClick={handleGenerate}
                  disabled={!image || isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Code...
                    </>
                  ) : (
                    <>
                      <Code className="w-4 h-4 mr-2" />
                      Generate Code
                    </>
                  )}
                </Button>
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Generated Code</h3>
                  {generatedCode && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadCode}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <pre className="bg-card border border-border rounded-2xl p-4 overflow-auto max-h-[500px] text-sm">
                    <code className="text-foreground">
                      {generatedCode || "// Your generated code will appear here..."}
                    </code>
                  </pre>
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

export default ImageToCode;
