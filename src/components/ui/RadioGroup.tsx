import React from 'react';

// interface opsi radio
export interface RadioOption<T extends string = string> {
  label: string;
  value: T;
  testId?: string;
}

// interface props radio group
export interface RadioGroupProps<T extends string = string> {
  label: string;
  name: string;
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

// radio group custom
export function RadioGroup<T extends string = string>({
  label,
  name,
  options,
  value,
  onChange,
}: RadioGroupProps<T>): React.ReactElement {
  return (
    <fieldset>
      {/* label kategori radio */}
      <legend className="block text-xs font-medium text-zinc-800 mb-2">
        {label}
      </legend>

      {/* list pilihan radio */}
      <div className="flex items-center gap-16">
        {options.map((option) => {
          const optionId = `${name}-${option.value.toLowerCase()}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className="inline-flex items-center gap-2 text-xs font-medium text-zinc-800 cursor-pointer select-none"
            >
              <input
                id={optionId}
                name={name}
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                data-testid={option.testId}
                className="w-4 h-4 accent-[#C81E56] cursor-pointer"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
