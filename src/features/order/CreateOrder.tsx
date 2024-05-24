import type React from 'react';
import { useState } from 'react';
import type { ActionFunctionArgs } from 'react-router-dom';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { store } from '../../app/store';
import { apiRestaurant } from '../../services/apiRestaurant';
import { Button } from '../../ui/Button';
import Input from '../../ui/Input';
import { StylishLink } from '../../ui/StylishLink';
import { formatCurrency } from '../../utils/helpers';
import { isValidPhone } from '../../utils/validators';
import { EmptyCart } from '../cart/EmptyCart';
import { clearCart, selectCart, selectTotalPrice } from '../cart/cartSlice';
import { fetchAddress } from '../user/userSlice';

interface OrderFormData {
  address: string;
  customer: string;
  phone: string;
  priority?: 'on';
  cart: string;
}

interface FieldError {
  field: string;
  message: string;
}

const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData()) as unknown as OrderFormData;

  if (!isValidPhone(data.phone)) {
    return { field: 'phone', message: 'Invalid phone number' } as FieldError;
  }

  const newOrder = await apiRestaurant.createOrder({
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  });

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

function isErrorField(actionData: FieldError | Response): actionData is FieldError {
  return 'field' in actionData;
}

export function CreateOrder() {
  const cart = useAppSelector(selectCart);
  const { address, status: addressStatus, username, error: addressError } = useAppSelector(state => state.user);
  const [priority, setPriority] = useState(false);
  const totalCartPrice = useAppSelector(selectTotalPrice);
  const finalPrice = priority ? totalCartPrice + totalCartPrice * 0.2 : totalCartPrice;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const actionData = useActionData() as Awaited<ReturnType<typeof action>>;
  const errors = actionData && isErrorField(actionData) ? actionData : null;

  const dispatch = useAppDispatch();

  const handleOnLocationClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();

    dispatch(fetchAddress());
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mx-3 mb-11 mt-4 md:mx-auto md:w-3/4 lg:w-1/2">
      <StylishLink to="/cart">&larr; Back to cart</StylishLink>

      <h2 className="mb-8 mt-4 text-center text-2xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-8 flex flex-col justify-start gap-3 sm:flex-row sm:items-center lg:gap-0">
          <label
            htmlFor="customer"
            className="self-start sm:basis-40">
            First Name
          </label>
          <div className="grow">
            <Input
              inputType="form"
              id="customer"
              name="customer"
              type="text"
              defaultValue={username}
              required
            />
          </div>
        </div>
        <div className="mb-8 flex flex-col justify-start gap-3 sm:flex-row sm:items-center lg:gap-0">
          <label
            htmlFor="phone"
            className="self-start sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <Input
              inputType="form"
              id="phone"
              name="phone"
              type="tel"
              required
              error={!!errors}
            />
            {errors && errors.field === 'phone' && <p className="mt-2 font-bold text-red-500">{errors.message}</p>}
          </div>
        </div>
        <div className="mb-8 flex flex-col justify-start gap-3 sm:flex-row sm:items-center lg:gap-0">
          <label
            htmlFor="address"
            className="self-start sm:basis-40">
            Address
          </label>
          <div className="flex grow flex-wrap items-center gap-3">
            <div className="grow">
              <Input
                inputType="form"
                id="address"
                name="address"
                type="text"
                defaultValue={address}
                disabled={addressStatus === 'loading'}
                required
              />
              {addressStatus === 'failed' && <p className="mt-2 font-bold text-red-500">{addressError}</p>}
            </div>
            <div className="">
              <Button
                onClick={handleOnLocationClick}
                disabled={addressStatus === 'loading'}
                btnStyle="small">
                {addressStatus === 'loading' ? 'Locating...' : '📍 Locate me'}
              </Button>
            </div>
          </div>
        </div>
        <div className="mb-8 flex items-center justify-start gap-5 lg:justify-end">
          <Input
            id="priority"
            name="priority"
            type="checkbox"
            checked={priority}
            onChange={e => setPriority(e.currentTarget.checked)}
            inputType="checkbox"
          />
          <label htmlFor="priority">Want to you give your order priority?</label>
        </div>

        <div>
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          />

          <div className="text-end">
            <Button
              type="submit"
              disabled={isSubmitting || addressStatus === 'loading'}>
              {isSubmitting ? 'Ordering...' : `Order for  ${formatCurrency(finalPrice)}`}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

CreateOrder.action = action;
