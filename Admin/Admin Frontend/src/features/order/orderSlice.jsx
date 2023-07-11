import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder, fetchAllOrders, updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  currentOrder: null,
  totalOrders: 0,
};

export const createOrderAsync = createAsyncThunk(
  'admin/createOrder',
  async (item) => {
    const response = await addOrder(item);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'admin/fetchOrders',
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'admin/updateOrder',
  async ({ order, alert }) => {
    const response = await updateOrder(order);
    alert.success("Status Updated");
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'admin_orders',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders
        state.totalOrders = action.payload.totalOrders
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order => order.id === action.payload.id)
        state.orders[index] = action.payload
      })

  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
