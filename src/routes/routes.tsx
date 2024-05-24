import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App.tsx';
import { Cart } from '../features/cart/Cart.tsx';
import { Menu } from '../features/menu/Menu.tsx';
import { CreateOrder } from '../features/order/CreateOrder.tsx';
import { Order } from '../features/order/Order.tsx';
import { ErrorPage } from '../ui/ErrorPage.tsx';
import { Home } from '../ui/Home.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';
import { Paths } from './paths.ts';

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: (
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        ),
        loader: Menu.loader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: '/order/new',
        element: (
          <ProtectedRoute>
            <CreateOrder />
          </ProtectedRoute>
        ),
        action: CreateOrder.action,
      },
      {
        path: Paths.orderDetails,
        element: <Order />,
        loader: Order.loader,
        action: Order.action,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
