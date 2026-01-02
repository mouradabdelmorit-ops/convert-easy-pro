import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useDropzone } from "react-dropzone";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  Music, Upload, ArrowRight, Download, Loader2, X, 
  Music2, CheckCircle
} from "lucide-react";

const audioFormats = ["MP3", "WAV", "FLAC", "AAC", "OGG", "WMA", "M4A", "AIFF", "OPUS", "AMR"];

interface ConversionFile {
  file: File;
  targetFormat: string;
  status: "pending" | "converting" | "done" | "error";
  progress: number;
  downloadUrl?: string;
  downloadName?: string;
}

const AudioConverter = () => {
  const [files, setFiles] = useState<ConversionFile[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const audioFiles = acceptedFiles.filter(f => f.type.startsWith('audio/'));
    const newFiles = audioFiles.map(file => ({
      file,
      targetFormat: selectedFormat,
      status: "pending" as const,
      progress: 0
    }));
    setFiles(prev => [...prev, ...newFiles]);
    
    if (audioFiles.length > 0) {
      toast({ title: "Files added", description: `${audioFiles.length} audio file(s) ready` });
    }
  }, [selectedFormat]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { 'audio/*': ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma', '.m4a', '.aiff', '.opus', '.amr'] },
    noClick: true,
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConversion = async () => {
    if (!selectedFormat || files.length === 0) {
      toast({ title: "Error", description: "Please select a format and upload files", variant: "destructive" });
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
        formData.append('targetFormat', selectedFormat);

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

  return (
    <>
      <Helmet>
        <title>Free Audio Converter Online - Convert MP3 to WAV, WAV to MP3, FLAC to MP3 | TransformFiles</title>
        <meta name="description" content="Convert audio files online free. MP3 to WAV, WAV to MP3, FLAC to MP3, M4A to MP3, OGG to MP3. Best free audio converter - fast, secure, high quality, no registration." />
        <meta name="keywords" content="audio converter, mp3 to wav, wav to mp3, flac to mp3, m4a to mp3, convert audio online, free audio converter, ogg to mp3, aac to mp3, audio format converter, online audio converter free, convert music files" />
        <link rel="canonical" href="https://transformfiles.com/audio-converter" />
        <meta property="og:title" content="Free Audio Converter Online - Convert MP3, WAV, FLAC | TransformFiles" />
        <meta property="og:description" content="Convert audio files online free. MP3 to WAV, WAV to MP3, FLAC to MP3. High quality audio conversion." />
        <meta property="og:url" content="https://transformfiles.com/audio-converter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Audio Converter Online - MP3, WAV, FLAC | TransformFiles" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Audio Converter - TransformFiles",
            "description": "Free online audio converter. Convert MP3, WAV, FLAC, AAC, OGG and 30+ audio formats.",
            "url": "https://transformfiles.com/audio-converter",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Web Browser",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "featureList": ["MP3 to WAV conversion", "WAV to MP3 conversion", "FLAC to MP3 conversion", "High quality audio", "Batch conversion", "No registration required"]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero */}
          <section className="relative gradient-hero py-12 md:py-16">
            <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                  <Music className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-foreground">Audio Converter</span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Convert <span className="text-purple-400">Audio Files</span> Online
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8">
                  Convert between MP3, WAV, FLAC, AAC, and more. Fast and free.
                </p>
              </div>
            </div>
          </section>

          {/* Converter */}
          <section className="py-8 md:py-12 bg-navy-dark">
            <div className="container mx-auto px-4">
              {/* Format Selection */}
              <div className="max-w-3xl mx-auto mb-8">
                <h3 className="font-display font-semibold text-foreground mb-4 text-center">Select Output Format</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {audioFormats.map((format) => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedFormat === format
                          ? "bg-purple-500 text-white"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Zone */}
              <div {...getRootProps()} className="max-w-3xl mx-auto">
                <input {...getInputProps()} />
                <div className={`rounded-2xl border-2 border-dashed transition-all duration-300 ${
                  isDragActive ? 'border-purple-500 bg-purple-500/5' : 'border-border hover:border-purple-500/50'
                }`}>
                  <div className="p-6 md:p-8 text-center">
                    <div className={`w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      isDragActive ? 'bg-purple-500' : 'bg-secondary'
                    }`}>
                      <Music2 className={`w-7 h-7 md:w-8 md:h-8 ${isDragActive ? 'text-white' : 'text-purple-400'}`} />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                      {isDragActive ? 'Drop your audio here!' : 'Upload Audio Files'}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm md:text-base">Drag & drop or click to browse</p>
                    <Button onClick={open} className="bg-purple-500 hover:bg-purple-600 text-white">
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
                      <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <Music className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{f.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(f.file.size / 1024 / 1024).toFixed(2)} MB
                          {selectedFormat && <span className="text-purple-400 ml-2">→ {selectedFormat}</span>}
                        </p>
                        {f.status === "converting" && (
                          <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${f.progress}%` }} />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {f.status === "done" && (
                          <Button size="sm" onClick={() => handleDownload(f)} className="bg-purple-500 hover:bg-purple-600">
                            <Download className="w-4 h-4 mr-1" /> Download
                          </Button>
                        )}
                        {f.status === "converting" && <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />}
                        {f.status === "pending" && (
                          <button onClick={() => removeFile(index)} className="p-2 text-muted-foreground hover:text-destructive">
                            <X className="w-5 h-5" />
                          </button>
                        )}
                        {f.status === "done" && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                    </div>
                  ))}

                  {/* Convert Button */}
                  <Button
                    size="lg"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white mt-4"
                    onClick={handleConversion}
                    disabled={!selectedFormat || isConverting}
                  >
                    {isConverting ? (
                      <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Converting...</>
                    ) : (
                      <>Convert {files.length} Audio File{files.length > 1 ? 's' : ''}</>
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

export default AudioConverter;
