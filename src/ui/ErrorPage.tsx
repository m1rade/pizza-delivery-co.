import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { StylishLink } from './StylishLink';

export function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="my-10 w-full text-center">
      <h1 className="mb-8 text-2xl font-bold text-stone-900 md:text-3xl">Something went wrong 😢</h1>
      <p className="mb-12 text-xl text-orange-600 md:text-2xl">
        {' '}
        {isRouteErrorResponse(error) ? error.data : error instanceof Error ? error.message : 'Oops'}{' '}
      </p>
      <StylishLink to="-1">&larr; Go back</StylishLink>
    </div>
  );
}
