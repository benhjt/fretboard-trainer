import React from 'react';

import { NOTES } from '../../constants';
import AnswerButton from '../AnswerButton';

interface AnswerSelectionProps {
  onAnswerSelected: (value: string | undefined) => void;
}

function AnswerSelection({ onAnswerSelected }: AnswerSelectionProps) {
  return (
    <div className="grid grid-cols-6 gap-1 w-60">
      {NOTES.map((note) => (
        <div key={note}>
          <AnswerButton
            value={note}
            onClick={(value) => onAnswerSelected(value)}
          >
            {note}
          </AnswerButton>
        </div>
      ))}
    </div>
  );
}

export default AnswerSelection;
