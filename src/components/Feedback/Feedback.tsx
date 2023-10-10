interface FeedbackProps {
  answerResultMessage: string | undefined;
}

function Feedback({ answerResultMessage }: FeedbackProps) {
  return (
    <div
      className={
        'transition-opacity ' +
        (answerResultMessage ? 'opacity-100' : 'opacity-0')
      }
    >
      {answerResultMessage}
    </div>
  );
}

export default Feedback;
