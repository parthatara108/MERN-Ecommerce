import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBrands, fetchCategory, fetchProductsByFilter, fetchProductById, createProduct, updateProduct, deleteProduct, createCategory, deleteCategory, deleteBrand, createBrand } from './productsAPI';

const initialState = {
  products: [],
  brands: [],
  category: [],
  selectedproduct: [],
  totalItems: 0,
  status: 'idle',
  error: null,
  success: false
};

export const fetchAllProductsFilterAsync = createAsyncThunk(
  'products/fetchProductsFilter',
  async ({ filter, pagination }) => {
    const response = await fetchProductsByFilter(filter, pagination);
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
  async ({ product, alert }) => {
    const response = await createProduct(product);
    alert.success("Product Added");
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async ({ product, alert }) => {
    const response = await updateProduct(product);
    alert.success("Product Updated");
    return response.data;
  }
);
export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async ({ id, alert }) => {
    const response = await deleteProduct(id);
    alert.success("Product Deleted Successfully")
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'products/fetchBrands',
  async (pagination) => {
    const response = await fetchBrands(pagination);
    return response.data;
  }
);
export const deleteBrandAsync = createAsyncThunk(
  'products/deleteBrand',
  async ({ id, alert }) => {
    const response = await deleteBrand(id);
    alert.success('Brand deleted')
    return response.data;
  }
);
export const createBrandAsync = createAsyncThunk(
  'products/createCategory',
  async ({ brand, alert }) => {
    const response = await createBrand(brand);
    alert.success("Brand Added");
    return response.data;
  }
);

export const fetchAllCategoryAsync = createAsyncThunk(
  'products/fetchCategory',
  async (pagination) => {
    const response = await fetchCategory(pagination);
    return response.data;
  }
);
export const createCategoryAsync = createAsyncThunk(
  'products/createCategory',
  async ({ category, alert }) => {
    const response = await createCategory(category);
    alert.success("Category Added");
    return response.data;
  }
);
export const deleteCategoryAsync = createAsyncThunk(
  'products/deleteCategory',
  async ({ id, alert }) => {
    const response = await deleteCategory(id);
    alert.success('Category deleted')
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
      .addCase(deleteProductAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.success = true
      })
      .addCase(deleteCategoryAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.success = true
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload.brands;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchAllCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.category = action.payload.categories;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(createProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(createCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.category.push(action.payload);
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
