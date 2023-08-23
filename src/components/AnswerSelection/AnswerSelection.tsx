import React from 'react';

import { NOTES } from '../../constants';

interface AnswerSelectionProps {
  onAnswerSelected: (value: string | undefined) => void;
}

function AnswerSelection({ onAnswerSelected }: AnswerSelectionProps) {
  return (
    <div className="grid grid-cols-6 gap-1 w-60">
      {NOTES.map((note) => (
        <div key={note}>
          <button
            type="button"
            className="inline-flex items-center justify-center align-midddle min-w-[36px] px-2 py-1 text-neutral-200 bg-slate-500 hover:bg-slate-700 shadow-sm select-none cursor-pointer outline-none border-none rounded-md uppercase transition-colors"
            onClick={() => onAnswerSelected(note)}
            value={note}
          >
            {note}
          </button>
        </div>
      ))}
    </div>
  );
}

export default AnswerSelection;
