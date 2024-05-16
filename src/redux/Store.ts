import { configureStore } from "@reduxjs/toolkit";
import tableListSlice from "./slice/TableListSlice";
import currentTableSlice from "./slice/CurrentTableSlice";
// import courseSlice from "./slice/course";
// import singleCourse from "./slice/singleCourse";
// import studentSlice from "./slice/student";
// import {courseSlice} from './slice/course'
const store = configureStore({
    reducer:{
        // course : courseSlice.reducer,
        // singleCourse : singleCourse,
        // student : studentSlice.reducer
        tableList : tableListSlice.reducer,
        currentTable :currentTableSlice.reducer
    }
})

export default store