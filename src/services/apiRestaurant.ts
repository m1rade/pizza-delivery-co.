const API_URL = 'https://react-fast-pizza-api.onrender.com/api';

export const apiRestaurant = {
  async getMenu(): Promise<IMenuItem[]> {
    const res = await fetch(`${API_URL}/menu`);

    if (!res.ok) throw Error('Failed getting menu');

    const { data } = await res.json();
    return data;
  },

  async getOrder(id: string): Promise<IOrder> {
    const res = await fetch(`${API_URL}/order/${id}`);

    if (!res.ok) throw Error(`Couldn't find order #${id}`);

    const { data } = await res.json();
    return data;
  },

  async createOrder(newOrder: OrderDomain): Promise<OrderResponse> {
    try {
      const res = await fetch(`${API_URL}/order`, {
        method: 'POST',
        body: JSON.stringify(newOrder),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw Error();

      const { data } = await res.json();
      return data;
    } catch {
      throw Error('Failed creating your order');
    }
  },

  async updateOrder(id: string, dataToUpdate: Partial<IOrder>) {
    try {
      const res = await fetch(`${API_URL}/order/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(dataToUpdate),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw Error();
    } catch {
      throw Error('Failed updating your order');
    }
  },
};

// types
export interface IMenuItem {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

export interface IOrder {
  customer: string;
  status: string;
  priority: boolean;
  cart: CartItemDomain[];
  id: string;
  estimatedDelivery: string;
  orderPrice: number;
  priorityPrice: number;
}

export interface CartItemDomain {
  addIngredients?: string[];
  removeIngredients?: string[];
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderDomain {
  address: string;
  customer: string;
  phone: string;
  priority: boolean;
  cart: CartItemDomain[];
}

export interface OrderResponse extends IOrder, OrderDomain {
  createdAt: string;
}
