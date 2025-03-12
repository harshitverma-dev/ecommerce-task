import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const initialState = {
  products: [],
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearFilter: (state) => {
      state.selectedCategory = null;
    }
  }
});

export const {
  setProducts,
  setCategories,
  setSelectedCategory,
  setLoading,
  setError,
  clearFilter
} = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const products = await api.getAllProducts();
    dispatch(setProducts(products));
  } catch (error) {
    dispatch(setError(error.message || 'Failed to fetch products'));
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const categories = await api.getCategories();
    dispatch(setCategories(categories));
  } catch (error) {
    dispatch(setError(error.message || 'Failed to fetch categories'));
  }
};

export const fetchProductsByCategory = (category) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const products = await api.getProductsByCategory(category);
    dispatch(setProducts(products));
  } catch (error) {
    dispatch(setError(error.message || 'Failed to fetch products by category'));
  }
};

export default productSlice.reducer;