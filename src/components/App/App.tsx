import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import NoteTrainer from '../NoteTrainer';
import SettingsMenu from '../SettingsMenu';

const App: React.FC = () => {
  // Initialize theme at the app level to ensure it's applied on load
  useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 relative">
      <SettingsMenu />
      <NoteTrainer />
    </div>
  );
};

export default App;
