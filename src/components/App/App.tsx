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
  const [score, setScore] = useState<number>(0);
  const [stringNo, setStringNo] = useState<number>();
  const [disabledAnswers, setDisabledAnswers] = useState<boolean>(true);
  const [fretNo, setFretNo] = useState<number>();
  const [answer, setAnswer] = useState<string>();
  const [answerResultMessage, setAnswerResultMessage] = useState<string>();

  function getQuestion() {
    const randomStringNo = getRandomInt(MIN_STRING, MAX_STRING);
    const stringIndex = randomStringNo - 1;
    const randomFretNo = getRandomInt(MIN_FRET, MAX_FRET);
    setFretNo(randomFretNo);
    setStringNo(randomStringNo);
    setAnswer(FRETBOARD_MAP[stringIndex][randomFretNo]);
  }

  function startQuiz() {
    setDisabledAnswers(false);
    setScore(0);
    getQuestion();
  }

  function checkAnswer(guess: string | undefined) {
    if (guess === answer) {
      setAnswerResultMessage('✔ Correct!');
      setScore(score + 1);
    } else {
      setAnswerResultMessage('❌ Wrong!');
      if (score > 0) {
        setScore(score - 1);
      }
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
