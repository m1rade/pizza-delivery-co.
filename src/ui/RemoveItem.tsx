import { Button } from './Button';

type Props = {
  onDelete?: () => void;
};
export function RemoveItem({ onDelete }: Props) {
  return (
    <Button
      onClick={onDelete}
      btnStyle="small">
      Remove
    </Button>
  );
}
