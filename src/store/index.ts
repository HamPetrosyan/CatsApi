import { configureStore } from "@reduxjs/toolkit";

import catsReducer from "./catsSlice";
import categoryReducer from "./categorySlice";
import pageReducer from "./pageSlice";

const store = configureStore({
  reducer: {
    cats: catsReducer,
    categories: categoryReducer,
    page: pageReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
