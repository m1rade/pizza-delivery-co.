import type React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

type Props = {
  children?: React.ReactNode;
};
export function ProtectedRoute({ children }: Props) {
  const username = useAppSelector(store => store.user.username);

  return username ? (
    children
  ) : (
    <Navigate
      replace
      to="/"
    />
  );
}
