'use client';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
      aria-label={`Mudar para tema ${isDark ? 'claro' : 'escuro'}`}
    >
      <img
        src={isDark ? '/assets/Sun.svg' : '/assets/Moon.svg'}
        alt="theme icon"
        className="w-6 h-6"
      />
    </button>
  );
};
