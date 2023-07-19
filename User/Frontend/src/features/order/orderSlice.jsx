import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder, confirmOrder, fetchAllOrders, updateOrder } from './orderAPI';

const initialState = {
  orders: [],
  currentOrder: null,
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (item) => {
    const response = await addOrder(item);
    return response.data;
  }
);
export const confirmOrderAsync = createAsyncThunk(
  'order/confirmOrder',
  async (item) => {
    const response = await confirmOrder(item);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchOrders',
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
  }
);


export const orderSlice = createSlice({
  name: 'items',
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
        state.orders = action.payload
      })
    // .addCase(resetOrderAsync.fulfilled, (state, action) => {
    //   state.status = 'idle';
    //   state.currentOrder = null
    // })

  },
});
export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
