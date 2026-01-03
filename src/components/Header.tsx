import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, RefreshCw, ChevronDown, Video, Image, Music, FileText, Sparkles, FileEdit, User } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, getLocalizedPath } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const converterCategories = [
    { 
      name: "Video", 
      icon: Video, 
      path: "/video-converter",
      color: "text-red-500",
      tools: [
        { name: "MP4 to MP3", path: "/video/mp4-to-mp3" },
        { name: "MKV to MP4", path: "/video/mkv-to-mp4" },
        { name: "MOV to MP4", path: "/video/mov-to-mp4" },
        { name: "AVI to MP4", path: "/video/avi-to-mp4" },
        { name: "WMV to MP4", path: "/video/wmv-to-mp4" },
        { name: "FLV to MP4", path: "/video/flv-to-mp4" },
        { name: "WebM to MP4", path: "/video/webm-to-mp4" },
        { name: "MP4 to GIF", path: "/video/mp4-to-gif" },
        { name: "Video Compressor", path: "/video/video-compressor" },
      ]
    },
    { 
      name: "Image", 
      icon: Image, 
      path: "/image-converter",
      color: "text-green-500",
      tools: [
        { name: "JPG to PNG", path: "/image/jpg-to-png" },
        { name: "PNG to JPG", path: "/image/png-to-jpg" },
        { name: "HEIC to JPG", path: "/image/heic-to-jpg" },
        { name: "WebP to JPG", path: "/image/webp-to-jpg" },
        { name: "PNG to WebP", path: "/image/png-to-webp" },
        { name: "JPG to WebP", path: "/image/jpg-to-webp" },
        { name: "SVG to PNG", path: "/image/svg-to-png" },
        { name: "Image Compressor", path: "/image/image-compressor" },
        { name: "Background Remover", path: "/ai/background-remover" },
      ]
    },
    { 
      name: "Audio", 
      icon: Music, 
      path: "/audio-converter",
      color: "text-purple-500",
      tools: [
        { name: "WAV to MP3", path: "/audio/wav-to-mp3" },
        { name: "M4A to MP3", path: "/audio/m4a-to-mp3" },
        { name: "FLAC to MP3", path: "/audio/flac-to-mp3" },
        { name: "OGG to MP3", path: "/audio/ogg-to-mp3" },
        { name: "MP3 to WAV", path: "/audio/mp3-to-wav" },
        { name: "Audio Compressor", path: "/audio/audio-compressor" },
      ]
    },
    { 
      name: "PDF", 
      icon: FileText, 
      path: "/pdf-editor",
      color: "text-orange-500",
      tools: [
        { name: "PDF to Word", path: "/pdf/pdf-to-word" },
        { name: "Word to PDF", path: "/pdf/word-to-pdf" },
        { name: "PDF to JPG", path: "/pdf/pdf-to-jpg" },
        { name: "JPG to PDF", path: "/pdf/jpg-to-pdf" },
        { name: "Merge PDF", path: "/pdf/merge-pdf" },
        { name: "Split PDF", path: "/pdf/split-pdf" },
        { name: "Compress PDF", path: "/pdf/compress-pdf" },
        { name: "PDF Editor", path: "/pdf-editor" },
      ]
    },
  ];

  const aiTools = [
    { name: "Text Summarizer", path: "/ai/text-summarizer" },
    { name: "Paraphraser", path: "/ai/paraphraser" },
    { name: "Grammar Fixer", path: "/ai/grammar-fixer" },
    { name: "Translator", path: "/ai/translator" },
    { name: "Email Generator", path: "/ai/email-generator" },
    { name: "Image to Code", path: "/ai/image-to-code" },
    { name: "Code Explainer", path: "/ai/code-explainer" },
    { name: "Image Enhancer", path: "/ai/image-enhancer" },
    { name: "Background Remover", path: "/ai/background-remover" },
  ];

  const isActive = (path: string) => {
    const localizedPath = getLocalizedPath(path);
    return location.pathname === localizedPath || location.pathname === path;
  };

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
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
          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            <Link
              to={getLocalizedPath("/")}
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-muted ${
                isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.nav.home}
            </Link>

            {/* Converters Mega Menu */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('converters')}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-muted ${
                  activeDropdown === 'converters' ? "text-primary bg-muted" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Converters
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'converters' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'converters' && (
                <div className="absolute top-full left-0 mt-2 w-[700px] bg-background border border-border rounded-xl shadow-2xl p-6 animate-fade-in z-50">
                  <div className="grid grid-cols-4 gap-6">
                    {converterCategories.map((category) => (
                      <div key={category.name}>
                        <Link 
                          to={getLocalizedPath(category.path)}
                          className={`flex items-center gap-2 font-semibold text-foreground hover:text-primary mb-3 ${category.color}`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <category.icon className="w-5 h-5" />
                          {category.name}
                        </Link>
                        <ul className="space-y-2">
                          {category.tools.map((tool) => (
                            <li key={tool.path}>
                              <Link
                                to={getLocalizedPath(tool.path)}
                                className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {tool.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-border">
                    <Link
                      to={getLocalizedPath("/all-tools")}
                      className="text-sm text-primary hover:underline"
                      onClick={() => setActiveDropdown(null)}
                    >
                      View all 60+ converters →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* AI Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('ai')}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-muted ${
                  activeDropdown === 'ai' ? "text-primary bg-muted" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                AI Tools
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'ai' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'ai' && (
                <div className="absolute top-full left-0 mt-2 w-[280px] bg-background border border-border rounded-xl shadow-2xl p-4 animate-fade-in z-50">
                  <ul className="space-y-1">
                    {aiTools.map((tool) => (
                      <li key={tool.path}>
                        <Link
                          to={getLocalizedPath(tool.path)}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors px-3 py-2 rounded-lg"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {tool.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 pt-3 border-t border-border">
                    <Link
                      to={getLocalizedPath("/ai-tools")}
                      className="text-sm text-primary hover:underline"
                      onClick={() => setActiveDropdown(null)}
                    >
                      View all AI tools →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to={getLocalizedPath("/pdf-editor")}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-muted ${
                isActive("/pdf-editor") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileEdit className="w-4 h-4" />
              PDF Editor
            </Link>

            <Link
              to={getLocalizedPath("/resume-maker")}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-muted ${
                isActive("/resume-maker") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="w-4 h-4" />
              Resume Maker
            </Link>

            <Link
              to={getLocalizedPath("/about")}
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-muted ${
                isActive("/about") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              About
            </Link>

            <Link
              to={getLocalizedPath("/blog")}
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-muted ${
                isActive("/blog") ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.nav.blog}
            </Link>
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
          <div className="lg:hidden py-4 border-t border-border animate-fade-in max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-2">
              <Link
                to={getLocalizedPath("/")}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                  isActive("/") ? "text-primary bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t.nav.home}
              </Link>

              {/* Mobile Converters Accordion */}
              <div>
                <button
                  onClick={() => handleDropdownToggle('mobile-converters')}
                  className="flex items-center justify-between w-full text-base font-medium py-2 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  Converters
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'mobile-converters' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-converters' && (
                  <div className="ml-4 mt-2 space-y-4">
                    {converterCategories.map((category) => (
                      <div key={category.name}>
                        <div className={`flex items-center gap-2 font-semibold text-sm mb-2 ${category.color}`}>
                          <category.icon className="w-4 h-4" />
                          {category.name}
                        </div>
                        <ul className="space-y-1 ml-6">
                          {category.tools.slice(0, 5).map((tool) => (
                            <li key={tool.path}>
                              <button
                                className="text-sm text-muted-foreground hover:text-primary block py-1 w-full text-left"
                                onClick={() => { 
                                  setIsMenuOpen(false); 
                                  setActiveDropdown(null);
                                  navigate(getLocalizedPath(tool.path));
                                }}
                              >
                                {tool.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile AI Tools Accordion */}
              <div>
                <button
                  onClick={() => handleDropdownToggle('mobile-ai')}
                  className="flex items-center justify-between w-full text-base font-medium py-2 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI Tools
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'mobile-ai' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'mobile-ai' && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {aiTools.map((tool) => (
                      <li key={tool.path}>
                        <button
                          className="text-sm text-muted-foreground hover:text-primary block py-2 px-3 w-full text-left"
                          onClick={() => { 
                            setIsMenuOpen(false); 
                            setActiveDropdown(null);
                            navigate(getLocalizedPath(tool.path));
                          }}
                        >
                          {tool.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Link
                to={getLocalizedPath("/pdf-editor")}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 text-base font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                  isActive("/pdf-editor") ? "text-primary bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <FileEdit className="w-4 h-4" />
                PDF Editor
              </Link>

              <Link
                to={getLocalizedPath("/resume-maker")}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 text-base font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                  isActive("/resume-maker") ? "text-primary bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <User className="w-4 h-4" />
                Resume Maker
              </Link>

              <Link
                to={getLocalizedPath("/about")}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                  isActive("/about") ? "text-primary bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                About
              </Link>

              <Link
                to={getLocalizedPath("/blog")}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                  isActive("/blog") ? "text-primary bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t.nav.blog}
              </Link>

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