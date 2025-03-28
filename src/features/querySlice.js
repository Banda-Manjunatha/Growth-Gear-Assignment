import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockQueryProcessing } from "../utils/mockQueryProcessor.js";

// Async thunk for query processing
export const processQuery = createAsyncThunk(
  "query/processQuery",
  async (queryText, { rejectWithValue }) => {
    try {
      const result = await mockQueryProcessing(queryText);
      return result;
    } catch (error) {
      // Capture the "No Data Found" scenario
      return rejectWithValue({
        message: error.message,
        query: queryText,
      });
    }
  }
);

const querySlice = createSlice({
  name: "query",
  initialState: {
    queryHistory: [],
    currentQuery: "",
    results: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processQuery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(processQuery.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
        state.queryHistory.unshift({
          query: state.currentQuery,
          timestamp: new Date().toISOString(),
          status: "success",
        });
      })
      .addCase(processQuery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
        state.queryHistory.unshift({
          query: action.payload.query,
          timestamp: new Date().toISOString(),
          status: "no_data",
        });
      });
  },
});

export const { setCurrentQuery } = querySlice.actions;
export default querySlice.reducer;
