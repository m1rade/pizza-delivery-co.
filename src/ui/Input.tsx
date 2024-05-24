import type React from 'react';

interface PropsType extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  inputType?: 'search' | 'primary' | 'form' | 'checkbox';
  error?: boolean;
}

const inputTypes = {
  search:
    'w-28 rounded-lg bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72',
  primary:
    'mb-8 w-72 rounded-lg border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 md:px-6 md:py-3 md:text-base',
  form: 'w-full rounded-lg border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 md:px-6 md:py-3 md:text-base',
  checkbox:
    'aspect-square h-5 accent-orange-400 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-offset-2',
};

export default function Input({ inputType = 'primary', className, error, ...props }: PropsType) {
  return (
    <input
      className={inputTypes[inputType] + `${error ? ' border-2 border-red-500 focus:ring-0' : ''}`}
      {...props}
    />
  );
}
