import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, name: 'Mouse', price: 499, image: '🖱️' },
    { id: 2, name: 'Keyboard', price: 1299, image: '⌨️' },
    { id: 3, name: 'CPU', price: 12999, image: '🔧' },
    { id: 4, name: 'Monitor', price: 8999, image: '🖥️' },
    { id: 5, name: 'Motherboard', price: 5999, image: '📱' },
    { id: 6, name: 'Hard Disk', price: 3499, image: '💾' },
    { id: 7, name: 'RAM', price: 2499, image: '🔌' },
    { id: 8, name: 'Cabinet', price: 1999, image: '📦' }
  ]
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    updateProduct: (state, action) => {
      const { id, name, price } = action.payload;
      const existingProduct = state.items.find(item => item.id === id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.price = price;
      }
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
