import React from 'react';

/**
 * Komponen Button reusable untuk aksi form dan navigasi.
 * Mendukung beberapa varian gaya:
 * - primary: tombol utama warna merah/magenta (#C81E56)
 * - icon: tombol transparan dengan border halus untuk tombol navigasi seperti icon Back
 * - secondary: tombol netral dengan background abu-abu
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon' | 'secondary';
  fullWidth?: boolean;
  testId?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  testId,
  className = '',
  children,
  ...props
}) => {
  // Penentuan style berdasarkan varian
  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles =
      'h-11 px-4 rounded-xl bg-[#C81E56] hover:bg-[#b0184a] active:bg-[#991440] text-white text-xs font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C81E56] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  } else if (variant === 'icon') {
    variantStyles =
      'p-1.5 -ml-1.5 rounded-lg text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200 transition-colors cursor-pointer flex items-center justify-center';
  } else if (variant === 'secondary') {
    variantStyles =
      'h-10 px-3.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 active:bg-zinc-100 text-zinc-700 text-xs font-medium transition-colors cursor-pointer';
  }

  return (
    <button
      data-testid={testId}
      className={`${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
