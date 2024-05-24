import { Button } from './Button';

type Props = {
  quantity?: number | string;
  onIncrease?: () => void;
  onDecrease?: () => void;
};
export function UpdateItemQuantity({ onDecrease, onIncrease, quantity }: Props) {
  return (
    <div className="flex items-center gap-4 md:gap-5">
      <Button
        onClick={onDecrease}
        btnStyle="round">
        &mdash;
      </Button>
      {quantity && <span className="text-lg">{quantity}</span>}
      <Button
        onClick={onIncrease}
        btnStyle="round">
        +
      </Button>
    </div>
  );
}
