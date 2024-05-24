import { useEffect } from 'react';
import type { LoaderFunctionArgs, ParamParseKey, Params } from 'react-router-dom';
import { useFetcher, useLoaderData } from 'react-router-dom';
import type { Paths } from '../../routes/paths';
import type { IMenuItem } from '../../services/apiRestaurant';
import { apiRestaurant } from '../../services/apiRestaurant';
import { Button } from '../../ui/Button';
import { calcMinutesLeft, formatCurrency, formatDate } from '../../utils/helpers';
import { OrderItem } from './OrderItem';

interface ActionArgs extends LoaderFunctionArgs {
  params: Params<ParamParseKey<typeof Paths.orderDetails>>;
}

const loader = async ({ params }: ActionArgs) => await apiRestaurant.getOrder(params.orderId ?? '');

const action = async ({ params }: ActionArgs) => {
  await apiRestaurant.updateOrder(params.orderId ?? '', { priority: true });
  return null;
};

export function Order() {
  const order = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const fetcher = useFetcher<IMenuItem[]>();
  const fetcherIsLoading = fetcher.state === 'loading';
  const fetcherIsSubmitting = fetcher.state === 'submitting';

  const { estimatedDelivery, orderPrice, priority, priorityPrice, status, id, cart } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  return (
    <div className="mx-2 my-7 space-y-8">
      <div className="flex flex-wrap items-center justify-evenly gap-2">
        <h2 className="text-xl font-semibold">Order №{id} status</h2>
        <div className="space-x-3">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide ${status === 'delivered' ? 'bg-green-500 text-green-50' : 'bg-amber-500 text-amber-50'}`}>
            {status} order
          </span>
        </div>
      </div>

      <div className="mx-auto flex w-full flex-wrap items-center justify-between gap-2 bg-stone-50 px-8 py-4 sm:w-5/6 md:w-4/6 lg:w-1/2">
        <p className="font-medium">
          {deliveryIn >= 0 ? `Only ${deliveryIn} minutes left 😃` : 'Order should have arrived'}
        </p>
        <p className="text-sm text-stone-600">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div className="mx-auto w-full bg-stone-50 px-8 py-4 sm:w-5/6 md:w-4/6 lg:w-1/2">
        <ul className="divide-y divide-orange-600 border-b-2 border-orange-400">
          {cart.map(item => (
            <OrderItem
              key={item.pizzaId}
              item={item}
              ingredients={fetcher.data?.find(menuItem => menuItem.id === item.pizzaId)?.ingredients}
              isIngredientsLoading={fetcherIsLoading}
            />
          ))}
        </ul>

        <div className="mt-4 space-y-2 text-end">
          <p className="font-medium text-stone-700">Price pizza:{formatCurrency(orderPrice).padStart(27, '.')}</p>
          {priority && (
            <p className="font-medium text-stone-700">
              Price priority:{formatCurrency(priorityPrice).padStart(27, '.')}
            </p>
          )}
          <p className="font-bold text-stone-900">
            To pay on delivery:{formatCurrency(orderPrice + priorityPrice).padStart(27, '.')}
          </p>
        </div>
      </div>

      {!priority && order.status === 'preparing' && (
        <fetcher.Form
          method="PATCH"
          className="mx-auto w-full text-end sm:w-5/6 md:w-4/6 lg:w-1/2">
          <Button disabled={fetcherIsSubmitting}>{fetcherIsSubmitting ? 'Making...' : 'Make priority'}</Button>
        </fetcher.Form>
      )}
    </div>
  );
}

Order.loader = loader;
Order.action = action;
