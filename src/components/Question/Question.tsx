import React from 'react';

interface QuestionProps {
  stringNo?: number;
  fretNo?: number;
}

function Question({ stringNo, fretNo }: QuestionProps) {
  return (
    <div>
      {stringNo && fretNo && (
        <>
          String: {stringNo} - Fret: {fretNo}
        </>
      )}
    </div>
  );
}

export default Question;
