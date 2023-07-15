import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBrands, fetchCategory, fetchProductsByFilter, fetchProductById, createProduct, updateProduct } from './productsAPI';

const initialState = {
  products: [],
  brands: [],
  category: [],
  selectedproduct: [],
  totalItems: 0,
  status: 'idle',
};


export const fetchAllProductsFilterAsync = createAsyncThunk(
  'products/fetchProductsFilter',
  async ({ filter, pagination, sort, search }) => {
    const response = await fetchProductsByFilter(filter, pagination, sort, search);
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  'products/fetchProductsById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const createProductsAsync = createAsyncThunk(
  'products/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'products/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);
export const fetchAllCategoryAsync = createAsyncThunk(
  'products/fetchCategory',
  async () => {
    const response = await fetchCategory();
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedproduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedproduct = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.category = action.payload;
      })
      .addCase(createProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(product => product.id === action.payload.id)
        state.products[index] = action.payload
      });
  },
});

export const { clearSelectedProduct } = productsSlice.actions;

export default productsSlice.reducer;
