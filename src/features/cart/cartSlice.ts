import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { CartItemDomain } from '../../services/apiRestaurant';

const initialState = {
  cart: [] as CartItemDomain[],
};

type CartState = typeof initialState;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemDomain>) {
      state.cart.push(action.payload);
    },
    removeItem(state, action: PayloadAction<{ id: number }>) {
      const index = state.cart.findIndex(c => c.pizzaId === action.payload.id);
      if (index !== -1) state.cart.splice(index, 1);
    },
    increaseQuantity(state, action: PayloadAction<{ id: number }>) {
      const item = state.cart.find(c => c.pizzaId === action.payload.id);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseQuantity(state, action: PayloadAction<{ id: number }>) {
      const item = state.cart.find(c => c.pizzaId === action.payload.id);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;

        if (item.quantity === 0) cartSlice.caseReducers.removeItem(state, action);
      }
    },
    clearCart() {
      return initialState;
    },
  },
  selectors: {
    selectTotalQuantity: state => state.cart.reduce((acc, curr) => acc + curr.quantity, 0),
    selectTotalPrice: state => state.cart.reduce((acc, curr) => acc + curr.totalPrice, 0),
    selectCart: state => state.cart,
    makeCurrentQuantityById: createSelector(
      [(state: CartState) => state.cart, (_: CartState, itemId: number) => itemId],
      (cart, itemId) => {
        const item = cart.find(c => c.pizzaId === itemId);
        if (!item) return 0;
        return item.quantity;
      }
    ),
  },
});

export const { addItem, clearCart, decreaseQuantity, increaseQuantity, removeItem } = cartSlice.actions;

export const { selectTotalQuantity, selectTotalPrice, selectCart, makeCurrentQuantityById } = cartSlice.selectors;

export default cartSlice.reducer;
