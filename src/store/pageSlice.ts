import { createSlice } from "@reduxjs/toolkit";

type PageState = {
  activePage: number;
};

const initialState: PageState = {
  activePage: 1,
};

const pageSlice = createSlice({
  name: "page ",
  initialState,
  reducers: {
    nextPage(state) {
      state.activePage = state.activePage + 1;
    },
    resetPage(state) {
      state.activePage = 1;
    },
  },
});

export const { nextPage, resetPage } = pageSlice.actions;
export default pageSlice.reducer;
