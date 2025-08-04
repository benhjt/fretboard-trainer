import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { noteRanges } from '../../constants/noteRanges';
import { useNotePlayer } from '../../hooks/useNotePlayer';
import { createSampler } from '../../utils/audio';
import { generateUniqueSequence } from '../../utils/notes';
import ThemeToggle from '../ThemeToggle';

export default function NoteTrainer() {
  const [selectedString, setSelectedString] = useState<string>('E2');
  const [includeAccidentals, setIncludeAccidentals] = useState(true);
  const [noteCount, setNoteCount] = useState(10);
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null);

  const { play, stop, isPlaying, currentIndex } = useNotePlayer(sampler);

  useEffect(() => {
    const samplerInstance = createSampler(() => setSampler(samplerInstance));
    setSampler(samplerInstance);
  }, []);

  const playSequence = async () => {
    if (!sampler) return;

    const fullNotePool = noteRanges[selectedString];
    const filteredNotes = includeAccidentals
      ? fullNotePool
      : fullNotePool.filter((note) => !note.includes('#'));

    const newSequence = generateUniqueSequence(filteredNotes, noteCount);
    console.log('Generated Sequence:', newSequence);
    await play(newSequence);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white p-6 shadow-xl rounded-2xl border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Note Trainer</h2>
        <ThemeToggle />

        <label className="block mb-2">
          Select String:
          <select
            className="w-full p-2 mt-1 border rounded bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-colors"
            value={selectedString}
            onChange={(e) => setSelectedString(e.target.value)}
          >
            <option value="E2">E</option>
            <option value="A2">A</option>
            <option value="D3">D</option>
            <option value="G3">G</option>
            <option value="B3">B</option>
            <option value="E4">e</option>
          </select>
        </label>

        <label className="block mb-2">
          <input
            type="checkbox"
            checked={includeAccidentals}
            onChange={(e) => setIncludeAccidentals(e.target.checked)}
          />{' '}
          Include accidentals (sharps/flats)
        </label>

        <label className="block mb-4">
          Number of notes:
          <input
            type="number"
            className=" w-full mt-1 p-2 border rounded bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-colors"
            value={noteCount}
            min={10}
            max={50}
            onChange={(e) => setNoteCount(Number(e.target.value))}
          />
        </label>

        <div className="flex gap-2 items-center justify-center">
          <button
            className={`bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all px-4 py-2 text-white font-semibold rounded-lg shadow" ${
              !sampler || isPlaying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={playSequence}
            disabled={!sampler || isPlaying}
          >
            Play
          </button>
          <button
            className={`bg-red-600 hover:bg-red-700 active:scale-95 transition-all px-4 py-2 text-white font-semibold  rounded-lg shadow ${
              !isPlaying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={stop}
            disabled={!isPlaying}
          >
            Stop
          </button>
        </div>
        {isPlaying ? (
          <div className="w-full h-4 bg-gray-200 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / noteCount) * 100}%` }}
            ></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
