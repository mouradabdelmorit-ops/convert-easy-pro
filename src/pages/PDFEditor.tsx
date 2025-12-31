import { useState, useCallback, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import { PDFDocument, degrees, rgb, StandardFonts } from "pdf-lib";
import { Canvas as FabricCanvas, Rect, Circle, IText, Line } from "fabric";
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
  ArrowRight, ChevronLeft, ChevronRight,
  Square, Circle as CircleIcon, Pencil, Eraser,
  ZoomIn, ZoomOut, Trash2, MousePointer, PenTool
} from "lucide-react";

interface PDFFile {
  file: File;
  preview: string;
  pageCount?: number;
  arrayBuffer?: ArrayBuffer;
}

const pdfTools = [
  { id: 'edit', icon: Pencil, label: 'Edit PDF' },
  { id: 'merge', icon: Merge, label: 'Merge PDF' },
  { id: 'split', icon: Scissors, label: 'Split PDF' },
  { id: 'compress', icon: Minimize2, label: 'Compress' },
  { id: 'rotate', icon: RotateCw, label: 'Rotate' },
  { id: 'add-watermark', icon: Droplet, label: 'Watermark' },
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
  const { t, language, languages } = useLanguage();
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
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfFileName, setPdfFileName] = useState("");
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  const initCanvas = useCallback((width = 612, height = 792) => {
    if (canvasRef.current) {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
      }
      const canvas = new FabricCanvas(canvasRef.current, {
        width, height,
        backgroundColor: '#ffffff',
        selection: true,
      });
      canvas.isDrawingMode = false;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = brushSize;
      }
      fabricCanvasRef.current = canvas;
      return canvas;
    }
    return null;
  }, [brushColor, brushSize]);

  useEffect(() => {
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (fabricCanvasRef.current && fabricCanvasRef.current.freeDrawingBrush) {
      fabricCanvasRef.current.freeDrawingBrush.color = brushColor;
      fabricCanvasRef.current.freeDrawingBrush.width = brushSize;
    }
  }, [brushColor, brushSize]);

  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    canvas.isDrawingMode = editTool === 'draw' || editTool === 'eraser';
    if (canvas.freeDrawingBrush) {
      if (editTool === 'eraser') {
        canvas.freeDrawingBrush.color = '#ffffff';
        canvas.freeDrawingBrush.width = brushSize * 3;
      } else if (editTool === 'draw') {
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = brushSize;
      }
    }
  }, [editTool, brushColor, brushSize]);

  const loadPDFForEditing = useCallback(async (file: File) => {
    try {
      setIsProcessing(true);
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      const firstPage = pdfDoc.getPages()[0];
      const { width, height } = firstPage.getSize();
      
      setTotalPages(pageCount);
      setPdfFileName(file.name);
      setPdfLoaded(true);
      setCurrentPage(1);
      
      // Initialize canvas with PDF page dimensions
      const scale = Math.min(800 / width, 1000 / height, 1.5);
      const canvas = initCanvas(width * scale, height * scale);
      
      if (canvas) {
        // Add a text overlay showing the PDF info
        const infoText = new IText(`PDF: ${file.name}\nPage 1 of ${pageCount}\n\nUse the tools above to add annotations.\nClick shapes/text to add them to the canvas.`, {
          left: 30,
          top: 30,
          fontSize: 16,
          fill: '#666666',
          fontFamily: 'Arial',
          selectable: false,
          evented: false,
        });
        canvas.add(infoText);
        canvas.renderAll();
      }
      
      toast({ title: "PDF Loaded", description: `${file.name} - ${pageCount} page(s). Add annotations using the tools above.` });
    } catch (error) {
      console.error('Error loading PDF:', error);
      toast({ title: "Error", description: "Failed to load PDF", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  }, [initCanvas]);

  const addShape = (type: string) => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    let shape;
    switch (type) {
      case 'rectangle':
        shape = new Rect({ left: 100, top: 100, fill: brushColor, width: 150, height: 100, opacity: 0.8 });
        break;
      case 'circle':
        shape = new Circle({ left: 100, top: 100, fill: brushColor, radius: 50, opacity: 0.8 });
        break;
      case 'line':
        shape = new Line([50, 50, 200, 50], { stroke: brushColor, strokeWidth: brushSize });
        break;
      case 'text':
        shape = new IText(textContent, { left: 100, top: 100, fontSize: 24, fill: brushColor, fontFamily: 'Arial' });
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
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }
    setPdfLoaded(false);
    setTotalPages(0);
    setCurrentPage(1);
    setPdfFileName("");
  };

  const startBlankCanvas = () => {
    const canvas = initCanvas(612, 792);
    if (canvas) {
      setPdfLoaded(true);
      setTotalPages(0);
      toast({ title: "Canvas Ready", description: "Start creating!" });
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
      const dataURL = fabricCanvasRef.current.toDataURL({ multiplier: 2, format: 'png', quality: 1 });
      const link = document.createElement('a');
      link.download = pdfFileName ? `annotated-${pdfFileName.replace('.pdf', '')}.png` : 'edited-document.png';
      link.href = dataURL;
      link.click();
      toast({ title: "Downloaded!", description: "Saved as PNG." });
    }
  };

  const onDropEdit = useCallback(async (acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles.find(f => f.type === 'application/pdf');
    if (pdfFile) await loadPDFForEditing(pdfFile);
  }, [loadPDFForEditing]);

  const { getRootProps: getEditRootProps, getInputProps: getEditInputProps, isDragActive: isEditDragActive, open: openEdit } = useDropzone({
    onDrop: onDropEdit, accept: { 'application/pdf': ['.pdf'] }, noClick: true, multiple: false,
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const pdfFiles = acceptedFiles.filter(f => f.type === 'application/pdf');
    const newFiles = await Promise.all(pdfFiles.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      let pageCount = 0;
      try {
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        pageCount = pdfDoc.getPageCount();
      } catch (e) { console.error(e); }
      return { file, preview: URL.createObjectURL(file), pageCount, arrayBuffer: arrayBuffer.slice(0) };
    }));
    setFiles(prev => [...prev, ...newFiles]);
    if (pdfFiles.length > 0) toast({ title: "Files added", description: `${pdfFiles.length} PDF(s) ready` });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop, accept: { 'application/pdf': ['.pdf'] }, noClick: true,
  });

  const removeFile = (index: number) => {
    URL.revokeObjectURL(files[index].preview);
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const downloadPDF = (pdfBytes: Uint8Array, fileName: string) => {
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const processFiles = async () => {
    if (!selectedTool || (selectedTool !== 'edit' && files.length === 0)) {
      toast({ title: "Error", description: "Please upload files", variant: "destructive" });
      return;
    }
    if (selectedTool === 'edit') { downloadCanvas(); return; }
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
          downloadPDF(await mergedPdf.save(), 'merged.pdf');
          toast({ title: "Success!", description: `Merged ${files.length} PDFs` });
          break;
        }
        case 'split': {
          if (!files[0]?.arrayBuffer) throw new Error('No file');
          const pdf = await PDFDocument.load(files[0].arrayBuffer);
          const total = pdf.getPageCount();
          const pagesToExtract: number[] = [];
          pageRange.split(',').forEach(r => {
            if (r.includes('-')) {
              const [s, e] = r.split('-').map(n => parseInt(n.trim()));
              for (let i = Math.max(1, s); i <= Math.min(total, e); i++) pagesToExtract.push(i - 1);
            } else {
              const p = parseInt(r);
              if (p >= 1 && p <= total) pagesToExtract.push(p - 1);
            }
          });
          const splitPdf = await PDFDocument.create();
          const pages = await splitPdf.copyPages(pdf, pagesToExtract);
          pages.forEach(page => splitPdf.addPage(page));
          downloadPDF(await splitPdf.save(), 'split.pdf');
          toast({ title: "Success!", description: `Extracted ${pagesToExtract.length} pages` });
          break;
        }
        case 'rotate': {
          if (!files[0]?.arrayBuffer) throw new Error('No file');
          const pdf = await PDFDocument.load(files[0].arrayBuffer);
          pdf.getPages().forEach(page => page.setRotation(degrees(page.getRotation().angle + rotateAngle)));
          downloadPDF(await pdf.save(), 'rotated.pdf');
          toast({ title: "Success!", description: `Rotated by ${rotateAngle}°` });
          break;
        }
        case 'compress': {
          if (!files[0]?.arrayBuffer) throw new Error('No file');
          const pdf = await PDFDocument.load(files[0].arrayBuffer);
          pdf.setTitle(''); pdf.setAuthor(''); pdf.setSubject(''); pdf.setKeywords([]);
          const compressed = await pdf.save({ useObjectStreams: true });
          const reduction = ((files[0].file.size - compressed.length) / files[0].file.size * 100).toFixed(1);
          downloadPDF(compressed, 'compressed.pdf');
          toast({ title: "Success!", description: `Reduced by ${reduction}%` });
          break;
        }
        case 'add-watermark': {
          if (!files[0]?.arrayBuffer) throw new Error('No file');
          const pdf = await PDFDocument.load(files[0].arrayBuffer);
          const font = await pdf.embedFont(StandardFonts.Helvetica);
          for (const page of pdf.getPages()) {
            const { width, height } = page.getSize();
            page.drawText(watermarkText, {
              x: (width - font.widthOfTextAtSize(watermarkText, 50)) / 2,
              y: height / 2, size: 50, font, color: rgb(0.7, 0.7, 0.7), opacity: 0.3, rotate: degrees(45),
            });
          }
          downloadPDF(await pdf.save(), 'watermarked.pdf');
          toast({ title: "Success!", description: "Watermark added" });
          break;
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed';
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const canonicalUrl = language === 'en' ? 'https://transformfiles.com/pdf-editor' : `https://transformfiles.com/${language}/pdf-editor`;

  return (
    <>
      <Helmet>
        <title>Free PDF Editor Online | Edit, Merge, Compress PDF - TransformFiles</title>
        <meta name="description" content="Edit PDF files online for free. Add text, draw, annotate, merge, split, compress PDFs. No registration required." />
        <link rel="canonical" href={canonicalUrl} />
        {Object.keys(languages).map((lang) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={lang === 'en' ? 'https://transformfiles.com/pdf-editor' : `https://transformfiles.com/${lang}/pdf-editor`} />
        ))}
        <html lang={language} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="relative gradient-hero py-8 md:py-12">
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{t.nav.pdfEditor}</span>
                </div>
                <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                  Full <span className="text-gradient">PDF Editor</span> Online
                </h1>
                <p className="text-sm md:text-lg text-muted-foreground">Edit, annotate, merge, split, and compress PDFs. All tools free.</p>
              </div>
            </div>
          </section>

          <section className="py-6 md:py-8 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 max-w-4xl mx-auto mb-6">
                {pdfTools.map((tool) => (
                  <button key={tool.id} onClick={() => setSelectedTool(tool.id)}
                    className={`glass rounded-xl p-3 text-center transition-all duration-300 ${selectedTool === tool.id ? 'ring-2 ring-primary glow-teal' : 'hover:bg-card/50'}`}>
                    <tool.icon className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-1 ${selectedTool === tool.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <p className="font-medium text-foreground text-xs">{tool.label}</p>
                  </button>
                ))}
              </div>

              {selectedTool === 'edit' && (
                <div className="max-w-5xl mx-auto">
                  {!pdfLoaded && (
                    <div {...getEditRootProps()} className="mb-6">
                      <input {...getEditInputProps()} />
                      <div className={`rounded-2xl border-2 border-dashed transition-all duration-300 ${isEditDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                        <div className="p-8 md:p-12 text-center">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${isEditDragActive ? 'gradient-teal' : 'bg-secondary'}`}>
                            <Upload className={`w-8 h-8 ${isEditDragActive ? 'text-primary-foreground' : 'text-primary'}`} />
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">{isEditDragActive ? 'Drop your PDF here!' : 'Upload PDF to Edit'}</h3>
                          <p className="text-muted-foreground mb-4">Drag & drop your PDF file here or click to browse</p>
                          <Button variant="hero" size="lg" onClick={openEdit} disabled={isProcessing}>
                            {isProcessing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Loading...</> : <>Choose PDF File <ArrowRight className="w-5 h-5 ml-2" /></>}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {pdfLoaded && (
                    <>
                      <div className="glass rounded-xl p-3 mb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex gap-1 border-r border-border pr-3">
                            {editTools.map((tool) => (
                              <button key={tool.id} onClick={() => handleEditToolClick(tool.id)} title={tool.label}
                                className={`p-2 rounded-lg transition-all ${editTool === tool.id ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}>
                                <tool.icon className="w-4 h-4" />
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 border-r border-border pr-3">
                            <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                            <div className="flex gap-1">
                              {['#00d4aa', '#ff6b6b', '#4ecdc4', '#45b7d1', '#000000'].map(color => (
                                <button key={color} onClick={() => setBrushColor(color)} className={`w-6 h-6 rounded-full border-2 ${brushColor === color ? 'border-foreground' : 'border-transparent'}`} style={{ backgroundColor: color }} />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 border-r border-border pr-3 min-w-[120px]">
                            <span className="text-xs text-muted-foreground">Size:</span>
                            <Slider value={[brushSize]} onValueChange={(v) => setBrushSize(v[0])} min={1} max={20} step={1} className="w-20" />
                          </div>
                          <div className="flex items-center gap-2 border-r border-border pr-3">
                            <Input value={textContent} onChange={(e) => setTextContent(e.target.value)} placeholder="Text" className="w-32 h-8 text-xs" />
                          </div>
                          {totalPages > 1 && (
                            <div className="flex items-center gap-2 border-r border-border pr-3">
                              <button disabled={currentPage <= 1} className="p-1 rounded hover:bg-secondary disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
                              <span className="text-xs text-muted-foreground">{currentPage} / {totalPages}</span>
                              <button disabled={currentPage >= totalPages} className="p-1 rounded hover:bg-secondary disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
                            </div>
                          )}
                          <div className="flex gap-1">
                            <button onClick={deleteSelected} className="p-2 rounded-lg hover:bg-secondary" title="Delete"><Trash2 className="w-4 h-4" /></button>
                            <button onClick={clearCanvas} className="p-2 rounded-lg hover:bg-secondary" title="Clear"><X className="w-4 h-4" /></button>
                            <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-2 rounded-lg hover:bg-secondary"><ZoomIn className="w-4 h-4" /></button>
                            <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-2 rounded-lg hover:bg-secondary"><ZoomOut className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </div>
                      <div className="glass rounded-xl p-4 overflow-auto" style={{ maxHeight: '600px' }}>
                        <div className="flex justify-center" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                          <canvas ref={canvasRef} className="border border-border rounded-lg shadow-lg" />
                        </div>
                      </div>
                      <div className="flex justify-center mt-4 gap-4">
                        <Button variant="outline" onClick={clearCanvas}><Upload className="w-4 h-4 mr-2" />Upload New</Button>
                        <Button variant="hero" size="lg" onClick={downloadCanvas}><Download className="w-5 h-5 mr-2" />Download as Image</Button>
                      </div>
                    </>
                  )}
                  {!pdfLoaded && !isProcessing && (
                    <div className="text-center mt-4">
                      <p className="text-muted-foreground mb-4">Or start with a blank canvas:</p>
                      <Button variant="outline" onClick={startBlankCanvas}><Pencil className="w-4 h-4 mr-2" />Start Blank Canvas</Button>
                    </div>
                  )}
                </div>
              )}

              {selectedTool !== 'edit' && (
                <>
                  <div {...getRootProps()} className="max-w-3xl mx-auto">
                    <input {...getInputProps()} />
                    <div className={`rounded-2xl border-2 border-dashed transition-all duration-300 ${isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                      <div className="p-6 md:p-8 text-center">
                        <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${isDragActive ? 'gradient-teal' : 'bg-secondary'}`}>
                          <Upload className={`w-7 h-7 ${isDragActive ? 'text-primary-foreground' : 'text-primary'}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{isDragActive ? 'Drop PDFs here!' : 'Upload PDF Files'}</h3>
                        <p className="text-muted-foreground mb-4 text-sm">{t.hero.orBrowse}</p>
                        <Button variant="hero" onClick={open}>Choose Files <ArrowRight className="w-4 h-4 ml-2" /></Button>
                      </div>
                    </div>
                  </div>
                  {files.length > 0 && (
                    <div className="max-w-4xl mx-auto mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-muted-foreground">Files ({files.length})</h3>
                          {files.map((f, index) => (
                            <div key={index} className={`glass rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all ${previewPage === index ? 'ring-2 ring-primary' : 'hover:bg-card/50'}`} onClick={() => setPreviewPage(index)}>
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><FileText className="w-5 h-5 text-primary" /></div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate text-sm">{f.file.name}</p>
                                <p className="text-xs text-muted-foreground">{(f.file.size / 1024 / 1024).toFixed(2)} MB • {f.pageCount || '?'} pages</p>
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); removeFile(index); }} className="text-muted-foreground hover:text-destructive p-2"><X className="w-4 h-4" /></button>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-4">
                          {selectedTool === 'split' && (
                            <div className="glass rounded-xl p-4">
                              <h3 className="text-sm font-medium text-foreground mb-2">Page Range</h3>
                              <Input value={pageRange} onChange={(e) => setPageRange(e.target.value)} placeholder="e.g., 1-5, 8" className="mb-2" />
                              <p className="text-xs text-muted-foreground">Total: {files[0]?.pageCount || 0} pages</p>
                            </div>
                          )}
                          {selectedTool === 'rotate' && (
                            <div className="glass rounded-xl p-4">
                              <h3 className="text-sm font-medium text-foreground mb-3">Rotation</h3>
                              <div className="flex gap-2">
                                {[90, 180, 270].map(angle => (
                                  <button key={angle} onClick={() => setRotateAngle(angle)} className={`px-4 py-2 rounded-lg transition-all ${rotateAngle === angle ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}>{angle}°</button>
                                ))}
                              </div>
                            </div>
                          )}
                          {selectedTool === 'add-watermark' && (
                            <div className="glass rounded-xl p-4">
                              <h3 className="text-sm font-medium text-foreground mb-2">Watermark</h3>
                              <Input value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} placeholder="Watermark text" />
                            </div>
                          )}
                          <Button variant="hero" size="lg" className="w-full" onClick={processFiles} disabled={isProcessing}>
                            {isProcessing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Processing...</> : <><Download className="w-5 h-5 mr-2" />{selectedTool === 'merge' && 'Merge PDFs'}{selectedTool === 'split' && 'Split PDF'}{selectedTool === 'compress' && 'Compress PDF'}{selectedTool === 'rotate' && 'Rotate PDF'}{selectedTool === 'add-watermark' && 'Add Watermark'}</>}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground mb-8">Why Use Our PDF Editor?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="glass rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-teal flex items-center justify-center"><Pencil className="w-6 h-6 text-primary-foreground" /></div>
                  <h3 className="font-semibold text-foreground mb-2">Full Editing</h3>
                  <p className="text-sm text-muted-foreground">Add text, draw, shapes on your PDFs</p>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-teal flex items-center justify-center"><Minimize2 className="w-6 h-6 text-primary-foreground" /></div>
                  <h3 className="font-semibold text-foreground mb-2">Compress & Optimize</h3>
                  <p className="text-sm text-muted-foreground">Reduce file size while maintaining quality</p>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-teal flex items-center justify-center"><Merge className="w-6 h-6 text-primary-foreground" /></div>
                  <h3 className="font-semibold text-foreground mb-2">Merge & Split</h3>
                  <p className="text-sm text-muted-foreground">Combine PDFs or extract pages</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PDFEditor;
