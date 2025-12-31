import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Video, Image, Music, FileText, Archive, Book, 
  ChevronDown, ChevronUp, Settings, X, Download, Loader2,
  Check, AlertCircle
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ConversionFile {
  file: File;
  targetFormat: string;
  status: "pending" | "converting" | "done" | "error";
  progress: number;
  downloadUrl?: string;
  downloadName?: string;
}

interface ConversionPanelProps {
  files: File[];
  onRemoveFile: (index: number) => void;
  onClearAll: () => void;
}

const formatCategories = {
  video: {
    icon: Video,
    label: "Video",
    formats: ["MP4", "AVI", "MKV", "MOV", "WMV", "FLV", "WEBM", "M4V"],
    color: "text-red-400",
  },
  image: {
    icon: Image,
    label: "Image",
    formats: ["JPG", "PNG", "WEBP", "GIF", "BMP", "TIFF", "SVG", "ICO"],
    color: "text-green-400",
  },
  audio: {
    icon: Music,
    label: "Audio",
    formats: ["MP3", "WAV", "FLAC", "AAC", "OGG", "WMA", "M4A", "AIFF"],
    color: "text-purple-400",
  },
  document: {
    icon: FileText,
    label: "Document",
    formats: ["PDF", "DOCX", "DOC", "TXT", "RTF", "ODT", "XLSX", "PPTX"],
    color: "text-blue-400",
  },
  archive: {
    icon: Archive,
    label: "Archive",
    formats: ["ZIP", "RAR", "7Z", "TAR", "GZ", "BZ2"],
    color: "text-yellow-400",
  },
  ebook: {
    icon: Book,
    label: "E-book",
    formats: ["EPUB", "MOBI", "AZW3", "FB2", "LRF", "PDB"],
    color: "text-orange-400",
  },
};

const ConversionPanel = ({ files, onRemoveFile, onClearAll }: ConversionPanelProps) => {
  const { t } = useLanguage();
  const [conversionFiles, setConversionFiles] = useState<ConversionFile[]>(
    files.map((file) => ({
      file,
      targetFormat: "",
      status: "pending",
      progress: 0,
    }))
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("video");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const handleFormatSelect = (format: string) => {
    setConversionFiles((prev) =>
      prev.map((cf) => ({ ...cf, targetFormat: format }))
    );
  };

  const handleConversion = async () => {
    setIsConverting(true);
    
    for (let index = 0; index < conversionFiles.length; index++) {
      const cf = conversionFiles[index];
      if (!cf.targetFormat) continue;

      setConversionFiles(prev =>
        prev.map((f, i) => i === index ? { ...f, status: "converting", progress: 10 } : f)
      );

      try {
        const formData = new FormData();
        formData.append('file', cf.file);
        formData.append('targetFormat', cf.targetFormat);

        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/convert-file`, {
          method: 'POST',
          body: formData,
        });

        setConversionFiles(prev =>
          prev.map((f, i) => i === index ? { ...f, progress: 50 } : f)
        );

        const data = await response.json();

        if (data.success && data.data) {
          // Store the download data
          const binaryString = atob(data.data);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: data.mimeType });
          const url = URL.createObjectURL(blob);
          
          setConversionFiles(prev =>
            prev.map((f, i) => i === index ? { ...f, progress: 100, status: "done", downloadUrl: url, downloadName: data.fileName } : f)
          );
        } else {
          throw new Error(data.error || 'Conversion failed');
        }
      } catch (error) {
        console.error('Conversion error:', error);
        setConversionFiles(prev =>
          prev.map((f, i) => i === index ? { ...f, status: "error" } : f)
        );
      }
    }
    setIsConverting(false);
  };

  const handleDownload = (cf: ConversionFile & { downloadUrl?: string; downloadName?: string }) => {
    if (cf.downloadUrl && cf.downloadName) {
      const a = document.createElement('a');
      a.href = cf.downloadUrl;
      a.download = cf.downloadName;
      a.click();
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    if (["mp4", "avi", "mkv", "mov", "wmv"].includes(ext)) return Video;
    if (["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(ext)) return Image;
    if (["mp3", "wav", "flac", "aac", "ogg"].includes(ext)) return Music;
    if (["pdf", "doc", "docx", "txt", "rtf"].includes(ext)) return FileText;
    if (["zip", "rar", "7z", "tar"].includes(ext)) return Archive;
    if (["epub", "mobi", "azw3"].includes(ext)) return Book;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (files.length === 0) return null;

  return (
    <section className="py-16 bg-navy-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t.converter.convert}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClearAll}>
              {t.converter.removeAll}
            </Button>
          </div>

          {/* File List */}
          <div className="space-y-3 mb-8">
            {conversionFiles.map((cf, index) => {
              const FileIcon = getFileIcon(cf.file.name);
              return (
                <div
                  key={index}
                  className="glass rounded-xl p-4 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <FileIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {cf.file.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(cf.file.size)}
                        {cf.targetFormat && (
                          <span className="text-primary ml-2">
                            → {cf.targetFormat}
                          </span>
                        )}
                      </p>
                      {cf.status === "converting" && (
                        <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full progress-shimmer rounded-full transition-all duration-300"
                            style={{ width: `${cf.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {cf.status === "done" && (
                        <Button variant="hero" size="sm" onClick={() => handleDownload(cf)}>
                          <Download className="w-4 h-4 mr-1" />
                          {t.converter.download}
                        </Button>
                      )}
                      {cf.status === "converting" && (
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                      )}
                      {cf.status === "pending" && (
                        <button
                          onClick={() => onRemoveFile(index)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Format Selection */}
          <div className="glass rounded-2xl p-6 mb-6">
            <h3 className="font-display font-semibold text-foreground mb-4">
              {t.converter.selectFormat}
            </h3>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(formatCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </button>
              ))}
            </div>

            {/* Format Grid */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {formatCategories[selectedCategory as keyof typeof formatCategories].formats.map(
                (format) => (
                  <button
                    key={format}
                    onClick={() => handleFormatSelect(format)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      conversionFiles[0]?.targetFormat === format
                        ? "bg-primary text-primary-foreground glow-teal"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {format}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="glass rounded-2xl overflow-hidden mb-6">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between p-4 text-foreground hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                <span className="font-medium">Advanced Settings</span>
              </div>
              {showAdvanced ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {showAdvanced && (
              <div className="p-4 border-t border-border animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Quality
                    </label>
                    <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground">
                      <option>High Quality</option>
                      <option>Medium Quality</option>
                      <option>Low Quality (Smaller Size)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      Resolution
                    </label>
                    <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground">
                      <option>Original</option>
                      <option>1920x1080 (1080p)</option>
                      <option>1280x720 (720p)</option>
                      <option>640x480 (480p)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Convert Button */}
          <Button
            variant="teal"
            size="xl"
            className="w-full"
            onClick={handleConversion}
            disabled={!conversionFiles[0]?.targetFormat || isConverting}
          >
            {isConverting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                {t.converter.converting}
              </>
            ) : (
              <>
                {t.converter.convert} {files.length} {files.length > 1 ? "Files" : "File"}
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConversionPanel;
