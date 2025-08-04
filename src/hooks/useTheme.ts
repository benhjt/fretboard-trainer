import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const apply = (value: Theme) => {
      root.classList.remove('light', 'dark');

      if (value === 'system') {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;
        root.classList.add(prefersDark ? 'dark' : 'light');
      } else {
        root.classList.add(value);
      }
    };

    apply(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};
