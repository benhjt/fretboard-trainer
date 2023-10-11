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
import { IQuestion } from '../../types';

function App() {
  const [score, setScore] = useState<number>(0);
  const [answersDisabled, setAnswersDisabled] = useState<boolean>(true);
  const [question, setQuestion] = useState<IQuestion>();
  const [answerResultMessage, setAnswerResultMessage] = useState<string>();

  function getQuestion() {
    const randomStringNo = getRandomInt(MIN_STRING, MAX_STRING);
    const stringIndex = randomStringNo - 1;
    const randomFretNo = getRandomInt(MIN_FRET, MAX_FRET);
    setQuestion({
      fretNo: randomFretNo,
      stringNo: randomStringNo,
      answer: FRETBOARD_MAP[stringIndex][randomFretNo],
    });
  }

  function startQuiz() {
    setAnswersDisabled(false);
    setScore(0);
    getQuestion();
  }

  function checkAnswer(guess: string | undefined) {
    if (guess === question?.answer) {
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
      {question && <Question question={question} />}
      <AnswerSelection
        disabled={answersDisabled && !question}
        onAnswerSelected={(value) => checkAnswer(value)}
      />
      <div>
        <Button onClick={startQuiz}>Start!</Button>
      </div>
    </main>
  );
}

export default App;
