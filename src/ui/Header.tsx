import { useLocation } from 'react-router-dom';
import { CartOverview } from '../features/cart/CartOverview';
import { SearchOrder } from '../features/order/SearchOrder';
import { Username } from '../features/user/Username';
import { StylishLink } from './StylishLink';

export function Header() {
  const location = useLocation();

  return (
    <header className="flex w-full items-center justify-between bg-yellow-500 px-4 py-3 uppercase sm:px-6 md:relative lg:justify-around">
      <StylishLink
        to="/"
        type="logo">
        Fast Pizza Delivery Co.
      </StylishLink>
      <SearchOrder />

      <div className="ml-3 flex items-center gap-3">
        <Username />
        {location.pathname !== '/cart' && <CartOverview />}
      </div>
    </header>
  );
}
