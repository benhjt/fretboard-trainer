const MIN_STRING = 1;
const MAX_STRING = 6;

const MIN_FRET = 0;
const MAX_FRET = 12;

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B♭', 'B'];

const FRETBOARD_MAP: string[][] = [
  ['E', 'F', 'F#', 'G', 'G#', 'A', 'B♭', 'B', 'C', 'C#', 'D', 'D#', 'E'],
  ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B♭', 'B'],
  ['G', 'G#', 'A', 'B♭', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
  ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B♭', 'B', 'C', 'C#', 'D'],
  ['A', 'B♭', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
  ['E', 'F', 'F#', 'G', 'G#', 'A', 'B♭', 'B', 'C', 'C#', 'D', 'D#', 'E'],
];

export { FRETBOARD_MAP, MAX_FRET, MAX_STRING, MIN_FRET, MIN_STRING, NOTES };
