import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { IApiResponse, INote, INoteApi } from "../../interfaces/ApiResponse";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";

interface ITableState {
    notes: INoteApi[];
    loading: boolean;
    error: string | null | unknown;
  }

const initialState: ITableState = {
    notes: [],
    loading: false,
    error: null,
  };
  
  export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async function() {
        const res = await axios.get<IApiResponse>('/getTable');
        return res!.data;
    }
);

export const fetchAddInTable = createAsyncThunk(
    'notes/addInTable',
    async (note: INote, { rejectWithValue }) => {
      try {
        const response: AxiosResponse = await axios.post('/addInTable', note);
  
        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string }>;
          if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
            return rejectWithValue(axiosError.response.data.message);
          }
        }
        return rejectWithValue('failed to add a note');
      }
    },
  );

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
          .addCase(fetchNotes.pending, state => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchNotes.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.notes = payload.notes;
          })
          .addCase(fetchNotes.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
          })
          .addCase(fetchAddInTable.pending, state => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchAddInTable.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.notes = payload.notes;
          })
          .addCase(fetchAddInTable.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
          })
          // .addCase(fetchRemoveItem.pending, state => {
          //   state.loading = true;
          //   state.error = null;
          // })
          // .addCase(fetchRemoveItem.fulfilled, (state, { payload }) => {
          //   state.loading = false;
          //   state.cartItems = payload.cartItems;
          // })
          // .addCase(fetchRemoveItem.rejected, (state, { payload }) => {
          //   state.loading = false;
          //   state.error = payload;
          // })
          // .addCase(fetchMinusItem.pending, state => {
          //   state.loading = true;
          //   state.error = null;
          // })
          // .addCase(fetchMinusItem.fulfilled, (state, { payload }) => {
          //   state.loading = false;
          //   state.cartItems = payload.cartItems;
          // })
          // .addCase(fetchMinusItem.rejected, (state, { payload }) => {
          //   state.loading = false;
          //   state.error = payload;
          // });
      },
  })
  
  
  export default notesSlice.reducer;