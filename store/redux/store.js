import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenses-slice";

export const store = configureStore({
  reducer: {
    expensesSlice: expenseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
