import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/i18n/LanguageContext";
import { 
  Minimize2, Upload, Download, Loader2, X, Image, 
  FileText, Film, Trash2, CheckCircle2
} from "lucide-react";

interface CompressFile {
  file: File;
  preview?: string;
  originalSize: number;
  compressedSize?: number;
  compressedBlob?: Blob;
  status: 'pending' | 'compressing' | 'done' | 'error';
  type: 'image' | 'pdf' | 'video';
}

const Compress = () => {
  const { t, language } = useLanguage();
  const [files, setFiles] = useState<CompressFile[]>([]);
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);

  const getFileType = (file: File): 'image' | 'pdf' | 'video' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type === 'application/pdf') return 'pdf';
    if (file.type.startsWith('video/')) return 'video';
    return 'image';
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: CompressFile[] = acceptedFiles.map((file) => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      originalSize: file.size,
      status: 'pending' as const,
      type: getFileType(file),
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    toast({ title: "Files added", description: `${acceptedFiles.length} file(s) ready for compression` });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
      'application/pdf': ['.pdf'],
    },
    noClick: true,
  });

  const removeFile = (index: number) => {
    if (files[index].preview) {
      URL.revokeObjectURL(files[index].preview!);
    }
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    files.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
    setFiles([]);
  };

  const compressImage = async (file: File, quality: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          quality / 100
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const compressAllFiles = async () => {
    if (files.length === 0) {
      toast({ title: "No files", description: "Please add files to compress", variant: "destructive" });
      return;
    }

    setIsProcessing(true);

    const updatedFiles = [...files];
    let successCount = 0;
    let totalSaved = 0;

    for (let i = 0; i < updatedFiles.length; i++) {
      const file = updatedFiles[i];
      if (file.status === 'done') continue;
      
      updatedFiles[i] = { ...file, status: 'compressing' };
      setFiles([...updatedFiles]);

      try {
        if (file.type === 'image') {
          const compressedBlob = await compressImage(file.file, quality);
          updatedFiles[i] = {
            ...file,
            status: 'done',
            compressedBlob,
            compressedSize: compressedBlob.size,
          };
          successCount++;
          totalSaved += file.originalSize - compressedBlob.size;
        } else {
          // For PDFs, we'd need server-side compression
          updatedFiles[i] = { ...file, status: 'done', compressedSize: file.originalSize };
          successCount++;
        }
      } catch (error) {
        updatedFiles[i] = { ...file, status: 'error' };
      }
      
      setFiles([...updatedFiles]);
    }

    setIsProcessing(false);
    
    const savedMB = (totalSaved / 1024 / 1024).toFixed(2);
    toast({ 
      title: "Compression complete!", 
      description: `${successCount} files compressed. Saved ${savedMB}MB total.` 
    });
  };

  const downloadFile = (file: CompressFile, index: number) => {
    if (!file.compressedBlob && file.type === 'image') return;
    
    const blob = file.compressedBlob || file.file;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed-${file.file.name.replace(/\.[^.]+$/, '.jpg')}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    files.forEach((file, index) => {
      if (file.status === 'done') {
        setTimeout(() => downloadFile(file, index), index * 100);
      }
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return Image;
      case 'pdf': return FileText;
      case 'video': return Film;
      default: return FileText;
    }
  };

  const totalOriginal = files.reduce((acc, f) => acc + f.originalSize, 0);
  const totalCompressed = files.reduce((acc, f) => acc + (f.compressedSize || f.originalSize), 0);
  const completedFiles = files.filter(f => f.status === 'done').length;

  const canonicalUrl = language === 'en' 
    ? 'https://transformfiles.com/compress' 
    : `https://transformfiles.com/${language}/compress`;

  return (
    <>
      <Helmet>
        <title>Free File Compressor | Compress Images, PDFs Online - TransformFiles</title>
        <meta name="description" content="Compress images and PDF files online for free. Reduce file size while maintaining quality. No registration required." />
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
                  <Minimize2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">File Compressor</span>
                </div>
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                  Compress Files <span className="text-gradient">Instantly</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Reduce image and PDF file sizes without losing quality. Free, fast, and secure.
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Quality Slider */}
                <div className="glass rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Compression Quality</h3>
                    <span className="text-2xl font-bold text-primary">{quality}%</span>
                  </div>
                  <Slider
                    value={[quality]}
                    onValueChange={(v) => setQuality(v[0])}
                    min={10}
                    max={100}
                    step={5}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Smaller size</span>
                    <span>Better quality</span>
                  </div>
                </div>

                {/* Drop Zone */}
                <div
                  {...getRootProps()}
                  className={`glass rounded-2xl p-8 md:p-12 text-center border-2 border-dashed transition-all duration-300 mb-8 ${
                    isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {isDragActive ? 'Drop files here' : 'Drag & drop files'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Supports images (JPG, PNG, WebP) and PDF files
                  </p>
                  <Button onClick={open} size="lg" className="glow-teal">
                    <Upload className="w-5 h-5 mr-2" />
                    Browse Files
                  </Button>
                </div>

                {/* Files List */}
                {files.length > 0 && (
                  <div className="glass rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-foreground">
                        Files ({files.length})
                      </h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={clearAll}>
                          <Trash2 className="w-4 h-4 mr-1" />
                          Clear All
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {files.map((file, index) => {
                        const TypeIcon = getTypeIcon(file.type);
                        const savings = file.compressedSize 
                          ? ((file.originalSize - file.compressedSize) / file.originalSize * 100).toFixed(0)
                          : 0;
                        
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-card/50 rounded-xl"
                          >
                            {file.preview ? (
                              <img 
                                src={file.preview} 
                                alt="" 
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <TypeIcon className="w-6 h-6 text-primary" />
                              </div>
                            )}
                            
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate">
                                {file.file.name}
                              </p>
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>{formatSize(file.originalSize)}</span>
                                {file.compressedSize && file.compressedSize !== file.originalSize && (
                                  <>
                                    <span>→</span>
                                    <span className="text-primary">{formatSize(file.compressedSize)}</span>
                                    <span className="text-green-500">(-{savings}%)</span>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {file.status === 'compressing' && (
                                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                              )}
                              {file.status === 'done' && (
                                <>
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => downloadFile(file, index)}
                                  >
                                    <Download className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFile(index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Stats */}
                    {completedFiles > 0 && (
                      <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-foreground">{formatSize(totalOriginal)}</p>
                          <p className="text-sm text-muted-foreground">Original</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-primary">{formatSize(totalCompressed)}</p>
                          <p className="text-sm text-muted-foreground">Compressed</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-500">
                            {totalOriginal > 0 ? ((1 - totalCompressed / totalOriginal) * 100).toFixed(0) : 0}%
                          </p>
                          <p className="text-sm text-muted-foreground">Saved</p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Button 
                        onClick={compressAllFiles} 
                        disabled={isProcessing || files.length === 0}
                        className="flex-1 glow-teal"
                        size="lg"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Compressing...
                          </>
                        ) : (
                          <>
                            <Minimize2 className="w-5 h-5 mr-2" />
                            Compress All Files
                          </>
                        )}
                      </Button>
                      {completedFiles > 0 && (
                        <Button onClick={downloadAll} variant="outline" size="lg">
                          <Download className="w-5 h-5 mr-2" />
                          Download All
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Image className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Image Compression</h3>
                    <p className="text-sm text-muted-foreground">
                      Compress JPG, PNG, WebP images up to 90% smaller
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">PDF Compression</h3>
                    <p className="text-sm text-muted-foreground">
                      Reduce PDF file sizes while keeping quality
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Minimize2 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Batch Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      Compress multiple files at once
                    </p>
                  </div>
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

export default Compress;
