import { useState, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToolPageSEO from "@/components/SEO/ToolPageSEO";
import ToolContent from "@/components/SEO/ToolContent";
import FAQSection from "@/components/SEO/FAQSection";
import InternalLinks from "@/components/SEO/InternalLinks";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Download, Loader2, X, CheckCircle, FileText } from "lucide-react";
import { pdfTools, type ConversionTool } from "@/data/conversionTools";

interface ConversionFile {
  file: File;
  status: "pending" | "converting" | "done" | "error";
  progress: number;
  downloadUrl?: string;
  downloadName?: string;
}

const PDFToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = pdfTools.find(t => t.slug === slug);
  
  const [files, setFiles] = useState<ConversionFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const getAcceptedFiles = () => {
    if (tool?.fromFormat === 'Word' || tool?.slug.includes('word')) {
      return { 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 'application/msword': ['.doc'] };
    }
    if (tool?.fromFormat === 'JPG' || tool?.slug.includes('jpg-to-pdf')) {
      return { 'image/*': ['.jpg', '.jpeg', '.png'] };
    }
    return { 'application/pdf': ['.pdf'] };
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      status: "pending" as const,
      progress: 0
    }));
    setFiles(prev => [...prev, ...newFiles]);
    
    if (acceptedFiles.length > 0) {
      toast({ title: "Files added", description: `${acceptedFiles.length} file(s) ready` });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: getAcceptedFiles(),
    noClick: true,
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConversion = async () => {
    if (files.length === 0 || !tool) {
      toast({ title: "Error", description: "Please upload files first", variant: "destructive" });
      return;
    }

    setIsConverting(true);

    for (let index = 0; index < files.length; index++) {
      setFiles(prev => prev.map((f, i) => 
        i === index ? { ...f, status: "converting", progress: 20 } : f
      ));

      try {
        const formData = new FormData();
        formData.append('file', files[index].file);
        formData.append('targetFormat', tool.toFormat || 'PDF');

        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/convert-file`, {
          method: 'POST',
          body: formData,
        });

        setFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, progress: 60 } : f
        ));

        const data = await response.json();

        if (data.success && data.data) {
          const binaryString = atob(data.data);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: data.mimeType });
          const url = URL.createObjectURL(blob);

          setFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, status: "done", progress: 100, downloadUrl: url, downloadName: data.fileName } : f
          ));
        } else {
          throw new Error(data.error || 'Conversion failed');
        }
      } catch (error) {
        console.error('Conversion error:', error);
        setFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, status: "error" } : f
        ));
      }
    }
    setIsConverting(false);
  };

  const handleDownload = (cf: ConversionFile) => {
    if (cf.downloadUrl && cf.downloadName) {
      const a = document.createElement('a');
      a.href = cf.downloadUrl;
      a.download = cf.downloadName;
      a.click();
    }
  };

  if (!tool) {
    return <Navigate to="/pdf-editor" replace />;
  }

  return (
    <>
      <ToolPageSEO tool={tool} categoryPath="pdf" />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero */}
          <section className="relative gradient-hero py-12 md:py-16">
            <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <nav className="text-sm text-muted-foreground mb-4">
                  <a href="/" className="hover:text-foreground">Home</a>
                  <span className="mx-2">/</span>
                  <a href="/pdf-editor" className="hover:text-foreground">PDF Tools</a>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">{tool.title}</span>
                </nav>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {tool.h1}
                </h1>
                <h2 className="text-lg md:text-xl text-muted-foreground mb-8">
                  {tool.fromFormat && tool.toFormat 
                    ? `Convert ${tool.fromFormat} to ${tool.toFormat} Online for Free`
                    : 'Free Online Tool - No Signup Required'}
                </h2>
              </div>
            </div>
          </section>

          {/* Converter Tool */}
          <section className="py-8 md:py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div {...getRootProps()} className="max-w-3xl mx-auto">
                <input {...getInputProps()} />
                <div className={`rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  isDragActive ? 'border-orange-500 bg-orange-500/5' : 'border-border hover:border-orange-500/50'
                }`}>
                  <div className="p-6 md:p-8 text-center">
                    <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      isDragActive ? 'bg-orange-500' : 'bg-secondary'
                    }`}>
                      <FileText className={`w-7 h-7 md:w-8 md:h-8 ${isDragActive ? 'text-white' : 'text-orange-400'}`} />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                      {isDragActive ? 'Drop your files here!' : `Upload ${tool.fromFormat || 'PDF'} Files`}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm md:text-base">
                      Drag & drop or click to browse • Max 100MB per file
                    </p>
                    <Button onClick={open} className="bg-orange-500 hover:bg-orange-600 text-white" size="lg">
                      Choose Files <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="max-w-3xl mx-auto mt-6 space-y-3">
                  {files.map((f, index) => (
                    <div key={index} className="glass rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{f.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(f.file.size / 1024 / 1024).toFixed(2)} MB
                          {tool.toFormat && <span className="text-orange-400 ml-2">→ {tool.toFormat}</span>}
                        </p>
                        {f.status === "converting" && (
                          <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${f.progress}%` }} />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {f.status === "done" && (
                          <Button size="sm" onClick={() => handleDownload(f)} className="bg-orange-500 hover:bg-orange-600">
                            <Download className="w-4 h-4 mr-1" /> Download
                          </Button>
                        )}
                        {f.status === "converting" && <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />}
                        {f.status === "pending" && (
                          <button onClick={() => removeFile(index)} className="p-2 text-muted-foreground hover:text-destructive">
                            <X className="w-5 h-5" />
                          </button>
                        )}
                        {f.status === "done" && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                    </div>
                  ))}

                  <Button
                    size="lg"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4"
                    onClick={handleConversion}
                    disabled={isConverting}
                  >
                    {isConverting ? (
                      <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Processing...</>
                    ) : (
                      <>Process Now</>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* SEO Content */}
          <ToolContent tool={tool} />
          
          {/* FAQs */}
          <FAQSection faqs={tool.faqs} title={`${tool.title} FAQs`} />
          
          {/* Internal Links */}
          <InternalLinks toolId={tool.id} categoryPath="pdf" />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PDFToolPage;
