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
  ArrowRight
} from "lucide-react";

interface PDFFile {
  file: File;
  preview: string;
}

const pdfTools = [
  { id: 'merge', icon: Merge, label: 'Merge PDF', description: 'Combine multiple PDFs into one' },
  { id: 'split', icon: Scissors, label: 'Split PDF', description: 'Extract pages from PDF' },
  { id: 'compress', icon: Minimize2, label: 'Compress PDF', description: 'Reduce file size' },
  { id: 'rotate', icon: RotateCw, label: 'Rotate PDF', description: 'Rotate pages' },
  { id: 'extract-text', icon: Type, label: 'Extract Text', description: 'Get text from PDF' },
  { id: 'add-watermark', icon: Droplet, label: 'Add Watermark', description: 'Add text watermark' },
];

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
      // Convert files to base64
      const fileData = await Promise.all(
        files.map(async (f) => {
          const buffer = await f.file.arrayBuffer();
          const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
          return base64;
        })
      );

      const options: Record<string, any> = {};
      if (selectedTool === 'add-watermark') options.text = watermarkText;
      if (selectedTool === 'split') options.pageRanges = pageRange;
      if (selectedTool === 'rotate') options.angle = rotateAngle;
      if (selectedTool === 'compress') options.quality = compressionQuality;

      const { data, error } = await supabase.functions.invoke('pdf-edit', {
        body: { action: selectedTool, files: fileData, options }
      });

      if (error) throw error;

      toast({ title: "Success", description: data.message });

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

      // If it's text extraction, show the text
      if (data.text) {
        toast({ title: "Extracted Text", description: data.text });
      }

    } catch (error: any) {
      console.error('Error:', error);
      toast({ title: "Error", description: error.message || "Processing failed", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Free PDF Editor Online | Merge, Split, Compress PDF - ConvertFlow</title>
        <meta name="description" content="Edit PDF files online for free. Merge, split, compress, rotate PDFs. Add watermarks and extract text. No registration required." />
        <link rel="canonical" href="https://convertflow.com/pdf-editor" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero */}
          <section className="relative gradient-hero py-16">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Free PDF Editor</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Edit Your <span className="text-gradient">PDF Files</span> Online
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Merge, split, compress, rotate PDFs and more. All tools free, no registration.
                </p>
              </div>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto mb-12">
                {pdfTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`glass rounded-xl p-4 text-center transition-all duration-300 ${
                      selectedTool === tool.id 
                        ? 'ring-2 ring-primary glow-teal' 
                        : 'hover:bg-card/50'
                    }`}
                  >
                    <tool.icon className={`w-8 h-8 mx-auto mb-2 ${
                      selectedTool === tool.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <p className="font-medium text-foreground text-sm">{tool.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
                  </button>
                ))}
              </div>

              {/* Upload Zone */}
              <div {...getRootProps()} className="max-w-3xl mx-auto">
                <input {...getInputProps()} />
                <div className={`rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                }`}>
                  <div className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      isDragActive ? 'gradient-teal' : 'bg-secondary'
                    }`}>
                      <Upload className={`w-8 h-8 ${isDragActive ? 'text-primary-foreground' : 'text-primary'}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {isDragActive ? 'Drop your PDFs here!' : 'Upload PDF Files'}
                    </h3>
                    <p className="text-muted-foreground mb-4">Drag & drop or click to browse</p>
                    <Button variant="hero" onClick={open}>
                      Choose Files <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="max-w-3xl mx-auto mt-8 space-y-3">
                  {files.map((f, index) => (
                    <div key={index} className="glass rounded-xl p-4 flex items-center gap-4">
                      <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{f.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(f.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button onClick={() => removeFile(index)} className="text-muted-foreground hover:text-destructive">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Tool Options */}
              {selectedTool && files.length > 0 && (
                <div className="max-w-3xl mx-auto mt-8 glass rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-4">Options</h3>
                  
                  {selectedTool === 'add-watermark' && (
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Watermark Text</label>
                      <input
                        type="text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground"
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
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground"
                      />
                    </div>
                  )}
                  
                  {selectedTool === 'rotate' && (
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Rotation Angle</label>
                      <select
                        value={rotateAngle}
                        onChange={(e) => setRotateAngle(Number(e.target.value))}
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground"
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
                        className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground"
                      >
                        <option value="high">High Quality (Larger Size)</option>
                        <option value="medium">Medium Quality</option>
                        <option value="low">Low Quality (Smaller Size)</option>
                      </select>
                    </div>
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
