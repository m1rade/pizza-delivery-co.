import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { CreateUser } from '../features/user/CreateUser';

export function Home() {
  const username = useAppSelector(store => store.user.username);

  if (username)
    return (
      <Navigate
        replace
        to="/menu"
      />
    );

  return (
    <div className="my-5 px-4 text-center sm:my-10">
      <h1 className="mb-8 text-3xl font-semibold md:text-4xl">
        The best pizza.
        <br />
        <span className="text-2xl text-orange-600 md:text-3xl">Straight out of the oven, straight to you.</span>
      </h1>

      <CreateUser />
    </div>
  );
}
