import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { languages, Language, translations, getTranslation } from './translations';

const MANUAL_LANG_KEY = 'tf_manual_language';

// Map country codes to language codes
const countryToLanguage: Record<string, Language> = {
  'DE': 'de', 'AT': 'de', 'CH': 'de', 'LI': 'de',
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es', 'VE': 'es', 'CL': 'es',
  'FR': 'fr', 'BE': 'fr', 'SN': 'fr', 'CI': 'fr',
  'IT': 'it', 'SM': 'it', 'VA': 'it',
  'PT': 'pt', 'BR': 'pt', 'AO': 'pt',
  'NL': 'nl', 'SR': 'nl',
  'PL': 'pl',
  'RU': 'ru', 'BY': 'ru', 'KZ': 'ru',
  'JP': 'ja',
  'CN': 'zh', 'TW': 'zh', 'HK': 'zh', 'SG': 'zh',
  'KR': 'ko',
  'SA': 'ar', 'EG': 'ar', 'AE': 'ar', 'IQ': 'ar', 'MA': 'ar',
  'TR': 'tr',
  'IN': 'hi',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  languages: typeof languages;
  getLocalizedPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hasAutoDetected, setHasAutoDetected] = useState(false);
  
  // Extract language from URL path
  const getLanguageFromPath = (): Language => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const firstPart = pathParts[0] as Language;
    if (firstPart && languages[firstPart]) {
      return firstPart;
    }
    return 'en';
  };

  const [language, setLanguageState] = useState<Language>(getLanguageFromPath);

  // Auto-detect language based on IP (only on first visit to root path)
  useEffect(() => {
    const autoDetectLanguage = async () => {
      // Only auto-detect if:
      // 1. We're on the root path (no language in URL)
      // 2. User hasn't manually selected a language before
      // 3. We haven't already auto-detected in this session
      const pathParts = location.pathname.split('/').filter(Boolean);
      const hasLanguageInPath = pathParts[0] && languages[pathParts[0] as Language];
      const manuallySelected = localStorage.getItem(MANUAL_LANG_KEY);
      
      if (hasLanguageInPath || manuallySelected || hasAutoDetected) {
        return;
      }

      try {
        // Use AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch('https://ipapi.co/json/', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          setHasAutoDetected(true);
          return;
        }
        
        const data = await response.json();
        const countryCode = data.country_code;
        const detectedLang = countryToLanguage[countryCode];
        
        if (detectedLang && detectedLang !== 'en') {
          // Redirect to detected language version
          const currentPath = location.pathname === '/' ? '' : location.pathname;
          navigate(`/${detectedLang}${currentPath}`, { replace: true });
        }
        
        setHasAutoDetected(true);
      } catch (error) {
        // Silently fail - just use default English
        setHasAutoDetected(true);
      }
    };

    autoDetectLanguage();
  }, [location.pathname, navigate, hasAutoDetected]);

  useEffect(() => {
    const langFromPath = getLanguageFromPath();
    if (langFromPath !== language) {
      setLanguageState(langFromPath);
    }
    // Set html lang attribute
    document.documentElement.lang = langFromPath;
    // Set direction for RTL languages
    document.documentElement.dir = langFromPath === 'ar' ? 'rtl' : 'ltr';
  }, [location.pathname]);

  const setLanguage = (newLang: Language) => {
    // Mark that user has manually selected a language
    localStorage.setItem(MANUAL_LANG_KEY, 'true');
    
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Remove current language prefix if exists
    if (pathParts[0] && languages[pathParts[0] as Language]) {
      pathParts.shift();
    }
    
    // Build new path
    let newPath = newLang === 'en' ? `/${pathParts.join('/')}` : `/${newLang}/${pathParts.join('/')}`;
    if (newPath === '/' || newPath === `/${newLang}`) {
      newPath = newLang === 'en' ? '/' : `/${newLang}`;
    }
    
    navigate(newPath);
  };

  const getLocalizedPath = (path: string): string => {
    if (language === 'en') {
      return path;
    }
    // Don't add language prefix if path already has it
    if (path.startsWith(`/${language}`)) {
      return path;
    }
    return `/${language}${path}`;
  };

  const t = getTranslation(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages, getLocalizedPath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
