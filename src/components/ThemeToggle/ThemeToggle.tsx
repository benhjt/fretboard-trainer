import React from 'react';
import type { Theme } from '../../hooks/useTheme';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1 text-sm text-gray-700 dark:text-gray-300">
        Theme
      </label>
      <select
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeToggle;
