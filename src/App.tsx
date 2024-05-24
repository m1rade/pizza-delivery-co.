import { Outlet, useNavigation } from 'react-router-dom';
import { Header } from './ui/Header';
import { Spinner } from './ui/Spinner';

export function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="relative grid h-[100dvh] grid-rows-[auto_1fr] border-b-8 border-b-yellow-500 md:static">
      {isLoading && <Spinner />}

      <Header />

      <main className="overflow-y-scroll p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
