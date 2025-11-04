'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/lib/translations';

interface LanguageContextType {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>('pt');

  // Carregar idioma salvo do localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('techcompare_language') as Language;
    if (savedLang && ['pt', 'en', 'es', 'fr'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

  // Salvar idioma no localStorage quando mudar
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('techcompare_language', lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}