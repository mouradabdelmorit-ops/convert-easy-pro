import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, RefreshCw } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, getLocalizedPath } = useLanguage();

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.pdfEditor, path: "/pdf-editor" },
    { name: t.nav.resumeMaker, path: "/resume-maker" },
    { name: "Compress", path: "/compress" },
    { name: "Downloader", path: "/downloader" },
    { name: t.nav.blog, path: "/blog" },
    { name: t.nav.about, path: "/about" },
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
