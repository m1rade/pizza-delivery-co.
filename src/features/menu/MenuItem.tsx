import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { IMenuItem } from '../../services/apiRestaurant';
import { Button } from '../../ui/Button';
import { UpdateItemQuantity } from '../../ui/UpdateItemQuantity';
import { formatCurrency } from '../../utils/helpers';
import { addItem, decreaseQuantity, increaseQuantity, makeCurrentQuantityById } from '../cart/cartSlice';

export function MenuItem({ item }: { item: IMenuItem }) {
  const { imageUrl, ingredients, name, soldOut, unitPrice, id } = item;
  const currentQuantity = useAppSelector(store => makeCurrentQuantityById(store, id));
  const isInCart = currentQuantity > 0;
  const dispatch = useAppDispatch();

  const handleBtnClick = () => {
    dispatch(addItem({ pizzaId: id, name, unitPrice, quantity: 1, totalPrice: unitPrice * 1 }));
  };

  return (
    <li className="flex gap-4 py-2 transition-all duration-300 hover:bg-yellow-200">
      <img
        src={imageUrl}
        alt={name}
        className={`h-36 lg:h-60 ${soldOut ? 'opacity-80 grayscale' : ''}`}
      />
      <div className={`flex flex-grow flex-col pt-1 text-stone-900 ${soldOut ? 'text-stone-500 text-opacity-80' : ''}`}>
        <p className="text-lg font-semibold md:text-xl">{name}</p>
        <p
          className={`text-sm capitalize italic text-stone-700 md:text-base ${soldOut ? 'text-stone-500 text-opacity-80' : ''}`}>
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
          {!soldOut ? (
            <p className="lg:text-lg">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium uppercase text-orange-700 lg:text-lg">Sold out</p>
          )}

          {!soldOut &&
            (isInCart ? (
              <UpdateItemQuantity
                quantity={currentQuantity}
                onDecrease={() => dispatch(decreaseQuantity({ id }))}
                onIncrease={() => dispatch(increaseQuantity({ id }))}
              />
            ) : (
              <Button
                onClick={handleBtnClick}
                btnStyle="functional">
                +
              </Button>
            ))}
        </div>
      </div>
    </li>
  );
}
