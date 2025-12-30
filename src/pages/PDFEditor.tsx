import { useState, useCallback, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import { PDFDocument, degrees, rgb, StandardFonts } from "pdf-lib";
import { Canvas as FabricCanvas, Rect, Circle, IText, Line, FabricImage } from "fabric";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { 
  FileText, Upload, Merge, Scissors, Minimize2, 
  RotateCw, Type, Droplet, Download, Loader2, X,
  ArrowRight, Eye, ChevronLeft, ChevronRight,
  Square, Circle as CircleIcon, Pencil, Eraser,
  Image, Undo, Redo, ZoomIn, ZoomOut, Trash2,
  Move, MousePointer, PenTool
} from "lucide-react";

interface PDFFile {
  file: File;
  preview: string;
  pageCount?: number;
  arrayBuffer?: ArrayBuffer;
}

const pdfTools = [
  { id: 'edit', icon: Pencil, label: 'Edit PDF', description: 'Draw & annotate' },
  { id: 'merge', icon: Merge, label: 'Merge PDF', description: 'Combine PDFs' },
  { id: 'split', icon: Scissors, label: 'Split PDF', description: 'Extract pages' },
  { id: 'compress', icon: Minimize2, label: 'Compress', description: 'Reduce size' },
  { id: 'rotate', icon: RotateCw, label: 'Rotate', description: 'Rotate pages' },
  { id: 'add-watermark', icon: Droplet, label: 'Watermark', description: 'Add overlay' },
];

const editTools = [
  { id: 'select', icon: MousePointer, label: 'Select' },
  { id: 'text', icon: Type, label: 'Add Text' },
  { id: 'draw', icon: PenTool, label: 'Draw' },
  { id: 'rectangle', icon: Square, label: 'Rectangle' },
  { id: 'circle', icon: CircleIcon, label: 'Circle' },
  { id: 'line', icon: Pencil, label: 'Line' },
  { id: 'eraser', icon: Eraser, label: 'Eraser' },
];

const PDFEditor = () => {
  const { t, language } = useLanguage();
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [selectedTool, setSelectedTool] = useState<string>('edit');
  const [editTool, setEditTool] = useState<string>('select');
  const [isProcessing, setIsProcessing] = useState(false);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [pageRange, setPageRange] = useState("1-5");
  const [rotateAngle, setRotateAngle] = useState(90);
  const [previewPage, setPreviewPage] = useState(0);
  const [brushColor, setBrushColor] = useState("#00d4aa");
  const [brushSize, setBrushSize] = useState(3);
  const [textContent, setTextContent] = useState("Your text here");
  const [zoom, setZoom] = useState(100);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  // Initialize Fabric.js canvas when edit mode is active
  useEffect(() => {
    if (selectedTool === 'edit' && canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new FabricCanvas(canvasRef.current, {
        width: 600,
        height: 800,
        backgroundColor: '#ffffff',
        selection: true,
      });
      
      canvas.freeDrawingBrush.color = brushColor;
      canvas.freeDrawingBrush.width = brushSize;
      
      fabricCanvasRef.current = canvas;
      toast({ title: "Canvas Ready", description: "Start editing your PDF!" });
    }
    
    return () => {
      if (fabricCanvasRef.current && selectedTool !== 'edit') {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [selectedTool]);

  // Update brush settings
  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.freeDrawingBrush.color = brushColor;
      fabricCanvasRef.current.freeDrawingBrush.width = brushSize;
    }
  }, [brushColor, brushSize]);

  // Handle edit tool changes
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    canvas.isDrawingMode = editTool === 'draw';
    
    if (editTool === 'eraser') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = '#ffffff';
      canvas.freeDrawingBrush.width = brushSize * 3;
    } else if (editTool === 'draw') {
      canvas.freeDrawingBrush.color = brushColor;
      canvas.freeDrawingBrush.width = brushSize;
    }
  }, [editTool, brushColor, brushSize]);

  const addShape = (type: string) => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    let shape;
    
    switch (type) {
      case 'rectangle':
        shape = new Rect({
          left: 100,
          top: 100,
          fill: brushColor,
          width: 150,
          height: 100,
          opacity: 0.8,
        });
        break;
      case 'circle':
        shape = new Circle({
          left: 100,
          top: 100,
          fill: brushColor,
          radius: 50,
          opacity: 0.8,
        });
        break;
      case 'line':
        shape = new Line([50, 50, 200, 50], {
          stroke: brushColor,
          strokeWidth: brushSize,
        });
        break;
      case 'text':
        shape = new IText(textContent, {
          left: 100,
          top: 100,
          fontSize: 24,
          fill: brushColor,
          fontFamily: 'Arial',
        });
        break;
    }
    
    if (shape) {
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
    }
  };

  const handleEditToolClick = (tool: string) => {
    setEditTool(tool);
    if (['rectangle', 'circle', 'line', 'text'].includes(tool)) {
      addShape(tool);
      setEditTool('select');
    }
  };

  const clearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      fabricCanvasRef.current.backgroundColor = '#ffffff';
      fabricCanvasRef.current.renderAll();
    }
  };

  const deleteSelected = () => {
    if (fabricCanvasRef.current) {
      const activeObjects = fabricCanvasRef.current.getActiveObjects();
      activeObjects.forEach(obj => fabricCanvasRef.current?.remove(obj));
      fabricCanvasRef.current.discardActiveObject();
      fabricCanvasRef.current.renderAll();
    }
  };

  const downloadCanvas = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({ multiplier: 1, format: 'png', quality: 1 });
      const link = document.createElement('a');
      link.download = 'edited-document.png';
      link.href = dataURL;
      link.click();
      toast({ title: "Downloaded!", description: "Your edited document has been saved." });
    }
  };

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
      toast({ title: "Files added", description: `${pdfFiles.length} PDF file(s) ready` });
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
    const arrayBuffer = new ArrayBuffer(pdfBytes.length);
    const uint8View = new Uint8Array(arrayBuffer);
    uint8View.set(pdfBytes);
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const processFiles = async () => {
    if (!selectedTool || (selectedTool !== 'edit' && files.length === 0)) {
      toast({ title: "Error", description: "Please select a tool and upload files", variant: "destructive" });
      return;
    }

    if (selectedTool === 'edit') {
      downloadCanvas();
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
          
          pdf.setTitle('');
          pdf.setAuthor('');
          pdf.setSubject('');
          pdf.setKeywords([]);
          pdf.setProducer('TransformFiles.com');
          pdf.setCreator('TransformFiles.com');
          
          const compressedPdfBytes = await pdf.save({ useObjectStreams: true });
          
          const originalSize = files[0].file.size;
          const newSize = compressedPdfBytes.length;
          const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
          
          downloadPDF(compressedPdfBytes, 'compressed.pdf');
          toast({ 
            title: "Success!", 
            description: `Compressed: ${(originalSize/1024/1024).toFixed(2)}MB → ${(newSize/1024/1024).toFixed(2)}MB (${reduction}% smaller)` 
          });
          break;
        }
        
        case 'add-watermark': {
          if (!files[0]?.arrayBuffer) throw new Error('No file to watermark');
          const pdf = await PDFDocument.load(files[0].arrayBuffer);
          const pages = pdf.getPages();
          const font = await pdf.embedFont(StandardFonts.Helvetica);
          
          for (const page of pages) {
            const { width, height } = page.getSize();
            const textWidth = font.widthOfTextAtSize(watermarkText, 50);
            
            page.drawText(watermarkText, {
              x: (width - textWidth) / 2,
              y: height / 2,
              size: 50,
              font: font,
              color: rgb(0.7, 0.7, 0.7),
              opacity: 0.3,
              rotate: degrees(45),
            });
          }
          
          const watermarkedPdfBytes = await pdf.save();
          downloadPDF(watermarkedPdfBytes, 'watermarked.pdf');
          toast({ title: "Success!", description: `Added watermark to ${pages.length} pages` });
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
    ? 'https://transformfiles.com/pdf-editor' 
    : `https://transformfiles.com/${language}/pdf-editor`;

  return (
    <>
      <Helmet>
        <title>Free PDF Editor Online | Edit, Merge, Compress PDF - TransformFiles</title>
        <meta name="description" content="Edit PDF files online for free. Add text, draw, annotate, merge, split, compress PDFs. Full editing capabilities with no registration required." />
        <link rel="canonical" href={canonicalUrl} />
        <html lang={language} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero */}
          <section className="relative gradient-hero py-8 md:py-12">
            <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{t.nav.pdfEditor}</span>
                </div>
                <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                  Full <span className="text-gradient">PDF Editor</span> Online
                </h1>
                <p className="text-sm md:text-lg text-muted-foreground">
                  Edit, annotate, merge, split, and compress PDFs. All tools free.
                </p>
              </div>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="py-6 md:py-8 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 max-w-4xl mx-auto mb-6">
                {pdfTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`glass rounded-xl p-3 text-center transition-all duration-300 ${
                      selectedTool === tool.id 
                        ? 'ring-2 ring-primary glow-teal' 
                        : 'hover:bg-card/50'
                    }`}
                  >
                    <tool.icon className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 ${
                      selectedTool === tool.id ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <p className="font-medium text-foreground text-xs">{tool.label}</p>
                  </button>
                ))}
              </div>

              {/* Edit Mode Canvas */}
              {selectedTool === 'edit' && (
                <div className="max-w-5xl mx-auto">
                  {/* Edit Toolbar */}
                  <div className="glass rounded-xl p-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Tool buttons */}
                      <div className="flex gap-1 border-r border-border pr-3">
                        {editTools.map((tool) => (
                          <button
                            key={tool.id}
                            onClick={() => handleEditToolClick(tool.id)}
                            className={`p-2 rounded-lg transition-all ${
                              editTool === tool.id ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                            }`}
                            title={tool.label}
                          >
                            <tool.icon className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                      
                      {/* Color picker */}
                      <div className="flex items-center gap-2 border-r border-border pr-3">
                        <input
                          type="color"
                          value={brushColor}
                          onChange={(e) => setBrushColor(e.target.value)}
                          className="w-8 h-8 rounded cursor-pointer"
                        />
                        <div className="flex gap-1">
                          {['#00d4aa', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#000000'].map(color => (
                            <button
                              key={color}
                              onClick={() => setBrushColor(color)}
                              className={`w-6 h-6 rounded-full border-2 ${brushColor === color ? 'border-foreground' : 'border-transparent'}`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Brush size */}
                      <div className="flex items-center gap-2 border-r border-border pr-3 min-w-[120px]">
                        <span className="text-xs text-muted-foreground">Size:</span>
                        <Slider
                          value={[brushSize]}
                          onValueChange={(v) => setBrushSize(v[0])}
                          min={1}
                          max={20}
                          step={1}
                          className="w-20"
                        />
                        <span className="text-xs text-foreground w-4">{brushSize}</span>
                      </div>
                      
                      {/* Text input for text tool */}
                      <div className="flex items-center gap-2 border-r border-border pr-3">
                        <Input
                          value={textContent}
                          onChange={(e) => setTextContent(e.target.value)}
                          placeholder="Text content"
                          className="w-32 h-8 text-xs"
                        />
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-1">
                        <button onClick={deleteSelected} className="p-2 rounded-lg hover:bg-secondary" title="Delete selected">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button onClick={clearCanvas} className="p-2 rounded-lg hover:bg-secondary" title="Clear all">
                          <Eraser className="w-4 h-4" />
                        </button>
                        <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-2 rounded-lg hover:bg-secondary" title="Zoom in">
                          <ZoomIn className="w-4 h-4" />
                        </button>
                        <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-2 rounded-lg hover:bg-secondary" title="Zoom out">
                          <ZoomOut className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Canvas Area */}
                  <div className="glass rounded-xl p-4 overflow-auto" style={{ maxHeight: '600px' }}>
                    <div className="flex justify-center" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                      <canvas ref={canvasRef} className="border border-border rounded-lg shadow-lg" />
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="flex justify-center mt-4">
                    <Button variant="hero" size="lg" onClick={downloadCanvas}>
                      <Download className="w-5 h-5 mr-2" />
                      Download Edited Document
                    </Button>
                  </div>
                </div>
              )}

              {/* Upload Zone for other tools */}
              {selectedTool !== 'edit' && (
                <>
                  <div {...getRootProps()} className="max-w-3xl mx-auto">
                    <input {...getInputProps()} />
                    <div className={`rounded-2xl border-2 border-dashed transition-all duration-300 ${
                      isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}>
                      <div className="p-6 md:p-8 text-center">
                        <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                          isDragActive ? 'gradient-teal' : 'bg-secondary'
                        }`}>
                          <Upload className={`w-7 h-7 ${isDragActive ? 'text-primary-foreground' : 'text-primary'}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {isDragActive ? 'Drop your PDFs here!' : 'Upload PDF Files'}
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm">{t.hero.orBrowse}</p>
                        <Button variant="hero" onClick={open}>
                          Choose Files <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="max-w-4xl mx-auto mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-muted-foreground">Files ({files.length})</h3>
                          {files.map((f, index) => (
                            <div 
                              key={index} 
                              className={`glass rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${
                                previewPage === index ? 'ring-2 ring-primary' : 'hover:bg-card/50'
                              }`}
                              onClick={() => setPreviewPage(index)}
                            >
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate text-sm">{f.file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(f.file.size / 1024 / 1024).toFixed(2)} MB • {f.pageCount || '?'} pages
                                </p>
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); removeFile(index); }} className="text-muted-foreground hover:text-destructive p-2">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="glass rounded-xl p-3 min-h-[250px]">
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Preview</h3>
                          {files[previewPage] && (
                            <div className="h-full flex flex-col">
                              <div className="flex-1 bg-secondary rounded-lg overflow-hidden">
                                <iframe src={files[previewPage].preview} className="w-full h-full min-h-[200px]" title="Preview" />
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <Button variant="outline" size="sm" onClick={() => setPreviewPage(Math.max(0, previewPage - 1))} disabled={previewPage === 0}>
                                  <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <span className="text-xs text-muted-foreground">{previewPage + 1} / {files.length}</span>
                                <Button variant="outline" size="sm" onClick={() => setPreviewPage(Math.min(files.length - 1, previewPage + 1))} disabled={previewPage === files.length - 1}>
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
                  {files.length > 0 && (
                    <div className="max-w-xl mx-auto mt-6 glass rounded-xl p-4">
                      {selectedTool === 'split' && (
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">Page Range (e.g., 1-5, 7, 10-12)</label>
                          <Input value={pageRange} onChange={(e) => setPageRange(e.target.value)} placeholder="1-5" />
                        </div>
                      )}
                      {selectedTool === 'rotate' && (
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">Rotation Angle</label>
                          <div className="flex gap-2">
                            {[90, 180, 270].map(angle => (
                              <Button key={angle} variant={rotateAngle === angle ? 'default' : 'outline'} onClick={() => setRotateAngle(angle)}>
                                {angle}°
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedTool === 'add-watermark' && (
                        <div>
                          <label className="text-sm text-muted-foreground mb-2 block">Watermark Text</label>
                          <Input value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} placeholder="CONFIDENTIAL" />
                        </div>
                      )}

                      <Button variant="hero" size="lg" className="w-full mt-4" onClick={processFiles} disabled={isProcessing}>
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
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
                </>
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
