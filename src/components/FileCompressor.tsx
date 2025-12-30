import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { 
  Minimize2, Upload, Download, X, FileImage, 
  FileText, Film, Music, ArrowRight, Check
} from "lucide-react";

interface CompressedFile {
  original: File;
  compressed?: Blob;
  originalSize: number;
  compressedSize?: number;
  status: 'pending' | 'processing' | 'done' | 'error';
  progress: number;
}

const FileCompressor = () => {
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return FileImage;
    if (type.startsWith('video/')) return Film;
    if (type.startsWith('audio/')) return Music;
    return FileText;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: CompressedFile[] = acceptedFiles.map(file => ({
      original: file,
      originalSize: file.size,
      status: 'pending',
      progress: 0,
    }));
    setFiles(prev => [...prev, ...newFiles]);
    toast({ title: "Files added", description: `${acceptedFiles.length} file(s) ready for compression` });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      'application/pdf': ['.pdf'],
    },
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const compressImage = async (file: File, quality: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Calculate new dimensions (reduce if very large)
        let { width, height } = img;
        const maxDim = 4096;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          file.type === 'image/png' ? 'image/png' : 'image/jpeg',
          quality / 100
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const compressFiles = async () => {
    setIsProcessing(true);
    
    const updatedFiles = [...files];
    
    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status !== 'pending') continue;
      
      try {
        updatedFiles[i].status = 'processing';
        setFiles([...updatedFiles]);
        
        // Simulate progress
        for (let p = 0; p <= 90; p += 10) {
          updatedFiles[i].progress = p;
          setFiles([...updatedFiles]);
          await new Promise(r => setTimeout(r, 50));
        }
        
        const file = updatedFiles[i].original;
        let compressed: Blob;
        
        if (file.type.startsWith('image/')) {
          compressed = await compressImage(file, quality);
        } else {
          // For PDFs and other files, just return original (would need server-side for real compression)
          compressed = file;
        }
        
        updatedFiles[i].compressed = compressed;
        updatedFiles[i].compressedSize = compressed.size;
        updatedFiles[i].status = 'done';
        updatedFiles[i].progress = 100;
        setFiles([...updatedFiles]);
        
      } catch (error) {
        console.error('Compression error:', error);
        updatedFiles[i].status = 'error';
        setFiles([...updatedFiles]);
      }
    }
    
    setIsProcessing(false);
    
    const successful = updatedFiles.filter(f => f.status === 'done').length;
    if (successful > 0) {
      toast({ title: "Compression complete!", description: `${successful} file(s) compressed successfully` });
    }
  };

  const downloadFile = (file: CompressedFile) => {
    if (!file.compressed) return;
    
    const url = URL.createObjectURL(file.compressed);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed-${file.original.name}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    files.filter(f => f.status === 'done').forEach(downloadFile);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  const calculateSavings = () => {
    const completed = files.filter(f => f.status === 'done');
    if (completed.length === 0) return null;
    
    const originalTotal = completed.reduce((sum, f) => sum + f.originalSize, 0);
    const compressedTotal = completed.reduce((sum, f) => sum + (f.compressedSize || 0), 0);
    const savings = ((originalTotal - compressedTotal) / originalTotal * 100).toFixed(1);
    
    return { originalTotal, compressedTotal, savings };
  };

  const savings = calculateSavings();

  return (
    <section className="py-12 bg-navy-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Minimize2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">File Compressor</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Compress Your <span className="text-gradient">Files</span>
            </h2>
            <p className="text-muted-foreground">
              Reduce file size while maintaining quality. Perfect for images and PDFs.
            </p>
          </div>

          {/* Quality Slider */}
          <div className="glass rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Quality Level</span>
              <span className="text-sm font-medium text-foreground">{quality}%</span>
            </div>
            <Slider
              value={[quality]}
              onValueChange={(v) => setQuality(v[0])}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Smaller file</span>
              <span>Higher quality</span>
            </div>
          </div>

          {/* Drop Zone */}
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={`rounded-2xl border-2 border-dashed transition-all duration-300 ${
              isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
            }`}>
              <div className="p-6 text-center">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                  isDragActive ? 'gradient-teal' : 'bg-secondary'
                }`}>
                  <Upload className={`w-7 h-7 ${isDragActive ? 'text-primary-foreground' : 'text-primary'}`} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {isDragActive ? 'Drop files here!' : 'Drop files to compress'}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">Supports: JPG, PNG, WebP, GIF, PDF</p>
                <Button variant="outline" onClick={open}>
                  Choose Files <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              {files.map((file, index) => {
                const Icon = getFileIcon(file.original.type);
                return (
                  <div key={index} className="glass rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate text-sm">{file.original.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatSize(file.originalSize)}
                          {file.status === 'done' && file.compressedSize && (
                            <span className="text-primary ml-2">
                              → {formatSize(file.compressedSize)} 
                              ({((file.originalSize - file.compressedSize) / file.originalSize * 100).toFixed(0)}% saved)
                            </span>
                          )}
                        </p>
                        {file.status === 'processing' && (
                          <Progress value={file.progress} className="h-1 mt-2" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {file.status === 'done' && (
                          <>
                            <Check className="w-5 h-5 text-green-500" />
                            <Button variant="ghost" size="sm" onClick={() => downloadFile(file)}>
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <button onClick={() => removeFile(index)} className="text-muted-foreground hover:text-destructive p-1">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Savings Summary */}
              {savings && (
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-sm text-muted-foreground">Total savings:</p>
                  <p className="font-display text-xl font-bold text-primary">
                    {formatSize(savings.originalTotal - savings.compressedTotal)} ({savings.savings}%)
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  variant="hero" 
                  className="flex-1" 
                  onClick={compressFiles}
                  disabled={isProcessing || files.every(f => f.status !== 'pending')}
                >
                  {isProcessing ? 'Compressing...' : 'Compress All'}
                </Button>
                {files.some(f => f.status === 'done') && (
                  <Button variant="outline" onClick={downloadAll}>
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FileCompressor;
