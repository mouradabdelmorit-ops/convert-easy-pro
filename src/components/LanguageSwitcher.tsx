import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';
import { Language } from '@/i18n/translations';

const LanguageSwitcher = () => {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-secondary/80 transition-colors text-sm font-medium"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="hidden sm:inline">{languages[language].flag}</span>
        <span className="hidden md:inline text-muted-foreground">{languages[language].name}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 py-2 w-48 glass rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto animate-fade-in">
            {(Object.keys(languages) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-secondary/80 transition-colors ${
                  language === lang ? 'text-primary bg-primary/10' : 'text-foreground'
                }`}
              >
                <span className="text-lg">{languages[lang].flag}</span>
                <span className="text-sm font-medium">{languages[lang].name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
