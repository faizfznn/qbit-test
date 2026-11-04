import React from 'react';
import { AlertCircle } from 'lucide-react';

/*
 * Komponen InputField reusable untuk all form
 */
export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  leftIcon?: React.ReactNode;
  testId?: string;
  errorTestId?: string;
}

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
  const errorId = `error-${id}`;

  return (
    <div>
      {/* label input field */}
      <label
        htmlFor={id}
        className="block text-xs font-medium text-zinc-800 mb-1.5"
      >
        {label}{' '}
        {optional && (
          <span className="text-zinc-400 font-normal">(Optional)</span>
        )}
      </label>

      {/* wrapper input dengan ikon*/}
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
          data-testid={testId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 transition-colors focus:outline-none focus:ring-1 ${leftIcon ? 'pl-10' : ''
            } ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-400'
              : 'border-zinc-200 focus:border-zinc-400 focus:ring-zinc-300'
            } ${className}`}
          {...props}
        />
      </div>

      {/* error message */}
      {error && (
        <div
          id={errorId}
          data-testid={errorTestId}
          role="alert"
          className="flex items-center gap-1.5 mt-1 text-[11px] text-red-600 font-medium"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
