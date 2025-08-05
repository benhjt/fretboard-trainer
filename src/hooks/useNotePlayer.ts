import { useRef, useState } from 'react';
import * as Tone from 'tone';
import { getNoteName } from '../utils/notes';

export function useNotePlayer(sampler: Tone.Sampler | null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sequence, setSequence] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const timeoutRefs = useRef<number[]>([]);
  const isPlayingRef = useRef(false);

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const clearError = () => setError(null);

  const stop = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentIndex(0);
    setSequence([]);
    clearAllTimeouts();
  };

  const playNext = (index: number, seq = sequence) => {
    if (!sampler || !isPlayingRef.current || index >= seq.length) {
      stop();
      return;
    }

    setCurrentIndex(index);
    const note = seq[index];
    const speechUrl = `${import.meta.env.BASE_URL}speech/${getNoteName(
      note,
    )}.mp3`;

    try {
      new Tone.Player({
        url: speechUrl,
        autostart: true,
        onstop: () => {
          const timeout1 = window.setTimeout(() => {
            try {
              sampler.triggerAttackRelease(note, 4);
              const timeout2 = window.setTimeout(
                () => playNext(index + 1, seq),
                4000,
              );
              timeoutRefs.current.push(timeout2);
            } catch (err) {
              console.error('Error playing note:', err);
              setError('Failed to play note. Please try again.');
              stop();
            }
          }, 3000);
          timeoutRefs.current.push(timeout1);
        },
        onerror: (err) => {
          console.error('Error loading speech:', err);
          setError(
            'Failed to load speech audio. Please check your internet connection.',
          );
          stop();
        },
      }).toDestination();
    } catch (err) {
      console.error('Error creating player:', err);
      setError('Failed to create audio player. Please try again.');
      stop();
    }
  };

  const play = async (seq: string[]) => {
    if (!sampler) return;

    try {
      clearError();
      await Tone.start();
      isPlayingRef.current = true;
      setIsPlaying(true);
      setSequence(seq);
      setCurrentIndex(0);
      playNext(0, seq);
    } catch (err) {
      console.error('Error starting playback:', err);
      setError('Failed to start audio playback. Please try again.');
      stop();
    }
  };

  return {
    play,
    stop,
    isPlaying,
    currentIndex,
    sequence,
    error,
    clearError,
  };
}
