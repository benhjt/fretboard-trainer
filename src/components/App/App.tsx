import { useState } from 'react';

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
  const [stringNo, setStringNo] = useState<number>();
  const [fretNo, setFretNo] = useState<number>();
  const [answer, setAnswer] = useState<string>();
  const [answerResultMessage, setAnswerResultMessage] = useState<string>();

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
      setAnswerResultMessage('✔ Correct!');
    } else {
      setAnswerResultMessage('❌ Wrong!');
    }
  }

  return (
    <main className="container mx-auto flex items-center flex-col">
      <div
        className={
          'transition-opacity ' +
          (answerResultMessage ? 'opacity-100' : 'opacity-0')
        }
      >
        {answerResultMessage}
      </div>
      <div>
        {stringNo && fretNo && (
          <>
            String: {stringNo} - Fret: {fretNo}
          </>
        )}
      </div>
      <AnswerSelection onAnswerSelected={(value) => checkAnswer(value)} />
      <div>
        <Button onClick={startQuiz}>Start!</Button>
      </div>
    </main>
  );
}

export default App;
