import React from 'react';

import { NOTES } from '../../constants';

interface AnswerSelectionProps {
  onAnswerSelected: (value: string | undefined) => void;
  disabled: boolean;
}

function AnswerSelection({
  onAnswerSelected,
  disabled = true,
}: AnswerSelectionProps) {
  return (
    <div className="grid grid-cols-6 gap-1 w-60">
      {NOTES.map((note) => (
        <div key={note}>
          <button
            disabled={disabled}
            type="button"
            className="inline-flex items-center justify-center align-midddle min-w-[36px] px-2 py-1 text-neutral-200 bg-slate-600 hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:pointer-events-none disabled:cursor-default disabled:bg-slate-100 disabled:text-neutral-600 shadow-sm select-none cursor-pointer outline-none border-none rounded-md transition-colors"
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
