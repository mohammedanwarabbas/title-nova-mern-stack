import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TitleState {
  title: string;
  loading: boolean;
  error: string | null;
}

const initialState: TitleState = {
  title: "",
  loading: false,
  error: null,
};

const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setTitle, setError } = titleSlice.actions;
export default titleSlice.reducer;
