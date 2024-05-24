import { useAppSelector } from '../../app/hooks';

export function Username() {
  const username = useAppSelector(store => store.user.username);

  if (!username) return null;

  return <p className="hidden text-sm md:block">{username}</p>;
}
