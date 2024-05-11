import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type CatsState = {
  cats: Cat[];
  isActive: boolean;
};

type getCatsArgs = {
  categoryId?: number;
  page?: number;
};

export const getCats = createAsyncThunk<
  Cat[],
  getCatsArgs | undefined,
  { rejectValue: string }
>("cats/getCats", async function (args, { rejectWithValue }) {
  const { categoryId, page } = args || {};
  const categoryQuery = categoryId ? `&category_ids=${categoryId}` : "";
  const pageQuery = page ? `&page=${page}` : "";

  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=9&api_key=live_QBbnYiIoLzY1jQzdxshSiowclOWOrp51GI3RhWZveh29ASM8IvVj0tbcb6LgJFhK${categoryQuery}${pageQuery}`
    );

    return response.data;
  } catch (error) {
    return rejectWithValue("Server Error!");
  }
});

const initialState: CatsState = {
  cats: [],
  isActive: false,
};

const catsSlice = createSlice({
  name: "cats",
  initialState,
  reducers: {
    toggleMenu(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
    },
    resetCats(state) {
      state.cats = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCats.fulfilled, (state, action) => {
      if (action.meta.arg?.page === 1) {
        state.cats = action.payload;
      } else {
        state.cats = [...state.cats, ...action.payload];
      }
    });
  },
});

export const { toggleMenu, resetCats } = catsSlice.actions;
export default catsSlice.reducer;
