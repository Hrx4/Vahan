import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTable } from "../redux/slice/TableListSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchCurrentTable } from "../redux/slice/CurrentTableSlice";
import axios from "axios";
import backend from "../backend";

interface tablelist {
  setAddData: any;
  showTable: string | null;
}

const TableList: React.FC<tablelist> = ({ setAddData, showTable }) => {
  const [check, setCheck] = useState(true);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const state: any = useSelector((state) => {
    return state;
  });

  const handleTableOpen = (table: string) => {
    dispatch(fetchCurrentTable([table, showTable]));

    setAddData(false);
  };

  const handleSubmitTable = useCallback(async () => {
    if (state.tableList.data.length === 0) {
      dispatch(fetchTable());
    }
    setCheck(false);
  }, []);

  const deleteTable = async(table:string)=>{
    try {
      const response = await axios.post(`${backend}tabledelete`, {
        tableName: table,
      });
      console.log("Response:", response.data);
      dispatch(fetchTable());
      //   setTableList(response.data);
      return {currentTable : response.data , tableName :table}
      
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
    
  }


  useEffect(() => {
    if (check) handleSubmitTable();
  }, []);

  if (state.tableList.isLoading) {
    return (
      <div className=" text-black font-extrabold text-4xl text-center h-20">
        Loading....
      </div>
    );
  }

  return (
    <>
      <div className=" flex flex-col gap-4">
        <div className=" font-bold">Tables</div>
        {state.tableList.data ? (
          state.tableList.data.map((item: any, index: number) => (
            <div className="flex items-center gap-2">
              <div>{index + 1}.</div>
              <div
                className=" border p-4 w-[200px] rounded-xl cursor-pointer border-black"
                key={item.table_name}
                onClick={() => handleTableOpen(item.table_name)}
              >
                {item.table_name}
              </div>
              {
                showTable ? <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                onClick={()=>deleteTable(item.table_name)}
              >
                Delete
              </button> : null
              }
            </div>
          ))
        ) : (
          <div>No Table Available</div>
        )}
      </div>
    </>
  );
};

export default TableList;
