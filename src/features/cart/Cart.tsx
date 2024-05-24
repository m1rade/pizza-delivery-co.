import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button } from '../../ui/Button';
import { StylishLink } from '../../ui/StylishLink';
import { formatCurrency } from '../../utils/helpers';
import CartItem from './CartItem';
import { EmptyCart } from './EmptyCart';
import { clearCart, selectCart, selectTotalPrice } from './cartSlice';

export function Cart() {
  const username = useAppSelector(store => store.user.username);
  const cart = useAppSelector(selectCart);
  const totalPrice = useAppSelector(selectTotalPrice);

  const dispatch = useAppDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mb-11 px-4 py-3 lg:mx-auto lg:w-3/4">
      <StylishLink to="/menu">&larr; Back to menu</StylishLink>

      <h2 className="my-7 text-xl font-semibold">Your cart, {username}</h2>

      <div className="bg-stone-50 px-8 pb-4 pt-2">
        <ul className="mt-3 divide-y divide-orange-500 border-b-2 border-b-orange-500 md:text-lg">
          {cart.map(item => (
            <CartItem
              key={item.pizzaId}
              item={item}
            />
          ))}
        </ul>
        <p className="mt-2 text-lg font-semibold md:text-right md:text-xl">{formatCurrency(totalPrice)}</p>
      </div>

      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <Button
          btnStyle="secondary"
          onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}
