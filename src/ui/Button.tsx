import type React from 'react';
import { Link, type To } from 'react-router-dom';

type BtnStylesType = 'primary' | 'secondary' | 'small' | 'functional' | 'info' | 'round';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
  to?: To;
  btnStyle?: BtnStylesType;
}

const primaryBtn =
  'inline-block bg-orange-500 font-semibold uppercase text-stone-50 outline-offset-8 transition-all duration-300 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow-50 active:bg-orange-700';
const secondaryBtn =
  'inline-block border-2 border-orange-400 font-medium uppercase text-stone-900 outline-offset-8 transition-all duration-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-50';

const btnStyles: { [K in BtnStylesType]: string } = {
  primary: primaryBtn + ' rounded-xl px-3 py-2 md:px-4 md:py-3 md:text-lg',
  secondary:
    secondaryBtn +
    ' rounded-xl px-3 py-1.5 md:px-4 md:py-2.5 md:text-lg hover:bg-orange-400 hover:text-stone-50 active:bg-orange-200 active:text-stone-900',
  small: secondaryBtn + ' rounded-2xl px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base',
  functional: 'rounded-full px-3 py-1 text-lg lg:px-4 lg:py-2 lg:text-xl ' + primaryBtn,
  info: 'rounded-xl capitalize font-medium px-3 py-2',
  round:
    'rounded-full px-2.5 py-0.5 md:px-3.5 md:py-1 text-lg hover:bg-orange-500 hover:text-stone-50 active:bg-orange-600 active:text-stone-50 ' +
    secondaryBtn,
};

export function Button({ children, className, to, btnStyle = 'primary', ...restProps }: Props) {
  if (to) {
    return (
      <Link
        to={to}
        className={btnStyles[btnStyle]}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={btnStyles[btnStyle]}
      {...restProps}>
      {children}
    </button>
  );
}
