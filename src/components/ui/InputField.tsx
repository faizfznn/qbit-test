import React from 'react';
import { AlertCircle } from 'lucide-react';

// interface input field
export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  leftIcon?: React.ReactNode;
  testId?: string;
  errorTestId?: string;
}

// input field custom
export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  optional = false,
  error,
  leftIcon,
  testId,
  errorTestId,
  className = '',
  ...props
}) => {
  // id untuk pesan error
  const errorId = `error-${id}`;

  return (
    <div>
      {/* label input */}
      <label
        htmlFor={id}
        className="block text-xs font-medium text-zinc-800 mb-1.5"
      >
        {label}{' '}
        {optional && (
          <span className="text-zinc-400 font-normal">(Optional)</span>
        )}
      </label>

      {/* wrapper input dan icon */}
      <div className="relative">
        {leftIcon && (
          <span
            aria-hidden="true"
            className="text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center"
          >
            {leftIcon}
          </span>
        )}

        <input
          id={id}
          name={id}
          data-testid={testId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`w-full h-11 ${
            leftIcon ? 'pl-10 pr-3.5' : 'px-3.5'
          } rounded-lg border text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:outline-none ${
            error
              ? 'border-red-500 focus:border-red-600'
              : 'border-zinc-200 focus:border-[#C81E56]'
          } ${className}`}
          {...props}
        />
      </div>

      {/* pesan error kalau validasi gagal */}
      {error && (
        <p
          id={errorId}
          data-testid={errorTestId}
          className="mt-1 text-xs text-red-600 flex items-center gap-1"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
