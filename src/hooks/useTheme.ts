'use client';
import { useState, useEffect } from 'react';

interface UseThemeReturn {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // DEBUG: Log para ver o que está carregando
    console.log('🔍 useTheme - Carregando tema...');
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    console.log('📁 Tema salvo:', savedTheme);
    console.log('💻 Sistema prefere escuro:', systemPrefersDark);
    
    // Se não tem tema salvo, usa o do sistema
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    console.log('🎯 Tema a ser aplicado:', theme);
    
    setIsDark(theme === 'dark');
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('🌙 Classe dark ADICIONADA');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('☀️ Classe dark REMOVIDA');
    }
  }, []);

  const toggleTheme = (): void => {
    const newIsDark = !isDark;
    console.log('🔄 Alternando tema:', isDark, '→', newIsDark);
    
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      console.log('🌙 Modo escuro ATIVADO');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      console.log('☀️ Modo claro ATIVADO');
    }
  };

  return { isDark, toggleTheme };
};