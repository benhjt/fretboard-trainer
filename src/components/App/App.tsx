import React from 'react';
import NoteTrainer from '../NoteTrainer';
import SettingsMenu from '../SettingsMenu';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 relative">
      <SettingsMenu />
      <NoteTrainer />
    </div>
  );
};

export default App;
