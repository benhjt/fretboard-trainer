import { useEffect, useState } from 'react';

import {
  FRETBOARD_MAP,
  MAX_FRET,
  MAX_STRING,
  MIN_FRET,
  MIN_STRING,
} from '../../constants';
import AnswerSelection from '../AnswerSelection/AnswerSelection';
import { getRandomInt } from '../../utils';
import Button from '../Button/Button';

function App() {
  const [stringNo, setStringNo] = useState<number>(1);
  const [fretNo, setFretNo] = useState<number>(1);
  const [answer, setAnswer] = useState<string>();

  function startQuiz() {
    const randomString = getRandomInt(MIN_STRING, MAX_STRING);
    const stringIndex = randomString - 1;
    const randomFret = getRandomInt(MIN_FRET, MAX_FRET);
    setFretNo(randomFret);
    setStringNo(randomString);
    setAnswer(FRETBOARD_MAP[stringIndex][randomFret]);
  }

  function checkAnswer(guess: string | undefined) {
    if (guess === answer) {
      alert('correct!');
    } else {
      alert('wrong!');
    }
  }

  return (
    <main className="container mx-auto flex justify-center">
      <div>
        <Button onClick={startQuiz}>Start!</Button>
        String: {stringNo} - Fret: {fretNo}
      </div>
      <AnswerSelection onAnswerSelected={(value) => checkAnswer(value)} />
    </main>
  );
}

export default App;
