import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { noteRanges } from '../../constants/noteRanges';
import { useNotePlayer } from '../../hooks/useNotePlayer';
import { createSampler } from '../../utils/audio';
import { generateUniqueSequence } from '../../utils/notes';

export default function NoteTrainer() {
  const [selectedString, setSelectedString] = useState<string>('E2');
  const [includeAccidentals, setIncludeAccidentals] = useState(true);
  const [noteCount, setNoteCount] = useState(10);
  const [sampler, setSampler] = useState<Tone.Sampler | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const { play, stop, isPlaying, currentIndex, error, clearError } =
    useNotePlayer(sampler);

  useEffect(() => {
    setIsLoading(true);
    setLoadError(null);
    const samplerInstance = createSampler(
      () => {
        setSampler(samplerInstance);
        setIsLoading(false);
      },
      (error) => {
        setLoadError(error.message);
        setIsLoading(false);
      },
    );
    setSampler(samplerInstance);
  }, []);

  const playSequence = async () => {
    if (!sampler) return;

    clearError();
    const fullNotePool = noteRanges[selectedString];
    const filteredNotes = includeAccidentals
      ? fullNotePool
      : fullNotePool.filter((note) => !note.includes('#'));

    const newSequence = generateUniqueSequence(filteredNotes, noteCount);
    console.log('Generated Sequence:', newSequence);
    await play(newSequence);
  };

  const handleDismissError = () => {
    clearError();
    setLoadError(null);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="bg-white text-black dark:bg-gray-900 dark:text-white p-6 shadow-xl rounded-2xl border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Note Trainer</h2>

        {/* Error Display */}
        {(loadError || error) && (
          <div
            className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            role="alert"
            aria-live="polite"
          >
            <div className="flex justify-between items-start">
              <div>
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{loadError || error}</span>
              </div>
              <button
                onClick={handleDismissError}
                className="ml-2 text-red-700 hover:text-red-900 font-bold"
                aria-label="Dismiss error message"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div
            className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
              Loading audio samples...
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="string-select" className="block mb-2 font-medium">
              Select String:
            </label>
            <select
              id="string-select"
              className="w-full p-2 border rounded bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedString}
              onChange={(e) => setSelectedString(e.target.value)}
              aria-describedby="string-help"
            >
              <option value="E2">E (Low E - 6th string)</option>
              <option value="A2">A (5th string)</option>
              <option value="D3">D (4th string)</option>
              <option value="G3">G (3rd string)</option>
              <option value="B3">B (2nd string)</option>
              <option value="E4">e (High E - 1st string)</option>
            </select>
            <div id="string-help" className="text-sm text-gray-600 mt-1">
              Choose which guitar string to practice
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAccidentals}
                onChange={(e) => setIncludeAccidentals(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                aria-describedby="accidentals-help"
              />
              <span className="font-medium">
                Include accidentals (sharps/flats)
              </span>
            </label>
            <div
              id="accidentals-help"
              className="text-sm text-gray-600 mt-1 ml-6"
            >
              Include notes like F♯, C♯, etc. in the practice sequence
            </div>
          </div>

          <div>
            <label htmlFor="note-count" className="block mb-2 font-medium">
              Number of notes: {noteCount}
            </label>
            <input
              type="range"
              id="note-count"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              value={noteCount}
              min={5}
              max={50}
              step={1}
              onChange={(e) => setNoteCount(Number(e.target.value))}
              aria-describedby="note-count-help"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>5</span>
              <span>50</span>
            </div>
            <div id="note-count-help" className="text-sm text-gray-600 mt-1">
              Number of notes to include in the practice sequence
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center justify-center mt-6">
          <button
            className={`bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all px-6 py-3 text-white font-semibold rounded-lg shadow focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              !sampler || isPlaying || isLoading
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={playSequence}
            disabled={!sampler || isPlaying || isLoading}
            aria-describedby="play-help"
          >
            {isLoading ? 'Loading...' : isPlaying ? 'Playing...' : 'Play'}
          </button>
          <button
            className={`bg-red-600 hover:bg-red-700 active:scale-95 transition-all px-6 py-3 text-white font-semibold rounded-lg shadow focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
              !isPlaying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={stop}
            disabled={!isPlaying}
            aria-label="Stop playing sequence"
          >
            Stop
          </button>
        </div>

        <div id="play-help" className="text-sm text-gray-600 mt-2 text-center">
          {isLoading
            ? 'Please wait while audio samples load'
            : !sampler
            ? 'Audio not ready'
            : 'Click Play to start the note training sequence'}
        </div>

        {isPlaying && (
          <div
            className="mt-6"
            role="region"
            aria-live="polite"
            aria-label="Playback progress"
          >
            <div className="text-center mb-3">
              <div className="text-sm text-gray-600 mb-1">
                Note {currentIndex + 1} of {noteCount}
              </div>
              <div
                className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={currentIndex + 1}
                aria-valuemin={1}
                aria-valuemax={noteCount}
                aria-label={`Progress: ${
                  currentIndex + 1
                } of ${noteCount} notes`}
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
                  style={{
                    width: `${((currentIndex + 1) / noteCount) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
