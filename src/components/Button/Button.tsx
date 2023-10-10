import { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center align-midddle min-w-[36px] px-2 py-1 text-neutral-200 bg-blue-600 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 shadow-sm select-none cursor-pointer outline-none border-none rounded-md transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
