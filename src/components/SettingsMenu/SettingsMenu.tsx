import { Settings } from 'lucide-react'; // npm install lucide-react
import React, { useEffect, useRef, useState } from 'react';
import ThemeToggle from '../ThemeToggle';

const SettingsMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="absolute top-4 right-4 z-50" ref={menuRef}>
      <div className="relative">
        <button
          className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Open Settings"
        >
          <Settings className="w-5 h-5 text-gray-700 dark:text-white" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-3 animate-fade-in">
            <ThemeToggle />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsMenu;
