import { Link } from "react-router-dom";
import { RefreshCw, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, getLocalizedPath } = useLanguage();

  const footerLinks = {
    tools: [
      { name: "File Converter", path: "/" },
      { name: t.nav.pdfEditor, path: "/pdf-editor" },
      { name: t.nav.resumeMaker, path: "/resume-maker" },
      { name: "File Compressor", path: "/compress" },
    ],
    converters: [
      { name: "Video Converter", path: "/video-converter" },
      { name: "Image Converter", path: "/image-converter" },
      { name: "Audio Converter", path: "/audio-converter" },
      { name: "Document Converter", path: "/document-converter" },
    ],
    legal: [
      { name: t.privacy.title, path: "/privacy" },
      { name: t.terms.title, path: "/terms" },
      { name: t.cookies.title, path: "/cookies" },
    ],
    company: [
      { name: t.nav.about, path: "/about" },
      { name: "Contact", path: "/about#contact" },
    ],
  };

  return (
    <footer className="bg-navy-dark border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to={getLocalizedPath("/")} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Transform<span className="text-gradient">Files</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Github">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:contact@transformfiles.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{t.footer.tools}</h4>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    to={getLocalizedPath(link.path)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Converters Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{t.footer.converters}</h4>
            <ul className="space-y-3">
              {footerLinks.converters.map((link) => (
                <li key={link.name}>
                  <Link
                    to={getLocalizedPath(link.path)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{t.footer.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={getLocalizedPath(link.path)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">{t.footer.legal}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={getLocalizedPath(link.path)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {t.footer.copyright}
            </p>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ for file conversion enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
