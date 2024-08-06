import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "Product App",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products.splice(action.payload, 1);
    },
    editProduct: (state, action) => {
      const { index, newProduct } = action.payload;
      if (index >= 0 && index < state.products.length) {
        state.products[index] = newProduct;
      }
    },
  },
});

export const { addProduct, removeProduct, editProduct } = productSlice.actions;
export default productSlice.reducer;
