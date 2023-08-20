import React, { ReactNode } from 'react';

interface AnswerButtonProps {
  value: string;
  onClick: (value: string) => void;
  children: ReactNode;
}

function AnswerButton({ value, onClick, children }: AnswerButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center align-midddle min-w-[36px] px-2 py-1 text-neutral-200 bg-slate-500 hover:bg-slate-700 shadow-sm select-none cursor-pointer outline-none border-none rounded-md uppercase transition-colors"
      onClick={() => onClick(value)}
      value={value}
    >
      {children}
    </button>
  );
}

export default AnswerButton;
