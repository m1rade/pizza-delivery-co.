import { useMediaPredicate } from 'react-media-hook';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { formatCurrency } from '../../utils/helpers';
import { selectTotalPrice, selectTotalQuantity } from './cartSlice';

export function CartOverview() {
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  const isMdQueryMatched = useMediaPredicate('(min-width: 768px)');

  if (!totalQuantity) return null;

  return (
    <div
      className={`absolute bottom-0 left-0 z-[999] flex w-full items-center justify-between bg-orange-500 px-5 py-3 text-center text-sm text-stone-100 transition-all duration-300 md:relative md:rounded-xl md:px-4 md:py-1 md:text-base md:hover:bg-orange-600 md:active:bg-orange-700`}>
      {!isMdQueryMatched ? (
        <p className="space-x-4 font-semibold uppercase text-stone-50 md:mb-3">
          <span>{totalQuantity > 1 ? `${totalQuantity} pizzas` : `${totalQuantity} pizza`}</span>
          <span>{formatCurrency(totalPrice)}</span>
        </p>
      ) : (
        <span className="absolute -left-2 -top-2 z-[9999] block rounded-full bg-green-500 px-2.5 text-stone-50">
          {totalQuantity}
        </span>
      )}

      <Link
        to="/cart"
        className="text-stone-100 hover:text-stone-50 hover:underline">
        {isMdQueryMatched ? (
          <div className="flex gap-2">
            <span>🛒</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        ) : (
          `Open cart ${String.fromCharCode(8594)}`
        )}
      </Link>
    </div>
  );
}
