import { Modal } from "@mui/material";
import React, { useState } from "react";
import Fields from "./Fields"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchCurrentTable } from "../redux/slice/CurrentTableSlice";

const EntityTable = () => {
  const [open, setOpen] = useState(false);
  const [currentTable, setCurrentTable] = useState([]);
  const [currentRow, setCurrentRow] = useState({});

  const state: any = useSelector((state) => {
    console.log('====================================');
    console.log(state);
    console.log('====================================');
    return state;
    
  });
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();


  const handleEdit = async (item) => {
    try {
      const url = "http://localhost:8080/table";
      const response = await axios.post(url, {
        tableName: state.currentTable.tableName,
      });
      console.log("Response:", response.data);
      //   setstate.currentTable.currentTable(response.data);
      setCurrentTable(response.data);
      setCurrentRow(item);
      setOpen(true);
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const handleDelete = async (item) => {
    try {
      const url = "http://localhost:8080/rowdelete";
      const response = await axios.post(url, {
        tableName: state.currentTable.tableName,
        rowId : item
      });
      console.log("Response:", response.data);
      dispatch(fetchCurrentTable([state.currentTable.tableName, 'showtable']));

      //   setstate.currentTable.currentTable(response.data);
      // Handle success
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  if (state.currentTable.isLoading) {
    return (
      <div className=" max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md flex-1 overflow-y-scroll overflow-x-scroll ">
        Loading....
      </div>
    );
  }

  return (
    <>
      <div className=" max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md flex-1 overflow-y-scroll overflow-x-scroll ">
        {
          state.currentTable.currentTable?.rows?.length!==0 ?
          <table className=" bg-blue-300  ">
            <thead>
              {state.currentTable.currentTable?.fields?.map((item) => (
                <th className=" border p-3">{item.name}</th>
              ))}
              <th className=" border p-3">Action</th>
            </thead>
            <tbody>
              {state.currentTable.currentTable?.rows?.map((item :any) => (
                <tr>
                  {state.currentTable.currentTable?.fields?.map((item1 :any ) =>
                    item1.dataTypeID === 1082 ? (
                      <td className="border p-3">
                        {new Date(item[item1.name]).toLocaleDateString()}
                      </td>
                    ) : (
                      <td className="border p-3">{item[item1.name]}</td>
                    )
                  )}
                  <td className="border p-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-500 text-white px-4 py-2 m-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-4 py-2 m-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <div>
            Don't have any row in this table - {state.currentTable.tableName}
          </div>
        }
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Fields
          currentRow={currentRow}
          currentTable={currentTable}
          setOpen={setOpen}
        />
      </Modal>
    </>
  );
};

export default EntityTable;
