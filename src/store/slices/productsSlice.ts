import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

interface ProductsState {
  products: Product[];
  filter: 'all' | 'favorites';
  loadedFromApi: boolean;
}

const initialState: ProductsState = {
  products: [],
  filter: 'all',
  loadedFromApi: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      // Сохраняем только те товары, которые не были добавлены пользователем
      const userProducts = state.products.filter(p => p.id > 1000);
      state.products = [...action.payload, ...userProducts];
      state.loadedFromApi = true;
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'favorites'>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setProducts,
  toggleLike,
  deleteProduct,
  addProduct,
  setFilter,
} = productsSlice.actions;

export default productsSlice.reducer;