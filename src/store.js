import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./slices/counterSlice";
import productSlice from "./slices/todoSlice";

export default configureStore({
  reducer: {
    Counter: CounterReducer,
    product: productSlice,
  },
});
