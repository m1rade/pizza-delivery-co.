import { StylishLink } from '../../ui/StylishLink';

export function EmptyCart() {
  return (
    <div className="mx-10 my-6">
      <StylishLink to="/menu">&larr; Back to menu</StylishLink>

      <p className="my-12 text-center text-lg font-medium">Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}
