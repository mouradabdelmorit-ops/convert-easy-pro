import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import { Upload, Wand2, Download, Loader2, Sparkles, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";

const ImageEnhancer = () => {
  const { language } = useLanguage();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Enhancement settings
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [sharpness, setSharpness] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    disabled: isLoading,
  });

  const applyEnhancements = async () => {
    if (!originalImage) return;

    setIsLoading(true);
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        canvas.width = img.width;
        canvas.height = img.height;

        // Apply CSS filters
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
        ctx.drawImage(img, 0, 0);

        // Apply sharpening if needed
        if (sharpness > 0) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const sharpenedData = applySharpen(imageData, sharpness / 100);
          ctx.putImageData(sharpenedData, 0, 0);
        }

        setEnhancedImage(canvas.toDataURL('image/png', 1.0));
        toast.success("Image enhanced successfully!");
        setIsLoading(false);
      };
      img.src = originalImage;
    } catch (error) {
      console.error('Error enhancing image:', error);
      toast.error("Failed to enhance image");
      setIsLoading(false);
    }
  };

  const applySharpen = (imageData: ImageData, amount: number): ImageData => {
    const weights = [
      0, -amount, 0,
      -amount, 1 + 4 * amount, -amount,
      0, -amount, 0
    ];
    
    const side = 3;
    const halfSide = Math.floor(side / 2);
    const src = imageData.data;
    const sw = imageData.width;
    const sh = imageData.height;
    const output = new ImageData(sw, sh);
    const dst = output.data;

    for (let y = 0; y < sh; y++) {
      for (let x = 0; x < sw; x++) {
        const dstOff = (y * sw + x) * 4;
        let r = 0, g = 0, b = 0;
        
        for (let cy = 0; cy < side; cy++) {
          for (let cx = 0; cx < side; cx++) {
            const scy = Math.min(sh - 1, Math.max(0, y + cy - halfSide));
            const scx = Math.min(sw - 1, Math.max(0, x + cx - halfSide));
            const srcOff = (scy * sw + scx) * 4;
            const wt = weights[cy * side + cx];
            r += src[srcOff] * wt;
            g += src[srcOff + 1] * wt;
            b += src[srcOff + 2] * wt;
          }
        }
        
        dst[dstOff] = Math.min(255, Math.max(0, r));
        dst[dstOff + 1] = Math.min(255, Math.max(0, g));
        dst[dstOff + 2] = Math.min(255, Math.max(0, b));
        dst[dstOff + 3] = src[dstOff + 3];
      }
    }
    
    return output;
  };

  const downloadImage = () => {
    if (!enhancedImage) return;
    const a = document.createElement('a');
    a.href = enhancedImage;
    a.download = 'enhanced-image.png';
    a.click();
  };

  const autoEnhance = () => {
    setBrightness(110);
    setContrast(115);
    setSaturation(120);
    setSharpness(30);
    toast.info("Auto-enhancement applied. Click 'Enhance' to apply.");
  };

  return (
    <>
      <Helmet>
        <title>AI Image Enhancer - Improve Photo Quality | TransformFiles</title>
        <meta name="description" content="Enhance your images with AI-powered tools. Adjust brightness, contrast, saturation and sharpen your photos." />
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
                Image <span className="text-gradient">Enhancer</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Enhance your photos with powerful adjustment tools. Improve brightness, contrast, saturation, and sharpness.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
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
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Controls */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                          <SlidersHorizontal className="w-5 h-5" />
                          Adjustments
                        </h3>
                        <Button variant="ghost" size="sm" onClick={autoEnhance}>
                          <Wand2 className="w-4 h-4 mr-1" />
                          Auto
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm">Brightness: {brightness}%</Label>
                          <Slider
                            value={[brightness]}
                            onValueChange={(v) => setBrightness(v[0])}
                            min={50}
                            max={150}
                            step={1}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label className="text-sm">Contrast: {contrast}%</Label>
                          <Slider
                            value={[contrast]}
                            onValueChange={(v) => setContrast(v[0])}
                            min={50}
                            max={150}
                            step={1}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label className="text-sm">Saturation: {saturation}%</Label>
                          <Slider
                            value={[saturation]}
                            onValueChange={(v) => setSaturation(v[0])}
                            min={0}
                            max={200}
                            step={1}
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label className="text-sm">Sharpness: {sharpness}%</Label>
                          <Slider
                            value={[sharpness]}
                            onValueChange={(v) => setSharpness(v[0])}
                            min={0}
                            max={100}
                            step={1}
                            className="mt-2"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 pt-4">
                        <Button onClick={applyEnhancements} disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Enhancing...
                            </>
                          ) : (
                            <>
                              <Wand2 className="w-4 h-4 mr-2" />
                              Enhance Image
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => {
                            setOriginalImage(null);
                            setEnhancedImage(null);
                            setBrightness(100);
                            setContrast(100);
                            setSaturation(100);
                            setSharpness(0);
                          }}
                        >
                          Upload New Image
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Original</h4>
                        <div className="bg-card border border-border rounded-xl p-2">
                          <img src={originalImage} alt="Original" className="max-h-64 mx-auto rounded" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Enhanced</h4>
                        <div className="bg-card border border-border rounded-xl p-2 min-h-[272px] flex items-center justify-center">
                          {enhancedImage ? (
                            <img src={enhancedImage} alt="Enhanced" className="max-h-64 mx-auto rounded" />
                          ) : (
                            <p className="text-muted-foreground text-sm">Click "Enhance" to preview</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {enhancedImage && (
                      <div className="flex justify-center">
                        <Button onClick={downloadImage} size="lg">
                          <Download className="w-4 h-4 mr-2" />
                          Download Enhanced Image
                        </Button>
                      </div>
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

export default ImageEnhancer;
