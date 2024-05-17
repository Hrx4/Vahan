import React, { useEffect, useState } from "react";
import EntityTable from "../components/EntityTable";
import TableList from "../components/TableList";
import Fields from "../components/Fields";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { makeStateNull } from "../redux/slice/CurrentTableSlice";

interface Props {
  showTable: String | null;
}


const AddEntry: React.FC<Props> = ({ showTable }) => {
  // const [currentTable, setCurrentTable] = useState([]);
  // const [tableName, setTableName] = useState("");
  const [addData, setAddData] = useState(true);

  const state: any = useSelector((state) => {
    console.log('====================================');
    console.log(state);
    console.log('====================================');
    return state;
    
  });

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(makeStateNull())
  }, [])
  

  return (
    <>
      <div className="w-full mx-14 mt-8 h-[550px] p-5 bg-red-300  mb-40 flex flex-col">
        {
          showTable ?
          <div className=" w-full items-center justify-center  flex font-bold">
          Show Table
        </div>: <div className=" w-full items-center justify-center  flex font-bold">
          Add Entry 
        </div>
        }
        <div className=" flex w-full  h-[550px]">
        <div className="max-w-md  mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md flex-1 overflow-y-scroll">
          <TableList
            showTable={showTable}
            setAddData={setAddData}
          />
        </div>
        {!showTable ? (
          addData ? (
            <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md flex-1 overflow-y-scroll">
              Select Table
            </div>
          ) : (
            <Fields
              currentRow={null}
              currentTable={state.currentTable.currentTable}
            />
          )
        ) : addData ? (
          <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md flex-1 overflow-y-scroll">
            Select Table
          </div>
        ) : (
          <EntityTable tableName={state.currentTable.tableName} tableList={state.currentTable.currentTable} />
        )}
        </div>
      </div>
    </>
  );
};

export default AddEntry;
