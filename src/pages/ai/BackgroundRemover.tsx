import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import { Upload, Download, Loader2, Sparkles, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";
import { pipeline, env } from "@huggingface/transformers";

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

const MAX_IMAGE_DIMENSION = 1024;

const BackgroundRemover = () => {
  const { language } = useLanguage();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState("");

  const removeBackground = async (imageElement: HTMLImageElement): Promise<Blob> => {
    setProgress("Loading AI model...");
    const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
      device: 'webgpu',
    });
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Resize if needed
    let width = imageElement.naturalWidth;
    let height = imageElement.naturalHeight;
    if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
      if (width > height) {
        height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
        width = MAX_IMAGE_DIMENSION;
      } else {
        width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
        height = MAX_IMAGE_DIMENSION;
      }
    }
    
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(imageElement, 0, 0, width, height);
    
    setProgress("Processing image...");
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    const result = await segmenter(imageData);
    
    if (!result || !Array.isArray(result) || result.length === 0 || !result[0].mask) {
      throw new Error('Invalid segmentation result');
    }
    
    setProgress("Removing background...");
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputCtx = outputCanvas.getContext('2d');
    if (!outputCtx) throw new Error('Could not get output canvas context');
    
    outputCtx.drawImage(canvas, 0, 0);
    const outputImageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const data = outputImageData.data;
    
    for (let i = 0; i < result[0].mask.data.length; i++) {
      const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
      data[i * 4 + 3] = alpha;
    }
    
    outputCtx.putImageData(outputImageData, 0, 0);
    
    return new Promise((resolve, reject) => {
      outputCanvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Failed to create blob')),
        'image/png',
        1.0
      );
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setOriginalImage(dataUrl);
      setProcessedImage(null);
      
      setIsLoading(true);
      try {
        const img = new Image();
        img.onload = async () => {
          try {
            const blob = await removeBackground(img);
            const url = URL.createObjectURL(blob);
            setProcessedImage(url);
            toast.success("Background removed successfully!");
          } catch (error: any) {
            console.error('Error removing background:', error);
            toast.error(error.message || "Failed to remove background");
          } finally {
            setIsLoading(false);
            setProgress("");
          }
        };
        img.src = dataUrl;
      } catch (error: any) {
        console.error('Error:', error);
        toast.error("Failed to process image");
        setIsLoading(false);
        setProgress("");
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    disabled: isLoading,
  });

  const downloadImage = () => {
    if (!processedImage) return;
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = 'no-background.png';
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>AI Background Remover - Remove Image Backgrounds | TransformFiles</title>
        <meta name="description" content="Remove backgrounds from images instantly using AI. Free online background remover tool." />
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
                Background <span className="text-gradient">Remover</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Remove backgrounds from your images instantly with AI. Perfect for product photos, portraits, and more.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {!originalImage ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl text-foreground font-medium mb-2">
                    {isDragActive ? "Drop the image here..." : "Upload an image"}
                  </p>
                  <p className="text-muted-foreground">
                    Drag & drop or click to browse (PNG, JPG, WEBP)
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Original */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        Original
                      </h3>
                      <div className="bg-card border border-border rounded-2xl p-4">
                        <img src={originalImage} alt="Original" className="max-h-80 mx-auto rounded-lg" />
                      </div>
                    </div>

                    {/* Processed */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Result
                      </h3>
                      <div className="bg-card border border-border rounded-2xl p-4 min-h-[320px] flex items-center justify-center"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'10\' height=\'10\' fill=\'%23ccc\'/%3E%3Crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23ccc\'/%3E%3C/svg%3E")' }}
                      >
                        {isLoading ? (
                          <div className="text-center">
                            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                            <p className="text-muted-foreground">{progress}</p>
                          </div>
                        ) : processedImage ? (
                          <img src={processedImage} alt="Processed" className="max-h-80 rounded-lg" />
                        ) : (
                          <p className="text-muted-foreground">Processing...</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setOriginalImage(null);
                        setProcessedImage(null);
                      }}
                    >
                      Upload New Image
                    </Button>
                    {processedImage && (
                      <Button onClick={downloadImage}>
                        <Download className="w-4 h-4 mr-2" />
                        Download PNG
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BackgroundRemover;
