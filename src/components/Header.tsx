import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, RefreshCw, ChevronDown, Video, Image, Music, FileText } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConvertersOpen, setIsConvertersOpen] = useState(false);
  const location = useLocation();
  const { t, getLocalizedPath } = useLanguage();

  const converterCategories = [
    { name: "Video", icon: Video, path: "/video-converter", tools: [
      { name: "MP4 to MP3", path: "/video/mp4-to-mp3" },
      { name: "MKV to MP4", path: "/video/mkv-to-mp4" },
      { name: "MOV to MP4", path: "/video/mov-to-mp4" },
      { name: "AVI to MP4", path: "/video/avi-to-mp4" },
      { name: "Video Compressor", path: "/video/video-compressor" },
    ]},
    { name: "Image", icon: Image, path: "/image-converter", tools: [
      { name: "JPG to PNG", path: "/image/jpg-to-png" },
      { name: "PNG to JPG", path: "/image/png-to-jpg" },
      { name: "HEIC to JPG", path: "/image/heic-to-jpg" },
      { name: "WebP to JPG", path: "/image/webp-to-jpg" },
      { name: "Background Remover", path: "/image/background-remover" },
    ]},
    { name: "Audio", icon: Music, path: "/audio-converter", tools: [
      { name: "WAV to MP3", path: "/audio/wav-to-mp3" },
      { name: "M4A to MP3", path: "/audio/m4a-to-mp3" },
      { name: "FLAC to MP3", path: "/audio/flac-to-mp3" },
      { name: "MP3 Cutter", path: "/audio/mp3-cutter" },
    ]},
    { name: "PDF", icon: FileText, path: "/pdf-editor", tools: [
      { name: "PDF to Word", path: "/pdf/pdf-to-word" },
      { name: "Word to PDF", path: "/pdf/word-to-pdf" },
      { name: "Merge PDF", path: "/pdf/merge-pdf" },
      { name: "Compress PDF", path: "/pdf/compress-pdf" },
    ]},
  ];

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.pdfEditor, path: "/pdf-editor" },
    { name: "AI Tools", path: "/ai-tools" },
    { name: t.nav.blog, path: "/blog" },
  ];

  const isActive = (path: string) => {
    const localizedPath = getLocalizedPath(path);
    return location.pathname === localizedPath || location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to={getLocalizedPath("/")} className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center glow-teal group-hover:glow-teal-lg transition-all duration-300">
                <RefreshCw className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <span className="font-display text-lg md:text-xl font-bold text-foreground">
              Transform<span className="text-gradient">Files</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={getLocalizedPath(link.path)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="hero" size="default" asChild>
              <Link to={getLocalizedPath("/#convert")}>{t.nav.startConverting}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={getLocalizedPath(link.path)}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium py-2 transition-colors duration-200 ${
                    isActive(link.path)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="hero" size="default" className="mt-3" asChild>
                <Link to={getLocalizedPath("/#convert")} onClick={() => setIsMenuOpen(false)}>
                  {t.nav.startConverting}
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
