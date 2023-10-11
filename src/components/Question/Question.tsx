import { IQuestion } from '../../types';

interface QuestionProps {
  question: IQuestion;
}

function Question({ question }: QuestionProps) {
  return (
    <div>
      {question.stringNo && question.fretNo && (
        <>
          String: {question.stringNo} - Fret: {question.fretNo}
        </>
      )}
    </div>
  );
}

export default Question;
