import type React from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

interface Props extends LinkProps, React.RefAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  type?: 'baseType' | 'logo';
}

const linkTypes = {
  baseType: 'text-blue-500 hover:text-blue-600 hover:underline text-lg',
  logo: 'tracking-widest focus-visible:outline-none focus-visible:ring focus-visible:ring-orange-500',
};

export function StylishLink({ children, type = 'baseType', to, className, ...restProps }: Props) {
  const navigate = useNavigate();

  if (to === '-1')
    return (
      <button
        className={linkTypes['baseType']}
        onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link
      to={to}
      className={linkTypes[type]}
      {...restProps}>
      {children}
    </Link>
  );
}
