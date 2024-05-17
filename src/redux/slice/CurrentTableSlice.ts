import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import backend from "../../backend";


export const fetchCurrentTable = createAsyncThunk("fetchCurrentTable" , async ([table , showTable]) => {
    const url = 
    !showTable
        ? `${backend}table`
        : 
        `${backend}singletable`;
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
        currentTable: [] ,
        tableName: null,
        modalOpen :false,
        isError: false,
        errorMessage: null // Add an error message state for better error handling
      },
      reducers: {
        makeStateNull : (state )=>{
            state.currentTable=[]
            state.tableName=null
        },
    //     openModal : (state , action)=>{
    //       state.modalOpen=true
    //   },
    //   closeModal : (state , action)=>{
    //     state.modalOpen=false
    // }
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

export const {makeStateNull } = currentTableSlice.actions


export default currentTableSlice