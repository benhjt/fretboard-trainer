/**
 * Converts a note like 'C#4' to 'c-sharp' for use in speech file names.
 * @param note - The note string to convert.
 * @returns The formatted note name suitable for file naming.
 */
export const getNoteName = (note: string): string => {
  return note.replace(/[0-9]/g, '').toLowerCase().replace('#', '-sharp');
};

/**
 * Generates a sequence of notes avoiding immediate repeats. This function ensures that no two consecutive notes are the same.
 * @param notes - The array of notes to choose from.
 * @param length - The desired length of the sequence.
 * @return An array of unique notes in sequence.
 */
export const generateUniqueSequence = (
  notes: string[],
  length: number,
): string[] => {
  const sequence: string[] = [];
  let prevNote: string | null = null;

  while (sequence.length < length) {
    const next = notes[Math.floor(Math.random() * notes.length)];
    if (next !== prevNote) {
      sequence.push(next);
      prevNote = next;
    }
  }

  return sequence;
};
