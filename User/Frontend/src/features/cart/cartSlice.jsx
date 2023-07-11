import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addItem, updateItem, deleteItem, fetchItemsByUserId, resetCart } from './cartAPI';

const initialState = {
  items: [],
  cartLoaded: false,
  status: null,
  addStatus: null,
  quantityStatus: null
};

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItems',
  async () => {
    const response = await fetchItemsByUserId();
    return response.data;
  }
);
export const addItemAsync = createAsyncThunk(
  'cart/addItem',
  async ({ item, alert }) => {
    const response = await addItem(item);
    alert.success('Item Added To Cart');
    return response.data;
  }
);
export const deleteItemAsync = createAsyncThunk(
  'cart/deleteItem',
  async ({ id, alert }) => {
    await deleteItem(id);
    alert.success('Item Deleted')
    return id;
  }
);
export const updateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async (itemUpdate) => {
    const response = await updateItem(itemUpdate);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.cartLoaded = true
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state) => {
        state.cartLoaded = true
      })
      .addCase(addItemAsync.pending, (state, action) => {
        state.addStatus = 'loading';
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.addStatus = 'idle';
        state.items.push(action.payload);
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload)
        state.items.splice(index, 1);
      })
      .addCase(updateItemAsync.pending, (state, action) => {
        state.quantityStatus = 'loading'
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.quantityStatus = 'idle'
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items[index] = action.payload
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = 'idle';
        state.items = []
      })
  },
});

export default cartSlice.reducer;
