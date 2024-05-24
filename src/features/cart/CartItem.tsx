import { useAppDispatch } from '../../app/hooks';
import type { CartItemDomain } from '../../services/apiRestaurant';
import { UpdateItemQuantity } from '../../ui/UpdateItemQuantity';
import { formatCurrency } from '../../utils/helpers';
import { decreaseQuantity, increaseQuantity } from './cartSlice';

type Props = {
  item: CartItemDomain;
};
export default function CartItem({ item: { name, quantity, totalPrice, pizzaId } }: Props) {
  const dispatch = useAppDispatch();

  return (
    <li className="md:flex md:items-center md:justify-between md:py-2">
      <p className="mb-3 md:mb-0">
        <span className="text-lg">{quantity}</span> &times; {name}
      </p>
      <div className="flex items-center justify-between md:flex-row-reverse md:gap-6">
        <p className="font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity
          onDecrease={() => dispatch(decreaseQuantity({ id: pizzaId }))}
          onIncrease={() => dispatch(increaseQuantity({ id: pizzaId }))}
        />
      </div>
    </li>
  );
}
