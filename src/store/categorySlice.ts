import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Category = {
  id: number;
  name: string;
};

type CategoryState = {
  categories: Category[];
};

export const getCategories = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: string }
>("categories/getCategories", async function (_, { rejectWithValue }) {
  const response = await axios.get("https://api.thecatapi.com/v1/categories");

  if (!response.data) {
    return rejectWithValue("Server Error!");
  }

  return response.data;
});

const initialState: CategoryState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
