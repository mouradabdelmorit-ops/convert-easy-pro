import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { languages, Language, translations, getTranslation } from './translations';

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
