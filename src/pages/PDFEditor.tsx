import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { 
  FileText, Upload, Merge, Scissors, Minimize2, 
  RotateCw, Type, Droplet, Download, Loader2, X,
  ArrowRight, CheckCircle
} from "lucide-react";

interface PDFFile {
  file: File;
  preview: string;
}

const pdfTools = [
  { id: 'merge', icon: Merge, label: 'Merge PDF', description: 'Combine multiple PDFs' },
  { id: 'split', icon: Scissors, label: 'Split PDF', description: 'Extract pages' },
  { id: 'compress', icon: Minimize2, label: 'Compress', description: 'Reduce file size' },
  { id: 'rotate', icon: RotateCw, label: 'Rotate', description: 'Rotate pages' },
  { id: 'extract-text', icon: Type, label: 'Extract Text', description: 'Get text content' },
  { id: 'add-watermark', icon: Droplet, label: 'Watermark', description: 'Add text overlay' },
];

// Helper to convert file to base64 in chunks
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const PDFEditor = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [pageRange, setPageRange] = useState("1-5");
  const [rotateAngle, setRotateAngle] = useState(90);
  const [compressionQuality, setCompressionQuality] = useState("medium");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(f => f.type === 'application/pdf');
    const newFiles = pdfFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...newFiles]);
    
    if (pdfFiles.length > 0) {
      toast({ title: "Files added", description: `${pdfFiles.length} PDF file(s) ready` });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    noClick: true,
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processFiles = async () => {
    if (!selectedTool || files.length === 0) {
      toast({ title: "Error", description: "Please select a tool and upload files", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    try {
      // Convert files to base64 using FileReader (no stack overflow)
      const fileData = await Promise.all(files.map(f => fileToBase64(f.file)));

      const options: Record<string, unknown> = {};
      if (selectedTool === 'add-watermark') options.text = watermarkText;
      if (selectedTool === 'split') options.pageRanges = pageRange;
      if (selectedTool === 'rotate') options.angle = rotateAngle;
      if (selectedTool === 'compress') options.quality = compressionQuality;

      const { data, error } = await supabase.functions.invoke('pdf-edit', {
        body: { action: selectedTool, files: fileData, options }
      });

      if (error) throw error;

      toast({ title: "Success!", description: data.message });

      // If there's file data to download
      if (data.data && data.fileName) {
        const binaryString = atob(data.data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.fileName;
        a.click();
        URL.revokeObjectURL(url);
      }

      // If it's text extraction, show the text in a better way
      if (data.text) {
        toast({ 
          title: "Text Extracted", 
          description: data.text.substring(0, 200) + (data.text.length > 200 ? '...' : '')
        });
      }

    } catch (error: unknown) {
      console.error('Error:', error);
      const message = error instanceof Error ? error.message : 'Processing failed';
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Free PDF Editor Online | Merge, Split, Compress PDF - TransformFiles</title>
        <meta name="description" content="Edit PDF files online for free. Merge, split, compress, rotate PDFs. Add watermarks and extract text. No registration required." />
        <link rel="canonical" href="https://transformfiles.app/pdf-editor" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero */}
          <section className="relative gradient-hero py-12 md:py-16">
            <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Free PDF Editor</span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Edit Your <span className="text-gradient">PDF Files</span> Online
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8">
                  Merge, split, compress, rotate PDFs and more. All tools free, no registration.
                </p>
              </div>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="py-8 md:py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 max-w-4xl mx-auto mb-8 md:mb-12">
                {pdfTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`glass rounded-xl p-3 md:p-4 text-center transition-all duration-300 ${
                      selectedTool === tool.id 
                        ? 'ring-2 ring-primary glow-teal' 
                        : 'hover:bg-card/50'
                    }`}
                  >
                    <tool.icon className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2 ${
                      selectedTool === tool.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <p className="font-medium text-foreground text-xs md:text-sm">{tool.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 hidden md:block">{tool.description}</p>
                  </button>
                ))}
              </div>

              {/* Upload Zone */}
              <div {...getRootProps()} className="max-w-3xl mx-auto">
                <input {...getInputProps()} />
                <div className={`rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}>
                  <div className="p-6 md:p-8 text-center">
                    <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      isDragActive ? 'gradient-teal' : 'bg-secondary'
                    }`}>
                      <Upload className={`w-7 h-7 md:w-8 md:h-8 ${isDragActive ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                      {isDragActive ? 'Drop your PDFs here!' : 'Upload PDF Files'}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm md:text-base">Drag & drop or click to browse</p>
                    <Button variant="hero" onClick={open} size="lg">
                      Choose Files <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="max-w-3xl mx-auto mt-6 md:mt-8 space-y-3">
                  {files.map((f, index) => (
                    <div key={index} className="glass rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate text-sm md:text-base">{f.file.name}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          {(f.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button onClick={() => removeFile(index)} className="text-muted-foreground hover:text-destructive p-2">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Tool Options */}
              {selectedTool && files.length > 0 && (
                <div className="max-w-3xl mx-auto mt-6 md:mt-8 glass rounded-xl p-4 md:p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Options
                  </h3>
                  
                  {selectedTool === 'add-watermark' && (
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Watermark Text</label>
                      <input
                        type="text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground"
                      />
                    </div>
                  )}
                  
                  {selectedTool === 'split' && (
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Page Range (e.g., 1-5, 7, 10-12)</label>
                      <input
                        type="text"
                        value={pageRange}
                        onChange={(e) => setPageRange(e.target.value)}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground"
                      />
                    </div>
                  )}
                  
                  {selectedTool === 'rotate' && (
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Rotation Angle</label>
                      <select
                        value={rotateAngle}
                        onChange={(e) => setRotateAngle(Number(e.target.value))}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground"
                      >
                        <option value={90}>90° Clockwise</option>
                        <option value={180}>180°</option>
                        <option value={270}>270° Clockwise</option>
                      </select>
                    </div>
                  )}
                  
                  {selectedTool === 'compress' && (
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Compression Quality</label>
                      <select
                        value={compressionQuality}
                        onChange={(e) => setCompressionQuality(e.target.value)}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground"
                      >
                        <option value="high">High Quality (Larger Size)</option>
                        <option value="medium">Medium Quality</option>
                        <option value="low">Low Quality (Smaller Size)</option>
                      </select>
                    </div>
                  )}

                  {(selectedTool === 'merge' || selectedTool === 'extract-text') && (
                    <p className="text-muted-foreground text-sm">
                      {selectedTool === 'merge' 
                        ? 'All uploaded PDFs will be merged into a single file.'
                        : 'Text content will be extracted from your PDF.'}
                    </p>
                  )}

                  <Button
                    variant="teal"
                    size="lg"
                    className="w-full mt-6"
                    onClick={processFiles}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Process & Download
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default PDFEditor;
