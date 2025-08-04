import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    const apply = (value: Theme) => {
      // Remove dark class first
      root.classList.remove('dark');

      if (value === 'system') {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;
        if (prefersDark) {
          root.classList.add('dark');
        }
      } else if (value === 'dark') {
        root.classList.add('dark');
      }
    };

    apply(theme);
    localStorage.setItem('theme', theme);

    // Also listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        apply(theme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return { theme, setTheme };
};
