import { configureStore } from "@reduxjs/toolkit";
import tableListSlice from "./slice/TableListSlice";
import currentTableSlice from "./slice/CurrentTableSlice";
const store = configureStore({
    reducer:{
        tableList : tableListSlice.reducer,
        currentTable :currentTableSlice.reducer
    }
})

export default store