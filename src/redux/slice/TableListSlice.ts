import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import backend from "../../backend";



export const fetchTable = createAsyncThunk("fetchTable" , async()=>{
    try {
        const response = await axios.get(`${backend}`)
        console.log("Response:", response.data);
        return response.data
        // Handle success
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
} )

const tableListSlice = createSlice({
    name: 'tablelist',
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTable.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTable.fulfilled, (state :any, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchTable.rejected, (state, action) => {
            console.log("Error", action);
            state.isError = true;
        });
    },
    reducers: {}
})

export default tableListSlice