import { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import { PDFDocument, degrees } from "pdf-lib";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { 
  FileText, Upload, Merge, Scissors, Minimize2, 
  RotateCw, Type, Droplet, Download, Loader2, X,
  ArrowRight, CheckCircle, Eye, ChevronLeft, ChevronRight
} from "lucide-react";

interface PDFFile {
  file: File;
  preview: string;
  pageCount?: number;
  arrayBuffer?: ArrayBuffer;
}

const pdfTools = [
  { id: 'merge', icon: Merge, label: 'Merge PDF', description: 'Combine multiple PDFs' },
  { id: 'split', icon: Scissors, label: 'Split PDF', description: 'Extract pages' },
  { id: 'compress', icon: Minimize2, label: 'Compress', description: 'Reduce file size' },
  { id: 'rotate', icon: RotateCw, label: 'Rotate', description: 'Rotate pages' },
  { id: 'extract-text', icon: Type, label: 'Extract Text', description: 'Get text content' },
  { id: 'add-watermark', icon: Droplet, label: 'Watermark', description: 'Add text overlay' },
];

const PDFEditor = () => {
  const { t, language } = useLanguage();
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [pageRange, setPageRange] = useState("1-5");
  const [rotateAngle, setRotateAngle] = useState(90);
  const [compressionQuality, setCompressionQuality] = useState("medium");
  const [previewPage, setPreviewPage] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(f => f.type === 'application/pdf');
    
    const newFiles = await Promise.all(pdfFiles.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      let pageCount = 0;
      
      try {
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        pageCount = pdfDoc.getPageCount();
      } catch (e) {
        console.error('Error loading PDF:', e);
      }
      
      return {
        file,
        preview: URL.createObjectURL(file),
        pageCount,
        arrayBuffer: arrayBuffer.slice(0)
      };
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    if (pdfFiles.length > 0) {
      toast({ title: "Files added", description: `${pdfFiles.length} PDF file(s) ready with ${newFiles.reduce((acc, f) => acc + (f.pageCount || 0), 0)} total pages` });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    noClick: true,
  });

  const removeFile = (index: number) => {
    URL.revokeObjectURL(files[index].preview);
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const downloadPDF = (pdfBytes: Uint8Array, fileName: string) => {
    const blob = new Blob([pdfBytes.buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const processFiles = async () => {
    if (!selectedTool || files.length === 0) {
      toast({ title: "Error", description: "Please select a tool and upload files", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    try {
      switch (selectedTool) {
        case 'merge': {
          const mergedPdf = await PDFDocument.create();
          
          for (const pdfFile of files) {
            if (!pdfFile.arrayBuffer) continue;
            const pdf = await PDFDocument.load(pdfFile.arrayBuffer);
            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            pages.forEach(page => mergedPdf.addPage(page));
          }
          
          const mergedPdfBytes = await mergedPdf.save();
          downloadPDF(mergedPdfBytes, 'merged.pdf');
          toast({ title: "Success!", description: `Merged ${files.length} PDFs successfully` });
          break;
        }
        
        case 'split': {
          if (!files[0]?.arrayBuffer) throw new Error('No file to split');
          const pdf = await PDFDocument.load(files[0].arrayBuffer);
          const totalPages = pdf.getPageCount();
          
          // Parse page range (e.g., "1-5, 7, 10-12")
          const ranges = pageRange.split(',').map(r => r.trim());
          const pagesToExtract: number[] = [];
          
          for (const range of ranges) {
            if (range.includes('-')) {
              const [start, end] = range.split('-').map(n => parseInt(n.trim()));
              for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
                pagesToExtract.push(i - 1);
              }
            } else {
              const page = parseInt(range);
              if (page >= 1 && page <= totalPages) {
                pagesToExtract.push(page - 1);
              }
            }
          }
          
          const splitPdf = await PDFDocument.create();
          const pages = await splitPdf.copyPages(pdf, pagesToExtract);
          pages.forEach(page => splitPdf.addPage(page));
          
          const splitPdfBytes = await splitPdf.save();
          downloadPDF(splitPdfBytes, 'split.pdf');
          toast({ title: "Success!", description: `Extracted ${pagesToExtract.length} pages` });
          break;
        }
        
        case 'rotate': {
          if (!files[0]?.arrayBuffer) throw new Error('No file to rotate');
          const pdf = await PDFDocument.load(files[0].arrayBuffer);
          const pages = pdf.getPages();
          
          pages.forEach(page => {
            page.setRotation(degrees(page.getRotation().angle + rotateAngle));
          });
          
          const rotatedPdfBytes = await pdf.save();
          downloadPDF(rotatedPdfBytes, 'rotated.pdf');
          toast({ title: "Success!", description: `Rotated all pages by ${rotateAngle}°` });
          break;
        }
        
        case 'compress': {
          if (!files[0]?.arrayBuffer) throw new Error('No file to compress');
          const pdf = await PDFDocument.load(files[0].arrayBuffer);
          
          // Basic compression by removing metadata and optimizing
          pdf.setTitle('');
          pdf.setAuthor('');
          pdf.setSubject('');
          pdf.setKeywords([]);
          pdf.setProducer('TransformFiles.app');
          pdf.setCreator('TransformFiles.app');
          
          const compressedPdfBytes = await pdf.save({ 
            useObjectStreams: true,
          });
          
          const originalSize = files[0].file.size;
          const newSize = compressedPdfBytes.length;
          const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
          
          downloadPDF(compressedPdfBytes, 'compressed.pdf');
          toast({ 
            title: "Success!", 
            description: `Compressed from ${(originalSize/1024/1024).toFixed(2)}MB to ${(newSize/1024/1024).toFixed(2)}MB (${reduction}% reduction)` 
          });
          break;
        }
        
        case 'add-watermark': {
          if (!files[0]?.arrayBuffer) throw new Error('No file to watermark');
          const pdf = await PDFDocument.load(files[0].arrayBuffer);
          const pages = pdf.getPages();
          
          for (const page of pages) {
            const { width, height } = page.getSize();
            page.drawText(watermarkText, {
              x: width / 2 - (watermarkText.length * 10),
              y: height / 2,
              size: 50,
              opacity: 0.3,
              rotate: degrees(45),
            });
          }
          
          const watermarkedPdfBytes = await pdf.save();
          downloadPDF(watermarkedPdfBytes, 'watermarked.pdf');
          toast({ title: "Success!", description: `Added watermark to all ${pages.length} pages` });
          break;
        }
        
        case 'extract-text': {
          toast({ 
            title: "Text Extraction", 
            description: "For text extraction, use a dedicated OCR service. PDF-lib doesn't support text extraction." 
          });
          break;
        }
        
        default:
          throw new Error(`Unknown action: ${selectedTool}`);
      }
    } catch (error: unknown) {
      console.error('Error:', error);
      const message = error instanceof Error ? error.message : 'Processing failed';
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const canonicalUrl = language === 'en' 
    ? 'https://transformfiles.app/pdf-editor' 
    : `https://transformfiles.app/${language}/pdf-editor`;

  return (
    <>
      <Helmet>
        <title>Free PDF Editor Online | Merge, Split, Compress PDF - TransformFiles</title>
        <meta name="description" content="Edit PDF files online for free. Merge, split, compress, rotate PDFs. Add watermarks and extract text. No registration required." />
        <link rel="canonical" href={canonicalUrl} />
        <html lang={language} />
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
                  <span className="text-sm font-medium text-foreground">{t.nav.pdfEditor}</span>
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
                      {isDragActive ? 'Drop your PDFs here!' : t.converter.upload}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm md:text-base">{t.hero.orBrowse}</p>
                    <Button variant="hero" onClick={open} size="lg">
                      Choose Files <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* File List with Preview */}
              {files.length > 0 && (
                <div className="max-w-4xl mx-auto mt-6 md:mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File List */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Uploaded Files ({files.length})
                      </h3>
                      {files.map((f, index) => (
                        <div 
                          key={index} 
                          className={`glass rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4 cursor-pointer transition-all ${
                            previewPage === index ? 'ring-2 ring-primary' : 'hover:bg-card/50'
                          }`}
                          onClick={() => setPreviewPage(index)}
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate text-sm md:text-base">{f.file.name}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {(f.file.size / 1024 / 1024).toFixed(2)} MB • {f.pageCount || '?'} pages
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setPreviewPage(index); }}
                              className="text-muted-foreground hover:text-primary p-2"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); removeFile(index); }} 
                              className="text-muted-foreground hover:text-destructive p-2"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* PDF Preview */}
                    <div className="glass rounded-xl p-4 min-h-[300px] flex flex-col">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Preview
                      </h3>
                      {files[previewPage] && (
                        <div className="flex-1 flex flex-col">
                          <div className="flex-1 bg-secondary rounded-lg overflow-hidden">
                            <iframe 
                              src={files[previewPage].preview}
                              className="w-full h-full min-h-[250px]"
                              title="PDF Preview"
                            />
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPreviewPage(Math.max(0, previewPage - 1))}
                              disabled={previewPage === 0}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="text-sm text-muted-foreground">
                              File {previewPage + 1} of {files.length}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPreviewPage(Math.min(files.length - 1, previewPage + 1))}
                              disabled={previewPage === files.length - 1}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
                      <label className="block text-sm text-muted-foreground mb-2">
                        Page Range (e.g., 1-5, 7, 10-12) - Total: {files[0]?.pageCount || '?'} pages
                      </label>
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
                        ? `All ${files.length} uploaded PDFs will be merged into a single file.`
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
                        {t.converter.converting}
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
