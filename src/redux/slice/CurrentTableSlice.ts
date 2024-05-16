import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCurrentTable = createAsyncThunk("fetchCurrentTable" , async ([table , showTable]) => {
    console.log('====================================');
    console.log({show : showTable });
    console.log('====================================');
    const url = 
    !showTable
        ? "http://localhost:8080/table"
        : 
        "http://localhost:8080/singletable";
    try {
      const response = await axios.post(url, {
        tableName: table,
      });
      console.log("Response:", response.data);
      //   setTableList(response.data);
      return {currentTable : response.data , tableName :table}
      
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  })


const currentTableSlice = createSlice({
    name: 'currenttable',
    initialState: {
        isLoading: false,
        currentTable: [],
        tableName: null,
        isError: false,
        errorMessage: null // Add an error message state for better error handling
      },
      reducers: {
        makeStateNull : (state , action)=>{
            state.currentTable=[]
            state.tableName=null
        }

      },

    extraReducers: (builder) => {
        builder.addCase(fetchCurrentTable.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCurrentTable.fulfilled, (state :any, action) => {
            state.currentTable = action.payload?.currentTable;
            state.tableName = action.payload?.tableName;
            state.isLoading = false;
        });
        builder.addCase(fetchCurrentTable.rejected, (state, action) => {
            console.log("Error", action);
            state.isError = true;
        });
        
        
    },
    
})

export const {makeStateNull} = currentTableSlice.actions


export default currentTableSlice