import React from 'react';

// interface
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  testId?: string;
}

// button custom
export const Button: React.FC<ButtonProps> = ({
  fullWidth = false,
  testId,
  className = '',
  children,
  ...props
}) => {

  // classname tailwind
  const baseStyles =
    'h-11 px-4 rounded-lg bg-[#C81E56] hover:bg-[#b0184a] active:bg-[#991440] text-white text-xs font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C81E56] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      data-testid={testId}
      className={`${baseStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
