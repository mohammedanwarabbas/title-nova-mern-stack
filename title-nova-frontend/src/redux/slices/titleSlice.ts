import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TitleState {
  title: string;
  loading: boolean;
  error: string | null;
  countdown:number; // in seconds
}

const initialState: TitleState = {
  title: "",
  loading: false,
  error: null,
  countdown: 0,
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
    clearTitle:(state)=>{
      state.title = "";
    },
    setCountdown: (state, action: PayloadAction<number>) => {
      state.countdown = action.payload;
    },

  },
});

export const { setLoading, setTitle, setError,clearTitle,setCountdown } = titleSlice.actions;
export default titleSlice.reducer;
