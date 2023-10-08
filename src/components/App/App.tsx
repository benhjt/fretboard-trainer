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
import Question from '../Question';
import Feedback from '../Feedback';

function App() {
  const [stringNo, setStringNo] = useState<number>();
  const [disabledAnswers, setDisabledAnswers] = useState<boolean>(true);
  const [fretNo, setFretNo] = useState<number>();
  const [answer, setAnswer] = useState<string>();
  const [answerResultMessage, setAnswerResultMessage] = useState<string>();

  function startQuiz() {
    setDisabledAnswers(false);
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
      <Feedback answerResultMessage={answerResultMessage} />
      <Question stringNo={stringNo} fretNo={fretNo} />
      <AnswerSelection
        disabled={disabledAnswers}
        onAnswerSelected={(value) => checkAnswer(value)}
      />
      <div>
        <Button onClick={startQuiz}>Start!</Button>
      </div>
    </main>
  );
}

export default App;
